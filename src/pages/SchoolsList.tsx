import React, { useState, useEffect } from "react";
import axios from "axios";

interface RootObject {
  data: Datum[];
  skip: number;
  count: number;
  limit: number;
  info: Info;
}

interface Info {
  provider: string;
}

interface Datum {
  RedIzo: string;
  ICO: string;
  Reditelstvi: Reditelstvi;
  SkolyZarizeni: SkolyZarizeni;
}

interface SkolyZarizeni {
  SkolaZarizeni: SkolaZarizeni[];
}

interface SkolaZarizeni {
  IZO: string;
  SkolaJazyk: string;
  SkolaDruhTyp: string;
  SkolaKapacita: string;
  SkolaPlnyNazev: string;
  SkolaDatumZapisu: string;
  SkolaDatumZahajeni: string;
  SkolaOboryVzdelani: string;
  SkolaKapacitaJednotka: string;
  SkolaMistaVykonuCinnosti: SkolaMistaVykonuCinnosti;
}

interface SkolaMistaVykonuCinnosti {
  SkolaMistoVykonuCinnosti: SkolaMistoVykonuCinnosti;
}

interface SkolaMistoVykonuCinnosti {
  IDMista: string;
  MistoAdresa1: string;
  MistoAdresa2: string;
  MistoAdresa3: string;
  MistoDruhTyp: string;
  MistoRUAINKod: string;
}

interface Reditelstvi {
  RedPlnyNazev: string;
  RedZkracenyNazev: string;
  RedRUAINKod: string;
  RedAdresa1: string;
  RedAdresa2: string;
  RedAdresa3: string;
  PravniForma: string;
  DruhZrizovatele: string;
  Okres: string;
  ORP: string;
  Email1: string;
  Email2: string;
  DobaZrizeniSubjektu: string;
  Reditel: Reditel;
}

interface Reditel {
  ReditelJmeno: string;
  ReditelAdresa1?: string;
  ReditelAdresa2?: string;
  ReditelAdresa3?: string;
  ReditelJeStatutar: string;
}

const SchoolsList: React.FC = () => {
  const [schools, setSchools] = useState<Datum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchools = async () => {
    try {
      const apiKey = "4FLqmQqUV29Nl3BlTb9it2KAyqMP2UYp1NVgGExR"; // APIna

      const response = await axios.get<RootObject>("https://api.store/czechia-api/skoly/", {
        params: {
          mesto: "Praha",
          typ: "střední",
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${apiKey}`, 
        },
      });

      console.log("API odpověď:", response.data); 
      setSchools(response.data.data);
    } catch (err: any) {
      console.error("Chyba při načítání dat:", err.message);
      console.error("Detail chyby:", err.response || err); // Podívejte se, co API vrací

      setError("Chyba při načítání dat. Zkuste to prosím později.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div>
      <h1>Seznam škol</h1>

      {loading && <p>Načítání dat...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && schools.length === 0 && <p>Nebyly nalezeny žádné školy.</p>}

      <ul>
        {schools.map((school, index) => (
          <li key={index}>
            <strong>{school.SkolyZarizeni.SkolaZarizeni[0].SkolaPlnyNazev}</strong>
            <p>{school.SkolyZarizeni.SkolaZarizeni[0].SkolaJazyk}</p>
            <p>Typ: {school.SkolyZarizeni.SkolaZarizeni[0].SkolaDruhTyp}</p>
            <p>Kapacita: {school.SkolyZarizeni.SkolaZarizeni[0].SkolaKapacita}</p>
            <p>Datum zahájení: {school.SkolyZarizeni.SkolaZarizeni[0].SkolaDatumZahajeni}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolsList;
