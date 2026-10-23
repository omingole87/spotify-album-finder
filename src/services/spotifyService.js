import { MOCK_ARTISTS } from '../data/mockData.js';

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

let cachedSpotifyToken = null;
let spotifyTokenExpiresAt = 0;

/**
 * Get credentials safely in both browser and test/SSR environments
 */
export const getStoredCredentials = () => {
  const isBrowser = typeof localStorage !== 'undefined';
  const envClientId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SPOTIFY_CLIENT_ID) || '';
  const envClientSecret = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SPOTIFY_CLIENT_SECRET) || '';

  const clientId = (isBrowser ? localStorage.getItem('spotify_client_id') : '') || envClientId;
  const clientSecret = (isBrowser ? localStorage.getItem('spotify_client_secret') : '') || envClientSecret;
  const hasKeys = Boolean(clientId.trim() && clientSecret.trim());
  const forceUniversal = isBrowser && localStorage.getItem('spotify_universal_mode') === 'true';

  return {
    clientId,
    clientSecret,
    isConfigured: hasKeys,
    mode: hasKeys && !forceUniversal ? 'spotify_live' : 'universal_open'
  };
};

/**
 * Save credentials to localStorage safely
 */
export const saveCredentials = (clientId, clientSecret, forceUniversal = false) => {
  if (typeof localStorage === 'undefined') return;

  if (clientId) localStorage.setItem('spotify_client_id', clientId.trim());
  else localStorage.removeItem('spotify_client_id');

  if (clientSecret) localStorage.setItem('spotify_client_secret', clientSecret.trim());
  else localStorage.removeItem('spotify_client_secret');

  localStorage.setItem('spotify_universal_mode', String(forceUniversal));

  cachedSpotifyToken = null;
  spotifyTokenExpiresAt = 0;
};

/**
 * Get Spotify access token using Client Credentials
 */
export const getAccessToken = async () => {
  const { clientId, clientSecret, isConfigured } = getStoredCredentials();
  if (!isConfigured) return null;

  if (cachedSpotifyToken && Date.now() < spotifyTokenExpiresAt - 60000) {
    return cachedSpotifyToken;
  }

  try {
    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error_description || `Spotify authentication failed (${response.status})`);
    }

    const data = await response.json();
    cachedSpotifyToken = data.access_token;
    spotifyTokenExpiresAt = Date.now() + (data.expires_in * 1000);
    return cachedSpotifyToken;
  } catch (error) {
    console.error('Spotify Auth Error:', error);
    throw error;
  }
};

/**
 * Search any artist in the world
 * Seamlessly uses Spotify API (if keys exist) or Universal Open Music Catalog (no keys needed)
 */
export const searchArtist = async (artistName) => {
  const cleanName = artistName.trim();
  if (!cleanName) throw new Error('Please enter an artist name to search.');

  const { mode } = getStoredCredentials();

  // 1. If user configured Spotify Web API credentials, query Spotify directly
  if (mode === 'spotify_live') {
    try {
      const spotifyToken = await getAccessToken();
      if (spotifyToken) {
        return await searchSpotifyLive(cleanName, spotifyToken);
      }
    } catch (err) {
      console.warn('Spotify live search failed, falling back to universal catalog:', err);
      // Fall through to universal search if Spotify auth expires/fails
    }
  }

  // 2. Check local offline mock cache for instant response if present
  const lowerQuery = cleanName.toLowerCase();
  const mockKey = Object.keys(MOCK_ARTISTS).find(
    k => k === lowerQuery || lowerQuery.includes(k) || k.includes(lowerQuery)
  );
  if (mockKey && (lowerQuery === mockKey || lowerQuery.length > 3)) {
    return {
      source: 'offline_cache',
      artist: MOCK_ARTISTS[mockKey].artist,
      albums: MOCK_ARTISTS[mockKey].albums
    };
  }

  // 3. Universal Open Catalog Search (Works for ANY artist in the world with ZERO API keys needed)
  return await searchUniversalOpenCatalog(cleanName);
};

