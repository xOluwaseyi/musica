import { getPlaylists } from "../../lib/gospelData";

export default async function handler(req, res) {
  try {
    const data = await getPlaylists();
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: "Failed to load playlists" });
  }
}
