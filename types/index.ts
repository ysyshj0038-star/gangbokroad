export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type LocalizedText = {
  ko: string;
  en: string;
};

export type LanguageCode = 'ko' | 'en' | 'zh' | 'ru';

export * from './schedule';
export * from './figure';
export * from './place';
export * from './notice';
