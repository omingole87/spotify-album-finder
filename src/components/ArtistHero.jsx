import React from 'react';
import { BadgeCheck, Users, Flame, ExternalLink, Music } from 'lucide-react';

export default function ArtistHero({ artist }) {
  const [imgError, setImgError] = React.useState(false);

  if (!artist) return null;

  const fallbackImg = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400';
  const avatarSrc = !imgError && artist.images?.[0]?.url ? artist.images[0].url : fallbackImg;

  const followersCount = artist.followers?.total
    ? new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(artist.followers.total)
    : 'N/A';

  return (
    <div className="artist-hero">
      <div className="artist-avatar-container">
        <img
          src={avatarSrc}
          alt={artist.name}
          className="artist-avatar"
          onError={() => setImgError(true)}
        />
      </div>

      <div className="artist-details">
        <div className="artist-verified">
          <BadgeCheck className="text-spotify" size={18} />
          <span>Verified Artist</span>
        </div>

        <h1 className="artist-name">{artist.name}</h1>

        <div className="artist-stats">
          <div className="stat-item" title="Monthly Followers">
            <Users size={16} />
            <span>{followersCount} Followers</span>
          </div>
          {artist.popularity !== undefined && (
            <div className="stat-item" title="Spotify Popularity Score (0-100)">
              <Flame size={16} className="text-orange" />
              <span>{artist.popularity}% Popularity</span>
            </div>
          )}
        </div>

        {artist.genres && artist.genres.length > 0 && (
          <div className="artist-genres">
            {artist.genres.slice(0, 5).map((genre) => (
              <span key={genre} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        )}

        {artist.external_urls?.spotify && (
          <div className="artist-actions">
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-spotify-profile"
            >
              <Music size={16} />
              <span>Open Artist in Spotify</span>
              <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
