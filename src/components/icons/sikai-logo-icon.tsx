// src/components/icons/sikai-logo-icon.tsx
import type { SVGProps } from 'react';

export function SikaiLogoIcon(props: SVGProps<SVGSVGElement>) {
  // currentColor se tomará del contexto de la clase de texto del padre (ej. text-primary)
  const trunkAndDarkDotsColor = "currentColor"; 
  // El color de acento de tu tema para los puntos claros
  const lightDotsColor = "hsl(var(--accent))"; 

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64" // Usamos un viewBox más grande para permitir más detalle
      fill="none"
      {...props} // Permite pasar className, width, height, etc.
    >
      {/* Tronco Principal */}
      <line x1="32" y1="58" x2="32" y2="36" stroke={trunkAndDarkDotsColor} strokeWidth="3.5" strokeLinecap="round" />

      {/* Ramas Nivel 1 (desde el tronco) */}
      <line x1="32" y1="38" x2="18" y2="28" stroke={trunkAndDarkDotsColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="38" x2="46" y2="28" stroke={trunkAndDarkDotsColor} strokeWidth="3" strokeLinecap="round" />
      
      {/* Rama Central Superior */}
      <line x1="32" y1="36" x2="32" y2="12" stroke={trunkAndDarkDotsColor} strokeWidth="3" strokeLinecap="round" />

      {/* Ramas Nivel 2 */}
      <line x1="18" y1="28" x2="10" y2="36" stroke={trunkAndDarkDotsColor} strokeWidth="2.5" strokeLinecap="round" /> {/* Izquierda abajo */}
      <line x1="18" y1="28" x2="26" y2="18" stroke={trunkAndDarkDotsColor} strokeWidth="2.5" strokeLinecap="round" /> {/* Izquierda arriba */}
      
      <line x1="46" y1="28" x2="54" y2="36" stroke={trunkAndDarkDotsColor} strokeWidth="2.5" strokeLinecap="round" /> {/* Derecha abajo */}
      <line x1="46" y1="28" x2="38" y2="18" stroke={trunkAndDarkDotsColor} strokeWidth="2.5" strokeLinecap="round" /> {/* Derecha arriba */}

      {/* Ramas Nivel 3 (superiores) */}
      <line x1="32" y1="20" x2="24" y2="10" stroke={trunkAndDarkDotsColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="20" x2="40" y2="10" stroke={trunkAndDarkDotsColor} strokeWidth="2.5" strokeLinecap="round" />

      {/* Círculos (Nodos) */}
      {/* Grupo Superior */}
      <circle cx="32" cy="7" r="5" fill={lightDotsColor} stroke="none" />
      <circle cx="23" cy="7" r="4" fill={lightDotsColor} stroke="none" />
      <circle cx="41" cy="7" r="4" fill={lightDotsColor} stroke="none" />
      <circle cx="28" cy="14" r="3.5" fill={trunkAndDarkDotsColor} stroke="none" />
      <circle cx="36" cy="14" r="3.5" fill={trunkAndDarkDotsColor} stroke="none" />

      {/* Grupo Medio-Izquierda */}
      <circle cx="25" cy="20" r="3" fill={lightDotsColor} stroke="none" />
      <circle cx="15" cy="26" r="4.5" fill={lightDotsColor} stroke="none" />
      <circle cx="8" cy="34" r="4" fill={trunkAndDarkDotsColor} stroke="none" />
      
      {/* Grupo Medio-Derecha */}
      <circle cx="39" cy="20" r="3" fill={lightDotsColor} stroke="none" />
      <circle cx="49" cy="26" r="4.5" fill={lightDotsColor} stroke="none" />
      <circle cx="56" cy="34" r="4" fill={trunkAndDarkDotsColor} stroke="none" />

      {/* Nodos inferiores más pequeños en el tronco */}
      <circle cx="25" cy="42" r="2.5" fill={trunkAndDarkDotsColor} stroke="none" />
      <circle cx="39" cy="42" r="2.5" fill={trunkAndDarkDotsColor} stroke="none" />
      
      <circle cx="28" cy="50" r="2" fill={lightDotsColor} stroke="none" />
      <circle cx="36" cy="50" r="2" fill={lightDotsColor} stroke="none" />
    </svg>
  );
}
