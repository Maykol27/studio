import type { Locale } from '@/i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  es: () => import('@/locales/es.json').then((module) => module.default),
  pt: () => import('@/locales/pt.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loadLocale = dictionaries[locale] ?? dictionaries.es;
  try {
    return await loadLocale();
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // Fallback to default locale if specific one fails
    return await dictionaries.es();
  }
};
