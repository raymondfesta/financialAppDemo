export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-primary-foreground">
      {children}
    </div>
  )
}
