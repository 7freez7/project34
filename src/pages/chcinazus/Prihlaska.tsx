import React, { useState, useEffect } from "react";
import axios from "axios";

interface DateSlot {
  date: string;
  location: string;
  times: string[];
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
    axios.get("http://localhost:5000/api/admission-status").then((res) => {
      setIsAdmissionOpen(res.data.isOpen);
    }).catch((error) => {
      console.error("Error fetching admission status:", error);
    });
  }, []);

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    axios.get(`http://localhost:8080/api/prihlasky/vdata`).then((res) => {
      const dates = Object.entries(res.data).map(([date, value]) => {
        const [location, times] = (value as string).split(",[");
        return { date, location, times: times.replace("]", "").split(" ").filter((time: string) => !time.includes(";0")) };
      });
      setAvailableDates(dates);
    }).catch((error) => {
      console.error("Error fetching available dates:", error);
    });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    axios.get(`http://localhost:8080/api/prihlasky/hdata`).then((res) => {
      const dateData = res.data[date];
      if (dateData) {
        const [location, times] = dateData.split(",[");
        setSelectedLocation(location);
        setAvailableDates([{ date, location, times: times.replace("]", "").split(" ").filter((time: string) => !time.includes(";0")) }]);
      }
    }).catch((error) => {
      console.error("Error fetching date data:", error);
    });
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

    axios.post("http://localhost:5000/api/submit-reservation", reservationData).then(() => {
      alert("Rezervace úspěšně odeslána!");
    }).catch((error) => {
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
          <select onChange={(e) => handleFieldSelect(e.target.value)} className="field-select">
            <option value="">-- Vyberte --</option>
            <option value="TANECNI">Taneční</option>
            <option value="HUDEBNI">Hudební</option>
            <option value="VYTVARNY">Výtvarný</option>
          </select>
          {availableDates.length > 0 && (
            <div className="date-time-container">
              <h3>Vyberte datum a čas:</h3>
              <input
                type="date"
                onChange={(e) => handleDateSelect(e.target.value)}
                className="date-picker"
              />
              {selectedDate && (
                <div className="time-buttons">
                  <h4>{selectedDate}</h4>
                  {availableDates
                    .filter((date) => date.date === selectedDate)
                    .map((date) => (
                      <div key={date.date}>
                        <h4>{date.location}</h4>
                        {date.times.map((time) => (
                          <button
                            key={time}
                            onClick={() => {
                              setSelectedTime(time);
                              setSelectedLocation(date.location);
                            }}
                            className={`time-button ${selectedTime === time ? 'selected-time-button' : ''}`}
                          >
                            {time.split(";")[0]}
                          </button>
                        ))}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
          <h3>Vaše údaje:</h3>
          <input
            type="text"
            placeholder="Jméno"
            value={formData.jmeno}
            onChange={(e) => setFormData({ ...formData, jmeno: e.target.value })}
            className="input-field"
          />
          <input
            type="date"
            placeholder="Datum narození"
            value={formData.datumNarozeni}
            onChange={(e) => setFormData({ ...formData, datumNarozeni: e.target.value })}
            className="input-field"
          />
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