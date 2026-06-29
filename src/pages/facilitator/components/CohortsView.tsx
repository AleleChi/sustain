import { useState, useMemo } from "react";
import { useRoute, RoutePath } from "../../../context/RouteContext";
import { 
  mockFacilitatorCohorts, 
  mockFacilitatorLearners, 
  mockAssessmentSubmissions, 
  mockFacilitatorSessions, 
  mockFacilitatorDiscussions,
  FacilitatorCohort,
  FacilitatorLearner,
  AssessmentSubmission
} from "../../../data/mockFacilitator";
import { 
  Layers, 
  Users, 
  ClipboardCheck, 
  Calendar, 
  ArrowLeft, 
  ChevronRight, 
  BookOpen, 
  BookOpenCheck,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Mail,
  AlertTriangle,
  Send,
  MoreVertical,
  CheckSquare,
  Square,
  MapPin,
  ExternalLink,
  Plus,
  ArrowRight,
  Info,
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  Check,
  Zap
} from "lucide-react";
import { FacilitatorMobileActionMenu, ActionItem } from "../../../components/facilitator/FacilitatorMobileActionMenu";

interface CohortsViewProps {
  selectedCohortId: string | null;
  onSelectCohort: (id: string | null) => void;
  onSelectLearner: (id: string) => void;
  onSelectSubmission: (id: string) => void;
  learners: FacilitatorLearner[];
  submissions: AssessmentSubmission[];
}

