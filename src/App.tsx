/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// NOTE: All modifications, layouts, and style guides must comply strictly with the rules in /design.md

import { RouteProvider, useRoute } from "./context/RouteContext";
import { LearningStateProvider, useLearningState } from "./context/LearningStateContext";
import { useEffect } from "react";
import { PublicLayout } from "./components/layout/PublicLayout";
import { PublicHomePage } from "./pages/public/PublicHomePage";
import { PublicInfoPage } from "./pages/public/PublicInfoPage";
import { PublicCertificateVerificationPage } from "./pages/public/PublicCertificateVerificationPage";
import { AuthLayout } from "./components/layout/AuthLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { OnboardingPage } from "./pages/auth/OnboardingPage";
import { LearnerLayout } from "./components/layout/LearnerLayout";
import { LearnerDashboardPage } from "./pages/learner/LearnerDashboardPage";
import { LearnerJourneyPage } from "./pages/learner/LearnerJourneyPage";
import { LearnerCourseDetailPage } from "./pages/learner/LearnerCourseDetailPage";
import LearnerLessonPage from "./pages/learner/LearnerLessonPage";
import LearnerDownloadsPage from "./pages/learner/LearnerDownloadsPage";
import LearnerAssessmentPage from "./pages/learner/LearnerAssessmentPage";
import LearnerAssessmentAttemptPage from "./pages/learner/LearnerAssessmentAttemptPage";
import LearnerAssessmentReviewPage from "./pages/learner/LearnerAssessmentReviewPage";
import LearnerAssessmentResultPage from "./pages/learner/LearnerAssessmentResultPage";
import LearnerCertificatesPage from "./pages/learner/LearnerCertificatesPage";
import LearnerCertificateDetailPage from "./pages/learner/LearnerCertificateDetailPage";
import { LearnerCommunityPage } from "./pages/learner/LearnerCommunityPage";
import LearnerCommunityDiscussionPage from "./pages/learner/LearnerCommunityDiscussionPage";
import { LearnerSupportPage } from "./pages/learner/LearnerSupportPage";
import LearnerSupportRequestPage from "./pages/learner/LearnerSupportRequestPage";
import LearnerProfilePage from "./pages/learner/LearnerProfilePage";
import LearnerCoursesPage from "./pages/learner/LearnerCoursesPage";
import { LearnerDigitalReadinessPage } from "./pages/learner/LearnerDigitalReadinessPage";
import LearnerAssessmentsPage from "./pages/learner/LearnerAssessmentsPage";
import LearnerNotificationsPage from "./pages/learner/LearnerNotificationsPage";
import LearnerResourcesPage from "./pages/learner/LearnerResourcesPage";
import LearnerResourceViewerPage from "./pages/learner/LearnerResourceViewerPage";
import LearnerLowBandwidthPage from "./pages/learner/LearnerLowBandwidthPage";
import LearnerOfflinePage from "./pages/learner/LearnerOfflinePage";
import LearnerLiveSessionPage from "./pages/learner/LearnerLiveSessionPage";
import { LearnerLiveSessionsHubPage } from "./pages/learner/LearnerLiveSessionsHubPage";
import LearnerLockedModulePage from "./pages/learner/LearnerLockedModulePage";
import LearnerCheckpointReviewPage from "./pages/learner/LearnerCheckpointReviewPage";
import LearnerSubmittedPage from "./pages/learner/LearnerSubmittedPage";
import LearnerQuizAttemptPage from "./pages/learner/LearnerQuizAttemptPage";
import { FacilitatorRouterPage } from "./pages/facilitator/FacilitatorRouterPage";
import { motion, AnimatePresence } from "motion/react";

