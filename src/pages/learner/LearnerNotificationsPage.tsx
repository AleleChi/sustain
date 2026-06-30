import { useState } from "react";
import { Card } from "../../components/ui/Card";
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
  Calendar,
  Bookmark,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";

interface NotificationItem {
  id: string;
  type: "Assessment" | "Live Sessions" | "CPD" | "Support" | "Offline";
  status: "Unread" | "Read";
  priority: "Important" | "Normal" | "Low";
  time: string; // "Today", "Yesterday", "2 days ago", "3 days ago"
  title: string;
  message: string;
  actionText: string;
  route: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Assessment reminder",
    type: "Assessment",
    status: "Unread",
    priority: "Important",
    time: "Today",
    message: "Work Readiness Assignment is still saved as draft.",
    actionText: "Continue assessment",
    route: "/learner/assessments/work-readiness-assignment"
  },
  {
    id: "notif-2",
    title: "Live session reminder",
    type: "Live Sessions",
    status: "Unread",
    priority: "Important",
    time: "Today",
    message: "Interview Practice Clinic attendance is pending.",
    actionText: "View session",
    route: "/learner/live-sessions/interview-practice-clinic"
  },
  {
    id: "notif-3",
    title: "CPD update",
    type: "CPD",
    status: "Read",
    priority: "Normal",
    time: "Yesterday",
    message: "22 of 35 CPD credits are confirmed. 4 credits are pending review.",
    actionText: "View CPD record",
    route: "/learner/cpd-record"
  },
  {
    id: "notif-4",
    title: "Support response",
    type: "Support",
    status: "Read",
    priority: "Normal",
    time: "Yesterday",
    message: "Your support request has a new response from Halima Sani.",
    actionText: "Open Support",
    route: "/learner/support"
  },
  {
    id: "notif-5",
    title: "Offline pack update",
    type: "Offline",
    status: "Read",
    priority: "Normal",
    time: "3 days ago",
    message: "5 offline packs are available for low-connectivity access.",
    actionText: "Open Offline Centre",
    route: "/learner/offline"
  }
];

