import React, { useState, useRef } from "react";
import { 
  Check, 
  ChevronRight, 
  Search, 
  Bell, 
  Clock, 
  ArrowLeft, 
  FileText, 
  X,
  MessageSquare,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Info,
  AlertCircle,
  Calendar,
  User,
  Download,
  BookOpen,
  Compass,
  Home,
  AlertTriangle,
  Upload,
  Eye,
  Wifi,
  FileDown
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LmsSimulatorWidget } from "../../components/learner/LmsSimulatorWidget";
import { LearnerCountdownTimer } from "../../components/learner/LearnerCountdownTimer";

export default function LearnerAssessmentReviewPage() {
  const { navigateTo } = useRoute();
  
  // State Variables
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
  const [isDeclarationFlashing, setIsDeclarationFlashing] = useState(false);
  const [textFirstMode, setTextFirstMode] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [evidenceFileName, setEvidenceFileName] = useState("Interview preparation notes.pdf");
  const [evidenceFileSize, setEvidenceFileSize] = useState("2.4 MB");
  const [activeModal, setActiveModal] = useState<
    "written_preview" | "evidence_preview" | "replace_evidence" | "message_facilitator" | "guide" | "submit_confirm" | null
  >(null);
  
  // Message Form States
  const [msgSubject, setMsgSubject] = useState("Question about my assessment submission");
  const [msgBody, setMsgBody] = useState("");
  
  // Local Toast notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "warning" } | null>(null);

  const declarationCardRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: "success" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const focusDeclarationCard = () => {
    setIsDeclarationFlashing(true);
    declarationCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      setIsDeclarationFlashing(false);
    }, 2000);
  };

  const handleSubmitClick = () => {
    if (!isDeclarationChecked) {
      focusDeclarationCard();
      showToast("Confirm the declaration before final submission.", "warning");
      return;
    }
    setActiveModal("submit_confirm");
  };

  const handleFinalSubmit = () => {
    setActiveModal(null);
    showToast("Assessment submitted locally in this frontend prototype.", "success");
    setTimeout(() => {
      navigateTo("/learner/assessments/work-readiness-assessment/submitted");
    }, 1000);
  };

  return (
    <div 
      id="learner-assessment-review-root" 
      className={`min-h-screen text-slate-900 font-sans flex flex-col antialiased transition-all duration-300 ${
        textFirstMode ? "bg-white" : "bg-slate-50"
      }`}
    >
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-250 max-w-sm">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 border-l-4 border-l-emerald-900 flex items-start gap-3">
            <div className="p-1.5 bg-emerald-50 text-emerald-950 rounded-lg shrink-0">
              {toast.type === "warning" ? (
                <AlertCircle className="h-4.5 w-4.5 text-amber-600" />
              ) : (
                <Check className="h-4.5 w-4.5 text-emerald-900" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-normal">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 ml-auto p-0.5">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 1. DESKTOP LAYOUT (LARGE SCREEN) */}
      {/* ========================================== */}
      <div className="hidden lg:flex flex-1 min-h-screen">
        <LearnerSidebar />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-8 py-6 overflow-y-auto">
          
          {/* Topbar */}
          <header className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="relative w-80">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search courses, assessments, or resources..." 
                className="w-full bg-slate-150/40 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-sustain-900 focus:ring-1 focus:ring-sustain-900 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => showToast("No new notifications.", "success")}
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-amber-500 rounded-full border-2 border-white"></span>
              </button>
              <button 
                onClick={() => showToast("Help system is active locally.", "success")}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
              >
                <MessageSquare className="h-4.5 w-4.5" />
              </button>
              
              <div className="h-8 w-px bg-slate-200"></div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 font-heading">Aisha Mohammed</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">SUST-LRN-0442</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop" 
                  alt="Aisha Mohammed" 
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-sustain-900/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </header>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
            <span onClick={() => navigateTo("/learner/assessments")} className="hover:text-sustain-900 cursor-pointer transition-colors">
              Assessments
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")} className="hover:text-sustain-900 cursor-pointer transition-colors">
              Work Readiness Assessment
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-600 font-extrabold">Review & Submit</span>
          </div>

          {/* Two Column Layout Grid */}
          <div className="grid grid-cols-12 gap-6 items-start">
            
            {/* Left Column (Assessments Answers and Stepper) */}
            <div className="col-span-8 space-y-6">
              
              {/* Hero Review Card */}
              <div className={`rounded-2xl border p-6 transition-all duration-350 ${
                textFirstMode ? "border-slate-800 bg-white" : "border-slate-200 bg-white shadow-xs"
              }`}>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-1 flex-1">
                      <h1 className="text-2xl font-extrabold text-slate-900 font-heading tracking-tight">Review Your Assessment</h1>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                        Check your answers, confirm your declaration, and submit when you are ready for facilitator review.
                      </p>
                    </div>

                    {/* DESKTOP REVIEW TIMER */}
                    <div className="w-full md:w-auto shrink-0 self-start">
                      <LearnerCountdownTimer
                        type="assessment"
                        layout="desktop-review"
                        onExpire={() => setShowTimeUpModal(true)}
                      />
                    </div>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-xl font-medium">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                      <span>Course: <span className="font-semibold text-slate-800">Work Readiness Foundation</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-xl font-medium">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>Due Date: <span className="font-semibold text-slate-800">24 Oct 2026</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-xl font-medium">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      <span>Facilitator: <span className="font-semibold text-slate-800">Halima Sani</span></span>
                    </div>
                  </div>

                  {/* Top Bar action buttons */}
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back to Questions
                    </button>
                    <button 
                      onClick={() => showToast("Assessment progress saved locally in this frontend prototype.", "success")}
                      className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Save Progress
                    </button>
                  </div>
                </div>
              </div>

              {/* Assessment Flow Stepper */}
              <div className={`rounded-2xl border p-5 flex items-center justify-between transition-all duration-350 ${
                textFirstMode ? "border-slate-800 bg-white" : "border-slate-200 bg-white shadow-xs"
              }`}>
                {[
                  { label: "Details", step: 1, active: true, complete: true },
                  { label: "Attempt", step: 2, active: true, complete: true },
                  { label: "Review", step: 3, active: true, complete: false, current: true },
                  { label: "Submitted", step: 4, active: false, complete: false },
                  { label: "Result", step: 5, active: false, complete: false }
                ].map((s, idx, arr) => (
                  <React.Fragment key={s.label}>
                    <div className="flex flex-col items-center flex-1 relative">
                      <div className="flex items-center justify-center">
                        {s.complete ? (
                          <div className="h-8 w-8 rounded-full bg-sustain-900 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                            <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                          </div>
                        ) : s.current ? (
                          <div className="h-8 w-8 rounded-full border-2 border-sustain-900 bg-white text-sustain-900 flex items-center justify-center font-bold text-sm relative">
                            <div className="h-3 w-3 rounded-full bg-sustain-900 animate-pulse" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-sm">
                            {s.step}
                          </div>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold mt-2 font-heading uppercase tracking-wider ${s.active || s.current ? "text-sustain-900 font-extrabold" : "text-slate-400"}`}>
                        {s.label}
                      </span>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className={`h-0.5 flex-1 max-w-[80px] -mt-5 ${s.complete ? "bg-sustain-900" : "bg-slate-200"}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Answer Summary list */}
              <div className="space-y-4">
                <h2 className="text-base font-extrabold text-slate-900 font-heading">Answer Summary</h2>

                {/* Question 1: Knowledge Check */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative hover:border-slate-300 transition-all">
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question 1 • Knowledge Check</span>
                    <button 
                      onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                      className="text-xs text-sustain-900 hover:text-sustain-850 font-bold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 leading-normal mb-3">
                    What is the most professional way to handle a workplace conflict?
                  </h3>
                  <div className="p-3 rounded-xl border border-sustain-100 bg-sustain-50/20 text-xs font-semibold text-slate-800 flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-sustain-900 text-white flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 stroke-[3px]" />
                    </div>
                    <span>C. Schedule a private meeting to discuss the issue calmly and seek a resolution.</span>
                  </div>
                </div>

                {/* Question 2: Select All That Apply */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative hover:border-slate-300 transition-all">
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question 2 • Select All That Apply</span>
                    <button 
                      onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                      className="text-xs text-sustain-900 hover:text-sustain-850 font-bold cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 leading-normal mb-3">
                    Which of the following are components of effective time management?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Prioritization", "Setting SMART Goals", "Delegation"].map((item) => (
                      <div key={item} className="p-3 rounded-xl border border-sustain-100 bg-sustain-50/20 text-xs font-semibold text-slate-800 flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-sustain-900 text-white flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 stroke-[3px]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question 7: Written Response (STAR Method) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative hover:border-slate-300 transition-all">
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question 7 • Written Response (STAR Method)</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setActiveModal("written_preview")}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </button>
                      <button 
                        onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                        className="text-xs text-sustain-900 hover:text-sustain-850 font-bold cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 leading-normal mb-3">
                    Describe a time you showed initiative in a project.
                  </h3>
                  <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-600 leading-relaxed font-semibold">
                      <span className="text-sustain-900 font-bold mr-1.5">Situation:</span>
                      During my internship at the local agribusiness hub, we were preparing for a major regional agricultural cooperative audit.
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed font-semibold">
                      <span className="text-sustain-900 font-bold mr-1.5">Task:</span>
                      We needed to digitize 500 paper-based farmer records within two weeks to prove compliance...
                    </div>
                    <button 
                      onClick={() => setActiveModal("written_preview")}
                      className="text-xs text-sustain-900 hover:text-sustain-850 font-bold underline block text-left cursor-pointer"
                    >
                      View full response (450 words)
                    </button>
                  </div>
                </div>

                {/* Question 8: Supporting Evidence */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative hover:border-slate-300 transition-all">
                  <div className="flex justify-between items-start mb-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question 8 • Supporting Evidence</span>
                    <button 
                      onClick={() => setActiveModal("replace_evidence")}
                      className="text-xs text-sustain-900 hover:text-sustain-850 font-bold cursor-pointer"
                    >
                      Replace
                    </button>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 leading-normal mb-3">
                    Upload your interview preparation notes.
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="h-10 w-10 rounded-xl bg-sustain-50 text-sustain-900 flex items-center justify-center shrink-0 border border-sustain-200">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{evidenceFileName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">{evidenceFileSize} • PDF Document</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveModal("evidence_preview")}
                      className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-lg shadow-2xs transition-all cursor-pointer"
                      title="View File"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Submission Declaration Card */}
              <div 
                ref={declarationCardRef}
                className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-xs transition-all duration-300 ${
                  isDeclarationChecked 
                    ? "border-sustain-500 ring-2 ring-sustain-50" 
                    : isDeclarationFlashing 
                      ? "border-amber-500 ring-4 ring-amber-100" 
                      : ""
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-1.5 shrink-0 rounded-full transition-all duration-300 ${isDeclarationChecked ? "bg-sustain-900" : "bg-amber-500"}`} />
                  <div className="space-y-4 flex-1">
                    <h3 className="text-sm font-extrabold text-slate-900 font-heading">Submission Declaration</h3>
                    
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={isDeclarationChecked}
                        onChange={(e) => {
                          setIsDeclarationChecked(e.target.checked);
                          if (e.target.checked) setIsDeclarationFlashing(false);
                        }}
                        className="sr-only"
                      />
                      <div className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        isDeclarationChecked 
                          ? "border-sustain-900 bg-sustain-900 text-white" 
                          : "border-slate-300 bg-white group-hover:border-slate-450"
                      }`}>
                        {isDeclarationChecked && <Check className="h-3 w-3 stroke-[3px]" />}
                      </div>
                      <div className="text-xs font-semibold text-slate-700 leading-relaxed group-hover:text-slate-900 select-none">
                        I confirm that these responses are my own original work and I have not received unauthorised assistance in completing this assessment.
                      </div>
                    </label>

                    <p className="text-[10px] text-slate-500 font-medium bg-slate-50 p-3 rounded-xl leading-relaxed border border-slate-100">
                      <span className="font-bold text-slate-705 mr-1">Note:</span>
                      Submitting work that is not your own may result in a review of your certificate eligibility.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ready to Submit Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 font-heading">Ready to submit?</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  You have completed all required questions and uploaded required evidence. Halima Sani will review your written response and evidence after submission.
                </p>

                {/* Primary Submit Button */}
                <button 
                  onClick={handleSubmitClick}
                  className="w-full h-12 bg-sustain-900 hover:bg-sustain-800 active:bg-sustain-950 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Submit for Review</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[10px] text-slate-400 font-medium">
                  By clicking submit, you finalise this attempt for facilitator review.
                </p>
              </div>

            </div>

            {/* Right Column (Widget / Sidebar cards) */}
            <div className="col-span-4 space-y-5">
              
              {/* Readiness Check Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-extrabold text-slate-900 font-heading">Readiness Check</h3>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    isDeclarationChecked 
                      ? "bg-emerald-50 text-sustain-900 border border-sustain-200" 
                      : "bg-amber-50 text-amber-800 border border-amber-200 animate-pulse"
                  }`}>
                    {isDeclarationChecked ? "Ready" : "Declaration pending"}
                  </span>
                </div>

                <div className="space-y-3 text-xs font-semibold">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Objective Questions</span>
                    <span className="text-slate-850 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-sustain-900 shrink-0" />
                      6/6
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Written Response</span>
                    <span className="text-slate-850 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-sustain-900 shrink-0" />
                      Complete
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Evidence Upload</span>
                    <span className="text-slate-850 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-sustain-900 shrink-0" />
                      1 file
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Declaration</span>
                    {isDeclarationChecked ? (
                      <span className="text-sustain-900 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-sustain-900 shrink-0" />
                        Confirmed
                      </span>
                    ) : (
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={focusDeclarationCard}
                  className="w-full py-2.5 bg-sustain-50 hover:bg-sustain-100 text-sustain-900 font-bold text-xs rounded-xl border border-sustain-200 transition-all cursor-pointer"
                >
                  Complete Declaration
                </button>
              </div>

              {/* Question Navigator Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Question Navigator</h3>
                
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                      className="aspect-square rounded-xl bg-sustain-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs hover:bg-sustain-800 transition-all cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-2.5 border-t border-slate-150 text-[10px] font-semibold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-sustain-900" />
                    <span>Complete</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-200" />
                    <span>Incomplete</span>
                  </div>
                </div>
              </div>

              {/* What Happens After Submission Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">What Happens After Submission?</h3>
                
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Submission recorded", desc: "Your assessment is marked as submitted in this frontend prototype." },
                    { step: "2", title: "Facilitator review", desc: "Halima Sani reviews written responses and evidence." },
                    { step: "3", title: "Feedback released", desc: "Your result, strengths, and areas to improve become available." },
                    { step: "4", title: "CPD updated", desc: "Approved credits are reflected in your CPD record after review." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-left">
                      <div className="h-6 w-6 rounded-full bg-sustain-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {item.step}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low-Bandwidth / Optimized Connection Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-sustain-900" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">Low-Bandwidth Support</h3>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  Text-first mode is available if your connection is unstable.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => {
                      setTextFirstMode(!textFirstMode);
                      showToast(textFirstMode ? "Standard layout mode enabled." : "Low-bandwidth text-first mode enabled.", "success");
                    }}
                    className={`py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      textFirstMode 
                        ? "bg-sustain-900 border-sustain-900 text-white" 
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {textFirstMode ? "Standard Mode" : "Text-first Mode"}
                  </button>
                  <button 
                    onClick={() => showToast("Assessment summary download simulated in this frontend prototype.", "success")}
                    className="py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[10px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    Download PDF
                  </button>
                </div>
              </div>

              {/* Need Assistance Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-left">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Need Assistance?</h3>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  Message Halima Sani if you are unsure about your submission.
                </p>
                <button 
                  onClick={() => {
                    setMsgSubject("Question about my assessment submission");
                    setMsgBody("");
                    setActiveModal("message_facilitator");
                  }}
                  className="w-full py-2 bg-sustain-50 hover:bg-sustain-100 text-sustain-900 border border-sustain-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Message Facilitator
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================== */}
      {/* 2. TABLET LAYOUT (768px & 820px) AND MOBILE */}
      {/* ========================================== */}
      <div className="lg:hidden flex flex-col flex-1 pb-36">
        
        {/* Mobile / Tablet Header Navigation bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
              className="p-1 text-slate-600 hover:text-slate-950 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-base font-bold text-slate-900 tracking-tight font-heading">Review & Submit</span>
          </div>

          <button 
            onClick={() => showToast("Assessment progress saved locally in this frontend prototype.", "success")}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Save Progress
          </button>
        </header>

        {/* Sticky Mobile Timer Bar */}
        <LearnerCountdownTimer 
          type="assessment"
          layout="mobile-sticky"
          questionProgressText="Review before submitting"
          onExpire={() => setShowTimeUpModal(true)}
        />

        {/* Scrollable Container Wrapper */}
        <div className="px-4 py-4 space-y-5 max-w-3xl mx-auto w-full">
          
          {/* Mobile Hero block */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div>
              <h1 className="text-xl font-semibold text-slate-950 font-heading">Review Your Assessment</h1>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Check your answers and confirm your declaration before submitting for facilitator review.
              </p>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                Ready to review
              </span>
              <span className="bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                8 of 8 complete
              </span>
              <span className="bg-amber-50 text-amber-800 border border-amber-200/50 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                4 CPD credits pending
              </span>
            </div>

            {/* Meta text and details */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-medium">
              <div>
                <p className="text-[11px] font-medium text-slate-500 font-sans">Course</p>
                <p className="text-xs font-semibold text-slate-950 font-sans mt-0.5 leading-snug">Work Readiness Foundation</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 font-sans">Due Date</p>
                <p className="text-xs font-semibold text-slate-950 font-sans mt-0.5 leading-snug">24 Oct 2026</p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] font-medium text-slate-500 font-sans">Facilitator</p>
                <p className="text-xs font-semibold text-slate-950 font-sans mt-0.5 leading-snug">Halima Sani</p>
              </div>
            </div>

            <button 
              onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer border border-slate-200 flex items-center justify-center min-h-[40px]"
            >
              Back to Questions
            </button>
          </div>

          {/* Stepper block */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between overflow-x-auto whitespace-nowrap">
            {[
              { label: "Details", complete: true },
              { label: "Attempt", complete: true },
              { label: "Review", current: true },
              { label: "Submitted", pending: true },
              { label: "Result", pending: true }
            ].map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5 px-1 shrink-0">
                {s.complete ? (
                  <div className="h-5 w-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                    <Check className="h-3 w-3 stroke-[3px]" />
                  </div>
                ) : s.current ? (
                  <div className="h-5 w-5 rounded-full border border-emerald-700 bg-white flex items-center justify-center relative">
                    <div className="h-2 w-2 rounded-full bg-emerald-700" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full bg-slate-50 text-slate-400 border border-slate-200 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </div>
                )}
                <span className={`text-[10px] font-semibold ${s.current ? "text-emerald-800" : "text-slate-500"}`}>{s.label}</span>
                {idx < 4 && <ChevronRight className="h-3 w-3 text-slate-300 ml-1 shrink-0" />}
              </div>
            ))}
          </div>

          {/* Submission Readiness Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-950 font-heading">Submission Readiness</h3>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                isDeclarationChecked ? "bg-emerald-50 text-emerald-850" : "bg-amber-50 text-amber-800"
              }`}>
                {isDeclarationChecked ? "Ready" : "Declaration pending"}
              </span>
            </div>

            <div className="space-y-3 text-xs font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-sans">Questions</span>
                <span className="text-emerald-700 flex items-center gap-1 font-semibold font-sans">
                  <CheckCircle2 className="h-4 w-4" /> Complete
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-sans">Written response</span>
                <span className="text-emerald-700 flex items-center gap-1 font-semibold font-sans">
                  <CheckCircle2 className="h-4 w-4" /> Complete
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-sans">Evidence</span>
                <span className="text-emerald-700 flex items-center gap-1 font-semibold font-sans">
                  <CheckCircle2 className="h-4 w-4" /> Complete
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-sans">Declaration</span>
                {isDeclarationChecked ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold font-sans">
                    <CheckCircle2 className="h-4 w-4" /> Confirmed
                  </span>
                ) : (
                  <span className="text-amber-700 flex items-center gap-1 font-semibold font-sans">
                    <AlertTriangle className="h-4 w-4 text-amber-500" /> Pending
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Answer Summary stack */}
          <div className="space-y-3.5">
            <h2 className="text-base font-semibold text-slate-950 font-heading pl-1">Answer Summary</h2>

            {/* Q1 Knowledge Check */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
              <div className="flex justify-between text-xs font-medium text-slate-500 font-sans">
                <span>Question 1 • Knowledge Check</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-normal font-sans">
                Which action helps a learner prepare professionally for an interview?
              </p>
              <div className="p-3 rounded-xl bg-emerald-50/55 border border-emerald-100 text-xs font-medium text-slate-900 flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                </div>
                <span className="font-sans leading-relaxed">Test your internet connection and prepare notes before the session.</span>
              </div>
            </div>

            {/* Q2 Select All */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
              <div className="flex justify-between text-xs font-medium text-slate-500 font-sans">
                <span>Question 2 • Select All</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-normal font-sans">
                Identify key actions for low-bandwidth interview preparation.
              </p>
              <div className="space-y-2">
                {["Test your internet connection", "Keep a backup phone number", "Prepare short notes"].map((item) => (
                  <div key={item} className="p-3 rounded-xl bg-emerald-50/55 border border-emerald-100 text-xs font-medium text-slate-900 flex items-start gap-2.5">
                    <div className="h-5 w-5 rounded-md bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </div>
                    <span className="font-sans leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Q3 True/False */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
              <div className="flex justify-between text-xs font-medium text-slate-500 font-sans">
                <span>Question 3 • True / False</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-normal font-sans">
                A learner should confirm the correct session before marking attendance.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50/55 border border-emerald-100 text-xs font-medium text-slate-900 flex items-start gap-2.5">
                <div className="h-5 w-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                </div>
                <span className="font-sans leading-relaxed">True</span>
              </div>
            </div>

            {/* Q4 Short Answer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
              <div className="flex justify-between text-xs font-medium text-slate-500 font-sans">
                <span>Question 4 • Short Answer</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-normal font-sans">
                Explain why preparation matters before an interview.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 leading-relaxed italic font-sans">
                "Preparation helps reduce avoidable issues and supports confident communication."
              </div>
            </div>

            {/* Q5 Written Response */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
              <div className="flex justify-between text-xs font-medium text-slate-500 font-sans">
                <span>Question 5 • Written Response</span>
              </div>
              <p className="text-xs font-semibold text-slate-900 leading-normal font-sans">
                Describe a scenario where you demonstrated workplace communication.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-sans">
                <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-2">
                  In my previous project, I noticed a communication gap during field coordination. Instead of complaining, I compiled coordinates and...
                </p>
                <button 
                  onClick={() => setActiveModal("written_preview")}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline block cursor-pointer transition-colors"
                >
                  View Full Response
                </button>
              </div>
            </div>

          </div>

          {/* Evidence card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5">
            <h3 className="text-sm font-semibold text-slate-950 font-heading">Evidence</h3>
            <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">{evidenceFileName}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{evidenceFileSize} • Uploaded today</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-emerald-100/40">
                <button 
                  onClick={() => setActiveModal("evidence_preview")}
                  className="flex-1 sm:flex-initial py-1.5 px-3 bg-white hover:bg-emerald-50 border border-slate-200 text-xs font-semibold text-emerald-700 rounded-lg text-center cursor-pointer min-h-[36px] transition-colors"
                >
                  View
                </button>
                <button 
                  onClick={() => setActiveModal("replace_evidence")}
                  className="flex-1 sm:flex-initial py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg text-center cursor-pointer min-h-[36px] transition-colors"
                >
                  Replace
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Declaration Card */}
          <div 
            ref={declarationCardRef}
            className={`bg-white rounded-2xl border ${isDeclarationChecked ? "border-emerald-200" : "border-slate-200 border-l-4 border-l-amber-500"} p-5 shadow-sm transition-all duration-200`}
          >
            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3.5 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={isDeclarationChecked}
                  onChange={(e) => {
                    setIsDeclarationChecked(e.target.checked);
                    if (e.target.checked) setIsDeclarationFlashing(false);
                  }}
                  className="sr-only"
                />
                <div className={`mt-0.5 h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                  isDeclarationChecked 
                    ? "border-emerald-700 bg-emerald-700 text-white animate-pulse-once" 
                    : "border-slate-300 bg-white hover:border-slate-400"
                }`}>
                  {isDeclarationChecked && <Check className="h-4 w-4 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium text-slate-700 leading-relaxed select-none">
                  I confirm these responses are my own work and I am ready to submit for facilitator review.
                </span>
              </label>

              <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-xs font-medium">
                <span className="text-slate-500">Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  isDeclarationChecked ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isDeclarationChecked ? "bg-emerald-500" : "bg-amber-500"}`} />
                  {isDeclarationChecked ? "Ready to submit" : "Declaration pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 pb-2 border-b border-slate-100 font-sans">
              <span>Total Questions: 8</span>
              <span>Evidence Files: 1</span>
            </div>
            
            {/* Warning card if declaration is pending */}
            {!isDeclarationChecked && (
              <div className="p-3.5 bg-amber-50 border border-amber-200/80 text-amber-900 rounded-xl text-xs font-medium flex items-start gap-2.5 leading-relaxed font-sans">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                <span>Please check the declaration box above to enable submission.</span>
              </div>
            )}

            <button 
              onClick={handleSubmitClick}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer min-h-[44px]"
            >
              Submit for Review
            </button>
          </div>

          {/* What happens next Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-950 font-heading">What happens next?</h3>
            <div className="relative pl-6 space-y-5">
              {/* Vertical soft line */}
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-200" />

              {[
                {
                  title: "Facilitator review",
                  desc: "Halima Sani reviews your answers and evidence."
                },
                {
                  title: "Feedback released",
                  desc: "Your result, strengths, and areas to improve become available."
                },
                {
                  title: "CPD record updated",
                  desc: "Approved credits are added after review."
                }
              ].map((step, idx) => (
                <div key={idx} className="relative flex gap-3 text-left">
                  {/* Circle dot */}
                  <div className="absolute -left-6 top-1 h-5 w-5 rounded-full bg-emerald-50 border-2 border-emerald-700 flex items-center justify-center text-[10px] font-bold text-emerald-800 shrink-0 z-10">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-slate-900 leading-tight">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need help Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3.5">
            <h3 className="text-sm font-semibold text-slate-950 font-heading">Need help?</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  setMsgSubject("Question about my assessment submission");
                  setMsgBody("");
                  setActiveModal("message_facilitator");
                }}
                className="py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <MessageSquare className="h-4 w-4 text-slate-400" />
                <span>Message Facilitator</span>
              </button>
              <button 
                onClick={() => setActiveModal("guide")}
                className="py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <BookOpen className="h-4 w-4 text-slate-400" />
                <span>Open Guide</span>
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Sticky Bottom Action Bar */}
        <div className="fixed bottom-14 left-0 right-0 z-20 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between shadow-lg gap-3">
          <button 
            onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
            className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors shadow-sm cursor-pointer min-h-[44px]"
          >
            Back
          </button>
          
          <button 
            onClick={() => {
              if (!isDeclarationChecked) {
                focusDeclarationCard();
                showToast("Confirm the declaration first.", "warning");
              } else {
                handleSubmitClick();
              }
            }}
            className="flex-[2] py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-md flex items-center justify-center min-h-[44px] cursor-pointer"
          >
            {isDeclarationChecked ? "Submit" : "Review Declaration"}
          </button>
        </div>

        {/* Mobile bottom navigation bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 h-14 flex items-center justify-around shadow-lg">
          {[
            { label: "Home", icon: Home, path: "/learner" as const },
            { label: "Journey", icon: Compass, path: "/learner/journey" as const },
            { label: "Courses", icon: BookOpen, path: "/learner/courses" as const },
            { label: "Assessments", icon: GraduationCap, active: true, path: "/learner/assessments" as const },
            { label: "Support", icon: HelpCircle2, path: "/learner/support" as const }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(item.path)}
              className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
                item.active ? "text-emerald-800" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[9px] font-bold mt-0.5 tracking-tight font-sans">{item.label}</span>
            </button>
          ))}
        </nav>

      </div>

      {/* ========================================== */}
      {/* 3. MODALS AND SHEET OVERLAYS */}
      {/* ========================================== */}

      {/* MODAL 1: Written STAR Response Preview */}
      {activeModal === "written_preview" && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 text-left border border-slate-200 shadow-2xl space-y-5 animate-in scale-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-950 font-heading">Written Response Preview</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100/50 mb-1">
                  Situation
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  During my internship at the local agribusiness hub, we were preparing for a major regional agricultural cooperative audit.
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100/50 mb-1">
                  Task
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  We needed to digitize 500 paper-based farmer records within two weeks to prove compliance and pass the agricultural audit.
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100/50 mb-1">
                  Action
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  I designed an Excel import checklist template, trained two peer volunteers on swift entry techniques, and coordinated data-cleaning checkpoints every evening.
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="inline-flex items-center bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100/50 mb-1">
                  Result
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  We completed the digitization of 512 records in 11 days, resulting in zero audit findings and securing Kano region agribusiness certification for the entire hub.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-3 justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-150 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  navigateTo("/learner/assessments/work-readiness-assessment/attempt");
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Edit Response
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Evidence Preview */}
      {activeModal === "evidence_preview" && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center border border-slate-200 shadow-2xl space-y-4 animate-in scale-in-95 duration-200">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 text-left">
              <h3 className="text-sm font-semibold text-slate-950 font-heading">Evidence File</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-6 flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
                <FileText className="h-8 w-8" />
              </div>
              <div className="text-center font-sans">
                <p className="text-xs font-semibold text-slate-900">{evidenceFileName}</p>
                <p className="text-[10px] text-slate-500 mt-1">{evidenceFileSize} • PDF Document</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[40px]"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  showToast("Download simulated in this frontend prototype.", "success");
                }}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Replace Evidence */}
      {activeModal === "replace_evidence" && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-left border border-slate-200 shadow-2xl space-y-4 animate-in scale-in-95 duration-200">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-950 font-heading">Replace Supporting Evidence</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Simulating File Upload Pickers */}
            <div className="space-y-4">
              <p className="text-xs text-slate-500 leading-normal font-medium">
                Choose a replacement document for your interview preparation notes. Files must be under 10MB in PDF or DOCX format.
              </p>

              {/* Standard Sim dropzone */}
              <div 
                onClick={() => {
                  setEvidenceFileName("Aisha_Mohammed_Updated_Interview_Notes.pdf");
                  setEvidenceFileSize("1.8 MB");
                  setActiveModal(null);
                  showToast("Evidence file replaced successfully.", "success");
                }}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/10 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
              >
                <Upload className="h-8 w-8 text-slate-400 mb-2.5" />
                <p className="text-xs font-semibold text-slate-800">Click or drag file to upload</p>
                <p className="text-[10px] text-slate-500 mt-1">PDF, DOCX, PNG or JPG (Max 10MB)</p>
              </div>

              {/* Mock choices */}
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Or select template notes:</p>
                {[
                  { name: "Kano_Pathway_Pre_Notes.pdf", size: "3.2 MB" },
                  { name: "Interview_Guideline_Checklist.pdf", size: "1.5 MB" }
                ].map((doc) => (
                  <button
                    key={doc.name}
                    onClick={() => {
                      setEvidenceFileName(doc.name);
                      setEvidenceFileSize(doc.size);
                      setActiveModal(null);
                      showToast("Template notes attached successfully.", "success");
                    }}
                    className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-700 cursor-pointer transition-colors"
                  >
                    <span className="truncate">{doc.name}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">{doc.size}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2 justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Message Facilitator */}
      {activeModal === "message_facilitator" && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-left border border-slate-200 shadow-2xl space-y-4 animate-in scale-in-95 duration-200">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-950 font-heading">Message Halima Sani</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Subject</label>
                <input 
                  type="text" 
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Type your message here..."
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2 justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  showToast("Message sent locally in this frontend prototype.", "success");
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Assessment Guide */}
      {activeModal === "guide" && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-left border border-slate-200 shadow-2xl space-y-4 animate-in scale-in-95 duration-200">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-950 font-heading">Assessment Guide</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-2 text-xs text-slate-600 font-medium leading-relaxed font-sans">
              Review your answers, confirm your declaration, and submit when you are ready for facilitator review.
            </div>

            <div className="flex gap-3 pt-2 justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Close
              </button>
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Continue Reviewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: Submit Confirmation Dialog */}
      {activeModal === "submit_confirm" && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-left border border-slate-200 shadow-2xl space-y-4 animate-in scale-in-95 duration-200">
            <div className="flex items-center gap-2 text-emerald-700">
              <Info className="h-5 w-5 shrink-0" />
              <h3 className="text-base font-semibold text-slate-955 leading-tight font-heading">Submit assessment for review?</h3>
            </div>
            
            <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">
              Your responses will be sent to Halima Sani for review.
            </p>

            {/* Assessment summary box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 font-sans">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Assessment:</span>
                <span className="text-slate-900 font-bold">Work Readiness Assessment</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Required questions:</span>
                <span className="text-emerald-800 font-bold">8 of 8 complete</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Evidence:</span>
                <span className="text-slate-900 font-bold">{evidenceFileName}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">CPD Track:</span>
                <span className="text-amber-800 font-bold">4 credits pending after review</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[40px]"
              >
                Keep Reviewing
              </button>
              <button 
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm min-h-[40px]"
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time's Up Modal */}
      {showTimeUpModal && (
        <div className="fixed inset-0 z-55 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5 animate-in scale-in-95 duration-200 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Time is up</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your current answers have been saved locally and the assessment is ready for submission.
              </p>
            </div>
            <p className="text-[10px] text-slate-400 bg-slate-50 py-2 px-3 rounded-xl border border-slate-100 font-medium">
              Answers saved locally in this frontend prototype.
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => {
                  setShowTimeUpModal(false);
                  navigateTo("/learner/assessments/work-readiness-assessment/submitted");
                }}
                className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                Submit Saved Assessment
              </button>
              <button
                onClick={() => {
                  setShowTimeUpModal(false);
                }}
                className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                Review Saved Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulator indicator for ease of access */}
      <LmsSimulatorWidget />
    </div>
  );
}

interface HelpCircle2Props {
  className?: string;
}

function HelpCircle2({ className = "" }: HelpCircle2Props) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
