import {
  Home,
  FileText,
  Users,
  Activity,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [location.pathname, isMobile]);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: FileText, label: "Fundos", path: "/fundos" },
    { icon: Users, label: "Cotistas", path: "/cotistas" },
    { icon: CreditCard, label: "Direitos Creditórios", path: "/direitos" },
    { icon: Activity, label: "Operações", path: "/operacoes" },
  ];

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path))
    );
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-background border-b border-border">
          <h1 className="text-xl font-semibold text-primary">FIDC Manager</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-card border-r border-border h-screen flex flex-col fixed left-0 top-0 z-40 overflow-y-auto transition-all duration-300 ease-in-out",
          isMobile
            ? isOpen
              ? "w-64 translate-x-0 shadow-xl"
              : "w-64 -translate-x-full"
            : "w-64 translate-x-0",
          isMobile && "pt-16"
        )}
      >
        {!isMobile && (
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-primary">
              FIDC Manager
            </h1>
            <ThemeToggle />
          </div>
        )}

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path} className="animate-fade-in">
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all hover-card-effect",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
