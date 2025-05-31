// src/components/icons/custom-logo-icon.tsx
import type { SVGProps } from 'react';

export function CustomLogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/*
        =====================================================================
        ¡AQUÍ COMIENZA EL ÁREA PARA PEGAR EL CÓDIGO DE TU PROPIO SVG!
        Borra el siguiente SVG de ejemplo y pega el tuyo aquí.
        Asegúrate de ajustar el `viewBox` de la etiqueta <svg> de arriba si es necesario,
        y configura los atributos `fill` o `stroke` como `currentColor`
        si quieres que el logo herede el color del texto.
        =====================================================================
      */}

      {/* EJEMPLO DE SVG DE PLACEHOLDER (¡REEMPLÁZALO!) */}
      <rect x="14" y="14" width="100" height="100" rx="10" fill="#8A2BE2" />
      <circle cx="50" cy="50" r="30" fill="white" />
      <circle cx="78" cy="50" r="30" fill="white" />
      <circle cx="64" cy="78" r="30" fill="white" />
      {/*
        =====================================================================
        ¡AQUÍ TERMINA EL ÁREA PARA PEGAR EL CÓDIGO DE TU PROPIO SVG!
        =====================================================================
      */}
    </svg>
  )
}
