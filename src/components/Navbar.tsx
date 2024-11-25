import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import img from "../../public/img/logo1-tr.png";

const Navbar = () => {
  return (
    <div className="Link">
      <div className="Logo">
        <Link to="/uvod">
          <img src={`${process.env.PUBLIC_URL}/img/logo1-tr.png`} alt="logo" />
        </Link>
      </div>
      <div className="currentLink">
        <Link to="/uvod">ÚVOD</Link>
        <Link to="/about">O ŠKOLE</Link>
        <Link to="/obory">OBORY</Link>
        <Link to="/obory">Galerie</Link>
        <Link to="/obory">Dokumenty</Link>
        <Link to="/obory">CHCI NA ZUŠ</Link>



        
        <Link to="/kontakt">KONTAKT</Link>
      </div>
    </div>
  );
};

export default Navbar;
