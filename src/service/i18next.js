import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, vi } from '../locales';
import config from '../config';

const languageResources = {
   en: { translation: en },
   vi: { translation: vi },
};
i18next
   .use(initReactI18next) // passes i18n down to react-i18next
   .init({
      compatibilityJSON: 'v3',
      lng: config.DEFAULT_LANGUAGE, // if you're using a language detector, do not define the lng option
      fallbackLng: 'en',
      resources: languageResources,
      interpolation: {
         escapeValue: false,
      },
   });

export { i18next, languageResources };
