import React from "react";
import img from "../../public/img/pexels-pixabay-356079.jpg";
const About = () => {
  return (
    <div>
      <h1>O nás</h1>
      <div className="HeaderImage">
        <h2>Nevim visco</h2>
        <img src={"/img/otaznik.png"} alt="otaznik" />
      </div>
    </div>
  );
};

export default About;
