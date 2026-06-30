import { useState, useEffect, useRef } from "react";
import { useRoute } from "../../context/RouteContext";
import { useLearningState } from "../../context/LearningStateContext";
import { LmsSimulatorWidget } from "../../components/learner/LmsSimulatorWidget";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { StatusChip } from "../../components/ui/StatusChip";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Menu, 
  BookOpen, 
  Compass, 
  Award, 
  Users, 
  FolderOpen, 
  ArrowRight, 
  ExternalLink, 
  Download, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Info, 
  Play, 
  GraduationCap, 
  ChevronRight, 
  X,
  AlertCircle,
  Eye,
  Activity,
  User,
  RotateCcw,
  LayoutDashboard,
  ChevronDown,
  Lock,
  Check,
  Calendar
} from "lucide-react";

// Types for course representation
interface CourseItem {
  id: string;
  title: string;
  status: "Completed" | "In progress" | "Draft started" | "Upcoming" | "Locked" | "Submitted" | "Under Review" | "Needs Revision" | "Passed";
  progress: number;
  lessonsText: string;
  cpdText: string;
  helperText: string;
  primaryActionLabel: string;
  primaryActionPath?: string;
  secondaryActionLabel?: string;
  secondaryActionPath?: string;
  isToastOnly?: boolean;
  toastMessage?: string;
  isAssessment?: boolean;
  isCpd?: boolean;
}

