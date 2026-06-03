import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // 🎯 1. DOKUNUŞ: Sayfa içi pürüzsüz kaydırma için ekledik
import { FaFacebook, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const nachObenScrollen = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="fusszeile">
      <div className="fusszeile-container">
        <div className="fusszeile-sozial">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
        <div className="fusszeile-navigation">
          <Link to="/">Startseite</Link>
          <Link to="/ueber-mich">Über mich</Link>
          <Link to="/alle-eintraege">Alle Einträge</Link>

          {/* 🎯 KATEGORİLER: App.jsx içinde <Route path="/kategorien" element={<KategorieList />} /> ekli olduğundan emin ol */}
          <Link to="/kategorien">Kategorien</Link>

          {/* 🎯 KONTAKT: Eski <a> etiketini her sayfadan çalışabilen HashLink ile değiştirdik */}
          <HashLink smooth to="/#kontakt">Kontakt</HashLink>

          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </div>
        <div className="fusszeile-copyright">
          © {new Date().getFullYear()} Burcus Tagebuch. Alle Rechte vorbehalten.
        </div>
        <button onClick={nachObenScrollen} className="fusszeile-nach-oben">
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
}

export default Footer;