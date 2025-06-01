// src/components/icons/sikai-logo-light.tsx
// This component was intended for an embedded SVG for the light theme.
// If using a single theme-adaptive SVG from public/images, this component is not needed for that strategy.
import type { SVGProps } from 'react';

export function SikaiLogoLight(props: SVGProps<SVGSVGElement>) {
  // Placeholder SVG.
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
      <title>Light Theme Logo Placeholder</title>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      <text x="50%" y="60%" textAnchor="middle" fill="#000000" fontSize="3px" fontFamily="Arial" dy=".3em">LIGHT</text>
    </svg>
  );
}
