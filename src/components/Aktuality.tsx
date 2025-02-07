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
  const [newAktualita, setNewAktualita] = useState<Omit<Aktualita, "id">>({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchAktuality();
  }, []);

  const fetchAktuality = async () => {
    try {
      const response = await axios.get("http://localhost:5000/aktuality");
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
  
        const response = await axios.post("http://localhost:5000/aktuality", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        setAktuality([...aktuality, response.data]);
        setNewAktualita({ title: "", description: "", image: "" });
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

  return (
    <div className="aktuality-container">
      {aktuality.map((akt) => (
        <div className="aktualita" key={akt.id}>
        {akt.image && (
          <img src={`http://localhost:5000/uploads/${akt.image}`} alt={akt.title} />
        )}  
        <div className="aktualita-content">
            <h3>{akt.title}</h3>
            <p>{akt.description}</p>
            {isAdmin && (
              <div className="admin-controls">
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
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleAdd}>Přidat</button>
        </div>
      )}
    </div>
  );
};

export default Aktuality;
