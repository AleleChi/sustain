import { useState, useEffect, useRef } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { StatusChip } from "../../components/ui/StatusChip";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { 
  Download, 
  HelpCircle, 
  User, 
  Menu, 
  X, 
  Check, 
  Compass, 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  FolderOpen, 
  BookOpen, 
  AlertCircle, 
  ChevronRight,
  Volume2,
  FileText,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Award,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  Pause,
  Bookmark,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Lock,
  Moon,
  Sun,
  File,
  CheckSquare,
  Square
} from "lucide-react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { useLearningState } from "../../context/LearningStateContext";
import { LmsSimulatorWidget } from "../../components/learner/LmsSimulatorWidget";
import { CourseCurriculumAccordion, SUSTAIN_CURRICULUM_DATA } from "../../components/learner/CourseCurriculumAccordion";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { motion, AnimatePresence } from "motion/react";

interface ChecklistItem {
  id: number;
  label: string;
  checked: boolean;
}

interface CommentItem {
  id: string;
  user: string;
  avatar: string;
  time: string;
  text: string;
  isYou?: boolean;
}

export default function LearnerLessonPage() {
  const { navigateTo } = useRoute();
  const { bandwidthMode, setBandwidthMode, completeLesson, completeCheckpoint, modules } = useLearningState();

  // --- Core States ---
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(() => {
    return modules.find(m => m.id === "m3")?.lessons.find(l => l.id === "m3-l4")?.completed || false;
  });
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lowBandwidthMode = bandwidthMode !== "full";

  // --- Dynamic Checklist & Progress State ---
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, label: "Read lesson introduction", checked: true },
    { id: 2, label: "Review STAR technique", checked: true },
    { id: 3, label: "Practise answers out loud", checked: false },
    { id: 4, label: "Download the template", checked: false },
  ]);

  // Derive lesson progress from checkboxes
  const checkedCount = checklist.filter(item => item.checked).length;
  const lessonProgress = 40 + (checkedCount * 15); // ranges from 40% (0 checked) to 100% (all 4 checked)

  // --- Audio Player State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(48); // Start at 0:48 for realism
  const audioDuration = 225; // 3 mins 45 secs total
  const audioRef = useRef<NodeJS.Timeout | null>(null);

  // --- Practice Form States ---
  const [starSituation, setStarSituation] = useState("");
  const [starTask, setStarTask] = useState("");
  const [starAction, setStarAction] = useState("");
  const [starResult, setStarResult] = useState("");

  // --- Notes State ---
  const [notesText, setNotesText] = useState(
    "Must remember to mention the cassava yield improvement project during the 'Action' part of STARE. Added 2 hours ago"
  );
  const [isNotesSaved, setIsNotesSaved] = useState(true);

  // --- Interactive Transcripts accordion ---
  const [transcriptExpanded, setTranscriptExpanded] = useState(false);

  // --- Discussions state ---
  const [discussions, setDiscussions] = useState<CommentItem[]>([
    {
      id: "disc-1",
      user: "Emeka K.",
      avatar: "EK",
      time: "2h ago",
      text: "The STAR technique really helped me in my mock interview today! My agribusiness answers sounded much more structured.",
    }
  ]);
  const [newComment, setNewComment] = useState("");

  // --- Handle Audio playback simulation ---
  useEffect(() => {
    if (isPlaying) {
      audioRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= audioDuration) {
            setIsPlaying(false);
            if (audioRef.current) clearInterval(audioRef.current);
            return audioDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (audioRef.current) {
        clearInterval(audioRef.current);
      }
    }
    return () => {
      if (audioRef.current) clearInterval(audioRef.current);
    };
  }, [isPlaying]);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Toast helper
  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  // Checkbox toggle handler
  const handleToggleChecklist = (id: number) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
    showToast("Progress updated.", "success");
  };

  // Load agribusiness model STAR reply
  const handleLoadTemplate = () => {
    setStarSituation("During my internship at the Kano Agri-Cooperative, we had a major delay in logging weekly cassava processing metrics because our core spreadsheets required heavy cell data downloads.");
    setStarTask("My task was to create an alternative lightweight, text-based log sheet so processing hubs could submit data without expensive high-bandwidth connections.");
    setStarAction("I designed a SMS-friendly reporting template and set up a basic offline markdown form that saved progress locally in standard text formats.");
    setStarResult("This cut submission delays by 4 days each week and ensured 100% data compliance from all local hubs, saving the cooperative over ₦45,000 in cellular data vouchers.");
    
    // Automatically check "Practise answers out loud"
    setChecklist(prev => 
      prev.map(item => item.id === 3 ? { ...item, checked: true } : item)
    );

    showToast("STAR cassava agribusiness example loaded into workspace.", "success");
  };

  // Save practice answers
  const handleSavePractice = () => {
    if (!starSituation.trim() || !starTask.trim() || !starAction.trim() || !starResult.trim()) {
      showToast("Please write content for Situation, Task, Action, and Result first.", "warning");
      return;
    }
    // Update checklist
    setChecklist(prev => 
      prev.map(item => item.id === 3 ? { ...item, checked: true } : item)
    );
    showToast("Practice answers autosaved to your student profile.", "success");
  };

  // Clear practice drafts
  const handleClearPractice = () => {
    setStarSituation("");
    setStarTask("");
    setStarAction("");
    setStarResult("");
    showToast("Workspace cleared.", "info");
  };

  // Submit cohort comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: CommentItem = {
      id: `disc-${Date.now()}`,
      user: "Aisha Mohammed",
      avatar: "AM",
      time: "Just now",
      text: newComment.trim(),
      isYou: true
    };

    setDiscussions(prev => [...prev, comment]);
    setNewComment("");
    showToast("Comment published to Kano Cohort-02.", "success");
  };

  // Low bandwidth mode toggle action
  const handleToggleBandwidth = (active: boolean) => {
    setBandwidthMode(active ? "text-only" : "full");
    if (active) {
      setIsPlaying(false);
      showToast("Low-Bandwidth Mode: High-media previews and offline downloads suspended.", "warning");
    } else {
      showToast("Standard Mode: Offline files and streaming fully activated.", "success");
    }
  };

  // Complete lesson finalizer
  const handleMarkComplete = () => {
    setIsCompleteModalOpen(true);
  };

  const handleConfirmComplete = () => {
    setIsLessonCompleted(true);
    // Mark remaining checkboxes
    setChecklist(prev => prev.map(item => ({ ...item, checked: true })));
    setIsCompleteModalOpen(false);
    completeLesson("m3", "m3-l4");
    completeCheckpoint("m3"); // Ensure checkpoint is completed too
    showToast("Lesson completed! You can now access checkpoints and assignments.", "success");
  };

  const handleScrollToChecklist = () => {
    const checklistSection = document.getElementById("lesson-checklist-section");
    if (checklistSection) {
      checklistSection.scrollIntoView({ behavior: "smooth" });
      showToast("Scrolled to checklist.", "info");
    } else {
      showToast("Checklist is in the sidebar details.", "info");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative antialiased text-slate-800">
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-11/12 bg-slate-900 text-white rounded-xl shadow-lg px-4 py-3 border border-slate-800 text-xs flex items-center gap-2.5 justify-between"
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />}
              {toast.type === "info" && <Sparkles className="h-4.5 w-4.5 text-sky-400 shrink-0" />}
              {toast.type === "warning" && <AlertCircle className="h-4.5 w-4.5 text-amber-400 shrink-0" />}
              <span className="font-semibold leading-snug">{toast.message}</span>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== DESKTOP & TABLET LANDSCAPE VIEWPORT ==================== */}
      <div className="hidden md:flex flex-1 min-h-screen">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-64 border-r border-slate-200 bg-white shrink-0">
          <LearnerSidebar />
        </div>

        {/* Desktop Main Content Column */}
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Header Bar */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              {/* Compact Back navigation button for Tablet viewport when sidebar is hidden */}
              <button 
                onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
                className="lg:hidden p-1.5 hover:bg-slate-50 text-slate-600 hover:text-emerald-950 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-bold shrink-0"
              >
                <ArrowLeft className="h-4 w-4 text-emerald-800" />
                <span>Curriculum</span>
              </button>

              <div className="flex items-center gap-3 w-64 md:w-80 lg:w-96 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-50 transition-colors">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search courses, learning materials..." 
                  className="w-full text-xs focus:outline-hidden bg-transparent placeholder:text-slate-400 text-slate-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button onClick={() => showToast("Pathway status is synchronized.", "info")} className="p-1.5 text-slate-500 hover:text-emerald-900 rounded-lg transition-colors relative cursor-pointer">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-600 border border-white" />
              </button>
              <button onClick={() => showToast("Low bandwidth toggle option in mobile section.", "info")} className="p-1.5 text-slate-500 hover:text-emerald-900 rounded-lg transition-colors cursor-pointer">
                <HelpCircle className="h-5 w-5" />
              </button>
              
              <div className="h-px w-6 bg-slate-200" />
              
              <div className="flex items-center gap-3 text-left">
                <div>
                  <p className="text-xs font-bold text-slate-800">Aisha Mohammed</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Kano Learner • Cohort 02</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center border-2 border-emerald-50 shadow-sm">
                  AM
                </div>
              </div>
            </div>
          </header>

          {/* Breadcrumb Section */}
          <div className="px-8 pt-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigateTo("/learner")}>Dashboard</span>
              <ChevronRight className="h-3 w-3 text-slate-300" />
              <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigateTo("/learner/courses")}>My Courses</span>
              <ChevronRight className="h-3 w-3 text-slate-300" />
              <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}>Work Readiness Foundation</span>
              <ChevronRight className="h-3 w-3 text-slate-300" />
              <span className="text-emerald-800 font-extrabold">Preparing for Interviews</span>
            </div>
          </div>

          {/* Core Layout Container */}
          <main className="flex-1 px-6 md:px-8 pt-6 pb-24 max-w-7xl w-full mx-auto space-y-6 lg:space-y-8">
            
            {/* Hero Banner Card */}
            <Card className="p-6 border-slate-200 bg-white rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between gap-6 shadow-xs hover:border-slate-200 transition-none w-full">
              <div className="space-y-4 max-w-lg z-10 relative flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100">
                    Module 3: Workplace Communication
                  </span>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-150">
                    Lesson 3 of 4
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900 leading-tight font-heading">Preparing for Interviews</h2>
                  <p className="text-xs text-slate-650 mt-1.5 leading-relaxed font-medium">
                    Build a clear interview answer using the STAR method and practise how to explain your agribusiness experience with confidence.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    20 Min Est.
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <Award className="h-3.5 w-3.5 text-emerald-700" />
                    2.5 CPD Credits
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button 
                    onClick={() => {
                      setIsPlaying(true);
                      showToast("Audio lesson streaming initialized.", "success");
                      const audioSection = document.getElementById("audio-lesson-section");
                      if (audioSection) audioSection.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 px-6 rounded-xl cursor-pointer border-none shadow-xs"
                  >
                    Continue Lesson
                  </Button>
                  <Button 
                    onClick={() => showToast("Simulating offline summary PDF download...", "success")}
                    variant="outline"
                    className="border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Summary
                  </Button>
                </div>
              </div>

              {/* Right side: Lesson Status Card */}
              <div className="hidden md:flex flex-col justify-between p-4.5 bg-emerald-50/40 border border-emerald-100 rounded-xl w-60 shrink-0 z-10 relative">
                <div className="space-y-1">
                  <span className="text-[9px] font-semibold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Active Study Session
                  </span>
                  <p className="text-xs font-semibold text-slate-800 pt-1.5">Aisha Mohammed</p>
                  <p className="text-[10px] text-slate-500 font-medium">Kano Cohort • ID: 0442</p>
                </div>
                <div className="pt-3 border-t border-emerald-100 flex justify-between items-center text-[10px] font-bold text-slate-600">
                  <span>CPD Value:</span>
                  <span className="text-emerald-800 font-semibold">2.5 Credits</span>
                </div>
              </div>

              {/* Right cap graphical background */}
              <div className="absolute right-6 bottom-4 text-emerald-900/5 select-none pointer-events-none transform translate-y-2 translate-x-2">
                <GraduationCap className="h-48 w-48" />
              </div>
            </Card>

            {/* Dynamic Metric Grid */}
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Lesson Progress</p>
                <p className="text-sm font-semibold text-slate-800">{lessonProgress}%</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Active Time</p>
                <p className="text-sm font-semibold text-slate-800">12m</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Materials</p>
                <p className="text-sm font-semibold text-slate-800">4 / 4</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Audio Mode</p>
                <p className="text-sm font-semibold text-emerald-800">Active</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Assessment</p>
                <p className="text-sm font-semibold text-amber-700">Unlocked</p>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-center space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">CPD Weight</p>
                <p className="text-sm font-semibold text-slate-800">2.5 Credits</p>
              </div>
            </div>

            {/* Split Content Columns (Left/Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
              {/* Left Column (2 Span): Primary Learning Desk */}
              <div className="md:col-span-2 space-y-6 lg:space-y-8 text-left">

              {/* 1. Core Learning Concepts Section */}
              <Card className="p-6 border-slate-200 bg-white rounded-2xl space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 font-heading">
                    <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-850 flex items-center justify-center font-bold text-xs">1</span>
                    Core Learning Concepts
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">What you should understand before completing the activity.</p>
                </div>

                {/* Sub section 1 */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-heading">1. Understand the interview purpose</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    An interview is a conversation about your skills, values, and ability to solve real workplace problems. In agribusiness roles, employers want clear examples that show practical thinking and reliability.
                  </p>
                  
                  {/* Quote card */}
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl border-l-4 border-l-emerald-800">
                    <p className="text-xs text-emerald-950 font-bold italic leading-relaxed">
                      “Use a real example to show how your experience can solve the employer’s current problem.”
                    </p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Sub section 2 STAR */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-heading">2. Structure your answer with STAR</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Use the STAR method to keep your answer clear and focused.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 hover:border-emerald-200 rounded-xl space-y-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded uppercase">S</span>
                      <h5 className="font-extrabold text-xs text-slate-900 mt-1 font-heading">Situation</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Briefly explain the setting.</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 hover:border-emerald-200 rounded-xl space-y-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded uppercase">T</span>
                      <h5 className="font-extrabold text-xs text-slate-900 mt-1 font-heading">Task</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Describe what you needed to do.</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 hover:border-emerald-200 rounded-xl space-y-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded uppercase">A</span>
                      <h5 className="font-extrabold text-xs text-slate-900 mt-1 font-heading">Action</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Explain the steps you took.</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 hover:border-emerald-200 rounded-xl space-y-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded uppercase">R</span>
                      <h5 className="font-extrabold text-xs text-slate-900 mt-1 font-heading">Result</h5>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Share the outcome or improvement.</p>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Sub section 3 clarity */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-heading">3. Practise clear answers</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Take your time, avoid unnecessary jargon, and focus on what you did, why it mattered, and what changed as a result.
                  </p>
                </div>
              </Card>

              {/* 2. Interactive Audio Lesson & Transcript Side-by-Side */}
              <div id="audio-lesson-section" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Audio Lesson Player widget */}
                <Card className="p-5 border-slate-200 bg-white rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Multimedia Desk</span>
                    <h4 className="text-sm font-semibold text-slate-900">Audio Lecture Summary</h4>
                  </div>

                  {/* Player area */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="h-11 w-11 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="h-5.5 w-5.5 fill-current" /> : <Play className="h-5.5 w-5.5 fill-current translate-x-0.5" />}
                      </button>
                      
                      <div className="flex-1 space-y-1.5 text-left">
                        <p className="text-xs font-bold text-slate-800 truncate">S03E12: Agribusiness Interview Confidence</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Format: Low-Bandwidth MP3 Audio</p>
                      </div>
                    </div>

                    {/* Progress timeline */}
                    <div className="space-y-1">
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden relative cursor-pointer" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        setCurrentTime(Math.floor(percent * audioDuration));
                      }}>
                        <div 
                          className="h-full bg-emerald-700 transition-all duration-300" 
                          style={{ width: `${(currentTime / audioDuration) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(audioDuration)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => showToast("Downloading mp3 compression log...", "success")}
                    variant="outline"
                    className="w-full text-xs font-bold py-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer"
                  >
                    Download Compact Audio (3.2 MB)
                  </Button>
                </Card>

                {/* Quick Transcript widget */}
                <Card className="p-5 border-slate-200 bg-white rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Text Transcript</span>
                    <h4 className="text-sm font-semibold text-slate-900">Lecture Transcript Preview</h4>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 line-clamp-4 leading-relaxed font-medium">
                    "Welcome Kano cohort students to Session 12. In this lecture, we dissect practical agribusiness role interview standards. We examine structural situation contexts, cassavas yield log templates, cooperative conflict behaviors, and critical remote backup protocols to ensure full preparedness..."
                  </div>

                  <Button
                    onClick={() => {
                      setTranscriptExpanded(!transcriptExpanded);
                      showToast("Transcript expanded below core lesson layout.", "info");
                    }}
                    variant="outline"
                    className="w-full text-xs font-bold py-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer"
                  >
                    {transcriptExpanded ? "Collapse Full Transcript" : "Read Full Transcript"}
                  </Button>
                </Card>

              </div>

              {/* Full Expanded Transcript Panel */}
              <AnimatePresence>
                {transcriptExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <Card className="p-6 border-slate-200 bg-white rounded-2xl space-y-3">
                      <h4 className="text-sm font-semibold text-slate-900 uppercase">Complete Lecture Transcript</h4>
                      <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
                        <p>
                          <strong>[0:00] Facilitator Halima Sani:</strong> "Hello everyone and welcome to Module 3, Lesson 3. Preparing for interviews can feel incredibly daunting, but today we are simplifying the entire process using our structured STARE model."
                        </p>
                        <p>
                          <strong>[1:15]</strong> "When an agricultural cooperative recruiter asks you: 'Tell me about a project where you solved a significant harvest bottleneck,' they do not want a 15-minute history of farming. They want to hear exactly what situation you encountered, what task was assigned, what specific technical action you personally executed, and what clear business results occurred."
                        </p>
                        <p>
                          <strong>[2:30]</strong> "If you can quantify your result - for example, telling them you saved 10 hours of manual logging labor or cut seedling spoilage by 20% - you instantly stand out as an outcome-driven professional."
                        </p>
                        <p>
                          <strong>[3:15]</strong> "We'll also look at backup plans. Remote calls in areas with unstable data grids require planning. Make sure to quit all heavy updates, log in 10 minutes early, and always have your text-only summaries ready as fallback options."
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3. Resource Library Section */}
              <Card className="p-6 border-slate-200 bg-white rounded-2xl space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 font-heading">
                    <FolderOpen className="h-5 w-5 text-emerald-800" />
                    Resource Library
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">Download materials for offline study.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-3.5 bg-white border border-slate-200 hover:border-emerald-200 rounded-xl flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs group">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-2 bg-slate-50 group-hover:bg-emerald-50 rounded-lg text-slate-500 group-hover:text-emerald-800 shrink-0 transition-colors">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div className="truncate text-left">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 font-heading truncate">Lesson Summary</p>
                        <p className="text-[10px] text-slate-400 font-bold font-mono">PDF • 1.2 MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Resource download simulated in this frontend prototype.", "success")}
                      className="p-1.5 text-slate-400 hover:text-emerald-900 rounded-lg cursor-pointer shrink-0 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-3.5 bg-white border border-slate-200 hover:border-emerald-200 rounded-xl flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs group">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-2 bg-slate-50 group-hover:bg-emerald-50 rounded-lg text-slate-500 group-hover:text-emerald-800 shrink-0 transition-colors">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div className="truncate text-left">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 font-heading truncate">STAR Template Worksheet</p>
                        <p className="text-[10px] text-slate-400 font-bold font-mono">DOCX • 450 KB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Resource download simulated in this frontend prototype.", "success")}
                      className="p-1.5 text-slate-400 hover:text-emerald-900 rounded-lg cursor-pointer shrink-0 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-3.5 bg-white border border-slate-200 hover:border-emerald-200 rounded-xl flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs group">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-2 bg-slate-50 group-hover:bg-emerald-50 rounded-lg text-slate-500 group-hover:text-emerald-800 shrink-0 transition-colors">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div className="truncate text-left">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 font-heading truncate">Full Session Transcript</p>
                        <p className="text-[10px] text-slate-400 font-bold font-mono">PDF • 800 KB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Resource download simulated in this frontend prototype.", "success")}
                      className="p-1.5 text-slate-400 hover:text-emerald-900 rounded-lg cursor-pointer shrink-0 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-3.5 bg-white border border-slate-200 hover:border-emerald-200 rounded-xl flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs group">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-2 bg-slate-50 group-hover:bg-emerald-50 rounded-lg text-slate-500 group-hover:text-emerald-800 shrink-0 transition-colors">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <div className="truncate text-left">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 font-heading truncate">Interview Handout Checklist</p>
                        <p className="text-[10px] text-slate-400 font-bold font-mono">PDF • 3.5 MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Resource download simulated in this frontend prototype.", "success")}
                      className="p-1.5 text-slate-400 hover:text-emerald-900 rounded-lg cursor-pointer shrink-0 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>

              {/* Limited Connectivity Warning */}
              <div className="p-5 bg-blue-50/40 border border-blue-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm font-heading">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Limited Connectivity?</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Switch to text-only mode or download the offline learning pack.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-start sm:justify-end">
                  <button
                    onClick={() => showToast("Offline pack download simulated in this frontend prototype.", "success")}
                    className="bg-white hover:bg-slate-50 text-slate-755 border border-slate-200 font-bold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer shadow-xs transition-colors"
                  >
                    Download Offline Pack
                  </button>
                  <button
                    onClick={() => handleToggleBandwidth(!lowBandwidthMode)}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-1.5 px-3.5 rounded-lg border-none cursor-pointer shadow-xs transition-colors"
                  >
                    {lowBandwidthMode ? "Full Mode" : "Switch Mode"}
                  </button>
                </div>
              </div>

              {/* Lesson Completion Action Card */}
              <div className="pt-2">
                {!isLessonCompleted ? (
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-xs">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-slate-900">Ready to complete this lesson?</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Mark this lesson complete when you have reviewed the STAR technique and are ready for the checkpoint.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                      <Award className="h-4 w-4 text-emerald-850 shrink-0" />
                      <span className="text-xs text-slate-600 font-medium">Contributes to course progress and CPD credits.</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <Button 
                        onClick={handleMarkComplete}
                        className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl border-none cursor-pointer shadow-sm active:scale-[0.98] transition-all"
                      >
                        Mark Lesson Complete
                      </Button>
                      <Button 
                        onClick={handleScrollToChecklist}
                        variant="outline"
                        className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl cursor-pointer"
                      >
                        Review Lesson Checklist
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-white border border-emerald-100 rounded-2xl text-left space-y-4 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/20">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-emerald-900">Lesson completed</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Your progress has been saved locally in this frontend prototype. Continue to the checkpoint when you are ready.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                      <Button 
                        onClick={() => navigateTo("/learner/checkpoints/interview-preparation/review")}
                        className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 px-5 rounded-xl border-none cursor-pointer shadow-sm flex-1 text-center"
                      >
                        Start Checkpoint
                      </Button>
                      <Button 
                        onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                        variant="outline"
                        className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer flex-1 text-center"
                      >
                        Open Assessment
                      </Button>
                      <Button 
                        onClick={() => navigateTo("/learner/journey")}
                        variant="outline"
                        className="border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer flex-1 text-center"
                      >
                        View CPD Record
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Steps Pathway Card */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-xs">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Next Steps</h3>
                  <p className="text-xs text-slate-500 mt-1">Continue your pathway after this lesson.</p>
                </div>

                <div className="space-y-3">
                  {/* Row 1: Lesson Checkpoint */}
                  <div 
                    onClick={() => navigateTo("/learner/checkpoints/interview-preparation/review")}
                    className="p-3.5 bg-white border border-slate-100 hover:border-emerald-100 rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Lesson Checkpoint</h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">Test your understanding of the STAR method structures.</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </div>

                  {/* Row 2: Work Readiness Assessment */}
                  <div 
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                    className="p-3.5 bg-white border border-slate-100 hover:border-emerald-100 rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Work Readiness Assessment</h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">Complete your module milestone assignment.</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </div>

                  {/* Row 3: Interview Practice Clinic */}
                  <div 
                    onClick={() => navigateTo("/learner/live-sessions")}
                    className="p-3.5 bg-white border border-slate-100 hover:border-emerald-100 rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Interview Practice Clinic</h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">Join our next active virtual simulation with Halima.</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </div>

                  {/* Row 4: Offline Centre */}
                  <div 
                    onClick={() => navigateTo("/learner/offline")}
                    className="p-3.5 bg-white border border-slate-100 hover:border-emerald-100 rounded-xl flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                        <Download className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Offline Centre</h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">Access and sync downloaded materials.</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

            {/* Right Column (1 Span): Metadata Widgets & Sidebars */}
            <div className="md:col-span-1 space-y-6 lg:space-y-8 text-left">
              
              {/* Card 1: Course Progress */}
              <Card className="p-5 border-slate-200 bg-white rounded-2xl text-left space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-900">Course Progress</h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">Work Readiness Foundation</p>
                </div>

                <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                    <span>Overall Syllabus Progress</span>
                    <span className="text-emerald-800">70% Completed</span>
                  </div>
                  <ProgressBar value={70} />
                  <p className="text-[10px] text-slate-500 font-medium leading-normal pt-1">
                    You have successfully completed 12 of 15 lessons in this course pathway.
                  </p>
                </div>

                {/* Lesson Checklist (Smooth Scroll Target) */}
                <div id="lesson-checklist-section" className="space-y-3 pt-1 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-800">Lesson Checklist</span>
                    <Button
                      onClick={() => {
                        setChecklist(prev => prev.map(item => ({ ...item, checked: true })));
                        showToast("All items marked complete.", "success");
                      }}
                      variant="outline"
                      className="text-[9px] font-semibold py-0.5 px-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                    >
                      All Complete
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {checklist.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => handleToggleChecklist(item.id)}
                        className="flex items-start gap-2.5 p-2 bg-slate-50/50 hover:bg-slate-50 rounded-lg cursor-pointer select-none transition-colors border border-slate-100"
                      >
                        {item.checked ? (
                          <CheckSquare className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-[11px] font-medium leading-tight ${item.checked ? "text-slate-400 line-through font-medium" : "text-slate-700"}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Course Syllabus Roadmap</span>
                  <CourseCurriculumAccordion
                    course={SUSTAIN_CURRICULUM_DATA}
                    highlightedRoute="/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews"
                    compact={true}
                  />
                </div>
              </Card>

              {/* Card 2: CPD Impact */}
              <Card className="p-5 border-slate-200 bg-white rounded-2xl text-left space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-900">CPD Impact</h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">Sustain LMS Learning Pathway</p>
                </div>

                <div className="p-3.5 bg-emerald-50/40 border border-emerald-100 rounded-xl flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Award className="h-5.5 w-5.5" />
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 font-semibold leading-none">Lesson Value</p>
                    <p className="text-xs font-bold text-slate-800 mt-1">2.5 CPD Credits Eligible</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-600">
                    <span>Pathway Credits Earned</span>
                    <span className="text-emerald-800 font-bold">24.5 / 50 (49%)</span>
                  </div>
                  <ProgressBar value={49} />
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                  *CPD credits progress has been simulated locally in this prototype. Official certificates and credit validations are finalized by your project cohort facilitator.
                </p>
              </Card>

              {/* Card 3: Materials */}
              <Card className="p-5 border-slate-200 bg-white rounded-2xl text-left space-y-3.5">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Materials</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">Syllabus Handouts & Guides</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                    4 Files
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 hover:border-emerald-150 rounded-xl flex items-center justify-between gap-3 group transition-all">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 text-emerald-800 shrink-0" />
                      <div className="truncate text-left">
                        <p className="text-xs font-semibold text-slate-800 truncate">Interview_Checklist.pdf</p>
                        <p className="text-[9px] text-slate-400 font-semibold">PDF • 1.2 MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Downloading Interview_Checklist.pdf...", "success")}
                      className="p-1 text-slate-450 hover:text-emerald-800 shrink-0 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="p-2.5 bg-slate-50 border border-slate-200 hover:border-emerald-150 rounded-xl flex items-center justify-between gap-3 group transition-all">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 text-emerald-800 shrink-0" />
                      <div className="truncate text-left">
                        <p className="text-xs font-semibold text-slate-800 truncate">STAR_Method_Template.docx</p>
                        <p className="text-[9px] text-slate-400 font-semibold">DOCX • 450 KB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Downloading STAR_Method_Template.docx...", "success")}
                      className="p-1 text-slate-450 hover:text-emerald-800 shrink-0 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Card>

              {/* Card 4: Offline Access */}
              <Card className="p-5 border-slate-200 bg-white rounded-2xl text-left space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Offline Access</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">Study without cellular data</p>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Synced
                  </span>
                </div>

                {/* Low Bandwidth Toggle */}
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between gap-3 border border-slate-100">
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-800">Low-Bandwidth Mode</p>
                    <p className="text-[9px] text-slate-500 leading-tight mt-0.5">Disable audio streams and heavy layouts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                    <input 
                      type="checkbox" 
                      checked={lowBandwidthMode}
                      onChange={(e) => handleToggleBandwidth(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-800"></div>
                  </label>
                </div>

                <Button
                  onClick={() => showToast("Offline pack download initiated.", "success")}
                  variant="outline"
                  className="w-full text-xs font-semibold py-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer"
                >
                  Download Offline Pack
                </Button>

                {/* Student Takeaway Notes */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-800">My Study Notes</span>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase">Autosaved</span>
                  </div>
                  <textarea 
                    value={notesText}
                    onChange={(e) => {
                      setNotesText(e.target.value);
                      setIsNotesSaved(false);
                    }}
                    onBlur={() => {
                      setIsNotesSaved(true);
                      showToast("Notes backup saved locally.", "success");
                    }}
                    placeholder="Type key interview points here..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-700 focus:outline-none focus:border-emerald-800 focus:bg-white placeholder:text-slate-450 font-medium"
                    rows={3}
                  />
                </div>
              </Card>

              {/* Card 5: Support */}
              <Card className="p-5 border-slate-200 bg-white rounded-2xl text-left space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-semibold text-slate-900">Support</h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">Kano Cohort Halima Sani</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center font-bold text-slate-600">
                    HS
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">Halima Sani</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Course Facilitator</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-left border border-slate-100">
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-semibold">
                    <span>Musa B. asked</span>
                    <span>4h ago</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal font-medium">Can we use the STAR method for non-technical questions as well?</p>
                  <p className="text-[10px] text-emerald-900 bg-emerald-50/50 p-2 rounded border-l-2 border-emerald-800 leading-relaxed font-medium">
                    <strong>Halima Sani:</strong> Yes, it works for any question that asks for a real-life example. Focus on results!
                  </p>
                </div>

                <Button
                  onClick={() => navigateTo("/learner/support")}
                  className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2 rounded-xl border-none cursor-pointer text-center block"
                >
                  Ask Halima a Question
                </Button>
              </Card>

            </div>

            </div>

          </div>

          </main>

          {/* Sticky Mark Complete Action Bar */}
          {!isLessonCompleted && (
            <footer className="sticky bottom-0 bg-white border-t border-slate-200 py-4 px-6 md:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20 shadow-lg animate-in fade-in slide-in-from-bottom duration-200">
              <div className="text-left space-y-0.5">
                <h4 className="text-sm font-semibold text-slate-900 font-heading">Ready to finish?</h4>
                <p className="text-xs text-slate-500 font-medium">
                  Mark this lesson as complete to update your progress and unlock the next step.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-[10px] text-slate-500 font-medium text-right sm:text-left max-w-xs leading-normal">
                  Completing this lesson contributes to your course progress and CPD readiness.
                </span>
                <Button 
                  onClick={handleMarkComplete}
                  className="text-xs font-semibold py-2.5 px-6 bg-emerald-950 hover:bg-emerald-900 text-white rounded-xl border-none cursor-pointer shadow-sm active:scale-[0.98] transition-all whitespace-nowrap"
                >
                  Mark Lesson Complete
                </Button>
              </div>
            </footer>
          )}

        </div>
      </div>

      {/* ==================== MOBILE & PORTRAIT VIEWPORT ==================== */}
      <div className="md:hidden flex flex-col flex-1 pb-36 bg-slate-50">
        
        {/* Mobile Navbar Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
              className="p-1 text-slate-600 hover:text-emerald-900 rounded-lg cursor-pointer transition-colors"
            >
              <ArrowLeft className="h-5.5 w-5.5" />
            </button>
            <h1 className="text-sm font-semibold text-slate-900">Lesson</h1>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setBookmarked(!bookmarked);
                showToast(bookmarked ? "Bookmark removed." : "Lesson added to personal bookmarks shelf.", "success");
              }}
              className="p-1.5 text-slate-500 hover:text-emerald-900 cursor-pointer"
            >
              <Bookmark className={`h-5 w-5 ${bookmarked ? "text-emerald-800 fill-current" : ""}`} />
            </button>
            <button 
              onClick={() => showToast("Pathway status is synchronized.", "info")} 
              className="p-1.5 text-slate-500 hover:text-emerald-900 relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-700" />
            </button>
            <div className="h-7 w-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px] ml-1">
              AM
            </div>
          </div>
        </header>

        {/* Mobile Page Content Grid */}
        <div className="max-w-xl mx-auto px-4 py-5 space-y-5 flex-1 overflow-y-auto text-left">
          
          {/* Pathway Badges / Modules */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-extrabold uppercase tracking-wider bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded border border-slate-250">
              Work Readiness Foundation
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100">
              Module 4
            </span>
          </div>

          {/* Title Area */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-950 leading-tight">Preparing for Interviews</h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold pt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                15 mins
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-emerald-700" />
                2.5 CPD Credits
              </span>
            </div>
          </div>

          {/* Core Action buttons */}
          <div className="space-y-2.5">
            <Button
              onClick={() => {
                setIsPlaying(true);
                showToast("Lecture audio played.", "success");
              }}
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer border-none shadow-xs text-center block"
            >
              Continue Lesson
            </Button>
          </div>

          {/* Double Grid metrics */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">My Progress</p>
              <p className="text-xs font-extrabold text-slate-800">{lessonProgress}% Completed</p>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                <div className="h-full bg-emerald-800" style={{ width: `${lessonProgress}%` }} />
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Materials Included</p>
              <p className="text-xs font-extrabold text-slate-800">4 Files (PDF, DOCX)</p>
              <p className="text-[9px] text-slate-500 font-medium leading-tight mt-1.5">Syllabus transcript & logs</p>
            </div>
          </div>

          {/* Standard Reading card: The STAR Technique */}
          <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-1.5">
              The STAR Technique
            </h3>
            
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              When answering behavioral interview questions, the STAR method is your most powerful tool. It allows you to provide concrete evidence of your skills in a structured, easy-to-follow narrative.
            </p>

            {/* Quote block */}
            <div className="p-3 bg-emerald-50/40 border border-emerald-100 border-l-4 border-l-emerald-800 rounded-r-lg">
              <p className="text-xs text-emerald-950 font-semibold italic">
                "Tell me about a time you handled a difficult situation in a previous role."
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              In Nigeria's competitive agribusiness sector, employers value practical problem-solving. Use local examples from your internship or family farm experience to ground your answers.
            </p>
          </Card>

          {/* Interactive STAR/STARE Practice Form */}
          <Card className="p-4 border-slate-200 bg-white space-y-4 rounded-xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase">Interactive Workspace</h3>
                <p className="text-[10px] text-slate-400 font-medium">Draft your STAR response response</p>
              </div>
              <Button
                onClick={handleLoadTemplate}
                variant="outline"
                className="text-[9px] font-semibold py-1 px-2 border-emerald-250 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg cursor-pointer"
              >
                Load Agribusiness Example
              </Button>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-900 block uppercase">Situation</span>
                <span className="text-[9px] text-slate-400 block leading-tight">Describe theSetting (e.g. Cooperative crop delay)</span>
                <textarea 
                  value={starSituation}
                  onChange={(e) => setStarSituation(e.target.value)}
                  placeholder="Where and when did this happen? What crop issue did you face?"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50/30 font-medium"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-900 block uppercase">Task</span>
                <span className="text-[9px] text-slate-400 block leading-tight">What was expected of you Specifically?</span>
                <textarea 
                  value={starTask}
                  onChange={(e) => setStarTask(e.target.value)}
                  placeholder="Explain what challenges you needed to overcome."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50/30 font-medium"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-900 block uppercase">Action</span>
                <span className="text-[9px] text-slate-400 block leading-tight">What did you do? Describe your individual effort</span>
                <textarea 
                  value={starAction}
                  onChange={(e) => setStarAction(e.target.value)}
                  placeholder="Outline step-by-step actions you executed."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50/30 font-medium"
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-900 block uppercase">Result</span>
                <span className="text-[9px] text-slate-400 block leading-tight">What was the outcome? Highlight savings/metrics</span>
                <textarea 
                  value={starResult}
                  onChange={(e) => setStarResult(e.target.value)}
                  placeholder="Quantify positive results (₦ saved, days cut)."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50/30 font-medium"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <Button
                onClick={handleClearPractice}
                variant="outline"
                className="w-full text-xs font-bold py-1.5 border border-slate-250 text-slate-700 rounded-lg cursor-pointer"
              >
                Clear Draft
              </Button>
              <Button
                onClick={handleSavePractice}
                className="w-full bg-emerald-900 text-white font-bold text-xs py-1.5 border-none rounded-lg cursor-pointer"
              >
                Save Practice
              </Button>
            </div>
          </Card>

          {/* Audio Lecture widget */}
          <Card className="p-4 border-slate-200 bg-white space-y-3 rounded-xl">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-9 w-9 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs border-none"
              >
                {isPlaying ? <Pause className="h-4.5 w-4.5 fill-current" /> : <Play className="h-4.5 w-4.5 fill-current translate-x-0.5" />}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Audio Summary Lecture</p>
                <p className="text-[10px] text-slate-400 font-bold font-mono">Duration: 03:45 mins</p>
              </div>
            </div>

            {/* Slider bar */}
            <div className="space-y-1 pt-1">
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-800" style={{ width: `${(currentTime / audioDuration) * 100}%` }} />
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-mono font-bold">
                <span>{formatTime(currentTime)}</span>
                <span>03:45</span>
              </div>
            </div>

            {/* View Full Transcript Accordion */}
            <div className="border-t border-slate-100 pt-2">
              <button 
                onClick={() => setTranscriptExpanded(!transcriptExpanded)}
                className="w-full flex items-center justify-between text-[11px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer border-none bg-transparent"
              >
                <span>View Full Text Transcript</span>
                {transcriptExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {transcriptExpanded && (
                <div className="mt-2 text-[11px] text-slate-600 leading-relaxed font-medium space-y-1.5 p-2 bg-slate-50 rounded-lg">
                  <p>"Welcome Kano cohort to Lesson 12. We are practicing behavioral structured storytelling today using STAR parameters so you can impress agriculture recruiters. Emphasize 상황 (Situation), 과제 (Task), 행동 (Action), 결과 (Result)..."</p>
                </div>
              )}
            </div>
          </Card>

          {/* Resources Downloads section */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Class Handouts</span>
            <div className="space-y-2">
              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 truncate">
                  <File className="h-4.5 w-4.5 text-emerald-800" />
                  <div className="truncate text-left">
                    <p className="text-xs font-bold text-slate-800 truncate">Interview_Checklist.pdf</p>
                    <p className="text-[9px] text-slate-400 font-mono">Size: 1.2 MB</p>
                  </div>
                </div>
                <button 
                  onClick={() => showToast("Downloading Interview_Checklist.pdf...", "success")}
                  className="p-1.5 text-slate-500 hover:text-emerald-900 cursor-pointer shrink-0"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 truncate">
                  <File className="h-4.5 w-4.5 text-emerald-800" />
                  <div className="truncate text-left">
                    <p className="text-xs font-bold text-slate-800 truncate">STAR_Method_Template.docx</p>
                    <p className="text-[9px] text-slate-400 font-mono">Size: 850 KB</p>
                  </div>
                </div>
                <button 
                  onClick={() => showToast("Downloading STAR_Method_Template.docx...", "success")}
                  className="p-1.5 text-slate-500 hover:text-emerald-900 cursor-pointer shrink-0"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Your Notes Autosave */}
          <Card className="p-4 border-slate-200 bg-white space-y-3 rounded-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-semibold text-slate-900 uppercase">My Takeaway Notes</h3>
              <span className="text-[9px] text-slate-400 font-bold uppercase font-mono tracking-wider">Autosaved</span>
            </div>
            <textarea 
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Type your notes here..."
              className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-700 bg-slate-50/50 focus:outline-hidden font-medium"
              rows={3}
            />
          </Card>

          {/* Action Checklist card */}
          <Card className="p-4 border-emerald-200 bg-white space-y-3 rounded-xl border-l-4">
            <h3 className="text-xs font-semibold text-slate-900 uppercase">Action Checklist</h3>
            <div className="space-y-2">
              {checklist.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleToggleChecklist(item.id)}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  {item.checked ? (
                    <CheckSquare className="h-4 w-4 text-emerald-800 shrink-0" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-300 shrink-0" />
                  )}
                  <span className={`text-xs font-bold ${item.checked ? "text-slate-500 line-through font-semibold" : "text-slate-800"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Work Readiness Assignment mandatory card */}
          <Card className="p-4 bg-emerald-900 text-white space-y-3.5 rounded-xl text-left">
            <div className="space-y-1">
              <span className="text-[8px] font-semibold tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded uppercase font-mono inline-block">
                REQUIRED
              </span>
              <h4 className="text-sm font-semibold text-emerald-50">Work Readiness Assignment</h4>
              <p className="text-[11px] text-emerald-100/90 leading-relaxed font-medium">
                Submit your drafted agribusiness STAR response for immediate review by your facilitator.
              </p>
            </div>
            <Button
              onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
              className="w-full bg-white text-emerald-950 font-semibold text-xs py-2 rounded-lg cursor-pointer border-none block text-center"
            >
              Start Assessment
            </Button>
          </Card>

          {/* CPD Credits Card */}
          <Card className="p-3.5 border-slate-200 bg-white flex items-center gap-3 rounded-xl">
            <span className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-850 flex items-center justify-center shrink-0">
              <Award className="h-5.5 w-5.5" />
            </span>
            <div className="text-left">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">CPD Weight</p>
              <p className="text-xs font-extrabold text-slate-800">2.5 Credits Eligible</p>
            </div>
          </Card>

          {/* Course Roadmap progress list */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Course Syllabus Roadmap</span>
            <CourseCurriculumAccordion
              course={SUSTAIN_CURRICULUM_DATA}
              highlightedRoute="/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews"
              compact={true}
            />
          </div>

          {/* Up Next syllabus item */}
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl space-y-1">
            <p className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">UP NEXT</p>
            <h4 className="text-xs font-semibold text-slate-800 mt-1">Negotiating Your First Salary</h4>
            <p className="text-[10px] text-slate-500 leading-normal font-medium">Learn the salary benchmarks for entry-level agribusiness roles in Lagos and Abuja.</p>
          </div>

          {/* Facilitator Card */}
          <Card className="p-4 border-slate-200 bg-white space-y-3.5 rounded-xl text-center">
            <div className="flex items-center gap-3 text-left">
              <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-slate-50 shrink-0 flex items-center justify-center font-bold text-slate-600">
                HS
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">Halima Sani</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Course Facilitator</p>
              </div>
            </div>
            <Button
              onClick={() => showToast("Opening help desk support ticket chat...", "info")}
              variant="outline"
              className="w-full text-xs font-bold py-1.5 border border-emerald-700 hover:bg-emerald-50 text-emerald-800 rounded-lg cursor-pointer text-center"
            >
              Ask a Question
            </Button>
          </Card>

          {/* Cohort Discussion threads */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Discussion Board ({discussions.length})</span>
              <span className="text-emerald-800 hover:underline cursor-pointer" onClick={() => navigateTo("/learner/community")}>See All</span>
            </div>

            <Card className="p-4 border-slate-200 bg-white space-y-4 rounded-xl">
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {discussions.map(disc => (
                  <div key={disc.id} className="p-2.5 bg-slate-50 rounded-lg space-y-1 text-xs">
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
                      <span className="font-bold text-slate-700">{disc.user}</span>
                      <span className="font-mono">{disc.time}</span>
                    </div>
                    <p className="text-slate-600 font-medium">{disc.text}</p>
                  </div>
                ))}
              </div>

              {/* Submit comment form */}
              <form onSubmit={handleAddComment} className="flex gap-2 border-t border-slate-100 pt-3">
                <input 
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask cohort or share insight..."
                  className="flex-1 text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden text-slate-800 font-medium bg-slate-50/50"
                />
                <Button 
                  type="submit"
                  className="bg-emerald-900 text-white font-bold text-xs px-3 py-2 border-none rounded-lg cursor-pointer shrink-0"
                >
                  Send
                </Button>
              </form>
            </Card>
          </div>

          {/* Low Bandwidth toggler option */}
          <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800">Low-Bandwidth Mode</p>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5 font-medium">Images and autoplay audio are disabled to save data costs.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
              <input 
                type="checkbox" 
                checked={lowBandwidthMode}
                onChange={(e) => handleToggleBandwidth(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-850"></div>
            </label>
          </div>

          {/* Mobile Lesson Completion Action Card */}
          <div className="pt-2">
            {!isLessonCompleted ? (
              <div className="p-5 bg-white border border-slate-200 rounded-xl text-left space-y-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 shrink-0">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-900">Ready to complete this lesson?</h3>
                    <p className="text-[11px] text-slate-650 leading-relaxed">
                      Mark this lesson complete when you have reviewed the STAR technique and are ready for the checkpoint.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg">
                  <Award className="h-3.5 w-3.5 text-emerald-850 shrink-0" />
                  <span className="text-[11px] text-slate-600 font-medium">Contributes to course progress and CPD credits.</span>
                </div>

                <div className="flex flex-col gap-2.5 pt-0.5">
                  <Button 
                    onClick={handleMarkComplete}
                    className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl border-none cursor-pointer shadow-sm active:scale-[0.98] transition-all"
                  >
                    Mark Lesson Complete
                  </Button>
                  <Button 
                    onClick={handleScrollToChecklist}
                    variant="outline"
                    className="w-full border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl cursor-pointer"
                  >
                    Review Lesson Checklist
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-white border border-emerald-100 rounded-xl text-left space-y-4 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/20">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shrink-0">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-emerald-900">Lesson completed</h3>
                    <p className="text-[11px] text-slate-650 leading-relaxed">
                      Your progress has been saved locally in this frontend prototype. Continue to the checkpoint when you are ready.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <Button 
                    onClick={() => navigateTo("/learner/checkpoints/interview-preparation/review")}
                    className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl border-none cursor-pointer shadow-sm text-center"
                  >
                    Start Checkpoint
                  </Button>
                  <Button 
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                    variant="outline"
                    className="border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl cursor-pointer text-center"
                  >
                    Open Assessment
                  </Button>
                  <Button 
                    onClick={() => navigateTo("/learner/journey")}
                    variant="outline"
                    className="border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl cursor-pointer text-center"
                  >
                    View CPD Record
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Next Steps Pathway Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-xl text-left space-y-4 shadow-xs">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Next Steps</h3>
              <p className="text-xs text-slate-500 mt-0.5">Continue your pathway after this lesson.</p>
            </div>

            <div className="space-y-2.5">
              {/* Row 1: Lesson Checkpoint */}
              <div 
                onClick={() => navigateTo("/learner/checkpoints/interview-preparation/review")}
                className="p-3 bg-white border border-slate-100 hover:border-emerald-100 rounded-lg flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Lesson Checkpoint</h4>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">Test STAR technique understanding.</p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>

              {/* Row 2: Work Readiness Assessment */}
              <div 
                onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                className="p-3 bg-white border border-slate-100 hover:border-emerald-100 rounded-lg flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Work Readiness Assessment</h4>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">Complete module assessment.</p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>

              {/* Row 3: Interview Practice Clinic */}
              <div 
                onClick={() => navigateTo("/learner/live-sessions")}
                className="p-3 bg-white border border-slate-100 hover:border-emerald-100 rounded-lg flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Interview Practice Clinic</h4>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">Join active live virtual simulation.</p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>

              {/* Row 4: Offline Centre */}
              <div 
                onClick={() => navigateTo("/learner/offline")}
                className="p-3 bg-white border border-slate-100 hover:border-emerald-100 rounded-lg flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Download className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">Offline Centre</h4>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">Access downloaded materials.</p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Sticky Action Bar */}
        {!isLessonCompleted && (
          <div className="fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-md md:hidden animate-in fade-in slide-in-from-bottom duration-200">
            <div className="text-left min-w-0">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Active Lesson</p>
              <p className="text-xs font-semibold text-slate-900 truncate max-w-[150px]">Preparing for Interviews</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                onClick={() => {
                  setIsPlaying(true);
                  showToast("Lecture audio streaming resumed.", "success");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2 rounded-xl border border-slate-200 shadow-none cursor-pointer"
              >
                Continue
              </Button>
              <Button
                onClick={handleMarkComplete}
                className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs px-4 py-2 rounded-xl border-none shadow-sm cursor-pointer"
              >
                Complete
              </Button>
            </div>
          </div>
        )}

        {/* Sticky Mobile Nav bar */}
        <LearnerMobileNav />
      </div>

      {/* ==================== COMPLETE CONFIRMATION DIALOG MODAL ==================== */}
      <AnimatePresence>
        {isCompleteModalOpen && (
          <div className="fixed inset-0 bg-slate-950/60 z-50 flex items-center justify-center p-4 antialiased">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center space-y-5"
            >
              <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                <Check className="h-7 w-7" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-900 leading-snug font-heading">Mark lesson complete?</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  This will update your lesson progress and unlock the next step in this prototype.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  onClick={() => setIsCompleteModalOpen(false)}
                  variant="outline"
                  className="w-full text-xs font-bold py-2 border border-slate-250 text-slate-705 hover:bg-slate-50 rounded-xl cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmComplete}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2 rounded-xl border-none cursor-pointer"
                >
                  Mark Complete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simulator Widget for visual verification */}
      <LmsSimulatorWidget />
    </div>
  );
}
