
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { LayersIcon, MenuIcon } from 'lucide-react'; // LayersIcon removido
import { MenuIcon } from 'lucide-react';
import { SikaiLogoIcon } from '@/components/icons/sikai-logo-icon'; // Importamos el nuevo icono
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { LanguageSwitcher } from '@/components/language-switcher';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/get-dictionary';

interface HeaderProps {
  headerDictionary?: Partial<Dictionary['header']>; 
  languageSwitcherDictionary?: Partial<Dictionary['languageSwitcher']>; 
  currentLocale: Locale;
}

// Default texts (Spanish fallbacks)
const defaultHeaderTexts: Dictionary['header'] = {
  companyName: "SIKAI Consulting",
  benefits: "Beneficios",
  process: "Propuesta de Valor",
  blog: "Blog",
  about: "Nosotros",
  contactUs: "Contáctanos",
  toggleMenu: "Alternar menú",
  sheetTitle: "Menú Principal"
};

const defaultLangSwitcherTexts: Dictionary['languageSwitcher'] = {
  changeLanguage: "Cambiar idioma",
  spanish: "Español",
  portuguese: "Portugués"
};

export function Header({ headerDictionary: dictProp, languageSwitcherDictionary: langDictProp, currentLocale }: HeaderProps) {
  const headerDictionary = { ...defaultHeaderTexts, ...(dictProp || {}) };
  const langSwitcherDictionary = { ...defaultLangSwitcherTexts, ...(langDictProp || {}) };

  const navItems = [
    { href: '#benefits', label: headerDictionary.benefits },
    { href: '#process', label: headerDictionary.process },
    { href: '#blog', label: headerDictionary.blog },
    { href: '#about', label: headerDictionary.about },
  ];

  return (
    <header className="py-4 px-4 md:px-8 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={`/${currentLocale}`} className="flex items-center gap-2 group" prefetch={false}>
          <SikaiLogoIcon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
          <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors font-heading">
            {headerDictionary.companyName}
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
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
          <LanguageSwitcher currentLocale={currentLocale} dictionary={langSwitcherDictionary} />
          <Link href="#contact" prefetch={false}>
            <Button className="btn-cta-primary rounded-md px-6 py-2.5 text-sm ml-2">
              {headerDictionary.contactUs}
            </Button>
          </Link>
        </nav>
        <div className="md:hidden flex items-center">
          <ThemeSwitcher />
          <LanguageSwitcher currentLocale={currentLocale} dictionary={langSwitcherDictionary} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={headerDictionary.toggleMenu}>
                <MenuIcon className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background text-foreground p-6">
              <SheetHeader className="pt-0 px-0 pb-4 text-center border-b mb-4">
                <SheetTitle>{headerDictionary.sheetTitle}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-5">
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
                      {headerDictionary.contactUs}
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
