import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const createSongSchema = z
  .object({
    title: z.string().optional(),
    artist: z.string().min(1, "Artist is required"),
    album: z.string().min(1, "Album is required"),

    genre: z.array(objectIdSchema, { required_error: "Genre is required" }),

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

  genre: z.array(objectIdSchema).optional(),

  spotifyUrl: z.string().url().optional(),
  preview_url: z.string().url().optional(),
  image: z.string().url().optional(),
  playlistId: z.string().optional(),
});