function AppContent() {
  const { currentPath, navigateTo, showToast } = useRoute();
  const { checkRouteAccess } = useLearningState();

  useEffect(() => {
    const access = checkRouteAccess(currentPath);
    if (!access.allowed) {
      if (showToast) {
        showToast(access.reason || "This section is locked.");
      }
      if (access.redirectPath) {
        navigateTo(access.redirectPath as any);
      }
    }
  }, [currentPath, checkRouteAccess, navigateTo, showToast]);

  // Guard: If it's a learner path but not explicitly defined, fallback to LearnerDashboardPage
  const isLearnerPath = currentPath.startsWith("/learner");
  const isKnownLearnerPath = [
    "/learner",
    "/learner/dashboard",
    "/learner/downloads",
    "/learner/assessments",
    "/learner/assessment",
    "/learner/my-assessments",
    "/learner/assessment-overview",
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
    "/learner/journey",
    "/learner/certificates",
    "/learner/cpd-record",
    "/learner/certificates/work-readiness-certificate",
    "/learner/courses",
    "/learner/courses/digital-readiness-basics",
    "/learner/assessments/workplace-communication/result",
    "/learner/courses/work-readiness-foundation",
    "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews",
    "/learner/lessons/preparing-for-interviews",
    "/learner/lesson/preparing-for-interviews",
    "/learner/courses/work-readiness-foundation/preparing-for-interviews",
    "/learner/community",
    "/learner/community/interview-preparation-discussion",
    "/learner/support",
    "/learner/resources",
    "/learner/resources/low-bandwidth-reading-version",
    "/learner/notifications",
    "/learner/profile",
    "/learner/low-bandwidth",
    "/learner/offline",
    "/learner/live-sessions",
    "/learner/live-sessions/interview-practice-clinic",
    "/learner/courses/work-readiness-foundation/modules/interview-preparation/locked",
    "/learner/checkpoints/interview-preparation/review"
  ].includes(currentPath);

  const isFacilitatorPath = currentPath.startsWith("/facilitator");

  let resolvedPath = currentPath;
  if (isLearnerPath && !isKnownLearnerPath) {
    resolvedPath = "/learner";
  } else if (isFacilitatorPath) {
    resolvedPath = "/facilitator";
  }

  const pageContent = (() => {
    switch (resolvedPath) {
      case "/facilitator":
        return (
          <FacilitatorRouterPage />
        );
      case "/learner":
      case "/learner/dashboard":
        return (
          <LearnerDashboardPage />
        );
      case "/learner/downloads":
        return (
          <LearnerDownloadsPage />
        );
      case "/learner/assessments":
      case "/learner/assessment":
      case "/learner/my-assessments":
      case "/learner/assessment-overview":
        return (
          <LearnerAssessmentsPage />
        );
      case "/learner/assessments/work-readiness-assignment":
      case "/learner/assessments/work-readiness-assessment":
        return (
          <LearnerAssessmentPage />
        );
      case "/learner/assessments/work-readiness-assessment/attempt":
        return (
          <LearnerAssessmentAttemptPage />
        );
      case "/learner/assessments/work-readiness-assessment/review-submit":
        return (
          <LearnerAssessmentReviewPage />
        );
      case "/learner/assessments/work-readiness-assessment/submitted":
        return (
          <LearnerSubmittedPage />
        );
      case "/learner/assessments/agri-logistics-quiz/attempt":
        return (
          <LearnerQuizAttemptPage />
        );
      case "/learner/low-bandwidth":
        return (
          <LearnerLowBandwidthPage />
        );
      case "/learner/offline":
        return (
          <LearnerOfflinePage />
        );
      case "/learner/live-sessions":
        return (
          <LearnerLiveSessionsHubPage />
        );
      case "/learner/live-sessions/interview-practice-clinic":
        return (
          <LearnerLiveSessionPage />
        );
      case "/learner/courses/work-readiness-foundation/modules/interview-preparation/locked":
        return (
          <LearnerLockedModulePage />
        );
      case "/learner/checkpoints/interview-preparation/review":
        return (
          <LearnerCheckpointReviewPage />
        );
       case "/learner/assessments/workplace-communication/result":
      case "/learner/assessments/work-readiness-assessment/result":
      case "/learner/assessments/work-readiness-assignment/result":
      case "/learner/assessments/result":
      case "/learner/assessment-result":
      case "/learner/results/work-readiness-assignment":
        return (
          <LearnerAssessmentResultPage />
        );
      case "/learner/journey":
        return (
          <LearnerJourneyPage />
        );
      case "/learner/certificates":
      case "/learner/cpd-record":
        return (
          <LearnerCertificatesPage />
        );
      case "/learner/certificates/work-readiness-certificate":
        return (
          <LearnerCertificateDetailPage />
        );
      case "/learner/community":
        return (
          <LearnerCommunityPage />
        );
      case "/learner/community/interview-preparation-discussion":
        return (
          <LearnerCommunityDiscussionPage />
        );
      case "/learner/support":
        return (
          <LearnerSupportPage />
        );
      case "/learner/support/certificate-readiness-request":
        return (
          <LearnerSupportRequestPage />
        );
      case "/learner/profile":
        return (
          <LearnerProfilePage />
        );
      case "/learner/notifications":
        return (
          <LearnerNotificationsPage />
        );
      case "/learner/resources":
        return (
          <LearnerResourcesPage />
        );
      case "/learner/resources/low-bandwidth-reading-version":
        return (
          <LearnerResourceViewerPage />
        );
      case "/learner/courses":
        return (
          <LearnerCoursesPage />
        );
      case "/learner/courses/digital-readiness-basics":
        return (
          <LearnerDigitalReadinessPage />
        );
      case "/learner/courses/work-readiness-foundation":
        return (
          <LearnerCourseDetailPage />
        );
      case "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews":
      case "/learner/lessons/preparing-for-interviews":
      case "/learner/lesson/preparing-for-interviews":
      case "/learner/courses/work-readiness-foundation/preparing-for-interviews":
        return (
          <LearnerLessonPage />
        );
      case "/login":
        return (
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        );
      case "/signup":
      case "/register":
        return (
          <AuthLayout>
            <SignupPage />
          </AuthLayout>
        );
      case "/onboarding":
        return (
          <AuthLayout>
            <OnboardingPage />
          </AuthLayout>
        );
      case "/about":
      case "/contact":
      case "/privacy":
      case "/terms":
      case "/accessibility":
      case "/help":
        return (
          <PublicLayout>
            <PublicInfoPage />
          </PublicLayout>
        );
      case "/verify-certificate":
        return (
          <PublicLayout>
            <PublicCertificateVerificationPage />
          </PublicLayout>
        );
      case "/":
      default:
        return (
          <PublicLayout>
            <PublicHomePage />
          </PublicLayout>
        );
    }
  })();

  const animatedPage = (
    <AnimatePresence mode="wait">
      <motion.div
        key={resolvedPath}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full h-full"
      >
        {pageContent}
      </motion.div>
    </AnimatePresence>
  );

  if (resolvedPath.startsWith("/learner")) {
    return (
      <LearnerLayout>
        {animatedPage}
      </LearnerLayout>
    );
  }

  return animatedPage;
}

export default function App() {
  return (
    <RouteProvider>
      <LearningStateProvider>
        <AppContent />
      </LearningStateProvider>
    </RouteProvider>
  );
}
