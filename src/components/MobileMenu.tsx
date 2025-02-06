import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import "./MobileMenu.css";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Funkce pro otevření a zavření dropdownu při kliknutí na šipku
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
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
            <Link to="#" onClick={() => toggleDropdown("uvod")}>Úvod</Link>
            <button className="dropdown-toggle" onClick={() => toggleDropdown("uvod")}>
              {activeDropdown === "uvod" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "uvod" && (
              <ul className="dropdown">
                <li><Link to="/uvod/about" onClick={toggleMenu}>O škole</Link></li>
                <li><Link to="/uvod/pracoviste" onClick={toggleMenu}>Místa výuky</Link></li>
                <li><Link to="/uvod/teachers" onClick={toggleMenu}>Učitelé</Link></li>
                <li><Link to="/uvod/absolventi" onClick={toggleMenu}>Absolventi</Link></li>
                <li><Link to="/uvod/soucasnost" onClick={toggleMenu}>Současnost</Link></li>
              </ul>
            )}
          </li>

          {/* Obory */}
          <li>
            <Link to="#" onClick={() => toggleDropdown("obory")}>Obory</Link>
            <button className="dropdown-toggle" onClick={() => toggleDropdown("obory")}>
              {activeDropdown === "obory" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "obory" && (
              <ul className="dropdown">
                <li><Link to="/obory/hudebni" onClick={toggleMenu}>Hudební Obor</Link></li>
                <li><Link to="/obory/tanecni" onClick={toggleMenu}>Taneční Obor</Link></li>
                <li><Link to="/obory/vytvarni" onClick={toggleMenu}>Výtvarný Obor</Link></li>
              </ul>
            )}
          </li>

          {/* Galerie */}
          <li>
            <Link to="#" onClick={() => toggleDropdown("galerie")}>Galerie</Link>
            <button className="dropdown-toggle" onClick={() => toggleDropdown("galerie")}>
              {activeDropdown === "galerie" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "galerie" && (
              <ul className="dropdown">
                <li><Link to="/galerie/foto" onClick={toggleMenu}>Fotky</Link></li>
                <li><Link to="/galerie/video" onClick={toggleMenu}>Videa</Link></li>
              </ul>
            )}
          </li>

          {/* Další odkazy */}
          <li>
            <Link to="/aktuality" onClick={toggleMenu}>Aktuality</Link>
          </li>
          <li>
            <Link to="/documents" onClick={toggleMenu}>Dokumenty</Link>
          </li>
          <li>
            <Link to="/kontakt" onClick={toggleMenu}>Kontakt</Link>
          </li>

          {/* Chci na ZUŠ */}
          <li>
            <Link to="#" onClick={() => toggleDropdown("chcinazus")}>Chci na ZUŠ</Link>
            <button className="dropdown-toggle" onClick={() => toggleDropdown("chcinazus")}>
              {activeDropdown === "chcinazus" ? <IoChevronUp /> : <IoChevronDown />}
            </button>
            {activeDropdown === "chcinazus" && (
              <ul className="dropdown">
                <li><Link to="/chcinazus/prihlaska" onClick={toggleMenu}>Podání Přihlášky</Link></li>
                <li><Link to="/chcinazus/prijimacizkouzky" onClick={toggleMenu}>Příjimací zkoušky</Link></li>
                <li><Link to="/chcinazus/priprava" onClick={toggleMenu}>Příprava</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </motion.div>

      {/* Overlay (pro zavření kliknutím mimo menu) */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default MobileMenu;
