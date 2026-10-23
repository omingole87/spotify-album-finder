import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="skeleton-container">
      {/* Artist Hero Skeleton */}
      <div className="skeleton-hero">
        <div className="skeleton-avatar skeleton-pulse"></div>
        <div className="skeleton-hero-info">
          <div className="skeleton-line skeleton-title skeleton-pulse"></div>
          <div className="skeleton-line skeleton-subtitle skeleton-pulse"></div>
          <div className="skeleton-tags">
            <div className="skeleton-tag skeleton-pulse"></div>
            <div className="skeleton-tag skeleton-pulse"></div>
            <div className="skeleton-tag skeleton-pulse"></div>
          </div>
        </div>
      </div>

      {/* Album Grid Skeleton */}
      <div className="skeleton-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="skeleton-card">
            <div className="skeleton-card-art skeleton-pulse"></div>
            <div className="skeleton-card-body">
              <div className="skeleton-line skeleton-card-title skeleton-pulse"></div>
              <div className="skeleton-line skeleton-card-sub skeleton-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
