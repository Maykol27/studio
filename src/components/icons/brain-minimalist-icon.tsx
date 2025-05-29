// src/components/icons/brain-minimalist-icon.tsx
import type { SVGProps } from 'react';

export function BrainMinimalistIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24" // Standard icon viewbox
      fill="none"
      stroke="currentColor" // Inherits text color
      strokeWidth="1.5"   // Thin lines for minimalist feel
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Outer shape of the brain (simplified side view) */}
      <path d="M16 4.472c0-1.09-.934-1.972-2.033-1.972C12.854 2.5 12 3.382 12 4.472V5" />
      <path d="M16 4.472c0 3.322-2.678 6.028-6 6.028S4 7.794 4 4.472C4 3.382 4.934 2.5 6.033 2.5 7.146 2.5 8 3.382 8 4.472V5" />
      <path d="M4 4.472V16.5a3.5 3.5 0 0 0 3.5 3.5h1A3.5 3.5 0 0 0 12 23.5v0a3.5 3.5 0 0 0 3.5-3.5h1a3.5 3.5 0 0 0 3.5-3.5V4.472" />
      {/* Simplified internal lines (folds/circuits) */}
      <path d="M12 16.5a4.5 4.5 0 0 0-3.86-4.453" />
      <path d="M12 16.5a4.5 4.5 0 0 1 3.86-4.453" />
      <path d="M12 12.047V9" />
      <path d="M7 9.5S9 8 12 8s5 1.5 5 1.5" />
      <path d="M9 12.5s1 1.5 3 1.5 3-1.5 3-1.5" />
    </svg>
  );
}
