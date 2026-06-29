import { useState, useEffect } from "react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { FacilitatorLayout } from "../../components/layout/FacilitatorLayout";

// Import mock data and types
import { 
  mockAssessmentSubmissions,
  mockFacilitatorLearners,
  mockFacilitatorSessions,
  mockFacilitatorDiscussions,
  AssessmentSubmission,
  FacilitatorLearner,
  FacilitatorSession,
  FacilitatorDiscussion
} from "../../data/mockFacilitator";

// Import Views
import { DashboardView } from "./components/DashboardView";
import { CohortsView } from "./components/CohortsView";
import { LearnersView } from "./components/LearnersView";
import { AssessmentsView } from "./components/AssessmentsView";
import { DiscussionsView } from "./components/DiscussionsView";
import { SessionsView } from "./components/SessionsView";
import { ResourcesView } from "./components/ResourcesView";
import { FacilitatorReportsPage } from "./FacilitatorReportsPage";
import { MessagesView } from "./components/MessagesView";
import { FollowUpQueueView } from "./components/FollowUpQueueView";
import { LearnerQuestionsView } from "./components/LearnerQuestionsView";
import { FacilitatorCommunityPage } from "./FacilitatorCommunityPage";
import { FacilitatorSupportTicketsPage } from "./FacilitatorSupportTicketsPage";
import { FacilitatorProfilePage } from "./FacilitatorProfilePage";

