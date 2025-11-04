import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;
