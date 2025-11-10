import express from "express";

import {
  createSongSchema,
  updateSongSchema,
} from "../validations/song.validation.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  createSong,
  deleteSong,
  getSongById,
  getSongs,
  getStats,
  updateSong,
} from "../controllers/song.Controller.js";

const router = express.Router();

// ROUTES
router.use(authenticateUser);

router.post("/", validateBody(createSongSchema), createSong); // ✅ validate before creating
router.get("/", getSongs);
router.get("/stats", getStats);
router.get("/:id", getSongById);
router.put("/:id", validateBody(updateSongSchema), updateSong); // ✅ validate before updating
router.delete("/:id", deleteSong);

export default router;
