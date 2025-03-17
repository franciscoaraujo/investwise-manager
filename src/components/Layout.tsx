import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Sidebar />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out animate-fade-in",
          isMobile ? "pt-20 px-4 pb-6" : "pl-64 p-6 md:p-8"
        )}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
