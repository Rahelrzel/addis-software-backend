import { dbQuery } from "../middlewares/error.middleware.js";
import Genre from "../models/genre.js";
import HttpError from "../utils/HttpError.js";

export const createGenre = dbQuery(async (req, res) => {
  const { name } = req.body;
  if (!name)
    throw new HttpError({ status: 400, message: "Genre name is required" });

  const genre = new Genre({ name });
  await genre.save();

  res.status(201).json(genre);
});

export const getGenres = dbQuery(async (_req, res) => {
  const genres = await Genre.find();
  res.status(200).json(genres);
});

export const getGenreById = dbQuery(async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) throw new HttpError({ status: 404, message: "Genre not found" });

  res.status(200).json(genre);
});

export const updateGenre = dbQuery(async (req, res) => {
  const { name } = req.body;
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!genre) throw new HttpError({ status: 404, message: "Genre not found" });

  res.status(200).json(genre);
});

export const deleteGenre = dbQuery(async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) throw new HttpError({ status: 404, message: "Genre not found" });

  res.status(200).json({ message: "Genre deleted successfully" });
});
