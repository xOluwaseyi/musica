// Shared data layer for the /api/new, /api/popular and /api/playlist routes.
//
// The original Musica backend is gone, so this proxies the free, keyless
// iTunes Search API (attribute=artistTerm) for a curated roster of Nigerian
// gospel artists and reshapes the results into the {id, title, artist,
// cover, audio, duration} song shape the frontend already expects.

const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";

// Split so /new and /popular don't surface the same tracks.
const NEW_RELEASE_ARTISTS = [
  "Moses Bliss",
  "Judikay",
  "Onos",
  "Chioma Jesus",
  "Minister GUC",
  "Ada Ehi",
  "Prospa Ochimana",
];

const POPULAR_ARTISTS = [
  "Sinach",
  "Nathaniel Bassey",
  "Tope Alabi",
  "Mercy Chinwo",
  "Dunsin Oyekan",
  "Steve Crown",
  "Frank Edwards",
];

const PLAYLISTS = [
  {
    title: "Praise & Worship",
    info: "Songs to lift your spirit in worship.",
    artists: ["Sinach", "Nathaniel Bassey", "Dunsin Oyekan"],
  },
  {
    title: "Naija Gospel Hits",
    info: "Feel-good gospel anthems from Nigeria.",
    artists: ["Mercy Chinwo", "Moses Bliss", "Frank Edwards"],
  },
  {
    title: "Sunday Service",
    info: "Set the mood for a Sunday morning service.",
    artists: ["Tope Alabi", "Chioma Jesus", "Steve Crown"],
  },
  {
    title: "Prayer & Warfare",
    info: "Songs for prayer and spiritual warfare.",
    artists: ["Ada Ehi", "Judikay", "Minister GUC"],
  },
  {
    title: "Rising Voices",
    info: "Fresh voices in Nigerian gospel music.",
    artists: ["Onos", "Prospa Ochimana", "Nathaniel Bassey"],
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// iTunes artwork URLs end in e.g. /100x100bb.jpg — swap in a bigger size.
function upsizeArtwork(url) {
  if (!url) return url;
  return url.replace(/\/\d+x\d+bb\.(jpg|png)$/, "/600x600bb.$1");
}

function formatDuration(millis) {
  if (!millis) return "0:00";
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function shapeTrack(raw) {
  return {
    id: raw.trackId,
    title: raw.trackName,
    artist: raw.artistName,
    cover: upsizeArtwork(raw.artworkUrl100),
    audio: raw.previewUrl,
    duration: formatDuration(raw.trackTimeMillis),
  };
}

async function fetchArtistTracks(artistName, limit) {
  const params = new URLSearchParams({
    term: artistName,
    attribute: "artistTerm",
    media: "music",
    entity: "song",
    limit: String(limit),
  });

  const url = `${ITUNES_SEARCH_URL}?${params.toString()}`;
  let res = await fetch(url);
  if (!res.ok) {
    // iTunes throttles bursts with 403s — a single retry after a short
    // backoff is usually enough to recover instead of dropping the artist
    // for the whole cache window.
    await sleep(1000);
    res = await fetch(url);
    if (!res.ok) return [];
  }

  const data = await res.json();
  const needle = artistName.toLowerCase();

  // attribute=artistTerm is loose enough to occasionally return a feature
  // credit or unrelated collab — keep only tracks that actually list the
  // artist we searched for, and that have a playable preview.
  return data.results
    .filter((r) => r.previewUrl && r.artistName?.toLowerCase().includes(needle))
    .map(shapeTrack);
}

async function fetchArtists(artists, perArtist) {
  const tracks = [];
  for (const artist of artists) {
    tracks.push(...(await fetchArtistTracks(artist, perArtist)));
    await sleep(300); // the iTunes Search API rate-limits aggressive bursts
  }
  return tracks;
}

function dedupe(tracks) {
  const seen = new Set();
  return tracks.filter((t) => {
    if (seen.has(t.id)) return false;
    seen.add(t.id);
    return true;
  });
}

// Warm-instance cache: avoids re-hitting iTunes on every request. Paired
// with the Cache-Control headers set in the API routes, which cache the
// response at Vercel's edge too.
const cache = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function getCached(key, build) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < CACHE_TTL_MS) {
    return hit.data;
  }

  try {
    const data = await build();
    cache.set(key, { data, time: Date.now() });
    return data;
  } catch (err) {
    if (hit) return hit.data; // serve stale data rather than fail outright
    throw err;
  }
}

async function buildNewReleases() {
  return dedupe(await fetchArtists(NEW_RELEASE_ARTISTS, 3)).slice(0, 15);
}

async function buildPopular() {
  return dedupe(await fetchArtists(POPULAR_ARTISTS, 3)).slice(0, 15);
}

async function buildPlaylists() {
  const playlists = [];

  for (let i = 0; i < PLAYLISTS.length; i++) {
    const { title, info, artists } = PLAYLISTS[i];
    const files = dedupe(await fetchArtists(artists, 4)).slice(0, 6);

    playlists.push({
      id: `playlist-${i + 1}`,
      title,
      info,
      cover: files[0] ? files[0].cover : null,
      files,
    });
  }

  return playlists;
}

export const getNewReleases = () => getCached("new", buildNewReleases);
export const getPopular = () => getCached("popular", buildPopular);
export const getPlaylists = () => getCached("playlist", buildPlaylists);
