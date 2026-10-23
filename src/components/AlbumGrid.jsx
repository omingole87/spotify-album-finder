import React from 'react';
import AlbumCard from './AlbumCard';
import { SearchX } from 'lucide-react';

export default function AlbumGrid({ albums, onSelectAlbum, onResetFilter }) {
  if (albums.length === 0) {
    return (
      <div className="empty-results-state">
        <SearchX size={48} className="text-muted" />
        <h3>No releases match your filter</h3>
        <p>Try switching categories or clearing your search keywords.</p>
        {onResetFilter && (
          <button className="btn-secondary" onClick={onResetFilter}>
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="album-grid">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onSelectAlbum={onSelectAlbum}
        />
      ))}
    </div>
  );
}