export function FacilitatorRouterPage() {
  const { currentPath, navigateTo, showToast } = useRoute();

  // Redirect unimplemented routes back to dashboard
  useEffect(() => {
    const unimplementedRoutes = [
      "/facilitator/discussions",
      "/facilitator/sessions",
      "/facilitator/resources",
      "/facilitator/messages"
    ];
    
    const isUnimplemented = unimplementedRoutes.some(route => currentPath.startsWith(route));
    if (isUnimplemented) {
      navigateTo("/facilitator/dashboard" as RoutePath);
      setTimeout(() => {
        showToast("This section is not available in this frontend prototype yet.");
      }, 100);
    }
  }, [currentPath, navigateTo, showToast]);

  // Unified global session states for high-fidelity interactive flow
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(mockAssessmentSubmissions);
  const [learners, setLearners] = useState<FacilitatorLearner[]>(mockFacilitatorLearners);
  const [sessions, setSessions] = useState<FacilitatorSession[]>(mockFacilitatorSessions);
  const [discussions, setDiscussions] = useState<FacilitatorDiscussion[]>(mockFacilitatorDiscussions);

  // Auto-scroll to top on path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Handler functions to sync dynamic sub-routes via useRoute hooks
  const handleNavigateToSub = (submissionId: string) => {
    navigateTo(`/facilitator/assessments/${submissionId}` as RoutePath);
  };

  const handleNavigateToLearner = (learnerId: string) => {
    navigateTo(`/facilitator/learners/${learnerId}` as RoutePath);
  };

  const handleNavigateToCohort = (cohortId: string) => {
    navigateTo(`/facilitator/cohorts/${cohortId}` as RoutePath);
  };

  // Switch router based on path segments
  const renderActiveView = () => {
    if (currentPath === "/facilitator" || currentPath === "/facilitator/dashboard") {
      return (
        <DashboardView 
          onNavigateToSub={handleNavigateToSub}
          onNavigateToLearner={handleNavigateToLearner}
          onNavigateToCohort={handleNavigateToCohort}
          submissions={submissions}
          learners={learners}
        />
      );
    }

    if (currentPath.startsWith("/facilitator/cohorts")) {
      // Check if it's a detail path e.g. /facilitator/cohorts/kano-02
      const segments = currentPath.split("/");
      const cohortId = segments.length > 3 ? segments[3] : null;

      return (
        <CohortsView 
          selectedCohortId={cohortId}
          onSelectCohort={(id) => {
            if (id) {
              navigateTo(`/facilitator/cohorts/${id}` as RoutePath);
            } else {
              navigateTo("/facilitator/cohorts" as RoutePath);
            }
          }}
          onSelectLearner={handleNavigateToLearner}
          onSelectSubmission={handleNavigateToSub}
          learners={learners}
          submissions={submissions}
        />
      );
    }

    if (currentPath.startsWith("/facilitator/learners")) {
      const segments = currentPath.split("/");
      const learnerId = segments.length > 3 ? segments[3] : null;

      return (
        <LearnersView 
          selectedLearnerId={learnerId}
          onSelectLearner={(id) => {
            if (id) {
              navigateTo(`/facilitator/learners/${id}` as RoutePath);
            } else {
              navigateTo("/facilitator/learners" as RoutePath);
            }
          }}
          onSelectSubmission={handleNavigateToSub}
          learners={learners}
          onUpdateLearners={setLearners}
        />
      );
    }

    if (currentPath.startsWith("/facilitator/assessments") || currentPath.startsWith("/facilitator/assessment-reviews") || currentPath.startsWith("/facilitator/reviews")) {
      const segments = currentPath.split("/");
      let submissionId: string | null = null;
      if (currentPath.startsWith("/facilitator/assessments/")) {
        submissionId = segments.length > 3 ? segments[3] : null;
      }

      return (
        <AssessmentsView 
          selectedSubmissionId={submissionId}
          onSelectSubmission={(id) => {
            if (id) {
              navigateTo(`/facilitator/assessments/${id}` as RoutePath);
            } else {
              navigateTo("/facilitator/assessments" as RoutePath);
            }
          }}
          submissions={submissions}
          onUpdateSubmissions={setSubmissions}
        />
      );
    }

    if (currentPath === "/facilitator/discussions") {
      return (
        <DiscussionsView 
          discussions={discussions}
          onUpdateDiscussions={setDiscussions}
        />
      );
    }

    if (currentPath === "/facilitator/sessions") {
      return (
        <SessionsView 
          sessions={sessions}
          onUpdateSessions={setSessions}
        />
      );
    }

    if (currentPath === "/facilitator/resources") {
      return <ResourcesView />;
    }

    if (currentPath === "/facilitator/reports" || currentPath.startsWith("/facilitator/reports")) {
      return <FacilitatorReportsPage />;
    }

    if (currentPath === "/facilitator/messages") {
      return <MessagesView />;
    }

    if (currentPath === "/facilitator/follow-up-queue" || currentPath === "/facilitator/follow-up" || currentPath === "/facilitator/followups") {
      return <FollowUpQueueView />;
    }

    if (currentPath === "/facilitator/learner-questions" || currentPath === "/facilitator/questions" || currentPath === "/facilitator/qna") {
      return <LearnerQuestionsView />;
    }

    if (currentPath === "/facilitator/community") {
      return <FacilitatorCommunityPage />;
    }

    if (currentPath === "/facilitator/support-tickets" || currentPath === "/facilitator/support" || currentPath === "/facilitator/tickets") {
      return <FacilitatorSupportTicketsPage />;
    }

    if (currentPath === "/facilitator/profile") {
      return <FacilitatorProfilePage />;
    }

    // Default fallback to dashboard
    return (
      <DashboardView 
        onNavigateToSub={handleNavigateToSub}
        onNavigateToLearner={handleNavigateToLearner}
        onNavigateToCohort={handleNavigateToCohort}
        submissions={submissions}
        learners={learners}
      />
    );
  };

  if (currentPath === "/facilitator/reports" || currentPath.startsWith("/facilitator/reports")) {
    return <FacilitatorReportsPage />;
  }

  return (
    <FacilitatorLayout
      headerTitle={currentPath.startsWith("/facilitator/cohorts") ? "Kano Youth Employability Cohort 02" : undefined}
      searchPlaceholder={currentPath.startsWith("/facilitator/cohorts") ? "Search learners or reports..." : "Search cohorts, learners, reviews..."}
    >
      {renderActiveView()}
    </FacilitatorLayout>
  );
}
export default FacilitatorRouterPage;
