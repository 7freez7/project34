import React, { useState, useEffect } from "react";
import axios from "axios";

interface AktualitaProps {
  id?: number;
  title: string;
  date: string;
  category: string;
  description: string;
  link: string;
  image?: string;
}

const AktualitaForm: React.FC<{ aktualita?: AktualitaProps; isEdit?: boolean }> = ({
  aktualita,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<AktualitaProps>({
    id: aktualita?.id || 0,
    title: aktualita?.title || "",
    date: aktualita?.date || "",
    category: aktualita?.category || "",
    description: aktualita?.description || "",
    link: aktualita?.link || "",
    image: aktualita?.image || "",
  });

  // Funkce pro změnu hodnot formuláře
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkce pro odeslání formuláře
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = isEdit
      ? `/api/aktuality/${formData.id}` // PUT pro editaci
      : "/api/aktuality"; // POST pro přidání nové aktuality

    const method = isEdit ? "put" : "post";

    try {
      await axios[method](apiUrl, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`, // Přidáme autentizační token
        },
      });
      alert(isEdit ? "Aktualita byla upravena." : "Aktualita byla přidána.");
    } catch (error) {
      console.error("Chyba při odesílání formuláře:", error);
      alert("Nastala chyba při odesílání formuláře.");
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Upravit Aktualitu" : "Přidat Novou Aktualitu"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Název"
          required
        />
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="Datum"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Kategorie"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Popis"
          required
        />
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          placeholder="Odkaz"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          placeholder="URL obrázku"
        />
        <button type="submit">{isEdit ? "Upravit" : "Přidat"}</button>
      </form>
    </div>
  );
};

export default AktualitaForm;
