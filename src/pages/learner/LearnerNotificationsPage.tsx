import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  X, 
  Check, 
  Info, 
  Lock, 
  BookOpen, 
  Award, 
  FileText, 
  Users, 
  User, 
  Shield, 
  ArrowUpRight, 
  Settings, 
  AlertCircle, 
  Calendar,
  Layers,
  ArrowRight,
  Bookmark,
  Sparkles,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";

interface NotificationItem {
  id: string;
  type: "Certificate & CPD" | "Support" | "Assessment" | "Community" | "Resources" | "Profile";
  status: "Unread" | "Read";
  priority: "Important" | "Normal" | "Low";
  time: string;
  title: string;
  message: string;
  route: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Certificate readiness updated",
    type: "Certificate & CPD",
    status: "Unread",
    priority: "Important",
    time: "Today",
    message: "Your Work Readiness Certificate record is ready for review, but the certificate is not issued yet.",
    route: "/learner/cpd-record"
  },
  {
    id: "notif-2",
    title: "Facilitator response received",
    type: "Support",
    status: "Unread",
    priority: "Important",
    time: "Today",
    message: "Halima Sani responded to your certificate readiness review question.",
    route: "/learner/support"
  },
  {
    id: "notif-3",
    title: "Assessment draft saved",
    type: "Assessment",
    status: "Read",
    priority: "Normal",
    time: "Today",
    message: "Your Work Readiness Assignment draft was saved in this frontend prototype.",
    route: "/learner/assessments/work-readiness-assessment/attempt"
  },
  {
    id: "notif-4",
    title: "Interview discussion updated",
    type: "Community",
    status: "Read",
    priority: "Normal",
    time: "Today",
    message: "A new facilitator reply is available in the interview preparation discussion.",
    route: "/learner/community"
  },
  {
    id: "notif-5",
    title: "Low-bandwidth resource recommended",
    type: "Resources",
    status: "Read",
    priority: "Normal",
    time: "Yesterday",
    message: "A lightweight reading version is available for Preparing for Interviews.",
    route: "/learner/resources"
  },
  {
    id: "notif-6",
    title: "CPD record reviewed",
    type: "Certificate & CPD",
    status: "Read",
    priority: "Normal",
    time: "2 days ago",
    message: "Your CPD record shows 22 of 35 credits, with 4 credits pending review.",
    route: "/learner/cpd-record"
  },
  {
    id: "notif-7",
    title: "Profile reminder",
    type: "Profile",
    status: "Read",
    priority: "Low",
    time: "3 days ago",
    message: "Review your learner profile details for the Kano Youth Employability Cohort 02.",
    route: "/learner/profile"
  }
];

