import React from 'react';
import { Disc3, Settings, ShieldCheck, Globe } from 'lucide-react';

export default function Navbar({ mode, onOpenSettings }) {
  const isSpotifyLive = mode === 'spotify_live';

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Disc3 className="brand-icon" size={28} />
          </div>
          <div>
            <h1 className="brand-title">Spotify Album Finder</h1>
            <p className="brand-subtitle">Explore discographies & listen to previews</p>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            className={`status-pill ${isSpotifyLive ? 'status-live' : 'status-demo'}`}
            onClick={onOpenSettings}
            title={
              isSpotifyLive
                ? 'Connected directly to official Spotify Web API'
                : 'Universal Search Mode: Searches ANY artist in the world without requiring API keys'
            }
          >
            <span className="status-dot"></span>
            {isSpotifyLive ? (
              <>
                <ShieldCheck size={14} />
                <span>Spotify Live API</span>
              </>
            ) : (
              <>
                <Globe size={14} />
                <span>Universal Search (All Artists)</span>
              </>
            )}
          </button>

          <button
            className="btn-settings"
            onClick={onOpenSettings}
            aria-label="API Settings"
            title="Configure Spotify Developer API Credentials"
          >
            <Settings size={18} />
            <span className="settings-text">API Config</span>
          </button>
        </div>
      </div>
    </header>
  );
}
