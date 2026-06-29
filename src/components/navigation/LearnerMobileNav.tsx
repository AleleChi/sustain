import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { 
  Home as HomeIcon, 
  User,
  Compass,
  BookOpen,
  WifiOff
} from "lucide-react";

export function LearnerMobileNav() {
  const { currentPath, navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const navItems = [
    { id: "home", label: "Home", icon: HomeIcon, onClick: () => navigateTo("/learner") },
    { id: "journey", label: "Journey", icon: Compass, onClick: () => navigateTo("/learner/journey") },
    { id: "courses", label: "Courses", icon: BookOpen, onClick: () => navigateTo("/learner/courses") },
    { id: "offline", label: "Offline", icon: WifiOff, onClick: () => navigateTo("/learner/offline") },
    { id: "profile", label: "Profile", icon: User, onClick: () => navigateTo("/learner/profile") },
  ];

  return (
    <>
      <div 
        id="learner-mobile-nav" 
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 h-16 flex items-center justify-around shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)] pb-safe"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          
          let isActive = false;
          if (item.id === "home") {
            isActive = currentPath === "/learner" || currentPath === "/learner/dashboard" || currentPath === "/learner/notifications";
          } else if (item.id === "journey") {
            isActive = 
              currentPath === "/learner/journey" ||
              currentPath.startsWith("/learner/checkpoints/") ||
              currentPath.startsWith("/learner/assessments/") ||
              currentPath.startsWith("/learner/live-sessions/") ||
              currentPath.includes("lessons/preparing-for-interviews") ||
              currentPath.includes("modules/interview-preparation/locked");
          } else if (item.id === "courses") {
            isActive = currentPath === "/learner/courses" || (currentPath.startsWith("/learner/courses/") && !currentPath.includes("lessons/") && !currentPath.includes("modules/"));
          } else if (item.id === "offline") {
            isActive = currentPath === "/learner/offline" || currentPath === "/learner/low-bandwidth";
          } else if (item.id === "profile") {
            isActive = currentPath === "/learner/profile";
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center gap-1.5 h-full w-full min-w-[44px] min-h-[44px] text-[10px] font-medium transition-all duration-200 cursor-pointer ${
                isActive ? "text-emerald-800 scale-102" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className={`h-5 w-5 stroke-[2] transition-colors ${isActive ? "text-emerald-800" : "text-slate-400"}`} />
              <span className="tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>

      {toast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-slate-900/95 backdrop-blur-xs text-white text-xs px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2.5 border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <p className="font-normal text-slate-100">{toast.message}</p>
        </div>
      )}
    </>
  );
}
