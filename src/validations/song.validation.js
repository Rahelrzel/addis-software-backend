import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const createSongSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    artistId: objectIdSchema, // no parentheses
    albumId: objectIdSchema,
    genre: z.array(objectIdSchema).nonempty("At least one genre is required"),
    spotifyUrl: z.string().url("Invalid Spotify URL").optional(),

    image: z.string().url("Invalid image URL").optional(),
    playlistId: objectIdSchema.optional(),
  })
  .strict();

export const updateSongSchema = createSongSchema.partial();
