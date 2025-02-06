import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu"; // Import MobileMenu
import "./navbar.css";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false); // Stav pro detekci mobilního zařízení

  // Funkce pro kontrolu velikosti obrazovky
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Pokud je šířka obrazovky <= 768px, nastaví isMobile na true
    };

    checkMobile(); // Zavoláme to při prvním renderování
    window.addEventListener("resize", checkMobile); // Přidáme event listener na změnu velikosti obrazovky

    return () => {
      window.removeEventListener("resize", checkMobile); // Odstraníme event listener při unmountu
    };
  }, []);

  const handleDropdownMouseEnter = (dropdown: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // Zpoždění 200 ms
    setTimeoutId(id);
  };

  return (
    <div className="Link">
      {isMobile ? ( // Pokud je zařízení mobilní, zobrazi MobileMenu
        <MobileMenu />
      ) : (
        <div className="Logo">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/logo1-tr.png`}
              alt="logo"
            />
          </Link>
        </div>
      )}
      {!isMobile && ( // Pokud není mobilní zařízení, zobrazi desktopové menu
        <div className="currentLink">
          <div
            onMouseEnter={() => handleDropdownMouseEnter("uvod")}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <Link to="/">Úvod ▼</Link>
            {activeDropdown === "uvod" && (
              <ul className="dropdown">
                <li>
                  <Link to="/uvod/about">O škole</Link>
                </li>
                <li>
                  <Link to="/uvod/pracoviste">Místa výuky – pracoviště</Link>
                </li>
                <li>
                  <Link to="/uvod/teachers">Učitelé</Link>
                </li>
                <li>
                  <Link to="/uvod/absolventi">Absolventi</Link>
                </li>
                <li>
                  <Link to="/uvod/soucasnost">Současnost</Link>
                </li>
              </ul>
            )}
          </div>

          <div
            onMouseEnter={() => handleDropdownMouseEnter("obory")}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <Link to="#">Obory ▼</Link>
            {activeDropdown === "obory" && (
              <ul className="dropdown">
                <li>
                  <Link to="/obory/hudebni">Hudební Obor</Link>
                </li>
                <li>
                  <Link to="/obory/tanecni">Taneční Obor</Link>
                </li>
                <li>
                  <Link to="/obory/vytvarni">Výtvarný Obor</Link>
                </li>
              </ul>
            )}
          </div>

          <div
            onMouseEnter={() => handleDropdownMouseEnter("galerie")}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <Link to="#">Galerie ▼</Link>
            {activeDropdown === "galerie" && (
              <ul className="dropdown">
                <li>
                  <Link to="/galerie/foto">Fotky</Link>
                </li>
                <li>
                  <Link to="/galerie/video">Videa</Link>
                </li>
              </ul>
            )}
          </div>

          <Link to="/aktuality">Aktuality</Link>
          <Link to="/documents">Dokumenty</Link>

          <Link to="/kontakt">Kontakt</Link>

          <div
            onMouseEnter={() => handleDropdownMouseEnter("chcinazus")}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <Link to="/chcinazus">Chci na ZUŠ ▼</Link>
            {activeDropdown === "chcinazus" && (
              <ul className="dropdown">
                <li>
                  <Link to="/chcinazus/prihlaska">Podání Přihlášky</Link>
                </li>
                <li>
                  <Link to="/chcinazus/prijimacizkouzky">Příjimací zkoušky</Link>
                </li>
                <li>
                  <Link to="/chcinazus/priprava">Příprava</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
