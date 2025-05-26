// HeroSection.tsx
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PlayCircleIcon, PlayIcon, PauseIcon, PictureInPictureIcon } from 'lucide-react';
import Link from 'next/link';

// Dado que se revirtió i18n, los textos se incluyen aquí directamente.
interface HeroSectionProps {
  // dictionary: Dictionary['heroSection']; // Comentado por ahora
}

export function HeroSection({ /* dictionary */ }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isInPiP, setIsInPiP] = useState(false);

  const texts = {
    titlePart1: "IA a tu Medida: ",
    titlePart2: "Nuestro Proceso",
    titlePart3: " Hacia Tu Éxito.",
    description: "¿Buscas llevar tu negocio al siguiente nivel? En Aetheria Consulting, transformamos la complejidad de la automatización e IA en soluciones prácticas y accesibles para tu negocio.",
    ctaButton: "¡Diagnostico gratuito ahora mismo!",
    videoCaption: "Conoce al CEO de Aetheria",
    playVideo: "Reproducir Video",
    pauseVideo: "Pausar Video",
    enterPiP: "Entrar en Picture-in-Picture",
    exitPiP: "Salir de Picture-in-Picture",
    pipNotSupported: "Picture-in-Picture no es soportado en este navegador."
  };

  useEffect(() => {
    // document solo está disponible en el cliente
    setIsPiPSupported(!!document.pictureInPictureEnabled);
    
    const video = videoRef.current;
    if (!video) return;

    const handlePlayingState = () => setIsPlaying(!video.paused);
    const handlePiPState = () => setIsInPiP(document.pictureInPictureElement === video);
    const handleVideoEnd = () => setIsPlaying(false);

    video.addEventListener('play', handlePlayingState);
    video.addEventListener('pause', handlePlayingState);
    video.addEventListener('playing', handlePlayingState);
    video.addEventListener('ended', handleVideoEnd);

    if (document.pictureInPictureEnabled) {
      video.addEventListener('enterpictureinpicture', handlePiPState);
      video.addEventListener('leavepictureinpicture', handlePiPState);
      if (document.pictureInPictureElement === video) {
        setIsInPiP(true);
      }
    }

    return () => {
      video.removeEventListener('play', handlePlayingState);
      video.removeEventListener('pause', handlePlayingState);
      video.removeEventListener('playing', handlePlayingState);
      video.removeEventListener('ended', handleVideoEnd);
      if (document.pictureInPictureEnabled) {
        video.removeEventListener('enterpictureinpicture', handlePiPState);
        video.removeEventListener('leavepictureinpicture', handlePiPState);
      }
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      video.play().catch(error => console.error("Error al reproducir video:", error));
    } else {
      video.pause();
    }
  };

  const togglePiP = async () => {
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
  };

  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    // No activar PiP automático si:
    // - No hay video
    // - PiP no es soportado
    // - El video no se está reproduciendo
    // - Ya está en modo PiP
    // - El tema del sistema operativo prefiere movimiento reducido (opcional, pero buena práctica de accesibilidad)
    if (!video || !isPiPSupported || !isPlaying || document.pictureInPictureElement || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }

    const rect = video.getBoundingClientRect();
    
    // Condición para considerar el video "fuera de vista":
    // - El borde inferior del video está a menos de 50px del borde superior de la ventana (casi completamente desplazado hacia arriba)
    // - O el borde superior del video está a más de (altura de la ventana - 50px) del borde superior de la ventana (casi completamente desplazado hacia abajo)
    const isOutOfViewport = rect.bottom < 50 || rect.top > window.innerHeight - 50;

    if (isOutOfViewport) {
      video.requestPictureInPicture().catch(err => {
        // Silenciar errores comunes si el usuario no ha interactuado o PiP ya fue solicitado.
        if (err.name !== 'NotAllowedError' && err.name !== 'InvalidStateError') {
           console.error("Error intentando entrar en modo PiP automáticamente:", err);
        }
      });
    }
  }, [isPlaying, isPiPSupported]); // isPlaying y isPiPSupported son dependencias de useCallback

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]); // handleScroll es una dependencia de useEffect

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-background via-muted to-background overflow-hidden"
    >
      {/* Animated background figures */}
      <div className="absolute inset-0 z-0 opacity-100">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/20 rounded-full animate-bubble-1" />
        <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-accent/20 rounded-full animate-bubble-2" />
        <div className="absolute bottom-[15%] left-[20%] w-72 h-72 bg-secondary/20 rounded-full animate-bubble-3" />
        <div className="absolute top-[50%] left-[40%] w-48 h-48 bg-primary/15 rounded-full animate-bubble-1 animation-delay-2000" />
        <div className="absolute bottom-[5%] right-[25%] w-56 h-56 bg-accent/15 rounded-full animate-bubble-2 animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-center md:text-left animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground font-heading leading-tight">
              {texts.titlePart1}<br className="hidden md:block" /> <span className="text-primary">{texts.titlePart2}</span>{texts.titlePart3}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
              {texts.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#automation-advisor" passHref>
                <Button size="lg" className="btn-cta-primary rounded-md px-8 py-3.5 text-base sm:text-lg group w-full sm:w-auto shadow-lg hover:shadow-xl">
                  {texts.ctaButton}
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative group rounded-xl overflow-hidden shadow-xl aspect-video mt-6 md:mt-0 animate-fade-in-up animation-delay-300">
            <video
              ref={videoRef}
              src="https://www.w3schools.com/html/mov_bbb.mp4" // REEMPLAZAR con la URL de tu video
              poster="https://placehold.co/600x400.png"
              className="w-full h-full object-cover cursor-pointer"
              playsInline
              onClick={togglePlayPause}
              data-ai-hint="CEO presentacion empresa"
              onLoadedMetadata={(e) => { 
                const videoElement = e.currentTarget;
                const container = videoElement.parentElement;
                if (container) {
                  // Opcional
                }
              }}
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {!isPlaying && (
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                  aria-label={texts.playVideo}
                  className="text-white/90 hover:text-white transition-colors mb-4 pointer-events-auto z-10"
                >
                  <PlayCircleIcon className="h-20 w-20" />
                </button>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-center pointer-events-auto z-10">
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                  aria-label={isPlaying ? texts.pauseVideo : texts.playVideo}
                  className="text-white/90 hover:text-white p-1.5 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-6 w-6" />
                  ) : (
                    <PlayIcon className="h-6 w-6" />
                  )}
                </button>
                
                {isPiPSupported && (
                  <button
                    onClick={(e) => { e.stopPropagation(); togglePiP(); }}
                    aria-label={isInPiP ? texts.exitPiP : texts.enterPiP}
                    className={`p-1.5 transition-colors rounded-sm ${isInPiP ? 'bg-primary/80 text-primary-foreground hover:bg-primary' : 'text-white/90 hover:text-white'}`}
                  >
                    <PictureInPictureIcon className="h-5 w-5" /> 
                  </button>
                )}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/50 backdrop-blur-sm p-2 rounded-md pointer-events-none">
              <p className="text-xs sm:text-sm text-white/90">{texts.videoCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
