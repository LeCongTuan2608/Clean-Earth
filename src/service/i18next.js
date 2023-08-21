import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, vi } from '../locales';

const languageResources = {
   en: { translation: en },
   vi: { translation: vi },
};
i18next
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      compatibilityJSON: 'v3',
      lng: 'en', // if you're using a language detector, do not define the lng option
      fallbackLng: 'en',
      resources: languageResources,
      interpolation: {
         escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
   });

export { i18next, languageResources };
