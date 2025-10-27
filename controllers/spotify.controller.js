// controllers/spotifyController.js
import axios from "axios";

export const searchTracks = async (req, res, next) => {
  try {
    const { query } = req.query;
    const token = req.spotifyToken; // token obtained from your middleware or service

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: "track", limit: 10 },
    });

    const simplifiedTracks = response.data.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists[0]?.name,
      album: track.album.name,
      preview_url: track.preview_url,
      image: track.album.images[0]?.url,
    }));

    res.json({ success: true, data: simplifiedTracks });
  } catch (error) {
    next(error);
  }
};
