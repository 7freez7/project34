import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Aktuality.css";

interface Aktualita {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

const Aktuality: React.FC = () => {
  const [aktuality, setAktuality] = useState<Aktualita[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [editingAktualita, setEditingAktualita] = useState<Aktualita | null>(null);
  const [newAktualita, setNewAktualita] = useState<Omit<Aktualita, "id">>({
    title: "",
    description: "",
    image: "",
    date: "",
    category: "hudební",
  });

  useEffect(() => {
    fetchAktuality();
  }, []);

  const fetchAktuality = async () => {
    try {
      const response = await axios.get("http://localhost:5000/aktuality");
      console.log(response.data); // Debugování, jestli se obrázek správně vrací
      setAktuality(response.data);
    } catch (error) {
      console.error("Chyba při načítání aktualit:", error);
    }
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]); // Uložíme soubor
    }
  };

  const handleAdd = async () => {
    if (newAktualita.title && newAktualita.description && selectedFile) {
      try {
        const formData = new FormData();
        formData.append("title", newAktualita.title);
        formData.append("description", newAktualita.description);
        formData.append("image", selectedFile); // Přidání souboru
        formData.append("date", newAktualita.date);
        formData.append("category", newAktualita.category);
  
        const response = await axios.post("http://localhost:5000/aktuality", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        setAktuality([...aktuality, response.data]);
        setNewAktualita({ title: "", description: "", image: "", date: "", category: "hudební" });
        setSelectedFile(null);
      } catch (error) {
        console.error("Chyba při přidávání aktuality:", error);
      }
    }
  }; 

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/aktuality/${id}`);
      setAktuality(aktuality.filter((akt) => akt.id !== id));
    } catch (error) {
      console.error("Chyba při mazání aktuality:", error);
    }
  };

  const handleEdit = (aktualita: Aktualita) => {
    setEditingAktualita(aktualita);
  };

  const handleUpdate = async () => {
    if (editingAktualita) {
      try {
        const response = await axios.put(`http://localhost:5000/aktuality/${editingAktualita.id}`, editingAktualita);
        setAktuality(aktuality.map((akt) => (akt.id === editingAktualita.id ? response.data : akt)));
        setEditingAktualita(null);
      } catch (error) {
        console.error("Chyba při úpravě aktuality:", error);
      }
    }
  };

  return (
    <div className="aktuality-container">
      {aktuality.map((akt) => (
        <div className="aktualita" key={akt.id}>
          {akt.image && (
            <img src={`http://localhost:5000${akt.image}`} alt={akt.title} />
          )}
          <div className="aktualita-content">
            {editingAktualita && editingAktualita.id === akt.id ? (
              <>
                <input
                  type="text"
                  value={editingAktualita.title}
                  onChange={(e) => setEditingAktualita({ ...editingAktualita, title: e.target.value })}
                />
                <textarea
                  value={editingAktualita.description}
                  onChange={(e) => setEditingAktualita({ ...editingAktualita, description: e.target.value })}
                />
                <input
                  type="date"
                  value={editingAktualita.date}
                  onChange={(e) => setEditingAktualita({ ...editingAktualita, date: e.target.value })}
                />
                <select
                  value={editingAktualita.category}
                  onChange={(e) => setEditingAktualita({ ...editingAktualita, category: e.target.value })}
                >
                  <option value="">-Vyberte obor-</option>
                  <option value="Hudební obor">Hudební</option>
                  <option value="Výtvarný obor">Výtvarný</option>
                  <option value="Taneční obor">Taneční</option>
                </select>
                <button onClick={handleUpdate}>Uložit</button>
              </>
            ) : (
              <>
                <h3>{akt.title}</h3>
                <p>{akt.description}</p>
                <p>{akt.date}</p>
                <p>{akt.category}</p>
              </>
            )}
            {isAdmin && (
              <div className="admin-controls">
                <button onClick={() => handleEdit(akt)}>Upravit</button>
                <button onClick={() => handleDelete(akt.id)}>Smazat</button>
              </div>
            )}
          </div>
        </div>
      ))}
      {isAdmin && (
        <div className="admin-panel">
          <h3>Přidat aktualitu</h3>
          <input
            type="text"
            placeholder="Název"
            value={newAktualita.title}
            onChange={(e) => setNewAktualita({ ...newAktualita, title: e.target.value })}
          />
          <textarea
            placeholder="Popis"
            value={newAktualita.description}
            onChange={(e) => setNewAktualita({ ...newAktualita, description: e.target.value })}
          />
          <input
            type="date"
            value={newAktualita.date}
            onChange={(e) => setNewAktualita({ ...newAktualita, date: e.target.value })}
          />
          <select
            value={newAktualita.category}
            onChange={(e) => setNewAktualita({ ...newAktualita, category: e.target.value })}
          >
            <option value="hudební">Hudební</option>
            <option value="výtvarný">Výtvarný</option>
            <option value="taneční">Taneční</option>
          </select>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleAdd}>Přidat</button>
        </div>
      )}
    </div>
  );
};

export default Aktuality;