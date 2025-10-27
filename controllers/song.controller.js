import Song from "../models/song.js";

// CREATE SONG
export const createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL SONGS (with optional search/filter)
export const getSongs = async (req, res) => {
  try {
    const query = {};
    if (req.query.title)
      query.title = { $regex: req.query.title, $options: "i" };
    if (req.query.artist)
      query.artist = { $regex: req.query.artist, $options: "i" };
    if (req.query.album)
      query.album = { $regex: req.query.album, $options: "i" };
    if (req.query.genre)
      query.genre = { $regex: req.query.genre, $options: "i" };

    const songs = await Song.find(query);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE SONG
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE SONG
export const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE SONG
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.status(200).json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STATISTICS
export const getStats = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();

    const songsByGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
    ]);

    const artistStats = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songs: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
    ]);

    res.status(200).json({ totalSongs, songsByGenre, artistStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
