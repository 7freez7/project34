import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import img from "../../public/img/logo1-tr.png";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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
      <div className="Logo">
        <Link to="/uvod">
          <img src={`${process.env.PUBLIC_URL}/img/logo1-tr.png`} alt="logo" />
        </Link>
      </div>
      <div className="currentLink">
        <div 
          onMouseEnter={() => handleDropdownMouseEnter('uvod')} 
          onMouseLeave={handleDropdownMouseLeave}
        >
          <Link to="/uvod">Uvod</Link>
          {activeDropdown === 'uvod' && (
            <ul className="dropdown">
              <li><Link to="/uvod/pracoviste">Místa výuky – pracoviště</Link></li>
              <li><Link to="/uvod/zamestnanci">Zaměstnanci</Link></li>
              <li><Link to="/uvod/absolventi">Absolventi</Link></li>
              <li><Link to="/uvod/soucasnost">Současnost</Link></li>
              <li><Link to="/uvod/historie">Historie</Link></li>
            </ul>
          )}
        </div>

        <div 
          onMouseEnter={() => handleDropdownMouseEnter('obory')} 
          onMouseLeave={handleDropdownMouseLeave}
        >
          <Link to="/obory">OBORY</Link>
          {activeDropdown === 'obory' && (
            <ul className="dropdown">
              <li><Link to="/obory/hudebni">Hudební Obor</Link></li>
              <li><Link to="/obory/tanecni">Taneční Obor</Link></li>
              <li><Link to="/obory/vytvarni">Výtvarní Obor</Link></li>
            </ul>
          )}
        </div>

        <div 
          onMouseEnter={() => handleDropdownMouseEnter('galerie')} 
          onMouseLeave={handleDropdownMouseLeave}
        >
          <Link to="/galerie">Galerie</Link>
          {activeDropdown === 'galerie' && (
            <ul className="dropdown">
              <li><Link to="/galerie/foto">Fotky</Link></li>
              <li><Link to="/galerie/video">Videa</Link></li>
            </ul>
          )}
        </div>



        <Link to="/about">About</Link>
        <Link to="/kontakt">KONTAKT</Link>
        <Link to="/documents">Dokumenty</Link>

        <div 
          onMouseEnter={() => handleDropdownMouseEnter('chcinazus')} 
          onMouseLeave={handleDropdownMouseLeave}
        >
        <Link to="/chcinazus">CHCI NA ZUŠ</Link>
        {activeDropdown === 'chcinazus' && (
            <ul className="dropdown">
              <li><Link to="/chcinazus/prihlaska">Podání Přihlášky</Link></li>
              <li><Link to="/chcinazus/prijimacizkouzky">Příjimací zkoušky</Link></li>
              <li><Link to="/chcinazus/priprava">Příprava</Link></li>

            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;