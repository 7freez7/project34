// server.js (ESM verze)

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs-extra";
import path from "path";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ===== CONFIG =====
const DATA_DIR = path.join(__dirname, "data");
const NEWS_FILE = path.join(DATA_DIR, "news.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

const JWT_SECRET = process.env.JWT_SECRET || "change_me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "filaa.07cz@gmail.com";

// ===== Helper funkce =====
async function readJson(file, fallback) {
  try {
    await fs.ensureFile(file);
    const content = await fs.readFile(file, "utf8");
    return content ? JSON.parse(content) : fallback;
  } catch (err) {
    console.error("readJson error:", err);
    return fallback;
  }
}

async function writeJson(file, data) {
  await fs.outputFile(file, JSON.stringify(data, null, 2));
}

// ===== AUTH =====
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
    return res.json({ token });
  }
  res.status(401).json({ message: "Neplatné heslo" });
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Chybí autorizace" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ message: "Zakázáno" });
    }
    next();
  } catch (e) {
    res.status(401).json({ message: "Neplatný token" });
  }
}

// ===== NEWS ENDPOINTS =====
app.get("/api/news", async (req, res) => {
  const news = await readJson(NEWS_FILE, []);
  res.json(news);
});

app.post("/api/admin/news", authMiddleware, async (req, res) => {
  const { title, text, date } = req.body;
  const news = await readJson(NEWS_FILE, []);
  const item = { id: uuidv4(), title, text, date: date || new Date().toISOString() };
  news.unshift(item);
  await writeJson(NEWS_FILE, news);
  res.json(item);
});

app.delete("/api/admin/news/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  let news = await readJson(NEWS_FILE, []);
  news = news.filter(n => n.id !== id);
  await writeJson(NEWS_FILE, news);
  res.json({ ok: true });
});

// ===== CONTENT ENDPOINTS =====
app.get("/api/content", async (req, res) => {
  const content = await readJson(CONTENT_FILE, {});
  res.json(content);
});

app.put("/api/admin/content/:key", authMiddleware, async (req, res) => {
  const key = req.params.key;
  const { value } = req.body;
  const content = await readJson(CONTENT_FILE, {});
  content[key] = value;
  await writeJson(CONTENT_FILE, content);
  res.json({ key, value });
});

// ===== CONTACT FORM (EMAIL) =====
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !message) return res.status(400).json({ message: "Chybí jméno nebo zpráva" });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Web" <${process.env.SMTP_USER}>`,
    to: CONTACT_TO,
    subject: `Nová zpráva od ${name}`,
    text: `Jméno: ${name}\nEmail: ${email}\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true });
  } catch (error) {
    console.error("Chyba emailu:", error);
    res.status(500).json({ message: "Chyba odesílání" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server běží na portu ${PORT}`));
