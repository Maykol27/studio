
import { LayersIcon } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config'; // Import i18n for defaultLocale
import { getDictionary } from '@/lib/get-dictionary';

interface LocaleLoadingProps {
  params?: { // Make params optional
    locale?: Locale; // Make locale optional within params
  };
}

// Este componente de carga se usará para las rutas dentro del segmento [locale]
// mientras se resuelven las Server Components de la página.
export default async function LocaleLoading({ params }: LocaleLoadingProps) {
  // Safely access locale, falling back to default if params or params.locale is missing
  const currentLocale = params?.locale || i18n.defaultLocale;
  
  // Default loading text based on the (potentially fallback) locale
  let loadingText = currentLocale === 'pt' ? 'Carregando...' : 'Cargando...';

  try {
    const dictionary = await getDictionary(currentLocale);
    // Safely access the nested property and ensure it's a string
    if (dictionary && dictionary.loading && typeof dictionary.loading.message === 'string') {
      loadingText = dictionary.loading.message;
    } else {
      // Log if the expected dictionary structure is missing, but still use the fallback
      console.warn(`Loading message not found in dictionary for locale: ${currentLocale}`);
    }
  } catch (error) {
    console.error(`Error loading dictionary for locale loading page: ${currentLocale}`, error);
    // Keep the default loadingText if dictionary fails for any reason
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="animate-pulse-subtle">
        <LayersIcon className="h-16 w-16 text-primary mb-4" />
      </div>
      <p className="text-xl font-semibold font-heading animate-pulse-subtle-text">
        Aetheria Consulting
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        {loadingText}
      </p>
    </div>
  );
}
