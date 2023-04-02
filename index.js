const express = require('express');
const startServer = require('./init/Server');
const cors = require('cors');

const app = startServer();

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3000/',
      'http://localhost:19006/',
      'http://localhost:19006',
    ],
    credentials: true,
  })
);

app.use('/test', (req, res) => {
  res.send('Hello World!');
});

// Spotify
const SpotifyRoutes = require('./routes/SpotifyRoutes');
app.use('/auth', SpotifyRoutes);
