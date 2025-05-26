// Esta página se elimina o Next.js la ignora si existe [locale]/page.tsx
// y el middleware redirige correctamente.
// Para evitar cualquier confusión, podemos dejarla vacía o con un comentario.
// Next.js priorizará la ruta [locale]/page.tsx debido al middleware.
export default function Page() {
  return null;
}
