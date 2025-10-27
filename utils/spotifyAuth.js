import axios from "axios";

let spotifyToken = null;
let tokenExpiresAt = null;

export const getSpotifyToken = async () => {
  const now = Date.now();

  if (spotifyToken && tokenExpiresAt && now < tokenExpiresAt) {
    return spotifyToken; // still valid
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
        },
      }
    );

    spotifyToken = response.data.access_token;
    tokenExpiresAt = now + response.data.expires_in * 1000;

    return spotifyToken;
  } catch (error) {
    console.error(
      "Spotify auth failed:",
      error.response?.data || error.message
    );
    throw new Error("Spotify authentication failed");
  }
};
