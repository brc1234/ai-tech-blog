import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Kategorie from './Kategorie';

function KategorieList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/kategoriler')
      .then(response => {
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Backend bağlantı hatası:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-5 text-center"><h3>Beiträge werden geladen... 🤖</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#333' }}>Technologietagebuch & Gedanken</h2>

      <div className="d-flex flex-wrap justify-content-center gap-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {posts.map((post, index) => {
          if (!post) return null;

          // 🚀 DİNAMİK RESİM MANTIĞI:
          // Eğer MongoDB'deki imageUrl "http" ile başlıyorsa (yani internet linkiyse) direkt o linki kullanır.
          // Eğer veri tabanına sadece "1.jpg", "2.jpg" yazdıysan veya boş bıraktıysan yerel klasörden çeker.
          let resimYolu = "1.jpg"; // varsayılan yedek resim

          if (post.imageUrl) {
            if (post.imageUrl.startsWith('http')) {
              resimYolu = post.imageUrl; // İnternet linkini doğrudan ata
            } else {
              resimYolu = post.imageUrl; // "2.jpg" gibi metinse aynen ata
            }
          }

          return (
            <div key={post._id || index} style={{ width: '100%', maxWidth: '450px' }}>
              <Kategorie
                id={post._id}
                title={post.title || "Kein Titel"}
                description={post.summary || ""}
                fullDescription={post.content || ""}
                image={resimYolu} // Hazırladığımız dinamik yolu gönderiyoruz
                datum={post.createdAt || new Date().toISOString()}
                lesezeit={post.readTime || 5}
              />
            </div>
          );
        })}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-muted mt-4">Henüz hiç blog yazısı bulunamadı.</p>
      )}
    </div>
  );
}

export default KategorieList;