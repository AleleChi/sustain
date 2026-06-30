import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { StatusChip } from "../../components/ui/StatusChip";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { 
  Play, 
  Calendar, 
  CheckCircle2, 
  Download, 
  MessageSquare, 
  HelpCircle, 
  FileText,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LogOut,
  BookOpen,
  Zap,
  Check,
  Compass,
  Lock,
  User,
  ArrowRight,
  Shield,
  Activity,
  Info,
  X,
  Award,
  AlertCircle,
  Video,
  WifiOff
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { AppMobileHeader } from "../../components/navigation/AppMobileHeader";

export function LearnerDashboardPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  // Shared Learner Context
  const learner = {
    name: "Aisha Mohammed",
    id: "SUST-LRN-0442",
    programme: "SUSTAIN CPD Programme",
    pathway: "Youth Employability Pathway",
    organisation: "Kano Youth Skills Hub",
    cohort: "Kano Youth Employability Cohort 02",
    facilitator: "Halima Sani"
  };

  // Global Actions & Routes Handler
  const handleAction = (route: string) => {
    navigateTo(route as any);
  };

  const handleDownload = (fileName: string) => {
    showToast(`Download started in this frontend prototype.`, "success");
  };

  // -------------------------------------------------------------------------
  // REUSABLE SECTIONS / CARDS
  // -------------------------------------------------------------------------

  // Hero Section
  const DashboardHero = () => (
    <Card id="dashboard-hero" className="bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch text-left">
        {/* Left Area */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Active Learner
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {learner.pathway}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-semibold tracking-tight">Welcome back, {learner.name}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Continue your <span className="text-emerald-900">SUSTAIN LMS</span> learning pathway
            </h1>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xl">
              Pick up your current lesson, continue your assignment, and review certificate-linked progress.
            </p>
          </div>

          {/* Context row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Learner ID</p>
              <p className="text-slate-900 mt-0.5 font-medium">{learner.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Cohort</p>
              <p className="text-slate-900 mt-0.5 font-medium leading-relaxed">{learner.cohort}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Facilitator</p>
              <p className="text-emerald-800 font-semibold mt-0.5">{learner.facilitator}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Programme</p>
              <p className="text-slate-900 mt-0.5 font-medium leading-relaxed">{learner.pathway}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
              className="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-3 px-6 rounded-xl transition-all cursor-pointer shadow-xs text-center justify-center flex items-center"
            >
              Continue Lesson
            </Button>
            <Button
              onClick={() => handleAction("/learner/assessments/work-readiness-assessment")}
              variant="outline"
              className="w-full sm:w-auto border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold text-xs py-3 px-5 rounded-xl transition-all cursor-pointer text-center justify-center flex items-center"
            >
              Open Assessment
            </Button>
          </div>
        </div>

        {/* Right Deep Green Panel */}
        <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 p-6 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[250px] md:min-h-[280px] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-800/60 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 h-24 bg-emerald-800/40 rounded-full blur-lg pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-[11px] font-bold text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded-md inline-block">
              Today’s focus
            </span>
            <h4 className="text-lg font-bold text-white leading-tight">
              Preparing for Interviews
            </h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
              Continue the interview lesson and complete your draft for the Work Readiness Assignment.
            </p>
          </div>

          <div className="relative z-10 space-y-4 pt-4 mt-4 border-t border-emerald-100/20">
            <div className="flex items-center justify-between text-xs text-emerald-200/90 font-semibold">
              <span>68% lesson progress</span>
              <span>Assignment draft started</span>
            </div>

            <Button
              onClick={() => handleAction("/learner/journey")}
              variant="custom"
              className="w-full h-12 md:h-14 px-6 bg-white text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-100 hover:shadow-md active:bg-emerald-100 font-semibold rounded-xl inline-flex items-center justify-center gap-2 border border-white/70 shadow-xs transition-all duration-150 relative z-10 cursor-pointer focus:outline-hidden"
              aria-label="Continue Youth Employability Pathway"
            >
              <Play className="h-[18px] w-[18px] text-emerald-800 fill-current shrink-0" />
              <span>Continue Pathway</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  // Summary Cards Section
  const DashboardSummaryCards = () => (
    <div id="dashboard-summary-cards" className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      {/* 1. Course Progress */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Course Progress</span>
          <p className="text-xl font-bold text-emerald-850 font-sans">42%</p>
          <span className="text-[11px] text-slate-500 font-medium block">Work Readiness Foundation</span>
        </div>
        <LearnerContextHint
          title="What this means"
          text="Course progress is simulated in this frontend prototype and shows current lesson completion within your assigned pathway."
          align="right"
        />
      </Card>

      {/* 2. Current Lesson Progress */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Current Lesson</span>
          <p className="text-xl font-bold text-slate-800 font-sans">68%</p>
          <span className="text-[11px] text-slate-500 font-medium block truncate">Preparing for Interviews</span>
        </div>
      </Card>

      {/* 3. CPD Credits */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">CPD Credits</span>
          <p className="text-xl font-bold text-slate-800 font-sans">22 of 35</p>
          <span className="text-[11px] text-slate-500 font-medium block">4 pending review</span>
        </div>
        <LearnerContextHint
          title="How this works"
          text="Confirmed CPD credits count toward your SUSTAIN CPD Programme record. Pending credits depend on assessment review."
          align="right"
        />
      </Card>

      {/* 4. Certificate Status */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Certificate Status</span>
          <p className="text-sm font-bold text-amber-700">Ready for Review</p>
          <span className="text-[11px] text-slate-500 font-medium block">Not issued yet</span>
        </div>
        <LearnerContextHint
          title="Helpful note"
          text="Your certificate is not issued yet. It can move forward after required assessment review and CPD checks are complete."
          align="right"
        />
      </Card>
    </div>
  );

  // Continue Learning Focus
  const ContinueLearningFocus = () => (
    <div id="continue-learning-section" className="space-y-4 text-left">
      <div className="px-1">
        <h3 className="text-base font-bold text-slate-900 tracking-tight font-heading">Continue Learning</h3>
        <p className="text-xs text-slate-500 font-medium font-sans">Your next recommended step in the learner workspace.</p>
      </div>

      <Card 
        id="continue-learning-focus" 
        className="p-5 md:p-6 bg-white border border-slate-200 shadow-sm rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all duration-200 ease-out"
      >
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-5 md:gap-6 items-stretch">
            {/* Left Content Area */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100">
                <BookOpen className="h-5.5 w-5.5 md:h-6 md:w-6" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base md:text-lg font-bold text-slate-900 font-heading tracking-tight leading-tight">
                    Preparing for Interviews
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Lesson in progress
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 font-medium font-sans">
                  <span>Work Readiness Foundation</span>
                  <span className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span className="text-emerald-700 font-bold">68% complete</span>
                </div>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans pt-1">
                  Practise clear interview answers using examples from your learning, work, volunteering, or community experience.
                </p>
              </div>
            </div>

            {/* Right Metadata Panel */}
            <div className="flex flex-col text-xs text-slate-600 gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-100/50 w-full lg:w-auto justify-center">
              <span className="flex items-center gap-2 font-medium font-sans">
                <Calendar className="h-4 w-4 text-emerald-800 shrink-0" />
                18 min lesson
              </span>
              <span className="flex items-center gap-2 font-medium font-sans">
                <FileText className="h-4 w-4 text-emerald-800 shrink-0" />
                Reading and practice
              </span>
              <span className="flex items-center gap-2 font-medium font-sans">
                <Award className="h-4 w-4 text-emerald-800 shrink-0" />
                Linked assignment
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4 border-t border-slate-100">
            <Button 
              onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
              className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors duration-150"
            >
              <Play className="h-3 w-3 fill-current" />
              Continue Lesson
            </Button>
            <Button 
              onClick={() => handleAction("/learner/low-bandwidth")}
              variant="outline"
              className="bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800 font-semibold text-xs py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center transition-colors duration-150"
            >
              <span className="inline md:hidden">Text-First</span>
              <span className="hidden md:inline">Text-First Version</span>
            </Button>
            <Button 
              onClick={() => handleAction("/learner/community")}
              variant="outline"
              className="bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-800 font-semibold text-xs py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center transition-colors duration-150"
            >
              <span className="inline md:hidden">Discussion</span>
              <span className="hidden md:inline">Open Discussion</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  // Current Assignment Card
  const CurrentAssignmentCard = () => (
    <Card id="current-assignment-card" className="p-6 bg-white border border-slate-200 shadow-xs rounded-2xl text-left space-y-4 transition-all duration-200 ease-out hover:border-emerald-200">
      <div>
        <h3 className="text-base font-semibold text-slate-900 tracking-tight">Work Readiness Assignment</h3>
        <p className="text-xs text-slate-500 font-medium">Cohort 02 written portfolio</p>
      </div>

      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-semibold text-slate-900">Work Readiness Assignment</h4>
            <div className="text-xs font-medium text-slate-500 space-y-0.5">
              <p>Cohort 02 written portfolio</p>
              <p className="text-amber-700 font-semibold">Due 24 Oct 2026</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Draft started
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Facilitator review required
              </span>
              <LearnerContextHint
                title="How this works"
                text="A facilitator reviews the submitted task before related CPD credits can be confirmed."
                align="right"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 bg-white border border-slate-200 p-3.5 rounded-lg text-left">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Portfolio compilation progress</span>
            <span className="font-bold text-emerald-800">50%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1">
            <div className="bg-emerald-700 h-full rounded-full" style={{ width: "50%" }} />
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed pt-1">
            Include STAR method interview drafts and practice examples before final submission to Halima Sani.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-3 border-t border-slate-100">
          <Button 
            onClick={() => handleAction("/learner/assessments/work-readiness-assessment")}
            className="w-full sm:w-auto bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs h-10 px-5 rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-xs"
          >
            Continue Assessment
          </Button>
          <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto sm:items-center">
            <Button 
              onClick={() => handleAction("/learner/assessments/work-readiness-assessment")}
              variant="outline"
              className="w-full sm:w-auto h-10 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 font-semibold text-xs rounded-xl flex items-center justify-center transition-all cursor-pointer text-center"
            >
              View Requirements
            </Button>
            <Button 
              onClick={() => handleAction("/learner/support")}
              variant="outline"
              className="w-full sm:w-auto h-10 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 font-semibold text-xs rounded-xl flex items-center justify-center transition-all cursor-pointer text-center"
            >
              Open Support
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  // Pathway Snapshot
  const PathwaySnapshot = () => {
    const steps = [
      { id: 1, title: "1. Digital Readiness Basics", status: "Completed", detail: "8 CPD credits", isCompleted: true, isInProgress: false },
      { id: 2, title: "2. Workplace Communication", status: "Completed", detail: "6 CPD credits", isCompleted: true, isInProgress: false },
      { id: 3, title: "3. Work Readiness Foundation", status: "In progress", detail: "8 confirmed credits", isCompleted: false, isInProgress: true },
      { id: 4, title: "4. Work Readiness Assignment", status: "Draft started", detail: "4 CPD pending", isCompleted: false, isInProgress: false, isDraft: true },
      { id: 5, title: "5. Certificate Review", status: "Pending review", detail: "Awaiting assessment review", isCompleted: false, isInProgress: false, isPending: true },
      { id: 6, title: "6. Certificate Issue", status: "Locked", detail: "Awaiting certificate review", isCompleted: false, isInProgress: false, isLocked: true }
    ];

    return (
      <Card id="pathway-snapshot" className="p-6 bg-white border border-slate-200 shadow-xs rounded-2xl text-left space-y-4 transition-all duration-200 ease-out hover:border-emerald-200">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">Pathway Snapshot</h3>
          <p className="text-xs text-slate-500 font-medium">Your current place in the Youth Employability Pathway.</p>
        </div>

        <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 pt-2 ml-2">
          {steps.map((st) => (
            <div key={st.id} className="relative">
              <span className={`absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full border-2 border-white flex items-center justify-center shadow-xs ${
                st.isCompleted 
                  ? "bg-emerald-600" 
                  : st.isInProgress 
                  ? "bg-amber-500" 
                  : st.isDraft 
                  ? "bg-amber-500"
                  : st.isPending
                  ? "bg-slate-300"
                  : "bg-slate-200"
              }`}>
                {st.isCompleted ? (
                  <Check className="h-2.5 w-2.5 text-white" />
                ) : st.isLocked ? (
                  <Lock className="h-2 w-2 text-slate-500" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              <div className="space-y-0.5 text-left">
                <p className={`text-xs font-bold ${st.isLocked ? "text-slate-400" : "text-slate-900"}`}>{st.title}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <span className={`${
                    st.isCompleted 
                      ? "text-emerald-700 font-semibold" 
                      : st.isInProgress 
                      ? "text-amber-700 font-semibold" 
                      : st.isDraft 
                      ? "text-amber-700 font-semibold"
                      : "text-slate-400"
                  }`}>{st.status}</span>
                  <span className="text-slate-200">—</span>
                  <span className="text-slate-500">{st.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100">
          <Button 
            onClick={() => handleAction("/learner/journey")}
            className="bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98] text-center justify-center flex items-center"
          >
            View My Journey
          </Button>
          <Button 
            onClick={() => handleAction("/learner/certificates/work-readiness-certificate")}
            variant="outline"
            className="border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer text-center justify-center flex items-center"
          >
            View Certificate Track
          </Button>
        </div>
      </Card>
    );
  };

  // Quick Access Module
  const QuickAccessModule = () => {
    const items = [
      {
        title: "My Journey",
        subtitle: "Track your pathway progress.",
        route: "/learner/journey",
        icon: Compass,
        iconBg: "bg-blue-50 text-blue-700 border-blue-100",
      },
      {
        title: "My Courses",
        subtitle: "Open assigned courses and modules.",
        route: "/learner/courses",
        icon: BookOpen,
        iconBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
      },
      {
        title: "Current Lesson",
        subtitle: "Continue Preparing for Interviews.",
        route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews",
        icon: Play,
        iconBg: "bg-amber-50 text-amber-700 border-amber-100",
      },
      {
        title: "Assessment",
        subtitle: "Continue your Work Readiness Assignment.",
        route: "/learner/assessments/work-readiness-assessment",
        icon: FileText,
        iconBg: "bg-purple-50 text-purple-700 border-purple-100",
      },
      {
        title: "Live Session",
        subtitle: "View Interview Practice Clinic.",
        route: "/learner/live-sessions/interview-practice-clinic",
        icon: Video,
        iconBg: "bg-rose-50 text-rose-700 border-rose-100",
      },
      {
        title: "CPD Record",
        subtitle: "Check certificate readiness.",
        route: "/learner/cpd-record",
        icon: Award,
        iconBg: "bg-indigo-50 text-indigo-700 border-indigo-100",
      },
      {
        title: "Offline Centre",
        subtitle: "Manage downloads and pending sync.",
        route: "/learner/offline",
        icon: WifiOff,
        iconBg: "bg-cyan-50 text-cyan-700 border-cyan-100",
      },
      {
        title: "Support",
        subtitle: "Ask for help or message facilitator.",
        route: "/learner/support",
        icon: MessageSquare,
        iconBg: "bg-teal-50 text-teal-700 border-teal-100",
      }
    ];

    return (
      <div className="space-y-4 text-left">
        <div className="px-1">
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">Quick Access</h3>
          <p className="text-xs text-slate-500 font-medium">Jump to the next important parts of your learning pathway.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={item.title}
                onClick={() => handleAction(item.route)}
                className="p-3 bg-white border border-slate-200 shadow-xs rounded-2xl flex items-center justify-between gap-3 hover:border-emerald-200 hover:shadow-sm transition-all duration-150 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${item.iconBg}`}>
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="text-xs font-semibold text-slate-900 group-hover:text-emerald-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-[9px] text-slate-400 font-medium leading-tight truncate max-w-[120px]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Card>
            );
          })}
        </div>
        
        {/* Mobile Action Sheet Trigger button */}
        <div className="block md:hidden pt-1">
          <Button
            onClick={() => setIsMoreActionsOpen(true)}
            variant="outline"
            className="w-full bg-white text-emerald-850 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 font-semibold text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Zap className="h-3.5 w-3.5" />
            More Actions
          </Button>
        </div>
      </div>
    );
  };

  // Live Session Reminder Component
  const LiveSessionReminder = () => (
    <Card className="p-5 bg-white border border-slate-200 shadow-xs rounded-2xl text-left transition-all duration-200 hover:border-emerald-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-3.5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl flex items-center justify-center shrink-0">
            <Video className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Upcoming Live Session</h3>
            <p className="text-[11px] text-slate-500 font-medium">Interview Practice Clinic</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-100 px-2.5 py-0.5 rounded-full">
          Attendance required
        </span>
      </div>

      <div className="py-3.5 space-y-2 text-xs text-slate-600">
        <p className="font-medium leading-relaxed">
          Interactive workshop on video interview etiquette, STAR response formatting, and peer feedback with Halima Sani.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            Today, 2:00 PM - 3:30 PM (WAT)
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-slate-400" />
            Facilitator: Halima Sani
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg text-center">
          Attendance pending facilitator confirmation
        </span>
        <Button
          onClick={() => handleAction("/learner/live-sessions/interview-practice-clinic")}
          className="bg-emerald-750 hover:bg-emerald-850 text-white font-semibold text-xs py-2 h-9 px-4 rounded-xl cursor-pointer text-center justify-center flex items-center"
        >
          Join Clinic
        </Button>
      </div>
    </Card>
  );

  // Connectivity Optimization Card
  const OfflineLowBandwidthPrompt = () => (
    <Card className="p-5 bg-slate-50 border border-slate-200 shadow-xs rounded-2xl text-left space-y-3.5 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-16 h-16 bg-emerald-500/5 rounded-full blur-md pointer-events-none" />
      
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0">
          <Zap className="h-4.5 w-4.5 text-emerald-700" />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Connectivity Optimization</h3>
          <p className="text-sm font-semibold text-slate-800 leading-none mt-1">Low-Bandwidth & Offline Mode</p>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-medium">
        Studying on a weak or unstable connection? Prioritize text lesson delivery or access downloaded resource packs without any internet.
      </p>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <Button 
          onClick={() => handleAction("/learner/low-bandwidth")}
          variant="outline"
          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center shadow-xs"
        >
          Low-Bandwidth Portal
        </Button>
        <Button 
          onClick={() => handleAction("/learner/offline")}
          className="bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center shadow-xs"
        >
          Offline Centre
        </Button>
      </div>
    </Card>
  );

  // Recommended Resources
  const RecommendedResources = () => {
    const resources = [
      {
        id: "lw-reading",
        title: "Low-Bandwidth Reading Version",
        helper: "Open a lightweight reading version of the current lesson.",
        format: "Text version",
        action: "Open",
        route: "/learner/resources/low-bandwidth-reading-version"
      },
      {
        id: "summary-pdf",
        title: "Preparing for Interviews Summary",
        helper: "Download a short summary of the lesson.",
        format: "PDF summary",
        action: "Download"
      },
      {
        id: "assignment-guide",
        title: "Work Readiness Assignment Guide",
        helper: "Review the guide before submitting your assignment.",
        format: "Assignment guide",
        action: "Download"
      }
    ];

    return (
      <Card id="recommended-resources" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Recommended Resources</h3>
            <p className="text-xs text-slate-500 font-medium">Materials linked to your current lesson and assessment.</p>
          </div>
          <Button 
            onClick={() => handleAction("/learner/resources")}
            variant="outline"
            className="text-xs font-bold border-slate-200 text-emerald-800 hover:bg-emerald-50/50 hover:border-emerald-300 py-1.5 px-3 rounded-xl cursor-pointer"
          >
            Open Resources
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((res, index) => (
            <div 
              key={res.id} 
              className={`p-4 rounded-2xl flex flex-col justify-between shadow-xs transition-all duration-200 border ${
                index === 0 
                  ? "border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/30 hover:border-emerald-300" 
                  : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/10"
              }`}
            >
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 leading-tight">{res.title}</h4>
                <p className="text-xs text-slate-500 leading-normal font-medium">{res.helper}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {res.format}
                </span>
                <Button
                  onClick={() => {
                    if (res.route) {
                      handleAction(res.route);
                    } else {
                      handleDownload(res.title);
                    }
                  }}
                  variant="outline"
                  className="text-xs font-semibold py-1.5 px-3 bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl transition-colors cursor-pointer"
                >
                  {res.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Community and Practice
  const CommunityAndPractice = () => (
    <Card id="community-and-practice" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200">
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Community & Practice</h3>
        <p className="text-xs text-slate-500 font-medium">Use guided discussion and practice activities to strengthen your learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/10 transition-all duration-200 h-full text-left cursor-pointer group">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 shrink-0">
              <MessageSquare className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 pt-1 group-hover:text-emerald-900">Interview preparation discussion</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Practise common interview questions with facilitator guidance.
            </p>
          </div>
          <Button 
            onClick={() => handleAction("/learner/community/interview-preparation-discussion")}
            variant="outline"
            className="w-full text-xs font-semibold py-2 mt-4 bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl transition-colors cursor-pointer"
          >
            Open Discussion
          </Button>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/10 transition-all duration-200 h-full text-left cursor-pointer group" >
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 shrink-0">
              <Compass className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 pt-1 group-hover:text-emerald-900">Practice answer activity</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Use the lesson workspace to write a short interview answer.
            </p>
          </div>
          <Button 
            onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
            variant="outline"
            className="w-full text-xs font-semibold py-2 mt-4 bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl transition-colors cursor-pointer"
          >
            Open Lesson
          </Button>
        </div>

        {/* Card 3 */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 hover:bg-emerald-50/10 transition-all duration-200 h-full text-left cursor-pointer group">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 shrink-0">
              <HelpCircle className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 pt-1 group-hover:text-emerald-900">Ask facilitator</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Use support if you need help with the assignment or certificate readiness.
            </p>
          </div>
          <Button 
            onClick={() => handleAction("/learner/support")}
            variant="outline"
            className="w-full text-xs font-semibold py-2 mt-4 bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl transition-colors cursor-pointer"
          >
            Open Support
          </Button>
        </div>
      </div>
    </Card>
  );

  // Recent Learner Activity
  const RecentLearnerActivity = () => {
    const activities = [
      { id: 1, label: "Lesson opened", context: "Preparing for Interviews", time: "Today", isPrimary: true },
      { id: 2, label: "Assessment draft saved", context: "Work Readiness Assignment", time: "Today", isPrimary: false },
      { id: 3, label: "Resource opened", context: "Low-Bandwidth Reading Version", time: "Yesterday", isPrimary: false },
      { id: 4, label: "Support response received", context: "Certificate readiness request", time: "Yesterday", isPrimary: false },
      { id: 5, label: "CPD record viewed", context: "Work Readiness Certificate", time: "2 days ago", isPrimary: false }
    ];

    return (
      <Card id="recent-learner-activity" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Learner Activity</h3>
          <p className="text-xs text-slate-500 font-medium">Recent updates from your learning activity.</p>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div key={act.id} className="flex items-center justify-between p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl hover:bg-emerald-50/30 hover:border-emerald-100 transition-all duration-150 text-left">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full shrink-0 ${act.isPrimary ? "bg-emerald-600" : "bg-slate-300"}`} />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">{act.label}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{act.context}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Right Column 1: Today’s Status
  const TodayStatusCard = () => (
    <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 space-y-4">
      <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
        Today’s Status
      </h3>
      
      <div className="space-y-3.5 text-xs">
        <div>
          <p className="text-xs text-slate-500 font-medium">Current course</p>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">Work Readiness Foundation</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">Current lesson</p>
          <p className="text-sm font-semibold text-emerald-800 mt-0.5">Preparing for Interviews</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">Lesson progress</p>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">68%</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">Assessment</p>
          <p className="text-sm font-semibold text-amber-800 mt-0.5">Draft started</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">Certificate</p>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">Ready for review</p>
        </div>
      </div>

      <Button
        onClick={() => handleAction("/learner/courses/work-readiness-foundation")}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-2"
      >
        Continue Lesson
      </Button>
    </Card>
  );

  // Right Column 2: Certificate & CPD
  const CertificateCpdCard = () => (
    <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 space-y-4">
      <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
        Certificate & CPD
      </h3>

      <div className="space-y-3.5 text-xs">
        <div>
          <p className="text-xs text-slate-500 font-medium">Certificate name</p>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">Work Readiness Certificate</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">Certificate status</p>
          <p className="text-sm font-semibold text-amber-800 mt-0.5">Ready for review</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">CPD credits earned</p>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">22 of 35 credits</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">Pending CPD review</p>
          <p className="text-sm font-semibold text-amber-800 mt-0.5">4 credits</p>
        </div>
      </div>

      <Button
        onClick={() => handleAction("/learner/certificates/work-readiness-certificate")}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-2"
      >
        Review Certificate Progress
      </Button>
    </Card>
  );

  // Right Column 3: Notifications
  const NotificationsCard = () => {
    const notices = [
      { id: 1, label: "Certificate readiness updated", time: "Today" },
      { id: 2, label: "Assessment draft saved", time: "Today" },
      { id: 3, label: "Facilitator replied to discussion", time: "Today" }
    ];

    return (
      <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Notifications
        </h3>

        <div className="space-y-3">
          {notices.map((nt) => (
            <div key={nt.id} className="flex items-start justify-between gap-3 text-xs border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-800">{nt.label}</p>
                <p className="text-[10px] text-slate-400 font-medium">{nt.time}</p>
              </div>
              <div className="h-1.5 w-1.5 bg-emerald-700 rounded-full mt-1.5 shrink-0" />
            </div>
          ))}
        </div>

        <Button
          onClick={() => handleAction("/learner/notifications")}
          variant="outline"
          className="w-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-2"
        >
          Open Notifications
        </Button>
      </Card>
    );
  };

  // Right Column 5: Quick Actions
  const QuickActionsWidget = () => {
    const actions = [
      { id: "continue", label: "Continue Lesson", route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews", helper: "Open current lesson workplace." },
      { id: "assessment", label: "Open Assessment", route: "/learner/assessments/work-readiness-assignment", helper: "Draft portfolio assignment task." },
      { id: "resources", label: "Open Resources", route: "/learner/resources", helper: "Access pathway learning summaries." },
      { id: "certificate", label: "View Certificate Track", route: "/learner/certificates/work-readiness-certificate", helper: "Review review eligibility." },
      { id: "community", label: "Open Community", route: "/learner/community", helper: "Participate in cohort discussion channels." },
      { id: "support", label: "Open Support", route: "/learner/support", helper: "Connect with the Kano help desk." }
    ];

    return (
      <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Quick Actions
        </h3>

        <div className="space-y-2">
          {actions.map((act) => (
            <div 
              key={act.id}
              onClick={() => handleAction(act.route)}
              className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-900 truncate">
                  {act.label}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  {act.helper}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-850 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // -------------------------------------------------------------------------
  // DESKTOP EXPERIENCE (lg:flex)
  // -------------------------------------------------------------------------
  const DesktopLearnerDashboard = () => (
    <div id="desktop-dashboard" className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full">
      {/* Sidebar */}
      <LearnerSidebar />

      {/* Main Panel Content */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search lessons, courses, resources, support..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-800 transition-all font-semibold"
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
                <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-950 leading-tight">{learner.name}</p>
                <p className="text-[10px] text-slate-500 font-semibold">{learner.id}</p>
              </div>
              <div className="h-9 w-9 bg-emerald-900 text-white font-semibold rounded-full flex items-center justify-center border border-emerald-800 shadow-xs">
                AM
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 space-y-6 max-w-7xl mx-auto w-full text-left">
          {/* Section 1: Hero */}
          <DashboardHero />

          {/* Section 2: Summary Cards */}
          <DashboardSummaryCards />

          {/* Section 3: Quick Access */}
          <QuickAccessModule />

          {/* Main Content Grid */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start text-left">
            
            {/* Left Area (Core cards) */}
            <div className="space-y-6 text-left">
              <ContinueLearningFocus />
              <CurrentAssignmentCard />
              <LiveSessionReminder />
              <PathwaySnapshot />
              <RecommendedResources />
              <CommunityAndPractice />
              <RecentLearnerActivity />
            </div>

            {/* Right Area (Side utilities) */}
            <div className="space-y-6 shrink-0 text-left">
              <TodayStatusCard />
              <CertificateCpdCard />
              <NotificationsCard />
              <LearnerSupportCard 
                className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
                title="Support Center"
                text="Need assistance with your learning pathway?"
                buttonText="Open Support"
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  );

  // -------------------------------------------------------------------------
  // TABLET EXPERIENCE (hidden md:block lg:hidden)
  // -------------------------------------------------------------------------
  const TabletLearnerDashboard = () => (
    <div id="tablet-dashboard" className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28 pt-16">
      <AppMobileHeader moduleType="learner" title="SUSTAIN LMS" />

      {/* Main Content stacked cleanly */}
      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6 text-left">
        <DashboardHero />
        <DashboardSummaryCards />
        <QuickAccessModule />
        <ContinueLearningFocus />
        <CurrentAssignmentCard />
        <LiveSessionReminder />
        <PathwaySnapshot />
        <RecommendedResources />
        <CommunityAndPractice />
        <RecentLearnerActivity />
        
        {/* Tablet stacks sidebar components at bottom */}
        <TodayStatusCard />
        <CertificateCpdCard />
        <NotificationsCard />
        <LearnerSupportCard 
          className="transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
          title="Support Center"
          text="Need assistance with your learning pathway?"
          buttonText="Open Support"
        />
      </div>

      {/* Fixed Tablet Bottom Nav */}
      <LearnerMobileNav />
    </div>
  );

  // -------------------------------------------------------------------------
  // MOBILE EXPERIENCE (md:hidden)
  // -------------------------------------------------------------------------
  const MobileLearnerDashboard = () => (
    <div id="mobile-dashboard" className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24 pt-16">
      <AppMobileHeader moduleType="learner" title="SUSTAIN LMS" />

      {/* Mobile Stacked Body */}
      <div className="px-4 py-5 space-y-5 text-left">
        {/* Ordered strictly per instruction guidelines */}
        <DashboardHero />
        <ContinueLearningFocus />
        <CurrentAssignmentCard />
        <QuickAccessModule />
        <LiveSessionReminder />
        <PathwaySnapshot />
        <OfflineLowBandwidthPrompt />
        <LearnerSupportCard 
          className="transition-all duration-200 ease-out hover:shadow-xs"
          title="Support Center"
          text="Need assistance with your learning pathway?"
          buttonText="Open Support"
        />
      </div>

      {/* Fixed Mobile Bottom Nav */}
      <LearnerMobileNav />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans antialiased relative">
      {/* Custom Toast Indicator */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-24 right-4 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-xl border border-slate-800 animate-fade-in max-w-xs transition-all">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <p className="flex-1 text-left leading-normal">{toast.message}</p>
          <button onClick={() => setToast(null)} className="p-0.5 text-slate-400 hover:text-white cursor-pointer ml-1">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Bottom Sheet Modal */}
      {isMoreActionsOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-end justify-center transition-opacity" onClick={() => setIsMoreActionsOpen(false)}>
          <div 
            className="bg-white rounded-t-3xl w-full max-w-md p-6 space-y-4 shadow-2xl border-t border-slate-150 relative animate-slide-up text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">More Actions</h3>
                <p className="text-[11px] text-slate-400 font-medium">Quick links to learner path workspace tools.</p>
              </div>
              <button 
                onClick={() => setIsMoreActionsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 divide-y divide-slate-100 text-slate-700">
              {[
                { label: "My Journey", route: "/learner/journey", desc: "Track progress and review certificates." },
                { label: "My Courses", route: "/learner/courses", desc: "Browse assigned learning modules." },
                { label: "Assessment", route: "/learner/assessments/work-readiness-assessment", desc: "Open the Work Readiness Assignment portfolio." },
                { label: "Live Session", route: "/learner/live-sessions/interview-practice-clinic", desc: "Join upcoming Live clinics." },
                { label: "CPD Record", route: "/learner/cpd-record", desc: "Check certificate eligibility credits." },
                { label: "Offline Centre", route: "/learner/offline", desc: "Configure browser caching and download packs." },
                { label: "Support", route: "/learner/support", desc: "Contact facilitator or support desk." }
              ].map((item) => (
                <div 
                  key={item.label}
                  onClick={() => {
                    handleAction(item.route);
                    setIsMoreActionsOpen(false);
                  }}
                  className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 px-2 rounded-lg transition-colors group"
                >
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-950">{item.label}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 transition-transform group-hover:translate-x-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Responsive layout containers */}
      <DesktopLearnerDashboard />
      <TabletLearnerDashboard />
      <MobileLearnerDashboard />
    </div>
  );
}
