import { useState, useEffect } from "react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { 
  Mail, 
  Plus, 
  Search, 
  Filter, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  FileText, 
  Lock, 
  ChevronRight, 
  Clock, 
  Download, 
  Share2, 
  Send, 
  Users, 
  AlertTriangle,
  RotateCcw,
  BookOpen,
  X,
  User,
  Activity,
  Award
} from "lucide-react";
import { FacilitatorMobileActionMenu, ActionMenuItem } from "./components/FacilitatorMobileActionMenu";

interface Ticket {
  id: string;
  learner: string;
  avatar: string;
  category: string;
  relatedArea: string;
  status: "In Progress" | "Escalated" | "Resolved" | "Open";
  priority: "Low" | "Medium" | "High" | "Urgent";
  lastUpdate: string;
  learnerId: string;
  growthIndex: string;
  recentProgress: string;
  issueDescription: string;
  issueDetails: string;
  reportedVia: string;
  createdDate: string;
  cohort: string;
  diagnostics: {
    browser: string;
    network: string;
    status: string;
  };
  internalNotes: string;
  timeline: { time: string; title: string; desc: string }[];
  checklist: { label: string; checked: boolean }[];
  recommendedAction: string;
  recommendedCopy: string;
}

const initialTickets: Ticket[] = [
  {
    id: "SUP-2026-00491",
    learner: "Aisha Mohammed",
    avatar: "AM",
    category: "Assessment Support",
    relatedArea: "Work Readiness Assignment",
    status: "In Progress",
    priority: "Medium",
    lastUpdate: "2 hours ago",
    learnerId: "AM-26-0922",
    growthIndex: "82%",
    recentProgress: "4 of 5 modules completed",
    issueDescription: "Unable to upload assessment file",
    issueDetails: "I have tried uploading my Work Readiness Assignment three times now. It keeps saying ‘File size too large’ even though it is only a 2MB PDF. I need this to complete Module 4.",
    reportedVia: "Mobile App",
    createdDate: "Oct 24, 2026 • 14:15 PM",
    cohort: "Kano 02",
    diagnostics: {
      browser: "Chrome Mobile 114.0",
      network: "MTN Nigeria 3G/Low Bandwidth",
      status: "Timeout during POST /api/upload"
    },
    internalNotes: "Discussed with lead dev—this is a known issue for files over 4MB on certain mobile networks. Advised user to try during off-peak hours.",
    timeline: [
      { time: "Today, 14:15 PM", title: "Ticket Created by Aisha Mohammed", desc: "Unable to upload assignment..." },
      { time: "Today, 15:30 PM", title: "Viewed by Halima Sani", desc: "Accessed learner question queue" },
      { time: "Today, 15:45 PM", title: "Private note added", desc: "Coordinating with engineering lead" }
    ],
    checklist: [
      { label: "Review learner’s uploaded file attempts", checked: true },
      { label: "Send troubleshooting guide", checked: false },
      { label: "Verify file size compatibility", checked: false },
      { label: "Final approval of submission", checked: false }
    ],
    recommendedAction: "Respond to Aisha’s Assessment Support Ticket",
    recommendedCopy: "Recommended solution: Provide the “Low-Bandwidth Upload Guide” and offer manual submission via email if the error persists."
  },
  {
    id: "SUP-2026-00488",
    learner: "Zainab Usman",
    avatar: "ZU",
    category: "Download Support",
    relatedArea: "Module 3 Audio Guide",
    status: "Escalated",
    priority: "High",
    lastUpdate: "5 hours ago",
    learnerId: "ZU-26-0811",
    growthIndex: "74%",
    recentProgress: "2 of 5 modules completed",
    issueDescription: "Unable to download resource files",
    issueDetails: "I cannot download the Module 3 Audio Guide. The link is loading forever. I am currently in a low coverage area.",
    reportedVia: "SMS Gateway",
    createdDate: "Oct 24, 2026 • 11:30 AM",
    cohort: "Kaduna Agribusiness Cohort",
    diagnostics: {
      browser: "Opera Mini 65",
      network: "Airtel Nigeria 2G",
      status: "Connection aborted by peer"
    },
    internalNotes: "Zainab requested audio transcriptions. Shared the written Module 3 notes via Whatsapp as an immediate workaround.",
    timeline: [
      { time: "Yesterday, 11:30 AM", title: "Ticket created by Zainab Usman via SMS", desc: "Download error for Module 3 Audio Guide" },
      { time: "Yesterday, 14:00 PM", title: "Escalated to Delivery Lead by Halima Sani", desc: "Needs alternative delivery format" }
    ],
    checklist: [
      { label: "Confirm resource accessibility", checked: true },
      { label: "Check network logs", checked: false },
      { label: "Trigger SMS text alternatives", checked: false }
    ],
    recommendedAction: "Send Zainab the compressed low-bandwidth audio files or SMS transcription.",
    recommendedCopy: "Recommended solution: Provide Zainab with SMS-based content or direct link to low-resolution audio file."
  },
  {
    id: "SUP-2026-00485",
    learner: "Ibrahim Bello",
    avatar: "IB",
    category: "Technical Issue",
    relatedArea: "Login / Password Reset",
    status: "Resolved",
    priority: "Low",
    lastUpdate: "1 day ago",
    learnerId: "IB-26-0155",
    growthIndex: "80%",
    recentProgress: "3 of 5 modules completed",
    issueDescription: "Spam filter blocks password link",
    issueDetails: "I forgot my password and the reset link is not arriving in my inbox. Please help me access my account.",
    reportedVia: "Web Portal",
    createdDate: "Oct 23, 2026 • 09:00 AM",
    cohort: "Lagos Market Access Cohort",
    diagnostics: {
      browser: "Edge Mobile 112",
      network: "9mobile 3G",
      status: "Resolved"
    },
    internalNotes: "Resolved. User confirmed successful login using the temporary password.",
    timeline: [
      { time: "Oct 23, 09:00 AM", title: "Password reset request created", desc: "Automated alert from portal" },
      { time: "Oct 23, 10:00 AM", title: "Temporary credentials sent via SMS", desc: "Manual bypass triggered" },
      { time: "Oct 23, 11:30 AM", title: "Marked as Resolved by Halima Sani", desc: "User success confirmed" }
    ],
    checklist: [
      { label: "Look up email logs", checked: true },
      { label: "Trigger manual password reset", checked: true },
      { label: "Send temporary credentials", checked: true }
    ],
    recommendedAction: "Manually reset password and send temporary password via SMS.",
    recommendedCopy: "Recommended solution: Reset the password to a temp string and SMS it to the verified phone number."
  },
  {
    id: "TK-8821",
    learner: "John Doe",
    avatar: "JD",
    category: "Assessment Support",
    relatedArea: "Final Assessment Submission Error",
    status: "Open",
    priority: "Urgent",
    lastUpdate: "Today, 09:12 AM",
    learnerId: "JD-26-1104",
    growthIndex: "88%",
    recentProgress: "92% Complete",
    issueDescription: "File size limit exceeded on PDF project",
    issueDetails: "The system keeps saying ‘File size exceeds limit’ but the file is only 4.2MB. I’ve tried resizing twice.",
    reportedVia: "Mobile Web",
    createdDate: "Oct 26, 2026 • 09:12 AM",
    cohort: "Lagos Market Access Cohort",
    diagnostics: {
      browser: "Chrome Mobile 114.0",
      network: "MTN Nigeria 3G/Low Bandwidth",
      status: "Timeout during POST /api/upload"
    },
    internalNotes: "Advised user to compress the PDF using standard online tools.",
    timeline: [
      { time: "Today, 09:12 AM", title: "Ticket created by John Doe", desc: "Final assessment upload timeout" }
    ],
    checklist: [
      { label: "Verified file-size limit", checked: true },
      { label: "Reset attempt counter", checked: false }
    ],
    recommendedAction: "Assign this ticket to the Regional Technical Lead for server-side manual upload.",
    recommendedCopy: "Recommended solution: Provide temporary direct Google Drive upload link or bypass validation rules."
  },
  {
    id: "TK-8819",
    learner: "Sarah Aliyu",
    avatar: "SA",
    category: "Certificate / CPD",
    relatedArea: "Certificate Name Correction",
    status: "Open",
    priority: "Medium",
    lastUpdate: "Today, 10:45 AM",
    learnerId: "SA-26-0309",
    growthIndex: "95%",
    recentProgress: "100% Complete",
    issueDescription: "Middle name change on CPD certificate",
    issueDetails: "Request to change middle name on the generated CPD certificate from Aliyu to Aliyu-Bello.",
    reportedVia: "Web Portal",
    createdDate: "Oct 26, 2026 • 10:45 AM",
    cohort: "Kano 02",
    diagnostics: {
      browser: "Safari Mobile 16.2",
      network: "Wifi (Broadband)",
      status: "None"
    },
    internalNotes: "Sarah provided her national ID card as proof. The change is valid and ready for regional admin approval.",
    timeline: [
      { time: "Today, 10:45 AM", title: "Name correction request submitted", desc: "Middle name Aliyu to Aliyu-Bello" }
    ],
    checklist: [
      { label: "Verify identity document", checked: true },
      { label: "Update name in database", checked: false }
    ],
    recommendedAction: "Approve the name change and regenerate the PDF certificate.",
    recommendedCopy: "Recommended solution: Verify identity document, correct the name in student records, and trigger manual regeneration."
  }
];

