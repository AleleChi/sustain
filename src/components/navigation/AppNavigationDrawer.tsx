import { useEffect, useState, useRef } from "react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { 
  X,
  LayoutDashboard, 
  Compass, 
  BookOpen, 
  CheckSquare, 
  Video, 
  Award, 
  WifiOff, 
  HelpCircle, 
  Users, 
  FolderOpen, 
  Bell, 
  User, 
  LogOut,
  Sliders,
  Sparkles,
  Inbox,
  FileSpreadsheet,
  Zap,
  BarChart3,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Layers,
  Settings
} from "lucide-react";
import { mockLearner } from "../../data/mockLearner";

interface AppNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  moduleType: "learner" | "facilitator" | "programme";
}

export function AppNavigationDrawer({ isOpen, onClose, moduleType }: AppNavigationDrawerProps) {
  const { currentPath, navigateTo } = useRoute();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const stayButtonRef = useRef<HTMLButtonElement>(null);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showSignOutConfirm) {
          setShowSignOutConfirm(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // lock scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, showSignOutConfirm]);

  // Focus trap / restore for Sign Out Confirmation Modal
  useEffect(() => {
    if (showSignOutConfirm) {
      const timer = setTimeout(() => {
        stayButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showSignOutConfirm]);

  const isLearner = moduleType === "learner";
  const isProgramme = moduleType === "programme";

  interface NavItem {
    label: string;
    path: string;
    icon: any;
    badge?: string;
  }

  interface NavGroup {
    title: string;
    items: NavItem[];
  }

  // Navigation Groups
  const learnerGroups: NavGroup[] = [
    {
      title: "Main Workspace",
      items: [
        { label: "Dashboard", path: "/learner/dashboard", icon: LayoutDashboard },
        { label: "My Journey", path: "/learner/journey", icon: Compass },
        { label: "My Courses", path: "/learner/courses", icon: BookOpen },
        { label: "Assessments", path: "/learner/assessments", icon: CheckSquare, badge: "Draft" },
        { label: "Live Sessions", path: "/learner/live-sessions", icon: Video }
      ]
    },
    {
      title: "Progress & Rewards",
      items: [
        { label: "CPD Record", path: "/learner/cpd-record", icon: Sparkles, badge: "22/35" },
        { label: "Certificates", path: "/learner/certificates", icon: Award },
        { label: "Notifications", path: "/learner/notifications", icon: Bell, badge: "2" }
      ]
    },
    {
      title: "Access & Offline",
      items: [
        { label: "Offline Centre", path: "/learner/offline", icon: WifiOff },
        { label: "Low-Bandwidth Mode", path: "/learner/low-bandwidth", icon: Zap },
        { label: "Resources", path: "/learner/resources", icon: FolderOpen }
      ]
    },
    {
      title: "Support & Account",
      items: [
        { label: "Support", path: "/learner/support", icon: HelpCircle },
        { label: "Community", path: "/learner/community", icon: Users },
        { label: "Profile", path: "/learner/profile", icon: User }
      ]
    }
  ];

  const facilitatorGroups: NavGroup[] = [
    {
      title: "Main Dashboard",
      items: [
        { label: "Dashboard", path: "/facilitator/dashboard", icon: LayoutDashboard },
        { label: "Live Sessions", path: "/facilitator/live-sessions", icon: Video },
        { label: "Assessment Reviews", path: "/facilitator/assessment-reviews", icon: Inbox, badge: "8" },
        { label: "Checkpoint Reviews", path: "/facilitator/checkpoints", icon: CheckSquare },
        { label: "CPD Reviews", path: "/facilitator/cpd-reviews", icon: Sparkles, badge: "4" }
      ]
    },
    {
      title: "Learner Support",
      items: [
        { label: "Learner Questions", path: "/facilitator/learner-questions", icon: MessageSquare, badge: "6" },
        { label: "Follow-up Queue", path: "/facilitator/follow-up-queue", icon: ShieldAlert },
        { label: "Support Tickets", path: "/facilitator/support-tickets", icon: HelpCircle, badge: "3" }
      ]
    },
    {
      title: "Programme Management",
      items: [
        { label: "Module Unlocks", path: "/facilitator/module-unlocks", icon: Sliders },
        { label: "Communications", path: "/facilitator/communications", icon: FileSpreadsheet },
        { label: "Reports", path: "/facilitator/reports", icon: BarChart3 },
        { label: "Community", path: "/facilitator/community", icon: Users },
        { label: "Profile", path: "/facilitator/profile", icon: User }
      ]
    }
  ];

  const programmeGroups: NavGroup[] = [
    {
      title: "Programme Delivery",
      items: [
        { label: "Dashboard", path: "/programme/dashboard", icon: LayoutDashboard },
        { label: "Learners", path: "/programme/learners", icon: Users },
        { label: "Cohorts", path: "/programme/cohorts", icon: Layers },
      ]
    },
    {
      title: "Monitoring & Reporting",
      items: [
        { label: "Reports", path: "/programme/reports", icon: BarChart3 },
        { label: "Certificates", path: "/programme/certificates", icon: Award, badge: "312" },
        { label: "Support", path: "/programme/support", icon: HelpCircle, badge: "23" },
        { label: "Settings", path: "/programme/settings", icon: Settings }
      ]
    }
  ];

  const handleItemClick = (path: string) => {
    onClose();
    navigateTo(path as RoutePath);
  };

  const isItemActive = (itemPath: string) => {
    if (itemPath === "/learner/dashboard") {
      return currentPath === "/learner/dashboard" || currentPath === "/learner";
    }
    if (itemPath === "/facilitator/dashboard") {
      return currentPath === "/facilitator/dashboard" || currentPath === "/facilitator";
    }
    if (itemPath === "/programme/dashboard") {
      return currentPath === "/programme/dashboard" || currentPath === "/programme";
    }
    return currentPath === itemPath || currentPath.startsWith(itemPath + "/");
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`} 
      role="dialog" 
      aria-modal="true"
    >
      {/* Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[360px] bg-white flex flex-col h-full shadow-2xl rounded-r-[28px] overflow-hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 flex flex-col gap-4 shrink-0 bg-[#004A37] text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold tracking-widest text-emerald-300 uppercase">
              SUSTAIN LMS
            </h3>
            <button 
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isLearner ? (
            <div className="text-left space-y-3">
              <div>
                <p className="text-lg font-bold text-white tracking-tight">{mockLearner.name}</p>
                <p className="text-xs text-emerald-100 font-medium">Youth Employability Pathway</p>
              </div>
              <div className="space-y-1.5 pt-1.5 border-t border-emerald-800/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-200 font-semibold">CPD progress</span>
                  <span className="text-amber-300 font-mono font-bold">22 of 35 credits</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FBBF24] rounded-full" style={{ width: "62.8%" }} />
                </div>
              </div>
            </div>
          ) : isProgramme ? (
            <div className="text-left space-y-3">
              <div>
                <p className="text-lg font-bold text-white tracking-tight">Programme Team</p>
                <p className="text-xs text-emerald-100 font-medium">National Delivery Lead</p>
                <p className="text-xs text-amber-300 font-semibold">SUSTAIN CPD Nigeria</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-800/60 text-center">
                <div className="bg-emerald-950/40 py-1.5 px-1 rounded-lg">
                  <span className="block text-amber-300 font-mono font-bold text-xs">4,286</span>
                  <span className="text-[9px] text-emerald-200 font-medium">enrolled</span>
                </div>
                <div className="bg-emerald-950/40 py-1.5 px-1 rounded-lg">
                  <span className="block text-amber-300 font-mono font-bold text-xs">18</span>
                  <span className="text-[9px] text-emerald-200 font-medium">cohorts</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-left space-y-3">
              <div>
                <p className="text-lg font-bold text-white tracking-tight">Halima Sani</p>
                <p className="text-xs text-emerald-100 font-medium">Work Readiness Facilitator</p>
                <p className="text-xs text-amber-300 font-semibold">Kano Youth Employability Cohort 02</p>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-800/60 text-center">
                <div className="bg-emerald-950/40 py-1.5 px-1 rounded-lg">
                  <span className="block text-amber-300 font-mono font-bold text-xs">8</span>
                  <span className="text-[9px] text-emerald-200 font-medium">reviews</span>
                </div>
                <div className="bg-emerald-950/40 py-1.5 px-1 rounded-lg">
                  <span className="block text-amber-300 font-mono font-bold text-xs">12</span>
                  <span className="text-[9px] text-emerald-200 font-medium">attendance</span>
                </div>
                <div className="bg-emerald-950/40 py-1.5 px-1 rounded-lg">
                  <span className="block text-amber-300 font-mono font-bold text-xs">4</span>
                  <span className="text-[9px] text-emerald-200 font-medium">CPD checks</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-5 select-none text-left">
          {/* User Context Card */}
          {isLearner ? (
            <div className="bg-emerald-50 border border-emerald-100/80 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Current Focus</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">Draft saved</span>
              </div>
              <h4 className="font-bold text-slate-800 text-xs mt-1">Preparing for Interviews</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Next step: Continue lesson</p>
              <button 
                onClick={() => handleItemClick("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                className="mt-3 w-full py-2 bg-[#005C45] hover:bg-[#003B2C] active:scale-[0.99] transition-all text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-3xs"
              >
                Continue Lesson
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ) : isProgramme ? (
            <div className="bg-emerald-50 border border-emerald-100/80 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Programme Oversight</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">312 ready</span>
              </div>
              <h4 className="font-bold text-slate-800 text-xs mt-1">Certificate Review Queue</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Next step: Review queue</p>
              <button 
                onClick={() => handleItemClick("/programme/certificates")}
                className="mt-3 w-full py-2 bg-[#005C45] hover:bg-[#003B2C] active:scale-[0.99] transition-all text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-3xs"
              >
                Review Certificates
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100/80 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Today's Focus</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">8 pending</span>
              </div>
              <h4 className="font-bold text-slate-800 text-xs mt-1">Assessment Reviews</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Next step: Confirm attendance</p>
              <button 
                onClick={() => handleItemClick("/facilitator/assessment-reviews")}
                className="mt-3 w-full py-2 bg-[#005C45] hover:bg-[#003B2C] active:scale-[0.99] transition-all text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-3xs"
              >
                Open Review Queue
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Groups */}
          {(isLearner ? learnerGroups : isProgramme ? programmeGroups : facilitatorGroups).map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2.5">
                {group.title}
              </span>
              <div className="space-y-1">
                {group.items.map((item, idx) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.path);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleItemClick(item.path)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 group cursor-pointer text-left h-[48px] ${
                        active 
                          ? "bg-emerald-50 text-[#004A37]" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99]"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-xl flex items-center justify-center transition-colors ${
                          active ? "bg-emerald-100/60 text-emerald-800" : "bg-transparent text-slate-400 group-hover:text-slate-500"
                        }`}>
                          <Icon className="h-4 w-4 shrink-0" />
                        </div>
                        <span className="tracking-wide">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                          item.badge === "Draft" || item.badge === "8" || item.badge === "6" || item.badge === "3"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sticky Bottom Actions */}
        <div 
          className="px-4 pt-3 border-t border-slate-200 shrink-0 space-y-2.5 bg-white/95 backdrop-blur-sm sticky bottom-0 shadow-lg"
          style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
        >
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleItemClick(isLearner ? "/learner/support" : isProgramme ? "/programme/support" : "/facilitator/support-tickets")}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 active:scale-[0.99] transition-all cursor-pointer shadow-3xs h-[44px]"
              aria-label="Ask for help"
            >
              <HelpCircle className="h-4 w-4 text-emerald-600" />
              <span>Ask Help</span>
            </button>

            <button
              onClick={() => handleItemClick(isLearner ? "/learner/profile" : isProgramme ? "/programme/settings" : "/facilitator/profile")}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer shadow-3xs h-[44px]"
              aria-label="View Profile or Settings"
            >
              <User className="h-4 w-4 text-slate-500" />
              <span>{isProgramme ? "Settings" : "Profile"}</span>
            </button>
          </div>

          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 h-[44px] rounded-2xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-100 hover:bg-rose-100 active:scale-[0.99] transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-rose-100"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4 text-rose-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>

    {/* Sign Out Confirmation Modal */}
    {showSignOutConfirm && (
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white rounded-[28px] border border-slate-100 p-6 max-w-sm w-full shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-2">
            <h3 className="text-base font-extrabold text-slate-900 font-sans tracking-tight">
              Sign out of SUSTAIN LMS?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
              You will return to the sign-in page. Any saved drafts on this device will remain available when you sign in again.
            </p>
          </div>
          <div className="flex gap-3 pt-1">
            <button
              ref={stayButtonRef}
              onClick={() => setShowSignOutConfirm(false)}
              className="bg-[#005C45] hover:bg-[#003B2C] active:scale-[0.99] text-white text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer flex-1 text-center shadow-3xs h-[40px] focus:outline-hidden focus:ring-2 focus:ring-emerald-200"
            >
              Stay Signed In
            </button>
            <button
              onClick={() => {
                setShowSignOutConfirm(false);
                onClose();
                navigateTo("/login");
              }}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer flex-1 text-center h-[40px] focus:outline-hidden focus:ring-2 focus:ring-rose-100"
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
