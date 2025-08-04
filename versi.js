const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/versi.json', (req, res) => {
  res.json({
    versi: "1.3",
    url: "https://raw.githubusercontent.com/natasyatanjaya2/my-updater-api/main/public/ProgramToko.exe",
    files: [
      { path: "file_tambahan_1.dll" },
      { path: "folder/subfolder/file_tambahan_2.txt" }
    ]
  });
});


app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
