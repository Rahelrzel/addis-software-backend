import { z } from "zod";

export const createSongSchema = z
  .object({
    id: z.string().optional(), // Spotify ID
    name: z.string().optional(), // Spotify track name
    title: z.string().optional(), // our own field
    artist: z.string().min(1, "Artist is required"),
    album: z.string().min(1, "Album is required"),
    genre: z.string().optional().default("Unknown"), // optional if Spotify doesn’t send genre
    preview_url: z.string().nullable().optional(),
    image: z.string().url("Invalid image URL").optional(),
    external_url: z.string().url("Invalid Spotify URL").optional(),
    spotifyUrl: z.string().url("Invalid Spotify URL").optional(),
    playlistId: z.string().optional(),
  })
  .refine((data) => data.title || data.name, {
    message: "Either 'title' or 'name' must be provided",
    path: ["title"],
  });

export const updateSongSchema = z.object({
  title: z.string().min(1).optional(),
  artist: z.string().min(1).optional(),
  album: z.string().min(1).optional(),
  genre: z.string().min(1).optional(),
  spotifyUrl: z.string().url().optional(),
  preview_url: z.string().url().optional(),
  image: z.string().url().optional(),
  playlistId: z.string().optional(),
});
