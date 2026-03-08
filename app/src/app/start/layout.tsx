export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No header/footer for the quiz flow - clean, focused experience
  return <>{children}</>;
}
