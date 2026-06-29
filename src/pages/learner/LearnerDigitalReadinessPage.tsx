import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { StatusChip } from "../../components/ui/StatusChip";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { 
  Play, 
  Download, 
  HelpCircle, 
  ChevronRight,
  ChevronDown,
  Award,
  Zap,
  Check,
  Compass,
  Bell,
  Search,
  BookOpen,
  AlertCircle,
  Clock,
  MessageSquare,
  FileText,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  X
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";

export function LearnerDigitalReadinessPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Course Context
  const courseData = {
    title: "Digital Readiness Basics",
    status: "Completed",
    progress: 100,
    lessonsCompleted: "8 of 8",
    remainingTime: "0 minutes remaining",
    confirmedCpd: 8,
    facilitator: "Halima Sani",
    objective: "Help learners build essential digital skills, navigate online learning platforms confidently, and master communication tools for modern workplaces."
  };

  const lessons = [
    {
      id: 1,
      title: "1. Getting Started with SUSTAIN LMS",
      status: "completed",
      time: "10 min",
      type: "Reading",
      description: "Get familiar with the platform structure, navigation rails, and profile setup."
    },
    {
      id: 2,
      title: "2. Setting Up Your Profile",
      status: "completed",
      time: "12 min",
      type: "Practice",
      description: "Set up learner profiles, professional avatar, and configure communication preferences."
    },
    {
      id: 3,
      title: "3. Accessing Course Content",
      status: "completed",
      time: "15 min",
      type: "Reading",
      description: "Learn how to access, stream, and download low-bandwidth resources."
    },
    {
      id: 4,
      title: "4. Using Online Learning Tools",
      status: "completed",
      time: "15 min",
      type: "Practice",
      description: "Interactive tools, note-taking, and participating in peer discussions."
    },
    {
      id: 5,
      title: "5. Digital Communication Rules",
      status: "completed",
      time: "15 min",
      type: "Reading",
      description: "Core netiquette guidelines and professional email formatting."
    },
    {
      id: 6,
      title: "6. Online Security Basics",
      status: "completed",
      time: "18 min",
      type: "Reading",
      description: "Protecting personal info, creating secure passwords, and avoiding phishing risks."
    },
    {
      id: 7,
      title: "7. Collaborative Work Tools",
      status: "completed",
      time: "20 min",
      type: "Practice",
      description: "How to collaborate using cloud documents, comments, and task logs."
    },
    {
      id: 8,
      title: "8. Digital Readiness Check",
      status: "completed",
      time: "15 min",
      type: "Assessment",
      description: "Confirm foundational technical competency and unlock core learning modules."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans antialiased relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="flex min-h-screen">
        <LearnerSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => navigateTo("/learner/courses")}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 cursor-pointer shrink-0"
                aria-label="Back to courses"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span className="text-md font-extrabold tracking-tight text-emerald-900 font-sans md:hidden">SUSTAIN LMS</span>
              <span className="text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer hidden md:inline ml-1" onClick={() => navigateTo("/learner/courses")}>
                Back to My Courses
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigateTo("/learner/support")} 
                className="p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer md:hidden"
                aria-label="Support"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              <span className="text-xs font-bold text-slate-500 hidden md:inline">Aisha Mohammed</span>
              <div 
                onClick={() => navigateTo("/learner/profile")}
                className="h-8 w-8 rounded-full bg-emerald-950 text-white font-black text-xs flex items-center justify-center cursor-pointer shrink-0 shadow-xs"
              >
                AM
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-4 md:py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              
              <LearnerContextHint 
                title="How this works" 
                text="This course validates core computer proficiency, search skills, and learning tool safety." 
              />

              <Card className="p-6 bg-white border-slate-200 rounded-2xl shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-50 rounded-full blur-3xl -z-10" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1.5">
                    <Badge variant="neutral" className="bg-emerald-50 text-emerald-800 border-emerald-150 font-semibold px-2.5 py-0.5 rounded-full text-[10px]">
                      {courseData.status}
                    </Badge>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{courseData.title}</h1>
                    <p className="text-xs text-slate-500 font-medium">{courseData.objective}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">CPD Credits</p>
                      <p className="text-md font-extrabold text-emerald-900">{courseData.confirmedCpd} Confirmed Credits</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-900 rounded-2xl">
                      <Award className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Progress</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{courseData.progress}% Complete</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lessons</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">8 of 8 Completed</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time Remaining</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">0 Min Remaining</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Facilitator</p>
                    <p className="text-sm font-bold text-slate-900 mt-1">{courseData.facilitator}</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>Course Completion</span>
                    <span className="text-emerald-800">{courseData.progress}%</span>
                  </div>
                  <ProgressBar value={courseData.progress} size="sm" />
                </div>
              </Card>

              {/* Next Recommended Learning Card - Premium Call-to-Action */}
              <Card className="p-6 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white border-none rounded-2xl shadow-md text-left relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-emerald-800/30 rounded-full blur-2xl" />
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-800/40 px-2.5 py-0.5 rounded-full border border-emerald-700/30">
                      Recommended Next Step
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white">Work Readiness Foundation</h3>
                    <p className="text-xs text-emerald-100/80 font-normal leading-relaxed mt-1 max-w-xl">
                      Now that you have validated your foundational digital skills, continue to the main employability stream. Master professional interviews, study workplace standards, and complete your Work Readiness Assignment.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}
                      className="w-full sm:w-auto bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[44px] shadow-sm"
                    >
                      <span>Continue to Work Readiness</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>

              {/* Course Lessons List */}
              <Card className="p-6 bg-white border-slate-200 rounded-2xl shadow-sm text-left">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-base font-bold text-slate-900">Course Lessons</h2>
                  <p className="text-xs text-slate-500 font-medium">All foundational technical competencies have been validated.</p>
                </div>

                <div className="space-y-3">
                  {lessons.map((lesson) => {
                    const isCheckpoint = lesson.type.toLowerCase() === "assessment" || lesson.title.toLowerCase().includes("check");
                    const typeLabel = isCheckpoint ? "Checkpoint" : "Lesson";
                    const actionLabel = isCheckpoint ? "Review Checkpoint" : "Review Lesson";

                    return (
                      <div 
                        key={lesson.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white shadow-3xs flex flex-col gap-3 text-left hover:border-emerald-200 transition-all duration-200"
                      >
                        {/* Header Row: Icon, Title, Status */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="p-2.5 rounded-xl border bg-emerald-50 text-emerald-800 border-emerald-100 shrink-0 mt-0.5">
                              {isCheckpoint ? (
                                <FileText className="h-4 w-4 shrink-0" />
                              ) : (
                                <BookOpen className="h-4 w-4 shrink-0" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="text-[10px] font-semibold text-slate-500 font-sans tracking-normal">
                                {typeLabel} • {lesson.time}
                              </span>
                              <h4 className="text-sm font-semibold text-slate-900 leading-snug mt-0.5">
                                {lesson.title}
                              </h4>
                            </div>
                          </div>

                          <div className="shrink-0">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-50 text-emerald-800 border-emerald-200">
                              <span className="h-1 w-1 rounded-full bg-emerald-500" />
                              Completed
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 leading-relaxed font-medium pl-13 pr-2">
                          {lesson.description}
                        </p>

                        {/* Action Area */}
                        <div className="pt-3 border-t border-slate-100/80 flex justify-end">
                          <button
                            onClick={() => showToast(`Reviewing ${typeLabel.toLowerCase()} ${lesson.id}`)}
                            className="text-xs font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-slate-200 text-slate-750 hover:bg-slate-50 hover:text-emerald-900 transition-all w-full sm:w-auto min-h-[38px] text-center"
                          >
                            <span>{actionLabel}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <LearnerSupportCard className="bg-emerald-50/60 rounded-2xl border border-emerald-200 text-left" />
            </div>
          </main>
        </div>
      </div>
      <LearnerMobileNav />
    </div>
  );
}
