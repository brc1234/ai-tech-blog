// components/Buchempfehlungen.jsx
import React from 'react';

function Buchempfehlungen() {
  const buecher = [
    { id: 1, titel: '1984', autor: 'George Orwell' },
    { id: 2, titel: 'Schuld und Sühne', autor: 'Fjodor Dostojewski' },
    { id: 3, titel: 'Der Herr der Ringe', autor: 'J.R.R. Tolkien' },
    // ... weitere Bücher
  ];

  return (
    <div className="buch-empfehlungen">
      <h2>Buchempfehlungen</h2>
      <ul>
        {buecher.map((buch) => (
          <li key={buch.id}>
            {buch.titel} ({buch.autor})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buchempfehlungen;