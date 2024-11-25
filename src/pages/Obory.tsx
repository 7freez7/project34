import React from "react";
import { Link } from 'react-router-dom'; // Import Link pro navigaci
import Art from "../../public/img/Art.jpg";
import Dance from "../../public/img/Dance.jpg";
import Hudba from "../../public/img/Hudba.jpg";

const Obory = () => {
  return (
    <div>
      <h1>Obory</h1>

      <div className="obor-druh">
        <Link to="/obory/hudebni"> {""}
          <h2>Hudební obor</h2>
          <img src={`${process.env.PUBLIC_URL}/img/Hudba.jpg`} alt="Hudba" className="img" />
        </Link>
      </div>

      <div className="obor-druh">
      <Link to="/obory/tanecni"> {""}

        <h2>Taneční Obor</h2>
        <img src={`${process.env.PUBLIC_URL}/img/Dance.jpg`} alt="Dance" className="img" />
        </Link>

      </div>

      <div className="obor-druh">
      <Link to="/obory/vytvarni"> {""}

        <h2>Výtvarný Obor</h2>
        <img src={`${process.env.PUBLIC_URL}/img/Art.jpg`} alt="Art" className="img" />
        </Link>

      </div>

    </div>
  );
};

export default Obory;