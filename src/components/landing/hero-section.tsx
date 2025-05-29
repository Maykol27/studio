// src/components/landing/hero-section.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import type { Dictionary } from '@/lib/get-dictionary';

// Textos por defecto en español si el diccionario no se provee
const defaultTexts: Dictionary['heroSection'] = {
  titlePart1: "IA a tu Medida: ",
  titlePart2: "Nuestro Proceso",
  titlePart3: " Hacia Tu Éxito.",
  description: "¿Buscas llevar tu negocio al siguiente nivel? En SIKAI Consulting, transformamos la complejidad de la automatización e IA en soluciones prácticas y accesibles para tu negocio.",
  ctaButton: "¡Diagnostico gratuito ahora mismo!",
  videoCaption: "Conoce al CEO de SIKAI Consulting", // Actualizado aquí si se usa
  playVideo: "Reproducir Video",
  pauseVideo: "Pausar Video",
  enterPiP: "Entrar en Picture-in-Picture",
  exitPiP: "Salir de Picture-in-Picture",
  pipNotSupported: "Picture-in-Picture no es soportado en este navegador."
};

interface HeroSectionProps {
  dictionary?: Partial<Dictionary['heroSection']>;
}

export function HeroSection({ dictionary }: HeroSectionProps) {
  const texts = { ...defaultTexts, ...(dictionary || {}) };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-background via-muted to-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-100">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/20 rounded-full animate-bubble-1 hidden md:block" />
        <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-accent/20 rounded-full animate-bubble-2" />
        <div className="absolute bottom-[15%] left-[20%] w-72 h-72 bg-secondary/20 rounded-full animate-bubble-3" />
        <div className="absolute top-[50%] left-[40%] w-48 h-48 bg-primary/15 rounded-full animate-bubble-1 animation-delay-[2s]" />
        <div className="absolute bottom-[5%] right-[25%] w-56 h-56 bg-accent/15 rounded-full animate-bubble-2 animation-delay-[4s]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 md:space-y-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground font-heading leading-tight">
              {texts.titlePart1}<br className="hidden md:block" /> <span className="text-primary">{texts.titlePart2}</span>{texts.titlePart3}
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

        {/*
        Video Section commented out
        <div className="mt-12 md:mt-16 max-w-3xl mx-auto animate-fade-in-up animation-delay-[900ms]">
          <div className="relative group rounded-xl overflow-hidden shadow-xl aspect-video">
             // Image placeholder instead of video
            <Image
              src="https://placehold.co/1280x720.png"
              alt={texts.videoCaption || "Video de presentación de la consultora"}
              width={1280}
              height={720}
              className="w-full h-full object-cover"
              data-ai-hint="CEO presentacion"
              priority
            />
            {(!isPlaying && texts.videoCaption) && (
              <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm p-2 rounded-md ${isPlaying ? 'hidden' : ''}`}>
                <p className="text-xs sm:text-sm text-white/90">{texts.videoCaption}</p>
              </div>
            )}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
