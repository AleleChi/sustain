import { useRoute, RoutePath } from "../../context/RouteContext";
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  ClipboardCheck, 
  MessageSquare, 
  Calendar, 
  FileText, 
  BarChart3, 
  Mail, 
  Settings, 
  LogOut,
  ShieldAlert,
  User
} from "lucide-react";

export function FacilitatorSidebar() {
  const { currentPath, navigateTo, showToast } = useRoute();

  const menuItems = [
    { 
      id: "dashboard", 
      label: "Overview", 
      icon: LayoutDashboard, 
      active: currentPath === "/facilitator/dashboard" || currentPath === "/facilitator", 
      path: "/facilitator/dashboard" as RoutePath 
    },
    { 
      id: "cohorts", 
      label: "My Cohorts", 
      icon: Layers, 
      active: currentPath.startsWith("/facilitator/cohorts"), 
      path: "/facilitator/cohorts" as RoutePath 
    },
    { 
      id: "learners", 
      label: "Learners", 
      icon: Users, 
      active: currentPath.startsWith("/facilitator/learners"), 
      path: "/facilitator/learners" as RoutePath 
    },
    { 
      id: "followup", 
      label: "Follow-Up Queue", 
      icon: ShieldAlert, 
      active: currentPath === "/facilitator/follow-up-queue", 
      path: "/facilitator/follow-up-queue" as RoutePath 
    },
    { 
      id: "assessments", 
      label: "Assessment Reviews", 
      icon: ClipboardCheck, 
      active: currentPath.startsWith("/facilitator/assessments") || currentPath.startsWith("/facilitator/assessment-reviews") || currentPath.startsWith("/facilitator/reviews"), 
      path: "/facilitator/assessments" as RoutePath 
    },
    { 
      id: "questions", 
      label: "Learner Questions", 
      icon: MessageSquare, 
      active: currentPath === "/facilitator/learner-questions" || currentPath === "/facilitator/questions" || currentPath === "/facilitator/qna", 
      path: "/facilitator/learner-questions" as RoutePath 
    },
    { 
      id: "community", 
      label: "Community", 
      icon: Users, 
      active: currentPath === "/facilitator/community", 
      path: "/facilitator/community" as RoutePath 
    },
    { 
      id: "tickets", 
      label: "Support Tickets", 
      icon: Mail, 
      active: currentPath === "/facilitator/support-tickets" || currentPath === "/facilitator/support" || currentPath === "/facilitator/tickets", 
      path: "/facilitator/support-tickets" as RoutePath 
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: BarChart3, 
      active: currentPath === "/facilitator/reports" || currentPath.startsWith("/facilitator/reports"), 
      path: "/facilitator/reports" as RoutePath 
    },
    { 
      id: "profile", 
      label: "Profile", 
      icon: User, 
      active: currentPath === "/facilitator/profile" || currentPath.startsWith("/facilitator/profile"), 
      path: "/facilitator/profile" as RoutePath 
    },
  ];

  return (
    <aside 
      id="facilitator-sidebar" 
      className="hidden lg:flex w-[280px] shrink-0 bg-white border-r border-slate-200 flex-col min-h-screen text-slate-700"
    >
      {/* Brand Section */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold tracking-tight text-sustain-900 font-sans">SUSTAIN LMS</h1>
        <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-0.5">
          Facilitator Workspace
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id !== "dashboard" && item.id !== "cohorts" && item.id !== "learners" && item.id !== "assessments" && item.id !== "followup" && item.id !== "questions" && item.id !== "community" && item.id !== "tickets" && item.id !== "reports" && item.id !== "profile") {
                showToast("This section is not available in this frontend prototype yet.");
              } else {
                navigateTo(item.path);
              }
            }}
            className={`w-full group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer text-left focus-ring ${
              item.active 
                ? "bg-sustain-900 text-white font-semibold hover:bg-sustain-950 shadow-xs" 
                : "text-slate-600 hover:bg-sustain-50 hover:text-sustain-900"
            }`}
          >
            <item.icon className={`h-4.5 w-4.5 transition-colors duration-200 ${item.active ? "text-white" : "text-slate-400 group-hover:text-sustain-800"}`} />
            <span className="flex-1">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Facilitator Hub Identity & Settings */}
      <div className="p-4 border-t border-slate-100 space-y-4">
        {/* Coordination Card */}
        <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-800 tracking-wider">
              Assigned Hub
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Kano Central Hub</h4>
            <p className="text-[10px] text-slate-500 font-medium leading-tight">Lead Co-chair Delivery Office</p>
          </div>
          <div className="pt-1 flex items-center gap-1.5 text-[10px] text-emerald-850 font-semibold">
            <ShieldAlert className="h-3 w-3 shrink-0" />
            <span>Delivery Coordinator Active</span>
          </div>
        </div>

        <div className="space-y-1">
          <button 
            onClick={() => navigateTo("/learner")}
            className="w-full group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-650 hover:bg-sustain-50 hover:text-sustain-900 transition-all duration-150 cursor-pointer text-left focus-ring"
          >
            <Settings className="h-4 w-4 text-slate-400 group-hover:text-sustain-700 transition-colors" />
            Learner View
          </button>
          <button 
            onClick={() => navigateTo("/login")}
            className="w-full group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-650 hover:bg-red-50 hover:text-red-700 transition-all duration-150 cursor-pointer text-left focus-ring"
          >
            <LogOut className="h-4 w-4 text-slate-400 group-hover:text-red-500 transition-colors" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
