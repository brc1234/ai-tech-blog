import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // SEO Engine aktif
import axios from 'axios';
import './AlleEintraege.css';

function AlleEintraege() {
  const [techPosts, setTechPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const aramaKelimesi = queryParams.get('search') || '';
  const secilenKategori = queryParams.get('category') || '';

  // 🎯 FOTOĞRAFLARIN GERİ GELMESİ İÇİN: Public klasöründeki yolları doğrudan tanımladık
  const filme = [
    { id: 1, titel: 'Die Verurteilten', regisseur: 'Frank Darabont', cover: '/img/platzhalter-film.jpg' },
    { id: 2, titel: 'Der Pate', regisseur: 'Francis Ford Coppola', cover: '/img/platzhalterFilm2.jpg' },
    { id: 3, titel: 'The Dark Knight', regisseur: 'Christopher Nolan', cover: '/img/platzhalterFilm3.jpg' },
  ];

  const buecher = [
    { id: 1, titel: '1984', autor: 'George Orwell', cover: '/img/platzhalterBuch.jpg' },
    { id: 2, titel: 'Schuld und Sühne', autor: 'Fjodor Dostojewski', cover: '/img/platzhalterBuch2.jpg' },
    { id: 3, titel: 'Der Herr der Ringe', autor: 'J.R.R. Tolkien', cover: '/img/platzhalterBuch3.jpg' },
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        setTechPosts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Veri çekilirken hata oluştu:", err);
        setLoading(false);
      });
  }, []);

  // Filtreleme motoru
  const filtrelenmisTechPosts = techPosts.filter((post) => {
    const kategoriUyumlu = secilenKategori
      ? (post.category && post.category.toLowerCase() === secilenKategori.toLowerCase())
      : true;

    const aramaUyumlu = (post.title && post.title.toLowerCase().includes(aramaKelimesi.toLowerCase())) ||
                        (post.summary && post.summary.toLowerCase().includes(aramaKelimesi.toLowerCase())) ||
                        (post.category && post.category.toLowerCase().includes(aramaKelimesi.toLowerCase()));

    return kategoriUyumlu && aramaUyumlu;
  });

  const filtrelenmisFilme = secilenKategori ? [] : filme.filter((film) =>
    film.titel.toLowerCase().includes(aramaKelimesi.toLowerCase()) ||
    film.regisseur.toLowerCase().includes(aramaKelimesi.toLowerCase())
  );

  const filtrelenmisBuecher = secilenKategori ? [] : buecher.filter((buch) =>
    buch.titel.toLowerCase().includes(aramaKelimesi.toLowerCase()) ||
    buch.autor.toLowerCase().includes(aramaKelimesi.toLowerCase())
  );

  // Google SEO Başlık ve Açıklama Üreticisi
  const holeSeoTitel = () => {
    if (secilenKategori) return `Kategorie: ${secilenKategori.toUpperCase()} - Burcus Tagebuch`;
    if (aramaKelimesi) return `Suche nach "${aramaKelimesi}" - Burcus Tagebuch`;
    return "Alle Einträge: Blogs, Filme & Bücher - Burcus Tagebuch";
  };

  const holeSeoBeschreibung = () => {
    if (secilenKategori) return `Entdecke alle Blogbeiträge aus der Kategorie ${secilenKategori} auf Burcus Tagebuch. Jetzt lesen!`;
    return "Durchstöbere alle meine Blogeinträge über Technologie und KI sowie meine persönlichen Empfehlungen für Filme und Bücher.";
  };

  return (
    <div className="alle-eintraege">

      {/* 🎯 GOOGLE METADATEN */}
      <Helmet>
        <title>{holeSeoTitel()}</title>
        <meta name="description" content={holeSeoBeschreibung()} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={holeSeoTitel()} />
        <meta property="og:description" content={holeSeoBeschreibung()} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* 🚀 KI & TECHNOLOGIE TAGEBUCH */}
      <section className="empfehlungs-bereich">
        <h2>
          {secilenKategori
            ? `Kategorie: ${secilenKategori.toUpperCase()}`
            : 'KI & Technologie Tagebuch'}
        </h2>

        {loading ? (
          <p className="text-center">Beiträge werden geladen... 🤖</p>
        ) : (
          <div className="empfehlungs-liste">
            {filtrelenmisTechPosts.map((post) => (
              <div key={post._id} className="empfehlungs-item">
                <img
                  src={post.imageUrl || 'https://via.placeholder.com/150'}
                  alt={`Cover von ${post.title}`}
                  className="empfehlungs-cover"
                />
                <div className="empfehlungs-info">
                  <span className="badge kategori-etiket mb-1">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{post.summary}</p>
                  <small className="text-muted d-block mb-2">{post.readTime} Min. Lesezeit</small>

                  <Link to={`/post/${post._id}`} className="btn btn-weiterlesen mt-auto">
                    Weiterlesen
                  </Link>
                </div>
              </div>
            ))}

            {filtrelenmisTechPosts.length === 0 && (
              <p className="text-muted">Keine Technologiebeiträge gefunden. 🔍</p>
            )}
          </div>
        )}
      </section>

      {/* 🎬 FİLM ÖNERİLERİ */}
      {!secilenKategori && (
        <section className="empfehlungs-bereich">
          <h2>Filmempfehlungen</h2>
          <div className="empfehlungs-liste">
            {filtrelenmisFilme.map((film) => (
              <div key={film.id} className="empfehlungs-item">
                <img src={film.cover} alt={`Cover von ${film.titel}`} className="empfehlungs-cover" />
                <div className="empfehlungs-info">
                  <h3>{film.titel}</h3>
                  <p>Regisseur: {film.regisseur}</p>
                </div>
              </div>
            ))}
            {filtrelenmisFilme.length === 0 && (
              <p className="text-muted">Keine Filme gefunden.</p>
            )}
          </div>
        </section>
      )}

      {/* 📚 KİTAP ÖNERİLERİ */}
      {!secilenKategori && (
        <section className="empfehlungs-bereich">
          <h2>Buchempfehlungen</h2>
          <div className="empfehlungs-liste">
            {filtrelenmisBuecher.map((buch) => (
              <div key={buch.id} className="empfehlungs-item">
                <img src={buch.cover} alt={`Cover von ${buch.titel}`} className="empfehlungs-cover" />
                <div className="empfehlungs-info">
                  <h3>{buch.titel}</h3>
                  <p>Autor: {buch.autor}</p>
                </div>
              </div>
            ))}
            {filtrelenmisBuecher.length === 0 && (
              <p className="text-muted">Keine Bücher gefunden.</p>
            )}
          </div>
        </section>
      )}

    </div>
  );
}

export default AlleEintraege;