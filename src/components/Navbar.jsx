import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaGlobe, FaChevronDown, FaSun, FaMoon } from 'react-icons/fa'; // İkonları ekledik
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContext'; // 🎯 NOT: Hata alırsan burayı './ThemeContext' yap!
import './Navbar.css';

function Navbar() {
  const [istOffen, setIstOffen] = useState(false);
  const [suchBegriff, setSuchBegriff] = useState('');
  const [dilAcik, setDilAcik] = useState(false);
  const [katAcik, setKatAcik] = useState(false);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  // Tema kontrolü
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    document.title = "Merles Tagebuch";
  }, []);

  const currentLang = i18n.language.split('-')[0];

  const dilDegistir = (lang) => {
    i18n.changeLanguage(lang);
    setDilAcik(false);
  };

  const aramaYap = (e) => {
    e.preventDefault();
    if (suchBegriff.trim()) {
      navigate(`/alle-eintraege?search=${suchBegriff}`);
    }
  };

  return (
    <nav className="o-navbar">
      <div className="o-container">

        {/* Logo */}
        <Link to="/" className="o-logo">
          <span className="o-logo-m">M</span>erles<span className="o-logo-t">Tagebuch</span>
        </Link>

        {/* Mobil Menü Açma Butonu */}
        <button className="o-mobil-buton" onClick={() => setIstOffen(!istOffen)}>
          <FaBars />
        </button>

        {/* Menü Linkleri ve Sağ Taraf */}
        <div className={`o-menu-collapse ${istOffen ? 'o-show' : ''}`}>
          <ul className="o-nav-liste">

            {/* Arama Çubuğu */}
            <li className="o-nav-item">
              <form onSubmit={aramaYap} className="o-arama-form">
                <input
                  className="o-arama-input"
                  type="search"
                  placeholder={`${t('search')}...`}
                  value={suchBegriff}
                  onChange={(e) => setSuchBegriff(e.target.value)}
                />
              </form>
            </li>

            <li className="o-nav-item">
              <Link to="/" className="o-link">{t('home')}</Link>
            </li>

            <li className="o-nav-item">
              <Link to="/ueber-mich" className="o-link">{t('aboutMe')}</Link>
            </li>

            <li className="o-nav-item">
              <Link to="/alle-eintraege" className="o-link">{t('allEntries')}</Link>
            </li>

            {/* Kategoriler Dropdown */}
            <li className="o-nav-item o-relative">
              <button className="o-link o-dropdown-toggle" onClick={() => setKatAcik(!katAcik)}>
                {t('categories')} <FaChevronDown className="o-ok-ikon" />
              </button>
              <ul className={`o-ozel-dropdown ${katAcik ? 'o-acik' : ''}`}>
                <li>
                  <Link className="o-dropdown-link" to="/alle-eintraege?category=ethik" onClick={() => setKatAcik(false)}>
                    {t('catEthik')}
                  </Link>
                </li>
                <li>
                  <Link className="o-dropdown-link" to="/alle-eintraege?category=freundschaft" onClick={() => setKatAcik(false)}>
                    {t('catFreundschaft')}
                  </Link>
                </li>
                <li>
                  <Link className="o-dropdown-link" to="/alle-eintraege?category=digitalisierung" onClick={() => setKatAcik(false)}>
                    {t('catDigitalisierung')}
                  </Link>
                </li>
                <li>
                  <Link className="o-dropdown-link" to="/alle-eintraege?category=alltag" onClick={() => setKatAcik(false)}>
                    {t('catAlltag')}
                  </Link>
                </li>
              </ul>
            </li>

            <li className="o-nav-item">
              <a href="#kontakt" className="o-link">{t('contact')}</a>
            </li>

            {/* Dil Seçimi Dropdown */}
            <li className="o-nav-item o-relative">
              <button className="o-link o-dropdown-toggle" onClick={() => setDilAcik(!dilAcik)}>
                <FaGlobe /> <span className="o-uppercase">{currentLang}</span> <FaChevronDown className="o-ok-ikon" />
              </button>
              <ul className={`o-ozel-dropdown o-dropdown-sol ${dilAcik ? 'o-acik' : ''}`}>
                <li>
                  <button onClick={() => dilDegistir('de')} className={`o-dil-btn ${currentLang === 'de' ? 'o-aktif' : ''}`}>
                    Deutsch (DE)
                  </button>
                </li>
                <li>
                  <button onClick={() => dilDegistir('tr')} className={`o-dil-btn ${currentLang === 'tr' ? 'o-aktif' : ''}`}>
                    Türkçe (TR)
                  </button>
                </li>
                <li>
                  <button onClick={() => dilDegistir('en')} className={`o-dil-btn ${currentLang === 'en' ? 'o-aktif' : ''}`}>
                    English (EN)
                  </button>
                </li>
              </ul>
            </li>

            {/* 🎯 RENKLERİ PROJEYE UYGUN BUTON */}
            <li className="o-nav-item" style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={toggleTheme}
                className="o-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit' /* Projenin kendi yazı/buton rengini otomatik alır */
                }}
              >
                {isDarkMode ? <FaSun style={{ color: '#ffca28' }} /> : <FaMoon />}
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;