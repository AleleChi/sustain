import React, { useState, useRef } from "react";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  FileText, 
  Award, 
  BookOpen, 
  Clock, 
  Shield, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  Trash2, 
  CheckCircle2, 
  User, 
  AlertTriangle 
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";

interface Message {
  id: string;
  sender: string;
  role: "Learner" | "System note" | "Facilitator";
  time: string;
  text: string;
}

export default function LearnerSupportRequestPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [replyText, setReplyText] = useState("");
  
  // Local state for the conversation thread
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "Aisha Mohammed",
      role: "Learner",
      time: "Yesterday",
      text: "I completed the required learning activities and started the Work Readiness Assignment. I want to understand what still needs to happen before my certificate can be reviewed."
    },
    {
      id: "msg-2",
      sender: "SUSTAIN LMS",
      role: "System note",
      time: "Yesterday",
      text: "Support request created in this frontend prototype. No real message was sent."
    },
    {
      id: "msg-3",
      sender: "Halima Sani",
      role: "Facilitator",
      time: "Today",
      text: "Your certificate record is ready for review, but the Work Readiness Assignment still needs to be submitted and reviewed. Once the assignment is reviewed, the pending CPD credits can be confirmed and your certificate record can move to the next stage."
    },
    {
      id: "msg-4",
      sender: "Halima Sani",
      role: "Facilitator",
      time: "Today",
      text: "Suggested next step: continue the Work Readiness Assignment and submit it when ready. You can also review the Certificate & CPD page for your current record."
    },
    {
      id: "msg-5",
      sender: "SUSTAIN LMS",
      role: "System note",
      time: "Today",
      text: "This support conversation is simulated for the frontend prototype. Do not share passwords, verification codes, or private documents here."
    }
  ]);

  const composerRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleScrollToComposer = () => {
    composerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const textarea = document.getElementById("reply-textarea");
    if (textarea) {
      textarea.focus();
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) {
      showToast("Write a reply before sending.", "info");
      return;
    }

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "Aisha Mohammed",
      role: "Learner",
      time: "Just now",
      text: replyText
    };

    setMessages([...messages, newMsg]);
    setReplyText("");
    showToast("Support reply saved in this frontend prototype.", "success");
  };

  const handleClearDraft = () => {
    setReplyText("");
    showToast("Reply draft cleared.", "info");
  };

  const handleCopyRequestId = () => {
    navigator.clipboard.writeText("SUP-2026-0184");
    showToast("Support request ID copied in this frontend prototype.", "success");
  };

  // Reusable sub-components to ensure perfect dry structure
  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      <button 
        onClick={() => navigateTo("/learner/support")} 
        className="hover:text-emerald-900 transition-colors"
      >
        Support Center
      </button>
      <ChevronRight className="h-3 w-3 text-slate-400" />
      <span className="text-slate-400">Certificate & CPD</span>
      <ChevronRight className="h-3 w-3 text-slate-400" />
      <span className="text-slate-700 font-bold">Request</span>
    </div>
  );

  const renderToast = () => {
    if (!toast) return null;
    return (
      <div 
        id="support-request-toast"
        className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-950 text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-2xl border border-slate-850 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm"
      >
        <div className={`h-2 w-2 rounded-full ${toast.type === "success" ? "bg-emerald-400" : "bg-amber-400"} shrink-0`} />
        <span className="flex-1 leading-normal">{toast.message}</span>
        <button 
          onClick={() => setToast(null)}
          className="ml-2 hover:text-slate-300 transition-colors p-1"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  };

  // Section 1: Support Request Hero
  const renderHeroSection = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6">
          {/* Hero Left */}
          <div className="space-y-4">
            {renderBreadcrumbs()}
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Response received
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                Normal priority
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
                Certificate readiness review question
              </h1>
              <p className="text-sm text-slate-500 font-normal leading-relaxed">
                Review the facilitator response and next steps linked to your certificate record.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 rounded-xl p-3">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Request ID:</span>
                <span className="font-mono text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-150">SUP-2026-0184</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Certificate:</span>
                <span className="text-slate-800">Work Readiness Certificate</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Assigned:</span>
                <span className="text-slate-800">Halima Sani</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Updated:</span>
                <span className="text-slate-800">Today</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={handleScrollToComposer}
                className="bg-emerald-900 text-white hover:bg-emerald-800 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md font-semibold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <MessageSquare className="h-4 w-4" />
                Reply to Support
              </button>
              <button 
                onClick={() => navigateTo("/learner/support")}
                className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md font-semibold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <ArrowLeft className="h-4 w-4 text-slate-500" />
                Back to Support Center
              </button>
            </div>
          </div>

          {/* Hero Right: Deep green support panel */}
          <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-sm p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/90 bg-emerald-950/60 px-2.5 py-1 rounded-md inline-block">
                Suggested Next Step
              </span>
              <h3 className="text-base font-bold tracking-tight text-white">
                Continue Assessment
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Submit the Work Readiness Assignment when you are ready to trigger the certificate review.
              </p>
            </div>
            
            <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between text-[11px] font-bold text-emerald-200">
              <span>CPD Status</span>
              <span className="bg-emerald-950/60 px-2 py-0.5 rounded font-mono text-white">
                4 credits pending review
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section 2: Facilitator Response Summary
  const renderFacilitatorResponseSection = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Facilitator Response
          </h2>
          <span className="text-xs font-semibold text-slate-500">Today</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-900 text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm shrink-0">
            HS
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Halima Sani</span>
                <span className="bg-emerald-550/10 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100/60 bg-emerald-50">
                  Facilitator
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Assigned Facilitator • Kano Cohort 02</p>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-xl">
              "Your certificate record is ready for review, but the Work Readiness Assignment still needs to be submitted and reviewed. Once the assignment is reviewed, the pending CPD credits can be confirmed and your certificate record can move to the next stage."
            </p>

            {/* Suggested next step in a soft emerald-tinted panel */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                Suggested next step:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Continue the Work Readiness Assignment and submit it when ready. Then check the Certificate & CPD page for review progress.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button 
                onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                className="bg-emerald-900 text-white hover:bg-emerald-800 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md font-semibold text-xs py-2 px-3.5 rounded-xl min-h-[38px] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Continue Assessment
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => navigateTo("/learner/certificates/work-readiness-certificate")}
                className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md font-semibold text-xs py-2 px-3.5 rounded-xl min-h-[38px] flex items-center justify-center cursor-pointer"
              >
                View Certificate Track
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Section 3: Message Thread
  const renderMessageThreadSection = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">Support Conversation</h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">Messages and system notes for this request.</p>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => {
            const isLearner = msg.role === "Learner";
            const isSystem = msg.role === "System note";
            const isFacilitator = msg.role === "Facilitator";

            let cardStyle = "bg-white border border-slate-200";
            let roleBadge = "bg-slate-100 text-slate-700 border-slate-200";
            let avatarStyle = "bg-slate-200 text-slate-700";

            if (isLearner) {
              cardStyle = "bg-white border border-slate-200";
              roleBadge = "bg-blue-50 text-blue-800 border-blue-100";
              avatarStyle = "bg-emerald-900 text-white";
            } else if (isSystem) {
              cardStyle = "bg-slate-50/70 border border-slate-100 text-slate-700 p-4 rounded-xl";
              roleBadge = "bg-amber-50 text-amber-800 border-amber-100";
              avatarStyle = "bg-slate-400 text-white";
            } else if (isFacilitator) {
              cardStyle = "bg-emerald-50/20 border border-emerald-100/80";
              roleBadge = "bg-emerald-50 text-emerald-900 border-emerald-100";
              avatarStyle = "bg-emerald-950 text-white";
            }

            return (
              <div 
                key={msg.id} 
                className={`p-4 rounded-xl space-y-3 transition-colors ${cardStyle}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs tracking-wide shrink-0 ${avatarStyle}`}>
                      {msg.sender === "Aisha Mohammed" ? "AM" : msg.sender === "Halima Sani" ? "HS" : "SYS"}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{msg.sender}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${roleBadge}`}>
                          {msg.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs text-slate-750 leading-relaxed font-normal">
                  {msg.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Section 4: Reply Composer
  const renderReplyComposerSection = () => {
    return (
      <div ref={composerRef} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Reply to Support</h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">Add a follow-up question for your facilitator in this frontend prototype.</p>
        </div>

        <form onSubmit={handleSendReply} className="space-y-4">
          <div className="relative">
            <textarea
              id="reply-textarea"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your follow-up question..."
              rows={4}
              className="w-full border border-slate-200 bg-slate-50/50 text-slate-800 text-xs rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all placeholder:text-slate-400 min-h-[100px] leading-relaxed font-normal"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 border border-slate-100 rounded-xl p-3.5">
            <p className="text-[10px] text-slate-500 max-w-sm font-normal leading-relaxed flex items-start gap-1.5">
              <Shield className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Do not share passwords, verification codes, private documents, or personal contact details.
              </span>
            </p>
            
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={handleClearDraft}
                className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-[11px] py-2 px-3.5 rounded-lg min-h-[36px] flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.99] transition-all"
              >
                <Trash2 className="h-3.5 w-3.5 text-slate-500" />
                Clear Draft
              </button>
              <button
                type="submit"
                className="bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-[11px] py-2 px-4 rounded-lg min-h-[36px] flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.99] transition-all"
              >
                <Send className="h-3.5 w-3.5" />
                Send Reply
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  // Section 5: Linked Request Context
  const renderLinkedRequestContextSection = () => {
    const contextItems = [
      {
        id: "course",
        title: "Current Course",
        value: "Work Readiness Foundation",
        detail: "Current lesson: Preparing for Interviews",
        icon: BookOpen,
        iconBg: "bg-blue-50 text-blue-900 border-blue-100",
        action: () => navigateTo("/learner/lessons/preparing-for-interviews"),
        actionText: "Continue Lesson"
      },
      {
        id: "assessment",
        title: "Current Assessment",
        value: "Work Readiness Assignment",
        detail: "Status: Draft started",
        icon: FileText,
        iconBg: "bg-amber-50 text-amber-900 border-amber-100",
        action: () => navigateTo("/learner/assessments/work-readiness-assignment"),
        actionText: "Open Assessment"
      },
      {
        id: "certificate",
        title: "Certificate",
        value: "Work Readiness Certificate",
        detail: "Status: Ready for certificate review",
        icon: Award,
        iconBg: "bg-emerald-50 text-emerald-900 border-emerald-100",
        action: () => navigateTo("/learner/certificates/work-readiness-certificate"),
        actionText: "View Certificate Track"
      },
      {
        id: "cpd",
        title: "CPD Record",
        value: "22 of 35 credits",
        detail: "4 pending review",
        icon: CheckCircle2,
        iconBg: "bg-purple-50 text-purple-900 border-purple-100",
        action: () => navigateTo("/learner/certificates/work-readiness-certificate"),
        actionText: "View Certificate Track"
      }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Linked Request Context</h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">Quick access to the learning records referenced in this request.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contextItems.map((item) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.id} 
                className="p-4 border border-slate-150 bg-slate-50/50 rounded-xl flex flex-col justify-between space-y-4 transition-all duration-200 hover:border-emerald-200"
              >
                <div className="flex gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center border shrink-0 ${item.iconBg}`}>
                    <IconComp className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">{item.title}</span>
                    <h4 className="text-xs font-bold text-slate-950 mt-0.5">{item.value}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{item.detail}</p>
                  </div>
                </div>

                <button 
                  onClick={item.action}
                  className="w-full text-left bg-white hover:bg-slate-50 border border-slate-250 text-slate-800 text-[11px] font-semibold py-2 px-3 rounded-lg flex items-center justify-between group cursor-pointer transition-colors"
                >
                  <span>{item.actionText}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Section 6: Safe Support Guidance
  const renderSafeSupportSection = () => {
    const rules = [
      "Keep login details private.",
      "Do not share verification codes or reset links.",
      "Do not upload private documents in this frontend prototype.",
      "Use support for learning, assessment, certificate, or CPD questions.",
      "Report unsafe or inappropriate behaviour."
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Safe Support Guidance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-650 leading-relaxed font-normal">
              <Shield className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button 
            onClick={() => navigateTo("/learner/support")}
            className="bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5"
          >
            Open Support Center
          </button>
        </div>
      </div>
    );
  };

  // Side columns / Stacked context elements
  const renderRequestStatusCard = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
        Request Status
      </h3>
      
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-semibold">Request ID</span>
          <span className="font-mono text-slate-800 font-bold">SUP-2026-0184</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-semibold">Status</span>
          <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded font-bold border border-amber-100 text-[10px]">
            Response received
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-semibold">Category</span>
          <span className="text-slate-800 font-bold">Certificate & CPD</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-semibold">Priority</span>
          <span className="text-slate-800 font-bold">Normal</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-semibold">Assigned to</span>
          <span className="text-slate-800 font-bold">Halima Sani</span>
        </div>
      </div>

      <button 
        onClick={handleCopyRequestId}
        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] transition-all"
      >
        <Copy className="h-4 w-4 text-slate-500" />
        Copy Request ID
      </button>
    </div>
  );

  const renderNextStepsCard = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
        Next Steps
      </h3>

      <div className="space-y-3">
        {[
          "Continue the Work Readiness Assignment.",
          "Submit when ready.",
          "Wait for facilitator review.",
          "Check Certificate & CPD for progress."
        ].map((step, idx) => (
          <div key={idx} className="flex gap-3 text-xs">
            <span className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-900 flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">
              {idx + 1}
            </span>
            <span className="text-slate-650 leading-relaxed font-normal">{step}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-2">
        <button 
          onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] transition-all duration-200 hover:-translate-y-0.5"
        >
          Continue Assessment
        </button>
        <button 
          onClick={() => navigateTo("/learner/certificates/work-readiness-certificate")}
          className="w-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
        >
          View Certificate Track
        </button>
      </div>
    </div>
  );

  const renderRelatedLearningContextCard = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
        Related Learning Context
      </h3>

      <div className="space-y-2.5 text-xs text-slate-650">
        <div className="flex justify-between">
          <span className="font-semibold text-slate-500">Course</span>
          <span className="text-slate-850 font-bold text-right max-w-[180px] truncate">Work Readiness Foundation</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-500">Lesson</span>
          <span className="text-slate-850 font-bold text-right max-w-[180px] truncate">Preparing for Interviews</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-500">Assessment</span>
          <span className="text-slate-850 font-bold text-right max-w-[180px] truncate">Work Readiness Assignment</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-500">Certificate</span>
          <span className="text-slate-850 font-bold text-right max-w-[180px] truncate">Work Readiness Certificate</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-500">CPD Credits</span>
          <span className="text-slate-850 font-bold font-mono">22 of 35 credits</span>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100">
        <button 
          onClick={() => navigateTo("/learner/lessons/preparing-for-interviews")}
          className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center cursor-pointer transition-all"
        >
          Continue Lesson
        </button>
        <button 
          onClick={() => navigateTo("/learner/resources")}
          className="w-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold text-xs py-2.5 px-4 rounded-xl min-h-[40px] flex items-center justify-center cursor-pointer transition-all"
        >
          Open Resources
        </button>
      </div>
    </div>
  );

  const renderRecentSupportActivityCard = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
      <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
        Recent Support Activity
      </h3>

      <div className="space-y-3.5 relative before:absolute before:left-2 before:top-2.5 before:bottom-2 before:w-px before:bg-slate-150">
        {[
          { label: "Facilitator response received", time: "Today" },
          { label: "Certificate request reviewed", time: "Today" },
          { label: "Support request created", time: "Yesterday" },
          { label: "Certificate track viewed", time: "Yesterday" }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-3 relative">
            <div className="h-4 w-4 rounded-full bg-white border-2 border-emerald-900/80 shadow-sm flex items-center justify-center shrink-0 mt-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-900" />
            </div>
            <div className="space-y-0.5 text-xs">
              <p className="font-bold text-slate-850 leading-none">{item.label}</p>
              <p className="text-[10px] text-slate-400 font-medium font-mono">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuickActionsCard = () => {
    const actions = [
      { 
        label: "Back to Support Center", 
        helper: "Open standard ticketing view", 
        path: "/learner/support" as const 
      },
      { 
        label: "Continue Assessment", 
        helper: "Submit assignment draft", 
        path: "/learner/assessments/work-readiness-assignment" as const 
      },
      { 
        label: "View Certificate Track", 
        helper: "Verify cpd credit requirements", 
        path: "/learner/certificates/work-readiness-certificate" as const 
      },
      { 
        label: "Open Resources", 
        helper: "Browse training PDF / videos", 
        path: "/learner/resources" as const 
      },
      { 
        label: "Open Community", 
        helper: "Discuss topics with cohort peers", 
        path: "/learner/community" as const 
      }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Quick Actions
        </h3>

        <div className="space-y-2">
          {actions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(act.path)}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-150 rounded-xl flex items-center justify-between text-left group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:border-emerald-200 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-550/5 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-emerald-900 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">{act.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium leading-tight">{act.helper}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {renderToast()}

      {/* -------------------------------------------------------------------------
          1. DESKTOP SUPPORT REQUEST (hidden lg:flex)
          ------------------------------------------------------------------------- */}
      <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950">
        {/* Sidebar */}
        <LearnerSidebar />

        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Top Header */}
          <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-40 shrink-0">
            <div className="relative w-96">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search support requests, certificates, CPD..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 text-slate-800 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:border-emerald-900 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-5">
              <button 
                onClick={() => navigateTo("/learner/notifications")}
                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition-colors relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </button>
              <button 
                onClick={() => navigateTo("/learner/support")}
                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-slate-200" />
              
              <button 
                onClick={() => navigateTo("/learner/profile")}
                className="flex items-center gap-3 text-left focus:outline-none group hover:opacity-90 transition-opacity cursor-pointer"
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800 leading-none group-hover:text-emerald-900 transition-colors">Aisha Mohammed</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">SUST-LRN-0442</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm">
                  AM
                </div>
              </button>
            </div>
          </header>

          {/* Main Layout Area */}
          <main className="flex-1 p-8 overflow-y-auto space-y-6">
            {/* Grid layout containing two-column breakdown */}
            <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
              {/* Left Main Stream */}
              <div className="space-y-6">
                {renderHeroSection()}
                {renderFacilitatorResponseSection()}
                {renderMessageThreadSection()}
                {renderReplyComposerSection()}
                {renderLinkedRequestContextSection()}
                {renderSafeSupportSection()}
              </div>

              {/* Right Column Context */}
              <div className="space-y-6">
                {renderRequestStatusCard()}
                {renderNextStepsCard()}
                {renderRelatedLearningContextCard()}
                
                {/* Approved global emerald Support Center card */}
                <LearnerSupportCard />
                
                {renderRecentSupportActivityCard()}
                {renderQuickActionsCard()}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* -------------------------------------------------------------------------
          2. TABLET SUPPORT REQUEST (hidden md:block lg:hidden)
          ------------------------------------------------------------------------- */}
      <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
        {/* Tablet Learner Header */}
        <header className="px-6 h-16 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner/support")}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block leading-none">SUSTAIN LMS</span>
              <h2 className="text-sm font-bold text-slate-900">Support Request Details</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition-colors relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </button>
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="h-8 w-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shadow-sm cursor-pointer"
            >
              AM
            </button>
          </div>
        </header>

        {/* Tablet Content Area */}
        <main className="max-w-4xl mx-auto px-5 py-6 space-y-6">
          {renderHeroSection()}
          {renderFacilitatorResponseSection()}
          {renderMessageThreadSection()}
          {renderReplyComposerSection()}
          {renderLinkedRequestContextSection()}
          {renderSafeSupportSection()}
          
          {/* Stack Supporting Cards below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {renderRequestStatusCard()}
            {renderNextStepsCard()}
            {renderRelatedLearningContextCard()}
            <LearnerSupportCard />
            {renderRecentSupportActivityCard()}
            {renderQuickActionsCard()}
          </div>
        </main>

        {/* Fixed Bottom Learner Nav */}
        <LearnerMobileNav />
      </div>

      {/* -------------------------------------------------------------------------
          3. MOBILE SUPPORT REQUEST (md:hidden)
          ------------------------------------------------------------------------- */}
      <div className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
        {/* Compact Mobile Header */}
        <header className="px-4 h-14 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateTo("/learner/support")}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
            </button>
            <span className="text-xs font-bold text-slate-900 font-sans">Request Detail</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1 text-slate-500 relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-emerald-600" />
            </button>
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="h-7 w-7 rounded-full bg-emerald-900 text-white flex items-center justify-center font-extrabold text-[10px] tracking-wide shadow-sm cursor-pointer"
            >
              AM
            </button>
          </div>
        </header>

        {/* Mobile Content Stack */}
        <main className="px-4 py-4 space-y-5">
          {renderHeroSection()}
          {renderFacilitatorResponseSection()}
          {renderMessageThreadSection()}
          {renderReplyComposerSection()}
          {renderLinkedRequestContextSection()}
          {renderSafeSupportSection()}
          
          {/* Side Panels Stacked */}
          {renderRequestStatusCard()}
          {renderNextStepsCard()}
          {renderRelatedLearningContextCard()}
          <LearnerSupportCard />
          {renderRecentSupportActivityCard()}
          {renderQuickActionsCard()}
        </main>

        {/* Fixed Bottom Learner Nav */}
        <LearnerMobileNav />
      </div>
    </div>
  );
}
