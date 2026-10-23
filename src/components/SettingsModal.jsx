import React, { useState } from 'react';
import { X, Key, CheckCircle, AlertCircle, ExternalLink, RefreshCw, Globe, Shield } from 'lucide-react';
import { getStoredCredentials, saveCredentials, getAccessToken } from '../services/spotifyService';

export default function SettingsModal({ isOpen, onClose, onCredentialsSaved }) {
  const currentCreds = getStoredCredentials();
  const [clientId, setClientId] = useState(currentCreds.clientId || '');
  const [clientSecret, setClientSecret] = useState(currentCreds.clientSecret || '');
  const [useUniversal, setUseUniversal] = useState(currentCreds.mode === 'universal_open');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleTestAndSave = async (e) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    if (useUniversal) {
      saveCredentials(clientId, clientSecret, true);
      setTestResult({ success: true, message: 'Saved in Universal Mode! You can search all artists worldwide.' });
      setTesting(false);
      onCredentialsSaved();
      return;
    }

    if (!clientId.trim() || !clientSecret.trim()) {
      setTestResult({ success: false, message: 'Please provide both Client ID and Client Secret.' });
      setTesting(false);
      return;
    }

    try {
      saveCredentials(clientId, clientSecret, false);
      const token = await getAccessToken();
      if (token) {
        setTestResult({ success: true, message: 'Connected successfully to Spotify Web API!' });
        onCredentialsSaved();
      } else {
        throw new Error('Could not obtain access token from Spotify.');
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'Authentication failed. Please verify your Spotify Client ID & Secret.'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSwitchToUniversal = () => {
    setUseUniversal(true);
    saveCredentials(clientId, clientSecret, true);
    setTestResult({ success: true, message: 'Universal Mode enabled! You can now search any artist in the world.' });
    onCredentialsSaved();
  };

  const handleClearKeys = () => {
    setClientId('');
    setClientSecret('');
    setUseUniversal(true);
    saveCredentials('', '', true);
    setTestResult({ success: true, message: 'Cleared credentials and reverted to Universal Search.' });
    onCredentialsSaved();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Key className="text-spotify" size={22} />
            <h2>Search & API Settings</h2>
          </div>
          <button className="btn-icon-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="settings-notice">
            <div className="notice-icon">
              <Globe size={20} className="text-spotify" />
            </div>
            <div className="notice-content">
              <strong>Universal Search (Active by Default)</strong>
              <p>
                You can search <strong>ANY artist or band in the world</strong> (Taylor Swift, Eminem, BTS, Drake, Arijit Singh, Adele, etc.) right away with full tracklists and audio previews—without needing any API key!
              </p>
            </div>
          </div>

          <form onSubmit={handleTestAndSave} className="settings-form">
            <div className="form-group">
              <label htmlFor="clientId">Spotify Developer Client ID (Optional)</label>
              <input
                id="clientId"
                type="text"
                className="input-text"
                placeholder="e.g. 1a2b3c4d5e6f..."
                value={clientId}
                onChange={(e) => {
                  setClientId(e.target.value);
                  setUseUniversal(false);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="clientSecret">Spotify Developer Client Secret (Optional)</label>
              <input
                id="clientSecret"
                type="password"
                className="input-text"
                placeholder="e.g. 9z8y7x6w5v..."
                value={clientSecret}
                onChange={(e) => {
                  setClientSecret(e.target.value);
                  setUseUniversal(false);
                }}
              />
            </div>

            <div className="helper-box">
              <h4>Want to connect your official Spotify Developer account?</h4>
              <ol>
                <li>Visit <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">developer.spotify.com/dashboard <ExternalLink size={12} /></a></li>
                <li>Create an app, select <strong>Web API</strong>.</li>
                <li>Copy your <strong>Client ID</strong> & <strong>Client Secret</strong> here to directly connect to Spotify's servers!</li>
              </ol>
            </div>

            {testResult && (
              <div className={`status-banner ${testResult.success ? 'banner-success' : 'banner-error'}`}>
                {testResult.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{testResult.message}</span>
              </div>
            )}

            <div className="modal-actions">
              <div className="actions-left">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleSwitchToUniversal}
                >
                  <Globe size={16} />
                  Use Universal Search
                </button>
                {(clientId || clientSecret) && (
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={handleClearKeys}
                  >
                    Clear Keys
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={testing}
              >
                {testing ? (
                  <>
                    <RefreshCw className="spin" size={16} />
                    Validating...
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    Save & Connect
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
