import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

const SUGGESTIONS = [
  'Taylor Swift',
  'Coldplay',
  'Eminem',
  'Drake',
  'The Weeknd',
  'BTS',
  'Daft Punk',
  'Billie Eilish',
  'Adele',
  'Arijit Singh'
];

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChipClick = (artistName) => {
    setQuery(artistName);
    onSearch(artistName);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search for an artist (e.g. Coldplay, Daft Punk, The Weeknd)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
          {query && !isLoading && (
            <button
              type="button"
              className="btn-clear"
              onClick={handleClear}
              aria-label="Clear search input"
            >
              <X size={18} />
            </button>
          )}
          {isLoading && <Loader2 className="search-spinner spin" size={20} />}
        </div>
        <button
          type="submit"
          className="btn-search"
          disabled={isLoading || !query.trim()}
        >
          Find Albums
        </button>
      </form>

      <div className="search-suggestions">
        <span className="suggestions-label">Try searching:</span>
        <div className="suggestion-chips">
          {SUGGESTIONS.map((artist) => (
            <button
              key={artist}
              type="button"
              className="chip"
              onClick={() => handleChipClick(artist)}
              disabled={isLoading}
            >
              {artist}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
