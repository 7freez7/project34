import React, { useState, useEffect } from "react";
import axios from "axios";

interface DateSlot {
  date: string;
  location: string;
  times: string[]; // Očekáváme pole časů jako řetězce
}

const Prihlaska = () => {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<DateSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [formData, setFormData] = useState({ jmeno: "", datumNarozeni: "", rodicTel: "", obor: "", schuzka: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/admission-status")
      .then((res) => {
        setIsAdmissionOpen(res.data.isOpen);
      })
      .catch((error) => {
        console.error("Error fetching admission status:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/prihlasky/tdata")
      .then((res) => {
        const dates: DateSlot[] = Object.entries(res.data).map(([date, value]) => {
          const [location, timesString] = (value as string).split(",[");
          const times = timesString.replace("]", "").split(" ").map((t) => t.split(";")[0]);
          return { date, location, times };
        });
        setAvailableDates(dates);
      })
      .catch((error) => {
        console.error("Error fetching available dates:", error);
      });
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    const selectedDateData = availableDates.find(d => d.date === date);
    if (selectedDateData) {
      setSelectedLocation(selectedDateData.location);
    }
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedLocation) {
      alert("Vyberte datum, čas a město.");
      return;
    }

    const reservationData = {
      ...formData,
      obor: selectedField,
      schuzka: `${selectedDate} ${selectedTime} ${selectedLocation}`,
    };

    axios.post("http://localhost:5000/api/submit-reservation", reservationData)
      .then(() => {
        alert("Rezervace úspěšně odeslána!");
      })
      .catch((error) => {
        console.error("Error submitting reservation:", error);
      });
  };

  return (
    <div className="prihlaska-container">
      <h1>Přihláška</h1>
      {isAdmissionOpen ? (
        <div className="form-container">
          <h2>Možnost rezervovat schůzku</h2>
          <label>Vyberte obor:</label>
          <select onChange={(e) => setSelectedField(e.target.value)} className="field-select">
            <option value="">-- Vyberte --</option>
            <option value="TANECNI">Taneční</option>
            <option value="HUDEBNI">Hudební</option>
            <option value="VYTVARNY">Výtvarný</option>
          </select>
          {availableDates.length > 0 && (
            <div className="date-time-container">
              <h3>Vyberte datum a čas:</h3>
              <select onChange={(e) => handleDateSelect(e.target.value)} className="date-picker">
                <option value="">-- Vyberte datum --</option>
                {availableDates.map((date) => (
                  <option key={date.date} value={date.date}>{date.date} ({date.location})</option>
                ))}
              </select>
              {selectedDate && (
                <div className="time-buttons">
                  <h4>{selectedDate} - {selectedLocation}</h4>
                  {availableDates
                    .find((date) => date.date === selectedDate)
                    ?.times.map((time) => {
                      if (typeof time === "string") { // Ujistíme se, že time je string
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`time-button ${selectedTime === time ? 'selected-time-button' : ''}`}
                          >
                            {time}
                          </button>
                        );
                      }
                      return null; // Pokud 'time' není string, nebudeme jej vykreslovat
                    })}
                </div>
              )}
            </div>
          )}
          <h3>Vaše údaje:</h3>
          <p>Jméno</p>
          <input
            type="text"
            placeholder="Jméno"
            value={formData.jmeno}
            onChange={(e) => setFormData({ ...formData, jmeno: e.target.value })}
            className="input-field"
          />
          <p>Datum narození</p>
          <input
            type="date"
            placeholder="Datum narození"
            value={formData.datumNarozeni}
            onChange={(e) => setFormData({ ...formData, datumNarozeni: e.target.value })}
            className="input-field"
          />
          <p>Telefon rodiče</p>
          <input
            type="text"
            placeholder="Telefon rodiče"
            value={formData.rodicTel}
            onChange={(e) => setFormData({ ...formData, rodicTel: e.target.value })}
            className="input-field"
          />
          <button onClick={handleSubmit} className="submit-button">Odeslat přihlášku</button>
        </div>
      ) : (
        <p>Přijímací řízení momentálně neprobíhá.</p>
      )}
    </div>
  );
};

export default Prihlaska;
