
import React, { useState, useEffect } from "react";
import axios from "axios";
import AktualitaForm from "./aktualitaForm";

const AdminAktuality: React.FC = () => {

  
  const [aktuality, setAktuality] = useState([]);
  const [editAktualita, setEditAktualita] = useState<null | number>(null);

  // Načítání aktualit z API
  useEffect(() => {
    const fetchAktuality = async () => {
      try {
        const response = await axios.get("/api/aktuality", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Ověření admina pomocí tokenu
          },
        });
        setAktuality(response.data);
      } catch (error) {
        console.error("Chyba při načítání aktualit:", error);
      }
    };

    fetchAktuality();
  }, []);

  // Funkce pro smazání aktuality
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/aktuality/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setAktuality((prevAktuality) =>
        prevAktuality.filter((aktualita) => aktualita.id !== id)
      );
      alert("Aktualita byla smazána.");
    } catch (error) {
      console.error("Chyba při mazání aktuality:", error);
      alert("Nastala chyba při mazání aktuality.");
    }
  };

  return (
    <div>
      <h1>Správa Aktualit</h1>
      <div> 
        {aktuality.map((aktualita) => (
          <div key={aktualita.id}>
            <h3>{aktualita.title}</h3>
            <button onClick={() => setEditAktualita(aktualita.id)}>Upravit</button>
            <button onClick={() => handleDelete(aktualita.id)}>Smazat</button>
          </div>
        ))}
      </div>

      {editAktualita !== null && (
        <AktualitaForm
          aktualita={aktuality.find((aktualita) => aktualita.id === editAktualita)}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default AdminAktuality;


