import type { Locale } from '@/i18n-config';

const dictionaries = {
  es: () => import('@/locales/es.json').then((module) => module.default),
  pt: () => import('@/locales/pt.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loadLocale = dictionaries[locale] ?? dictionaries.es; // Fallback a 'es' si el locale no existe
  try {
    return await loadLocale();
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // Fallback al idioma por defecto si el específico falla
    return await dictionaries.es();
  }
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
