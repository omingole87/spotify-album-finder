import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ArtistHero from './components/ArtistHero';
import FilterSortBar from './components/FilterSortBar';
import AlbumGrid from './components/AlbumGrid';
import TracklistModal from './components/TracklistModal';
import SettingsModal from './components/SettingsModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import { searchArtist, getStoredCredentials } from './services/spotifyService';
import { AlertCircle, Music4 } from 'lucide-react';
import './App.css';

export default function App() {
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(() => getStoredCredentials().mode);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Filtering and Sorting States
  const [activeType, setActiveType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [filterText, setFilterText] = useState('');

  // Initial default search on mount so page is pre-populated
  useEffect(() => {
    let ignore = false;
    async function loadInitial() {
      try {
        const result = await searchArtist('Coldplay');
        if (!ignore) {
          setArtist(result.artist);
          setAlbums(result.albums || []);
          if (result.source) {
            setMode(result.source === 'spotify_live' ? 'spotify_live' : 'universal_open');
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error('Initial load failed:', err);
          setError(err.message || 'Failed to load artist.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadInitial();
    return () => {
      ignore = true;
    };
  }, []);

  const performSearch = useCallback(async (artistName) => {
    try {
      setLoading(true);
      setError(null);
      setFilterText('');
      setActiveType('all');

      const result = await searchArtist(artistName);
      setArtist(result.artist);
      setAlbums(result.albums || []);
      if (result.source) {
        setMode(result.source === 'spotify_live' ? 'spotify_live' : 'universal_open');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.message || 'Failed to find artist. Please try another search or check API settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCredentialsUpdated = () => {
    const creds = getStoredCredentials();
    setMode(creds.mode);
    if (artist) {
      performSearch(artist.name);
    }
  };

  // Counts for filter pills
  const counts = useMemo(() => {
    const res = { all: albums.length, album: 0, single: 0, compilation: 0 };
    albums.forEach((item) => {
      const type = item.album_type || 'album';
      if (res[type] !== undefined) {
        res[type]++;
      }
    });
    return res;
  }, [albums]);

  // Filtered & Sorted list
  const filteredAlbums = useMemo(() => {
    return albums
      .filter((item) => {
        // Filter by release type
        if (activeType !== 'all') {
          const type = item.album_type || 'album';
          if (type !== activeType) return false;
        }
        // Filter by text search within albums
        if (filterText.trim()) {
          const needle = filterText.toLowerCase();
          const titleMatches = item.name.toLowerCase().includes(needle);
          return titleMatches;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return (b.release_date || '').localeCompare(a.release_date || '');
        }
        if (sortBy === 'date-asc') {
          return (a.release_date || '').localeCompare(b.release_date || '');
        }
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'tracks-desc') {
          return (b.total_tracks || 0) - (a.total_tracks || 0);
        }
        return 0;
      });
  }, [albums, activeType, filterText, sortBy]);

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        mode={mode}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="main-content">
        {/* Search Section */}
        <SearchBar
          onSearch={performSearch}
          isLoading={loading}
        />

        {/* Error Notification */}
        {error && (
          <div className="app-error-banner">
            <AlertCircle size={20} />
            <div className="error-text">
              <strong>Search Error:</strong> {error}
            </div>
            <button
              className="btn-link"
              onClick={() => setIsSettingsOpen(true)}
            >
              Check API Settings
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && <LoadingSkeleton />}

        {/* Loaded Content */}
        {!loading && artist && (
          <div className="results-container">
            {/* Artist Hero Banner */}
            <ArtistHero key={artist.id} artist={artist} />

            {/* Filter & Sort Controls */}
            {albums.length > 0 && (
              <FilterSortBar
                activeType={activeType}
                onTypeChange={setActiveType}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filterText={filterText}
                onFilterTextChange={setFilterText}
                counts={counts}
                totalCount={albums.length}
                filteredCount={filteredAlbums.length}
              />
            )}

            {/* Album Grid */}
            <AlbumGrid
              albums={filteredAlbums}
              onSelectAlbum={(alb) => setSelectedAlbum(alb)}
              onResetFilter={() => {
                setActiveType('all');
                setFilterText('');
              }}
            />
          </div>
        )}

        {/* Empty state when no artist is loaded yet */}
        {!loading && !artist && !error && (
          <div className="empty-init-state">
            <Music4 size={64} className="text-muted" />
            <h2>Find Your Favorite Artist</h2>
            <p>Type any artist name above to explore their entire album discography!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built with React & Spotify Web API • Powered by Spotify</p>
      </footer>

      {/* Tracklist Modal */}
      {selectedAlbum && (
        <TracklistModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onCredentialsSaved={handleCredentialsUpdated}
      />
    </div>
  );
}
