import React, { useState } from "react";
import teachers from "../data/teachers";
import "./TeachersList.css";

// Funkce pro načítání obrázků
const getImagePath = (imageName: string) => {
  try {
    return require(`../data/img.teachers/${imageName}`);
  } catch {
    return require("../data/img.teachers/default.png");
  }
};

const TeachersList: React.FC = () => {
  const [filter, setFilter] = useState<string>("");

  const filteredTeachers = teachers
    .filter((teacher) =>
      ["učitel hudebního oboru", "učitel výtvarného oboru", "učitel tanečního oboru"].includes(teacher.role.toLowerCase())
    )
    .sort((a, b) => {
      const aLastName = a.name.split(" ")[1];
      const bLastName = b.name.split(" ")[1];
      return aLastName.localeCompare(bLastName);
    });

  const displayedTeachers = filter
    ? filteredTeachers.filter((teacher) =>
        teacher.role.toLowerCase().includes(filter.toLowerCase())
      )
    : filteredTeachers;

  return (
    <div>
      <h1>Učitelé</h1>

      <div className="filters">
        <button
          className={!filter ? "active" : ""}
          onClick={() => setFilter("")}
        >
          Všichni Učitelé
        </button>
        <button
          className={filter === "hudebního oboru" ? "active" : ""}
          onClick={() => setFilter("hudebního oboru")}
        >
          Hudební obor
        </button>
        <button
          className={filter === "výtvarného oboru" ? "active" : ""}
          onClick={() => setFilter("výtvarného oboru")}
        >
          Výtvarný obor
        </button>
        <button
          className={filter === "tanečního oboru" ? "active" : ""}
          onClick={() => setFilter("tanečního oboru")}
        >
          Taneční obor
        </button>
      </div>

      <div className="teachers-list">
        {displayedTeachers.map((teacher, index) => (
          <div className={`teacher-card`} key={index}>
            {/* Obrázek učitele */}
            <img
              src={getImagePath(teacher.image)}
              alt={teacher.name}
              className="teacher-photo"
            />
            <h2>{teacher.name}</h2>
            <p>Pozice: {teacher.role}</p>
            {teacher.status && <p>Status: {teacher.status}</p>}
            {teacher.subjects && teacher.subjects.length > 0 && (
              <p>Obory: {teacher.subjects.join(", ")}</p>
            )}
            <p>
              Email: <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;