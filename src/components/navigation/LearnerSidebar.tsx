import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Users, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Compass,
  Award,
  X,
  Video,
  HelpCircle,
  WifiOff,
  User
} from "lucide-react";
import { LearnerSupportCard } from "../learner/LearnerSupportCard";

export function LearnerSidebar() {
  const { currentPath, navigateTo } = useRoute();
  const [showSupportToast, setShowSupportToast] = useState(false);

  const triggerSupportToast = () => {
    setShowSupportToast(true);
    setTimeout(() => {
      setShowSupportToast(false);
    }, 4000);
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: currentPath === "/learner" || currentPath === "/learner/dashboard" || currentPath === "/learner/notifications", path: "/learner" as const },
    { id: "journey", label: "My Journey", icon: Compass, active: currentPath === "/learner/journey" || currentPath === "/learner/live-sessions/interview-practice-clinic", path: "/learner/journey" as const },
    { id: "courses", label: "My Courses", icon: BookOpen, active: currentPath === "/learner/courses" || currentPath.startsWith("/learner/courses/") || currentPath.startsWith("/learner/lessons/") || currentPath.startsWith("/learner/lesson/"), path: "/learner/courses" as const },
    { id: "assessments", label: "Assessments", icon: GraduationCap, active: currentPath === "/learner/assessments" || (currentPath.startsWith("/learner/assessments/") && !currentPath.includes("offline")) || currentPath.startsWith("/learner/results/") || currentPath === "/learner/assessment-result", path: "/learner/assessments" as const },
    { id: "certificates", label: "Certificates & CPD", icon: Award, active: currentPath === "/learner/certificates" || currentPath === "/learner/cpd-record" || currentPath === "/learner/certificates/work-readiness-certificate", path: "/learner/certificates" as const },
    { id: "live-sessions", label: "Live Sessions", icon: Video, active: currentPath === "/learner/live-sessions" || (currentPath.startsWith("/learner/live-sessions/") && currentPath !== "/learner/live-sessions/interview-practice-clinic"), path: "/learner/live-sessions" as const },
    { id: "community", label: "Community", icon: Users, active: currentPath === "/learner/community" || currentPath.startsWith("/learner/community/"), path: "/learner/community" as const },
    { id: "resources", label: "Resources", icon: FolderOpen, active: currentPath === "/learner/resources" || currentPath === "/learner/resources/low-bandwidth-reading-version", path: "/learner/resources" as const },
    { id: "support", label: "Support", icon: HelpCircle, active: currentPath === "/learner/support" || currentPath.startsWith("/learner/support/"), path: "/learner/support" as const },
    { id: "offline", label: "Offline Centre", icon: WifiOff, active: currentPath === "/learner/offline", path: "/learner/offline" as const },
    { id: "profile", label: "Profile", icon: User, active: currentPath === "/learner/profile", path: "/learner/profile" as const },
  ];

  return (
    <aside 
      id="learner-sidebar" 
      className="hidden lg:flex w-[280px] shrink-0 bg-white border-r border-slate-200 flex-col min-h-screen text-slate-700"
    >
      {/* Brand Section */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tight text-sustain-900 font-sans">SUSTAIN LMS</h1>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
          Youth Employability Pathway
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigateTo(item.path);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-left ${
              item.active 
                ? "bg-sustain-50 text-sustain-900 font-semibold" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <item.icon className={`h-4.5 w-4.5 ${item.active ? "text-sustain-900" : "text-slate-400"}`} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom Utility and Support Card */}
      <div className="p-4 border-t border-slate-100 space-y-4">
        {/* Support Card */}
        <LearnerSupportCard className={currentPath.startsWith("/learner/support") ? "ring-2 ring-emerald-850 ring-offset-2 border-emerald-300" : ""} />

        <div className="space-y-1">
          <button 
            onClick={() => navigateTo("/learner/profile")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              currentPath === "/learner/profile"
                ? "bg-sustain-50 text-sustain-900 font-semibold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Settings className={`h-4 w-4 ${currentPath === "/learner/profile" ? "text-sustain-900" : "text-slate-400"}`} />
            Settings
          </button>
          <button 
            onClick={() => navigateTo("/login")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-red-700 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4 text-slate-400" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Support toast overlay */}
      {showSupportToast && (
        <div 
          id="support-toast"
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-2xl border border-slate-800 animate-slide-in-right max-w-sm"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Support ticket system is ready. Your facilitator, Halima Sani, has been notified.</span>
          <button 
            onClick={() => setShowSupportToast(false)}
            className="ml-2 hover:text-slate-350 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </aside>
  );
}