export function LearnerNotificationsPage() {
  const { navigateTo } = useRoute();

  // Local State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  // Preference simulation state
  const [preferences, setPreferences] = useState({
    learningUpdates: true,
    assessmentReminders: true,
    certificateCpdUpdates: true,
    supportResponses: true,
    communityReplies: true,
    resourceRecommendations: true
  });

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  // Interactions
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: "Read" })));
    showToast("All notifications marked as read in this frontend prototype.", "success");
  };

  const handleMarkSingleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: "Read" } : n));
    showToast("Notification marked as read in this frontend prototype.", "success");
  };

  const handleSaveForLater = (title: string) => {
    showToast(`"${title}" saved for later in this frontend prototype.`, "info");
  };

  const handleTogglePreference = (key: keyof typeof preferences, label: string) => {
    setPreferences(prev => {
      const nextVal = !prev[key];
      showToast("Notification preference updated in this frontend prototype.", "success");
      return { ...prev, [key]: nextVal };
    });
  };

  const handleApplyFilters = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    showToast("Notification filters applied.", "success");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
    showToast("Filters cleared.", "info");
  };

  const handleAction = (route: string) => {
    navigateTo(route as any);
  };

  // Filtered lists
  const filteredNotifications = notifications.filter(n => {
    // Category chips
    if (activeFilter !== "All") {
      if (activeFilter === "Unread" && n.status !== "Unread") return false;
      if (activeFilter === "Important" && n.priority !== "Important") return false;
      if (activeFilter !== "Unread" && activeFilter !== "Important" && n.type !== activeFilter) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q) || n.type.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Stats
  const unreadCount = notifications.filter(n => n.status === "Unread").length;
  const importantCount = notifications.filter(n => n.priority === "Important").length;
  const todayCount = notifications.filter(n => n.time === "Today").length;
  const categoriesCount = 6;

  // Shared Learner Context
  const learner = {
    name: "Aisha Mohammed",
    id: "SUST-LRN-0442",
    programme: "SUSTAIN CPD Programme",
    pathway: "Youth Employability Pathway",
    organisation: "Kano Youth Skills Hub",
    cohort: "Kano Youth Employability Cohort 02",
    facilitator: "Halima Sani"
  };

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "Certificate & CPD": return Award;
      case "Support": return HelpCircle;
      case "Assessment": return FileText;
      case "Community": return Users;
      case "Resources": return BookOpen;
      case "Profile": return User;
      default: return Info;
    }
  };

  const getNotificationStyles = (item: NotificationItem) => {
    if (item.status === "Unread") {
      return "bg-emerald-50/30 border-l-4 border-l-emerald-600 border-slate-200";
    }
    return "bg-white border-slate-200";
  };

  // -------------------------------------------------------------------------
  // REUSABLE SUB-COMPONENTS & SECTIONS
  // -------------------------------------------------------------------------

  // SECTION 1 — NOTIFICATIONS HERO
  const NotificationsHero = () => (
    <Card id="notifications-hero" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch">
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => handleAction("/learner")}>Learner Workspace</span>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              <span className="text-slate-800 font-semibold">Notifications</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {unreadCount} unread
              </span>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                Learner updates
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight leading-none mt-1 font-heading">
              Notifications
            </h1>
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xl">
              Review learning updates, support responses, certificate readiness reminders, and course activity linked to your pathway.
            </p>
          </div>

          {/* Context row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold text-slate-650">
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Learner</p>
              <p className="text-slate-900 mt-0.5 font-medium">{learner.name}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Learner ID</p>
              <p className="text-slate-900 mt-0.5 font-medium">{learner.id}</p>
            </div>
            <div className="sm:col-span-1">
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Pathway</p>
              <p className="text-slate-900 mt-0.5 font-medium break-words leading-tight">{learner.pathway}</p>
            </div>
            <div className="sm:col-span-1">
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Cohort</p>
              <p className="text-slate-900 mt-0.5 font-medium break-words leading-tight">{learner.cohort}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              Mark All as Read
            </button>
            <button
              onClick={() => handleAction("/learner/support")}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
            >
              Open Latest Response
            </button>
          </div>
        </div>

        {/* Latest Response Right Panel */}
        <div className="bg-emerald-800 text-white rounded-2xl border border-emerald-700 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[200px]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-750/30 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-[9px] font-semibold text-white bg-emerald-700/80 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">
              Latest Update
            </span>
            <h4 className="text-sm font-bold text-white leading-snug pt-1 font-heading">
              Certificate readiness updated
            </h4>
            <p className="text-[11px] text-emerald-50 leading-relaxed font-medium">
              Your certificate record is ready for review, but it has not been issued yet.
            </p>
          </div>

          <div className="relative z-10 border-t border-emerald-700/50 pt-4 mt-4 flex flex-wrap gap-1.5">
            <span className="bg-white/10 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              Priority: Important
            </span>
            <span className="bg-white/10 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              Date: Today
            </span>
            <span className="bg-white/10 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              Unread: 2 unread
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  // SECTION 2 — NOTIFICATION SUMMARY CARDS
  const NotificationSummaryCards = () => (
    <div id="notification-summary-cards" className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[100px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider block">Unread</span>
          <p className="text-xl font-bold text-slate-950 font-sans">{unreadCount}</p>
          <span className="text-[10px] text-slate-600 font-medium block">Needs review</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[100px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider block">Important</span>
          <p className="text-xl font-bold text-slate-950 font-sans">{importantCount}</p>
          <span className="text-[10px] text-slate-600 font-medium block">Certificate and support</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[100px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider block">Today</span>
          <p className="text-xl font-bold text-slate-950 font-sans">{todayCount}</p>
          <span className="text-[10px] text-slate-600 font-medium block">Recent updates</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[100px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider block">Categories</span>
          <p className="text-xl font-bold text-slate-950 font-sans">{categoriesCount}</p>
          <span className="text-[10px] text-slate-600 font-medium block">Learning areas</span>
        </div>
      </Card>
    </div>
  );

  // SECTION 3 — NOTIFICATION FILTERS
  const NotificationFilters = () => {
    const filterOptions = [
      "All", "Unread", "Important", "Certificate & CPD", "Support", "Assessment", "Community", "Resources", "Profile"
    ];

    return (
      <Card id="notification-filters" className="p-5 md:p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-950 tracking-tight font-heading">Filter Notifications</h3>
          <p className="text-xs text-slate-500 font-medium">Find updates by learning area or action needed.</p>
        </div>

        <form onSubmit={handleApplyFilters} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => {
              const isSelected = activeFilter === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setActiveFilter(opt);
                    showToast(`Filter set to: ${opt}`, "info");
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                    isSelected 
                      ? "bg-emerald-700 border-emerald-700 text-white shadow-xs" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-emerald-50/40 hover:border-emerald-200"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notifications"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-600 transition-all font-medium"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                type="submit"
                className="flex-1 md:flex-none bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer min-h-[40px] text-center transition-colors shadow-xs"
              >
                Apply Filters
              </button>
              
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 md:flex-none bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer min-h-[40px] text-center transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </Card>
    );
  };

  // SECTION 4 — NOTIFICATION LIST
  const NotificationListInbox = ({ isMobile = false }) => (
    <Card id="notification-inbox" className="p-5 md:p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-950 tracking-tight font-heading">Notification Inbox</h3>
        <p className="text-xs text-slate-500 font-medium">Recent updates from your learner workspace.</p>
      </div>

      <div className="space-y-3 pt-1">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl">
            <p className="text-xs font-semibold text-slate-500">No notifications match your current search or filters.</p>
            <button 
              onClick={handleResetFilters} 
              className="text-xs font-semibold text-emerald-700 hover:underline mt-2 cursor-pointer"
            >
              Clear filters and view all
            </button>
          </div>
        ) : (
          filteredNotifications.map((n) => {
            const IconComponent = getNotificationIcon(n.type);
            
            if (isMobile) {
              return (
                <div 
                  key={n.id}
                  className={`p-4 rounded-xl border transition-all duration-205 flex flex-col gap-3 text-left relative ${getNotificationStyles(n)}`}
                >
                  <div className="flex items-start gap-2.5 justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-emerald-50 text-emerald-750 border border-emerald-100 rounded-lg shrink-0">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <h4 className="text-xs font-semibold text-slate-950 font-heading">{n.title}</h4>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium shrink-0 ml-2">
                      {n.time}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-medium text-slate-650 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                      {n.type}
                    </span>
                    {n.priority === "Important" && (
                      <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-150 px-2.5 py-0.5 rounded-full">
                        Important
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {n.message}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-150/50">
                    <button
                      onClick={() => handleAction(n.route)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2 rounded-lg cursor-pointer transition-colors shadow-2xs"
                    >
                      Open Update
                    </button>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => handleMarkSingleRead(n.id)}
                        className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-[11px] py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Read
                      </button>
                      <button
                        onClick={() => handleSaveForLater(n.title)}
                        className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-[11px] py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Desktop view layout
            return (
              <div 
                key={n.id}
                className={`p-4 rounded-xl border transition-all duration-200 hover:border-emerald-200 grid grid-cols-[40px_minmax(0,1fr)_auto] gap-4 items-start ${getNotificationStyles(n)}`}
              >
                <div className="p-2 bg-emerald-50 text-emerald-750 border border-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-medium text-slate-650 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                      {n.type}
                    </span>
                    {n.priority === "Important" && (
                      <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-150 px-2.5 py-0.5 rounded-full">
                        Important
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-medium ml-1">
                      {n.time}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-950 font-heading">
                    {n.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-2xl">
                    {n.message}
                  </p>
                </div>

                {/* Desktop Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-2 self-center shrink-0">
                  <button
                    onClick={() => handleMarkSingleRead(n.id)}
                    className="text-[11px] font-semibold text-slate-500 hover:text-emerald-800 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {n.status === "Unread" ? "Mark as Read" : "Read"}
                  </button>
                  <button
                    onClick={() => handleSaveForLater(n.title)}
                    className="text-[11px] font-semibold text-slate-500 hover:text-emerald-800 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                    title="Save for Later"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleAction(n.route)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer transition-colors"
                  >
                    Open Update
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );

  // SECTION 5 — ACTION NEEDED
  const ActionNeededPanel = () => (
    <Card id="action-needed" className="p-5 md:p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-950 tracking-tight font-heading">Action Needed</h3>
        <p className="text-xs text-slate-500 font-medium">Updates that may need your attention.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col justify-between hover:border-emerald-200 transition-colors duration-150 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white border border-slate-200 text-emerald-850 rounded-lg shadow-3xs">
                <Award className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-semibold text-slate-900 leading-snug">Review certificate readiness</h4>
            </div>
            <p className="text-[11px] text-slate-650 leading-relaxed font-medium">
              Check your Work Readiness Certificate record, CPD credits, and pending requirements.
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-150 px-2 py-0.5 rounded-full">
              Needs Action
            </span>
            <button
              onClick={() => handleAction("/learner/cpd-record")}
              className="text-[11px] font-semibold py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-lg cursor-pointer flex items-center gap-1 transition-colors duration-150 shadow-3xs"
            >
              <span>View Certificate Track</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col justify-between hover:border-emerald-200 transition-colors duration-150 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white border border-slate-200 text-emerald-850 rounded-lg shadow-3xs">
                <HelpCircle className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-semibold text-slate-900 leading-snug">Read facilitator response</h4>
            </div>
            <p className="text-[11px] text-slate-650 leading-relaxed font-medium">
              Open Halima Sani’s response about certificate readiness and next steps.
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-[10px] font-medium text-emerald-805 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
              Unread Response
            </span>
            <button
              onClick={() => handleAction("/learner/support")}
              className="text-[11px] font-semibold py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-lg cursor-pointer flex items-center gap-1 transition-colors duration-150 shadow-3xs"
            >
              <span>Open Support Request</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );

  // SECTION 6 — NOTIFICATION PREFERENCES
  const NotificationPreferencesPanel = () => (
    <Card id="notification-preferences" className="p-5 md:p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-950 tracking-tight font-heading">Notification Preferences</h3>
          <p className="text-xs text-slate-500 font-medium">Toggle notification channels for your learning pathway.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {[
          { key: "learningUpdates", label: "Learning updates" },
          { key: "assessmentReminders", label: "Assessment reminders" },
          { key: "certificateCpdUpdates", label: "Certificate & CPD updates" },
          { key: "supportResponses", label: "Support responses" },
          { key: "communityReplies", label: "Community replies" },
          { key: "resourceRecommendations", label: "Resource recommendations" }
        ].map((item) => {
          const isChecked = preferences[item.key as keyof typeof preferences];
          return (
            <div 
              key={item.key}
              onClick={() => handleTogglePreference(item.key as keyof typeof preferences, item.label)}
              className="p-3 bg-slate-50 border border-slate-150 rounded-xl hover:border-emerald-250 transition-all duration-150 flex items-center justify-between cursor-pointer"
            >
              <span className="text-xs font-semibold text-slate-800">{item.label}</span>
              <div className={`h-5 w-9 rounded-full transition-colors duration-200 relative shrink-0 ${isChecked ? "bg-emerald-700" : "bg-slate-300"}`}>
                <div className={`h-4 w-4 rounded-full bg-white absolute top-0.5 transition-transform duration-200 ${isChecked ? "right-0.5" : "left-0.5"}`} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  // SECTION 7 — SAFE NOTIFICATION GUIDANCE
  const SafeNotificationGuidancePanel = () => (
    <Card id="safe-guidance" className="p-5 md:p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-950 tracking-tight font-heading">Safe Notification Guidance</h3>
        <p className="text-xs text-slate-500 font-medium">Use notifications carefully and keep your learner record protected.</p>
      </div>

      <div className="space-y-2.5">
        {[
          "SUSTAIN LMS will not ask for passwords inside notifications.",
          "Do not share verification codes, reset links, or private documents.",
          "Open support for private assessment or certificate questions.",
          "Check certificate status inside the learner workspace, not through unknown links.",
          "Notifications here are simulated for the frontend prototype."
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-150 rounded-xl hover:border-emerald-150 transition-all duration-150">
            <div className="h-5 w-5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0 text-[10px] font-semibold">
              {idx + 1}
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );

  // SECTION 8 — RECENT NOTIFICATION ACTIVITY
  const RecentNotificationActivityPanel = () => {
    const logs = [
      { id: 1, text: "Notification opened", desc: "Certificate readiness updated", time: "Today", icon: Bell },
      { id: 2, text: "Support response viewed", desc: "Certificate readiness request", time: "Today", icon: HelpCircle },
      { id: 3, text: "Assessment reminder read", desc: "Work Readiness Assignment status", time: "Today", icon: FileText },
      { id: 4, text: "Resource recommendation saved", desc: "Text-first reading version", time: "Yesterday", icon: Bookmark }
    ];

    return (
      <Card id="recent-activity" className="p-5 md:p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-950 tracking-tight font-heading">Recent Notification Activity</h3>
          <p className="text-xs text-slate-500 font-medium">Recent updates from your learning activity and support requests.</p>
        </div>

        <div className="space-y-2">
          {logs.map((log) => {
            const Icon = log.icon;
            return (
              <div key={log.id} className="flex items-center justify-between p-3 bg-white border border-slate-150 rounded-xl hover:bg-emerald-50/40 hover:border-emerald-100 transition-colors duration-150">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">{log.text}</p>
                    <p className="text-[11px] text-slate-500 font-medium truncate">{log.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full shrink-0 ml-3">
                  {log.time}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  // RIGHT SIDE 1 — NOTIFICATION STATUS
  const NotificationStatusWidget = () => (
    <Card className="p-5 border border-slate-200 bg-white space-y-4 rounded-2xl text-left shadow-sm">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2 font-heading">
        Notification Status
      </h3>
      
      <div className="space-y-3 text-xs font-medium">
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Unread</span>
          <span className="font-semibold text-slate-900">{unreadCount}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Important</span>
          <span className="font-semibold text-slate-900">{importantCount}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500">Today</span>
          <span className="font-semibold text-slate-900">{todayCount}</span>
        </div>
        <div className="py-1 border-b border-slate-50">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Latest</p>
          <p className="font-semibold text-slate-900 mt-0.5">Certificate readiness updated</p>
        </div>
        <div className="py-1">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Latest response</p>
          <p className="font-semibold text-emerald-800 mt-0.5 font-sans">Halima Sani</p>
        </div>
      </div>

      <button
        onClick={handleMarkAllRead}
        disabled={unreadCount === 0}
        className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-2 shadow-xs active:scale-[0.98]"
      >
        Mark All as Read
      </button>
    </Card>
  );

  // RIGHT SIDE 2 — LATEST IMPORTANT UPDATES
  const LatestImportantUpdatesWidget = () => (
    <Card className="p-5 border border-slate-200 bg-white space-y-4 rounded-2xl text-left shadow-sm">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2 font-heading">
        Latest Important Updates
      </h3>

      <div className="space-y-3.5 text-xs font-semibold text-slate-700">
        <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
          <p className="text-xs font-semibold text-slate-900">Certificate readiness updated</p>
          <button
            onClick={() => handleAction("/learner/cpd-record")}
            className="w-full text-center text-xs font-semibold py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg cursor-pointer transition-colors shadow-2xs"
          >
            View Certificate Track
          </button>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
          <p className="text-xs font-semibold text-slate-900">Facilitator response received</p>
          <button
            onClick={() => handleAction("/learner/support")}
            className="w-full text-center text-xs font-semibold py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
          >
            Open Support Request
          </button>
        </div>
      </div>
    </Card>
  );

  // RIGHT SIDE 3 — LINKED LEARNING CONTEXT
  const LinkedLearningContextWidget = () => (
    <Card className="p-5 border border-slate-200 bg-white space-y-4 rounded-2xl text-left shadow-sm">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2 font-heading">
        Linked Learning Context
      </h3>

      <div className="space-y-3 text-xs font-medium">
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Course</p>
          <p className="font-semibold text-slate-900 leading-tight">Work Readiness Foundation</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Lesson</p>
          <p className="font-semibold text-slate-800 leading-tight">Preparing for Interviews</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Assessment</p>
          <p className="font-semibold text-slate-800 leading-tight">Work Readiness Assignment</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Certificate</p>
          <p className="font-semibold text-slate-800 leading-tight">Work Readiness Certificate</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">CPD</p>
          <p className="font-semibold text-emerald-800">22 of 35 credits</p>
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <button
          onClick={() => handleAction("/learner/assessments/work-readiness-assessment/attempt")}
          className="w-full text-center font-semibold text-xs py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg cursor-pointer transition-colors shadow-2xs"
        >
          Open Assessment
        </button>
        <button
          onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
          className="w-full text-center font-semibold text-xs py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
        >
          Continue Lesson
        </button>
      </div>
    </Card>
  );

  // RIGHT SIDE 4 — SUPPORT CENTER CARD (APPROVED EMERALD STYLE)
  const SupportCenterCardWidget = () => (
    <Card className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-100 shadow-sm space-y-4 text-left">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-950 font-heading">Support Center</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
            Need assistance with your learning pathway?
          </p>
        </div>
      </div>
      
      <button
        onClick={() => handleAction("/learner/support")}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
      >
        Open Support
      </button>
    </Card>
  );

  // RIGHT SIDE 5 — QUICK ACTIONS
  const QuickActionsWidget = () => {
    const actions = [
      { 
        id: "qa-1", 
        label: "View Certificate Track", 
        route: "/learner/cpd-record", 
        desc: "Check credits and certificate rules.",
        icon: Award
      },
      { 
        id: "qa-2", 
        label: "Open Support Request", 
        route: "/learner/support", 
        desc: "Review your certificate readiness request.",
        icon: HelpCircle
      },
      { 
        id: "qa-3", 
        label: "Open Assessment", 
        route: "/learner/assessments/work-readiness-assessment/attempt", 
        desc: "Continue your Work Readiness Assignment.",
        icon: FileText
      },
      { 
        id: "qa-4", 
        label: "Continue Lesson", 
        route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews", 
        desc: "Preparing for Interviews.",
        icon: BookOpen
      },
      { 
        id: "qa-5", 
        label: "Open Resources", 
        route: "/learner/resources", 
        desc: "Course reading list and text-first materials.",
        icon: Bookmark
      },
      { 
        id: "qa-6", 
        label: "Open Profile", 
        route: "/learner/profile", 
        desc: "Review learner profile and cohort details.",
        icon: User
      }
    ];

    return (
      <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-2xl text-left shadow-sm">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-950 font-heading">
            Quick Actions
          </h3>
          <p className="text-xs text-slate-500 font-medium">Open the most relevant learner areas from your notifications.</p>
        </div>

        <div className="space-y-2">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <div 
                key={act.id}
                onClick={() => handleAction(act.route)}
                className="p-3 rounded-xl border border-slate-150 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-900 truncate">
                      {act.label}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {act.desc}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-700 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  // -------------------------------------------------------------------------
  // DESKTOP LAYOUT (hidden lg:flex)
  // -------------------------------------------------------------------------
  const DesktopNotificationsCenter = () => (
    <div id="desktop-notifications" className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full">
      {/* Sidebar */}
      <LearnerSidebar />

      {/* Main Panel */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search notifications, updates, reminders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-705 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-800 transition-all font-semibold"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleAction("/learner/notifications")} 
              className="p-1.5 text-emerald-900 hover:text-emerald-800 relative transition-colors cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-700 animate-pulse" />
              )}
            </button>
            <button 
              onClick={() => handleAction("/learner/support")} 
              className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div 
              onClick={() => handleAction("/learner/profile")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-950 leading-tight">{learner.name}</p>
                <p className="text-[10px] text-slate-500 font-semibold">{learner.id}</p>
              </div>
              <div className="h-9 w-9 bg-emerald-900 text-white font-black rounded-full flex items-center justify-center border border-emerald-850 shadow-sm">
                AM
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
          <NotificationsHero />
          <NotificationSummaryCards />

          {/* Core Layout Grid */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
            
            {/* Left Area (Content modules) */}
            <div className="space-y-6">
              <NotificationFilters />
              <NotificationListInbox />
              <ActionNeededPanel />
              <NotificationPreferencesPanel />
              <SafeNotificationGuidancePanel />
              <RecentNotificationActivityPanel />
            </div>

            {/* Right Area (Status context/widgets) */}
            <div className="space-y-6 shrink-0">
              <NotificationStatusWidget />
              <LatestImportantUpdatesWidget />
              <LinkedLearningContextWidget />
              <SupportCenterCardWidget />
              <QuickActionsWidget />
            </div>

          </div>
        </div>
      </main>
    </div>
  );

  // -------------------------------------------------------------------------
  // TABLET LAYOUT (hidden md:block lg:hidden)
  // -------------------------------------------------------------------------
  const TabletNotificationsCenter = () => (
    <div id="tablet-notifications" className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      {/* Compact Learner Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            SUSTAIN <span className="text-emerald-800">LMS</span>
          </span>
          <Badge className="bg-slate-100 text-slate-750 text-[10px] px-1.5 py-0 border-0 font-bold">Tablet</Badge>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => handleAction("/learner/notifications")} className="p-1 text-slate-500 relative cursor-pointer">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700" />}
          </button>
          <button onClick={() => handleAction("/learner/support")} className="p-1 text-slate-500 cursor-pointer">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="h-7 w-px bg-slate-200" />
          <div onClick={() => handleAction("/learner/profile")} className="h-8 w-8 bg-emerald-900 text-white font-bold rounded-full flex items-center justify-center cursor-pointer">
            AM
          </div>
        </div>
      </header>

      {/* Stacked Content for Tablet */}
      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        <NotificationsHero />
        <NotificationSummaryCards />
        <NotificationFilters />
        <NotificationListInbox />
        <ActionNeededPanel />
        <NotificationPreferencesPanel />
        <SafeNotificationGuidancePanel />
        <RecentNotificationActivityPanel />
        
        {/* Supporting cards stacked cleanly below */}
        <NotificationStatusWidget />
        <LatestImportantUpdatesWidget />
        <LinkedLearningContextWidget />
        <SupportCenterCardWidget />
        <QuickActionsWidget />
      </div>

      {/* Fixed bottom navigation */}
      <LearnerMobileNav />
    </div>
  );

  // -------------------------------------------------------------------------
  // MOBILE LAYOUT (md:hidden)
  // -------------------------------------------------------------------------
  const MobileNotificationsCenter = () => (
    <div id="mobile-notifications" className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      {/* Compact Mobile Header */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-extrabold text-xs tracking-tight text-slate-900">
          SUSTAIN <span className="text-emerald-800">LMS</span>
        </span>
        <div className="flex items-center gap-3">
          <button onClick={() => handleAction("/learner/notifications")} className="p-1 text-slate-500 relative cursor-pointer">
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700" />}
          </button>
          <button onClick={() => handleAction("/learner/support")} className="p-1 text-slate-500 cursor-pointer">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
          <div onClick={() => handleAction("/learner/profile")} className="h-7 w-7 bg-emerald-900 text-white text-[11px] font-bold rounded-full flex items-center justify-center cursor-pointer">
            AM
          </div>
        </div>
      </header>

      {/* Stacked Content for Mobile */}
      <div className="px-4 py-4 space-y-5">
        <NotificationsHero />
        <NotificationSummaryCards />
        <NotificationFilters />
        <NotificationListInbox isMobile={true} />
        <ActionNeededPanel />
        <NotificationPreferencesPanel />
        <SafeNotificationGuidancePanel />
        <RecentNotificationActivityPanel />
        
        {/* Supporting cards stacked cleanly below */}
        <NotificationStatusWidget />
        <LatestImportantUpdatesWidget />
        <LinkedLearningContextWidget />
        <SupportCenterCardWidget />
        <QuickActionsWidget />
      </div>

      {/* Fixed bottom navigation */}
      <LearnerMobileNav />
    </div>
  );

  return (
    <div className="relative">
      {/* Toast Overlay */}
      {toast && (
        <div 
          id="global-notifications-toast"
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-900 text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm"
        >
          <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
            toast.type === "success" ? "bg-emerald-400" : toast.type === "warning" ? "bg-amber-400" : "bg-blue-400"
          }`} />
          <span className="flex-1 leading-normal text-left">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:text-slate-350 transition-colors p-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <DesktopNotificationsCenter />
      <TabletNotificationsCenter />
      <MobileNotificationsCenter />
    </div>
  );
}

export default LearnerNotificationsPage;
