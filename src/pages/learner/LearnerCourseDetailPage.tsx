import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { 
  ChevronRight,
  Award,
  Check,
  BookOpen,
  Clock,
  FileText,
  Calendar,
  Download,
  HelpCircle,
  Play,
  X
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { CourseCurriculumAccordion, SUSTAIN_CURRICULUM_DATA } from "../../components/learner/CourseCurriculumAccordion";
import { StatusChip } from "../../components/ui/StatusChip";

export function LearnerCourseDetailPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  // Learner Context
  const learnerContext = {
    pathway: "Youth Employability Pathway",
    facilitator: "Halima Sani"
  };

  // Course Context
  const courseData = {
    title: "Work Readiness Foundation",
    progress: 42,
    lessonsCompleted: "6 of 14",
    currentLesson: "Preparing for Interviews"
  };

  return (
    <div id="course-detail-root" className="space-y-6 max-w-7xl mx-auto w-full text-slate-950 pb-12 relative font-sans">
      {/* Toast Layer */}
      {toast && (
        <div 
          id="toast-notification"
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-2xl border border-slate-800 animate-slide-in-right max-w-sm"
        >
          <div className={`h-2 w-2 rounded-full ${
            toast.type === "success" ? "bg-emerald-500" :
            toast.type === "warning" ? "bg-amber-500" : "bg-blue-500"
          }`} />
          <span>{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:text-slate-300 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        
        {/* Main Column */}
        <div className="space-y-6">
          
          {/* 1. Course Hero Card */}
          <Card id="course-hero" className="p-6 md:p-8 bg-white border border-slate-200/80 shadow-sm rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-24 w-24 bg-blue-50/30 rounded-full blur-2xl -z-10 pointer-events-none" />

            <div className="space-y-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
                <span onClick={() => navigateTo("/learner/courses")} className="hover:text-emerald-900 hover:underline cursor-pointer transition-all">My Courses</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-800 font-semibold">{courseData.title}</span>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip status="course-in-progress" />
                <StatusChip status="certificate-linked" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2 text-left">
                <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-slate-900 leading-tight">
                  {courseData.title}
                </h1>
                <p className="text-sm md:text-base text-slate-650 max-w-2xl leading-relaxed">
                  Build practical skills for workplace readiness, interview preparation, and certificate-linked assessment.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                  className="interactive-button-primary font-bold text-xs py-3 px-6 rounded-xl shadow-xs cursor-pointer min-h-[44px]"
                >
                  Continue Lesson
                </Button>
                <Button
                  onClick={() => navigateTo("/learner/courses")}
                  variant="outline"
                  className="interactive-button-secondary font-bold text-xs py-3 px-5 rounded-xl cursor-pointer min-h-[44px]"
                >
                  Back to My Courses
                </Button>
              </div>
            </div>
          </Card>

          {/* 2. Soft Progress Strip */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 shadow-3xs text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Pathway</p>
                <p className="text-xs font-semibold text-slate-800 font-sans leading-tight break-words">{learnerContext.pathway}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Lessons</p>
                <p className="text-xs font-semibold text-slate-800 font-sans leading-tight">{courseData.lessonsCompleted} Completed</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Progress</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-800 font-sans">{courseData.progress}% Complete</span>
                  <div className="w-16">
                    <ProgressBar value={courseData.progress} size="sm" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Facilitator</p>
                <p className="text-xs font-semibold text-emerald-850 font-sans leading-tight">{learnerContext.facilitator}</p>
              </div>
            </div>
          </div>

          {/* 3. Continue Learning Card */}
          <Card className="p-5 md:p-6 bg-emerald-50/15 border border-emerald-100/80 rounded-3xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100/25 pb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-sans">Continue learning</h3>
                <p className="text-[11px] text-slate-500 font-sans">Resume where you left off to maintain your weekly target.</p>
              </div>
              <StatusChip status="lesson-in-progress" />
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-100/50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-200/50">
                  <BookOpen className="h-5 w-5 text-emerald-800" />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 font-heading">Preparing for Interviews</h4>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[11px] text-emerald-800 font-semibold font-sans">68% Complete</span>
                    <div className="w-20">
                      <ProgressBar value={68} size="sm" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-650 leading-relaxed font-sans pt-1">
                    Continue the interview preparation lesson and complete the linked checkpoint. Learn to apply the STAR model.
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-xs text-slate-500 gap-1.5 shrink-0 bg-white border border-slate-100 p-3 rounded-xl md:w-48 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-800" />
                  18 min lesson
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-emerald-800" />
                  Reading & practice
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-emerald-800" />
                  2 CPD credits linked
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-emerald-100/30">
              <Button 
                onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Continue Lesson
              </Button>
              <Button 
                onClick={() => {
                  const el = document.getElementById("course-curriculum");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                className="interactive-button-secondary font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer min-h-[44px]"
              >
                View Module
              </Button>
            </div>
          </Card>

          {/* 4. Module Activities Section */}
          <div className="space-y-4">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-slate-900 font-heading tracking-tight">Module activities</h3>
              <p className="text-xs text-slate-500">Current active lessons, assignments, and checkpoints in your current module.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100 text-left shadow-3xs">
              {/* Row 1: Lesson */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/55 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100/50">
                    <BookOpen className="h-5 w-5 text-emerald-800" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-400 font-sans uppercase">Lesson</span>
                    <h4 className="text-sm font-semibold text-slate-900 font-sans">Preparing for Interviews</h4>
                    <p className="text-[11px] text-slate-500">In progress • 2 CPD credits</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <StatusChip status="in-progress" />
                  <Button
                    onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3.5 rounded-lg shrink-0 cursor-pointer min-h-[38px]"
                  >
                    Continue Lesson
                  </Button>
                </div>
              </div>

              {/* Row 2: Checkpoint */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/55 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 border border-blue-100/50">
                    <Check className="h-5 w-5 text-blue-800" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-400 font-sans uppercase">Checkpoint</span>
                    <h4 className="text-sm font-semibold text-slate-900 font-sans">Low-Bandwidth Interview Practice</h4>
                    <p className="text-[11px] text-slate-500">Unlocks short text practice submission</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <StatusChip status="pending" />
                  <Button
                    onClick={() => {
                      showToast("Checkpoint low-bandwidth interview practice opened.", "info");
                      navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews");
                    }}
                    variant="outline"
                    className="interactive-button-secondary font-bold text-xs py-2 px-3.5 rounded-lg shrink-0 cursor-pointer min-h-[38px]"
                  >
                    Open Checkpoint
                  </Button>
                </div>
              </div>

              {/* Row 3: Assignment */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/55 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0 border border-amber-100/50">
                    <FileText className="h-5 w-5 text-amber-800" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-400 font-sans uppercase">Assignment</span>
                    <h4 className="text-sm font-semibold text-slate-900 font-sans">Work Readiness Assignment</h4>
                    <p className="text-[11px] text-slate-500">Contributes to final certificate review</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <StatusChip status="draft-saved" />
                  <Button
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-3.5 rounded-lg shrink-0 cursor-pointer min-h-[38px]"
                  >
                    Continue Assessment
                  </Button>
                </div>
              </div>

              {/* Row 4: Live session */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/55 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-950 flex items-center justify-center shrink-0 border border-purple-100/50">
                    <Calendar className="h-5 w-5 text-purple-800" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-400 font-sans uppercase">Live session</span>
                    <h4 className="text-sm font-semibold text-slate-900 font-sans">Interview Practice Clinic</h4>
                    <p className="text-[11px] text-slate-500">Virtual or in-person workshop attendance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <StatusChip status="pending" />
                  <Button
                    onClick={() => {
                      showToast("Opening live session details.", "info");
                      navigateTo("/learner/live-sessions");
                    }}
                    variant="outline"
                    className="interactive-button-secondary font-bold text-xs py-2 px-3.5 rounded-lg shrink-0 cursor-pointer min-h-[38px]"
                  >
                    View Session
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Course Resources Section (Materials Redesign) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2 text-left">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 font-heading tracking-tight">Course resources</h3>
                <p className="text-xs text-slate-500">Access lightweight materials connected to your current lesson and assessment.</p>
              </div>
              <Button 
                onClick={() => navigateTo("/learner/resources")}
                variant="outline"
                className="interactive-button-secondary font-bold text-xs py-1.5 px-3 rounded-lg cursor-pointer"
              >
                Open all resources
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Resource 1 */}
              <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between hover:border-emerald-200/60 shadow-3xs hover:shadow-2xs transition-all text-left">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100/50">
                    <BookOpen className="h-5 w-5 text-emerald-800" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 font-sans leading-tight">Low-bandwidth reading version</h4>
                      <StatusChip status="low-bandwidth" />
                    </div>
                    <p className="text-xs text-slate-600 leading-normal font-sans">Text-first lesson material for limited connectivity.</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 font-sans">
                    Reading
                  </span>
                  <Button
                    onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer min-h-[38px]"
                  >
                    Open
                  </Button>
                </div>
              </div>

              {/* Resource 2 */}
              <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between hover:border-emerald-200/60 shadow-3xs hover:shadow-2xs transition-all text-left">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 border border-blue-100/50">
                    <Download className="h-5 w-5 text-blue-800" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900 font-sans leading-tight">Preparing for Interviews summary</h4>
                    <p className="text-xs text-slate-600 leading-normal font-sans">A short lesson summary for quick revision.</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 font-sans">
                    Summary PDF
                  </span>
                  <Button
                    onClick={() => showToast("Preparing for Interviews Summary download started.", "success")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer min-h-[38px]"
                  >
                    Download
                  </Button>
                </div>
              </div>

              {/* Resource 3 */}
              <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between hover:border-emerald-200/60 shadow-3xs hover:shadow-2xs transition-all text-left">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center shrink-0 border border-slate-150">
                    <FileText className="h-5 w-5 text-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900 font-sans leading-tight">Interview preparation transcript</h4>
                    <p className="text-xs text-slate-600 leading-normal font-sans">Read the lesson transcript without heavy media.</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 font-sans">
                    Transcript
                  </span>
                  <Button
                    onClick={() => navigateTo("/learner/resources")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer min-h-[38px]"
                  >
                    View
                  </Button>
                </div>
              </div>

              {/* Resource 4 */}
              <div className="p-4 bg-white border border-slate-200/80 rounded-2xl flex flex-col justify-between hover:border-emerald-200/60 shadow-3xs hover:shadow-2xs transition-all text-left">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-950 flex items-center justify-center shrink-0 border border-amber-100/50">
                    <FileText className="h-5 w-5 text-amber-800" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900 font-sans leading-tight">Work Readiness Assignment guide</h4>
                    <p className="text-xs text-slate-600 leading-normal font-sans">Review the assignment guide before submission.</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 font-sans">
                    Assignment guide
                  </span>
                  <Button
                    onClick={() => showToast("Work Readiness Assignment Guide download started.", "success")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-1.5 px-3.5 rounded-lg cursor-pointer min-h-[38px]"
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Full Curriculum Accordion at bottom */}
          <div id="course-curriculum" className="space-y-4 pt-4">
            <div className="text-left bg-white p-5 border border-slate-200/80 rounded-2xl shadow-3xs">
              <h3 className="text-base font-semibold text-slate-900 font-heading tracking-tight">Full Course Curriculum</h3>
              <p className="text-xs text-slate-500 mt-1">Navigate or review all modules, interactive lessons, and checkpoints in this course.</p>
            </div>
            <CourseCurriculumAccordion course={SUSTAIN_CURRICULUM_DATA} />
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* 6. CPD & Certificate Readiness Section */}
          <Card className="p-5 bg-gradient-to-br from-emerald-50/20 to-amber-50/10 border border-emerald-100/80 rounded-3xl text-left space-y-4 shadow-3xs relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-amber-50/40 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100/50">
                <Award className="h-5.5 w-5.5 text-emerald-800" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-900 font-heading">Linked to CPD and certificate readiness</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Course progress contributes to confirmed CPD credits and certificate review requirements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">CPD PROGRESS</span>
                <span className="text-sm font-bold text-slate-800 font-sans">14 of 35 Credits</span>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">CERTIFICATE</span>
                <span className="text-xs font-bold text-amber-800 font-sans">Review pending</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100/60">
              <Button
                onClick={() => navigateTo("/learner/cpd-record")}
                className="interactive-button-primary w-full text-xs font-bold py-3 px-4 rounded-xl cursor-pointer min-h-[44px]"
              >
                View CPD Record
              </Button>
            </div>
          </Card>

          {/* 7. Recommended Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans text-left pl-1">Recommended actions</h3>
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-3xs">
              {/* Action 1 */}
              <div 
                onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100/50">
                    <Play className="h-4 w-4 text-emerald-800 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 font-sans group-hover:text-emerald-900">Continue Lesson</p>
                    <p className="text-[10px] text-slate-500">Continue the current lesson</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Action 2 */}
              <div 
                onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-100/50">
                    <FileText className="h-4 w-4 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 font-sans group-hover:text-emerald-900">Continue Assessment</p>
                    <p className="text-[10px] text-slate-500">Complete pending assignment items</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Action 3 */}
              <div 
                onClick={() => navigateTo("/learner/offline")}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-950 flex items-center justify-center border border-amber-100/50">
                    <Download className="h-4 w-4 text-amber-800" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 font-sans group-hover:text-emerald-900">Open Offline Centre</p>
                    <p className="text-[10px] text-slate-500">Access low-bandwidth packs</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Action 4 */}
              <div 
                onClick={() => navigateTo("/learner/support")}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-900 flex items-center justify-center border border-purple-100/50">
                    <HelpCircle className="h-4 w-4 text-purple-850" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 font-sans group-hover:text-emerald-900">Ask Help</p>
                    <p className="text-[10px] text-slate-500">Get support for this course</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 8. Support Card */}
          <LearnerSupportCard 
            title="Course Support"
            text="Need assistance with the Work Readiness Foundation or assignment review?"
            buttonText="Ask for Help"
            className="rounded-3xl shadow-3xs"
          />

        </div>
      </div>
    </div>
  );
}

export default LearnerCourseDetailPage;
