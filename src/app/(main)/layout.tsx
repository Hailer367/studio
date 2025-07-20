import { AppHeader } from "@/components/layout/app-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <div className="flex flex-1 container mx-auto max-w-7xl">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        <aside className="hidden lg:block w-80 border-l border-border/40 p-6">
          {/* Side Panel Content */}
        </aside>
      </div>
    </div>
  );
}
