import { LearnerDetailView } from "./LearnerDetailView";
import { useRoute, RoutePath } from "../../../context/RouteContext";
import { FacilitatorLearner } from "../../../data/mockFacilitator";

interface LearnersViewProps {
  selectedLearnerId: string | null;
  onSelectLearner: (id: string | null) => void;
  onSelectSubmission: (id: string) => void;
  learners: FacilitatorLearner[];
  onUpdateLearners: (updated: FacilitatorLearner[]) => void;
}

export function LearnersView({ 
  selectedLearnerId, 
  onSelectLearner, 
  onSelectSubmission,
  learners,
  onUpdateLearners
}: LearnersViewProps) {
  const { navigateTo } = useRoute();

  // Aisha Mohammed ID or custom selected ID
  const activeLearnerId = selectedLearnerId || "LRN-2026-88291";

  return (
    <LearnerDetailView 
      learnerId={activeLearnerId} 
      onBack={() => {
        if (selectedLearnerId) {
          onSelectLearner(null);
        } else {
          navigateTo("/facilitator/dashboard" as RoutePath);
        }
      }} 
    />
  );
}
export default LearnersView;
