// index.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Change this to match your ESP32 IP
const ESP32_IP = 'http://192.168.120.2';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ESP32 Bridge Server Running');
});

app.post('/alarm', async (req, res) => {
  try {
    const response = await fetch(`${ESP32_IP}/alarm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).send('Error forwarding to ESP32: ' + error.message);
  }
});

app.post('/light', async (req, res) => {
  try {
    const response = await fetch(`${ESP32_IP}/light`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).send('Error forwarding to ESP32: ' + error.message);
  }
});

app.get('/status', async (req, res) => {
  try {
    const response = await fetch(`${ESP32_IP}/status`, {
      method: 'GET' });
    const json = await response.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(500).send('ESP32 is offline: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Bridge server running on port ${PORT}`);
});
