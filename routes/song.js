import express from "express";

import {
  createSong,
  updateSong,
  deleteSong,
  getSongById,
  getSongs,
  getStats,
} from "../controllers/song.Controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
  createSongSchema,
  updateSongSchema,
} from "../schema/songValidation.js";

const router = express.Router();

// CRUD routes with middleware
router.post("/", validateBody(createSongSchema), createSong);
router.put("/:id", validateBody(updateSongSchema), updateSong);

router.get("/", getSongs);
router.get("/stats", getStats);
router.get("/:id", getSongById);
router.delete("/:id", deleteSong);

export default router;
