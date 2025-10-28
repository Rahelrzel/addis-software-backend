import express from "express";
import {
  createSong,
  getSongs,
  getSongById,
  updateSong,
  deleteSong,
  getStats,
} from "../controllers/song.controller.js";
import {
  createSongSchema,
  updateSongSchema,
} from "../validations/songValidation.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

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
