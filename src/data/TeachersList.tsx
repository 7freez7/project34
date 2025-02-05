import React, { useState } from "react";
import teachers from "../data/teachers";
import "./TeachersList.css";


const TeachersList: React.FC = () => {
  const [filter, setFilter] = useState<string>(""); 

  const filteredTeachers = filter
    ? teachers.filter((teacher) =>
        teacher.role.toLowerCase().includes(filter.toLowerCase())
      )
    : teachers;

  return (
    <div>
      <h1>Učitelé</h1>

      <div className="filters">
        <button
          className={!filter ? "active" : ""}
          onClick={() => setFilter("")}
        >
          Všichni
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
        {filteredTeachers.map((teacher, index) => (
          <div
            className={`teacher-card ${teacher.role
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            key={index}
          >
            {/* Obrázek učitele se zobrazí nad ostatními informacemi */}
            <img
              src={teacher.image}
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
              Email:{" "}
              <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersList;
