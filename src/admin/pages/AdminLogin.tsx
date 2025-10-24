import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Uloží token do LocalStorage
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        setError(data.error || "Neplatné heslo");
      }
    } catch (err) {
      setError("Chyba serveru");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Přihlášení do administrace</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Zadejte heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "300px" }}
        />
        <br />
        <button
          type="submit"
          style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        >
          Přihlásit se
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
