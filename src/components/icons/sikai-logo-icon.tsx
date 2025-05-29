// src/components/icons/sikai-logo-icon.tsx
import type { SVGProps } from 'react';

export function SikaiLogoIcon(props: SVGProps<SVGSVGElement>) {
  const primaryColor = "currentColor"; // Hereda el color del texto (ej. text-primary)
  const accentColor = "hsl(var(--accent))"; // Usa el color de acento del tema

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64" // Mantenido el viewBox para consistencia
      fill="none"
      {...props}
    >
      {/* Tronco Principal más grueso */}
      <line x1="32" y1="60" x2="32" y2="34" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />

      {/* Ramas Nivel 1 (desde el tronco) */}
      <line x1="32" y1="38" x2="17" y2="28" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="32" y1="38" x2="47" y2="28" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />
      
      {/* Rama Central Superior */}
      <line x1="32" y1="34" x2="32" y2="10" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />

      {/* Ramas Nivel 2 */}
      <line x1="17" y1="28" x2="10" y2="38" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" /> {/* Izquierda abajo */}
      <line x1="17" y1="28" x2="23" y2="18" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" /> {/* Izquierda arriba */}
      
      <line x1="47" y1="28" x2="54" y2="38" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" /> {/* Derecha abajo */}
      <line x1="47" y1="28" x2="41" y2="18" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" /> {/* Derecha arriba */}

      {/* Ramas Nivel 3 (superiores) */}
      <line x1="32" y1="19" x2="24" y2="13" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="19" x2="40" y2="13" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />

      {/* Círculos (Nodos) */}
      {/* Grupo Superior */}
      <circle cx="32" cy="7.5" r="6" fill={accentColor} stroke="none" /> {/* Nodo principal superior, más grande y de acento */}
      <circle cx="23.5" cy="11.5" r="4.5" fill={primaryColor} stroke="none" />
      <circle cx="40.5" cy="11.5" r="4.5" fill={primaryColor} stroke="none" />
      
      <circle cx="28" cy="19" r="3" fill={accentColor} stroke="none" />
      <circle cx="36" cy="19" r="3" fill={accentColor} stroke="none" />

      {/* Grupo Medio-Izquierda */}
      <circle cx="23" cy="18" r="3.5" fill={accentColor} stroke="none" />
      <circle cx="17" cy="28" r="4" fill={primaryColor} stroke="none" />
      <circle cx="10" cy="38" r="3.5" fill={accentColor} stroke="none" />
      
      {/* Grupo Medio-Derecha */}
      <circle cx="41" cy="18" r="3.5" fill={accentColor} stroke="none" />
      <circle cx="47" cy="28" r="4" fill={primaryColor} stroke="none" />
      <circle cx="54" cy="38" r="3.5" fill={accentColor} stroke="none" />

      {/* Nodos inferiores en el tronco y base */}
      <circle cx="26" cy="45" r="2.5" fill={primaryColor} stroke="none" />
      <circle cx="38" cy="45" r="2.5" fill={primaryColor} stroke="none" />
      
      <circle cx="30" cy="53" r="2" fill={accentColor} stroke="none" />
      <circle cx="34" cy="53" r="2" fill={accentColor} stroke="none" />

      {/* Pequeños nodos de acento */}
      <circle cx="32" cy="28" r="1.5" fill={accentColor} />
      <circle cx="32" cy="48" r="1.5" fill={primaryColor} />
      <circle cx="14" cy="23" r="1.5" fill={primaryColor} />
      <circle cx="50" cy="23" r="1.5" fill={primaryColor} />
    </svg>
  );
}
