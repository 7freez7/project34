import React from "react";
import Hudba from "../../public/assets/img/Hudba.jpg";
import teachers from "../../data/teachers";


const Hudebni = () => {
  const musicTeachers = teachers.filter(teacher => teacher.role === "Učitel hudebního oboru");

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

      <p>Náš obor se nezaměřuje pouze na klasickou hudební oblast, ale nabízí i možnost zpěvu.</p>
      
      </div>

      <div className="info-container2">
        <h3>Pro koho je hudební obor určen?</h3>
        <p>Přihlásit se mohou děti od 5 let do přípravného studia a děti od 7 let do základního studia. 
          Výuka je individuální (hra na nástroj, zpěv) i kolektivní (hudební nauka, souborová, komorní a orchestrální hra a základy souhry) dle věku a zájmu studenta. 
          Žáci mohou vystupovat na koncertech, městských slavnostech, festivalech a zúčastnit se soutěží.
        </p>
      </div>

      <h2 style={{textAlign:"center"}}>Učitelé vyučující hudební obor:</h2>


      <div className="teachers-list" style={{marginBottom: "3%", padding: "0"}}>
        {musicTeachers.map((teacher, index) => (
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

export default Hudebni;