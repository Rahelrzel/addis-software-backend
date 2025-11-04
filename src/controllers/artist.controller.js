import { dbQuery } from "../middlewares/error.middleware.js";
import Artist from "../models/artist.js";
import HttpError from "../utils/HttpError.js";

export const createArtist = dbQuery(async (req, res) => {
  const { name } = req.body;
  if (!name)
    throw new HttpError({ status: 400, message: "Artist name is required" });

  const artist = new Artist({
    name,
    userId: req.user.id,
  });

  await artist.save();
  res.status(201).json(artist);
});

export const getArtists = dbQuery(async (_req, res) => {
  const artists = await Artist.find();
  res.status(200).json(artists);
});

export const getArtistById = dbQuery(async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist)
    throw new HttpError({ status: 404, message: "Artist not found" });

  res.status(200).json(artist);
});

export const updateArtist = dbQuery(async (req, res) => {
  const { name } = req.body;
  const artist = await Artist.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!artist)
    throw new HttpError({ status: 404, message: "Artist not found" });

  res.status(200).json(artist);
});

export const deleteArtist = dbQuery(async (req, res) => {
  const artist = await Artist.findByIdAndDelete(req.params.id);
  if (!artist)
    throw new HttpError({ status: 404, message: "Artist not found" });

  res.status(200).json({ message: "Artist deleted successfully" });
});
