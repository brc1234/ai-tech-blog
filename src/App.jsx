import React from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import KategorieList from './components/KategorieList';
import ContactForm from './components/ContactForm';
import AboutPage from './pages/AboutPage';
import AlleEintraege from './pages/AlleEintraege';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// 🎯 Impressum ve Datenschutz 'components' klasöründe olduğu için import yollarını güncelledik
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Ana Sayfa Rotaları */}
          <Route
            path="/"
            element={
              <>
                <Slider />
                <KategorieList />
                <div id="kontakt" className="container mt-5 mb-5">
                  <ContactForm />
                </div>
              </>
            }
          />

          {/* Diğer Sayfa Rotaları */}
          <Route path="/ueber-mich" element={<AboutPage />} />
          <Route path="/alle-eintraege" element={<AlleEintraege />} />
          <Route path="/admin" element={<AdminPanel />} />

          {/* Footer'dan gelen yeni sayfaların rotaları */}
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/kategorien" element={<KategorieList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;