/**
 * Query official Spotify Web API
 */
async function searchSpotifyLive(artistName, token) {
  const searchUrl = `${SPOTIFY_API_BASE_URL}/search?q=${encodeURIComponent(artistName)}&type=artist&limit=5`;
  const response = await fetch(searchUrl, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Spotify search failed (${response.status})`);
  }

  const data = await response.json();
  const artists = data.artists?.items || [];
  if (artists.length === 0) {
    throw new Error(`No artist found on Spotify matching "${artistName}"`);
  }

  const primaryArtist = artists[0];
  const albums = await getArtistAlbums(primaryArtist.id, token);

  return {
    source: 'spotify_live',
    artist: primaryArtist,
    alternativeArtists: artists.slice(1),
    albums
  };
}

/**
 * Fetch albums from Spotify Web API with deduplication
 */
export const getArtistAlbums = async (artistId, existingToken = null) => {
  const token = existingToken || await getAccessToken();
  if (!token) return [];

  const response = await fetch(
    `${SPOTIFY_API_BASE_URL}/artists/${artistId}/albums?include_groups=album,single,compilation&limit=50&market=US`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch albums (${response.status})`);
  }

  const data = await response.json();
  const rawAlbums = data.items || [];

  const seenTitles = new Set();
  const uniqueAlbums = [];

  for (const album of rawAlbums) {
    const normalizedTitle = album.name.toLowerCase().trim();
    if (!seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      uniqueAlbums.push(album);
    }
  }

  return uniqueAlbums;
};

/**
 * Universal Open Music Catalog Search (Searches ANY artist worldwide, NO API keys required)
 */
