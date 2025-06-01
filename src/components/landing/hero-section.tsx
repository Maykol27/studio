
// src/components/landing/hero-section.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import type { Dictionary } from '@/lib/get-dictionary';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import next/image

// Textos por defecto en español si el diccionario no se provee o falta alguna clave
const defaultTexts: Dictionary['heroSection'] = {
  titlePart1: "IA a tu Medida: ",
  titlePart2: "Nuestro Proceso",
  titlePart3: " Hacia Tu Éxito.",
  description: "Soluciones de IA personalizadas para potenciar tu negocio. Optimizamos procesos, reducimos costos y mejoramos la toma de decisiones.",
  ctaButton: "¡Diagnóstico gratuito ahora mismo!",
  videoCaption: "Conoce al CEO de SIKAI Consulting",
  playVideo: "Reproducir Video",
  pauseVideo: "Pausar Video",
  enterPiP: "Entrar en Picture-in-Picture",
  exitPiP: "Salir de Picture-in-Picture",
  pipNotSupported: "El modo Picture-in-Picture no es compatible con este navegador."
};

interface HeroSectionProps {
  dictionary?: Partial<Dictionary['heroSection']>;
}

export function HeroSection({ dictionary: dictProp }: HeroSectionProps) {
  const texts = { ...defaultTexts, ...(dictProp || {}) };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-background via-muted to-background overflow-hidden"
    >
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 z-0 opacity-100">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-primary/20 rounded-full animate-bubble-1"></div>
        <div className="absolute top-[20%] right-[10%] w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-accent/20 rounded-full animate-bubble-2"></div>
        <div className="absolute bottom-[15%] left-[20%] w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-secondary/20 rounded-full animate-bubble-3"></div>
        <div className="absolute top-[50%] left-[40%] w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-primary/15 rounded-full animate-bubble-1 animation-delay-[2s]"></div>
        <div className="absolute bottom-[5%] right-[25%] w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-accent/15 rounded-full animate-bubble-2 animation-delay-[4s]"></div>
      </div>

      {/* Background Logo - Positioned to the right, blurred, and partially off-screen */}
      <div className="absolute inset-0 flex items-center justify-end z-0 pointer-events-none overflow-hidden">
        <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] -mr-[100px] sm:-mr-[150px] md:-mr-[250px] lg:-mr-[300px]">
          <Image
            src="/images/sikai-logo.svg"
            alt="SIKAI Consulting background logo"
            fill
            className="object-contain opacity-10 blur-xl" // Subtle opacity and blur
            priority
            unoptimized={true} // Kept as it helped with display
          />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 md:space-y-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-foreground font-heading leading-tight">
              {texts.titlePart1} <br className="hidden md:block" /> <span className="text-primary">{texts.titlePart2}</span>{texts.titlePart3}
            </h1>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {texts.description}
            </p>
          </div>
        </div>
        
        <div className="mt-10 md:mt-12 flex justify-center animate-fade-in-up animation-delay-[600ms]">
          <Link href="#automation-advisor" passHref>
            <Button size="lg" className="btn-cta-primary rounded-md px-8 py-3.5 text-base sm:text-lg group w-full max-w-xs sm:max-w-md sm:w-auto shadow-lg hover:shadow-xl">
              {texts.ctaButton}
              <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
