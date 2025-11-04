import express from "express";
import {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from "../controllers/album.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);
router.post("/", createAlbum);
router.get("/", getAlbums);
router.get("/:id", getAlbumById);
router.put("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

export default router;
