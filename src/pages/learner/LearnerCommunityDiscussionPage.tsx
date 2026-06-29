import { useState, useRef } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ArrowLeft, 
  Pin, 
  MessageSquare, 
  Shield, 
  Info, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  ThumbsUp, 
  Bookmark, 
  Share2, 
  ExternalLink,
  BookOpen,
  Send,
  MoreVertical,
  Flag,
  AlertTriangle,
  User,
  Users,
  Zap,
  HelpCircle as SupportIcon,
  Play
} from "lucide-react";

// Types
export interface ReplyItem {
  id: string;
  author: string;
  role: "Learner" | "Facilitator" | "SUSTAIN LMS";
  avatar: string;
  content: string;
  time: string;
  helpfulCount: number;
  isHelpfulByMe: boolean;
  isSaved: boolean;
}

// Initial Replies Mock Data
const INITIAL_REPLIES: ReplyItem[] = [
  {
    id: "reply-1",
    author: "Aisha Mohammed",
    role: "Learner",
    avatar: "AM",
    content: "I find “Tell me about yourself” difficult because I do not want to say too much. I am practising a short answer that mentions my learning pathway, my interest in work readiness, and one strength I can bring.",
    time: "Today",
    helpfulCount: 4,
    isHelpfulByMe: false,
    isSaved: false
  },
  {
    id: "reply-2",
    author: "Halima Sani",
    role: "Facilitator",
    avatar: "HS",
    content: "That is a good approach, Aisha. Keep it short and focused. You can mention your current learning, one relevant strength, and what kind of opportunity you are preparing for.",
    time: "Today",
    helpfulCount: 7,
    isHelpfulByMe: false,
    isSaved: false
  },
  {
    id: "reply-3",
    author: "Musa Bello",
    role: "Learner",
    avatar: "MB",
    content: "I struggle with questions about weakness. I am trying to answer honestly without sounding negative.",
    time: "Today",
    helpfulCount: 2,
    isHelpfulByMe: false,
    isSaved: false
  },
  {
    id: "reply-4",
    author: "Halima Sani",
    role: "Facilitator",
    avatar: "HS",
    content: "For weakness questions, choose something real but manageable. Then explain what you are doing to improve. That shows self-awareness and learning.",
    time: "Yesterday",
    helpfulCount: 8,
    isHelpfulByMe: false,
    isSaved: false
  },
  {
    id: "reply-5",
    author: "Zainab Ibrahim",
    role: "Learner",
    avatar: "ZI",
    content: "I want to practise giving examples using situation, task, action, and result because it helps me stay organised.",
    time: "Yesterday",
    helpfulCount: 3,
    isHelpfulByMe: false,
    isSaved: false
  },
  {
    id: "reply-6",
    author: "Community note",
    role: "SUSTAIN LMS",
    avatar: "SL",
    content: "Keep replies respectful, practical, and related to the lesson topic. Do not share private contact details or passwords.",
    time: "Yesterday",
    helpfulCount: 0,
    isHelpfulByMe: false,
    isSaved: false
  }
];

// Related discussions
const RELATED_DISCUSSIONS = [
  { id: "rel-1", title: "How to answer “Tell me about yourself”", replies: 14, category: "Tips" },
  { id: "rel-2", title: "Examples for workplace strengths", replies: 9, category: "Examples" },
  { id: "rel-3", title: "Preparing for follow-up questions", replies: 6, category: "Strategy" },
  { id: "rel-4", title: "Staying calm during interviews", replies: 11, category: "Wellness" }
];

// Recent activity
const RECENT_ACTIVITY = [
  { text: "Halima replied to this discussion", time: "Today", type: "reply" },
  { text: "Aisha drafted a reply", time: "Today", type: "draft" },
  { text: "Musa marked a reply helpful", time: "Yesterday", type: "helpful" },
  { text: "Zainab joined the discussion", time: "Yesterday", type: "join" }
];

// -------------------------------------------------------------
// MAIN COMPONENT EXPORT
// -------------------------------------------------------------
export default function LearnerCommunityDiscussionPage() {
  return (
    <>
      <DesktopCommunityDiscussion />
      <TabletCommunityDiscussion />
      <MobileCommunityDiscussion />
    </>
  );
}

