'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, type Locale } from '@/i18n-config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  dictionary: { // This should be the 'languageSwitcher' part of the main dictionary
    changeLanguage: string;
    spanish: string;
    english: string;
    portuguese: string;
  };
}

export function LanguageSwitcher({ currentLocale, dictionary }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return '/';
    // Pathname for default locale 'es' might be '/' or '/es'.
    // Pathname for other locales will be '/en' or '/pt'.
    const segments = pathname.split('/');
    
    // If current pathname is just '/' (meaning default locale 'es' without prefix)
    if (segments.length === 2 && segments[1] === '') {
      return `/${locale}`;
    }
    
    segments[1] = locale;
    return segments.join('/');
  };
  
  const getLanguageName = (locale: Locale) => {
    switch (locale) {
      case 'es': return dictionary.spanish;
      case 'en': return dictionary.english;
      case 'pt': return dictionary.portuguese;
      default: return locale.toUpperCase();
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={dictionary.changeLanguage} className="text-foreground hover:text-primary">
          <GlobeIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => {
          return (
            <DropdownMenuItem key={locale} asChild disabled={currentLocale === locale} className="cursor-pointer">
              <Link href={redirectedPathName(locale)} prefetch={false}>
                {getLanguageName(locale)}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
