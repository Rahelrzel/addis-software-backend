import express from "express";
import { searchTracks } from "../controllers/spotify.controller.js";

const router = express.Router();

router.get("/search", searchTracks);

export default router;
