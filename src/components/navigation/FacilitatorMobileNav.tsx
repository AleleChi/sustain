import { useRoute, RoutePath } from "../../context/RouteContext";
import { 
  LayoutDashboard, 
  Layers, 
  Users,
  HelpCircle,
  MessageSquare,
  Mail,
  BarChart3,
  User
} from "lucide-react";

export function FacilitatorMobileNav() {
  const { currentPath, navigateTo, showToast } = useRoute();

  const navItems = [
    { 
      id: "overview", 
      label: "Overview", 
      icon: LayoutDashboard, 
      onClick: () => navigateTo("/facilitator/dashboard" as RoutePath) 
    },
    { 
      id: "cohorts", 
      label: "Cohorts", 
      icon: Layers, 
      onClick: () => navigateTo("/facilitator/cohorts" as RoutePath) 
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: BarChart3, 
      onClick: () => navigateTo("/facilitator/reports" as RoutePath) 
    },
    { 
      id: "queue", 
      label: "Queue", 
      icon: HelpCircle, 
      onClick: () => navigateTo("/facilitator/follow-up-queue" as RoutePath) 
    },
    { 
      id: "reviews", 
      label: "Questions", 
      icon: MessageSquare, 
      onClick: () => navigateTo("/facilitator/learner-questions" as RoutePath) 
    },
    { 
      id: "community", 
      label: "Community", 
      icon: Users, 
      onClick: () => navigateTo("/facilitator/community" as RoutePath) 
    },
    { 
      id: "support", 
      label: "Support", 
      icon: Mail, 
      onClick: () => navigateTo("/facilitator/support-tickets" as RoutePath) 
    },
    { 
      id: "profile", 
      label: "Profile", 
      icon: User, 
      onClick: () => navigateTo("/facilitator/profile" as RoutePath) 
    }
  ];

  return (
    <div 
      id="facilitator-mobile-nav" 
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-slate-200 h-16 flex items-center justify-between shadow-lg px-4"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        
        let isActive = false;
        if (item.id === "overview") {
          isActive = currentPath === "/facilitator/dashboard" || currentPath === "/facilitator";
        } else if (item.id === "cohorts") {
          isActive = currentPath.startsWith("/facilitator/cohorts");
        } else if (item.id === "reports") {
          isActive = currentPath === "/facilitator/reports" || currentPath.startsWith("/facilitator/reports");
        } else if (item.id === "queue") {
          isActive = currentPath === "/facilitator/follow-up-queue";
        } else if (item.id === "reviews") {
          isActive = currentPath === "/facilitator/learner-questions" || currentPath === "/facilitator/questions" || currentPath === "/facilitator/qna";
        } else if (item.id === "community") {
          isActive = currentPath === "/facilitator/community";
        } else if (item.id === "support") {
          isActive = currentPath === "/facilitator/support-tickets" || currentPath === "/facilitator/support" || currentPath === "/facilitator/tickets";
        } else if (item.id === "profile") {
          isActive = currentPath === "/facilitator/profile" || currentPath.startsWith("/facilitator/profile");
        }

        return (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`flex flex-col items-center justify-center gap-1 h-full flex-1 min-w-0 px-1 text-[10px] font-bold transition-all duration-150 cursor-pointer select-none active:bg-slate-50/70 focus-ring ${
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
