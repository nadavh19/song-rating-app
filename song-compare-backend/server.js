const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>🎧 Deezer Proxy is running.</h1>');
});


// Search album proxy
app.get('/api/search-album', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const deezerUrl = `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(deezerUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Deezer' });
  }
});

// Get album details proxy
app.get('/api/album/:id', async (req, res) => {
  const id = req.params.id;
  const deezerUrl = `https://api.deezer.com/album/${id}`;
  try {
    const response = await fetch(deezerUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch album' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Deezer Proxy listening on http://localhost:${PORT}`);
});
