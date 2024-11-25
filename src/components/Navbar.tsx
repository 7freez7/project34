import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import img from "../../public/img/logo1-tr.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownHover, setDropdownHover] = useState(false);
  let closeTimeout: NodeJS.Timeout | null = null;

  const toggleDropdown = (open: boolean) => {
    if (open) {
      if (closeTimeout) {
        clearTimeout(closeTimeout); // Zrušíme zavírací timeout, pokud uživatel znovu najel na dropdown
        closeTimeout = null;
      }
      setDropdownOpen(true);
    } else if (!dropdownHover) {
      // Nastavíme timeout pro zavření
      closeTimeout = setTimeout(() => {
        setDropdownOpen(false);
        closeTimeout = null;
      }, 500); // Půl vteřiny
    }
  };

  const handleDropdownMouseEnter = () => {
    setDropdownHover(true);
    toggleDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setDropdownHover(false);
    toggleDropdown(false);
  };

  return (
    <div className="Link">
      <div className="Logo">
        <Link to="/uvod">
          <img src={`${process.env.PUBLIC_URL}/img/logo1-tr.png`} alt="logo" />
        </Link>
      </div>
      <div className="currentLink">
        <Link to="/uvod">ÚVOD</Link>

        <div 
          onMouseEnter={handleDropdownMouseEnter} 
          onMouseLeave={handleDropdownMouseLeave}
        >
          <Link to="/about">O nás</Link>
          {dropdownOpen && (
            <ul 
              className="dropdown"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <li><Link to="/obory">Obory</Link></li>
              <li><Link to="/galerie">Galerie</Link></li>
              <li><Link to="/documents">Dokumenty</Link></li>
              <li><Link to="/chcinazus">Chci na ZUŠ</Link></li>
            </ul>
          )}
        </div>

        <Link to="/obory">OBORY</Link>
        <Link to="/galerie">Galerie</Link>
        <Link to="/documents">Dokumenty</Link>
        <Link to="/chcinazus">CHCI NA ZUŠ</Link>
        <Link to="/kontakt">KONTAKT</Link>
      </div>
    </div>
  );
};

export default Navbar;
