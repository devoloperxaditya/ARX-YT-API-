import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ YouTube to MP3/MP4 API is Running!");
});

// MP3 Download Endpoint
app.get("/mp3", async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) return res.status(400).send("Invalid URL");

  const info = await ytdl.getInfo(videoURL);
  const title = info.videoDetails.title;

  res.header("Content-Disposition", `attachment; filename=\"${title}.mp3\"`);

  ytdl(videoURL, {
    format: "mp3",
    filter: "audioonly",
    quality: "highestaudio"
  }).pipe(res);
});

// MP4 Download Endpoint
app.get("/mp4", async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) return res.status(400).send("Invalid URL");

  const info = await ytdl.getInfo(videoURL);
  const title = info.videoDetails.title;

  res.header("Content-Disposition", `attachment; filename=\"${title}.mp4\"`);

  ytdl(videoURL, {
    format: "mp4",
    filter: "videoandaudio",
    quality: "highest"
  }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});