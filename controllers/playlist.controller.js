import Playlist from "../models/playlist.js";
import Song from "../models/song.js";

// 🧱 Create a playlist
export const createPlaylist = async (req, res, next) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.create({ name, userId: req.user.id });
    res.status(201).json({ success: true, playlist });
  } catch (error) {
    next(error);
  }
};

// ➕ Add song to playlist
export const addSongToPlaylist = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);

    if (!playlist || !song) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist or song not found" });
    }

    playlist.songs.push(song._id);
    await playlist.save();

    res.json({ success: true, message: "Song added to playlist", playlist });
  } catch (error) {
    next(error);
  }
};

// 📋 Get all playlists for a user
export const getUserPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id }).populate(
      "songs"
    );
    res.json({ success: true, playlists });
  } catch (error) {
    next(error);
  }
};

// 🔥 Play a song (return its preview URL)
export const playSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Song.findById(songId);

    if (!song)
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });

    res.json({ success: true, previewUrl: song.preview_url });
  } catch (error) {
    next(error);
  }
};
