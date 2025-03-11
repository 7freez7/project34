import React, { useState, useEffect } from "react";

interface DateSlot {
  date: string;
  location: string;
  times: string[];
}

interface Data {
  tDates: string[];
  tTimes: string[][]; 
  tCities: string[];
  vDates: string[];
  vTimes: string[][]; 
  vCities: string[];
  hDates: string[];
  hTimes: string[][]; 
  hCities: string[];
}

const Prihlaska = () => {
  const [primackyProbiha, setPrimackyProbiha] = useState(false);
  const [selectedField, setSelectedField] = useState<string>(""); 
  const [availableDates, setAvailableDates] = useState<DateSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [tData, setTData] = useState<{ tDates: string[], tTimes: string[][], tCities: string[] } | null>(null);
  const [vData, setVData] = useState<{ vDates: string[], vTimes: string[][], vCities: string[] } | null>(null);
  const [hData, setHData] = useState<{ hDates: string[], hTimes: string[][], hCities: string[] } | null>(null);
  const [formData, setFormData] = useState({
    jmeno: "",
    datumNarozeni: "",
    rodicTel: "",
    emailRodic: "",
    obor: "",
    schuzka: "",
  });

  useEffect(() => {
    // Check if admission is open
    (async () => {
      try {
        const response = await fetch("https://preview.zushm.cz/api/prihlasky/valid");
        const data = await response.json();
        if (data.message === "Primacky probihaji") {
          setPrimackyProbiha(true);
        }
      } catch (error) {
        console.error("Error fetching admission status:", error);
      }
    })();
  }, []);

  useEffect(() => {
    // Fetch tdata
    fetch('https://preview.zushm.cz/api/prihlasky/tdata')
      .then(response => response.json())
      .then(data => {
        const tDates: string[] = [];
        const tTimes: string[][] = [];
        const tCities: string[] = [];

        Object.keys(data).forEach(date => {
          const [time1, time2, city] = data[date].split(",");
          tDates.push(date);
          tTimes.push([time1, time2]);
          tCities.push(city);
        });

        setTData({ tDates, tTimes, tCities });
      })
      .catch(error => console.error('Error fetching tdata:', error));

    // Fetch vdata
    fetch('https://preview.zushm.cz/api/prihlasky/vdata')
      .then(response => response.json())
      .then(data => {
        const vDates: string[] = [];
        const vTimes: string[][] = [];
        const vCities: string[] = [];

        Object.keys(data).forEach(date => {
          const [time1, time2, city] = data[date].split(",");
          vDates.push(date);
          vTimes.push([time1, time2]);
          vCities.push(city);
        });

        setVData({ vDates, vTimes, vCities });
      })
      .catch(error => console.error('Error fetching vdata:', error));

    // Fetch hdata
    fetch('https://preview.zushm.cz/api/prihlasky/hdata')
      .then(response => response.json())
      .then(data => {
        const hDates: string[] = [];
        const hTimes: string[][] = [];
        const hCities: string[] = [];

        Object.keys(data).forEach(date => {
          const [time1, time2, city] = data[date].split(",");
          hDates.push(date);
          hTimes.push([time1, time2]);
          hCities.push(city);
        });

        setHData({ hDates, hTimes, hCities });
      })
      .catch(error => console.error('Error fetching hdata:', error));
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    const selectedDateData = availableDates.find((d) => d.date === date);
    if (selectedDateData) {
      setSelectedLocation(selectedDateData.location);
    }
    console.log("Selected Date:", date); // Log selected date
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    console.log("Selected Time:", time); // Log selected time
  };

  const handleSubmit = () => {
    return;
  };

  const renderData = () => {
    if (selectedField === 'TANECNI' && tData) {
      return (
        <div>
          {tData.tDates.map((date, index) => (
            <div key={date}>
              <h3>{date}</h3>
              {tData.tTimes[index].map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)} // Call handleTimeSelect
                  className={`time-button ${selectedTime === time ? 'selected-time-button' : ''}`}
                >
                  {time}
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (selectedField === 'HUDEBNI' && vData) {
      return (
        <div>
          {vData.vDates.map((date, index) => (
            <div key={date}>
              <h3>{date}</h3>
              {vData.vTimes[index].map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)} // Call handleTimeSelect
                  className={`time-button ${selectedTime === time ? 'selected-time-button' : ''}`}
                >
                  {time}
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (selectedField === 'VYTVARNY' && hData) {
      return (
        <div>
          {hData.hDates.map((date, index) => (
            <div key={date}>
              <h3>{date}</h3>
              {hData.hTimes[index].map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)} // Call handleTimeSelect
                  className={`time-button ${selectedTime === time ? 'selected-time-button' : ''}`}
                >
                  {time}
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="prihlaska-container">
      <h1>Přihláška</h1>
      {primackyProbiha ? (
        <div className="form-container">
          <h2>Možnost rezervovat schůzku</h2>
          <label>Vyberte obor:</label>
          <select onChange={(e) => setSelectedField(e.target.value)} className="field-select">
            <option value="">-- Vyberte --</option>
            <option value="TANECNI">Taneční</option>
            <option value="HUDEBNI">Hudební</option>
            <option value="VYTVARNY">Výtvarný</option>
          </select>

          <div>
            {renderData()}
          </div>

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
          <p>Zákonný zástupce</p>
          <input
            type="text"
            placeholder="Telefon"
            value={formData.rodicTel}
            onChange={(e) => setFormData({ ...formData, rodicTel: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Email"
            value={formData.rodicTel}
            onChange={(e) => setFormData({ ...formData, emailRodic: e.target.value })}
            className="input-field"
          />
          <button onClick={handleSubmit} className="submit-button">
            Odeslat přihlášku
          </button>
        </div>
      ) : (
        <h1>Primacky neprobihaji</h1>
      )}
    </div>
  );
};

export default Prihlaska;