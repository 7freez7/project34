import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Uvod from "./pages/index";
import Kontakt from "./pages/Kontakt";
import Obory from "./pages/Obory";
import Footer from "./components/Footer";

import Galerie from "./pages/Galerie";
import Documents from "./pages/Documents";
import ChciNaZus from "./pages/Chcinazus";

import Prihlaska from "./pages/chcinazus/Prihlaska";
import Prijmacky from "./pages/chcinazus/Prijmacky";
import Priprava from "./pages/chcinazus/Priprava";

import Foto from "./pages/galerie/Foto";
import Video from "./pages/galerie/Video";

import Hudebni from "./pages/obory/Hudebni";
import Tanecni from "./pages/obory/Tanecni";
import Vytvarni from "./pages/obory/Vytvarni";

import Absolventi from "./pages/uvod/Absolventi";
import OSkole from "./pages/uvod/OSkole";
import Pracoviste from "./pages/uvod/Pracoviste";
import Zamestnanci from "./pages/uvod/Zamestnanci";
import TeachersList from "./data/TeachersList";


import Aktuality from "./components/Aktuality";
import { AuthProvider } from "./context/AuthContext";

import NotFound from "./NotFound";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Uvod />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/obory" element={<Obory />} />
              <Route path="/galerie" element={<Galerie />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/chcinazus" element={<ChciNaZus />} />

              <Route path="chcinazus/prihlaska" element={<Prihlaska />} />
              <Route path="chcinazus/prijmacky" element={<Prijmacky />} />
              <Route path="chcinazus/priprava" element={<Priprava />} />

              <Route path="/galerie/foto" element={<Foto />} />
              <Route path="/galerie/video" element={<Video />} />

              <Route path="/obory/hudebni" element={<Hudebni />} />
              <Route path="/obory/tanecni" element={<Tanecni />} />
              <Route path="/obory/vytvarni" element={<Vytvarni />} />

              <Route path="/uvod/absolventi" element={<Absolventi />} />
              <Route path="/uvod/about" element={<OSkole />} />
              <Route path="/uvod/pracoviste" element={<Pracoviste />} />
              <Route path="/uvod/teachers" element={<TeachersList />} />

              <Route path="/aktuality" element={<Aktuality />} />

              <Route path="*" element={<NotFound />} />

            </Routes>
          </main>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