// -------------------------------------------------------------
// SHARED INTERACTIVE LOGIC (CUSTOM HOOK)
// -------------------------------------------------------------
function useDiscussionState() {
  const { navigateTo } = useRoute();
  
  // State for discussion replies
  const [replies, setReplies] = useState<ReplyItem[]>(INITIAL_REPLIES);
  
  // Reply Composer field
  const [newReplyText, setNewReplyText] = useState("");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Discussion Save and Helpful states
  const [discussionSaved, setDiscussionSaved] = useState(false);
  const [discussionHelpful, setDiscussionHelpful] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Composer textarea reference
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleScrollToComposer = () => {
    if (composerRef.current) {
      composerRef.current.scrollIntoView({ behavior: "smooth" });
      composerRef.current.focus();
    } else {
      const el = document.getElementById("reply-composer");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        const tx = el.querySelector("textarea");
        if (tx) tx.focus();
      }
    }
  };

  const handleSaveDiscussion = () => {
    setDiscussionSaved(!discussionSaved);
    showToast(
      discussionSaved 
        ? "Discussion removed from your saved list." 
        : "Discussion saved in this frontend prototype.", 
      "success"
    );
  };

  const handleMarkDiscussionHelpful = () => {
    setDiscussionHelpful(!discussionHelpful);
    showToast(
      discussionHelpful 
        ? "Discussion unhelpful action completed." 
        : "Discussion marked helpful in this frontend prototype.", 
      "success"
    );
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim()) {
      showToast("Write a reply before posting.", "info");
      return;
    }

    const newReply: ReplyItem = {
      id: `reply-${Date.now()}`,
      author: "Aisha Mohammed",
      role: "Learner",
      avatar: "AM",
      content: newReplyText.trim(),
      time: "Today",
      helpfulCount: 0,
      isHelpfulByMe: false,
      isSaved: false
    };

    setReplies([...replies, newReply]);
    setNewReplyText("");
    showToast("Reply saved in this frontend prototype.", "success");
  };

  const handleClearDraft = () => {
    setNewReplyText("");
    showToast("Reply draft cleared.", "info");
  };

  const handleToggleHelpfulReply = (id: string) => {
    setReplies(prev => prev.map(r => {
      if (r.id === id) {
        const isHelpfulByMe = !r.isHelpfulByMe;
        return {
          ...r,
          isHelpfulByMe,
          helpfulCount: isHelpfulByMe ? r.helpfulCount + 1 : r.helpfulCount - 1
        };
      }
      return r;
    }));
    showToast("Reply marked helpful in this frontend prototype.", "success");
  };

  const handleReplyToReply = (id: string, author: string) => {
    setNewReplyText(`@${author} `);
    handleScrollToComposer();
    showToast("Reply action opened in this frontend prototype.", "success");
  };

  const handleSaveReply = (id: string) => {
    setReplies(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, isSaved: !r.isSaved };
      }
      return r;
    }));
    showToast("Reply saved in this frontend prototype.", "success");
  };

  const handleReportReply = (id: string) => {
    showToast("Report action simulated in this frontend prototype.", "info");
  };

  return {
    navigateTo,
    replies,
    newReplyText,
    setNewReplyText,
    searchQuery,
    setSearchQuery,
    discussionSaved,
    discussionHelpful,
    toast,
    setToast,
    composerRef,
    handleScrollToComposer,
    handleSaveDiscussion,
    handleMarkDiscussionHelpful,
    handlePostReply,
    handleClearDraft,
    handleToggleHelpfulReply,
    handleReplyToReply,
    handleSaveReply,
    handleReportReply,
    showToast
  };
}

// -------------------------------------------------------------
// REUSABLE SUBCOMPONENTS
// -------------------------------------------------------------

// Top Navigation bar for tablet/mobile
function CompactHeader({ navigateTo, title, showToast }: { navigateTo: (p: any) => void; title: string; showToast: any }) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40">
      <button 
        onClick={() => navigateTo("/learner/community")}
        className="flex items-center gap-1 text-slate-600 font-bold text-xs"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Community</span>
      </button>
      <span className="text-xs font-black text-slate-800 truncate max-w-[180px]">{title}</span>
      <div className="flex items-center gap-2.5">
        <button 
          onClick={() => navigateTo("/learner/notifications")}
          className="p-1 relative text-slate-500"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
        </button>
        <div className="h-5 w-8 rounded-full bg-emerald-900 text-white font-extrabold text-[10px] flex items-center justify-center">
          AM
        </div>
      </div>
    </header>
  );
}

