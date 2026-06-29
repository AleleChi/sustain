import { useState, useEffect } from "react";
import { useRoute, RoutePath } from "../../../context/RouteContext";
import { 
  MessageSquare, 
  HelpCircle, 
  Users, 
  Download, 
  Filter, 
  CheckCircle2, 
  X, 
  Plus, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Video, 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  ShieldAlert, 
  Share2, 
  Send, 
  Check, 
  CheckSquare, 
  FileSpreadsheet,
  Settings,
  Bell,
  Sparkles,
  ExternalLink,
  User
} from "lucide-react";
import { FacilitatorMobileActionMenu, ActionItem } from "../../../components/facilitator/FacilitatorMobileActionMenu";

interface GuideItem {
  name: string;
  file: string;
}

interface QuestionItem {
  id: string;
  learnerName: string;
  learnerId: string;
  topic: string;
  area: string;
  status: "Response Needed" | "Resolved";
  submitted: string;
  priority: "High" | "Medium" | "Low";
  content: string;
  progress: number;
  currentLesson: string;
  checklist: string[];
  draftResponse: string;
  guides: GuideItem[];
  nextActionCopy: string;
  programContext: string;
  avatarText: string;
  avatarBg: string;
  lowBandwidth?: boolean;
}

export function LearnerQuestionsView() {
  const { navigateTo, showToast } = useRoute();

  // Active filter controls
  const [cohortFilter, setCohortFilter] = useState("Kano 02");
  const [typeFilter, setTypeFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("Work Readiness");
  const [statusFilter, setStatusFilter] = useState("Response Needed");
  const [searchQuery, setSearchQuery] = useState("");

  // Create Follow-up form state
  const [followUpReason, setFollowUpReason] = useState("");
  const [followUpPriority, setFollowUpPriority] = useState("Normal");
  const [followUpDate, setFollowUpDate] = useState("");

  // Mobile Schedule Follow-up form state
  const [mobileFollowUpDate, setMobileFollowUpDate] = useState("");
  const [mobileFollowUpDesc, setMobileFollowUpDesc] = useState("");

  // Unified Questions Data Set
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: "q-1",
      learnerName: "Aisha Mohammed",
      learnerId: "SUST-LRN-0442",
      topic: "Choosing an interview example",
      area: "Work Readiness",
      status: "Response Needed",
      submitted: "Today, 09:12 AM",
      priority: "Medium",
      content: "In lesson 4, we talked about communication skills. For the assessment, can I use a personal example of resolving a family conflict as a professional communication example?",
      progress: 68,
      currentLesson: "Preparing for Interviews",
      checklist: [
        "Clarify assessment criteria",
        "Map family to workplace",
        "Advise on tone"
      ],
      draftResponse: "Hi Aisha, that’s a great question. For the Work Readiness assessment, you can certainly use a personal experience like a family conflict, provided you frame it within the context of transferable skills. When responding, focus on the communication techniques you used—active listening, neutral language, and negotiation—which are highly valued in a professional environment.",
      guides: [
        { name: "Work Readiness Guide", file: "work_readiness_guide.pdf" },
        { name: "Lesson 4 Summary", file: "lesson_4_summary.pdf" },
        { name: "Interview Checklist", file: "interview_checklist.pdf" },
        { name: "Video: Soft Skills", file: "video_soft_skills.mp4" }
      ],
      nextActionCopy: "Respond to Aisha’s Assessment Question to keep her momentum high.",
      programContext: "Programme: SUSTAIN CPD • Cohort: Kano 02 • Course: Work Readiness",
      avatarText: "AM",
      avatarBg: "bg-blue-100 text-blue-850",
      lowBandwidth: true
    },
    {
      id: "q-2",
      learnerName: "Aisha Mohammed",
      learnerId: "SUST-LRN-0442",
      topic: "Crop Insurance subsidies threshold",
      area: "Agri-Business 101",
      status: "Response Needed",
      submitted: "2 mins ago",
      priority: "High",
      content: "I’m struggling to understand the difference between the government subsidy and the private insurance payout triggers in Module 4. Could you explain the threshold?",
      progress: 42,
      currentLesson: "Module 4: Risk Management",
      checklist: [
        "Explain threshold differences",
        "Differentiate subsidy vs payout",
        "Link visual guide"
      ],
      draftResponse: "Hi Aisha, that is a common query. The government subsidy directly lowers your premium costs upfront so you pay less to buy the coverage. In contrast, private insurance payouts are triggered based on objective environmental indexes—like local rainfall drop-offs below a 40% historic threshold. I recommend attaching our Payout Trigger Matrix below for a visual breakdown of that trigger mechanism.",
      guides: [
        { name: "Payout Trigger Matrix.pdf", file: "payout_trigger_matrix.pdf" },
        { name: "Module 4 Explainer (Low Res)", file: "module_4_explainer_low.pdf" }
      ],
      nextActionCopy: "Review Group B Assessments and finalize the agribusiness checklist.",
      programContext: "Agri-Business 101 • Cohort A • 2024",
      avatarText: "AM",
      avatarBg: "bg-emerald-100 text-emerald-850",
      lowBandwidth: true
    },
    {
      id: "q-3",
      learnerName: "Emeka Okafor",
      learnerId: "SUST-LRN-0443",
      topic: "How to calculate NPV for cocoa farms?",
      area: "Agri-Business 101",
      status: "Response Needed",
      submitted: "1 hour ago",
      priority: "High",
      content: "How do I calculate NPV for cocoa farms? I am having trouble setting up the cash flow projection table for the first 5 years and which discount rate to use.",
      progress: 55,
      currentLesson: "Lesson 6: Farm Financial Planning",
      checklist: [
        "Detail NPV formula parameters",
        "Provide 5-year cocoa yield table",
        "Acknowledge sapling delay"
      ],
      draftResponse: "Hi Emeka, to calculate NPV for cocoa farms, we discount each year's net cash flow. Remember that years 1-3 will have negative cash flows due to cocoa sapling maturation times, while years 4 and 5 show positive returns as the trees begin active yield production.",
      guides: [
        { name: "Payout Trigger Matrix.pdf", file: "payout_trigger_matrix.pdf" },
        { name: "Module 4 Explainer (Low Res)", file: "module_4_explainer_low.pdf" }
      ],
      nextActionCopy: "Help Emeka understand Farm Financial models to keep his course velocity.",
      programContext: "Agri-Business 101 • Cohort A • 2024",
      avatarText: "EO",
      avatarBg: "bg-amber-100 text-amber-850",
      lowBandwidth: false
    },
    {
      id: "q-4",
      learnerName: "Musa Bello",
      learnerId: "SUST-LRN-0444",
      topic: "Certification Timeline",
      area: "Registration",
      status: "Resolved",
      submitted: "2 hours ago",
      priority: "Low",
      content: "When will the final CPD certificate be validated and ready to upload to LinkedIn?",
      progress: 100,
      currentLesson: "Course Completed",
      checklist: [
        "Acknowledge course success",
        "Outline validation timeline",
        "Provide support email"
      ],
      draftResponse: "Hi Musa, congratulations on completing all modules! Certification validation is scheduled for the week of Nov 1st. Once confirmed, a downloadable digital certificate will appear on your portal dashboard.",
      guides: [
        { name: "Work Readiness Guide", file: "work_readiness_guide.pdf" }
      ],
      nextActionCopy: "Review certificate register.",
      programContext: "Programme: SUSTAIN CPD • Cohort: Kano 02",
      avatarText: "MB",
      avatarBg: "bg-slate-100 text-slate-800",
      lowBandwidth: false
    },
    {
      id: "q-5",
      learnerName: "Chinelo Obi",
      learnerId: "SUST-LRN-0445",
      topic: "Resume Formatting",
      area: "Work Readiness",
      status: "Resolved",
      submitted: "Yesterday",
      priority: "Medium",
      content: "Should I include my high school qualifications if I have 2 years of vocational farm experience already?",
      progress: 88,
      currentLesson: "Resume Building workshop",
      checklist: [
        "Address high school placement",
        "Highlight vocational farm role",
        "Provide format standard"
      ],
      draftResponse: "Hi Chinelo, with 2 years of vocational farming experience, you should prioritize that at the top of your resume! You can include your high school details in a brief education section below.",
      guides: [
        { name: "Interview Checklist", file: "interview_checklist.pdf" }
      ],
      nextActionCopy: "Check draft resume submission.",
      programContext: "Programme: SUSTAIN CPD • Cohort: Kano 02",
      avatarText: "CO",
      avatarBg: "bg-slate-100 text-slate-800",
      lowBandwidth: false
    }
  ]);

  // Track selected question. Initial load is Aisha's Work Readiness question
  const [selectedQuestionId, setSelectedQuestionId] = useState("q-1");
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId) || questions[0];

  // Response Editor state
  const [editorText, setEditorText] = useState("");
  const [sendToLearner, setSendToLearner] = useState(true);
  const [shareWithCohort, setShareWithCohort] = useState(false);

  // Response Settings state (for Mobile)
  const [shareInCommunity, setShareInCommunity] = useState(true);
  const [markExpertVerified, setMarkExpertVerified] = useState(false);

  // Sync editor text when active question changes
  useEffect(() => {
    if (selectedQuestion) {
      setEditorText(selectedQuestion.draftResponse);
    }
  }, [selectedQuestionId]);

  // Toast actions
  const handleSaveDraft = () => {
    showToast("Response draft saved locally in this frontend prototype.");
  };

  const handleSendResponse = () => {
    showToast("Response action simulated in this frontend prototype.");
  };

  const handleAttachGuide = (guideName: string) => {
    showToast(`Guide "${guideName}" attached in this frontend prototype.`);
  };

  const handleViewAssessmentDetail = () => {
    navigateTo("/facilitator/assessments" as RoutePath);
  };

  const handleCreateFollowUpTask = () => {
    showToast("Follow-up task created locally in this frontend prototype.");
    setFollowUpReason("");
    setFollowUpDate("");
  };

  const handleCreateMobileFollowUpTask = () => {
    showToast("Follow-up task created locally in this frontend prototype.");
    setMobileFollowUpDesc("");
    setMobileFollowUpDate("");
  };

  const handleCreateSupportTicket = () => {
    showToast("Support ticket creation simulated in this frontend prototype.");
  };

  const handleLinkExistingTicket = () => {
    showToast("Ticket linking simulated in this frontend prototype.");
  };

  const handleExportQuestions = (format: string) => {
    showToast(`${format} export simulated in this frontend prototype.`);
  };

  const handleClearFilters = () => {
    setCohortFilter("Kano 02");
    setTypeFilter("All");
    setCourseFilter("Work Readiness");
    setStatusFilter("Response Needed");
    setSearchQuery("");
    showToast("Filters reset to default.");
  };

  const handleRespondRow = (id: string) => {
    setSelectedQuestionId(id);
    const editorEl = document.getElementById("write-response-editor");
    if (editorEl) {
      editorEl.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      scrollToId("mobile-your-response");
    }
    showToast(`Responding to ${questions.find(q => q.id === id)?.learnerName}`);
  };

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Reusable Mobile Action Menu configuration
  const mobileActions: ActionItem[] = [
    {
      label: "Respond to current question",
      icon: Send,
      onClick: () => {
        scrollToId("mobile-your-response");
        showToast("Focused response editor");
      }
    },
    {
      label: "Attach support guide",
      icon: FileText,
      onClick: () => {
        scrollToId("mobile-approved-guides");
        showToast("Focused approved support guides");
      }
    },
    {
      label: "Save draft",
      icon: CheckSquare,
      onClick: handleSaveDraft
    },
    {
      label: "Send response",
      icon: CheckCircle2,
      onClick: handleSendResponse
    },
    {
      label: "Create follow-up",
      icon: Calendar,
      onClick: () => {
        scrollToId("mobile-schedule-followup");
        showToast("Focused follow-up planner");
      }
    },
    {
      label: "Open assessment review",
      icon: Sparkles,
      onClick: () => {
        showToast("Assessment review opened in this frontend prototype.");
      }
    },
    {
      label: "Open low-bandwidth support",
      icon: HelpCircle,
      onClick: () => {
        scrollToId("mobile-alternative-actions");
        showToast("Focused alternative actions");
      }
    },
    {
      label: "Export report",
      icon: Download,
      onClick: () => {
        showToast("Question report export simulated in this frontend prototype.");
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 lg:pb-12 text-slate-700">

      {/* ====================================================
          DESKTOP SCREEN LAYOUT (lg:block, hidden on mobile)
          ==================================================== */}
      <div className="hidden lg:block space-y-6 max-w-7xl mx-auto px-4 py-6">
        
        {/* SECTION 1: HEADER / HERO AREA + Question Status Card */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main header block */}
          <div className="col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                  Operational Support
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Learner Questions</h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  Review learner questions, provide clear responses, and guide candidates toward certification success.
                </p>
              </div>

              {/* Context chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  Programme: SUSTAIN CPD
                </span>
                <span className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  Cohort: Kano 02
                </span>
                <span className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  Facilitator: Halima Sani
                </span>
                <span className="bg-emerald-55 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                  Open questions: 6
                </span>
              </div>
            </div>
          </div>

          {/* Question Status right-side card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-50">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Question Status</h3>
                <ShieldAlert className="h-4 w-4 text-emerald-800" />
              </div>
              
              <div className="space-y-2.5 pt-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-75" />
                    Response needed
                  </span>
                  <span className="font-bold text-slate-800">6</span>
                </div>
                
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Assessment related
                  </span>
                  <span className="font-bold text-slate-800">3</span>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    Cert questions
                  </span>
                  <span className="font-bold text-slate-800">2</span>
                </div>
              </div>
            </div>

            {/* Response needed small progress bar */}
            <div className="pt-3">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-800 rounded-full" style={{ width: "60%" }} />
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                <span>Response rate: 80%</span>
                <span>Goal: 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SIX QUESTION METRIC CARDS */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-xs flex flex-col justify-between min-h-[90px]">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase">Open Questions</span>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-slate-900 font-black text-2xl">6</span>
              <span className="text-emerald-700 text-[10px] font-bold">needed</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-xs flex flex-col justify-between min-h-[90px]">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase">Assessment</span>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-slate-900 font-black text-2xl">3</span>
              <span className="text-slate-400 text-[10px] font-semibold">topics</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-xs flex flex-col justify-between min-h-[90px]">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase">Cert Related</span>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-slate-900 font-black text-2xl">2</span>
              <span className="text-slate-400 text-[10px] font-semibold">queries</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-xs flex flex-col justify-between min-h-[90px]">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase">Low Bandwidth</span>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-slate-900 font-black text-2xl">1</span>
              <span className="text-amber-600 text-[10px] font-bold">SMS alert</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-xs flex flex-col justify-between min-h-[90px]">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase">Responses Sent</span>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-slate-900 font-black text-2xl">24</span>
              <span className="text-emerald-75 text-[10px] font-bold">resolved</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-xs flex flex-col justify-between min-h-[90px]">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase">Follow-Ups</span>
            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-slate-900 font-black text-2xl">8</span>
              <span className="text-slate-400 text-[10px] font-semibold">pending</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: FILTER BAR */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filters:</span>
            </div>

            {/* Cohort Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Cohort</span>
              <select 
                value={cohortFilter} 
                onChange={(e) => setCohortFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs px-2.5 py-1.5 rounded-lg text-slate-700 font-bold outline-hidden transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
              >
                <option value="Kano 02">Kano 02</option>
                <option value="All">All Cohorts</option>
              </select>
            </div>

            {/* Type Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Type</span>
              <select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs px-2.5 py-1.5 rounded-lg text-slate-700 font-bold outline-hidden transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
              >
                <option value="All">All</option>
                <option value="Assessment Related">Assessment</option>
                <option value="Certification">Certification</option>
              </select>
            </div>

            {/* Course Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Course</span>
              <select 
                value={courseFilter} 
                onChange={(e) => setCourseFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs px-2.5 py-1.5 rounded-lg text-slate-700 font-bold outline-hidden transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
              >
                <option value="Work Readiness">Work Readiness</option>
                <option value="Agri-Business 101">Agri-Business 101</option>
                <option value="All">All Courses</option>
              </select>
            </div>

            {/* Status Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs px-2.5 py-1.5 rounded-lg text-slate-700 font-bold outline-hidden transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
              >
                <option value="Response Needed">Response Needed</option>
                <option value="Resolved">Resolved</option>
                <option value="All">All Statuses</option>
              </select>
            </div>

            {/* Search query input */}
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Find learner questions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-700 font-medium outline-hidden transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50"
              />
            </div>
          </div>

          <button 
            onClick={handleClearFilters}
            className="text-xs text-slate-500 hover:text-slate-800 font-extrabold uppercase tracking-wider cursor-pointer ml-4"
          >
            Clear All
          </button>
        </div>

        {/* SECTION 4: OPEN QUESTION QUEUE TABLE */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Queue: Action Required</h3>
            <span className="text-[10px] font-bold text-slate-400">Showing {questions.length} question records</span>
          </div>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                <th className="px-6 py-3.5">Learner</th>
                <th className="px-6 py-3.5">Topic</th>
                <th className="px-6 py-3.5">Area</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Submitted</th>
                <th className="px-6 py-3.5">Priority</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {questions
                .filter(q => q.learnerName.toLowerCase().includes(searchQuery.toLowerCase()) || q.topic.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((q) => {
                  const isSelected = selectedQuestionId === q.id;
                  return (
                    <tr 
                      key={q.id}
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`cursor-pointer transition-colors duration-200 ${
                        isSelected ? "bg-emerald-50/50" : "hover:bg-emerald-50/30"
                      }`}
                    >
                      <td className="px-6 py-3.5 font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[9px] ${q.avatarBg}`}>
                            {q.avatarText}
                          </div>
                          <div>
                            <p>{q.learnerName}</p>
                            <span className="text-[8px] font-mono text-slate-400 block">{q.learnerId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600 font-semibold max-w-xs truncate">
                        {q.topic}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-sm text-[9px] font-bold border border-slate-150 uppercase">
                           {q.area}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="flex items-center gap-1 text-slate-700 font-semibold">
                          <span className={`h-1.5 w-1.5 rounded-full ${q.status === "Resolved" ? "bg-emerald-600" : "bg-emerald-700"}`} />
                          {q.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-500 font-semibold">
                        {q.submitted}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold border ${
                          q.priority === "High" ? "bg-rose-50 border-rose-100 text-rose-700" :
                          q.priority === "Medium" ? "bg-amber-50 border-amber-100 text-amber-700" :
                          "bg-slate-100 border-slate-200 text-slate-600"
                        }`}>
                          {q.priority}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRespondRow(q.id);
                          }}
                          className="bg-[#005C45] hover:bg-emerald-800 active:bg-emerald-950 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all duration-150 text-white font-bold px-3 py-1.5 rounded-md text-[10px] cursor-pointer shadow-3xs active:scale-98"
                        >
                          Respond
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* SECTION 5: QUESTION SUMMARY / CONTEXT / RESPONSE NEED */}
        <div className="grid grid-cols-3 gap-6">
          {/* Card 1: Question Summary */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                <MessageSquare className="h-4 w-4 text-emerald-850" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Question Summary</h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-semibold italic p-3 bg-slate-50/50 rounded-xl border border-slate-100/50">
                "{selectedQuestion.content}"
              </p>
            </div>
            <div className="text-[9.5px] font-bold text-slate-400 mt-4 uppercase">
              Topic: {selectedQuestion.topic}
            </div>
          </div>

          {/* Card 2: Learner Context */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                <Users className="h-4 w-4 text-emerald-850" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Learner Context</h3>
              </div>
              
              <div className="flex items-center gap-3 pt-1">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center font-black text-xs ${selectedQuestion.avatarBg}`}>
                  {selectedQuestion.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase">{selectedQuestion.learnerName}</h4>
                  <p className="text-[9.5px] font-mono text-slate-400">ID: {selectedQuestion.learnerId}</p>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>PROGRESSION</span>
                  <span className="text-slate-700">{selectedQuestion.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-800 rounded-full" style={{ width: `${selectedQuestion.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[9.5px] font-bold text-slate-500 pt-3 border-t border-slate-50 mt-4">
              Current Lesson: <span className="text-slate-800">{selectedQuestion.currentLesson}</span>
            </div>
          </div>

          {/* Card 3: Response Need */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                <CheckCircle2 className="h-4 w-4 text-emerald-850" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Response Need</h3>
              </div>
              
              <div className="space-y-2.5 pt-1">
                {selectedQuestion.checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-4.5 w-4.5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] font-semibold text-emerald-800 bg-emerald-50/55 border border-emerald-100 px-2 py-1 rounded-sm text-center mt-4">
              Active guidance template recommended
            </div>
          </div>
        </div>

        {/* SECTION 6 & 7: WRITE RESPONSE EDITOR + APPROVED GUIDES PANEL */}
        <div id="write-response-editor" className="grid grid-cols-3 gap-6 scroll-mt-6">
          
          {/* Write Facilitator Response */}
          <div className="col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs text-left space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-50">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-4.5 w-4.5 text-emerald-850" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Write Facilitator Response</h3>
              </div>
              <span className="text-[9.5px] font-mono text-slate-400">Autosave: Active</span>
            </div>

            {/* Editor Toolbar */}
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100 max-w-xs">
              <button onClick={() => showToast("Bold text action")} className="p-1 text-slate-500 hover:text-slate-800 rounded-sm hover:bg-white cursor-pointer transition-colors">
                <Bold className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => showToast("Italic text action")} className="p-1 text-slate-500 hover:text-slate-800 rounded-sm hover:bg-white cursor-pointer transition-colors">
                <Italic className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => showToast("Insert link action")} className="p-1 text-slate-500 hover:text-slate-800 rounded-sm hover:bg-white cursor-pointer transition-colors">
                <LinkIcon className="h-3.5 w-3.5" />
              </button>
              <div className="w-px h-4 bg-slate-200 mx-1" />
              <span className="text-[9px] text-slate-400 font-bold uppercase select-none">Rich text</span>
            </div>

            {/* Writing Area */}
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              rows={6}
              className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 leading-relaxed outline-hidden transition-all duration-150 hover:border-slate-300 focus:border-[#005C45] focus:ring-2 focus:ring-emerald-50 focus:bg-white resize-none"
              placeholder="Write your professional, empathy-first response here..."
            />

            {/* Send options & Main actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendToLearner}
                    onChange={(e) => setSendToLearner(e.target.checked)}
                    className="h-3.5 w-3.5 rounded-sm border-slate-300 text-[#005C45] focus:ring-[#005C45]"
                  />
                  Send to learner
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shareWithCohort}
                    onChange={(e) => setShareWithCohort(e.target.checked)}
                    className="h-3.5 w-3.5 rounded-sm border-slate-300 text-[#005C45] focus:ring-[#005C45]"
                  />
                  Share with cohort
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveDraft}
                  className="bg-white border border-slate-250 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-[#005C45] active:scale-98 transition-all duration-150 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer focus-ring"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSendResponse}
                  className="bg-[#005C45] hover:bg-emerald-800 active:bg-emerald-950 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all duration-150 text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Response
                </button>
              </div>
            </div>
          </div>

          {/* Card 7: Approved Guides Panel */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
              <FileText className="h-4.5 w-4.5 text-emerald-850" />
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Approved Guides</h3>
            </div>

            <div className="space-y-2.5">
              {selectedQuestion.guides.map((guide, index) => (
                <div key={index} className="flex items-center justify-between p-2.5 border border-slate-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-3xs transition-all duration-200 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#005C45] shrink-0" />
                    <span className="text-xs font-bold text-slate-800 leading-tight">{guide.name}</span>
                  </div>
                  <button
                    onClick={() => handleAttachGuide(guide.name)}
                    className="text-[10px] text-[#005C45] hover:text-emerald-950 hover:underline font-extrabold cursor-pointer"
                  >
                    Attach
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SECTION 8: RECOMMENDED NEXT ACTION CTA */}
        <div className="bg-emerald-900 border border-emerald-950 rounded-2xl p-6 shadow-md text-left flex items-center justify-between text-white relative overflow-hidden">
          <div className="space-y-2 flex-1 pr-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-300 shrink-0" />
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-300">Recommended Next Action</h4>
            </div>
            <p className="text-xs text-emerald-50/90 leading-relaxed max-w-3xl">
              {selectedQuestion.nextActionCopy}
            </p>
          </div>
          <button
            onClick={handleViewAssessmentDetail}
            className="bg-white text-emerald-950 hover:bg-emerald-50 active:scale-98 transition-all px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-xs whitespace-nowrap shrink-0"
          >
            View Assessment Detail
          </button>
        </div>

        {/* SECTION 9: CREATE FOLLOW-UP / SUPPORT MODULES / TECHNICAL SUPPORT */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Card 1: Create Follow-Up */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                <Calendar className="h-4.5 w-4.5 text-emerald-850" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Create Follow-Up</h3>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase block">Reason</label>
                  <input
                    type="text"
                    placeholder="e.g. Check assessment status"
                    value={followUpReason}
                    onChange={(e) => setFollowUpReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block">Priority</label>
                    <select
                      value={followUpPriority}
                      onChange={(e) => setFollowUpPriority(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 font-bold focus:outline-hidden"
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase block">Due Date</label>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 font-semibold focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateFollowUpTask}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-xs cursor-pointer shadow-3xs active:scale-98 transition-all mt-4"
            >
              Set Follow-Up
            </button>
          </div>

          {/* Card 2: Support Modules */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
              <HelpCircle className="h-4.5 w-4.5 text-emerald-850" />
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Support Modules</h3>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-emerald-800">Assessment Support</span>
                <p className="text-[10.5px] text-slate-500 font-semibold">Review rubrics and policies</p>
              </div>

              <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-blue-800">Cert & CPD Support</span>
                <p className="text-[10.5px] text-slate-500 font-semibold">Validation and issue help</p>
              </div>

              <div className="p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl space-y-0.5">
                <span className="text-[10px] font-bold text-slate-800">Offline Sync</span>
                <p className="text-[10.5px] text-slate-500 font-semibold">Low-bandwidth troubleshooting</p>
              </div>
            </div>
          </div>

          {/* Card 3: Technical Support */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
                <ShieldAlert className="h-4.5 w-4.5 text-emerald-850" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Technical Support</h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                If the learner’s issue is platform-related, escalate it to the tech team.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={handleCreateSupportTicket}
                className="w-full bg-white border border-slate-250 text-slate-800 hover:bg-slate-50 font-bold py-2 rounded-xl text-xs cursor-pointer shadow-3xs active:scale-98 transition-all"
              >
                Create Support Ticket
              </button>
              <button
                onClick={handleLinkExistingTicket}
                className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer block py-1"
              >
                Link Existing Ticket
              </button>
            </div>
          </div>

        </div>

        {/* SECTION 10: RESPONSE HISTORY + QUESTION ACTIVITY */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Card 1: Response History */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Response History</h3>
            
            <div className="space-y-3 divide-y divide-slate-100">
              <div className="pt-2 first:pt-0 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-850">To: Musa Bello</span>
                  <span className="text-[9.5px] text-slate-400 font-semibold">2 hours ago</span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold">Topic: Certification Timeline</p>
              </div>

              <div className="pt-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-850">To: Chinelo Obi</span>
                  <span className="text-[9.5px] text-slate-400 font-semibold">Yesterday</span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold">Topic: Resume Formatting</p>
              </div>
            </div>
          </div>

          {/* Card 2: Question Activity */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs text-left space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Question Activity</h3>
            
            <div className="space-y-3.5 pt-1">
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Aisha Mohammed submitted a new question</p>
                  <p className="text-[9.5px] text-slate-400 font-bold">Today, 09:12 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Halima Sani responded to Musa Bello</p>
                  <p className="text-[9.5px] text-slate-400 font-bold">Today, 07:45 AM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 11: FOOTER EXPORT STRIP */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-6">
            <button onClick={() => showToast("Question Analytics view")} className="text-emerald-800 hover:text-emerald-950 cursor-pointer">
              Question Analytics
            </button>
            <button onClick={() => showToast("Response Times analysis")} className="text-emerald-800 hover:text-emerald-950 cursor-pointer">
              Response Times
            </button>
            <button onClick={() => showToast("Cohort Comparison reports")} className="text-emerald-800 hover:text-emerald-950 cursor-pointer">
              Cohort Comparison
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Export Questions:</span>
            <div className="flex gap-1">
              <button 
                onClick={() => handleExportQuestions("PDF")}
                className="bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 font-bold px-3 py-1 rounded-lg text-[10px] cursor-pointer shadow-3xs"
              >
                PDF
              </button>
              <button 
                onClick={() => handleExportQuestions("Excel")}
                className="bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 font-bold px-3 py-1 rounded-lg text-[10px] cursor-pointer shadow-3xs"
              >
                Excel
              </button>
              <button 
                onClick={() => handleExportQuestions("CSV")}
                className="bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 font-bold px-3 py-1 rounded-lg text-[10px] cursor-pointer shadow-3xs"
              >
                CSV
              </button>
            </div>
          </div>
        </div>

      </div>


      {/* ====================================================
          MOBILE SCREEN LAYOUT (lg:hidden, full parity)
          ==================================================== */}
      <div className="lg:hidden block space-y-5 text-left bg-slate-50/45 min-h-screen">
        
        {/* MOBILE TOP BAR */}
        <div className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 py-3.5 flex items-center justify-between shadow-3xs">
          <button 
            onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-sm font-black text-slate-900 tracking-tight">Learner Questions</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => showToast("Notifications")} className="p-1 text-slate-500 hover:text-slate-800 relative">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-emerald-700 rounded-full" />
            </button>
            <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-850 flex items-center justify-center font-bold text-[10px] border border-emerald-200">
              HS
            </div>
          </div>
        </div>

        {/* MOBILE CONTEXT CHIPS (Horizontal Scrollable) */}
        <div className="px-4 overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth flex items-center gap-2 pt-1">
          <span className="bg-blue-50/80 border border-blue-100 text-blue-900 px-3 py-1 rounded-full text-[10.5px] font-extrabold inline-block">
            Agri-Business 101
          </span>
          <span className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-[10.5px] font-bold inline-block">
            Cohort A • 2024
          </span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-[10.5px] font-bold inline-block">
            Kano Hub
          </span>
        </div>

        {/* MOBILE ATTENTION CARD */}
        <div className="mx-4 bg-emerald-900 text-white rounded-2xl p-5 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest block">
              Urgent Support
            </span>
            <h3 className="text-lg font-black tracking-tight">6 Responses Needed</h3>
          </div>
          <div className="h-11 w-11 rounded-full bg-emerald-950 flex items-center justify-center border border-emerald-800 shadow-3xs z-10 shrink-0">
            <CheckCircle2 className="h-5 w-5 text-emerald-350" />
          </div>
          {/* Subtle background graphics */}
          <div className="absolute right-0 bottom-0 top-0 w-32 bg-emerald-850 opacity-20 transform skew-x-12 translate-x-10" />
        </div>

        {/* MOBILE METRIC CARDS */}
        <div className="px-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 text-left shadow-2xs">
              <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-1">Avg. Time</span>
              <span className="text-slate-900 font-black text-base block leading-tight">4.2 hrs</span>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 text-left shadow-2xs">
              <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-1">Resolved</span>
              <span className="text-emerald-800 font-black text-base block leading-tight">128</span>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 text-left shadow-2xs">
              <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-1">Satisfaction</span>
              <span className="text-slate-900 font-black text-base block leading-tight">94%</span>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="px-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Find Learner Questions" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-700 font-medium focus:outline-hidden"
            />
          </div>
        </div>

        {/* MOBILE PRIORITY QUEUE */}
        <div className="px-4 space-y-3">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Priority Queue</h3>

          <div className="space-y-3">
            {/* Aisha Mohammed Agri-Business Question (q-2 in our state) */}
            <div 
              onClick={() => setSelectedQuestionId("q-2")}
              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 ${
                selectedQuestionId === "q-2" 
                  ? "bg-emerald-50/40 border-emerald-800 ring-1 ring-emerald-800/25 shadow-xs" 
                  : "bg-white border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-850 flex items-center justify-center font-bold text-[10px]">
                    AM
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">Aisha Mohammed</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block">2 mins ago</span>
                  </div>
                </div>
                {selectedQuestionId === "q-2" && (
                  <span className="bg-emerald-800 text-white text-[8.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    CURRENTLY VIEWING
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium line-clamp-2">
                Clarification on Crop Insurance subsidies threshold and private payout triggers...
              </p>
            </div>

            {/* Emeka Okafor Question (q-3 in our state) */}
            <div 
              onClick={() => setSelectedQuestionId("q-3")}
              className={`p-4 rounded-2xl border transition-all text-left space-y-2.5 ${
                selectedQuestionId === "q-3" 
                  ? "bg-emerald-50/40 border-emerald-800 ring-1 ring-emerald-800/25 shadow-xs" 
                  : "bg-white border-slate-200/80 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-850 flex items-center justify-center font-bold text-[10px]">
                    EO
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">Emeka Okafor</h4>
                    <span className="text-[9px] text-slate-400 font-semibold block">1 hour ago</span>
                  </div>
                </div>
                {selectedQuestionId === "q-3" && (
                  <span className="bg-emerald-800 text-white text-[8.5px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    CURRENTLY VIEWING
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium line-clamp-2">
                How to calculate NPV for cocoa farms? Help with setting up projection tables...
              </p>
            </div>
          </div>
        </div>

        {/* MOBILE QUESTION SUMMARY */}
        <div className="mx-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
            <MessageSquare className="h-4.5 w-4.5 text-emerald-800" />
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Question Summary</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-semibold italic p-3 bg-slate-50/50 rounded-xl border border-slate-100/50">
            "{selectedQuestion.content}"
          </p>
        </div>

        {/* MOBILE LEARNER PROGRESS CARD */}
        <div className="mx-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider">LEARNER PROGRESS</span>
            <span className="text-xs font-black text-emerald-800">42%</span>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-800 rounded-full" style={{ width: "42%" }} />
          </div>

          <div className="flex justify-between items-center text-[10.5px] text-slate-500 font-semibold pt-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
              8/12 Lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              Active 12m
            </span>
          </div>
        </div>

        {/* MOBILE YOUR RESPONSE */}
        <div id="mobile-your-response" className="mx-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4 scroll-mt-20">
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Your Response</h3>
            <span className="text-[10px] text-slate-400 font-bold">Auto-saved 10:24 AM</span>
          </div>

          <textarea
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            rows={5}
            placeholder="Type your response to Aisha here..."
            className="w-full p-3 bg-slate-50/60 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
          />

          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
            <span className="text-[10.5px] text-blue-900 font-semibold leading-relaxed">
              Guidance: Use the “Subsidies Guide” attachment for visual clarity on payout triggers.
            </span>
          </div>
        </div>

        {/* MOBILE APPROVED SUPPORT GUIDES */}
        <div id="mobile-approved-guides" className="mx-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4 scroll-mt-20">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Approved Support Guides</h3>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-emerald-800" />
                <span className="text-xs font-bold text-slate-800">Payout Trigger Matrix.pdf</span>
              </div>
              <button 
                onClick={() => handleAttachGuide("Payout Trigger Matrix.pdf")}
                className="text-xs text-emerald-800 font-black cursor-pointer hover:underline"
              >
                Attach
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-emerald-800" />
                <span className="text-xs font-bold text-slate-800">Module 4 Explainer (Low Res)</span>
              </div>
              <button 
                onClick={() => handleAttachGuide("Module 4 Explainer (Low Res)")}
                className="text-xs text-emerald-800 font-black cursor-pointer hover:underline"
              >
                Attach
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE RESPONSE SETTINGS */}
        <div className="mx-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Response Settings</h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold select-none cursor-pointer">
              <input 
                type="checkbox"
                checked={shareInCommunity}
                onChange={(e) => setShareInCommunity(e.target.checked)}
                className="h-4 w-4 rounded-sm border-slate-300 text-emerald-800 focus:ring-emerald-700" 
              />
              Share in Community Forum
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold select-none cursor-pointer">
              <input 
                type="checkbox"
                checked={markExpertVerified}
                onChange={(e) => setMarkExpertVerified(e.target.checked)}
                className="h-4 w-4 rounded-sm border-slate-300 text-emerald-800 focus:ring-emerald-700" 
              />
              Mark as "Expert Verified"
            </label>
          </div>
        </div>

        {/* MOBILE SEND RESPONSE BUTTON */}
        <div className="px-4">
          <button
            onClick={handleSendResponse}
            className="w-full bg-emerald-900 hover:bg-emerald-850 active:scale-98 transition-all text-white font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Send Response
          </button>
        </div>

        {/* MOBILE ALTERNATIVE ACTIONS */}
        <div id="mobile-alternative-actions" className="mx-4 space-y-3 scroll-mt-20">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Alternative Actions</h3>

          <div className="space-y-3">
            <div 
              onClick={() => showToast("Assessment review opened in this frontend prototype.")}
              className="p-4 bg-white border border-slate-200/80 hover:border-slate-300 transition-colors rounded-2xl flex items-center justify-between cursor-pointer shadow-2xs text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                  <HelpCircle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">Assessment Review</h4>
                  <p className="text-[10.5px] text-slate-400 font-medium">Check quiz results</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>

            <div 
              onClick={() => showToast("Low-bandwidth support action simulated in this frontend prototype.")}
              className="p-4 bg-white border border-slate-200/80 hover:border-slate-300 transition-colors rounded-2xl flex items-center justify-between cursor-pointer shadow-2xs text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">Low-Bandwidth Support</h4>
                  <p className="text-[10.5px] text-slate-400 font-medium">SMS/WhatsApp trigger</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>
          </div>
        </div>

        {/* MOBILE SCHEDULE FOLLOW-UP */}
        <div id="mobile-schedule-followup" className="mx-4 bg-blue-50/40 border border-blue-100 rounded-2xl p-5 shadow-2xs space-y-4 scroll-mt-20">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Schedule Follow-up</h3>

          <div className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase">Reminder Date</label>
              <input 
                type="date" 
                value={mobileFollowUpDate}
                onChange={(e) => setMobileFollowUpDate(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase">Task Description</label>
              <input 
                type="text" 
                placeholder="e.g. Check if Aisha passed Quiz 4"
                value={mobileFollowUpDesc}
                onChange={(e) => setMobileFollowUpDesc(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden" 
              />
            </div>

            <button
              onClick={handleCreateMobileFollowUpTask}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-3xs active:scale-98 transition-all"
            >
              Create Task
            </button>
          </div>
        </div>

        {/* MOBILE ACTIVITY TIMELINE */}
        <div className="mx-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Activity Timeline</h3>
            <button 
              onClick={() => showToast("Exporting timeline report...")}
              className="text-[10px] text-emerald-850 hover:text-emerald-950 hover:underline font-extrabold uppercase tracking-wider cursor-pointer"
            >
              Export Report
            </button>
          </div>

          <div className="space-y-4 relative pl-3 border-l border-slate-100 ml-1.5 pt-1">
            <div className="space-y-1 relative">
              <div className="absolute -left-[16.5px] top-1.5 h-2 w-2 rounded-full bg-emerald-600" />
              <div className="text-xs">
                <span className="text-[9px] text-slate-400 font-bold">Today, 09:42 AM</span>
                <h4 className="font-bold text-slate-800">Question Received</h4>
                <p className="text-[11px] text-slate-500 font-medium">Aisha M. asked about Module 4 payout triggers.</p>
              </div>
            </div>

            <div className="space-y-1 relative">
              <div className="absolute -left-[16.5px] top-1.5 h-2 w-2 rounded-full bg-slate-350" />
              <div className="text-xs">
                <span className="text-[9px] text-slate-400 font-bold">Yesterday, 04:15 PM</span>
                <h4 className="font-bold text-slate-800">Module 3 Completed</h4>
                <p className="text-[11px] text-slate-500 font-medium">Score: 88%. Certification track active.</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE NEXT ACTION CTA */}
        <div className="mx-4 bg-slate-900 border border-slate-950 rounded-2xl p-5 shadow-md flex items-center justify-between text-white text-left relative overflow-hidden">
          <div className="space-y-1.5 z-10 flex-1 pr-4">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Users className="h-4.5 w-4.5" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Next Action</span>
            </div>
            <h4 className="text-sm font-black tracking-tight text-white uppercase leading-tight">Review Group B Assessments</h4>
          </div>
          <button 
            onClick={() => showToast("Next action review opened.")}
            className="h-10 w-10 rounded-full bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-3xs z-10 shrink-0 cursor-pointer hover:bg-slate-700 transition-colors"
          >
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>

      {/* REUSABLE FLOATING ACTION MENU */}
      <FacilitatorMobileActionMenu actions={mobileActions} />

    </div>
  );
}
