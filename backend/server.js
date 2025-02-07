const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));



const db = new sqlite3.Database("aktuality.db", (err) => {
  if (err) console.error("Chyba připojení k databázi:", err);
  console.log("Připojeno k databázi");
});

db.run(`CREATE TABLE IF NOT EXISTS aktuality (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  image TEXT
)`);

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"));
      }
    },
  });
app.post("/aktuality", upload.single("image"), (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : "";
  
    const newAktualita = { id: Date.now(), title, description, image };
    aktuality.push(newAktualita);
    
    res.json(newAktualita);
  });

  app.use('/uploads', express.static('uploads'));
  app.get("/aktuality", (req, res) => {
  db.all("SELECT * FROM aktuality", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/aktuality", upload.single("image"), (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
  
    console.log("Uploaded image:", image); // Log the image path
  
    db.run(
      "INSERT INTO aktuality (title, description, image) VALUES (?, ?, ?)",
      [title, description, image],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, description, image });
      }
    );
  });

app.delete("/aktuality/:id", (req, res) => {
  db.run("DELETE FROM aktuality WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Aktualita smazána", id: req.params.id });
  });
});

app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});


app.post('/add-aktualita', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null; // Název obrázku

    const newAktualita = { id: Date.now(), title, content, image };
    aktuality.push(newAktualita);

    res.json(newAktualita);
});
