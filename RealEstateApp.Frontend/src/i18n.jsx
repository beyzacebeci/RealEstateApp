import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const lang = localStorage.getItem("lang") ?? "en";

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: lang,
    detection: {
      // Add `localStorage` detection
      lookupLocalStorage: "lang",
    },
  });

// Update `i18n` instance when language is changed
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;
