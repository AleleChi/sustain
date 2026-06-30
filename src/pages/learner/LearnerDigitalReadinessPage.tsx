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
  Download,
  HelpCircle,
  Play,
  X,
  ArrowRight
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { StatusChip } from "../../components/ui/StatusChip";

export function LearnerDigitalReadinessPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  // Course Context
  const courseData = {
    title: "Digital Readiness Basics",
    status: "Completed",
    progress: 100,
    lessonsCompleted: "8 of 8",
    confirmedCpd: 8,
    facilitator: "Halima Sani",
    objective: "Help learners build essential digital skills, navigate online learning platforms confidently, and master communication tools for modern workplaces."
  };

  const lessons = [
    {
      id: 1,
      title: "1. Getting Started with SUSTAIN LMS",
      time: "10 min",
      type: "Reading",
      description: "Get familiar with the platform structure, navigation rails, and profile setup."
    },
    {
      id: 2,
      title: "2. Setting Up Your Profile",
      time: "12 min",
      type: "Practice",
      description: "Set up learner profiles, professional avatar, and configure communication preferences."
    },
    {
      id: 3,
      title: "3. Accessing Course Content",
      time: "15 min",
      type: "Reading",
      description: "Learn how to access, stream, and download low-bandwidth resources."
    },
    {
      id: 4,
      title: "4. Using Online Learning Tools",
      time: "15 min",
      type: "Practice",
      description: "Interactive tools, note-taking, and participating in peer discussions."
    },
    {
      id: 5,
      title: "5. Digital Communication Rules",
      time: "15 min",
      type: "Reading",
      description: "Core netiquette guidelines and professional email formatting."
    },
    {
      id: 6,
      title: "6. Online Security Basics",
      time: "18 min",
      type: "Reading",
      description: "Protecting personal info, creating secure passwords, and avoiding phishing risks."
    },
    {
      id: 7,
      title: "7. Collaborative Work Tools",
      time: "20 min",
      type: "Practice",
      description: "How to collaborate using cloud documents, comments, and task logs."
    },
    {
      id: 8,
      title: "8. Digital Readiness Check",
      time: "15 min",
      type: "Assessment",
      description: "Confirm foundational technical competency and unlock core learning modules."
    }
  ];

  return (
    <div id="digital-readiness-root" className="space-y-6 max-w-7xl mx-auto w-full text-slate-950 pb-12 relative font-sans">
      {/* Toast Layer */}
      {toast && (
        <div 
          id="toast-notification"
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-2xl border border-slate-800 animate-slide-in-right max-w-sm"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
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

            <div className="space-y-4 text-left">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-sans">
                <span onClick={() => navigateTo("/learner/courses")} className="hover:text-emerald-900 hover:underline cursor-pointer transition-all">My Courses</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-800 font-semibold">{courseData.title}</span>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip status="completed" />
                <StatusChip status="certificate-linked" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-slate-900 leading-tight">
                  {courseData.title}
                </h1>
                <p className="text-sm md:text-base text-slate-650 max-w-2xl leading-relaxed">
                  {courseData.objective}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
                  className="interactive-button-primary font-bold text-xs py-3 px-6 rounded-xl shadow-xs cursor-pointer min-h-[44px] flex items-center gap-2"
                >
                  <span>Continue to Work Readiness</span>
                  <ArrowRight className="h-4 w-4" />
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
                <p className="text-xs font-semibold text-slate-800 font-sans leading-tight break-words">Youth Employability Pathway</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Lessons</p>
                <p className="text-xs font-semibold text-slate-800 font-sans leading-tight">{courseData.lessonsCompleted} Completed</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Progress</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-850 font-sans">{courseData.progress}% Complete</span>
                  <div className="w-16">
                    <ProgressBar value={courseData.progress} size="sm" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Facilitator</p>
                <p className="text-xs font-semibold text-emerald-850 font-sans leading-tight">{courseData.facilitator}</p>
              </div>
            </div>
          </div>

          {/* 3. Recommended Next Step Card */}
          <Card className="p-5 md:p-6 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white border-none rounded-3xl text-left space-y-4 relative overflow-hidden shadow-md">
            <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-emerald-800/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-800/40 px-2.5 py-0.5 rounded-full border border-emerald-700/30">
                Recommended Next Step
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white font-heading">Work Readiness Foundation</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed mt-1 max-w-2xl font-sans">
                  Now that you have validated your foundational digital skills, continue to the main employability stream. Master professional interviews, study workplace standards, and complete your Work Readiness Assignment.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
                  className="w-full sm:w-auto bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px] shadow-sm font-sans"
                >
                  <span>Continue to Work Readiness</span>
                  <ArrowRight className="h-4 w-4 text-emerald-950" />
                </button>
              </div>
            </div>
          </Card>

          {/* 4. Course Lessons Section (Redesigned Activity Rows) */}
          <div className="space-y-4 text-left">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 font-heading">Course lessons</h2>
              <p className="text-xs text-slate-500 font-medium">All foundational digital skills and competencies have been successfully completed.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-3xs">
              {lessons.map((lesson) => {
                const isCheckpoint = lesson.type.toLowerCase() === "assessment";
                const typeLabel = isCheckpoint ? "Checkpoint" : "Lesson";
                const actionLabel = isCheckpoint ? "Review Checkpoint" : "Review Lesson";

                return (
                  <div 
                    key={lesson.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/55 transition-colors"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100/50">
                        <Check className="h-5 w-5 text-emerald-800" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-semibold text-slate-400 font-sans uppercase">
                          {typeLabel} • {lesson.time}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-900 font-sans leading-snug">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-normal font-sans pr-2">
                          {lesson.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <StatusChip status="completed" />
                      <Button
                        onClick={() => showToast(`Reviewing ${typeLabel.toLowerCase()} ${lesson.id}`)}
                        variant="outline"
                        className="interactive-button-secondary font-bold text-xs py-2 px-3.5 rounded-lg shrink-0 cursor-pointer min-h-[38px]"
                      >
                        {actionLabel}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
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
                <p className="text-xs text-slate-650 leading-relaxed font-sans">
                  Course progress contributes to confirmed CPD credits and certificate review requirements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">CPD PROGRESS</span>
                <span className="text-sm font-bold text-slate-800 font-sans">{courseData.confirmedCpd} of {courseData.confirmedCpd} Credits</span>
              </div>
              <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">CERTIFICATE</span>
                <span className="text-xs font-bold text-emerald-800 font-sans">Confirmed</span>
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
                onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100/50">
                    <Play className="h-4 w-4 text-emerald-800 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 font-sans group-hover:text-emerald-900">Continue to Work Readiness</p>
                    <p className="text-[10px] text-slate-500">Go to main employability course</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Action 2 */}
              <div 
                onClick={() => navigateTo("/learner/cpd-record")}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-100/50">
                    <Award className="h-4 w-4 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 font-sans group-hover:text-emerald-900">Open CPD Record</p>
                    <p className="text-[10px] text-slate-500">Verify digital badges and credits</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Action 3 */}
              <div 
                onClick={() => navigateTo("/learner/support")}
                className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-950 flex items-center justify-center border border-purple-100/50">
                    <HelpCircle className="h-4 w-4 text-purple-800" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 font-sans group-hover:text-emerald-900">Ask Help</p>
                    <p className="text-[10px] text-slate-500">Get assistance for digital readiness</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* 8. Support Card */}
          <LearnerSupportCard 
            title="Course Support"
            text="Need assistance with Digital Readiness or platform features?"
            buttonText="Ask for Help"
            className="rounded-3xl shadow-3xs"
          />

        </div>
      </div>
    </div>
  );
}

export default LearnerDigitalReadinessPage;
