import Playlist from "../models/playlist.js";
import Song from "../models/song.js";

// CREATE PLAYLIST
export const createPlaylist = async (req, res) => {
  try {
    const playlist = new Playlist({ ...req.body, userId: req.user.id });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PLAYLISTS
export const getPlaylists = async (req, res) => {
  try {
    const query = {};
    if (req.query.name) query.name = { $regex: req.query.name, $options: "i" };
    if (req.query.description)
      query.description = { $regex: req.query.description, $options: "i" };

    const playlists = await Playlist.find(query)
      .populate("songs", "title artist album genre")
      .populate("userId", "username email");
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE PLAYLIST
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate("songs", "title artist album genre")
      .populate("userId", "username email");

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PLAYLIST
export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE PLAYLIST
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    // Remove playlist reference from songs
    await Song.updateMany(
      { playlistId: playlist._id },
      { $unset: { playlistId: "" } }
    );

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PLAYLIST STATISTICS
export const getPlaylistStats = async (req, res) => {
  try {
    const totalPlaylists = await Playlist.countDocuments();

    const playlistsWithMostSongs = await Playlist.aggregate([
      { $project: { name: 1, songsCount: { $size: "$songs" } } },
      { $sort: { songsCount: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({ totalPlaylists, playlistsWithMostSongs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADD SONG TO PLAYLIST
export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    // Find playlist and song
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: "Song not found" });

    // Add song to playlist if not already there
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    // Ensure song knows which playlist it belongs to
    if (!song.playlistId || song.playlistId.toString() !== playlistId) {
      song.playlistId = playlistId;
      await song.save();
    }

    // ✅ Populate songs before sending response
    const updatedPlaylist = await Playlist.findById(playlistId)
      .populate("songs") // <-- populate all song fields
      .populate("userId", "username email");

    res.status(200).json(updatedPlaylist);
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).json({ error: error.message });
  }
};

// REMOVE SONG FROM PLAYLIST
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: "Song not found" });

    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
    await playlist.save();

    // Remove playlistId from song
    if (song.playlistId?.toString() === playlistId) {
      song.playlistId = null;
      await song.save();
    }

    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
