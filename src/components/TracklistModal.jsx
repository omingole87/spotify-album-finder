import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, ExternalLink, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { getAlbumDetails } from '../services/spotifyService';

export default function TracklistModal({ album, onClose }) {
  const [loading, setLoading] = useState(true);
  const [albumDetails, setAlbumDetails] = useState(null);
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const audioRef = useRef(null);

  // Format milliseconds into mm:ss
  const formatDuration = (ms) => {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchTracks = async () => {
      try {
        setLoading(true);
        const data = await getAlbumDetails(album.id);
        if (isMounted) {
          setAlbumDetails(data);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Falling back to basic album data:', err);
          setAlbumDetails(album);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (album) {
      fetchTracks();
    }

    return () => {
      isMounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [album]);

  // Handle Play/Pause of 30-sec preview
  const handleTogglePlay = (track) => {
    if (!track.preview_url) return;

    if (playingTrackId === track.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingTrackId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current = null;
      }
      const newAudio = new Audio(track.preview_url);
      newAudio.volume = 0.85;
      audioRef.current = newAudio;

      newAudio.onerror = () => {
        console.warn('Audio playback error for track:', track.name);
        setPlayingTrackId(null);
      };

      newAudio.onended = () => {
        setPlayingTrackId(null);
      };

      newAudio.play().catch((err) => {
        console.warn('Audio play was interrupted:', err);
        setPlayingTrackId(null);
      });
      setPlayingTrackId(track.id);
    }
  };

  if (!album) return null;

  const tracks = albumDetails?.tracks?.items || album.tracks || [];
  const imageUrl = album.images?.[0]?.url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400';
  const releaseYear = album.release_date ? album.release_date.split('-')[0] : '';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card tracklist-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header modal-header-flush">
          <button className="btn-icon-close" onClick={onClose} aria-label="Close tracklist">
            <X size={20} />
          </button>
        </div>

        <div className="tracklist-hero">
          <img src={imageUrl} alt={album.name} className="tracklist-cover" />
          <div className="tracklist-album-info">
            <span className="album-type-badge badge-album">{album.album_type || 'Album'}</span>
            <h2 className="tracklist-title">{album.name}</h2>
            <div className="tracklist-meta">
              <span>{album.artists?.map(a => a.name).join(', ') || 'Artist'}</span>
              <span>•</span>
              <span>{releaseYear}</span>
              <span>•</span>
              <span>{album.total_tracks || tracks.length} songs</span>
            </div>

            {album.external_urls?.spotify && (
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-spotify-profile tracklist-spotify-btn"
              >
                <span>Listen to Full Album on Spotify</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        <div className="tracklist-body">
          {loading ? (
            <div className="tracklist-loading">
              <Loader2 className="spin text-spotify" size={32} />
              <p>Loading tracklist...</p>
            </div>
          ) : tracks.length > 0 ? (
            <div className="tracks-table">
              <div className="tracks-table-header">
                <span className="th-num">#</span>
                <span className="th-title">Title</span>
                <span className="th-duration">
                  <Clock size={14} />
                </span>
              </div>

              <div className="tracks-list">
                {tracks.map((track, idx) => {
                  const isPlaying = playingTrackId === track.id;
                  const hasPreview = Boolean(track.preview_url);

                  return (
                    <div
                      key={track.id || idx}
                      className={`track-row ${isPlaying ? 'track-playing' : ''} ${hasPreview ? 'clickable' : ''}`}
                      onClick={() => hasPreview && handleTogglePlay(track)}
                    >
                      <div className="td-num">
                        {hasPreview ? (
                          <button
                            className="btn-track-play"
                            aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
                          >
                            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                          </button>
                        ) : (
                          <span className="track-number">{track.track_number || idx + 1}</span>
                        )}
                      </div>

                      <div className="td-title">
                        <span className="track-name">{track.name}</span>
                        {track.explicit && <span className="explicit-tag">E</span>}
                        {!hasPreview && (
                          <span className="no-preview-note">No 30s preview</span>
                        )}
                      </div>

                      <div className="td-duration">
                        <span>{formatDuration(track.duration_ms)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="empty-tracks">
              <AlertCircle size={24} className="text-muted" />
              <p>No track details available for this release.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