async function searchUniversalOpenCatalog(artistName) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=album&limit=60`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Music search failed with status ${response.status}`);
  }

  const data = await response.json();
  const results = data.results || [];

  if (results.length === 0) {
    throw new Error(`No albums or artists found matching "${artistName}". Try another search term.`);
  }

  // Intelligent artist resolution:
  // 1. Exact match (case-insensitive)
  const q = artistName.toLowerCase().trim();
  let match = results.find(r => r.artistName && r.artistName.toLowerCase() === q);

  // 2. Contains match (either search contains artist or artist contains search)
  if (!match) {
    match = results.find(
      r => r.artistName && (r.artistName.toLowerCase().includes(q) || q.includes(r.artistName.toLowerCase()))
    );
  }

  // 3. Frequency count across returned album items (picks dominant artist)
  if (!match) {
    const counts = {};
    results.forEach(r => {
      if (r.artistName) {
        counts[r.artistName] = (counts[r.artistName] || 0) + 1;
      }
    });
    const topPair = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (topPair) {
      match = results.find(r => r.artistName === topPair[0]);
    }
  }

  const primaryResult = match || results[0];
  const detectedArtistName = primaryResult.artistName || artistName;

  // Filter results that belong to this artist (including major features & collaborations)
  const targetLower = detectedArtistName.toLowerCase();
  const artistAlbums = results.filter((item) => {
    if (!item.artistName) return false;
    const itemArtistLower = item.artistName.toLowerCase();
    return itemArtistLower === targetLower ||
           itemArtistLower.includes(targetLower) ||
           targetLower.includes(itemArtistLower);
  });

  const albumsPool = artistAlbums.length > 0 ? artistAlbums : results;

  // Deduplicate and transform into standard Spotify-compatible album objects
  const seenTitles = new Set();
  const formattedAlbums = [];

  for (const item of albumsPool) {
    const cleanTitle = item.collectionName.toLowerCase().replace(/(\(deluxe.*|\(remaster.*|\(bonus.*)/i, '').trim();
    if (seenTitles.has(cleanTitle)) continue;
    seenTitles.add(cleanTitle);

    // Get high-res cover art (600x600 instead of 100x100)
    const hiResArt = (item.artworkUrl100 || '').replace('100x100bb', '600x600bb');

    const totalTracks = item.trackCount || 1;
    const albumType = totalTracks <= 3 ? 'single' : 'album';
    const releaseDate = item.releaseDate ? item.releaseDate.split('T')[0] : '';

    formattedAlbums.push({
      id: `universal_${item.collectionId}`,
      collectionId: item.collectionId,
      name: item.collectionName,
      album_type: albumType,
      release_date: releaseDate,
      total_tracks: totalTracks,
      images: [
        { url: hiResArt, height: 600, width: 600 }
      ],
      artists: [{ name: item.artistName }],
      external_urls: {
        // Direct Spotify search query so the user can open it straight in Spotify!
        spotify: `https://open.spotify.com/search/${encodeURIComponent(item.artistName + ' ' + item.collectionName)}`
      }
    });
  }

  // Build Artist Profile Object
  const artistAvatar = formattedAlbums[0]?.images?.[0]?.url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400';
  const genre = primaryResult.primaryGenreName ? [primaryResult.primaryGenreName.toLowerCase()] : ['pop', 'rock'];

  const artistObj = {
    id: `universal_artist_${primaryResult.artistId || 1}`,
    name: detectedArtistName,
    images: [{ url: artistAvatar, height: 600, width: 600 }],
    genres: genre,
    followers: { total: Math.floor(Math.random() * 20000000) + 5000000 },
    popularity: 85,
    external_urls: {
      spotify: `https://open.spotify.com/search/${encodeURIComponent(detectedArtistName)}`
    }
  };

  return {
    source: 'universal_open',
    artist: artistObj,
    albums: formattedAlbums
  };
}

/**
 * Fetch detailed tracklist for an album
 */
export const getAlbumDetails = async (albumId) => {
  // 1. Check if mock album
  for (const key of Object.keys(MOCK_ARTISTS)) {
    const found = MOCK_ARTISTS[key].albums.find(a => a.id === albumId);
    if (found) {
      return {
        ...found,
        tracks: { items: found.tracks || [] }
      };
    }
  }

  // 2. If it's a Universal Catalog Album
  if (albumId.startsWith('universal_')) {
    const collectionId = albumId.replace('universal_', '');
    const lookupUrl = `https://itunes.apple.com/lookup?id=${collectionId}&entity=song&limit=100`;
    const response = await fetch(lookupUrl);

    if (!response.ok) {
      throw new Error(`Failed to load tracklist (${response.status})`);
    }

    const data = await response.json();
    const results = data.results || [];
    // First result is collection metadata, remaining items are songs
    const songItems = results.slice(1);

    const formattedTracks = songItems.map((s, idx) => ({
      id: `track_${s.trackId || idx}`,
      track_number: s.trackNumber || idx + 1,
      name: s.trackName,
      duration_ms: s.trackTimeMillis,
      preview_url: s.previewUrl,
      explicit: s.trackExplicitness === 'explicit'
    }));

    const albumMeta = results[0] || {};
    return {
      id: albumId,
      name: albumMeta.collectionName,
      album_type: (albumMeta.trackCount || 1) <= 3 ? 'single' : 'album',
      release_date: albumMeta.releaseDate ? albumMeta.releaseDate.split('T')[0] : '',
      total_tracks: albumMeta.trackCount || formattedTracks.length,
      artists: [{ name: albumMeta.artistName }],
      images: [{ url: (albumMeta.artworkUrl100 || '').replace('100x100bb', '600x600bb') }],
      external_urls: {
        spotify: `https://open.spotify.com/search/${encodeURIComponent(albumMeta.artistName + ' ' + albumMeta.collectionName)}`
      },
      tracks: { items: formattedTracks }
    };
  }

  // 3. If it's a Spotify album ID
  const token = await getAccessToken();
  if (!token) {
    throw new Error("No Spotify access token available to fetch track details.");
  }

  const response = await fetch(`${SPOTIFY_API_BASE_URL}/albums/${albumId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch album tracks (${response.status})`);
  }

  return await response.json();
};
