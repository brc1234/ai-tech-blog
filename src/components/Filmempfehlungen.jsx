import React from 'react';
import './Filmempfehlungen.css';

function Filmempfehlungen() {
  const filme = [
    { id: 1, titel: 'Die Verurteilten', regisseur: 'Frank Darabont', cover: '/img/verurteilten.jpg' },
    { id: 2, titel: 'Der Pate', regisseur: 'Francis Ford Coppola', cover: '/img/pate.jpg' },
    { id: 3, titel: 'The Dark Knight', regisseur: 'Christopher Nolan', cover: '/img/darkknight.jpg' },
    // ... weitere Filme mit Cover-URLs
  ];

  return (
    <div className="film-empfehlungen">
      <h2>Filmempfehlungen</h2>
      <div className="empfehlungs-liste">
        {filme.map((film) => (
          <div key={film.id} className="empfehlungs-item">
            <img src={film.cover} alt={`Cover von ${film.titel}`} className="empfehlungs-cover" />
            <div className="empfehlungs-info">
              <h3>{film.titel}</h3>
              <p>Regisseur: {film.regisseur}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filmempfehlungen;