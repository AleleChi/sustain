import { useState, useRef } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  Send, 
  AlertTriangle, 
  Check, 
  MessageSquare, 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  ArrowRight, 
  X,
  Shield,
  Layers,
  FileText,
  UserCheck,
  CheckCircle2,
  Bookmark,
  ThumbsUp,
  Lock,
  ArrowUpRight,
  Info,
  Calendar,
  Sparkles,
  RefreshCw,
  Video
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";

interface SupportRequestItem {
  id: string;
  category: string;
  status: "Response received" | "Open" | "Closed";
  priority: "Normal" | "Low" | "High";
  assignedTo: string;
  lastUpdate: string;
  title: string;
  helper: string;
  route?: string;
}

export function LearnerSupportPage() {
  const { navigateTo } = useRoute();
  
  // Local states
  const [selectedCategory, setSelectedCategory] = useState("Certificate & CPD");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  
  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  const [requests, setRequests] = useState<SupportRequestItem[]>([
    {
      id: "SUP-2026-0184",
      title: "Certificate readiness review question",
      category: "Certificate & CPD",
      status: "Response received",
      priority: "Normal",
      assignedTo: "Halima Sani",
      lastUpdate: "Today",
      helper: "Facilitator response available about certificate review and pending CPD checks.",
      route: "/learner/support/certificate-readiness-request"
    },
    {
      id: "SUP-2026-0179",
      title: "Work Readiness Assignment guidance",
      category: "Assessment support",
      status: "Open",
      priority: "Normal",
      assignedTo: "Halima Sani",
      lastUpdate: "Yesterday",
      helper: "Question about how to structure the written assignment response."
    },
    {
      id: "SUP-2026-0171",
      title: "Low-bandwidth material access",
      category: "Resources",
      status: "Closed",
      priority: "Low",
      assignedTo: "Support Center",
      lastUpdate: "2 days ago",
      helper: "Help request about accessing the low-bandwidth reading version."
    }
  ]);

  const handleAction = (route: string) => {
    navigateTo(route as any);
  };

  const scrollToComposer = () => {
    const el = document.getElementById("support-composer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      showToast("Add a subject and message before sending.", "warning");
      return;
    }

    const newRequest: SupportRequestItem = {
      id: `SUP-2026-0${Math.floor(100 + Math.random() * 900)}`,
      title: subject,
      category: selectedCategory,
      status: "Open",
      priority: "Normal",
      assignedTo: "Halima Sani",
      lastUpdate: "Just now",
      helper: message
    };

    setRequests(prev => [newRequest, ...prev]);
    showToast("Support request saved in this frontend prototype.", "success");
    setSubject("");
    setMessage("");
  };

  const handleClearDraft = () => {
    setSubject("");
    setMessage("");
    showToast("Draft cleared.", "info");
  };

  const handleSaveDraft = () => {
    showToast("Support draft saved locally in this frontend prototype.", "success");
  };

  const handleQuickHelpClick = (catName: string) => {
    setSelectedCategory(catName);
    scrollToComposer();
    showToast(`Category set to: ${catName}`, "info");
  };

  // Shared Learner Context
  const learner = {
    name: "Aisha Mohammed",
    id: "SUST-LRN-0442",
    programme: "SUSTAIN CPD Programme",
    pathway: "Youth Employability Pathway",
    organisation: "Kano Youth Skills Hub",
    cohort: "Kano Youth Employability Cohort 02",
    facilitator: "Halima Sani",
    currentCourse: "Work Readiness Foundation",
    currentLesson: "Preparing for Interviews",
    currentAssessment: "Work Readiness Assignment",
    certificate: "Work Readiness Certificate",
    certificateStatus: "Ready for certificate review",
    issueState: "Not issued",
    cpd: "22 of 35 credits",
    pendingCpd: "4 credits pending review"
  };

  // Support categories lists
  const categories = [
    { id: "cat-1", name: "Assessment Support", helper: "Get help understanding assignment requirements or submission steps.", icon: BookOpen },
    { id: "cat-2", name: "Certificate & CPD", helper: "Ask about certificate readiness, pending CPD credits, or review status.", icon: Award },
    { id: "cat-3", name: "Learning Materials", helper: "Get support with resources, downloads, transcripts, or low-bandwidth materials.", icon: FileText },
    { id: "cat-4", name: "Course Progress", helper: "Ask about lessons, course progress, or pathway milestones.", icon: Layers },
    { id: "cat-5", name: "Live Sessions", helper: "Ask about attendance, session packs, or joining a live session.", icon: Video },
    { id: "cat-6", name: "Community Safety", helper: "Report a concern or ask about safe participation.", icon: Shield }
  ];

  // -------------------------------------------------------------------------
  // REUSABLE SECTIONS FOR EACH LAYOUT MODE
  // -------------------------------------------------------------------------

  // SECTION 1 — SUPPORT HERO
  const SupportHero = () => (
    <Card id="support-hero" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch">
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-500 tracking-tight flex items-center gap-1">
              <span className="hover:text-slate-600 cursor-pointer" onClick={() => handleAction("/learner")}>Learner Workspace</span>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              <span className="text-slate-700 font-semibold">Support Centre</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Learner Support
              </span>
              <span className="text-[10.5px] font-semibold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Facilitator Guidance
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight mt-1">
              Support Centre
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-normal leading-relaxed max-w-xl">
              Ask for help with assessments, resources, certificate readiness, CPD records, community safety, or learner workspace navigation.
            </p>
          </div>

          {/* Context row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">Learner</p>
              <p className="text-slate-800 font-semibold truncate mt-0.5">{learner.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">Learner ID</p>
              <p className="text-slate-800 font-semibold truncate mt-0.5">{learner.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">Facilitator</p>
              <p className="text-emerald-800 font-semibold truncate mt-0.5">{learner.facilitator}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">Cohort</p>
              <p className="text-slate-800 font-semibold truncate mt-0.5">{learner.cohort}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={scrollToComposer}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              Start Support Request
            </Button>
            <Button
              onClick={() => handleAction("/learner/support/certificate-readiness-request")}
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer"
            >
              View Open Request
            </Button>
          </div>
        </div>

        {/* Latest Response Right Panel */}
        <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[220px]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-850/60 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-1">
            <span className="text-[9.5px] font-semibold text-emerald-300 uppercase tracking-wider bg-emerald-850/80 px-2 py-0.5 rounded-md inline-block">
              Latest Response
            </span>
            <h4 className="text-base font-semibold text-white leading-snug pt-1">
              Certificate readiness review question
            </h4>
            <p className="text-xs text-emerald-100 leading-relaxed font-normal">
              Halima Sani has responded with the next step for your certificate readiness.
            </p>
          </div>

          <div className="relative z-10 border-t border-emerald-800/50 pt-4 mt-2 flex items-center justify-between text-xs text-emerald-200 font-medium">
            <span>Response received</span>
            <span>•</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </Card>
  );

  // SECTION 2 — SUPPORT SUMMARY CARDS
  const SupportSummaryCards = () => (
    <div id="support-summary-cards" className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight block">Open Requests</span>
          <p className="text-xl font-semibold text-slate-800">1</p>
          <span className="text-xs text-slate-500 font-normal block">Awaiting follow-up</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight block">Response Received</span>
          <p className="text-xl font-semibold text-slate-800">1</p>
          <span className="text-xs text-slate-500 font-normal block">Certificate readiness</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight block">Support Categories</span>
          <p className="text-xl font-semibold text-slate-800">6</p>
          <span className="text-xs text-slate-500 font-normal block">Guidance areas</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight block">Facilitator</span>
          <p className="text-sm font-semibold text-emerald-800 truncate">{learner.facilitator}</p>
          <span className="text-xs text-slate-500 font-normal block">Support Contact</span>
        </div>
        <LearnerContextHint
          title="Helpful note"
          text="Your facilitator can guide learning, assessment, certificate, and CPD questions inside this frontend prototype."
          align="right"
        />
      </Card>
    </div>
  );

  // SECTION 3 — SUPPORT REQUEST COMPOSER
  const SupportRequestComposer = () => (
    <Card id="support-composer" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900 tracking-tight">Start a Support Request</h3>
        <p className="text-xs text-slate-500 font-normal">Choose a category and describe what you need help with.</p>
      </div>

      <form onSubmit={handleSendRequest} className="space-y-4">
        {/* Category selector row */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Category</label>
            <LearnerContextHint
              title="Tip"
              text="Choose the category that best matches your question so the right support guidance can be shown."
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:border-emerald-900 focus:bg-white transition-all font-medium"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Briefly describe your support question..."
            className="w-full text-xs px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:border-emerald-900 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Message textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Message</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain what you need help with..."
            className="w-full text-xs px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-900 focus:border-emerald-900 focus:bg-white transition-all font-medium resize-none leading-relaxed"
          />
        </div>

        {/* Privacy Info panel (soft blue style) */}
        <div className="p-3.5 bg-blue-50/40 border border-blue-100 rounded-xl flex items-start gap-2.5">
          <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 font-normal leading-relaxed">
            Do not share passwords, verification codes, private documents, or personal contact details.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-slate-100 w-full">
          <Button
            type="button"
            onClick={handleSaveDraft}
            variant="outline"
            className="w-full sm:w-auto text-xs font-semibold py-2 px-4 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer order-2 sm:order-1"
          >
            Save Draft
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-2 px-5 rounded-xl cursor-pointer sm:ml-auto order-1 sm:order-2"
          >
            Submit Request
          </Button>
        </div>
      </form>
    </Card>
  );

  // SECTION 4 — SUPPORT CATEGORIES
  const SupportCategoriesPanel = () => (
    <Card id="support-categories" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-900 tracking-tight">Support Categories</h3>
        <p className="text-xs text-slate-500 font-normal">Select the area that best matches your question.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.name);
                showToast(`Category selected: ${cat.name}`, "info");
              }}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 text-left ${
                isSelected 
                  ? "border-emerald-250 bg-emerald-50/50 shadow-xs" 
                  : "border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300"
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 border ${
                isSelected ? "bg-emerald-900 text-white border-emerald-900" : "bg-white text-emerald-950 border-slate-200"
              }`}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-semibold ${isSelected ? "text-emerald-950" : "text-slate-950"}`}>
                  {cat.name}
                </p>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">
                  {cat.helper}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  // SECTION 5 — CURRENT SUPPORT REQUESTS
  const CurrentSupportRequests = () => (
    <Card id="current-requests" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-semibold text-slate-900 tracking-tight">Current Support Requests</h3>
        <p className="text-xs text-slate-500 font-normal">Recent support activity linked to your learner workspace.</p>
      </div>

      <div className="space-y-4 pt-1">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-200 hover:shadow-sm transition-all duration-150 relative space-y-3 shadow-xs"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                req.status === "Response received"
                  ? "text-emerald-800 bg-emerald-50"
                  : req.status === "Open"
                  ? "text-blue-800 bg-blue-50"
                  : "text-slate-600 bg-slate-100"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  req.status === "Response received" ? "bg-emerald-600" : req.status === "Open" ? "bg-blue-600" : "bg-slate-400"
                }`} />
                {req.status}
              </span>

              {req.status === "Response received" && (
                <LearnerContextHint
                  title="What this means"
                  text="A facilitator response is available. Review the message and follow the suggested next step."
                />
              )}

              <span className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                {req.category}
              </span>

              <span className="text-xs font-normal text-slate-400 ml-auto">
                ID: {req.id}
              </span>
            </div>

            <div className="text-left space-y-2">
              <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                {req.title}
              </h4>
              
              <div className="p-3.5 bg-slate-50 text-xs font-normal text-slate-600 leading-relaxed italic relative pl-5 rounded-xl border border-slate-100/50">
                <span className="absolute left-2 text-lg text-emerald-800 leading-none font-bold">“</span>
                {req.helper}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 font-normal pt-1">
                <span>Assigned to: <strong className="text-slate-700 font-semibold">{req.assignedTo}</strong></span>
                <span>Last update: {req.lastUpdate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              {req.route ? (
                <Button
                  onClick={() => handleAction(req.route!)}
                  className="bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-1.5 px-4 rounded-xl cursor-pointer"
                >
                  Open Request
                </Button>
              ) : (
                <Button
                  onClick={() => showToast("Support request opened in this frontend prototype.", "info")}
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-1.5 px-4 rounded-xl cursor-pointer"
                >
                  View Request
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  // SECTION 6 — HELP TOPICS
  const HelpTopicsPanel = () => {
    const topics = [
      { id: "h-1", title: "Understanding assignment requirements", helper: "Review the Work Readiness Assignment brief and submission guidance.", actionLabel: "Open Assessment", path: "/learner/assessments/work-readiness-assignment", icon: BookOpen },
      { id: "h-2", title: "Certificate readiness and CPD", helper: "Check confirmed, pending, and remaining CPD credits.", actionLabel: "View Certificate Track", path: "/learner/certificates/work-readiness-certificate", icon: Award },
      { id: "h-3", title: "Accessing low-bandwidth resources", helper: "Use reading versions and transcripts when connection is limited.", actionLabel: "Open Resources", path: "/learner/resources", icon: FileText },
      { id: "h-4", title: "Community participation", helper: "Use safe discussion spaces for interview preparation practice.", actionLabel: "Open Community", path: "/learner/community", icon: Users }
    ];

    return (
      <Card id="help-topics" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">Help Topics</h3>
          <p className="text-xs text-slate-500 font-medium">Common guidance areas for your current learning pathway.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((tp) => {
            const Icon = tp.icon;
            return (
              <div 
                key={tp.id} 
                className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-250 transition-all duration-200 text-left"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-white border border-slate-150 text-emerald-900 rounded-lg shadow-2xs">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs font-black text-slate-900 leading-snug">{tp.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                    {tp.helper}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60">
                  <Button
                    onClick={() => handleAction(tp.path)}
                    className="w-full text-[10.5px] font-black py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>{tp.actionLabel}</span>
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  // SECTION 7 — SAFE SUPPORT GUIDANCE
  const SafeSupportGuidancePanel = () => (
    <Card id="safe-guidance" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Safe Support Guidance</h3>
        <p className="text-xs text-slate-500 font-medium">Keep your learner record and personal information protected.</p>
      </div>

      <div className="space-y-2.5">
        {[
          "Do not share passwords, verification codes, or reset links.",
          "Do not upload private documents in this frontend prototype.",
          "Use community for general learning discussion only.",
          "Use support for private learning, assessment, certificate, or CPD questions.",
          "Report anything that feels unsafe or inappropriate."
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-150 transition-all duration-150">
            <div className="h-5 w-5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0 text-[10px] font-bold font-mono">
              {idx + 1}
            </div>
            <p className="text-xs text-slate-700 font-semibold leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );

  // SECTION 8 — RECENT SUPPORT ACTIVITY
  const RecentSupportActivityPanel = () => {
    const logs = [
      { id: 1, text: "Facilitator response received", desc: "Certificate readiness request", time: "Today" },
      { id: 2, text: "Support request created", desc: "Work Readiness Assignment guidance", time: "Yesterday" },
      { id: 3, text: "Low-bandwidth material support closed", desc: "Access issue resolution", time: "2 days ago" },
      { id: 4, text: "Certificate track viewed", desc: "Work Readiness Certificate", time: "2 days ago" }
    ];

    return (
      <Card id="support-activity" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">Recent Support Activity</h3>
          <p className="text-xs text-slate-500 font-normal">Activity history tied to your support and certificate roadmaps.</p>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:border-emerald-250 hover:shadow-xs transition-all duration-150">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-700 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-800">{log.text}</p>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">{log.desc}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-normal bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full shrink-0 ml-3">
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // RIGHT SIDE 1 — SUPPORT STATUS
  const SupportStatusWidget = () => (
    <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-2xl text-left shadow-xs">
      <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
        Support Status
      </h3>
      
      <div className="space-y-3 text-xs">
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Active request</p>
          <p className="font-semibold text-slate-900 mt-0.5 leading-tight">Certificate readiness review question</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Status</p>
          <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mt-1.5">
            Response received
          </span>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Assigned to</p>
          <p className="font-semibold text-slate-800 mt-0.5">{learner.facilitator}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Category</p>
          <p className="font-semibold text-slate-800 mt-0.5">Certificate & CPD</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Last update</p>
          <p className="font-semibold text-slate-800 mt-0.5">Today</p>
        </div>
      </div>

      <Button
        onClick={() => handleAction("/learner/support/certificate-readiness-request")}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-2"
      >
        Open Request
      </Button>
    </Card>
  );

  // RIGHT SIDE 2 — RELATED LEARNING CONTEXT
  const RelatedLearningContextWidget = () => (
    <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-2xl text-left shadow-xs">
      <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
        Related Learning Context
      </h3>

      <div className="space-y-3 text-xs">
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Course</p>
          <p className="font-semibold text-slate-900 mt-0.5 leading-tight">{learner.currentCourse}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Lesson</p>
          <p className="font-semibold text-slate-805 mt-0.5 leading-tight">{learner.currentLesson}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Assessment</p>
          <p className="font-semibold text-slate-800 mt-0.5 leading-tight">{learner.currentAssessment}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Certificate</p>
          <p className="font-semibold text-slate-800 mt-0.5 leading-tight">{learner.certificate}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">CPD</p>
          <p className="font-semibold text-emerald-800 mt-0.5">{learner.cpd}</p>
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <Button
          onClick={() => handleAction("/learner/assessments/work-readiness-assignment")}
          className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 rounded-xl cursor-pointer"
        >
          Open Assessment
        </Button>
        <Button
          onClick={() => handleAction("/learner/certificates/work-readiness-certificate")}
          variant="outline"
          className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl cursor-pointer"
        >
          View Certificate Track
        </Button>
      </div>
    </Card>
  );

  // RIGHT SIDE 3 — QUICK HELP
  const QuickHelpWidget = () => {
    const helps = [
      { id: "qh-1", label: "Assessment question", cat: "Assessment support", text: "Structure assignment questions." },
      { id: "qh-2", label: "Certificate or CPD question", cat: "Certificate & CPD", text: "Credits or completion status." },
      { id: "qh-3", label: "Resource access issue", cat: "Learning materials", text: "Low-bandwidth download." },
      { id: "qh-4", label: "Community safety concern", cat: "Community safety", text: "Report behavior concerns safely." }
    ];

    return (
      <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Quick Help
        </h3>

        <div className="space-y-2">
          {helps.map((row) => (
            <div 
              key={row.id}
              onClick={() => handleQuickHelpClick(row.cat)}
              className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-250 hover:bg-slate-50/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">
                  {row.label}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  {row.text}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-850 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // RIGHT SIDE 4 — SUPPORT CENTER CARD (EMERALD STYLE WITH INLINE SCROLL ACTION)
  const InlineSupportCenterCard = () => (
    <Card className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 shadow-xs space-y-4 text-left">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 bg-emerald-900 text-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-950">Support Center</h4>
          <p className="text-xs text-slate-650 mt-1 leading-relaxed">
            Need assistance with your learning pathway?
          </p>
        </div>
      </div>
      
      <Button
        onClick={scrollToComposer}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98]"
      >
        Start Request
      </Button>
    </Card>
  );

  // RIGHT SIDE 5 — RECENT SYSTEM NOTES
  const RecentSystemNotesWidget = () => (
    <Card className="p-5 border-slate-200 bg-white space-y-3.5 rounded-xl text-left">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
        Recent System Notes
      </h3>

      <div className="space-y-2.5 text-xs text-slate-650 font-semibold leading-relaxed">
        {[
          "Support actions are simulated in this frontend prototype.",
          "No real message is sent.",
          "Do not share private credentials or documents.",
          "Programme support would be handled securely in a live system."
        ].map((note, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <span className="text-emerald-700 mt-1 shrink-0">•</span>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </Card>
  );

  // RIGHT SIDE 6 — QUICK ACTIONS
  const QuickActionsWidget = () => {
    const actions = [
      { id: "qa-1", label: "Open Request", route: "/learner/support/certificate-readiness-request", desc: "Aisha certificate review thread." },
      { id: "qa-2", label: "Open Assessment", route: "/learner/assessments/work-readiness-assignment", desc: "Draft work readiness brief." },
      { id: "qa-3", label: "View Certificate Track", route: "/learner/certificates/work-readiness-certificate", desc: "Check credits and certificate rules." },
      { id: "qa-4", label: "Open Resources", route: "/learner/resources", desc: "Course reading list and low-bandwidth sheets." },
      { id: "qa-5", label: "Open Community", route: "/learner/community", desc: "Ask questions inside safe cohort forum." },
      { id: "qa-6", label: "Open Notifications", route: "/learner/notifications", desc: "Review platform alerts and messages." }
    ];

    return (
      <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-2xl text-left shadow-xs">
        <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-2">
          Quick Actions
        </h3>

        <div className="space-y-2">
          {actions.map((act) => (
            <div 
              key={act.id}
              onClick={() => handleAction(act.route)}
              className="p-3 rounded-xl border border-slate-200 hover:border-emerald-250 hover:bg-slate-50/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-900 truncate">
                  {act.label}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                  {act.desc}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // -------------------------------------------------------------------------
  // DESKTOP LAYOUT (hidden lg:flex)
  // -------------------------------------------------------------------------
  const DesktopSupportCenter = () => (
    <div id="desktop-support" className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full">
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
              placeholder="Search support, requests, assessment help..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-705 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-800 transition-all font-semibold"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleAction("/learner/notifications")} 
              className="p-1.5 text-slate-500 hover:text-slate-900 relative transition-colors cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-700 animate-pulse" />
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
          {/* Section 1: Hero */}
          <SupportHero />

          {/* Section 2: Summary Cards */}
          <SupportSummaryCards />

          {/* Core Layout Grid */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
            
            {/* Left Area (Content modules) */}
            <div className="space-y-6">
              <SupportRequestComposer />
              <SupportCategoriesPanel />
              <CurrentSupportRequests />
              <HelpTopicsPanel />
              <SafeSupportGuidancePanel />
              <RecentSupportActivityPanel />
            </div>

            {/* Right Area (Status context/widgets) */}
            <div className="space-y-6 shrink-0">
              <SupportStatusWidget />
              <RelatedLearningContextWidget />
              <QuickHelpWidget />
              <InlineSupportCenterCard />
              <RecentSystemNotesWidget />
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
  const TabletSupportCenter = () => (
    <div id="tablet-support" className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
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
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700" />
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
        <SupportHero />
        <SupportSummaryCards />
        <SupportRequestComposer />
        <SupportCategoriesPanel />
        <CurrentSupportRequests />
        <HelpTopicsPanel />
        <SafeSupportGuidancePanel />
        <RecentSupportActivityPanel />
        
        {/* Supporting cards stacked cleanly below */}
        <SupportStatusWidget />
        <RelatedLearningContextWidget />
        <QuickHelpWidget />
        <InlineSupportCenterCard />
        <RecentSystemNotesWidget />
        <QuickActionsWidget />
      </div>

      {/* Fixed bottom navigation */}
      <LearnerMobileNav />
    </div>
  );

  // -------------------------------------------------------------------------
  // MOBILE LAYOUT (md:hidden)
  // -------------------------------------------------------------------------
  const MobileSupportCenter = () => (
    <div id="mobile-support" className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      {/* Compact Mobile Header */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-semibold text-xs tracking-tight text-slate-900">
          SUSTAIN <span className="text-emerald-800">LMS</span>
        </span>
        <div className="flex items-center gap-3">
          <button onClick={() => handleAction("/learner/notifications")} className="p-1 text-slate-500 relative cursor-pointer">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700" />
          </button>
          <button onClick={() => handleAction("/learner/support")} className="p-1 text-slate-500 cursor-pointer">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
          <div onClick={() => handleAction("/learner/profile")} className="h-7 w-7 bg-emerald-900 text-white text-[11px] font-semibold rounded-full flex items-center justify-center cursor-pointer">
            AM
          </div>
        </div>
      </header>

      {/* Stacked Content for Mobile */}
      <div className="px-4 py-4 space-y-5">
        <SupportHero />
        <SupportSummaryCards />
        <SupportRequestComposer />
        <SupportCategoriesPanel />
        <CurrentSupportRequests />
        <SupportStatusWidget />
        <RelatedLearningContextWidget />
        <QuickActionsWidget />
        <RecentSupportActivityPanel />
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
          id="global-support-toast"
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

      {/* Renders the layouts */}
      <DesktopSupportCenter />
      <TabletSupportCenter />
      <MobileSupportCenter />
    </div>
  );
}

export default LearnerSupportPage;
