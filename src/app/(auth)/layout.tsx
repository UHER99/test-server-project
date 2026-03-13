export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-wrapper" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div className="bg-mesh" />
      <div className="glass-card animate-scale-in" style={{ width: "100%", maxWidth: "440px", padding: "40px", position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
