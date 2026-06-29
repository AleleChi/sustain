import { useState, useEffect, useRef } from "react";
import { useRoute, RoutePath } from "../../../context/RouteContext";
import { FacilitatorMobileActionMenu } from "./FacilitatorMobileActionMenu";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  User, 
  AlertCircle,
  Download,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Info,
  Calendar,
  ChevronDown,
  Play,
  Save,
  ShieldAlert,
  SlidersHorizontal,
  Mail,
  FileText,
  BookOpen,
  Award,
  MessageSquare,
  Plus,
  Phone,
  MapPin,
  Briefcase,
  Send,
  Trash2,
  Edit2,
  Share2,
  X,
  Lock,
  MessageCircle,
  TrendingUp,
  FileSpreadsheet,
  BookCheck,
  WifiOff,
  Bell
} from "lucide-react";

interface LearnerDetailViewProps {
  learnerId: string;
  onBack: () => void;
}

export function LearnerDetailView({ learnerId, onBack }: LearnerDetailViewProps) {
  const { navigateTo } = useRoute();
  
  // Responsive layout tracking
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 1024; // 1024 matches the layout breakpoint for desktop

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // State: Tab selection in Activity / Notes card
  const [activeTab, setActiveTab] = useState<"timeline" | "notes">("timeline");

  // State: Schedule Sync Now Modal / Drawer
  const [isScheduleSyncOpen, setIsScheduleSyncOpen] = useState(false);
  const [syncDate, setSyncDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [syncTime, setSyncTime] = useState("10:00");
  const [syncType, setSyncType] = useState<"voice" | "video" | "lowBandwidth">("voice");
  const [syncTopic, setSyncTopic] = useState("Agri-Finance Remedial Session");
  const [syncNotes, setSyncNotes] = useState("");

  // Send Reminder states
  const [isSendReminderOpen, setIsSendReminderOpen] = useState(false);
  const [isReminderSent, setIsReminderSent] = useState(false);
  const [reminderSuccessState, setReminderSuccessState] = useState(false);

  // Send Reminder form states
  const [reminderType, setReminderType] = useState("Assessment reminder");
  const [reminderChannelInApp, setReminderChannelInApp] = useState(true);
  const [reminderChannelSMS, setReminderChannelSMS] = useState(true);
  const [reminderChannelEmail, setReminderChannelEmail] = useState(false);
  const [reminderChannelWhatsApp, setReminderChannelWhatsApp] = useState(false);
  
  const [messageTemplate, setMessageTemplate] = useState("Friendly assessment reminder");
  const [reminderMessage, setReminderMessage] = useState(
    "Hi Aisha, this is a reminder from your SUSTAIN facilitator. Please complete your pending assessment when you can. I have attached a low-bandwidth guide to help you continue even if your internet connection is limited. Reply if you need support."
  );
  
  const [attachGuide, setAttachGuide] = useState(true);
  const [attachLowBandwidth, setAttachLowBandwidth] = useState(true);
  const [attachSummary, setAttachSummary] = useState(false);
  const [attachCPD, setAttachCPD] = useState(false);
  
  const [createFollowUpTask, setCreateFollowUpTask] = useState(false);

  // Synchronize message template with template state
  useEffect(() => {
    if (messageTemplate === "Friendly assessment reminder") {
      setReminderMessage("Hi Aisha, this is a reminder from your SUSTAIN facilitator. Please complete your pending assessment when you can. I have attached a low-bandwidth guide to help you continue even if your internet connection is limited. Reply if you need support.");
    } else if (messageTemplate === "Low-bandwidth support note") {
      setReminderMessage("Hi Aisha, I noticed you might be facing connectivity issues. Here is a compressed offline-friendly guide to help you continue your learning offline. Let me know if this helps!");
    } else if (messageTemplate === "Missed activity check-in") {
      setReminderMessage("Hi Aisha, we missed you at our latest learning session. Please check out the attached summaries and let me know if you need any assistance getting back on track.");
    } else if (messageTemplate === "Certification reminder") {
      setReminderMessage("Hi Aisha, congratulations on almost completing your SUSTAIN training! Please finish any pending assessments to finalize your certificate eligibility.");
    }
  }, [messageTemplate]);

  // Mobile accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    personalInfo: false,
    programme: false,
    contactAccess: false,
    supportHistory: false,
    lowBandwidth: false,
    communityQuestions: false,
    activityTimeline: false,
    facilitatorNotes: true, // Notes open by default
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const mobileMenuItems = [
    { key: "reminder", label: "Send reminder", icon: Bell },
    { key: "message", label: "Message learner", icon: Mail },
    { key: "followup", label: "Record follow-up", icon: FileText },
    { key: "note", label: "Add facilitator note", icon: BookOpen },
    { key: "export", label: "Export performance report", icon: Download },
    { key: "share", label: "Share profile with admin", icon: Share2 },
    { key: "tickets", label: "View support tickets", icon: AlertCircle },
    { key: "questions", label: "Open community questions", icon: HelpCircle }
  ];

  const handleMobileActionSelect = (key: string) => {
    switch (key) {
      case "reminder":
        handleAction("Reminder action simulated in this frontend prototype.");
        break;
      case "message":
        const quickMsgElem = document.getElementById("mobile-quick-message-section");
        if (quickMsgElem) {
          quickMsgElem.scrollIntoView({ behavior: "smooth" });
          const textarea = document.getElementById("mobile-quick-message-area");
          textarea?.focus();
        } else {
          handleAction("Message action simulated in this frontend prototype.");
        }
        break;
      case "followup":
        const followupElem = document.getElementById("mobile-follow-up-section");
        if (followupElem) {
          followupElem.scrollIntoView({ behavior: "smooth" });
        } else {
          handleAction("Follow-up form opened in this frontend prototype.");
        }
        break;
      case "note":
        setOpenAccordions(prev => ({ ...prev, facilitatorNotes: true }));
        setTimeout(() => {
          const notesElem = document.getElementById("mobile-notes-section");
          if (notesElem) {
            notesElem.scrollIntoView({ behavior: "smooth" });
            const textarea = document.getElementById("mobile-notes-area");
            textarea?.focus();
          }
        }, 100);
        break;
      case "export":
        handleAction("Report export simulated in this frontend prototype.");
        break;
      case "share":
        handleAction("Profile sharing simulated in this frontend prototype.");
        break;
      case "tickets":
        setOpenAccordions(prev => ({ ...prev, supportHistory: true }));
        setTimeout(() => {
          const ticketsElem = document.getElementById("mobile-tickets-section");
          if (ticketsElem) {
            ticketsElem.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        break;
      case "questions":
        setOpenAccordions(prev => ({ ...prev, communityQuestions: true }));
        setTimeout(() => {
          const questionsElem = document.getElementById("mobile-questions-section");
          if (questionsElem) {
            questionsElem.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        break;
      default:
        break;
    }
  };

  // State: Dynamic Activity Timeline
  const [timelineItems, setTimelineItems] = useState([
    { date: "Oct 24", text: "Aisha logged in via Android Lite App.", type: "neutral" },
    { date: "Oct 22", text: "Completed \"Verbal Communication\" quiz with 92%.", type: "neutral" },
    { date: "Oct 15", text: "Flagged for 7+ days inactivity.", type: "alert" },
    { date: "Oct 12", text: "Support Ticket SUP-2026-00491 opened (Bandwidth issues).", type: "neutral" },
  ]);

  // State: Facilitator Notes
  const [notes, setNotes] = useState([
    {
      author: "Halima Sani",
      role: "Lead Facilitator",
      date: "Oct 22, 2026",
      text: "Aisha is struggling with the financial projections part of the business plan but excels in the operational logistics. Need to provide extra resources on cash flow mapping."
    },
    {
      author: "Halima Sani",
      role: "Lead Facilitator",
      date: "Oct 18, 2026",
      text: "Completed a short check-in call with Aisha. She is very articulate in her written responses but had some connectivity problems initially."
    }
  ]);
  const [newNoteText, setNewNoteText] = useState("");

  const handleSaveNote = () => {
    if (!newNoteText.trim()) {
      showToast("Please enter some note text first.");
      return;
    }
    const added = {
      author: "Halima Sani",
      role: "Lead Facilitator",
      date: "Oct 26, 2026",
      text: newNoteText.trim()
    };
    setNotes([added, ...notes]);
    setNewNoteText("");
    showToast("Private note added to learner record.");
  };

  // State: Detailed Follow-Up Form
  const [followUpType, setFollowUpType] = useState("Academic Support");
  const [followUpMethod, setFollowUpMethod] = useState("Phone Call");
  const [followUpReason, setFollowUpReason] = useState("");
  const [followUpSummary, setFollowUpSummary] = useState("");
  const [followUpNextAction, setFollowUpNextAction] = useState("Schedule check-in");
  const [followUpDate, setFollowUpDate] = useState("");

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Follow-up record saved locally in this frontend prototype.");
    // Clear form
    setFollowUpReason("");
    setFollowUpSummary("");
    setFollowUpDate("");
  };

  // State: Quick Message
  const [quickMessageText, setQuickMessageText] = useState(
    "Hi Aisha, I noticed you're almost finished with the Work Readiness module! Just a quick reminder to submit the scenario assessment so we can unlock your next module. Let me know if you need the low-bandwidth guide for it!"
  );
  const [channelInApp, setChannelInApp] = useState(true);
  const [channelEmail, setChannelEmail] = useState(false);

  const handleSendMessage = () => {
    if (!quickMessageText.trim()) {
      showToast("Please write a message first.");
      return;
    }
    showToast("Message action simulated in this frontend prototype.");
    setQuickMessageText("");
  };

  // Static items actions toasts helper
  const handleAction = (message: string) => {
    showToast(message);
  };

  // Helper to scroll to Follow-Up Record form
  const scrollToFollowUpForm = () => {
    const formElement = document.getElementById("detailed-follow-up-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
      showToast("Follow-up form opened in this frontend prototype.");
    }
  };

  // Submit handler for Schedule Sync
  const handleScheduleSyncConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syncTopic.trim()) {
      showToast("Please enter a topic or focus area.");
      return;
    }

    // Format display string
    const formatLabel = syncType === "voice" ? "Voice Call" : syncType === "video" ? "Video Meeting" : "SMS/Chat Sync";
    const displayMsg = `Sync session scheduled: "${syncTopic}" on ${syncDate} at ${syncTime} via ${formatLabel}.`;
    
    // Add activity timeline item
    const todayStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const newActivity = {
      date: todayStr,
      text: `Scheduled Remedial ${formatLabel}: "${syncTopic}" for ${syncDate} at ${syncTime}.`,
      type: "success"
    };
    
    // Add note as well so facilitator sees it in both tabs
    const newNote = {
      author: "Halima Sani",
      role: "Lead Facilitator",
      date: `${todayStr}, 2026`,
      text: `Scheduled a 15-min remedial sync to discuss "${syncTopic}" via ${formatLabel}. Note: ${syncNotes.trim() || "Awaiting check-in."}`
    };

    setTimelineItems([newActivity, ...timelineItems]);
    setNotes([newNote, ...notes]);
    setIsScheduleSyncOpen(false);
    showToast(displayMsg);
  };

  const renderScheduleSyncOverlay = () => {
    if (!isScheduleSyncOpen) return null;

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 overflow-hidden flex items-end lg:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsScheduleSyncOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Card / Bottom Sheet */}
          <motion.div
            initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full lg:max-w-md bg-white rounded-t-3xl lg:rounded-2xl border border-slate-200 shadow-2xl p-6 text-left max-h-[90vh] overflow-y-auto z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                  Remedial Sync Planning
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Schedule Sync Session
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleSyncOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Panel */}
            <form onSubmit={handleScheduleSyncConfirm} className="space-y-4 pt-4">
              {/* Context Panel */}
              <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3 text-xs text-emerald-950 font-semibold leading-relaxed flex gap-2.5">
                <span className="text-base">💡</span>
                <p>
                  Setting up a quick remedial session can help Aisha Mohammed catch up on the <strong className="text-emerald-950 font-black">Agri-Finance modules</strong>, where she is currently 15% below her cohort average.
                </p>
              </div>

              {/* Topic */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Topic / Focus Area *
                </label>
                <input
                  type="text"
                  required
                  value={syncTopic}
                  onChange={(e) => setSyncTopic(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-50/50 border border-slate-200 focus:border-emerald-700 rounded-xl px-3.5 py-2 py-2.5 text-xs font-semibold text-slate-800 outline-hidden transition-all focus:ring-1 focus:ring-emerald-700/25"
                  placeholder="e.g., Agri-Finance Remedial Session"
                />
              </div>

              {/* Sync Format */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Format / Channel
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* Option 1: Voice Call */}
                  <button
                    type="button"
                    onClick={() => setSyncType("voice")}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      syncType === "voice"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-extrabold"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 font-bold"
                    }`}
                  >
                    <span className="text-lg">📞</span>
                    <span className="text-[10px]">Voice Call</span>
                  </button>

                  {/* Option 2: Video Call */}
                  <button
                    type="button"
                    onClick={() => setSyncType("video")}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      syncType === "video"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-extrabold"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 font-bold"
                    }`}
                  >
                    <span className="text-lg">🎥</span>
                    <span className="text-[10px]">Video Meet</span>
                  </button>

                  {/* Option 3: Low Bandwidth text */}
                  <button
                    type="button"
                    onClick={() => setSyncType("lowBandwidth")}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      syncType === "lowBandwidth"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-extrabold"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600 font-bold"
                    }`}
                  >
                    <span className="text-lg">💬</span>
                    <span className="text-[10px]">SMS/Chat</span>
                  </button>
                </div>
                <p className="text-[9px] text-slate-400 font-bold pl-1">
                  {syncType === "voice" && "Recommended for low-bandwidth environments. Standard cell voice rates apply."}
                  {syncType === "video" && "Requires high-bandwidth stable connection. Data charges will be covered by student allowance."}
                  {syncType === "lowBandwidth" && "Asynchronous chat-based help via WhatsApp/SMS Lite."}
                </p>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={syncDate}
                    onChange={(e) => setSyncDate(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-50/50 border border-slate-200 focus:border-emerald-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-hidden transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={syncTime}
                    onChange={(e) => setSyncTime(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-50/50 border border-slate-200 focus:border-emerald-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Private Session Notes / Agenda (Optional)
                </label>
                <textarea
                  rows={2}
                  value={syncNotes}
                  onChange={(e) => setSyncNotes(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-50/50 border border-slate-200 focus:border-emerald-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 outline-hidden transition-all resize-none"
                  placeholder="Notes about specific questions to ask or sub-topics to cover..."
                />
              </div>

              {/* Actions Footer */}
              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsScheduleSyncOpen(false)}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-extrabold py-3 rounded-xl transition-all text-center cursor-pointer active:scale-98 shadow-3xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-extrabold py-3 rounded-xl transition-all text-center cursor-pointer active:scale-98 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Check className="h-4 w-4 text-emerald-300" /> Confirm & Schedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  };

  // ====================================================
  // MOBILE RENDER (Strict match with Mobile screenshot)
  // ====================================================
  if (isMobile) {
    return (
      <div className="bg-slate-50/50 text-left font-sans min-h-screen pb-24 relative">
        
        {/* Toast Alert Banner */}
        {toastMessage && (
          <div className="fixed top-4 left-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2.5 border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span className="truncate flex-1">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white shrink-0 ml-auto">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 1. Mobile Top bar with back arrow and title */}
        <div className="bg-white border-b border-slate-100 px-4 py-3.5 sticky top-0 z-30 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-700 font-extrabold text-sm active:scale-95 focus-ring rounded-lg px-2 py-1">
            <ArrowLeft className="h-5 w-5 text-emerald-850" />
            <span>Learner Detail</span>
          </button>
          <div className="flex items-center gap-3.5">
            <button onClick={() => showToast("You have no new notifications.")} className="text-slate-600 relative p-1 active:scale-95">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full" />
            </button>
            <div className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-850 flex items-center justify-center font-extrabold text-[11px] text-white">
              AM
            </div>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="p-4 space-y-4 pb-20">
          
          {/* 2. Learner Hero card with photo of Aisha */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-3xs space-y-4">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                alt="Aisha Mohammed" 
                referrerPolicy="no-referrer"
                className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-md"
              />
              <span className="absolute bottom-0 right-1 h-5 w-5 bg-amber-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white">⚠️</span>
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Aisha Mohammed</h2>
              <p className="text-[11px] text-slate-500 font-bold">Kano Youth Employability 02 • Pathway: Youth Employability</p>
              <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mt-1">
                Status: Support Needed
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 mt-1">
              <span>📍 Kano / Tarauni</span>
              <span>•</span>
              <span>ID: LRN-2026-88291</span>
            </div>
          </div>

          {/* 2b. Learner Status Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3.5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Learner Status</span>
              <span className="text-xs font-bold text-rose-700">9 Days Inactive</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-650">
                <span>Pathway Progress</span>
                <span className="text-emerald-850">42%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-emerald-800 h-full rounded-full" style={{ width: "42%" }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Risk Level</span>
                <span className="text-xs font-extrabold text-amber-700 block mt-0.5">Medium</span>
              </div>
              <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Access Support</span>
                <span className="text-xs font-extrabold text-rose-700 block mt-0.5">Critical</span>
              </div>
            </div>

            <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
              <p className="text-[10px] text-rose-800 font-bold flex items-center gap-1.5 leading-relaxed">
                <span>⚠️</span> Issue: Assessment due for over 48 hours.
              </p>
            </div>
          </div>

          {/* 3. 2x2 Risk cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-3xs">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Activity Risk</span>
              <span className="text-xs font-extrabold text-amber-800">Medium</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-3xs">
              <SlidersHorizontal className="h-5 w-5 text-amber-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Assess. Risk</span>
              <span className="text-xs font-extrabold text-amber-800">Medium</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-3xs">
              <Award className="h-5 w-5 text-amber-600" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Cert. Risk</span>
              <span className="text-xs font-extrabold text-amber-800">Medium</span>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 shadow-3xs">
              <HelpCircle className="h-5 w-5 text-rose-600" />
              <span className="text-[9px] font-black text-rose-800 uppercase tracking-wider">Access Support</span>
              <span className="text-xs font-extrabold text-rose-700">Critical</span>
            </div>
          </div>

          {/* 4. Metric cards (Grid 3x2) */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Learning Progress", val: "42%", icon: BookOpen, color: "text-slate-800" },
              { label: "Last Active", val: "9 Days", icon: Clock, color: "text-rose-700", isUrgent: true },
              { label: "Current Course", val: "Work Readiness", icon: Briefcase, color: "text-slate-850" },
              { label: "Assessment Status", val: "Due", icon: Calendar, color: "text-amber-700" },
              { label: "CPD Credits", val: "22 / 35", icon: Award, color: "text-emerald-800" },
              { label: "Certificate Status", val: "Not Eligible", icon: Lock, color: "text-slate-400" }
            ].map((metric, idx) => (
              <div 
                key={idx} 
                className={`bg-white border ${metric.isUrgent ? "border-t-rose-500 border-t-2 border-l-slate-200 border-r-slate-200 border-b-slate-200" : "border-slate-200"} rounded-2xl p-3.5 flex flex-col justify-between h-22 shadow-3xs`}
              >
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {metric.label}
                </span>
                <div className="flex items-center justify-between gap-1 mt-1">
                  <span className={`text-[13px] font-black truncate ${metric.color}`}>
                    {metric.val}
                  </span>
                  <metric.icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* 5. Collapsible Accordions (Personal, Programme, Contact) */}
          <div className="space-y-2.5">
            
            {/* Accordion 1: Personal Info */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("personalInfo")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <User className="h-4.5 w-4.5 text-slate-450" /> Personal Info
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.personalInfo ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.personalInfo && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 space-y-2.5 bg-slate-50/20">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Learner ID:</span>
                    <span className="font-mono text-slate-800">LRN-2026-88291</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Gender:</span>
                    <span className="text-slate-800">Female</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Age Bracket:</span>
                    <span className="text-slate-800">18-35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Region:</span>
                    <span className="text-slate-800">Kano / Tarauni</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Programme */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("programme")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-slate-450" /> Programme
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.programme ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.programme && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 space-y-2.5 bg-slate-50/20">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Track:</span>
                    <span className="text-slate-800">SUSTAIN CPD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Pathway:</span>
                    <span className="text-slate-800">Youth Employability</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Hub:</span>
                    <span className="text-slate-800">Kano Youth Skills Hub</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Facilitator:</span>
                    <span className="text-slate-800">Halima Sani</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Contact & Access */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("contactAccess")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Phone className="h-4.5 w-4.5 text-slate-450" /> Contact &amp; Access
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.contactAccess ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.contactAccess && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 space-y-2.5 bg-slate-50/20">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Email:</span>
                    <span className="text-slate-800 truncate max-w-[170px]">aisha@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Phone:</span>
                    <span className="text-slate-800">+234 800 000 0000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Notif. Pref:</span>
                    <span className="text-slate-800">In-app / Email</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Support:</span>
                    <span className="text-slate-800">Text / Downloads</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 6. Learning Progress details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Learning Progress Details
            </span>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-650">
                  <span>Content Mastery</span>
                  <span className="text-emerald-850">82%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-emerald-800 h-full rounded-full" style={{ width: "82%" }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-650">
                  <span>Practical Exercises</span>
                  <span className="text-emerald-850">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-emerald-800 h-full rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* 7. Pathway Learning Roadmap */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Pathway Learning Roadmap
            </span>
            <div className="relative pl-5 space-y-4 text-xs font-bold">
              <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-150" />
              
              <div className="flex items-start gap-3.5 relative">
                <div className="absolute -left-4.5 mt-0.5 h-3.5 w-3.5 rounded-full bg-emerald-850 flex items-center justify-center text-[7px] text-white">✓</div>
                <div>
                  <h5 className="text-slate-800 font-extrabold leading-none">Digital Readiness</h5>
                  <span className="text-[9px] text-slate-400 uppercase mt-1 block">Completed</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 relative">
                <div className="absolute -left-4.5 mt-0.5 h-3.5 w-3.5 rounded-full bg-emerald-850 flex items-center justify-center text-[7px] text-white">✓</div>
                <div>
                  <h5 className="text-slate-800 font-extrabold leading-none">Communication</h5>
                  <span className="text-[9px] text-slate-400 uppercase mt-1 block">Completed</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 relative">
                <div className="absolute -left-4.5 mt-0.5 h-3.5 w-3.5 rounded-full bg-emerald-50 border border-emerald-800 flex items-center justify-center text-[7px] text-emerald-800">⚡</div>
                <div>
                  <h5 className="text-[#047857] font-extrabold leading-none">Work Readiness</h5>
                  <span className="text-[9px] text-[#047857] uppercase mt-1 block">In Progress (42%)</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 relative">
                <div className="absolute -left-4.5 mt-0.5 h-3.5 w-3.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[7px] text-slate-400">🔒</div>
                <div>
                  <h5 className="text-slate-450 font-extrabold leading-none">Interview Prep</h5>
                  <span className="text-[9px] text-slate-400 uppercase mt-1 block">Locked</span>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Course Progress Detail (Card List) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Course Progress Detail
            </span>
            <div className="space-y-3 pt-1">
              {[
                { name: "Digital Readiness", status: "COMPLETED", progress: "100%", badge: "bg-emerald-50 text-emerald-800 border-emerald-150" },
                { name: "Communication Skills", status: "COMPLETED", progress: "100%", badge: "bg-emerald-50 text-emerald-800 border-emerald-150" },
                { name: "Work Readiness", status: "IN PROGRESS", progress: "42%", badge: "bg-amber-100 text-amber-800 border-amber-200", highlight: true },
                { name: "Interview Prep", status: "LOCKED", progress: "0%", badge: "bg-slate-50 text-slate-400 border-slate-150" }
              ].map((crs, cIdx) => (
                <div key={cIdx} className={`p-3 rounded-xl border flex justify-between items-center ${crs.highlight ? "bg-amber-55/5 border-amber-100" : "bg-slate-50/50 border-slate-100"}`}>
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-black text-slate-800">{crs.name}</h5>
                    <span className={`inline-block text-[8px] font-extrabold px-2 py-0.5 rounded-full border ${crs.badge}`}>{crs.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-700 block">{crs.progress}</span>
                    <button onClick={() => handleAction("Course action simulated.")} className="text-[10px] text-emerald-800 hover:underline font-extrabold cursor-pointer mt-0.5 block">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Assessment Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              Assessment Status
            </span>
            <div className="space-y-2.5 pt-1 text-xs font-bold text-slate-700">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div>
                  <h5 className="text-slate-900 font-extrabold">Digital Literacy Quiz</h5>
                  <p className="text-[9px] text-slate-400 font-medium mt-0.5">Score: 88%</p>
                </div>
                <span className="bg-[#e2f1ec] text-[#0f5132] text-[9px] font-black px-2 py-0.5 rounded-full">PASSED</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white border border-rose-100 rounded-xl relative pl-4">
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-rose-600 rounded-r" />
                <div>
                  <h5 className="text-slate-900 font-extrabold">Work Ethic Scenario</h5>
                  <p className="text-[9px] text-rose-600 font-medium mt-0.5">Due: 9 days ago</p>
                </div>
                <span className="bg-[#f8d7da] text-[#842029] text-[9px] font-black px-2 py-0.5 rounded-full">DUE</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50/50 border border-slate-100/55 rounded-xl">
                <div className="text-slate-400">
                  <h5 className="font-extrabold">Public Speaking Draft</h5>
                  <p className="text-[9px] font-medium mt-0.5">Unlocks after Lesson 6</p>
                </div>
                <span className="bg-slate-50 text-slate-400 text-[9px] font-black px-2 py-0.5 rounded-full">LOCKED</span>
              </div>
            </div>
          </div>

          {/* 10. CPD & Readiness */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-100">
              CPD &amp; Readiness
            </span>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>CPD Credits</span>
                  <span className="text-slate-800 font-black">22 / 35</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#0284c7] h-full rounded-full" style={{ width: "63%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Requirements Met</span>
                  <span className="text-slate-800 font-black">3 / 7 Met</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#047857] h-full rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#faf9f5] border border-slate-200 rounded-xl space-y-1.5 text-xs font-bold">
              <span className="text-[10px] font-black text-amber-800 uppercase block">Missing Requirements:</span>
              <ul className="text-[11px] text-slate-650 space-y-1 list-disc pl-4 leading-relaxed font-semibold">
                <li>Work Readiness Assessment</li>
                <li>Community Contribution (1 post)</li>
                <li>60% Pathway Completion</li>
              </ul>
            </div>
          </div>

          {/* 11. Follow-Up Plan */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-3">
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Follow-Up Plan</h4>
              <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-black px-2 py-0.5 rounded-sm">IN PROGRESS</span>
            </div>
            
            <div className="relative pl-5 space-y-3.5 text-xs font-semibold text-slate-600 pt-1">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-100" />
              
              <div className="flex items-start gap-3 relative">
                <div className="absolute -left-4.5 mt-0.5 h-3.5 w-3.5 rounded-full bg-emerald-800 flex items-center justify-center text-[7px] text-white">✓</div>
                <div>
                  <h5 className="font-extrabold text-slate-800 leading-none">Send reminder about missed module</h5>
                  <p className="text-[10px] text-slate-450 font-medium mt-1">Completed via In-App Notification</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative">
                <div className="absolute -left-4.5 mt-0.5 h-3.5 w-3.5 rounded-full bg-emerald-800 flex items-center justify-center text-[8px] text-white">...</div>
                <div>
                  <h5 className="font-extrabold text-slate-800 leading-none">Ask if instructions are understood</h5>
                  <p className="text-[10px] text-slate-450 font-medium mt-1">Pending - Scheduled for today</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative">
                <div className="absolute -left-4.5 mt-0.5 h-3.5 w-3.5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] text-slate-400">•</div>
                <div>
                  <h5 className="font-extrabold text-slate-700 leading-none">Send offline lesson pack (ZIP)</h5>
                  <p className="text-[10px] text-slate-450 font-medium mt-1">Next step if no response</p>
                </div>
              </div>
            </div>
          </div>

          {/* 12. Record Detailed Follow-Up Form */}
          <div id="mobile-follow-up-section" className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 pb-1.5 border-b border-slate-100 uppercase tracking-wider">
              Record Detailed Follow-Up
            </h4>
            <form onSubmit={handleSaveRecord} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-450 uppercase block">Follow-Up Type</label>
                <select 
                  value={followUpType} 
                  onChange={(e) => setFollowUpType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-hidden"
                >
                  <option>Academic Support</option>
                  <option>Technical Assistance</option>
                  <option>Career Guidance</option>
                  <option>General Check-in</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-450 uppercase block">Method</label>
                <select 
                  value={followUpMethod} 
                  onChange={(e) => setFollowUpMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-hidden"
                >
                  <option>Phone Call</option>
                  <option>WhatsApp Chat</option>
                  <option>In-Person Meeting</option>
                  <option>In-App Thread</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-450 uppercase block">Primary Reason</label>
                <input 
                  type="text"
                  value={followUpReason}
                  onChange={(e) => setFollowUpReason(e.target.value)}
                  placeholder="e.g., Late assessment submission"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-750 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-450 uppercase block">Outcome Message Summary</label>
                <textarea 
                  rows={3}
                  value={followUpSummary}
                  onChange={(e) => setFollowUpSummary(e.target.value)}
                  placeholder="Summarize the discussion outcome..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-medium focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-450 uppercase block">Next Action</label>
                  <input 
                    type="text"
                    value={followUpNextAction}
                    onChange={(e) => setFollowUpNextAction(e.target.value)}
                    placeholder="Schedule check-in"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-450 uppercase block">Review Date</label>
                  <input 
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full text-xs font-extrabold py-2.5 rounded-xl cursor-pointer text-center interactive-button-primary focus-ring"
              >
                Save Record
              </button>
            </form>
          </div>

          {/* 13. Accordion Group 2: Support History & Tickets */}
          <div className="space-y-2.5">
            
            {/* Support History Accordion */}
            <div id="mobile-tickets-section" className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("supportHistory")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="h-4.5 w-4.5 text-slate-450" /> Support History
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.supportHistory ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.supportHistory && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 bg-slate-50/20 space-y-3">
                  <div className="space-y-3 pt-2">
                    {[
                      { id: "SUP-00491", sub: "Mobile App crashing on low-sync", status: "In Progress", color: "bg-amber-100 text-amber-800 border-amber-200" },
                      { id: "SUP-00080", sub: "Forgot Hub WiFi password", status: "Resolved", color: "bg-[#e2f1ec] text-[#0f5132] border-[#a3cfbb]" },
                      { id: "SUP-00342", sub: "Reset Assessment Attempt", status: "Resolved", color: "bg-[#e2f1ec] text-[#0f5132] border-[#a3cfbb]" }
                    ].map((tkt, tIdx) => (
                      <div key={tIdx} className="bg-white p-3 border border-slate-100 rounded-xl flex justify-between items-start gap-3">
                        <div className="space-y-0.5">
                          <span className="font-mono text-slate-450 text-[9px] uppercase tracking-wider">{tkt.id}</span>
                          <h5 className="text-xs font-black text-slate-800 leading-tight">{tkt.sub}</h5>
                        </div>
                        <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${tkt.color}`}>{tkt.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Low-Bandwidth Support Accordion */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("lowBandwidth")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <WifiOff className="h-4.5 w-4.5 text-slate-450" /> Low-Bandwidth Support
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.lowBandwidth ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.lowBandwidth && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 bg-slate-50/20 space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-extrabold text-slate-800 block">Text Summaries</span>
                        <span className="text-slate-400 uppercase tracking-wider text-[8px] block">Enabled</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-100 flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-extrabold text-slate-800 block">Transcripts</span>
                        <span className="text-slate-400 uppercase tracking-wider text-[8px] block">Enabled</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="text-[9px] font-black text-slate-450 uppercase block">Offline Resources:</span>
                    
                    <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                      <span className="font-bold text-slate-700">Offline Module #4 (ZIP)</span>
                      <button 
                        onClick={() => handleAction("Offline module sent successfully.")}
                        className="px-3 py-1.5 rounded-lg text-[9px] font-black cursor-pointer interactive-chip border border-emerald-150 focus-ring"
                      >
                        Send
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                      <span className="font-bold text-slate-700">Low-Data Assessment Mode Guide</span>
                      <button 
                        onClick={() => handleAction("Low data assessment guide sent.")}
                        className="px-3 py-1.5 rounded-lg text-[9px] font-black cursor-pointer interactive-chip border border-emerald-150 focus-ring"
                      >
                        Send
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-[10px] leading-relaxed text-slate-650">
                    💡 Note: Aisha frequently accesses platform between 10 PM and 2 AM when data is cheaper. Prioritize asynchronous feedback.
                  </div>
                </div>
              )}
            </div>

            {/* Community & Questions Accordion */}
            <div id="mobile-questions-section" className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("communityQuestions")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="h-4.5 w-4.5 text-slate-450" /> Community &amp; Questions
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.communityQuestions ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.communityQuestions && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 bg-slate-50/20 space-y-3 pt-2">
                  <div className="space-y-2.5">
                    <div className="p-3 bg-white border border-slate-100 rounded-xl space-y-1.5">
                      <p className="text-slate-800 font-extrabold leading-relaxed">
                        “How do I define a 'growth mindset' for the assessment?”
                      </p>
                      <div className="flex justify-between items-center text-[9px] font-bold text-slate-450">
                        <span>Marked helpful • Aisha Sani</span>
                        <button onClick={() => handleAction("Message action simulated.")} className="text-emerald-850 hover:underline font-black cursor-pointer">Reply</button>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-slate-100 rounded-xl space-y-1.5 relative">
                      <div className="flex justify-between items-start">
                        <p className="text-slate-800 font-extrabold leading-relaxed max-w-[75%]">
                          “I missed the workshop yesterday due to poor signal.”
                        </p>
                        <span className="bg-amber-100 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded-sm">ACTION</span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-450">Guide sent. Awaiting feedback from learner.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateTo("/facilitator/community" as RoutePath)}
                    className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-[10px] py-2.5 rounded-xl transition-colors cursor-pointer text-center shadow-3xs"
                  >
                    Go to Community Forum
                  </button>
                </div>
              )}
            </div>

            {/* Activity Timeline Accordion */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("activityTimeline")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="h-4.5 w-4.5 text-slate-450" /> Activity Timeline
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.activityTimeline ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.activityTimeline && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 bg-slate-50/20 space-y-3.5 pt-2">
                  <div className="space-y-3">
                    <div className="p-3 bg-white border border-slate-100 rounded-xl text-xs flex justify-between items-start gap-3">
                      <span className="text-[9px] font-bold text-slate-400 font-mono w-14 shrink-0 mt-0.5">Oct 24</span>
                      <p className="text-slate-800 font-medium flex-1 leading-normal">Aisha logged in via Android Lite App.</p>
                    </div>
                    
                    <div className="p-3 bg-white border border-slate-100 rounded-xl text-xs flex justify-between items-start gap-3">
                      <span className="text-[9px] font-bold text-slate-400 font-mono w-14 shrink-0 mt-0.5">Oct 22</span>
                      <p className="text-slate-800 font-medium flex-1 leading-normal">Completed "Verbal Communication" quiz with 92%.</p>
                    </div>

                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs flex justify-between items-start gap-3">
                      <span className="text-[9px] font-bold text-rose-500 font-mono w-14 shrink-0 mt-0.5">Oct 15</span>
                      <p className="font-bold flex-1 leading-normal">Flagged for 7+ days inactivity.</p>
                    </div>

                    <div className="p-3 bg-white border border-slate-100 rounded-xl text-xs flex justify-between items-start gap-3">
                      <span className="text-[9px] font-bold text-slate-400 font-mono w-14 shrink-0 mt-0.5">Oct 12</span>
                      <p className="text-slate-800 font-medium flex-1 leading-normal">Support Ticket SUP-2026-00491 opened (Bandwidth issues).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Facilitator Notes Accordion */}
            <div id="mobile-notes-section" className="bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden">
              <button 
                onClick={() => toggleAccordion("facilitatorNotes")}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-slate-450" /> Facilitator Notes
                </span>
                <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-200 ${openAccordions.facilitatorNotes ? "rotate-180" : ""}`} />
              </button>
              {openAccordions.facilitatorNotes && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs font-bold text-slate-700 bg-slate-50/20 space-y-4 pt-2">
                  <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                    {notes.map((note, nIdx) => (
                      <div key={nIdx} className="bg-blue-50/30 border border-blue-100/55 rounded-xl p-3 text-[11px] leading-relaxed space-y-1">
                        <p className="text-slate-700 italic font-semibold">"{note.text}"</p>
                        <div className="flex justify-between text-[9px] text-[#4f46e5] font-bold">
                          <span>— {note.author}</span>
                          <span>{note.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <textarea 
                      id="mobile-notes-area"
                      rows={2}
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add a private note about Aisha..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden font-medium text-slate-700 focus:ring-1 focus:ring-emerald-950 resize-none"
                    />
                    <button 
                      onClick={handleSaveNote}
                      className="font-bold text-[10px] px-4 py-2 rounded-lg cursor-pointer interactive-button-primary focus-ring"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 18. Quick Message Section */}
          <div id="mobile-quick-message-section" className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
              <MessageSquare className="h-5 w-5 text-emerald-800" />
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Quick Message
              </h4>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="p-3 bg-[#e0e7ff]/30 border border-[#c7d2fe]/45 rounded-xl text-[10px] leading-relaxed text-slate-700 font-semibold">
                <span className="text-[8px] font-black text-[#4f46e5] block uppercase mb-1">SUGGESTED TEMPLATE: REMINDER</span>
                "Hi Aisha, I noticed you're almost finished with the Work Readiness module! Just a quick reminder to submit the scenario assessment so we can unlock your next module."
              </div>

              <textarea 
                id="mobile-quick-message-area"
                rows={3}
                value={quickMessageText}
                onChange={(e) => setQuickMessageText(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-medium focus:outline-hidden"
              />

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3 font-bold text-slate-600">
                  <label className="flex items-center gap-1.5 select-none cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={channelInApp} 
                      onChange={(e) => setChannelInApp(e.target.checked)}
                      className="rounded border-slate-300 text-emerald-950 focus:ring-emerald-950 focus:ring-1" 
                    />
                    <span>In-App</span>
                  </label>
                  <label className="flex items-center gap-1.5 select-none cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={channelEmail} 
                      onChange={(e) => setChannelEmail(e.target.checked)}
                      className="rounded border-slate-300 text-emerald-950 focus:ring-emerald-950 focus:ring-1" 
                    />
                    <span>Email</span>
                  </label>
                </div>

                <button 
                  onClick={handleSendMessage}
                  className="font-bold text-[10px] px-4 py-2 rounded-xl cursor-pointer flex items-center gap-1 shadow-sm interactive-button-primary focus-ring"
                >
                  <Send className="h-3 w-3" /> Send
                </button>
              </div>
            </div>
          </div>

          {/* 19. Export/Share buttons */}
          <div className="space-y-2.5 pt-1">
            <button 
              onClick={() => handleAction("Report export simulated in this frontend prototype.")}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 flex items-center justify-between transition-colors shadow-3xs cursor-pointer active:scale-[0.99]"
            >
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4 text-slate-400" /> Export Performance Report
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <button 
              onClick={() => handleAction("Profile sharing simulated in this frontend prototype.")}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 flex items-center justify-between transition-colors shadow-3xs cursor-pointer active:scale-[0.99]"
            >
              <span className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-slate-400" /> Share Profile with Admin
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* 20. Recommended Next Action CTA */}
          <div className="bg-[#0f172a] text-white rounded-2xl p-5 shadow-md space-y-4 border border-slate-800">
            <div className="space-y-1">
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">Recommended Action</span>
              <h4 className="text-sm font-extrabold text-white leading-tight">Schedule Remedial Finance Session</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-semibold mt-1">
                Aisha's performance in Agri-Finance is 15% below her cohort average. A 15-minute sync could bridge this gap.
              </p>
            </div>
            <button 
              onClick={() => setIsScheduleSyncOpen(true)}
              className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-black text-xs py-3 rounded-xl transition-all shadow-sm text-center cursor-pointer focus-ring"
            >
              Schedule Sync Now
            </button>
          </div>

        </div>

        {/* 21. Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around z-40 px-2">
          <button onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)} className="flex flex-col items-center gap-1 text-slate-400 active:scale-95">
            <span className="text-lg">📊</span>
            <span className="text-[9px] font-bold">Overview</span>
          </button>
          <button onClick={() => navigateTo("/facilitator/cohorts" as RoutePath)} className="flex flex-col items-center gap-1 text-slate-400 active:scale-95">
            <span className="text-lg">👥</span>
            <span className="text-[9px] font-bold">Cohorts</span>
          </button>
          <button onClick={onBack} className="flex flex-col items-center gap-1 text-emerald-850 active:scale-95">
            <span className="text-lg">👨‍🎓</span>
            <span className="text-[9px] font-extrabold">Learners</span>
          </button>
          <button onClick={() => navigateTo("/facilitator/assessments" as RoutePath)} className="flex flex-col items-center gap-1 text-slate-400 active:scale-95">
            <span className="text-lg">📋</span>
            <span className="text-[9px] font-bold">Reviews</span>
          </button>
          <button onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)} className="flex flex-col items-center gap-1 text-slate-400 active:scale-95">
            <span className="text-lg">💬</span>
            <span className="text-[9px] font-bold">Support</span>
          </button>
        </div>

        {/* 22. Reusable Floating Action Menu */}
        <FacilitatorMobileActionMenu 
          items={mobileMenuItems}
          onActionSelect={handleMobileActionSelect}
        />

        {/* SCHEDULE SYNC OVERLAY (MOBILE & DESKTOP PARITY) */}
        {renderScheduleSyncOverlay()}

      </div>
    );
  }

  // ====================================================
  // DESKTOP & TABLET RENDER (Strict match with Desktop)
  // ====================================================
  return (
    <div className="space-y-6 text-left font-sans bg-slate-50/10 pb-16 relative">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-2.5 max-w-sm animate-in fade-in duration-200">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-auto">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation Breadcrumb & Page title */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <button 
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-900 text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to learners
        </button>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
          Learner detail: {learnerId}
        </span>
      </div>

      {/* Two Column Section: HERO (Section 1) and STATUS CARD (Section 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Section 1: Learner Hero Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-5">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                alt="Aisha Mohammed" 
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    Aisha Mohammed
                  </h1>
                  <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Status: Support Needed
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Review progress, support needs, assessments...
                </p>
              </div>
            </div>
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] text-[11px] font-bold px-3 py-1 rounded-md">
              Cohort: Kano Youth Employability 02
            </span>
            <span className="bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] text-[11px] font-bold px-3 py-1 rounded-md">
              Pathway: Youth Employability
            </span>
            <span className="bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] text-[11px] font-bold px-3 py-1 rounded-md">
              Location: Kano / Tarauni
            </span>
          </div>

          {/* Action buttons side-by-side */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={() => setIsScheduleSyncOpen(true)}
              className="bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs active:scale-[0.98]"
            >
              <Calendar className="h-4 w-4 text-emerald-300" /> Schedule Sync Now
            </button>
            <button 
              onClick={scrollToFollowUpForm}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs active:scale-[0.98]"
            >
              <FileText className="h-4 w-4 text-slate-400" /> Record Follow-Up
            </button>
            <button 
              onClick={() => {
                const messageArea = document.querySelector("textarea[placeholder='Type your message here...']");
                if (messageArea) {
                  messageArea.scrollIntoView({ behavior: "smooth" });
                  (messageArea as HTMLElement).focus();
                }
                handleAction("Message action simulated in this frontend prototype.");
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs active:scale-[0.98]"
            >
              <Mail className="h-4 w-4 text-slate-450" /> Message Learner
            </button>
          </div>
        </div>

        {/* Section 2: Learner Status Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-100">
            Learner Status
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Current Progress</span>
              <span>42%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-emerald-800 h-full rounded-full" style={{ width: "42%" }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Inactive</span>
              <span className="text-xl font-black text-rose-700 block mt-0.5">9 Days</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Risk Level</span>
              <span className="text-xl font-black text-amber-600 block mt-0.5">Medium</span>
            </div>
          </div>

          <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl">
            <p className="text-[10px] text-rose-800 font-bold flex items-center gap-1.5">
              <span>⚠️</span> Issue: Assessment due for over 48 hours.
            </p>
          </div>
        </div>

      </div>

      {/* Section 3: Key Metric Cards (Row of 6) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Learning Progress", val: "42%", icon: BookOpen, color: "text-slate-800", isBorder: false },
          { label: "Last Active", val: "9 Days", icon: Clock, color: "text-rose-700", isBorder: true },
          { label: "Current Course", val: "Work Readiness", icon: Briefcase, color: "text-slate-800", isBorder: false },
          { label: "Assessment Status", val: "Due", icon: Calendar, color: "text-amber-700", isBorder: false },
          { label: "CPD Credits", val: "22 / 35", icon: Award, color: "text-emerald-800", isBorder: false },
          { label: "Certificate Status", val: "Not Eligible", icon: Lock, color: "text-slate-400", isBorder: false }
        ].map((metric, idx) => (
          <div 
            key={idx} 
            className={`bg-white border ${metric.isBorder ? "border-t-rose-500 border-t-2 border-l-slate-200 border-r-slate-200 border-b-slate-200" : "border-slate-200"} rounded-2xl p-4 flex flex-col justify-between h-24 shadow-3xs`}
          >
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
              {metric.label}
            </span>
            <div className="flex items-center justify-between gap-1 mt-2">
              <span className={`text-[15px] font-black truncate ${metric.color}`}>
                {metric.val}
              </span>
              <metric.icon className="h-4 w-4 text-slate-400 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Section 4: Information Cards (Personal, Programme, Contact) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Personal Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
            <User className="h-4 w-4 text-slate-400" /> Personal Info
          </h4>
          <div className="space-y-3.5 text-xs font-bold text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Learner ID:</span>
              <span className="font-mono text-slate-800">LRN-2026-88291</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Gender:</span>
              <span className="text-slate-800">Female</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Age Bracket:</span>
              <span className="text-slate-800">18-35</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Region:</span>
              <span className="text-slate-800">Kano / Tarauni</span>
            </div>
          </div>
        </div>

        {/* 2. Programme */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
            <Award className="h-4 w-4 text-slate-400" /> Programme
          </h4>
          <div className="space-y-3.5 text-xs font-bold text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Track:</span>
              <span className="text-slate-800">SUSTAIN CPD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Pathway:</span>
              <span className="text-slate-800">Youth Employability</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Hub:</span>
              <span className="text-slate-800">Kano Youth Skills Hub</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Facilitator:</span>
              <span className="text-slate-800">Halima Sani</span>
            </div>
          </div>
        </div>

        {/* 3. Contact & Access */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
            <Phone className="h-4 w-4 text-slate-400" /> Contact &amp; Access
          </h4>
          <div className="space-y-3.5 text-xs font-bold text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Email:</span>
              <span className="text-slate-800 truncate max-w-[150px]">aisha@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Phone:</span>
              <span className="text-slate-800">+234 800 000 0000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Notif. Pref:</span>
              <span className="text-slate-800">In-app / Email</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Support:</span>
              <span className="text-slate-800">Text / Downloads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Pathway Learning Roadmap (Horizontal on Desktop) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest pb-1 border-b border-slate-100">
          Pathway Learning Roadmap
        </h3>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-12 py-2">
          {/* Connecting bar for desktop */}
          <div className="absolute hidden md:block top-8 left-20 right-20 h-0.5 bg-slate-100 -z-1" />

          {/* Stage 1 */}
          <div className="flex items-center md:flex-col gap-3 text-left md:text-center z-10">
            <div className="h-9 w-9 rounded-full bg-emerald-800 border-2 border-emerald-800 flex items-center justify-center text-white shrink-0 font-bold text-xs">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-slate-900">Digital Readiness</h5>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">Completed</p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="flex items-center md:flex-col gap-3 text-left md:text-center z-10">
            <div className="h-9 w-9 rounded-full bg-emerald-800 border-2 border-emerald-800 flex items-center justify-center text-white shrink-0 font-bold text-xs">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-slate-900">Communication</h5>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">Completed</p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="flex items-center md:flex-col gap-3 text-left md:text-center z-10">
            <div className="h-9 w-9 rounded-full bg-emerald-800 border-2 border-emerald-800 flex items-center justify-center text-white shrink-0 font-bold text-xs">
              <span className="text-[10px] font-black tracking-tighter leading-none">...</span>
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#047857]">Work Readiness</h5>
              <p className="text-[10px] text-[#047857] font-bold mt-0.5">In Progress (42%)</p>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="flex items-center md:flex-col gap-3 text-left md:text-center z-10">
            <div className="h-9 w-9 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-400 shrink-0 font-bold text-xs">
              <Lock className="h-3 w-3 text-slate-400" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-slate-450">Interview Prep</h5>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">Not Started</p>
            </div>
          </div>

          {/* Stage 5 */}
          <div className="flex items-center md:flex-col gap-3 text-left md:text-center z-10">
            <div className="h-9 w-9 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-400 shrink-0 text-xs">
              <Lock className="h-3 w-3 text-slate-400" />
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-slate-450">Final Assessment</h5>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">Locked</p>
            </div>
          </div>

        </div>
      </div>

      {/* Section 6: Course Progress Detail Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Course Progress Detail
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Pathway: Youth Employability
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/15 border-b border-slate-100 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Course</th>
                <th className="p-4">Status</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Lessons</th>
                <th className="p-4">Assessment</th>
                <th className="p-4">CPD</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              
              <tr>
                <td className="p-4 pl-6 font-bold text-slate-900">Digital Readiness</td>
                <td className="p-4">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-150 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    COMPLETED
                  </span>
                </td>
                <td className="p-4 font-bold">100%</td>
                <td className="p-4 font-mono">12/12</td>
                <td className="p-4 font-bold text-slate-800">88% (Pass)</td>
                <td className="p-4 font-mono text-slate-800">10 Credits</td>
                <td className="p-4 pr-6 text-right">
                  <button 
                    onClick={() => handleAction("Course action simulated in this frontend prototype.")}
                    className="text-slate-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>

              <tr>
                <td className="p-4 pl-6 font-bold text-slate-900">Communication Skills</td>
                <td className="p-4">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-150 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    COMPLETED
                  </span>
                </td>
                <td className="p-4 font-bold">100%</td>
                <td className="p-4 font-mono">10/10</td>
                <td className="p-4 font-bold text-slate-800">92% (Pass)</td>
                <td className="p-4 font-mono text-slate-800">8 Credits</td>
                <td className="p-4 pr-6 text-right">
                  <button 
                    onClick={() => handleAction("Course action simulated in this frontend prototype.")}
                    className="text-slate-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>

              <tr className="bg-amber-55/5">
                <td className="p-4 pl-6 font-bold text-slate-900">Work Readiness</td>
                <td className="p-4">
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    IN PROGRESS
                  </span>
                </td>
                <td className="p-4 font-bold text-amber-800">42%</td>
                <td className="p-4 font-mono">4/12</td>
                <td className="p-4 font-bold text-rose-700">Pending</td>
                <td className="p-4 font-mono text-slate-800">4 Credits</td>
                <td className="p-4 pr-6 text-right">
                  <button 
                    onClick={() => handleAction("Course support action simulated in this frontend prototype.")}
                    className="text-slate-900 font-extrabold cursor-pointer"
                  >
                    Support
                  </button>
                </td>
              </tr>

              <tr className="text-slate-400">
                <td className="p-4 pl-6 font-bold">Interview Prep</td>
                <td className="p-4">
                  <span className="bg-slate-50 text-slate-400 border border-slate-150 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    LOCKED
                  </span>
                </td>
                <td className="p-4">0%</td>
                <td className="p-4 font-mono">0/15</td>
                <td className="p-4">—</td>
                <td className="p-4 font-mono">0 Credits</td>
                <td className="p-4 pr-6 text-right font-bold py-5">
                  <div className="flex items-center justify-end gap-1 text-slate-400">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Section 7: Assessment Status, CPD Readiness and Risks (3-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Card 1: Assessment Status (span 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 uppercase tracking-wider">
            Assessment Status
          </h4>
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-bold text-slate-700">
                <h5 className="text-slate-900 font-extrabold">Digital Literacy Quiz</h5>
                <p className="text-[10px] text-slate-450 font-medium mt-0.5">Attempt 1 • Score: 88%</p>
              </div>
              <span className="bg-[#e2f1ec] text-[#0f5132] border border-[#a3cfbb] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                PASSED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 relative pl-4">
              <div className="absolute left-0 top-3 bottom-3 w-1 bg-rose-600 rounded-r" />
              <div className="text-xs font-bold text-slate-700">
                <h5 className="text-slate-900 font-extrabold">Work Ethic Scenario</h5>
                <p className="text-[10px] text-slate-450 font-medium mt-0.5">Due: 9 days ago</p>
              </div>
              <span className="bg-[#f8d7da] text-[#842029] border border-[#f5c2c7] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                DUE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50/40 rounded-xl border border-slate-100/50">
              <div className="text-xs font-bold text-slate-400">
                <h5 className="font-extrabold">Public Speaking Draft</h5>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Unlocks after Lesson 6</p>
              </div>
              <span className="bg-slate-50 text-slate-400 border border-slate-150 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                LOCKED
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: CPD & Readiness (span 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 uppercase tracking-wider">
            CPD &amp; Readiness
          </h4>
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-650">
                  <span className="text-slate-400 uppercase">CPD Credits</span>
                  <span className="text-slate-800 font-black">22 / 35</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#0284c7] h-full rounded-full" style={{ width: "63%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-650">
                  <span className="text-slate-400 uppercase">Cert Requirements</span>
                  <span className="text-slate-800 font-black">3 / 7 Met</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#047857] h-full rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#faf9f5] border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[10px] font-black text-amber-800 uppercase block">Missing Requirements:</span>
              <ul className="text-[11px] text-slate-600 font-bold space-y-1 list-disc pl-4 leading-relaxed">
                <li>Work Readiness Assessment</li>
                <li>Community Contribution (1 post)</li>
                <li>60% Pathway Completion</li>
              </ul>
            </div>

            <div className="p-2.5 bg-red-50/50 border border-red-100 rounded-xl flex items-center justify-between text-[11px] font-bold text-[#842029]">
              <span className="flex items-center gap-1.5">
                <span>⚠️</span> Certificate Eligibility Risk: Medium
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: 2x2 Risk grids (span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4 h-full">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 shadow-3xs">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Activity Risk</span>
              <span className="text-sm font-black text-amber-800 block">Medium</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 shadow-3xs">
              <SlidersHorizontal className="h-5 w-5 text-amber-600" />
              <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Assess. Risk</span>
              <span className="text-sm font-black text-amber-800 block">Medium</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 shadow-3xs">
              <Award className="h-5 w-5 text-amber-600" />
              <span className="text-[9px] font-black text-slate-400 block uppercase tracking-wider">Cert. Risk</span>
              <span className="text-sm font-black text-amber-800 block">Medium</span>
            </div>

            <div className="bg-[#fdf2f2] border border-[#fca5a5] rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2 shadow-3xs">
              <HelpCircle className="h-5 w-5 text-rose-600" />
              <span className="text-[9px] font-black text-rose-800 block uppercase tracking-wider">Access Support</span>
              <span className="text-sm font-black text-rose-700 block">Critical</span>
            </div>

          </div>
        </div>

      </div>

      {/* Section 8: Follow-Up Plan & Section 9: Timeline/Notes (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Card: Follow-Up Plan (span 5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Follow-Up Plan</h4>
            <span className="bg-[#fdf8e2] text-[#664d03] border border-[#f5e7b3] text-[10px] font-extrabold px-2.5 py-0.5 rounded-sm">
              IN PROGRESS
            </span>
          </div>

          {/* Timeline connecting bar */}
          <div className="relative space-y-4 text-xs font-semibold text-slate-600 pl-4 py-1 flex-1 flex flex-col justify-around">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-100 -z-1" />

            <div className="flex items-start gap-4">
              <div className="h-4.5 w-4.5 rounded-full bg-emerald-800 border-2 border-emerald-800 flex items-center justify-center text-white shrink-0">
                <Check className="h-3 w-3" />
              </div>
              <div>
                <h5 className="font-extrabold text-slate-800 leading-none">Send reminder about missed module</h5>
                <p className="text-[10px] text-slate-450 mt-1">Completed via In-App Notification</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-4.5 w-4.5 rounded-full bg-emerald-800 border-2 border-emerald-800 flex items-center justify-center text-white shrink-0">
                <span className="text-[10px] tracking-tighter">...</span>
              </div>
              <div>
                <h5 className="font-extrabold text-slate-800 leading-none">Ask if instructions are understood</h5>
                <p className="text-[10px] text-slate-450 mt-1">Pending - Scheduled for today</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-4.5 w-4.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 shrink-0">
                •
              </div>
              <div>
                <h5 className="font-extrabold text-slate-700 leading-none">Send offline lesson pack (Low Bandwidth)</h5>
                <p className="text-[10px] text-slate-450 mt-1">Next step if no response</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-4.5 w-4.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 shrink-0">
                •
              </div>
              <div>
                <h5 className="font-extrabold text-slate-700 leading-none">Encourage assessment draft</h5>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-4.5 w-4.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 shrink-0">
                •
              </div>
              <div>
                <h5 className="font-extrabold text-slate-700 leading-none">Final check-in in 2 days</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Tabbed Activity Timeline & Facilitator Notes (span 7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between">
          
          {/* Tab Headers */}
          <div className="flex border-b border-slate-150 h-12 bg-slate-50/40 shrink-0">
            <button 
              onClick={() => setActiveTab("timeline")}
              className={`flex-1 text-center text-xs font-bold transition-all relative ${activeTab === "timeline" ? "text-slate-900" : "text-slate-450 hover:text-slate-700"}`}
            >
              <span>Activity Timeline</span>
              {activeTab === "timeline" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-800" />}
            </button>
            <button 
              onClick={() => setActiveTab("notes")}
              className={`flex-1 text-center text-xs font-bold transition-all relative ${activeTab === "notes" ? "text-slate-900" : "text-slate-450 hover:text-slate-700"}`}
            >
              <span>Facilitator Notes</span>
              {activeTab === "notes" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-800" />}
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="p-5 flex-1 flex flex-col justify-between min-h-[250px]">
            
            {activeTab === "timeline" ? (
              /* Timeline Content */
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {timelineItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-xl text-xs flex justify-between items-start gap-3 ${
                      item.type === "alert" 
                        ? "bg-rose-50/10 border border-rose-100 text-[#842029]" 
                        : item.type === "success"
                          ? "bg-emerald-50/40 border border-emerald-150 text-emerald-900 font-semibold"
                          : "bg-slate-50/60 border border-slate-100 text-slate-800"
                    }`}
                  >
                    <span className={`text-[10px] font-bold font-mono w-14 shrink-0 ${item.type === "alert" ? "text-rose-500" : item.type === "success" ? "text-emerald-700" : "text-slate-400"}`}>
                      {item.date}
                    </span>
                    <p className="flex-1 font-semibold leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Notes Content */
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {notes.map((note, nIdx) => (
                  <div key={nIdx} className="bg-blue-50/30 border border-blue-100/55 rounded-xl p-3 text-[11px] leading-relaxed space-y-1">
                    <p className="text-slate-700 italic font-semibold">"{note.text}"</p>
                    <div className="flex justify-between text-[9px] text-[#4f46e5] font-bold">
                      <span>— {note.author}</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Add private note entry is ALWAYS visible on both tabs */}
            <div className="space-y-2 pt-4 border-t border-slate-100 mt-4">
              <div className="relative">
                <textarea 
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add a private note about Aisha's progress..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-10 py-2.5 text-xs focus:outline-hidden font-medium text-slate-700 resize-none"
                />
                <button 
                  onClick={handleSaveNote}
                  className="absolute right-2.5 bottom-3.5 h-7 w-7 rounded-full bg-slate-100 hover:bg-emerald-850 hover:text-white transition-all flex items-center justify-center text-slate-400 cursor-pointer focus-ring"
                  title="Add note"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Section 10: Record Detailed Follow-Up */}
      <div id="detailed-follow-up-section" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <h3 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 uppercase tracking-wider">
          Record Detailed Follow-Up
        </h3>
        
        <form onSubmit={handleSaveRecord} className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left text-xs">
          {/* Left Column (span 6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase block">Follow-Up Type</label>
              <select 
                value={followUpType} 
                onChange={(e) => setFollowUpType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-950"
              >
                <option>Academic Support</option>
                <option>Technical Assistance</option>
                <option>Career Guidance</option>
                <option>General Check-in</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase block">Method</label>
              <select 
                value={followUpMethod} 
                onChange={(e) => setFollowUpMethod(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-950"
              >
                <option>Phone Call</option>
                <option>WhatsApp Chat</option>
                <option>In-Person Meeting</option>
                <option>In-App Thread</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase block">Primary Reason</label>
              <input 
                type="text"
                value={followUpReason}
                onChange={(e) => setFollowUpReason(e.target.value)}
                placeholder="e.g., Late assessment submission"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-750 font-semibold focus:outline-hidden focus:ring-1 focus:ring-emerald-950"
              />
            </div>
          </div>

          {/* Right Column (span 6) */}
          <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-450 uppercase block">Message Summary</label>
                <textarea 
                  rows={3}
                  value={followUpSummary}
                  onChange={(e) => setFollowUpSummary(e.target.value)}
                  placeholder="Summarize what was discussed..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Next Action</label>
                  <input 
                    type="text"
                    value={followUpNextAction}
                    onChange={(e) => setFollowUpNextAction(e.target.value)}
                    placeholder="Schedule check-in"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-950"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Review Date</label>
                  <input 
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                className="font-extrabold text-xs px-8 py-3 rounded-xl cursor-pointer shadow-sm interactive-button-primary focus-ring"
              >
                Save Record
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Section 11: Quick Message & Support History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Quick Message (span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <MessageSquare className="h-5 w-5 text-emerald-800" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Quick Message
            </h4>
          </div>
          
          <div className="space-y-3.5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-[#e0e7ff]/30 border border-[#c7d2fe]/45 rounded-xl text-[11px] leading-relaxed text-slate-700 font-semibold">
                <span className="text-[9px] font-black text-[#4f46e5] block uppercase mb-1">SUGGESTED TEMPLATE: ASSESSMENT REMINDER</span>
                "Hi Aisha, I noticed you're almost finished with the Work Readiness module! Just a quick reminder to submit the scenario assessment so we can unlock your next module. Let me know if you need the low-bandwidth guide for it!"
              </div>

              <textarea 
                rows={3}
                value={quickMessageText}
                onChange={(e) => setQuickMessageText(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-950"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                <label className="flex items-center gap-2 select-none cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={channelInApp} 
                    onChange={(e) => setChannelInApp(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-950 focus:ring-emerald-950 focus:ring-1" 
                  />
                  <span>In-App</span>
                </label>
                <label className="flex items-center gap-2 select-none cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={channelEmail} 
                    onChange={(e) => setChannelEmail(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-950 focus:ring-emerald-950 focus:ring-1" 
                  />
                  <span>Email</span>
                </label>
              </div>

              <button 
                onClick={handleSendMessage}
                className="font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 interactive-button-primary focus-ring"
              >
                <Send className="h-3.5 w-3.5" /> Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Support History (span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 uppercase tracking-wider">
            Support History
          </h4>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs font-semibold text-slate-700">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 font-mono uppercase">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Subject</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                <tr>
                  <td className="py-2.5 font-mono text-slate-900">SUP-00491</td>
                  <td className="py-2.5 text-slate-800">Mobile App crashing on low-sync</td>
                  <td className="py-2.5 text-right">
                    <span className="bg-[#fef3c7] text-[#92400e] border border-[#fde68a] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      In Progress
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono text-slate-900">SUP-00080</td>
                  <td className="py-2.5 text-slate-800">Forgot Hub WiFi password</td>
                  <td className="py-2.5 text-right">
                    <span className="bg-[#e2f1ec] text-[#0f5132] border border-[#a3cfbb] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      Resolved
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono text-slate-900">SUP-00342</td>
                  <td className="py-2.5 text-slate-800">Reset Assessment Attempt</td>
                  <td className="py-2.5 text-right">
                    <span className="bg-[#e2f1ec] text-[#0f5132] border border-[#a3cfbb] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      Resolved
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-50 text-center">
            <button 
              onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)}
              className="text-xs font-black text-slate-550 hover:text-emerald-950 cursor-pointer"
            >
              View All Tickets
            </button>
          </div>
        </div>

      </div>

      {/* Section 12: Low-Bandwidth Support & Section 13: Community and Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Low-Bandwidth Support (span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 uppercase tracking-wider">
            Low-Bandwidth Support
          </h4>

          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-700">
              <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                <FileText className="h-5 w-5 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-900 text-xs block font-extrabold">Text Summaries</span>
                  <span className="text-slate-400 text-[9px] block uppercase mt-0.5">Enabled</span>
                </div>
              </div>

              <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
                <FileSpreadsheet className="h-5 w-5 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-900 text-xs block font-extrabold">Transcripts</span>
                  <span className="text-slate-400 text-[9px] block uppercase mt-0.5">Enabled</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] font-black text-slate-450 uppercase block">Recommended Support Items:</span>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                <span>Offline Learning Module #4 (ZIP)</span>
                <button 
                  onClick={() => handleAction("Support item sent in this frontend prototype.")}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                >
                  Send
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                <span>Low-Data Assessment Mode Guide</span>
                <button 
                  onClick={() => handleAction("Support item sent in this frontend prototype.")}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Activity (span 6) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <h4 className="text-xs font-black text-slate-900 pb-1.5 border-b border-slate-100 uppercase tracking-wider">
            Community &amp; Questions
          </h4>

          <div className="space-y-3.5 flex-1 flex flex-col justify-between">
            <div className="space-y-3 text-xs">
              {/* Question 1 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <p className="text-slate-800 font-extrabold leading-relaxed">
                  “How do I define a 'growth mindset' for the assessment?”
                </p>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-450">
                  <span>Facilitator response available. Aisha marked as helpful.</span>
                  <button 
                    onClick={() => handleAction("Message action simulated in this frontend prototype.")}
                    className="text-emerald-800 hover:text-emerald-950 font-black cursor-pointer underline"
                  >
                    Reply to Aisha
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 relative">
                <div className="flex justify-between items-start">
                  <p className="text-slate-800 font-extrabold leading-relaxed max-w-[80%]">
                    “I missed the workshop yesterday due to poor signal.”
                  </p>
                  <span className="bg-[#7f5600] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    ACTION NEEDED
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-450">
                  Guide sent. Awaiting feedback from learner.
                </p>
              </div>
            </div>

            <button 
              onClick={() => navigateTo("/facilitator/community" as RoutePath)}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer text-center shadow-3xs"
            >
              Go to Community Forum
            </button>
          </div>
        </div>

      </div>

      {/* Section 14: Recommended Next Action CTA */}
      <div className="bg-[#044c34] text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start gap-4 text-left">
          <div className="h-10 w-10 rounded-full bg-[#033c29] flex items-center justify-center text-emerald-400 shrink-0 text-lg">
            ⚡
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-extrabold">
              {isReminderSent ? "Reminder Sent" : "Recommended Next Action"}
            </h4>
            <p className="text-xs text-emerald-100 font-semibold leading-relaxed">
              {isReminderSent 
                ? "Assessment reminder and low-bandwidth guide prepared for Aisha." 
                : "Send Assessment Reminder and Low-Bandwidth Guide to Aisha to boost progress."}
            </p>
          </div>
        </div>
        {!isReminderSent && (
          <button 
            onClick={() => {
              setReminderSuccessState(false);
              setIsSendReminderOpen(true);
            }}
            className="font-extrabold text-xs px-6 py-3 rounded-xl shadow-xs cursor-pointer shrink-0 interactive-button-secondary border-none! text-[#044c34]! hover:bg-emerald-50! focus-ring"
          >
            Send Reminder
          </button>
        )}
      </div>

      {/* SCHEDULE SYNC OVERLAY (MOBILE & DESKTOP PARITY) */}
      {renderScheduleSyncOverlay()}

      {/* ==========================================
          SEND ASSESSMENT REMINDER MODAL / DRAWER
          ========================================== */}
      {isSendReminderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          {/* Centered Modal / Responsive Drawer Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-250">
            
            {/* Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-start shrink-0">
              <div className="text-left space-y-0.5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide font-mono">
                  Send Assessment Reminder
                </h3>
                <p className="text-[11px] text-slate-500">
                  Send a supportive reminder and attach the right learning guide.
                </p>
              </div>
              <button 
                onClick={() => setIsSendReminderOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700 text-left">
              
              {!reminderSuccessState ? (
                <>
                  {/* Context Card */}
                  <div className="bg-emerald-50/40 border border-emerald-150 rounded-2xl p-4 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Learner</div>
                        <div className="font-extrabold text-slate-900 text-sm mt-0.5">Aisha Mohammed</div>
                      </div>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm border border-amber-200/50 font-mono">
                        Medium Priority
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-[11px] pt-2 border-t border-emerald-100">
                      <div>
                        <span className="font-semibold text-slate-500 block">Cohort:</span>
                        <span className="font-bold text-slate-800">Kano Youth Employability Cohort 02</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 block">Reason:</span>
                        <span className="font-bold text-slate-800 leading-tight">Overdue support and learning guide check-in</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 block">Current Course:</span>
                        <span className="font-bold text-slate-800">Work Readiness Foundation</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-semibold text-slate-500 block">Progress:</span>
                          <span className="font-bold text-slate-800">42%</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-500 block">Last Active:</span>
                          <span className="font-bold text-slate-800">9 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    {/* Reminder Type */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Reminder Type</label>
                      <select 
                        value={reminderType}
                        onChange={(e) => setReminderType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-800 font-medium font-mono"
                      >
                        <option value="Assessment reminder">Assessment reminder</option>
                        <option value="Low-bandwidth support">Low-bandwidth support</option>
                        <option value="Missed activity check-in">Missed activity check-in</option>
                        <option value="Certificate readiness reminder">Certificate readiness reminder</option>
                        <option value="General progress reminder">General progress reminder</option>
                      </select>
                    </div>

                    {/* Channel Checkboxes */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-600 block">Delivery Channels</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={reminderChannelInApp}
                            onChange={(e) => setReminderChannelInApp(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">In-App Message</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={reminderChannelSMS}
                            onChange={(e) => setReminderChannelSMS(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">SMS Reminder</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={reminderChannelEmail}
                            onChange={(e) => setReminderChannelEmail(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={reminderChannelWhatsApp}
                            onChange={(e) => setReminderChannelWhatsApp(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">WhatsApp / Low-Bandwidth</span>
                        </label>
                      </div>
                    </div>

                    {/* Message Template selection */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Message Template</label>
                      <select 
                        value={messageTemplate}
                        onChange={(e) => setMessageTemplate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-800 font-medium font-mono"
                      >
                        <option value="Friendly assessment reminder">Friendly assessment reminder</option>
                        <option value="Low-bandwidth support note">Low-bandwidth support note</option>
                        <option value="Missed activity check-in">Missed activity check-in</option>
                        <option value="Certification reminder">Certification reminder</option>
                      </select>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Support Message</label>
                      <textarea
                        value={reminderMessage}
                        onChange={(e) => setReminderMessage(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white text-slate-800 font-medium leading-relaxed"
                      />
                    </div>

                    {/* Attachments Checkboxes */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-600 block">Attachments</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachGuide}
                            onChange={(e) => setAttachGuide(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Assessment Guide</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachLowBandwidth}
                            onChange={(e) => setAttachLowBandwidth(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Low-Bandwidth Guide</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachSummary}
                            onChange={(e) => setAttachSummary(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Lesson Summary</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachCPD}
                            onChange={(e) => setAttachCPD(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">CPD Requirement Note</span>
                        </label>
                      </div>
                    </div>

                    {/* Follow-Up option */}
                    <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                      <input 
                        type="checkbox"
                        checked={createFollowUpTask}
                        onChange={(e) => setCreateFollowUpTask(e.target.checked)}
                        className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4.5 w-4.5"
                      />
                      <span className="font-semibold text-slate-750">
                        Create follow-up task if learner does not respond within 48 hours
                      </span>
                    </label>
                  </div>
                </>
              ) : (
                /* SUCCESS SCREEN */
                <div className="py-8 px-4 flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-[#005c45] text-3xl shrink-0 animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-slate-900">Assessment Reminder Sent</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      The supportive reminder and low-bandwidth guide have been pre-staged successfully.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full text-left space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">Recipients:</span>
                      <span className="font-bold text-slate-800">Aisha Mohammed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">Delivery Mode:</span>
                      <span className="font-bold text-slate-800 font-mono">In-App, SMS ({reminderChannelSMS ? "Active" : "Inactive"})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">Attachment count:</span>
                      <span className="font-bold text-slate-800">2 digital guides</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-3 flex gap-2 text-left w-full">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#005c45] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-emerald-800 leading-relaxed font-semibold">
                      This is a frontend action prototype simulation. No real network packets, cellular SMS, or emails have been transmitted.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              {!reminderSuccessState ? (
                <>
                  <button 
                    onClick={() => setIsSendReminderOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-250 text-slate-650 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      showToast("Reminder draft saved locally in this frontend prototype.");
                      setIsSendReminderOpen(false);
                    }}
                    className="px-4 py-2 bg-white border border-emerald-250 text-[#005c45] hover:bg-emerald-50/40 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95"
                  >
                    Save Draft
                  </button>
                  <button 
                    onClick={() => {
                      showToast("Reminder sent locally in this frontend prototype.");
                      setIsReminderSent(true);
                      setReminderSuccessState(true);
                    }}
                    className="px-4 py-2 bg-[#005c45] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs active:scale-95 animate-pulse"
                  >
                    Send Reminder
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setIsSendReminderOpen(false);
                      setReminderSuccessState(false);
                    }}
                    className="px-4 py-2 bg-white border border-slate-250 text-slate-650 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all active:scale-95"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setIsSendReminderOpen(false);
                      setReminderSuccessState(false);
                      navigateTo("/facilitator/follow-up-queue" as RoutePath);
                    }}
                    className="px-4 py-2 bg-[#005c45] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs active:scale-95"
                  >
                    View Follow-Up Queue
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
export default LearnerDetailView;
