// src/components/icons/custom-logo-icon.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CustomLogoIconProps {
  width: number;
  height: number;
  className?: string;
}

export function CustomLogoIcon({ width, height, className }: CustomLogoIconProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The SVG itself should be theme-aware (e.g., using currentColor or CSS variables)
  const logoSrc = '/images/sikai-logo.svg'; // Assuming this is your single, theme-aware SVG

  if (!mounted) {
    // Render a placeholder div matching dimensions to prevent layout shift and hydration errors
    return <div style={{ width: `${width}px`, height: `${height}px` }} className={className} />;
  }

  return (
    <Image
      src={logoSrc}
      alt="SIKAI Consulting Logo" // Considerar obtener este texto del diccionario para localización
      width={width}
      height={height}
      className={className}
      priority // Es buena idea si el logo está en el LCP (Largest Contentful Paint), como en el header
    />
  );
}
