import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRoute } from "./RouteContext";

export type ModuleStatus = "locked" | "active" | "completed" | "blocked";
export type LessonStatus = "not started" | "in progress" | "checkpoint pending" | "completed";
export type AttendanceStatus = "not required" | "required" | "pending" | "completed" | "Not Joined" | "Joined" | "Present" | "Absent" | "Pending Confirmation";
export type AssessmentStatus = "draft" | "submitted" | "under review" | "passed" | "failed";

export interface ModuleData {
  id: string;
  title: string;
  status: ModuleStatus;
  lessonsText: string;
  cpdText: string;
  helperText: string;
  lessons: {
    id: string;
    title: string;
    completed: boolean;
    progress: number;
  }[];
  checkpointText?: string;
  checkpointCompleted: boolean;
  hasQuiz: boolean;
  quizPassed: boolean;
  quizScore?: number;
  hasAssignment: boolean;
  assignmentStatus: AssessmentStatus;
  assignmentDraft?: string;
  hasLiveSession: boolean;
  liveSessionId?: string;
  liveSessionAttended: boolean;
  attendanceState: AttendanceStatus;
}

export interface LiveSessionData {
  id: string;
  title: string;
  date: string;
  duration: string;
  time: string;
  facilitator: string;
  meetLink: string;
  zoomLink: string;
  attendanceCode: string;
  status: "scheduled" | "active" | "completed";
}

export type BandwidthMode = "full" | "audio-only" | "text-only" | "offline";
export type LiveProvider = "google_meet" | "zoom" | "fallback_audio" | "fallback_text";

interface LearningStateContextType {
  modules: ModuleData[];
  liveSession: LiveSessionData;
  activeProvider: LiveProvider;
  bandwidthMode: BandwidthMode;
  offlineDownloaded: boolean;
  cpdCredits: number;
  totalCpdCredits: number;
  certificateStatus: "Not Eligible" | "Ready for Review" | "Under Review" | "Issued";
  completeLesson: (moduleId: string, lessonId: string) => void;
  updateLessonProgress: (moduleId: string, lessonId: string, progress: number) => void;
  completeCheckpoint: (moduleId: string) => void;
  submitQuiz: (moduleId: string, score: number) => void;
  saveAssignmentDraft: (moduleId: string, draft: string) => void;
  submitAssignment: (moduleId: string, text: string) => void;
  gradeAssignment: (moduleId: string, score: number, passed: boolean) => void;
  joinLiveSession: () => void;
  submitSessionCode: (code: string) => boolean;
  markAttendanceManually: () => void;
  setLiveProvider: (provider: LiveProvider) => void;
  setBandwidthMode: (mode: BandwidthMode) => void;
  setOfflineDownloaded: (downloaded: boolean) => void;
  triggerUnlockEvaluation: () => void;
  resetAllProgress: () => void;
  simulateCompletePreviousModules: () => void;
  checkRouteAccess: (path: string) => { allowed: boolean; reason?: string; redirectPath?: string };
}

const LearningStateContext = createContext<LearningStateContextType | undefined>(undefined);

const INITIAL_LIVE_SESSION: LiveSessionData = {
  id: "session-m3",
  title: "Mock Interview Live Trial & STAR Review",
  date: "October 22, 2026",
  time: "14:00 - 15:30 (GMT+1)",
  duration: "90 mins",
  facilitator: "Halima Sani",
  meetLink: "https://meet.google.com/abc-defg-hij",
  zoomLink: "https://zoom.us/j/9876543210",
  attendanceCode: "STAR2026",
  status: "scheduled"
};

