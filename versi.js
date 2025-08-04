const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Folder tempat file update disimpan (public)
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Endpoint versi.json
app.get('/versi.json', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`; // URL otomatis Railway

  res.json({
    versi: "1.4",
    url: "https://github.com/natasyatanjaya2/my-updater-api/releases/latest/download/ProgramToko.exe",
    files: [
      { path: `${baseUrl}/filetambahan.dll` },
      { path: `${baseUrl}/filetambahan2.txt` }
    ]
  });
});

// Jalankan server
app.listen(PORT, () => console.log(`✅ Server berjalan di ${PORT}`));

