import React from "react";
import ZusHM from "../../public/img/artt.jpg";
import { Link } from 'react-router-dom'; // Import Link pro navigaci
import Art from "../../public/img/Art.jpg";
import Dance from "../../public/img/Dance.jpg";
import Hudba from "../../public/img/Hudba.jpg";

const Uvod = () => {
  return (
  <div>
    <div className="headerImage">
      <img src={`${process.env.PUBLIC_URL}/img/artt.jpg`} alt="mainImg" />
      <div className="Description">
        <h1>Vítejte na stránkách ZUŠ Heřmanův Městec</h1>
        <p>
          Naše škola je zřízená jako příspěvková organizace městem Heřmanův
          Městec. Je zařazena do školského rejstříku.
        </p>
        <p>
          Své umělecké vzdělání poskytuje dětem v Heřmanově Městci a na dalších
          čtyřech pobočkách: v Prachovicích, Třemošnici, Ronově nad Doubravou a
          Seči.
        </p>
      </div>
    </div>


    <div className="obor-container">
      <div className="obor-druh">
          <Link to="/obory/hudebni"> {""}
          <img src={`${process.env.PUBLIC_URL}/img/Hudba.jpg`} alt="Hudba" className="img" />
            <h2>Hudební obor</h2>
            <p>Žáci v hudebním oboru poznávají hudbu mnoha žánrů. Samotný obor nabízí zaměření i na zpěv.</p>
          </Link>
      </div>

      <div className="obor-druh">
      <Link to="/obory/tanecni"> {""}
      <img src={`${process.env.PUBLIC_URL}/img/Dance.jpg`} alt="Dance" className="img" />
        <h2>Taneční Obor</h2>
        <p>Žácí ve výtvarném oboru nachází svůj motivační podnět k uměleckému vztahu ke světu a k sebe sama v něm.</p>
        </Link>
      </div>

      <div className="obor-druh">
      <Link to="/obory/vytvarni"> {""}
      <img src={`${process.env.PUBLIC_URL}/img/Art.jpg`} alt="Art" className="img" />
        <h2>Výtvarný Obor</h2>
        <p>Žáci v tanečním oboru rozvíjí své prostorové, hudební a taneční cítění.</p>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Uvod;
