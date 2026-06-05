import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import './AlleEintraege.css';

function AlleEintraege() {
  const [techPosts, setTechPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const aramaKelimesi = queryParams.get('search') || '';
  const secilenKategori = queryParams.get('category') || '';

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
    axios.get('/api/posts')
      .then(response => {
        console.log('/api/posts response', response.status, response.data);
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
            ? response.data.data
            : [];
        setTechPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Veri çekilirken hata oluştu:", err);
        setLoading(false);
      });
  }, []);

  // Güvenli filtreleme: techPosts her zaman bir dizi gibi davranır
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
      <Helmet>
        <title>{holeSeoTitel()}</title>
        <meta name="description" content={holeSeoBeschreibung()} />
      </Helmet>

      <section className="empfehlungs-bereich">
        <h2>{secilenKategori ? `Kategorie: ${secilenKategori.toUpperCase()}` : 'KI & Technologie Tagebuch'}</h2>
        {loading ? (
          <p className="text-center">Beiträge werden geladen... 🤖</p>
        ) : (
          <div className="empfehlungs-liste">
            {filtrelenmisTechPosts.map((post) => (
              <div key={post._id} className="empfehlungs-item">
                <img src={post.imageUrl || 'https://via.placeholder.com/150'} alt={post.title} className="empfehlungs-cover" />
                <div className="empfehlungs-info">
                  <span className="badge">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                  <Link to={`/post/${post._id}`}>Weiterlesen</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AlleEintraege;