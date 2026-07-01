import { useRoute, RoutePath } from "../../context/RouteContext";
import { 
  LayoutDashboard, 
  Users,
  BarChart3,
  Award,
  Settings
} from "lucide-react";

export function ProgrammeMobileNav() {
  const { currentPath, navigateTo } = useRoute();

  const navItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      onClick: () => navigateTo("/programme/dashboard" as RoutePath) 
    },
    { 
      id: "learners", 
      label: "Learners", 
      icon: Users, 
      onClick: () => navigateTo("/programme/learners" as RoutePath) 
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: BarChart3, 
      onClick: () => navigateTo("/programme/reports" as RoutePath) 
    },
    { 
      id: "certificates", 
      label: "Certificates", 
      icon: Award, 
      onClick: () => navigateTo("/programme/certificates" as RoutePath) 
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: Settings, 
      onClick: () => navigateTo("/programme/settings" as RoutePath) 
    }
  ];

  return (
    <div 
      id="programme-mobile-nav" 
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-slate-200 h-16 flex items-center justify-between shadow-lg px-2"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        
        let isActive = false;
        if (item.id === "dashboard") {
          isActive = currentPath === "/programme/dashboard" || currentPath === "/programme";
        } else if (item.id === "learners") {
          isActive = currentPath.startsWith("/programme/learners");
        } else if (item.id === "reports") {
          isActive = currentPath.startsWith("/programme/reports");
        } else if (item.id === "certificates") {
          isActive = currentPath.startsWith("/programme/certificates");
        } else if (item.id === "settings") {
          isActive = currentPath.startsWith("/programme/settings");
        }

        return (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`flex flex-col items-center justify-center gap-1 h-full flex-1 min-w-0 px-1 text-[10px] font-bold transition-all duration-150 cursor-pointer select-none active:bg-slate-50/70 ${
              isActive ? "text-[#005C45]" : "text-slate-400"
            }`}
          >
            <Icon className={`h-5 w-5 shrink-0 transition-all duration-150 ${isActive ? "scale-105 text-[#005C45]" : "text-slate-400"}`} />
            <span className="truncate max-w-full text-center leading-none">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
