import React, { useState } from "react";
import { useLearningState } from "../../context/LearningStateContext";
import { useRoute } from "../../context/RouteContext";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { 
  Sliders, 
  X,
  RotateCcw, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Radio, 
  Play, 
  BookOpen, 
  FileText, 
  Sparkles,
  ChevronRight
} from "lucide-react";

export function LmsSimulatorWidget() {
  const {
    modules,
    liveSession,
    bandwidthMode,
    offlineDownloaded,
    cpdCredits,
    certificateStatus,
    completeLesson,
    completeCheckpoint,
    submitQuiz,
    submitAssignment,
    gradeAssignment,
    joinLiveSession,
    setBandwidthMode,
    setOfflineDownloaded,
    resetAllProgress,
    simulateCompletePreviousModules
  } = useLearningState();

  const { navigateTo, showToast } = useRoute();
  const [isOpen, setIsOpen] = useState(false);

  const m3 = modules.find(m => m.id === "m3");
  const isM3LessonCompleted = m3?.lessons.find(l => l.id === "m3-l4")?.completed || false;
  const isM3CheckpointCompleted = m3?.checkpointCompleted || false;
  const isM3QuizPassed = m3?.quizPassed || false;
  const isM3LiveSessionAttended = m3?.liveSessionAttended || false;
  const m3AssignmentStatus = m3?.assignmentStatus || "draft";

  const handleToggleLesson = () => {
    if (isM3LessonCompleted) {
      showToast("Resetting Lesson progress to 40%");
      resetAllProgress();
    } else {
      completeLesson("m3", "m3-l4");
      showToast("Lesson 'Preparing for Interviews' marked 100% completed!");
    }
  };

  const handleToggleCheckpoint = () => {
    if (isM3CheckpointCompleted) {
      showToast("Use Reset All to reset checkpoint state.");
    } else {
      completeCheckpoint("m3");
      showToast("STAR Interview Practice checkpoint completed successfully!");
    }
  };

  const handleToggleQuiz = () => {
    submitQuiz("m3", 85);
    showToast("Interview Readiness Quiz passed with score: 85%!");
  };

  const handleToggleLiveSession = () => {
    joinLiveSession();
    showToast("Joined Live Session! Attendance marked: Present.");
  };

  const handleGradePass = () => {
    gradeAssignment("m3", 90, true);
    showToast("Facilitator graded: Passed (90/100). CPD credits awarded!");
  };

  const handleGradeFail = () => {
    gradeAssignment("m3", 45, false);
    showToast("Facilitator graded: Needs Revision (45/100).");
  };

  // Human friendly label mapping
  const getAssignmentLabel = () => {
    if (m3AssignmentStatus === "passed") return "Passed";
    if (m3AssignmentStatus === "submitted" || m3AssignmentStatus === "under review") return "Review pending";
    if (m3AssignmentStatus === "failed") return "Needs Revision";
    return "Draft";
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-4.5 py-3 flex items-center gap-2 shadow-xl border border-emerald-600 font-sans text-xs font-semibold select-none transition-all active:scale-95 cursor-pointer"
        aria-label="Open LMS Flow Rules Simulator"
      >
        <Sliders className="h-4 w-4" />
        <span>Flow Rules</span>
      </button>

      {/* Bottom Sheet Backdrop & Panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white border-t border-slate-200 sm:border rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] sm:max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950 font-heading">LMS Flow Simulator</h3>
                <p className="text-xs text-slate-600 mt-0.5">Check how learner progress rules affect this assessment.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 space-y-5 overflow-y-auto flex-1">
              
              {/* Section 1: Current Flow State */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">1. Current Flow State</h4>
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-2 text-xs font-medium">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Lesson</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] ${
                      isM3LessonCompleted ? "bg-emerald-50 text-emerald-700 font-semibold" : "bg-amber-50 text-amber-800"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${isM3LessonCompleted ? "bg-emerald-600" : "bg-amber-500"}`} />
                      {isM3LessonCompleted ? "Completed" : "In progress"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Checkpoint</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] ${
                      isM3CheckpointCompleted ? "bg-emerald-50 text-emerald-700 font-semibold" : "bg-slate-100 text-slate-600"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${isM3CheckpointCompleted ? "bg-emerald-600" : "bg-slate-400"}`} />
                      {isM3CheckpointCompleted ? "Met" : "Pending"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Quiz</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] ${
                      isM3QuizPassed ? "bg-emerald-50 text-emerald-700 font-semibold" : "bg-slate-100 text-slate-600"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${isM3QuizPassed ? "bg-emerald-600" : "bg-slate-400"}`} />
                      {isM3QuizPassed ? "Passed" : "Pending"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Attendance</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] ${
                      isM3LiveSessionAttended ? "bg-emerald-50 text-emerald-700 font-semibold" : "bg-slate-100 text-slate-600"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${isM3LiveSessionAttended ? "bg-emerald-600" : "bg-slate-400"}`} />
                      {isM3LiveSessionAttended ? "Attended" : "Not confirmed"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 mt-1">
                    <span className="text-slate-600">Assignment</span>
                    <span className={`font-semibold ${
                      m3AssignmentStatus === "passed" ? "text-emerald-700" : 
                      m3AssignmentStatus === "submitted" || m3AssignmentStatus === "under review" ? "text-blue-700" : 
                      "text-amber-700"
                    }`}>
                      {getAssignmentLabel()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Learner Actions */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">2. Learner Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={handleToggleLesson}
                    className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 text-slate-800 hover:text-emerald-900 py-2 px-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                    Complete Lesson
                  </button>
                  <button 
                    onClick={handleToggleCheckpoint}
                    className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 text-slate-800 hover:text-emerald-900 py-2 px-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Submit Checkpoint
                  </button>
                  <button 
                    onClick={handleToggleQuiz}
                    className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 text-slate-800 hover:text-emerald-900 py-2 px-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                    Pass Quiz
                  </button>
                  <button 
                    onClick={handleToggleLiveSession}
                    className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 text-slate-800 hover:text-emerald-900 py-2 px-2.5 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Radio className="h-3.5 w-3.5 text-emerald-600" />
                    Mark Attendance
                  </button>
                </div>
              </div>

              {/* Section 3: Facilitator Review */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">3. Facilitator Review</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={handleGradePass}
                    disabled={m3AssignmentStatus !== "submitted" && m3AssignmentStatus !== "under review" && m3AssignmentStatus !== "draft"}
                    className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-40 disabled:hover:bg-emerald-50 text-emerald-800 py-2 px-2.5 rounded-xl border border-emerald-200 hover:border-emerald-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Unlock className="h-3.5 w-3.5 text-emerald-700" />
                    Grade Passed
                  </button>
                  <button 
                    onClick={handleGradeFail}
                    disabled={m3AssignmentStatus !== "submitted" && m3AssignmentStatus !== "under review" && m3AssignmentStatus !== "draft"}
                    className="flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 disabled:opacity-40 disabled:hover:bg-rose-50 text-rose-800 py-2 px-2.5 rounded-xl border border-rose-200 hover:border-rose-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Lock className="h-3.5 w-3.5 text-rose-700" />
                    Return for Revision
                  </button>
                </div>
              </div>

              {/* Section 4: Low-Bandwidth Mode */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">4. Low-Bandwidth Mode</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { mode: "full", label: "Full view" },
                    { mode: "audio-only", label: "Audio-friendly" },
                    { mode: "text-only", label: "Text-first" },
                    { mode: "offline", label: "Offline support" }
                  ].map((item) => (
                    <button
                      key={item.mode}
                      onClick={() => {
                        setBandwidthMode(item.mode as any);
                        if (item.mode === "offline") setOfflineDownloaded(true);
                        showToast(`Switched bandwidth mode to: ${item.label}`);
                      }}
                      className={`py-2 px-2.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                        bandwidthMode === item.mode 
                          ? "bg-emerald-700 text-white border-emerald-600" 
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50/50 hover:border-emerald-100 hover:text-emerald-900"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 5: Reset */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <button 
                  onClick={() => {
                    simulateCompletePreviousModules();
                    showToast("Fast-forwarded: Previous modules completed!");
                  }}
                  className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1 py-1.5 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5 text-emerald-600" /> Fast-forward
                </button>
                
                <button 
                  onClick={() => {
                    resetAllProgress();
                    showToast("LMS state completely reset!");
                  }}
                  className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 py-1.5 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset Flow
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