export function CohortsView({ 
  selectedCohortId, 
  onSelectCohort, 
  onSelectLearner,
  onSelectSubmission,
  learners,
  submissions
}: CohortsViewProps) {
  const { navigateTo, showToast } = useRoute();
  const [newNoteText, setNewNoteText] = useState("");
  const [localCohorts, setLocalCohorts] = useState<FacilitatorCohort[]>(mockFacilitatorCohorts);

  // Find currently selected cohort (default to kano-02 to always show Cohort Detail workspace on /facilitator/cohorts)
  const selectedCohort = localCohorts.find(
    c => c.id === selectedCohortId || c.id === "kano-02"
  );

  // ----------------------------------------------------
  // Interactive Local States for Filters & Sub-sections
  // ----------------------------------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const [lgaFilter, setLgaFilter] = useState("Tarauni");

  // Selected learner in the table. Default: Aisha Mohammed
  const [selectedQuickLearnerId, setSelectedQuickLearnerId] = useState("SUS-KN-002");

  // Checkboxes state for recommended support
  const [reminderChecked, setReminderChecked] = useState(false);
  const [guideChecked, setGuideChecked] = useState(false);
  const [packChecked, setPackChecked] = useState(false);

  // Accordion details toggle (on Mobile)
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(true);

  // Filter tab (on Mobile)
  const [mobileFilterTab, setMobileFilterTab] = useState("All");

  // Dynamic filter lists
  const defaultLearnersList = [
    {
      id: "SUS-KN-002",
      realId: "SUST-LRN-0442",
      name: "Aisha Mohammed",
      lga: "Kano / Tarauni",
      progress: 42,
      lastActive: "9 days ago",
      currentCourse: "Work Readiness",
      assessment: "Overdue",
      cpd: "22 / 35",
      risk: "Medium",
      avatar: "AM",
      goal: "Preparing for Interviews",
      cpdEarned: "22 / 35 Credits",
      certificate: "Not Eligible",
      mobileSubtitle: "High Risk: 14 days inactive"
    },
    {
      id: "SUS-KN-004",
      realId: "SUST-LRN-0443",
      name: "Musa Danladi",
      lga: "Kano / Tarauni",
      progress: 17,
      lastActive: "14 days ago",
      currentCourse: "Digital Basics",
      assessment: "Not Started",
      cpd: "5 / 35",
      risk: "High",
      avatar: "MD",
      goal: "Digital Skills Certification",
      cpdEarned: "5 / 35 Credits",
      certificate: "Not Eligible",
      mobileSubtitle: "On Track: Active today"
    },
    {
      id: "SUS-KN-007",
      realId: "SUST-LRN-0445",
      name: "Chigozie Ugwu",
      lga: "Kano / Tarauni",
      progress: 83,
      lastActive: "1 day ago",
      currentCourse: "Interview Prep",
      assessment: "Passed",
      cpd: "34 / 35",
      risk: "Low",
      avatar: "CU",
      goal: "Interview Competency",
      cpdEarned: "34 / 35 Credits",
      certificate: "Ready for Certificate",
      mobileSubtitle: "On Track: Active today"
    }
  ];

  // Selected quick learner object
  const selectedQuickLearnerObj = useMemo(() => {
    return defaultLearnersList.find(l => l.id === selectedQuickLearnerId) || defaultLearnersList[0];
  }, [selectedQuickLearnerId]);

  // Filtered learners in the table (Desktop only, for interactive filter demo)
  const filteredLearnersList = useMemo(() => {
    return defaultLearnersList.filter(l => {
      const matchSearch = searchQuery ? (
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) : true;

      const matchRisk = riskFilter !== "All" ? l.risk === riskFilter : true;
      const matchCourse = courseFilter !== "All" ? l.currentCourse.toLowerCase().includes(courseFilter.toLowerCase()) : true;
      const matchLga = lgaFilter ? l.lga.toLowerCase().includes(lgaFilter.toLowerCase()) : true;

      return matchSearch && matchRisk && matchCourse && matchLga;
    });
  }, [searchQuery, riskFilter, courseFilter, lgaFilter]);

  // Mobile learner items based on horizontal filter tabs
  const filteredMobileLearners = useMemo(() => {
    return defaultLearnersList.filter(l => {
      const matchSearch = searchQuery ? l.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      if (mobileFilterTab === "At Risk") {
        return matchSearch && (l.risk === "High" || l.risk === "Medium");
      }
      if (mobileFilterTab === "Completed") {
        return matchSearch && l.progress > 80;
      }
      return matchSearch;
    });
  }, [mobileFilterTab, searchQuery]);

  // Interaction handlers with explicit required toasts
  const handleViewLearners = () => {
    showToast("Learner list opened in this frontend prototype.");
    const element = document.getElementById("find-learners-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExport = () => {
    showToast("Export simulated in this frontend prototype.");
  };

  const handleOpenFollowUpQueue = () => {
    navigateTo("/facilitator/follow-up-queue" as RoutePath);
  };

  const handleViewAtRisk = () => {
    showToast("At-risk learner list simulated in this frontend prototype.");
    setRiskFilter("High");
  };

  const handleExportFiltered = () => {
    showToast("Filtered export simulated in this frontend prototype.");
  };

  const handleApplyFilters = () => {
    showToast("Filters applied in this frontend prototype.");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setRiskFilter("All");
    setCourseFilter("All");
    setLgaFilter("Tarauni");
    showToast("Filters reset successfully.");
  };

  const handleMessageLearner = () => {
    showToast("Message action simulated in this frontend prototype.");
  };

  const handleOpenProfile = (realId: string) => {
    navigateTo(`/facilitator/learners/${realId}` as RoutePath);
  };

  const handleFullReport = () => {
    navigateTo("/facilitator/reports" as RoutePath);
  };

  const handleSendAlert = () => {
    showToast("Alert action simulated in this frontend prototype.");
  };

  const handlePlanSession = () => {
    showToast("Session planning simulated in this frontend prototype.");
  };

  const handleSyncDocs = () => {
    showToast("Document sync simulated in this frontend prototype.");
  };

  const handleUpdateInfo = () => {
    showToast("Update action simulated in this frontend prototype.");
  };

  const handleSendAssessmentReminder = () => {
    showToast("Assessment reminder simulated in this frontend prototype.");
  };

  const handleSupportLearnersNow = () => {
    showToast("Support action simulated in this frontend prototype.");
  };

  // Helper to scroll smoothly to a mobile section ID
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const mobileActions: ActionItem[] = [
    {
      label: "View learners",
      icon: Users,
      onClick: () => scrollToId("mobile-learner-list")
    },
    {
      label: "Export cohort",
      icon: Download,
      onClick: handleExport
    },
    {
      label: "Apply filters",
      icon: SlidersHorizontal,
      onClick: () => scrollToId("mobile-find-learners")
    },
    {
      label: "Assign follow-up",
      icon: ArrowRight,
      onClick: () => scrollToId("mobile-quick-detail")
    },
    {
      label: "Notify offline sync groups",
      icon: WifiOff,
      onClick: () => {
        scrollToId("mobile-offline-support");
        showToast("Notification sent to offline sync groups.");
      }
    },
    {
      label: "View support tickets",
      icon: FileText,
      onClick: () => scrollToId("mobile-support-tickets")
    },
    {
      label: "Send assessment reminder",
      icon: Bell,
      onClick: handleSendAssessmentReminder
    },
    {
      label: "Support learners now",
      icon: Zap,
      onClick: handleSupportLearnersNow
    }
  ];

  // Always render the high-fidelity detailed workspace for Kano Youth Employability Cohort 02
  if (selectedCohort) {
    return (
      <div className="space-y-6 bg-slate-55 pb-10 text-left">
        
        {/* ====================================================
            DESKTOP VIEW: Visible on Large screens (lg:block)
            ==================================================== */}
        <div className="hidden lg:block space-y-6">
          
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between pb-2">
            <button 
              onClick={() => {
                navigateTo("/facilitator/dashboard" as RoutePath);
              }}
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-900 text-xs font-bold transition-colors cursor-pointer focus-ring rounded-lg px-2 py-1"
              id="cohort-back-btn"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-wider">
              <span>COHORT ID: {selectedCohort.id.toUpperCase()}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-semibold uppercase">Active Delivery</span>
            </div>
          </div>

          {/* SECTION 1: COHORT HERO & STATUS SUMMARY CARDS */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Big Hero Card */}
            <div className="col-span-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-2xs flex flex-col justify-between">
              <div>
                {/* Cohort tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100/70 px-2.5 py-1 rounded-md tracking-wide uppercase">
                    SUSTAIN CPD Programme
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-md tracking-wide uppercase">
                    Youth Employability
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-md tracking-wide uppercase">
                    Kano Youth Skills Hub
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-md tracking-wide uppercase">
                    Kano / Tarauni
                  </span>
                </div>

                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                  Kano Youth Employability Cohort 02
                </h1>
                
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-3xl mb-6">
                  Monitor learner progress, assessment status, CPD credits, certificate readiness, and follow-up actions for this cohort.
                </p>
              </div>

              {/* Header actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleViewLearners}
                  className="px-6 py-3 rounded-xl shadow-2xs hover:shadow-xs cursor-pointer text-xs font-bold bg-[#006644] text-white hover:bg-emerald-850 transition-all duration-200 flex items-center gap-2 focus-ring"
                >
                  <Users className="h-4 w-4 shrink-0" />
                  <span>View Learners Needing Support</span>
                </button>
                <button
                  onClick={handleExport}
                  className="px-6 py-3 rounded-xl shadow-2xs cursor-pointer text-xs font-bold bg-white text-[#006644] border border-[#006644] hover:bg-emerald-50 transition-all duration-200 flex items-center gap-2 focus-ring"
                >
                  <Download className="h-4 w-4 shrink-0" />
                  <span>Export Cohort Summary</span>
                </button>
              </div>
            </div>

            {/* Right Status Card - Soft Blue Treatment */}
            <div className="col-span-4 bg-[#f0f6fc] border border-blue-100 rounded-2xl p-6 shadow-2xs flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  COHORT STATUS
                </h3>
                
                {/* 2x2 grid stats */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold tracking-wider uppercase mb-0.5">Enrolled</span>
                    <span className="text-slate-900 font-black text-2xl">510</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold tracking-wider uppercase mb-0.5">Active</span>
                    <span className="text-emerald-700 font-black text-2xl">386</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold tracking-wider uppercase mb-0.5">At-Risk</span>
                    <span className="text-rose-600 font-black text-2xl">18</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold tracking-wider uppercase mb-0.5">Completion</span>
                    <span className="text-slate-900 font-black text-2xl">58%</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-blue-200/50">
                <button
                  onClick={handleOpenFollowUpQueue}
                  className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#006644] border border-slate-200 rounded-xl cursor-pointer text-xs font-bold transition-all duration-200 focus-ring"
                >
                  Open Follow-Up Queue
                </button>
              </div>
            </div>

          </div>

          {/* SECTION 2: SIX COHORT METRIC CARDS - Responsive columns, hover effects, contextual icons */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Enrolled Learners", count: "510", icon: Users, color: "text-slate-900", iconColor: "text-slate-400" },
              { label: "Active Learners", count: "386", icon: Users, color: "text-[#006644]", iconColor: "text-[#006644]" },
              { label: "Average Progress", count: "58%", icon: TrendingUp, color: "text-emerald-800", iconColor: "text-emerald-600" },
              { label: "At-Risk Learners", count: "18", icon: AlertTriangle, color: "text-rose-600", iconColor: "text-rose-500" },
              { label: "Assessment Due", count: "42", icon: ClipboardCheck, color: "text-slate-900", iconColor: "text-slate-500" },
              { label: "Certificate Ready", count: "64", icon: CheckCircle2, color: "text-[#006644]", iconColor: "text-[#006644]" }
            ].map((card, index) => {
              const IconComp = card.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs text-left flex items-center justify-between transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 group cursor-pointer"
                  onClick={() => showToast(`Filtered by ${card.label}`)}
                >
                  <div className="space-y-1">
                    <span className="text-slate-400 block text-[10px] font-bold tracking-wider uppercase leading-snug">{card.label}</span>
                    <span className={`${card.color} font-black text-xl`}>{card.count}</span>
                  </div>
                  <IconComp className={`h-5 w-5 ${card.iconColor} opacity-40 group-hover:opacity-90 transition-opacity shrink-0 ml-2`} />
                </div>
              );
            })}
          </div>

          {/* SECTION 3: COHORT DETAILS / DELIVERY DETAILS / COHORT HEALTH */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Cohort Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between min-h-[340px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
                  <Info className="h-4.5 w-4.5 text-emerald-800" />
                  <span>Cohort Details</span>
                </h3>
                
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Name</span>
                    <span className="text-slate-800 font-extrabold">Kano Cohort 02</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Programme</span>
                    <span className="text-slate-800 font-extrabold">SUSTAIN CPD</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Pathway</span>
                    <span className="text-slate-800 font-extrabold">Youth Pathway</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Hub</span>
                    <span className="text-slate-800 font-extrabold">Skills Hub</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Location</span>
                    <span className="text-slate-800 font-extrabold">Kano/Tarauni</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-medium">Status</span>
                    <span className="text-[#006644] font-black uppercase text-[10px] tracking-wide">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-center">
                <button
                  onClick={() => showToast("Cohort notes opened in this frontend prototype.")}
                  className="text-emerald-850 hover:text-emerald-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:underline"
                >
                  <span>Edit Cohort Notes</span>
                  <span className="text-[10px]">✏️</span>
                </button>
              </div>
            </div>

            {/* 2. Delivery Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between min-h-[340px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
                  <Calendar className="h-4.5 w-4.5 text-emerald-800" />
                  <span>Delivery Details</span>
                </h3>
                
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Lead</span>
                    <span className="text-slate-800 font-extrabold">Halima Sani</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Start</span>
                    <span className="text-slate-800 font-extrabold">March 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">End</span>
                    <span className="text-slate-850 font-extrabold">July 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Format</span>
                    <span className="text-slate-800 font-extrabold">Blended</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Current</span>
                    <span className="text-slate-800 font-extrabold">Work Readiness</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-medium">Next Task</span>
                    <span className="text-slate-800 font-extrabold">Assignment</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-center">
                <button
                  onClick={() => showToast("Cohort schedule opened in this frontend prototype.")}
                  className="text-emerald-850 hover:text-emerald-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:underline"
                >
                  <span>View Cohort Schedule</span>
                  <span className="text-[10px]">↗</span>
                </button>
              </div>
            </div>

            {/* 3. Cohort Health */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between min-h-[340px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
                  <TrendingUp className="h-4.5 w-4.5 text-emerald-800" />
                  <span>Cohort Health</span>
                </h3>
                
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Inactive (7d+)</span>
                    <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">46</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Overdue</span>
                    <span className="text-slate-800 font-extrabold">42</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Support Req</span>
                    <span className="text-slate-800 font-extrabold">32</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Open Tickets</span>
                    <span className="text-slate-800 font-extrabold">9</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-medium">Follow-ups</span>
                    <span className="text-slate-800 font-extrabold">18</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-center">
                <button
                  onClick={() => showToast("Cohort health profile export simulated in this frontend prototype.")}
                  className="text-emerald-850 hover:text-emerald-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:underline"
                >
                  <span>Export Profile</span>
                  <span className="text-[10px]">📥</span>
                </button>
              </div>
            </div>

          </div>

          {/* SECTION 4: FIND LEARNERS FILTER PANEL */}
          <div id="find-learners-section" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                Find Learners
              </h3>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleViewAtRisk}
                  className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  View At-Risk Learners
                </button>
                <button
                  onClick={handleExportFiltered}
                  className="bg-[#edf4fc] hover:bg-blue-100 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> Export Filtered List
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="text-slate-400 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">SEARCH</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, ID, or phone..."
                    className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#006644] focus:ring-1 focus:ring-[#006644] transition-all text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">RISK LEVEL</label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#006644] focus:ring-1 focus:ring-[#006644] transition-all text-slate-800 font-medium"
                >
                  <option value="All">All Risk Levels</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">COURSE STATUS</label>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#006644] focus:ring-1 focus:ring-[#006644] transition-all text-slate-800 font-medium"
                >
                  <option value="All">All Courses</option>
                  <option value="Work Readiness">Work Readiness</option>
                  <option value="Digital Basics">Digital Basics</option>
                  <option value="Interview Prep">Interview Prep</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 text-[10px] font-bold uppercase tracking-wider">LGA</label>
                <select
                  value={lgaFilter}
                  onChange={(e) => setLgaFilter(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-[#006644] focus:ring-1 focus:ring-[#006644] transition-all text-slate-800 font-medium"
                >
                  <option value="Tarauni">Tarauni</option>
                  <option value="Ungogo">Ungogo</option>
                </select>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
              <button
                onClick={handleResetFilters}
                className="text-[#006644] hover:text-emerald-950 text-xs font-bold transition-all cursor-pointer hover:underline"
              >
                Reset Filters
              </button>
              
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-[#006644] hover:bg-emerald-800 text-white rounded-lg cursor-pointer text-xs font-bold transition-all"
              >
                Apply Filters
              </button>
            </div>
          </div>
                 {/* SECTION 5: LEARNER TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/65 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="py-4 px-6">LEARNER</th>
                  <th className="py-4 px-4">STATE/LGA</th>
                  <th className="py-4 px-4 w-44">PROGRESS</th>
                  <th className="py-4 px-4">LAST ACTIVE</th>
                  <th className="py-4 px-4">CURRENT COURSE</th>
                  <th className="py-4 px-4">ASSESSMENT</th>
                  <th className="py-4 px-4">CPD</th>
                  <th className="py-4 px-4">RISK</th>
                  <th className="py-4 px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filteredLearnersList.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-slate-400 font-bold">
                      No learners match the current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLearnersList.map((l) => {
                    const isSelected = l.id === selectedQuickLearnerId;
                    return (
                      <tr 
                        key={l.id}
                        onClick={() => setSelectedQuickLearnerId(l.id)}
                        className={`interactive-row focus-ring focus-within:bg-slate-50/50 group cursor-pointer transition-colors duration-150 ${
                          isSelected ? "bg-emerald-50/30 border-l-4 border-[#006644]" : "hover:bg-slate-50/40"
                        }`}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setSelectedQuickLearnerId(l.id)}
                      >
                        {/* Learner Initials + Name + ID */}
                        <td className="py-3.5 px-6 flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                            isSelected ? "bg-[#006644] text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}>
                            {l.avatar}
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-extrabold text-slate-900 block group-hover:text-[#006644] transition-colors">{l.name}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">ID: {l.id}</span>
                          </div>
                        </td>

                        {/* State/LGA */}
                        <td className="py-3.5 px-4 text-slate-500 font-medium">{l.lga}</td>

                        {/* Progress Bar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-[#006644] h-full rounded-full"
                                style={{ width: `${l.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-500 font-extrabold">{l.progress}%</span>
                          </div>
                        </td>

                        {/* Last Active */}
                        <td className="py-3.5 px-4 text-slate-500 font-medium">{l.lastActive}</td>

                        {/* Current Course */}
                        <td className="py-3.5 px-4 text-slate-900 font-bold">{l.currentCourse}</td>

                        {/* Assessment Status Badge */}
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            l.assessment === "Passed" 
                              ? "bg-emerald-50 text-[#006644] border border-emerald-100" 
                              : l.assessment === "Overdue"
                              ? "bg-rose-50 text-rose-700 border border-rose-100"
                              : "bg-slate-50 text-slate-500 border border-slate-200/50"
                          }`}>
                            {l.assessment}
                          </span>
                        </td>

                        {/* CPD credits */}
                        <td className="py-3.5 px-4 text-slate-600 font-extrabold">{l.cpd}</td>

                        {/* Risk Badge */}
                        <td className="py-3.5 px-4">
                          <span className={`text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            l.risk === "High" 
                              ? "bg-rose-100 text-rose-800" 
                              : l.risk === "Medium"
                              ? "bg-amber-100 text-amber-850"
                              : "bg-emerald-100 text-emerald-900"
                          }`}>
                            {l.risk}
                          </span>
                        </td>

                        {/* Action Menu */}
                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Actions menu opened for ${l.name}`);
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* SECTION 6: SELECTED LEARNER QUICK VIEW - Styled with soft pale blue panel background */}
          <div className="bg-[#f0f6fc] border border-blue-100 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-blue-950 tracking-tight flex items-center gap-2">
              <span>Selected Learner Quick View:</span>
              <span className="text-[#006644] font-extrabold underline decoration-emerald-200 decoration-2">{selectedQuickLearnerObj.name}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Internal Card 1: Learner Summary */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs text-left space-y-3.5 text-xs transition-shadow duration-200 hover:shadow-xs">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                  Learner Summary
                </h4>
                
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">ID</span>
                    <span className="text-slate-900 font-bold font-mono">{selectedQuickLearnerObj.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">Location</span>
                    <span className="text-slate-900 font-bold">{selectedQuickLearnerObj.lga}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">Progress</span>
                    <span className="text-slate-950 font-black">{selectedQuickLearnerObj.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">Inactive</span>
                    <span className="text-rose-600 font-bold">{selectedQuickLearnerObj.lastActive.includes("days") ? selectedQuickLearnerObj.lastActive.replace(" ago", "") : "0 Days"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-455 font-medium">Risk Level</span>
                    <span className={`font-black px-2 py-0.5 rounded uppercase text-[9px] tracking-wider ${
                      selectedQuickLearnerObj.risk === "High" ? "bg-rose-50 text-rose-700" : selectedQuickLearnerObj.risk === "Medium" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-[#006644]"
                    }`}>{selectedQuickLearnerObj.risk}</span>
                  </div>
                </div>
              </div>

              {/* Internal Card 2: Course Status */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs text-left space-y-3.5 text-xs transition-shadow duration-200 hover:shadow-xs">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                  Course Status
                </h4>
                
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">Current</span>
                    <span className="text-slate-900 font-extrabold">{selectedQuickLearnerObj.currentCourse}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">Goal</span>
                    <span className="text-slate-900 font-extrabold">{selectedQuickLearnerObj.goal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-455 font-medium">Assessment</span>
                    <span className={`font-black ${selectedQuickLearnerObj.assessment === "Overdue" ? "text-rose-600" : selectedQuickLearnerObj.assessment === "Passed" ? "text-[#006644]" : "text-slate-500"}`}>
                      {selectedQuickLearnerObj.assessment}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">CPD Earned</span>
                    <span className="text-slate-900 font-extrabold">{selectedQuickLearnerObj.cpdEarned}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-450 font-medium">Certificate</span>
                    <span className="text-slate-600 font-extrabold">{selectedQuickLearnerObj.certificate}</span>
                  </div>
                </div>
              </div>

              {/* Internal Card 3: Recommended Support & Actions */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs text-left flex flex-col justify-between transition-shadow duration-200 hover:shadow-xs">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                    Recommended Support
                  </h4>
                  
                  <div className="space-y-2.5 text-xs font-semibold">
                    <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={reminderChecked}
                        onChange={(e) => setReminderChecked(e.target.checked)}
                        className="mt-0.5 rounded text-[#006644] focus:ring-[#006644]" 
                      />
                      <span>Send assessment reminder</span>
                    </label>
                    
                    <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={guideChecked}
                        onChange={(e) => setGuideChecked(e.target.checked)}
                        className="mt-0.5 rounded text-[#006644] focus:ring-[#006644]" 
                      />
                      <span>Attach work-readiness guide</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer text-slate-600 hover:text-slate-900 select-none">
                      <input 
                        type="checkbox" 
                        checked={packChecked}
                        onChange={(e) => setPackChecked(e.target.checked)}
                        className="mt-0.5 rounded text-[#006644] focus:ring-[#006644]" 
                      />
                      <span>Send low-bandwidth lesson pack</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-4">
                  <button
                    onClick={handleMessageLearner}
                    className="flex-1 text-[11px] font-bold py-2 bg-[#006644] hover:bg-emerald-850 text-white rounded-lg cursor-pointer text-center transition-colors focus-ring"
                  >
                    Message Learner
                  </button>
                  <button
                    onClick={() => handleOpenProfile(selectedQuickLearnerObj.realId)}
                    className="flex-1 text-[11px] font-bold py-2 bg-white text-[#006644] border border-[#006644] hover:bg-emerald-50 rounded-lg cursor-pointer text-center transition-colors focus-ring"
                  >
                    Open Profile
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 7: COHORT PROGRESS OVERVIEW & COMPLETION MILESTONE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Progress Overview Card */}
            <div className="col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-black text-slate-900 tracking-tight">
                  Cohort Progress Overview
                </h3>
                <button
                  onClick={handleFullReport}
                  className="text-[#006644] hover:text-emerald-950 text-xs font-bold flex items-center gap-1 cursor-pointer hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Full Report</span>
                </button>
              </div>

              {/* Progress bars list */}
              <div className="space-y-4 text-xs font-semibold text-slate-700">
                
                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5">
                    <span className="font-bold">On Track</span>
                    <span className="text-[#006644] font-black">310 learners (60%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#006644] h-full rounded-full transition-all duration-300" style={{ width: "60%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5">
                    <span className="font-bold">Monitor</span>
                    <span className="text-amber-700 font-black">142 learners (28%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-300" style={{ width: "28%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5">
                    <span className="font-bold">Support Needed</span>
                    <span className="text-orange-700 font-black">40 learners (8%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full transition-all duration-300" style={{ width: "8%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5">
                    <span className="font-bold">Follow-Up Needed</span>
                    <span className="text-rose-700 font-black">18 learners (4%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-rose-600 h-full rounded-full transition-all duration-300" style={{ width: "4%" }} />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Milestone Card */}
            <div className="col-span-4 bg-[#006644] text-white rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black bg-emerald-800/80 text-emerald-100 border border-emerald-700/60 px-2.5 py-1 rounded uppercase tracking-wider block w-fit mb-4">
                  COMPLETION MILESTONE
                </span>
                
                <h4 className="text-lg font-black tracking-tight leading-snug mb-3">
                  1,240 assessments completed across all modules since March.
                </h4>
              </div>

              <div>
                <button
                  onClick={handleViewAtRisk}
                  className="w-full bg-white text-[#006644] hover:bg-emerald-50 text-xs font-bold py-2.5 rounded-xl shadow-2xs transition-all duration-200 cursor-pointer text-center"
                >
                  Open At-Risk Segment
                </button>
              </div>
            </div>

          </div>

          {/* SECTION 8: COURSE PROGRESS BREAKDOWN TABLE */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Course Progress Breakdown
              </h3>
              <button
                onClick={handleExport}
                className="bg-white hover:bg-slate-50 text-[#006644] border border-slate-200 text-xs font-bold px-4 py-1.5 rounded-lg shadow-2xs transition-all duration-200 cursor-pointer"
              >
                Export CSV
              </button>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="py-3 px-4">COURSE NAME</th>
                  <th className="py-3 px-4 text-center">COMPLETED</th>
                  <th className="py-3 px-4 text-center">IN PROGRESS</th>
                  <th className="py-3 px-4 text-center">NOT STARTED</th>
                  <th className="py-3 px-4 text-right">AVG. PROGRESS</th>
                  <th className="py-3 px-4 text-right">PASS RATE</th>
                  <th className="py-3 px-4 text-right w-16">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                <tr className="hover:bg-slate-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Digital Readiness Basics</td>
                  <td className="py-3.5 px-4 text-center">482</td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-medium">18</td>
                  <td className="py-3.5 px-4 text-center text-slate-400 font-medium">10</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800">94%</td>
                  <td className="py-3.5 px-4 text-right font-black text-[#006644]">98%</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={handleExport} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 cursor-pointer">
                      <FileText className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Communication Skills</td>
                  <td className="py-3.5 px-4 text-center">410</td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-medium">82</td>
                  <td className="py-3.5 px-4 text-center text-slate-400 font-medium">18</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800">82%</td>
                  <td className="py-3.5 px-4 text-right font-black text-[#006644]">92%</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={handleExport} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 cursor-pointer">
                      <FileText className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">Work Readiness Foundation</td>
                  <td className="py-3.5 px-4 text-center">264</td>
                  <td className="py-3.5 px-4 text-center text-slate-500 font-medium">210</td>
                  <td className="py-3.5 px-4 text-center text-slate-400 font-medium">36</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-800">52%</td>
                  <td className="py-3.5 px-4 text-right font-black text-amber-700">84%</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={handleExport} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 cursor-pointer">
                      <FileText className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECTION 9: AT-RISK LEARNER SEGMENTS */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">
              At-Risk Learner Segments
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Card 1: Inactive */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between text-left space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inactive (14d+)</span>
                    <span className="bg-rose-50 border border-rose-100 text-rose-700 font-black px-1.5 py-0.5 rounded text-xs">12</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2.5">
                    Highest risk for dropping out of the programme.
                  </p>
                </div>
                <button
                  onClick={handleSendAlert}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Send Alert
                </button>
              </div>

              {/* Card 2: Overdue Tasks */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between text-left space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overdue Tasks</span>
                    <span className="bg-amber-50 border border-amber-100 text-amber-700 font-black px-1.5 py-0.5 rounded text-xs">42</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2.5">
                    Learners with failed deadline in last 7 days.
                  </p>
                </div>
                <button
                  onClick={handleViewAtRisk}
                  className="w-full bg-white hover:bg-slate-55 text-[#006644] border border-[#006644] text-[10px] font-bold py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  View List
                </button>
              </div>

              {/* Card 3: Low Progress */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between text-left space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Low Progress</span>
                    <span className="bg-amber-50 border border-amber-100 text-amber-700 font-black px-1.5 py-0.5 rounded text-xs">28</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2.5">
                    Significantly below cohort average speed.
                  </p>
                </div>
                <button
                  onClick={handlePlanSession}
                  className="w-full bg-[#006644] hover:bg-emerald-850 text-white text-[10px] font-bold py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Plan Session
                </button>
              </div>

              {/* Card 4: Low Bandwidth */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between text-left space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Low Bandwidth</span>
                    <span className="bg-blue-50 border border-blue-100 text-blue-700 font-black px-1.5 py-0.5 rounded text-xs">112</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2.5">
                    Experiencing technical/access barriers.
                  </p>
                </div>
                <button
                  onClick={handleSyncDocs}
                  className="w-full bg-white hover:bg-slate-55 text-slate-700 border border-slate-200 text-[10px] font-bold py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Sync Docs
                </button>
              </div>

              {/* Card 5: Unclear Req */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between text-left space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Unclear Req.</span>
                    <span className="bg-slate-50 border border-slate-250 text-slate-700 font-black px-1.5 py-0.5 rounded text-xs">08</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-2.5">
                    Learners with incomplete onboarding info.
                  </p>
                </div>
                <button
                  onClick={handleUpdateInfo}
                  className="w-full bg-white hover:bg-slate-55 text-slate-700 border border-slate-200 text-[10px] font-bold py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Update Info
                </button>
              </div>

            </div>
          </div>

          {/* SECTION 10: FINAL ACTION RECOMMENDED CTA */}
          <div className="bg-[#f0f6fc] border border-blue-100 rounded-2xl p-6.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between text-left gap-4">
            <div className="flex items-start gap-4 max-w-4xl">
              <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center font-bold text-emerald-800 text-lg">
                🚀
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-blue-950 tracking-tight">
                  Action Recommended: Support Learners With Due Assessments
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                  160 learners have upcoming assessments for the Work Readiness module. Proactive intervention now can increase the cohort pass rate by an estimated 15%.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleSendAssessmentReminder}
                className="bg-[#006644] hover:bg-emerald-850 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Send Assessment Reminder
              </button>
              <button
                onClick={handleViewAtRisk}
                className="bg-white hover:bg-slate-50 text-[#006644] border border-[#006644] text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                View At-Risk Learners
              </button>
            </div>
          </div>

        </div>

        {/* ====================================================
            MOBILE VIEW: Visible on Mobile / Tablet (lg:hidden)
            ==================================================== */}
        <div className="lg:hidden space-y-4 pb-28 w-full max-w-full overflow-x-hidden box-border">
          
          {/* MOBILE TOP BAR */}
          <div className="bg-white border-b border-slate-100 px-4 py-3 -mx-4 -mt-6 flex items-center justify-between sticky top-0 z-40">
            <button 
              onClick={() => {
                navigateTo("/facilitator/dashboard" as RoutePath);
              }}
              className="p-1 text-slate-700 hover:text-slate-900 cursor-pointer"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">Cohort Detail</h2>
            
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => showToast("You have no new notifications.")}
                className="p-1 text-slate-400 hover:text-slate-600 relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full" />
              </button>
              <div className="h-6 w-6 rounded-full bg-emerald-800 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                HS
              </div>
            </div>
          </div>

          {/* MOBILE HERO CARD */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 text-left space-y-3.5">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                AGRIBUSINESS GROWTH PROGRAM
              </span>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                Kano Youth Employability Cohort 02
              </h1>
              <p className="text-[10px] text-slate-400 font-bold tracking-wide mt-1 leading-snug">
                Pathway: Digital Ag-Logistics | Kano State / Ungogo LGA
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleViewLearners}
                className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white text-[11px] font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Users className="h-3.5 w-3.5" /> View Learners
              </button>
              
              <button
                onClick={handleExport}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-[11px] font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> Export
              </button>
            </div>
          </div>

          {/* STATUS PILL */}
          <div className="bg-emerald-900 text-white rounded-lg px-4 py-2 flex items-center justify-between text-xs font-bold shadow-2xs">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <span>Status: Active Delivery</span>
            </div>
            <span className="bg-emerald-800 text-white text-[9.5px] font-bold px-2 py-0.5 rounded uppercase">
              Week 6 of 12
            </span>
          </div>

          {/* MOBILE METRIC CARDS (2-column grid) */}
          <div className="grid grid-cols-2 gap-3">
            
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-left shadow-2xs">
              <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">Enrolled</span>
              <span className="text-slate-900 font-black text-lg">124</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-left shadow-2xs">
              <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">Active</span>
              <span className="text-slate-900 font-black text-lg">118</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-left shadow-2xs">
              <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">Avg Progress</span>
              <span className="text-emerald-800 font-black text-lg">64%</span>
            </div>

            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-left shadow-2xs">
              <span className="text-rose-600 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">At-Risk</span>
              <span className="text-rose-700 font-black text-lg">12</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 text-left shadow-2xs">
              <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">Assessments Due</span>
              <span className="text-slate-900 font-black text-lg">38</span>
            </div>

            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-left shadow-2xs">
              <span className="text-amber-700 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">Cert. Ready</span>
              <span className="text-amber-800 font-black text-lg">8</span>
            </div>

          </div>

          {/* COHORT DETAILS ACCORDION/CARD */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <button
              onClick={() => setMobileDetailsOpen(!mobileDetailsOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-slate-50/50 cursor-pointer text-left select-none"
            >
              <span>Cohort Details</span>
              {mobileDetailsOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
            </button>
            
            {mobileDetailsOpen && (
              <div className="px-4 pb-4.5 border-t border-slate-100 pt-3 space-y-3.5 text-xs text-left">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Organisation</span>
                  <span className="text-slate-900 font-bold">Kano State Min. Ag.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Start Date</span>
                  <span className="text-slate-900 font-bold">Jan 12, 2024</span>
                </div>
              </div>
            )}
          </div>

          {/* COHORT HEALTH CARD */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-left space-y-2.5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Cohort Health
            </h3>
            
            {/* Segmented bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2 rounded-full overflow-hidden flex">
                <div className="bg-emerald-600 h-full w-[65%]" />
                <div className="bg-amber-500 h-full w-[25%]" />
                <div className="bg-rose-600 h-full w-[10%]" />
              </div>
              <div className="flex items-center justify-between text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1 text-emerald-800"><span className="h-1.5 w-1.5 bg-emerald-600 rounded-full" /> On Track</span>
                <span className="flex items-center gap-1 text-amber-600"><span className="h-1.5 w-1.5 bg-amber-500 rounded-full" /> Lagging</span>
                <span className="flex items-center gap-1 text-rose-600"><span className="h-1.5 w-1.5 bg-rose-600 rounded-full" /> Critical</span>
              </div>
            </div>
          </div>

          {/* FIND LEARNERS COMPACT SEARCH/FILTER */}
          <div id="mobile-find-learners" className="space-y-2 text-left scroll-mt-16">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find learners..."
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs bg-white text-slate-700 font-medium"
              />
            </div>

            {/* Horizontal pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
              <button
                onClick={() => setMobileFilterTab("All")}
                className={`text-[10px] font-bold px-4 py-1.5 rounded-full shrink-0 border transition-all ${
                  mobileFilterTab === "All" 
                    ? "bg-emerald-900 border-emerald-900 text-white" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                All (124)
              </button>
              
              <button
                onClick={() => setMobileFilterTab("At Risk")}
                className={`text-[10px] font-bold px-4 py-1.5 rounded-full shrink-0 border transition-all ${
                  mobileFilterTab === "At Risk" 
                    ? "bg-emerald-900 border-emerald-900 text-white" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                At Risk
              </button>

              <button
                onClick={() => setMobileFilterTab("Completed")}
                className={`text-[10px] font-bold px-4 py-1.5 rounded-full shrink-0 border transition-all ${
                  mobileFilterTab === "Completed" 
                    ? "bg-emerald-900 border-emerald-900 text-white" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* LEARNER LIST */}
          <div id="mobile-learner-list" className="space-y-2 text-left scroll-mt-16">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              Learner List
            </span>
            
            {filteredMobileLearners.length === 0 ? (
              <p className="text-xs text-slate-400 font-bold text-center py-4">No matching learners found.</p>
            ) : (
              filteredMobileLearners.map((ml) => {
                const isSelected = ml.id === selectedQuickLearnerId;
                
                // For Chigozie and Zainab in the mobile screenshots, they are shown as compact lagging/completing rows!
                if (ml.id === "SUS-KN-007") {
                  return (
                    <div 
                      key={ml.id}
                      onClick={() => setSelectedQuickLearnerId(ml.id)}
                      className={`bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs cursor-pointer ${
                        isSelected ? "border-emerald-800 bg-emerald-50/10" : ""
                      }`}
                    >
                      <span className="font-bold text-slate-900">{ml.name}</span>
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[9px] tracking-wide uppercase">
                        Lagging
                      </span>
                    </div>
                  );
                }

                // Custom Zainab row to complete the list visual match
                return (
                  <div 
                    key={ml.id}
                    onClick={() => setSelectedQuickLearnerId(ml.id)}
                    className={`bg-white border border-slate-200 rounded-xl p-4 cursor-pointer relative ${
                      isSelected ? "border-emerald-800 border-l-4" : ml.risk === "High" ? "border-l-4 border-l-rose-600" : "border-l-4 border-l-emerald-600"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {ml.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">{ml.name}</h4>
                          <span className={`text-[9.5px] font-semibold ${ml.risk === "High" ? "text-rose-600" : "text-emerald-700"}`}>
                            {ml.mobileSubtitle}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Actions menu opened for ${ml.name}`);
                        }}
                        className="p-1 hover:bg-slate-50 rounded text-slate-400 cursor-pointer"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3.5 flex items-center justify-between text-[11px] font-medium border-t border-slate-50 pt-2 text-slate-500">
                      <span>Progress</span>
                      <div className="flex items-center gap-2 w-1/2">
                        <div className="flex-1 bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-850 h-full" style={{ width: `${ml.progress}%` }} />
                        </div>
                        <span className="text-slate-900 font-bold">{ml.progress}%</span>
                      </div>
                      
                      <button 
                        onClick={() => setSelectedQuickLearnerId(ml.id)}
                        className="text-emerald-850 hover:text-emerald-950 p-1 cursor-pointer"
                        aria-label="View details"
                      >
                        <ExternalLink className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {/* Render a custom completed/completing student row Zainab Bello if search query matches or is empty */}
            {(!searchQuery || "zainab bello".includes(searchQuery.toLowerCase())) && (
              <div 
                onClick={() => showToast("Zainab Bello detail loaded in this prototype.")}
                className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs cursor-pointer"
              >
                <span className="font-bold text-slate-900">Zainab Bello</span>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[9px] tracking-wide uppercase">
                  Completing
                </span>
              </div>
            )}

          </div>

          {/* QUICK DETAIL: AISHA MOHAMMED */}
          <div id="mobile-quick-detail" className="bg-[#f0f9f6] border border-emerald-250/50 rounded-xl p-4.5 text-left space-y-3 shadow-2xs scroll-mt-16">
            <span className="text-[10px] font-bold text-emerald-850 uppercase tracking-wider block">
              QUICK DETAIL: {selectedQuickLearnerObj.name.toUpperCase()}
            </span>

            <div className="bg-white border border-slate-150 rounded-lg p-4 space-y-2 text-xs">
              <span className="text-slate-400 block text-[10px] font-bold tracking-wider uppercase">Recommended Support</span>
              <p className="text-slate-800 font-bold leading-relaxed">
                {selectedQuickLearnerObj.id === "SUS-KN-002" 
                  ? 'Direct WhatsApp Outreach: Ask about “Module 4: Ag-Logistics” blockage.' 
                  : `Review and verify assessment requirements with ${selectedQuickLearnerObj.name} directly.`}
              </p>
            </div>

            <button
              onClick={() => showToast("Follow-up outreach requested successfully.")}
              className="w-full bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer text-center"
            >
              Assign Follow-up
            </button>
          </div>

          {/* COURSE PROGRESS */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-left space-y-3 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Course Progress
            </h3>

            <div className="space-y-3.5 text-xs font-medium">
              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Digital Readiness Basics</span>
                  <span className="font-bold text-emerald-800">94% Pass Rate</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-800 h-full w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>Agribusiness Fundamentals</span>
                  <span className="font-bold text-amber-700">68% Pass Rate</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[68%]" />
                </div>
              </div>
            </div>
          </div>

          {/* ASSESSMENT STATUS */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-left space-y-3.5 shadow-2xs text-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Assessment Status
            </h3>

            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Passed</span>
                <span className="text-emerald-700 font-extrabold text-sm">482</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Failed (Requires Retake)</span>
                <span className="text-rose-600 font-extrabold text-sm">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Overdue</span>
                <span className="text-amber-600 font-extrabold text-sm">18</span>
              </div>
            </div>
          </div>

          {/* PRIORITY ACTIONS */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-left space-y-3 shadow-2xs text-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Priority Actions
            </h3>

            <div className="space-y-3">
              <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-black text-rose-800 text-[11px] uppercase tracking-wider">Inactive &gt; 7 Days</h4>
                  <span className="text-[10px] text-slate-500 font-semibold block">8 Learners identified</span>
                </div>
                <button
                  onClick={handleSupportLearnersNow}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold px-4 py-1.5 rounded"
                >
                  Support All
                </button>
              </div>

              <div className="bg-amber-50/40 border border-amber-100 rounded-lg p-3 flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-black text-amber-800 text-[11px] uppercase tracking-wider">Low Assessment Score</h4>
                  <span className="text-[10px] text-slate-500 font-semibold block">4 Learners identified</span>
                </div>
                <button
                  onClick={() => showToast("Review assignment assigned successfully.")}
                  className="bg-amber-700 hover:bg-amber-850 text-white text-[10px] font-bold px-4 py-1.5 rounded"
                >
                  Assign Review
                </button>
              </div>
            </div>
          </div>

          {/* OFFLINE LEARNING SUPPORT */}
          <div id="mobile-offline-support" className="bg-blue-50/40 border border-blue-100 rounded-xl p-4.5 text-left space-y-3 shadow-2xs text-xs scroll-mt-16">
            <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
              <WifiOff className="h-4 w-4 text-blue-600" /> Offline Learning Support
            </h3>
            
            <p className="text-slate-600 font-medium leading-relaxed">
              32 learners are primarily using offline content syncing. Ensure they have accessed recent updates.
            </p>

            <button
              onClick={() => showToast("Notification sent to offline sync groups.")}
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer text-center"
            >
              Notify Offline Sync Groups
            </button>
          </div>

          {/* OPEN SUPPORT TICKETS */}
          <div id="mobile-support-tickets" className="bg-white border border-slate-200 rounded-xl p-4 text-left space-y-3 shadow-2xs text-xs scroll-mt-16">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Open Support Tickets
            </h3>

            <div className="bg-slate-50 border border-slate-150 rounded-lg p-3.5 space-y-1">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Ticket #4092 • Tech Issue</span>
              <p className="text-slate-800 font-bold leading-tight">Unable to upload certification proof</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-wide">
                  Status: In Review
                </span>
              </div>
            </div>
          </div>

          {/* FINAL PRIORITY ACTION CTA (DEEP EMERALD) */}
          <div className="bg-emerald-900 text-white rounded-xl p-6 text-center space-y-4 shadow-sm">
            <div className="h-10 w-10 mx-auto rounded-full bg-emerald-800/80 border border-emerald-700 flex items-center justify-center text-lg font-bold">
              !
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-black tracking-tight">Final Priority Action</h3>
              <p className="text-emerald-100 text-xs leading-relaxed font-medium">
                Focus on support for the 18 learners with overdue “Logistics Basics” assessments before Friday.
              </p>
            </div>

            <button
              onClick={handleSupportLearnersNow}
              className="w-full bg-white text-emerald-950 hover:bg-slate-50 text-xs font-bold py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Support Learners Now
            </button>
          </div>

          {/* Spacer for bottom navigation */}
          <div className="h-12" />

        </div>

        {/* REUSABLE MOBILE FLOATING ACTION MENU */}
        <FacilitatorMobileActionMenu actions={mobileActions} />

      </div>
    );
  }

  // ====================================================
  // GENERAL COHORTS LIST VIEW (My Cohorts registry grid)
  // ====================================================
  return (
    <div className="space-y-6">
      <div className="text-left space-y-1.5">
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
          Training Registries
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
          Assigned Cohorts
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Monitor completion status and review learner records for your delivery teams.
        </p>
      </div>

      {/* Cohort Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localCohorts.map((cohort) => (
          <div 
            key={cohort.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-emerald-800/40 hover:shadow-sm transition-all duration-300 flex flex-col justify-between text-left h-fit"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-semibold text-emerald-850 uppercase tracking-wider bg-emerald-50 border border-emerald-100/55 px-2 py-0.5 rounded block w-fit">
                  {cohort.pathway}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {cohort.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">
                  {cohort.programme}
                </span>
              </div>

              {/* Progress visual bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-550">
                  <span>Programme Completion</span>
                  <span>{cohort.completionStatus}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/40">
                  <div 
                    className="bg-emerald-800 h-full rounded-full" 
                    style={{ width: `${cohort.completionStatus}%` }} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Active Students</span>
                  <span className="text-slate-800 font-bold flex items-center gap-1 mt-0.5">
                    <Users className="h-3.5 w-3.5 text-slate-400" /> {cohort.learnerCount}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Pending Grades</span>
                  <span className={`font-bold flex items-center gap-1 mt-0.5 ${cohort.pendingReviews > 0 ? "text-amber-600" : "text-slate-800"}`}>
                    <ClipboardCheck className="h-3.5 w-3.5" /> {cohort.pendingReviews}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col gap-2">
              <button 
                onClick={() => onSelectCohort(cohort.id === "kano-02" ? "kano-youth-employability-cohort-02" : cohort.id)}
                className="w-full text-center bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold py-2.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
              >
                View Cohort Details
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigateTo("/facilitator/learners" as RoutePath);
                  }}
                  className="flex-1 text-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                >
                  View Learners
                </button>
                <button 
                  onClick={() => {
                    navigateTo("/facilitator/assessments" as RoutePath);
                  }}
                  className="flex-1 text-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Assessments
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
