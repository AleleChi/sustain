import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, Save, X } from "lucide-react";
import { useRoute } from "../../context/RouteContext";

interface LearnerCountdownTimerProps {
  type: "assessment" | "checkpoint";
  layout?: "desktop-header" | "desktop-review" | "mobile-sticky" | "checkpoint-compact";
  questionProgressText?: string; // e.g. "Question 3 of 8"
  onExpire?: () => void;
  isCompleted?: boolean;
}

export function LearnerCountdownTimer({
  type,
  layout = "desktop-header",
  questionProgressText = "",
  onExpire,
  isCompleted = false
}: LearnerCountdownTimerProps) {
  const { navigateTo } = useRoute();
  const isAssessment = type === "assessment";
  const durationInSeconds = isAssessment ? 45 * 60 : 10 * 60; // 45 mins or 10 mins

  const startKey = isAssessment
    ? "sustain-work-readiness-assessment-started-at"
    : "sustain-interview-checkpoint-started-at";
  const durationKey = isAssessment
    ? "sustain-work-readiness-assessment-duration"
    : "sustain-interview-checkpoint-duration";
  const warningDismissedKey = isAssessment
    ? "sustain-work-readiness-assessment-warning-dismissed"
    : "sustain-interview-checkpoint-warning-dismissed";
  const criticalDismissedKey = isAssessment
    ? "sustain-work-readiness-assessment-critical-dismissed"
    : "sustain-interview-checkpoint-critical-dismissed";
  const expiredKey = isAssessment
    ? "sustain-work-readiness-assessment-expired"
    : "sustain-interview-checkpoint-expired";

  const [timeLeft, setTimeLeft] = useState<number>(durationInSeconds);
  const [warningDismissed, setWarningDismissed] = useState<boolean>(() => {
    return localStorage.getItem(warningDismissedKey) === "true";
  });
  const [criticalDismissed, setCriticalDismissed] = useState<boolean>(() => {
    return localStorage.getItem(criticalDismissedKey) === "true";
  });
  const [isExpiredState, setIsExpiredState] = useState<boolean>(() => {
    return localStorage.getItem(expiredKey) === "true";
  });

  // Keep track of whether the critical modal should be visible
  const [showCriticalModal, setShowCriticalModal] = useState<boolean>(false);
  // Keep track of whether the expired modal should be visible
  const [showExpiredModal, setShowExpiredModal] = useState<boolean>(false);

  // Initialize and update timer
  useEffect(() => {
    if (isCompleted) {
      return;
    }

    // Save total duration config
    localStorage.setItem(durationKey, durationInSeconds.toString());

    if (localStorage.getItem(expiredKey) === "true") {
      setTimeLeft(0);
      setIsExpiredState(true);
      setShowExpiredModal(true);
      return;
    }

    const initTimer = () => {
      const now = Date.now();
      const startedAtStr = localStorage.getItem(startKey);
      let startedAt: number;

      if (startedAtStr) {
        startedAt = parseInt(startedAtStr, 10);
      } else {
        startedAt = now;
        localStorage.setItem(startKey, now.toString());
      }

      const elapsed = Math.floor((now - startedAt) / 1000);
      const remaining = Math.max(0, durationInSeconds - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        setIsExpiredState(true);
        localStorage.setItem(expiredKey, "true");
        setShowExpiredModal(true);
        if (onExpire) {
          onExpire();
        }
      }
    };

    initTimer();

    // Set interval to update remaining seconds
    const interval = setInterval(() => {
      const now = Date.now();
      const startedAtStr = localStorage.getItem(startKey);
      if (startedAtStr) {
        const startedAt = parseInt(startedAtStr, 10);
        const elapsed = Math.floor((now - startedAt) / 1000);
        const remaining = Math.max(0, durationInSeconds - elapsed);
        
        // Prevent timer from going negative
        const finalRemaining = Math.max(0, remaining);
        setTimeLeft(finalRemaining);

        if (finalRemaining <= 0) {
          setIsExpiredState(true);
          localStorage.setItem(expiredKey, "true");
          setShowExpiredModal(true);
          clearInterval(interval);
          if (onExpire) {
            onExpire();
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startKey, durationKey, durationInSeconds, isCompleted, onExpire, expiredKey]);

  // Manage critical modal visibility based on state (Danger state: between 30 and 120 seconds remaining)
  useEffect(() => {
    if (isCompleted || isExpiredState) {
      setShowCriticalModal(false);
      return;
    }
    const dangerState = timeLeft <= 120 && timeLeft > 30;
    if (dangerState && !criticalDismissed) {
      setShowCriticalModal(true);
    } else {
      setShowCriticalModal(false);
    }
  }, [timeLeft, criticalDismissed, isCompleted, isExpiredState]);

  // Manage expired modal visibility based on state
  useEffect(() => {
    if (isCompleted) {
      setShowExpiredModal(false);
      return;
    }
    if (isExpiredState) {
      setShowExpiredModal(true);
    }
  }, [isExpiredState, isCompleted]);

  // Dismiss helpers
  const handleDismissWarning = () => {
    localStorage.setItem(warningDismissedKey, "true");
    setWarningDismissed(true);
  };

  const handleDismissCritical = () => {
    localStorage.setItem(criticalDismissedKey, "true");
    setCriticalDismissed(true);
    setShowCriticalModal(false);
  };

  const handleReviewAnswers = () => {
    handleDismissCritical();
    if (isAssessment) {
      navigateTo("/learner/assessments/work-readiness-assessment/review-submit");
    }
  };

  // Formatting minutes/seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Determine state parameters
  const isCritical = timeLeft <= 120 && timeLeft > 0;
  const isWarning = timeLeft <= 300 && timeLeft > 120;
  const isNormal = timeLeft > 300;

  // Visual classes according to design specification
  const getThemeClasses = () => {
    if (isExpiredState) {
      return {
        bg: "bg-red-50 border-red-200 text-red-800",
        border: "border-red-200",
        iconColor: "text-red-700",
        label: "Time is up",
        valueClass: "text-red-900 font-bold"
      };
    }
    if (isCritical) {
      return {
        bg: "bg-red-50 border-red-200 text-red-800",
        border: "border-red-200",
        iconColor: "text-red-700",
        label: "Critical: under 2 mins left",
        valueClass: "text-red-900 font-bold"
      };
    }
    if (isWarning) {
      return {
        bg: "bg-amber-50 border-amber-200 text-amber-800",
        border: "border-amber-200",
        iconColor: "text-amber-800",
        label: "Warning: under 5 mins left",
        valueClass: "text-amber-900 font-bold"
      };
    }
    // Normal state (emerald/slate)
    return {
      bg: "bg-emerald-50/60 border-slate-200 text-slate-700",
      border: "border-slate-200",
      iconColor: "text-emerald-800",
      label: "Time left",
      valueClass: "text-slate-800 font-bold"
    };
  };

  const currentTheme = getThemeClasses();

  // Accessibility screen reader announcer (aria-live)
  const [ariaAnnouncement, setAriaAnnouncement] = useState("");
  useEffect(() => {
    if (isCompleted) return;
    if (timeLeft === 300) {
      setAriaAnnouncement("Five minutes remaining in the assessment.");
    } else if (timeLeft === 120) {
      setAriaAnnouncement("Two minutes remaining. Your current work is saved locally.");
    } else if (timeLeft === 0) {
      setAriaAnnouncement("Time is up. Your progress has been saved.");
    }
  }, [timeLeft, isCompleted]);

  // If completed/passed, render a calm completed status chip
  if (isCompleted) {
    return (
      <div 
        id="completed-status-chip"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
        <span>Review mode</span>
      </div>
    );
  }

  // Active Alert Banner
  let activeAlertBanner = null;
  if (isCritical && !isExpiredState) {
    activeAlertBanner = (
      <div className="w-full bg-red-50 border border-red-300 rounded-xl p-3 flex items-start gap-2.5 text-left animate-in fade-in duration-200 mt-2">
        <AlertTriangle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
        <p className="text-[11px] text-red-900 font-extrabold leading-relaxed">
          Less than 30 seconds left! Submit your assessment now to secure your progress.
        </p>
      </div>
    );
  } else if (isWarning && !warningDismissed) {
    activeAlertBanner = (
      <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start justify-between gap-3 text-left animate-in fade-in duration-200 mt-2">
        <div className="flex gap-2">
          <Clock className="h-4 w-4 text-amber-800 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-900 font-semibold leading-relaxed">
            You have 5 minutes left. Review your answers before submitting.
          </p>
        </div>
        <button 
          onClick={handleDismissWarning}
          className="p-1 rounded-md hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
          aria-label="Dismiss warning"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  // Render main layout
  return (
    <div className="w-full flex flex-col">
      {/* 1. MOBILE STICKY LAYOUT */}
      {layout === "mobile-sticky" && (
        <div className="w-full flex flex-col">
          <div 
            id="mobile-sticky-timer-bar" 
            className={`sticky top-[53px] z-15 px-4 py-2 flex items-center justify-between border-b transition-colors shadow-2xs font-sans ${currentTheme.bg} ${currentTheme.border}`}
          >
            <div className="flex items-center gap-1.5">
              <Clock className={`h-3.5 w-3.5 ${currentTheme.iconColor}`} />
              <span className="text-[11px] font-semibold">
                {currentTheme.label}: <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
              {questionProgressText && (
                <>
                  <span className="text-slate-600 font-semibold">{questionProgressText}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                </>
              )}
              <span className="text-[9px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                <Save className="h-2.5 w-2.5" />
                Saved locally
              </span>
            </div>

            {/* Aria live container */}
            <div className="sr-only" aria-live="polite">
              {ariaAnnouncement}
            </div>
          </div>
          {/* Banner sits below timer bar */}
          {activeAlertBanner && <div className="px-4 py-1 bg-slate-50">{activeAlertBanner}</div>}
        </div>
      )}

      {/* 2. DESKTOP REVIEW LAYOUT */}
      {layout === "desktop-review" && (
        <div className="flex flex-col gap-2 w-full">
          <div 
            id="desktop-review-timer"
            className={`border rounded-xl p-3.5 flex items-center justify-between text-left ${currentTheme.bg} ${currentTheme.border}`}
          >
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Submit before the timer ends</span>
              <h4 className="text-xs font-bold text-slate-800">{currentTheme.label}</h4>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className={`h-5 w-5 ${currentTheme.iconColor}`} />
              <span className={`text-lg font-mono font-bold tracking-tight ${currentTheme.valueClass}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="sr-only" aria-live="polite">
              {ariaAnnouncement}
            </div>
          </div>
          {activeAlertBanner}
        </div>
      )}

      {/* 3. CHECKPOINT COMPACT LAYOUT */}
      {layout === "checkpoint-compact" && (
        <div className="flex flex-col gap-2">
          <div 
            id="checkpoint-compact-timer"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs text-left ${currentTheme.bg} ${currentTheme.border}`}
          >
            <Clock className={`h-3.5 w-3.5 ${currentTheme.iconColor}`} />
            <span className="font-semibold">{currentTheme.label}:</span>
            <span className={`font-mono font-bold ${currentTheme.valueClass}`}>{formatTime(timeLeft)}</span>
            <div className="sr-only" aria-live="polite">
              {ariaAnnouncement}
            </div>
          </div>
          {activeAlertBanner}
        </div>
      )}

      {/* 4. DEFAULT DESKTOP HEADER LAYOUT */}
      {layout === "desktop-header" && (
        <div className="flex flex-col gap-2 w-full">
          <div 
            id="desktop-header-timer-card"
            className={`border rounded-2xl p-4 flex items-center justify-between gap-4 text-left shadow-2xs ${currentTheme.bg} ${currentTheme.border}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/40 rounded-xl shrink-0">
                <Clock className={`h-5 w-5 ${currentTheme.iconColor}`} />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">
                  {currentTheme.label}
                </span>
                <span className={`text-lg font-mono font-bold tracking-tight block leading-tight ${currentTheme.valueClass}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <div className="text-right space-y-1">
              {questionProgressText && (
                <p className="text-xs font-bold text-slate-700 leading-none">{questionProgressText}</p>
              )}
              <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/30 shrink-0">
                <Save className="h-3 w-3" />
                <span>Saved locally</span>
              </div>
            </div>

            <div className="sr-only" aria-live="polite">
              {ariaAnnouncement}
            </div>
          </div>
          {activeAlertBanner}
        </div>
      )}

      {/* ========================================== */}
      {/* 2-MINUTE CRITICAL ALERT (MODAL) */}
      {/* ========================================== */}
      {showCriticalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5 animate-in scale-in-95 duration-200 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100">
              <Clock className="h-6 w-6 text-amber-800" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Only 2 minutes left</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Please review your answers and submit soon. Your current work is saved locally on this device.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleDismissCritical}
                className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                Continue
              </button>
              <button
                onClick={handleReviewAnswers}
                className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                Review Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* EXPIRED ALERT (MODAL) */}
      {/* ========================================== */}
      {showExpiredModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-5 animate-in scale-in-95 duration-200 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Time is up</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isAssessment
                  ? "Time is up. Your assessment answers have been saved locally and are ready for review."
                  : "Time is up. Your checkpoint answers have been saved locally."}
              </p>
            </div>
            <p className="text-[10px] text-slate-400 bg-slate-50 py-2 px-3 rounded-xl border border-slate-100 font-medium">
              Answers saved locally in this frontend prototype. No real backend auto-submit.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setShowExpiredModal(false);
                  if (isAssessment) {
                    navigateTo("/learner/assessments/work-readiness-assessment/review-submit");
                  } else {
                    // Checkpoint: allow reviewing on screen
                    navigateTo("/learner/checkpoints/interview-preparation/review");
                  }
                }}
                className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                Review Saved Answers
              </button>
              <button
                onClick={() => {
                  setShowExpiredModal(false);
                  if (isAssessment) {
                    navigateTo("/learner/assessments/work-readiness-assessment/submitted");
                  } else {
                    navigateTo("/learner/assessments");
                  }
                }}
                className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 px-4 rounded-xl text-xs active:scale-[0.98] transition-transform cursor-pointer"
              >
                Submit Saved Work
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
