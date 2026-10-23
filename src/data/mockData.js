// Rich mock data to ensure immediate functionality and offline/demo testing
export const MOCK_ARTISTS = {
  "coldplay": {
    artist: {
      id: "4gzpq5YvWqxdGez24mMq7d",
      name: "Coldplay",
      images: [
        { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80", height: 640, width: 640 },
        { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80", height: 300, width: 300 }
      ],
      genres: ["permanent wave", "pop", "rock", "post-britpop"],
      followers: { total: 54200000 },
      popularity: 88,
      external_urls: { spotify: "https://open.spotify.com/artist/4gzpq5YvWqxdGez24mMq7d" }
    },
    albums: [
      {
        id: "mock_cp_1",
        name: "Parachutes",
        album_type: "album",
        release_date: "2000-07-10",
        total_tracks: 10,
        images: [{ url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/6ZG5lRT77Kz9DYECLW7Qj0" },
        tracks: [
          { id: "t1", track_number: 1, name: "Don't Panic", duration_ms: 137000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
          { id: "t2", track_number: 2, name: "Shiver", duration_ms: 300000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
          { id: "t3", track_number: 3, name: "Spies", duration_ms: 318000, preview_url: null },
          { id: "t4", track_number: 4, name: "Sparks", duration_ms: 227000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
          { id: "t5", track_number: 5, name: "Yellow", duration_ms: 269000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
          { id: "t6", track_number: 6, name: "Trouble", duration_ms: 270000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
        ]
      },
      {
        id: "mock_cp_2",
        name: "A Rush of Blood to the Head",
        album_type: "album",
        release_date: "2002-08-26",
        total_tracks: 11,
        images: [{ url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/0RHX9XECH8vfeNZXZPUNMN" },
        tracks: [
          { id: "t7", track_number: 1, name: "Politik", duration_ms: 318000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
          { id: "t8", track_number: 2, name: "In My Place", duration_ms: 228000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
          { id: "t9", track_number: 3, name: "The Scientist", duration_ms: 309000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
          { id: "t10", track_number: 4, name: "Clocks", duration_ms: 307000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
        ]
      },
      {
        id: "mock_cp_3",
        name: "Viva La Vida or Death and All His Friends",
        album_type: "album",
        release_date: "2008-06-12",
        total_tracks: 10,
        images: [{ url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/1swLNiFt3Dp4UvL92d2WdO" },
        tracks: [
          { id: "t11", track_number: 1, name: "Life in Technicolor", duration_ms: 149000, preview_url: null },
          { id: "t12", track_number: 2, name: "Viva La Vida", duration_ms: 242000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
          { id: "t13", track_number: 3, name: "Violet Hill", duration_ms: 228000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }
        ]
      },
      {
        id: "mock_cp_4",
        name: "Mylo Xyloto",
        album_type: "album",
        release_date: "2011-10-24",
        total_tracks: 14,
        images: [{ url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/2R7iJz5A98H4i9QWJgNfO4" },
        tracks: [
          { id: "t14", track_number: 1, name: "Paradise", duration_ms: 277000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
        ]
      },
      {
        id: "mock_cp_5",
        name: "Ghost Stories",
        album_type: "album",
        release_date: "2014-05-19",
        total_tracks: 9,
        images: [{ url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/2G4AUqfwxcV1UdQjm2HNTN" },
        tracks: [
          { id: "t15", track_number: 1, name: "Magic", duration_ms: 285000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
          { id: "t16", track_number: 2, name: "A Sky Full of Stars", duration_ms: 268000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
        ]
      },
      {
        id: "mock_cp_6",
        name: "Higher Power",
        album_type: "single",
        release_date: "2021-05-07",
        total_tracks: 1,
        images: [{ url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/4e2iF6zL6jK28LzJbE4W98" },
        tracks: [
          { id: "t17", track_number: 1, name: "Higher Power", duration_ms: 211000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
        ]
      }
    ]
  },
  "daft punk": {
    artist: {
      id: "4tZwfgrHOc3mvqYxwDoOD1",
      name: "Daft Punk",
      images: [
        { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80", height: 640, width: 640 }
      ],
      genres: ["electro", "filter house", "french electronic"],
      followers: { total: 11500000 },
      popularity: 84,
      external_urls: { spotify: "https://open.spotify.com/artist/4tZwfgrHOc3mvqYxwDoOD1" }
    },
    albums: [
      {
        id: "mock_dp_1",
        name: "Discovery",
        album_type: "album",
        release_date: "2001-03-12",
        total_tracks: 14,
        images: [{ url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/2noRn2Aes5aoNVsU6iWThc" },
        tracks: [
          { id: "dp1", track_number: 1, name: "One More Time", duration_ms: 320000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
          { id: "dp2", track_number: 2, name: "Aerodynamic", duration_ms: 212000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
          { id: "dp3", track_number: 3, name: "Digital Love", duration_ms: 298000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
          { id: "dp4", track_number: 4, name: "Harder, Better, Faster, Stronger", duration_ms: 224000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
        ]
      },
      {
        id: "mock_dp_2",
        name: "Random Access Memories",
        album_type: "album",
        release_date: "2013-05-17",
        total_tracks: 13,
        images: [{ url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/4m2880jivSbbyEGAKfITFu" },
        tracks: [
          { id: "dp5", track_number: 1, name: "Give Life Back to Music", duration_ms: 274000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
          { id: "dp6", track_number: 8, name: "Get Lucky", duration_ms: 369000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
          { id: "dp7", track_number: 9, name: "Instant Crush", duration_ms: 337000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" }
        ]
      },
      {
        id: "mock_dp_3",
        name: "Homework",
        album_type: "album",
        release_date: "1997-01-20",
        total_tracks: 16,
        images: [{ url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/5uRdvUR79JRRKVnIRaQ3yv" },
        tracks: [
          { id: "dp8", track_number: 1, name: "Da Funk", duration_ms: 328000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
          { id: "dp9", track_number: 2, name: "Around the World", duration_ms: 429000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
        ]
      }
    ]
  },
  "the weeknd": {
    artist: {
      id: "1Xyo4u8uXC1ZmMpatF05PJ",
      name: "The Weeknd",
      images: [
        { url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80", height: 640, width: 640 }
      ],
      genres: ["canadian contemporary r&b", "pop"],
      followers: { total: 88500000 },
      popularity: 96,
      external_urls: { spotify: "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ" }
    },
    albums: [
      {
        id: "mock_wk_1",
        name: "After Hours",
        album_type: "album",
        release_date: "2020-03-20",
        total_tracks: 14,
        images: [{ url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/4yP0hdKOZPNshxUOjY0cZj" },
        tracks: [
          { id: "wk1", track_number: 1, name: "Alone Again", duration_ms: 250000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
          { id: "wk2", track_number: 9, name: "Blinding Lights", duration_ms: 200000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
          { id: "wk3", track_number: 10, name: "In Your Eyes", duration_ms: 237000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
        ]
      },
      {
        id: "mock_wk_2",
        name: "Dawn FM",
        album_type: "album",
        release_date: "2022-01-07",
        total_tracks: 16,
        images: [{ url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/2nLOHgzwWH5IQBRt6Pwf8n" },
        tracks: [
          { id: "wk4", track_number: 1, name: "Dawn FM", duration_ms: 96000, preview_url: null },
          { id: "wk5", track_number: 3, name: "Sacrifice", duration_ms: 188000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
        ]
      },
      {
        id: "mock_wk_3",
        name: "Starboy",
        album_type: "album",
        release_date: "2016-11-25",
        total_tracks: 18,
        images: [{ url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80" }],
        external_urls: { spotify: "https://open.spotify.com/album/2ODvWsOgouMbaA5xf0R7Je" },
        tracks: [
          { id: "wk6", track_number: 1, name: "Starboy (feat. Daft Punk)", duration_ms: 230000, preview_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
        ]
      }
    ]
  }
};