const INITIAL_MODULES: ModuleData[] = [
  {
    id: "m1",
    title: "Digital Readiness Basics",
    status: "completed",
    lessonsText: "8 of 8 completed",
    cpdText: "8 confirmed credits",
    helperText: "Foundational digital skills for learning and workplace readiness.",
    lessons: [
      { id: "m1-l1", title: "Introduction to Digital Tools", completed: true, progress: 100 },
      { id: "m1-l2", title: "Navigating the LMS Portal", completed: true, progress: 100 },
      { id: "m1-l3", title: "Online Safety & Credentials", completed: true, progress: 100 },
      { id: "m1-l4", title: "Search Engines & Resources", completed: true, progress: 100 },
      { id: "m1-l5", title: "Basic Content Creation", completed: true, progress: 100 },
      { id: "m1-l6", title: "Sharing Work & Privacy", completed: true, progress: 100 },
      { id: "m1-l7", title: "Collaboration Tools", completed: true, progress: 100 },
      { id: "m1-l8", title: "LMS Digital Assessment", completed: true, progress: 100 }
    ],
    checkpointCompleted: true,
    hasQuiz: true,
    quizPassed: true,
    quizScore: 88,
    hasAssignment: false,
    assignmentStatus: "passed",
    hasLiveSession: false,
    liveSessionAttended: true,
    attendanceState: "Present"
  },
  {
    id: "m2",
    title: "Workplace Communication",
    status: "completed",
    lessonsText: "4 of 4 completed",
    cpdText: "6 confirmed credits",
    helperText: "Interpersonal communication, active listening, and workplace professional etiquette.",
    lessons: [
      { id: "m2-l1", title: "Active Listening in Teams", completed: true, progress: 100 },
      { id: "m2-l2", title: "Professional Email Etiquette", completed: true, progress: 100 },
      { id: "m2-l3", title: "Constructive Feedback Loops", completed: true, progress: 100 },
      { id: "m2-l4", title: "Conflict Resolution Basics", completed: true, progress: 100 }
    ],
    checkpointCompleted: true,
    hasQuiz: true,
    quizPassed: true,
    quizScore: 92,
    hasAssignment: true,
    assignmentStatus: "passed",
    assignmentDraft: "Mock assignment content about professional communication.",
    hasLiveSession: true,
    liveSessionAttended: true,
    attendanceState: "Present"
  },
  {
    id: "m3",
    title: "Work Readiness Foundation",
    status: "active",
    lessonsText: "3 of 4 completed",
    cpdText: "8 potential credits",
    helperText: "Learn how to match skills to job roles, write custom CVs, and prepare for interviews.",
    lessons: [
      { id: "m3-l1", title: "Understanding Job Roles", completed: true, progress: 100 },
      { id: "m3-l2", title: "Writing a Modern CV", completed: true, progress: 100 },
      { id: "m3-l3", title: "Cover Letters that Fit", completed: true, progress: 100 },
      { id: "m3-l4", title: "Preparing for Interviews", completed: false, progress: 40 }
    ],
    checkpointText: "Interview STAR Practice Form",
    checkpointCompleted: false,
    hasQuiz: true,
    quizPassed: false,
    hasAssignment: true,
    assignmentStatus: "draft",
    assignmentDraft: "I would prepare for an interview by first reviewing the role and understanding what the employer may be looking for. I would practise answers using examples from my learning and community experience.",
    hasLiveSession: true,
    liveSessionId: "session-m3",
    liveSessionAttended: false,
    attendanceState: "Not Joined"
  },
  {
    id: "m4",
    title: "Professional Network Building",
    status: "locked",
    lessonsText: "0 of 5 completed",
    cpdText: "6 potential credits",
    helperText: "Build digital professional profiles, identify networking mentors, and ask for professional guidance.",
    lessons: [
      { id: "m4-l1", title: "Introduction to Networking", completed: false, progress: 0 },
      { id: "m4-l2", title: "Crafting Your Elevator Pitch", completed: false, progress: 0 },
      { id: "m4-l3", title: "Optimising Online Profiles", completed: false, progress: 0 },
      { id: "m4-l4", title: "Mentorship and Advisory", completed: false, progress: 0 },
      { id: "m4-l5", title: "Professional Event Etiquette", completed: false, progress: 0 }
    ],
    checkpointCompleted: false,
    hasQuiz: true,
    quizPassed: false,
    hasAssignment: false,
    assignmentStatus: "draft",
    hasLiveSession: true,
    liveSessionAttended: false,
    attendanceState: "Not Joined"
  },
  {
    id: "m5",
    title: "Workplace Wellness & Resiliency",
    status: "locked",
    lessonsText: "0 of 3 completed",
    cpdText: "5 potential credits",
    helperText: "Manage stress, build strong boundary-setting habits, and support mental health in high-demand environments.",
    lessons: [
      { id: "m5-l1", title: "Time Management and Priorities", completed: false, progress: 0 },
      { id: "m5-l2", title: "Understanding Stress Responses", completed: false, progress: 0 },
      { id: "m5-l3", title: "Building Workspace Boundaries", completed: false, progress: 0 }
    ],
    checkpointCompleted: false,
    hasQuiz: false,
    quizPassed: false,
    hasAssignment: true,
    assignmentStatus: "draft",
    hasLiveSession: false,
    liveSessionAttended: false,
    attendanceState: "Not Joined"
  }
];

