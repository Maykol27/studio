// This is the new root layout, it does not process locale.
// It simply passes children through. The [locale] layout will handle html, body, and lang.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
