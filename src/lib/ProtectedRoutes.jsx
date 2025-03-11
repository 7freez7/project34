import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find(row => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          setIsValid(false);
          return;
        }

        const response = await fetch("https://preview.zushm.cz/api/auth/validateadmin", {
          method: "GET",
          headers: {
            Authorization: token,  // Correct format for Authorization header
          },
        });

        if (response.status === 200) {
          console.log("User is an admin");
          setIsValid(true);  // Token is valid and user is admin
        } else if (response.status === 403) {
          console.log("User is not an admin");
          setIsValid(false);  // Token is valid but user is not an admin
        } else {
          console.log("Unexpected status code:", response.status);
          setIsValid(false);  // Any unexpected status
        }
      } catch (error) {
        console.error("Validation Error:", error);
        setIsValid(false);  // If there’s an error with fetching or validating
      }
    };

    validateToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>;  // Still loading state
  }

  return isValid ? <>{children}</> : <Navigate to="/adminlogin" />;  // Protecting route
};

export default ProtectedRoute;