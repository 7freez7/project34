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
import Historie from "./pages/uvod/Historie";
import Pracoviste from "./pages/uvod/Pracoviste";
import Soucasnost from "./pages/uvod/Soucasnost";
import Zamestnanci from "./pages/uvod/Zamestnanci";
import TeachersList from "./data/TeachersList";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import AdminLogin from "./pages/admin/adminlogin";
import PrijmaciRizeniPage from "./pages/prijmaciRizeni/prijmaci-rizeni";
import NotFound from "./pages/404";
import { AdmissionList } from "./pages/prijmaciRizeni/export";
import { Newspaper } from "lucide-react";
import AktualityContainer from "./pages/Aktuality";
import NewsItemPage from "./components/newsID";
import NovinkyPage from "./pages/admin/NovinkyPage";
import Dashboard from "./pages/admin/dashboard";
import PrijimaciRizeniPage from "./pages/admin/PrijimaciRizeniPage";
import ExportPrijPage from "./pages/admin/ExportPrijPage";
import ZamestnanciPage from "./pages/admin/ZamestnanciPage";
import UzivatelePage from "./pages/admin/UzivatelePage";
import ProtectedRoute from "./lib/ProtectedRoutes";
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/adminlogin') || location.pathname === '/newdash' || location.pathname === '/prijmacirizeni';
  const dashboard = location.pathname.includes('/dashboard') || location.pathname === '/dashboard/novinky';
  const isPrijmacky = location.pathname.includes('/chcinazus/prijmacirizeni');
  const news = location.pathname.includes('/news/');

  return (
    <div className="App">
        {!isAdminPage && !news && !dashboard && <Navbar />}
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
            <Route path="chcinazus/prijmacirizeni" element={<PrijmaciRizeniPage />} />

            <Route path="/galerie/foto" element={<Foto />} />
            <Route path="/galerie/video" element={<Video />} />

            <Route path="/obory/hudebni" element={<Hudebni />} />
            <Route path="/obory/tanecni" element={<Tanecni />} />
            <Route path="/obory/vytvarni" element={<Vytvarni />} />

            <Route path="/uvod/absolventi" element={<Absolventi />} />
            <Route path="/uvod/historie" element={<Historie />} />
            <Route path="/uvod/pracoviste" element={<Pracoviste />} />
            <Route path="/uvod/soucasnost" element={<Soucasnost />} />
            <Route path="/uvod/teachers" element={<TeachersList />} />

            <Route path="/aktuality" element={<AktualityContainer />} />
            <Route path="/aktuality/:id" element={<NewsItemPage />} />
            <Route path="/404" element={<NotFound/>}/>

            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/prijmacirizeni" element={<AdmissionList />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="/dashboard/prijimacirizeni" element={<ProtectedRoute><PrijimaciRizeniPage /></ProtectedRoute>}/>
            <Route path="/dashboard/prijimacirizeniexport" element={<ProtectedRoute><ExportPrijPage /></ProtectedRoute>}/>
            <Route path="/dashboard/zamestnanci" element={<ProtectedRoute><ZamestnanciPage /></ProtectedRoute>}/>
            <Route path="/dashboard/novinky" element={<ProtectedRoute><NovinkyPage /></ProtectedRoute>}/>
            <Route path="/dashboard/uzivatele" element={<ProtectedRoute><UzivatelePage /></ProtectedRoute>}/>
          </Routes>
        </main>
        {!isAdminPage && !isPrijmacky && !news && !dashboard && <Footer />}
    </div>
  );
}

export default App;
