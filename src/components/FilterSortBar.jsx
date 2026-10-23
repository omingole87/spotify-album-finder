import React from 'react';
import { ArrowUpDown, Search } from 'lucide-react';

export default function FilterSortBar({
  activeType,
  onTypeChange,
  sortBy,
  onSortChange,
  filterText,
  onFilterTextChange,
  counts
}) {
  return (
    <div className="filter-sort-bar">
      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeType === 'all' ? 'active' : ''}`}
          onClick={() => onTypeChange('all')}
        >
          All <span className="tab-count">{counts.all}</span>
        </button>
        <button
          className={`filter-tab ${activeType === 'album' ? 'active' : ''}`}
          onClick={() => onTypeChange('album')}
        >
          Albums <span className="tab-count">{counts.album}</span>
        </button>
        <button
          className={`filter-tab ${activeType === 'single' ? 'active' : ''}`}
          onClick={() => onTypeChange('single')}
        >
          Singles & EPs <span className="tab-count">{counts.single}</span>
        </button>
        {counts.compilation > 0 && (
          <button
            className={`filter-tab ${activeType === 'compilation' ? 'active' : ''}`}
            onClick={() => onTypeChange('compilation')}
          >
            Compilations <span className="tab-count">{counts.compilation}</span>
          </button>
        )}
      </div>

      <div className="filter-controls">
        <div className="filter-search-wrapper">
          <Search size={16} className="filter-search-icon" />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Filter by title..."
            value={filterText}
            onChange={(e) => onFilterTextChange(e.target.value)}
          />
        </div>

        <div className="sort-wrapper">
          <ArrowUpDown size={16} className="sort-icon" />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort releases"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Title (A - Z)</option>
            <option value="tracks-desc">Most Tracks</option>
          </select>
        </div>
      </div>
    </div>
  );
}
