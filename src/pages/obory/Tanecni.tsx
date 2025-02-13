import React from "react";
import img from "../../../public/assets/img/dancee.jpg";
import teachers from "../../data/teachers";


const Tanecni = () => {
  const danceTeachers = teachers.filter(teacher => teacher.role === "Učitel tanečního oboru");

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

      <h2 style={{textAlign:"center"}}>Učitelé vyučující taneční obor:</h2>


      <div className="teachers-list" style={{marginBottom: "3%", padding: "0"}}>
        {danceTeachers.map((teacher, index) => (
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

export default Tanecni;