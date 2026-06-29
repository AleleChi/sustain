import React, { useState, useEffect } from "react";
import { 
  Check, 
  HelpCircle, 
  BookOpen, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  Bell, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Upload, 
  Trash2, 
  Paperclip, 
  Download, 
  Menu, 
  X,
  Award,
  Sparkles,
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  ChevronLeft,
  Activity,
  BookMarked,
  GraduationCap,
  Users,
  CheckCircle2,
  FileText,
  Bookmark,
  Send,
  Info,
  AlertTriangle
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { useLearningState } from "../../context/LearningStateContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LmsSimulatorWidget } from "../../components/learner/LmsSimulatorWidget";
import { Button } from "../../components/ui/Button";
import { LearnerCountdownTimer } from "../../components/learner/LearnerCountdownTimer";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  type: "single-choice" | "multi-select" | "true-false" | "short-answer" | "written-response" | "evidence-upload";
  title: string;
  section: string;
  questionText: string;
  instruction: string;
  options?: Option[];
  selectedAnswer?: string; // for single-choice/true-false/declaration
  selectedAnswers?: string[]; // for multi-select
  shortAnswer?: string; // for short-answer
  writtenResponse?: string; // for written-response
  uploadedFile?: { name: string; size: string } | null;
  isRequired: boolean;
  isAnswered: boolean;
}

interface AssessmentSection {
  id: string;
  label: string;
  type: string;
  questionIds: number[];
}

const assessmentSections: AssessmentSection[] = [
  {
    id: "knowledge-check",
    label: "Knowledge Check",
    type: "single_choice",
    questionIds: [1]
  },
  {
    id: "select-all",
    label: "Select All",
    type: "multi_select",
    questionIds: [2, 3]
  },
  {
    id: "true-false",
    label: "True / False",
    type: "true_false",
    questionIds: [4]
  },
  {
    id: "short-answer",
    label: "Short Answer",
    type: "short_answer",
    questionIds: [5]
  },
  {
    id: "written-response",
    label: "Written Response",
    type: "written_response",
    questionIds: [6]
  },
  {
    id: "evidence",
    label: "Evidence",
    type: "file_upload",
    questionIds: [7]
  },
  {
    id: "review-submit",
    label: "Review & Submit",
    type: "review_submit",
    questionIds: [8]
  }
];