export const LearningStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { navigateTo } = useRoute();
  const [modules, setModules] = useState<ModuleData[]>(() => {
    const saved = localStorage.getItem("sustain_lms_modules");
    return saved ? JSON.parse(saved) : INITIAL_MODULES;
  });

  const [liveSession, setLiveSession] = useState<LiveSessionData>(() => {
    const saved = localStorage.getItem("sustain_lms_livesession");
    return saved ? JSON.parse(saved) : INITIAL_LIVE_SESSION;
  });

  const [activeProvider, setActiveProvider] = useState<LiveProvider>(() => {
    return (localStorage.getItem("sustain_lms_provider") as LiveProvider) || "google_meet";
  });

  const [bandwidthMode, setBandwidthState] = useState<BandwidthMode>(() => {
    return (localStorage.getItem("sustain_lms_bandwidth") as BandwidthMode) || "full";
  });

  const [offlineDownloaded, setOfflineDownloadedState] = useState<boolean>(() => {
    return localStorage.getItem("sustain_lms_offline") === "true";
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("sustain_lms_modules", JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem("sustain_lms_livesession", JSON.stringify(liveSession));
  }, [liveSession]);

  useEffect(() => {
    localStorage.setItem("sustain_lms_provider", activeProvider);
  }, [activeProvider]);

  useEffect(() => {
    localStorage.setItem("sustain_lms_bandwidth", bandwidthMode);
  }, [bandwidthMode]);

  useEffect(() => {
    localStorage.setItem("sustain_lms_offline", String(offlineDownloaded));
  }, [offlineDownloaded]);

  // Calculate CPD Credits
  const cpdCredits = modules.reduce((total, mod) => {
    if (mod.status === "completed") {
      // Award the confirmed credits
      if (mod.id === "m1") return total + 8;
      if (mod.id === "m2") return total + 6;
      if (mod.id === "m3") return total + 8;
      if (mod.id === "m4") return total + 6;
      if (mod.id === "m5") return total + 5;
    }
    return total;
  }, 0);

  const totalCpdCredits = 35; // Total pathway credits target

  // Certificate Status
  const getCertificateStatus = (): "Not Eligible" | "Ready for Review" | "Under Review" | "Issued" => {
    // Check if Module 3 (Work Readiness Foundation) is completed (which holds the Work Readiness Certificate milestone)
    const m3 = modules.find(m => m.id === "m3");
    if (!m3) return "Not Eligible";

    if (m3.status === "completed") {
      return "Issued";
    }

    if (m3.assignmentStatus === "submitted" || m3.assignmentStatus === "under review") {
      return "Under Review";
    }

    if (m3.lessons.every(l => l.completed) && m3.checkpointCompleted && m3.quizPassed && m3.liveSessionAttended) {
      if (m3.assignmentStatus === "passed") {
        return "Ready for Review";
      }
    }

    return "Not Eligible";
  };

  const certificateStatus = getCertificateStatus();

  // Helper to mark a lesson completed
  const completeLesson = (moduleId: string, lessonId: string) => {
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== moduleId) return mod;

        const updatedLessons = mod.lessons.map(les => {
          if (les.id !== lessonId) return les;
          return { ...les, completed: true, progress: 100 };
        });

        // Calculate text
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const total = updatedLessons.length;

        return {
          ...mod,
          lessons: updatedLessons,
          lessonsText: `${completedCount} of ${total} completed`
        };
      });

      return evaluateUnlockRules(updated);
    });
  };

  // Helper to update lesson progress
  const updateLessonProgress = (moduleId: string, lessonId: string, progress: number) => {
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== moduleId) return mod;

        const updatedLessons = mod.lessons.map(les => {
          if (les.id !== lessonId) return les;
          const completed = progress === 100;
          return { ...les, progress, completed };
        });

        const completedCount = updatedLessons.filter(l => l.completed).length;
        const total = updatedLessons.length;

        return {
          ...mod,
          lessons: updatedLessons,
          lessonsText: `${completedCount} of ${total} completed`
        };
      });

      return evaluateUnlockRules(updated);
    });
  };

  // Complete lesson checkpoint
  const completeCheckpoint = (moduleId: string) => {
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== moduleId) return mod;
        return { ...mod, checkpointCompleted: true };
      });
      return evaluateUnlockRules(updated);
    });
  };

  // Submit quiz
  const submitQuiz = (moduleId: string, score: number) => {
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== moduleId) return mod;
        return {
          ...mod,
          quizPassed: score >= 70,
          quizScore: score
        };
      });
      return evaluateUnlockRules(updated);
    });
  };

  // Save Assignment Draft
  const saveAssignmentDraft = (moduleId: string, draft: string) => {
    setModules(prevModules => {
      return prevModules.map(mod => {
        if (mod.id !== moduleId) return mod;
        return { ...mod, assignmentDraft: draft, assignmentStatus: mod.assignmentStatus === "draft" ? "draft" : mod.assignmentStatus };
      });
    });
  };

  // Submit Assignment
  const submitAssignment = (moduleId: string, text: string) => {
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== moduleId) return mod;
        return {
          ...mod,
          assignmentDraft: text,
          assignmentStatus: "submitted" as const
        };
      });
      return evaluateUnlockRules(updated);
    });
  };

  // Facilitator simulation: grade assignment
  const gradeAssignment = (moduleId: string, score: number, passed: boolean) => {
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== moduleId) return mod;
        return {
          ...mod,
          assignmentStatus: passed ? ("passed" as const) : ("failed" as const)
        };
      });
      return evaluateUnlockRules(updated);
    });
  };

  // Join live session (triggers attendance transition to Present)
  const joinLiveSession = () => {
    setLiveSession(prev => ({ ...prev, status: "completed" }));
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== "m3") return mod; // Module 3 contains the scheduled session
        return {
          ...mod,
          liveSessionAttended: true,
          attendanceState: "Present" as const
        };
      });
      return evaluateUnlockRules(updated);
    });
  };

  // Enter session code to verify attendance
  const submitSessionCode = (code: string): boolean => {
    if (code === liveSession.attendanceCode) {
      setLiveSession(prev => ({ ...prev, status: "completed" }));
      setModules(prevModules => {
        const updated = prevModules.map(mod => {
          if (mod.id !== "m3") return mod;
          return {
            ...mod,
            liveSessionAttended: true,
            attendanceState: "Present" as const
          };
        });
        return evaluateUnlockRules(updated);
      });
      return true;
    }
    return false;
  };

  // Mark attendance manually
  const markAttendanceManually = () => {
    setModules(prevModules => {
      const updated = prevModules.map(mod => {
        if (mod.id !== "m3") return mod;
        return {
          ...mod,
          liveSessionAttended: true,
          attendanceState: "Present" as const
        };
      });
      return evaluateUnlockRules(updated);
    });
  };

  const setLiveProvider = (provider: LiveProvider) => {
    setActiveProvider(provider);
  };

  const setBandwidthMode = (mode: BandwidthMode) => {
    setBandwidthState(mode);
  };

  const setOfflineDownloaded = (downloaded: boolean) => {
    setOfflineDownloadedState(downloaded);
  };

  // Force re-run lock rules
  const triggerUnlockEvaluation = () => {
    setModules(prev => evaluateUnlockRules([...prev]));
  };

  // Fully sequential module unlocked check!
  const evaluateUnlockRules = (currentModules: ModuleData[]): ModuleData[] => {
    const nextModules = [...currentModules];

    // Module 1 is always completed or active initially.
    // Module 2 unlocks only if Module 1 is completed.
    // Let's check Module 1 completion conditions:
    const m1Complete = nextModules[0].lessons.every(l => l.completed) && nextModules[0].quizPassed;
    
    // Module 2 completion conditions:
    const m2Complete = m1Complete && 
                      nextModules[1].lessons.every(l => l.completed) && 
                      nextModules[1].quizPassed && 
                      nextModules[1].assignmentStatus === "passed" &&
                      nextModules[1].liveSessionAttended;

    // Module 3 completion conditions:
    const m3Complete = m2Complete && 
                      nextModules[2].lessons.every(l => l.completed) && 
                      nextModules[2].checkpointCompleted && 
                      nextModules[2].quizPassed && 
                      nextModules[2].assignmentStatus === "passed" && 
                      nextModules[2].liveSessionAttended;

    // Module 4 completion conditions:
    const m4Complete = m3Complete && 
                      nextModules[3].lessons.every(l => l.completed) && 
                      nextModules[3].quizPassed && 
                      nextModules[3].liveSessionAttended;

    // Apply lock states sequentially:
    // Module 1
    nextModules[0].status = "completed"; // Locked initially but is always completed in our profile

    // Module 2
    if (m1Complete) {
      nextModules[1].status = nextModules[1].status === "locked" ? "active" : nextModules[1].status;
    } else {
      nextModules[1].status = "locked";
    }

    // Module 3
    if (m2Complete) {
      if (nextModules[2].status === "locked") {
        nextModules[2].status = "active";
      }
      // If fully complete, transition to completed
      const allLessonsDone = nextModules[2].lessons.every(l => l.completed);
      const checkpointDone = nextModules[2].checkpointCompleted;
      const quizDone = nextModules[2].quizPassed;
      const assignmentPassed = nextModules[2].assignmentStatus === "passed";
      const liveSessionDone = nextModules[2].liveSessionAttended;

      if (allLessonsDone && checkpointDone && quizDone && assignmentPassed && liveSessionDone) {
        nextModules[2].status = "completed";
      } else {
        nextModules[2].status = "active";
      }
    } else {
      nextModules[2].status = "locked";
    }

    // Module 4
    if (m3Complete) {
      if (nextModules[3].status === "locked") {
        nextModules[3].status = "active";
      }
      const allLessonsDone = nextModules[3].lessons.every(l => l.completed);
      const quizDone = nextModules[3].quizPassed;
      const liveSessionDone = nextModules[3].liveSessionAttended;

      if (allLessonsDone && quizDone && liveSessionDone) {
        nextModules[3].status = "completed";
      } else {
        nextModules[3].status = "active";
      }
    } else {
      nextModules[3].status = "locked";
    }

    // Module 5
    if (m4Complete) {
      if (nextModules[4].status === "locked") {
        nextModules[4].status = "active";
      }
    } else {
      nextModules[4].status = "locked";
    }

    return nextModules;
  };

  // Reset progress for demo
  const resetAllProgress = () => {
    localStorage.removeItem("sustain_lms_modules");
    localStorage.removeItem("sustain_lms_livesession");
    localStorage.removeItem("sustain_lms_provider");
    localStorage.removeItem("sustain_lms_bandwidth");
    localStorage.removeItem("sustain_lms_offline");
    setModules(INITIAL_MODULES);
    setLiveSession(INITIAL_LIVE_SESSION);
    setActiveProvider("google_meet");
    setBandwidthMode("full");
    setOfflineDownloadedState(false);
  };

  // Fast forward simulation to complete previous modules
  const simulateCompletePreviousModules = () => {
    setModules(prev => {
      const updated = prev.map((mod, idx) => {
        if (idx < 2) {
          // Module 1 and 2 are already completed by default, let's keep them so.
          return mod;
        }
        if (mod.id === "m3") {
          // Let's complete Module 3 lessons and everything else to unlock Module 4!
          const updatedLessons = mod.lessons.map(l => ({ ...l, completed: true, progress: 100 }));
          return {
            ...mod,
            lessons: updatedLessons,
            lessonsText: `${updatedLessons.length} of ${updatedLessons.length} completed`,
            checkpointCompleted: true,
            quizPassed: true,
            quizScore: 85,
            assignmentStatus: "passed" as const,
            liveSessionAttended: true,
            attendanceState: "Present" as const
          };
        }
        return mod;
      });
      return evaluateUnlockRules(updated);
    });
  };

  // Check Route Access
  const checkRouteAccess = (path: string): { allowed: boolean; reason?: string; redirectPath?: string } => {
    // Normalization
    const cleaned = path.split("#")[0].split("?")[0];

    // Module 3 Paths
    const isModule3Lesson = [
      "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews",
      "/learner/lessons/preparing-for-interviews",
      "/learner/lesson/preparing-for-interviews",
      "/learner/courses/work-readiness-foundation/preparing-for-interviews"
    ].includes(cleaned);

    const isModule3Assessment = [
      "/learner/assessments/work-readiness-assignment",
      "/learner/assessments/work-readiness-assignment/result",
      "/learner/results/work-readiness-assignment"
    ].includes(cleaned);

    const isModule3Base = cleaned === "/learner/courses/work-readiness-foundation";

    // Assess Module 3 Lock state
    const m3 = modules.find(m => m.id === "m3");
    if (m3 && m3.status === "locked") {
      if (isModule3Lesson || isModule3Assessment || isModule3Base) {
        return {
          allowed: false,
          reason: "This module is locked. Please complete Module 1 & 2 requirements first.",
          redirectPath: "/learner/journey"
        };
      }
    }

    // Module 4 Paths (if exist)
    // No specific routes exist for module 4 lessons in VALID_ROUTES, but we check if module 4 is locked
    const m4 = modules.find(m => m.id === "m4");
    if (m4 && m4.status === "locked") {
      if (cleaned.includes("/learner/courses/professional-network-building")) {
        return {
          allowed: false,
          reason: "This module is locked. Please complete the Work Readiness Foundation module first.",
          redirectPath: "/learner/journey"
        };
      }
    }

    return { allowed: true };
  };

  return (
    <LearningStateContext.Provider
      value={{
        modules,
        liveSession,
        activeProvider,
        bandwidthMode,
        offlineDownloaded,
        cpdCredits,
        totalCpdCredits,
        certificateStatus,
        completeLesson,
        updateLessonProgress,
        completeCheckpoint,
        submitQuiz,
        saveAssignmentDraft,
        submitAssignment,
        gradeAssignment,
        joinLiveSession,
        submitSessionCode,
        markAttendanceManually,
        setLiveProvider,
        setBandwidthMode,
        setOfflineDownloaded,
        triggerUnlockEvaluation,
        resetAllProgress,
        simulateCompletePreviousModules,
        checkRouteAccess
      }}
    >
      {children}
    </LearningStateContext.Provider>
  );
};

export const useLearningState = () => {
  const context = useContext(LearningStateContext);
  if (!context) {
    throw new Error("useLearningState must be used within a LearningStateProvider");
  }
  return context;
};
