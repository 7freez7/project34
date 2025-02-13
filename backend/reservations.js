import sqlite3 from "sqlite3";

const db = new sqlite3.Database("aktuality.db", (err) => {
  if (err) console.error("Chyba připojení k databázi:", err);
  console.log("Připojeno k databázi");
});

db.run(`CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  field TEXT,
  date TEXT,
  time TEXT
)`);

export const addReservation = (reservation, callback) => {
  const { name, phone, field, date, time } = reservation;
  db.run(
    "INSERT INTO reservations (name, phone, field, date, time) VALUES (?, ?, ?, ?, ?)",
    [name, phone, field, date, time],
    function (err) {
      if (err) {
        console.error("Chyba při ukládání rezervace:", err);
        return callback(err);
      }
      console.log("Nová rezervace:", reservation);
      callback(null, { success: true, id: this.lastID });
    }
  );
};

export const getAvailableDates = (field, callback) => {
  const dates = [
    { date: "23.1.2025", location: "Hradec Králové", times: ["08:00", "08:15", "08:30", "08:45"] },
    { date: "24.1.2025", location: "Praha", times: ["09:00", "09:15", "09:30", "09:45"] },
  ];
  const availableDates = dates.filter(d => d.location === (field === "TANECNI" ? "Hradec Králové" : "Praha"));
  callback(null, availableDates);
};