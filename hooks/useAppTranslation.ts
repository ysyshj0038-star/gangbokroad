import { useTranslation as useI18nextTranslation } from 'react-i18next';

import type { LocalizedText } from '@/types';
import { getCurrentLanguage, type SupportedLanguage } from '@/i18n';

export function useAppTranslation() {
  return useI18nextTranslation();
}

export function getLocalizedText(text: LocalizedText, language?: SupportedLanguage) {
  const lang = language ?? getCurrentLanguage();
  return text[lang] ?? text.ko;
}

export function useLocalizedText() {
  const { i18n } = useAppTranslation();

  return (text: LocalizedText) => getLocalizedText(text, i18n.language as SupportedLanguage);
}
