import React, { useState, useEffect } from 'react';
import './Slider.css';

function Slider() {
  const slides = [
    {
      src: '/img/slider1.jpg',
      title: 'Alltag und Gedanken',
      description: 'Die schriftliche Entfaltung der tiefen Bedeutungen, die wir in den alltäglichen Momenten des Lebens finden.',
    },
    {
      src: '/img/slider3.jpg',
      title: 'Inspirierende Geschichten',
      description: 'Geschichten aus dem wahren Leben, die Herzen berühren und zum Nachdenken anregen.',
    },
    {
      src: '/img/slider2.jpg',
      title: 'Persönliche Entwicklung',
      description: 'Tipps und Wege zur geistigen und seelischen Weiterentwicklung.',
    },
    {
      src: '/img/slider4.jpg',
      title: 'Jeder Ort, den ich besuche, ist eine Geschichte: Mein Reisetagebuch',
      description: 'Jeder Ort, den ich besuche, ist nicht nur eine Landschaft; jede Straße, jedes Gesicht, jeder Moment erweitert die Welt in mir.',
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="slider">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide ${i === index ? 'active' : ''}`}
        >
          <img src={slide.src} alt={slide.title} />
          <div className="caption">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}

      <button className="nav prev" onClick={goToPrev}>&lt;</button>
      <button className="nav next" onClick={goToNext}>&gt;</button>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slider;

