import { Router } from "express";
import UserRouter from "./auth.js";

import PlaylistRouter from "./playlist.js";
import SongRouter from "./song.js";
import SpotifyRouter from "./spotify.js";

const router = Router();
router.use("/auth", UserRouter);
router.use("/playlist", PlaylistRouter);
router.use("/songs", SongRouter);
router.use("/spotify", SpotifyRouter);

export default router;
