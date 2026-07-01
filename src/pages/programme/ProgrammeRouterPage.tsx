import { useEffect } from "react";
import { useRoute } from "../../context/RouteContext";
import { ProgrammeLayout } from "../../components/layout/ProgrammeLayout";

// Import Views
import { ProgrammeDashboard } from "./ProgrammeDashboard";
import { ProgrammeLearners } from "./ProgrammeLearners";
import { ProgrammeCohorts } from "./ProgrammeCohorts";
import { ProgrammeReports } from "./ProgrammeReports";
import { ProgrammeCertificates } from "./ProgrammeCertificates";
import { ProgrammeSupport } from "./ProgrammeSupport";
import { ProgrammeSettings } from "./ProgrammeSettings";

export function ProgrammeRouterPage() {
  const { currentPath } = useRoute();

  // Auto-scroll to top on path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Switch router based on path segments
  const renderActiveView = () => {
    if (currentPath === "/programme" || currentPath === "/programme/dashboard") {
      return <ProgrammeDashboard />;
    }

    if (currentPath.startsWith("/programme/learners")) {
      return <ProgrammeLearners />;
    }

    if (currentPath.startsWith("/programme/cohorts")) {
      return <ProgrammeCohorts />;
    }

    if (currentPath.startsWith("/programme/reports")) {
      return <ProgrammeReports />;
    }

    if (currentPath.startsWith("/programme/certificates")) {
      return <ProgrammeCertificates />;
    }

    if (currentPath.startsWith("/programme/support")) {
      return <ProgrammeSupport />;
    }

    if (currentPath.startsWith("/programme/settings")) {
      return <ProgrammeSettings />;
    }

    // Default fallback to dashboard
    return <ProgrammeDashboard />;
  };

  const getHeaderTitle = () => {
    if (currentPath.startsWith("/programme/learners")) {
      return "Learner Management";
    }
    if (currentPath.startsWith("/programme/cohorts")) {
      return "Active Delivery Cohorts";
    }
    if (currentPath.startsWith("/programme/reports")) {
      return "Gender-Disaggregated Analytics";
    }
    if (currentPath.startsWith("/programme/certificates")) {
      return "Certificate Review Queue";
    }
    if (currentPath.startsWith("/programme/support")) {
      return "Oversight Support Desk";
    }
    if (currentPath.startsWith("/programme/settings")) {
      return "Programme Settings";
    }
    return "National Delivery Overview";
  };

  return (
    <ProgrammeLayout
      headerTitle={getHeaderTitle()}
      searchPlaceholder="Search learners, cohorts, pathways, certificates..."
    >
      {renderActiveView()}
    </ProgrammeLayout>
  );
}

export default ProgrammeRouterPage;
