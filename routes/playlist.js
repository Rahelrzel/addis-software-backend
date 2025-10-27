// routes/playlistRoutes.js
import express from "express";
import {
  createPlaylist,
  addSongToPlaylist,
  getPlaylists,
  getPlaylistById,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.post("/", createPlaylist);
router.get("/", getPlaylists);
router.get("/:playlistId", getPlaylistById);
router.post("/:playlistId/songs", addSongToPlaylist);

export default router;
