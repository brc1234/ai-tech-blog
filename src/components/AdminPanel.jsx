import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('ethik');
  const [imageUrl, setImageUrl] = useState('');
  const [readTime, setReadTime] = useState(5);

  const [message, setMessage] = useState({ text: '', isError: false });
  const [loading, setLoading] = useState(false);

  /* 🔒 ŞİFRE GİZLENDİ: Şifreyi artık .env dosyasından güvenli bir şekilde çekiyoruz */
  const DOGRU_SIFRE = import.meta.env.VITE_DOGRU_SIFRE;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === DOGRU_SIFRE) {
      setIsAuthorized(true);
      setLoginError('');
    } else {
      setLoginError('❌ Falsches Passwort! Bitte versuchen Sie es erneut.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', isError: false });

    const newPost = { title, summary, content, category, imageUrl, readTime: Number(readTime) };

    try {
      const response = await axios.post('/api/posts', newPost);
      if (response.status === 201 || response.status === 200) {
        setMessage({ text: '🎉 Beitrag erfolgreich gespeichert!', isError: false });
        setTitle('');
        setSummary('');
        setContent('');
        setImageUrl('');
        setReadTime(5);
      }
    } catch (error) {
      console.error('AdminPanel save error:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || 'Unbekannter Fehler';
      setMessage({ text: `❌ Fehler beim Speichern des Beitrags: ${errorMessage}`, isError: true });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="container mt-5" style={{ maxWidth: '450px' }}>
        <div className="card shadow p-4 border-0 text-center" style={{ borderRadius: '12px' }}>
          <div className="fs-1 mb-2">🔒</div>
          <h3 className="fw-bold mb-3" style={{ color: '#d95c5c' }}>Admin Login</h3>
          <p className="text-muted small">Bitte geben Sie das Passwort ein, um einen Beitrag zu verfassen.</p>

          {loginError && <div className="alert alert-danger py-2 small">{loginError}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control text-center"
                placeholder="Passwort eingeben..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn text-white w-100 fw-bold"
              style={{ backgroundColor: '#d95c5c', borderRadius: '8px' }}
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <div className="card shadow p-4 border-0" style={{ borderRadius: '12px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
          <h2 className="m-0" style={{ color: '#d95c5c', fontWeight: '700', fontSize: '1.6rem' }}>
            Neuen Blog-Beitrag Verfassen ✍️
          </h2>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsAuthorized(false)}>
            Abmelden 🔓
          </button>
        </div>

        {message.text && (
          <div className={`alert ${message.isError ? 'alert-danger' : 'alert-success'} text-center`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Titel</label>
            <input
              type="text" className="form-control" value={title}
              onChange={(e) => setTitle(e.target.value)} required placeholder="z.B. Die Zukunft von Web-Dev"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Summary</label>
            <input
              type="text" className="form-control" value={summary}
              onChange={(e) => setSummary(e.target.value)} required placeholder="Kurze Beschreibung für die Karte..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Content</label>
            <textarea
              className="form-control" rows="6" value={content}
              onChange={(e) => setContent(e.target.value)} required placeholder="Schreibe hier deinen langen Blog-Text..."
            ></textarea>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Kategorie</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="ethik">Ethik</option>
                <option value="freundschaft">Freundschaft</option>
                <option value="digitalisierung">Digitalisierung</option>
                <option value="alltag">Alltag</option>
              </select>
            </div>

            <div className="col-md-3 col-6 mb-3">
              <label className="form-label fw-bold">Bild URL</label>
              <input
                type="text"
                className="form-control"
                placeholder="https://... oder /img/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3 col-6 mb-3">
              <label className="form-label fw-bold">Lesezeit (Min)</label>
              <input
                type="number" className="form-control" min="1" value={readTime}
                onChange={(e) => setReadTime(e.target.value)} required
              />
            </div>
          </div>

          <button
            type="submit" className="btn btn-primary w-100 fw-bold mt-3 py-2"
            disabled={loading} style={{ backgroundColor: '#d95c5c', borderColor: '#d95c5c', borderRadius: '8px' }}
          >
            {loading ? 'Wird gespeichert... ⏳' : 'Beitrag Veröffentlichen 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;