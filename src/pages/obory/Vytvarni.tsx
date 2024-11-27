import React from "react";
import img from "../../../public/assets/img/paintt.jpg";

const Vytvarni = () => {
  return (
    <div>
      <div className="oborImage">
        <img src={`${process.env.PUBLIC_URL}/assets/img/paintt.jpg`} alt="paint" className="img" />
        <h1>Výtvarný obor</h1>
      </div>

      <p>nevimmm</p>
    </div>
  );
};

export default Vytvarni;