import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Lock, 
  Play, 
  FileText, 
  Award, 
  Calendar, 
  Bookmark, 
  HelpCircle, 
  BookOpen,
  ArrowRight,
  ExternalLink,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { StatusChip } from "../ui/StatusChip";

export interface CurriculumItem {
  type: "lesson" | "checkpoint" | "quiz" | "assignment" | "live_session" | "resource" | "review";
  title: string;
  status: "completed" | "in_progress" | "pending" | "draft_started" | "attendance_pending" | "locked" | "current" | string;
  route: string;
  cpdCredits?: number;
  description?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  status: "completed" | "in_progress" | "locked" | string;
  progress: number;
  lockedReason?: string;
  items: CurriculumItem[];
}

export interface CurriculumCourse {
  id: string;
  title: string;
  progress: number;
  cpdCredits?: number;
  modules: CurriculumModule[];
}

export interface CourseCurriculumAccordionProps {
  course: CurriculumCourse;
  compact?: boolean;
  highlightedRoute?: string;
}

export function CourseCurriculumAccordion({ 
  course, 
  compact = false,
  highlightedRoute
}: CourseCurriculumAccordionProps) {
  const { navigateTo } = useRoute();

  // Find the in_progress module to expand by default
  const initialExpandedStates: Record<string, boolean> = {};
  course.modules.forEach((mod) => {
    initialExpandedStates[mod.id] = mod.status === "in_progress";
  });

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(initialExpandedStates);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Helper to render type-specific icons
  const getItemIcon = (type: string, isCompleted: boolean, isLocked: boolean) => {
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
        return <ClipboardList className={iconClass} />;
      case "quiz":
        return <HelpCircle className={iconClass} />;
      case "assignment":
        return <FileText className={iconClass} />;
      case "live_session":
        return <Calendar className={iconClass} />;
      case "resource":
        return <Bookmark className={iconClass} />;
      case "review":
        return <Award className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  // Helper to render beautiful custom status chips matching SUSTAIN visual guidelines
  const renderStatusChip = (status: string) => {
    return <StatusChip status={status} />;
  };

  const getItemDisplayData = (item: CurriculumItem) => {
    // 1. Clean Type Label
    let typeLabel = "Lesson";
    if (item.type === "checkpoint") typeLabel = "Checkpoint";
    else if (item.type === "assignment") typeLabel = "Assignment";
    else if (item.type === "live_session") typeLabel = "Live Session";
    else if ((item.type as string) === "locked_module") typeLabel = "Locked Module";
    else if (item.type === "quiz") typeLabel = "Quiz";
    else if (item.type === "resource") typeLabel = "Resource";
    else if ((item.type as string) === "result") typeLabel = "Result";

    // 2. Clean Status Label and Status classes
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

    // 3. Clean Action Label and Button classes
    let actionText = "Open";
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
    } else if ((item.type as string) === "result") {
      actionText = "View CPD Record";
    } else {
      actionText = "Open";
    }

    return { typeLabel, statusText, actionText, isPrimary, isLocked };
  };

  const getHelperText = (item: CurriculumItem) => {
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

  return (
    <div id="curriculum-accordion-container" className="space-y-4">
      {course.modules.map((mod, index) => {
        const isExpanded = !!expandedModules[mod.id];
        const isModuleCompleted = mod.status.toLowerCase() === "completed";
        const isModuleLocked = mod.status.toLowerCase() === "locked";
        const isModuleInProgress = mod.status.toLowerCase() === "in_progress" || mod.status.toLowerCase() === "in progress";

        return (
          <div 
            key={mod.id}
            id={`accordion-module-${mod.id}`}
            className={`bg-white border rounded-2xl shadow-xs hover:shadow-sm transition-all duration-250 ease-out overflow-hidden ${
              isExpanded ? "border-emerald-200" : "border-slate-200 hover:border-emerald-200"
            }`}
          >
            {/* ACCORDION HEADER BUTTON */}
            <button
              onClick={() => !isModuleLocked && toggleModule(mod.id)}
              disabled={isModuleLocked}
              aria-expanded={isExpanded}
              aria-controls={`accordion-panel-${mod.id}`}
              className={`w-full text-left p-5 flex items-center justify-between gap-4 transition-colors ${
                isModuleLocked ? "cursor-not-allowed bg-slate-50/40" : "cursor-pointer hover:bg-slate-50/20"
              } ${isModuleInProgress && !isExpanded ? "bg-emerald-50/10" : ""}`}
            >
              <div className="flex items-start gap-4 min-w-0">
                {/* Status Indicator Icon */}
                <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                  isModuleCompleted 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                    : isModuleInProgress 
                    ? "bg-emerald-50/50 text-emerald-900 border-emerald-150" 
                    : "bg-slate-100 text-slate-400 border-slate-200"
                }`}>
                  {isModuleCompleted ? (
                    <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                  ) : isModuleLocked ? (
                    <Lock className="h-4.5 w-4.5" />
                  ) : (
                    <Play className="h-4.5 w-4.5" />
                  )}
                </div>

                <div className="space-y-1 text-left min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm md:text-base font-semibold text-slate-900 font-heading leading-snug">
                      {mod.title}
                    </h3>
                    {isModuleCompleted && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-emerald-500" /> Completed
                      </span>
                    )}
                    {isModuleInProgress && (
                      <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-amber-500" /> In progress
                      </span>
                    )}
                    {isModuleLocked && (
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-slate-400" /> Locked
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
                    {!isModuleLocked && (
                      <>
                        <span className="font-semibold text-emerald-800">{mod.progress}% complete</span>
                        <span>•</span>
                        <span>{mod.items.length} {mod.items.length === 1 ? "activity" : "activities"}</span>
                      </>
                    )}
                    {isModuleLocked && mod.lockedReason && (
                      <span className="text-slate-500 font-medium leading-normal pr-4">{mod.lockedReason}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Chevron Icon */}
              {!isModuleLocked && (
                <div className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>
              )}
            </button>

            {/* EXPANDED CONTENT PANEL */}
            <AnimatePresence initial={false}>
              {isExpanded && !isModuleLocked && (
                <motion.div
                  id={`accordion-panel-${mod.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="border-t border-slate-100 bg-slate-50/40"
                >
                  <div className="p-4 md:p-6 divide-y divide-slate-100">
                    {mod.items.map((item, itemIdx) => {
                      const isItemCompleted = item.status.toLowerCase() === "completed" || item.status.toLowerCase() === "passed";
                      const isItemLocked = item.status.toLowerCase() === "locked";
                      const isItemCurrent = item.status.toLowerCase() === "current" || item.status.toLowerCase() === "in_progress" || item.status.toLowerCase() === "in progress";
                      const isHighlighted = highlightedRoute && item.route === highlightedRoute;
                      
                      const { typeLabel, statusText, actionText, isPrimary, isLocked } = getItemDisplayData(item);
                      const helperText = getHelperText(item);

                      return (
                        <div
                          key={itemIdx}
                          className={`py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left transition-all ${
                            isHighlighted
                              ? "bg-emerald-50/40 -mx-4 px-4 md:-mx-6 md:px-6 rounded-none border-y border-emerald-100"
                              : isItemCurrent
                              ? "bg-emerald-50/10 -mx-4 px-4 md:-mx-6 md:px-6 rounded-none border-y border-emerald-100/30"
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
                              {getItemIcon(item.type, isItemCompleted, isItemLocked)}
                            </div>

                            <div className="space-y-1 min-w-0 text-left flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] font-bold text-slate-500 font-sans tracking-wide uppercase">
                                  {typeLabel}
                                </span>
                                {item.cpdCredits && (
                                  <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded">
                                    {item.cpdCredits} CPD Credits
                                  </span>
                                )}
                                {renderStatusChip(item.status)}
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                {item.title}
                              </h4>
                              {helperText && !compact && (
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {helperText}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="shrink-0 flex items-center justify-end">
                            <button
                              onClick={() => navigateTo(item.route as RoutePath)}
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export const SUSTAIN_CURRICULUM_DATA: CurriculumCourse = {
  id: "work-readiness-foundation",
  title: "Work Readiness Foundation",
  progress: 42,
  cpdCredits: 8,
  modules: [
    {
      id: "module-1",
      title: "Workplace Communication",
      status: "completed",
      progress: 100,
      items: [
        {
          type: "lesson",
          title: "Communication Basics",
          status: "completed",
          route: "/learner/courses/work-readiness-foundation",
          description: "Learn foundational workplace discussion scenarios and active listening methods.",
          cpdCredits: 2
        },
        {
          type: "checkpoint",
          title: "Communication Checkpoint",
          status: "completed",
          route: "/learner/checkpoints/communication-basics/review",
          description: "Test and lock in your workplace communication understanding.",
          cpdCredits: 1
        }
      ]
    },
    {
      id: "module-2",
      title: "Preparing for Interviews",
      status: "in_progress",
      progress: 68,
      items: [
        {
          type: "lesson",
          title: "Preparing for Interviews",
          status: "in_progress",
          route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews",
          description: "Structure key interview replies using the STAR model and audit remote technical equipment.",
          cpdCredits: 2
        },
        {
          type: "checkpoint",
          title: "Low-Bandwidth Interview Preparation",
          status: "pending",
          route: "/learner/checkpoints/interview-preparation/review",
          description: "Submit your practice answers and download the offline interview preparation guides.",
          cpdCredits: 1
        },
        {
          type: "assignment",
          title: "Work Readiness Assignment",
          status: "draft_started",
          route: "/learner/assessments/work-readiness-assignment",
          description: "Draft, edit, and submit your portfolio assignment to Halima Sani for review.",
          cpdCredits: 2
        },
        {
          type: "live_session",
          title: "Interview Practice Clinic",
          status: "attendance_pending",
          route: "/learner/live-sessions/interview-practice-clinic",
          description: "Attend the live interactive review clinic with Halima Sani."
        }
      ]
    },
    {
      id: "module-3",
      title: "Interview Preparation Practice",
      status: "locked",
      progress: 0,
      lockedReason: "Complete the Work Readiness Assignment and live session attendance to unlock.",
      items: [
        {
          type: "lesson",
          title: "Interview Confidence Practice",
          status: "locked",
          route: "/learner/courses/work-readiness-foundation/modules/interview-preparation/locked",
          description: "Advanced techniques to manage pressure and build conversational fluidity."
        }
      ]
    }
  ]
};