export function LearnerNotificationsPage() {
  const { navigateTo } = useRoute();

  // Local State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  // Interactions
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: "Read" })));
    showToast("All notifications marked as read.", "success");
  };

  const handleMarkSingleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: "Read" } : n));
    showToast("Notification marked as read.", "success");
  };

  const handleAction = (route: string) => {
    navigateTo(route as any);
  };

  // Filter logic
  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === "Unread") {
      if (n.status !== "Unread") return false;
    } else if (activeFilter !== "All") {
      const filterTypeMap: Record<string, string> = {
        "Assessments": "Assessment",
        "Live Sessions": "Live Sessions",
        "CPD": "CPD",
        "Support": "Support"
      };
      const targetType = filterTypeMap[activeFilter] || activeFilter;
      if (n.type !== targetType) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    }
    return true;
  });

  const unreadCount = notifications.filter(n => n.status === "Unread").length;

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "CPD": return Award;
      case "Support": return HelpCircle;
      case "Assessment": return FileText;
      case "Live Sessions": return Calendar;
      default: return Bookmark;
    }
  };

  const getNotificationIconColor = (type: NotificationItem["type"]) => {
    switch (type) {
      case "CPD": return "bg-emerald-50 text-emerald-800 border-emerald-100";
      case "Support": return "bg-amber-50 text-amber-800 border-amber-100";
      case "Assessment": return "bg-rose-50 text-rose-800 border-rose-100";
      case "Live Sessions": return "bg-indigo-50 text-indigo-800 border-indigo-100";
      default: return "bg-blue-50 text-blue-800 border-blue-100";
    }
  };

  // Grouping by time categories
  const todayNotifications = filteredNotifications.filter(n => n.time === "Today");
  const yesterdayNotifications = filteredNotifications.filter(n => n.time === "Yesterday");
  const earlierNotifications = filteredNotifications.filter(n => n.time !== "Today" && n.time !== "Yesterday");

  return (
    <div id="notifications-module-root" className="space-y-6 max-w-7xl mx-auto w-full text-slate-950 pb-12 relative font-sans">
      {/* Toast Overlay */}
      {toast && (
        <div 
          id="global-notifications-toast"
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-950 text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in duration-300 max-w-sm"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-450 shrink-0" />
          <span className="flex-1 leading-normal text-left">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:text-slate-350 p-1 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        
        {/* Left Column: Feed, filters, priority updates */}
        <div className="space-y-6">
          
          {/* Notifications Hero Card (Learning Update Centre) */}
          <Card id="notifications-hero-card" className="bg-white rounded-2xl border border-slate-200/80 shadow-3xs p-6 sm:p-8 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-28 h-28 bg-emerald-50 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              {/* Breadcrumbs */}
              <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                <span className="hover:text-emerald-900 cursor-pointer" onClick={() => handleAction("/learner")}>Learner Workspace</span>
                <ChevronRight className="h-3 w-3 text-slate-300" />
                <span className="text-slate-500">Notifications</span>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {unreadCount} unread
                </span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Update Centre
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight font-heading">
                  Learning Update Centre
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Stay up to date on your assignments, facilitator feedback, clinic schedules, and certificate progress.
                </p>
              </div>
            </div>
          </Card>

          {/* Filter Tabs & Search Hub */}
          <div className="space-y-4">
            {/* Horizontal scrolling filters */}
            <div className="w-full overflow-x-auto no-scrollbar py-1 flex items-center gap-2">
              {["All", "Unread", "Assessments", "Live Sessions", "CPD", "Support"].map((cat) => {
                const isSelected = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer border ${
                      isSelected 
                        ? "bg-emerald-900 border-emerald-900 text-white shadow-3xs" 
                        : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Premium Search Box */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search updates by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-700 transition-all font-medium"
              />
            </div>
          </div>

          {/* Priority Update Box */}
          <Card id="priority-update-card" className="bg-amber-50/20 border border-amber-200/50 rounded-2xl p-5 text-left relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-amber-850 uppercase tracking-wider">Priority Update</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">New response</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">Facilitator feedback available</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Halima Sani reviewed your Work Readiness Assignment draft. Check feedback before completing submission.
                </p>
                <div className="pt-1">
                  <button 
                    onClick={() => handleAction("/learner/support")}
                    className="inline-flex items-center gap-1 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-3xs min-h-[40px]"
                  >
                    <span>Read Feedback</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notification List Section */}
          <div className="space-y-6 text-left">
            {filteredNotifications.length === 0 ? (
              <Card className="p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-3xs">
                <p className="text-xs font-semibold text-slate-500">No matching updates found.</p>
                <button 
                  onClick={() => { setActiveFilter("All"); setSearchQuery(""); }} 
                  className="text-xs font-bold text-emerald-800 hover:underline mt-2 cursor-pointer"
                >
                  Reset filters and view all
                </button>
              </Card>
            ) : (
              <>
                {/* TODAY GROUP */}
                {todayNotifications.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 flex items-center gap-2">
                      <span>Today</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[9px] lowercase font-semibold text-slate-400">{todayNotifications.length} update{todayNotifications.length === 1 ? "" : "s"}</span>
                    </h3>
                    <div className="space-y-3">
                      {todayNotifications.map((n) => (
                        <NotificationCard 
                          key={n.id} 
                          item={n} 
                          onMarkRead={handleMarkSingleRead} 
                          onAction={handleAction} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* YESTERDAY GROUP */}
                {yesterdayNotifications.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 flex items-center gap-2">
                      <span>Yesterday</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[9px] lowercase font-semibold text-slate-400">{yesterdayNotifications.length} update{yesterdayNotifications.length === 1 ? "" : "s"}</span>
                    </h3>
                    <div className="space-y-3">
                      {yesterdayNotifications.map((n) => (
                        <NotificationCard 
                          key={n.id} 
                          item={n} 
                          onMarkRead={handleMarkSingleRead} 
                          onAction={handleAction} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* EARLIER GROUP */}
                {earlierNotifications.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 flex items-center gap-2">
                      <span>Earlier</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[9px] lowercase font-semibold text-slate-400">{earlierNotifications.length} update{earlierNotifications.length === 1 ? "" : "s"}</span>
                    </h3>
                    <div className="space-y-3">
                      {earlierNotifications.map((n) => (
                        <NotificationCard 
                          key={n.id} 
                          item={n} 
                          onMarkRead={handleMarkSingleRead} 
                          onAction={handleAction} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

        {/* Right Column: Identity, Actions, Linked Context, Preferences */}
        <div className="space-y-6">
          
          {/* Identity/Soft Context Card - Redesigned, soft background, no black borders */}
          <Card id="learning-context-card" className="bg-slate-50/60 border border-slate-150 rounded-2xl p-5 text-left">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-3">Learner Profile</span>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-900 text-white font-bold rounded-full flex items-center justify-center shadow-3xs shrink-0">
                  AM
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">Aisha Mohammed</h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">SUST-LRN-0442</p>
                </div>
              </div>
              
              <div className="border-t border-slate-200/65 pt-3 space-y-1">
                <p className="text-xs font-bold text-slate-855">Youth Employability Pathway</p>
                <p className="text-[11px] text-slate-500 font-medium">Kano Youth Cohort 02</p>
              </div>
            </div>
          </Card>

          {/* Core Action Buttons Card */}
          <Card id="actions-card" className="bg-white border border-slate-200/80 shadow-3xs rounded-2xl p-4 space-y-3">
            <button
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="w-full min-h-[44px] bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs px-4 rounded-xl transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Check className="h-4 w-4" />
              <span>Mark all as read</span>
            </button>
            <button
              onClick={() => handleAction("/learner/support")}
              className="w-full min-h-[44px] bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-3xs"
            >
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
              <span>Open Facilitator Support</span>
            </button>
          </Card>

          {/* Linked Learning Pathway Context Widget */}
          <Card id="linked-learning-context" className="bg-white border border-slate-200/80 shadow-3xs rounded-2xl p-5 text-left space-y-4">
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Pathway Checklist</h3>
              <p className="text-[11px] text-slate-500 font-medium">Item statuses connected to your pathway.</p>
            </div>
            
            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-3">
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Work Readiness Foundation</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Active course</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-850 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 shrink-0">In Progress</span>
              </div>

              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-3">
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Work Readiness Assignment</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Portfolio task</p>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-55 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">Draft started</span>
              </div>

              <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between gap-3">
                <div className="text-left min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">Interview Practice Clinic</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Live training session</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 shrink-0">Attendance pending</span>
              </div>
            </div>
          </Card>

          {/* Preferences Card */}
          <Card id="notification-preferences-card" className="bg-white border border-slate-200/80 shadow-3xs rounded-2xl p-5 text-left space-y-3.5">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 font-heading">Update Settings</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Customize where and how you are notified of assessment grades and class reminders.
              </p>
            </div>
            <button
              onClick={() => handleAction("/learner/profile")}
              className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer min-h-[38px]"
            >
              <Settings className="h-4 w-4 text-slate-500" />
              <span>Configure preferences</span>
            </button>
          </Card>

          {/* Support / Help Card */}
          <Card id="support-help-card" className="bg-emerald-50/20 border border-emerald-100/50 rounded-2xl p-5 text-left relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center shrink-0 shadow-3xs border border-emerald-800">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Stuck with a lesson?</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Connect with Halima Sani to ask questions about your course materials or assignments.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => handleAction("/learner/support")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-3xs min-h-[40px]"
                  >
                    Ask for Help
                  </button>
                </div>
              </div>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}

/* SUBCOMPONENT: NOTIFICATION CARD - RE-DESIGNED AS ACTIVITY ROW ROW STYLED */
function NotificationCard({ 
  item, 
  onMarkRead, 
  onAction 
}: { 
  item: NotificationItem; 
  onMarkRead: (id: string) => void; 
  onAction: (route: string) => void;
}) {
  const isUnread = item.status === "Unread";
  
  // Custom helpers
  const getIcon = () => {
    switch (item.type) {
      case "CPD": return Award;
      case "Support": return HelpCircle;
      case "Assessment": return FileText;
      case "Live Sessions": return Calendar;
      default: return Bookmark;
    }
  };

  const getColors = () => {
    switch (item.type) {
      case "CPD": return "bg-emerald-50 text-emerald-800 border-emerald-100";
      case "Support": return "bg-amber-50 text-amber-800 border-amber-100";
      case "Assessment": return "bg-rose-50 text-rose-800 border-rose-100";
      case "Live Sessions": return "bg-indigo-50 text-indigo-850 border-indigo-100";
      default: return "bg-slate-50 text-slate-700 border-slate-150";
    }
  };

  const Icon = getIcon();

  return (
    <div 
      className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3.5 relative overflow-hidden ${
        isUnread 
          ? "bg-emerald-50/15 border-emerald-200 border-l-4 border-l-emerald-600 shadow-3xs" 
          : "bg-white border-slate-200/80 hover:border-emerald-150 hover:shadow-3xs"
      }`}
    >
      {/* Header Row: Category Badge, Title, Time, Unread pulse */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border shrink-0 ${getColors()}`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.type}</span>
              {isUnread && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-100 text-[8px] font-bold">
                  <span className="h-1 w-1 bg-emerald-500 rounded-full animate-ping" />
                  New
                </span>
              )}
            </div>
            <h4 className="text-sm font-bold text-slate-900 leading-snug font-heading">{item.title}</h4>
          </div>
        </div>

        <span className="text-[10px] text-slate-400 font-bold">
          {item.time}
        </span>
      </div>

      {/* Message Body */}
      <p className="text-xs text-slate-600 leading-relaxed font-medium pl-1">
        {item.message}
      </p>

      {/* Action Row */}
      <div className="pt-3 border-t border-slate-100/60 flex flex-wrap gap-2.5 items-center justify-end">
        {isUnread && (
          <button
            onClick={() => onMarkRead(item.id)}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold text-[10px] px-3 py-2 rounded-xl transition-all cursor-pointer min-h-[36px]"
          >
            Mark as read
          </button>
        )}
        <button
          onClick={() => onAction(item.route)}
          className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[10px] px-4.5 py-2 rounded-xl transition-all cursor-pointer shadow-3xs min-h-[36px] flex items-center gap-1"
        >
          <span>{item.actionText}</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default LearnerNotificationsPage;
