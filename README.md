# 🎧 Spotify Album Finder by OM INGOLE

A responsive web application built with **React**, **HTML5/CSS3**, and the **Spotify Web API** that allows users to search for any artist, browse their discography, sort and filter albums, and play 30-second audio track previews.

![Spotify Theme](https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80)

---

## ✨ Features

- 🔍 **Artist Search & Recommendations**: Search any artist with instant debounce and quick-tap suggestions (*Coldplay, Daft Punk, The Weeknd, Taylor Swift, Arctic Monkeys*).
- 👤 **Verified Artist Profile Banner**: Showcases the artist's high-res photo, verified badge, monthly follower count, popularity rating, and genre tags.
- 💽 **Discography Categorization & Deduplication**:
  - Filter by **All Releases**, **Studio Albums**, **Singles & EPs**, or **Compilations**.
  - Deduplicates identical regional/deluxe album copies.
  - Sort by **Newest First**, **Oldest First**, **Alphabetical (A-Z)**, or **Most Tracks**.
  - Instant live filter search within the artist's loaded albums.
- 🎵 **Interactive Tracklist & Audio Preview Player**:
  - Pop-up modal displaying full tracklists with track numbers and durations.
  - Built-in audio player for 30-second song previews with play/pause state controls.
  - Direct deep-links to open albums & artists inside the Spotify app/web player.
- ⚡ **Dual Mode Support (Demo & Live)**:
  - **Demo Mode**: Works right out of the box with sample data and audio previews—no Spotify account required!
  - **Live Mode**: Easily connect your own Spotify Developer `Client ID` & `Client Secret` via the built-in in-app **API Config** modal or a `.env` file.
- 🎨 **Spotify Dark UI Aesthetic**: Built with Spotify's signature obsidian palette (`#121212`), `#1DB954` green accents, glassmorphic cards, hover lift animations, and full mobile responsiveness.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd spotify-album-finder
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser at the local URL displayed (e.g. `http://localhost:5173/`).

---

## 🔑 Spotify API Configuration (Optional)

The app works instantly out of the box in **Demo Mode**. To switch to the live Spotify API for searching *any* artist on Spotify:

1. Click the **API Config** button in the top right corner of the navbar.
2. Follow the link to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a free app.
3. Paste your **Client ID** and **Client Secret** into the modal and click **Save & Connect**.
4. Alternatively, create a `.env` file in the root directory:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_client_id_here
   VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

---

## 📁 Project Structure

```
spotify-album-finder/
├── src/
│   ├── components/
│   │   ├── AlbumCard.jsx          # Individual album card with artwork & metadata
│   │   ├── AlbumGrid.jsx          # Responsive container for album cards
│   │   ├── ArtistHero.jsx         # Artist profile banner & follower statistics
│   │   ├── FilterSortBar.jsx      # Release type tabs, sort dropdown & search filter
│   │   ├── LoadingSkeleton.jsx    # Shimmer loading placeholders
│   │   ├── Navbar.jsx             # Top bar with branding & API status
│   │   ├── SearchBar.jsx          # Search input with quick-recommendation chips
│   │   ├── SettingsModal.jsx      # In-app Spotify API credentials configuration
│   │   └── TracklistModal.jsx     # Tracklist drawer with 30s audio preview player
│   ├── data/
│   │   └── mockData.js            # Sample discographies for offline & demo testing
│   ├── services/
│   │   └── spotifyService.js      # OAuth Client Credentials token management & API calls
│   ├── App.css                    # Component styles & responsive CSS
│   ├── App.jsx                    # Top-level state coordinator
│   ├── index.css                  # Global variables & dark theme definitions
│   └── main.jsx                   # React DOM root entry
├── package.json
└── vite.config.js
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: Spotify Web API (Client Credentials Flow)
