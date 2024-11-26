import React from "react";
import teachers from "../data/teachers";
import "./TeachersList.css";

const TeachersList = () => {
  return (
    <div>
      <h1>Seznam učitelů</h1>
      <div className="teachers-list">
        {teachers.map((teacher, index) => (
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

export default TeachersList;