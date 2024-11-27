import React from "react";

const Documents = () => {
  return (
    <div>
      <h1>Dokumenty</h1>

      <div className="info-container2">
        <h2>Formulář ke stažení</h2>
        <div id="pouceni"><p>Formuláře pro školní rok 2024/2025</p></div>

        <ul>
          <li><a href="https://www.zushm.cz/files/odhlaseni-zaka.doc">Žádost o odhlášení žáka ze studia</a></li>
        <li><a href="https://www.zushm.cz/files/prihlaseni-zaka.doc">Žádost o přihášení žáka ke studiu</a></li>
        <li><a href="https://www.zushm.cz/files/prohlaseni-zus-covid.docx">Čestné prohlášení o negativním výsledku na přítomnost viru SARS-CoV-2 (COVID19)</a></li>
        </ul>
      </div>

      <div className="info-container2">
        <h2>Platné předpisy</h2>
        <ul>
          <li><a href="https://www.zushm.cz/files/skolni_rad/ZUSHM_Skolni_rad.pdf">Školní řád</a></li>
          <li><a href="https://www.zushm.cz/files/SVP_HM.pdf">Školní vzdělávací program (ŠVP)</a></li>
        </ul>
        
      </div>
    </div>
  );
};

export default Documents;