export default function LearnerAssessmentAttemptPage() {
  const { navigateTo } = useRoute();
  const { bandwidthMode, setBandwidthMode } = useLearningState();

  // --- Mock/Local Assessment State ---
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "single-choice",
      title: "Knowledge Check",
      section: "Knowledge Check",
      questionText: "Which of the following is the most professional way to start a virtual job interview?",
      instruction: "Select one answer.",
      options: [
        { id: "q1-o1", text: "Join the link 5 minutes early, test your camera, and greet the interviewer professionally." },
        { id: "q1-o2", text: "Join 10 minutes late without testing your microphone or camera." },
        { id: "q1-o3", text: "Keep your camera turned off and wait for the interviewer to prompt you." }
      ],
      selectedAnswer: "q1-o1",
      isRequired: true,
      isAnswered: true
    },
    {
      id: 2,
      type: "multi-select",
      title: "Multi-select Question",
      section: "Select All That Apply",
      questionText: "Which actions can help a learner prepare for a low-bandwidth interview session?",
      instruction: "Select all that apply.",
      options: [
        { id: "q2-o1", text: "Closing all unnecessary background applications and browser tabs." },
        { id: "q2-o2", text: "Streaming high-definition video during the session." },
        { id: "q2-o3", text: "Preparing a text-only summary of your key points in case of audio lag." }
      ],
      selectedAnswers: ["q2-o1", "q2-o3"],
      isRequired: true,
      isAnswered: true
    },
    {
      id: 3,
      type: "multi-select",
      title: "Multi-select Question",
      section: "Select All That Apply",
      questionText: "Which actions can help a learner prepare for a low-bandwidth interview session?",
      instruction: "Select all that apply.",
      options: [
        { id: "q3-o1", text: "Test your internet connection before the session." },
        { id: "q3-o2", text: "Keep a backup phone number ready." },
        { id: "q3-o3", text: "Wait until the interview starts before checking your microphone." }
      ],
      selectedAnswers: ["q3-o1", "q3-o2"],
      isRequired: true,
      isAnswered: true
    },
    {
      id: 4,
      type: "true-false",
      title: "True/False Question",
      section: "True / False",
      questionText: "The STAR method stands for Situation, Task, Action, and Result.",
      instruction: "Select True or False.",
      options: [
        { id: "q4-true", text: "True" },
        { id: "q4-false", text: "False" }
      ],
      selectedAnswer: "",
      isRequired: true,
      isAnswered: false
    },
    {
      id: 5,
      type: "short-answer",
      title: "Short Answer",
      section: "Short Answer",
      questionText: "What does the letter 'A' in the STAR model stand for when answering behavioral interview questions?",
      instruction: "Type your answer in the box below.",
      shortAnswer: "",
      isRequired: true,
      isAnswered: false
    },
    {
      id: 6,
      type: "written-response",
      title: "Written Response",
      section: "Written Response",
      questionText: "Describe a time you solved a difficult problem. Use the STAR model to structure your written response.",
      instruction: "Write a detailed response below (minimum 100 characters).",
      writtenResponse: "Situation: During my internship at the local agribusiness hub, we were preparing for a major regional agricultural cooperative audit.\n\nTask: We needed to digitize 500 paper-based farmer records within two weeks to prove compliance and pass the agricultural audit.\n\nAction: I designed an Excel import checklist template, trained two peer volunteers on swift entry techniques, and coordinated data-cleaning checkpoints every evening.\n\nResult: We completed the digitization of 512 records in 11 days, resulting in zero audit findings and securing Kano region agribusiness certification for the entire hub.",
      isRequired: true,
      isAnswered: true
    },
    {
      id: 7,
      type: "evidence-upload",
      title: "Evidence Portfolio",
      section: "Evidence Upload",
      questionText: "Upload your resume, portfolio, or other supporting documents for tutor review.",
      instruction: "Upload PDF, DOCX, or PNG files (Max 5MB).",
      uploadedFile: null,
      isRequired: false,
      isAnswered: false
    },
    {
      id: 8,
      type: "true-false",
      title: "Declaration Statement",
      section: "Review & Submit",
      questionText: "I declare that this assessment submission represents my own original work and that all references have been properly cited.",
      instruction: "Select True to confirm and accept this declaration statement.",
      options: [
        { id: "q8-true", text: "I confirm the declaration statement." }
      ],
      selectedAnswer: "",
      isRequired: true,
      isAnswered: false
    }
  ]);

  const [currentIdx, setCurrentIdx] = useState(2); // Start on Question 3 to match mobile screenshot, or user can click
  const currentQuestion = questions[currentIdx];

  // --- STAR Written Response States ---
  const [situation, setSituation] = useState("During my internship at the local agribusiness hub, we were preparing for a major regional agricultural cooperative audit.");
  const [task, setTask] = useState("We needed to digitize 500 paper-based farmer records within two weeks to prove compliance and pass the agricultural audit.");
  const [action, setAction] = useState("I designed an Excel import checklist template, trained two peer volunteers on swift entry techniques, and coordinated data-cleaning checkpoints every evening.");
  const [result, setResult] = useState("We completed the digitization of 512 records in 11 days, resulting in zero audit findings and securing Kano region agribusiness certification for the entire hub.");

  // Helper to update combined written-response
  const updateCombinedWrittenResponse = (s: string, t: string, a: string, r: string) => {
    const combined = `Situation: ${s}\n\nTask: ${t}\n\nAction: ${a}\n\nResult: ${r}`;
    setQuestions(prev => prev.map((q, idx) => {
      if (idx === 5) {
        return { 
          ...q, 
          writtenResponse: combined, 
          isAnswered: s.trim().length > 0 && t.trim().length > 0 && a.trim().length > 0 && r.trim().length > 0 
        };
      }
      return q;
    }));
  };

  // --- Global Toast Notification ---
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  // --- Modals / Sheets ---
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFacilitatorModalOpen, setIsFacilitatorModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isLowBandwidthSheetOpen, setIsLowBandwidthSheetOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);

  // --- Message Facilitator Fields ---
  const [subject, setSubject] = useState("Question about my assessment");
  const [messageText, setMessageText] = useState("");

  // --- Section Tabs Configuration ---
  const sections = [
    { name: "Knowledge Check", idx: 0 },
    { name: "Select All That Apply", idx: 1 },
    { name: "Short Answer", idx: 3 },
    { name: "Written Response", idx: 5 },
    { name: "Evidence Upload", idx: 6 },
    { name: "Review & Submit", idx: 7 }
  ];

  // --- Interactive Handlers ---
  const handleOptionSelectSingle = (optionId: string) => {
    setQuestions(prev => prev.map((q, idx) => {
      if (idx === currentIdx) {
        return { ...q, selectedAnswer: optionId, isAnswered: true };
      }
      return q;
    }));
  };

  const handleOptionSelectMulti = (optionId: string) => {
    setQuestions(prev => prev.map((q, idx) => {
      if (idx === currentIdx) {
        const currentSelected = q.selectedAnswers || [];
        const isAlreadySelected = currentSelected.includes(optionId);
        const updated = isAlreadySelected 
          ? currentSelected.filter(id => id !== optionId)
          : [...currentSelected, optionId];
        return { 
          ...q, 
          selectedAnswers: updated, 
          isAnswered: updated.length > 0 
        };
      }
      return q;
    }));
  };

  const handleShortAnswerChange = (text: string) => {
    setQuestions(prev => prev.map((q, idx) => {
      if (idx === currentIdx) {
        return { ...q, shortAnswer: text, isAnswered: text.trim().length > 0 };
      }
      return q;
    }));
  };

  const handleWrittenResponseChange = (text: string) => {
    setQuestions(prev => prev.map((q, idx) => {
      if (idx === currentIdx) {
        return { ...q, writtenResponse: text, isAnswered: text.trim().length >= 10 };
      }
      return q;
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQuestions(prev => prev.map((q, idx) => {
        if (idx === currentIdx) {
          return { 
            ...q, 
            uploadedFile: { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(2)} MB` },
            isAnswered: true 
          };
        }
        return q;
      }));
      showToast(`Uploaded ${file.name} successfully.`, "success");
    }
  };

  const handleRemoveFile = () => {
    setQuestions(prev => prev.map((q, idx) => {
      if (idx === currentIdx) {
        return { ...q, uploadedFile: null, isAnswered: false };
      }
      return q;
    }));
    showToast("File removed.", "info");
  };

  // Previous Question Action
  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Next Question Action
  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  // Save Current Answer Action
  const handleSaveAnswer = () => {
    showToast("Answer saved locally in this frontend prototype.", "success");
  };

  // Save Progress Action
  const handleSaveProgress = () => {
    showToast("Assessment progress saved locally in this frontend prototype.", "success");
  };

  // Text-first Mode Toggle Handler
  const handleToggleTextFirst = () => {
    const newMode = bandwidthMode === "text-only" ? "full" : "text-only";
    setBandwidthMode(newMode);
    if (newMode === "text-only") {
      showToast("Low-Bandwidth Mode enabled: Media previews suspended to conserve data.", "warning");
    } else {
      showToast("Full Interactive Mode restored.", "success");
    }
  };

  // Send Message to Facilitator Handler
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    showToast("Message sent locally in this frontend prototype.", "success");
    setIsFacilitatorModalOpen(false);
    setMessageText("");
  };

  // Route to Review & Submit
  const handleReviewAndSubmit = () => {
    const unansweredRequired = questions.filter(q => q.isRequired && !q.isAnswered);
    if (unansweredRequired.length > 0) {
      showToast(`You have ${unansweredRequired.length} unanswered required questions. Please complete all sections.`, "warning");
    }
    navigateTo("/learner/assessments/work-readiness-assessment/review-submit");
  };

  // Dynamic Overall Progress Calculation
  const answeredCount = questions.filter(q => q.isAnswered).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // Determine Active Section Tab
  const getActiveSectionIdx = () => {
    const currentSec = currentQuestion.section;
    if (currentSec === "Knowledge Check") return 0;
    if (currentSec === "Select All That Apply") return 1;
    if (currentSec === "Short Answer") return 2;
    if (currentSec === "Written Response") return 3;
    if (currentSec === "Evidence Upload") return 4;
    return 5;
  };

  const activeSectionIdx = getActiveSectionIdx();
  const activeSection = assessmentSections[activeSectionIdx] || assessmentSections[0];

  return (
    <div id="learner-assessment-attempt-root" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-950 flex flex-col antialiased">
      
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
          </div>
        </div>
      )}

      {/* DESKTOP WORKSPACE LAYOUT */}
      <div className="hidden lg:flex flex-1 min-h-screen">
        {/* Sidebar */}
        <LearnerSidebar />

        {/* Desktop Main Content Area */}
        <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-8 py-6 overflow-y-auto">
          
          {/* Top Bar */}
          <header className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            {/* Left Search Bar */}
            <div className="relative w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-slate-100/50 border border-slate-200 rounded-xl py-1.5 pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* Right User Bar */}
            <div className="flex items-center gap-4">
              <button className="relative p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setIsGuideOpen(true)}
                className="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <HelpCircle className="h-4 w-4" />
              </button>
              
              <div className="h-8 w-px bg-slate-200"></div>

              <div className="flex items-center gap-2.5">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">Aisha Mohammed</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Learner ID: SUST-LRN-0442</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
                  alt="Aisha Mohammed" 
                  className="h-9 w-9 rounded-xl object-cover ring-2 ring-emerald-50/50"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </header>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
            <span onClick={() => navigateTo("/learner/assessments")} className="hover:text-emerald-900 cursor-pointer transition-colors">
              Assessments
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")} className="hover:text-emerald-900 cursor-pointer transition-colors">
              Work Readiness Assessment
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-emerald-950 font-bold">Attempt</span>
          </div>

          {/* Grid Layout (Main Content and Right Panel) */}
          <div className="grid grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Hero & Sections Navigation & Question Cards */}
            <div className="col-span-8 space-y-5">
              
              {/* Main Assessment Hero Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                  <div className="space-y-3 flex-1">
                    {/* Status Chips */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200/50 px-2 py-0.5 rounded-md tracking-wider uppercase">
                        In Progress
                      </span>
                      <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-150 px-2 py-0.5 rounded-md tracking-wider uppercase">
                        Mixed Assessment
                      </span>
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200/80 px-2 py-0.5 rounded-md tracking-wider uppercase">
                        4 CPD Credits Pending
                      </span>
                    </div>

                    <h1 className="text-xl md:text-2xl font-extrabold text-emerald-950 tracking-tight leading-none">
                      Work Readiness Assessment
                    </h1>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-2xl">
                      Complete each required section and submit when ready for review. Ensure your progress is saved frequently.
                    </p>
                  </div>

                  {/* DESKTOP TIMER COMPONENT PLACE */}
                  <div className="w-full md:w-auto shrink-0 self-start">
                    <LearnerCountdownTimer
                      type="assessment"
                      layout="desktop-header"
                      questionProgressText={`Question ${currentIdx + 1} of ${questions.length}`}
                      onExpire={() => setShowTimeUpModal(true)}
                    />
                  </div>
                </div>

                {/* Metadata cards grid */}
                <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-100 mb-5">
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Course</p>
                    <p className="text-xs font-bold text-slate-800 truncate">Work Readiness Foundation</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Module</p>
                    <p className="text-xs font-bold text-slate-800 truncate">Preparing for Interviews</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Due Date</p>
                    <p className="text-xs font-bold text-slate-800">24 Oct 2026</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-3">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Facilitator</p>
                    <p className="text-xs font-bold text-slate-800">Halima Sani</p>
                  </div>
                </div>

                {/* Hero CTA buttons */}
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleSaveProgress}
                    className="bg-emerald-900 text-white hover:bg-emerald-800 active:bg-emerald-950 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    Save Progress
                  </Button>
                  <Button 
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}
                    variant="outline"
                    className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    Back to Instructions
                  </Button>
                </div>
              </div>

              {/* Section Navigation Tabs */}
              <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap gap-1">
                {sections.map((sec, i) => {
                  const isActive = activeSectionIdx === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIdx(sec.idx)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive 
                          ? "bg-emerald-900 text-white shadow-xs" 
                          : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      {sec.name}
                    </button>
                  );
                })}
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-2xs space-y-6">
                
                {/* Question Info Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-150 px-2 py-0.5 rounded-md tracking-wider uppercase">
                        {currentQuestion.title}
                      </span>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Question {currentQuestion.id} of {questions.length}
                      </p>
                    </div>
                  </div>
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200 rounded-lg transition-all cursor-pointer">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>

                {/* Question Text */}
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-bold text-emerald-950 leading-relaxed">
                    {currentQuestion.questionText}
                  </h3>
                  <p className="text-xs text-slate-400 italic font-medium">
                    {currentQuestion.instruction}
                  </p>
                </div>

                {/* Question Render block based on type */}
                <div className="pt-2">
                  {currentQuestion.type === "single-choice" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = currentQuestion.selectedAnswer === opt.id;
                        return (
                          <div 
                            key={opt.id}
                            onClick={() => handleOptionSelectSingle(opt.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected 
                                ? "bg-emerald-50/50 border-emerald-650 text-emerald-950" 
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-350"
                            }`}
                          >
                            <div className={`mt-0.5 h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 bg-white rounded-full"></div>}
                            </div>
                            <span className="text-xs font-semibold leading-relaxed">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {currentQuestion.type === "multi-select" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = (currentQuestion.selectedAnswers || []).includes(opt.id);
                        return (
                          <div 
                            key={opt.id}
                            onClick={() => handleOptionSelectMulti(opt.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected 
                                ? "bg-emerald-50/50 border-emerald-650 text-emerald-950" 
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-350"
                            }`}
                          >
                            <div className={`mt-0.5 h-4.5 w-4.5 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3px]" />}
                            </div>
                            <span className="text-xs font-semibold leading-relaxed">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {currentQuestion.type === "true-false" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt) => {
                        const isSelected = currentQuestion.selectedAnswer === opt.id;
                        return (
                          <div 
                            key={opt.id}
                            onClick={() => handleOptionSelectSingle(opt.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected 
                                ? "bg-emerald-50/50 border-emerald-650 text-emerald-950" 
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-350"
                            }`}
                          >
                            <div className={`mt-0.5 h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-300 bg-white"
                            }`}>
                              {isSelected && <div className="h-1.5 w-1.5 bg-white rounded-full"></div>}
                            </div>
                            <span className="text-xs font-semibold leading-relaxed">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {currentQuestion.type === "short-answer" && (
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={currentQuestion.shortAnswer || ""}
                        onChange={(e) => handleShortAnswerChange(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full max-w-lg bg-white border-2 border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none transition-all"
                      />
                    </div>
                  )}

                  {currentQuestion.type === "written-response" && (
                    <div className="space-y-2">
                      <textarea 
                        rows={6}
                        value={currentQuestion.writtenResponse || ""}
                        onChange={(e) => handleWrittenResponseChange(e.target.value)}
                        placeholder="Type your complete STAR response here (Situation, Task, Action, Result)..."
                        className="w-full bg-white border-2 border-slate-200 focus:border-emerald-600 rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none transition-all resize-none leading-relaxed"
                      />
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                        <span>Min 100 characters required</span>
                        <span>{currentQuestion.writtenResponse?.length || 0} characters</span>
                      </div>
                    </div>
                  )}

                  {currentQuestion.type === "evidence-upload" && (
                    <div className="space-y-4">
                      {currentQuestion.uploadedFile ? (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-850">{currentQuestion.uploadedFile.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{currentQuestion.uploadedFile.size}</p>
                            </div>
                          </div>
                          <button 
                            onClick={handleRemoveFile}
                            className="p-1.5 text-slate-400 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-all relative">
                          <input 
                            type="file" 
                            id="desktop-file-upload"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="flex flex-col items-center">
                            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs mb-3 text-slate-400">
                              <Upload className="h-6 w-6" />
                            </div>
                            <p className="text-xs font-bold text-slate-800">Drag & drop your evidence files here, or <span className="text-emerald-800">browse</span></p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">PDF, DOCX, or PNG files up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Action Row */}
                <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentIdx === 0}
                    variant="outline"
                    className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 disabled:opacity-50 text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1 text-slate-500" />
                    Previous
                  </Button>

                  <Button
                    onClick={handleSaveAnswer}
                    variant="outline"
                    className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Save Answer
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={currentIdx === questions.length - 1}
                    className="bg-emerald-900 text-white hover:bg-emerald-800 disabled:opacity-50 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center"
                  >
                    Next Question
                    <ChevronRight className="h-4 w-4 ml-1 text-white" />
                  </Button>
                </div>
              </div>

            </div>

            {/* Right Column: Assessment Details & Widgets */}
            <div className="col-span-4 space-y-5">
              
              {/* Assessment Progress Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Assessment Progress</h3>
                  <span className="text-sm font-extrabold text-emerald-850 font-mono">{progressPercent}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-emerald-700 h-2 rounded-full transition-all duration-350"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                {/* Progress breakdown items */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <div className="h-4.5 w-4.5 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center">
                        <Check className="h-3 w-3 text-emerald-800 stroke-[3px]" />
                      </div>
                      <span>Knowledge Check</span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-150 px-1.5 py-0.5 rounded-md">
                      COMPLETE
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <div className="h-4.5 w-4.5 rounded-full bg-amber-50 border border-amber-150 flex items-center justify-center">
                        <Activity className="h-3 w-3 text-amber-700" />
                      </div>
                      <span>Multi-select</span>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200/50 px-1.5 py-0.5 rounded-md">
                      IN PROGRESS
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                      <div className="h-4.5 w-4.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center"></div>
                      <span>Short Answer</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                      <div className="h-4.5 w-4.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center"></div>
                      <span>Written Response</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                      <div className="h-4.5 w-4.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center"></div>
                      <span>Evidence Upload</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">OPTIONAL</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Draft saved 2 minutes ago</span>
                </div>
              </div>

              {/* Question Navigator Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Question Navigator</h3>
                
                {/* 1-8 Grid */}
                <div className="grid grid-cols-4 gap-2.5">
                  {questions.map((q, idx) => {
                    const isCurrent = currentIdx === idx;
                    const isAnswered = q.isAnswered;
                    
                    let bgStyle = "bg-white border-slate-200 text-slate-700 hover:border-slate-350";
                    if (isCurrent) {
                      bgStyle = "bg-white border-2 border-emerald-700 text-emerald-900 font-bold shadow-2xs";
                    } else if (isAnswered) {
                      bgStyle = "bg-emerald-900 border-emerald-900 text-white font-bold";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 rounded-xl border flex items-center justify-center text-xs font-semibold cursor-pointer transition-all ${bgStyle}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-900"></span>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full border border-emerald-700 bg-white"></span>
                    <span>Current Question</span>
                  </div>
                </div>
              </div>

              {/* Checklist Before Submission */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Checklist Before Submission</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">Answer all required questions</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <div className="h-4.5 w-4.5 rounded-full border border-slate-300 mt-0.5 shrink-0 flex items-center justify-center"></div>
                    <span className="text-slate-500 font-medium">Complete written response</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <div className="h-4.5 w-4.5 rounded-full border border-slate-300 mt-0.5 shrink-0 flex items-center justify-center"></div>
                    <span className="text-slate-500 font-medium">Add evidence if available</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <div className="h-4.5 w-4.5 rounded-full border border-slate-300 mt-0.5 shrink-0 flex items-center justify-center"></div>
                    <span className="text-slate-500 font-medium">Confirm declaration</span>
                  </div>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Need Help?</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setIsFacilitatorModalOpen(true)}
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-800 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-emerald-800" />
                      Message Facilitator
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>

                  <button 
                    onClick={() => setIsGuideOpen(true)}
                    className="w-full p-3 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-800 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-emerald-800" />
                      Open Assessment Guide
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Low-Bandwidth Support Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Low-Bandwidth Support</h3>
                
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-700">Text-first mode</p>
                    <p className="text-[10px] text-slate-400">Suspends rich image media</p>
                  </div>
                  <button 
                    onClick={handleToggleTextFirst}
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      bandwidthMode === "text-only" ? "bg-emerald-700" : "bg-slate-200"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      bandwidthMode === "text-only" ? "translate-x-5" : "translate-x-0"
                    }`}></span>
                  </button>
                </div>

                <button 
                  onClick={() => showToast("Assessment brief download simulated in this frontend prototype.", "success")}
                  className="w-full p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-emerald-150 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Download Brief
                </button>
              </div>

              {/* Review & Submit Main Action Button */}
              <Button
                onClick={handleReviewAndSubmit}
                className="w-full py-3.5 bg-emerald-900 text-white hover:bg-emerald-800 active:bg-emerald-950 font-extrabold rounded-xl transition-all shadow-md text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Review & Submit Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

            </div>

          </div>

        </div>
      </div>

      {/* MOBILE & TABLET ASSESSMENT WORKSPACE LAYOUT */}
      <div className="lg:hidden flex-1 flex flex-col bg-slate-50 pb-36">
        
        {/* Mobile Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}
              className="p-1 text-slate-600 hover:text-slate-950 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-base font-bold text-slate-900 tracking-tight font-heading">Assessment Attempt</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg shadow-3xs transition-all">
              <Bell className="h-4.5 w-4.5" />
            </button>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
              alt="Avatar" 
              className="h-7 w-7 rounded-lg object-cover ring-2 ring-slate-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        {/* Sticky Mobile Timer Bar */}
        <LearnerCountdownTimer 
          type="assessment"
          layout="mobile-sticky"
          questionProgressText={`Question ${currentIdx + 1} of ${questions.length}`}
          onExpire={() => setShowTimeUpModal(true)}
        />

        {/* Mobile Main Contents inside padding */}
        <div className="px-4 py-4 space-y-4 flex-1">
          
          {/* Mobile Assessment Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-950 font-heading">Work Readiness Assessment</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] font-bold bg-slate-50 text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                SUST-LRN-0442
              </span>
              <span className="text-[9px] font-bold bg-emerald-50 text-emerald-850 border border-emerald-100/80 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                Mixed Assessment
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Due Date</p>
                <p className="font-semibold text-slate-800">24 Oct 2026</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">CPD Credits</p>
                <p className="font-semibold text-emerald-800">4 Credits Pending</p>
              </div>
            </div>
          </div>

          {/* Mobile Overall Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-900 font-heading">Overall Progress</span>
              <span className="font-bold text-emerald-800 font-mono text-xs">{progressPercent}%</span>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div 
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <p className="text-[11px] font-medium text-slate-500">
              Question {currentQuestion.id} of {questions.length}
            </p>
          </div>

          {/* Dynamic Section Navigation Tab Chips */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 overflow-x-auto pb-1 scrollbar-none flex gap-1.5 px-0.5">
                {assessmentSections.map((sec) => {
                  const isActive = activeSection.id === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        const firstQId = sec.questionIds[0];
                        const qIdx = questions.findIndex(q => q.id === firstQId);
                        if (qIdx !== -1) {
                          setCurrentIdx(qIdx);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                        isActive 
                          ? "bg-emerald-700 text-white border-emerald-700 shadow-2xs" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {sec.label}
                    </button>
                  );
                })}
              </div>
              
              <button 
                onClick={() => setIsBottomSheetOpen(true)}
                className="px-3 py-2 bg-white text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1 shadow-2xs transition-colors"
              >
                <span>Sections</span>
              </button>
            </div>
          </div>

          {/* Mobile Question Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-850 border border-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {activeSection.label}
              </span>
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                Question {currentQuestion.id} of {questions.length}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-1.5 pt-1">
              <h3 className="text-sm font-semibold text-slate-950 leading-relaxed">
                {currentQuestion.questionText}
              </h3>
              <p className="text-[11px] text-slate-400 italic font-medium leading-normal">
                {currentQuestion.instruction}
              </p>
            </div>

            {/* Render inputs for current Question */}
            <div className="pt-1">
              {currentQuestion.type === "single-choice" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = currentQuestion.selectedAnswer === opt.id;
                    return (
                      <button 
                        key={opt.id}
                        onClick={() => handleOptionSelectSingle(opt.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected 
                            ? "bg-emerald-50 border-emerald-300 text-slate-950 shadow-2xs" 
                            : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <div className="h-2 w-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="text-xs font-semibold leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "multi-select" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = (currentQuestion.selectedAnswers || []).includes(opt.id);
                    return (
                      <button 
                        key={opt.id}
                        onClick={() => handleOptionSelectMulti(opt.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected 
                            ? "bg-emerald-50 border-emerald-300 text-slate-950 shadow-2xs" 
                            : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 h-4.5 w-4.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-3 w-3 text-white stroke-[3px]" />}
                        </div>
                        <span className="text-xs font-semibold leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "true-false" && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = currentQuestion.selectedAnswer === opt.id;
                    return (
                      <button 
                        key={opt.id}
                        onClick={() => handleOptionSelectSingle(opt.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected 
                            ? "bg-emerald-50 border-emerald-300 text-slate-950 shadow-2xs" 
                            : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <div className="h-2 w-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="text-xs font-semibold leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "short-answer" && (
                <div className="space-y-2">
                  <textarea 
                    rows={3}
                    value={currentQuestion.shortAnswer || ""}
                    onChange={(e) => handleShortAnswerChange(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none transition-all resize-none leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-450 font-semibold px-1">
                    <span>Keep your answer concise and clear.</span>
                    <span>{currentQuestion.shortAnswer?.length || 0} characters</span>
                  </div>
                </div>
              )}

              {currentQuestion.type === "written-response" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Situation</label>
                    <textarea 
                      rows={2}
                      value={situation}
                      onChange={(e) => {
                        setSituation(e.target.value);
                        updateCombinedWrittenResponse(e.target.value, task, action, result);
                      }}
                      placeholder="What was the context or challenge?"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Task</label>
                    <textarea 
                      rows={2}
                      value={task}
                      onChange={(e) => {
                        setTask(e.target.value);
                        updateCombinedWrittenResponse(situation, e.target.value, action, result);
                      }}
                      placeholder="What was your responsibility?"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Action</label>
                    <textarea 
                      rows={2}
                      value={action}
                      onChange={(e) => {
                        setAction(e.target.value);
                        updateCombinedWrittenResponse(situation, task, e.target.value, result);
                      }}
                      placeholder="What specific actions did you take?"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Result</label>
                    <textarea 
                      rows={2}
                      value={result}
                      onChange={(e) => {
                        setResult(e.target.value);
                        updateCombinedWrittenResponse(situation, task, action, e.target.value);
                      }}
                      placeholder="What was the outcome achieved?"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none transition-all resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => showToast("Draft saved locally.", "success")}
                      className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      Save Draft
                    </button>
                    <span className="text-[10px] text-slate-450 font-semibold uppercase">
                      {(situation + task + action + result).length} chars total
                    </span>
                  </div>
                </div>
              )}

              {currentQuestion.type === "evidence-upload" && (
                <div className="space-y-3">
                  {currentQuestion.uploadedFile ? (
                    <div className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100 flex items-center justify-between shadow-3xs font-sans">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900 truncate max-w-[150px]">{currentQuestion.uploadedFile.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{currentQuestion.uploadedFile.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleRemoveFile}
                          className="text-xs font-semibold text-red-650 bg-white hover:bg-red-50 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 text-center bg-slate-50/50 hover:bg-emerald-50/10 transition-all relative">
                      <input 
                        type="file" 
                        id="mobile-file-upload-new"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center">
                        <Upload className="h-6 w-6 text-slate-400 mb-2" />
                        <p className="text-xs font-semibold text-slate-800">Tap to browse & upload evidence</p>
                        <p className="text-[10px] text-slate-500 mt-1">PDF, DOCX, or PNG (Max 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Actions inside card */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentIdx === 0}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors min-h-[40px]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={currentIdx === questions.length - 1 ? handleReviewAndSubmit : handleNext}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-850 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors min-h-[40px]"
                >
                  <span>{currentIdx === questions.length - 1 ? "Review & Submit" : "Next"}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleSaveAnswer}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer min-h-[36px]"
              >
                Save Answer
              </button>
            </div>
          </div>

          {/* Mobile Question Navigator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-semibold text-slate-900 font-heading">Question Navigator</h3>
            
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = currentIdx === idx;
                const isAnswered = q.isAnswered;
                
                let chipStyle = "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100";
                if (isCurrent) {
                  chipStyle = "bg-white border-2 border-emerald-700 text-emerald-900 font-bold shadow-2xs";
                } else if (isAnswered) {
                  chipStyle = "bg-emerald-50 border-emerald-100 text-emerald-850 font-bold";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-10 rounded-xl border flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors ${chipStyle}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-4 text-[10px] font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full border border-emerald-650 bg-white"></span>
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-200"></span>
                <span>Unanswered</span>
              </div>
            </div>
          </div>

          {/* Mobile Completion Requirements Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-semibold text-slate-900 font-heading">Completion Requirements</h3>
            
            <div className="space-y-3 text-xs text-slate-600 font-medium font-sans">
              <div className="flex items-center gap-2.5">
                <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                  answeredCount === questions.length ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300"
                }`}>
                  {answeredCount === questions.length && <Check className="h-2.5 w-2.5 stroke-[3px]" />}
                </div>
                <span>All {questions.length} questions answered ({answeredCount} of {questions.length})</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                  questions[5].isAnswered ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300"
                }`}>
                  {questions[5].isAnswered && <Check className="h-2.5 w-2.5 stroke-[3px]" />}
                </div>
                <span>Written response completed</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                  questions[6].isAnswered ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300"
                }`}>
                  {questions[6].isAnswered && <Check className="h-2.5 w-2.5 stroke-[3px]" />}
                </div>
                <span>Evidence uploaded (Optional)</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                  questions[7].isAnswered ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-300"
                }`}>
                  {questions[7].isAnswered && <Check className="h-2.5 w-2.5 stroke-[3px]" />}
                </div>
                <span>Declaration ready for review</span>
              </div>
            </div>
          </div>

          {/* Mobile Need Support Card */}
          <div className="bg-emerald-50/20 rounded-2xl border border-emerald-100 p-5 shadow-2xs space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-900 font-heading">Need Support?</h3>
              <p className="text-xs text-slate-500 font-medium">Contact your facilitator for clarification.</p>
            </div>

            {/* Facilitator Profile row */}
            <div className="bg-white border border-emerald-100/60 p-3.5 rounded-xl flex items-center justify-between shadow-3xs">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop" 
                  alt="Halima Sani" 
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-emerald-50"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left font-sans">
                  <p className="text-xs font-semibold text-slate-900">Halima Sani</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Lead Facilitator</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsFacilitatorModalOpen(true)}
                className="p-2 text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 rounded-xl border border-emerald-100 transition-colors cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <button 
                onClick={() => setIsFacilitatorModalOpen(true)}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-3xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message Facilitator</span>
              </button>

              <button 
                onClick={() => setIsGuideOpen(true)}
                className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors shadow-3xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <BookOpen className="h-4 w-4 text-emerald-700" />
                <span>Open Assessment Guide</span>
              </button>
            </div>
          </div>

          {/* Mobile Data Efficiency / Low bandwidth card */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-950 font-heading">Data Efficiency</h3>
              <p className="text-xs text-slate-500 font-medium">Working on a slow connection? Enable text-first mode to save data.</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between font-sans">
              <span className="text-xs font-semibold text-slate-800">Text-first mode</span>
              <button 
                onClick={handleToggleTextFirst}
                className={`relative inline-flex h-5.5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  bandwidthMode === "text-only" ? "bg-emerald-600" : "bg-slate-200"
                }`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                  bandwidthMode === "text-only" ? "translate-x-5.5" : "translate-x-0"
                }`}></span>
              </button>
            </div>
          </div>

        </div>

        {/* Floating Questions Button */}
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="fixed bottom-32 right-4 z-40 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 px-4 rounded-full shadow-xl flex items-center gap-1.5 border border-emerald-600 text-xs cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <FileText className="h-4 w-4" />
          <span>Questions</span>
        </button>

        {/* Mobile Sticky Bottom Action Bar */}
        <div className="fixed bottom-14 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 py-3.5 flex items-center gap-3 shadow-md">
          <button 
            onClick={handlePrevious}
            disabled={currentIdx === 0}
            className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 active:bg-slate-50 cursor-pointer min-h-[44px]"
          >
            Previous
          </button>
          <button 
            onClick={currentIdx === questions.length - 1 ? handleReviewAndSubmit : handleNext}
            className="flex-[1.5] py-3 bg-emerald-700 text-white active:bg-emerald-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer min-h-[44px]"
          >
            <span>{currentIdx === questions.length - 1 ? "Review & Submit" : "Next Question"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 h-14 flex items-center justify-around px-2 shadow-lg">
          <button 
            onClick={() => navigateTo("/learner")}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-emerald-950 cursor-pointer transition-all shrink-0"
          >
            <Compass className="h-4.5 w-4.5" />
            <span className="text-[9px] font-bold mt-1">Home</span>
          </button>
          
          <button 
            onClick={() => navigateTo("/learner/journey")}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-emerald-950 cursor-pointer transition-all shrink-0"
          >
            <Activity className="h-4.5 w-4.5" />
            <span className="text-[9px] font-bold mt-1">Journey</span>
          </button>

          <button 
            onClick={() => navigateTo("/learner/courses")}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-emerald-950 cursor-pointer transition-all shrink-0"
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span className="text-[9px] font-bold mt-1">Courses</span>
          </button>

          <button 
            onClick={() => navigateTo("/learner/assessments")}
            className="flex flex-col items-center justify-center text-emerald-800 cursor-pointer transition-all shrink-0 font-extrabold"
          >
            <GraduationCap className="h-5 w-5" />
            <span className="text-[9px] font-bold mt-0.5">Assessments</span>
          </button>

          <button 
            onClick={() => navigateTo("/learner/support")}
            className="flex flex-col items-center justify-center text-slate-400 hover:text-emerald-950 cursor-pointer transition-all shrink-0"
          >
            <HelpCircle className="h-4.5 w-4.5" />
            <span className="text-[9px] font-bold mt-1">Support</span>
          </button>
        </div>

      </div>

      {/* --- MODALS & REUSABLE SHEETS --- */}

      {/* 1. Assessment Guide Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5 animate-in scale-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-900">
                <Info className="h-5 w-5" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Assessment Guide</h3>
              </div>
              <button 
                onClick={() => setIsGuideOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-650 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed font-medium">
              <p>
                This assessment includes knowledge checks, multi-select questions, short answers, a written response, and optional evidence. Save your progress regularly and review your answers before submission.
              </p>
              <p>
                Once submitted, Halima Sani (your lead facilitator) will review your responses and assign credits. You can contact support or message the facilitator directly if you need clarification on any requirements.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button 
                onClick={() => setIsGuideOpen(false)}
                variant="outline"
                className="text-xs font-semibold px-4 py-2 bg-white border border-slate-200 rounded-xl"
              >
                Close
              </Button>
              <Button 
                onClick={() => setIsGuideOpen(false)}
                className="text-xs font-bold px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl"
              >
                Continue Assessment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Message Facilitator Modal */}
      {isFacilitatorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <form 
            onSubmit={handleSendMessage}
            className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in scale-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-900">
                <MessageSquare className="h-5 w-5" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Message Halima Sani</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsFacilitatorModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-650 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Recipient</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700">
                  Halima Sani (Lead Facilitator)
                </div>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Subject</label>
                <input 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Message</label>
                <textarea 
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  required
                  className="w-full bg-white border border-slate-200 focus:border-emerald-600 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none transition-all resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <Button 
                type="button"
                onClick={() => setIsFacilitatorModalOpen(false)}
                variant="outline"
                className="text-xs font-semibold px-4 py-2 bg-white border border-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="text-xs font-bold px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                Send Message
              </Button>
            </div>
          </form>
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
              <Button
                onClick={() => {
                  setShowTimeUpModal(false);
                  navigateTo("/learner/assessments/work-readiness-assessment/submitted");
                }}
                className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform animate-none"
              >
                Submit Saved Assessment
              </Button>
              <Button
                onClick={() => {
                  setShowTimeUpModal(false);
                  navigateTo("/learner/assessments/work-readiness-assessment/review-submit");
                }}
                variant="outline"
                className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform animate-none"
              >
                Review Saved Answers
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* LMS Simulator Control Widget */}
      <LmsSimulatorWidget />

    </div>
  );
}

// Minimal placeholder component if Compass doesn't exist/import cleanly
const Compass = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
