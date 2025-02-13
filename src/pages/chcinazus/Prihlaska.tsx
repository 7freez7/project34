import React, { useState, useEffect } from "react";
import axios from "axios";

interface DateSlot {
  date: string;
  location: string;
  times: string[];
}

const defaultTimes = [
  "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45",
  "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00"
];

const Prihlaska = () => {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<DateSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", surname: "", phone: "", note: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/admission-status").then((res) => {
      setIsAdmissionOpen(res.data.isOpen);
    });
  }, []);

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    axios.get(`http://localhost:5000/api/available-dates?field=${field}`).then((res) => {
      setAvailableDates(res.data.dates || []);
    });
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Vyberte datum a čas.");
      return;
    }

    const reservationData = {
      ...formData,
      field: selectedField,
      date: selectedDate,
      time: selectedTime,
    };

    axios.post("http://localhost:5000/api/submit-reservation", reservationData).then(() => {
      alert("Rezervace úspěšně odeslána!");
    });
  };

  return (
    <div>
      <h1>Přihláška</h1>
      {isAdmissionOpen ? (
        <div>
          <h2>Možnost rezervovat schůzku</h2>
          <label>Vyberte obor:</label>
          <select onChange={(e) => handleFieldSelect(e.target.value)}>
            <option value="">-- Vyberte --</option>
            <option value="TANECNI">Taneční</option>
            <option value="HUDEBNI">Hudební</option>
            <option value="VYTVARNY">Výtvarný</option>
          </select>
          {availableDates.length > 0 && (
            <div>
              <h3>Vyberte datum a čas:</h3>
              <input
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {selectedDate && (
                <div>
                  <h4>{selectedDate}</h4>
                  {defaultTimes.map((time) => (
                    <button key={time} onClick={() => setSelectedTime(time)}>
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <h3>Vaše údaje:</h3>
          <input
            type="text"
            placeholder="Jméno"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Příjmení"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telefon"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <textarea
            placeholder="Poznámka"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />
          <button onClick={handleSubmit}>Odeslat přihlášku</button>
        </div>
      ) : (
        <p>Přijímací řízení momentálně neprobíhá.</p>
      )}
    </div>
  );
};

export default Prihlaska;