import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Aktuality.css";

interface Aktualita {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Aktuality: React.FC = () => {
  const [aktuality, setAktuality] = useState<Aktualita[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [editingAktualita, setEditingAktualita] = useState<Aktualita | null>(null);
  const [newAktualita, setNewAktualita] = useState<Aktualita>({
    id: 0,
    title: "",
    description: "",
    image: "",
  });

  // Načtení dat z backendu pomocí proxy
  const fetchAktuality = async () => {
    try {
      const response = await axios.get("/aktuality");  // Používání proxy
      setAktuality(response.data);
    } catch (error) {
      console.error("Chyba při načítání aktualit:", error);
    }
  };

  const handleAdd = async () => {
    if (newAktualita.title && newAktualita.description && newAktualita.image) {
      try {
        const response = await axios.post("/aktuality", newAktualita);
        setAktuality([...aktuality, response.data]);
        setNewAktualita({ id: 0, title: "", description: "", image: "" });
      } catch (error) {
        console.error("Chyba při přidávání aktuality:", error);
      }
    }
  };

  const handleSave = async () => {
    if (editingAktualita) {
      try {
        await axios.put(`/aktuality/${editingAktualita.id}`, editingAktualita);
        setAktuality(
          aktuality.map((akt) =>
            akt.id === editingAktualita.id ? editingAktualita : akt
          )
        );
        setEditingAktualita(null);
      } catch (error) {
        console.error("Chyba při úpravě aktuality:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/aktuality/${id}`);
      setAktuality(aktuality.filter((akt) => akt.id !== id));
    } catch (error) {
      console.error("Chyba při mazání aktuality:", error);
    }
  };

  useEffect(() => {
    fetchAktuality();
  }, []);

  return (
    <div className="aktuality-container">
      {aktuality.map((akt) => (
        <div className="aktualita" key={akt.id}>
          <img src={akt.image} alt={akt.title} />
          <div className="aktualita-content">
            <h3>{akt.title}</h3>
            <p>{akt.description}</p>
            {isAdmin && (
              <div className="admin-controls">
                <button onClick={() => setEditingAktualita(akt)}>Upravit</button>
                <button onClick={() => handleDelete(akt.id)}>Smazat</button>
              </div>
            )}
          </div>
        </div>
      ))}

      {isAdmin && (
        <div className="admin-panel">
          <h3>{editingAktualita ? "Upravit aktualitu" : "Přidat aktualitu"}</h3>
          <input
            type="text"
            placeholder="Název"
            value={editingAktualita ? editingAktualita.title : newAktualita.title}
            onChange={(e) =>
              editingAktualita
                ? setEditingAktualita({
                    ...editingAktualita,
                    title: e.target.value,
                  })
                : setNewAktualita({ ...newAktualita, title: e.target.value })
            }
          />
          <textarea
            placeholder="Popis"
            value={editingAktualita ? editingAktualita.description : newAktualita.description}
            onChange={(e) =>
              editingAktualita
                ? setEditingAktualita({
                    ...editingAktualita,
                    description: e.target.value,
                  })
                : setNewAktualita({ ...newAktualita, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="URL obrázku"
            value={editingAktualita ? editingAktualita.image : newAktualita.image}
            onChange={(e) =>
              editingAktualita
                ? setEditingAktualita({
                    ...editingAktualita,
                    image: e.target.value,
                  })
                : setNewAktualita({ ...newAktualita, image: e.target.value })
            }
          />
          <button onClick={editingAktualita ? handleSave : handleAdd}>
            {editingAktualita ? "Uložit" : "Přidat"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Aktuality;
