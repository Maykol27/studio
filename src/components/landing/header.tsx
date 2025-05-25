import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayersIcon, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LanguageSwitcher } from '@/components/language-switcher';
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface HeaderProps {
  dictionary: Dictionary['header'];
  currentLocale: Locale;
}

export function Header({ dictionary, currentLocale }: HeaderProps) {
  const navItems = [
    { href: '#benefits', label: dictionary.benefits },
    { href: '#process', label: dictionary.process },
    { href: '#about', label: dictionary.about },
  ];

  // Necesitamos cargar el diccionario completo para pasarlo al LanguageSwitcher
  // Esto es una simplificación; idealmente, LanguageSwitcher cargaría su propio diccionario.
  // O, el diccionario de LanguageSwitcher se pasa explícitamente.
  // Por ahora, asumiremos que el diccionario general contiene la sección languageSwitcher.
  // Esto se manejará mejor en getDictionary y el componente que lo llama.
  // Aquí asumimos que el dictionary prop en LandingPage tiene languageSwitcher.
  // Vamos a necesitar el diccionario del languageSwitcher específicamente.
  // Se pasará desde la page.tsx que carga el diccionario completo.
  // Por ahora, el languageSwitcher no usa un diccionario interno, los nombres de idioma son hardcodeados.
  // Para hacerlo bien, LanguageSwitcher también debería recibir su parte del diccionario.
  // Voy a modificar LanguageSwitcher para que reciba su `dictionary.languageSwitcher`.

  return (
    <header className="py-4 px-4 md:px-8 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={`/${currentLocale}`} className="flex items-center gap-2 group" prefetch={false}>
          <LayersIcon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
          <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors font-heading">{dictionary.companyName}</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center"> {/* Ajustado a gap-4 para acomodar switcher */}
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
          <ThemeSwitcher />
          {/* Aquí pasamos un placeholder para el diccionario del LanguageSwitcher */}
          {/* Se debe pasar el diccionario.languageSwitcher desde la página que renderiza Header */}
          <LanguageSwitcher 
            currentLocale={currentLocale} 
            dictionary={{ /* Necesita el sub-diccionario languageSwitcher */
              changeLanguage: "Change language", // Placeholder
              spanish: "Español", // Placeholder
              portuguese: "Português" // Placeholder
            }} 
          />
          <Link href="#contact" prefetch={false}>
            <Button className="btn-cta-primary rounded-md px-6 py-2.5 text-sm ml-2">
              {dictionary.contactUs}
            </Button>
          </Link>
        </nav>
        <div className="md:hidden flex items-center gap-2">
           <ThemeSwitcher />
           <LanguageSwitcher 
            currentLocale={currentLocale} 
            dictionary={{ /* Necesita el sub-diccionario languageSwitcher */
              changeLanguage: "Change language",
              spanish: "Español",
              portuguese: "Português"
            }}
           />
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={dictionary.toggleMenu}>
                <MenuIcon className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background text-foreground p-6">
              <div className="flex flex-col space-y-5 pt-6">
                {navItems.map(item => (
                  <SheetClose key={item.href} asChild>
                    <Link href={item.href} className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="#contact" prefetch={false} className="mt-4">
                    <Button className="w-full btn-cta-primary rounded-md py-3 text-base">
                      {dictionary.contactUs}
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
