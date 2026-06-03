import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend'; // 🚀 Yeni eklediğimiz paket

i18n
  .use(HttpBackend) // 🎯 public/locales/ altındaki düz .json dosyalarını okumasını sağlar
  .use(LanguageDetector) // Kullanıcının tarayıcı dilini anlar
  .use(initReactI18next)
  .init({
    debug: false, // Konsolda çok fazla yazı birikmesin diye false yaptık, istersen true kalabilir
    fallbackLng: 'de', // Eğer dil seçilmediyse varsayılan dil Almanca olsun

    // 📁 i18next'e dosyaları tam olarak nerede arayacağını söylüyoruz:
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },

    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağladığı için false yapıyoruz
    }
  });

export default i18n;