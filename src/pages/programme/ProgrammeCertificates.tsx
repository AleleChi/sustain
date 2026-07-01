import { useState, useEffect, useMemo } from "react";
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  Search, 
  Filter, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  X, 
  FileSpreadsheet, 
  RefreshCw, 
  Check,
  ChevronLeft,
  ArrowRight,
  HelpCircle,
  Briefcase
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { nigeriaStates, getLGAsByState } from "../../data/nigeriaLocations";

// Type definitions matching the SUSTAIN LMS certificate readiness design rules
interface CertificateReviewItem {
  id: string; // e.g. SUST-LRN-0091
  learnerName: string;
  learnerId: string;
  pathway: string;
  cohort: string;
  submittedAt: string;
  cpdCreditsEarned: number;
  facilitatorNotes: string;
  status: "Ready for review" | "Under review" | "Certificate issued" | "Needs facilitator action" | "Not eligible yet";
  documents: { title: string; size: string }[];
  state: string;
  lga: string;
  gender: "Female" | "Male" | "Other";
  cpdComplete: boolean;
  assessmentReviewed: boolean;
  attendanceConfirmed: boolean;
  programmeApproved: boolean;
  certificateTitle: string;
  certificateId?: string;
  facilitatorName: string;
}

// Extensive and professional seed dataset (6 detailed records)
const INITIAL_CERTIFICATE_REVIEWS: CertificateReviewItem[] = [
  {
    id: "SUST-LRN-0091",
    learnerName: "Amina Bello",
    learnerId: "SUST-LRN-0091",
    pathway: "Youth Employability Pathway",
    cohort: "Kano Youth Employability Cohort 02",
    submittedAt: "28 Jun 2026",
    cpdCreditsEarned: 35,
    facilitatorNotes: "Learner completed required activities and is ready for programme review. Halima Sani confirmed learner readiness.",
    status: "Ready for review",
    documents: [
      { title: "Kano_Readiness_Log_AminaBello.pdf", size: "1.2 MB" }
    ],
    state: "Kano",
    lga: "Kano Municipal",
    gender: "Female",
    cpdComplete: true,
    assessmentReviewed: true,
    attendanceConfirmed: true,
    programmeApproved: false,
    certificateTitle: "Work Readiness Certificate",
    facilitatorName: "Halima Sani"
  },
  {
    id: "SUST-LRN-0811",
    learnerName: "Chioma Egwu",
    learnerId: "SUST-LRN-0811",
    pathway: "Youth Employability Pathway",
    cohort: "Enugu Work Readiness 03",
    submittedAt: "29 Jun 2026",
    cpdCreditsEarned: 35,
    facilitatorNotes: "All CPD credit targets achieved. Formative evaluation records confirm standard competence levels for program graduation.",
    status: "Ready for review",
    documents: [
      { title: "Enugu_Readiness_Checklist_Egwu.pdf", size: "980 KB" }
    ],
    state: "Enugu",
    lga: "Enugu North",
    gender: "Female",
    cpdComplete: true,
    assessmentReviewed: true,
    attendanceConfirmed: true,
    programmeApproved: false,
    certificateTitle: "Work Readiness Certificate",
    facilitatorName: "Chidi Nze"
  },
  {
    id: "SUST-LRN-0312",
    learnerName: "Babajide Alao",
    learnerId: "SUST-LRN-0312",
    pathway: "Youth Employability Pathway",
    cohort: "Oyo Employability Training 01",
    submittedAt: "30 Jun 2026",
    cpdCreditsEarned: 35,
    facilitatorNotes: "Excellent participation in all practical exercises. Recommended for immediate programme team review.",
    status: "Ready for review",
    documents: [
      { title: "Oyo_Evidence_Alao.pdf", size: "1.1 MB" }
    ],
    state: "Oyo",
    lga: "Ibadan North",
    gender: "Male",
    cpdComplete: true,
    assessmentReviewed: true,
    attendanceConfirmed: true,
    programmeApproved: false,
    certificateTitle: "Work Readiness Certificate",
    facilitatorName: "Grace Alabi"
  },
  {
    id: "SUST-LRN-0428",
    learnerName: "Chinedu Okafor",
    learnerId: "SUST-LRN-0428",
    pathway: "Work Readiness Foundation",
    cohort: "Lagos Work Readiness 01",
    submittedAt: "25 Jun 2026",
    cpdCreditsEarned: 32,
    facilitatorNotes: "Completed core lectures. Needs facilitator confirmation update for the final assessment review.",
    status: "Needs facilitator action",
    documents: [],
    state: "Lagos",
    lga: "Alimosho",
    gender: "Male",
    cpdComplete: true,
    assessmentReviewed: false,
    attendanceConfirmed: true,
    programmeApproved: false,
    certificateTitle: "Work Readiness Certificate",
    facilitatorName: "Adewale Okoye"
  },
  {
    id: "SUST-LRN-0542",
    learnerName: "Fatima Umar",
    learnerId: "SUST-LRN-0542",
    pathway: "Youth Employability Pathway",
    cohort: "Kaduna Youth Employability 01",
    submittedAt: "24 Jun 2026",
    cpdCreditsEarned: 35,
    facilitatorNotes: "Coursework completed via offline packages. Awaiting final local review to approve public verification readiness.",
    status: "Under review",
    documents: [
      { title: "Kaduna_CPD_Log_FatimaUmar.pdf", size: "1.4 MB" }
    ],
    state: "Kaduna",
    lga: "Kaduna North",
    gender: "Female",
    cpdComplete: true,
    assessmentReviewed: true,
    attendanceConfirmed: true,
    programmeApproved: false,
    certificateTitle: "Work Readiness Certificate",
    facilitatorName: "Ibrahim Musa"
  },
  {
    id: "SUST-LRN-0715",
    learnerName: "Yusuf Ibrahim",
    learnerId: "SUST-LRN-0715",
    pathway: "Youth Employability Pathway",
    cohort: "Kano Youth Employability Cohort 02",
    submittedAt: "22 Jun 2026",
    cpdCreditsEarned: 35,
    facilitatorNotes: "Completed all credit requirements, assessment, and attendance checks. Confirmed for certificate issue.",
    status: "Certificate issued",
    documents: [],
    state: "Kano",
    lga: "Kano Municipal",
    gender: "Male",
    cpdComplete: true,
    assessmentReviewed: true,
    attendanceConfirmed: true,
    programmeApproved: true,
    certificateTitle: "Work Readiness Certificate",
    certificateId: "SUST-CERT-2026-0140",
    facilitatorName: "Halima Sani"
  }
];

