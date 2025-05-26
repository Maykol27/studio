
'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PlayCircleIcon, PauseIcon, PictureInPictureIcon, PlayIcon } from 'lucide-react'; // Added PlayIcon just in case, though likely not needed for custom controls now
import Link from 'next/link';

interface HeroSectionProps {
  // No se usa diccionario aquí porque los textos están hardcodeados en español
}

export function HeroSection({ }: HeroSectionProps) {
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
    setIsPiPSupported(!!document.pictureInPictureEnabled);

    const video = videoRef.current;
    if (!video) return;

    const handlePlayingState = () => setIsPlaying(!video.paused);
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
    if (!video || !isPiPSupported || !isPlaying || document.pictureInPictureElement || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }
    const rect = video.getBoundingClientRect();
    const isOutOfViewport = rect.bottom < 50 || rect.top > window.innerHeight - 50;
    if (isOutOfViewport) {
      video.requestPictureInPicture().catch(err => {
        if (err.name !== 'NotAllowedError' && err.name !== 'InvalidStateError') {
           console.error("Error intentando entrar en modo PiP automáticamente:", err);
        }
      });
    }
  }, [isPlaying, isPiPSupported]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-background via-muted to-background overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-100">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/20 rounded-full animate-bubble-1 hidden md:block" />
        <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-accent/20 rounded-full animate-bubble-2" />
        <div className="absolute bottom-[15%] left-[20%] w-72 h-72 bg-secondary/20 rounded-full animate-bubble-3" />
        <div className="absolute top-[50%] left-[40%] w-48 h-48 bg-primary/15 rounded-full animate-bubble-1 animation-delay-[2s]" />
        <div className="absolute bottom-[5%] right-[25%] w-56 h-56 bg-accent/15 rounded-full animate-bubble-2 animation-delay-[4s] hidden md:block" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-center md:text-left animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground font-heading leading-tight">
              {texts.titlePart1}<br className="hidden md:block" /> <span className="text-primary">{texts.titlePart2}</span>{texts.titlePart3}
            </h1>
            <p className="text-md sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
              {texts.description}
            </p>
          </div>
          
          <div className="relative group rounded-xl overflow-hidden shadow-xl aspect-video mt-6 md:mt-0 animate-fade-in-up animation-delay-[300ms]">
            <video
              ref={videoRef}
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              poster="https://placehold.co/600x400.png"
              className="w-full h-full object-cover" // Removed cursor-pointer
              playsInline
              controls
              data-ai-hint="CEO presentacion" 
              onLoadedMetadata={(e) => { 
                const videoElement = e.currentTarget;
                // Optional: Adjust styling or logic after metadata is loaded
              }}
            >
              <track
                label="Español"
                kind="subtitles"
                srcLang="es"
                src="/subtitles/video_es.vtt" 
                default 
              />
              <track
                label="Português"
                kind="subtitles"
                srcLang="pt"
                src="/subtitles/video_pt.vtt" 
              />
            </video>
            
            {/* Overlay for initial big Play button */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 opacity-100 pointer-events-auto cursor-pointer"
                onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                aria-label={texts.playVideo}
              >
                <PlayCircleIcon className="h-20 w-20 text-white/90 hover:text-white transition-colors" />
              </div>
            )}

            {/* Overlay for custom PiP button - shows only when playing and hovering */}
            {isPlaying && isPiPSupported && (
              <div
                className="absolute bottom-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-20" 
              >
                <button
                  onClick={(e) => { e.stopPropagation(); togglePiP(); }}
                  aria-label={isInPiP ? texts.exitPiP : texts.enterPiP}
                  className={`p-1.5 bg-black/50 hover:bg-black/70 text-white/90 hover:text-white rounded-md transition-colors`}
                >
                  <PictureInPictureIcon className="h-5 w-5" /> 
                </button>
              </div>
            )}

            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/50 backdrop-blur-sm p-2 rounded-md pointer-events-none">
              <p className="text-xs sm:text-sm text-white/90">{texts.videoCaption}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 md:mt-16 flex justify-center animate-fade-in-up animation-delay-[600ms]">
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

