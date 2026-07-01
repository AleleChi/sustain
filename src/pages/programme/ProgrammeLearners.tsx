import { useState, useMemo, useEffect } from "react";
import { LEARNERS_DATA, ProgrammeLearner } from "../../data/programmeData";
import { 
  Search, 
  MapPin, 
  WifiOff, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  X,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Plus,
  Download,
  FileText,
  User,
  Filter,
  Check,
  Award,
  BookOpen
} from "lucide-react";
import { nigeriaStates, getLGAsByState } from "../../data/nigeriaLocations";
import { useRoute } from "../../context/RouteContext";

export function ProgrammeLearners() {
  const { showToast, navigateTo } = useRoute();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedLga, setSelectedLga] = useState("All");
  const [selectedPathway, setSelectedPathway] = useState("All");
  const [selectedCohort, setSelectedCohort] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLearner, setSelectedLearner] = useState<any | null>(null);

  // Prototype Modal States
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showCertificateReviewModal, setShowCertificateReviewModal] = useState(false);
  const [showSupportRecordModal, setShowSupportRecordModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);

  // Selection & Bulk Assignment States
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedLearnerIds, setSelectedLearnerIds] = useState<string[]>([]);
  const [isSelectionAssistantOpen, setIsSelectionAssistantOpen] = useState(false);
  const [isBulkAssignOpen, setIsBulkAssignOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportType, setExportType] = useState<"csv" | "pdf">("csv");
  const [bulkAssignStep, setBulkAssignStep] = useState(1);
  const [bulkAssignSource, setBulkAssignSource] = useState<"filtered" | "upload" | "matching">("filtered");
  const [bulkAssignPathway, setBulkAssignPathway] = useState("Youth Employability Pathway");
  const [bulkAssignState, setBulkAssignState] = useState("Lagos");
  const [bulkAssignLga, setBulkAssignLga] = useState("Ikeja");
  const [bulkAssignCohort, setBulkAssignCohort] = useState("Lagos Work Readiness 01");
  const [bulkAssignFacilitator, setBulkAssignFacilitator] = useState("Adewale Okoye");

  // Refined Interactive Import Stepper States
  const [importStep, setImportStep] = useState(1);
  const [importFileName, setImportFileName] = useState("");
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importCorrectedLga, setImportCorrectedLga] = useState("Kano Municipal");

  // Keep bulk assign LGA in sync with the state selected
  useEffect(() => {
    const lgas = getLGAsByState(bulkAssignState);
    if (lgas.length > 0) {
      setBulkAssignLga(lgas[0].name);
    }
  }, [bulkAssignState]);

  // Pagination states
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);

  // Compact Status Badge helper for mobile cards
  const getMobileStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border-0 shadow-none">
            Certificate ready
          </span>
        );
      case "Under Review":
        return (
          <span className="inline-flex items-center px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border-0 shadow-none">
            Review pending
          </span>
        );
      case "Active":
        return (
          <span className="inline-flex items-center px-3 py-1.5 bg-sky-50 text-sky-700 rounded-full text-xs font-semibold border-0 shadow-none">
            Active
          </span>
        );
      case "Needs Follow-Up":
        return (
          <span className="inline-flex items-center px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs font-semibold border-0 shadow-none">
            Needs follow-up
          </span>
        );
      default:
        return null;
    }
  };

  // Helper to map realistic LGAs for mock learners deterministically
  const getLearnerLga = (learnerName: string, location: string) => {
    if (location === "Kano") {
      return learnerName.includes("Bello") ? "Kano Municipal" : "Fagge";
    }
    if (location === "Lagos") {
      return learnerName.includes("Okafor") ? "Alimosho" : "Ikeja";
    }
    if (location === "Enugu") {
      return learnerName.includes("Egwu") ? "Enugu North" : "Nsukka";
    }
    if (location === "Kaduna") {
      return "Kaduna North";
    }
    return "Central Hub";
  };

  // Helper to format learner ID beautifully from STN-2026-XXXX to SUST-LRN-XXXX
  const formatLearnerId = (id: string) => {
    return id.replace("STN-2026-", "SUST-LRN-");
  };

  // Reset LGA filter when state changes
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedLga("All");
  };

  // Get dependent LGAs based on selected state
  const availableLgas = useMemo(() => {
    if (selectedState === "All") return [];
    return getLGAsByState(selectedState);
  }, [selectedState]);

  // Count active filters (excluding search term)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedState !== "All") count++;
    if (selectedLga !== "All") count++;
    if (selectedPathway !== "All") count++;
    if (selectedCohort !== "All") count++;
    if (selectedGender !== "All") count++;
    if (selectedStatus !== "All") count++;
    return count;
  }, [selectedState, selectedLga, selectedPathway, selectedCohort, selectedGender, selectedStatus]);

  // Filter and decorate learners
  const filteredLearners = useMemo(() => {
    return LEARNERS_DATA.map(learner => ({
      ...learner,
      lga: getLearnerLga(learner.name, learner.location),
      formattedId: formatLearnerId(learner.id)
    })).filter((learner) => {
      const matchesSearch = 
        learner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        learner.formattedId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        learner.cohort.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = selectedState === "All" || learner.location === selectedState;
      const matchesLga = selectedLga === "All" || learner.lga === selectedLga;
      const matchesPathway = selectedPathway === "All" || learner.pathway === selectedPathway;
      const matchesCohort = selectedCohort === "All" || learner.cohort === selectedCohort;
      const matchesGender = selectedGender === "All" || learner.gender === selectedGender;
      const matchesStatus = selectedStatus === "All" || learner.status === selectedStatus;

      return matchesSearch && matchesState && matchesLga && matchesPathway && matchesCohort && matchesGender && matchesStatus;
    });
  }, [searchTerm, selectedState, selectedLga, selectedPathway, selectedCohort, selectedGender, selectedStatus]);

  // Simulated total count and pages for premium pagination
  const totalSimulated = useMemo(() => {
    if (searchTerm === "" && selectedState === "All" && selectedLga === "All" && selectedPathway === "All" && selectedCohort === "All" && selectedGender === "All" && selectedStatus === "All") {
      return 4286;
    }
    // Scale appropriately based on how many actually matched our filtered list out of 7 total in mock data
    const ratio = filteredLearners.length / LEARNERS_DATA.length;
    return Math.max(1, Math.round(4286 * ratio));
  }, [filteredLearners.length, searchTerm, selectedState, selectedLga, selectedPathway, selectedCohort, selectedGender, selectedStatus]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalSimulated / rowsPerPage));
  }, [totalSimulated, rowsPerPage]);

  // Paginate the actual displayed records for interactive fidelity
  const paginatedLearners = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    // Since mock data only has 7 items, we want to cycle or slice gracefully
    // If the index goes out of range for our small mock list, we cycle or take what we have
    if (filteredLearners.length === 0) return [];
    return filteredLearners.slice(startIndex % filteredLearners.length, (startIndex % filteredLearners.length) + rowsPerPage);
  }, [filteredLearners, currentPage, rowsPerPage]);

  // Reset page when filters are adjusted
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedState, selectedLga, selectedPathway, selectedCohort, selectedGender, selectedStatus, rowsPerPage]);

  // Export list compilation simulation effect
  useEffect(() => {
    let timer: any;
    if (isExporting && exportProgress < 100) {
      timer = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 25;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isExporting, exportProgress]);

  // Status Badge Mapping helper using human-centric wording
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50/70 text-emerald-800 border border-emerald-150/50 font-sans">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            Certificate ready
          </span>
        );
      case "Under Review":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50/80 text-amber-850 border border-amber-150/50 font-sans">
            <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            Review pending
          </span>
        );
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50/30 text-teal-800 border border-teal-100/40 font-sans">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full shrink-0" />
            Active
          </span>
        );
      case "Needs Follow-Up":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50/70 text-rose-800 border border-rose-150/50 font-sans">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
            Needs follow-up
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 text-left relative animate-in fade-in duration-300 pb-[calc(7rem+env(safe-area-inset-bottom))] lg:pb-12">
      
      {/* 1. PAGE HERO */}
      <div className="bg-white px-6 py-4.5 rounded-[24px] border border-slate-200/80 shadow-sm transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-heading">
              Learner Management
            </h1>
            {/* Subtitle - responsive length */}
            <p className="hidden md:block text-xs text-slate-500 font-medium leading-relaxed font-sans">
              Search, filter, and monitor learner progress across pathways, cohorts, locations, CPD readiness, and certificate review.
            </p>
            <p className="block md:hidden text-xs text-slate-500 font-medium leading-relaxed font-sans">
              Monitor learner progress, CPD readiness, and certificate review across cohorts.
            </p>
            
            {/* Context chips */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="inline-flex items-center text-[11px] font-semibold text-[#005C45] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                SUSTAIN CPD Programme
              </span>
              <span className="inline-flex items-center text-[11px] font-medium text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/40">
                4,286 learners enrolled
              </span>
              <span className="inline-flex items-center text-[11px] font-medium text-slate-500 bg-slate-50/55 border border-slate-200/30 px-2.5 py-0.5 rounded-full">
                10,000 learner target
              </span>
            </div>
          </div>

          {/* Primary & Secondary actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 lg:gap-2.5 shrink-0">
            {selectedLearnerIds.length > 0 ? (
              <button
                onClick={() => {
                  setBulkAssignStep(1);
                  setIsBulkAssignOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-[#005C45] hover:bg-[#004A37] active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Assign {selectedLearnerIds.length} {selectedLearnerIds.length === 1 ? "learner" : "learners"}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSelectionAssistantOpen(true);
                }}
                className="w-full sm:w-auto px-3.5 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
              >
                <Check className="h-3.5 w-3.5 text-slate-500" />
                <span>Bulk Assign</span>
              </button>
            )}

            <button
              onClick={() => {
                setImportStep(1);
                setImportFileName("");
                setImportProgress(0);
                setIsImporting(false);
                setShowImportModal(true);
              }}
              className="w-full sm:w-auto px-3.5 py-2 bg-[#005C45] hover:bg-[#004A37] active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Import Learners</span>
            </button>

            <button
              onClick={() => {
                setIsExporting(false);
                setExportProgress(0);
                setShowExportModal(true);
              }}
              className="w-full sm:w-auto px-3.5 py-2 bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Export List</span>
            </button>

            <button
              onClick={() => {
                navigateTo("/programme/reports");
              }}
              className="w-full sm:w-auto px-3.5 py-2 bg-slate-50 hover:bg-slate-100 active:scale-[0.98] text-slate-600 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              <span>View Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. LEARNER SUMMARY STRIP */}
      <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-none snap-x lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-x-visible">
        {/* Card 1: Learners Shown */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs transition-all duration-200 flex flex-col justify-between min-h-[84px] min-w-[150px] flex-1 snap-start">
          <div className="mt-0.5">
            <p className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
              {filteredLearners.length.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-semibold text-slate-500">Learners shown</span>
            <div className="h-5.5 w-5.5 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
              <User className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Card 2: Active Learners */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs transition-all duration-200 flex flex-col justify-between min-h-[84px] min-w-[150px] flex-1 snap-start">
          <div className="mt-0.5">
            <p className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
              {filteredLearners.filter(l => l.status === "Active").length.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-semibold text-slate-500">Active learners</span>
            <div className="h-5.5 w-5.5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Card 3: Certificate Ready */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs transition-all duration-200 flex flex-col justify-between min-h-[84px] min-w-[150px] flex-1 snap-start">
          <div className="mt-0.5">
            <p className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
              {filteredLearners.filter(l => l.status === "Completed").length.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-semibold text-slate-500">Certificate ready</span>
            <div className="h-5.5 w-5.5 rounded-full bg-emerald-50 text-emerald-650 flex items-center justify-center">
              <CheckCircle2 className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Card 4: Needs Follow-up */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs transition-all duration-200 flex flex-col justify-between min-h-[84px] min-w-[150px] flex-1 snap-start">
          <div className="mt-0.5">
            <p className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
              {filteredLearners.filter(l => l.status === "Needs Follow-Up").length.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-semibold text-slate-500">Needs follow-up</span>
            <div className="h-5.5 w-5.5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Card 5: Low-bandwidth access */}
        <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-xs transition-all duration-200 flex flex-col justify-between min-h-[84px] min-w-[150px] flex-1 snap-start">
          <div className="mt-0.5">
            <p className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading">
              {filteredLearners.filter(l => l.lowBandwidthEnabled).length.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-semibold text-slate-500">Low-bandwidth access</span>
            <div className="h-5.5 w-5.5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
              <WifiOff className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH AND FILTER AREA */}
      <div className="bg-white p-5 md:p-6 rounded-[24px] border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-heading">Find learners</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Filter by location, pathway, cohort, gender, and progress status.
            </p>
          </div>
        </div>

        {/* Filters Layout */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search bar - always visible and wide */}
            <div className="relative flex items-center col-span-1 md:col-span-8 lg:col-span-9 h-[48px]">
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by learner name, ID, or cohort"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50/50 font-semibold text-slate-800 transition-all placeholder-slate-400"
              />
            </div>

            {/* Mobile Filter Toggle & Reset Button / Desktop Filter Actions */}
            <div className="flex md:col-span-4 lg:col-span-3 items-center gap-2 w-full">
              <button
                onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
                className={`flex-grow md:hidden flex items-center justify-center gap-2 h-[48px] border rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  mobileFiltersExpanded || activeFiltersCount > 0
                    ? "bg-emerald-50 text-[#005C45] border-emerald-100"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Filter className="h-4 w-4 shrink-0" />
                <span>{mobileFiltersExpanded ? "Hide Filters" : "Filters"}</span>
                {activeFiltersCount > 0 && (
                  <span className="h-5 w-5 rounded-full bg-[#005C45] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedState("All");
                    setSelectedLga("All");
                    setSelectedPathway("All");
                    setSelectedCohort("All");
                    setSelectedGender("All");
                    setSelectedStatus("All");
                  }}
                  className="px-4 h-[48px] bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-2xl transition-all cursor-pointer shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Collapsible Dropdowns: Hidden on mobile unless expanded, always visible on md+ */}
          <div className={`${mobileFiltersExpanded ? "grid" : "hidden"} md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full`}>
            
            {/* State selector */}
            <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-2xl px-3.5 h-[48px] hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/20 transition-all">
              <span className="text-[10px] text-slate-500 font-semibold leading-none mb-0.5">State</span>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
              >
                <option value="All">All states</option>
                {nigeriaStates.map(state => (
                  <option key={state.slug} value={state.name}>{state.name}</option>
                ))}
              </select>
            </div>

            {/* LGA select dropdown (dependent on state) */}
            <div className={`relative flex flex-col justify-center bg-white border border-slate-200 rounded-2xl px-3.5 h-[48px] transition-all ${selectedState === "All" ? "opacity-50" : "hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/20"}`}>
              <span className="text-[10px] text-slate-500 font-semibold leading-none mb-0.5">Local government area</span>
              <select
                value={selectedLga}
                onChange={(e) => setSelectedLga(e.target.value)}
                disabled={selectedState === "All"}
                className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <option value="All">All LGAs</option>
                {availableLgas.map(lga => (
                  <option key={lga.slug} value={lga.name}>{lga.name}</option>
                ))}
              </select>
            </div>

            {/* Pathway select dropdown */}
            <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-2xl px-3.5 h-[48px] hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/20 transition-all">
              <span className="text-[10px] text-slate-500 font-semibold leading-none mb-0.5">Pathway</span>
              <select
                value={selectedPathway}
                onChange={(e) => setSelectedPathway(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
              >
                <option value="All">All pathways</option>
                <option value="Youth Employability Pathway">Employability</option>
                <option value="Work Readiness Foundation">Work Readiness</option>
              </select>
            </div>

            {/* Cohort select dropdown */}
            <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-2xl px-3.5 h-[48px] hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/20 transition-all">
              <span className="text-[10px] text-slate-500 font-semibold leading-none mb-0.5">Cohort</span>
              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
              >
                <option value="All">All cohorts</option>
                <option value="Kano Youth Employability 02">Kano Youth 02</option>
                <option value="Lagos Work Readiness 01">Lagos Work 01</option>
                <option value="Kaduna Youth Employability 01">Kaduna Youth 01</option>
                <option value="Enugu Work Readiness 03">Enugu Work 03</option>
              </select>
            </div>

            {/* Gender select dropdown */}
            <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-2xl px-3.5 h-[48px] hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/20 transition-all">
              <span className="text-[10px] text-slate-500 font-semibold leading-none mb-0.5">Gender</span>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
              >
                <option value="All">All genders</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Status select dropdown */}
            <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-2xl px-3.5 h-[48px] hover:border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/20 transition-all">
              <span className="text-[10px] text-slate-500 font-semibold leading-none mb-0.5">Status</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
              >
                <option value="All">All statuses</option>
                <option value="Completed">Certificate ready</option>
                <option value="Under Review">Review pending</option>
                <option value="Active">Active</option>
                <option value="Needs Follow-Up">Needs follow-up</option>
              </select>
            </div>

          </div>
        </div>

        {/* Active Filter Chips (Shown when filters are applied/active) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {selectedState !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-[#005C45] border border-emerald-100/40">
                <span>{selectedState}</span>
                <X className="h-3 w-3 cursor-pointer shrink-0 animate-pulse hover:text-red-500" onClick={() => setSelectedState("All")} />
              </span>
            )}
            {selectedLga !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-[#005C45] border border-emerald-100/40">
                <span>{selectedLga}</span>
                <X className="h-3 w-3 cursor-pointer shrink-0 animate-pulse hover:text-red-500" onClick={() => setSelectedLga("All")} />
              </span>
            )}
            {selectedPathway !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-[#005C45] border border-emerald-100/40">
                <span>{selectedPathway.includes("Employability") ? "Employability" : "Work Readiness"}</span>
                <X className="h-3 w-3 cursor-pointer shrink-0 animate-pulse hover:text-red-500" onClick={() => setSelectedPathway("All")} />
              </span>
            )}
            {selectedCohort !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-[#005C45] border border-emerald-100/40">
                <span>{selectedCohort}</span>
                <X className="h-3 w-3 cursor-pointer shrink-0 animate-pulse hover:text-red-500" onClick={() => setSelectedCohort("All")} />
              </span>
            )}
            {selectedGender !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-[#005C45] border border-emerald-100/40">
                <span>{selectedGender}</span>
                <X className="h-3 w-3 cursor-pointer shrink-0 animate-pulse hover:text-red-500" onClick={() => setSelectedGender("All")} />
              </span>
            )}
            {selectedStatus !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 text-[#005C45] border border-emerald-100/40">
                <span>{selectedStatus === "Completed" ? "Cert Ready" : selectedStatus === "Under Review" ? "Pending" : selectedStatus}</span>
                <X className="h-3 w-3 cursor-pointer shrink-0 animate-pulse hover:text-red-500" onClick={() => setSelectedStatus("All")} />
              </span>
            )}
          </div>
        )}

        {/* Dynamic active filters summary / Result count visible before cards */}
        <div className="flex items-center justify-between pt-1 text-xs font-medium text-slate-500">
          <div>
            Showing <span className="text-slate-800 font-semibold">1–{filteredLearners.length}</span> of <span className="text-slate-800 font-semibold">{totalSimulated.toLocaleString()}</span> learners{selectedState !== "All" && (
              <> in <span className="text-[#005C45] font-semibold">{selectedState} State</span></>
            )}
          </div>
          {(searchTerm || selectedState !== "All" || selectedLga !== "All" || selectedPathway !== "All" || selectedCohort !== "All" || selectedGender !== "All" || selectedStatus !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedState("All");
                setSelectedLga("All");
                setSelectedPathway("All");
                setSelectedCohort("All");
                setSelectedGender("All");
                setSelectedStatus("All");
              }}
              className="text-[#005C45] hover:text-[#004A37] transition-all cursor-pointer flex items-center gap-1 font-semibold"
            >
              <X className="h-3.5 w-3.5" />
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* 4. SELECTION BAR ABOVE LISTS (Desktop & Mobile) */}
      {isSelectionMode && selectedLearnerIds.length > 0 && (
        <div className="bg-emerald-50/55 border border-emerald-150 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-[#005C45] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {selectedLearnerIds.length}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {selectedLearnerIds.length} {selectedLearnerIds.length === 1 ? "learner" : "learners"} selected
              </p>
              <p className="text-xs text-slate-500 font-medium">Ready for batch cohort assignment or pathway migration.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedLearnerIds([])}
              className="flex-1 sm:flex-none px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors shadow-3xs"
            >
              Clear selection
            </button>
            <button
              onClick={() => {
                setBulkAssignStep(1);
                setIsBulkAssignOpen(true);
              }}
              className="flex-1 sm:flex-none px-5 py-2 bg-[#005C45] hover:bg-[#004A37] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Assign to cohort</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4. DESKTOP / MOBILE LEARNERS LIST CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200/70 shadow-sm overflow-hidden">
        
        {/* DESKTOP TABLE VIEW (hidden lg:hidden, block lg:block) */}
        <div className="hidden lg:block overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200/70 text-slate-600 text-xs font-semibold">
                {isSelectionMode && (
                  <th className="px-6 py-3.5 w-12 text-left">
                    <input 
                      type="checkbox"
                      checked={paginatedLearners.length > 0 && paginatedLearners.every(l => selectedLearnerIds.includes(l.id))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newIds = [...new Set([...selectedLearnerIds, ...paginatedLearners.map(l => l.id)])];
                          setSelectedLearnerIds(newIds);
                        } else {
                          const pageIds = paginatedLearners.map(l => l.id);
                          setSelectedLearnerIds(selectedLearnerIds.filter(id => !pageIds.includes(id)));
                        }
                      }}
                      className="rounded-md border-slate-300 text-[#005C45] focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                    />
                  </th>
                )}
                <th className="px-6 py-3.5 font-semibold text-slate-500 text-left">Learner</th>
                <th className="px-6 py-3.5 font-semibold text-slate-500 text-left">Pathway</th>
                <th className="px-6 py-3.5 font-semibold text-slate-500 text-left">Location</th>
                <th className="px-6 py-3.5 font-semibold text-slate-500 text-left">Progress</th>
                <th className="px-6 py-3.5 font-semibold text-slate-500 text-left">Access</th>
                <th className="px-6 py-3.5 font-semibold text-slate-500 text-left">Status</th>
                <th className="px-6 py-3.5 text-right font-semibold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLearners.length > 0 ? (
                paginatedLearners.map((learner) => {
                  const creditsPercent = (learner.cpdCredits / learner.maxCredits) * 100;
                  const isRowSelected = selectedLearnerIds.includes(learner.id);
                  return (
                    <tr 
                      key={learner.id} 
                      className={`hover:bg-slate-50/35 transition-colors group ${
                        isRowSelected ? "bg-emerald-50/20 hover:bg-emerald-55/30" : ""
                      }`}
                    >
                      {isSelectionMode && (
                        <td className="px-6 py-4.5 w-12">
                          <input 
                            type="checkbox"
                            checked={isRowSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLearnerIds([...selectedLearnerIds, learner.id]);
                              } else {
                                setSelectedLearnerIds(selectedLearnerIds.filter(id => id !== learner.id));
                              }
                            }}
                            className="rounded-md border-slate-300 text-[#005C45] focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                          />
                        </td>
                      )}
                      {/* Learner */}
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-emerald-50/80 text-[#005C45] flex items-center justify-center font-bold text-xs uppercase shadow-3xs border border-emerald-100/50 shrink-0">
                            {learner.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-[#005C45] transition-colors duration-150">{learner.name}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                              <span>{learner.formattedId}</span>
                              <span className="text-slate-300">•</span>
                              <span>{learner.gender}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Pathway and cohort */}
                      <td className="px-6 py-4.5">
                        <div className="max-w-[220px]">
                          <p className="text-xs font-semibold text-slate-800 leading-tight truncate">
                            {learner.pathway}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                            {learner.cohort}
                          </p>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <div>
                            <p className="font-semibold text-slate-800">{learner.location} State</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 font-normal">{learner.lga}</p>
                          </div>
                        </div>
                      </td>

                      {/* Progress */}
                      <td className="px-6 py-4.5">
                        <div className="space-y-1 max-w-[130px]">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-500 font-medium">
                              {learner.cpdCredits}/{learner.maxCredits} CPD
                            </span>
                            <span className="text-[#005C45] font-semibold">{creditsPercent.toFixed(0)}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                creditsPercent >= 80 
                                  ? "bg-emerald-600" 
                                  : creditsPercent >= 50 
                                    ? "bg-amber-500" 
                                    : "bg-rose-500"
                              }`}
                              style={{ width: `${creditsPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Access */}
                      <td className="px-6 py-4.5">
                        {learner.lowBandwidthEnabled ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-800 bg-teal-50/70 border border-teal-100/50 px-2.5 py-1 rounded-full">
                            <WifiOff className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                            Low-bandwidth access
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                            Standard access
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4.5">
                        {getStatusBadge(learner.status)}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4.5 text-right">
                        <button
                          onClick={() => setSelectedLearner(learner)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#005C45] bg-emerald-50/50 hover:bg-[#005C45] hover:text-white rounded-lg transition-all cursor-pointer shadow-3xs"
                          aria-label={`View ${learner.name} learner record`}
                        >
                          <span>View</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium text-xs">
                    No learners match the selected filters. Clear search or filters to retry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE & TABLET STACKED CARDS VIEW (block lg:hidden) */}
        <div className="block lg:hidden bg-slate-50/45 p-4 md:p-6 space-y-4">
          {filteredLearners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedLearners.map((learner) => {
                const creditsPercent = (learner.cpdCredits / learner.maxCredits) * 100;
                const isCardSelected = selectedLearnerIds.includes(learner.id);
                return (
                  <div 
                    key={learner.id} 
                    className={`bg-white rounded-[28px] border p-5 shadow-xs space-y-5 active:scale-[0.99] transition-all duration-200 flex flex-col justify-between ${
                      isCardSelected ? "border-emerald-500 bg-emerald-50/10" : "border-slate-200/70"
                    }`}
                  >
                    {/* 1. Learner identity header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {isSelectionMode && (
                          <input 
                            type="checkbox"
                            checked={isCardSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLearnerIds([...selectedLearnerIds, learner.id]);
                              } else {
                                setSelectedLearnerIds(selectedLearnerIds.filter(id => id !== learner.id));
                              }
                            }}
                            className="rounded-md border-slate-300 text-[#005C45] focus:ring-emerald-500 h-5 w-5 cursor-pointer shrink-0 mr-1"
                          />
                        )}
                        <div className="h-10 w-10 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center font-bold text-xs uppercase shadow-3xs border border-emerald-100/40 shrink-0">
                          {learner.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 leading-tight truncate">{learner.name}</p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                            {learner.formattedId} · {learner.gender}
                          </p>
                        </div>
                      </div>
                      <div className="sm:self-center self-start pl-[52px] sm:pl-0">
                        {getMobileStatusBadge(learner.status)}
                      </div>
                    </div>

                    {/* 2. Status and progress summary */}
                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">CPD progress</p>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">{learner.cpdCredits} of {learner.maxCredits} credits</p>
                        </div>
                        <span className="text-sm font-extrabold text-[#005C45]">{creditsPercent.toFixed(0)}%</span>
                      </div>
                      
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            creditsPercent >= 100 
                              ? "bg-emerald-600" 
                              : creditsPercent >= 80 
                                ? "bg-emerald-500" 
                                : creditsPercent >= 50 
                                  ? "bg-amber-500" 
                                  : "bg-amber-400"
                          }`}
                          style={{ width: `${creditsPercent}%` }} 
                        />
                      </div>
                    </div>

                    {/* 3. Pathway/cohort/location details */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Pathway</p>
                        <p className="text-sm font-semibold text-slate-900 leading-snug mt-0.5">{learner.pathway}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Cohort</p>
                        <p className="text-sm font-semibold text-slate-900 leading-snug mt-0.5">{learner.cohort}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Location</p>
                        <p className="text-sm font-semibold text-slate-900 leading-snug mt-0.5">
                          {learner.location.endsWith("State") ? learner.location : `${learner.location} State`} · {learner.lga}
                        </p>
                      </div>
                    </div>

                    {/* 4. Access and action row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 mt-auto">
                      <div className="flex items-center">
                        {learner.lowBandwidthEnabled ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-850 bg-teal-50/70 border border-teal-100/50 px-3 py-1.5 rounded-full">
                            <WifiOff className="h-3.5 w-3.5 shrink-0 text-teal-600" />
                            Low-bandwidth access
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                            Standard access
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedLearner(learner)}
                        className="h-11 px-5 bg-emerald-50 hover:bg-emerald-100 text-[#005C45] text-xs font-bold rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-3xs sm:w-auto w-full"
                      >
                        <span>View record</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-12 text-center text-xs text-slate-400 font-medium bg-white rounded-[28px] border border-slate-200">
              No learners match the current filters.
            </p>
          )}
        </div>

        {/* PREMIUM PAGINATION ENGINE */}
        <div className="border-t border-slate-200/60 bg-white px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left info: showing range of simulated records */}
          <div className="text-xs text-slate-500 font-medium order-2 sm:order-1 text-center sm:text-left">
            Showing <span className="text-slate-800 font-semibold">{filteredLearners.length === 0 ? 0 : ((currentPage - 1) * rowsPerPage) + 1}</span> to <span className="text-slate-800 font-semibold">{Math.min(currentPage * rowsPerPage, totalSimulated)}</span> of <span className="text-[#005C45] font-semibold">{totalSimulated.toLocaleString()}</span> learners
          </div>

          {/* Pagination buttons & controls */}
          <div className="flex items-center gap-2.5 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Rows per page selector (Desktop only) */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-2">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Mobile / Tablet / Desktop compact pagination */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-3xs"
              >
                <ChevronLeft className="h-3.5 w-3.5 mr-0.5 shrink-0" />
                <span>Prev</span>
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {/* Mobile indicators */}
                <span className="text-xs text-slate-500 font-semibold sm:hidden px-2">
                  Page <span className="text-slate-800">{currentPage}</span> of {totalPages}
                </span>

                {/* Desktop page number buttons */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (currentPage > 3 && totalPages > 5) {
                      pageNum = currentPage - 3 + i;
                      if (pageNum + (4 - i) > totalPages) {
                        pageNum = totalPages - 4 + i;
                      }
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-7.5 min-w-[30px] px-1.5 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#005C45] text-white shadow-3xs"
                            : "border border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="text-slate-300 text-xs px-1">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`h-7.5 min-w-[30px] px-1.5 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          currentPage === totalPages
                            ? "bg-[#005C45] text-white shadow-3xs"
                            : "border border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-3xs"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5 ml-0.5 shrink-0" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* 4.5 RECENT OPERATIONS HISTORY FEED */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-200/70 shadow-3xs text-left">
        <h3 className="text-sm font-semibold text-slate-900 font-heading">Recent learner operations</h3>
        <p className="text-xs text-slate-500 mt-0.5 font-medium mb-4">
          Recent imports, assignments, and cohort updates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { text: "126 learners imported into Kano Youth Employability Cohort 02", time: "Updated today", icon: CheckCircle2, iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100" },
            { text: "42 learners assigned to Lagos Work Readiness 01", time: "Updated yesterday", icon: User, iconColor: "text-blue-600 bg-blue-50 border-blue-100" },
            { text: "Halima Sani assigned to Kano Youth Employability Cohort 02", time: "2 days ago", icon: Award, iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100" },
            { text: "8 learner records require location correction", time: "3 days ago", icon: AlertTriangle, iconColor: "text-amber-600 bg-amber-50 border-amber-100" },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50/20 hover:bg-slate-50/50 transition-colors border border-slate-100/50 rounded-xl">
                <div className={`p-2 rounded-lg border ${item.iconColor} shrink-0`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-800 leading-snug">{item.text}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. SIDE DRAWER / BOTTOM SHEET FOR LEARNER RECORD DETAILS */}
      {selectedLearner && (() => {
        const creditsPercent = (selectedLearner.cpdCredits / selectedLearner.maxCredits) * 100;
        return (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[100] flex items-end lg:items-stretch lg:justify-end">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 bg-transparent" onClick={() => setSelectedLearner(null)} />
            
            <div className="relative bg-slate-50 w-full lg:max-w-[500px] h-[94vh] lg:h-full rounded-t-[32px] lg:rounded-t-none lg:rounded-l-[32px] shadow-2xl border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right duration-300 text-left overflow-hidden z-10">
              {/* Header */}
              <div className="p-5 md:p-6 bg-white border-b border-slate-200/60 flex justify-between items-start shrink-0">
                <div className="space-y-1">
                  <span className="inline-flex items-center text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                    Learner record
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-heading mt-1">{selectedLearner.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{selectedLearner.formattedId}</span>
                    <span className="text-slate-300">•</span>
                    <span>{selectedLearner.gender}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button 
                    onClick={() => setSelectedLearner(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer h-10 w-10 flex items-center justify-center border border-slate-100 shadow-3xs"
                    aria-label="Close learner record"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="mt-1">
                    {getStatusBadge(selectedLearner.status)}
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
                
                {/* 1. Learner summary */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Learner summary</h4>
                  <div className="space-y-2.5 divide-y divide-slate-100/50 text-xs md:text-sm font-sans">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-500 font-medium">Learner</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.name}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Learner ID</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.formattedId}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Gender</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.gender}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Status</span>
                      <span className="font-semibold text-slate-900">
                        {selectedLearner.status === "Completed" ? "Certificate ready" : selectedLearner.status === "Under Review" ? "Review pending" : selectedLearner.status === "Needs Follow-Up" ? "Needs follow-up" : selectedLearner.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Pathway and cohort */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Pathway and cohort</h4>
                  <div className="space-y-2.5 divide-y divide-slate-100/50 text-xs md:text-sm font-sans">
                    <div className="flex justify-between items-start py-0.5">
                      <span className="text-slate-500 font-medium shrink-0 pt-0.5">Pathway</span>
                      <span className="text-slate-900 font-semibold text-right max-w-[240px] leading-snug">{selectedLearner.pathway}</span>
                    </div>
                    <div className="flex justify-between items-start pt-2.5">
                      <span className="text-slate-500 font-medium shrink-0 pt-0.5">Cohort</span>
                      <span className="text-slate-900 font-semibold text-right max-w-[240px] leading-snug">{selectedLearner.cohort}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">State</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.location} State</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">LGA</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.lga}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Facilitator</span>
                      <span className="text-slate-900 font-semibold">Halima Sani</span>
                    </div>
                  </div>
                </div>

                {/* 3. Progress and CPD */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Progress and CPD</h4>
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-xs md:text-sm font-sans">
                      <span className="text-slate-500 font-medium">CPD credits</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.cpdCredits} of {selectedLearner.maxCredits} credits</span>
                    </div>
                    <div className="flex justify-between items-center text-xs md:text-sm font-sans">
                      <span className="text-slate-500 font-medium">Progress</span>
                      <span className="text-[#005C45] font-semibold">{creditsPercent.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          creditsPercent >= 80 ? "bg-emerald-600" : creditsPercent >= 50 ? "bg-amber-500" : "bg-rose-500"
                        }`} 
                        style={{ width: `${creditsPercent}%` }} 
                      />
                    </div>
                    <p className="text-xs text-slate-500 leading-normal font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {creditsPercent >= 100 
                        ? "Learner has completed the CPD credit requirement for certificate review." 
                        : "Learner is actively progressing through the required modules to meet the qualification threshold."}
                    </p>
                  </div>
                </div>

                {/* 4. Assessment and attendance */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Assessment and attendance</h4>
                  <div className="space-y-3 divide-y divide-slate-100/50 text-xs md:text-sm font-sans">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-500 font-medium">Assessment</span>
                      <span className="inline-flex items-center text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/30">
                        Reviewed
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-slate-500 font-medium">Attendance</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-semibold">{selectedLearner.attendanceRate}%</span>
                        <span className="inline-flex items-center text-xs font-medium text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/30">
                          Confirmed
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-slate-500 font-medium shrink-0">Required session</span>
                      <span className="inline-flex items-center text-xs font-medium text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100/30">
                        Attended
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Low-bandwidth access */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Low-bandwidth access</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-teal-50/45 p-3 rounded-xl border border-teal-100/30 text-teal-950 flex gap-2">
                    <WifiOff className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>Learner uses lightweight pages, offline packs, and saved drafts to continue learning with limited connectivity.</span>
                  </p>
                  <div className="space-y-2.5 divide-y divide-slate-100/50 text-xs md:text-sm font-sans">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-500 font-medium">Access mode</span>
                      <span className="text-teal-900 font-semibold">{selectedLearner.lowBandwidthEnabled ? "Low-bandwidth access" : "Standard access"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Offline packs</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.lowBandwidthEnabled ? "Available" : "Not required"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Saved drafts</span>
                      <span className="text-slate-900 font-semibold">{selectedLearner.lowBandwidthEnabled ? "Enabled" : "Standard"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Waiting to upload</span>
                      <span className="text-slate-900 font-semibold">0 items</span>
                    </div>
                  </div>
                </div>

                {/* 6. Certificate readiness */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Certificate readiness</h4>
                  
                  {/* Checklist */}
                  <div className="space-y-2 text-xs md:text-sm font-sans">
                    <div className="flex items-center gap-2.5 py-0.5">
                      <span className="h-4 w-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="text-slate-700 font-medium">CPD credits complete</span>
                    </div>
                    <div className="flex items-center gap-2.5 py-0.5">
                      <span className="h-4 w-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="text-slate-700 font-medium">Assessment reviewed</span>
                    </div>
                    <div className="flex items-center gap-2.5 py-0.5">
                      <span className="h-4 w-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                      <span className="text-slate-700 font-medium">Attendance confirmed</span>
                    </div>
                    <div className="flex items-center gap-2.5 py-0.5">
                      <span className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 border ${
                        selectedLearner.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-300 border-slate-200"
                      }`}>
                        {selectedLearner.status === "Completed" ? <Check className="h-3 w-3 stroke-[3]" /> : <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />}
                      </span>
                      <span className="text-slate-700 font-medium">Programme approval required</span>
                    </div>
                  </div>

                  <div className="pt-2.5 flex justify-between items-center text-xs md:text-sm border-t border-slate-100">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="text-[#005C45] font-semibold">{selectedLearner.status === "Completed" ? "Ready for review" : "In progress"}</span>
                  </div>

                  <button
                    onClick={() => setShowCertificateReviewModal(true)}
                    className="w-full py-2.5 bg-emerald-50/50 hover:bg-emerald-100/50 border border-emerald-100 text-[#005C45] text-xs font-semibold rounded-xl transition-all cursor-pointer text-center mt-1"
                  >
                    Open certificate review
                  </button>
                </div>

                {/* 7. Support notes */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Support notes</h4>
                  <div className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    {selectedLearner.status === "Needs Follow-Up" ? (
                      <span className="text-rose-900 flex gap-2">
                        <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>Learner has been inactive for 14+ days. Facilitator follow-up recommended.</span>
                      </span>
                    ) : (
                      <span className="text-slate-600">No open support ticket for this learner.</span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowSupportRecordModal(true)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
                  >
                    Open support record
                  </button>
                </div>

              </div>

              {/* 8. Actions Sticky footer with responsive layout */}
              <div className="p-4 md:p-5 border-t border-slate-200/60 bg-white shrink-0 flex items-center justify-between gap-3 shadow-md pb-[calc(1rem+env(safe-area-inset-bottom))] lg:pb-5">
                <button 
                  onClick={() => setSelectedLearner(null)}
                  className="px-4 py-2.5 hover:bg-slate-100 text-slate-500 text-xs font-semibold rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200"
                >
                  Close
                </button>
                
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => setShowFollowUpModal(true)}
                    className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Send follow-up
                  </button>
                  <button 
                    onClick={() => setShowCertificateReviewModal(true)}
                    className="px-4 py-2.5 bg-[#005C45] hover:bg-[#004A37] active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    {selectedLearner.status === "Completed" ? "Issue Certificate" : "Review Progress"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 6. PROTOTYPE SAFE INTERACTIVE MODALS */}
      
      {/* Import Learners Modal (4-step interactive wizard) */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-[110] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-2xl max-w-lg w-full p-6 text-left space-y-5 animate-in zoom-in-95 duration-200 my-8">
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100/60 font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider">
                  Roster Import
                </span>
                <h3 className="text-base font-bold text-slate-950">Import Learners</h3>
              </div>
              <button 
                onClick={() => {
                  setShowImportModal(false);
                  setImportStep(1);
                  setImportFileName("");
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer border border-slate-100"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
              {[
                { label: "Upload", active: importStep >= 1 },
                { label: "Map Columns", active: importStep >= 2 },
                { label: "Review", active: importStep >= 3 },
                { label: "Confirm", active: importStep >= 4 }
              ].map((step, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${step.active ? "bg-[#005C45]" : "bg-slate-100"}`} />
                  <span className={step.active ? "text-[#005C45]" : "text-slate-400"}>{step.label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: Upload File */}
            {importStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Upload a spreadsheet of learner records (.csv, .xlsx) to import them in bulk.
                </p>

                {/* Drag and Drop Zone */}
                <div 
                  onClick={() => {
                    setImportFileName("sustain_learner_roster_q3.csv");
                  }}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 hover:bg-slate-50/50 ${
                    importFileName ? "border-[#005C45] bg-emerald-50/10" : "border-slate-200 bg-slate-50/30"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2.5">
                    <div className={`p-3 rounded-xl border ${importFileName ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-white text-slate-400 border-slate-100"}`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    {importFileName ? (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900">{importFileName}</p>
                        <p className="text-[10px] text-[#005C45] font-semibold">Ready to map columns · 28.4 KB</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-700">Drag & drop your file here, or <span className="text-[#005C45] hover:underline">browse</span></p>
                        <p className="text-[10px] text-slate-400 font-medium">Supports CSV, XLS, XLSX up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-blue-50/35 border border-blue-100 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-blue-600" />
                    <span className="text-[11px] font-semibold text-slate-750">Need the correct template structure?</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      showToast("Learner import template is prepared for this prototype and can be connected during production setup.");
                    }}
                    className="text-[11px] font-bold text-[#005C45] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Download Template</span>
                  </button>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    disabled={!importFileName}
                    onClick={() => setImportStep(2)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Map Columns</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Match Columns */}
            {importStep === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  We've auto-matched some columns. Confirm or adjust the spreadsheet column mappings.
                </p>

                <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                  {[
                    { target: "Full Name", match: "Learner Name", required: true },
                    { target: "Email or Phone", match: "Contact Info", required: true },
                    { target: "Gender", match: "Gender", required: false },
                    { target: "State of Residence", match: "State", required: true },
                    { target: "LGA of Residence", match: "LGA", required: true },
                    { target: "Pathway", match: "Course Pathway", required: true },
                  ].map((field, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50/60 border border-slate-100 rounded-xl text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{field.target}</span>
                        {field.required && <span className="text-red-500 ml-0.5">*</span>}
                      </div>
                      <select 
                        defaultValue={field.match}
                        className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                      >
                        <option value={field.match}>{field.match}</option>
                        <option value="unmatched">Do not import</option>
                        <option value="alternative">Column Alternative</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => setImportStep(1)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      setIsImporting(true);
                      setImportProgress(0);
                      let currentProgress = 0;
                      const interval = setInterval(() => {
                        currentProgress += 10;
                        setImportProgress(currentProgress);
                        if (currentProgress >= 100) {
                          clearInterval(interval);
                          setIsImporting(false);
                          setImportStep(3);
                        }
                      }, 100);
                    }}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Validate Records</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review Validation Records */}
            {importStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-850">Validation Complete</h4>
                    <p className="text-[10px] text-slate-450 font-semibold mt-0.5">
                      126 records parsed · 1 duplicate · 1 needs correction
                    </p>
                  </div>
                </div>

                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {/* Clean Record */}
                  <div className="p-3 bg-emerald-50/20 border border-emerald-100/40 rounded-xl space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900">Aisha Mohammed</span>
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Ready
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">
                      Kano State · Kano Municipal · Youth Employability Pathway
                    </p>
                  </div>

                  {/* LGA Warning Record */}
                  <div className="p-3 bg-amber-50/25 border border-amber-100/50 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-900">John Okechukwu</span>
                      <span className="inline-flex items-center text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100/30">
                        Needs LGA Correction
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-450 font-bold uppercase shrink-0">Select LGA:</span>
                      <select 
                        value={importCorrectedLga}
                        onChange={(e) => setImportCorrectedLga(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg px-2 py-0.5 text-[11px] font-bold text-slate-800 focus:outline-hidden cursor-pointer"
                      >
                        <option value="Kano Municipal">Kano Municipal</option>
                        <option value="Wamako">Wamako</option>
                        <option value="Ikeja">Ikeja</option>
                      </select>
                    </div>
                  </div>

                  {/* Duplicate Record */}
                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-800">Fatima Ibrahim</span>
                      <span className="inline-flex items-center text-[10px] font-bold text-slate-550 bg-slate-100 px-2 py-0.5 rounded-full">
                        Duplicate (Skip)
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-450 font-medium italic">
                      Matching phone number already registered under Learner ID #L-KAN-045
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => setImportStep(2)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      setIsImporting(true);
                      setTimeout(() => {
                        setIsImporting(false);
                        setImportStep(4);
                        showToast("Roster imported successfully!");
                      }, 1000);
                    }}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-3xs"
                  >
                    <span>Import 126 Learners</span>
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Import Confirmed */}
            {importStep === 4 && (
              <div className="space-y-4 text-center py-4">
                <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mx-auto animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h4 className="text-base font-extrabold text-slate-900 font-heading">Roster Import Confirmed</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    126 learners have been registered inside SUSTAIN LMS. You can now bulk assign them to delivery cohorts and pathways.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setShowImportModal(false);
                      setImportStep(1);
                      setImportFileName("");
                    }}
                    className="w-full py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Export List Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl max-w-md w-full p-6 text-left space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200 font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                  Data Operations
                </span>
                <h3 className="text-base font-bold text-slate-950">Export Learners</h3>
              </div>
              <button 
                onClick={() => {
                  setShowExportModal(false);
                  setIsExporting(false);
                  setExportProgress(0);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            
            {!isExporting ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Select your desired document layout and compile the roster list. Currently exporting <span className="text-[#005C45] font-extrabold">{filteredLearners.length} active matching records</span>.
                </p>

                {/* Format choice radio cards */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setExportType("csv")}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all space-y-1.5 group ${
                      exportType === "csv"
                        ? "border-[#005C45] bg-emerald-50/10"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-colors ${
                      exportType === "csv" ? "border-[#005C45] bg-[#005C45]" : "border-slate-300"
                    }`}>
                      {exportType === "csv" && <span className="h-1.5 w-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Standard CSV</h4>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Raw comma-separated table data. Best for Excel or database import.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setExportType("pdf")}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all space-y-1.5 group ${
                      exportType === "pdf"
                        ? "border-[#005C45] bg-emerald-50/10"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-colors ${
                      exportType === "pdf" ? "border-[#005C45] bg-[#005C45]" : "border-slate-300"
                    }`}>
                      {exportType === "pdf" && <span className="h-1.5 w-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">PDF Summary</h4>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Print-ready styled layout with aggregated KPI tables.
                      </p>
                    </div>
                  </button>
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setIsExporting(true);
                      setExportProgress(0);
                    }}
                    className="flex-1 py-2.5 bg-[#005C45] text-white font-bold text-xs rounded-xl hover:bg-[#004A37] transition-all cursor-pointer text-center shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Compile Export</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5 py-4 text-center">
                {exportProgress < 100 ? (
                  <div className="space-y-4">
                    <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute h-full bg-[#005C45] transition-all duration-300 rounded-full"
                        style={{ width: `${exportProgress}%` }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">Compiling dataset files...</h4>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        Progress: {exportProgress}%
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mx-auto">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 font-heading">Roster Compiled Successfully</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        Your file <span className="text-slate-900 font-semibold">sustain_learners_export.{exportType}</span> is ready! This is a mock prototype simulation file.
                      </p>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button 
                        onClick={() => {
                          setShowExportModal(false);
                          setIsExporting(false);
                          setExportProgress(0);
                          showToast(`Downloaded sustain_learners_export.${exportType}`);
                        }}
                        className="flex-1 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-xs"
                      >
                        Download Document
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Certificate Review Modal */}
      {showCertificateReviewModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-left space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div className="bg-emerald-50 text-[#005C45] p-3 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <button 
                onClick={() => setShowCertificateReviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-slate-950">Certificate Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Reviewing certificate eligibility for <span className="text-slate-900 font-bold">{selectedLearner?.name}</span> ({selectedLearner?.formattedId}).
              </p>
              
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-500 font-medium">
                  <span>Pathway complete</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">100%</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 font-medium">
                  <span>Attendance standard</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Met ({selectedLearner?.attendanceRate}%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 font-medium">
                  <span>Facilitator verification</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Approved</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                This process prepares credentials for digital sign-off. On production, signing is processed using public keys.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setShowCertificateReviewModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-250 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowCertificateReviewModal(false);
                  showToast("Certificate issue signed and queued for dispatch!");
                }}
                className="flex-1 py-2.5 bg-[#005C45] text-white font-bold text-xs rounded-xl hover:bg-[#004A37] transition-all cursor-pointer text-center shadow-xs"
              >
                Sign & Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Record Modal */}
      {showSupportRecordModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-left space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl border border-amber-100">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <button 
                onClick={() => setShowSupportRecordModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-slate-950">Support Record</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Facilitator and regional coordinator support log for <span className="text-slate-900 font-bold">{selectedLearner?.name}</span>.
              </p>
              
              <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-sans space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase">
                    <span>Facilitator Log</span>
                    <span>1 week ago</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium italic">
                    "Called learner regarding 2 missing sessions. Connectivity issue resolved with a regional offline package download."
                  </p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-sans space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase">
                    <span>System Notice</span>
                    <span>2 weeks ago</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    Auto-alert triggered: Low engagement flag on module 3.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setShowSupportRecordModal(false)}
                className="flex-1 py-2.5 bg-[#005C45] text-white font-bold text-xs rounded-xl hover:bg-[#004A37] transition-all cursor-pointer text-center shadow-xs"
              >
                Close Logs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Follow-up Modal */}
      {showFollowUpModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-left space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100">
                <HelpCircle className="h-6 w-6" />
              </div>
              <button 
                onClick={() => setShowFollowUpModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-base font-extrabold text-slate-950">Send Follow-up</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Choose a follow-up template to prompt learner <span className="text-slate-900 font-bold">{selectedLearner?.name}</span> or their facilitator.
              </p>
              
              <div className="space-y-2 text-xs font-sans font-medium">
                <label className="text-slate-400 text-[10px] uppercase font-bold">Template Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer">
                  <option>Attendance reminder (SMS)</option>
                  <option>CPD requirements update (Email)</option>
                  <option>Low-bandwidth pack invitation (WhatsApp)</option>
                </select>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-sans text-slate-600 leading-relaxed font-medium italic mt-1">
                "Hello {selectedLearner?.name}, Halima Sani from SUSTAIN LMS here. Let's get together on your remaining {selectedLearner ? selectedLearner.maxCredits - selectedLearner.cpdCredits : 0} CPD credits. We have offline study packs available if connectivity is a challenge."
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => setShowFollowUpModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowFollowUpModal(false);
                  showToast(`Follow-up sent successfully to ${selectedLearner?.name}!`);
                }}
                className="flex-1 py-2.5 bg-[#005C45] text-white font-bold text-xs rounded-xl hover:bg-[#004A37] transition-all cursor-pointer text-center shadow-xs"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selection Assistant Modal */}
      {isSelectionAssistantOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-left space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100/60 font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                  Bulk Operations
                </span>
                <h3 className="text-base font-bold text-slate-950">Bulk Assign Learners</h3>
              </div>
              <button 
                onClick={() => setIsSelectionAssistantOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Choose how you want to select learners for batch cohort assignment or pathway migration.
            </p>

            <div className="space-y-2.5">
              {/* Option 1: Select from current list */}
              <button
                onClick={() => {
                  setIsSelectionAssistantOpen(false);
                  setIsSelectionMode(true);
                  setSelectedLearnerIds([]);
                  showToast("Manual selection activated. Use checkboxes to choose learners.");
                }}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#005C45] hover:bg-emerald-50/15 transition-all flex items-start gap-3 cursor-pointer group"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-[#005C45] transition-colors shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Select from current list</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    Activate checkboxes on the table/cards to manually select specific learners.
                  </p>
                </div>
              </button>

              {/* Option 2: Select all matching filters */}
              <button
                onClick={() => {
                  setIsSelectionAssistantOpen(false);
                  setIsSelectionMode(true);
                  // Select all matching IDs
                  const allIds = filteredLearners.map(l => l.id);
                  setSelectedLearnerIds(allIds);
                  showToast(`Batch selected all ${allIds.length} learners matching current filters!`);
                }}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#005C45] hover:bg-emerald-50/15 transition-all flex items-start gap-3 cursor-pointer group"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-[#005C45] transition-colors shrink-0">
                  <Filter className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Select all matching filters</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    Select all {filteredLearners.length} learners that currently match your search and filter criteria.
                  </p>
                </div>
              </button>

              {/* Option 3: Upload learner list */}
              <button
                onClick={() => {
                  setIsSelectionAssistantOpen(false);
                  setImportStep(1);
                  setImportFileName("");
                  setImportProgress(0);
                  setIsImporting(false);
                  setShowImportModal(true);
                }}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#005C45] hover:bg-emerald-50/15 transition-all flex items-start gap-3 cursor-pointer group"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-[#005C45] transition-colors shrink-0">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Upload learner list</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    Import a new spreadsheet/CSV roster to automatically register and assign learners.
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-1">
              <button 
                onClick={() => setIsSelectionAssistantOpen(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center animate-pulse"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Assign Learners Modal (3-step interactive flow) */}
      {isBulkAssignOpen && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-[110] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-2xl max-w-lg w-full p-6 text-left space-y-5 animate-in zoom-in-95 duration-200 my-8">
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100/60 font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider">
                  Bulk Operations
                </span>
                <h3 className="text-base font-bold text-slate-950">Bulk Assign Learners</h3>
              </div>
              <button 
                onClick={() => {
                  setIsBulkAssignOpen(false);
                  setBulkAssignStep(1);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer border border-slate-100"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Stepper Indicators */}
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
              {[
                { label: "Destination", active: bulkAssignStep >= 1 },
                { label: "Facilitator", active: bulkAssignStep >= 2 },
                { label: "Confirm", active: bulkAssignStep >= 3 }
              ].map((step, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${step.active ? "bg-[#005C45]" : "bg-slate-100"}`} />
                  <span className={step.active ? "text-[#005C45]" : "text-slate-400"}>{step.label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: Destination Setup */}
            {bulkAssignStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Select the delivery pathway, geographical filters, and target cohort for the <span className="text-[#005C45] font-bold">{selectedLearnerIds.length || filteredLearners.length} selected learners</span>.
                </p>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target Pathway</label>
                    <select 
                      value={bulkAssignPathway}
                      onChange={(e) => setBulkAssignPathway(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Youth Employability Pathway">Youth Employability Pathway</option>
                      <option value="Advanced Digital Tech Pathway">Advanced Digital Tech Pathway</option>
                      <option value="Green Economy & Agritech">Green Economy & Agritech</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target State</label>
                      <select 
                        value={bulkAssignState}
                        onChange={(e) => setBulkAssignState(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                      >
                        {nigeriaStates.map((st) => (
                          <option key={st.slug} value={st.name}>{st.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target LGA</label>
                      <select 
                        value={bulkAssignLga}
                        onChange={(e) => setBulkAssignLga(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                      >
                        {getLGAsByState(bulkAssignState).map((lg) => (
                          <option key={lg.slug} value={lg.name}>{lg.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target Cohort</label>
                    <select 
                      value={bulkAssignCohort}
                      onChange={(e) => setBulkAssignCohort(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Lagos Work Readiness 01">Lagos Work Readiness 01 (Lagos · Ikeja)</option>
                      <option value="Kano Youth Employability 02">Kano Youth Employability 02 (Kano · Kano Municipal)</option>
                      <option value="Kaduna Agritech Pilot">Kaduna Agritech Pilot (Kaduna · Kaduna North)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => setBulkAssignStep(2)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Facilitator</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Facilitator Selection */}
            {bulkAssignStep === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Assign a lead facilitator to handle regional CPD activities, portfolio reviews, and localized low-bandwidth support for this batch.
                </p>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Lead Facilitator</label>
                    <select 
                      value={bulkAssignFacilitator}
                      onChange={(e) => setBulkAssignFacilitator(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Adewale Okoye">Adewale Okoye (Lagos Central Hub · Active)</option>
                      <option value="Aminu Yusuf">Aminu Yusuf (Kano Municipal · Active)</option>
                      <option value="Chinedu Obi">Chinedu Obi (Enugu North · Active)</option>
                    </select>
                  </div>

                  <div className="p-3.5 bg-blue-50/45 border border-blue-100 rounded-2xl text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-blue-700 font-bold">
                      <User className="h-4 w-4 shrink-0" />
                      <span>Facilitator Load Review</span>
                    </div>
                    <p className="text-slate-650 font-medium leading-relaxed">
                      {bulkAssignFacilitator} currently monitors 32 active portfolios (Low load). Handing over these records will add safe localized work tracking.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => setBulkAssignStep(1)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setBulkAssignStep(3)}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Review & Confirm</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review and Confirm */}
            {bulkAssignStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-2xl space-y-3 text-xs text-slate-700">
                  <div className="flex justify-between items-center pb-2 border-b border-emerald-100/30">
                    <span className="font-medium">Total learners assigned</span>
                    <span className="text-[#005C45] font-extrabold text-sm">{selectedLearnerIds.length || filteredLearners.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Pathway</span>
                    <span className="text-slate-900 font-bold">{bulkAssignPathway}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Target State & LGA</span>
                    <span className="text-slate-900 font-bold">{bulkAssignState} · {bulkAssignLga}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cohort assignment</span>
                    <span className="text-slate-900 font-bold">{bulkAssignCohort}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Assigned Lead Facilitator</span>
                    <span className="text-slate-900 font-bold">{bulkAssignFacilitator}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium leading-normal">
                  By confirming, all selected records will transition to "{bulkAssignCohort}". If any of these learners have pre-existing courses, progress portfolios are preserved.
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => setBulkAssignStep(2)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      setIsBulkAssignOpen(false);
                      setIsSelectionMode(false);
                      setSelectedLearnerIds([]);
                      showToast(`Bulk assignment of learners completed successfully!`);
                    }}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Confirm Assignment</span>
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProgrammeLearners;
