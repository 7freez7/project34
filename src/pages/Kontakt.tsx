import React from "react";
import img from "../../public/assets/img/calendar.jpg";

const Kontakt = () => {
  return (
    <div>
      <div className="oborImage">
        <img src={`${process.env.PUBLIC_URL}/assets/img/calendar.jpg`} alt="calendar" className="img" />
        <h1>Kontakt</h1>
      </div>
      
      <div className="info-container">
        <h2>Kontaktní údaje</h2>
        <p style={{fontWeight:"bold"}}>Základní umělecká škola Heřmanův městec</p>
        <p>Jarkovského 47</p>
        <p>538 03 Heřmanův Městec</p>

        <div className="inf">
        <p>IČO:</p>
        <p>691 70 207</p>
        </div>

        <div className="inf">
        <p>IZO:</p>
        <p>117 200 760</p>
        </div>

        <div className="inf">
        <p>email:</p>
        <p>reditel@zushm.cz</p>
        </div>


      <div className="inf">
        <p>Telefonní čísla</p>
        <p>Kancelář: 469 696 291</p>
        <p>Mobil: 739 411 282</p>

      </div>

      </div>

      <div className="contact-container">
        <h1>Vedení školy</h1>

        <h3>MgA. Štěpán Křováček</h3>
        <p>Ředitel školy</p>

        <h3>Miluše Kratochvílová</h3>
        <p>Zástupce ředitele a ekonom</p>

        <h3>Lukáš Kyncl</h3>
        <p>Zástupce ředitele</p>


      </div>
    </div>
  );
};

export default Kontakt;
