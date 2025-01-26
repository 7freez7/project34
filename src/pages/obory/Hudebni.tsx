import React from "react";
import Hudba from "../../public/assets/img/Hudba.jpg";
import teachers from "../../data/teachers";


const Hudebni = () => {
  const musicTeachers = teachers.filter(teacher => teacher.role === "Učitel hudebního oboru");
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

      </div>
      <div className="teachers-list" style={{marginBottom: "3%", padding: "0"}}>
        {musicTeachers.map((teacher, index) => (
          <div className="teacher-card" key={index}>
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