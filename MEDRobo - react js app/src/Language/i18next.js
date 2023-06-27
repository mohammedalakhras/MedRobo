import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../Language/en.json";
import translationAR from "../Language/ar.json";
i18next.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ar: { translation: translationAR },
  },
  lng: navigator.language,
});
export default i18next;
