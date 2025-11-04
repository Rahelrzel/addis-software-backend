import { dbQuery } from "../middlewares/error.middleware.js";
import Album from "../models/album.js";
import HttpError from "../utils/HttpError.js";

export const createAlbum = dbQuery(async (req, res) => {
  const { name, releaseYear, artistId } = req.body;

  if (!name || !releaseYear || !artistId) {
    throw new HttpError({
      status: 400,
      message: "Name, release year, and artist ID are required",
    });
  }

  const album = new Album({
    name,
    releaseYear,
    artistId,
  });

  await album.save();
  res.status(201).json(album);
});

export const getAlbums = dbQuery(async (_req, res) => {
  const albums = await Album.find().populate("artistId", "name");
  res.status(200).json(albums);
});

export const getAlbumById = dbQuery(async (req, res) => {
  const album = await Album.findById(req.params.id).populate(
    "artistId",
    "name"
  );
  if (!album) throw new HttpError({ status: 404, message: "Album not found" });

  res.status(200).json(album);
});

export const updateAlbum = dbQuery(async (req, res) => {
  const { name, releaseYear, artistId } = req.body;

  const updatedFields = {
    ...(name && { name }),
    ...(releaseYear && { releaseYear }),
    ...(artistId && { artistId }),
  };

  const album = await Album.findByIdAndUpdate(req.params.id, updatedFields, {
    new: true,
  }).populate("artistId", "name");

  if (!album) throw new HttpError({ status: 404, message: "Album not found" });

  res.status(200).json(album);
});

export const deleteAlbum = dbQuery(async (req, res) => {
  const album = await Album.findByIdAndDelete(req.params.id);
  if (!album) throw new HttpError({ status: 404, message: "Album not found" });

  res.status(200).json({ message: "Album deleted successfully" });
});
