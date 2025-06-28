// Node 18+ — no need to import fetch

// --- Types for Deezer API responses ---
type DeezerAlbumSearchResult = {
  data: {
    id: number;
    title: string;
    artist: { name: string };
  }[];
};

type DeezerAlbumTracksResponse = {
  tracks: {
    data: {
      title: string;
    }[];
  };
};

// --- Fetch tracks using Deezer API ---
export async function fetchAlbumTracks(bandName: string, albumName: string): Promise<string[]> {
  // 1. Search album by name + artist
  const searchUrl = `http://localhost:4000/api/search-album?q=${encodeURIComponent(albumName + ' ' + bandName)}`;
  const searchRes = await fetch(searchUrl);
  const searchData = (await searchRes.json()) as DeezerAlbumSearchResult;

  const firstMatch = searchData.data?.[0];
  if (!firstMatch) {
    console.log("❌ Album not found.");
    return [];
  }

  const albumId = firstMatch.id;
  console.log(`✅ Found Deezer album: "${firstMatch.title}" by ${firstMatch.artist.name} (ID: ${albumId})`);

  // 2. Fetch album tracks using ID
  const albumUrl = `http://localhost:4000/api/album/${albumId}`;
  const albumRes = await fetch(albumUrl);
  const albumData = (await albumRes.json()) as DeezerAlbumTracksResponse;

  const trackTitles = albumData.tracks?.data?.map((t) => t.title) || [];
  return trackTitles;
}

// --- Test function ---
// async function test() {
//   const tracks = await fetchAlbumTracks("Radiohead", "In Rainbows");

//   if (tracks.length === 0) {
//     console.log("❌ No tracks found.");
//   } else {
//     console.log("✅ Tracks:");
//     tracks.forEach((t, i) => console.log(`${i + 1}. ${t}`));
//   }
// }

// test();
