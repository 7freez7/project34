import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import img from "../../public/img/logo1-tr.png";

const Navbar = () => {
  return (
    <div className="Link">
      <div className="Logo">
        <Link to="/uvod">
          <img src={"/img/logo1-tr.png"} alt="logo" />
        </Link>
      </div>
      <div className="currentLink">
        <Link to="/uvod">ÚVOD</Link>
        <Link to="/about">O NÁS </Link>
        <Link to="/obory">OBORY</Link>
        <Link to="/kontakt">KONTAKT</Link>
      </div>
    </div>
  );
};

export default Navbar;
