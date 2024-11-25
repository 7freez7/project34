import React from "react";
import teachers from "../data/teachers";

const TeachersList = () => {
  return (
    <div>
      <h1>Seznam učitelů</h1>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            <h2>{teacher.name}</h2>
            <p>Pozice:{teacher.role}</p>
            {teacher.status && <p><strong>Status:</strong> {teacher.status}</p>}
            <p>Obory: {teacher.subjects?.join(", ") || "neuvedeno"}</p>
            <p>Email: {teacher.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersList;
