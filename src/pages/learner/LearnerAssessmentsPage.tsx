import { useState, useMemo } from "react";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  Download, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ChevronDown,
  X,
  Play,
  CheckCircle,
  MessageSquare,
  BookOpen,
  ArrowLeft,
  Calendar,
  Share2,
  AlertCircle,
  HelpCircle as QuestionIcon,
  ChevronRight as ChevronRightIcon,
  Video,
  FileCheck,
  Wifi
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";

interface AssessmentTask {
  id: string;
  title: string;
  type: string; // "Assignment" | "Quiz" | "Reflection"
  status: string;
  course: string;
  module?: string;
  cpd?: string;
  dueDate?: string;
  timeLimit?: string;
  description: string;
  progress?: number;
  score?: string;
  unlockRequirement?: string;
  actionText: string;
  actionRoute: string;
}

export default function LearnerAssessmentsPage() {
  const { navigateTo } = useRoute();
  
  // Local state for filters and interactivity
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All"); // All, Due Soon, Drafts, Quizzes, Assignments, Submitted, Completed, Returned, Locked
  const [selectedMobileFilter, setSelectedMobileFilter] = useState("All Tasks"); // All Tasks, Quizzes, Assignments
  const [sortBy, setSortBy] = useState("due-date"); // "due-date" | "status"
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  
  // Modals state
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isStepNotReadyModalOpen, setIsStepNotReadyModalOpen] = useState(false);
  const [notReadyStepTitle, setNotReadyStepTitle] = useState("");
  const [messageSubject, setMessageSubject] = useState("Question about my assessment task");
  const [messageBody, setMessageBody] = useState("");

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) return;
    setIsMessageModalOpen(false);
    setMessageBody("");
    showToast("Message sent locally in this frontend prototype. Facilitator Halima Sani notified.", "success");
  };

  const handleStepClick = (step: { title: string; route: string; ready: boolean }) => {
    if (step.ready) {
      navigateTo(step.route as any);
    } else {
      setNotReadyStepTitle(step.title);
      setIsStepNotReadyModalOpen(true);
    }
  };

  // Static assessment task data matching desktop and mobile layouts
  const ACTIVE_TASKS: AssessmentTask[] = [
    {
      id: "active-1",
      title: "Work Readiness Assessment",
      type: "Assignment",
      status: "In progress",
      course: "Work Readiness Foundation",
      module: "Preparing for Interviews",
      dueDate: "24 Oct 2026",
      description: "Demonstrate your understanding of professional communication and workplace ethics.",
      progress: 45,
      cpd: "4 credits pending after review",
      actionText: "Continue Assessment",
      actionRoute: "/learner/assessments/work-readiness-assessment/attempt"
    },
    {
      id: "active-2",
      title: "Agri-Logistics Quiz",
      type: "Quiz",
      status: "Ready to start",
      course: "Agribusiness Operations",
      timeLimit: "15 mins",
      description: "10 questions covering supply chain basics in the Nigerian agricultural sector.",
      actionText: "Start Quiz",
      actionRoute: "/learner/assessments/agri-logistics-quiz/attempt"
    },
    {
      id: "active-3",
      title: "Live Session Reflection",
      type: "Reflection",
      status: "Locked",
      course: "Work Readiness Foundation",
      unlockRequirement: "Interview Practice Clinic",
      description: "Locked until attendance: Interview Practice Clinic.",
      actionText: "View Unlock Requirement",
      actionRoute: "/learner/courses/work-readiness-foundation/modules/interview-preparation/locked"
    }
  ];

  const COMPLETED_TASKS = [
    {
      id: "comp-1",
      title: "Sustainable Irrigation Models",
      status: "Passed",
      score: "88/100",
      credits: "6 CPD credits earned",
      actionText: "View Result",
      actionRoute: "/learner/assessments/work-readiness-assessment/result"
    },
    {
      id: "comp-2",
      title: "Digital Readiness Checkpoint",
      status: "Completed",
      score: "Completed",
      credits: "Feedback available",
      actionText: "Review Answers",
      actionRoute: "/learner/checkpoints/interview-preparation/review"
    }
  ];

  // Filters handling
  const filteredActiveTasks = useMemo(() => {
    return ACTIVE_TASKS.filter(task => {
      // Search text match
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(query);
        const matchDesc = task.description.toLowerCase().includes(query);
        const matchType = task.type.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchType) return false;
      }

      // Desktop filter chips
      if (selectedFilter !== "All") {
        if (selectedFilter === "Due Soon" && task.status !== "Ready to start") return false;
        if (selectedFilter === "Drafts" && task.status !== "Draft started") return false;
        if (selectedFilter === "Quizzes" && task.type !== "Quiz") return false;
        if (selectedFilter === "Assignments" && task.type !== "Assignment") return false;
        if (selectedFilter === "Submitted" && task.status !== "Awaiting review") return false;
        if (selectedFilter === "Locked" && task.status !== "Locked") return false;
        if (selectedFilter === "Completed") return false; // None of active are completed
        if (selectedFilter === "Returned") return false;
      }

      // Mobile filter chips
      if (selectedMobileFilter !== "All Tasks") {
        if (selectedMobileFilter === "Quizzes" && task.type !== "Quiz") return false;
        if (selectedMobileFilter === "Assignments" && task.type !== "Assignment") return false;
      }

      return true;
    });
  }, [searchQuery, selectedFilter, selectedMobileFilter]);

  const filteredCompletedTasks = useMemo(() => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return COMPLETED_TASKS.filter(task => task.title.toLowerCase().includes(query));
    }
    // Completed tasks display on "All" or "Completed" filter
    if (selectedFilter === "All" || selectedFilter === "Completed") {
      return COMPLETED_TASKS;
    }
    return [];
  }, [searchQuery, selectedFilter]);

  const handleScrollToCompleted = () => {
    const el = document.getElementById("completed-results-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setSelectedFilter("Completed");
    }
  };

  return (
    <div id="assessments-root" className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans flex flex-col pb-16 lg:pb-0">
      
      {/* Toast Alert message system */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="flex flex-1 min-h-screen w-full">
        {/* Left Desktop Sidebar */}
        <LearnerSidebar />

        {/* Workspace Column */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* ====================================================
              1. DESKTOP HEADER BAR (lg:flex hidden)
              ==================================================== */}
          <header className="h-16 bg-white border-b border-slate-200 hidden lg:flex items-center justify-between px-8 sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <h2 className="text-base font-bold text-slate-900 font-heading">Assessments</h2>
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assessments, quizzes, submissions..."
                  className="w-full pl-10 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sustain-900 focus:bg-white transition-all text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => showToast("Simulated notification center opened.", "info")}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-[#005C45] rounded-full" />
              </button>
              
              <button 
                onClick={() => setIsGuideModalOpen(true)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Assessment Guide"
              >
                <HelpCircle className="h-5 w-5" />
              </button>

              <div className="h-8 w-px bg-slate-200" />
              
              <div className="flex items-center gap-2.5 text-left">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-850 font-sans">Aisha Mohammed</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SUST-LRN-0442</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#005C45] border border-[#005C45] flex items-center justify-center font-bold text-xs text-white">
                  AM
                </div>
              </div>
            </div>
          </header>

          {/* ====================================================
              2. MOBILE HEADER BAR (lg:hidden)
              ==================================================== */}
          <header className="h-14 bg-white border-b border-slate-100 lg:hidden flex items-center justify-between px-4 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigateTo("/learner")}
                className="p-1.5 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-base font-bold text-[#005C45] font-heading">Assessments</h1>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => showToast("Simulated notification center opened.", "info")}
                className="p-1.5 text-slate-500 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-[#005C45] rounded-full" />
              </button>
              <div className="h-7 w-7 rounded-full bg-[#005C45] flex items-center justify-center font-bold text-[11px] text-white">
                AM
              </div>
            </div>
          </header>

          {/* ====================================================
              MAIN CONTAINER (Responsive desktop vs mobile)
              ==================================================== */}
          
          {/* A: DESKTOP WORKSPACE (lg:grid hidden) */}
          <main className="hidden lg:grid grid-cols-12 gap-8 p-8 max-w-7xl w-full mx-auto pb-24">
            
            {/* Main Content Column (8 Cols) */}
            <div className="col-span-8 space-y-6">
              
              {/* DESKTOP HERO BLOCK */}
              <div className="grid grid-cols-12 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                {/* Left Card info */}
                <div className="col-span-8 p-6 md:p-8 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1.5">
                    <span className="bg-[#E6F4F1] text-[#005C45] font-semibold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-sans">
                      Assessment Pathway Active
                    </span>
                    <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Assessment Centre</h3>
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
                      My Assessments
                    </h2>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Track your checkpoints, quizzes, assignments, projects, and reviewed results in one place.
                    </p>
                  </div>

                  {/* Program contextual details */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 px-2.5 py-1 rounded-lg">
                      Work Readiness Foundation
                    </span>
                    <span className="bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 px-2.5 py-1 rounded-lg">
                      Cohort 02
                    </span>
                    <span className="bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 px-2.5 py-1 rounded-lg">
                      Facilitator: Halima Sani
                    </span>
                    <span className="bg-emerald-50 text-emerald-950 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-100">
                      4 CPD credits pending
                    </span>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                      className="bg-[#005C45] hover:bg-[#004735] active:bg-[#003B2C] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer min-h-[42px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 hover:opacity-100"
                    >
                      <span>Continue Current Draft</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}
                      className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-350 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer min-h-[42px] inline-flex items-center justify-center hover:opacity-100"
                    >
                      View Assessment Details
                    </button>
                    <button 
                      onClick={handleScrollToCompleted}
                      className="bg-transparent hover:bg-slate-50 text-[#005C45] hover:text-emerald-900 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 cursor-pointer min-h-[42px] inline-flex items-center justify-center hover:opacity-100"
                    >
                      View Completed Results
                    </button>
                  </div>
                </div>

                {/* Right Progress Side (Deep green box) */}
                <div className="col-span-4 bg-[#005C45] p-6 text-white text-left flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-emerald-100 font-heading">Assessment Progress</h4>
                    <p className="text-[11px] text-emerald-100/90 leading-normal font-medium">
                      You are on track to finish this module ahead of schedule.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-extrabold tracking-tight">62%</span>
                      <span className="text-[9px] uppercase tracking-wider text-emerald-200 font-bold">Assessment Pathway</span>
                    </div>
                    {/* Beautiful simple progress bar */}
                    <div className="w-full bg-[#004735] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#10B981] h-full rounded-full" style={{ width: "62%" }} />
                    </div>
                    <span className="text-[10px] text-emerald-150 block font-semibold">
                      8 of 13 assessments completed
                    </span>
                  </div>
                </div>
              </div>

              {/* CURRENT ASSESSMENT JOURNEY */}
              <Card className="p-6 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">Current Assessment Journey</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Follow these steps to complete your assessment.
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-3.5 pt-1">
                  {[
                    { title: "Details", label: "Read instructions", status: "Available", route: "/learner/assessments/work-readiness-assessment", ready: true, state: "available" },
                    { title: "Attempt", label: "Answer questions", status: "In progress", route: "/learner/assessments/work-readiness-assessment/attempt", ready: true, state: "active" },
                    { title: "Review", label: "Check answers before submitting", status: "Ready", route: "/learner/assessments/work-readiness-assessment/review-submit", ready: true, state: "ready" },
                    { title: "Submitted", label: "View review status", status: "Pending", route: "/learner/assessments/work-readiness-assessment/submitted", ready: true, state: "pending" },
                    { title: "Result", label: "Feedback and CPD credits", status: "Feedback released", route: "/learner/assessments/work-readiness-assessment/result", ready: true, state: "ready" }
                  ].map((step, idx) => {
                    const isCurrent = step.state === "active";
                    const isAvailable = step.state === "available";
                    const isReadyState = step.state === "ready";
                    const isPending = step.state === "pending";
                    
                    let borderStyle = "border-slate-200 hover:border-slate-350";
                    let bgStyle = "bg-white";
                    let tagStyle = "bg-slate-50 text-slate-400 border-slate-200";
                    let titleStyle = "text-slate-800";
                    
                    if (isCurrent) {
                      borderStyle = "border-emerald-600 ring-1 ring-emerald-600/35";
                      bgStyle = "bg-emerald-50/40";
                      tagStyle = "bg-emerald-100 text-emerald-800 border-emerald-200";
                      titleStyle = "text-emerald-950 font-bold";
                    } else if (isAvailable) {
                      borderStyle = "border-emerald-200/85 hover:border-emerald-450";
                      bgStyle = "bg-white";
                      tagStyle = "bg-emerald-50 text-emerald-800 border-emerald-100";
                      titleStyle = "text-slate-900";
                    } else if (isReadyState) {
                      borderStyle = "border-emerald-200 hover:border-emerald-300";
                      bgStyle = "bg-white hover:bg-emerald-50/40";
                      tagStyle = "bg-emerald-50 text-emerald-800 border-emerald-100";
                      titleStyle = "text-slate-900";
                    } else if (isPending) {
                      borderStyle = "border-amber-250 hover:border-amber-350";
                      bgStyle = "bg-amber-50/20 hover:bg-amber-50/40";
                      tagStyle = "bg-amber-50 text-amber-800 border-amber-100";
                      titleStyle = "text-slate-800";
                    } else {
                      borderStyle = "border-slate-150 hover:border-slate-300";
                      bgStyle = "bg-slate-50/55 hover:bg-slate-50/80";
                      tagStyle = "bg-slate-100 text-slate-400 border-slate-200";
                      titleStyle = "text-slate-450";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleStepClick(step)}
                        className={`p-4 border ${borderStyle} ${bgStyle} rounded-xl text-left flex flex-col justify-between min-h-[120px] transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 outline-none`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tagStyle}`}>
                              {step.title}
                            </span>
                            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
                          </div>
                          <h4 className={`text-xs font-bold leading-snug tracking-tight ${titleStyle}`}>
                            {step.label}
                          </h4>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-2 block group-hover:text-slate-650 transition-colors">
                          {step.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* FIVE HORIZONTAL STATUS CARDS (Desktop) */}
              <div className="grid grid-cols-5 gap-3">
                {[
                  { label: "Due Soon", val: "2", border: "border-l-4 border-l-rose-500", icon: Clock, desc: "Youth Pathway" },
                  { label: "Drafts", val: "1", border: "border-l-4 border-l-amber-500", icon: FileText, desc: "Youth Pathway" },
                  { label: "Ready to Start", val: "1", border: "border-l-4 border-l-emerald-500", icon: Play, desc: "Youth Pathway" },
                  { label: "Submitted", val: "1", border: "border-l-4 border-l-sky-500", icon: ArrowRight, desc: "Youth Pathway" },
                  { label: "Completed", val: "3", border: "border-l-4 border-l-teal-500", icon: CheckCircle2, desc: "Youth Pathway" }
                ].map((st, sIdx) => {
                  const Icon = st.icon;
                  return (
                    <Card key={sIdx} className={`p-4 bg-white border border-slate-200 rounded-xl flex flex-col justify-between text-left min-h-[96px] shadow-2xs hover:border-slate-300 transition-all ${st.border}`}>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{st.label}</span>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-lg font-extrabold text-slate-800 font-sans">{st.val}</span>
                        <Icon className="h-4 w-4 text-slate-350 shrink-0" />
                      </div>
                      <span className="text-[9px] font-semibold text-slate-450 block mt-0.5">{st.desc}</span>
                    </Card>
                  );
                })}
              </div>

              {/* FILTER CHIPS ROW (Desktop) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-2 pt-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    "All", "Due Soon", "Drafts", "Quizzes", "Assignments", "Submitted", "Completed", "Returned", "Locked"
                  ].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFilter(f)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                        selectedFilter === f 
                          ? "bg-[#005C45] border-[#005C45] text-white" 
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="relative flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sort By:</span>
                  <button 
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
                  >
                    <span>{sortBy === "due-date" ? "Due date" : "Status"}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-450" />
                  </button>

                  {isSortDropdownOpen && (
                    <div className="absolute right-0 top-8 z-30 w-32 bg-white border border-slate-200 rounded-xl shadow-lg p-1 text-left text-xs font-semibold">
                      <button 
                        onClick={() => { setSortBy("due-date"); setIsSortDropdownOpen(false); }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-slate-700"
                      >
                        Due date
                      </button>
                      <button 
                        onClick={() => { setSortBy("status"); setIsSortDropdownOpen(false); }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-slate-700"
                      >
                        Status
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTIVE ASSESSMENTS SECTION */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-heading text-left">Active Assessments</h3>
                
                <div className="space-y-3.5">
                  {filteredActiveTasks.length > 0 ? (
                    filteredActiveTasks.map((task) => {
                      if (task.id === "active-1") {
                        return (
                          <Card 
                            key={task.id}
                            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#005C45] transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left shadow-2xs"
                          >
                            <div className="space-y-3 flex-1">
                              {/* Badges/Tags */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border bg-amber-50 text-amber-900 border-amber-200">
                                  {task.type} • {task.status}
                                </span>

                                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  <span>Due {task.dueDate}</span>
                                </span>

                                <span className="bg-emerald-50 text-emerald-900 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                  CPD: 4 credits pending after review
                                </span>
                              </div>

                              {/* Title, Course & Module */}
                              <div className="space-y-1">
                                <h4 className="text-base font-extrabold text-slate-900 tracking-tight">{task.title}</h4>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-semibold">
                                  <span>Course: <strong className="text-slate-700 font-bold">{task.course}</strong></span>
                                  <span className="text-slate-300">•</span>
                                  <span>Module: <strong className="text-slate-700 font-bold">{task.module || "Preparing for Interviews"}</strong></span>
                                </div>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                                  {task.description}
                                </p>
                              </div>

                              {/* Progress Bar */}
                              <div className="space-y-1.5 max-w-md pt-1">
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                                  <span>CURRENT PROGRESS</span>
                                  <span className="font-mono text-slate-500">{task.progress}%</span>
                                </div>
                                <ProgressBar value={task.progress || 0} className="h-1.5 bg-slate-100" />
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2">
                              <button
                                onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                                className="bg-[#005C45] hover:bg-[#004735] active:bg-[#003B2C] text-white font-bold text-xs py-2.5 px-6 rounded-xl cursor-pointer min-h-[42px] transition-all flex items-center justify-center shadow-xs focus:outline-none hover:opacity-100"
                              >
                                Continue Assessment
                              </button>
                              <button
                                onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}
                                className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-350 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer min-h-[42px] flex items-center justify-center focus:outline-none hover:opacity-100"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/review-submit")}
                                className="text-xs font-bold text-[#005C45] hover:text-emerald-850 hover:underline transition-all text-center py-1 mt-1 cursor-pointer focus:outline-none"
                              >
                                Review & Submit
                              </button>
                            </div>
                          </Card>
                        );
                      }

                      const isLocked = task.status === "Locked";
                      const isReady = task.status === "Ready to start";
                      const isDraft = task.status === "Draft started";

                      return (
                        <Card 
                          key={task.id}
                          className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#005C45] transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left shadow-2xs"
                        >
                          <div className="space-y-2 flex-1">
                            {/* Badges/Tags */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                                isDraft ? "bg-amber-50 text-amber-900 border-amber-200" :
                                isReady ? "bg-emerald-50 text-emerald-900 border-emerald-100" :
                                "bg-slate-100 text-slate-500 border-slate-200"
                              }`}>
                                {task.type} • {task.status}
                              </span>

                              {task.dueDate && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  <span>Due {task.dueDate}</span>
                                </span>
                              )}

                              {task.timeLimit && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  <span>{task.timeLimit}</span>
                                </span>
                              )}

                              {isLocked && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700">
                                  <Lock className="h-3.5 w-3.5 shrink-0" />
                                  <span>Wait for session</span>
                                </span>
                              )}
                            </div>

                            {/* Title & Description */}
                            <div className="space-y-0.5">
                              <h4 className="text-base font-extrabold text-slate-900 tracking-tight">{task.title}</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                {task.description}
                              </p>
                            </div>

                            {/* Optional Progress Bar */}
                            {task.progress && (
                              <div className="space-y-1.5 max-w-md pt-1">
                                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                                  <span>CURRENT PROGRESS</span>
                                  <span className="font-mono text-slate-500">{task.progress}%</span>
                                </div>
                                <ProgressBar value={task.progress} className="h-1.5 bg-slate-100" />
                              </div>
                            )}
                          </div>

                          {/* CTA Button Box */}
                          <div className="shrink-0 w-full md:w-auto">
                            {isReady ? (
                              <button
                                onClick={() => navigateTo(task.actionRoute as any)}
                                className="w-full bg-[#E2ECFF] hover:bg-[#D0E2FF] text-[#0043CE] font-bold text-xs py-2.5 px-5 rounded-lg transition-all min-h-[40px] cursor-pointer focus:outline-none"
                              >
                                {task.actionText}
                              </button>
                            ) : isLocked ? (
                              <button
                                onClick={() => navigateTo(task.actionRoute as any)}
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg p-2 flex items-center justify-center cursor-pointer focus:outline-none"
                              >
                                <Lock className="h-5 w-5 text-slate-400" />
                              </button>
                            ) : (
                              <Button
                                onClick={() => navigateTo(task.actionRoute as any)}
                                className="w-full bg-[#005C45] hover:bg-[#004735] text-white font-bold text-xs py-2.5 px-6 rounded-xl cursor-pointer min-h-[40px]"
                              >
                                {task.actionText}
                              </Button>
                            )}
                          </div>
                        </Card>
                      );
                    })
                  ) : (
                    <Card className="p-8 text-center bg-white border border-slate-200 rounded-xl space-y-2">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No active tasks found</p>
                    </Card>
                  )}
                </div>
              </div>

              {/* COMPLETED RESULTS SECTION */}
              <div id="completed-results-section" className="space-y-4 pt-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Completed Results</h3>
                  <button 
                    onClick={() => { setSelectedFilter("Completed"); }}
                    className="text-xs font-bold text-[#005C45] hover:underline"
                  >
                    View All Results &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCompletedTasks.map((task) => {
                    const isScore = task.score !== "Completed";
                    return (
                      <Card 
                        key={task.id}
                        className="bg-white border border-slate-200 rounded-2xl p-5 text-left flex items-center justify-between gap-4 hover:border-emerald-200 transition-all shadow-2xs"
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-[#005C45] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            {task.status}
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-tight tracking-tight">{task.title}</h4>
                          <span className="text-xs font-bold text-slate-400 block">{task.credits}</span>
                          <button 
                            onClick={() => navigateTo(task.actionRoute as any)}
                            className="text-xs font-bold text-[#005C45] hover:underline pt-1 block"
                          >
                            {task.actionText} &rarr;
                          </button>
                        </div>

                        {/* Circular progress badge or checked badge on the right */}
                        <div className="shrink-0">
                          {isScore ? (
                            <div className="h-12 w-12 rounded-full border-4 border-emerald-500/30 flex items-center justify-center text-xs font-black text-[#005C45] bg-emerald-50/50">
                              88
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-900">
                              <CheckCircle className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Sidebar Column (4 Cols) */}
            <div className="col-span-4 space-y-6">
              
              {/* RECOMMENDED NEXT ACTION */}
              <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 hover:shadow-xs transition-all duration-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100">
                  RECOMMENDED NEXT ACTION
                </h3>
                <div className="space-y-2 pt-1">
                  <span className="inline-block bg-[#E6F4F1] text-[#005C45] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Highly Recommended
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Continue Work Readiness Assessment</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                    You are on question 3 of 8 (45% progress). Finish your single and multi-select tasks today to stay ahead.
                  </p>
                </div>
                <Button 
                  onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                  className="w-full bg-[#005C45] hover:bg-[#004735] text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer min-h-[40px] flex items-center justify-center"
                >
                  Continue Assessment
                </Button>
              </Card>

              {/* ASSESSMENT PATHWAY STEPPER */}
              <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-2xs">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Assessment Pathway
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Work Readiness Assessment</p>
                </div>
                
                <div className="space-y-4 pt-1">
                  {[
                    { title: "Details", desc: "Read instructions", btnText: "Open Details", route: "/learner/assessments/work-readiness-assessment", ready: true, status: "completed" },
                    { title: "Attempt", desc: "Answer questions", btnText: "Continue Attempt", route: "/learner/assessments/work-readiness-assessment/attempt", ready: true, status: "active" },
                    { title: "Review", desc: "Check answers before submitting", btnText: "Review & Submit", route: "/learner/assessments/work-readiness-assessment/review-submit", ready: true, status: "ready" },
                    { title: "Submitted", desc: "View review status", btnText: "View Status", route: "/learner/assessments/work-readiness-assessment/submitted", ready: true, status: "pending" },
                    { title: "Result", desc: "Feedback and CPD credits", btnText: "View Result", route: "/learner/assessments/work-readiness-assessment/result", ready: true, status: "ready" }
                  ].map((step, sIdx) => {
                    const isActive = step.status === "active";
                    const isCompleted = step.status === "completed";
                    const isPending = step.status === "pending";
                    const isReady = step.status === "ready";
                    
                    let dotStyle = "bg-slate-100 border-slate-250 text-slate-400";
                    let titleStyle = "text-slate-500 font-semibold";
                    let actionStyle = "text-[#005C45] hover:underline font-bold";
                    
                    if (isActive) {
                      dotStyle = "bg-[#005C45] border-[#005C45] text-white";
                      titleStyle = "text-slate-900 font-bold";
                    } else if (isCompleted) {
                      dotStyle = "bg-emerald-50 border-emerald-200 text-[#005C45]";
                      titleStyle = "text-slate-800 font-bold";
                    } else if (isPending) {
                      dotStyle = "bg-amber-50 border-amber-200 text-amber-850";
                      titleStyle = "text-slate-700 font-bold";
                    } else if (isReady) {
                      dotStyle = "bg-emerald-50 border-emerald-250 text-[#005C45]";
                      titleStyle = "text-slate-800 font-bold";
                    } else {
                      dotStyle = "bg-slate-50 border-slate-150 text-slate-400";
                      titleStyle = "text-slate-500 font-semibold";
                    }
                    
                    return (
                      <div key={sIdx} className="flex gap-3">
                        <div className="flex flex-col items-center shrink-0">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] border font-bold ${dotStyle}`}>
                            {isCompleted ? "✓" : sIdx + 1}
                          </div>
                          {sIdx < 4 && (
                            <div className="w-0.5 h-10 bg-slate-150 my-0.5" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                          <div>
                            <span className={`text-xs block leading-tight ${titleStyle}`}>
                              {step.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium block">
                              {step.desc}
                            </span>
                          </div>
                          <button
                            onClick={() => handleStepClick(step)}
                            className={`text-[11px] flex items-center gap-1 text-left ${actionStyle} cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 outline-none rounded`}
                          >
                            <span>{step.btnText}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* UPCOMING LIVE SESSION */}
              <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm relative overflow-hidden">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pb-2 border-b border-slate-100 font-heading">
                  Upcoming Live Session
                </h3>
                
                <div className="space-y-4">
                  {/* Main row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-slate-950 tracking-tight leading-snug font-heading">
                        Interview Practice Clinic
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">
                        With Halima Sani & Industry Guest Experts
                      </p>
                    </div>
                    {/* Compact date badge */}
                    <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center text-center shrink-0 shadow-2xs">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-300 leading-none">OCT</span>
                      <span className="text-base font-black leading-none mt-1">25</span>
                    </div>
                  </div>

                  {/* Details row */}
                  <div className="space-y-2 pt-1 font-sans">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>Friday, 25 Oct 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>10:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Wifi className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>Low-bandwidth supported</span>
                    </div>
                  </div>

                  {/* Status pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-850 text-[11px] font-bold rounded-lg font-sans">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                    <span>Attendance required for module unlock</span>
                  </div>

                  {/* Session link note */}
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic font-sans">
                    Session link will be available before the session starts.
                  </p>

                  {/* CTA area */}
                  <div className="flex flex-col gap-2 pt-1">
                    <button 
                      onClick={() => navigateTo("/learner/live-sessions/interview-practice-clinic")}
                      className="w-full bg-[#005C45] hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer min-h-[40px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      View Session
                    </button>
                    <button 
                      onClick={() => showToast("Calendar reminder saved locally in this frontend prototype.", "success")}
                      className="w-full bg-white hover:bg-emerald-50 active:bg-emerald-100 text-[#005C45] hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Add to Calendar
                    </button>
                  </div>

                  {/* Optional small link */}
                  <div className="pt-1 text-center">
                    <button 
                      onClick={() => showToast("Session pack download simulated in this frontend prototype.", "success")}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#005C45] hover:underline cursor-pointer focus:outline-none focus:underline"
                    >
                      <Download className="h-3.5 w-3.5 text-slate-400" />
                      <span>Download Session Pack</span>
                    </button>
                  </div>
                </div>
              </Card>

              {/* NEED HELP */}
              <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100">
                  Need Help?
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setIsGuideModalOpen(true)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 hover:bg-slate-50 px-2 rounded-lg transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      <span>Assessment Guide</span>
                    </span>
                    <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400" />
                  </button>

                  <button 
                    onClick={() => setIsMessageModalOpen(true)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 hover:bg-slate-50 px-2 rounded-lg transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-slate-400" />
                      <span>Contact Facilitator</span>
                    </span>
                    <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400" />
                  </button>

                  <button 
                    onClick={() => navigateTo("/learner/support")}
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900 py-1.5 hover:bg-slate-50 px-2 rounded-lg transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                      <span>FAQs & Troubleshooting</span>
                    </span>
                    <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                </div>
              </Card>

            </div>

          </main>

          {/* ====================================================
              3. MOBILE WORKSPACE (lg:hidden)
              ==================================================== */}
          <main className="lg:hidden flex flex-col p-4 space-y-5 text-left pb-24">
            
            {/* MOBILE HERO CARD (Deep Green Block) */}
            <div className="bg-gradient-to-r from-[#005C45] to-[#024a3a] rounded-2xl p-5 text-white relative overflow-hidden shadow-md">
              {/* Watermark icon on right */}
              <div className="absolute right-2 bottom-0 opacity-10">
                <BookOpen className="h-28 w-28 text-white rotate-12" />
              </div>

              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                    Learning Pathway
                  </span>
                  <h2 className="text-lg font-black tracking-tight mt-0.5">My Assessments</h2>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-baseline text-xs font-bold text-emerald-100">
                    <span>Overall Completion</span>
                    <span className="text-sm font-black">68%</span>
                  </div>
                  {/* Clean progress bar */}
                  <div className="w-full bg-[#004533] h-2 rounded-full overflow-hidden border border-emerald-800">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "68%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE SUMMARY CARDS (Two columns) */}
            <div className="grid grid-cols-2 gap-3.5">
              <Card className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] font-bold uppercase block tracking-wider">PENDING</span>
                  <span className="text-base font-black text-slate-850 leading-none">03</span>
                  <span className="text-[10px] text-slate-400 block font-semibold leading-none mt-0.5">Assignments</span>
                </div>
              </Card>

              <Card className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-3 shadow-xs">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#005C45] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] font-bold uppercase block tracking-wider">PASSED</span>
                  <span className="text-base font-black text-slate-850 leading-none">12</span>
                  <span className="text-[10px] text-slate-400 block font-semibold leading-none mt-0.5">Milestones</span>
                </div>
              </Card>
            </div>

            {/* MOBILE RECOMMENDED NEXT ACTION CARD */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">NEXT ACTION</h3>
              <Card className="bg-white border border-slate-150 rounded-2xl p-4 space-y-4 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-emerald-50 text-[#005C45] rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug">
                      Work Readiness Assignment
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Prepare your professional CV and cover letter for agribusiness roles. Feedback will be provided by mentors.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                  className="w-full bg-[#005C45] hover:bg-[#004735] text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center shadow-xs min-h-[40px] focus:outline-none"
                >
                  Continue Draft
                </button>
              </Card>
            </div>

            {/* RESPONSIVE MOBILE/TABLET ASSESSMENT JOURNEY */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">ASSESSMENT JOURNEY</h3>
              <Card className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 shadow-sm text-left">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Current Assessment Journey</h4>
                  <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Follow these steps to complete your assessment.</p>
                </div>

                <div className="flex md:grid md:grid-cols-5 items-stretch gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
                  {[
                    { title: "Details", label: "Read instructions", route: "/learner/assessments/work-readiness-assessment", ready: true, status: "Available", state: "available" },
                    { title: "Attempt", label: "Answer questions", route: "/learner/assessments/work-readiness-assessment/attempt", ready: true, status: "In progress", state: "active" },
                    { title: "Review", label: "Check answers before submitting", route: "/learner/assessments/work-readiness-assessment/review-submit", ready: true, status: "Ready", state: "ready" },
                    { title: "Submitted", label: "View review status", route: "/learner/assessments/work-readiness-assessment/submitted", ready: true, status: "Pending", state: "pending" },
                    { title: "Result", label: "Feedback and CPD credits", route: "/learner/assessments/work-readiness-assessment/result", ready: true, status: "Feedback released", state: "ready" }
                  ].map((step, idx) => {
                    const isCurrent = step.state === "active";
                    const isAvailable = step.state === "available";
                    const isReadyState = step.state === "ready";
                    const isPending = step.state === "pending";
                    
                    let bgStyle = "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300";
                    let titleStyle = "text-slate-400";
                    let labelStyle = "text-slate-800";
                    
                    if (isCurrent) {
                      bgStyle = "bg-emerald-50 border-emerald-600 ring-1 ring-emerald-600/35 text-emerald-950";
                      titleStyle = "text-emerald-850 font-bold";
                      labelStyle = "text-emerald-950 font-extrabold";
                    } else if (isAvailable) {
                      bgStyle = "bg-white border-emerald-250 text-slate-800 hover:border-emerald-450";
                      titleStyle = "text-emerald-700 font-bold";
                      labelStyle = "text-slate-900 font-bold";
                    } else if (isReadyState) {
                      bgStyle = "bg-white border-emerald-200 text-slate-800 hover:bg-emerald-50/40 hover:border-emerald-300";
                      titleStyle = "text-emerald-700 font-bold";
                      labelStyle = "text-slate-900 font-bold";
                    } else if (isPending) {
                      bgStyle = "bg-amber-50 border-amber-250 text-amber-950 hover:border-amber-400";
                      titleStyle = "text-amber-800 font-bold";
                      labelStyle = "text-amber-950 font-bold";
                    } else {
                      bgStyle = "bg-slate-50 border-slate-150 text-slate-400 hover:border-slate-300 hover:bg-slate-50/80";
                      titleStyle = "text-slate-400";
                      labelStyle = "text-slate-500 font-medium";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleStepClick(step)}
                        className={`p-3.5 border rounded-xl shrink-0 md:shrink-1 text-left flex flex-col justify-between min-h-[100px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 outline-none ${bgStyle}`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <span className={`text-[9px] font-bold uppercase tracking-wider block ${titleStyle}`}>{step.title}</span>
                            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />}
                          </div>
                          <span className={`text-xs block leading-tight ${labelStyle}`}>{step.label}</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-2 block">
                          {step.status}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* MOBILE FILTER CHIPS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {["All Tasks", "Quizzes", "Assignments"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setSelectedMobileFilter(chip)}
                  className={`text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedMobileFilter === chip 
                      ? "bg-[#005C45] border-[#005C45] text-white" 
                      : "bg-[#EAF2F0] border-transparent text-[#005C45] hover:bg-[#dcece8]"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* MOBILE ACTIVE ASSESSMENTS LIST */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">ACTIVE ASSESSMENTS</h3>
              
              <div className="space-y-2.5">
                {filteredActiveTasks.map((task) => {
                  if (task.id === "active-1") {
                    return (
                      <Card
                        key={task.id}
                        className="bg-white border border-slate-150 rounded-2xl p-4.5 space-y-4 shadow-3xs text-left"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-1">
                            <span className="text-[9px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                              DRAFT • {task.status}
                            </span>
                            <h4 className="text-sm font-extrabold text-slate-900 mt-1">{task.title}</h4>
                            <p className="text-[11px] text-slate-500 font-medium">
                              Course: <strong>{task.course}</strong>
                            </p>
                          </div>
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 whitespace-nowrap">
                            Due {task.dueDate}
                          </span>
                        </div>

                        {/* Mobile Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                            <span>PROGRESS</span>
                            <span className="font-mono text-slate-500">{task.progress}%</span>
                          </div>
                          <ProgressBar value={task.progress || 0} className="h-1.5 bg-slate-100" />
                        </div>

                        <div className="bg-emerald-50 text-emerald-950 border border-emerald-100 text-[10px] font-bold p-2.5 rounded-lg">
                          CPD: 4 credits pending after review
                        </div>

                        {/* Mobile CTA Button grid */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                            className="bg-[#005C45] hover:bg-[#004735] text-white font-bold text-xs py-2 px-3 rounded-xl cursor-pointer transition-all min-h-[38px] flex items-center justify-center focus:outline-none"
                          >
                            Continue
                          </button>
                          <button
                            onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}
                            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold py-2 px-3 rounded-xl cursor-pointer transition-all min-h-[38px] flex items-center justify-center focus:outline-none"
                          >
                            Details
                          </button>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/review-submit")}
                            className="text-xs font-bold text-[#005C45] hover:underline focus:outline-none"
                          >
                            Review & Submit
                          </button>
                        </div>
                      </Card>
                    );
                  }

                  const isLocked = task.status === "Locked";
                  const isReady = task.status === "Ready to start";

                  return (
                    <Card
                      key={task.id}
                      onClick={() => navigateTo(task.actionRoute as any)}
                      className="bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between gap-3 shadow-3xs cursor-pointer active:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${
                          isLocked ? "bg-slate-50 border-slate-100 text-slate-450" :
                          isReady ? "bg-emerald-50 border-emerald-100 text-[#005C45]" :
                          "bg-indigo-50 border-indigo-100 text-indigo-700"
                        }`}>
                          {isLocked ? (
                            <Lock className="h-5 w-5" />
                          ) : isReady ? (
                            <Play className="h-4.5 w-4.5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </div>

                        <div>
                          <span className={`text-[9px] font-extrabold uppercase tracking-wide block ${
                            isLocked ? "text-slate-400" :
                            isReady ? "text-emerald-800" :
                            "text-indigo-800"
                          }`}>
                            {task.status === "Draft started" ? "DRAFT" : task.status === "Ready to start" ? "READY" : "LOCKED"}
                          </span>
                          <h4 className="text-xs font-extrabold text-slate-900">{task.title}</h4>
                        </div>
                      </div>

                      {isLocked ? (
                        <Lock className="h-4 w-4 text-slate-350 shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* MOBILE LIVE GROUP ASSESSMENT CARD / UPCOMING LIVE SESSION */}
            <Card className="bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-4 shadow-sm relative overflow-hidden">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-heading">
                Upcoming Live Session
              </span>
              
              <div className="space-y-4">
                {/* Main row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-950 tracking-tight leading-snug font-heading">
                      Interview Practice Clinic
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">
                      With Halima Sani & Industry Guest Experts
                    </p>
                  </div>
                  {/* Compact date badge */}
                  <div className="h-12 w-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center text-center shrink-0 shadow-2xs">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-300 leading-none">OCT</span>
                    <span className="text-base font-black leading-none mt-1">25</span>
                  </div>
                </div>

                {/* Details row */}
                <div className="space-y-2 pt-1 font-sans">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Friday, 25 Oct 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <Wifi className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Low-bandwidth supported</span>
                  </div>
                </div>

                {/* Status pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-850 text-[11px] font-bold rounded-lg font-sans">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                  <span>Attendance required</span>
                </div>

                {/* Session link note */}
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic font-sans">
                  Session link will be available before the session starts.
                </p>

                {/* CTA area */}
                <div className="flex flex-col gap-2 pt-1">
                  <button 
                    onClick={() => navigateTo("/learner/live-sessions/interview-practice-clinic")}
                    className="w-full bg-[#005C45] hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer min-h-[40px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    View Session
                  </button>
                  <button 
                    onClick={() => showToast("Calendar reminder saved locally in this frontend prototype.", "success")}
                    className="w-full bg-white hover:bg-emerald-50 active:bg-emerald-100 text-[#005C45] hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            </Card>

            {/* MOBILE COMPLETED RESULTS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">COMPLETED RESULTS</h3>
                <button 
                  onClick={() => setSelectedFilter("Completed")}
                  className="text-[11px] font-bold text-[#005C45] hover:underline"
                >
                  View All
                </button>
              </div>

              <Card className="bg-white border border-slate-100 rounded-xl p-4 divide-y divide-slate-100 shadow-3xs">
                <div className="pb-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">Soil Health Module</h4>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Completed 12 Oct</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-800">85%</span>
                    <span className="text-[9px] font-bold uppercase block tracking-wider text-emerald-800">PASSED</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">Finance for Farmers</h4>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Completed 05 Oct</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-800">92%</span>
                    <span className="text-[9px] font-bold uppercase block tracking-wider text-emerald-800">PASSED</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* MOBILE HELP CARD (Stuck on a task?) */}
            <Card className="bg-[#EBF3FF] border-none p-4 rounded-xl flex items-center justify-between gap-4 shadow-3xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shrink-0 text-[#0043CE] shadow-3xs">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Stuck on a task?</h4>
                  <p className="text-[10px] text-slate-500 font-bold leading-tight mt-0.5">
                    Message your designated mentor.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="bg-[#001D66] hover:bg-[#00154d] text-white font-extrabold text-xs py-2 px-4.5 rounded-lg shrink-0 cursor-pointer transition-colors"
              >
                Help
              </button>
            </Card>

          </main>

        </div>
      </div>

      {/* Sticky Bottom Nav on Mobile devices */}
      <LearnerMobileNav />

      {/* ====================================================
          4. DIALOG MODAL: ASSESSMENT GUIDE
          ==================================================== */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 animate-in fade-in duration-200">
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-left space-y-4">
            <div className="flex items-start justify-between border-b border-slate-150 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">Assessment Guide</h3>
                <p className="text-xs text-slate-500 mt-0.5">SUSTAIN LMS guidelines</p>
              </div>
              <button 
                onClick={() => setIsGuideModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 pt-1 text-xs md:text-sm text-slate-750 leading-relaxed font-medium">
              <p>
                This centre brings together checkpoints, quizzes, assignments, project submissions, and reviewed results linked to your learning pathway.
              </p>
              <div className="p-3 bg-[#E6F4F1] border border-emerald-100 rounded-xl flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 text-[#005C45] shrink-0 mt-0.5" />
                <p className="text-[#005C45] font-semibold text-xs leading-normal">
                  All submitted assessments will accumulate towards your overall CPD credits and complete elements on your certificate checklists.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-150">
              <Button 
                onClick={() => setIsGuideModalOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-none text-xs font-semibold py-2 px-4 rounded-xl cursor-pointer min-h-[38px]"
              >
                Close
              </Button>
              <Button 
                onClick={() => { setIsGuideModalOpen(false); navigateTo("/learner/assessments/work-readiness-assessment/attempt"); }}
                className="bg-[#005C45] hover:bg-[#004735] text-white text-xs font-bold py-2 px-5 rounded-xl cursor-pointer min-h-[38px]"
              >
                Continue Assessment
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ====================================================
          5. DIALOG MODAL: MESSAGE FACILITATOR
          ==================================================== */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 animate-in fade-in duration-200">
          <Card className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 text-left space-y-4">
            <div className="flex items-start justify-between border-b border-slate-150 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading text-left">Message Halima Sani</h3>
                <p className="text-xs text-slate-400 mt-0.5">Your Cohort Facilitator</p>
              </div>
              <button 
                onClick={() => setIsMessageModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleMessageSubmit} className="space-y-4 pt-1">
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Subject</label>
                <input 
                  type="text" 
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  placeholder="Subject of inquiry..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs md:text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#005C45] focus:bg-white"
                  required
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Message text</label>
                <textarea 
                  rows={4}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Ask a question about your assessment task or due date..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs md:text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#005C45] focus:bg-white resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2 justify-end pt-3 border-t border-slate-150">
                <Button 
                  type="button"
                  onClick={() => setIsMessageModalOpen(false)}
                  className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-bold py-2 px-4 rounded-xl min-h-[38px] cursor-pointer"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-[#005C45] hover:bg-[#004735] text-white text-xs font-bold py-2 px-5 rounded-xl min-h-[38px] cursor-pointer"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}
