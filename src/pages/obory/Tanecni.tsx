import React from "react";
import img from "../../../public/assets/img/dancee.jpg";

const Tanecni = () => {
  return (
    <div>
      <div className="oborImage">
        <img src={`${process.env.PUBLIC_URL}/assets/img/dancee.jpg`} alt="dance" className="img" />
        <h1>Taneční obor</h1>
      </div>

      <div className="info-container">
        <h2>O tanečním oboru</h2>
        <p>Náš taneční obor umožnuje žákům rozvíjet jejich prostorové, hudební a taneční cítění. 
          Nejmenší žáci v přípravném studiu poznávají první taneční krůčky formou gymnastického cvičení a rytmických her. 
          Starší žáci získávají přehled v klasickém, lidovém a moderním tanci.</p>

        <p>V tanečním oboru se zaměřujeme na:</p>
        <ul>
          <li>Taneční a gymnastickou průpravu</li>
          <li>Základy klasického tance</li>
          <li>Moderní a současný tanec</li>
          <li>Základy street dance, show dance</li>
          <li>Muzikálový tanec, Jazz dance</li>
          <li>Improvizace a práci v souboru</li>
          </ul>
      </div>

      <div className="info-container2">
      <h3>Pro koho je hudební obor určen?</h3>
          <p>Přihlásit se mohou děti od 5 let do přípravného studia a děti od 7 let do základního studia. Výuka je kolektivní. 
            Žáci mohou vystupovat na akcích školy, jiných akcích a účastnit se soutěží.</p>
      </div>
    </div>
  );
};

export default Tanecni;