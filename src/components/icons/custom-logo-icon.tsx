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

  // Path to your single, theme-aware SVG file in the public/images directory
  const logoSrc = '/images/sikai-logo.svg'; // Assuming your single adaptive SVG is named sikai-logo.svg

  if (!mounted) {
    // Render a placeholder div matching dimensions to prevent layout shift and hydration errors
    return <div style={{ width: `${width}px`, height: `${height}px` }} className={className} />;
  }

  return (
    <Image
      src={logoSrc}
      alt="SIKAI Consulting Logo"
      width={width}
      height={height}
      className={className}
      priority 
    />
  );
}
