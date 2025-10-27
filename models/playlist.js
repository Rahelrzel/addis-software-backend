// models/playlist.js
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  songs: [
    {
      spotifyId: String,
      title: String,
      artist: String,
      album: String,
      image: String,
      preview_url: String,
      external_url: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Playlist", playlistSchema);
