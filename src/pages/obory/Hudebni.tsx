import React from "react";
import Hudba from "../../public/assets/img/Hudba.jpg";

const Hudebni = () => {
  return (
    <div>
      <div className="oborImage">
        <img src={`${process.env.PUBLIC_URL}/assets/img/Hudba.jpg`} alt="Hudba" className="img" />
        <h1>Hudebni obor</h1>
      </div>
      <div className="info-container">
      <p>Náš hudební obor nabízí rozmanitou škálu hudebních nástrojů, se kterými tě naučíme zacházet.</p>
      <p>K výběru máme tyto nástroje:</p>
      <ul>
      <li>Baskřídlovka</li>
      <li>Basová kytara</li>
      <li>Bicí</li>
      <li>Elektrofonická kytara</li>
      <li>Elektronické klávesy</li>
      <li>Housle</li>
      <li>Klarinet</li>
      <li>Klavír</li>
      <li>Kytara</li>
      <li>Příčná flétna</li>
      <li>Zobcová flétna</li>
      <li>Saxofon</li>
      <li>Trubka</li>
      <li>Violoncello</li>
      <li>Kontrabas</li>
    </ul>

      </div>
    </div>
  );
};

export default Hudebni;