export function FacilitatorSupportTicketsPage() {
  const { navigateTo, showToast } = useRoute();
  
  // Responsive check
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set default selection based on device (Aisha on desktop, John Doe on mobile)
  const [selectedTicketId, setSelectedTicketId] = useState<string>(() => {
    return window.innerWidth < 1024 ? "TK-8821" : "SUP-2026-00491";
  });

  // Stateful list of tickets to allow dynamic CRUD interactions
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [cohortFilter, setCohortFilter] = useState("Kano 02");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Response Editor State
  const [editorText, setEditorText] = useState("");
  const [notifySms, setNotifySms] = useState(false);
  const [markPriority, setMarkPriority] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);

  // Private note state
  const [internalNoteInput, setInternalNoteInput] = useState("");

  // Modals & Drawers
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  // Create Ticket Form states
  const [newLearner, setNewLearner] = useState("Aisha Mohammed");
  const [newCohort, setNewCohort] = useState("Kano 02");
  const [newCategory, setNewCategory] = useState("Assessment Support");
  const [newRelatedArea, setNewRelatedArea] = useState("");
  const [newPriority, setNewPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium");
  const [newIssueSummary, setNewIssueSummary] = useState("");
  const [newReportedVia, setNewReportedVia] = useState("Mobile App");
  const [newDetailedNotes, setNewDetailedNotes] = useState("");
  const [newAssignTo, setNewAssignTo] = useState("Facilitator Support");
  const [newNotifyLearner, setNewNotifyLearner] = useState(false);
  const [newMarkPriorityCheck, setNewMarkPriorityCheck] = useState(false);
  const [newLinkFollowUp, setNewLinkFollowUp] = useState(false);
  const [newAddPrivateNote, setNewAddPrivateNote] = useState(false);

  // Escalation Form states
  const [escalationReason, setEscalationReason] = useState("Repeated technical issue");
  const [escalationNotes, setEscalationNotes] = useState("");
  const [escalationAssignTo, setEscalationAssignTo] = useState("Regional Technical Lead");
  const [escNotifyLead, setEscNotifyLead] = useState(false);
  const [escKeepCopied, setEscKeepCopied] = useState(true);
  const [escMarkEscalated, setEscMarkEscalated] = useState(true);

  // Computed selected ticket details
  const currentSelectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  // Filters computed locally
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.learner.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" ? true : t.status === statusFilter;
    const matchesCategory = categoryFilter === "All Categories" ? true : t.category === categoryFilter;
    const matchesCohort = cohortFilter === "All" || !cohortFilter ? true : t.cohort === cohortFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesCohort;
  });

  // Handler Actions
  const handleReviewOpenTickets = () => {
    setStatusFilter("Open");
    const openTickets = tickets.filter(t => t.status === "Open");
    if (openTickets.length > 0) {
      setSelectedTicketId(openTickets[0].id);
    }
    showToast("Showing open support tickets.");
    
    // Scroll smoothly to queue
    const targetId = isMobile ? "mobile-active-queue" : "support-tickets-table-section";
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStatusCardClick = (status: "Open" | "In Progress" | "Escalated" | "Resolved") => {
    setStatusFilter(status);
    const matched = tickets.filter(t => t.status === status);
    if (matched.length > 0) {
      setSelectedTicketId(matched[0].id);
    }
    
    let label = "open";
    if (status === "In Progress") label = "in-progress";
    if (status === "Escalated") label = "escalated";
    if (status === "Resolved") label = "resolved";
    showToast(`Showing ${label} tickets.`);

    const targetId = isMobile ? "mobile-active-queue" : "support-tickets-table-section";
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleApplyFilters = () => {
    showToast("Support ticket filters applied in this frontend prototype.");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setCohortFilter("All");
    setStatusFilter("All Statuses");
    setCategoryFilter("All Categories");
  };

  const handleSelectTicket = (id: string) => {
    setSelectedTicketId(id);
    const targetId = isMobile ? "mobile-draft-response-section" : "ticket-respond-section";
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDraftAutoResponse = () => {
    const name = currentSelectedTicket.learner.split(" ")[0];
    setEditorText(`Hi ${name}, thanks for reporting this. Please try compressing the PDF or uploading it again using the low-bandwidth upload option. I have also attached the low-bandwidth guide. If the issue continues, we will escalate it to technical support.`);
    showToast("Suggested response drafted locally.");
  };

  const handleSaveDraft = () => {
    showToast("Ticket response draft saved locally in this frontend prototype.");
  };

  const handleCancel = () => {
    setEditorText("");
    setSelectedAttachments([]);
  };

  const handleSendResponse = () => {
    if (!editorText.trim()) {
      showToast("Please write a response first.");
      return;
    }
    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          timeline: [
            { time: "Just now", title: "Response sent by Halima Sani", desc: editorText },
            ...t.timeline
          ]
        };
      }
      return t;
    }));
    setEditorText("");
    setSelectedAttachments([]);
    showToast("Support response sent locally in this frontend prototype.");
  };

  const handleToggleAttachment = (name: string) => {
    setSelectedAttachments(prev => {
      if (prev.includes(name)) {
        return prev.filter(item => item !== name);
      } else {
        showToast("Attachment selected for response.");
        return [...prev, name];
      }
    });
  };

  const handleSavePrivateNote = () => {
    if (!internalNoteInput.trim()) {
      showToast("Please enter a private note first.");
      return;
    }
    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          internalNotes: internalNoteInput,
          timeline: [
            { time: "Just now", title: "Private note added", desc: internalNoteInput },
            ...t.timeline
          ]
        };
      }
      return t;
    }));
    setInternalNoteInput("");
    showToast("Private note saved locally in this frontend prototype.");
  };

  const handleConfirmEscalation = () => {
    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          status: "Escalated",
          timeline: [
            { time: "Just now", title: "Ticket Escalated to Regional Support", desc: `${escalationReason}: ${escalationNotes}` },
            ...t.timeline
          ]
        };
      }
      return t;
    }));
    setIsEscalateModalOpen(false);
    showToast("Ticket escalation updated locally in this frontend prototype.");
  };

  const handleCreateTicketSubmit = () => {
    const newId = `SUP-2026-00${Math.floor(Math.random() * 900) + 100}`;
    const avatarInitials = newLearner === "General cohort issue" 
      ? "GC" 
      : newLearner.split(" ").map(n => n[0]).join("");

    const newTicket: Ticket = {
      id: newId,
      learner: newLearner,
      avatar: avatarInitials,
      category: newCategory,
      relatedArea: newRelatedArea || "General Workspace",
      status: "Open",
      priority: newPriority,
      lastUpdate: "Just now",
      learnerId: "LN-26-0" + Math.floor(Math.random() * 900 + 100),
      growthIndex: "85%",
      recentProgress: "3 of 5 modules completed",
      issueDescription: newIssueSummary || "Reported support request",
      issueDetails: newDetailedNotes || "No detailed issue logs specified.",
      reportedVia: newReportedVia,
      createdDate: "Oct 26, 2026 • 14:55 PM",
      cohort: newCohort,
      diagnostics: {
        browser: "Chrome Mobile 114.0",
        network: "MTN Nigeria 3G",
        status: "None"
      },
      internalNotes: newAddPrivateNote ? "Private note requested on initialization." : "",
      timeline: [
        { time: "Just now", title: "Ticket Created locally", desc: newIssueSummary || "Reported via Support portal" }
      ],
      checklist: [
        { label: "Review learner issue details", checked: false },
        { label: "Reach out to learner", checked: false }
      ],
      recommendedAction: `Respond to ${newLearner}'s support request`,
      recommendedCopy: "Recommended solution: Review issue details and respond accordingly."
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicketId(newId);
    setIsCreateModalOpen(false);
    showToast("Support ticket created locally in this frontend prototype.");
  };

  const handleOpenLinkedFollowUp = () => {
    navigateTo("/facilitator/follow-up-queue" as RoutePath);
    setTimeout(() => {
      showToast("Linked follow-up opened in this frontend prototype.");
    }, 150);
  };

  const handleExportWeekly = () => {
    navigateTo("/facilitator/reports" as RoutePath);
    setTimeout(() => {
      showToast("Weekly ticket report export simulated in this frontend prototype.");
    }, 150);
  };

  const handleThematicChipClick = (category: string, label: string) => {
    setCategoryFilter(category);
    showToast(`Showing ${label} support tickets.`);
  };

  const handleApplyRecommendation = () => {
    setEditorText(currentSelectedTicket.recommendedCopy);
    if (!selectedAttachments.includes("Low-Bandwidth Guide")) {
      setSelectedAttachments(prev => [...prev, "Low-Bandwidth Guide"]);
    }
    showToast("Recommendation applied locally in this frontend prototype.");
    
    const targetId = isMobile ? "mobile-draft-response-section" : "ticket-respond-section";
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // FAB Menu items
  const fabItems: ActionMenuItem[] = [
    { key: "review_open", label: "Review open tickets", icon: CheckCircle2 },
    { key: "create_ticket", label: "Create support ticket", icon: Plus },
    { key: "respond_curr", label: "Respond to current ticket", icon: Send },
    { key: "escalate_t", label: "Escalate ticket", icon: AlertTriangle }
  ];

  const handleFABActionSelect = (key: string) => {
    switch (key) {
      case "review_open":
        handleReviewOpenTickets();
        break;
      case "create_ticket":
        setIsCreateModalOpen(true);
        break;
      case "respond_curr":
        const draftElem = document.getElementById("mobile-draft-response-section");
        if (draftElem) draftElem.scrollIntoView({ behavior: "smooth" });
        break;
      case "escalate_t":
        setIsEscalateModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-20 lg:pb-10 font-sans">
      
      {/* ==========================================
          DESKTOP VIEWPORT
          ========================================== */}
      {!isMobile && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
          
          {/* SECTION 1 — HEADER + TICKET STATUS CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col lg:flex-row justify-between items-stretch gap-6">
            
            {/* Header Content Left */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Support Tickets
                </h1>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] font-bold border border-slate-150">
                    Programme: <span className="text-[#005C45]">SUSTAIN CPD</span>
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] font-bold border border-slate-150">
                    Cohort: <span className="text-[#005C45]">Kano 02</span>
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[11px] font-bold border border-slate-150">
                    Facilitator: <span className="text-[#005C45]">Halima Sani</span>
                  </span>
                  <span className="bg-emerald-50 text-[#005C45] px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-150">
                    Open: <span className="font-extrabold">{tickets.filter(t => t.status === "Open").length}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button 
                  onClick={handleReviewOpenTickets}
                  className="bg-[#005C45] hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors duration-200"
                >
                  Review Open Tickets
                </button>
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-white hover:bg-emerald-50 text-[#005C45] border border-emerald-150 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors duration-200"
                >
                  Create Support Ticket
                </button>
              </div>
            </div>

            {/* Ticket Status Right Card */}
            <div className="w-full lg:w-96 bg-emerald-50/40 border border-emerald-100 rounded-xl p-5 flex flex-col justify-between">
              <h2 className="text-xs font-extrabold text-[#005C45] uppercase tracking-widest border-b border-emerald-100/50 pb-2 flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-[#005C45]" />
                Ticket Status
              </h2>
              <div className="grid grid-cols-4 gap-2 pt-4 text-center">
                <div 
                  onClick={() => handleStatusCardClick("Open")}
                  className="bg-white/80 border border-slate-200 hover:border-emerald-200 hover:shadow-sm hover:bg-emerald-50/40 rounded-lg p-2 cursor-pointer transition-all duration-200"
                >
                  <div className="text-[10px] text-slate-500 font-bold leading-none">Open</div>
                  <div className="text-lg font-extrabold text-slate-800 mt-1">{tickets.filter(t => t.status === "Open").length}</div>
                </div>
                <div 
                  onClick={() => handleStatusCardClick("In Progress")}
                  className="bg-white/80 border border-slate-200 hover:border-emerald-200 hover:shadow-sm hover:bg-emerald-50/40 rounded-lg p-2 cursor-pointer transition-all duration-200"
                >
                  <div className="text-[10px] text-slate-500 font-bold leading-none">In Prog</div>
                  <div className="text-lg font-extrabold text-slate-800 mt-1">{tickets.filter(t => t.status === "In Progress").length}</div>
                </div>
                <div 
                  onClick={() => handleStatusCardClick("Escalated")}
                  className="bg-white/80 border border-slate-200 hover:border-emerald-200 hover:shadow-sm hover:bg-emerald-50/40 rounded-lg p-2 cursor-pointer transition-all duration-200"
                >
                  <div className="text-[10px] text-slate-500 font-bold leading-none">Esc</div>
                  <div className="text-lg font-extrabold text-red-650 mt-1">{tickets.filter(t => t.status === "Escalated").length}</div>
                </div>
                <div 
                  onClick={() => handleStatusCardClick("Resolved")}
                  className="bg-white/80 border border-slate-200 hover:border-emerald-200 hover:shadow-sm hover:bg-emerald-50/40 rounded-lg p-2 cursor-pointer transition-all duration-200"
                >
                  <div className="text-[10px] text-slate-500 font-bold leading-none">Res</div>
                  <div className="text-lg font-extrabold text-[#005C45] mt-1">{tickets.filter(t => t.status === "Resolved").length}</div>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 2 — SUPPORT METRIC CARDS */}
          <div className="grid grid-cols-3 gap-4">
            <div 
              onClick={() => handleStatusCardClick("Open")}
              className="bg-white border border-slate-200 rounded-xl p-4.5 flex items-center gap-4.5 hover:border-emerald-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-[#005C45]" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-bold tracking-wide">Open Tickets</div>
                <div className="text-2xl font-black text-slate-900 leading-none mt-1">{tickets.filter(t => t.status === "Open").length}</div>
              </div>
            </div>

            <div 
              onClick={() => handleStatusCardClick("In Progress")}
              className="bg-white border border-slate-200 rounded-xl p-4.5 flex items-center gap-4.5 hover:border-emerald-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-[#005C45]" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-bold tracking-wide">In Progress</div>
                <div className="text-2xl font-black text-slate-900 leading-none mt-1">{tickets.filter(t => t.status === "In Progress").length}</div>
              </div>
            </div>

            <div 
              onClick={() => handleStatusCardClick("Escalated")}
              className="bg-white border border-slate-200 rounded-xl p-4.5 flex items-center gap-4.5 hover:border-emerald-200 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-bold tracking-wide">Escalated</div>
                <div className="text-2xl font-black text-red-650 leading-none mt-1">{tickets.filter(t => t.status === "Escalated").length}</div>
              </div>
            </div>
          </div>

          {/* SECTION 3 — FIND SUPPORT TICKETS FILTER PANEL */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#005C45]" />
                Find Support Tickets
              </h3>
              <button 
                onClick={handleResetFilters}
                className="text-xs font-bold text-[#005C45] hover:text-emerald-900 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ticket ID or Learner"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-700 font-medium outline-none transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Cohort
                </label>
                <select 
                  value={cohortFilter}
                  onChange={(e) => setCohortFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
                >
                  <option value="All">All Cohorts</option>
                  <option value="Kano 02">Kano 02</option>
                  <option value="Kaduna Agribusiness Cohort">Kaduna Agribusiness</option>
                  <option value="Lagos Market Access Cohort">Lagos Market Access</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Escalated">Escalated</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <button 
                  onClick={handleApplyFilters}
                  className="w-full bg-[#005C45] hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded-lg text-xs cursor-pointer transition-colors duration-150 text-center"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 4 — SUPPORT TICKETS TABLE */}
          <div id="support-tickets-table-section" className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Ticket</th>
                    <th className="px-6 py-4">Learner</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Related Area</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Last Update</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTickets.map((t) => {
                    const isSelected = t.id === selectedTicketId;
                    
                    let statusColor = "bg-slate-100 text-slate-700 border-slate-200";
                    if (t.status === "In Progress") {
                      statusColor = "bg-blue-50 text-blue-700 border-blue-200";
                    } else if (t.status === "Escalated") {
                      statusColor = "bg-red-50 text-red-650 border-red-200";
                    } else if (t.status === "Resolved") {
                      statusColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
                    } else if (t.status === "Open") {
                      statusColor = "bg-amber-50 text-amber-800 border-amber-200";
                    }

                    let priorityDot = "bg-slate-400";
                    if (t.priority === "High" || t.priority === "Urgent") {
                      priorityDot = "bg-red-500";
                    } else if (t.priority === "Medium") {
                      priorityDot = "bg-amber-500";
                    } else {
                      priorityDot = "bg-slate-400";
                    }

                    return (
                      <tr 
                        key={t.id}
                        onClick={() => setSelectedTicketId(t.id)}
                        className={`transition-colors duration-205 cursor-pointer hover:bg-emerald-50/20 ${
                          isSelected ? "bg-emerald-50/40 relative border-l-4 border-l-[#005C45]" : ""
                        }`}
                      >
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">{t.id}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             <div className="h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center text-[10px] font-extrabold text-[#005C45]">
                               {t.avatar}
                             </div>
                             <span className="font-bold text-slate-800">{t.learner}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-600">{t.category}</td>
                        <td className="px-6 py-4 text-slate-500 font-medium">{t.relatedArea}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block border rounded-sm px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${statusColor}`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`h-2 w-2 rounded-full ${priorityDot}`} />
                            <span className="font-bold text-slate-700 text-[10px]">{t.priority}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium">{t.lastUpdate}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTicket(t.id);
                            }}
                            className="text-[#005C45] hover:text-emerald-950 hover:underline font-extrabold cursor-pointer"
                          >
                            {t.status === "Resolved" ? "View" : "Manage"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-slate-400 font-medium">
                        No support tickets found matching current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 5 — TICKET DETAILS CARD ROW */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* Ticket Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Ticket Summary
                </h4>
                <span className="bg-slate-100 text-slate-700 font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                  {currentSelectedTicket.id}
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Issue Type</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{currentSelectedTicket.issueDescription}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reported Via</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{currentSelectedTicket.reportedVia}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Created Date</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{currentSelectedTicket.createdDate}</div>
                </div>
              </div>
            </div>

            {/* Learner Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Learner Summary
                </h4>
                <div className="h-5 w-5 rounded-full bg-emerald-50 flex items-center justify-center text-[8px] font-black text-[#005C45]">
                  {currentSelectedTicket.avatar}
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Learner Name</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{currentSelectedTicket.learner}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID</div>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">{currentSelectedTicket.learnerId}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Growth Index</div>
                    <div className="text-xs font-black text-[#005C45] mt-0.5">{currentSelectedTicket.growthIndex}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Recent Progress</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{currentSelectedTicket.recentProgress}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Need */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-1">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Support Need
                  </h4>
                </div>
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-3 text-xs text-slate-600 italic leading-relaxed">
                  “{currentSelectedTicket.issueDetails}”
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-sm border border-blue-100">
                  Connectivity Issue
                </span>
                <span className="bg-blue-50 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-sm border border-blue-100">
                  Technical Constraint
                </span>
              </div>
            </div>

          </div>

          {/* SECTION 6 — RECOMMENDED / CHECKLIST / RESPONSE */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Recommendations side */}
            <div className="col-span-5 space-y-6 flex flex-col justify-between">
              
              {/* Recommended Action Card */}
              <div className="bg-white border border-dashed border-emerald-300 rounded-2xl p-5 space-y-3 hover:border-emerald-500 hover:shadow-md transition-all duration-200">
                <h4 className="text-xs font-black text-[#005C45] uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Recommended Action
                </h4>
                <p className="text-xs font-black text-slate-800">
                  {currentSelectedTicket.recommendedAction}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {currentSelectedTicket.recommendedCopy}
                </p>
                <button 
                  onClick={handleApplyRecommendation}
                  className="bg-white hover:bg-emerald-50 text-[#005C45] border border-emerald-200 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-all duration-150 inline-block"
                >
                  Apply Recommendation
                </button>
              </div>

              {/* Resolution Checklist Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5">
                  Resolution Checklist
                </h4>
                <div className="space-y-3 my-4">
                  {currentSelectedTicket.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div 
                        onClick={() => {
                          setTickets(prev => prev.map(t => {
                            if (t.id === selectedTicketId) {
                              const newList = [...t.checklist];
                              newList[idx] = { ...newList[idx], checked: !newList[idx].checked };
                              return { ...t, checklist: newList };
                            }
                            return t;
                          }));
                        }}
                        className={`h-4.5 w-4.5 rounded-sm flex items-center justify-center border cursor-pointer transition-colors ${
                          item.checked 
                            ? "bg-emerald-50 border-emerald-300 text-[#005C45]" 
                            : "border-slate-300 hover:border-emerald-500"
                        }`}
                      >
                        {item.checked && <Check className="h-3 w-3 stroke-[3px]" />}
                      </div>
                      <span className="text-xs text-slate-600 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Respond To Ticket side */}
            <div id="ticket-respond-section" className="col-span-7">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#005C45]" />
                    Respond to Ticket
                  </h4>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={notifySms}
                        onChange={(e) => setNotifySms(e.target.checked)}
                        className="h-3.5 w-3.5 text-[#005C45] rounded-xs border-slate-300 focus:ring-[#005C45]" 
                      />
                      Notify via SMS
                    </label>
                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={markPriority}
                        onChange={(e) => setMarkPriority(e.target.checked)}
                        className="h-3.5 w-3.5 text-[#005C45] rounded-xs border-slate-300 focus:ring-[#005C45]" 
                      />
                      Mark as Priority
                    </label>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <textarea 
                    value={editorText}
                    onChange={(e) => setEditorText(e.target.value)}
                    rows={6}
                    placeholder={`Type your response to ${currentSelectedTicket.learner} here...`}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 leading-relaxed outline-none transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50 focus:bg-white resize-none"
                  />

                  {/* Recommended attachments */}
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Recommended Attachments
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        onClick={() => handleToggleAttachment("Work Readiness Guide")}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedAttachments.includes("Work Readiness Guide") 
                            ? "bg-emerald-50 border-emerald-300 text-[#005C45]" 
                            : "bg-slate-50 border-slate-200 hover:bg-emerald-50/40 hover:border-emerald-200"
                        }`}
                      >
                        <FileText className="h-4 w-4 shrink-0" />
                        <div className="text-left overflow-hidden">
                          <div className="text-[10px] font-bold truncate">Work Readiness Guide</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">PDF • 1.2MB</div>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleToggleAttachment("Lesson Summary")}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedAttachments.includes("Lesson Summary") 
                            ? "bg-emerald-50 border-emerald-300 text-[#005C45]" 
                            : "bg-slate-50 border-slate-200 hover:bg-emerald-50/40 hover:border-emerald-200"
                        }`}
                      >
                        <FileText className="h-4 w-4 shrink-0" />
                        <div className="text-left overflow-hidden">
                          <div className="text-[10px] font-bold truncate">Lesson Summary</div>
                          <div className="text-[9px] text-slate-400 mt-0.5">DOCX • 400KB</div>
                        </div>
                      </div>

                      <div 
                        onClick={() => handleToggleAttachment("Low-Bandwidth Guide")}
                        className={`flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedAttachments.includes("Low-Bandwidth Guide") 
                            ? "bg-emerald-50 border-emerald-300 text-[#005C45]" 
                            : "bg-slate-50 border-slate-200 hover:bg-emerald-50/40 hover:border-emerald-200"
                        }`}
                      >
                        <FileText className="h-4 w-4 shrink-0" />
                        <div className="text-left overflow-hidden">
                          <div className="text-[10px] font-bold truncate">Low-Bandwidth Guide</div>
                          <div className="text-[9px] text-[#005C45] mt-0.5 font-bold">Suggested</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <button 
                      onClick={handleSaveDraft}
                      className="text-xs font-bold text-slate-500 hover:text-[#005C45] hover:underline cursor-pointer"
                    >
                      Save as Draft
                    </button>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleCancel}
                        className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-150"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSendResponse}
                        className="bg-[#005C45] hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all duration-150"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send Response
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* SECTION 7 — INTERNAL SUPPORT NOTES */}
          <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-100/50 pb-2">
              <Lock className="h-4 w-4 text-emerald-800" />
              <h4 className="text-xs font-black text-slate-850 uppercase tracking-wider">
                Internal Support Notes
              </h4>
            </div>
            
            <div className="space-y-3">
              <textarea 
                value={internalNoteInput}
                onChange={(e) => setInternalNoteInput(e.target.value)}
                placeholder="Add a private note for other facilitators or support staff..."
                rows={3}
                className="w-full p-4 bg-white border border-emerald-100 rounded-xl text-xs font-medium text-slate-700 leading-relaxed outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-150 resize-none"
              />
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-emerald-700">
                  Only visible to SUSTAIN staff and facilitators.
                </p>
                <button 
                  onClick={handleSavePrivateNote}
                  className="bg-[#005C45] hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-[10px] font-bold transition-all duration-150"
                >
                  Save Private Note
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 8 — ESCALATION / TIMELINE / EXPORT & REPORTS */}
          <div className="grid grid-cols-3 gap-6">
            
            {/* Column 1: Escalation + Linked Follow-Up */}
            <div className="space-y-6 flex flex-col justify-between">
              
              {/* Escalation Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 flex-1 flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all duration-200">
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5 mb-3">
                    Escalation Decision
                  </h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Decision</div>
                    <div className="text-xs font-black text-[#005C45]">
                      {currentSelectedTicket.status === "Escalated" ? "Escalated to regional support" : "Keep as facilitator support"}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold leading-relaxed mt-3">
                    {currentSelectedTicket.status === "Escalated" 
                      ? "Escalation ticket is assigned for technical oversight." 
                      : "This issue is within normal facilitation scope and does not require regional oversight yet."}
                  </p>
                </div>
                <button 
                  onClick={() => setIsEscalateModalOpen(true)}
                  className="w-full border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700 transition-all duration-150 py-2.5 rounded-xl text-xs font-bold cursor-pointer text-center mt-3"
                >
                  Change to Region Escalation
                </button>
              </div>

              {/* Linked Follow-Up */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 hover:border-emerald-200 hover:shadow-md transition-all duration-200">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5 mb-2">
                  Linked Follow-Up
                </h4>
                <div className="divide-y divide-slate-100">
                  <div 
                    onClick={handleOpenLinkedFollowUp}
                    className="py-2.5 flex items-center justify-between hover:bg-emerald-50/40 cursor-pointer transition-colors px-2 rounded-lg"
                  >
                    <span className="text-xs text-slate-700 font-bold">Call Aisha (Re-upload check)</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                  <div 
                    onClick={handleOpenLinkedFollowUp}
                    className="py-2.5 flex items-center justify-between hover:bg-emerald-50/40 cursor-pointer transition-colors px-2 rounded-lg"
                  >
                    <span className="text-xs text-slate-700 font-bold">Review Zainab’s Module 3</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Activity Timeline */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-emerald-200 hover:shadow-md transition-all duration-200">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5">
                Activity Timeline
              </h4>
              <div className="relative border-l border-slate-200 pl-4 ml-2.5 space-y-5 py-2">
                {currentSelectedTicket.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-emerald-600 border-2 border-white" />
                    <div className="text-[10px] text-slate-400 font-bold">{item.time}</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">{item.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Export & Reports */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all duration-200">
              <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5">
                  Export & Reports
                </h4>
                <div className="space-y-2 mt-4">
                  <button 
                    onClick={handleExportWeekly}
                    className="w-full flex items-center justify-between text-left p-3 border border-slate-100 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-[#005C45]" />
                      <span className="text-xs font-bold text-slate-800 leading-tight">Weekly Cohort Ticket Report</span>
                    </div>
                    <Download 
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast("Support report download simulated in this frontend prototype.");
                      }}
                      className="h-3.5 w-3.5 text-slate-400 hover:text-[#005C45]" 
                    />
                  </button>

                  <button 
                    onClick={() => setIsHistoryDrawerOpen(true)}
                    className="w-full flex items-center justify-between text-left p-3 border border-slate-100 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-[#005C45]" />
                      <span className="text-xs font-bold text-slate-800 leading-tight">Learner Support History ({currentSelectedTicket.avatar})</span>
                    </div>
                    <Download 
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast("Support report download simulated in this frontend prototype.");
                      }}
                      className="h-3.5 w-3.5 text-slate-400 hover:text-[#005C45]" 
                    />
                  </button>

                  <button 
                    onClick={() => setIsCategoryDrawerOpen(true)}
                    className="w-full flex items-center justify-between text-left p-3 border border-slate-100 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-[#005C45]" />
                      <span className="text-xs font-bold text-slate-800 leading-tight">Category Distribution Data</span>
                    </div>
                    <Download 
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast("Support report download simulated in this frontend prototype.");
                      }}
                      className="h-3.5 w-3.5 text-slate-400 hover:text-[#005C45]" 
                    />
                  </button>
                </div>
              </div>

              {/* Thematic Views */}
              <div className="border-t border-slate-100 pt-4.5">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Thematic Views
                </span>
                <div className="flex flex-wrap gap-2">
                  <span 
                    onClick={() => handleThematicChipClick("Assessment Support", "assessment support")}
                    className={`border rounded-sm px-2.5 py-1 text-[9px] font-bold tracking-wide cursor-pointer transition-colors ${
                      categoryFilter === "Assessment Support" 
                        ? "bg-emerald-100 text-[#005C45] border-emerald-300" 
                        : "bg-emerald-50/50 text-[#005C45] border-emerald-100 hover:bg-emerald-100/50"
                    }`}
                  >
                    Assessment
                  </span>
                  <span 
                    onClick={() => handleThematicChipClick("Technical Issue", "technical support")}
                    className={`border rounded-sm px-2.5 py-1 text-[9px] font-bold tracking-wide cursor-pointer transition-colors ${
                      categoryFilter === "Technical Issue" 
                        ? "bg-emerald-100 text-[#005C45] border-emerald-300" 
                        : "bg-emerald-50/50 text-[#005C45] border-emerald-100 hover:bg-emerald-100/50"
                    }`}
                  >
                    Technical
                  </span>
                  <span 
                    onClick={() => handleThematicChipClick("Download Support", "download support")}
                    className={`border rounded-sm px-2.5 py-1 text-[9px] font-bold tracking-wide cursor-pointer transition-colors ${
                      categoryFilter === "Download Support" 
                        ? "bg-emerald-100 text-[#005C45] border-emerald-300" 
                        : "bg-emerald-50/50 text-[#005C45] border-emerald-100 hover:bg-emerald-100/50"
                    }`}
                  >
                    Downloads
                  </span>
                  <span 
                    onClick={() => handleThematicChipClick("Certificate / CPD", "CPD support")}
                    className={`border rounded-sm px-2.5 py-1 text-[9px] font-bold tracking-wide cursor-pointer transition-colors ${
                      categoryFilter === "Certificate / CPD" 
                        ? "bg-emerald-100 text-[#005C45] border-emerald-300" 
                        : "bg-emerald-50/50 text-[#005C45] border-emerald-100 hover:bg-emerald-100/50"
                    }`}
                  >
                    CPD
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          MOBILE VIEWPORT
          ========================================== */}
      {isMobile && (
        <div className="w-full space-y-4 px-4 py-4">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-1">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateTo("/facilitator/dashboard")}
                className="p-1 rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-base font-black text-slate-900 tracking-tight">
                Support Tickets
              </h1>
            </div>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="p-2 bg-white rounded-full border border-slate-200 shadow-3xs hover:bg-slate-50 text-[#005C45] shrink-0"
            >
              <Plus className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-2">
            <div 
              onClick={() => handleStatusCardClick("Open")}
              className="bg-white border border-slate-200 rounded-xl p-2.5 text-center active:bg-slate-50 transition-all duration-150"
            >
              <div className="text-[9px] text-slate-400 font-bold uppercase leading-none">Open</div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">{tickets.filter(t => t.status === "Open").length}</div>
            </div>
            <div 
              onClick={() => handleStatusCardClick("In Progress")}
              className="bg-white border border-slate-200 rounded-xl p-2.5 text-center active:bg-slate-50 transition-all duration-150"
            >
              <div className="text-[9px] text-slate-400 font-bold uppercase leading-none">In Prog</div>
              <div className="text-sm font-extrabold text-slate-900 mt-1">{tickets.filter(t => t.status === "In Progress").length}</div>
            </div>
            <div 
              onClick={() => handleStatusCardClick("Escalated")}
              className="bg-white border border-slate-200 rounded-xl p-2.5 text-center active:bg-slate-50 transition-all duration-150"
            >
              <div className="text-[9px] text-slate-400 font-bold uppercase leading-none">Esc</div>
              <div className="text-sm font-extrabold text-red-650 mt-1">{tickets.filter(t => t.status === "Escalated").length}</div>
            </div>
            <div 
              onClick={() => handleStatusCardClick("Resolved")}
              className="bg-white border border-slate-200 rounded-xl p-2.5 text-center active:bg-slate-50 transition-all duration-150"
            >
              <div className="text-[9px] text-slate-400 font-bold uppercase leading-none">Res</div>
              <div className="text-sm font-extrabold text-[#005C45] mt-1">{tickets.filter(t => t.status === "Resolved").length}</div>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Support Tickets..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-700 font-medium outline-none focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
            />
          </div>

          {/* Thematic Views (Horizontal Scroll) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span 
              onClick={() => handleThematicChipClick("Assessment Support", "assessment support")}
              className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide shrink-0 border cursor-pointer transition-colors ${
                categoryFilter === "Assessment Support" 
                  ? "bg-[#005C45] text-white border-emerald-700" 
                  : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              Assessment
            </span>
            <span 
              onClick={() => handleThematicChipClick("Technical Issue", "technical support")}
              className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide shrink-0 border cursor-pointer transition-colors ${
                categoryFilter === "Technical Issue" 
                  ? "bg-[#005C45] text-white border-emerald-700" 
                  : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              Technical
            </span>
            <span 
              onClick={() => handleThematicChipClick("Download Support", "download support")}
              className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide shrink-0 border cursor-pointer transition-colors ${
                categoryFilter === "Download Support" 
                  ? "bg-[#005C45] text-white border-emerald-700" 
                  : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              Downloads
            </span>
            <span 
              onClick={() => handleThematicChipClick("Certificate / CPD", "CPD support")}
              className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide shrink-0 border cursor-pointer transition-colors ${
                categoryFilter === "Certificate / CPD" 
                  ? "bg-[#005C45] text-white border-emerald-700" 
                  : "bg-white text-slate-700 border-slate-200"
              }`}
            >
              CPD
            </span>
            <span 
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-[#005C45] ml-auto shrink-0 pl-2 cursor-pointer"
            >
              Reset
            </span>
          </div>

          {/* Active Queue */}
          <div id="mobile-active-queue" className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Active Queue
              </h3>
              <span className="text-[10px] font-bold text-slate-400">{filteredTickets.length} items</span>
            </div>

            {filteredTickets.map((t) => {
              const isSelected = t.id === selectedTicketId;
              let badgeColor = "bg-slate-50 text-slate-650 border border-slate-200";
              if (t.status === "Open") badgeColor = "bg-amber-50 text-amber-800 border border-amber-200";
              if (t.status === "In Progress") badgeColor = "bg-blue-50 text-blue-700 border border-blue-200";
              if (t.status === "Escalated") badgeColor = "bg-red-50 text-red-650 border border-red-200";
              if (t.status === "Resolved") badgeColor = "bg-emerald-50 text-emerald-800 border border-emerald-200";

              return (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`bg-white border rounded-2xl p-4 space-y-3 relative overflow-hidden transition-all duration-200 active:bg-slate-50/70 ${
                    isSelected ? "border-l-4 border-l-[#005C45] border-emerald-300 shadow-sm" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`rounded-sm px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${badgeColor}`}>
                      {t.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">#{t.id}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-850 leading-tight">
                      {t.issueDescription}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                      {t.issueDetails}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                      <div className="h-5 w-5 rounded-full bg-emerald-50 text-[8px] font-black text-[#005C45] flex items-center justify-center">
                        {t.avatar}
                      </div>
                      <span>{t.learner} • {t.cohort}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTicket(t.id);
                      }}
                      className="text-xs font-extrabold text-[#005C45] hover:underline"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Selected Ticket Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Ticket Details
              </span>
              <span className="text-xs font-mono font-extrabold text-[#005C45]">
                {currentSelectedTicket.id}
              </span>
            </div>

            {/* Support Need */}
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Support Need</div>
              <div className="bg-slate-50 border border-slate-250 rounded-xl p-3 text-xs text-slate-650 italic leading-relaxed">
                “{currentSelectedTicket.issueDetails}”
              </div>
            </div>

            {/* Learner Context */}
            <div className="space-y-3 pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Learner Context</div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-black text-[#005C45]">
                  {currentSelectedTicket.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{currentSelectedTicket.learner}</div>
                  <div className="text-[10px] text-slate-400 font-mono">ID: {currentSelectedTicket.learnerId} • {currentSelectedTicket.cohort}</div>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-3 space-y-2">
              <div className="text-[10px] font-bold text-[#005C45] uppercase flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Recommended Next Action
              </div>
              <p className="text-xs font-bold text-slate-800">{currentSelectedTicket.recommendedAction}</p>
              <button 
                onClick={handleApplyRecommendation}
                className="w-full bg-[#005C45] text-white py-2 rounded-lg text-xs font-bold active:scale-98 transition-all"
              >
                Apply Recommendation
              </button>
            </div>

            {/* Escalation Button */}
            <div className="pt-2">
              <button 
                onClick={() => setIsEscalateModalOpen(true)}
                className="w-full border border-red-200 text-red-650 hover:bg-red-50 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all"
              >
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Escalate Support Ticket
              </button>
            </div>

            {/* Linked Follow Ups */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Linked Follow-Up</div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleOpenLinkedFollowUp}
                  className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-left text-xs font-bold text-slate-700 truncate hover:border-emerald-200"
                >
                  Call Aisha
                </button>
                <button 
                  onClick={handleOpenLinkedFollowUp}
                  className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-left text-xs font-bold text-slate-700 truncate hover:border-emerald-200"
                >
                  Review Zainab
                </button>
              </div>
            </div>
          </div>

          {/* Draft Response Mobile */}
          <div id="mobile-draft-response-section" className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center justify-between">
              Draft Response
              <button 
                onClick={handleDraftAutoResponse}
                className="text-[10px] font-black text-[#005C45] hover:underline"
              >
                Draft Suggestion
              </button>
            </h3>
            <textarea 
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="Type your response to the learner here..."
              rows={4}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:bg-white focus:border-[#005C45] focus:ring-1 focus:ring-emerald-50 resize-none"
            />
            
            {/* Attachments horizontal layout */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Attachments</div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                <span 
                  onClick={() => handleToggleAttachment("Work Readiness Guide")}
                  className={`px-3 py-1.5 text-[10px] font-bold border rounded-full shrink-0 cursor-pointer ${
                    selectedAttachments.includes("Work Readiness Guide") 
                      ? "bg-emerald-50 border-emerald-300 text-[#005C45]" 
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  Work Readiness
                </span>
                <span 
                  onClick={() => handleToggleAttachment("Lesson Summary")}
                  className={`px-3 py-1.5 text-[10px] font-bold border rounded-full shrink-0 cursor-pointer ${
                    selectedAttachments.includes("Lesson Summary") 
                      ? "bg-emerald-50 border-emerald-300 text-[#005C45]" 
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  Lesson Summary
                </span>
                <span 
                  onClick={() => handleToggleAttachment("Low-Bandwidth Guide")}
                  className={`px-3 py-1.5 text-[10px] font-bold border rounded-full shrink-0 cursor-pointer ${
                    selectedAttachments.includes("Low-Bandwidth Guide") 
                      ? "bg-emerald-50 border-emerald-300 text-[#005C45]" 
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  Low-Bandwidth
                </span>
              </div>
            </div>

            <button 
              onClick={handleSendResponse}
              className="w-full bg-[#005C45] hover:bg-emerald-850 active:bg-emerald-950 transition-colors duration-150 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Send Reply
            </button>
          </div>

          {/* Export / Reports shortcuts */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setIsHistoryDrawerOpen(true)}
              className="bg-white border border-slate-200 rounded-xl py-3 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 active:bg-slate-50 shadow-3xs"
            >
              <FileText className="h-4 w-4 text-emerald-700" />
              History Log
            </button>
            <button 
              onClick={() => setIsCategoryDrawerOpen(true)}
              className="bg-white border border-slate-200 rounded-xl py-3 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 active:bg-slate-50 shadow-3xs"
            >
              <Activity className="h-4 w-4 text-[#005C45]" />
              Distribution Stats
            </button>
          </div>

          {/* Reusable mobile float action button */}
          <FacilitatorMobileActionMenu 
            items={fabItems}
            onActionSelect={handleFABActionSelect}
          />

        </div>
      )}

      {/* ==========================================
          ACTION 2 — CREATE SUPPORT TICKET MODAL/BOTTOM SHEET
          ========================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900">Create Support Ticket</h3>
                <p className="text-[11px] text-slate-500 font-medium">Record a learner issue and assign the right support action.</p>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Form Fields Scrollable */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Learner</label>
                  <select 
                    value={newLearner}
                    onChange={(e) => setNewLearner(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                  >
                    <option value="Aisha Mohammed">Aisha Mohammed</option>
                    <option value="Zainab Usman">Zainab Usman</option>
                    <option value="Ibrahim Bello">Ibrahim Bello</option>
                    <option value="General cohort issue">General cohort issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Cohort</label>
                  <select 
                    value={newCohort}
                    onChange={(e) => setNewCohort(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                  >
                    <option value="Kano 02">Kano 02</option>
                    <option value="Kaduna Agribusiness Cohort">Kaduna Agribusiness Cohort</option>
                    <option value="Lagos Market Access Cohort">Lagos Market Access Cohort</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                  >
                    <option value="Assessment Support">Assessment Support</option>
                    <option value="Download Support">Download Support</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Certificate / CPD">Certificate / CPD</option>
                    <option value="Account Access">Account Access</option>
                    <option value="Low-Bandwidth Support">Low-Bandwidth Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Related Area</label>
                  <input 
                    type="text"
                    value={newRelatedArea}
                    onChange={(e) => setNewRelatedArea(e.target.value)}
                    placeholder="e.g. Work Readiness Assignment"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium outline-none hover:border-slate-300 focus:border-[#005C45]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Priority</label>
                  <select 
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Reported Via</label>
                  <select 
                    value={newReportedVia}
                    onChange={(e) => setNewReportedVia(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                  >
                    <option value="Mobile App">Mobile App</option>
                    <option value="In-App Message">In-App Message</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Facilitator Record">Facilitator Record</option>
                    <option value="Community Question">Community Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Issue Summary</label>
                <input 
                  type="text"
                  value={newIssueSummary}
                  onChange={(e) => setNewIssueSummary(e.target.value)}
                  placeholder="Briefly describe the issue..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium outline-none hover:border-slate-300 focus:border-[#005C45]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Detailed Notes</label>
                <textarea 
                  value={newDetailedNotes}
                  onChange={(e) => setNewDetailedNotes(e.target.value)}
                  rows={3}
                  placeholder="Add details the support team should know..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none hover:border-slate-300 focus:border-[#005C45] resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Assign To</label>
                <select 
                  value={newAssignTo}
                  onChange={(e) => setNewAssignTo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                >
                  <option value="Facilitator Support">Facilitator Support</option>
                  <option value="Technical Support Team">Technical Support Team</option>
                  <option value="Regional Technical Lead">Regional Technical Lead</option>
                  <option value="Programme Admin">Programme Admin</option>
                </select>
              </div>

              {/* Checkboxes Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={newNotifyLearner}
                    onChange={(e) => setNewNotifyLearner(e.target.checked)}
                    className="h-4 w-4 text-[#005C45] rounded-xs border-slate-300 focus:ring-[#005C45]"
                  />
                  Notify learner
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={newMarkPriorityCheck}
                    onChange={(e) => setNewMarkPriorityCheck(e.target.checked)}
                    className="h-4 w-4 text-[#005C45] rounded-xs border-slate-300 focus:ring-[#005C45]"
                  />
                  Mark as priority
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={newLinkFollowUp}
                    onChange={(e) => setNewLinkFollowUp(e.target.checked)}
                    className="h-4 w-4 text-[#005C45] rounded-xs border-slate-300 focus:ring-[#005C45]"
                  />
                  Link to follow-up
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={newAddPrivateNote}
                    onChange={(e) => setNewAddPrivateNote(e.target.checked)}
                    className="h-4 w-4 text-[#005C45] rounded-xs border-slate-300 focus:ring-[#005C45]"
                  />
                  Add private note
                </label>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0 pb-6 sm:pb-4">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTicketSubmit}
                className="bg-[#005C45] hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Create Ticket
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          ACTION 9 — ESCALATION DECISION MODAL/BOTTOM SHEET
          ========================================== */}
      {isEscalateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900">Change to Region Escalation</h3>
                <p className="text-[11px] text-slate-500 font-medium">Confirm whether this ticket should be escalated beyond facilitator support.</p>
              </div>
              <button 
                onClick={() => setIsEscalateModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Content Form Scrollable */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {/* Context card (pale blue/green panel) */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Ticket</span>
                    <span className="font-bold text-slate-800">{currentSelectedTicket.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Learner</span>
                    <span className="font-bold text-slate-800">{currentSelectedTicket.learner}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Current Decision</span>
                  <span className="font-black text-[#005C45]">Keep as facilitator support</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[9px]">Reason</span>
                  <span className="text-slate-600 font-medium">Assessment upload issue may require technical review if repeated.</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Escalation Reason</label>
                <select 
                  value={escalationReason}
                  onChange={(e) => setEscalationReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                >
                  <option value="Repeated technical issue">Repeated technical issue</option>
                  <option value="Data access issue">Data access issue</option>
                  <option value="Certificate or CPD dispute">Certificate or CPD dispute</option>
                  <option value="Regional approval required">Regional approval required</option>
                  <option value="Unable to resolve at facilitator level">Unable to resolve at facilitator level</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Escalation Notes</label>
                <textarea 
                  value={escalationNotes}
                  onChange={(e) => setEscalationNotes(e.target.value)}
                  rows={3}
                  placeholder="Explain why this ticket should be escalated..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none hover:border-slate-300 focus:border-[#005C45] resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Assign To</label>
                <select 
                  value={escalationAssignTo}
                  onChange={(e) => setEscalationAssignTo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-bold outline-none hover:border-slate-300 focus:border-[#005C45]"
                >
                  <option value="Regional Technical Lead">Regional Technical Lead</option>
                  <option value="Programme Admin">Programme Admin</option>
                  <option value="State Coordinator">State Coordinator</option>
                </select>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={escNotifyLead}
                    onChange={(e) => setEscNotifyLead(e.target.checked)}
                    className="h-4 w-4 text-[#005C45] rounded-xs border-slate-300"
                  />
                  Notify regional lead
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={escKeepCopied}
                    onChange={(e) => setEscKeepCopied(e.target.checked)}
                    className="h-4 w-4 text-[#005C45] rounded-xs border-slate-300"
                  />
                  Keep facilitator copied
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-650 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={escMarkEscalated}
                    onChange={(e) => setEscMarkEscalated(e.target.checked)}
                    className="h-4 w-4 text-[#005C45] rounded-xs border-slate-300"
                  />
                  Mark ticket as escalated
                </label>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0 pb-6 sm:pb-4">
              <button 
                onClick={() => setIsEscalateModalOpen(false)}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmEscalation}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Confirm Escalation
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          ACTION 11 — LEARNER SUPPORT HISTORY DRAWER / BOTTOM SHEET
          ========================================== */}
      {isHistoryDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-end">
          <div className="bg-white w-full sm:max-w-md h-[90vh] sm:h-full rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none border-l border-slate-200 shadow-xl overflow-hidden flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900">Learner Support History</h3>
                <p className="text-[11px] text-slate-500 font-medium">Support activity across open tickets, follow-ups, and learner messages.</p>
              </div>
              <button 
                onClick={() => setIsHistoryDrawerOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Profile Card Summary */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-black text-[#005C45]">
                  {currentSelectedTicket.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{currentSelectedTicket.learner}</h4>
                  <p className="text-[10px] text-slate-500 font-mono">ID: {currentSelectedTicket.learnerId}</p>
                </div>
              </div>

              {/* History timeline */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Activity Timeline</h4>
                <div className="relative border-l border-slate-200 pl-4 ml-2.5 space-y-5 py-1">
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-emerald-600 border-2 border-white" />
                    <div className="text-[10px] text-slate-400 font-bold">Oct 24, 2026 • 14:15 PM</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">SUP-2026-00491 created</div>
                    <div className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Reported assessment upload size constraints.</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-emerald-600 border-2 border-white" />
                    <div className="text-[10px] text-slate-400 font-bold">Oct 24, 2026 • 15:45 PM</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">Private note added</div>
                    <div className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Coordinating with technical development lead.</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-emerald-600 border-2 border-white" />
                    <div className="text-[10px] text-slate-400 font-bold">Oct 25, 2026 • 10:30 AM</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">Follow-up reminder sent</div>
                    <div className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Requested compressed alternative upload attempt.</div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full bg-emerald-600 border-2 border-white" />
                    <div className="text-[10px] text-slate-400 font-bold">Oct 25, 2026 • 11:00 AM</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">Low-bandwidth guide attached</div>
                    <div className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Shared guidelines via support ticket.</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 shrink-0 pb-10 sm:pb-6">
              <button 
                onClick={() => setIsHistoryDrawerOpen(false)}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 py-3 rounded-xl text-xs font-bold text-center"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setIsHistoryDrawerOpen(false);
                  navigateTo("/facilitator/learners/aisha-mohammed" as RoutePath);
                }}
                className="flex-1 bg-[#005C45] hover:bg-emerald-800 text-white py-3 rounded-xl text-xs font-bold text-center"
              >
                View Learner Record
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          ACTION 11 — CATEGORY DISTRIBUTION DRAWER / BOTTOM SHEET
          ========================================== */}
      {isCategoryDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-end sm:items-center justify-end">
          <div className="bg-white w-full sm:max-w-md h-[80vh] sm:h-full rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none border-l border-slate-200 shadow-xl overflow-hidden flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900">Category Distribution Data</h3>
                <p className="text-[11px] text-slate-500 font-medium">Consolidated support ticket distribution across cohorts.</p>
              </div>
              <button 
                onClick={() => setIsCategoryDrawerOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
              
              <div className="space-y-4">
                
                {/* Item 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700">Assessment Support</span>
                    <span className="text-[#005C45] font-black">3 tickets (37%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#005C45] h-full rounded-full" style={{ width: "37%" }} />
                  </div>
                </div>

                {/* Item 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700">Download Support</span>
                    <span className="text-[#005C45] font-black">2 tickets (25%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#005C45] h-full rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>

                {/* Item 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700">Technical Issues</span>
                    <span className="text-[#005C45] font-black">2 tickets (25%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#005C45] h-full rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>

                {/* Item 4 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700">Certificate / CPD</span>
                    <span className="text-[#005C45] font-black">1 ticket (13%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#005C45] h-full rounded-full" style={{ width: "13%" }} />
                  </div>
                </div>

              </div>

              {/* Action Prompt */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3.5 space-y-1">
                <h5 className="font-bold text-[#005C45] text-xs">Weekly Cohort Insight</h5>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Assessment Support and Download/Network timeout complaints represent over 60% of current cohort support requests. High priority is suggested for Low-Bandwidth Guide deployments.
                </p>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 shrink-0 pb-10 sm:pb-6">
              <button 
                onClick={() => setIsCategoryDrawerOpen(false)}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 py-3 rounded-xl text-xs font-bold text-center"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setIsCategoryDrawerOpen(false);
                  navigateTo("/facilitator/reports" as RoutePath);
                }}
                className="flex-1 bg-[#005C45] hover:bg-emerald-800 text-white py-3 rounded-xl text-xs font-bold text-center"
              >
                View Analytics Reports
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default FacilitatorSupportTicketsPage;
