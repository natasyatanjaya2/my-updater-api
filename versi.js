const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/versi.json', (req, res) => {
  res.json({
    versi: "1.2",
    url: "https://link-download.exe",
    files: []
  });
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));