// src/components/landing/hero-section.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PlayCircleIcon, PauseIcon, PictureInPictureIcon, Minimize2Icon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Dictionary } from '@/lib/get-dictionary';
import { useRef, useState, useEffect, useCallback } from 'react';

// Textos por defecto en español si el diccionario no se provee o falta alguna clave
const defaultTexts: Dictionary['heroSection'] = {
  titlePart1: "IA a tu Medida: ",
  titlePart2: "Nuestro Proceso",
  titlePart3: " Hacia Tu Éxito.",
  description: "¿Buscas llevar tu negocio al siguiente nivel? En SIKAI Consulting, transformamos la complejidad de la automatización y el uso de IA en soluciones prácticas y accesibles para tu negocio.",
  ctaButton: "¡Diagnostico gratuito ahora mismo!",
  videoCaption: "Conoce al CEO de SIKAI Consulting",
  playVideo: "Reproducir Video",
  pauseVideo: "Pausar Video",
  enterPiP: "Entrar en Picture-in-Picture",
  exitPiP: "Salir de Picture-in-Picture",
  pipNotSupported: "El modo Picture-in-Picture no es compatible con este navegador."
};

interface HeroSectionProps {
  dictionary?: Partial<Dictionary['heroSection']>; // Hacer el diccionario opcional y parcial
}

export function HeroSection({ dictionary: dictProp }: HeroSectionProps) {
  const texts = { ...defaultTexts, ...(dictProp || {}) }; // Asegurar que texts siempre tenga valores

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPiPSupported, setIsPiPSupported] = useState(false);
  const [isInPiP, setIsInPiP] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && 'pictureInPictureEnabled' in document) {
      setIsPiPSupported(document.pictureInPictureEnabled);
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnterPiP = () => setIsInPiP(true);
    const handleLeavePiP = () => {
      setIsInPiP(false);
      // Ensure video is paused if it leaves PiP and was playing
      // This can prevent auto-play issues when re-focusing the tab
      // if (videoElement.paused === false) {
      //   videoElement.pause();
      // }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (document.pictureInPictureElement === videoElement) {
        document.exitPictureInPicture().catch(err => console.error("Error al salir de PiP al finalizar:", err));
      }
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('enterpictureinpicture', handleEnterPiP);
    videoElement.addEventListener('leavepictureinpicture', handleLeavePiP);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('enterpictureinpicture', handleEnterPiP);
      videoElement.removeEventListener('leavepictureinpicture', handleLeavePiP);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (video.paused || video.ended) {
        video.play().catch(error => console.error("Error al intentar reproducir:", error));
      } else {
        video.pause();
      }
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
    if (video && isPiPSupported && isPlaying && !document.pictureInPictureElement) {
      const rect = video.getBoundingClientRect();
      // Considerar fuera de vista si menos de 50px del video es visible o más de 150px por encima/debajo del viewport
      const isOutOfView = rect.bottom < 50 || rect.top > window.innerHeight - 50;
      
      // Check if Picture-in-Picture is enabled and not disabled on the video element
      if (isOutOfView && document.pictureInPictureEnabled && !video.disablePictureInPicture) {
        video.requestPictureInPicture().catch(err => {
          // Silently fail or log a less obtrusive warning, as autoplay restrictions can prevent this.
          console.warn("Auto PiP request failed, possibly due to browser restrictions:", err);
        });
      }
    }
  }, [isPlaying, isPiPSupported]); // No 'texts' dependency needed here if not directly used

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-background via-muted to-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-100">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-primary/20 rounded-full animate-bubble-1"></div>
        <div className="absolute top-[20%] right-[10%] w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-accent/20 rounded-full animate-bubble-2"></div>
        <div className="absolute bottom-[15%] left-[20%] w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-secondary/20 rounded-full animate-bubble-3"></div>
        <div className="absolute top-[50%] left-[40%] w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-primary/15 rounded-full animate-bubble-1 animation-delay-[2s]"></div>
        <div className="absolute bottom-[5%] right-[25%] w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-accent/15 rounded-full animate-bubble-2 animation-delay-[4s]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 md:space-y-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-foreground font-heading leading-loose">
              {texts.titlePart1} <br className="hidden md:block" /> <span className="text-primary">{texts.titlePart2}</span>{texts.titlePart3}
            </h1>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {texts.description}
            </p>
          </div>
        </div>
        
        {/* Video Section */}
        {/* <div className="w-full max-w-3xl mt-8 md:mt-12 animate-fade-in-up animation-delay-[300ms]">
          <div className="relative group rounded-xl overflow-hidden shadow-xl aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="https://placehold.co/1280x720.png?text=CEO+Video"
              data-ai-hint="CEO presentacion"
              src="https://www.w3schools.com/html/mov_bbb.mp4" // REEMPLAZAR CON LA URL REAL DEL VIDEO
              playsInline
              muted // Iniciar silenciado es una buena práctica para autoplay
              controls // Habilita los controles nativos del navegador
            >
              <track
                label={texts.spanishLabel || 'Español'}
                kind="subtitles"
                srcLang="es"
                src="/subtitles/video_es.vtt"
                default
              />
              <track
                label={texts.portugueseLabel || 'Português'}
                kind="subtitles"
                srcLang="pt"
                src="/subtitles/video_pt.vtt"
              />
              Tu navegador no soporta el tag de video.
            </video>

            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
            >
              <PlayCircleIcon className="w-20 h-20 text-white/80 hover:text-white transition-colors" />
            </div>
            
            {isPiPSupported && isPlaying && (
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    togglePiP();
                  }}
                  aria-label={isInPiP ? texts.exitPiP : texts.enterPiP}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  {isInPiP ? <Minimize2Icon className="h-5 w-5" /> : <PictureInPictureIcon className="h-5 w-5" />}
                </Button>
              </div>
            )}
            
            <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm p-2 rounded-md ${isPlaying ? 'hidden' : ''}`}>
                <p className="text-xs sm:text-sm text-white/90">{texts.videoCaption}</p>
            </div>
          </div>
        </div> */}

        {/* Fallback Image - Descomentar si se quita el video */}
        <div className="w-full max-w-3xl mt-8 md:mt-12 animate-fade-in-up animation-delay-[300ms]">
          <div className="relative group rounded-xl overflow-hidden shadow-xl aspect-video">
            <Image
              src="https://placehold.co/1280x720.png?text=SIKAI+Consulting"
              alt={texts.videoCaption} // Usar el texto del caption como alt
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="consultoria IA tecnologia"
              priority
            />
            <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm p-2 rounded-md ${isPlaying ? 'hidden' : ''}`}>
                <p className="text-xs sm:text-sm text-white/90">{texts.videoCaption}</p>
            </div>
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