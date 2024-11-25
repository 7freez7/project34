import React from "react";
import ZusHM from "../../public/img/ZusHM.png";

const Uvod = () => {
  return (
    <div>
      <div className="HeaderImage">
        <h1>Zuš Heřmanův Městec</h1>
        <img src={`${process.env.PUBLIC_URL}/img/ZusHM.png`} alt="ZusHM" />
      </div>

      <div className="Description">
        <h2>Vítejte na stránkách ZUŠ Heřmanův Městec</h2>
        <p>
          Naše škola je zřízená jako příspěvková organizace městem Heřmanův
          Městec. Je zařazena do školského rejstříku.
        </p>
        <p>
          Své umělecké vzdělání poskytuje dětem v Heřmanově Městci a na dalších
          čtyřech pobočkách: v Prachovicích, Třemošnici, Ronově nad Doubravou a
          Seči.
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default Uvod;
