import { useState, useEffect } from "react";
import { useRoute, RoutePath } from "../../../context/RouteContext";
import { motion, AnimatePresence } from "motion/react";
import { 
  ClipboardCheck, 
  Search, 
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
  X
} from "lucide-react";

interface AssessmentsViewProps {
  selectedSubmissionId: string | null;
  onSelectSubmission: (id: string | null) => void;
  submissions: any[];
  onUpdateSubmissions: (updated: any[]) => void;
}

export function AssessmentsView({ 
  selectedSubmissionId, 
  onSelectSubmission,
  submissions,
  onUpdateSubmissions
}: AssessmentsViewProps) {
  const { navigateTo, showToast } = useRoute();
  
  // Track window width for responsive layout
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Active review state (Aisha Mohammed selected by default)
  const [activeReviewee, setActiveReviewee] = useState<"aisha" | "ibrahim">("aisha");

  // Local statuses
  const [statusAisha, setStatusAisha] = useState<"Pending Review" | "Reviewing" | "Returned" | "Passed">("Pending Review");
  const [statusIbrahim, setStatusIbrahim] = useState<"Pending Review" | "Reviewing" | "Returned" | "Passed">("Reviewing");

  // Separate criteria scores to preserve and recreate state as strings
  const [aishaClarity, setAishaClarity] = useState<string>("Good");
  const [aishaPractical, setAishaPractical] = useState<string>("Good");
  const [aishaConcepts, setAishaConcepts] = useState<string>("Average");
  const [aishaTone, setAishaTone] = useState<string>("Average");

  const [ibrahimClarity, setIbrahimClarity] = useState<string>("Excellent");
  const [ibrahimPractical, setIbrahimPractical] = useState<string>("Good");
  const [ibrahimConcepts, setIbrahimConcepts] = useState<string>("Good");
  const [ibrahimTone, setIbrahimTone] = useState<string>("Average");

  // Dynamic feedback texts for both
  const [feedbackAisha, setFeedbackAisha] = useState<string>("");
  const [feedbackIbrahim, setFeedbackIbrahim] = useState<string>("Nice work on this. Kaduna-Lagos transport routes are indeed prone to multiple intermediate failure points. Good focus on the Kaduna hubs.");

  // Current active bindings
  const criteriaClarity = activeReviewee === "aisha" ? aishaClarity : ibrahimClarity;
  const setCriteriaClarity = (val: string) => {
    if (activeReviewee === "aisha") {
      setAishaClarity(val);
    } else {
      setIbrahimClarity(val);
    }
  };

  const criteriaPractical = activeReviewee === "aisha" ? aishaPractical : ibrahimPractical;
  const setCriteriaPractical = (val: string) => {
    if (activeReviewee === "aisha") {
      setAishaPractical(val);
    } else {
      setIbrahimPractical(val);
    }
  };

  const criteriaConcepts = activeReviewee === "aisha" ? aishaConcepts : ibrahimConcepts;
  const setCriteriaConcepts = (val: string) => {
    if (activeReviewee === "aisha") {
      setAishaConcepts(val);
    } else {
      setIbrahimConcepts(val);
    }
  };

  const criteriaTone = activeReviewee === "aisha" ? aishaTone : ibrahimTone;
  const setCriteriaTone = (val: string) => {
    if (activeReviewee === "aisha") {
      setAishaTone(val);
    } else {
      setIbrahimTone(val);
    }
  };

  const feedbackText = activeReviewee === "aisha" ? feedbackAisha : feedbackIbrahim;
  const setFeedbackText = (val: string) => {
    if (activeReviewee === "aisha") {
      setFeedbackAisha(val);
    } else {
      setFeedbackIbrahim(val);
    }
  };

  const calculateScore = (student: "aisha" | "ibrahim") => {
    if (student === "aisha") {
      let sum = 0;
      sum += aishaClarity === "Excellent" ? 25 : aishaClarity === "Good" ? 20 : aishaClarity === "Average" ? 15 : 10;
      sum += aishaPractical === "Excellent" ? 25 : aishaPractical === "Good" ? 20 : aishaPractical === "Average" ? 15 : 10;
      sum += aishaConcepts === "Excellent" ? 25 : aishaConcepts === "Good" ? 20 : aishaConcepts === "Average" ? 15 : 10;
      sum += aishaTone === "Excellent" ? 25 : aishaTone === "Good" ? 20 : aishaTone === "Average" ? 15 : 10;
      return sum;
    } else {
      let sum = 0;
      sum += ibrahimClarity === "Excellent" ? 24 : ibrahimClarity === "Good" ? 19 : ibrahimClarity === "Average" ? 16 : 10;
      sum += ibrahimPractical === "Excellent" ? 24 : ibrahimPractical === "Good" ? 19 : ibrahimPractical === "Average" ? 16 : 10;
      sum += ibrahimConcepts === "Excellent" ? 24 : ibrahimConcepts === "Good" ? 19 : ibrahimConcepts === "Average" ? 16 : 10;
      sum += ibrahimTone === "Excellent" ? 24 : ibrahimTone === "Good" ? 19 : ibrahimTone === "Average" ? 16 : 10;
      return sum;
    }
  };

  const totalDesktopScore = calculateScore(activeReviewee);

  // Workspace and Quick View states
  const [isWorkspaceVisible, setIsWorkspaceVisible] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewLearner, setQuickViewLearner] = useState<"aisha" | "ibrahim">("aisha");

  // Form selections and flags
  const [clarityScore, setClarityScore] = useState("Good (4)");
  const [practicalScore, setPracticalScore] = useState("Average (3)");
  const [verifiedPlagiarism, setVerifiedPlagiarism] = useState(false);
  const [verifiedScore, setVerifiedScore] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  // Modal / overlay open states
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [isReleaseGradeModalOpen, setIsReleaseGradeModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [isFeedbackHistoryOpen, setIsFeedbackHistoryOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  // Filter settings state
  const [filterCohort, setFilterCohort] = useState("All Cohorts");
  const [filterAssessment, setFilterAssessment] = useState("All Assessments");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [filterAttempt, setFilterAttempt] = useState("All Attempts");
  const [filterSubmitted, setFilterSubmitted] = useState("Last 30 Days");

  // Applied filter state (copy of filter settings used to filter the view rows)
  const [appliedCohort, setAppliedCohort] = useState("All Cohorts");
  const [appliedAssessment, setAppliedAssessment] = useState("All Assessments");
  const [appliedStatus, setAppliedStatus] = useState("All Statuses");
  const [appliedAttempt, setAppliedAttempt] = useState("All Attempts");

  const handleStartReview = () => {
    setActiveReviewee("aisha");
    setStatusAisha("Reviewing");
    setIsWorkspaceVisible(true);
    showToast("Review started for Aisha Mohammed.");
    
    setTimeout(() => {
      const element = document.getElementById("review-workspace");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleReviewNow = () => {
    setActiveReviewee("aisha");
    setStatusAisha("Reviewing");
    setIsWorkspaceVisible(true);
    showToast("Aisha Mohammed’s submission is ready for review.");
    setTimeout(() => {
      const element = document.getElementById("review-workspace");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleContinue = () => {
    setActiveReviewee("ibrahim");
    setStatusIbrahim("Reviewing");
    setIsWorkspaceVisible(true);
    showToast("Continuing Ibrahim Garba’s review.");
    setTimeout(() => {
      const element = document.getElementById("review-workspace");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleOpenReviewFromQuickView = () => {
    setIsQuickViewOpen(false);
    setActiveReviewee(quickViewLearner);
    if (quickViewLearner === "aisha") {
      setStatusAisha("Reviewing");
      showToast("Aisha Mohammed’s submission is ready for review.");
    } else {
      setStatusIbrahim("Reviewing");
      showToast("Continuing Ibrahim Garba’s review.");
    }
    setIsWorkspaceVisible(true);
    setTimeout(() => {
      const element = document.getElementById("review-workspace");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleViewLearnerRecord = () => {
    setIsQuickViewOpen(false);
    navigateTo("/facilitator/learners/aisha-mohammed" as RoutePath);
  };

  const handleSaveReviewDraft = () => {
    showToast("Assessment review draft saved locally in this frontend prototype.");
  };

  const handleFilterAction = () => {
    setIsFilterOpen(true);
  };

  const handleApplyFilters = () => {
    setAppliedCohort(filterCohort);
    setAppliedAssessment(filterAssessment);
    setAppliedStatus(filterStatus);
    setAppliedAttempt(filterAttempt);
    setIsFilterOpen(false);
    showToast("Assessment filters applied in this frontend prototype.");
  };

  const handleClearFilters = () => {
    setFilterCohort("All Cohorts");
    setFilterAssessment("All Assessments");
    setFilterStatus("All Statuses");
    setFilterAttempt("All Attempts");
    setFilterSubmitted("Last 30 Days");
    setAppliedCohort("All Cohorts");
    setAppliedAssessment("All Assessments");
    setAppliedStatus("All Statuses");
    setAppliedAttempt("All Attempts");
    setIsFilterOpen(false);
    showToast("All filters cleared.");
  };

  const handleExportAction = () => {
    setIsExportOpen(true);
  };

  const handleStartBatch = () => {
    setActiveReviewee("aisha");
    setStatusAisha("Reviewing");
    setIsWorkspaceVisible(true);
    showToast("Batch review started in this frontend prototype.");
    setTimeout(() => {
      const element = document.getElementById("review-workspace");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleViewGuidelines = () => {
    const element = document.getElementById("guidelines-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      showToast("Guidelines view simulated in this frontend prototype.");
    }
  };

  const handleReadFullText = () => {
    setIsSubmissionOpen(true);
  };

  const handleSaveDraft = () => {
    showToast("Feedback draft saved locally in this frontend prototype.");
  };

  const handlePreviousFeedback = () => {
    setIsFeedbackHistoryOpen(true);
  };

  const handleSendForRevision = () => {
    setIsRevisionModalOpen(true);
  };

  const handleReleaseGrade = () => {
    setIsReleaseGradeModalOpen(true);
  };

  const handleQueryLearner = () => {
    setIsQueryModalOpen(true);
  };

  const handleExportReport = () => {
    setIsExportOpen(true);
  };

  const allSubmissionsList = [
    {
      id: "aisha",
      name: "Aisha Mohammed",
      avatar: "AM",
      assessment: "Work Readiness Assignment",
      course: "Work Readiness Foundation",
      submitted: "Oct 24, 14:20",
      attempt: "01",
      status: statusAisha,
      score: statusAisha === "Pending Review" || statusAisha === "Reviewing" ? "-" : `${calculateScore("aisha")}%`,
      cohort: "Kano Cohort 02",
      credits: "4 credits"
    },
    {
      id: "ibrahim",
      name: "Ibrahim Garba",
      avatar: "IG",
      assessment: "Agribusiness Plan V1",
      course: "Entrepreneurship 101",
      submitted: "Oct 25, 09:15",
      attempt: "02",
      status: statusIbrahim,
      score: statusIbrahim === "Pending Review" || statusIbrahim === "Reviewing" ? "-" : `${calculateScore("ibrahim")}%`,
      cohort: "Kano Cohort 02",
      credits: "5 credits"
    }
  ];

  const filteredSubmissions = allSubmissionsList.filter(item => {
    if (appliedCohort !== "All Cohorts" && item.cohort !== appliedCohort) return false;
    if (appliedAssessment !== "All Assessments" && item.assessment !== appliedAssessment) return false;
    if (appliedStatus !== "All Statuses" && item.status !== appliedStatus) return false;
    if (appliedAttempt !== "All Attempts") {
      const simplifiedAttempt = appliedAttempt === "Attempt 01" ? "01" : "02";
      if (item.attempt !== simplifiedAttempt) return false;
    }
    return true;
  });



  // ==========================================
  // MOBILE SCREEN RENDER
  // ==========================================
  if (isMobile) {
    return (
      <div className="pb-28 text-left font-sans bg-[#f8fafc] min-h-screen">
        {/* Mobile Header / Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 sticky top-0 z-40">
          <button 
            onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)} 
            className="p-1 text-slate-700 hover:text-emerald-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-base font-extrabold text-slate-900">Assessment Review</h2>
          <div className="flex items-center gap-3">
            <button onClick={() => showToast("No new notifications")} className="relative p-1">
              <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full" />
              <div className="h-5 w-5 text-slate-600">🔔</div>
            </button>
            <div className="h-8 w-8 rounded-full bg-emerald-900 flex items-center justify-center font-bold text-xs text-white">
              HS
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Mobile Hero Card */}
          <div className="bg-[#044c34] text-white rounded-3xl p-6 shadow-xs relative overflow-hidden">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Post-Harvest Strategy
              </span>
              <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                Module 4
              </span>
            </div>
            <h3 className="text-xl font-black tracking-tight leading-tight mb-1">
              Review Queue: Batch 08
            </h3>
            <p className="text-xs text-emerald-100 font-medium mb-5">
              Agribusiness Development Cohort - Lagos South
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleStartBatch}
                className="bg-white text-emerald-950 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <Play className="h-3.5 w-3.5 fill-emerald-950 text-emerald-950" /> Start Batch
              </button>
              <button 
                onClick={handleViewGuidelines}
                className="bg-transparent text-white border border-white/35 hover:bg-white/5 font-bold text-xs py-3 rounded-xl flex items-center justify-center transition-all active:scale-95"
              >
                View Guidelines
              </button>
            </div>
          </div>

          {/* Small KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PENDING</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-emerald-800">14</span>
                <span className="text-xs text-slate-400 font-bold">files</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REVIEWED TODAY</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-emerald-800">28</span>
                <span className="text-xs text-emerald-600 font-bold">completed</span>
              </div>
            </div>
          </div>

          {/* Queue (14) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-black text-slate-900">Queue (14)</h4>
              <button onClick={handleFilterAction} className="text-xs font-bold text-emerald-800 hover:text-emerald-900">
                View All
              </button>
            </div>
            
            {/* Horizontal scroll row of queue preview */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: "aisha", name: "Aisha Mohammed", time: "Submitted Yesterday", attempt: "Attempt 1", priority: true, status: statusAisha, avatar: "👩🏾" },
                { id: "ibrahim", name: "Ibrahim Garba", time: "Submitted 2d ago", attempt: "Attempt 2", priority: false, status: statusIbrahim, avatar: "👨🏾" }
              ].map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    setActiveReviewee(item.id as "aisha" | "ibrahim");
                    showToast(`Active workspace switched to ${item.name}`);
                  }}
                  className={`min-w-[200px] border rounded-2xl p-4 space-y-3 shrink-0 cursor-pointer transition-all ${
                    activeReviewee === item.id 
                      ? "bg-emerald-50/15 border-emerald-300 shadow-3xs" 
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {item.avatar}
                    </div>
                    <div>
                      <h5 className="text-xs font-extrabold text-slate-900">{item.name}</h5>
                      <p className="text-[10px] text-slate-450 font-medium">{item.time}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-50 text-[10px] font-bold">
                    <span className="text-slate-500">Attempt {item.attempt}</span>
                    <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] ${
                      item.status === "Pending Review"
                        ? "bg-amber-50 text-amber-800"
                        : item.status === "Reviewing"
                          ? "bg-blue-50 text-blue-800"
                          : item.status === "Returned"
                            ? "bg-rose-50 text-rose-800"
                            : "bg-emerald-50 text-emerald-800"
                    }`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Review: Dynamic */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
            <h4 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Active Review: {activeReviewee === "aisha" ? "Aisha Mohammed" : "Ibrahim Garba"}</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                (activeReviewee === "aisha" ? statusAisha : statusIbrahim) === "Pending Review"
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : (activeReviewee === "aisha" ? statusAisha : statusIbrahim) === "Reviewing"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : (activeReviewee === "aisha" ? statusAisha : statusIbrahim) === "Returned"
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
              }`}>
                {activeReviewee === "aisha" ? statusAisha : statusIbrahim}
              </span>
            </h4>
            
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">TASK PROMPT</span>
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 text-xs text-slate-700 leading-relaxed font-semibold">
                {activeReviewee === "aisha" ? (
                  "Prepare a short written response showing how you would prepare for a workplace interview, communicate professionally, and follow up after the interview."
                ) : (
                  "Draft a 500-word contingency plan for cold-chain failures during grain transportation from Kaduna to Lagos. Include cost mitigation and risk assessment."
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">SUBMISSION PREVIEW</span>
              <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-3 space-y-2 text-xs">
                <p className="text-slate-600 italic leading-relaxed">
                  {activeReviewee === "aisha" ? (
                    "\"In preparing for a workplace interview, my first step is conducting thorough research on the organization's values, mission, and current projects. I draft customized professional talking points...\""
                  ) : (
                    "\"In response to potential cold-chain failures during transshipment from Kaduna to Lagos, our primary logistics strategy centers on three tactical pillars: Rapid Sensor Alerts, Local Warehouse Partnerships, and Buffer Stock...\""
                  )}
                </p>
                <button 
                  onClick={handleReadFullText}
                  className="text-emerald-850 hover:text-emerald-950 font-extrabold flex items-center gap-1 mt-1 text-[11px]"
                >
                  Read Full Text ↗
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <span className="font-extrabold text-xs text-slate-800 block">
                    {activeReviewee === "aisha" ? "Interview preparation notes.docx" : "Cold_Chain_Plan_v2.pdf"}
                  </span>
                  <span className="text-[10px] text-slate-450 font-bold font-mono">
                    {activeReviewee === "aisha" ? "1.2 MB • DOCX" : "1.4 MB • PDF"}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => showToast("File downloaded in this frontend prototype.")}
                className="p-2 text-slate-400 hover:text-slate-700"
              >
                📥
              </button>
            </div>
          </div>

          {/* Grading Criteria */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900">Grading Criteria</h4>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <span className="font-extrabold text-xs text-slate-800 block">Clarity &amp; Structure</span>
                <span className="text-[10px] text-slate-450 font-medium block">Logical flow of information</span>
              </div>
              <select 
                value={clarityScore} 
                onChange={(e) => setClarityScore(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800"
              >
                <option>Good (4)</option>
                <option>Average (3)</option>
                <option>Excellent (5)</option>
                <option>Poor (2)</option>
              </select>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <span className="font-extrabold text-xs text-slate-800 block">Practical Feasibility</span>
                <span className="text-[10px] text-slate-450 font-medium block">Real-world applicability</span>
              </div>
              <select 
                value={practicalScore} 
                onChange={(e) => setPracticalScore(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800"
              >
                <option>Average (3)</option>
                <option>Good (4)</option>
                <option>Excellent (5)</option>
                <option>Needs Work (2)</option>
              </select>
            </div>
          </div>

          {/* Weighted Score */}
          <div className="bg-emerald-900 text-white rounded-2xl p-4 flex justify-between items-center shadow-3xs">
            <div>
              <span className="text-[10px] font-bold text-emerald-200 tracking-wider block">WEIGHTED SCORE</span>
              <span className="text-2xl font-black block mt-0.5">7.0 / 10.0</span>
            </div>
            <span className="bg-emerald-800/80 text-white border border-emerald-700 px-3.5 py-1 rounded-full text-xs font-black tracking-widest">
              PASSING
            </span>
          </div>

          {/* Facilitator Feedback */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-slate-900">Facilitator Feedback</h4>
            <div className="space-y-3">
              <textarea 
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Provide detailed feedback for the learner..."
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-xs focus:outline-hidden focus:border-emerald-800 text-slate-700 font-medium"
              />
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleSaveDraft}
                  className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  Save Draft
                </button>
                <button 
                  onClick={handlePreviousFeedback}
                  className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>🔄</span> Previous Feedback
                </button>
              </div>
            </div>
          </div>

          {/* Final Decision */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4">
            <h4 className="text-sm font-black text-slate-900">Final Decision</h4>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 text-xs text-slate-600 font-medium select-none cursor-pointer">
                <input 
                  type="checkbox"
                  checked={verifiedPlagiarism}
                  onChange={(e) => setVerifiedPlagiarism(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" 
                />
                <span>I have verified the submission against plagiarism tools.</span>
              </label>

              <label className="flex items-start gap-3 text-xs text-slate-600 font-medium select-none cursor-pointer">
                <input 
                  type="checkbox"
                  checked={verifiedScore}
                  onChange={(e) => setVerifiedScore(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" 
                />
                <span>Final score accurately reflects technical merit.</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={handleSendForRevision}
                className="bg-white text-rose-700 border border-rose-200 font-bold text-xs py-3 rounded-xl transition-all active:scale-95 uppercase tracking-wider"
              >
                Send for Revision
              </button>
              <button 
                onClick={handleReleaseGrade}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-3 rounded-xl transition-all active:scale-95 uppercase tracking-wider shadow-sm"
              >
                Release Grade
              </button>
            </div>
          </div>

          {/* Certification Impact */}
          <div className="bg-[#e0e7ff]/60 border border-[#c7d2fe]/40 rounded-2xl p-4 flex items-start gap-3">
            <span className="text-lg mt-0.5">🛡️</span>
            <div>
              <h5 className="font-extrabold text-xs text-[#3730a3]">Certification Impact</h5>
              <p className="text-[11px] text-[#4f46e5] font-medium leading-relaxed mt-0.5">
                Approval of this assessment contributes 12% towards the "Post-Harvest Logistics Expert" Certification.
              </p>
            </div>
          </div>

          {/* Submission Audit Trail */}
          <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
            <button 
              onClick={() => setAuditOpen(!auditOpen)}
              className="w-full flex justify-between items-center p-4 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <span className="flex items-center gap-2">
                <span>⏱️</span> Submission Audit Trail
              </span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${auditOpen ? "rotate-180" : ""}`} />
            </button>
            {auditOpen && (
              <div className="px-4 pb-4 pt-1 text-[11px] text-slate-500 space-y-2 border-t border-slate-50">
                <div className="flex justify-between">
                  <span>Draft Created</span>
                  <span className="font-mono">Oct 24, 11:15</span>
                </div>
                <div className="flex justify-between">
                  <span>File Uploaded</span>
                  <span className="font-mono">Oct 24, 12:40</span>
                </div>
                <div className="flex justify-between">
                  <span>Final Submission</span>
                  <span className="font-mono font-bold text-slate-700">Oct 24, 14:20</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button 
              onClick={handleQueryLearner}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 text-slate-700 font-extrabold text-xs active:bg-slate-50"
            >
              <HelpCircle className="h-5 w-5 text-slate-400" />
              <span>Query Learner</span>
            </button>
            <button 
              onClick={handleExportReport}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 text-slate-700 font-extrabold text-xs active:bg-slate-50"
            >
              <Download className="h-5 w-5 text-slate-400" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // DESKTOP SCREEN RENDER
  // ==========================================
  return (
    <div className="space-y-6 text-left font-sans bg-slate-50/20 pb-16">
      
      {/* 1. Assessment Review Page Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 pb-2">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Assessment Review
          </h1>
          
          {/* Context Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
              Work Readiness Assignment
            </span>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
              Work Readiness Foundation
            </span>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
              Kano Cohort 02
            </span>
          </div>
        </div>

        {/* Right side controls: Primary Actions & Active Learner Info Card */}
        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          {/* Main Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={handleStartReview}
              className="bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-white" /> Start Review
            </button>
            <button 
              onClick={handleSaveReviewDraft}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Save Review Draft
            </button>
          </div>

          {/* Active Learner Quick Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center gap-3 shadow-3xs shrink-0 max-w-sm">
            <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
              <span className="text-lg">👩🏾</span>
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-950">Aisha Mohammed</h4>
              <p className="text-[10px] text-slate-450 font-bold">Submitted Yesterday</p>
              <div className="flex items-center gap-1 text-[9px] text-emerald-800 font-black uppercase tracking-wider mt-0.5">
                <span>⭐ 4 credits potential</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KPI Cards (6 cards in a row) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Pending", val: "24", color: "text-amber-600 bg-white" },
          { label: "Ready", val: "12", color: "text-emerald-850 bg-white" },
          { label: "Returned", val: "05", color: "text-rose-600 bg-white" },
          { label: "Passed", val: "142", color: "text-slate-800 bg-white" },
          { label: "Avg Score", val: "82%", color: "text-slate-800 bg-white" },
          { label: "CPD Updates", val: "+480", color: "text-white bg-emerald-900" }
        ].map((kpi, idx) => (
          <div 
            key={idx} 
            className={`border rounded-2xl p-4 flex flex-col justify-between h-24 shadow-3xs transition-all ${
              kpi.color.includes("bg-emerald-900") 
                ? "bg-emerald-900 border-emerald-950" 
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              kpi.color.includes("bg-emerald-900") ? "text-emerald-200" : "text-slate-450"
            }`}>
              {kpi.label}
            </span>
            <span className={`text-2xl font-black block leading-none ${
              kpi.color.includes("bg-emerald-900") ? "text-white" : kpi.color.split(" ")[0]
            }`}>
              {kpi.val}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Active Submission Queue Card & Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {/* Card Header with filter and export actions */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Active Submission Queue
            </h3>
            <p className="text-xs text-slate-450 font-semibold mt-0.5">
              Review and score incoming student assignment submittals
            </p>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={handleFilterAction}
              className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-950 rounded-xl transition-all hover:bg-slate-50 shadow-3xs cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Filter records"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" /> Filter
            </button>
            <button 
              onClick={handleExportAction}
              className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-950 rounded-xl transition-all hover:bg-slate-50 shadow-3xs cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Export report"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" /> Export
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/25 border-b border-slate-100 text-[10px] font-bold font-mono text-slate-450 uppercase tracking-wider">
                <th className="p-4 pl-6">Learner</th>
                <th className="p-4">Assessment</th>
                <th className="p-4">Course</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Attempt</th>
                <th className="p-4">Status</th>
                <th className="p-4">Score</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 font-medium">
                    No submissions found matching the applied filters.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((item) => {
                  const isActive = activeReviewee === item.id;
                  
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => {
                        setQuickViewLearner(item.id as "aisha" | "ibrahim");
                        setIsQuickViewOpen(true);
                      }}
                      className={`hover:bg-emerald-50/40 no-transform transition-colors cursor-pointer ${isActive ? "bg-emerald-50/15" : ""}`}
                    >
                      <td className="p-4 pl-6 flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[11px]">
                          {item.avatar}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-950 block">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.cohort}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800">{item.assessment}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-500">{item.course}</span>
                      </td>
                      <td className="p-4 font-mono text-slate-600">{item.submitted}</td>
                      <td className="p-4 font-mono text-slate-600">{item.attempt}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 border px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          item.status === "Pending Review"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : item.status === "Reviewing"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : item.status === "Returned"
                                ? "bg-rose-50 text-rose-800 border-rose-200"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "Pending Review"
                              ? "bg-amber-500"
                              : item.status === "Reviewing"
                                ? "bg-blue-500"
                                : item.status === "Returned"
                                  ? "bg-rose-500"
                                  : "bg-emerald-500"
                          }`} /> {item.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-700 font-bold">{item.score}</td>
                      <td className="p-4 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                        {item.id === "aisha" ? (
                          <button 
                            onClick={handleReviewNow}
                            className="text-emerald-850 hover:text-emerald-950 font-black text-xs cursor-pointer flex items-center gap-0.5 ml-auto bg-white hover:bg-emerald-50/40 px-3 py-1.5 rounded-lg border border-slate-200 shadow-3xs"
                          >
                            Review Now <ChevronRight className="h-3 w-3" />
                          </button>
                        ) : (
                          <button 
                            onClick={handleContinue}
                            className="text-emerald-850 hover:text-emerald-950 font-black text-xs cursor-pointer flex items-center gap-0.5 ml-auto bg-white hover:bg-emerald-50/40 px-3 py-1.5 rounded-lg border border-slate-200 shadow-3xs"
                          >
                            Continue <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Summary Cards Below Table (three cards in a row) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Learner Summary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-4">
          <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest pb-2 border-b border-slate-100">
            Learner Summary
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Overall Progress</span>
              <span className="text-slate-900 font-black">64%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Current Cohort</span>
              <span className="text-slate-900 font-extrabold">Kano 02</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Total Credits Earned</span>
              <span className="text-emerald-800 font-black">22 pts</span>
            </div>
          </div>
        </div>

        {/* Card 2: Submission Summary */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-4">
          <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest pb-2 border-b border-slate-100">
            Submission Summary
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Format</span>
              <span className="text-slate-900 font-extrabold">Text Response</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Words</span>
              <span className="text-slate-900 font-black">386 words</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Estimated Review Time</span>
              <span className="text-slate-900 font-bold">~8 mins</span>
            </div>
          </div>
        </div>

        {/* Card 3: Review Requirements */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-4">
          <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest pb-2 border-b border-slate-100">
            Review Requirements
          </h4>
          <div className="space-y-3 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2.5">
              <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[3] shrink-0" />
              <span>Critical Thinking Check</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[3] shrink-0" />
              <span>Application of Module 2</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[3] shrink-0" />
              <span>Case Study Integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Assessment Instructions & Guidelines */}
      <div id="guidelines-section" className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-xs border-l-4 border-l-emerald-800 space-y-6">
        <h3 className="text-base font-black text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <Info className="h-5 w-5 text-emerald-850" /> Assessment Instructions &amp; Guidelines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Submission Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">
              Submission Standards:
            </h4>
            <ul className="text-xs text-slate-600 font-semibold space-y-2.5 list-disc pl-5 leading-relaxed">
              <li>Minimum length: 300 words</li>
              <li>Maximum length: 500 words</li>
              <li>Response must include one practical example</li>
              <li>Learner must connect answer to module learning</li>
            </ul>
          </div>

          {/* Right Column: Core Evaluation Pillar */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">
              Core Evaluation Pillar:
            </h4>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              The learner should answer the professional question clearly, apply the course concepts, and provide a practical example from their learning or work experience.
            </p>
          </div>
        </div>

        {/* Rubric Tag Row */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">Rubric Parameters:</span>
          <div className="flex flex-wrap gap-2 text-[10px] font-extrabold text-slate-600">
            {["Clarity and structure", "Practical application", "Use of course concepts", "Professional communication"].map((tag, i) => (
              <span key={i} className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Active Review Workspace Area */}
      {isWorkspaceVisible && (
        <div id="review-workspace" className="space-y-6 pt-6 border-t border-slate-200">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Review Workspace</h2>
            <p className="text-sm text-slate-500 font-semibold">Review the selected submission, apply rubric scores, and prepare learner feedback.</p>
          </div>

          {/* Selected Learner Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-3xs hover:border-emerald-200 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center text-2xl font-bold shrink-0">
                {activeReviewee === "aisha" ? "👩🏾" : "👨🏾"}
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-950">{activeReviewee === "aisha" ? "Aisha Mohammed" : "Ibrahim Garba"}</h3>
                <p className="text-xs text-slate-450 font-bold font-mono">Kano Cohort 02</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Assessment</span>
                <span>{activeReviewee === "aisha" ? "Work Readiness Assignment" : "Agribusiness Plan V1"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Submitted</span>
                <span className="font-mono">{activeReviewee === "aisha" ? "Oct 24, 14:20" : "Oct 25, 09:15"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Attempt</span>
                <span className="font-mono">Attempt {activeReviewee === "aisha" ? "01" : "02"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Status</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                  Reviewing
                </span>
              </div>
            </div>
            {activeReviewee === "ibrahim" && (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl px-4 py-2.5 text-right font-bold text-xs shrink-0 self-stretch md:self-auto flex flex-col justify-center">
                <span className="text-[9px] text-emerald-600 uppercase tracking-wider block">Current Score</span>
                <span className="text-lg font-black">{calculateScore("ibrahim")}%</span>
              </div>
            )}
          </div>

          {/* Dual Column Workspace Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Submission Preview Card */}
            <div className="xl:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-6 hover:border-emerald-200 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900">Submission Preview</h3>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Text Response</span>
              </div>

              {/* Task Prompt Box */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TASK PROMPT</span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 leading-relaxed">
                  {activeReviewee === "aisha" ? (
                    "Prepare a short written response showing how you would prepare for a workplace interview, communicate professionally, and follow up after the interview."
                  ) : (
                    "Draft a 500-word contingency plan for cold-chain failures during grain transportation from Kaduna to Lagos. Include cost mitigation and risk assessment."
                  )}
                </div>
              </div>

              {/* Response Content Box */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LEARNER RESPONSE PREVIEW</span>
                <div className="p-5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-600 font-semibold space-y-3">
                  {activeReviewee === "aisha" ? (
                    <>
                      <p>
                        "In preparing for a workplace interview, my first step is conducting thorough research on the organization's values, mission, and current projects. I draft customized professional talking points that highlight my key achievements."
                      </p>
                      <p>
                        "During the interview, I focus on clear, structured communication using the STAR method (Situation, Task, Action, Result) to describe my experience. I ensure my body language matches my professional tone."
                      </p>
                      <p>
                        "Afterward, I send a polite follow-up email within 24 hours to express gratitude for the panel's consideration and re-state my strong interest."
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        "In response to potential cold-chain failures during transshipment from Kaduna to Lagos, our primary logistics strategy centers on three tactical pillars: Rapid Sensor Alerts, Local Warehouse Partnerships, and Buffer Stock."
                      </p>
                      <p>
                        "Real-time telematics detect container heat fluctuations instantly. We have mapped intermediate cold-storage hubs along the main transit routes to redirect perishables immediately if a refrigerator unit malfunctions, protecting margins."
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Attachment Section */}
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-150 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <span className="font-extrabold text-xs text-slate-800 block">
                      {activeReviewee === "aisha" ? "Work_Readiness_Assignment.pdf" : "Cold_Chain_Plan_v2.pdf"}
                    </span>
                    <span className="text-[10px] text-slate-455 font-bold font-mono">
                      {activeReviewee === "aisha" ? "1.2 MB • PDF" : "1.4 MB • PDF"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsSubmissionOpen(true)}
                    className="text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs px-3 py-2 rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-3xs"
                  >
                    Read Full Submission
                  </button>
                  <button 
                    onClick={() => showToast("Attachment download simulated in this frontend prototype.")}
                    className="text-white bg-emerald-900 hover:bg-emerald-850 font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    Download Attachment
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Review Panel */}
            <div className="xl:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-3xs space-y-6 hover:border-emerald-200 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900">Review Panel</h3>
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Evaluation</span>
              </div>

              {/* Rubric scores */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">1. Rubric Scores</h4>
                
                <div className="space-y-3">
                  {/* Clarity & Structure */}
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800">Clarity &amp; Structure</label>
                    <select 
                      value={criteriaClarity} 
                      onChange={(e) => setCriteriaClarity(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-emerald-800"
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Needs Work</option>
                    </select>
                  </div>

                  {/* Practical Application */}
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800">Practical Application</label>
                    <select 
                      value={criteriaPractical} 
                      onChange={(e) => setCriteriaPractical(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-emerald-800"
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Needs Work</option>
                    </select>
                  </div>

                  {/* Module Understanding */}
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800">Module Understanding</label>
                    <select 
                      value={criteriaConcepts} 
                      onChange={(e) => setCriteriaConcepts(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-emerald-800"
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Needs Work</option>
                    </select>
                  </div>

                  {/* Communication Quality */}
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-800">Communication Quality</label>
                    <select 
                      value={criteriaTone} 
                      onChange={(e) => setCriteriaTone(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-emerald-800"
                    >
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                      <option>Needs Work</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Score & Passing box */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider">2. Weighted Score</h4>
                <div className="p-4 bg-emerald-50/40 border border-emerald-100/60 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-450 tracking-wider uppercase block">Weighted Score</span>
                    <span className="text-2xl font-black text-slate-900 block mt-0.5">{totalDesktopScore} / 100</span>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest border uppercase ${
                    totalDesktopScore >= 70 
                      ? "bg-emerald-800 text-white border-emerald-900" 
                      : "bg-amber-150 text-amber-900 border-amber-300"
                  }`}>
                    {totalDesktopScore >= 70 ? "Passing" : "Needs Review"}
                  </span>
                </div>
              </div>

              {/* Textarea for facilitator comments */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">Facilitator Feedback comments</label>
                <textarea 
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Write clear feedback for the learner..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:border-emerald-800 text-slate-700 font-medium"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleSendForRevision}
                    className="bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-700 text-slate-700 border border-slate-200 font-bold text-xs py-3 rounded-xl transition-colors text-center cursor-pointer uppercase"
                  >
                    Send for Revision
                  </button>
                  <button 
                    onClick={handleReleaseGrade}
                    className="bg-emerald-900 hover:bg-emerald-850 hover:border-emerald-950 text-white font-bold text-xs py-3 rounded-xl transition-colors text-center cursor-pointer uppercase shadow-sm"
                  >
                    Release Grade
                  </button>
                </div>
                <button 
                  onClick={() => showToast("Assessment review draft saved locally in this frontend prototype.")}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors text-center cursor-pointer"
                >
                  Save Draft
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MODALS & DRAWERS FOR ASSESSMENT REVIEW
          ========================================== */}
      
      {/* 1. Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsFilterOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-md mx-4 relative z-10 space-y-5 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>🔍</span> Filter Submissions
              </h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-450 hover:text-slate-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Cohort</label>
                <select value={filterCohort} onChange={(e) => setFilterCohort(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800">
                  <option>All Cohorts</option>
                  <option>Kano Cohort 02</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Assessment</label>
                <select value={filterAssessment} onChange={(e) => setFilterAssessment(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800">
                  <option>All Assessments</option>
                  <option>Work Readiness Assignment</option>
                  <option>Agribusiness Plan V1</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Status</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800">
                  <option>All Statuses</option>
                  <option>Pending Review</option>
                  <option>Reviewing</option>
                  <option>Returned</option>
                  <option>Passed</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Attempt</label>
                <select value={filterAttempt} onChange={(e) => setFilterAttempt(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800">
                  <option>All Attempts</option>
                  <option>Attempt 01</option>
                  <option>Attempt 02</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Submitted</label>
                <select value={filterSubmitted} onChange={(e) => setFilterSubmitted(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800">
                  <option>Last 30 Days</option>
                  <option>This Week</option>
                  <option>Today</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button onClick={handleClearFilters} className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all hover:bg-slate-50 text-center cursor-pointer">
                Clear Filters
              </button>
              <button onClick={handleApplyFilters} className="bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs py-2.5 rounded-xl transition-all text-center cursor-pointer shadow-sm">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Export Modal */}
      {isExportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsExportOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-md mx-4 relative z-10 space-y-5 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>📥</span> Export Reviews
              </h3>
              <button onClick={() => setIsExportOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-450 hover:text-slate-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <span className="block text-[10px] text-slate-450 font-bold font-mono uppercase tracking-wider">Format Options</span>
              <div className="grid grid-cols-3 gap-2">
                <button className="border border-emerald-800/20 bg-emerald-50/20 p-3 rounded-xl flex flex-col items-center gap-1 cursor-pointer">
                  <span className="text-xl">📄</span>
                  <span className="font-bold text-[11px] text-emerald-900">PDF Summary</span>
                </button>
                <button className="border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/10 p-3 rounded-xl flex flex-col items-center gap-1 cursor-pointer">
                  <span className="text-xl">📊</span>
                  <span className="font-bold text-[11px] text-slate-800">Excel Sheet</span>
                </button>
                <button className="border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/10 p-3 rounded-xl flex flex-col items-center gap-1 cursor-pointer">
                  <span className="text-xl">📁</span>
                  <span className="font-bold text-[11px] text-slate-800">CSV List</span>
                </button>
              </div>

              <div className="space-y-2.5 pt-2">
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>Include feedback comments and rubrics</span>
                </label>
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>Include anonymized student IDs</span>
                </label>
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>Include review history states</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setIsExportOpen(false)} className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all hover:bg-slate-50 text-center cursor-pointer">
                Cancel
              </button>
              <button onClick={() => { setIsExportOpen(false); showToast("Assessment review export simulated in this frontend prototype."); }} className="bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs py-2.5 rounded-xl transition-all text-center cursor-pointer shadow-sm">
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Open Submission Drawer */}
      {isSubmissionOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsSubmissionOpen(false)} />
          <div className="bg-white h-full w-full max-w-2xl relative z-10 shadow-2xl flex flex-col text-left">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase text-emerald-800 block">SUBMISSION PREVIEW DRAWER</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  {activeReviewee === "aisha" ? "Aisha Mohammed" : "Ibrahim Garba"}
                </h3>
              </div>
              <button onClick={() => setIsSubmissionOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-450 hover:text-slate-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-semibold text-slate-700">
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">ASSESSMENT DETAILS</span>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex justify-between"><span className="text-slate-500">Course:</span><span className="text-slate-900 font-extrabold">{activeReviewee === "aisha" ? "Work Readiness Foundation" : "Entrepreneurship 101"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Assessment:</span><span className="text-slate-900 font-extrabold">{activeReviewee === "aisha" ? "Work Readiness Assignment" : "Agribusiness Plan V1"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Submitted:</span><span className="text-slate-900 font-bold font-mono">{activeReviewee === "aisha" ? "Oct 24, 14:20" : "Oct 25, 09:15"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Attempt:</span><span className="text-slate-900 font-bold font-mono">Attempt {activeReviewee === "aisha" ? "01" : "02"}</span></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">FULL TEXT RESPONSE</span>
                <div className="p-5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-600 font-semibold space-y-4">
                  {activeReviewee === "aisha" ? (
                    <>
                      <p className="font-bold text-slate-900">Step 1: Conducting Research</p>
                      <p>In preparing for a workplace interview, my first step is conducting thorough research on the organization's values, mission, and current projects. I draft customized professional talking points that highlight my key achievements and how they align with the role.</p>
                      <p className="font-bold text-slate-900">Step 2: Effective Communication</p>
                      <p>During the interview, I focus on clear, structured communication using the STAR method (Situation, Task, Action, Result) to describe my experience. I ensure my body language matches my professional tone, maintaining eye contact and listening actively to every prompt.</p>
                      <p className="font-bold text-slate-900">Step 3: Post-Interview Follow-Up</p>
                      <p>Afterward, I send a polite follow-up email within 24 hours to express gratitude for the panel's consideration and re-state my strong interest. This leaves a lasting professional impression and reinforces my commitment to the program standards.</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-slate-900">Section 1: Cold-Chain Pillars</p>
                      <p>In response to potential cold-chain failures during transshipment from Kaduna to Lagos, our primary logistics strategy centers on three tactical pillars: Rapid Sensor Alerts, Local Warehouse Partnerships, and Buffer Stock.</p>
                      <p className="font-bold text-slate-900">Section 2: Intermediate Cold Hubs</p>
                      <p>Real-time telematics detect container heat fluctuations instantly. We have mapped intermediate cold-storage hubs along the main transit routes to redirect perishables immediately if a refrigerator unit malfunctions, protecting margins and minimizing agricultural waste.</p>
                      <p className="font-bold text-slate-900">Section 3: Mitigation Economics</p>
                      <p>By securing contracts with cold-storage facilities near Zaria and Abuja, we decrease our overall inventory depreciation risk by 42%. In the event of vehicle breakdown, regional logistics partners provide secondary transport within a 4-hour SLA.</p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">ATTACHMENTS</span>
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📁</span>
                    <div>
                      <span className="font-extrabold text-xs text-slate-800 block">
                        {activeReviewee === "aisha" ? "Interview preparation notes.docx" : "Cold_Chain_Plan_v2.pdf"}
                      </span>
                      <span className="text-[10px] text-slate-450 font-bold font-mono">
                        {activeReviewee === "aisha" ? "1.2 MB • DOCX" : "1.4 MB • PDF"}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => showToast("File downloaded successfully.")} className="text-emerald-850 hover:text-emerald-950 font-extrabold text-xs cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-3xs">
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button onClick={() => setIsSubmissionOpen(false)} className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all hover:bg-slate-50 text-center cursor-pointer uppercase">
                Close
              </button>
              <button onClick={() => { setIsSubmissionOpen(false); setTimeout(() => { document.getElementById("review-workspace")?.scrollIntoView({ behavior: "smooth" }); }, 150); }} className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs py-3 rounded-xl transition-all text-center cursor-pointer uppercase shadow-sm">
                Use for Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. View Feedback History Drawer */}
      {isFeedbackHistoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsFeedbackHistoryOpen(false)} />
          <div className="bg-white h-full w-full max-w-md relative z-10 shadow-2xl flex flex-col text-left">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <span className="text-[10px] font-black tracking-wider uppercase text-emerald-800 block">PAST ASSESSMENTS FEEDBACK</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  {activeReviewee === "aisha" ? "Aisha Mohammed" : "Ibrahim Garba"}
                </h3>
              </div>
              <button onClick={() => setIsFeedbackHistoryOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-450 hover:text-slate-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs font-semibold">
              <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3 shadow-3xs">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <span className="font-extrabold text-slate-800 text-[11px]">Digital Readiness Quiz</span>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full text-[9px] font-extrabold">88% (Pass)</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  "Excellent focus on digital security protocols and workspace guidelines. Aisha demonstrates clear mastery of collaborative tools."
                </p>
                <span className="text-[10px] text-slate-400 font-bold block pt-1">Oct 12, 24 • Facilitator: Grace</span>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3 shadow-3xs">
                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                  <span className="font-extrabold text-slate-800 text-[11px]">Communication Skills Assessment</span>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full text-[9px] font-extrabold">92% (Pass)</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  "Strong communication structure and clear response examples. Very articulate representation of business goals."
                </p>
                <span className="text-[10px] text-slate-400 font-bold block pt-1">Sep 28, 24 • Facilitator: Grace</span>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2">
              <button onClick={() => { setIsFeedbackHistoryOpen(false); if (activeReviewee === "aisha") { navigateTo("/facilitator/learners/SUST-LRN-0442" as RoutePath); } else { navigateTo("/facilitator/learners/SUST-LRN-0443" as RoutePath); } }} className="w-full bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs py-3 rounded-xl transition-all text-center cursor-pointer uppercase shadow-sm">
                Open Learner Record
              </button>
              <button onClick={() => setIsFeedbackHistoryOpen(false)} className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all hover:bg-slate-50 text-center cursor-pointer uppercase">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Send for Revision Modal */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsRevisionModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-lg mx-4 relative z-10 space-y-5 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>⚠️</span> Send for Revision
                </h3>
                <p className="text-[11px] text-slate-440 font-semibold mt-0.5">
                  Request the learner to update and resubmit this assessment
                </p>
              </div>
              <button onClick={() => setIsRevisionModalOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-450 hover:text-slate-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Revision Reason</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800">
                  <option>Incomplete answer</option>
                  <option>Needs clearer examples</option>
                  <option>Incorrect submission format</option>
                  <option>Missing required section</option>
                  <option>Needs stronger practical application</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Revision Notes &amp; Guidance</label>
                <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:border-emerald-800 text-slate-700 font-medium leading-relaxed" defaultValue="Please revise your submission by adding clearer examples from your work-readiness module and explaining how you would apply the lesson in a real workplace situation." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-500 font-bold text-[10px] uppercase">Resubmission Deadline</label>
                  <input type="date" defaultValue="2024-11-01" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800" />
                </div>
                <div className="space-y-2 pt-6">
                  <label className="flex items-center gap-2.5 select-none cursor-pointer text-slate-650">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                    <span>Attach Support Guide</span>
                  </label>
                  <label className="flex items-center gap-2.5 select-none cursor-pointer text-slate-650">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                    <span>Notify Learner (SMS &amp; In-App)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setIsRevisionModalOpen(false)} className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all hover:bg-slate-50 text-center cursor-pointer uppercase">
                Cancel
              </button>
              <button onClick={() => { if (activeReviewee === "aisha") { setStatusAisha("Returned"); } else { setStatusIbrahim("Returned"); } setIsRevisionModalOpen(false); showToast("Revision request sent locally in this frontend prototype."); }} className="bg-rose-700 hover:bg-rose-650 text-white font-bold text-xs py-2.5 rounded-xl transition-all text-center cursor-pointer uppercase shadow-sm">
                Send Revision Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Release Grade Modal */}
      {isReleaseGradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsReleaseGradeModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-lg mx-4 relative z-10 space-y-5 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>🛡️</span> Release Grade
                </h3>
                <p className="text-[11px] text-slate-455 font-semibold mt-0.5">
                  Confirm the score and feedback before releasing this result to the learner
                </p>
              </div>
              <button onClick={() => setIsReleaseGradeModalOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-450 hover:text-slate-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex justify-between"><span className="text-slate-500">Learner:</span><span className="text-slate-900 font-extrabold">{activeReviewee === "aisha" ? "Aisha Mohammed" : "Ibrahim Garba"}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Assessment:</span><span className="text-slate-900 font-extrabold">{activeReviewee === "aisha" ? "Work Readiness Assignment" : "Agribusiness Plan V1"}</span></div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Weighted Score:</span>
                  <span className="text-emerald-850 font-black font-mono">{totalDesktopScore} / 100 ({totalDesktopScore >= 70 ? "Passed" : "Needs Review"})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Credits Awarded:</span>
                  <span className="text-emerald-800 font-black">{activeReviewee === "aisha" ? "4 credits" : "5 credits"}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider block">Compliance Checklist</span>
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>I have thoroughly reviewed the student's work response</span>
                </label>
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>Feedback comments are constructive and complete</span>
                </label>
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>Score is calculated according to official rubrics</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setIsReleaseGradeModalOpen(false)} className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all hover:bg-slate-50 text-center cursor-pointer uppercase">
                Cancel
              </button>
              <button onClick={() => { if (activeReviewee === "aisha") { setStatusAisha("Passed"); } else { setStatusIbrahim("Passed"); } setIsReleaseGradeModalOpen(false); showToast("Grade release simulated in this frontend prototype."); }} className="bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs py-2.5 rounded-xl transition-all text-center cursor-pointer uppercase shadow-sm">
                Release Grade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Query Learner Modal */}
      {isQueryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsQueryModalOpen(false)} />
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-lg mx-4 relative z-10 space-y-5 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>💬</span> Query Learner
                </h3>
                <p className="text-[11px] text-slate-450 font-semibold mt-0.5">
                  Send a direct query or clarification request to {activeReviewee === "aisha" ? "Aisha Mohammed" : "Ibrahim Garba"}
                </p>
              </div>
              <button onClick={() => setIsQueryModalOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-450 hover:text-slate-700 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Query Topic</label>
                <input type="text" defaultValue={activeReviewee === "aisha" ? "Clarification on STAR description" : "References for logistics transport hubs Kaduna"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-xs text-slate-800 focus:outline-hidden focus:border-emerald-800" />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-500 font-bold text-[10px] uppercase">Write Question or Request</label>
                <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-hidden focus:border-emerald-800 text-slate-700 font-medium leading-relaxed" placeholder="Please clarify how you calculated the regional transport SLA..." />
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider block">Send Channels</span>
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>Link to active Support Ticket inbox</span>
                </label>
                <label className="flex items-center gap-2.5 select-none cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-800 focus:ring-emerald-800 focus:ring-1 h-4 w-4" />
                  <span>Send standard SMS push alert</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setIsQueryModalOpen(false)} className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all hover:bg-slate-50 text-center cursor-pointer uppercase">
                Cancel
              </button>
              <button onClick={() => { setIsQueryModalOpen(false); showToast("Learner query drafted locally in this frontend prototype."); }} className="bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs py-2.5 rounded-xl transition-all text-center cursor-pointer uppercase shadow-sm">
                Send Query
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Submission Quick View Drawer / Bottom Sheet */}
      {isQuickViewOpen && (() => {
        const quickViewData = quickViewLearner === "ibrahim" ? {
          id: "ibrahim",
          name: "Ibrahim Garba",
          avatar: "IG",
          assessment: "Agribusiness Plan V1",
          course: "Entrepreneurship 101",
          submitted: "Oct 25, 09:15",
          attempt: "02",
          status: statusIbrahim,
          score: "78%"
        } : {
          id: "aisha",
          name: "Aisha Mohammed",
          avatar: "AM",
          assessment: "Work Readiness Assignment",
          course: "Work Readiness Foundation",
          submitted: "Oct 24, 14:20",
          attempt: "01",
          status: statusAisha,
          score: statusAisha === "Pending Review" || statusAisha === "Reviewing" ? "-" : `${calculateScore("aisha")}%`
        };

        return (
          <div className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" 
              onClick={() => setIsQuickViewOpen(false)} 
            />
            
            {/* Drawer Body - Responsive: bottom sheet on mobile, right-aligned drawer on desktop */}
            <div className="bg-white h-[85vh] md:h-full w-full md:max-w-md relative z-10 shadow-2xl flex flex-col text-left rounded-t-3xl md:rounded-t-none border-t md:border-t-0 md:border-l border-slate-200 transition-all duration-300">
              
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-black tracking-wider uppercase text-emerald-800 block">Quick View</span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">Submission Quick View</h3>
                </div>
                <button 
                  onClick={() => setIsQuickViewOpen(false)} 
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-450 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-semibold text-slate-700">
                
                {/* Profile Card */}
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-150 p-4 rounded-2xl">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg">
                    {quickViewData.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-950">{quickViewData.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">Kano Cohort 02</p>
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-450 font-bold">Assessment</span>
                    <span className="text-slate-900 font-extrabold">{quickViewData.assessment}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-450 font-bold">Course</span>
                    <span className="text-slate-900 font-extrabold">{quickViewData.course}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-450 font-bold">Submitted Date</span>
                    <span className="text-slate-900 font-bold font-mono">{quickViewData.submitted}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-450 font-bold">Attempt</span>
                    <span className="text-slate-900 font-bold font-mono">Attempt {quickViewData.attempt}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-450 font-bold">Status</span>
                    <span className={`inline-flex items-center gap-1 border px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      quickViewData.status === "Pending Review"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : quickViewData.status === "Reviewing"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : quickViewData.status === "Returned"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}>
                      {quickViewData.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-450 font-bold">Score</span>
                    <span className="text-emerald-850 font-black font-mono">{quickViewData.score}</span>
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2.5">
                <button 
                  onClick={handleOpenReviewFromQuickView}
                  className="w-full bg-emerald-900 hover:bg-emerald-850 text-white font-bold text-xs py-3 rounded-xl transition-colors text-center cursor-pointer uppercase shadow-sm"
                >
                  Open Review
                </button>
                <button 
                  onClick={handleViewLearnerRecord}
                  className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors text-center cursor-pointer uppercase"
                >
                  View Learner Record
                </button>
                <button 
                  onClick={() => setIsQuickViewOpen(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors text-center cursor-pointer uppercase"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
