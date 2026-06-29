import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";

export type RoutePath = 
  | "/"
  | "/about"
  | "/contact"
  | "/help"
  | "/privacy"
  | "/terms"
  | "/accessibility"
  | "/login"
  | "/signup"
  | "/onboarding"
  | "/register"
  | "/pathways"
  | "/how-it-works"
  | "/support"
  | "/support/topics"
  | "/verify-certificate"
  | "/learner"
  | "/learner/dashboard"
  | "/learner/journey"
  | "/learner/courses"
  | "/learner/courses/digital-readiness-basics"
  | "/learner/assessments/workplace-communication/result"
  | "/learner/courses/work-readiness-foundation"
  | "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews"
  | "/learner/lessons/preparing-for-interviews"
  | "/learner/lesson/preparing-for-interviews"
  | "/learner/courses/work-readiness-foundation/preparing-for-interviews"
  | "/learner/downloads"
  | "/learner/assessments"
  | "/learner/assessment"
  | "/learner/assessments/work-readiness-assignment"
  | "/learner/assessments/work-readiness-assignment/result"
  | "/learner/assessments/work-readiness-assessment"
  | "/learner/assessments/work-readiness-assessment/attempt"
  | "/learner/assessments/work-readiness-assessment/review-submit"
  | "/learner/assessments/work-readiness-assessment/submitted"
  | "/learner/assessments/work-readiness-assessment/result"
  | "/learner/assessments/agri-logistics-quiz/attempt"
  | "/learner/assessments/result"
  | "/learner/assessment-result"
  | "/learner/results/work-readiness-assignment"
  | "/learner/certificates"
  | "/learner/cpd-record"
  | "/learner/certificates/work-readiness-certificate"
  | "/learner/community"
  | "/learner/community/interview-preparation-discussion"
  | "/learner/support"
  | "/learner/support/certificate-readiness-request"
  | "/learner/resources"
  | "/learner/resources/low-bandwidth-reading-version"
  | "/learner/notifications"
  | "/learner/profile"
  | "/learner/low-bandwidth"
  | "/learner/offline"
  | "/learner/live-sessions"
  | "/learner/live-sessions/interview-practice-clinic"
  | "/learner/courses/work-readiness-foundation/modules/interview-preparation/locked"
  | "/learner/checkpoints/interview-preparation/review"
  | "/facilitator/dashboard"
  | "/facilitator/cohorts"
  | "/facilitator/cohorts/kano-02"
  | "/facilitator/cohorts/kano-youth-employability-cohort-02"
  | "/facilitator/cohorts/kaduna-01"
  | "/facilitator/cohorts/abuja-03"
  | "/facilitator/learners"
  | "/facilitator/learners/SUST-LRN-0442"
  | "/facilitator/learners/aisha-mohammed"
  | "/facilitator/learners/SUST-LRN-0443"
  | "/facilitator/learners/SUST-LRN-0444"
  | "/facilitator/learners/SUST-LRN-0445"
  | "/facilitator/learners/SUST-LRN-0446"
  | "/facilitator/assessments"
  | "/facilitator/assessments/sub-101"
  | "/facilitator/assessments/sub-102"
  | "/facilitator/assessments/sub-103"
  | "/facilitator/assessments/sub-104"
  | "/facilitator/assessment-reviews"
  | "/facilitator/reviews"
  | "/facilitator/discussions"
  | "/facilitator/sessions"
  | "/facilitator/resources"
  | "/facilitator/reports"
  | "/facilitator/messages"
  | "/facilitator/profile"
  | "/facilitator/follow-up-queue"
  | "/facilitator/learner-questions"
  | "/facilitator/questions"
  | "/facilitator/qna"
  | "/facilitator/community"
  | "/facilitator/support-tickets"
  | "/facilitator/support"
  | "/facilitator/tickets";

