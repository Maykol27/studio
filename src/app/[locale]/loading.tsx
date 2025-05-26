
import { LayersIcon } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

// Este componente de carga se usará para las rutas dentro del segmento [locale]
// mientras se resuelven las Server Components de la página.
export default async function LocaleLoading({ params: { locale } }: { params: { locale: Locale }}) {
  const dictionary = await getDictionary(locale);
  // Accede a la propiedad anidada de forma segura
  const loadingText = dictionary.loading?.message || (locale === 'pt' ? 'Carregando...' : 'Cargando...');


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
