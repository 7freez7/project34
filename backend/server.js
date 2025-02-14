import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { addReservation, getAvailableDates } from "./reservations.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Připojení k databázi
const dbPromise = open({
  filename: "./database.sqlite",
  driver: sqlite3.Database,
});

// Inicializace tabulky, pokud neexistuje
dbPromise.then((db) => {
  db.run(`CREATE TABLE IF NOT EXISTS aktuality (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    date TEXT,
    category TEXT
  )`);
});

// Middleware pro získání přístupu k databázi
app.use(async (req, res, next) => {
  req.db = await dbPromise;
  next();
});

// Nastavení pro nahrávání obrázků
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
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

// Přidání aktuality
app.post("/aktuality", upload.single("image"), async (req, res) => {
  const { title, description, date, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const db = await req.db;
    const result = await db.run(
      "INSERT INTO aktuality (title, description, image, date, category) VALUES (?, ?, ?, ?, ?)",
      [title, description, image, date, category]
    );

    res.json({ id: result.lastID, title, description, image, date, category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Získání všech aktualit
app.get("/aktuality", async (req, res) => {
  try {
    const db = await req.db;
    const rows = await db.all("SELECT * FROM aktuality");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aktualizace aktuality
app.put("/aktuality/:id", upload.single("image"), async (req, res) => {
  const { title, description, date, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  try {
    const db = await req.db;
    await db.run(
      "UPDATE aktuality SET title = ?, description = ?, image = ?, date = ?, category = ? WHERE id = ?",
      [title, description, image, date, category, req.params.id]
    );

    res.json({ id: req.params.id, title, description, image, date, category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Smazání aktuality
app.delete("/aktuality/:id", async (req, res) => {
  try {
    const db = await req.db;
    await db.run("DELETE FROM aktuality WHERE id = ?", req.params.id);
    res.json({ message: "Aktualita smazána", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpointy pro rezervace
app.get("/api/admission-status", (req, res) => {
  res.json({ isOpen: true });
});

app.get("/api/available-dates", (req, res) => {
  const field = req.query.field;
  getAvailableDates(field, (err, dates) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ dates });
  });
});

app.post("/api/submit-reservation", (req, res) => {
  const reservation = req.body;
  addReservation(reservation, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Spuštění serveru
app.listen(port, () => {
  console.log(`Server běžííí na http://localhost:${port}`);
});