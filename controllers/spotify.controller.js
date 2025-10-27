// controllers/spotifyController.js
import axios from "axios";

export const searchTracks = async (req, res, next) => {
  try {
    const { query } = req.query;
    const token = req.spotifyToken; // token from middleware

    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });
    }

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: "track", limit: 10 },
    });

    const simplifiedTracks = response.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0]?.name,
      album: track.album.name,
      preview_url: track.preview_url,
      image: track.album.images[0]?.url,
      external_url: track.external_urls.spotify,
    }));

    res.json({ success: true, data: simplifiedTracks });
  } catch (error) {
    console.error(
      "Spotify Search Error:",
      error.response?.data || error.message
    );
    next(error);
  }
};
