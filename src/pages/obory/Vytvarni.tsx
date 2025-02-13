import React from "react";
import img from "../../../public/assets/img/paintt.jpg";
import teachers from "../../data/teachers";

const Vytvarni = () => {
  const artTeachers = teachers.filter(teacher => teacher.role === "Učitel výtvarného oboru");

  const getImagePath = (imageName: string) => {
    try {
      return require(`../../data/img.teachers/${imageName}`);
    } catch {
      return require("../../data/img.teachers/default.png");
    }
  };

  return (
    <div>
      <div className="oborImage">
        <img src={`${process.env.PUBLIC_URL}/assets/img/paintt.jpg`} alt="paint" className="img" />
        <h1>Výtvarný obor</h1>
      </div>

      <h2>O výtvarném oboru</h2>

      <div className="info-container">

        <p>Žáci ve výtvarné činnosti rozvíjí celou paletu svých dovedností a schopností, jako je tvořivost a fantazie, 
        mnohostranné smyslové vnímání a rozlišování, výrázová spontálnost nebo představivost aj.</p>

        <p>Každá taková to dovednost nebo schopnost je součástí obecného celku zkoumat a poznávat svět a sebe sama v něm. 
          Výtvarnou činností chceme žákům přinést motivační podnět k uměleckému i k 
          vědecko - filosofickému vztahu ke světu a k sebe sama v něm.</p>

        <p>Výtvarný obor rozdělujeme na dvě oblasti. Na <span style={{ textDecoration: "underline"}}>výtvarnou tvorbu</span> a <span style={{ textDecoration: "underline"}}>keramiku</span>.</p>
      </div>


        <div className="info-container">
        <h3>Předmětem výtvarné tvorby jsou:</h3>

          <ul>
            <li>Plošná tvorba</li>
            <li>Prostorová malba</li>
            <li>Výtvarná kultura</li>
          </ul>
        </div>

        <div className="info-container">
          <h3>Předmětem keramiky jsou:</h3>
          
          <ul>
            <li>Keramika</li>
            <li>Doplňující činnosti</li>
            <li>Výtvarná kultura</li>
          </ul>
        </div>

        <div className="info-container2">
          <h3>Pro koho je výtvarný obor určen?</h3>
          <p>Přihlásit se mohou děti od 5 let do přípravného studia a děti od 7 let do základního studia. Výuka je kolektivní. Žáci mohou vystavovat a účastnit se soutěží.</p>
        </div>

        <h2 style={{textAlign:"center"}}>Učitelé vyučující výtvarný obor:</h2>

        <div className="teachers-list" style={{marginBottom: "3%", padding: "0"}}>

        {artTeachers.map((teacher, index) => (
          <div className="teacher-card" key={index}>
            <img
              src={getImagePath(teacher.image)}
              alt={teacher.name}
              className="teacher-photo"
              />
            <h2>{teacher.name}</h2>
            <p>Pozice: {teacher.role}</p>
            {teacher.status && <p>Status: {teacher.status}</p>}
            {teacher.subjects && teacher.subjects.length > 0 ? (
              <p>Obory: {teacher.subjects.join(", ")}</p>
            ) : null}
          <p>Email: <a href={`mailto:${teacher.email}`}>{teacher.email}</a></p></div>
        ))}
      </div>
      
    </div>
  );
};

export default Vytvarni;