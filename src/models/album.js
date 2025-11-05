import mongoose from "mongoose";
import { string } from "zod";

const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    releaseYear: {
      type: String,
      required: false,
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
