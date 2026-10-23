// Automated verification test for searchArtist and album track resolution
import { searchArtist, getAlbumDetails } from '../src/services/spotifyService.js';

const TEST_ARTISTS = [
  'Taylor Swift',
  'Drake',
  'Eminem',
  'BTS',
  'Adele',
  'Arijit Singh',
  'Coldplay',
  'Dua Lipa',
  'The Beatles',
  'Queen'
];

async function runTests() {
  console.log('🧪 Starting automated artist search & album verification tests...\n');
  let passed = 0;
  let failed = 0;

  for (const query of TEST_ARTISTS) {
    try {
      const res = await searchArtist(query);
      const artist = res.artist;
      const albums = res.albums || [];

      if (!artist || !artist.name) {
        throw new Error(`Artist object is invalid for query "${query}"`);
      }

      if (albums.length === 0) {
        throw new Error(`Zero albums returned for query "${query}"`);
      }

      // Check first album structure
      const sampleAlbum = albums[0];
      if (!sampleAlbum.id || !sampleAlbum.name || !sampleAlbum.images?.[0]?.url) {
        throw new Error(`Album structure missing required fields for ${sampleAlbum.name}`);
      }

      console.log(`✅ [PASS] "${query}" -> Resolved: "${artist.name}" (${albums.length} albums found)`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] "${query}":`, err.message);
      failed++;
    }
  }

  // Test Tracklist & Preview URL verification on a sample album
  console.log('\n🎵 Testing Tracklist & Audio Preview retrieval...');
  try {
    const artistRes = await searchArtist('Coldplay');
    const firstAlbum = artistRes.albums[0];
    const details = await getAlbumDetails(firstAlbum.id);
    const tracks = details.tracks?.items || [];

    if (tracks.length === 0) {
      throw new Error(`No tracks found for album "${firstAlbum.name}"`);
    }

    const hasAnyPreview = tracks.some(t => Boolean(t.preview_url));
    console.log(`✅ [PASS] Album "${details.name}" returned ${tracks.length} tracks. Preview URLs available: ${hasAnyPreview ? 'YES' : 'NO'}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] Tracklist test:`, err.message);
    failed++;
  }

  console.log(`\n========================================`);
  console.log(`Test Summary: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests();
