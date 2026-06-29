import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { StatusChip } from "../../components/ui/StatusChip";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { 
  Play, 
  Calendar, 
  Check, 
  HelpCircle, 
  Info,
  ChevronRight,
  Bell,
  Search,
  BookOpen,
  Zap,
  Compass,
  Lock,
  Award,
  Activity,
  FileText,
  MessageSquare,
  Clock,
  X,
  Menu
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { useLearningState } from "../../context/LearningStateContext";
import { LmsSimulatorWidget } from "../../components/learner/LmsSimulatorWidget";
import { CourseCurriculumAccordion, SUSTAIN_CURRICULUM_DATA } from "../../components/learner/CourseCurriculumAccordion";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";

interface JourneyActivePathwayCardProps {
  onContinue: () => void;
}

export function JourneyActivePathwayCard({ onContinue }: JourneyActivePathwayCardProps) {
  const { cpdCredits, totalCpdCredits } = useLearningState();
  const pathway = "Youth Employability Pathway";
  const programme = "SUSTAIN CPD Programme";
  const currentCourse = "Work Readiness Foundation";
  const currentLesson = "Preparing for Interviews";
  const facilitator = "Halima Sani";
  const nextMilestone = "Work Readiness Assignment";
  const progress = Math.min(100, Math.round((cpdCredits / totalCpdCredits) * 100));

  return (
    <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-850 shadow-sm overflow-hidden p-6 relative text-left">
      {/* Subtle background decoration */}
      <div className="absolute right-0 bottom-0 opacity-[0.07] pointer-events-none translate-x-12 translate-y-12">
        <Compass className="h-64 w-64 text-white stroke-[1.5]" />
      </div>

      <div className="relative space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-800 rounded-xl flex items-center justify-center border border-emerald-700/60 shadow-inner">
            <Compass className="h-5.5 w-5.5 text-emerald-100" />
          </div>
          <div>
            <span className="text-[10px] text-emerald-100 font-extrabold uppercase tracking-widest leading-none block">
              Active Pathway
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight mt-1">
              {pathway}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-emerald-50/90 leading-relaxed font-medium max-w-2xl">
          You are currently enrolled in the <span className="font-bold text-white">{programme}</span>. Complete your current learning stage and assessment task to move toward certificate review.
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 py-4 border-t border-b border-emerald-800/60 text-xs">
          <div className="space-y-1">
            <span className="text-emerald-200 font-bold block">Current course:</span>
            <span className="text-white font-extrabold text-[13px] leading-tight block">
              {currentCourse}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-emerald-200 font-bold block">Current lesson:</span>
            <span className="text-white font-extrabold text-[13px] leading-tight block">
              {currentLesson}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-emerald-200 font-bold block">Facilitator:</span>
            <span className="text-white font-extrabold text-[13px] leading-tight block">
              {facilitator}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-emerald-200 font-bold block">Next milestone:</span>
            <span className="text-white font-extrabold text-[13px] leading-tight block">
              {nextMilestone}
            </span>
          </div>
        </div>

        {/* Progress & CTA Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-1">
          {/* Progress bar */}
          <div className="flex-1 max-w-md space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-emerald-50">Overall Completion</span>
                <LearnerContextHint 
                  title="What this means" 
                  text="Overall completion combines your assigned learning progress, assessment activity, and pathway milestones." 
                />
              </div>
              <span className="font-bold text-white">{progress}% Complete</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <Button
              onClick={onContinue}
              variant="custom"
              className="w-full h-12 md:h-14 px-6 bg-white text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-100 hover:shadow-md active:bg-emerald-100 font-semibold rounded-xl inline-flex items-center justify-center gap-2 border border-white/70 shadow-sm transition-all duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
              aria-label="Continue Youth Employability Pathway"
            >
              <Play className="h-[18px] w-[18px] text-emerald-800 fill-current shrink-0" />
              <span>Continue Pathway</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LearnerJourneyPage() {
  const { navigateTo } = useRoute();
  const { modules, cpdCredits, totalCpdCredits, certificateStatus } = useLearningState();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  const [showReviewPopover, setShowReviewPopover] = useState(false);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  const handleAction = (route: string) => {
    navigateTo(route as any);
  };

  const handleToastAction = (msg: string) => {
    showToast(msg, "info");
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

  // -------------------------------------------------------------------------
  // REUSABLE SUB-SECTIONS
  // -------------------------------------------------------------------------

  // Section 1: Journey Hero
  const JourneyHero = () => (
    <Card id="journey-hero" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch text-left">
        {/* Left Area */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <span className="hover:text-slate-650 cursor-pointer" onClick={() => handleAction("/learner")}>Dashboard</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-800">My Journey</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Active Pathway
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {learner.pathway}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              My Journey
            </h1>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xl">
              Track your learning pathway, course progress, assessment milestones, CPD credits, and certificate readiness.
            </p>
          </div>

          {/* Context row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-extrabold">Learner</p>
              <p className="text-slate-900 truncate mt-0.5">{learner.name}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-extrabold">Learner ID</p>
              <p className="text-slate-900 truncate mt-0.5 font-mono">{learner.id}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-extrabold">Cohort</p>
              <p className="text-slate-900 truncate mt-0.5">{learner.cohort}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-extrabold">Facilitator</p>
              <p className="text-emerald-800 font-bold truncate mt-0.5">{learner.facilitator}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            >
              Continue Learning
            </Button>
            <Button
              onClick={() => handleAction("/learner/certificates/work-readiness-certificate")}
              variant="outline"
              className="border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer"
            >
              View Certificate Track
            </Button>
          </div>
        </div>

        {/* Right Deep Green Panel */}
        <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[220px]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-850/60 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-[9px] font-bold text-emerald-200 uppercase tracking-widest bg-emerald-800/75 px-2 py-0.5 rounded-md inline-block">
              Current Milestone
            </span>
            <h4 className="text-base font-bold text-white leading-snug">
              Work Readiness Foundation
            </h4>
            <p className="text-[11px] text-emerald-50 leading-relaxed font-medium">
              Continue Preparing for Interviews and complete the Work Readiness Assignment when ready.
            </p>
          </div>

          <div className="relative z-10 border-t border-emerald-800/60 pt-3.5 mt-3.5 space-y-3.5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-emerald-200/80 font-semibold font-sans uppercase tracking-wider">Pathway Progress</p>
                <p className="text-sm font-extrabold text-white font-sans mt-0.5">
                  {Math.min(100, Math.round((cpdCredits / totalCpdCredits) * 100))}%
                </p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-200/80 font-semibold font-sans uppercase tracking-wider">CPD Credits</p>
                <p className="text-sm font-extrabold text-white font-sans mt-0.5">
                  {cpdCredits} of {totalCpdCredits}
                </p>
              </div>
            </div>

            <Button
              onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
              variant="custom"
              className="w-full bg-white text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 active:bg-emerald-100 font-semibold text-xs py-2.5 rounded-xl inline-flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
              aria-label="Continue Preparing for Interviews"
            >
              <Play className="h-3.5 w-3.5 fill-current shrink-0 text-emerald-850" />
              <span>Continue Lesson</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  // Section 2: Journey Summary Cards
  const JourneySummaryCards = () => {
    const progressVal = Math.min(100, Math.round((cpdCredits / totalCpdCredits) * 100));
    const completedCount = modules.filter(m => m.status === "completed").length;

    return (
      <div id="journey-summary-cards" className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {/* 1. Overall Progress */}
        <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Overall Progress</span>
            <p className="text-xl font-black text-emerald-850 font-sans">{progressVal}%</p>
            <span className="text-[10px] text-slate-500 font-medium block">Pathway completion</span>
          </div>
          <LearnerContextHint
            title="What this means"
            text="Overall completion combines your assigned learning progress, assessment activity, and pathway milestones."
            align="right"
          />
        </Card>

        {/* 2. Courses Completed */}
        <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex flex-col justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Courses Completed</span>
            <p className="text-xl font-bold text-slate-800 font-sans">{completedCount} of {modules.length}</p>
            <span className="text-[10px] text-slate-500 font-medium block">Assigned pathway courses</span>
          </div>
        </Card>

        {/* 3. CPD Credits */}
        <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">CPD Credits</span>
            <p className="text-xl font-bold text-slate-800 font-sans">{cpdCredits} of {totalCpdCredits}</p>
            <span className="text-[10px] text-slate-500 font-medium block">
              {modules.find(m => m.id === "m3")?.assignmentStatus === "submitted" ? "4 pending review" : "Based on completion"}
            </span>
          </div>
          <LearnerContextHint
            title="How this works"
            text="Confirmed CPD credits count toward your SUSTAIN CPD Programme record. Pending credits depend on assessment review."
            align="right"
          />
        </Card>

        {/* 4. Certificate Review */}
        <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Certificate Status</span>
            <p className={`text-xs font-bold ${
              certificateStatus === "Issued" ? "text-emerald-800" :
              certificateStatus === "Under Review" ? "text-blue-800" :
              certificateStatus === "Ready for Review" ? "text-amber-800" :
              "text-slate-550"
            }`}>{certificateStatus}</p>
            <span className="text-[10px] text-slate-500 font-medium block">
              {certificateStatus === "Issued" ? "Issued & Validated" : "Not issued yet"}
            </span>
          </div>
          <LearnerContextHint
            title="Helpful note"
            text="Certificate review can move forward after required learning, assessment, and CPD checks are completed."
            align="right"
          />
        </Card>
      </div>
    );
  };

  // Section 3: Active Pathway Card (Reused JourneyActivePathwayCard)
  const ActivePathwayWrapper = () => (
    <div id="active-pathway-section">
      <JourneyActivePathwayCard onContinue={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")} />
    </div>
  );

  // Section 4: Pathway Curriculum (Accordion UX)
  const PathwayRoadmap = () => {
    return (
      <Card id="pathway-roadmap" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight font-heading">Pathway Curriculum</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">Your syllabus progress from completed foundation courses to certificate-linked assessment tasks.</p>
        </div>

        <CourseCurriculumAccordion
          course={SUSTAIN_CURRICULUM_DATA}
          compact={true}
        />
      </Card>
    );
  };

  // Section 5: Current Learning Stage
  const CurrentLearningStage = () => (
    <Card id="current-learning-stage" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Current Learning Stage</h3>
        <p className="text-xs text-slate-500 font-medium">The next practical step in your pathway.</p>
      </div>

      <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-4 hover:border-emerald-200 transition-all duration-200">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">Preparing for Interviews</h4>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Lesson in progress
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold font-mono">Work Readiness Foundation • 68% complete</p>
              <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                Practise clear interview answers using examples from your learning, work, volunteering, or community experience.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col text-xs text-slate-500 gap-1.5 shrink-0 bg-white border border-slate-150 p-3 rounded-lg md:w-48 font-medium">
            <span className="flex items-center gap-1.5 font-semibold">
              <Calendar className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
              18 min lesson
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <FileText className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
              Reading and practice
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Award className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
              Linked assignment
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-200/60">
          <Button 
            onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
            className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Continue Lesson
          </Button>
          <Button 
            onClick={() => handleAction("/learner/resources/low-bandwidth-reading-version")}
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer"
          >
            Open Resource
          </Button>
          <Button 
            onClick={() => handleAction("/learner/community/interview-preparation-discussion")}
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer"
          >
            Open Discussion
          </Button>
        </div>
      </div>
    </Card>
  );

  // Section 6: Assessment and Certificate Milestone
  const AssessmentCertificateMilestone = () => (
    <Card id="assessment-certificate-milestone" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-5">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-slate-950 font-heading tracking-tight">
          Assessment & Certificate Milestone
        </h3>
        <p className="text-sm font-normal text-slate-600 mt-1">
          Your current assessment is linked to CPD credits and certificate readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Assignment Progress Block */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 font-sans">Current task</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-850 border border-amber-200">
                Draft started
              </span>
            </div>
            <h4 className="text-base font-semibold text-slate-950 font-sans">Work Readiness Assignment</h4>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-medium font-sans text-slate-600">
                <span>Halfway through your draft</span>
                <span className="font-bold text-emerald-800">50%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: "50%" }} />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Complete your draft response and declaration before sending it for facilitator review.
            </p>
          </div>

          <div className="relative text-xs text-amber-850 bg-amber-50/60 border border-amber-100/80 p-3 rounded-xl mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-700 shrink-0" />
              <span className="font-medium">Facilitator review required</span>
            </div>
            <button
              type="button"
              onClick={() => setShowReviewPopover(!showReviewPopover)}
              className="p-1 text-slate-400 hover:text-emerald-700 transition-colors focus:outline-hidden"
              aria-label="How review works explanation"
            >
              <HelpCircle className="h-4.5 w-4.5" />
            </button>
            
            {showReviewPopover && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-slate-900 text-white text-[11px] leading-relaxed p-3 rounded-xl shadow-lg z-20 border border-slate-800 animate-in fade-in duration-150">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="font-bold text-amber-400">Review Process</span>
                  <button onClick={() => setShowReviewPopover(false)} className="text-slate-400 hover:text-white">
                    <X className="h-3 w-3" />
                  </button>
                </div>
                Halima Sani will review your written response before CPD credits are confirmed.
              </div>
            )}
          </div>
        </div>

        {/* Right: Certificate Status Block */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 font-sans">Target certificate</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Ready for review
              </span>
            </div>
            <h4 className="text-base font-semibold text-slate-950 font-sans">Work Readiness Certificate</h4>
            
            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-500 font-medium">Issue state</span>
                <span className="font-semibold text-slate-950">Not issued yet</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-slate-100">
                <span className="text-slate-500 font-medium">CPD credits linked</span>
                <span className="font-semibold text-slate-950">22 of 35 achieved</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-slate-100">
                <span className="text-slate-500 font-medium">Pending credits</span>
                <span className="font-semibold text-amber-700">4 credits pending review</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl mt-4 leading-relaxed font-normal">
            Certificate review can begin once the required assessment, attendance, and portfolio checks are complete.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/60">
        <Button 
          onClick={() => handleAction("/learner/assessments/work-readiness-assessment/attempt")}
          variant="custom"
          className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all duration-150 cursor-pointer shadow-sm inline-flex items-center justify-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          Open Assessment
        </Button>
        <Button 
          onClick={() => handleAction("/learner/cpd-record")}
          variant="custom"
          className="bg-white text-emerald-800 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 font-semibold text-xs py-2.5 px-5 rounded-xl transition-all duration-150 cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          View Certificate Track
        </Button>
        <Button 
          onClick={() => handleAction("/learner/support")}
          variant="custom"
          className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 font-semibold text-xs py-2.5 px-5 rounded-xl transition-all duration-150 cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          Open Support
        </Button>
      </div>
    </Card>
  );

  // Section 7: Recommended Next Steps
  const RecommendedNextSteps = () => {
    const steps = [
      {
        id: 1,
        title: "Continue Preparing for Interviews",
        helper: "Complete the current lesson and practise structured interview answers.",
        actionLabel: "Continue Lesson",
        route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews"
      },
      {
        id: 2,
        title: "Review Low-Bandwidth Resource",
        helper: "Use the lightweight reading version to revise key points.",
        actionLabel: "Open Resource",
        route: "/learner/resources/low-bandwidth-reading-version"
      },
      {
        id: 3,
        title: "Continue Work Readiness Assignment",
        helper: "Apply what you learned to your certificate-linked assignment.",
        actionLabel: "Open Assessment",
        route: "/learner/assessments/work-readiness-assignment"
      },
      {
        id: 4,
        title: "Check Certificate & CPD Record",
        helper: "Review confirmed and pending credits before certificate review.",
        actionLabel: "View Certificate Track",
        route: "/learner/certificates/work-readiness-certificate"
      }
    ];

    return (
      <Card id="recommended-next-steps" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">Recommended Next Steps</h3>
          <p className="text-xs text-slate-500 font-medium">Use these recommended items to keep your pathway moving forward.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((st) => (
            <div key={st.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 text-left cursor-pointer group">
              <div className="space-y-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 shrink-0">
                  <Activity className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 pt-1 group-hover:text-emerald-900 leading-snug">{st.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  {st.helper}
                </p>
              </div>
              <Button 
                onClick={() => handleAction(st.route)}
                variant="outline"
                className="w-full text-[10px] font-black py-2 mt-4 border-slate-200 text-slate-700 hover:bg-white rounded-lg cursor-pointer"
              >
                {st.actionLabel}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Section 8: Journey Activity
  const JourneyActivity = () => {
    const logs = [
      { id: 1, label: "Pathway opened", context: "My Journey", time: "Today", isPrimary: true },
      { id: 2, label: "Lesson continued", context: "Preparing for Interviews", time: "Today", isPrimary: false },
      { id: 3, label: "Assignment draft saved", context: "Work Readiness Assignment", time: "Today", isPrimary: false },
      { id: 4, label: "Resource opened", context: "Low-Bandwidth Reading Version", time: "Yesterday", isPrimary: false },
      { id: 5, label: "Certificate record viewed", context: "Work Readiness Certificate", time: "2 days ago", isPrimary: false }
    ];

    return (
      <Card id="journey-activity" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">Journey Activity</h3>
          <p className="text-xs text-slate-500 font-medium">Activity history tied to your pathway learning roadmap.</p>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200 transition-all duration-150">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${log.isPrimary ? "bg-emerald-700" : "bg-slate-300"}`} />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-900">{log.label}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{log.context}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md font-mono">
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Right Side 1: Pathway Status Widget
  const PathwayStatusWidget = () => (
    <Card className="p-5 border border-slate-200 bg-white space-y-4 rounded-2xl shadow-sm hover:border-emerald-250 transition-all duration-200 text-left">
      <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-100 pb-2.5">
        Pathway Status
      </h3>
      
      <div className="space-y-3.5">
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Pathway</p>
          <p className="text-sm font-semibold text-slate-950 font-sans mt-0.5">{learner.pathway}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Programme</p>
          <p className="text-sm font-semibold text-slate-950 font-sans mt-0.5">{learner.programme}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Progress</p>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: "42%" }} />
            </div>
            <p className="text-sm font-bold text-slate-950 font-sans shrink-0">42%</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Current Course</p>
          <p className="text-sm font-semibold text-emerald-800 font-sans mt-0.5">Work Readiness Foundation</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Facilitator</p>
          <p className="text-sm font-semibold text-slate-950 font-sans mt-0.5">{learner.facilitator}</p>
        </div>
      </div>

      <Button
        onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
        variant="custom"
        className="w-full bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white font-semibold text-xs py-3 rounded-xl transition-colors duration-150 cursor-pointer mt-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        aria-label="Continue Youth Employability Pathway"
      >
        Continue Learning
      </Button>
    </Card>
  );

  // Right Side 2: Course & Lesson Context Widget
  const CourseLessonContextWidget = () => (
    <Card className="p-5 border border-slate-200 bg-white space-y-4 rounded-2xl shadow-sm hover:border-emerald-250 transition-all duration-200 text-left">
      <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-100 pb-2.5">
        Course & Lesson Context
      </h3>

      <div className="space-y-3.5">
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Course</p>
          <p className="text-sm font-semibold text-slate-950 font-sans mt-0.5">Work Readiness Foundation</p>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: "42%" }} />
            </div>
            <p className="text-xs font-bold text-slate-600 font-sans shrink-0">42%</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Lesson</p>
          <p className="text-sm font-semibold text-emerald-805 font-sans mt-0.5">Preparing for Interviews</p>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: "68%" }} />
            </div>
            <p className="text-xs font-bold text-emerald-800 font-sans shrink-0">68%</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Mode</p>
          <p className="text-sm font-semibold text-slate-700 font-sans mt-0.5">Reading and practice</p>
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <Button
          onClick={() => handleAction("/learner/courses/work-readiness-foundation")}
          variant="custom"
          className="w-full bg-white text-slate-800 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 font-semibold text-xs py-2.5 rounded-xl transition-colors duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          Open Course
        </Button>
        <Button
          onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
          variant="custom"
          className="w-full bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors duration-150 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          Continue Lesson
        </Button>
      </div>
    </Card>
  );

  // Right Side 3: Certificate & CPD Connection Widget
  const CertificateCpdConnectionWidget = () => (
    <Card className="p-5 border border-slate-200 bg-white space-y-4 rounded-2xl shadow-sm hover:border-emerald-250 transition-all duration-200 text-left">
      <h3 className="text-sm font-bold text-slate-900 font-heading border-b border-slate-100 pb-2.5">
        Certificate & CPD Connection
      </h3>

      <div className="space-y-3.5 text-xs">
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Certificate</p>
          <p className="text-sm font-semibold text-slate-950 font-sans mt-0.5">Work Readiness Certificate</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Status</p>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mt-1.5">
            Ready for certificate review
          </span>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Issue State</p>
          <p className="text-sm font-semibold text-slate-700 font-sans mt-0.5">Not issued</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">CPD Progress</p>
          <p className="text-sm font-semibold text-slate-950 font-sans mt-0.5">22 of 35 credits</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 font-sans">Pending Credits</p>
          <p className="text-sm font-semibold text-amber-700 font-sans mt-0.5">4 credits</p>
        </div>
      </div>

      <Button
        onClick={() => handleAction("/learner/certificates/work-readiness-certificate")}
        variant="custom"
        className="w-full bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 text-white font-semibold text-xs py-3 rounded-xl transition-colors duration-150 cursor-pointer mt-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        View Certificate Track
      </Button>
    </Card>
  );

  // Right Side 5: Quick Actions Widget
  const QuickActionsWidget = () => {
    const actions = [
      { id: "continue", label: "Continue Lesson", route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews", helper: "Open current lesson workplace." },
      { id: "course", label: "Open Course", route: "/learner/courses/work-readiness-foundation", helper: "Explore course curriculum tree." },
      { id: "assessment", label: "Open Assessment", route: "/learner/assessments/work-readiness-assignment", helper: "Draft portfolio assignment task." },
      { id: "resource", label: "Open Resource", route: "/learner/resources/low-bandwidth-reading-version", helper: "Access pathway learning summaries." },
      { id: "certificate", label: "View Certificate Track", route: "/learner/certificates/work-readiness-certificate", helper: "Review review eligibility." },
      { id: "support", label: "Open Support", route: "/learner/support", helper: "Connect with the Kano help desk." }
    ];

    return (
      <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Quick Actions
        </h3>

        <div className="space-y-2">
          {actions.map((act) => (
            <div 
              key={act.id}
              onClick={() => handleAction(act.route)}
              className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-slate-50/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">
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
  // DESKTOP LAYOUT (hidden lg:flex)
  // -------------------------------------------------------------------------
  const DesktopLearnerJourney = () => (
    <div id="desktop-journey" className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full">
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
              placeholder="Search pathway, milestones, courses, CPD..."
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
          <JourneyHero />

          {/* Section 2: Summary Cards */}
          <JourneySummaryCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
            
            {/* Left Area (Core cards) */}
            <div className="space-y-6">
              <ActivePathwayWrapper />
              <PathwayRoadmap />
              <CurrentLearningStage />
              <AssessmentCertificateMilestone />
              <RecommendedNextSteps />
              <JourneyActivity />
            </div>

            {/* Right Area (Side utilities) */}
            <div className="space-y-6 shrink-0">
              <PathwayStatusWidget />
              <CourseLessonContextWidget />
              <CertificateCpdConnectionWidget />
              <LearnerSupportCard 
                className="p-5 border border-slate-200 rounded-xl"
                title="Support Center"
                text="Need assistance with your learning pathway?"
                buttonText="Open Support"
              />
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
  const TabletLearnerJourney = () => (
    <div id="tablet-journey" className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      {/* Compact Learner Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            SUSTAIN <span className="text-emerald-800">LMS</span>
          </span>
          <Badge className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0 border-0 font-bold">Tablet</Badge>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => handleAction("/learner/notifications")} className="p-1 text-slate-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700" />
          </button>
          <button onClick={() => handleAction("/learner/support")} className="p-1 text-slate-500">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="h-7 w-px bg-slate-200" />
          <div onClick={() => handleAction("/learner/profile")} className="h-8 w-8 bg-emerald-900 text-white font-bold rounded-full flex items-center justify-center cursor-pointer">
            AM
          </div>
        </div>
      </header>

      {/* Main Content stacked cleanly */}
      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        <JourneyHero />
        <JourneySummaryCards />
        <ActivePathwayWrapper />
        <PathwayRoadmap />
        <CurrentLearningStage />
        <AssessmentCertificateMilestone />
        <RecommendedNextSteps />
        <JourneyActivity />
        
        {/* Tablet stacks sidebar components at bottom */}
        <PathwayStatusWidget />
        <CourseLessonContextWidget />
        <CertificateCpdConnectionWidget />
        <LearnerSupportCard 
          className="p-5 border border-slate-200 rounded-xl"
          title="Support Center"
          text="Need assistance with your learning pathway?"
          buttonText="Open Support"
        />
        <QuickActionsWidget />
      </div>

      {/* Fixed Tablet Bottom Nav */}
      <LearnerMobileNav />
    </div>
  );

  // -------------------------------------------------------------------------
  // MOBILE LAYOUT (md:hidden)
  // -------------------------------------------------------------------------
  const MobileLearnerJourney = () => (
    <div id="mobile-journey" className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      {/* Compact Mobile Header */}
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-extrabold text-sm tracking-tight text-slate-900">
          SUSTAIN <span className="text-emerald-800">LMS</span>
        </span>
        <div className="flex items-center gap-3">
          <button onClick={() => handleAction("/learner/notifications")} className="p-1 text-slate-500 relative">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-0 right-0 h-1 w-1 rounded-full bg-emerald-700" />
          </button>
          <button onClick={() => handleAction("/learner/support")} className="p-1 text-slate-500">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
          <div onClick={() => handleAction("/learner/profile")} className="h-7 w-7 bg-emerald-900 text-white font-bold text-xs rounded-full flex items-center justify-center cursor-pointer">
            AM
          </div>
        </div>
      </header>

      {/* Mobile Stacked Body */}
      <div className="px-4 py-5 space-y-5">
        <JourneyHero />
        <JourneySummaryCards />
        <ActivePathwayWrapper />
        <PathwayRoadmap />
        <CurrentLearningStage />
        <AssessmentCertificateMilestone />
        <RecommendedNextSteps />
        <JourneyActivity />
        
        {/* Mobile side-panels stacked */}
        <PathwayStatusWidget />
        <CourseLessonContextWidget />
        <CertificateCpdConnectionWidget />
        <LearnerSupportCard 
          className="p-5 border border-slate-200 rounded-xl"
          title="Support Center"
          text="Need assistance with your learning pathway?"
          buttonText="Open Support"
        />
        <QuickActionsWidget />
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

      {/* Responsive layout containers */}
      <DesktopLearnerJourney />
      <TabletLearnerJourney />
      <MobileLearnerJourney />

      {/* Simulator Widget for visual verification */}
      <LmsSimulatorWidget />
    </div>
  );
}
