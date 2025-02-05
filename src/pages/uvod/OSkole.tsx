import React from "react";
import StaraSkola from "../../../public/assets/img/StaraSkolaHM2.jpeg";
import Prachovice from "../../../public/assets/img/Prachovice.jpg";
import Tremosnice from "../../../public/assets/img/Tremosnice.jpg";

const OSkole = () => {
  return (
    <div>
      <h1>O naší škole</h1>
      <div className="info-container" style={{}}>
      <h2>Historie</h2>

      <p>Vzniku samostatné umělecké školy v Heřmanově Městci předcházelo období, 
        ve kterém umělecké školství v regionu Heřmanův Městec a Třemošnice spadalo pod LŠU Chrudim. 
        Nejprve vznikla v roce 1981 pobočka LŠU Chrudim v Třemošnici, v roce 1986 pak za podpory města i v Heřmanově Městci. 
        V letech 1991 – 1994 vykonávala funkci vedoucí pobočky v Heřmanově Městci L. Štěpánová.</p>

      <p>K 1. 9. 1996 vznikla samostatná ZUŠ Heřmanův Městec. 
        Ředitelkou byla jmenována M. Víchová (1996 – 2000), později Ing.Václav Říha (2008-2018). 
        Pobočka v Třemošnici připadla pod ZUŠ Heřmanův Městec. K 1. 8. 2018 byl ředitelem školy jmenován Pavel Starý.</p>

      <p>Žáci, kteří navštěvovali pobočku LŠU Chrudim v Heřmanově Městci nebo ZUŠ Heřmanův Městec a 
        pokračovali ve studiu na konzervatoři: M. Stojanová, T. Pintová, F. Jelínek, M. Novák, J. Volf</p>

        <div className="images">
          <img style={{filter: "saturate(0)"}}
            src={`${process.env.PUBLIC_URL}/assets/img/StaraSkolaHM2.jpeg`}
            alt="skola"
          />
        </div>

      </div>
        
      <div className="info-container">
        <h2>Současnost</h2>

        <p>Naše škola je zřízená jako příspěvková organizace městem Heřmanův Městec. Je zařazena do školského rejstříku.</p>

        <p>Své umělecké vzdělání poskytuje dětem v Heřmanově Městci a na dalších čtyřech pobočkách: v Prachovicích, Třemošnici, Ronově nad Doubravou a Seči.</p>


        <div className="images">
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/Prachovice.jpg`}
            alt="Prachovice"
          />
          
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/Tremosnice.jpg`}
            alt="skola"
          />
        </div>
        
      </div>

    </div>
  );
};

export default OSkole;