import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "vi",
    supportedLngs: ["vi", "ja"],
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["queryString", "path", "cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
