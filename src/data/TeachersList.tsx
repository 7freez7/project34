import React, { useState, useEffect } from "react";

const defaultImage = "/nopfp.jpg"; // Default image if unavailable

interface Teacher {
  name: string;
  role: string;
  subjects: string[];
  email: string;
  zivotopis: string | null;
  image: string | null;
}

const TeachersList: React.FC = () => {
  const [filter, setFilter] = useState<string>(""); // Filtering state
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null); // Selected teacher
  const [teachers, setTeachers] = useState<Teacher[]>([]); // Processed teachers data

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://preview.zushm.cz/api/zamestanci/");
        const rawData = await response.json();

        const processedTeachers = rawData.map((teacher: any) => {
          const nameParts = teacher.Jmeno.split(", ");
          const name = nameParts[0];
          const nameSplit = name.split(" ");

          let email = "";
          if (nameSplit.length > 1) {
            const [firstName, lastName] = nameSplit;
            email = `${firstName.charAt(0).toLowerCase()}.${lastName.toLowerCase()}@zushm.cz`;
          }

          if (teacher.Jmeno === "Štěpán Křováček, MgA.") {
            email = "reditel@zushm.cz";
          }

          let role = "Učitel";
          switch (teacher.Obor.toLowerCase()) {
            case "hudebni":
              role = "Učitel hudebního oboru";
              break;
            case "tanecni":
              role = "Učitel tanečního oboru";
              break;
            case "vytvarny":
              role = "Učitel výtvarného oboru";
              break;
            case "administrativa":
              role = "Administrativní pracovník";
              break;
          }

          let imageUrl = defaultImage;
          if (teacher.Image && teacher.Image.trim() !== "") {
            imageUrl = teacher.Image.startsWith("http")
              ? teacher.Image
              : `https://preview.zushm.cz${teacher.Image}`;
          }

          return {
            name,
            role,
            subjects: teacher.Vyucuje ? teacher.Vyucuje.split(", ") : [],
            email: email || null,
            zivotopis: teacher.Zivotopis || null,
            image: imageUrl,
          };
        });

        setTeachers(processedTeachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="flex flex-col items-center mt-16 px-4 pt-16">
      {/* Nadpis */}
      <h1 className="text-3xl font-bold text-center mb-6">Naši zaměsntnanci</h1>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {[
          { label: "Všichni", value: "" },
          { label: "Hudební obor", value: "hudebního oboru" },
          { label: "Výtvarný obor", value: "výtvarného oboru" },
          { label: "Taneční obor", value: "tanečního oboru" },
          { label: "Administrativa", value: "Administrativní pracovník" },
        ].map(({ label, value }) => (
          <button
            key={value}
            className={`px-5 py-2 rounded-md transition ${
              filter === value ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {teachers
          .filter((teacher) =>
            filter ? teacher.role.toLowerCase().includes(filter.toLowerCase()) : true
          )
          .map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-5 rounded-lg cursor-pointer transition hover:shadow-lg text-center"
              onClick={() => setSelectedTeacher(teacher)}
            >
              <img
                src={teacher.image ?? defaultImage}
                alt={teacher.name}
                className="w-40 h-40 mx-auto object-cover rounded-full"
                onError={(e) => ((e.target as HTMLImageElement).src = defaultImage)}
              />
              <h2 className="text-lg font-bold mt-3">{teacher.name}</h2>
              <p className="text-sm text-gray-600">
                <strong>Pozice:</strong> {teacher.role}
              </p>
              {teacher.subjects.length > 0 && (
                <p className="text-sm text-gray-600">
                  <strong>Obory:</strong> {teacher.subjects.join(", ")}
                </p>
              )}
              <p className="text-sm text-blue-600">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
              </p>
            </div>
          ))}
      </div>

      {/* Teacher Details Popup */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedTeacher.image || defaultImage}
              alt={selectedTeacher.name}
              className="w-32 h-32 mx-auto rounded-full"
            />
            <h2 className="text-xl font-bold mt-4">{selectedTeacher.name}</h2>
            <p className="text-gray-700">
              <strong>Pozice:</strong> {selectedTeacher.role}
            </p>
            {selectedTeacher.subjects.length > 0 && (
              <p className="text-gray-700">
                <strong>Obory:</strong> {selectedTeacher.subjects.join(", ")}
              </p>
            )}
            <p className="text-blue-600">
              <strong>Email:</strong>{" "}
              <a href={`mailto:${selectedTeacher.email}`}>{selectedTeacher.email}</a>
            </p>

            {selectedTeacher.zivotopis && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md text-left">
                <h3 className="font-bold">Životopis</h3>
                <p className="text-gray-700">{selectedTeacher.zivotopis}</p>
              </div>
            )}

            <button
              className="mt-4 w-full bg-black text-white py-2 rounded-md"
              onClick={() => setSelectedTeacher(null)}
            >
              Zavřít
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersList;