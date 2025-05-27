import { LayersIcon } from 'lucide-react';

export default function Loading() {
  // Puedes personalizar este componente de carga como desees
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="animate-pulse-subtle">
        <LayersIcon className="h-16 w-16 text-primary mb-4" />
      </div>
      <p className="text-xl font-semibold font-heading animate-pulse-subtle-text">
        Farion Consulting
      </p>
      <p className="text-sm text-muted-foreground mt-2">Cargando...</p>
    </div>
  );
}

    