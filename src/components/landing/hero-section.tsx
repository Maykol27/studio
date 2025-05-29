// src/components/landing/hero-section.tsx
'use client';

// import { useRef, useState, useEffect, useCallback } from 'react'; // Comentado porque el video está comentado
import Image from 'next/image'; // Necesario para el placeholder
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react'; // PlayCircleIcon, PictureInPictureIcon, PlayIcon, PauseIcon comentados
import Link from 'next/link';
import type { Dictionary } from '@/locales/pt.json'; // Asegúrate que la ruta es correcta si tienes un get-dictionary

// Textos por defecto en español si el diccionario no se provee
const defaultTexts: Dictionary['heroSection'] = {
  titlePart1: "IA a tu Medida: ",
  titlePart2: "Nuestro Proceso", 
  titlePart3: " Hacia Tu Éxito.",
  description: "¿Buscas llevar tu negocio al siguiente nivel? En Aetheria Consulting, transformamos la complejidad de la automatización e IA en soluciones prácticas y accesibles para tu negocio.",
  ctaButton: "¡Diagnostico gratuito ahora mismo!",
  videoCaption: "Conoce al CEO de Aetheria Consulting",
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

  // Toda la lógica del video comentada
  /*
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isInPiP, setIsInPiP] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPiPSupported(!!document.pictureInPictureEnabled);
    }

    const video = videoRef.current;
    if (!video) return;

    const handlePlayingState = () => setIsPlaying(!video.paused && !video.ended);
    const handlePiPState = () => setIsInPiP(document.pictureInPictureElement === video);
    
    const handleVideoEnd = async () => {
      setIsPlaying(false);
      if (document.pictureInPictureElement === video) {
        try {
          await document.exitPictureInPicture();
        } catch (error) {
          console.error("Error al salir de PiP automáticamente:", error);
        }
      }
    };

    video.addEventListener('play', handlePlayingState);
    video.addEventListener('pause', handlePlayingState);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('playing', handlePlayingState); 
    
    if (isPiPSupported) {
      video.addEventListener('enterpictureinpicture', handlePiPState);
      video.addEventListener('leavepictureinpicture', handlePiPState);
      if (document.pictureInPictureElement === video) {
        setIsInPiP(true);
      }
    }

    return () => {
      video.removeEventListener('play', handlePlayingState);
      video.removeEventListener('pause', handlePlayingState);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('playing', handlePlayingState);
      if (isPiPSupported) {
        video.removeEventListener('enterpictureinpicture', handlePiPState);
        video.removeEventListener('leavepictureinpicture', handlePiPState);
      }
    };
  }, [isPiPSupported]);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      video.play().catch(error => console.error("Error al reproducir video:", error));
    } else {
      video.pause();
    }
  }, []);

  const togglePiP = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPiPSupported) {
      alert(texts.pipNotSupported); 
      return;
    }

    try {
      if (document.pictureInPictureElement === video) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Error al cambiar modo PiP:", error);
    }
  }, [isPiPSupported, texts.pipNotSupported]);

  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isPiPSupported || !isPlaying || document.pictureInPictureElement || (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }
    const rect = video.getBoundingClientRect();
    const isOutOfViewport = rect.bottom < 50 || rect.top > (typeof window !== 'undefined' ? window.innerHeight - 50 : 0);
    if (isOutOfViewport) {
      video.requestPictureInPicture().catch(err => {
        if (err.name !== 'NotAllowedError' && err.name !== 'InvalidStateError') {
           console.error("Error intentando entrar en modo PiP automáticamente:", err);
        }
      });
    }
  }, [isPlaying, isPiPSupported]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);
  */

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
        <div className="max-w-3xl mx-auto"> {/* Centering content */}
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
      </div>
    </section>
  );
}
