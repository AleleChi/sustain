import { useState, useEffect } from "react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { mockFacilitatorLearners } from "../../data/mockFacilitator";
import { 
  MessageSquare, 
  Megaphone, 
  Users, 
  Search, 
  Bell, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Plus, 
  X, 
  ChevronRight, 
  ArrowRight, 
  ShieldAlert, 
  FileText, 
  AlertTriangle, 
  Smartphone, 
  BookOpen, 
  RefreshCw,
  Bold,
  Italic,
  Link as LinkIcon,
  PieChart,
  BarChart3,
  Check,
  MessageCircle,
  Trash2,
  GripVertical
} from "lucide-react";
import { FacilitatorMobileActionMenu } from "../../components/facilitator/FacilitatorMobileActionMenu";

interface DiscussionItem {
  id: string;
  title: string;
  area: string;
  startedBy: string;
  status: "Response Needed" | "Open" | "Reported" | "Resolved";
  lastUpdate: string;
  concern: string;
  content: string;
  replies: number;
  cohort: string;
  progress: number;
  engagement: "High" | "Medium" | "Low";
}

export function FacilitatorCommunityPage() {
  const { showToast, navigateTo } = useRoute();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("Kano Youth Employability 02");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedStatus, setSelectedStatus] = useState("Needs Response");

  // Interactive Discussion State
  const [discussions, setDiscussions] = useState<DiscussionItem[]>([
    {
      id: "disc-1",
      title: "How should I prepare for interview questions?",
      area: "Interview Readiness",
      startedBy: "Aisha Mohammed",
      status: "Response Needed",
      lastUpdate: "2 hours ago",
      concern: "—",
      content: "I have my first mock interview tomorrow and I’m nervous about the ‘Tell me about yourself’ question. Any tips from the facilitators on how to structure the answer specifically for Nigerian agri-businesses?",
      replies: 3,
      cohort: "Kano Cohort 02",
      progress: 42,
      engagement: "High"
    },
    {
      id: "disc-2",
      title: "Feedback on Module 3 Assignment Tasks",
      area: "Project Management",
      startedBy: "Ibrahim Bello",
      status: "Open",
      lastUpdate: "3 hours ago",
      concern: "—",
      content: "Could someone clarify if the risk assessment matrix needs to include mitigation costs? I want to make sure my submission is thorough.",
      replies: 2,
      cohort: "Kano Cohort 02",
      progress: 58,
      engagement: "Medium"
    },
    {
      id: "disc-3",
      title: "Can we share LinkedIn profiles here?",
      area: "Professional Networking",
      startedBy: "Chinaza Okafor",
      status: "Reported",
      lastUpdate: "1 day ago",
      concern: "Unapproved Link",
      content: "Hi everyone, let's connect and build our professional network! Check out this awesome crypto learning group too: crypto-wealth-link-unapproved...",
      replies: 1,
      cohort: "Kano Cohort 02",
      progress: 71,
      engagement: "High"
    }
  ]);

  // Active Selected Thread
  const [activeThreadId, setActiveThreadId] = useState<string>("disc-1");
  const activeThread = discussions.find(d => d.id === activeThreadId) || discussions[0];

  // Response text & composer state
  const [responseDraft, setResponseDraft] = useState(
    "Hello Aisha! This is a great question. For the 'Tell me about yourself' prompt in the Nigerian agri-sector, focus on your Past experience, Present learning journey with SUSTAIN, and Future value to your company.\n\nHere is a simple structure:\n1. Past: Mention your background in Kano/Northern agriculture.\n2. Present: Highlight your current training in Soft Skills.\n3. Future: Mention how you want to apply these to their specific business goals."
  );

  // Announcement compose state
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [emailAll, setEmailAll] = useState(false);
  const [smsUrgent, setSmsUrgent] = useState(false);

  // Global Broadcast compose state (Mobile specific)
  const [mobileBroadcastTitle, setMobileBroadcastTitle] = useState("");
  const [mobileBroadcastContent, setMobileBroadcastContent] = useState("");

  // Flagged list (Reported concerns state)
  const [flaggedPosts, setFlaggedPosts] = useState([
    {
      id: "flag-1",
      type: "Incorrect Information",
      post: "RE: “Government grants are open today”",
      details: "Post by Usman Danladi. Reported as misleading information regarding the 2024 SMEDAN grant timelines.",
      author: "Usman Danladi"
    },
    {
      id: "flag-2",
      type: "Unapproved Link",
      post: "RE: “Check out this crypto group”",
      details: "Post by Chinaza Okafor. Reported for violating community rules on non-educational external links.",
      author: "Chinaza Okafor"
    }
  ]);

  // Mobile queue filters
  const [mobileFilter, setMobileFilter] = useState<"all" | "waiting" | "flagged">("all");

  // Community Rules State
  const [rules, setRules] = useState([
    {
      id: "rule-1",
      num: "1",
      title: "Educational Focus Only",
      desc: "Discussions must relate to the SUSTAIN curriculum and career growth."
    },
    {
      id: "rule-2",
      num: "2",
      title: "Professional Respect",
      desc: "Maintain a supportive tone. Harassment is strictly prohibited."
    },
    {
      id: "rule-3",
      num: "3",
      title: "No Spam or Ads",
      desc: "Sharing of unapproved external links or commercial products is banned."
    }
  ]);

  const [isEditRulesOpen, setIsEditRulesOpen] = useState(false);
  const [rulesEditList, setRulesEditList] = useState<typeof rules>([]);

  const handleOpenEditRules = () => {
    setRulesEditList(rules.map(r => ({ ...r })));
    setIsEditRulesOpen(true);
  };

  const handleAddRuleDraft = () => {
    const nextNum = rulesEditList.length + 1;
    setRulesEditList(prev => [
      ...prev,
      {
        id: `rule-new-${Date.now()}-${Math.random()}`,
        num: String(nextNum),
        title: "New community rule",
        desc: "Describe the rule learners should follow..."
      }
    ]);
  };

  const handleRemoveRuleDraft = (id: string) => {
    setRulesEditList(prev => {
      const filtered = prev.filter(r => r.id !== id);
      return filtered.map((r, idx) => ({ ...r, num: String(idx + 1) }));
    });
  };

  const handleRuleFieldChange = (id: string, field: "title" | "desc", value: string) => {
    setRulesEditList(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, [field]: value };
      }
      return r;
    }));
  };

  const handleSaveRules = () => {
    const updated = rulesEditList.map((r, idx) => ({
      ...r,
      num: String(idx + 1)
    }));
    setRules(updated);
    setIsEditRulesOpen(false);
    showToast("Community rules saved locally in this frontend prototype.");
  };

  // Guides & Resources State
  const [resources, setResources] = useState([
    { title: "Work Readiness Guide 2024", format: "PDF • 2.4 MB", badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-100" },
    { title: "Interview Prep Checklist", format: "DOCX • 1.1 MB", badgeStyle: "bg-indigo-50 text-indigo-800 border-indigo-100" }
  ]);

  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);

  // Form Fields for Add Resource
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceType, setResourceType] = useState("PDF Guide");
  const [resourceArea, setResourceArea] = useState("Work Readiness");
  const [resourceFileOrLink, setResourceFileOrLink] = useState("");
  const [resourceVisibility, setResourceVisibility] = useState("Facilitators and learners");
  const [resourceDescription, setResourceDescription] = useState("");
  const [resourceMarkApproved, setResourceMarkApproved] = useState(true);
  const [resourceLowBandwidth, setResourceLowBandwidth] = useState(false);
  const [resourceShowInCommunity, setResourceShowInCommunity] = useState(true);

  const handleAddResource = () => {
    if (!resourceTitle.trim()) {
      showToast("Please provide a resource title.");
      return;
    }

    // Determine badge and format based on type
    let format = "PDF • 1.8 MB";
    let badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-100";
    if (resourceType === "Video Link") {
      format = "Video Link";
      badgeStyle = "bg-amber-50 text-amber-800 border-amber-100";
    } else if (resourceType === "Checklist") {
      format = "DOCX • 1.2 MB";
      badgeStyle = "bg-indigo-50 text-indigo-800 border-indigo-100";
    } else if (resourceType === "Lesson Summary") {
      format = "PDF • 850 KB";
      badgeStyle = "bg-sky-50 text-sky-800 border-sky-100";
    } else if (resourceType === "Low-Bandwidth Resource") {
      format = "ZIP • 450 KB";
      badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-100";
    } else if (resourceType === "Template") {
      format = "XLSX • 2.1 MB";
      badgeStyle = "bg-teal-50 text-teal-800 border-teal-100";
    }

    const newRes = {
      title: resourceTitle,
      format: format,
      badgeStyle: badgeStyle
    };

    setResources(prev => [...prev, newRes]);
    setIsAddResourceOpen(false);

    // Reset fields
    setResourceTitle("");
    setResourceType("PDF Guide");
    setResourceArea("Work Readiness");
    setResourceFileOrLink("");
    setResourceVisibility("Facilitators and learners");
    setResourceDescription("");
    setResourceMarkApproved(true);
    setResourceLowBandwidth(false);
    setResourceShowInCommunity(true);

    showToast("Resource added locally in this frontend prototype.");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditRulesOpen(false);
        setIsAddResourceOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Interaction handlers with simulation toasts
  const handleModerate = (id: string) => {
    setActiveThreadId(id);
    // Scroll to section 2: Discussion Detail
    const el = document.getElementById("discussion-detail-cards");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      showToast(`Selected discussion thread by ${discussions.find(d => d.id === id)?.startedBy}`);
    }
  };

  const handleMobileSelectThread = (id: string) => {
    setActiveThreadId(id);
    const el = document.getElementById("mobile-active-thread");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    showToast(`Switched active discussion to: ${discussions.find(d => d.id === id)?.startedBy}`);
  };

  const handlePublishResponse = () => {
    if (!responseDraft.trim()) {
      showToast("Cannot publish empty response.");
      return;
    }
    showToast("Response published locally in this frontend prototype.");
    // Simulate updating reply counter
    setDiscussions(prev => prev.map(d => {
      if (d.id === activeThread.id) {
        return {
          ...d,
          replies: d.replies + 1,
          status: "Resolved"
        };
      }
      return d;
    }));
  };

  const handleSaveDraft = () => {
    showToast("Response draft saved locally in this frontend prototype.");
  };

  const handleAttachChecklist = () => {
    showToast("Guide attached in this frontend prototype.");
    setResponseDraft(prev => prev + "\n\n[Attached: Interview Prep Checklist]");
  };

  const handleDeletePost = (id: string) => {
    setFlaggedPosts(prev => prev.filter(f => f.id !== id));
    showToast("Post deletion simulated in this frontend prototype.");
  };

  const handleDismissReport = (id: string) => {
    setFlaggedPosts(prev => prev.filter(f => f.id !== id));
    showToast("Report dismissal simulated in this frontend prototype.");
  };

  const handleIssueWarning = (author: string) => {
    showToast(`Warning action simulated in this frontend prototype for ${author}.`);
  };

  const handleSendAnnouncement = () => {
    if (!announcementTitle.trim() || !announcementContent.trim()) {
      showToast("Please provide both announcement title and details.");
      return;
    }
    showToast("Announcement sent locally in this frontend prototype.");
    setAnnouncementTitle("");
    setAnnouncementContent("");
    setEmailAll(false);
    setSmsUrgent(false);
  };

  const handleSendMobileBroadcast = () => {
    if (!mobileBroadcastTitle.trim() || !mobileBroadcastContent.trim()) {
      showToast("Please provide broadcast title and details.");
      return;
    }
    showToast("Broadcast action simulated in this frontend prototype.");
    setMobileBroadcastTitle("");
    setMobileBroadcastContent("");
  };

  const handleNextAction = () => {
    setActiveThreadId("disc-1");
    const el = document.getElementById("draft-response-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    showToast("Scrolled to draft response editor for Aisha Mohammed.");
  };

  // Mobile FAB actions mapping
  const mobileFabActions = [
    {
      label: "Respond to discussion",
      icon: MessageSquare,
      onClick: () => {
        const el = document.getElementById("mobile-your-response");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          document.getElementById("draft-response-section")?.scrollIntoView({ behavior: "smooth" });
        }
        showToast("Scrolled to response editor.");
      }
    },
    {
      label: "Create announcement",
      icon: Megaphone,
      onClick: () => {
        const el = document.getElementById("mobile-global-broadcast");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          document.getElementById("announcement-form-section")?.scrollIntoView({ behavior: "smooth" });
        }
        showToast("Scrolled to broadcast creator.");
      }
    },
    {
      label: "Review flagged posts",
      icon: AlertTriangle,
      onClick: () => {
        const el = document.getElementById("mobile-flagged-review");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          document.getElementById("flagged-posts-section")?.scrollIntoView({ behavior: "smooth" });
        }
        showToast("Scrolled to flagged items.");
      }
    },
    {
      label: "Open moderation rules",
      icon: ShieldAlert,
      onClick: () => {
        const el = document.getElementById("mobile-moderation-toolbox");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          document.getElementById("rules-review-section")?.scrollIntoView({ behavior: "smooth" });
        }
        showToast("Scrolled to rules and guidelines.");
      }
    },
    {
      label: "Send broadcast",
      icon: Megaphone,
      onClick: () => {
        const el = document.getElementById("mobile-global-broadcast");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          document.getElementById("announcement-form-section")?.scrollIntoView({ behavior: "smooth" });
        }
        showToast("Scrolled to broadcast panel.");
      }
    },
    {
      label: "View support status",
      icon: HelpCircle,
      onClick: () => {
        const el = document.getElementById("mobile-support-status");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          document.getElementById("support-status-section")?.scrollIntoView({ behavior: "smooth" });
        }
        showToast("Scrolled to support tickets.");
      }
    },
    {
      label: "Export activity log",
      icon: Download,
      onClick: () => {
        showToast("Community activity export simulated in this frontend prototype.");
      }
    },
    {
      label: "Sync community logs",
      icon: RefreshCw,
      onClick: () => {
        showToast("Community log sync simulated in this frontend prototype.");
      }
    }
  ];

  // Helper filter for search bar
  const filteredDiscussions = discussions.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.startedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.area.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="w-full text-slate-800 bg-[#f8fafc]">

      {/* ========================================== */}
      {/* 💻 DESKTOP LAYOUT (hidden lg:block class) */}
      {/* ========================================== */}
      <div className="hidden lg:block space-y-8 pb-12">
        
        {/* SECTION 1 — HEADER / HERO AREA + STATUS CARD */}
        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
          <div className="flex-1 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                Community Moderation
              </h1>
              <span className="text-[11px] font-bold text-[#1e40af] bg-[#dbeafe] px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                Cohort: Kano Youth Employability Cohort 02
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
              Monitor cohort interactions, resolve reported concerns, and guide professional discussions to ensure a healthy learning environment for all participants.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button 
                onClick={() => {
                  const el = document.getElementById("draft-response-section");
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  showToast("Replying to dynamic discussion thread");
                }}
                className="text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 interactive-button-primary focus-ring"
              >
                <span className="font-sans font-extrabold text-sm">&#x21B2;</span> Respond to Discussion
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("announcement-form-section");
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  showToast("Scrolled to announcement composer");
                }}
                className="text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 interactive-button-secondary border-[#006644]! text-[#006644]! hover:bg-emerald-50! focus-ring"
              >
                <Megaphone className="h-4 w-4" /> Create Cohort Announcement
              </button>
            </div>
          </div>

          {/* Right-side card: Community Status */}
          <div className="w-full xl:w-96 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left">
            <div className="space-y-1">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-sans">
                COMMUNITY STATUS
              </h3>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-600 font-extrabold text-lg select-none">&#10071;</div>
                  <span className="text-xs font-semibold text-slate-600">Responses Needed</span>
                </div>
                <span className="text-lg font-bold text-emerald-600">6</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-4.5 w-4.5 text-red-500" />
                  <span className="text-xs font-semibold text-slate-600">Concerns Reported</span>
                </div>
                <span className="text-lg font-bold text-red-500">2</span>
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#006644] h-full rounded-full" style={{ width: "84%" }} />
                </div>
                <div className="text-center text-[11px] text-slate-400 font-medium">
                  Moderation efficiency: 84% this week
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            RESTORED SECTION 1 — SIX COMMUNITY METRIC CARDS
           ==================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { id: "open", label: "Open Discussions", count: "18", icon: MessageSquare, accent: "text-slate-800", iconColor: "text-emerald-700/80", borderHover: "hover:border-emerald-200" },
            { id: "needed", label: "Response Needed", count: "6", icon: MessageCircle, accent: "text-[#006644] font-extrabold", iconColor: "text-emerald-600", borderHover: "hover:border-emerald-200" },
            { id: "reported", label: "Reported Concerns", count: "2", icon: AlertTriangle, accent: "text-red-650", iconColor: "text-red-500", borderHover: "hover:border-red-200" },
            { id: "guides", label: "Approved Guides", count: "12", icon: BookOpen, accent: "text-slate-800", iconColor: "text-emerald-700/80", borderHover: "hover:border-emerald-200" },
            { id: "announcements", label: "Cohort Announcements", count: "3", icon: Megaphone, accent: "text-slate-800", iconColor: "text-slate-500", borderHover: "hover:border-slate-300" },
            { id: "resolved", label: "Resolved Discussions", count: "24", icon: Check, accent: "text-slate-800", iconColor: "text-slate-500", borderHover: "hover:border-slate-300" }
          ].map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => showToast(`Filtered queue by metric: ${card.label}`)}
                className={`group bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex items-center justify-between transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${card.borderHover} active:bg-emerald-50 active:scale-[0.99]`}
              >
                <div className="space-y-2 text-left">
                  <span className="text-xs font-semibold text-slate-500 block">
                    {card.label}
                  </span>
                  <span className={`text-3xl font-bold ${card.accent} block`}>
                    {card.count}
                  </span>
                </div>
                <div className="text-slate-400 group-hover:text-slate-600 transition-all duration-200 opacity-20 group-hover:opacity-100 shrink-0">
                  <IconComponent className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ====================================================
            RESTORED SECTION 2 — SEARCH / FILTER BAR
           ==================================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 text-left">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search discussions or learners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-250 hover:border-slate-350 rounded-xl text-xs font-medium focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pl-1">Cohort</span>
              <select
                value={selectedCohort}
                onChange={(e) => {
                  setSelectedCohort(e.target.value);
                  showToast(`Cohort changed to ${e.target.value}`);
                }}
                className="bg-white border border-slate-200 hover:border-slate-350 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-700 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
              >
                <option value="Kano Youth Employability 02">Kano Youth Employability 02</option>
                <option value="Kano Youth Employability 01">Kano Youth Employability 01</option>
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pl-1">Course</span>
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  showToast(`Course changed to ${e.target.value}`);
                }}
                className="bg-white border border-slate-200 hover:border-slate-350 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-700 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
              >
                <option value="All Courses">All Courses</option>
                <option value="Agribusiness Basics">Agribusiness Basics</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pl-1">Type</span>
              <select
                className="bg-white border border-slate-200 hover:border-slate-350 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-700 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Discussion">Discussion</option>
                <option value="Question">Question</option>
              </select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pl-1">Status</span>
              <button
                onClick={() => showToast("Status filter toggled")}
                className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#006644] transition-all cursor-pointer"
              >
                {selectedStatus}
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            RESTORED SECTION 3 — DISCUSSION QUEUE TABLE
           ==================================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs text-left">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-sans">
              Discussion Queue
            </h3>
            <button
              onClick={() => showToast("Archived discussions queue simulation active")}
              className="text-xs font-bold text-[#006644] hover:text-[#004d33] transition-colors focus-ring rounded-lg px-2 py-1"
            >
              View Archived
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Discussion</th>
                  <th className="px-6 py-3.5">Related Area</th>
                  <th className="px-6 py-3.5">Started By</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Last Update</th>
                  <th className="px-6 py-3.5">Concern</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {[
                  {
                    id: "disc-1",
                    title: "How should I prepare for interview questions?",
                    area: "Interview Readiness",
                    startedBy: "Aisha Mohammed",
                    status: "Response Needed",
                    lastUpdate: "2h ago",
                    concern: "—",
                    actionText: "Moderate",
                    actionStyle: "text-[#006644] hover:text-emerald-900 font-bold"
                  },
                  {
                    id: "disc-2",
                    title: "Feedback on Module 3 Assignment tasks",
                    area: "Project Management",
                    startedBy: "Ibrahim Bello",
                    status: "Open",
                    lastUpdate: "5h ago",
                    concern: "—",
                    actionText: "View",
                    actionStyle: "text-[#006644] hover:text-emerald-900 font-bold"
                  },
                  {
                    id: "disc-3",
                    title: "Can we share LinkedIn profiles here?",
                    area: "Professional Networking",
                    startedBy: "Chinaza Okafor",
                    status: "Reported",
                    lastUpdate: "1d ago",
                    concern: "Unapproved Link",
                    actionText: "Review",
                    actionStyle: "text-red-650 hover:text-red-750 font-bold"
                  }
                ].map((row) => {
                  const isSelected = activeThreadId === row.id;
                  
                  // Status badge styling
                  let statusBadge = null;
                  if (row.status === "Response Needed") {
                    statusBadge = (
                      <div className="bg-[#006644] text-white font-extrabold text-[9px] px-2.5 py-1 rounded flex flex-col items-center leading-tight tracking-wider uppercase max-w-[80px]">
                        <span>Response</span>
                        <span>Needed</span>
                      </div>
                    );
                  } else if (row.status === "Open") {
                    statusBadge = (
                      <span className="bg-blue-50 text-blue-800 font-bold text-[9px] px-2 py-0.5 rounded border border-blue-100 inline-block uppercase tracking-wider">
                        Open
                      </span>
                    );
                  } else if (row.status === "Reported") {
                    statusBadge = (
                      <span className="bg-red-50 text-red-800 font-bold text-[9px] px-2 py-0.5 rounded border border-red-100 inline-block uppercase tracking-wider">
                        Reported
                      </span>
                    );
                  }

                  // Row background styling
                  const bgClass = isSelected
                    ? "bg-[#edfcf7] hover:bg-emerald-100/30 transition-colors duration-200"
                    : "bg-white hover:bg-slate-50 transition-colors duration-200";

                  return (
                    <tr
                      key={row.id}
                      onClick={() => {
                        setActiveThreadId(row.id);
                        showToast(`Selected discussion thread by ${row.startedBy}`);
                      }}
                      className={`${bgClass} cursor-pointer`}
                    >
                      <td className="px-6 py-4.5 font-bold text-slate-900 max-w-xs whitespace-normal">
                        {row.title}
                      </td>
                      <td className="px-6 py-4.5 text-slate-500">
                        {row.area}
                      </td>
                      <td className="px-6 py-4.5 text-slate-850 font-semibold">
                        {row.startedBy}
                      </td>
                      <td className="px-6 py-4.5">
                        {statusBadge}
                      </td>
                      <td className="px-6 py-4.5 text-slate-400 font-medium">
                        {row.lastUpdate}
                      </td>
                      <td className={`px-6 py-4.5 font-bold ${row.concern !== "—" ? "text-red-650" : "text-slate-450"}`}>
                        {row.concern}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveThreadId(row.id);
                            showToast(`Starting moderation for ${row.startedBy}`);
                            document.getElementById("discussion-detail-cards")?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className={`${row.actionStyle} cursor-pointer focus-ring px-2.5 py-1 rounded-lg hover:bg-slate-100/50`}
                        >
                          {row.actionText}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2 — DISCUSSION DETAIL / LEARNER / MODERATOR ACTION (3 columns, equal height) */}
        <div id="discussion-detail-cards" className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Discussion Detail */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#006644]">
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider font-sans">
                  Discussion Detail
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 leading-tight">
                “{activeThread.title}”
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium pl-2 border-l-2 border-slate-100 italic">
                “{activeThread.content}”
              </p>
            </div>
            <div className="text-xs text-slate-400 font-semibold pt-4 mt-4 border-t border-slate-100">
              Started {activeThread.lastUpdate} • {activeThread.replies} Replies
            </div>
          </div>

          {/* Card 2: Learner Context */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-50 text-[#006644] border border-emerald-100 flex items-center justify-center font-bold text-sm overflow-hidden shrink-0">
                  {/* Styled fallback avatar that mimics clean photo circle */}
                  <span className="tracking-tight">{activeThread.startedBy.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-tight">{activeThread.startedBy}</h4>
                  <p className="text-xs text-slate-450 font-medium">{activeThread.cohort}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Course Progress</span>
                    <span className="text-emerald-700 font-bold">{activeThread.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#006644] h-full rounded-full" style={{ width: `${activeThread.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-150">
                  <span className="text-xs font-semibold text-slate-500">Engagement Level</span>
                  <span className="text-[10px] font-extrabold text-white bg-[#006644] px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {activeThread.engagement}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const learner = mockFacilitatorLearners.find(
                  l => l.name.toLowerCase() === activeThread.startedBy.toLowerCase()
                );
                const targetId = learner ? learner.id : "SUST-LRN-0442";
                navigateTo(`/facilitator/learners/${targetId}` as RoutePath);
              }}
              className="w-full text-center mt-6 text-xs font-bold py-2.5 rounded-xl cursor-pointer border border-slate-200 text-[#006644] hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 transition-all duration-200 focus-ring"
            >
              View Learner Profile
            </button>
          </div>

          {/* Card 3: Moderator Action Checklists */}
          <div className="bg-white border border-slate-200 border-l-[4px] border-l-[#006644] rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#006644] uppercase tracking-wider block font-sans">
                MODERATOR ACTION
              </span>
              
              <ul className="space-y-3 text-xs font-medium text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5 font-bold">
                    <Check className="h-3.5 w-3.5 stroke-[3px]" />
                  </div>
                  <span>Validate learner’s concern as constructive.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5 font-bold">
                    <Check className="h-3.5 w-3.5 stroke-[3px]" />
                  </div>
                  <span>Provide structured ‘Elevator Pitch’ framework.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                  <span>Link to Module 4 Resource Guide.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                  <span>Close thread as ‘Facilitator Verified.’</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 3 — DRAFT FACILITATOR RESPONSE */}
        <div id="draft-response-section" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Draft Facilitator Response
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400 font-mono">Auto-saved at 14:02</span>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1 rounded-lg">
                <button 
                  type="button" 
                  onClick={() => showToast("Bold markdown tag added.")}
                  className="p-1 hover:bg-slate-200 rounded text-slate-700 font-bold text-xs cursor-pointer" 
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </button>
                <button 
                  type="button" 
                  onClick={() => showToast("Italic markdown tag added.")}
                  className="p-1 hover:bg-slate-200 rounded text-slate-700 italic text-xs cursor-pointer" 
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </button>
                <button 
                  type="button" 
                  onClick={() => showToast("Link markdown tag added.")}
                  className="p-1 hover:bg-slate-200 rounded text-slate-700 text-xs cursor-pointer" 
                  title="Insert Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              rows={8}
              value={responseDraft}
              onChange={(e) => setResponseDraft(e.target.value)}
              className="w-full border border-slate-250 bg-slate-50/30 p-4 text-xs rounded-xl focus:outline-hidden focus:border-[#006644] text-slate-700 leading-relaxed font-sans"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <button
              onClick={handleAttachChecklist}
              className="flex items-center gap-2 text-xs font-bold text-[#006644] hover:text-emerald-900 transition-all duration-200 cursor-pointer focus-ring rounded-lg px-2 py-1 hover:bg-emerald-50/50"
            >
              <span className="font-bold text-sm">&#128206;</span> Attach Interview Checklist
            </button>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleSaveDraft}
                className="bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer focus-ring"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublishResponse}
                className="text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer bg-[#006644] hover:bg-emerald-800 active:bg-emerald-950 text-white transition-all duration-200 focus-ring"
              >
                Publish Response
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4 — REPORTED CONCERNS */}
        <div id="flagged-posts-section" className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 text-left font-sans">
            Reported Concerns (2)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flaggedPosts.map((flag) => (
              <div 
                key={flag.id} 
                className="bg-[#fff5f5] border border-[#ffd8d8] rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-red-300 cursor-pointer"
              >
                <div className="absolute top-5 right-5">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-red-700 bg-red-100/65 px-2.5 py-0.5 rounded uppercase tracking-wider font-sans">
                      {flag.type}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{flag.post}</h4>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-650 font-medium leading-relaxed">{flag.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-5 mt-6 border-t border-[#ffebeb]">
                  <button
                    onClick={() => handleDeletePost(flag.id)}
                    className="flex-1 text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer bg-red-650 hover:bg-red-750 active:bg-red-850 transition-all duration-200 focus-ring border-none"
                  >
                    Delete Post
                  </button>
                  <button
                    onClick={() => {
                      if (flag.type === "Incorrect Information") {
                        handleDismissReport(flag.id);
                      } else {
                        handleIssueWarning(flag.author);
                      }
                    }}
                    className="flex-1 text-xs font-bold py-2.5 rounded-xl cursor-pointer bg-white border border-slate-250 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 transition-all duration-200 focus-ring"
                  >
                    {flag.type === "Incorrect Information" ? "Dismiss Report" : "Issue Warning"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5 — COMMUNITY RULES REVIEW + APPROVED GUIDES & RESOURCES */}
        <div id="rules-review-section" className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          
          {/* Left card: Community Rules Review */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Community Rules Review
              </h3>
              
              <div className="space-y-4 text-xs font-medium text-slate-650 pt-2">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex gap-4 p-2 rounded-xl hover:bg-slate-50 transition-all duration-200">
                    <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {rule.num}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">{rule.title}</h4>
                      <p className="text-slate-500 leading-relaxed font-medium">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleOpenEditRules}
              className="w-full text-center mt-6 text-xs font-bold py-2.5 rounded-xl cursor-pointer bg-white border border-slate-250 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 transition-all duration-200 focus-ring"
            >
              Edit Community Rules
            </button>
          </div>

          {/* Right card: Approved Guides & Resources */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Approved Guides & Resources
              </h3>
              
              <div className="space-y-3 pt-2">
                {resources.map((guide, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 hover:border-emerald-200 rounded-xl border border-slate-150 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${guide.badgeStyle || "bg-emerald-50 text-emerald-800 border-emerald-100"}`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{guide.title}</h4>
                        <p className="text-[10px] text-slate-450 font-semibold">{guide.format}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast("Resource download simulated in this frontend prototype.")}
                      className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-755 cursor-pointer transition-colors"
                    >
                      <Download className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsAddResourceOpen(true)}
              className="w-full text-center mt-6 text-xs font-bold py-2.5 rounded-xl cursor-pointer bg-slate-100 hover:bg-slate-200 text-indigo-850 transition-all duration-200 focus-ring border-none"
            >
              Add New Resource
            </button>
          </div>
        </div>

        {/* SECTION 6 — COMPOSE COHORT ANNOUNCEMENT */}
        <div id="announcement-form-section" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left space-y-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
          <h3 className="text-base font-bold text-slate-900 font-sans">
            Compose Cohort Announcement
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">ANNOUNCEMENT TITLE</label>
              <input
                type="text"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="e.g. Schedule Change for Module 5 Workshop"
                className="w-full border border-slate-250 bg-white p-3 text-xs rounded-xl focus:outline-hidden focus:border-[#006644] font-medium"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">MESSAGE CONTENT</label>
              <textarea
                rows={4}
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                placeholder="Provide details for the entire cohort..."
                className="w-full border border-slate-250 bg-white p-3.5 text-xs rounded-xl focus:outline-hidden focus:border-[#006644] font-medium"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={emailAll}
                    onChange={(e) => setEmailAll(e.target.checked)}
                    className="rounded border-slate-300 text-[#006644] focus:ring-[#006644] cursor-pointer h-4 w-4"
                  />
                  <span>Email all learners</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={smsUrgent}
                    onChange={(e) => setSmsUrgent(e.target.checked)}
                    className="rounded border-slate-300 text-[#006644] focus:ring-[#006644] cursor-pointer h-4 w-4"
                  />
                  <span>SMS urgent alert (Low-Bandwidth)</span>
                </label>
              </div>

              <button
                onClick={handleSendAnnouncement}
                className="text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer bg-[#006644] hover:bg-emerald-800 active:bg-emerald-950 text-white transition-all duration-200 focus-ring"
              >
                Send Announcement
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 7 — LEARNER QUESTION LINKS + LOW-BANDWIDTH ACCESS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Card: Learner Question Links */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block font-sans">
                LEARNER QUESTION LINKS
              </span>
              
              <div className="space-y-4 pt-1">
                {[
                  { q: "Where can I find the assignment template?", a: "In Module 2 Resources" },
                  { q: "Is there a late submission penalty?", a: "See Course Handbook Section 4" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer">
                    <p className="font-bold text-slate-900 text-sm">{item.q}</p>
                    <p className="text-amber-800 font-semibold">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Low-Bandwidth Access */}
          <div className="bg-white border border-slate-200 border-l-[4px] border-l-[#b57c1e] rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-200 cursor-pointer">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-[#b57c1e] uppercase tracking-widest block font-sans">
                LOW-BANDWIDTH ACCESS
              </span>
              
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  32% of learners in Kano Cohort 02 are currently using the data-saver Lite interface.
                </p>
                <div className="p-4 bg-[#fdf8f0] rounded-xl space-y-1.5 border border-[#fbf5eb]">
                  <span className="text-[10px] font-extrabold text-[#b57c1e] uppercase tracking-wider block">Facilitator Tip:</span>
                  <p className="text-[11px] text-slate-650 font-medium leading-relaxed">
                    When responding, avoid embedding heavy images or high-res videos. Use text-based summaries and PDF links.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast("Lite-access statistics simulated in this frontend prototype.")}
              className="text-left mt-4 text-[#b57c1e] hover:text-[#8c5a11] hover:underline text-xs font-bold transition-all duration-200 cursor-pointer inline-block"
            >
              View Lite-Access Statistics
            </button>
          </div>
        </div>

        {/* SECTION 8 — MODERATION ACTION RECORD + COMMUNITY ACTIVITY TIMELINE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Card: Moderation Action Record */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="bg-[#edf2f7]/50 px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900 font-sans">
                Moderation Action Record
              </h3>
            </div>
            
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                  <span className="font-semibold text-slate-600">Posts Deleted</span>
                  <span className="font-extrabold text-slate-900 text-sm">4</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                  <span className="font-semibold text-slate-600">Warnings Issued</span>
                  <span className="font-extrabold text-slate-900 text-sm">2</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
                  <span className="font-semibold text-slate-600">Learners Muted</span>
                  <span className="font-extrabold text-slate-900 text-sm">0</span>
                </div>
              </div>

              <button
                onClick={() => showToast("Download monthly report simulated in this frontend prototype.")}
                className="w-full text-center mt-4 text-xs font-bold py-2.5 rounded-xl cursor-pointer bg-white border border-slate-250 text-[#006644] hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 transition-all duration-200 focus-ring"
              >
                Download Monthly Report
              </button>
            </div>
          </div>

          {/* Right Card: Community Activity Timeline */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs text-left flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <div className="bg-[#edf2f7]/50 px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900 font-sans">
                Community Activity Timeline
              </h3>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="relative pl-6 space-y-5 border-l-2 border-slate-100 py-1">
                {[
                  { title: "New discussion started", meta: "Aisha M. • 2 hours ago", color: "bg-emerald-600" },
                  { title: "Content reported", meta: "Anonymous • 4 hours ago", color: "bg-red-500" },
                  { title: "Announcement published", meta: "System • 1 day ago", color: "bg-slate-400" }
                ].map((activity, idx) => (
                  <div key={idx} className="relative text-xs p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer">
                    {/* Circle positioning absolutely over the left border line */}
                    <div className={`absolute -left-[31px] top-3 h-2.5 w-2.5 rounded-full ${activity.color} ring-4 ring-white`} />
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-950 text-sm">{activity.title}</h4>
                      <p className="text-slate-400 font-semibold">{activity.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 9 — SUPPORT TICKET LINKS + COMMUNITY REPORTS */}
        <div id="support-status-section" className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          
          {/* Left Card: Support Ticket Links */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200 cursor-pointer">
            <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-wider border-b border-slate-50 pb-2">
              Support Ticket Links
            </h3>
            
            <div className="space-y-3.5">
              {[
                { title: "Login issue reported", status: "PENDING", style: "bg-[#eff6ff] text-[#1e40af] border-transparent" },
                { title: "Mobile app sync error", status: "RESOLVED", style: "bg-emerald-50 text-emerald-800 border-emerald-150" }
              ].map((ticket, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-250 border border-transparent rounded-xl text-xs transition-all duration-200 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm">&#127915;</span>
                    <span className="font-bold text-slate-800">{ticket.title}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase border ${ticket.style}`}>
                    {ticket.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Community Reports */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left space-y-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-pointer">
            <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-wider border-b border-slate-50 pb-2">
              Community Reports
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4 hover:bg-slate-50/55 p-2 rounded-xl transition-all duration-200 cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#006644] shrink-0 mt-0.5">
                  <PieChart className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-slate-900 text-sm">Engagement Analytics</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed">Weekly engagement up by 14%</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t border-slate-100 pt-4 hover:bg-slate-50/55 p-2 rounded-xl transition-all duration-200 cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#006644] shrink-0 mt-0.5">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-slate-900 text-sm">Moderator Response Time</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed">Average response: 3.2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EXTRA OPERATIONAL CTA */}
        <div className="bg-[#eff6ff] border border-blue-150 rounded-2xl p-8 shadow-2xs text-center space-y-4 max-w-4xl mx-auto mt-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center mx-auto border border-blue-200">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 font-sans">
              Recommended Next Action
            </h3>
            <p className="text-xs text-slate-650 leading-relaxed max-w-xl mx-auto font-medium">
              Respond to the “Interview Preparation” discussion by Aisha Mohammed. Providing clarity here will reduce repetitive questions from the rest of the cohort.
            </p>
          </div>
          <button
            onClick={handleNextAction}
            className="text-xs font-bold px-6 py-3 rounded-xl cursor-pointer inline-flex items-center gap-2 bg-[#006644] hover:bg-emerald-800 active:bg-emerald-950 text-white transition-all duration-200 focus-ring border-none"
          >
            Respond to Interview Preparation Discussion <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* ========================================== */}
      {/* 📱 MOBILE LAYOUT (block lg:hidden class)  */}
      {/* ========================================== */}
      <div className="lg:hidden space-y-6 pb-24 text-left px-2 sm:px-4">
        
        {/* MOBILE TOP BAR */}
        <div className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 sticky top-0 z-10 -mx-4 sm:-mx-6">
          <button 
            onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)}
            className="p-1 rounded-full hover:bg-slate-50 text-slate-600 flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>
          <span className="font-extrabold text-sm text-slate-900 font-sans">Community</span>
          <div className="flex items-center gap-2">
            <button className="p-1 text-slate-500 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
            </button>
            <div className="h-7 w-7 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold">
              HS
            </div>
          </div>
        </div>

        {/* MOBILE COMMUNITY HERO CARD */}
        <div className="bg-[#006644] text-white rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-extrabold bg-emerald-800/80 px-2 py-0.5 rounded-md border border-emerald-700/50 uppercase tracking-wider">
              Active Cohorts: 12
            </span>
            <span className="text-[9px] font-extrabold bg-emerald-800/80 px-2 py-0.5 rounded-md border border-emerald-700/50 uppercase tracking-wider">
              Uptime: 99.8%
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black font-sans leading-tight">
              Community Moderation
            </h2>
            <p className="text-xs text-emerald-100 leading-relaxed font-medium">
              Managing 450+ learners across active agribusiness cohorts.
            </p>
          </div>
          <div className="flex items-center gap-2.5 pt-1.5">
            <button
              onClick={() => {
                const el = document.getElementById("mobile-global-broadcast");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
                showToast("Opening broadcast compose panel");
              }}
              className="flex-1 bg-white hover:bg-slate-100 active:bg-slate-200 text-[#006644] text-[11px] font-extrabold py-2 rounded-xl transition-all text-center focus-ring"
            >
              Create Announcement
            </button>
            <button
              onClick={() => showToast("Community log sync simulated in this frontend prototype.")}
              className="flex-1 bg-emerald-800 hover:bg-emerald-750 active:bg-emerald-900 text-white text-[11px] font-bold py-2 rounded-xl transition-all border border-emerald-700/60 text-center focus-ring"
            >
              Sync Logs
            </button>
          </div>
        </div>

        {/* MOBILE METRIC CARDS */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "open", label: "Open Discussions", count: "18", icon: MessageSquare, accent: "text-slate-800", iconColor: "text-emerald-700/80" },
            { id: "needed", label: "Response Needed", count: "6", icon: MessageCircle, accent: "text-[#006644] font-extrabold", iconColor: "text-emerald-600" },
            { id: "reported", label: "Reported Concerns", count: "2", icon: AlertTriangle, accent: "text-red-650", iconColor: "text-red-500" },
            { id: "guides", label: "Approved Guides", count: "12", icon: BookOpen, accent: "text-slate-800", iconColor: "text-emerald-700/80" },
            { id: "announcements", label: "Cohort Announcements", count: "3", icon: Megaphone, accent: "text-slate-800", iconColor: "text-slate-500" },
            { id: "resolved", label: "Resolved Discussions", count: "24", icon: Check, accent: "text-slate-800", iconColor: "text-slate-500" }
          ].map((card) => {
            const IconComponent = card.icon;
            return (
              <div 
                key={card.id} 
                onClick={() => showToast(`Filtered queue by metric: ${card.label}`)}
                className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5 shadow-2xs active:bg-emerald-50 active:scale-[0.99] transition-all duration-100 cursor-pointer text-left flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                    {card.label}
                  </span>
                  <span className={`text-xl font-black ${card.accent}`}>{card.count}</span>
                </div>
                <IconComponent className={`h-4.5 w-4.5 ${card.iconColor} opacity-50 shrink-0 ml-2`} />
              </div>
            );
          })}
        </div>

        {/* MOBILE THREAD FILTER PILLS */}
        <div className="overflow-x-auto -mx-4 px-4 scrollbar-none">
          <div className="flex items-center gap-1.5 pb-1 min-w-max">
            {[
              { id: "all", label: "All Threads" },
              { id: "waiting", label: "Waiting on Me" },
              { id: "flagged", label: "Flagged" }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => {
                  setMobileFilter(pill.id as any);
                  showToast(`Filtered queue by: ${pill.label}`);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  mobileFilter === pill.id 
                    ? "bg-[#006644] text-white border border-transparent" 
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE COHORT QUEUE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-950 font-sans uppercase tracking-wider">
              Cohort Queue
            </h3>
            <button
              onClick={() => showToast("Archived queue simulation active")}
              className="text-xs font-bold text-[#006644] hover:text-[#004d33] transition-colors focus-ring rounded px-1"
            >
              See All
            </button>
          </div>

          <div className="space-y-3">
            {/* Thread Card 1: Interview Prep */}
            <div 
              onClick={() => handleMobileSelectThread("disc-1")}
              className={`bg-white border rounded-xl p-4 space-y-2.5 transition-all cursor-pointer active:bg-slate-50/50 focus-ring ${
                activeThreadId === "disc-1" ? "border-emerald-700/80 ring-1 ring-emerald-600/30 bg-[#edfcf7]" : "border-slate-200"
              }`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleMobileSelectThread("disc-1")}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white bg-[#006644] px-2 py-0.5 rounded uppercase tracking-wider">
                  Response Needed
                </span>
                <span className="text-[10px] text-slate-400 font-medium font-mono">2h ago</span>
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-extrabold text-slate-900">How should I prepare for interview questions?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
                  I have an interview with Olam International next week for the farm manager role. Any specific...
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-50 text-slate-450 font-bold">
                <span>4 replies</span>
                <span className="text-[#006644]">★ Moderate</span>
              </div>
            </div>

            {/* Thread Card 2: Project Management */}
            <div 
              onClick={() => handleMobileSelectThread("disc-2")}
              className={`bg-white border rounded-xl p-4 space-y-2.5 transition-all cursor-pointer active:bg-slate-50/50 focus-ring ${
                activeThreadId === "disc-2" ? "border-emerald-700/80 ring-1 ring-emerald-600/30 bg-[#edfcf7]" : "border-slate-200"
              }`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleMobileSelectThread("disc-2")}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                  Open
                </span>
                <span className="text-[10px] text-slate-400 font-medium font-mono">5h ago</span>
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-extrabold text-slate-900">Feedback on Module 3 Assignment tasks</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
                  When can we expect feedback on our Module 3 assignments? I submitted mine on Wednesday...
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-50 text-slate-440 font-bold">
                <span>2 replies</span>
                <span className="text-[#006644]">View</span>
              </div>
            </div>

            {/* Thread Card 3: Reported LinkedIn link */}
            <div 
              onClick={() => handleMobileSelectThread("disc-3")}
              className={`bg-white border rounded-xl p-4 space-y-2.5 transition-all cursor-pointer active:bg-slate-50/50 focus-ring ${
                activeThreadId === "disc-3" ? "border-red-650 ring-1 ring-red-600/30 bg-red-50/20" : "border-slate-200"
              }`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleMobileSelectThread("disc-3")}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-100 uppercase tracking-wider">
                  Reported
                </span>
                <span className="text-[10px] text-slate-400 font-medium font-mono">1d ago</span>
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-extrabold text-slate-900">Can we share LinkedIn profiles here?</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
                  Hey guys, I want to connect with you on LinkedIn! Here is my profile link...
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-50 text-red-650 font-bold">
                <span>Unapproved Link</span>
                <span>Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ACTIVE THREAD DETAIL */}
        <div id="mobile-active-thread" className="space-y-2.5">
          <h3 className="text-sm font-black text-slate-950 font-sans uppercase tracking-wider">
            Active Thread Detail
          </h3>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                CN
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Chidi Njoku</h4>
                <p className="text-[9px] text-slate-400 font-semibold uppercase">Learner • Cohort 24B</p>
              </div>
            </div>
            <p className="text-xs text-slate-650 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg">
              “I’m specifically worried about the technical questions regarding NPK ratios for maize cultivation in sandy-loam soils. Is there a cheat sheet for this?”
            </p>
          </div>
        </div>

        {/* MOBILE YOUR RESPONSE */}
        <div id="mobile-your-response" className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-[#006644]">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-extrabold uppercase font-sans tracking-wide">Your Response</span>
          </div>

          <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50 text-[10px] text-indigo-900 leading-relaxed">
            <span className="font-bold">Guideline:</span> Be encouraging and reference module 4.2.
          </div>

          <textarea
            rows={4}
            placeholder="Type your professional response here..."
            className="w-full border border-slate-200 bg-slate-50/50 p-3 text-xs rounded-xl focus:outline-hidden focus:border-[#006644] text-slate-750 font-medium"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => showToast("Format Bold simulated")}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
              >
                <Bold className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => showToast("Attachment checklist simulated")}
                className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => showToast("Response published locally in this frontend prototype.")}
              className="text-white text-xs font-extrabold px-5 py-2 rounded-xl interactive-button-primary focus-ring"
            >
              Post Reply
            </button>
          </div>
        </div>

        {/* MOBILE FLAGGED FOR REVIEW */}
        <div id="mobile-flagged-review" className="bg-rose-50 border border-[#ffd8d8] rounded-xl p-4 space-y-3.5">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-black uppercase font-sans tracking-wider">Flagged for Review</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-slate-900">Abiola T. • 1h ago</span>
              <button
                onClick={() => {
                  const el = document.getElementById("mobile-active-thread");
                  el?.scrollIntoView({ behavior: "smooth" });
                  showToast("Loading reported context for Abiola T.");
                }}
                className="text-xs font-bold text-[#006644] hover:text-[#004d33] transition-colors focus-ring rounded px-1.5 py-0.5 border border-transparent hover:border-emerald-700/25"
              >
                Review
              </button>
            </div>
            <p className="text-slate-500 font-medium italic">“This link isn’t working for me and...”</p>
          </div>
        </div>

        {/* MOBILE MODERATION TOOLBOX */}
        <div id="mobile-moderation-toolbox" className="space-y-2.5">
          <h3 className="text-sm font-black text-slate-950 font-sans uppercase tracking-wider">
            Moderation Toolbox
          </h3>

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
            <div 
              onClick={() => showToast("Opening community rules list")}
              className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Community Rules</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
            <div 
              onClick={() => showToast("Opening escalation protocol directives")}
              className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">Escalation SOPs</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* MOBILE GLOBAL BROADCAST */}
        <div id="mobile-global-broadcast" className="bg-blue-50 border border-blue-150 rounded-xl p-4 space-y-3.5">
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-900 font-sans uppercase tracking-wider">
              Global Broadcast
            </h4>
            <p className="text-[10px] text-slate-450 font-semibold leading-relaxed">
              Send a push notification to all cohorts.
            </p>
          </div>

          <div className="space-y-2.5">
            <input
              type="text"
              value={mobileBroadcastTitle}
              onChange={(e) => setMobileBroadcastTitle(e.target.value)}
              placeholder="Announcement Title"
              className="w-full border border-slate-200 bg-white p-2.5 text-xs rounded-xl focus:outline-hidden focus:border-blue-500 font-medium"
            />
            <textarea
              rows={3}
              value={mobileBroadcastContent}
              onChange={(e) => setMobileBroadcastContent(e.target.value)}
              placeholder="Message content..."
              className="w-full border border-slate-200 bg-white p-2.5 text-xs rounded-xl focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <button
            onClick={handleSendMobileBroadcast}
            className="w-full text-white text-xs font-extrabold py-2.5 rounded-xl text-center flex items-center justify-center gap-1 interactive-button-primary focus-ring"
          >
            <Megaphone className="h-3.5 w-3.5" /> Broadcast Now
          </button>
        </div>

        {/* MOBILE SMS MODE / QUICK LINKS */}
        <div className="grid grid-cols-2 gap-3">
          <div 
            onClick={() => showToast("SMS low bandwidth toggle simulated")}
            className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 hover:border-slate-300 transition-all cursor-pointer text-center"
          >
            <div className="mx-auto h-7 w-7 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Smartphone className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 block">SMS Mode</span>
            <span className="text-[9px] text-slate-400 font-bold block">LOW BANDWIDTH</span>
          </div>

          <div 
            onClick={() => showToast("Course resources drawer opened")}
            className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 hover:border-slate-300 transition-all cursor-pointer text-center"
          >
            <div className="mx-auto h-7 w-7 rounded-full bg-indigo-50 text-indigo-800 flex items-center justify-center">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 block">Quick Links</span>
            <span className="text-[9px] text-slate-400 font-bold block">COURSE DOCS</span>
          </div>
        </div>

        {/* MOBILE ACTIVITY LOG */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-black text-slate-950 font-sans uppercase tracking-wider">
            Activity Log
          </h3>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3.5">
            <div className="flex items-start gap-3 text-xs">
              <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-850 flex items-center justify-center mt-0.5 font-bold shrink-0">
                ✓
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-slate-800">Resolved “Maize NPK” thread</h4>
                <p className="text-[10px] text-slate-400 font-semibold">10:45 AM • Handled by you</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs border-t border-slate-50 pt-3">
              <div className="h-5 w-5 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mt-0.5 font-bold shrink-0">
                ▲
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-slate-800">Flagged comment from “Abiola T.”</h4>
                <p className="text-[10px] text-slate-400 font-semibold">09:12 AM • Automatic System</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SUPPORT STATUS */}
        <div className="bg-slate-100/40 border border-slate-200 rounded-xl p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase font-sans tracking-wide text-slate-900">Support Status</span>
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white border border-slate-150 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 font-bold block">Active Tickets</span>
              <span className="text-base font-extrabold text-slate-800">04</span>
            </div>
            <div className="bg-white border border-slate-150 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 font-bold block">Escalated to Tech</span>
              <span className="text-base font-extrabold text-slate-800">01</span>
            </div>
          </div>
        </div>

        {/* MOBILE READY FOR NEXT BATCH CTA */}
        <div className="bg-blue-50 border border-blue-150 rounded-2xl p-5 text-center space-y-3">
          <h4 className="text-sm font-black text-slate-900 font-sans">
            Ready for Next Batch?
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            You’ve cleared 85% of your morning queue. 3 reviews pending for Cohort 24B.
          </p>
          <button
            onClick={() => showToast("Assessment review opened in this frontend prototype.")}
            className="w-full text-white text-xs font-extrabold py-3 rounded-xl shadow-xs cursor-pointer inline-flex items-center justify-center gap-1.5 interactive-button-primary focus-ring"
          >
            Review Pending Assessments <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* FLOATING ACTION BUTTON FOR MOBILE */}
        <FacilitatorMobileActionMenu actions={mobileFabActions} />

      </div>

      {/* ==========================================
          ACTION 1: EDIT COMMUNITY RULES MODAL
          ========================================== */}
      {isEditRulesOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto transition-opacity">
          {/* Backdrop Overlay to close on outside click */}
          <div className="absolute inset-0" onClick={() => setIsEditRulesOpen(false)} />

          {/* Modal Container: bottom-sheet on mobile, centered modal on desktop */}
          <div className="relative bg-white w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 text-left">
            {/* Mobile Bottom Sheet Notch */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-150 bg-slate-50 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide font-mono">
                  Edit Community Rules
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Update the discussion rules shown to learners in this cohort.
                </p>
              </div>
              <button
                onClick={() => setIsEditRulesOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer focus-ring"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="space-y-4">
                {rulesEditList.map((rule, index) => (
                  <div 
                    key={rule.id}
                    className="p-4 bg-slate-50 hover:bg-emerald-50/20 border border-slate-200 hover:border-emerald-200 rounded-xl transition-all duration-200 flex gap-4 items-start relative group"
                  >
                    {/* Reorder/Number badge handle */}
                    <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                      <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center font-bold text-xs">
                        {index + 1}
                      </span>
                      <div className="text-slate-300 cursor-grab active:cursor-grabbing hover:text-slate-450 transition-colors p-0.5 sm:block hidden">
                        <GripVertical className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 space-y-2 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-455 uppercase tracking-wide">
                          Rule Title
                        </label>
                        <input
                          type="text"
                          value={rule.title}
                          onChange={(e) => handleRuleFieldChange(rule.id, "title", e.target.value)}
                          placeholder="e.g. Professional Respect"
                          className="w-full bg-white border border-slate-250 rounded-lg px-3 py-1.5 font-bold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-455 uppercase tracking-wide">
                          Rule Description
                        </label>
                        <textarea
                          rows={2}
                          value={rule.desc}
                          onChange={(e) => handleRuleFieldChange(rule.id, "desc", e.target.value)}
                          placeholder="Describe the rule learners should follow..."
                          className="w-full bg-white border border-slate-250 rounded-lg px-3 py-1.5 font-medium text-slate-700 leading-relaxed focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Remove Action Button */}
                    <button
                      onClick={() => handleRemoveRuleDraft(rule.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors focus-ring self-start mt-4"
                      title="Remove Rule"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Rule Button */}
              <button
                onClick={handleAddRuleDraft}
                className="w-full py-3 border border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-xl text-xs font-bold text-[#006644] flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-ring"
              >
                <Plus className="h-4 w-4" /> Add Rule
              </button>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex justify-end gap-3 shrink-0 pb-6 sm:pb-4">
              <button
                onClick={() => setIsEditRulesOpen(false)}
                className="px-5 py-2.5 bg-white border border-slate-250 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-98 focus-ring"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRules}
                className="px-5 py-2.5 bg-[#006644] hover:bg-emerald-800 active:bg-emerald-950 text-white rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-98 shadow-sm focus-ring"
              >
                Save Rules
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ==========================================
          ACTION 2: ADD NEW RESOURCE MODAL
          ========================================== */}
      {isAddResourceOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto transition-opacity">
          {/* Backdrop Overlay to close on outside click */}
          <div className="absolute inset-0" onClick={() => setIsAddResourceOpen(false)} />

          {/* Modal Container: bottom-sheet on mobile, centered modal on desktop */}
          <div className="relative bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 text-left">
            {/* Mobile Bottom Sheet Notch */}
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-150 bg-slate-50 flex justify-between items-start shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide font-mono">
                  Add New Resource
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Attach a guide or support document that facilitators can use in community responses.
                </p>
              </div>
              <button
                onClick={() => setIsAddResourceOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer focus-ring"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Resource Title */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-600">Resource Title</label>
                  <input
                    type="text"
                    value={resourceTitle}
                    onChange={(e) => setResourceTitle(e.target.value)}
                    placeholder="e.g. Interview Preparation Guide"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-3 py-2.5 font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-sans"
                  />
                </div>

                {/* Resource Type */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Resource Type</label>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-3 py-2.5 font-bold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-mono"
                  >
                    <option value="PDF Guide">PDF Guide</option>
                    <option value="Checklist">Checklist</option>
                    <option value="Lesson Summary">Lesson Summary</option>
                    <option value="Video Link">Video Link</option>
                    <option value="Low-Bandwidth Resource">Low-Bandwidth Resource</option>
                    <option value="Template">Template</option>
                  </select>
                </div>

                {/* Related Area */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">Related Area</label>
                  <select
                    value={resourceArea}
                    onChange={(e) => setResourceArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-3 py-2.5 font-bold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-mono"
                  >
                    <option value="Work Readiness">Work Readiness</option>
                    <option value="Interview Preparation">Interview Preparation</option>
                    <option value="Assessment Support">Assessment Support</option>
                    <option value="Low-Bandwidth Support">Low-Bandwidth Support</option>
                    <option value="Certification / CPD">Certification / CPD</option>
                    <option value="Community Guidance">Community Guidance</option>
                  </select>
                </div>

                {/* File Upload / Link Area */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-slate-600 block">Upload file or paste resource link</label>
                  
                  {/* Pale Green File Drag-Drop Area */}
                  <div 
                    onClick={() => showToast("File explorer simulated. Ready for prototype use.")}
                    className="border border-dashed border-emerald-250 bg-emerald-50/20 hover:bg-emerald-50/45 hover:border-emerald-450 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 space-y-1 group"
                  >
                    <div className="h-8 w-8 rounded-full bg-emerald-100/50 flex items-center justify-center mx-auto text-emerald-800 group-hover:scale-110 transition-transform">
                      <FileText className="h-4.5 w-4.5" />
                    </div>
                    <p className="text-[11px] font-bold text-emerald-900">Drag & drop or click to choose file</p>
                    <p className="text-[10px] text-slate-450 font-semibold">PDF, DOCX, XLSX, or trusted programme link.</p>
                  </div>

                  {/* Or Link Paste */}
                  <div className="relative mt-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <LinkIcon className="h-3.5 w-3.5" />
                    </span>
                    <input
                      type="text"
                      value={resourceFileOrLink}
                      onChange={(e) => setResourceFileOrLink(e.target.value)}
                      placeholder="Or paste direct external download link..."
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl pl-9 pr-3 py-2 font-medium text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Visibility */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-600">Visibility</label>
                  <select
                    value={resourceVisibility}
                    onChange={(e) => setResourceVisibility(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-3 py-2.5 font-bold text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-mono"
                  >
                    <option value="Facilitators only">Facilitators only</option>
                    <option value="Facilitators and learners">Facilitators and learners</option>
                    <option value="Programme staff only">Programme staff only</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-600">Description</label>
                  <textarea
                    rows={3}
                    value={resourceDescription}
                    onChange={(e) => setResourceDescription(e.target.value)}
                    placeholder="Briefly explain when this resource should be used..."
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl p-3 font-medium text-slate-700 leading-relaxed focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 hover:border-slate-300 transition-all font-sans"
                  />
                </div>

                {/* Checkboxes */}
                <div className="sm:col-span-2 space-y-2 bg-slate-50 border border-slate-150 rounded-xl p-3">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={resourceMarkApproved}
                      onChange={(e) => setResourceMarkApproved(e.target.checked)}
                      className="rounded border-slate-300 text-[#006644] focus:ring-[#006644] h-4 w-4"
                    />
                    <span className="font-semibold text-slate-700 text-[11px]">Mark as approved guide</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={resourceLowBandwidth}
                      onChange={(e) => setResourceLowBandwidth(e.target.checked)}
                      className="rounded border-slate-300 text-[#006644] focus:ring-[#006644] h-4 w-4"
                    />
                    <span className="font-semibold text-slate-700 text-[11px]">Make available for low-bandwidth responses</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={resourceShowInCommunity}
                      onChange={(e) => setResourceShowInCommunity(e.target.checked)}
                      className="rounded border-slate-300 text-[#006644] focus:ring-[#006644] h-4 w-4"
                    />
                    <span className="font-semibold text-slate-700 text-[11px]">Show in community response attachments</span>
                  </label>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex justify-end gap-3 shrink-0 pb-6 sm:pb-4">
              <button
                onClick={() => setIsAddResourceOpen(false)}
                className="px-5 py-2.5 bg-white border border-slate-250 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-98 focus-ring"
              >
                Cancel
              </button>
              <button
                onClick={handleAddResource}
                className="px-5 py-2.5 bg-[#006644] hover:bg-emerald-800 active:bg-emerald-950 text-white rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-98 shadow-sm focus-ring"
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
