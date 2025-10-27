import { z } from "zod";

export const createSongSchema = z.object({
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  album: z.string().min(1, "Album is required"),
  genre: z.string().min(1, "Genre is required"),
  spotifyUrl: z.string().url().optional(),
  preview_url: z.string().url().optional(),
  image: z.string().url().optional(),
});

export const updateSongSchema = z.object({
  title: z.string().min(1).optional(),
  artist: z.string().min(1).optional(),
  album: z.string().min(1).optional(),
  genre: z.string().min(1).optional(),
  spotifyUrl: z.string().url().optional(),
  preview_url: z.string().url().optional(),
  image: z.string().url().optional(),
});
