import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ko from './locales/ko.json';

export const supportedLanguages = ['ko', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const deviceLanguage = getLocales()[0]?.languageCode ?? 'ko';
const fallbackLng: SupportedLanguage = supportedLanguages.includes(
  deviceLanguage as SupportedLanguage,
)
  ? (deviceLanguage as SupportedLanguage)
  : 'ko';

void i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: fallbackLng,
  fallbackLng: 'ko',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;

export function changeLanguage(lang: SupportedLanguage) {
  return i18n.changeLanguage(lang);
}

export function getCurrentLanguage(): SupportedLanguage {
  const current = i18n.language;
  return supportedLanguages.includes(current as SupportedLanguage)
    ? (current as SupportedLanguage)
    : 'ko';
}
