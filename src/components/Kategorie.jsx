import React, { useState } from 'react';

function Kategorie({ image, title, description, fullDescription, datum, lesezeit, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tarih formatını Almanca standartlarına güvenle çevirir
  const formatierteDatum = (() => {
    try {
      if (!datum) return "02. Juni 2026";
      const d = new Date(datum);
      return isNaN(d.getTime()) ? String(datum) : d.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return "02. Juni 2026";
    }
  })();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="col">
      <div className="card kategorie h-100 shadow-sm border-0">
        <div style={{ position: 'relative' }}>
         <img
            src={image && image.startsWith('http') ? image : `/img/${image || '1.jpg'}`}
            alt={title}
            className="card-img-top"
            style={{ objectFit: 'cover', height: '220px', width: '100%' }}
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#d95c5c',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '0.8em',
            fontWeight: 'bold'
          }}>
            Neu
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h4 className="card-title mt-2" style={{ color: '#222' }}>{title}</h4>
          <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.95rem' }}>{description}</p>
          <div className="meta-info d-flex justify-content-between text-muted small mt-2 border-top pt-2">
            <span>⏰ {lesezeit} Minuten</span>
            <span>📅 {formatierteDatum}</span>
          </div>
          <button
            onClick={openModal}
            className="btn btn-primary mt-3 w-100 fw-bold"
            style={{ backgroundColor: '#d95c5c', borderColor: '#d95c5c' }}
          >
            Weiterlesen
          </button>
        </div>
      </div>

      {/* 🚀 GELİŞMİŞ DETAY SAYFASI (MODAL) */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* stopPropagation sayesinde modalın içine tıklanınca kapanmaz, sadece dışına veya kapat butonuna tıklanınca kapanır */}
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header-custom">
              <h3 className="modal-title-custom">{title}</h3>
              <button className="close-button-custom" onClick={closeModal}>&times;</button>
            </div>

            <div className="modal-meta-custom">
              <span>📅 {formatierteDatum}</span>
              <span className="mx-2">|</span>
              <span>⏰ {lesezeit} Min. Lesezeit</span>
            </div>

            <hr />

            <div className="modal-body-custom">
              {/* Resim detay sayfasının içinde de çok şık dursun */}
              <img
                  src={image && image.startsWith('http') ? image : `/img/${image || '1.jpg'}`}
                  alt={title}
                  className="img-fluid rounded mb-4"
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />


              {/* MongoDB'den gelen uzun metni paragraflara ayırarak ekrana basar */}
              {fullDescription ? (
                fullDescription.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="modal-paragraph-custom">
                      {paragraph}
                    </p>
                  )
                ))
              ) : (
                <p className="text-muted">Kein Inhalt verfügbar.</p>
              )}
            </div>

            <div className="modal-footer-custom">
              <button onClick={closeModal} className="btn btn-secondary w-100 fw-bold" style={{ borderRadius: '6px' }}>
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💅 DETAY SAYFASI ÖZEL MODERN CSS STİLLERİ */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex; justify-content: center; align-items: center;
            z-index: 1050;
            backdrop-filter: blur(4px);
          }
          .modal-content-custom {
            background-color: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 650px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease-out;
          }
          .modal-header-custom {
            display: flex; justify-content: space-between; align-items: flex-start;
          }
          .modal-title-custom { color: #d95c5c; font-weight: 700; margin-0; font-size: 1.5rem; }
          .close-button-custom {
            background: none; border: none; font-size: 2rem; line-height: 1;
            color: #aaa; cursor: pointer; transition: color 0.2s;
          }
          .close-button-custom:hover { color: #333; }
          .modal-meta-custom { font-size: 0.85rem; color: #6c757d; margin-top: 5px; }
          .modal-paragraph-custom {
            line-height: 1.7; color: #333; font-size: 1.05rem; margin-bottom: 15px; text-align: justify;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Kategorie;