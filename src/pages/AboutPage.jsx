import React from 'react';
import { Helmet } from 'react-helmet-async'; // 🎯 SEO için import ettik
import './AboutPage.css';
import placeholderImage from '../assets/placeholder-profile.jpg';

function AboutPage() {
  return (
    <div className="about-page-container">

      {/* 🎯 GOOGLE VE SOSYAL MEDYA SEO AYARLARI */}
      <Helmet>
        <title>Über mich - Burcus Tagebuch | Softwareentwicklerin & Blog</title>
        <meta name="description" content="Lerne Burcu kennen – Absolventin der Softwareentwicklung, Reisende und Bloggerin. Entdecke persönliche Geschichten, Reiseberichte und Gedanken über das Leben." />
        <meta name="keywords" content="Burcu, Softwareentwicklerin, Blog, Reiseberichte, persönliche Reflexionen, Gedanken" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (WhatsApp, Instagram, LinkedIn Paylaşımları İçin) */}
        <meta property="og:title" content="Über mich - Burcus Tagebuch" />
        <meta property="og:description" content="Hallo Welt, ich bin Burcu! Absolventin der Softwareentwicklung ve Bloggerin. Erfahre mehr über meine Reise durch das Leben." />
        <meta property="og:image" content={placeholderImage} /> {/* Paylaşıldığında görünecek resim */}
        <meta property="og:type" content="profile" />
      </Helmet>

      <div className="about-page-content">
        <img src={placeholderImage} alt="Mein Profil" className="profile-image" />
        <h1>Hallo Welt, ich bin Burcu!</h1>
        <p>
          Ich freue mich sehr, dich auf meiner kleinen digitalen Heimat begrüßen zu dürfen.
          Als Absolventin der Softwareentwicklung bringe ich eine analytische und strukturierte
          Denkweise mit, die sich vielleicht auch in meinen Beobachtungen und Geschichten
          widerspiegelt.
        </p>
        <p>
          Dieser Blog ist mein persönlicher Raum, um meine Gedanken über das Leben, meine
          Leidenschaften, unvergessliche Reisen und wertvolle Erinnerungen mit euch zu teilen.
        </p>

        <h2>Meine Perspektive</h2>
        <p>
          Ich betrachte das Leben als eine ständige Entdeckungsreise voller kleiner und großer
          Wunder. Es sind oft die unscheinbaren Momente, die den größten Wert haben und die
          ich hier gerne festhalte. Meine Interessen sind vielfältig und reichen vom Erkunden
          neuer Kulturen über den Genuss guter Bücher bis hin zu kreativen Projekten. Diese
          Leidenschaften inspirieren mich und prägen meine Sicht auf die Welt.
        </p>

        <h2>Reisen und Erinnerungen</h2>
        <p>
          Das Reisen ist für mich eine Quelle unendlicher Inspiration. Jeder neue Ort, jede
          Begegnung erweitert meinen Horizont und hinterlässt unvergessliche Eindrücke.
          Diese Erlebnisse und die damit verbundenen Erinnerungen sind ein wichtiger Teil meiner
          Geschichte. Indem ich sie hier teile, möchte ich nicht nur meine eigenen Erfahrungen
          reflektieren, sondern vielleicht auch andere dazu anregen, ihre eigenen Abenteuer zu
          erleben und wertzuschätzen.
        </p>

        <h2>Was dich hier erwartet</h2>
        <p>
          Auf diesem Blog könnt ihr euch auf eine bunte Mischung aus persönlichen Reflexionen,
          Reiseberichten und Anekdoten aus dem Alltag freuen. Es ist ein Platz für Gedanken,
          Inspiration und den Austausch von Erfahrungen.
        </p>

        <h2>Lasst uns in Kontakt treten!</h2>
        <p>
          Ich freue mich darauf, meine Perspektive mit euch zu teilen und vielleicht auch eure
          Gedanken und Ansichten kennenzulernen. Hinterlasst gerne Kommentare und lasst uns in
          einen Austausch treten!
        </p>

        <p className="abschied">Liebe Grüße,<br />Burcu</p>
      </div>
    </div>
  );
}

export default AboutPage;