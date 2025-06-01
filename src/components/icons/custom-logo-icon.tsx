// src/components/icons/custom-logo-icon.tsx
'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface CustomLogoIconProps {
  width: number;
  height: number;
  className?: string;
}

export function CustomLogoIcon({ width, height, className }: CustomLogoIconProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Default to light theme SVG, will be updated by useEffect on client-side
  const [logoSrc, setLogoSrc] = useState('/images/sikai-logo-light.svg');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const currentTheme = resolvedTheme || theme;
      if (currentTheme === 'dark') {
        setLogoSrc('/images/sikai-logo-dark.svg');
      } else {
        setLogoSrc('/images/sikai-logo-light.svg');
      }
    }
  }, [mounted, theme, resolvedTheme]);

  if (!mounted) {
    // Render a placeholder div matching dimensions to prevent layout shift and hydration errors
    // The className is passed to apply any styling (like text color if it were an inline SVG)
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
