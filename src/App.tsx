import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Uvod from "./pages/Uvod";
import Kontakt from "./pages/Kontakt";
import Obory from "./pages/Obory";
import Footer from "./components/Footer";

import Galerie from "./pages/Galerie";
import Documents from "./pages/Documents";
import ChciNaZus from "./pages/Chcinazus";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/uvod" element={<Uvod />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/obory" element={<Obory />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/chcinazus" element={<ChciNaZus />} />



          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
