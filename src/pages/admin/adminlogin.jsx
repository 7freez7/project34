import React, { useState, useEffect } from 'react';
import Logo from "../../data/logo.png"

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const login = username;
    const pass = password;

    // Send POST request using fetch
    fetch("https://preview.zushm.cz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify({ username: login, password: pass }), // Convert data to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse response as JSON
      })
      .then((result) => {
        console.log("Response:", result); // Log response in console

        if (result.token) { // Check if token exists in the response
          // Save token to cookies
          document.cookie = `token=${result.token}; path=/; Secure`;

          // Redirect to dashboard
          window.location.href = "/dashboard"; // Change the redirection to React route
        } else {
          alert("Login failed: Token not provided.");
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log error
        alert("Login failed. Please try again.");
      });
  };

  // Token validation on component mount
  useEffect(() => {
    // Attempt to retrieve the token from cookies
    const token = document.cookie.split("; ").find(row => row.startsWith("token"));

    // Check if the token exists
    if (token) {
      try {
        // Extract the token value
        const tokenValue = token.split("=")[1];
        console.log("Token Value:", tokenValue);

        // Validate the token with a GET request
        fetch("https://preview.zushm.cz/api/auth/validate", {
          method: "GET",
          headers: {
            "Authorization": tokenValue,
          },
        })
          .then(response => {
            if (response.ok) {
              console.log("Token validated successfully.");
              window.location.href = "/dashboard"; // Redirect to dashboard on successful validation
            } else {
              console.error("Invalid token.");
              // Handle invalid token (e.g., log out, show error, etc.)
            }
          })
          .catch(error => {
            console.error("Validation Error:", error);
          });
      } catch (error) {
        console.error("Error extracting token:", error);
      }
    }
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={Logo} alt="ZUŠ Heřmanův Městec Logo" style={styles.logo} />
        </div>
        <div style={styles.loginBox}>
          <h2 style={styles.heading}>Administrace</h2>
          <form id="loginForm" onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="username" style={styles.label}>Přihlašovácí jméno:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Vlož přihlašovácí jméno"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <label htmlFor="password" style={styles.label}>Heslo:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Vlož heslo"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Přihlásit se</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the Admin Login Page
const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(45deg, hsl(200, 46%, 54%), hsl(225, 5%, 17%))',
    margin: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column', // Stack logo and form vertically
  },
  logoContainer: {
    marginBottom: '20px', // Adds space between the logo and the form
  },
  logo: {
    maxWidth: '150px', // Adjust the size of the logo as necessary
    height: 'auto',
  },
  loginBox: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    color: '#007bff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    textAlign: 'left',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    background: 'hsl(0, 0%, 0%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AdminLogin;

