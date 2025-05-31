// src/components/icons/sikai-logo-light.tsx
import type { SVGProps } from 'react';

export function SikaiLogoLight(props: SVGProps<SVGSVGElement>) {
  // Este es un placeholder. Deberás reemplazarlo con el código de tu SVG claro.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      <text x="50%" y="60%" textAnchor="middle" fill="#000000" fontSize="8px" fontFamily="Arial" dy=".3em">LIGHT</text>
    </svg>
  );
}