interface RouteContextType {
  currentPath: string;
  navigateTo: (path: RoutePath) => void;
  showToast: (message: string) => void;
  authRole: "learner" | "facilitator" | "admin";
  setAuthRole: (role: "learner" | "facilitator" | "admin") => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

const VALID_ROUTES: RoutePath[] = [
  "/",
  "/about",
  "/contact",
  "/help",
  "/privacy",
  "/terms",
  "/accessibility",
  "/login",
  "/signup",
  "/register",
  "/pathways",
  "/how-it-works",
  "/support",
  "/support/topics",
  "/verify-certificate",
  "/learner",
  "/learner/dashboard",
  "/learner/journey",
  "/learner/courses",
  "/learner/courses/digital-readiness-basics",
  "/learner/assessments/workplace-communication/result",
  "/learner/courses/work-readiness-foundation",
  "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews",
  "/learner/lessons/preparing-for-interviews",
  "/learner/lesson/preparing-for-interviews",
  "/learner/courses/work-readiness-foundation/preparing-for-interviews",
  "/learner/downloads",
  "/learner/assessments",
  "/learner/assessment",
  "/learner/assessments/work-readiness-assignment",
  "/learner/assessments/work-readiness-assignment/result",
  "/learner/assessments/work-readiness-assessment",
  "/learner/assessments/work-readiness-assessment/attempt",
  "/learner/assessments/work-readiness-assessment/review-submit",
  "/learner/assessments/work-readiness-assessment/submitted",
  "/learner/assessments/work-readiness-assessment/result",
  "/learner/assessments/agri-logistics-quiz/attempt",
  "/learner/assessments/result",
  "/learner/assessment-result",
  "/learner/results/work-readiness-assignment",
  "/learner/certificates",
  "/learner/cpd-record",
  "/learner/certificates/work-readiness-certificate",
  "/learner/community",
  "/learner/community/interview-preparation-discussion",
  "/learner/support",
  "/learner/support/certificate-readiness-request",
  "/learner/resources",
  "/learner/resources/low-bandwidth-reading-version",
  "/learner/notifications",
  "/learner/profile",
  "/learner/low-bandwidth",
  "/learner/offline",
  "/learner/live-sessions",
  "/learner/live-sessions/interview-practice-clinic",
  "/learner/courses/work-readiness-foundation/modules/interview-preparation/locked",
  "/learner/checkpoints/interview-preparation/review",
  "/facilitator/dashboard",
  "/facilitator/cohorts",
  "/facilitator/cohorts/kano-02",
  "/facilitator/cohorts/kano-youth-employability-cohort-02",
  "/facilitator/cohorts/kaduna-01",
  "/facilitator/cohorts/abuja-03",
  "/facilitator/learners",
  "/facilitator/learners/SUST-LRN-0442",
  "/facilitator/learners/aisha-mohammed",
  "/facilitator/learners/SUST-LRN-0443",
  "/facilitator/learners/SUST-LRN-0444",
  "/facilitator/learners/SUST-LRN-0445",
  "/facilitator/learners/SUST-LRN-0446",
  "/facilitator/assessments",
  "/facilitator/assessments/sub-101",
  "/facilitator/assessments/sub-102",
  "/facilitator/assessments/sub-103",
  "/facilitator/assessments/sub-104",
  "/facilitator/assessment-reviews",
  "/facilitator/reviews",
  "/facilitator/discussions",
  "/facilitator/sessions",
  "/facilitator/resources",
  "/facilitator/reports",
  "/facilitator/messages",
  "/facilitator/profile",
  "/facilitator/follow-up-queue",
  "/facilitator/learner-questions",
  "/facilitator/questions",
  "/facilitator/qna",
  "/facilitator/community",
  "/facilitator/support-tickets",
  "/facilitator/support",
  "/facilitator/tickets"
];

function cleanAndNormalize(rawPath: string): string {
  if (!rawPath) return "/";
  
  let cleaned = rawPath;
  
  // Strip leading hash combinations: #/, #, /#, #/, /#/
  cleaned = cleaned.replace(/^#+/, "");
  cleaned = cleaned.replace(/^\/#+/, "");
  cleaned = cleaned.replace(/^#+\/+/, "");
  cleaned = cleaned.replace(/^\/#+\/+/, "");
  
  // Ensure it starts with "/"
  if (!cleaned.startsWith("/")) {
    cleaned = "/" + cleaned;
  }
  
  // Handle multiple sequential slashes
  cleaned = cleaned.replace(/\/+/g, "/");
  
  // Remove trailing slashes unless it is exactly "/"
  if (cleaned.length > 1 && cleaned.endsWith("/")) {
    cleaned = cleaned.slice(0, -1);
  }

  // Map /home to /
  if (cleaned === "/home") {
    cleaned = "/";
  }
  
  return cleaned;
}

function isValidRoute(path: string): path is RoutePath {
  return VALID_ROUTES.includes(path as RoutePath);
}

function getActiveRoute(): RoutePath {
  // 1. Try to parse window.location.hash
  const rawHash = window.location.hash;
  const normalizedHash = cleanAndNormalize(rawHash);
  if (normalizedHash !== "/" && isValidRoute(normalizedHash)) {
    return normalizedHash;
  }

  // 2. Try to parse window.location.pathname
  const rawPath = window.location.pathname;
  const normalizedPath = cleanAndNormalize(rawPath);
  if (isValidRoute(normalizedPath)) {
    return normalizedPath;
  }

  return "/";
}

export function RouteProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<RoutePath>(getActiveRoute);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [authRole, setAuthRole] = useState<"learner" | "facilitator" | "admin">("learner");

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPath(getActiveRoute());
    };

    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    
    // Also run an initial normalization to ensure URL aligns if loaded with trailing slash
    const active = getActiveRoute();
    if (active !== "/" && window.location.hash !== `#${active}`) {
      window.location.hash = active;
    }

    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  const navigateTo = (path: RoutePath) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <RouteContext.Provider value={{ currentPath, navigateTo, showToast, authRole, setAuthRole }}>
      {children}
      
      {/* Global Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
          <span className="text-left">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2 cursor-pointer">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
}
