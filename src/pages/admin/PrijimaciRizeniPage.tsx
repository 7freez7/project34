import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addWeeks, startOfWeek, endOfWeek, addDays, parseISO, isBefore } from "date-fns";
import { cs } from "date-fns/locale";
import Sidebar from "./sidebar";

interface Event {
  date: string;
  startTime: string;
  interval: number;
  endTime: string;
  city: string;
}

interface WeekRange {
  start: Date;
  end: Date;
}

const PrijimaciRizeniPage = () => {
  const [startDateForm, setStartDateForm] = useState<string>("");
  const [endDateForm, setEndDateForm] = useState<string>("");
  const [oborForm, setOborForm] = useState<string>("hudebni");
  const [startZapisForm, setStartZapisForm] = useState<string>("");
  const [endZapisForm, setEndZapisForm] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentWeek, setCurrentWeek] = useState<WeekRange>({ start: new Date(), end: new Date() });
  const [dateTo, setDateTo] = useState<string>("");
  const [casOd, setCasOd] = useState<string>("");
  const [casDo, setCasDo] = useState<string>("");
  const [casInterval, setCasInterval] = useState<number>(0);
  const [casMesto, setCasMesto] = useState<string>("");

  useEffect(() => {
    const weekRange = getWeekRange(new Date());
    setCurrentWeek(weekRange);
  }, []);

  const getWeekRange = (date: Date): WeekRange => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return { start, end };
  };

  const changeWeek = (offset: number): void => {
    const newWeek = getWeekRange(addWeeks(currentWeek.start, offset));
    setCurrentWeek(newWeek);
  };

  const getEventsForDate = (date: Date): Event[] => {
    return events
      .filter((event) => event.date === format(date, "yyyy-MM-dd"))
      .sort((a, b) => parseISO(`2000-01-01T${a.startTime}:00`).getTime() - parseISO(`2000-01-01T${b.startTime}:00`).getTime());
  };

  const addCasToArray = (dateTo: string, startTime: string, interval: number, endTime: string, city: string): void => {
    setEvents((prevEvents) => {
      const newEvent: Event = {
        date: dateTo,
        startTime: startTime,
        interval: interval,
        endTime: endTime,
        city: city,
      };
      return [...prevEvents, newEvent];
    });
  };

  const deleteEvent = (index: number): void => {
    setEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
  };

  const createPrijmaciRizeniLol = (): void => {
    if (events.length === 0) {
      alert("No events to submit.");
      return;
    }

    if (isBefore(new Date(startZapisForm), new Date(startDateForm))) {
      alert("Start zápis must be after or equal to the start date.");
      return;
    }

    const data = {
      start: startDateForm,
      end: endDateForm,
      obor: oborForm,
      start_zapis: startZapisForm,
      end_zapis: endZapisForm,
      dny: events,
    };

    const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
    if (!token) {
      console.error("Token not found");
      return;
    }

    const tokenValue = token.split("=")[1];

    fetch("http://localhost:8081/api/prihlasky/prijmacirizeni/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenValue,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Přijímací řízení úspěšně vytvořeno!");
      })
      .catch((error) => {
        console.error("Error creating prijimaci rizeni:", error);
        alert("Chyba při vytváření přijímacího řízení.");
      });
  };

  const clearCas = (): void => {
    setCasOd("");
    setCasDo("");
    setCasInterval(0);
    setCasMesto("");
  };

  // Validate time input (only numbers and colons)
  const validateTimeInput = (value: string): boolean => {
    const timeRegex = /^[0-9:]+$/;
    return timeRegex.test(value);
  };

  // Validate interval input (only numbers)
  const validateIntervalInput = (value: string): boolean => {
    const intervalRegex = /^[0-9]+$/;
    return intervalRegex.test(value);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="container mx-auto p-4 flex flex-col gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Přidat nové údaje</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start</label>
                <input
                  type="datetime-local"
                  className="p-2 border rounded w-full"
                  onChange={(e) => {
                    e.preventDefault();
                    setStartDateForm(e.target.value);
                    const weekRange = getWeekRange(new Date(e.target.value));
                    setCurrentWeek(weekRange);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End</label>
                <input
                  type="datetime-local"
                  className="p-2 border rounded w-full"
                  onChange={(e) => {
                    e.preventDefault();
                    setEndDateForm(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start zápis</label>
                <input
                  type="datetime-local"
                  className="p-2 border rounded w-full"
                  onChange={(e) => {
                    e.preventDefault();
                    setStartZapisForm(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End zápis</label>
                <input
                  type="datetime-local"
                  className="p-2 border rounded w-full"
                  onChange={(e) => {
                    e.preventDefault();
                    setEndZapisForm(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Obor</label>
                <select
                  className="p-2 border rounded w-full"
                  onChange={(e) => {
                    e.preventDefault();
                    setOborForm(e.target.value);
                  }}
                >
                  <option value="hudebni">Hudební</option>
                  <option value="vytvarny">Výtvarný</option>
                  <option value="tanecni">Taneční</option>
                </select>
              </div>
              <div className="text-sm font-medium mb-1 flex items-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    createPrijmaciRizeniLol();
                  }}
                  className="bg-black hover:bg-gray-800 text-white rounded-xl py-2 px-12 text-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
          <div className="custom-box bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-6">
              <button
                className="custom-left bg-black hover:bg-gray-800 text-white py-1 px-3 rounded"
                onClick={() => changeWeek(-1)}
              >
                Předchozí týden
              </button>
              <h1 className="text-xl font-semibold">
                {format(currentWeek.start, "d. MMM", { locale: cs })} –{" "}
                {format(currentWeek.end, "d. MMM yyyy", { locale: cs })}
              </h1>
              <button
                className="custom-right bg-black hover:bg-gray-800 text-white py-1 px-3 rounded"
                onClick={() => changeWeek(+1)}
              >
                Příští týden
              </button>
            </div>

            <div className="custom-table grid grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((offset) => {
                const date = addDays(currentWeek.start, offset);
                const eventsForDay = getEventsForDate(date);

                return (
                  <div className="custom-sloupec bg-gray-100 rounded p-2" key={date.toISOString()}>
                    <h2 className="text-lg font-medium">{format(date, "EEEE d. MMM", { locale: cs })}</h2>
                    <div
                      className="cursor-pointer text-center my-2"
                      onClick={() => {
                        clearCas();
                        setOpenModal(true);
                        setDateTo(format(date, "yyyy-MM-dd"));
                      }}
                    >
                      <span className="text-blue-600 font-bold">+</span>
                    </div>
                    {eventsForDay.map((event, index) => (
                      <div key={index} className="bg-white p-1 my-1 rounded shadow">
                        <p>{event.startTime}</p>
                        <p>Interval: {event.interval} min</p>
                        <p>{event.endTime}</p>
                        <p>{event.city}</p>
                        <button
                          onClick={() => deleteEvent(index)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mt-2"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {openModal && (
            <div className="custom-modalbox fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 p-4">
              <div className="bg-white rounded p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Vytvořit: {dateTo}</h1>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Od:</label>
                  <input
                    type="text"
                    placeholder="12:00"
                    className="w-full p-2 border rounded"
                    onChange={(e) => {
                      if (validateTimeInput(e.target.value)) {
                        setCasOd(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Do:</label>
                  <input
                    type="text"
                    placeholder="14:00"
                    className="w-full p-2 border rounded"
                    onChange={(e) => {
                      if (validateTimeInput(e.target.value)) {
                        setCasDo(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Interval:</label>
                  <input
                    type="text"
                    placeholder="0"
                    className="w-full p-2 border rounded"
                    onChange={(e) => {
                      if (validateIntervalInput(e.target.value)) {
                        setCasInterval(Number(e.target.value));
                      }
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Město:</label>
                  <input
                    type="text"
                    placeholder="Hradec Králové"
                    className="w-full p-2 border rounded"
                    onChange={(e) => {
                      e.preventDefault();
                      setCasMesto(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded"
                  >
                    Zrušit
                  </button>
                  <button
                    onClick={() => {
                      addCasToArray(dateTo, casOd, casInterval, casDo, casMesto);
                      setOpenModal(false);
                    }}
                    className="bg-black hover:bg-gray-800 text-white py-1 px-3 rounded"
                  >
                    Vytvořit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrijimaciRizeniPage;