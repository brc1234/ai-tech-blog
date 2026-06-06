import React from 'react';

function Impressum() {
  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <h1 className="fw-bold mb-4">Impressum</h1>
      <p className="fw-bold mb-1">Angaben gemäß § 5 TMG:</p>
      <p className="mb-4">
        Burcu Acir<br />
        Heideweg 15<br />
        51469
      </p>

      <h3 className="h5 fw-bold mb-2">Kontakt</h3>
      <p className="mb-4">
        Telefon: +49 176 3178XXX<br />
        E-Mail: burcuacr@gmail.com
      </p>

      <h3 className="h5 fw-bold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
      <p>
        Burcu Acr<br />
        Helloweg 34 <br />
        51469 Bergisch Gladbach
      </p>
    </div>
  );
}

export default Impressum;