import mongoose from "mongoose";

const genreSongSchema = new mongoose.Schema(
  {
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
  },
  { timestamps: true }
);

const GenreSong = mongoose.model("GenreSong", genreSongSchema);

export default GenreSong;
