import express from "express";
import {
  createPlaylist,
  addSongToPlaylist,
  getUserPlaylists,
  playSong,
} from "../controllers/playlist.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, createPlaylist);
router.post("/add-song", authenticateUser, addSongToPlaylist);
router.get("/", authenticateUser, getUserPlaylists);
router.get("/play/:songId", playSong);

export default router;