// Toast Alert
function ToastAlert({ toast, onClose }: { toast: { message: string; type: "success" | "info" } | null; onClose: () => void }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-20 right-4 left-4 md:left-auto md:right-8 z-50 bg-slate-900 text-white text-xs px-4 py-3.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 border border-slate-800 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${toast.type === "success" ? "bg-emerald-500 animate-pulse" : "bg-sky-400"}`} />
        <p className="font-semibold text-slate-50">{toast.message}</p>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-white font-bold p-0.5">
        ✕
      </button>
    </div>
  );
}

// Reply row block
function ReplyCard({ reply, onHelpful, onReply, onSave, onReport }: { 
  reply: ReplyItem; 
  onHelpful: () => void; 
  onReply: () => void; 
  onSave: () => void;
  onReport: () => void;
}) {
  const isFacilitator = reply.role === "Facilitator";
  const isSystem = reply.role === "SUSTAIN LMS";
  
  // Style presets
  let cardClass = "p-4.5 rounded-2xl border transition-all hover:border-emerald-200 hover:shadow-sm text-left ";
  if (isFacilitator) {
    cardClass += "border-emerald-150 bg-emerald-50/20";
  } else if (isSystem) {
    cardClass += "border-amber-100 bg-amber-50/20";
  } else {
    cardClass += "border-slate-150 bg-white shadow-3xs";
  }

  return (
    <div className={cardClass}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
            isFacilitator 
              ? "bg-emerald-900 text-white" 
              : isSystem 
                ? "bg-amber-700 text-white" 
                : "bg-slate-100 text-slate-800"
          }`}>
            {reply.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-xs text-slate-900">{reply.author}</span>
              {isFacilitator && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded text-[9px] font-black uppercase tracking-wider">
                  Facilitator
                </span>
              )}
              {isSystem && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded text-[9px] font-black uppercase tracking-wider">
                  Official Note
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 font-medium font-mono mt-0.5">{reply.time}</p>
          </div>
        </div>

        {/* Report option only */}
        {!isSystem && (
          <button 
            onClick={onReport}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Report Reply"
          >
            <Flag className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <p className="text-xs text-slate-700 mt-3 leading-relaxed font-medium whitespace-pre-wrap">
        {reply.content}
      </p>

      {/* Actions row */}
      {!isSystem && (
        <div className="flex items-center gap-4 mt-4.5 pt-3.5 border-t border-slate-100 text-[11px] font-bold text-slate-500">
          <button 
            onClick={onHelpful}
            className={`flex items-center gap-1.5 hover:text-emerald-900 transition-colors cursor-pointer ${
              reply.isHelpfulByMe ? "text-emerald-900" : ""
            }`}
          >
            <ThumbsUp className={`h-3.5 w-3.5 ${reply.isHelpfulByMe ? "fill-emerald-900 stroke-emerald-900" : ""}`} />
            <span>Helpful {reply.helpfulCount > 0 ? `(${reply.helpfulCount})` : ""}</span>
          </button>

          <button 
            onClick={onReply}
            className="flex items-center gap-1.5 hover:text-emerald-900 transition-colors cursor-pointer"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Reply</span>
          </button>

          <button 
            onClick={onSave}
            className={`flex items-center gap-1.5 hover:text-emerald-900 transition-colors ml-auto cursor-pointer ${
              reply.isSaved ? "text-emerald-950 font-black" : ""
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${reply.isSaved ? "fill-emerald-950 stroke-emerald-950" : ""}`} />
            <span>{reply.isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Safe Guidelines Component
function GuidelinesBlock() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-4">
      <div>
        <div className="flex items-center justify-between gap-1.5">
          <h4 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
            <Shield className="h-4.5 w-4.5 text-emerald-900" />
            Safe Participation Guidelines
          </h4>
          <LearnerContextHint 
            title="How this works" 
            text="Community discussions are monitored. Keep your responses constructive and supportive of other learners." 
          />
        </div>
        <p className="text-xs text-slate-400 mt-1">Keep our learning community a helpful, secure workspace.</p>
      </div>

      <ul className="space-y-3.5">
        {[
          "Stay on the lesson topic.",
          "Be respectful when replying to others.",
          "Do not share phone numbers, passwords, verification codes, or private documents.",
          "Ask your facilitator for private help when needed.",
          "Report anything that feels unsafe or inappropriate."
        ].map((line, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-normal font-medium">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 font-extrabold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-100 pt-4">
        <button 
          onClick={() => window.location.hash = "/learner/support"}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors text-center cursor-pointer min-h-[40px] border-none flex items-center justify-center gap-1"
        >
          <SupportIcon className="h-3.5 w-3.5" />
          Open Support
        </button>
      </div>
    </div>
  );
}

// Quick Actions Block
function QuickActionsBlock({ navigateTo }: { navigateTo: (p: any) => void }) {
  const actions = [
    { label: "Back to Community", desc: "View other discussions", path: "/learner/community", icon: Users },
    { label: "Continue Lesson", desc: "Go to active lesson overview", path: "/learner/lessons/preparing-for-interviews", icon: BookOpen },
    { label: "Open Assessment", desc: "Review Work Readiness Assignment", path: "/learner/assessments/work-readiness-assignment", icon: CheckCircle },
    { label: "Open Resources", desc: "Explore low-bandwidth materials", path: "/learner/resources", icon: Zap },
    { label: "Open Support Center", desc: "Ask Halima Sani for help", path: "/learner/support", icon: SupportIcon }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-4">
      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Quick Actions</h4>
      
      <div className="divide-y divide-slate-100">
        {actions.map((act, idx) => {
          const IconComp = act.icon;
          return (
            <button
              key={idx}
              onClick={() => navigateTo(act.path as any)}
              className="w-full flex items-center justify-between py-3 group hover:bg-slate-50/55 transition-colors cursor-pointer text-left focus:outline-none border-none"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="h-8.5 w-8.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-900 group-hover:text-white transition-all">
                  <IconComp className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">{act.label}</p>
                  <p className="text-[10px] text-slate-450 truncate mt-0.5 font-medium">{act.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 1. DESKTOP COMMUNITY DISCUSSION VIEW
// -------------------------------------------------------------
function DesktopCommunityDiscussion() {
  const state = useDiscussionState();

  return (
    <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950">
      <LearnerSidebar />

      {/* Workspace container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-slate-200 px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search discussions, replies, lessons..."
              value={state.searchQuery}
              onChange={(e) => state.setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 pl-11 pr-4 py-2 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button 
              onClick={() => state.navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full animate-pulse" />
            </button>
            <button 
              onClick={() => state.navigateTo("/learner/support")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-150" />
            
            {/* User details */}
            <button 
              onClick={() => state.navigateTo("/learner/profile")}
              className="flex items-center gap-2.5 text-left focus:outline-none hover:opacity-95 transition-opacity cursor-pointer group"
            >
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 transition-colors">Aisha Mohammed</p>
                <p className="text-[10px] text-slate-400 font-mono">SUST-LRN-0442</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-800 flex items-center justify-center font-bold text-xs text-white">
                AM
              </div>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 px-8 py-8 text-left">
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6">
            
            {/* Left Column Content */}
            <div className="space-y-6">
              
              {/* Back breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <button 
                  onClick={() => state.navigateTo("/learner/community")}
                  className="flex items-center gap-1.5 hover:text-emerald-900 transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-500 font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Community
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-450 font-semibold">Work Readiness Foundation</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-800 font-bold">Discussion Detail</span>
              </div>

              {/* SECTION 1 — DISCUSSION HERO */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-6">
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-100 rounded-full text-[10px] font-bold">
                          <Pin className="h-3 w-3 text-amber-700" />
                          Pinned discussion
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-full text-[10px] font-bold">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          Facilitator-led
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                        Interview preparation tips for Work Readiness learners
                      </h2>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Share one difficult interview question and practise preparing a clear, focused answer with your peers and facilitator.
                      </p>
                    </div>

                    {/* Context row */}
                    <div className="border-t border-slate-100 pt-4 mt-6">
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-emerald-800" />
                          <span>Work Readiness Foundation</span>
                        </div>
                        <div className="h-3.5 w-px bg-slate-200" />
                        <div className="flex items-center gap-1.5">
                          <Shield className="h-3.5 w-3.5 text-emerald-800" />
                          <span>Preparing for Interviews</span>
                        </div>
                        <div className="h-3.5 w-px bg-slate-200" />
                        <div className="flex items-center gap-1.5 font-bold text-slate-700">
                          <MessageSquare className="h-3.5 w-3.5 text-emerald-800" />
                          <span>{state.replies.length} replies</span>
                        </div>
                        <div className="h-3.5 w-px bg-slate-200" />
                        <div className="flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5 text-emerald-800" />
                          <span>48 views</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Actions */}
                    <div className="flex items-center gap-3 mt-6">
                      <button 
                        onClick={state.handleScrollToComposer}
                        className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center border-none"
                      >
                        Reply to Discussion
                      </button>
                      <button 
                        onClick={() => state.navigateTo("/learner/community")}
                        className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer min-h-[44px]"
                      >
                        Back to Community
                      </button>
                    </div>
                  </div>

                  {/* Right Column of Hero - Deep Green Panel */}
                  <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-sm p-5.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300">
                        Linked Lesson
                      </span>
                      <h3 className="font-bold text-base text-white mt-2 leading-snug">
                        Preparing for Interviews
                      </h3>
                      <p className="text-xs text-emerald-100 mt-2.5 leading-relaxed">
                        Practise clear answers using examples from your learning, work, volunteering, or community experience.
                      </p>
                    </div>

                    <div className="border-t border-emerald-800/80 pt-4 mt-4 flex items-center justify-between text-[11px] text-emerald-200 font-medium">
                      <span>Work Readiness Foundation</span>
                      <span className="px-2.5 py-0.5 bg-emerald-850 text-emerald-100 rounded text-[9px] font-bold">
                        Current lesson
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 — DISCUSSION PROMPT CARD */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight uppercase">Discussion Prompt</h3>
                  <span className="text-[11px] text-slate-400 font-bold">SUSTAIN LMS Facilitation</span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    HS
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">Halima Sani</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded text-[9px] font-black uppercase tracking-wider">
                        Facilitator
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-450 font-bold font-mono">Today</p>
                    <p className="text-xs text-slate-650 mt-2.5 leading-relaxed font-medium">
                      Preparing for interviews is easier when you practise with real examples from your learning, work, volunteering, or community experience. Use this discussion to share questions, practise short answers, and support each other respectfully.
                    </p>
                  </div>
                </div>

                {/* soft emerald-tinted panel */}
                <div className="p-4.5 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <p className="text-xs text-emerald-950 font-extrabold leading-snug">
                    "Share one interview question you find difficult and how you would prepare a clear answer for it."
                  </p>
                </div>

                {/* Prompt actions */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button 
                    onClick={state.handleSaveDiscussion}
                    className={`bg-white border text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer min-h-[38px] ${
                      state.discussionSaved 
                        ? "border-emerald-800 text-emerald-900 bg-emerald-50" 
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Bookmark className="h-3.5 w-3.5" />
                      {state.discussionSaved ? "Saved" : "Save Discussion"}
                    </span>
                  </button>
                  <button 
                    onClick={state.handleMarkDiscussionHelpful}
                    className={`bg-white border text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer min-h-[38px] ${
                      state.discussionHelpful 
                        ? "border-emerald-800 text-emerald-900 bg-emerald-50" 
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {state.discussionHelpful ? "Helpful ✓" : "Mark as Helpful"}
                    </span>
                  </button>
                </div>
              </div>

              {/* SECTION 3 — REPLY COMPOSER */}
              <div id="reply-composer" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight uppercase">Add Your Reply</h3>
                  <p className="text-xs text-slate-400 mt-1">Keep your reply respectful, practical, and related to the lesson.</p>
                </div>

                <form onSubmit={state.handlePostReply} className="space-y-4">
                  <textarea
                    ref={state.composerRef}
                    rows={4}
                    value={state.newReplyText}
                    onChange={(e) => state.setNewReplyText(e.target.value)}
                    placeholder="Write your reply about interview preparation..."
                    className="w-full bg-slate-50 text-slate-900 p-4 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all min-h-[100px]"
                  />

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start gap-2.5">
                    <Info className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Do not share passwords, personal contact details, or private documents.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2.5">
                    <button 
                      type="button"
                      onClick={state.handleClearDraft}
                      className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px]"
                    >
                      Clear Draft
                    </button>
                    <button 
                      type="submit"
                      className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer border-none min-h-[38px] flex items-center gap-1.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Post Reply
                    </button>
                  </div>
                </form>
              </div>

              {/* SECTION 4 — DISCUSSION REPLIES */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight uppercase">Replies</h3>
                  <p className="text-xs text-slate-400 mt-1">Learner and facilitator responses in this discussion.</p>
                </div>

                <div className="space-y-4">
                  {state.replies.map(reply => (
                    <ReplyCard 
                      key={reply.id}
                      reply={reply}
                      onHelpful={() => state.handleToggleHelpfulReply(reply.id)}
                      onReply={() => state.handleReplyToReply(reply.id, reply.author)}
                      onSave={() => state.handleSaveReply(reply.id)}
                      onReport={() => state.handleReportReply(reply.id)}
                    />
                  ))}
                </div>
              </div>

              {/* SECTION 5 — SAFE PARTICIPATION GUIDELINES */}
              <GuidelinesBlock />

            </div>

            {/* Right Column Content */}
            <div className="space-y-6">
              
              {/* RIGHT COLUMN CARD 1 — DISCUSSION STATUS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-4">Discussion Status</h4>
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="font-extrabold text-amber-800">Pinned discussion</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Replies</span>
                    <span className="font-extrabold text-slate-800">{state.replies.length}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Views</span>
                    <span className="font-extrabold text-slate-800">48 views</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Facilitator</span>
                    <span className="font-bold text-slate-800">Halima Sani</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Linked lesson</span>
                    <span className="font-bold text-emerald-900">Preparing for Interviews</span>
                  </div>
                </div>
                <button 
                  onClick={() => state.navigateTo("/learner/lessons/preparing-for-interviews")}
                  className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl border-none transition-all cursor-pointer min-h-[44px]"
                >
                  Continue Lesson
                </button>
              </div>

              {/* RIGHT COLUMN CARD 2 — LINKED LEARNING CONTEXT */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-4">Linked Learning Context</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Course</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Foundation</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Lesson</span>
                    <p className="font-bold text-slate-800 mt-0.5">Preparing for Interviews</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Assessment</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Assignment</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Certificate</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Certificate</p>
                  </div>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => state.navigateTo("/learner/lessons/preparing-for-interviews")}
                    className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center min-h-[40px] border-none flex items-center justify-center"
                  >
                    Continue Lesson
                  </button>
                  <button 
                    onClick={() => state.navigateTo("/learner/assessments/work-readiness-assignment")}
                    className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center min-h-[40px] flex items-center justify-center"
                  >
                    Open Assessment
                  </button>
                  <button 
                    onClick={() => state.navigateTo("/learner/certificates")}
                    className="w-full text-[11px] font-bold text-slate-500 hover:text-slate-800 text-center cursor-pointer bg-transparent border-none p-1.5"
                  >
                    View Certificate Track
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN CARD 3 — SUPPORT CENTER CARD */}
              <LearnerSupportCard />

              {/* RIGHT COLUMN CARD 4 — RELATED DISCUSSIONS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-3">Related Discussions</h4>
                <div className="divide-y divide-slate-100">
                  {RELATED_DISCUSSIONS.map((disc) => (
                    <button
                      key={disc.id}
                      onClick={() => state.showToast("Discussion opened in this frontend prototype.", "success")}
                      className="w-full text-left py-2.5 block group hover:bg-slate-50/50 rounded-lg p-1.5 transition-colors focus:outline-none border-none"
                    >
                      <span className="text-[9px] font-bold text-emerald-850 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wide">
                        {disc.category}
                      </span>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 transition-colors mt-1.5 line-clamp-1 leading-snug">
                        {disc.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{disc.replies} replies</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN CARD 5 — RECENT COMMUNITY ACTIVITY */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-4">Recent Community Activity</h4>
                <div className="space-y-3.5">
                  {RECENT_ACTIVITY.map((act, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <p className="text-slate-700 truncate pr-2 leading-relaxed">{act.text}</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                        {act.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN CARD 6 — QUICK ACTIONS */}
              <QuickActionsBlock navigateTo={state.navigateTo} />

            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastAlert toast={state.toast} onClose={() => state.setToast(null)} />
    </div>
  );
}

// -------------------------------------------------------------
// 2. TABLET COMMUNITY DISCUSSION VIEW
// -------------------------------------------------------------
function TabletCommunityDiscussion() {
  const state = useDiscussionState();

  return (
    <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      {/* Compact header */}
      <CompactHeader navigateTo={state.navigateTo} title="Discussion Detail" showToast={state.showToast} />

      {/* Main tablet workspace */}
      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        
        {/* Discussion Hero */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-100 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase">
              Pinned discussion
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase">
              Facilitator-led
            </span>
          </div>
          
          <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
            Interview preparation tips for Work Readiness learners
          </h2>
          <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
            Share one difficult interview question and practise preparing a clear, focused answer.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4.5 pt-3.5 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
            <span>Work Readiness Foundation</span>
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span>Preparing for Interviews</span>
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span className="font-bold text-slate-700">{state.replies.length} replies</span>
            <span className="h-1 w-1 bg-slate-300 rounded-full" />
            <span>48 views</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button 
              onClick={state.handleScrollToComposer}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] border-none"
            >
              Reply to Discussion
            </button>
            <button 
              onClick={() => state.navigateTo("/learner/community")}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer min-h-[44px]"
            >
              Back to Community
            </button>
          </div>
        </div>

        {/* Deep Green Panel inside the Hero context */}
        <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-sm p-5 text-left flex flex-col justify-between h-40">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-300">Linked Lesson</span>
            <h3 className="font-bold text-sm text-white mt-1 leading-snug">Preparing for Interviews</h3>
            <p className="text-xs text-emerald-100 mt-1.5 leading-relaxed">
              Practise clear answers using examples from your learning, work, volunteering, or community experience.
            </p>
          </div>
          <div className="border-t border-emerald-850 pt-3 mt-3 text-[10px] text-emerald-200 flex items-center justify-between font-bold uppercase">
            <span>Work Readiness Foundation</span>
            <span>Current lesson</span>
          </div>
        </div>

        {/* Discussion Prompt */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Discussion Prompt</h3>
            <span className="text-[10px] text-slate-400 font-extrabold">Halima Sani</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-emerald-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
              HS
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs">Halima Sani <span className="text-[9px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded ml-1 uppercase">Facilitator</span></p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">Today</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Preparing for interviews is easier when you practise with real examples from your learning, work, volunteering, or community experience. Use this discussion to share questions, practise short answers, and support each other respectfully.
          </p>

          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
            <p className="text-xs text-emerald-950 font-extrabold leading-relaxed">
              "Share one interview question you find difficult and how you would prepare a clear answer for it."
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-1.5">
            <button 
              onClick={state.handleSaveDiscussion}
              className={`bg-white border text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer min-h-[38px] ${
                state.discussionSaved 
                  ? "border-emerald-800 text-emerald-900 bg-emerald-50" 
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5 inline mr-1" />
              {state.discussionSaved ? "Saved" : "Save"}
            </button>
            <button 
              onClick={state.handleMarkDiscussionHelpful}
              className={`bg-white border text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer min-h-[38px] ${
                state.discussionHelpful 
                  ? "border-emerald-800 text-emerald-900 bg-emerald-50" 
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5 inline mr-1" />
              {state.discussionHelpful ? "Helpful" : "Mark Helpful"}
            </button>
          </div>
        </div>

        {/* Reply Composer */}
        <div id="tablet-reply-composer" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Add Your Reply</h3>
            <p className="text-xs text-slate-400 mt-1">Keep your reply respectful, practical, and related to the lesson.</p>
          </div>

          <form onSubmit={state.handlePostReply} className="space-y-4">
            <textarea
              rows={4}
              value={state.newReplyText}
              onChange={(e) => state.setNewReplyText(e.target.value)}
              placeholder="Write your reply about interview preparation..."
              className="w-full bg-slate-50 text-slate-900 p-4 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all min-h-[100px]"
            />

            <div className="flex items-center justify-end gap-2.5">
              <button 
                type="button"
                onClick={state.handleClearDraft}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px]"
              >
                Clear Draft
              </button>
              <button 
                type="submit"
                className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer border-none min-h-[38px]"
              >
                Post Reply
              </button>
            </div>
          </form>
        </div>

        {/* Replies */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Replies</h3>
            <p className="text-xs text-slate-400 mt-1">Learner and facilitator responses in this discussion.</p>
          </div>

          <div className="space-y-4.5">
            {state.replies.map(reply => (
              <ReplyCard 
                key={reply.id}
                reply={reply}
                onHelpful={() => state.handleToggleHelpfulReply(reply.id)}
                onReply={() => state.handleReplyToReply(reply.id, reply.author)}
                onSave={() => state.handleSaveReply(reply.id)}
                onReport={() => state.handleReportReply(reply.id)}
              />
            ))}
          </div>
        </div>

        {/* Safe Guidelines */}
        <GuidelinesBlock />

        {/* Discussion Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-3.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Discussion Status</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Status</span>
              <p className="font-extrabold text-amber-800 mt-0.5">Pinned discussion</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Replies</span>
              <p className="font-extrabold text-slate-800 mt-0.5">{state.replies.length}</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Views</span>
              <p className="font-extrabold text-slate-800 mt-0.5">48 views</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Facilitator</span>
              <p className="font-bold text-slate-800 mt-0.5">Halima Sani</p>
            </div>
          </div>
          <div className="pt-2">
            <button 
              onClick={() => state.navigateTo("/learner/lessons/preparing-for-interviews")}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl border-none transition-all cursor-pointer min-h-[44px]"
            >
              Continue Lesson
            </button>
          </div>
        </div>

        {/* Linked Learning Context */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-4">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Linked Learning Context</h4>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Course</span>
              <p className="font-extrabold text-slate-850 mt-0.5">Work Readiness Foundation</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Lesson</span>
              <p className="font-extrabold text-slate-850 mt-0.5">Preparing for Interviews</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Assessment</span>
              <p className="font-extrabold text-slate-850 mt-0.5">Work Readiness Assignment</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Certificate</span>
              <p className="font-extrabold text-slate-850 mt-0.5">Work Readiness Certificate</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3.5 pt-3 border-t border-slate-100">
            <button 
              onClick={() => state.navigateTo("/learner/lessons/preparing-for-interviews")}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center min-h-[44px] border-none"
            >
              Continue Lesson
            </button>
            <button 
              onClick={() => state.navigateTo("/learner/assessments/work-readiness-assignment")}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer text-center min-h-[44px]"
            >
              Open Assessment
            </button>
          </div>
        </div>

        {/* Support Card */}
        <LearnerSupportCard />

        {/* Related discussions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Related Discussions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
            {RELATED_DISCUSSIONS.map((disc) => (
              <button
                key={disc.id}
                onClick={() => state.showToast("Discussion opened in this frontend prototype.", "success")}
                className="text-left p-4.5 bg-slate-50 border border-slate-200 rounded-xl block hover:border-emerald-200 transition-all focus:outline-none border-none"
              >
                <span className="text-[9px] font-black bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded">
                  {disc.category}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-2 line-clamp-1 leading-snug">
                  {disc.title}
                </p>
                <p className="text-[10px] text-slate-450 mt-1 font-medium">{disc.replies} replies</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5.5 text-left space-y-4">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Recent Community Activity</h4>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            {RECENT_ACTIVITY.map((act, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <p className="text-slate-700 truncate pr-2 leading-relaxed">{act.text}</p>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded shrink-0">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActionsBlock navigateTo={state.navigateTo} />

      </div>

      {/* Navigation */}
      <LearnerMobileNav />

      {/* Toast */}
      <ToastAlert toast={state.toast} onClose={() => state.setToast(null)} />
    </div>
  );
}

// -------------------------------------------------------------
// 3. MOBILE COMMUNITY DISCUSSION VIEW
// -------------------------------------------------------------
function MobileCommunityDiscussion() {
  const state = useDiscussionState();

  return (
    <div className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      {/* Compact header */}
      <CompactHeader navigateTo={state.navigateTo} title="Discussion Detail" showToast={state.showToast} />

      {/* Stacked content body */}
      <div className="px-4 py-4 space-y-5">
        
        {/* Discussion Hero */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="bg-amber-50 text-amber-900 border border-amber-100 rounded px-2 py-0.5 text-[8px] font-black uppercase">
              Pinned
            </span>
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-100 rounded px-2 py-0.5 text-[8px] font-black uppercase">
              Facilitator-led
            </span>
          </div>

          <h2 className="text-lg font-black text-slate-900 leading-snug">
            Interview preparation tips for Work Readiness learners
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Share one difficult interview question and practise preparing a clear, focused answer.
          </p>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-3">
            <span>Work Readiness Foundation</span>
            <span className="h-1 w-1 bg-slate-200 rounded-full" />
            <span className="text-slate-600">{state.replies.length} replies</span>
            <span className="h-1 w-1 bg-slate-200 rounded-full" />
            <span>48 views</span>
          </div>

          <div className="space-y-2 pt-2">
            <button 
              onClick={state.handleScrollToComposer}
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] border-none"
            >
              Reply to Discussion
            </button>
            <button 
              onClick={() => state.navigateTo("/learner/community")}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer min-h-[44px]"
            >
              Back to Community
            </button>
          </div>
        </div>

        {/* Linked Lesson context card */}
        <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-850 p-4.5 text-left h-36 flex flex-col justify-between">
          <div>
            <span className="text-[8px] tracking-wider font-extrabold text-emerald-300 uppercase block">Linked Lesson</span>
            <h3 className="font-bold text-sm text-white mt-1 leading-snug">Preparing for Interviews</h3>
            <p className="text-[11px] text-emerald-100 mt-1 leading-relaxed line-clamp-2">
              Practise clear answers using examples from your learning, work, volunteering, or community experience.
            </p>
          </div>
          <p className="text-[9px] text-emerald-300 font-bold uppercase border-t border-emerald-800/80 pt-2.5">
            Work Readiness Foundation • Current lesson
          </p>
        </div>

        {/* Discussion Prompt */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <h3 className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider">Discussion Prompt</h3>
            <span className="text-[10px] text-slate-400 font-bold">HS • Today</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8.5 w-8.5 rounded-full bg-emerald-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
              HS
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs">Halima Sani <span className="text-[8px] bg-emerald-50 text-emerald-900 px-1 py-0.5 rounded ml-1 font-black">FACILITATOR</span></p>
              <p className="text-[9px] text-slate-400 font-medium">Cohort Lead</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Preparing for interviews is easier when you practise with real examples from your learning, work, volunteering, or community experience. Use this discussion to share questions, practise short answers, and support each other respectfully.
          </p>

          <div className="p-4 bg-emerald-50/50 border border-emerald-150/40 rounded-xl">
            <p className="text-xs text-emerald-950 font-extrabold leading-relaxed">
              "Share one interview question you find difficult and how you would prepare a clear answer for it."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={state.handleSaveDiscussion}
              className={`border text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px] ${
                state.discussionSaved 
                  ? "border-emerald-800 text-emerald-900 bg-emerald-50" 
                  : "border-slate-200 text-slate-700 bg-white"
              }`}
            >
              Save Prompt
            </button>
            <button 
              onClick={state.handleMarkDiscussionHelpful}
              className={`border text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px] ${
                state.discussionHelpful 
                  ? "border-emerald-800 text-emerald-900 bg-emerald-50" 
                  : "border-slate-200 text-slate-700 bg-white"
              }`}
            >
              {state.discussionHelpful ? "Helpful ✓" : "Helpful?"}
            </button>
          </div>
        </div>

        {/* Reply Composer */}
        <div id="mobile-reply-composer" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-3.5">
          <div>
            <h3 className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider">Add Your Reply</h3>
            <p className="text-xs text-slate-400 mt-0.5">Keep your reply respectful, practical, and related to the lesson.</p>
          </div>

          <form onSubmit={state.handlePostReply} className="space-y-3.5">
            <textarea
              rows={4}
              value={state.newReplyText}
              onChange={(e) => state.setNewReplyText(e.target.value)}
              placeholder="Write your reply about interview preparation..."
              className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all min-h-[100px]"
            />

            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={state.handleClearDraft}
                className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px]"
              >
                Clear
              </button>
              <button 
                type="submit"
                className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer border-none min-h-[38px]"
              >
                Post Reply
              </button>
            </div>
          </form>
        </div>

        {/* Discussion Replies */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider">Replies</h3>
            <p className="text-xs text-slate-400 mt-0.5">Responses from your cohort.</p>
          </div>

          <div className="space-y-3.5">
            {state.replies.map(reply => (
              <ReplyCard 
                key={reply.id}
                reply={reply}
                onHelpful={() => state.handleToggleHelpfulReply(reply.id)}
                onReply={() => state.handleReplyToReply(reply.id, reply.author)}
                onSave={() => state.handleSaveReply(reply.id)}
                onReport={() => state.handleReportReply(reply.id)}
              />
            ))}
          </div>
        </div>

        {/* Safe Guidelines */}
        <GuidelinesBlock />

        {/* Discussion Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Discussion Status</h4>
          <div className="space-y-2 text-xs font-semibold">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status</span>
              <span className="text-amber-800 font-extrabold">Pinned</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Replies</span>
              <span className="text-slate-800 font-extrabold">{state.replies.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Views</span>
              <span className="text-slate-800 font-extrabold">48</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Facilitator</span>
              <span className="text-slate-850">Halima Sani</span>
            </div>
          </div>
          <button 
            onClick={() => state.navigateTo("/learner/lessons/preparing-for-interviews")}
            className="w-full mt-3 bg-slate-100 text-slate-800 font-bold text-xs py-2.5 rounded-xl border-none transition-all cursor-pointer min-h-[44px]"
          >
            Continue Lesson
          </button>
        </div>

        {/* Linked Learning Context */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-3.5">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Learning Context</h4>
          <div className="space-y-2 text-xs font-semibold">
            <div>
              <span className="text-[9px] text-slate-400 uppercase">Course</span>
              <p className="font-extrabold text-slate-800 mt-0.5">Work Readiness Foundation</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase">Lesson</span>
              <p className="font-extrabold text-slate-800 mt-0.5">Preparing for Interviews</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase">Assessment</span>
              <p className="font-extrabold text-slate-800 mt-0.5">Work Readiness Assignment</p>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button 
              onClick={() => state.navigateTo("/learner/lessons/preparing-for-interviews")}
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center min-h-[44px] border-none"
            >
              Continue Lesson
            </button>
            <button 
              onClick={() => state.navigateTo("/learner/assessments/work-readiness-assignment")}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer text-center min-h-[44px]"
            >
              Open Assessment
            </button>
          </div>
        </div>

        {/* Support card */}
        <LearnerSupportCard />

        {/* Related discussions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Related</h4>
          <div className="space-y-2.5">
            {RELATED_DISCUSSIONS.map((disc) => (
              <button
                key={disc.id}
                onClick={() => state.showToast("Discussion opened in this frontend prototype.", "success")}
                className="w-full text-left p-3.5 bg-slate-50 border border-slate-200 rounded-xl block transition-all focus:outline-none border-none"
              >
                <span className="text-[8px] font-black bg-emerald-50 text-emerald-900 px-1.5 py-0.5 rounded uppercase">
                  {disc.category}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-1.5 leading-snug">
                  {disc.title}
                </p>
                <p className="text-[9px] text-slate-400 mt-0.5 font-medium">{disc.replies} replies</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 text-left space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Activity</h4>
          <div className="space-y-2.5 text-xs font-semibold">
            {RECENT_ACTIVITY.map((act, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <p className="text-slate-600 truncate pr-2 leading-relaxed">{act.text}</p>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded shrink-0">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActionsBlock navigateTo={state.navigateTo} />

      </div>

      {/* Fixed mobile nav */}
      <LearnerMobileNav />

      {/* Toast Alert */}
      <ToastAlert toast={state.toast} onClose={() => state.setToast(null)} />
    </div>
  );
}
