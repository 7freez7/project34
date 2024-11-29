import React from "react";
import "../App";

// Typy pro data aktuality
interface AktualitaProps {
  title: string;
  date: string;
  category: string;
  description: string;
  link: string;
  image?: string; // Obrázek je nepovinný
}

// Komponenta pro jednotlivou aktualitu
const Aktualita: React.FC<AktualitaProps> = ({
  title,
  date,
  category,
  description,
  link,
  image,
}) => {
  return (
    <div className="aktualita">
      {/* Pokud není obrázek definován, použije se výchozí obrázek */}
      <img
        src={image || "https://via.placeholder.com/150"}
        alt="Thumbnail"
        className="aktualita-image"
      />
      <div className="aktualita-content">
        <h2>{title}</h2>
        <p className="aktualita-meta">
          {date} • {category}
        </p>
        <p>{description}</p>
        <a href={link} className="aktualita-link">
          číst více
        </a>
      </div>
    </div>
  );
};

// Kontejnerová komponenta pro seznam aktualit
const AktualityContainer: React.FC = () => {
  const aktuality: AktualitaProps[] = [
    {
      title: "Reportáž o chystaném výročním koncertu",
      date: "5. 11. 2024",
      category: "Hudební",
      description: "Reportáž...",
      link: "/aktualita/koncert",
      // Žádný obrázek – použije se výchozí

    },
    {
      title: "Cimbálová muzika Draguň na veletrhu",
      date: "16. 10. 2024",
      category: "Hudební",
      description:
        "Naše cimbálová muzika Draguň se představila na zahájení tradičním veletrhu vzdělávání...",
      link: "/aktualita/dragun-veletrh",
      // Žádný obrázek – použije se výchozí
    },
  ];

  return (
    <div className="aktuality-container">
      <h1 className="aktuality-title">Nejnovější aktuality</h1>
      {aktuality.map((aktualita, index) => (
        <Aktualita key={index} {...aktualita} />
      ))}
    </div>
  );
};

export default AktualityContainer;
