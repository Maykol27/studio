// src/components/icons/custom-logo-icon.tsx
import Image from 'next/image';
import type { SVGProps } from 'react';

interface CustomLogoIconProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  width?: number;
  height?: number;
}

export function CustomLogoIcon({ width = 64, height = 64, className, ...props }: CustomLogoIconProps) {
  // Nota: El componente `Image` de Next.js maneja la optimización y el servicio de imágenes desde la carpeta `public`.
  // Asegúrate de que tu archivo SVG se llame 'sikai-logo.svg' y esté en la carpeta 'public/images/'.
  return (
    <Image
      src="/images/sikai-logo.svg" // Esta ruta es relativa a la carpeta 'public'
      alt="SIKAI Consulting Logo"
      width={width}
      height={height}
      className={className}
      priority // Puede ser útil para el LCP si el logo es importante
      {...props}
    />
  );
}
