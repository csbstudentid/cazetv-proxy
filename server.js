const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

const CAZETV_URL = 'https://www.youtube.com/channel/UC_Knt8B6Z7Xon0XUep88VTw/live';

app.get('/live-stream.m3u8', (req, res) => {
    exec(`npx yt-dlp -g -f b ${CAZETV_URL}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Stream fetch failed' });
        }
        const directStreamUrl = stdout.trim();
        res.redirect(directStreamUrl);
    });
});

app.get('/', (req, res) => {
    res.send('CSB Brazil Proxy Server is Running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
