const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Endpoint versi.json
app.get('/versi.json', (req, res) => {
  res.json({
    versi: "1.8",
    url: "",
    files: [
      {
        "nama": "bot-wa.zip",
        "url": "https://github.com/natasyatanjaya2/my-updater-api/raw/refs/heads/main/bot-wa.zip",
        "extractTo": "bot-wa"
      }
    ]
  });
});

// Jalankan server
app.listen(PORT, () => console.log(`✅ Server berjalan di ${PORT}`));






















