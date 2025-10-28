import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  spotifyUrl: { type: String },
  preview_url: { type: String },
  image: { type: String },
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    required: false, // ✅ make optional
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Song", songSchema);