export function ProgrammeCertificates() {
  const { showToast, navigateTo } = useRoute();
  
  // Data list and active selection state
  const [reviews, setReviews] = useState<CertificateReviewItem[]>(INITIAL_CERTIFICATE_REVIEWS);
  const [activeReview, setActiveReview] = useState<CertificateReviewItem | null>(INITIAL_CERTIFICATE_REVIEWS[0]);
  
  // Custom Viewport check to handle full-screen sheet on mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Separation of mobile sheets and modals
  const [mobileReviewOpen, setMobileReviewOpen] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showBulkIssueModal, setShowBulkIssueModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showLearnerRecordModal, setShowLearnerRecordModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFilter, setExportFilter] = useState("All certificate records");
  const [exportType, setExportType] = useState("CSV");
  const [exportSuccess, setExportSuccess] = useState(false);

  useEffect(() => {
    setExportSuccess(false);
  }, [showExportModal]);
  
  // Search and filter parameters
  const [searchQuery, setSearchQuery] = useState("");
  const [pathwayFilter, setPathwayFilter] = useState("All pathways");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [stateFilter, setStateFilter] = useState("All states");
  const [lgaFilter, setLgaFilter] = useState("All LGAs");
  const [showFilters, setShowFilters] = useState(false);
  
  // Reset LGA filter when state filter changes
  useEffect(() => {
    setLgaFilter("All LGAs");
  }, [stateFilter]);
  
  // Bulk selection tracking state
  const [selectedReadyIds, setSelectedReadyIds] = useState<string[]>([]);
  
  // Modal auxiliary state
  const [followUpReason, setFollowUpReason] = useState("Assessment note needed");
  const [followUpMessage, setFollowUpMessage] = useState("");
  const [isIssuingInProgress, setIsIssuingInProgress] = useState(false);
  const [issueSuccessState, setIssueSuccessState] = useState(false);
  const [followUpSuccessState, setFollowUpSuccessState] = useState(false);

  // Auto-reset success states when modal toggled or active review changes
  useEffect(() => {
    setIssueSuccessState(false);
  }, [showIssueModal, activeReview]);

  useEffect(() => {
    setFollowUpSuccessState(false);
  }, [showFollowUpModal, activeReview]);

  // Dynamic pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 104; // Set to mimic 312 records (3 per page)

  // Sync state filters
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, pathwayFilter, statusFilter, stateFilter, lgaFilter]);

  // Filters application on local seed data
  const filteredReviews = useMemo(() => {
    return reviews.filter(item => {
      const matchesSearch = searchQuery.trim() === "" ||
        item.learnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.learnerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cohort.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.certificateId && item.certificateId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPathway = pathwayFilter === "All pathways" || item.pathway === pathwayFilter;
      const matchesStatus = statusFilter === "All statuses" || item.status === statusFilter;
      const matchesState = stateFilter === "All states" || item.state === stateFilter;
      const matchesLga = lgaFilter === "All LGAs" || item.lga === lgaFilter;

      return matchesSearch && matchesPathway && matchesStatus && matchesState && matchesLga;
    });
  }, [reviews, searchQuery, pathwayFilter, statusFilter, stateFilter, lgaFilter]);

  // To simulate 312 records dynamically, we render our local filtered reviews
  // repeating/cycling based on current page if no strict filters are active
  const paginatedReviews = useMemo(() => {
    if (searchQuery || pathwayFilter !== "All pathways" || statusFilter !== "All statuses" || stateFilter !== "All states" || lgaFilter !== "All LGAs") {
      // If filtering, display just the matching local records paginated
      const start = (currentPage - 1) * 3;
      return filteredReviews.slice(start, start + 3);
    } else {
      // If not filtering, cycle through our mock data to make page 1, 2, etc. feel distinct and dynamic
      const items = [...reviews];
      // Shuffle slightly based on page index to show different entries
      const startIdx = ((currentPage - 1) * 3) % items.length;
      const result: CertificateReviewItem[] = [];
      for (let i = 0; i < 3; i++) {
        const item = items[(startIdx + i) % items.length];
        // Create a unique temporary id and copy so checkboxes work properly on paginated items
        result.push({
          ...item,
          id: `${item.id}-p${currentPage}-${i}`
        });
      }
      return result;
    }
  }, [reviews, filteredReviews, currentPage, searchQuery, pathwayFilter, statusFilter, stateFilter, lgaFilter]);

  const activePageStart = (currentPage - 1) * 3 + 1;
  const activePageEnd = Math.min(currentPage * 3, searchQuery || pathwayFilter !== "All pathways" || statusFilter !== "All statuses" || stateFilter !== "All states" || lgaFilter !== "All LGAs" ? filteredReviews.length : 312);

  // Clear selections when changing filters or page
  useEffect(() => {
    setSelectedReadyIds([]);
  }, [currentPage, searchQuery, pathwayFilter, statusFilter, stateFilter]);

  // Styling helper for status chips (Premium sentence-case)
  const getStatusChipStyle = (status: CertificateReviewItem["status"]) => {
    switch (status) {
      case "Ready for review":
        return "bg-amber-50 text-amber-800 border-amber-200/50";
      case "Under review":
        return "bg-slate-50 text-slate-700 border-slate-200/60";
      case "Certificate issued":
        return "bg-emerald-50 text-[#005C45] border-emerald-100";
      case "Needs facilitator action":
        return "bg-rose-50 text-rose-800 border-rose-150";
      default:
        return "bg-slate-50 text-slate-500 border-slate-150";
    }
  };

  const getReadinessChip = (label: string, isConfirmed: boolean, missingLabel?: string) => {
    if (isConfirmed) {
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full px-3 py-1 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span>{label}</span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-100 rounded-full px-3 py-1 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 animate-pulse" />
          <span>{missingLabel || "Needs action"}</span>
        </span>
      );
    }
  };

  // Selection trigger
  const selectReviewItem = (item: CertificateReviewItem) => {
    // strip out temporary page prefixes if present
    const originalId = item.id.split("-p")[0];
    const originalItem = reviews.find(r => r.id === originalId) || item;
    
    // Ensure we keep the state bound correctly
    setActiveReview({
      ...originalItem,
      id: item.id // Keep the current ID for rendering state consistency
    });
    setMobileReviewOpen(true);
  };

  // Checkbox toggle logic (Ready for review only)
  const toggleSelectReady = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedReadyIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAllReadyOnPage = () => {
    const readyOnly = paginatedReviews.filter(r => r.status === "Ready for review");
    const allSelected = readyOnly.every(r => selectedReadyIds.includes(r.id));
    
    if (allSelected) {
      setSelectedReadyIds(prev => prev.filter(id => !readyOnly.map(r => r.id).includes(id)));
    } else {
      const newIds = readyOnly.map(r => r.id).filter(id => !selectedReadyIds.includes(id));
      setSelectedReadyIds(prev => [...prev, ...newIds]);
    }
  };

  // "Review Ready Learners" action: selects first "Ready for review" item
  const handleReviewFirstReady = () => {
    const firstReady = reviews.find(r => r.status === "Ready for review");
    if (firstReady) {
      setActiveReview(firstReady);
      setMobileReviewOpen(true);
      showToast(`Selected ${firstReady.learnerName} for review.`);
    } else {
      showToast("No records currently ready for review.");
    }
  };

  const handleExportReport = () => {
    setShowExportModal(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setPathwayFilter("All pathways");
    setStatusFilter("All statuses");
    setStateFilter("All states");
    setLgaFilter("All LGAs");
    setCurrentPage(1);
    setSelectedReadyIds([]);
    showToast("Filters reset successfully");
  };

  // Issue Action execution
  const executeIssueCertificate = () => {
    if (!activeReview) return;
    setIsIssuingInProgress(true);
    
    setTimeout(() => {
      const generatedId = "SUST-CERT-2026-0148";
      const originalId = activeReview.id.split("-p")[0];
      
      // Update core data source
      setReviews(prev => prev.map(r => {
        if (r.id === originalId) {
          return {
            ...r,
            status: "Certificate issued",
            certificateId: generatedId,
            programmeApproved: true
          };
        }
        return r;
      }));

      // Update selected item detail view state
      setActiveReview(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: "Certificate issued",
          certificateId: generatedId,
          programmeApproved: true
        };
      });

      setIsIssuingInProgress(false);
      setIssueSuccessState(true);
      showToast(`Certificate marked as issued. ID: ${generatedId}`);
    }, 600);
  };

  // Bulk Issue action execution
  const executeBulkIssue = () => {
    setIsIssuingInProgress(true);
    
    setTimeout(() => {
      // Map all selected local IDs back to their core IDs and mark them as issued
      const coreIdsToUpdate = selectedReadyIds.map(id => id.split("-p")[0]);
      
      setReviews(prev => prev.map(r => {
        if (coreIdsToUpdate.includes(r.id)) {
          return {
            ...r,
            status: "Certificate issued",
            certificateId: `SUST-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            programmeApproved: true
          };
        }
        return r;
      }));

      setSelectedReadyIds([]);
      setIsIssuingInProgress(false);
      setShowBulkIssueModal(false);
      showToast("Certificates marked as issued in this prototype.");
    }, 800);
  };

  // Follow-up request execution
  const executeSendFollowUp = () => {
    if (!activeReview) return;
    const originalId = activeReview.id.split("-p")[0];
    
    const updAssessment = followUpReason !== "Assessment note needed";
    const updAttendance = followUpReason !== "Attendance confirmation needed";
    const updCPD = followUpReason !== "CPD evidence needs review";

    // Update status in local database to show Needs action
    setReviews(prev => prev.map(r => {
      if (r.id === originalId) {
        return {
          ...r,
          status: "Needs facilitator action",
          assessmentReviewed: updAssessment,
          attendanceConfirmed: updAttendance,
          cpdComplete: updCPD
        };
      }
      return r;
    }));

    // Update current detail
    setActiveReview(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: "Needs facilitator action",
        assessmentReviewed: updAssessment,
        attendanceConfirmed: updAttendance,
        cpdComplete: updCPD
      };
    });

    setFollowUpSuccessState(true);
    showToast("Follow-up request sent.");
  };

  return (
    <div className="space-y-6 text-left pb-24 font-sans bg-slate-50/40 p-1 sm:p-2">
      
      {/* 1. COMPACT HERO SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-3xs flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 text-left">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
              Certificate Review
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Review learners who have completed CPD, assessment, and attendance requirements before issuing certificates.
          </p>
          
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#005C45] text-xs font-semibold rounded-full border border-emerald-100">
              <Award className="h-3.5 w-3.5" />
              <span>SUSTAIN CPD Programme</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-100">
              <span>312 ready for review</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#005C45] text-xs font-semibold rounded-full border border-emerald-100">
              <span>532 certificates issued</span>
            </span>
          </div>
        </div>

        {/* Responsive CTAs */}
        <div className="flex flex-col sm:flex-row w-full xl:w-auto items-stretch sm:items-center gap-3 shrink-0">
          <button 
            onClick={() => setShowBulkIssueModal(true)}
            disabled={selectedReadyIds.length === 0}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold rounded-xl transition-all duration-150 cursor-pointer shadow-3xs focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              selectedReadyIds.length === 0 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                : "text-white bg-[#005C45] hover:bg-[#003B2C] active:scale-[0.98]"
            }`}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{selectedReadyIds.length > 0 ? `Issue ${selectedReadyIds.length} certificate${selectedReadyIds.length > 1 ? "s" : ""}` : "Issue selected certificates"}</span>
          </button>
          
          <button 
            onClick={handleExportReport}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] rounded-xl transition-all duration-150 cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-slate-400" />
            <span>Export Certificate Report</span>
          </button>

          <button 
            onClick={() => navigateTo("/verify-certificate")}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-[#005C45] bg-emerald-50 hover:bg-emerald-100 active:scale-[0.98] rounded-xl transition-all duration-150 cursor-pointer"
          >
            <span>Open Public Verification</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY STRIP (Compact Cards, Soft Borders) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-3xs text-left flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-slate-400">Ready for review</p>
            <p className="text-lg font-extrabold text-slate-900 font-heading">312</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-3xs text-left flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-slate-400">Bulk issue eligible</p>
            <p className="text-lg font-extrabold text-slate-900 font-heading">286</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-3xs text-left flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <Search className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-slate-400">Under review</p>
            <p className="text-lg font-extrabold text-slate-900 font-heading">148</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-3xs text-left flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-[#005C45] rounded-xl shrink-0">
            <Award className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-slate-400">Certificates issued</p>
            <p className="text-lg font-extrabold text-slate-900 font-heading">532</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-3xs text-left flex items-center gap-3">
          <div className="p-2.5 bg-rose-50/80 text-rose-800 rounded-xl shrink-0">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-slate-400">Needs facilitator action</p>
            <p className="text-lg font-extrabold text-slate-900 font-heading">76</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-3xs text-left flex items-center gap-3">
          <div className="p-2.5 bg-slate-50 text-slate-500 rounded-xl shrink-0">
            <User className="h-4 w-4" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-slate-400">Not eligible yet</p>
            <p className="text-lg font-extrabold text-slate-900 font-heading">2,104</p>
          </div>
        </div>
      </div>

      {/* 3. FILTER PANEL */}
      <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-3xs space-y-4 text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 font-heading">Find certificate records</h3>
            <p className="text-xs text-slate-400 mt-0.5">Filter by learner, cohort, pathway, and location.</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <Filter className="h-4 w-4 text-slate-500" />
              <span>{showFilters ? "Hide Filters" : "Filters"}</span>
              {(pathwayFilter !== "All pathways" || statusFilter !== "All statuses" || stateFilter !== "All states" || lgaFilter !== "All LGAs") && (
                <span className="w-2 h-2 rounded-full bg-[#005C45]" />
              )}
            </button>

            {(searchQuery || pathwayFilter !== "All pathways" || statusFilter !== "All statuses" || stateFilter !== "All states" || lgaFilter !== "All LGAs") && (
              <button 
                onClick={handleResetFilters}
                className="px-3 py-2.5 text-xs font-bold text-rose-600 hover:text-rose-750 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search learner name, ID, or certificate ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#005C45] focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-3 border-t border-slate-100 animate-in slide-in-from-top-3 duration-200">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pathway</label>
              <select
                value={pathwayFilter}
                onChange={(e) => setPathwayFilter(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#005C45] cursor-pointer"
              >
                <option value="All pathways">All pathways</option>
                <option value="Youth Employability Pathway">Youth Employability Pathway</option>
                <option value="Work Readiness Foundation">Work Readiness Foundation</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#005C45] cursor-pointer"
              >
                <option value="All statuses">All statuses</option>
                <option value="Ready for review">Ready for review</option>
                <option value="Under review">Under review</option>
                <option value="Needs facilitator action">Needs facilitator action</option>
                <option value="Certificate issued">Certificate issued</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">State</label>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#005C45] cursor-pointer"
              >
                <option value="All states">All states</option>
                {nigeriaStates.map((st) => (
                  <option key={st.slug} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">LGA</label>
              <select
                value={lgaFilter}
                onChange={(e) => setLgaFilter(e.target.value)}
                disabled={stateFilter === "All states"}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#005C45] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="All LGAs">All LGAs</option>
                {getLGAsByState(stateFilter).map((lga) => (
                  <option key={lga.slug} value={lga.name}>
                    {lga.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 4. WORKSPACE SPLIT LAYOUT (DESKTOP) OR SINGLE QUEUE CARDS (MOBILE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
        
        {/* LEFT COLUMN: REVIEW QUEUE (span 7 or 8 on desktop) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="bg-slate-50/50 rounded-2xl border border-slate-200/60 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-left">
              <h3 className="text-sm font-bold text-slate-850 font-heading">Review queue</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Showing {activePageStart}–{activePageEnd} of 312 certificate records
              </p>
            </div>

            {/* Bulk Selection Action Bar */}
            {!isMobile && (
              <div className="flex items-center gap-3">
                {selectedReadyIds.length === 0 ? (
                  <span className="text-xs text-slate-500 font-medium">
                    Select ready learners to issue certificates in bulk.
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-850 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {selectedReadyIds.length} ready learners selected
                  </span>
                )}

                {paginatedReviews.some(r => r.status === "Ready for review") && (
                  <button
                    onClick={toggleAllReadyOnPage}
                    className="text-xs font-bold text-[#005C45] hover:text-[#003B2C] flex items-center gap-2 px-3 py-1.5 hover:bg-emerald-50/50 rounded-lg transition-all border border-transparent hover:border-emerald-100 cursor-pointer"
                  >
                    <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                      paginatedReviews.filter(r => r.status === "Ready for review").every(r => selectedReadyIds.includes(r.id)) && paginatedReviews.filter(r => r.status === "Ready for review").length > 0
                        ? "bg-[#005C45] border-[#005C45] text-white"
                        : "border-slate-300 bg-white"
                    }`}>
                      {paginatedReviews.filter(r => r.status === "Ready for review").every(r => selectedReadyIds.includes(r.id)) && paginatedReviews.filter(r => r.status === "Ready for review").length > 0 && (
                        <Check className="h-3 w-3 stroke-[3px]" />
                      )}
                    </div>
                    <span>Select ready learners</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3.5">

            {paginatedReviews.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-4">
                <div className="w-11 h-11 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-100">
                  <User className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">No records found</p>
                  <p className="text-xs text-slate-400 max-w-[280px] mx-auto">Try resetting filters or narrowing down search criteria.</p>
                </div>
                <button 
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {paginatedReviews.map((rev) => {
                  const isActive = activeReview && activeReview.id.split("-p")[0] === rev.id.split("-p")[0];
                  const isSelected = selectedReadyIds.includes(rev.id);
                  const isReady = rev.status === "Ready for review";
                  
                  // Render different UI for mobile vs desktop for queue cards to prevent mobile crowding
                  if (isMobile) {
                    return (
                      <div 
                        key={rev.id}
                        className="p-5 flex flex-col gap-4 text-left border border-slate-200/60 rounded-2xl bg-white shadow-3xs"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-950 font-heading">{rev.learnerName}</h4>
                            <p className="text-xs text-slate-400 font-semibold">{rev.learnerId}</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusChipStyle(rev.status)}`}>
                            {rev.status}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600">
                          <p className="font-semibold text-slate-800">{rev.pathway}</p>
                          <p className="text-[11px] text-slate-500">{rev.cohort}</p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{rev.state} State · {rev.lga}</span>
                          </div>
                        </div>

                        {/* Mobile readiness summary using helper */}
                        <div className="bg-slate-50/80 rounded-2xl p-4 space-y-2 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Certificate Readiness
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {getReadinessChip("CPD", rev.cpdComplete, "CPD")}
                            {getReadinessChip("Assessment", rev.assessmentReviewed, "Assessment")}
                            {getReadinessChip("Attendance", rev.attendanceConfirmed, "Attendance")}
                          </div>
                        </div>

                        {/* Tap to open full screen sheet */}
                        <button
                          onClick={() => selectReviewItem(rev)}
                          className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                        >
                          <span>{isReady ? "Review certificate" : "Review record"}</span>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                    );
                  }

                  // Desktop premium visual presentation
                  return (
                    <div 
                      key={rev.id} 
                      onClick={() => selectReviewItem(rev)}
                      className={`p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer transition-all duration-150 rounded-2xl border ${
                        isActive 
                          ? "bg-emerald-50/15 border-emerald-500 shadow-xs" 
                          : "bg-white border-slate-200/60 hover:bg-slate-50/30 hover:border-slate-300 shadow-3xs"
                      }`}
                    >
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        {/* Selector checkbox for bulk issues (Ready for Review items only) */}
                        {isReady ? (
                          <div 
                            onClick={(e) => toggleSelectReady(rev.id, e)}
                            className="pt-1.5 shrink-0 cursor-pointer"
                          >
                            <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                              isSelected 
                                ? "bg-[#005C45] border-[#005C45] text-white" 
                                : "border-slate-300 bg-white hover:border-[#005C45]"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3px]" />}
                            </div>
                          </div>
                        ) : (
                          // Disabled placeholder for non-ready items to align everything nicely
                          <div className="w-4.5 h-4.5 pt-1.5 shrink-0" />
                        )}

                        <div className="space-y-1 text-left min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-950 font-heading">{rev.learnerName}</h4>
                            <span className="text-[11px] text-slate-400 font-semibold">({rev.learnerId})</span>
                            
                            {/* Status Badge */}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusChipStyle(rev.status)}`}>
                              {rev.status}
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-600 font-semibold">{rev.pathway}</p>
                          <p className="text-[11px] text-slate-400 font-semibold">{rev.cohort}</p>
                          
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold pt-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            <span>{rev.state} State · {rev.lga}</span>
                          </div>

                          {/* Soft readiness indicators using helper */}
                          <div className="flex flex-wrap gap-2 pt-2.5">
                            {getReadinessChip("CPD complete", rev.cpdComplete, "CPD pending")}
                            {getReadinessChip("Assessment reviewed", rev.assessmentReviewed, "Assessment note needed")}
                            {getReadinessChip("Attendance confirmed", rev.attendanceConfirmed, "Attendance unconfirmed")}
                          </div>
                        </div>
                      </div>

                      {/* Action trigger container */}
                      <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center w-full md:w-auto gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Submitted {rev.submittedAt}</span>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectReviewItem(rev);
                          }}
                          className={`w-full md:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-[0.98] cursor-pointer ${
                            isActive 
                              ? "bg-[#005C45] text-white hover:bg-[#003B2C]" 
                              : "bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-[#005C45] border border-slate-200"
                          }`}
                        >
                          <span>Review</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Mobile-Only Pagination Card */}
            {reviews.length > 0 && (
              <div className="block md:hidden w-full rounded-3xl bg-white border border-slate-200/70 shadow-sm p-4 mt-4 mb-6 max-w-full text-left">
                <div className="flex flex-col min-[390px]:flex-row min-[390px]:items-start justify-between gap-3 w-full">
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 leading-5">
                      Showing {activePageStart}–{activePageEnd} of 312 records
                    </p>
                    <p className="text-sm text-slate-500 leading-5">
                      Ready for certificate review
                    </p>
                  </div>

                  <div className="shrink-0 self-start">
                    <span className="inline-block text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 rounded-full px-3 py-1.5 whitespace-nowrap">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 w-full">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    aria-label="Previous certificate review page"
                    className={`min-h-[44px] rounded-2xl px-4 border border-slate-200 text-sm font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                      currentPage === 1 
                        ? "bg-slate-50 text-slate-400 opacity-70 cursor-not-allowed" 
                        : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50 active:scale-[0.99] cursor-pointer"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0" />
                    <span>Previous</span>
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    aria-label="Next certificate review page"
                    className={`min-h-[44px] rounded-2xl px-4 border border-slate-200 text-sm font-semibold flex items-center justify-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                      currentPage === totalPages 
                        ? "bg-slate-50 text-slate-400 opacity-70 cursor-not-allowed" 
                        : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50 active:scale-[0.99] cursor-pointer"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>
            )}

            {/* Desktop/Tablet Pagination */}
            {reviews.length > 0 && (
              <div className="hidden md:flex p-5 border-t border-slate-100 items-center justify-between bg-slate-50/50">
                <span className="text-xs text-slate-500 font-semibold">
                  Showing {activePageStart}–{activePageEnd} of 312 certificate records
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="h-3 w-3" />
                    <span>Previous</span>
                  </button>
                  <span className="text-xs text-slate-500 font-bold px-1.5">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Public Verification Note - Highly Polished Banner */}
          <div className="bg-emerald-50/40 rounded-3xl border border-emerald-100/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-[#005C45] tracking-wide uppercase font-heading">Public verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Issued certificates become searchable on the public verification page after programme approval.
              </p>
            </div>
            <button
              onClick={() => navigateTo("/verify-certificate")}
              className="px-4 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl shrink-0 transition-all shadow-3xs cursor-pointer text-center"
            >
              Open verification page
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL WORKFLOW (DESKTOP AND TABLET LANDSCAPE >=1280px) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
          {activeReview ? (
            activeReview.status === "Certificate issued" ? (
              <div className="bg-white border border-slate-200/70 rounded-3xl p-5 shadow-3xs space-y-6 sticky top-6 animate-in zoom-in-95 duration-150 text-left h-fit overflow-visible">
                {/* 1. Header with learner name, ID, status */}
                <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                  <div className="space-y-1 text-left">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-emerald-50 text-[#005C45] border-emerald-100">
                      Certificate issued
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 pt-1 leading-tight font-heading">
                      {activeReview.learnerName}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">
                      Learner ID: {activeReview.learnerId}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">
                      Public verification active
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveReview(null);
                    }}
                    className="p-1.5 bg-slate-105 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full cursor-pointer transition-all"
                    aria-label="Close certificate record"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* 2. Certificate status summary card */}
                <div className="rounded-3xl bg-emerald-50/60 border border-emerald-100 shadow-sm p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#005C45] font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>Certificate issued</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    This learner’s certificate has been issued and is available for public verification.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-emerald-100/40">
                    <div>
                      <span className="text-slate-500 block font-medium">Certificate ID</span>
                      <span className="font-semibold text-slate-900 font-mono">{activeReview.certificateId || "SUST-CERT-2026-0140"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-medium">Public verification</span>
                      <span className="font-semibold text-emerald-600">Active</span>
                    </div>
                  </div>
                </div>

                {/* 3. Learner summary section */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-850 font-heading">Learner summary</h4>
                  <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-sm space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">Pathway</span>
                      <span className="text-sm font-semibold text-slate-950 block">{activeReview.pathway}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">Cohort</span>
                      <span className="text-sm font-semibold text-slate-950 block">{activeReview.cohort}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">State and LGA</span>
                      <span className="text-sm font-semibold text-slate-950 block">{activeReview.state} State · {activeReview.lga}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">Facilitator</span>
                      <span className="text-sm font-semibold text-[#005C45] block">{activeReview.facilitatorName}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Certificate readiness section */}
                <div className="space-y-2">
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-850 font-heading">Certificate readiness</h4>
                    <p className="text-xs text-slate-400">Requirements confirmed before certificate issue.</p>
                  </div>
                  
                  <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-sm">
                    <div className="divide-y divide-slate-100">
                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">CPD credits complete</p>
                          <p className="text-xs text-slate-500">{activeReview.cpdCreditsEarned} of 35 credits</p>
                        </div>
                      </div>

                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">Assessment reviewed</p>
                          <p className="text-xs text-slate-500">Final assessment reviewed by facilitator</p>
                        </div>
                      </div>

                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">Attendance confirmed</p>
                          <p className="text-xs text-slate-500">Interview Practice Clinic attendance confirmed</p>
                        </div>
                      </div>

                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">Facilitator confirmation</p>
                          <p className="text-xs text-slate-500">{activeReview.facilitatorName} confirmed learner readiness</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3.5 rounded-2xl flex gap-3 items-start border bg-emerald-50 border-emerald-100 text-[#005C45] text-left">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                      <div>
                        <p className="font-semibold text-xs text-slate-800">Programme approval</p>
                        <p className="text-xs text-slate-600 font-medium">Completed before certificate issue</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Certificate record section */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-850 font-heading">Certificate record</h4>
                  <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Certificate title</span>
                      <span className="text-sm text-slate-900 font-semibold">{activeReview.certificateTitle}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Certificate ID</span>
                      <span className="text-sm text-slate-900 font-semibold font-mono">{activeReview.certificateId || "SUST-CERT-2026-0140"}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Issue status</span>
                      <span className="text-sm text-slate-900 font-semibold">Certificate issued</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Public verification</span>
                      <span className="text-sm text-emerald-600 font-semibold">Active</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs text-slate-500">Issue date</span>
                      <span className="text-sm text-slate-900 font-semibold">25 Oct 2026</span>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeReview.certificateId || "SUST-CERT-2026-0140");
                        showToast("Certificate ID copied.");
                      }}
                      className="w-full mt-2 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Copy certificate ID
                    </button>
                  </div>
                </div>

                {/* 6. Facilitator confirmation note */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-855 font-heading">Facilitator confirmation</h4>
                  <p className="text-xs text-slate-400">Readiness note from the assigned facilitator.</p>
                  <div className="rounded-2xl bg-blue-50/40 border border-blue-100 p-4 text-sm text-slate-700 leading-6 text-left">
                    {activeReview.facilitatorNotes.replace(/^["'\s]+|["'\s]+$/g, '').replace(/issuance/g, 'issue')}
                  </div>
                </div>

                {/* 7. Public verification action */}
                <div className="rounded-3xl bg-white border border-slate-200/70 shadow-sm p-5 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-850 font-heading">Public verification</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      This certificate can be verified using the public certificate verification page.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => navigateTo("/verify-certificate")}
                      className="py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer active:scale-95"
                    >
                      Open verification page
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/#verify-certificate?id=${activeReview.certificateId || 'SUST-CERT-2026-0140'}`);
                        showToast("Verification link copied.");
                      }}
                      className="py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all text-center cursor-pointer active:scale-95"
                    >
                      Copy verification link
                    </button>
                  </div>
                </div>

                {/* 8. Bottom action area / View learner record */}
                <div className="pt-3 border-t border-slate-100 bg-white">
                  <button
                    onClick={() => setShowLearnerRecordModal(true)}
                    className="w-full py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    View learner record
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-sm space-y-6 sticky top-6 animate-in zoom-in-95 duration-150 text-left h-fit overflow-visible">
                
                {/* 1. Sticky Header */}
                <div className="border-b border-slate-100 pb-5 flex justify-between items-start">
                  <div className="space-y-1.5 text-left">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-100">
                      Ready for review
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 pt-1 leading-tight font-heading">
                      Review certificate
                    </h3>
                    <p className="text-xs text-slate-500 font-medium font-sans">
                      {activeReview.learnerName} · {activeReview.learnerId}
                    </p>
                    <p className="text-[11px] text-[#005C45] font-semibold font-sans">
                      {activeReview.pathway}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveReview(null)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full cursor-pointer transition-all w-11 h-11 flex items-center justify-center shrink-0"
                    aria-label="Close certificate review"
                    title="Deselect"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* 2. Certificate readiness review summary card */}
                <div className="rounded-3xl bg-amber-50/50 border border-amber-100 shadow-sm p-5 space-y-3 text-left">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Certificate readiness review</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      This learner has completed the required learning steps and is awaiting programme approval.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-200/20">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      CPD complete
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Assessment reviewed
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Attendance confirmed
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Approval pending
                    </span>
                  </div>
                </div>

                {/* 3. Learner details compact card */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Learner details</h4>
                    <p className="text-xs text-slate-400 font-sans">Pathway, cohort, location, and facilitator for this review.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200/70 p-5 space-y-4 bg-white shadow-sm">
                    <div className="divide-y divide-slate-100">
                      <div className="py-2.5 text-left first:pt-0">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Learner</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.learnerName}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Learner ID</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.learnerId}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Pathway</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.pathway}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Cohort</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.cohort}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Location</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">
                          {activeReview.state} State · {activeReview.lga}
                        </span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Facilitator</span>
                        <span className="text-sm font-semibold text-[#005C45] block font-sans mt-0.5">{activeReview.facilitatorName}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100 flex justify-center">
                      <button
                        onClick={() => showToast("Learner profile view is prepared for this prototype.")}
                        className="text-xs font-semibold text-[#005C45] hover:text-[#004231] hover:underline cursor-pointer flex items-center gap-1.5 py-1"
                      >
                        <User className="h-3.5 w-3.5" />
                        View full learner profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Certificate readiness checklist */}
                <div className="space-y-3">
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Certificate readiness</h4>
                    <p className="text-xs text-slate-400">Requirements confirmed before certificate issue.</p>
                  </div>
                  
                  <div className="bg-white rounded-3xl border border-slate-200/70 p-5 shadow-sm space-y-1">
                    <div className="divide-y divide-slate-100">
                      {/* CPD credits complete */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">CPD credits complete</p>
                          <p className="text-xs text-slate-500 font-sans">{activeReview.cpdCreditsEarned} of 35 credits</p>
                        </div>
                      </div>

                      {/* Assessment reviewed */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          activeReview.assessmentReviewed ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        }`}>
                          {activeReview.assessmentReviewed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">Assessment reviewed</p>
                          <p className="text-xs text-slate-500 font-sans">
                            {activeReview.assessmentReviewed 
                              ? "Final assessment reviewed by facilitator" 
                              : "Assessment review note needed from facilitator"}
                          </p>
                        </div>
                      </div>

                      {/* Attendance confirmed */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">Attendance confirmed</p>
                          <p className="text-xs text-slate-500 font-sans font-medium">Interview Practice Clinic attendance confirmed</p>
                        </div>
                      </div>

                      {/* Facilitator confirmation */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">Facilitator confirmation</p>
                          <p className="text-xs text-slate-500 font-sans">{activeReview.facilitatorName} confirmed learner readiness</p>
                        </div>
                      </div>
                    </div>

                    {/* Programme approval row */}
                    <div className="p-3 rounded-2xl flex gap-3 items-start border bg-amber-50 border-amber-100 text-amber-900 text-left mt-2">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="h-3 w-3" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-[11px] text-slate-900 font-sans">Programme approval</p>
                        <p className="text-xs text-slate-600 font-sans">Required before certificate issue</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Certificate record */}
                <div className="space-y-3">
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Certificate record</h4>
                    <p className="text-xs text-slate-400">Certificate details prepared for issue after programme approval.</p>
                  </div>
                  <div className="bg-white rounded-3xl border border-slate-200/70 p-5 space-y-4 text-left shadow-sm">
                    <div className="divide-y divide-slate-100">
                      <div className="py-2.5 text-left first:pt-0">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Certificate title</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.certificateTitle}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Certificate ID</span>
                        <span className="text-sm text-slate-500 font-medium block font-sans mt-0.5">Generated after approval</span>
                      </div>
                      <div className="py-2.5 text-left last:pb-0">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Public verification</span>
                        <span className="text-sm text-slate-500 font-medium block font-sans mt-0.5">Available after issue</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. Facilitator confirmation section */}
                <div className="space-y-3">
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Facilitator confirmation</h4>
                    <p className="text-xs text-slate-400 font-sans">Readiness note from the assigned facilitator.</p>
                  </div>
                  <div className="rounded-3xl bg-blue-50/40 border border-blue-100 p-5 text-left shadow-2xs space-y-3">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
                      All CPD credit targets have been achieved. Assessment and attendance records have been reviewed, and the facilitator has confirmed readiness for programme review.
                    </p>
                    <div className="pt-3 border-t border-blue-100/50 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                      <span>Confirmed by</span>
                      <span className="font-semibold text-slate-800">{activeReview.facilitatorName || "Chidi Nze"}</span>
                    </div>
                  </div>
                </div>

                {/* 7. Review Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-3 bg-white">
                  <div className="grid grid-cols-1 min-[390px]:grid-cols-2 gap-3">
                    <button
                      onClick={() => setShowFollowUpModal(true)}
                      className="py-3 bg-white border border-slate-200 hover:bg-slate-50 text-amber-800 hover:text-amber-950 rounded-2xl min-h-[46px] font-semibold transition-all cursor-pointer text-center flex items-center justify-center active:scale-[0.98]"
                    >
                      Request follow-up
                    </button>
                    <button
                      onClick={() => setShowIssueModal(true)}
                      className="py-3 bg-[#005C45] hover:bg-[#004231] text-white rounded-2xl min-h-[46px] font-semibold transition-all cursor-pointer text-center flex items-center justify-center active:scale-[0.98] shadow-3xs"
                    >
                      Issue certificate
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowLearnerRecordModal(true)}
                    className="w-full py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center"
                  >
                    View learner record
                  </button>
                </div>

              </div>
            )
          ) : (
            /* DEFAULT FLOW STATE (EMPTY PANEL IS POLISHED) */
            <div className="bg-white border border-slate-200/70 rounded-3xl p-6 shadow-3xs space-y-6 text-center sticky top-6 py-10">
              <div className="w-12 h-12 bg-emerald-50 text-[#005C45] rounded-2xl flex items-center justify-center mx-auto shadow-3xs">
                <Award className="h-6 w-6" />
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-800 font-heading">Certificate review guide</h3>
                <p className="text-xs text-slate-400 max-w-[240px] mx-auto leading-relaxed font-normal">
                  Select a learner to review certificate readiness and issue the certificate when requirements are complete.
                </p>
              </div>

              {/* Clean Checklist rules */}
              <div className="border-t border-slate-100 pt-4 max-w-[220px] mx-auto text-left space-y-2.5 text-xs text-slate-500 font-medium">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                  <span>Confirm CPD credits meet programme rules</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                  <span>Check assessment review status</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                  <span>Confirm student attendance</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</span>
                  <span>Review facilitator confirmation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">5</span>
                  <span>Issue certificate</span>
                </div>
                <div className="flex items-start gap-2.5 text-[#005C45]">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#005C45] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">6</span>
                  <span className="font-semibold">Public verification becomes available</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleReviewFirstReady}
                  className="px-4 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white font-bold rounded-xl text-xs transition-all cursor-pointer active:scale-[0.98]"
                >
                  Select a learner to review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. MOBILE FULL-SCREEN REVIEW SHEET */}
      {mobileReviewOpen && activeReview && (
        <div className="lg:hidden fixed inset-0 bg-slate-50 z-[100] flex flex-col animate-in slide-in-from-bottom duration-200">
          {activeReview.status === "Certificate issued" ? (
            <>
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white border-b border-slate-105 p-4 flex justify-between items-center z-10 shrink-0">
                <div className="text-left">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-50 text-[#005C45] border-emerald-100">
                    Certificate issued
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1 leading-tight font-heading">{activeReview.learnerName}</h3>
                  <p className="text-xs text-slate-400 font-medium">ID: {activeReview.learnerId}</p>
                </div>
                <button 
                  onClick={() => setMobileReviewOpen(false)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full cursor-pointer transition-all"
                  aria-label="Close certificate record"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
                {/* 1. Certificate status summary card */}
                <div className="rounded-3xl bg-emerald-50/60 border border-emerald-100 shadow-sm p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#005C45] font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span>Certificate issued</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium text-left">
                    This learner’s certificate has been issued and is available for public verification.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-emerald-100/40 text-left">
                    <div>
                      <span className="text-slate-500 block font-medium">Certificate ID</span>
                      <span className="font-semibold text-slate-900 font-mono">{activeReview.certificateId || "SUST-CERT-2026-0140"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-medium">Public verification</span>
                      <span className="font-semibold text-emerald-600">Active</span>
                    </div>
                  </div>
                </div>

                {/* 2. Learner summary section */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-850 font-heading text-left">Learner summary</h4>
                  <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-sm space-y-4 text-left">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">Pathway</span>
                      <span className="text-sm font-semibold text-slate-950 block">{activeReview.pathway}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">Cohort</span>
                      <span className="text-sm font-semibold text-slate-950 block">{activeReview.cohort}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">State and LGA</span>
                      <span className="text-sm font-semibold text-slate-950 block">{activeReview.state} State · {activeReview.lga}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-slate-500 block">Facilitator</span>
                      <span className="text-sm font-semibold text-[#005C45] block">{activeReview.facilitatorName}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Certificate readiness section */}
                <div className="space-y-2">
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-855 font-heading">Certificate readiness</h4>
                    <p className="text-xs text-slate-400">Requirements confirmed before certificate issue.</p>
                  </div>
                  
                  <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-sm">
                    <div className="divide-y divide-slate-100">
                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">CPD credits complete</p>
                          <p className="text-xs text-slate-500">{activeReview.cpdCreditsEarned} of 35 credits</p>
                        </div>
                      </div>

                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">Assessment reviewed</p>
                          <p className="text-xs text-slate-500">Final assessment reviewed by facilitator</p>
                        </div>
                      </div>

                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">Attendance confirmed</p>
                          <p className="text-xs text-slate-500">Interview Practice Clinic attendance confirmed</p>
                        </div>
                      </div>

                      <div className="flex gap-3 py-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                        <div>
                          <p className="font-semibold text-xs text-slate-800">Facilitator confirmation</p>
                          <p className="text-xs text-slate-500">{activeReview.facilitatorName} confirmed learner readiness</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 p-3.5 rounded-2xl flex gap-3 items-start border bg-emerald-50 border-emerald-100 text-[#005C45] text-left">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</div>
                      <div>
                        <p className="font-semibold text-xs text-slate-800">Programme approval</p>
                        <p className="text-xs text-slate-600 font-medium">Completed before certificate issue</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Certificate record section */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-850 font-heading text-left">Certificate record</h4>
                  <div className="rounded-3xl bg-white border border-slate-200/70 p-5 shadow-sm space-y-4 text-left">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Certificate title</span>
                      <span className="text-sm text-slate-900 font-semibold">{activeReview.certificateTitle}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Certificate ID</span>
                      <span className="text-sm text-slate-900 font-semibold font-mono">{activeReview.certificateId || "SUST-CERT-2026-0140"}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Issue status</span>
                      <span className="text-sm text-slate-900 font-semibold">Certificate issued</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-xs text-slate-500">Public verification</span>
                      <span className="text-sm text-emerald-600 font-semibold">Active</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs text-slate-500">Issue date</span>
                      <span className="text-sm text-slate-900 font-semibold">25 Oct 2026</span>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeReview.certificateId || "SUST-CERT-2026-0140");
                        showToast("Certificate ID copied.");
                      }}
                      className="w-full mt-2 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Copy certificate ID
                    </button>
                  </div>
                </div>

                {/* 5. Facilitator confirmation note */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-855 font-heading text-left">Facilitator confirmation</h4>
                  <p className="text-xs text-slate-400 text-left">Readiness note from the assigned facilitator.</p>
                  <div className="rounded-2xl bg-blue-50/40 border border-blue-100 p-4 text-sm text-slate-700 leading-6 text-left">
                    {activeReview.facilitatorNotes.replace(/^["'\s]+|["'\s]+$/g, '').replace(/issuance/g, 'issue')}
                  </div>
                </div>

                {/* 6. Public verification action */}
                <div className="rounded-3xl bg-white border border-slate-200/70 shadow-sm p-5 space-y-4">
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-slate-850 font-heading">Public verification</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      This certificate can be verified using the public certificate verification page.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => {
                        setMobileReviewOpen(false);
                        navigateTo("/verify-certificate");
                      }}
                      className="py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer active:scale-95"
                    >
                      Open verification page
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/#verify-certificate?id=${activeReview.certificateId || 'SUST-CERT-2026-0140'}`);
                        showToast("Verification link copied.");
                      }}
                      className="py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all text-center cursor-pointer active:scale-95"
                    >
                      Copy verification link
                    </button>
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Actions */}
              <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-150 p-4 shrink-0 z-20 pb-8 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileReviewOpen(false);
                    navigateTo("/verify-certificate");
                  }}
                  className="w-full py-3 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
                >
                  Open verification page
                </button>
                <button
                  onClick={() => setShowLearnerRecordModal(true)}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                >
                  View learner record
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Sticky Review Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 px-5 flex justify-between items-center z-20 shrink-0">
                <div className="text-left space-y-1">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-100">
                    Ready for review
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1 leading-tight font-heading">Review certificate</h3>
                  <p className="text-xs text-slate-500 font-medium font-sans">
                    {activeReview.learnerName} · {activeReview.learnerId}
                  </p>
                  <p className="text-[11px] text-[#005C45] font-semibold font-sans">
                    {activeReview.pathway}
                  </p>
                </div>
                <button 
                  onClick={() => setMobileReviewOpen(false)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full cursor-pointer transition-all w-11 h-11 flex items-center justify-center shrink-0"
                  aria-label="Close certificate review"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content Container (The only scroll container) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 pb-[calc(10rem+env(safe-area-inset-bottom))]">
                
                {/* 1. Certificate readiness review summary card */}
                <div className="rounded-3xl bg-amber-50/50 border border-amber-100 shadow-sm p-5 space-y-3 text-left">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Certificate readiness review</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      This learner has completed the required learning steps and is awaiting programme approval.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-200/20">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      CPD complete
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Assessment reviewed
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Attendance confirmed
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-semibold rounded-lg font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Approval pending
                    </span>
                  </div>
                </div>

                {/* 2. Learner details compact card */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Learner details</h4>
                    <p className="text-xs text-slate-400 font-sans">Pathway, cohort, location, and facilitator for this review.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200/70 p-5 space-y-4 bg-white shadow-sm">
                    <div className="divide-y divide-slate-100">
                      <div className="py-2.5 text-left first:pt-0">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Learner</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.learnerName}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Learner ID</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.learnerId}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Pathway</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.pathway}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Cohort</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.cohort}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Location</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">
                          {activeReview.state} State · {activeReview.lga}
                        </span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Facilitator</span>
                        <span className="text-sm font-semibold text-[#005C45] block font-sans mt-0.5">{activeReview.facilitatorName}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100 flex justify-center">
                      <button
                        onClick={() => showToast("Learner profile view is prepared for this prototype.")}
                        className="text-xs font-semibold text-[#005C45] hover:text-[#004231] hover:underline cursor-pointer flex items-center gap-1.5 py-1"
                      >
                        <User className="h-3.5 w-3.5" />
                        View full learner profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Certificate readiness checklist */}
                <div className="space-y-3">
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Certificate readiness</h4>
                    <p className="text-xs text-slate-400 font-sans">Requirements confirmed before certificate issue.</p>
                  </div>
                  
                  <div className="bg-white rounded-3xl border border-slate-200/70 p-5 shadow-sm space-y-1">
                    <div className="divide-y divide-slate-100">
                      {/* CPD credits complete */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">CPD credits complete</p>
                          <p className="text-xs text-slate-500 font-sans">{activeReview.cpdCreditsEarned} of 35 credits</p>
                        </div>
                      </div>

                      {/* Assessment reviewed */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          activeReview.assessmentReviewed ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        }`}>
                          {activeReview.assessmentReviewed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">Assessment reviewed</p>
                          <p className="text-xs text-slate-500 font-sans">
                            {activeReview.assessmentReviewed 
                              ? "Final assessment reviewed by facilitator" 
                              : "Assessment review note needed from facilitator"}
                          </p>
                        </div>
                      </div>

                      {/* Attendance confirmed */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">Attendance confirmed</p>
                          <p className="text-xs text-slate-500 font-sans font-medium">Interview Practice Clinic attendance confirmed</p>
                        </div>
                      </div>

                      {/* Facilitator confirmation */}
                      <div className="flex gap-3 py-3 items-start text-left">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-slate-900 font-sans">Facilitator confirmation</p>
                          <p className="text-xs text-slate-500 font-sans">{activeReview.facilitatorName} confirmed learner readiness</p>
                        </div>
                      </div>
                    </div>

                    {/* Programme approval row */}
                    <div className="p-3 rounded-2xl flex gap-3 items-start border bg-amber-50 border-amber-100 text-amber-900 text-left mt-2">
                      <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="h-3 w-3" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-[11px] text-slate-900 font-sans">Programme approval</p>
                        <p className="text-xs text-slate-600 font-sans">Required before certificate issue</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Certificate record */}
                <div className="space-y-3">
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Certificate record</h4>
                    <p className="text-xs text-slate-400">Certificate details prepared for issue after programme approval.</p>
                  </div>
                  <div className="bg-white rounded-3xl border border-slate-200/70 p-5 space-y-4 text-left shadow-sm">
                    <div className="divide-y divide-slate-100">
                      <div className="py-2.5 text-left first:pt-0">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Certificate title</span>
                        <span className="text-sm font-semibold text-slate-950 block font-sans mt-0.5">{activeReview.certificateTitle}</span>
                      </div>
                      <div className="py-2.5 text-left">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Certificate ID</span>
                        <span className="text-sm text-slate-500 font-medium block font-sans mt-0.5">Generated after approval</span>
                      </div>
                      <div className="py-2.5 text-left last:pb-0">
                        <span className="text-xs text-slate-500 block font-sans font-medium">Public verification</span>
                        <span className="text-sm text-slate-500 font-medium block font-sans mt-0.5">Available after issue</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Facilitator confirmation section */}
                <div className="space-y-3">
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-slate-900 font-heading">Facilitator confirmation</h4>
                    <p className="text-xs text-slate-400 font-sans">Readiness note from the assigned facilitator.</p>
                  </div>
                  <div className="rounded-3xl bg-blue-50/40 border border-blue-100 p-5 text-left shadow-2xs space-y-3">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
                      All CPD credit targets have been achieved. Assessment and attendance records have been reviewed, and the facilitator has confirmed readiness for programme review.
                    </p>
                    <div className="pt-3 border-t border-blue-100/50 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                      <span>Confirmed by</span>
                      <span className="font-semibold text-slate-800">{activeReview.facilitatorName || "Chidi Nze"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Actions */}
              <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 px-5 shrink-0 z-20 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex flex-col gap-3 shadow-[0_-8px_24px_rgba(15,23,42,0.04)]">
                <div className="grid grid-cols-1 min-[390px]:grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => setShowFollowUpModal(true)}
                    className="py-3 bg-white border border-slate-200 hover:bg-slate-50 text-amber-850 hover:border-amber-200 rounded-2xl min-h-[46px] font-semibold transition-all text-center cursor-pointer flex items-center justify-center active:scale-95"
                  >
                    Request follow-up
                  </button>
                  <button
                    onClick={() => setShowIssueModal(true)}
                    className="py-3 bg-[#005C45] hover:bg-[#004231] text-white rounded-2xl min-h-[46px] font-semibold transition-all text-center cursor-pointer flex items-center justify-center active:scale-95"
                  >
                    Issue certificate
                  </button>
                </div>
                <button
                  onClick={() => setShowLearnerRecordModal(true)}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                >
                  View learner record
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Sticky Selection Bar (Controlled Bulk Issue Actions) */}
      {selectedReadyIds.length > 0 && !isMobile && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 z-40 border border-slate-850 animate-in slide-in-from-bottom-12 duration-300">
          <span className="text-xs font-bold text-slate-200">
            {selectedReadyIds.length} ready {selectedReadyIds.length === 1 ? 'learner' : 'learners'} selected
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedReadyIds([])}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Clear selection
            </button>
            <button
              onClick={() => setShowBulkIssueModal(true)}
              className="bg-[#005C45] hover:bg-[#003B2C] text-white px-4 py-2 rounded-full text-xs font-bold transition-all"
            >
              Issue selected certificates
            </button>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 6. MODALS                                            */}
      {/* ==================================================== */}

      {/* A. ISSUE CONFIRMATION MODAL */}
      {showIssueModal && activeReview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left space-y-4">
            {issueSuccessState ? (
              <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-50 text-[#005C45] rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 font-heading text-center">Certificate issued!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed text-center">
                    The certificate for <span className="font-semibold text-slate-800">{activeReview.learnerName}</span> has been issued successfully.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs space-y-2 text-left max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Certificate ID</span>
                    <span className="font-mono font-semibold text-slate-800">{activeReview.certificateId || "SUST-CERT-2026-0148"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Verification State</span>
                    <span className="font-semibold text-emerald-600">Active</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowIssueModal(false);
                    setMobileReviewOpen(false);
                  }}
                  className="w-full py-3 bg-[#005C45] hover:bg-[#004231] text-white text-xs font-bold rounded-2xl cursor-pointer shadow-3xs transition-all active:scale-95"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900 font-heading">Issue certificate?</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      This will mark the learner’s certificate as issued and make the public verification record available.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowIssueModal(false)}
                    className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Checklist */}
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required checks status</p>
                  <div className="space-y-2 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>CPD complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>Assessment reviewed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span>
                      <span>Attendance confirmed</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#005C45]">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-[10px] flex items-center justify-center font-bold">✓</span>
                      <span>Programme approval confirmed</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setShowIssueModal(false)}
                    className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeIssueCertificate}
                    disabled={isIssuingInProgress}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl shadow-3xs cursor-pointer active:scale-[0.98] flex items-center gap-1.5"
                  >
                    {isIssuingInProgress ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Issue certificate</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* B. BULK ISSUE MODAL */}
      {showBulkIssueModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 font-heading">Issue selected certificates?</h3>
                <p className="text-xs text-slate-500">
                  Review selected learners before marking certificates as issued.
                </p>
              </div>
              <button 
                onClick={() => setShowBulkIssueModal(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 border border-slate-150 p-3.5 rounded-2xl">
                <div>
                  <span className="text-slate-400 block font-semibold">Selected learners</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedReadyIds.length}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Eligible for issue</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedReadyIds.length}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-450 font-semibold">Excluded records</span>
                  <span className="font-bold text-slate-500">0</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-2.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required checks status</p>
                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>CPD complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Assessment reviewed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Attendance confirmed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Facilitator confirmation complete</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#005C45]">
                    <span className="text-[#005C45]">✓</span>
                    <span>Programme approval confirmed</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 text-[#005C45] rounded-2xl text-xs font-medium leading-relaxed">
                <strong>Public verification note:</strong> Issued certificates become available on the public verification page after certificate IDs are generated.
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowBulkIssueModal(false)}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeBulkIssue}
                disabled={isIssuingInProgress}
                className="px-5 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl shadow-3xs cursor-pointer active:scale-[0.98]"
              >
                {isIssuingInProgress ? "Processing..." : "Issue certificates"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. REQUEST FOLLOW-UP MODAL */}
      {showFollowUpModal && activeReview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left space-y-4">
            {followUpSuccessState ? (
              <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="h-8 w-8 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 font-heading text-center">Follow-up requested!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed text-center">
                    A follow-up request has been successfully dispatched to <span className="font-semibold text-slate-800">{activeReview.facilitatorName || "the facilitator"}</span>.
                  </p>
                </div>
                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl text-xs space-y-2 text-left max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Reason</span>
                    <span className="font-semibold text-amber-850">{followUpReason}</span>
                  </div>
                  {followUpMessage && (
                    <div className="pt-2 border-t border-amber-100/40">
                      <span className="text-slate-500 block font-medium mb-1">Message</span>
                      <span className="text-slate-700 block italic leading-relaxed">"{followUpMessage}"</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowFollowUpModal(false);
                    setMobileReviewOpen(false);
                  }}
                  className="w-full py-3 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-2xl cursor-pointer shadow-3xs transition-all active:scale-95"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900 font-heading">Request facilitator follow-up</h3>
                    <p className="text-xs text-slate-400">
                      Ask the facilitator to update missing review information before certificate issue.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowFollowUpModal(false)}
                    className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Reason for request</label>
                    <select
                      value={followUpReason}
                      onChange={(e) => setFollowUpReason(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none"
                    >
                      <option value="Assessment note needed">Assessment note needed</option>
                      <option value="Attendance confirmation needed">Attendance confirmation needed</option>
                      <option value="CPD evidence needs review">CPD evidence needs review</option>
                      <option value="Learner record correction needed">Learner record correction needed</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Message to facilitator</label>
                    <textarea
                      rows={4}
                      placeholder="Enter direct notes to cohort team on what is missing..."
                      value={followUpMessage}
                      onChange={(e) => setFollowUpMessage(e.target.value)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:border-[#005C45] focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setShowFollowUpModal(false)}
                    className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeSendFollowUp}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl cursor-pointer active:scale-[0.98]"
                  >
                    Send follow-up request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showLearnerRecordModal && activeReview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 font-heading">Learner Record</h3>
                <p className="text-xs text-slate-500 font-sans">
                  Official programme progress and completion record
                </p>
              </div>
              <button 
                onClick={() => setShowLearnerRecordModal(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Personal Details Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 bg-slate-50 border border-slate-150 rounded-2xl text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Learner Name</span>
                  <span className="font-bold text-slate-800">{activeReview.learnerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Learner ID</span>
                  <span className="font-mono font-bold text-slate-800">{activeReview.learnerId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Pathway</span>
                  <span className="font-bold text-slate-800">{activeReview.pathway}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Cohort</span>
                  <span className="font-bold text-slate-800">{activeReview.cohort}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Location</span>
                  <span className="font-bold text-slate-800">{activeReview.lga}, {activeReview.state} State</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Assigned Facilitator</span>
                  <span className="font-bold text-slate-800">{activeReview.facilitatorName || "Chidi Nze"}</span>
                </div>
              </div>

              {/* Progress & Verification checklist */}
              <div className="border border-slate-150 rounded-2xl p-4 space-y-3 bg-white">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Programme Completion Status</h4>
                
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="text-slate-600 font-medium">CPD Credits Complete</span>
                    </div>
                    <span className="font-bold text-slate-800">35 of 35 Credits</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="text-slate-600 font-medium">Attendance Confirmed</span>
                    </div>
                    <span className="font-bold text-slate-800">100% Attended</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="text-slate-600 font-medium">Assessment Reviewed</span>
                    </div>
                    <span className="font-bold text-[#005C45]">Passed</span>
                  </div>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="p-3.5 bg-blue-50/60 border border-blue-100 text-blue-900 rounded-2xl text-xs font-medium leading-relaxed">
                <strong>Information:</strong> Learner record preview is prepared for this prototype and can be connected during production setup.
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowLearnerRecordModal(false)}
                className="px-5 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl cursor-pointer transition-all active:scale-95 shadow-3xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 font-heading">Export Certificate Report</h3>
                <p className="text-xs text-slate-500 font-sans">
                  Select parameters to download the certificate reporting data.
                </p>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {exportSuccess ? (
              <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-50 text-[#005C45] rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900 font-heading text-center">Report Prepared!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed text-center font-sans">
                    The requested certificate report has been compiled and prepared for download.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-xs space-y-2 text-left max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium font-sans">Record Scope</span>
                    <span className="font-semibold text-slate-800 font-sans">{exportFilter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium font-sans">File Format</span>
                    <span className="font-semibold text-slate-800 font-sans">{exportType}</span>
                  </div>
                </div>
                <div className="p-3.5 bg-blue-50/60 border border-blue-100 text-blue-900 rounded-2xl text-[11px] font-medium leading-relaxed text-left font-sans">
                  Certificate report export is prepared for this prototype and can be connected during production setup.
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-full py-3 bg-[#005C45] hover:bg-[#004231] text-white text-xs font-bold rounded-2xl cursor-pointer shadow-3xs transition-all active:scale-95"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {/* Scope Options */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Report Scope</label>
                    <select
                      value={exportFilter}
                      onChange={(e) => setExportFilter(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-[#005C45] focus:bg-white font-sans"
                    >
                      <option value="Ready for review">Ready for review</option>
                      <option value="Certificate issued">Certificate issued</option>
                      <option value="Needs facilitator action">Needs facilitator action</option>
                      <option value="Not eligible yet">Not eligible yet</option>
                      <option value="All certificate records">All certificate records</option>
                    </select>
                  </div>

                  {/* File Type options */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">File Type</label>
                    <div className="grid grid-cols-2 gap-3 font-sans">
                      <button
                        type="button"
                        onClick={() => setExportType("CSV")}
                        className={`py-2.5 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${exportType === "CSV" ? 'bg-emerald-50 border-[#005C45] text-[#005C45]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        CSV Format
                      </button>
                      <button
                        type="button"
                        onClick={() => setExportType("PDF summary")}
                        className={`py-2.5 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${exportType === "PDF summary" ? 'bg-emerald-50 border-[#005C45] text-[#005C45]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        PDF Summary
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setExportSuccess(true);
                      showToast("Report prepared successfully.");
                    }}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl cursor-pointer active:scale-[0.98]"
                  >
                    Prepare Export
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProgrammeCertificates;
