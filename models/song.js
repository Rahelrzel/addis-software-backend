import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  spotifyUrl: { type: String }, // Spotify track URL (optional)
  preview_url: { type: String }, // short audio preview (from Spotify)
  image: { type: String }, // album cover image
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Song", songSchema);
