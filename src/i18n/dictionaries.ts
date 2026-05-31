import { Locale } from './config';
import en from './locales/en';
import zh from './locales/zh';

const dictionaries = {
  en,
  zh,
};

export type Dictionary = typeof en;

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] || dictionaries.en;
};

export const getTranslation = (locale: Locale, key: keyof Dictionary): string => {
  const dict = getDictionary(locale);
  return dict[key] || key;
};
