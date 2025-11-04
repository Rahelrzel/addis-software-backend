import express from "express";
import {
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
  createGenre,
} from "../controllers/genre.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);
router.post("/", createGenre);
router.get("/", getGenres);
router.get("/:id", getGenreById);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
