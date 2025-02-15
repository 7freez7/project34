import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMenu, IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import "./MobileMenu.css";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null); // Zavře všechny dropdowny
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger" onClick={toggleMenu}>
        {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
      </button>

      {/* Animated Sidebar */}
      <motion.div
        className="mobile-menu"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ul className="menu-list">
          {/* Úvod */}
          <li>
            <button className="menu-link" onClick={() => toggleDropdown("uvod")}>
              Úvod {activeDropdown === "uvod" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "uvod" && (
              <ul className="dropdown">
                <li><Link to="/uvod/about" onClick={closeMenu}>O škole</Link></li>
                <li><Link to="/uvod/pracoviste" onClick={closeMenu}>Místa výuky</Link></li>
                <li><Link to="/uvod/teachers" onClick={closeMenu}>Učitelé</Link></li>
                <li><Link to="/uvod/absolventi" onClick={closeMenu}>Absolventi</Link></li>
                <li><Link to="/uvod/soucasnost" onClick={closeMenu}>Současnost</Link></li>
              </ul>
            )}
          </li>

          {/* Obory */}
          <li>
            <button className="menu-link" onClick={() => toggleDropdown("obory")}>
              Obory {activeDropdown === "obory" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "obory" && (
              <ul className="dropdown">
                <li><Link to="/obory/hudebni" onClick={closeMenu}>Hudební Obor</Link></li>
                <li><Link to="/obory/tanecni" onClick={closeMenu}>Taneční Obor</Link></li>
                <li><Link to="/obory/vytvarni" onClick={closeMenu}>Výtvarný Obor</Link></li>
              </ul>
            )}
          </li>

          {/* Galerie */}
          <li>
            <button className="menu-link" onClick={() => toggleDropdown("galerie")}>
              Galerie {activeDropdown === "galerie" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "galerie" && (
              <ul className="dropdown">
                <li><Link to="/galerie/foto" onClick={closeMenu}>Fotky</Link></li>
                <li><Link to="/galerie/video" onClick={closeMenu}>Videa</Link></li>
              </ul>
            )}
          </li>

          {/* Další odkazy */}
          <li><Link to="/aktuality" onClick={closeMenu}>Aktuality</Link></li>
          <li><Link to="/documents" onClick={closeMenu}>Dokumenty</Link></li>
          <li><Link to="/kontakt" onClick={closeMenu}>Kontakt</Link></li>

          {/* Chci na ZUŠ */}
          <li>
            <button className="menu-link" onClick={() => toggleDropdown("chcinazus")}>
              Chci na ZUŠ {activeDropdown === "chcinazus" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "chcinazus" && (
              <ul className="dropdown">
                <li><Link to="/chcinazus/prihlaska" onClick={closeMenu}>Podání Přihlášky</Link></li>
                <li><Link to="/chcinazus/prijimacizkouzky" onClick={closeMenu}>Přijímací zkoušky</Link></li>
                <li><Link to="/chcinazus/priprava" onClick={closeMenu}>Příprava</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </motion.div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default MobileMenu;
