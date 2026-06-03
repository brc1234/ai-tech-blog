import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactForm.css';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!privacyChecked) {
      alert("Bitte akzeptieren Sie die Datenschutzerklärung.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        setPrivacyChecked(false);
        setErrorMessage('');
      } else {
        setErrorMessage('Etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal.');
      }
    } catch (error) {
      setErrorMessage('Verbindung zum Server fehlgeschlagen.');
    }
  };

  return (
    <div id="kontakt" className="contact-form-container"> {/* Footer'dan kaydırma için id="kontakt" ekledik */}
      <h2>Kontakt</h2>
      <p>Du möchtest mir schreiben oder Feedback geben?</p>

     
      <ul className="contact-info">
        <li><strong>E-Mail:</strong> <a href="mailto:burcuacir6@gmail.com">info@burcustagebuch.de</a></li>
        <li><strong>Instagram:</strong> <a href="https://instagram.com/temelacir" target="_blank" rel="noopener noreferrer">@burcus_tagebuch</a></li>
        <li><strong>Telefon:</strong> +49 176 31784592</li>
      </ul>

      <div className="direct-contact">
        <h3>Oder direkt hier:</h3>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Dein Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Deine E-Mail</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Nachricht:</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" required></textarea>
            </div>
            <div className="form-group privacy-checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '15px', marginBottom: '15px' }}>
              <input type="checkbox" id="privacy" checked={privacyChecked} onChange={(e) => setPrivacyChecked(e.target.checked)} required style={{ marginTop: '4px', cursor: 'pointer' }} />
              <label htmlFor="privacy" style={{ fontSize: '14px', lineHeight: '1.4', color: '#555', cursor: 'pointer' }}>
                Ich stimme zu, dass meine Angaben aus dem <Link to="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#007bff' }}>Datenschutzerklärung</Link> erhoben und verarbeitet werden.
              </label>
            </div>
            <button type="submit" className="submit-button" disabled={!privacyChecked} style={{ opacity: privacyChecked ? 1 : 0.6, cursor: privacyChecked ? 'pointer' : 'not-allowed' }}>
              Senden
            </button>
          </form>
        ) : (
          <div className="success-message">
            <p>Deine Nachricht wurde erfolgreich gesendet!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactForm;