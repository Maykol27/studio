'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary'; // Import Dictionary type

interface LanguageSwitcherProps {
  currentLocale: Locale;
  dictionary: Dictionary['languageSwitcher']; // Usar la parte correcta del diccionario
}

export function LanguageSwitcher({ currentLocale, dictionary }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale; // El primer segmento después de '/' es el locale
    return segments.join('/');
  };
  
  const getLanguageName = (locale: Locale) => {
    switch (locale) {
      case 'es': return dictionary.spanish;
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
