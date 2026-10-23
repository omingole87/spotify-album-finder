import React, { useState } from 'react';
import { Calendar, Disc, ExternalLink, ListMusic } from 'lucide-react';

export default function AlbumCard({ album, onSelectAlbum }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    album.images?.[0]?.url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400'
  );
  const releaseYear = album.release_date ? album.release_date.split('-')[0] : 'N/A';
  const albumType = album.album_type || 'album';

  return (
    <div className="album-card">
      <div className="album-artwork-container" onClick={() => onSelectAlbum(album)}>
        <img
          src={imgSrc}
          alt={album.name}
          className={`album-artwork ${imgLoaded ? 'loaded' : 'loading'}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgSrc('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400');
            setImgLoaded(true);
          }}
          loading="lazy"
        />
        <div className="artwork-overlay">
          <button
            className="btn-play-overlay"
            onClick={(e) => {
              e.stopPropagation();
              onSelectAlbum(album);
            }}
            title="Inspect Tracklist & Previews"
          >
            <ListMusic size={24} />
          </button>
        </div>
        <span className={`album-type-badge badge-${albumType}`}>
          {albumType}
        </span>
      </div>

      <div className="album-info">
        <h3 className="album-title" title={album.name} onClick={() => onSelectAlbum(album)}>
          {album.name}
        </h3>

        <div className="album-meta">
          <span className="meta-item">
            <Calendar size={13} />
            <span>{releaseYear}</span>
          </span>
          <span className="meta-separator">•</span>
          <span className="meta-item">
            <Disc size={13} />
            <span>{album.total_tracks} {album.total_tracks === 1 ? 'track' : 'tracks'}</span>
          </span>
        </div>

        <div className="album-actions">
          <button
            className="btn-view-tracks"
            onClick={() => onSelectAlbum(album)}
          >
            <ListMusic size={15} />
            <span>View Tracks</span>
          </button>

          {album.external_urls?.spotify && (
            <a
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spotify-link"
              title="Open in Spotify"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