export default function LearnerCoursesPage() {
  const { navigateTo } = useRoute();
  const { modules } = useLearningState();
  
  // Shared filter and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "In progress" | "Completed" | "Assessment-linked" | "Upcoming" | "CPD-linked">("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 4550);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const m3 = modules.find(m => m.id === "m3");
  const m3LessonsCompleted = m3?.lessons.filter(l => l.completed).length || 0;
  const m3LessonsTotal = m3?.lessons.length || 4;
  const m3Progress = Math.round((m3LessonsCompleted / m3LessonsTotal) * 100);

  // Assigned courses dynamic mock data matching active learning engine
  const assignedCourses: CourseItem[] = [
    {
      id: "digital-readiness",
      title: "Digital Readiness Basics",
      status: "Completed",
      progress: 100,
      lessonsText: "8 of 8 completed",
      cpdText: "8 confirmed credits",
      helperText: "Foundational digital skills for learning and workplace readiness.",
      primaryActionLabel: "Review Course",
      isToastOnly: true,
      toastMessage: "Course review opened in this frontend prototype.",
      isAssessment: false,
      isCpd: true
    },
    {
      id: "workplace-comm",
      title: "Workplace Communication",
      status: "Completed",
      progress: 100,
      lessonsText: "4 of 4 completed",
      cpdText: "6 confirmed credits",
      helperText: "Communication, listening, and respectful workplace interaction.",
      primaryActionLabel: "View Result",
      primaryActionPath: "/learner/results/work-readiness-assignment",
      isAssessment: true,
      isCpd: true
    },
    {
      id: "work-readiness-foundation",
      title: "Work Readiness Foundation",
      status: m3?.status === "completed" ? "Completed" : m3?.status === "locked" ? "Locked" : "In progress",
      progress: m3Progress,
      lessonsText: `${m3LessonsCompleted} of ${m3LessonsTotal} completed`,
      cpdText: m3?.status === "completed" ? "8 confirmed credits" : "8 potential credits",
      helperText: "Current course for interview preparation, workplace expectations, and assignment readiness.",
      primaryActionLabel: m3?.status === "locked" ? "Locked" : "View Curriculum",
      primaryActionPath: m3?.status === "locked" ? undefined : "/learner/courses/work-readiness-foundation",
      secondaryActionLabel: (m3?.status !== "locked" && !m3?.lessons.find(l => l.id === "m3-l4")?.completed) ? "Continue Lesson" : undefined,
      secondaryActionPath: "/learner/lessons/preparing-for-interviews",
      isAssessment: true,
      isCpd: true
    },
    {
      id: "assignment-prep",
      title: "Work Readiness Assignment",
      status: m3?.assignmentStatus === "passed" ? "Passed" : m3?.assignmentStatus === "submitted" ? "Submitted" : m3?.assignmentStatus === "under review" ? "Under Review" : m3?.assignmentStatus === "failed" ? "Needs Revision" : "Draft started",
      progress: m3?.assignmentStatus === "passed" ? 100 : m3?.assignmentStatus === "submitted" ? 80 : 50,
      lessonsText: "Assessment task",
      cpdText: m3?.assignmentStatus === "passed" ? "4 confirmed credits" : "4 pending credits",
      helperText: "Certificate-linked written assignment for facilitator review.",
      primaryActionLabel: m3?.status === "locked" ? "Locked" : (m3?.assignmentStatus === "passed" ? "View Result" : "Open Assessment"),
      primaryActionPath: m3?.status === "locked" ? undefined : (m3?.assignmentStatus === "passed" ? "/learner/assessments/work-readiness-assignment/result" : "/learner/assessments/work-readiness-assignment"),
      isAssessment: true,
      isCpd: true
    },
    {
      id: "career-readiness",
      title: "Professional Network Building",
      status: modules.find(m => m.id === "m4")?.status === "active" ? "In progress" : "Locked",
      progress: 0,
      lessonsText: "0 of 5 completed",
      cpdText: "Not yet confirmed",
      helperText: "Build digital professional profiles, identify networking mentors, and ask for professional guidance.",
      primaryActionLabel: modules.find(m => m.id === "m4")?.status === "locked" ? "Locked" : "Open Course",
      primaryActionPath: modules.find(m => m.id === "m4")?.status === "locked" ? undefined : "/learner/courses/professional-network-building",
      isAssessment: false,
      isCpd: false
    }
  ];

  // Search & Filter Logic
  const filteredCourses = assignedCourses.filter((course) => {
    // 1. Search filter
    const searchMatch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.helperText.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!searchMatch) return false;

    // 2. Chip filter
    switch (activeFilter) {
      case "In progress":
        return course.status === "In progress" || course.status === "Draft started";
      case "Completed":
        return course.status === "Completed";
      case "Assessment-linked":
        return course.isAssessment === true;
      case "Upcoming":
        return course.status === "Upcoming";
      case "CPD-linked":
        return course.isCpd === true;
      case "All":
      default:
        return true;
    }
  });

  const handleApplyFilters = () => {
    showToast("Course filters applied.");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
    showToast("Filters reset successfully.");
  };

  // Reusable component props mapping
  const layoutProps = {
    courses: assignedCourses,
    filteredCourses,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    showToast,
    handleApplyFilters,
    handleResetFilters,
    navigateTo,
    mobileMenuOpen,
    setMobileMenuOpen
  };

  return (
    <div id="sustain-courses-wrapper" className="min-h-screen bg-slate-50 text-slate-950 font-sans antialiased relative">
      
      {/* Visual Simulation Toast Notification */}
      {toast.visible && (
        <div 
          id="courses-page-toast"
          className="fixed bottom-20 lg:bottom-6 right-6 left-6 lg:right-6 lg:left-auto lg:w-96 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-start gap-3 border border-slate-800 animate-in fade-in duration-200"
        >
          <div className="p-1 bg-emerald-950 text-emerald-400 rounded-lg shrink-0 mt-0.5">
            <Info className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white">SUSTAIN LMS Simulation</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast({ message: "", visible: false })}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Layout Architectures */}
      <DesktopLearnerCourses {...layoutProps} />
      <TabletLearnerCourses {...layoutProps} />
      <MobileLearnerCourses {...layoutProps} />

      {/* Simulator Control Widget */}
      <LmsSimulatorWidget />
    </div>
  );
}

/* ============================================================================
   SHARED REUSABLE INTERFACE PIECES
   ============================================================================ */

interface LayoutProps {
  courses: CourseItem[];
  filteredCourses: CourseItem[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: "All" | "In progress" | "Completed" | "Assessment-linked" | "Upcoming" | "CPD-linked";
  setActiveFilter: (val: "All" | "In progress" | "Completed" | "Assessment-linked" | "Upcoming" | "CPD-linked") => void;
  showToast: (msg: string) => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
  navigateTo: (path: any) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}

// 1. HERO COMPONENT
function LearnerCoursesHero({ navigateTo }: { navigateTo: (path: any) => void }) {
  return (
    <Card id="courses-hero" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-stretch">
        {/* Left Side */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-2.5">
            <p className="text-xs font-medium text-slate-500 font-sans">
              Learner Workspace &gt; My Courses
            </p>
            {/* Status Chips */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-semibold px-3 py-0.5 rounded-full font-sans">
                Active pathway
              </span>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-semibold px-3 py-0.5 rounded-full font-sans">
                3 assigned courses
              </span>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-semibold px-3 py-0.5 rounded-full font-sans">
                CPD-linked
              </span>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950 font-heading mt-2">
              My Courses
            </h1>
            <p className="text-sm font-normal text-slate-600 leading-relaxed max-w-2xl mt-1.5">
              Open your assigned courses, continue lessons, and track certificate-linked progress.
            </p>
          </div>

          {/* Context Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <div className="bg-slate-50 border border-slate-150/60 p-3 rounded-xl text-left">
              <p className="text-[11px] font-medium text-slate-500 font-sans">Programme</p>
              <p className="text-xs font-semibold text-slate-900 mt-0.5 font-sans">Youth Employability Pathway</p>
            </div>
            <div className="bg-emerald-50/40 border border-emerald-100/50 p-3 rounded-xl text-left">
              <p className="text-[11px] font-medium text-emerald-800 font-sans">Current Course</p>
              <p className="text-xs font-semibold text-emerald-950 mt-0.5 font-sans truncate">Work Readiness Foundation</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button 
              variant="custom" 
              onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
              className="text-xs font-semibold py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white rounded-xl min-h-[44px] transition-colors duration-150 shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              Continue Current Course
            </Button>
            <Button 
              variant="custom" 
              onClick={() => navigateTo("/learner/journey")}
              className="text-xs font-semibold py-2.5 px-5 bg-white border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 rounded-xl min-h-[44px] transition-colors duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
              View My Journey
            </Button>
          </div>
        </div>

        {/* Right Deep Green Panel */}
        <div className="hidden lg:flex bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-md p-6 space-y-4 text-left relative overflow-hidden flex-col justify-between h-full">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
              Active Course
            </span>
            <h4 className="text-lg font-bold tracking-tight font-heading text-white">
              Work Readiness Foundation
            </h4>
            <p className="text-xs text-emerald-100/90 font-normal leading-relaxed">
              Continue Preparing for Interviews and use the lesson to strengthen your Work Readiness Assignment.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-emerald-200">Overall Progress</span>
              <span className="font-bold text-white">42%</span>
            </div>
            <div className="w-full bg-emerald-950 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-450 h-full rounded-full transition-all duration-300" style={{ width: "42%" }}></div>
            </div>
          </div>

          <div className="border-t border-emerald-800/60 pt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-emerald-200/80 font-medium uppercase tracking-wider">Lessons</p>
              <p className="text-xs font-semibold text-white mt-0.5">6 of 14 completed</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-200/80 font-medium uppercase tracking-wider">CPD Credits</p>
              <p className="text-xs font-semibold text-white mt-0.5">8 credits confirmed</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// 2. SUMMARY GRID COMPONENT
function CourseSummaryCards({ navigateTo }: { navigateTo: (path: any) => void }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Assigned Courses */}
      <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-emerald-200 transition-all duration-200 text-left flex flex-col justify-between min-h-[100px]">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 font-sans block">
            Assigned Courses
          </span>
          <p className="text-xl font-bold text-slate-900 font-sans tracking-tight mt-1">
            3
          </p>
        </div>
        <p className="text-[10px] text-slate-400 font-medium font-sans">
          Assigned to your pathway
        </p>
      </Card>

      {/* Card 2: Completed */}
      <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-emerald-200 transition-all duration-200 text-left flex flex-col justify-between min-h-[100px]">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 font-sans block">
            Completed
          </span>
          <p className="text-xl font-bold text-emerald-800 font-sans tracking-tight mt-1">
            2
          </p>
        </div>
        <p className="text-[10px] text-slate-400 font-medium font-sans">
          Fully verified courses
        </p>
      </Card>

      {/* Card 3: In Progress */}
      <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-emerald-200 transition-all duration-200 text-left flex flex-col justify-between min-h-[100px]">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 font-sans block">
            In Progress
          </span>
          <p className="text-xl font-bold text-amber-800 font-sans tracking-tight mt-1">
            1
          </p>
        </div>
        <p className="text-[10px] text-slate-400 font-medium font-sans">
          Work Readiness Foundation
        </p>
      </Card>

      {/* Card 4: CPD Credits */}
      <Card 
        onClick={() => navigateTo("/learner/cpd-record")}
        className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-emerald-200 hover:shadow-xs cursor-pointer transition-all duration-200 text-left flex flex-col justify-between min-h-[100px]"
      >
        <div>
          <span className="text-[11px] font-semibold text-slate-500 font-sans block">
            CPD Credits
          </span>
          <p className="text-xl font-bold text-slate-900 font-sans tracking-tight mt-1">
            14 of 35
          </p>
        </div>
        <p className="text-[10px] text-emerald-800 font-semibold font-sans">
          View CPD Record
        </p>
      </Card>
    </div>
  );
}

// 3. ACTIVE COURSE FOCUS CARD
function ActiveCourseFocus({ navigateTo }: { navigateTo: (path: any) => void }) {
  return (
    <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left relative overflow-hidden hover:border-emerald-200 transition-all duration-200">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-700"></div>

      <div className="space-y-4 pl-2">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-950 font-heading">Active Course Focus</h3>
            <p className="text-xs text-slate-500 font-medium">Your next recommended course action.</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            In progress
          </span>
        </div>

        {/* Focus Material Details */}
        <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-950 font-sans">Work Readiness Foundation</h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Build practical work readiness skills, continue your interview preparation lesson, and complete the certificate-linked assignment.
            </p>
            
            {/* Embedded Micro stats */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" /> 2 hours 40 minutes remaining</span>
              <span className="text-slate-300">|</span>
              <span>6 of 14 lessons completed</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-800 font-semibold">8 CPD credits confirmed</span>
            </div>
          </div>
        </div>

        {/* Course Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium text-xs">Course Completion Progress</span>
            <span className="font-bold text-slate-950">42%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-700 h-full rounded-full" style={{ width: "42%" }}></div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <Button 
            variant="custom" 
            onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
            className="text-xs font-semibold py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white rounded-xl min-h-[44px] flex items-center justify-center gap-1.5 transition-colors duration-150"
          >
            Continue Lesson
          </Button>
          <Button 
            variant="custom" 
            onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
            className="text-xs font-semibold py-2.5 bg-white border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 rounded-xl min-h-[44px] flex items-center justify-center gap-1.5 transition-colors duration-150"
          >
            View Curriculum
          </Button>
          <Button 
            variant="custom" 
            onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
            className="text-xs font-semibold py-2.5 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl min-h-[44px] flex items-center justify-center gap-1.5 transition-colors duration-150"
          >
            Open Assessment
          </Button>
        </div>
      </div>
    </Card>
  );
}

// 4. FILTERS COMPONENT
interface FilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: "All" | "In progress" | "Completed" | "Assessment-linked" | "Upcoming" | "CPD-linked";
  setActiveFilter: (val: any) => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
}

function CourseFilters({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  handleApplyFilters,
  handleResetFilters
}: FilterProps) {
  const filterChips: Array<"All" | "In progress" | "Completed" | "Assessment-linked" | "Upcoming" | "CPD-linked"> = [
    "All", "In progress", "Completed", "Assessment-linked", "Upcoming", "CPD-linked"
  ];

  return (
    <Card className="p-5 bg-white border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Find Courses</h3>
        <p className="text-xs text-slate-500 font-medium">Filter assigned learning by progress or learning type.</p>
      </div>

      {/* Filter Chips Container */}
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => {
          const isActive = activeFilter === chip;
          return (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-emerald-900 border-emerald-900 text-white shadow-xs" 
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {chip === "Assessment-linked" ? "Assessment-linked" : chip === "CPD-linked" ? "CPD-linked" : chip}
            </button>
          );
        })}
      </div>

      {/* Input & Search Trigger */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search assigned courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-emerald-800 focus:ring-1 focus:ring-emerald-800 transition-colors"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <Button 
            variant="primary" 
            onClick={handleApplyFilters}
            className="text-xs font-bold py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl min-h-[44px]"
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="text-xs font-bold py-2.5 px-4 border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl min-h-[44px] flex items-center gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Helpers for curriculum items in AssignedCourseList
const getItemIconLocal = (type: string, isCompleted: boolean, isLocked: boolean) => {
  const iconClass = `h-4 w-4 shrink-0 ${
    isCompleted 
      ? "text-emerald-700" 
      : isLocked 
      ? "text-slate-400" 
      : "text-emerald-800"
  }`;

  switch (type) {
    case "lesson":
      return <BookOpen className={iconClass} />;
    case "checkpoint":
      return <FileText className={iconClass} />;
    case "quiz":
      return <HelpCircle className={iconClass} />;
    case "assignment":
      return <FileText className={iconClass} />;
    case "live_session":
      return <Calendar className={iconClass} />;
    case "resource":
      return <BookOpen className={iconClass} />;
    case "review":
      return <Award className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
};

const renderStatusChipLocal = (status: string) => {
  return <StatusChip status={status} />;
};

const getItemDisplayDataLocal = (item: { type: string; status: string; actionLabel?: string }) => {
  let typeLabel = "Lesson";
  if (item.type === "checkpoint") typeLabel = "Checkpoint";
  else if (item.type === "assignment") typeLabel = "Assignment";
  else if (item.type === "live_session") typeLabel = "Live Session";
  else if (item.type === "locked_module") typeLabel = "Locked Module";
  else if (item.type === "quiz") typeLabel = "Quiz";
  else if (item.type === "resource") typeLabel = "Resource";
  else if (item.type === "result") typeLabel = "Result";

  const statusLower = item.status.toLowerCase();
  let statusText = "Pending";
  if (statusLower === "completed" || statusLower === "passed" || statusLower === "complete") {
    statusText = "Completed";
  } else if (statusLower === "in_progress" || statusLower === "in progress" || statusLower === "current") {
    statusText = "In progress";
  } else if (statusLower === "draft_started" || statusLower === "draft started") {
    statusText = "Draft started";
  } else if (statusLower === "attendance_pending" || statusLower === "attendance pending" || statusLower === "pending") {
    statusText = "Pending";
  } else if (statusLower === "locked") {
    statusText = "Locked";
  }

  let actionText = item.actionLabel || "Open";
  let isPrimary = false;
  let isLocked = false;

  if (statusLower === "completed" || statusLower === "passed" || statusLower === "complete") {
    if (item.type === "checkpoint") actionText = "Review Checkpoint";
    else actionText = "Review Lesson";
  } else if (statusLower === "in_progress" || statusLower === "in progress" || statusLower === "current") {
    actionText = "Continue Lesson";
    isPrimary = true;
  } else if (statusLower === "draft_started" || statusLower === "draft started") {
    actionText = "Continue Assessment";
    isPrimary = true;
  } else if (statusLower === "locked") {
    actionText = "View Unlock Requirements";
    isLocked = true;
  } else if (item.type === "live_session") {
    actionText = "View Session";
  } else if (item.type === "checkpoint") {
    actionText = "Open Checkpoint";
    isPrimary = true;
  } else if (item.type === "assignment") {
    actionText = "Continue Assessment";
    isPrimary = true;
  } else if (item.type === "result") {
    actionText = "View CPD Record";
  }

  return { typeLabel, statusText, actionText, isPrimary, isLocked };
};

const getHelperTextLocal = (item: { title: string; status: string; description?: string }) => {
  if (item.description) return item.description;
  const titleLower = item.title.toLowerCase();
  if (titleLower.includes("behaviour") || titleLower.includes("basics")) {
    return "Reviewed as part of Workplace Preparation.";
  }
  if (titleLower.includes("readiness check") || titleLower.includes("checkpoint")) {
    return "Your answers have been reviewed.";
  }
  if (titleLower.includes("preparing for interviews")) {
    return "Continue the STAR technique lesson and prepare for your checkpoint.";
  }
  if (titleLower.includes("low-bandwidth")) {
    return "Complete this checkpoint after reviewing the lesson.";
  }
  if (titleLower.includes("assignment")) {
    return "Continue your written portfolio and prepare your STAR response.";
  }
  if (titleLower.includes("clinic") || titleLower.includes("live")) {
    return "Join the live practice session and confirm attendance.";
  }
  if (item.status === "locked") {
    return "Unlocks after your assignment and live attendance are confirmed.";
  }
  return "Access learning resources and progress toward certificate readiness.";
};

// 5. ASSIGNED COURSE LIST CARD
function AssignedCourseList({ 
  filteredCourses, 
  showToast, 
  navigateTo 
}: { 
  filteredCourses: CourseItem[]; 
  showToast: (msg: string) => void;
  navigateTo: (path: any) => void;
}) {
  // Course toggle states
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({
    "work-readiness-foundation": true,
    "digital-readiness": false,
    "workplace-comm": false
  });

  const toggleCourse = (id: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const { modules: storeModules } = useLearningState();
  const m3 = storeModules.find(m => m.id === "m3");
  const m3LessonsCompleted = m3?.lessons.filter(l => l.completed).length || 0;
  const m3LessonsTotal = m3?.lessons.length || 4;
  const m3Progress = Math.round((m3LessonsCompleted / m3LessonsTotal) * 100);
  const m3AssignmentStatus = m3?.assignmentStatus || "draft";

  // Detailed course structures map corresponding to user requirements
  const getCourseDetails = (id: string) => {
    if (id === "digital-readiness") {
      return {
        id: "digital-readiness",
        title: "Digital Readiness Basics",
        status: "Completed",
        progress: 100,
        lessonsText: "8 of 8 completed",
        cpdText: "8 confirmed credits",
        helperText: "Foundational digital skills for learning and workplace readiness.",
        primaryActionLabel: "Review Course",
        primaryActionPath: "/learner/courses/digital-readiness-basics",
        modules: [
          {
            title: "Digital Learning Foundations",
            status: "Completed",
            progress: 100,
            items: [
              { type: "lesson", title: "Getting Started with SUSTAIN LMS", status: "completed", route: "/learner/courses/digital-readiness-basics", actionLabel: "Review Course" },
              { type: "lesson", title: "Using Online Learning Tools", status: "completed", route: "/learner/courses/digital-readiness-basics", actionLabel: "Review Course" },
              { type: "checkpoint", title: "Digital Readiness Check", status: "completed", route: "/learner/courses/digital-readiness-basics", actionLabel: "Review Course" },
              { type: "resource", title: "Low-Bandwidth Learning Tips", status: "available", route: "/learner/resources/low-bandwidth-reading-version", actionLabel: "Open Resource" }
            ]
          }
        ]
      };
    }

    if (id === "workplace-comm") {
      return {
        id: "workplace-comm",
        title: "Workplace Communication",
        status: "Completed",
        progress: 100,
        lessonsText: "4 of 4 completed",
        cpdText: "6 confirmed credits",
        helperText: "Communication, listening, and respectful workplace interaction.",
        primaryActionLabel: "View Result",
        primaryActionPath: "/learner/assessments/workplace-communication/result",
        modules: [
          {
            title: "Communication Essentials",
            status: "Completed",
            progress: 100,
            items: [
              { type: "lesson", title: "Workplace Communication Basics", status: "completed", route: "/learner/assessments/workplace-communication/result", actionLabel: "Review Course" },
              { type: "lesson", title: "Listening and Feedback", status: "completed", route: "/learner/assessments/workplace-communication/result", actionLabel: "Review Course" },
              { type: "checkpoint", title: "Communication Checkpoint", status: "completed", route: "/learner/assessments/workplace-communication/result", actionLabel: "Review Course" },
              { type: "result", title: "Workplace Communication Result", status: "available", route: "/learner/assessments/workplace-communication/result", actionLabel: "View Result" }
            ]
          }
        ]
      };
    }

    if (id === "work-readiness-foundation") {
      // Dynamic Assignment states
      let assignmentItemStatus: "draft_started" | "pending" | "completed" = "draft_started";
      let assignmentLabel = "Continue Draft";
      if (m3AssignmentStatus === "passed") {
        assignmentItemStatus = "completed";
        assignmentLabel = "View Result";
      } else if (m3AssignmentStatus === "submitted" || m3AssignmentStatus === "under review") {
        assignmentItemStatus = "pending";
        assignmentLabel = "View Result";
      }

      return {
        id: "work-readiness-foundation",
        title: "Work Readiness Foundation",
        status: m3?.status === "completed" ? "Completed" : m3?.status === "locked" ? "Locked" : "In progress",
        progress: m3Progress,
        lessonsText: `${m3LessonsCompleted} of ${m3LessonsTotal} lessons completed`,
        cpdText: m3?.status === "completed" ? "8 confirmed credits" : "8 potential credits",
        helperText: "Prepare for interviews, complete your Work Readiness Assignment, and progress toward certificate readiness.",
        primaryActionLabel: m3?.status === "locked" ? "Locked" : "View Curriculum",
        primaryActionPath: m3?.status === "locked" ? undefined : "/learner/courses/work-readiness-foundation",
        modules: [
          {
            title: "MODULE 1: Workplace Preparation",
            status: "Completed",
            progress: 100,
            items: [
              { type: "lesson", title: "Professional Behaviour at Work", status: "completed", route: "/learner/courses/work-readiness-foundation", actionLabel: "Review Course" },
              { type: "checkpoint", title: "Workplace Readiness Check", status: "completed", route: "/learner/courses/work-readiness-foundation", actionLabel: "Review Course" }
            ]
          },
          {
            title: "MODULE 2: Preparing for Interviews",
            status: "In progress",
            progress: 68,
            items: [
              { 
                type: "lesson", 
                title: "Preparing for Interviews", 
                status: m3?.lessons.find(l => l.id === "m3-l4")?.completed ? "completed" : "in_progress", 
                route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews", 
                actionLabel: m3?.lessons.find(l => l.id === "m3-l4")?.completed ? "Review Lesson" : "Continue Lesson" 
              },
              { 
                type: "checkpoint", 
                title: "Low-Bandwidth Interview Preparation", 
                status: m3?.lessons.find(l => l.id === "m3-l5")?.completed ? "completed" : "pending", 
                route: "/learner/checkpoints/interview-preparation/review", 
                actionLabel: m3?.lessons.find(l => l.id === "m3-l5")?.completed ? "Review" : "Start Checkpoint" 
              },
              { 
                type: "assignment", 
                title: "Work Readiness Assignment", 
                status: assignmentItemStatus, 
                route: m3AssignmentStatus === "passed" ? "/learner/assessments/work-readiness-assignment/result" : "/learner/assessments/work-readiness-assignment", 
                actionLabel: assignmentLabel 
              },
              { 
                type: "live_session", 
                title: "Interview Practice Clinic", 
                status: "attendance_pending", 
                route: "/learner/live-sessions/interview-practice-clinic", 
                actionLabel: "View Session" 
              }
            ]
          },
          {
            title: "MODULE 3: Interview Preparation Practice",
            status: "Locked",
            progress: 0,
            lockedReason: "Unlocks after your assignment and live attendance are confirmed.",
            items: [
              { 
                type: "locked_module", 
                title: "Interview Preparation Practice", 
                status: "locked", 
                route: "/learner/courses/work-readiness-foundation/modules/interview-preparation/locked", 
                actionLabel: "View Unlock Requirements" 
              }
            ]
          }
        ]
      };
    }

    return null;
  };

  // Only filter out standard list items that have defined curriculum mapping, to prevent duplicates
  const visibleCourses = filteredCourses.filter(c => c.id === "digital-readiness" || c.id === "workplace-comm" || c.id === "work-readiness-foundation");

  return (
    <Card className="p-6 bg-white border-slate-200 rounded-2xl shadow-sm text-left space-y-6">
      <div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight font-heading">Assigned Courses</h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
          Open a course to view modules, lessons, checkpoints, assignments, live sessions, and certificate-linked requirements.
        </p>
      </div>

      <div className="space-y-4">
        {visibleCourses.length === 0 ? (
          <div className="p-10 border border-dashed border-slate-200 rounded-2xl text-center space-y-3">
            <AlertCircle className="h-8 w-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500 font-bold">No assigned courses match your current search or filters.</p>
          </div>
        ) : (
          visibleCourses.map((filteredCourse) => {
            const course = getCourseDetails(filteredCourse.id) || {
              id: filteredCourse.id,
              title: filteredCourse.title,
              status: filteredCourse.status,
              progress: filteredCourse.progress,
              lessonsText: filteredCourse.lessonsText,
              cpdText: filteredCourse.cpdText,
              helperText: filteredCourse.helperText,
              primaryActionLabel: filteredCourse.primaryActionLabel,
              primaryActionPath: filteredCourse.primaryActionPath,
              modules: []
            };

            const isExpanded = !!expandedCourses[course.id];

            const statusColors: Record<string, string> = {
              "Completed": "bg-emerald-50 text-emerald-800 border-emerald-100",
              "In progress": "bg-amber-50 text-amber-800 border-amber-150",
              "Locked": "bg-slate-100 text-slate-450 border-slate-200"
            };

            return (
              <div 
                key={course.id}
                className={`rounded-2xl border ${isExpanded ? "border-emerald-200 shadow-md" : "border-slate-200 shadow-xs hover:border-emerald-200"} bg-white transition-all duration-200 ease-out flex flex-col overflow-hidden`}
              >
                {/* Accordion Header Section */}
                <div 
                  onClick={() => toggleCourse(course.id)}
                  className="p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  {/* Left block with icon & text */}
                  <div className="flex items-start gap-4 text-left">
                    <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                      course.status === "Completed" 
                        ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                        : course.status === "Locked"
                        ? "bg-slate-100 text-slate-400 border-slate-200"
                        : "bg-amber-50 text-amber-800 border-amber-150"
                    }`}>
                      {course.status === "Completed" ? (
                        <CheckCircle2 className="h-5.5 w-5.5" />
                      ) : course.status === "Locked" ? (
                        <Lock className="h-5.5 w-5.5" />
                      ) : (
                        <BookOpen className="h-5.5 w-5.5" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-md font-bold text-slate-900 leading-snug">{course.title}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xl">{course.helperText}</p>
                      
                      <div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs text-slate-500 font-medium">
                        <span className="text-emerald-800 font-semibold">{course.lessonsText}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-800 font-semibold">{course.cpdText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Progress & Badges */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t border-slate-50 md:border-0 pt-3 md:pt-0">
                    <div className="flex items-center gap-3 text-right">
                      <div className="hidden sm:block">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColors[course.status] || "bg-slate-50 border-slate-200 text-slate-600"}`}>
                          {course.status}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-500">Progress</div>
                        <div className="text-md font-black text-slate-900 leading-none mt-0.5">{course.progress}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {course.primaryActionPath && (
                        <Button
                          variant="custom"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateTo(course.primaryActionPath);
                          }}
                          className="text-xs font-bold py-2 px-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl shadow-3xs"
                        >
                          {course.primaryActionLabel}
                        </Button>
                      )}
                      
                      <div className={`p-1.5 rounded-lg hover:bg-slate-50 text-slate-500 transition-transform duration-200 ${isExpanded ? "rotate-180 text-emerald-800 bg-emerald-50/50" : ""}`}>
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content Area */}
                {isExpanded && (
                  <div className="px-5 pb-5 lg:px-6 lg:pb-6 space-y-4 bg-slate-50/50 border-t border-slate-100 pt-5">
                    {course.modules.length === 0 ? (
                      <p className="text-xs text-slate-500 font-bold text-center">No modules configured for this course.</p>
                    ) : (
                      course.modules.map((mod: any, mIdx: number) => {
                        const isModLocked = mod.status === "Locked" || mod.status === "locked";
                        const isModCompleted = mod.status === "Completed" || mod.status === "completed";

                        return (
                          <div 
                            key={mIdx}
                            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs text-left space-y-4"
                          >
                            {/* Module Header */}
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <div>
                                <h5 className="text-sm font-semibold text-slate-900 font-heading leading-snug">
                                  {mod.title
                                    .replace("MODULE 1: ", "Module 1: ")
                                    .replace("MODULE 2: ", "Module 2: ")
                                    .replace("MODULE 3: ", "Module 3: ")}
                                </h5>
                                {isModLocked && mod.lockedReason && (
                                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl font-medium flex items-start gap-2 max-w-xl">
                                    <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                                    <span>{mod.lockedReason}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                                  isModCompleted 
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                                    : isModLocked 
                                    ? "bg-slate-100 text-slate-600 border-slate-200" 
                                    : "bg-amber-50 text-amber-800 border-amber-200"
                                }`}>
                                  {isModCompleted ? "Completed" : isModLocked ? "Locked" : "In progress"}
                                </span>
                                {mod.progress > 0 && mod.progress < 100 && (
                                  <span className="text-[11px] font-bold text-amber-800">{mod.progress}%</span>
                                )}
                              </div>
                            </div>

                            {/* Module Progress Bar */}
                            {mod.progress > 0 && mod.progress < 100 && (
                              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${mod.progress}%` }} />
                              </div>
                            )}                            {/* Module Items List */}
                            <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-100 overflow-hidden">
                              {mod.items.map((item: any, iIdx: number) => {
                                const isItemCompleted = item.status.toLowerCase() === "completed" || item.status.toLowerCase() === "passed" || item.status.toLowerCase() === "complete";
                                const isItemLocked = item.status.toLowerCase() === "locked";
                                const isItemCurrent = item.status.toLowerCase() === "current" || item.status.toLowerCase() === "in_progress" || item.status.toLowerCase() === "in progress";

                                const { typeLabel, statusText, actionText, isPrimary, isLocked } = getItemDisplayDataLocal(item);
                                const helperText = getHelperTextLocal(item);

                                return (
                                  <div
                                    key={iIdx}
                                    className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left transition-all ${
                                      isItemCurrent
                                        ? "bg-emerald-50/10"
                                        : ""
                                    }`}
                                  >
                                    {/* Left block: Icon, Type & Title, Status Chip */}
                                    <div className="flex items-start gap-3.5 min-w-0 flex-1">
                                      <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                                        isItemCompleted
                                          ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                                          : isItemCurrent
                                          ? "bg-emerald-50 text-emerald-955 border-emerald-150 animate-pulse"
                                          : isItemLocked
                                          ? "bg-slate-50 text-slate-400 border-slate-150"
                                          : "bg-amber-50 text-amber-900 border-amber-150"
                                      }`}>
                                        {getItemIconLocal(item.type, isItemCompleted, isItemLocked)}
                                      </div>

                                      <div className="space-y-1 min-w-0 text-left flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide uppercase">
                                            {typeLabel}
                                          </span>
                                          {renderStatusChipLocal(item.status)}
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                          {item.title}
                                        </h4>
                                        {helperText && (
                                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                            {helperText}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="shrink-0 flex items-center justify-end">
                                      <button
                                        onClick={() => navigateTo(item.route)}
                                        className={`text-xs font-bold py-2 px-4.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all w-full md:w-auto min-h-[40px] text-center ${
                                          isPrimary
                                            ? "bg-emerald-900 hover:bg-emerald-800 text-white shadow-3xs border border-emerald-900"
                                            : isLocked
                                            ? "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-750"
                                            : "bg-white border border-slate-200 text-slate-750 hover:bg-slate-50 hover:text-emerald-900"
                                        }`}
                                      >
                                        <span className="whitespace-nowrap">{actionText}</span>
                                        {isLocked ? (
                                          <Lock className="h-3.5 w-3.5 shrink-0" />
                                        ) : isItemCompleted ? (
                                          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                                        ) : (
                                          <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

// 6. LESSON & MATERIALS COMPONENT (Resources Hub card styling)
function CurrentLessonMaterials({ navigateTo, showToast }: { navigateTo: (path: any) => void; showToast: (msg: string) => void }) {
  const materials = [
    {
      id: "mat-1",
      title: "Preparing for Interviews",
      helper: "Continue the current lesson and practise structured interview answers.",
      actionLabel: "Continue Lesson",
      path: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews"
    },
    {
      id: "mat-2",
      title: "Low-Bandwidth Reading Version",
      helper: "Open a lightweight version of the current lesson.",
      actionLabel: "Open Resource",
      path: "/learner/resources/low-bandwidth-reading-version"
    },
    {
      id: "mat-3",
      title: "Work Readiness Assignment Guide",
      helper: "Review the assignment guide before submitting.",
      actionLabel: "Download",
      isToast: true,
      toastMessage: "Download started in this frontend prototype."
    }
  ];

  return (
    <Card className="p-6 bg-white border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900">Current Lesson & Materials</h3>
        <p className="text-xs text-slate-500 font-medium">Resources connected to the active course.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materials.map((mat) => (
          <div 
            key={mat.id}
            className="p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4 text-left"
          >
            <div className="space-y-1.5">
              <div className="p-2 bg-emerald-50 text-emerald-900 rounded-lg inline-block">
                <FileText className="h-4 w-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-950 font-sans">{mat.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                {mat.helper}
              </p>
            </div>

            <button
              onClick={() => {
                if (mat.isToast) {
                  showToast(mat.toastMessage || "");
                } else if (mat.path) {
                  navigateTo(mat.path);
                }
              }}
              className="text-xs font-bold text-emerald-900 hover:text-emerald-800 flex items-center gap-1 cursor-pointer transition-colors pt-1 border-t border-slate-100/50 w-full"
            >
              <span>{mat.actionLabel}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 text-right">
        <Button
          variant="outline"
          onClick={() => navigateTo("/learner/resources")}
          className="text-xs font-bold py-2 px-4 border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl"
        >
          Open Resources
        </Button>
      </div>
    </Card>
  );
}

// 7. ASSESSMENT AND CERTIFICATE CONNECTION
function AssessmentCertificateConnection({ navigateTo }: { navigateTo: (path: any) => void }) {
  return (
    <Card className="p-6 bg-white border-slate-200 rounded-2xl shadow-sm text-left space-y-5">
      <div>
        <h3 className="text-base font-bold text-slate-900">Assessment & Certificate Connection</h3>
        <p className="text-xs text-slate-500 font-medium">Your current course connects to assessment review, CPD, and certificate readiness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left segment */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 font-medium text-xs text-slate-750">
          <div className="border-b border-slate-200/60 pb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Assessment Task</span>
            <span className="text-slate-950 font-bold text-sm block mt-0.5">Work Readiness Assignment</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Assessment Status</span>
            <span className="bg-amber-150 text-amber-950 font-bold px-2 py-0.5 rounded-sm text-[10px]">Draft started</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">CPD Pending (after review)</span>
            <span className="text-emerald-900 font-bold">+4 Credits</span>
          </div>
        </div>

        {/* Right segment */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 font-medium text-xs text-slate-750">
          <div className="border-b border-slate-200/60 pb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pathway Target Certificate</span>
            <span className="text-slate-950 font-bold text-sm block mt-0.5">Work Readiness Certificate</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Certificate Status</span>
            <span className="text-emerald-950 bg-emerald-50 font-bold px-2 py-0.5 rounded-sm text-[10px]">Ready for certificate review</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Milestone Record</span>
            <span className="text-slate-800 font-bold">22 of 35 Credits</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        <Button 
          variant="custom" 
          onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
          className="text-xs font-semibold py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl min-h-[44px]"
        >
          Open Assessment
        </Button>
        <Button 
          variant="custom" 
          onClick={() => navigateTo("/learner/cpd-record")}
          className="text-xs font-semibold py-2.5 px-4 bg-white border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 rounded-xl min-h-[44px]"
        >
          View Certificate Track
        </Button>
        <Button 
          variant="custom" 
          onClick={() => navigateTo("/learner/support")}
          className="text-xs font-semibold py-2.5 px-4 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl min-h-[44px]"
        >
          Open Support
        </Button>
      </div>
    </Card>
  );
}

// 8. RECENT COURSE ACTIVITY
function RecentCourseActivity({ navigateTo }: { navigateTo: (path: any) => void }) {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const activities = [
    { 
      title: "Course opened", 
      context: "Work Readiness Foundation", 
      time: "Today",
      icon: BookOpen,
      action: "Open Course",
      path: "/learner/courses/work-readiness-foundation"
    },
    { 
      title: "Lesson continued", 
      context: "Preparing for Interviews", 
      time: "Today",
      icon: Play,
      action: "Continue Lesson",
      path: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews"
    },
    { 
      title: "Assessment draft saved", 
      context: "Work Readiness Assignment", 
      time: "Today",
      icon: FileText,
      action: "Continue Draft",
      path: "/learner/assessments/work-readiness-assessment/attempt"
    },
    { 
      title: "Resource opened", 
      context: "Text-First Reading Version", 
      time: "Yesterday",
      icon: Download,
      action: "Open Resource",
      path: "/learner/low-bandwidth"
    },
    { 
      title: "Course completed", 
      context: "Workplace Communication", 
      time: "19 Oct 2026",
      icon: Award,
      action: "View Completion",
      path: "/learner/cpd-record"
    }
  ];

  return (
    <>
      <Card id="recent-activity-card" className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-950 font-heading">Recent Course Activity</h3>
            <p className="text-sm text-slate-600 mt-0.5">Latest updates from your course, lessons, assessment, and resources.</p>
          </div>
          <button 
            onClick={() => setIsActivityModalOpen(true)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors shrink-0 text-left sm:text-right"
          >
            View all activity
          </button>
        </div>

        <div className="space-y-2">
          {activities.map((row, idx) => {
            const IconComponent = row.icon;
            return (
              <div 
                key={idx} 
                onClick={() => navigateTo(row.path)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl border border-transparent hover:bg-emerald-50/45 hover:border-emerald-100 cursor-pointer transition-all duration-200 ease-out"
              >
                {/* Left Side: Icon + text */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-white group-hover:scale-105 transition-all">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-950 font-sans">{row.title}</p>
                    <p className="text-sm text-slate-600 font-sans">{row.context}</p>
                  </div>
                </div>

                {/* Right Side: Date pill + action link */}
                <div className="flex items-center gap-3 justify-between sm:justify-end shrink-0 pl-14 sm:pl-0">
                  <span className="inline-flex items-center px-3 py-1 bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600 rounded-full group-hover:bg-white group-hover:border-emerald-100 transition-colors">
                    {row.time}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all">
                    {row.action}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Modal fallback */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 text-left space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-lg font-bold text-slate-950 font-heading">Course Activity</h4>
              <button 
                onClick={() => setIsActivityModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              A full history of your course, lesson, assessment, and resource activity will appear here in the full LMS.
            </p>

            <div className="pt-2">
              <Button 
                variant="custom" 
                onClick={() => setIsActivityModalOpen(false)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white font-semibold py-2.5 rounded-xl transition-colors duration-150 text-sm"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 9. RIGHT CARD 1 — COURSE STATUS
function CourseStatusRightCard({ navigateTo }: { navigateTo: (path: any) => void }) {
  return (
    <Card className="p-5 bg-white border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
      <div className="border-b border-slate-150 pb-2">
        <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-sans">Course Status</span>
      </div>

      <div className="space-y-3 text-xs text-slate-650 font-medium">
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-400 font-bold uppercase text-[9px]">Active course</span>
          <span className="text-slate-900 font-bold">Work Readiness Foundation</span>
        </div>
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-400 font-bold uppercase text-[9px]">Progress</span>
          <span className="text-slate-900 font-bold">42%</span>
        </div>
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-400 font-bold uppercase text-[9px]">Lessons</span>
          <span className="text-slate-900 font-semibold">6 of 14 completed</span>
        </div>
        <div className="flex justify-between border-b border-slate-50 pb-2">
          <span className="text-slate-400 font-bold uppercase text-[9px]">Current lesson</span>
          <span className="text-emerald-900 font-extrabold">Preparing for Interviews</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 font-bold uppercase text-[9px]">Facilitator</span>
          <span className="text-slate-900 font-semibold">Halima Sani</span>
        </div>
      </div>

      <Button 
        variant="primary"
        onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl min-h-[44px] transition-transform duration-100 active:scale-[0.98]"
      >
        View Curriculum
      </Button>
    </Card>
  );
}

// 10. RIGHT CARD 2 — LEARNING PATHWAY CONTEXT
function LearningPathwayContextRightCard({ navigateTo }: { navigateTo: (path: any) => void }) {
  return (
    <Card 
      id="learning-pathway-context-card" 
      className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left hover:border-emerald-200 hover:shadow-md transition-all duration-200 ease-out space-y-5"
    >
      <div>
        <h3 className="text-xl font-semibold text-slate-950 font-heading">Learning Pathway Context</h3>
        <p className="text-sm text-slate-600 mt-0.5">Your course, cohort, and certificate progress at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Pathway Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">Pathway</span>
            <p className="text-sm font-semibold text-slate-950 font-sans mt-1 leading-snug">Youth Employability Pathway</p>
          </div>
        </div>

        {/* Programme Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">Programme</span>
            <p className="text-sm font-semibold text-slate-950 font-sans mt-1 leading-snug">SUSTAIN CPD Programme</p>
          </div>
        </div>

        {/* Cohort Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">Cohort</span>
            <p className="text-sm font-semibold text-slate-950 font-sans mt-1 leading-snug">Kano Youth Employability Cohort</p>
          </div>
        </div>

        {/* CPD Progress Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">CPD Progress</span>
            <p className="text-sm font-semibold text-slate-950 font-sans mt-1 leading-none">22 of 35 credits</p>
          </div>
          <div className="mt-2.5">
            <div className="w-full bg-slate-200/50 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: "63%" }}></div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-1.5 block">13 credits remaining</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Button 
          variant="custom"
          onClick={() => navigateTo("/learner/journey")}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2.5 rounded-xl min-h-[44px] transition-colors"
        >
          View My Journey
        </Button>
        <Button 
          variant="custom"
          onClick={() => navigateTo("/learner/cpd-record")}
          className="w-full bg-white border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 text-xs font-semibold py-2.5 rounded-xl min-h-[44px] transition-colors"
        >
          View Certificate Track
        </Button>
      </div>
    </Card>
  );
}

// 11. RIGHT CARD 3 — NEXT COURSE ACTIONS
function NextCourseActionsRightCard({ navigateTo }: { navigateTo: (path: any) => void }) {
  const actions = [
    "Continue Preparing for Interviews.",
    "Review low-bandwidth resources.",
    "Continue Work Readiness Assignment.",
    "Check Certificate & CPD record."
  ];

  return (
    <Card className="p-5 bg-white border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
      <div className="border-b border-slate-150 pb-2">
        <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-sans">Next Course Actions</span>
      </div>

      <ul className="space-y-2.5 text-xs text-slate-700 font-medium list-none pl-0">
        {actions.map((act, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-5 h-5 bg-emerald-50 text-emerald-900 text-[10px] font-extrabold rounded-full flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <span className="leading-relaxed">{act}</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
        <Button 
          variant="custom"
          onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
          className="text-[11px] font-semibold py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl"
        >
          Continue Lesson
        </Button>
        <Button 
          variant="custom"
          onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
          className="text-[11px] font-semibold py-2 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 rounded-xl"
        >
          Open Assessment
        </Button>
      </div>
    </Card>
  );
}

// 12. RIGHT CARD 5 — QUICK ACTIONS
function QuickActionsRightCard({ navigateTo }: { navigateTo: (path: any) => void }) {
  const list = [
    { label: "View Curriculum", path: "/learner/courses/work-readiness-foundation", desc: "View syllabus and details" },
    { label: "Continue Lesson", path: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews", desc: "Resume active topic" },
    { label: "Open Resource", path: "/learner/resources/low-bandwidth-reading-version", desc: "Lightweight reading format" },
    { label: "Open Assessment", path: "/learner/assessments/work-readiness-assignment", desc: "Work Readiness portfolio" },
    { label: "View Certificate Track", path: "/learner/certificates/work-readiness-certificate", desc: "Milestones and progress" },
    { label: "Open Support", path: "/learner/support", desc: "Get help from Halima" }
  ];

  return (
    <Card className="p-5 bg-white border-slate-200 rounded-2xl shadow-sm text-left space-y-3">
      <div className="border-b border-slate-150 pb-2">
        <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-sans">Quick Actions</span>
      </div>

      <div className="space-y-1">
        {list.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigateTo(item.path as any)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-slate-700 hover:text-slate-950 hover:bg-slate-50 hover:border-emerald-200 hover:translate-x-0.5 transition-all duration-200 ease-out cursor-pointer border border-transparent"
          >
            <div className="text-left">
              <p className="font-bold">{item.label}</p>
              <p className="text-[10px] text-slate-450 font-medium">{item.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        ))}
      </div>
    </Card>
  );
}

// 13. COMPACT COMMON HEADER FOR TABLET & MOBILE
function MobileTabletCompactHeader({ setMobileMenuOpen }: { setMobileMenuOpen: (val: boolean) => void }) {
  const { navigateTo } = useRoute();
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-5 sticky top-0 z-45 shadow-xs">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer rounded-lg hover:bg-slate-50 shrink-0"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>
        <span className="text-md font-extrabold tracking-tight text-emerald-900 font-sans">SUSTAIN LMS</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigateTo("/learner/notifications")}
          className="p-1.5 text-slate-500 hover:text-slate-900 relative cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
        </button>
        <div 
          onClick={() => navigateTo("/learner/profile")}
          className="h-8 w-8 rounded-full bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center cursor-pointer shadow-xs shrink-0"
        >
          AM
        </div>
      </div>
    </header>
  );
}

// 14. MOBILE MENU DRAWER
function MobileMenuDrawer({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  navigateTo 
}: { 
  mobileMenuOpen: boolean; 
  setMobileMenuOpen: (val: boolean) => void;
  navigateTo: (path: any) => void;
}) {
  const drawerItems = [
    { label: "Dashboard", path: "/learner", icon: LayoutDashboard },
    { label: "My Journey", path: "/learner/journey", icon: Compass },
    { label: "My Courses", path: "/learner/courses", icon: BookOpen, active: true },
    { label: "Assessments", path: "/learner/assessments", icon: GraduationCap },
    { label: "Certificates & CPD", path: "/learner/certificates", icon: Award },
    { label: "Community", path: "/learner/community", icon: Users },
    { label: "Resources", path: "/learner/resources", icon: FolderOpen }
  ];

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs animate-fade-in" onClick={() => setMobileMenuOpen(false)} />
      <div className="relative w-72 max-w-sm bg-white h-full p-6 flex flex-col justify-between shadow-2xl z-50 animate-in slide-in-from-left duration-200">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="text-left">
              <span className="text-xs font-bold text-slate-400">Youth Employability</span>
              <h2 className="text-md font-extrabold text-emerald-900 font-sans mt-0.5">SUSTAIN LMS</h2>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-1">
            {drawerItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo(item.path as any);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-left transition-colors cursor-pointer ${
                    item.active 
                      ? "bg-emerald-50 text-emerald-950" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0 text-emerald-800" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 text-left">
          <p className="text-[10px] font-bold text-slate-400">CONNECTED LEARNER</p>
          <p className="text-xs font-extrabold text-slate-900 font-sans mt-1">Aisha Mohammed</p>
          <p className="text-[10px] text-slate-500 font-medium">SUST-LRN-0442</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   LAYOUT 1: DESKTOP WORKSPACE (hidden lg:flex)
   ============================================================================ */
function DesktopLearnerCourses(props: LayoutProps) {
  const {
    filteredCourses,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    showToast,
    handleApplyFilters,
    handleResetFilters,
    navigateTo
  } = props;

  return (
    <div id="desktop-courses" className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full">
      
      {/* Persisted Sidebar */}
      <LearnerSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          
          {/* Header Search sync to page query */}
          <div className="relative w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search courses, lessons, materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 focus:outline-hidden focus:border-emerald-850"
            />
          </div>

          {/* Header Navigation Extras */}
          <div className="flex items-center gap-4">
            
            {/* Notifications Action */}
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg relative transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500"></span>
            </button>

            {/* Support Help Action */}
            <button 
              onClick={() => navigateTo("/learner/support")}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              title="Help & Support"
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            <span className="h-5 w-px bg-slate-250"></span>

            {/* User Profile Info Card */}
            <div 
              onClick={() => navigateTo("/learner/profile")}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90"
              title="Profile Settings"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                AM
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Aisha Mohammed</p>
                <p className="text-[10px] text-slate-450 font-bold">SUST-LRN-0442</p>
              </div>
            </div>

          </div>
        </header>

        {/* Workspace Body Grid */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Grid Splitter: Main (Left) and Supporting widgets (Right) */}
            <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
              
              {/* Left Column Area */}
              <div className="space-y-6">
                
                {/* Hero section */}
                <LearnerCoursesHero navigateTo={navigateTo} />

                {/* Course summaries cards */}
                <CourseSummaryCards navigateTo={navigateTo} />

                {/* Active course focus banner */}
                <ActiveCourseFocus navigateTo={navigateTo} />

                {/* Course search filters */}
                <CourseFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  handleApplyFilters={handleApplyFilters}
                  handleResetFilters={handleResetFilters}
                />

                {/* Current course cards display list */}
                <AssignedCourseList
                  filteredCourses={filteredCourses}
                  showToast={showToast}
                  navigateTo={navigateTo}
                />

                {/* Lesson Materials links */}
                <CurrentLessonMaterials
                  navigateTo={navigateTo}
                  showToast={showToast}
                />

                {/* Certificate link stats */}
                <AssessmentCertificateConnection navigateTo={navigateTo} />

                {/* Activity Tracker log */}
                <RecentCourseActivity navigateTo={navigateTo} />

              </div>

              {/* Right Column widgets */}
              <div className="space-y-6">
                
                {/* Course status quick row */}
                <CourseStatusRightCard navigateTo={navigateTo} />

                {/* Pathway details card */}
                <LearningPathwayContextRightCard navigateTo={navigateTo} />

                {/* Step sequence */}
                <NextCourseActionsRightCard navigateTo={navigateTo} />

                {/* Support module wrapper */}
                <LearnerSupportCard className="bg-emerald-50/60 rounded-2xl border border-emerald-200" />

                {/* Simple quick list */}
                <QuickActionsRightCard navigateTo={navigateTo} />

              </div>

            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

/* ============================================================================
   LAYOUT 2: TABLET WORKSPACE (hidden md:block lg:hidden)
   ============================================================================ */
function TabletLearnerCourses(props: LayoutProps) {
  const {
    filteredCourses,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    showToast,
    handleApplyFilters,
    handleResetFilters,
    navigateTo,
    mobileMenuOpen,
    setMobileMenuOpen
  } = props;

  return (
    <div id="tablet-courses" className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      
      {/* Mobile/Tablet Compact Header bar */}
      <MobileTabletCompactHeader setMobileMenuOpen={setMobileMenuOpen} />

      {/* Slideout Drawer menu */}
      <MobileMenuDrawer 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        navigateTo={navigateTo} 
      />

      {/* Scrollable Container */}
      <main className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        
        {/* 1. Hero block */}
        <LearnerCoursesHero navigateTo={navigateTo} />

        {/* 2. Summaries layout */}
        <CourseSummaryCards navigateTo={navigateTo} />

        {/* 3. Recommended action */}
        <ActiveCourseFocus navigateTo={navigateTo} />

        {/* 4. Display card list */}
        <AssignedCourseList
          filteredCourses={filteredCourses}
          showToast={showToast}
          navigateTo={navigateTo}
        />

        {/* 5. Course Search Filters */}
        <CourseFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
        />

        {/* 6. Learning Materials */}
        <CurrentLessonMaterials
          navigateTo={navigateTo}
          showToast={showToast}
        />

        {/* 7. Connection card */}
        <AssessmentCertificateConnection navigateTo={navigateTo} />

        {/* 8. Recent course activity logs */}
        <RecentCourseActivity navigateTo={navigateTo} />

        {/* 9. Supporting widgets stacked nicely */}
        <CourseStatusRightCard navigateTo={navigateTo} />

        <LearningPathwayContextRightCard navigateTo={navigateTo} />

        <NextCourseActionsRightCard navigateTo={navigateTo} />

        <LearnerSupportCard className="bg-emerald-50/60 rounded-2xl border border-emerald-200" />

        <QuickActionsRightCard navigateTo={navigateTo} />

      </main>

      {/* Fixed bottom navigator */}
      <LearnerMobileNav />

    </div>
  );
}

/* ============================================================================
   LAYOUT 3: MOBILE WORKSPACE (md:hidden)
   ============================================================================ */
/* ============================================================================
   LAYOUT 3: MOBILE WORKSPACE (md:hidden)
   ============================================================================ */
function OfflinePromptCard({ navigateTo, showToast }: { navigateTo: (path: any) => void; showToast: (msg: string) => void }) {
  return (
    <Card className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-left space-y-4">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-emerald-100/60 text-emerald-900 rounded-xl shrink-0">
          <BookOpen className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-900">Study Offline</h4>
          <p className="text-xs text-slate-650 leading-relaxed font-medium">
            Travelling or have a weak signal? Access our lightweight reading version to keep learning with minimal data.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        <Button 
          variant="custom"
          onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
          className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold py-2 px-4 rounded-xl min-h-[40px] transition-colors cursor-pointer"
        >
          Open Low-Bandwidth Version
        </Button>
        <Button 
          variant="custom"
          onClick={() => showToast("Download started in this frontend prototype.")}
          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold py-2 px-4 rounded-xl min-h-[40px] transition-colors cursor-pointer"
        >
          Download PDF Guide
        </Button>
      </div>
    </Card>
  );
}

function MobileLearnerCourses(props: LayoutProps) {
  const {
    filteredCourses,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    showToast,
    handleApplyFilters,
    handleResetFilters,
    navigateTo,
    mobileMenuOpen,
    setMobileMenuOpen
  } = props;

  return (
    <div id="mobile-courses" className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      
      {/* Mobile Tablet Compact Header */}
      <MobileTabletCompactHeader setMobileMenuOpen={setMobileMenuOpen} />

      {/* Slideout Menu Drawer */}
      <MobileMenuDrawer 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        navigateTo={navigateTo} 
      />

      {/* Body content */}
      <main className="px-4 py-4 space-y-4">
        
        {/* 1. Hero banner */}
        <LearnerCoursesHero navigateTo={navigateTo} />

        {/* 2. Quick stats */}
        <CourseSummaryCards navigateTo={navigateTo} />

        {/* 3. Current course highlight */}
        <ActiveCourseFocus navigateTo={navigateTo} />

        {/* 4. Course search filters */}
        <CourseFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
        />

        {/* 5. Assigned list */}
        <AssignedCourseList
          filteredCourses={filteredCourses}
          showToast={showToast}
          navigateTo={navigateTo}
        />

        {/* 6. Active course/module preview */}
        <CurrentLessonMaterials
          navigateTo={navigateTo}
          showToast={showToast}
        />

        {/* 7. CPD and certificate link */}
        <AssessmentCertificateConnection navigateTo={navigateTo} />

        {/* 8. Recent activities log */}
        <RecentCourseActivity navigateTo={navigateTo} />

        {/* 9. Learning pathway indicator / context */}
        <LearningPathwayContextRightCard navigateTo={navigateTo} />

        {/* 10. Recommended actions/support */}
        <LearnerSupportCard className="bg-emerald-50/60 rounded-2xl border border-emerald-200" />

        {/* 11. Offline prompt */}
        <OfflinePromptCard navigateTo={navigateTo} showToast={showToast} />

      </main>

      {/* Navigator bar */}
      <LearnerMobileNav />

    </div>
  );
}
