import { useRoute, RoutePath } from "../../context/RouteContext";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  BarChart3, 
  Award, 
  HelpCircle, 
  Settings, 
  LogOut,
  Globe,
  X
} from "lucide-react";

export function ProgrammeSidebar() {
  const { currentPath, navigateTo } = useRoute();
  const [showSignOut, setShowSignOut] = useState(false);

  const menuItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      active: currentPath === "/programme/dashboard" || currentPath === "/programme", 
      path: "/programme/dashboard" as RoutePath 
    },
    { 
      id: "learners", 
      label: "Learners", 
      icon: Users, 
      active: currentPath.startsWith("/programme/learners"), 
      path: "/programme/learners" as RoutePath 
    },
    { 
      id: "cohorts", 
      label: "Cohorts", 
      icon: Layers, 
      active: currentPath.startsWith("/programme/cohorts"), 
      path: "/programme/cohorts" as RoutePath 
    },
    { 
      id: "reports", 
      label: "Reports", 
      icon: BarChart3, 
      active: currentPath.startsWith("/programme/reports"), 
      path: "/programme/reports" as RoutePath 
    },
    { 
      id: "certificates", 
      label: "Certificates", 
      icon: Award, 
      active: currentPath.startsWith("/programme/certificates"), 
      path: "/programme/certificates" as RoutePath 
    },
    { 
      id: "support", 
      label: "Support", 
      icon: HelpCircle, 
      active: currentPath.startsWith("/programme/support"), 
      path: "/programme/support" as RoutePath 
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: Settings, 
      active: currentPath.startsWith("/programme/settings"), 
      path: "/programme/settings" as RoutePath 
    },
  ];

  return (
    <>
      <aside 
        id="programme-sidebar" 
        className="hidden lg:flex w-[280px] shrink-0 bg-white border-r border-slate-200 flex-col min-h-screen text-slate-700"
      >
        {/* Brand Section */}
        <div className="p-6 border-b border-slate-100 text-left">
          <h1 className="text-xl font-bold tracking-tight text-[#005C45] font-sans">SUSTAIN LMS</h1>
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-0.5">
            Programme Workspace
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 text-left">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.path)}
              className={`w-full group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer text-left ${
                item.active 
                  ? "bg-[#005C45] text-white font-bold shadow-sm" 
                  : "text-slate-600 hover:bg-emerald-50/50 hover:text-[#005C45]"
              }`}
            >
              <item.icon className={`h-4.5 w-4.5 transition-colors duration-200 ${item.active ? "text-white" : "text-slate-400 group-hover:text-[#005C45]"}`} />
              <span className="flex-1">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Programme Delivery Context */}
        <div className="p-4 border-t border-slate-100 space-y-4 text-left">
          <div className="bg-emerald-50/40 border border-emerald-100/60 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-700 text-xs">🇳🇬</span>
              <span className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase">
                SUSTAIN CPD Programme
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">National Delivery</h4>
              <p className="text-[10px] text-slate-500 font-semibold leading-tight">Target: 10,000 Learners</p>
            </div>
          </div>

          <div className="space-y-1">
            <button 
              onClick={() => navigateTo("/")}
              className="w-full group flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:text-slate-900 transition-all duration-150 cursor-pointer text-left"
            >
              <Globe className="h-4 w-4 text-slate-400 group-hover:text-[#005C45] transition-colors" />
              View Public Site
            </button>
            <button 
              onClick={() => setShowSignOut(true)}
              className="w-full group flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-slate-650 hover:bg-rose-50 hover:text-rose-700 transition-all duration-150 cursor-pointer text-left"
            >
              <LogOut className="h-4 w-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Sign Out Modal */}
      {showSignOut && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 max-w-sm w-full shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
                Sign out of Programme Workspace?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                You will return to the landing site. You can sign in back at any time to monitor programme delivery.
              </p>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowSignOut(false)}
                className="bg-[#005C45] hover:bg-[#003B2C] active:scale-[0.99] text-white text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer flex-1 text-center shadow-3xs h-[40px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignOut(false);
                  navigateTo("/");
                }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer flex-1 text-center h-[40px]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
