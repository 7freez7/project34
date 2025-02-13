import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { addReservation, getAvailableDates } from "./reservations.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.post("/aktuality", upload.single("image"), (req, res) => {
  const { title, description, date, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  db.run(
    "INSERT INTO aktuality (title, description, image, date, category) VALUES (?, ?, ?, ?, ?)",
    [title, description, image, date, category],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, description, image, date, category });
    }
  );
});

app.get("/aktuality", (req, res) => {
  db.all("SELECT * FROM aktuality", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.put("/aktuality/:id", upload.single("image"), (req, res) => {
  const { title, description, date, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  db.run(
    "UPDATE aktuality SET title = ?, description = ?, image = ?, date = ?, category = ? WHERE id = ?",
    [title, description, image, date, category, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, title, description, image, date, category });
    }
  );
});

app.delete("/aktuality/:id", (req, res) => {
  db.run("DELETE FROM aktuality WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Aktualita smazána", id: req.params.id });
  });
});

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

app.listen(port, () => {
  console.log(`Server je ted na http://localhost:${port}`);
});