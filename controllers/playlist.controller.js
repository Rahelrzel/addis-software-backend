// controllers/playlistController.js
import Playlist from "../models/playlist.js";

// Create a new playlist
export const createPlaylist = async (req, res, next) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.create({ name, userId: req.user?.id });
    res.status(201).json({ success: true, playlist });
  } catch (error) {
    next(error);
  }
};

// Add a song from Spotify results
export const addSongToPlaylist = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const song = req.body; // expect a Spotify song object

    const playlist = await Playlist.findById(playlistId);
    if (!playlist)
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found" });

    playlist.songs.push(song);
    await playlist.save();

    res.status(200).json({ success: true, playlist });
  } catch (error) {
    next(error);
  }
};

// Get all playlists
export const getPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ userId: req.user?.id });
    res.json({ success: true, playlists });
  } catch (error) {
    next(error);
  }
};

// Get one playlist
export const getPlaylistById = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist)
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found" });
    res.json({ success: true, playlist });
  } catch (error) {
    next(error);
  }
};
