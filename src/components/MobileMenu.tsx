// ...existing code...
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMenu, IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import "./MobileMenu.css";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    // Zakáže scroll těla, když je menu otevřené
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((s) => !s);
    if (isOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdown: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
      >
        {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
      </button>

      <motion.div
        className="mobile-menu"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={() => {
          /* kliknutí na sidebar samotný nic nedělá */
        }}
      >
        <ul className="menu-list">
          <li>
            <button className="menu-link" onClick={(e) => toggleDropdown("uvod", e)}>
              Úvod {activeDropdown === "uvod" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "uvod" && (
              <ul className="dropdown show">
                <li>
                  <Link to="/uvod/about" onClick={closeMenu}>
                    O škole
                  </Link>
                </li>
                <li>
                  <Link to="/uvod/pracoviste" onClick={closeMenu}>
                    Místa výuky
                  </Link>
                </li>
                <li>
                  <Link to="/uvod/teachers" onClick={closeMenu}>
                    Učitelé
                  </Link>
                </li>
                <li>
                  <Link to="/uvod/absolventi" onClick={closeMenu}>
                    Absolventi
                  </Link>
                </li>
                <li>
                  <Link to="/uvod/soucasnost" onClick={closeMenu}>
                    Současnost
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button className="menu-link" onClick={(e) => toggleDropdown("obory", e)}>
              Obory {activeDropdown === "obory" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "obory" && (
              <ul className="dropdown show">
                <li>
                  <Link to="/obory/hudebni" onClick={closeMenu}>
                    Hudební Obor
                  </Link>
                </li>
                <li>
                  <Link to="/obory/tanecni" onClick={closeMenu}>
                    Taneční Obor
                  </Link>
                </li>
                <li>
                  <Link to="/obory/vytvarni" onClick={closeMenu}>
                    Výtvarný Obor
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button className="menu-link" onClick={(e) => toggleDropdown("galerie", e)}>
              Galerie {activeDropdown === "galerie" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "galerie" && (
              <ul className="dropdown show">
                <li>
                  <Link to="/galerie/foto" onClick={closeMenu}>
                    Fotky
                  </Link>
                </li>
                <li>
                  <Link to="/galerie/video" onClick={closeMenu}>
                    Videa
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/aktuality" onClick={closeMenu}>
              Aktuality
            </Link>
          </li>
          <li>
            <Link to="/documents" onClick={closeMenu}>
              Dokumenty
            </Link>
          </li>
          <li>
            <Link to="/kontakt" onClick={closeMenu}>
              Kontakt
            </Link>
          </li>

          <li>
            <button className="menu-link" onClick={(e) => toggleDropdown("chcinazus", e)}>
              Chci na ZUŠ {activeDropdown === "chcinazus" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "chcinazus" && (
              <ul className="dropdown show">
                <li>
                  <Link to="/chcinazus/prihlaska" onClick={closeMenu}>
                    Podání Přihlášky
                  </Link>
                </li>
                <li>
                  <Link to="/chcinazus/prijimacizkouzky" onClick={closeMenu}>
                    Přijímací zkoušky
                  </Link>
                </li>
                <li>
                  <Link to="/chcinazus/priprava" onClick={closeMenu}>
                    Příprava
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </motion.div>

      {isOpen && <div className="overlay" onClick={closeMenu} />}
    </>
  );
};

export default MobileMenu;
// ...existing code...