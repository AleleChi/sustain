import { useState, useMemo, useEffect } from "react";
import { 
  BarChart3, 
  FileSpreadsheet, 
  Award, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Percent, 
  Printer, 
  Download,
  Info,
  Calendar,
  Layers,
  Activity,
  WifiOff,
  Filter,
  Users2,
  X,
  Check,
  MapPin,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  FileText,
  AlertCircle
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { nigeriaStates, getLGAsByState } from "../../data/nigeriaLocations";

export function ProgrammeReports() {
  const { showToast, navigateTo } = useRoute();
  
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<"overall" | "location" | "gender" | "pathway" | "certificates" | "bandwidth">("overall");

  // Filters State
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedLga, setSelectedLga] = useState<string>("All");
  const [selectedPathway, setSelectedPathway] = useState<string>("All");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedCohort, setSelectedCohort] = useState<string>("All");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("Last 30 Days");

  // Show more locations count on mobile
  const [visibleLocations, setVisibleLocations] = useState<number>(5);

  // Collapse filters state for mobile devices
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);

  // Export Modal State
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv");
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    location: true,
    gender: true,
    pathway: true,
    pipeline: true,
    bandwidth: true,
  });
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportDone, setExportDone] = useState<boolean>(false);

  // Reset LGA when State changes
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedLga("All");
  };

  // Dependent LGA Options
  const availableLgas = useMemo(() => {
    if (selectedState === "All") return [];
    return getLGAsByState(selectedState);
  }, [selectedState]);

  // Active filter count and list for chips
  const activeFilters = useMemo(() => {
    const list = [];
    if (selectedDateRange !== "Last 30 Days") {
      list.push({ id: "dateRange", label: `Date: ${selectedDateRange}`, reset: () => setSelectedDateRange("Last 30 Days") });
    }
    if (selectedPathway !== "All") {
      list.push({ id: "pathway", label: `Pathway: ${selectedPathway.replace(" Pathway", "")}`, reset: () => setSelectedPathway("All") });
    }
    if (selectedState !== "All") {
      list.push({ id: "state", label: `State: ${selectedState}`, reset: () => handleStateChange("All") });
    }
    if (selectedLga !== "All") {
      list.push({ id: "lga", label: `LGA: ${selectedLga}`, reset: () => setSelectedLga("All") });
    }
    if (selectedGender !== "All") {
      list.push({ id: "gender", label: `Gender: ${selectedGender}`, reset: () => setSelectedGender("All") });
    }
    if (selectedCohort !== "All") {
      list.push({ id: "cohort", label: `Cohort: ${selectedCohort.replace("Cohort ", "")}`, reset: () => setSelectedCohort("All") });
    }
    return list;
  }, [selectedDateRange, selectedPathway, selectedState, selectedLga, selectedGender, selectedCohort]);

  const handleResetAllFilters = () => {
    setSelectedDateRange("Last 30 Days");
    setSelectedPathway("All");
    setSelectedState("All");
    setSelectedLga("All");
    setSelectedGender("All");
    setSelectedCohort("All");
    showToast("All filters have been reset to their defaults.");
  };

  // Trigger Export Compilation Simulation
  const handleOpenExport = (format: "csv" | "pdf") => {
    setExportFormat(format);
    setExportProgress(0);
    setExportDone(false);
    setIsExporting(false);
    setShowExportModal(true);
  };

  const handleStartExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportDone(false);
  };

  useEffect(() => {
    let interval: any;
    if (isExporting) {
      interval = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsExporting(false);
            setExportDone(true);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExporting]);

  const handleDownloadExportedFile = () => {
    setShowExportModal(false);
    showToast(`sustain_reports_export.${exportFormat} downloaded successfully.`);
  };

  // Toggle Section selection in Export
  const toggleExportSection = (sectionKey: keyof typeof selectedSections) => {
    setSelectedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Mock State & LGA Participation Data (synced with Nigeria Location dataset)
  const rawLocationData = [
    { state: "Kano", lga: "Kano Municipal", learners: 1250, active: 950, rate: 76, cpdReady: 350, certReady: 98, lowBandwidth: 775 },
    { state: "Kaduna", lga: "Kaduna North", learners: 960, active: 780, rate: 81, cpdReady: 270, certReady: 85, lowBandwidth: 600 },
    { state: "Lagos", lga: "Ikeja", learners: 950, active: 840, rate: 88, cpdReady: 310, certReady: 110, lowBandwidth: 380 },
    { state: "FCT", lga: "Municipal Area Council (AMAC)", learners: 420, active: 340, rate: 81, cpdReady: 120, certReady: 42, lowBandwidth: 140 },
    { state: "Oyo", lga: "Oyo West", learners: 310, active: 226, rate: 73, cpdReady: 80, certReady: 22, lowBandwidth: 160 },
    { state: "Enugu", lga: "Enugu North", learners: 246, active: 184, rate: 75, cpdReady: 74, certReady: 15, lowBandwidth: 102 },
    { state: "Kano", lga: "Fagge", learners: 430, active: 310, rate: 72, cpdReady: 110, certReady: 32, lowBandwidth: 290 },
    { state: "Kaduna", lga: "Zaria", learners: 390, active: 290, rate: 74, cpdReady: 95, certReady: 28, lowBandwidth: 250 },
    { state: "Lagos", lga: "Alimosho", learners: 520, active: 450, rate: 86, cpdReady: 160, certReady: 55, lowBandwidth: 190 },
    { state: "Oyo", lga: "Ibadan North", learners: 280, active: 210, rate: 75, cpdReady: 72, certReady: 18, lowBandwidth: 130 },
  ];

  // Dynamically Filtered Location Data
  const stateLgaData = useMemo(() => {
    return rawLocationData.filter(item => {
      const matchesState = selectedState === "All" || item.state.toLowerCase() === selectedState.toLowerCase();
      const matchesLga = selectedLga === "All" || item.lga.toLowerCase() === selectedLga.toLowerCase();
      return matchesState && matchesLga;
    });
  }, [selectedState, selectedLga]);

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300 pb-28 lg:pb-8">
      
      {/* 1. REPORTS HERO */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-3xs flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              SUSTAIN CPD Programme
            </span>
            <span className="text-[10px] bg-slate-50 text-slate-650 border border-slate-200 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Nigeria-wide implementation
            </span>
            <span className="text-[10px] bg-teal-50/50 text-teal-850 border border-teal-100/50 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Gender-disaggregated reporting
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Reports and Insights</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Track learner participation, completion, CPD readiness, certificate review, and location coverage across SUSTAIN LMS.
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-2 pt-2 md:pt-0 shrink-0">
          <button 
            onClick={() => handleOpenExport("csv")}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-[#005C45] bg-emerald-50 hover:bg-[#005C45] hover:text-white rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-3xs"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => handleOpenExport("pdf")}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* 2. REPORT CONTEXT CARD */}
      <div className="bg-emerald-50/20 border border-emerald-100/40 p-4 rounded-2xl flex items-start gap-3 text-xs leading-relaxed">
        <Info className="h-4.5 w-4.5 text-[#005C45] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-900">Report context</h4>
          <p className="text-slate-600 font-medium mt-0.5">
            Use these reports to monitor learner participation, cohort progress, CPD readiness, certificate review, and low-bandwidth access. Filters apply across the report sections below.
          </p>
        </div>
      </div>

      {/* 3. FILTER REPORTS SECTION */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-3xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[#005C45]">
            <Filter className="h-4.5 w-4.5" />
            <div>
              <span className="text-sm font-bold text-slate-900 block">Filter reports</span>
              <span className="text-[10px] text-slate-450 font-medium block">Refine results by time period, pathway, location, gender, and cohort.</span>
            </div>
          </div>
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="text-xs text-[#005C45] hover:text-[#003B2C] font-semibold flex items-center gap-1 self-start sm:self-center bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60 transition-all"
          >
            <span>{showMoreFilters ? "Show less" : "More filters"}</span>
            {showMoreFilters ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {/* Always Visible Filter 1: Date Range */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-500 font-semibold">Date range</label>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="Last 30 Days">Last 30 days</option>
              <option value="Last 90 Days">Last 90 days</option>
              <option value="Year to Date">Year to date</option>
              <option value="All Time">All time</option>
            </select>
          </div>

          {/* Always Visible Filter 2: State */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-500 font-semibold">State</label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="All">All states</option>
              {nigeriaStates.map(state => (
                <option key={state.slug} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>

          {/* Hidden/Collapsed Filters for Mobile/Tablet or always visible on desktop */}
          <div className={`contents ${showMoreFilters ? "" : "hidden lg:contents"}`}>
            {/* Dependent LGA Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 font-semibold">LGA</label>
              <select
                value={selectedLga}
                onChange={(e) => setSelectedLga(e.target.value)}
                disabled={selectedState === "All"}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:outline-hidden disabled:opacity-50"
              >
                <option value="All">All LGAs</option>
                {availableLgas.map(lga => (
                  <option key={lga.slug} value={lga.name}>{lga.name}</option>
                ))}
              </select>
            </div>

            {/* Pathway Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 font-semibold">Pathway</label>
              <select
                value={selectedPathway}
                onChange={(e) => setSelectedPathway(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="All">All pathways</option>
                <option value="Youth Employability Pathway">Youth Employability</option>
                <option value="Agribusiness SME Growth Pathway">Agribusiness SME</option>
                <option value="TVET Instructor CPD Pathway">TVET Instructor</option>
              </select>
            </div>

            {/* Gender Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 font-semibold">Gender</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="All">All genders</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Not specified">Not specified</option>
              </select>
            </div>

            {/* Cohort Filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-500 font-semibold">Cohort</label>
              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 rounded-xl py-2.5 px-3 text-xs text-slate-700 font-medium focus:outline-hidden"
              >
                <option value="All">All cohorts</option>
                <option value="Kano Youth Employability Cohort 02">Kano Youth 02</option>
                <option value="Kaduna Agribusiness SME Cohort 01">Kaduna SME 01</option>
                <option value="Lagos TVET Instructor CPD Cohort 01">Lagos TVET 01</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Active filters:</span>
            {activeFilters.map((chip) => (
              <span 
                key={chip.id} 
                className="inline-flex items-center gap-1 bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-[10px] font-semibold"
              >
                <span>{chip.label}</span>
                <button 
                  onClick={chip.reset}
                  className="hover:bg-slate-200 p-0.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3 text-slate-450" />
                </button>
              </span>
            ))}
            <button
              onClick={handleResetAllFilters}
              className="text-xs text-[#005C45] hover:underline font-bold ml-auto cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* 4. KEY PROGRAMME INDICATORS */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {/* Learners Enrolled */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-3xs flex flex-col justify-between min-h-[120px] sm:min-h-[140px] space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Learners enrolled</span>
            <p className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">4,286</p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#005C45] rounded-full" style={{ width: "43%" }} />
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">43% of 10,000 target reached</p>
          </div>
        </div>

        {/* CPD Ready */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-3xs flex flex-col justify-between min-h-[120px] sm:min-h-[140px] space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">CPD ready</span>
            <p className="text-xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight">1,204 <span className="text-xs font-semibold text-slate-400">learners</span></p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: "28%" }} />
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">28% of enrolled learners</p>
          </div>
        </div>

        {/* Certificates Issued */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-3xs flex flex-col justify-between min-h-[120px] sm:min-h-[140px] space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Certificates issued</span>
            <p className="text-xl sm:text-3xl font-extrabold text-amber-800 tracking-tight">532</p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "63%" }} />
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">312 ready for review</p>
          </div>
        </div>

        {/* Low-Bandwidth Access */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-3xs flex flex-col justify-between min-h-[120px] sm:min-h-[140px] space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Low-bandwidth access</span>
            <p className="text-xl sm:text-3xl font-extrabold text-teal-800 tracking-tight">2,679 <span className="text-xs font-semibold text-slate-400">learners</span></p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: "62.5%" }} />
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">62.5% using lightweight access</p>
          </div>
        </div>

        {/* Course Completion */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-3xs flex flex-col justify-between min-h-[120px] sm:min-h-[140px] space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Course completion</span>
            <p className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">61%</p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#005C45] rounded-full" style={{ width: "61%" }} />
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">Across active pathways</p>
          </div>
        </div>

        {/* Assessment Completion */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-3xs flex flex-col justify-between min-h-[120px] sm:min-h-[140px] space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs text-slate-400 font-semibold block">Assessment completion</span>
            <p className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">74%</p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-500 rounded-full" style={{ width: "74%" }} />
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">Submitted or reviewed</p>
          </div>
        </div>
      </div>

      {/* 5. REPORT NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-5 pt-2">
        {[
          { id: "overall", label: "Programme summary" },
          { id: "location", label: "Location coverage" },
          { id: "gender", label: "Gender participation" },
          { id: "pathway", label: "Pathway and CPD progress" },
          { id: "certificates", label: "Certificate pipeline" },
          { id: "bandwidth", label: "Low-bandwidth access" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs font-bold transition-all relative shrink-0 cursor-pointer ${
              activeTab === tab.id 
                ? "text-[#005C45]" 
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#005C45] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* 6. TAB CONTENTS */}

      {/* Tab Panel 1: Programme Summary */}
      {activeTab === "overall" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-5 sm:p-7 rounded-[28px] border border-slate-200/70 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Programme summary</h3>
              <p className="text-xs text-slate-500">A high-level view of learner activity, completion, CPD readiness, and certificate movement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target and cohort health */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/70 shadow-3xs flex flex-col justify-between space-y-5">
                <span className="text-sm font-bold text-slate-900 block">Target and cohort health</span>
                
                <div className="space-y-4 text-xs">
                  {/* Row 1: Learner target */}
                  <div className="space-y-1.5 py-0.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <span className="font-semibold text-slate-700 text-xs">Learner target</span>
                      <span className="text-xs font-bold text-slate-900">4,286 of 10,000 learners</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#005C45] rounded-full" style={{ width: "43%" }} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      43% reached
                    </div>
                  </div>

                  {/* Row 2: Active learners */}
                  <div className="space-y-1.5 py-0.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <span className="font-semibold text-slate-700 text-xs">Active learners</span>
                      <span className="text-xs font-bold text-[#005C45]">3,420 active this month</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "80%" }} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      80% active rate
                    </div>
                  </div>

                  {/* Row 3: Average course completion */}
                  <div className="space-y-1.5 py-0.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <span className="font-semibold text-slate-700 text-xs">Average course completion</span>
                      <span className="text-xs font-bold text-slate-900">61% average</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: "61%" }} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Across active pathways
                    </div>
                  </div>
                </div>
              </div>

              {/* CPD readiness pipeline */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/70 shadow-3xs flex flex-col justify-between space-y-5">
                <span className="text-sm font-bold text-slate-900 block">CPD readiness pipeline</span>
                
                <div className="space-y-4 text-xs">
                  {/* Row 1: Completed CPD requirement */}
                  <div className="space-y-1.5 py-0.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <span className="font-semibold text-slate-700 text-xs">Completed CPD requirement</span>
                      <span className="text-xs font-bold text-slate-900">532 learners</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "44%" }} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      35 credits completed
                    </div>
                  </div>

                  {/* Row 2: Near CPD ready */}
                  <div className="space-y-1.5 py-0.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <span className="font-semibold text-slate-700 text-xs">Near CPD ready</span>
                      <span className="text-xs font-bold text-slate-900">672 learners</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "55%" }} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      20–34 credits
                    </div>
                  </div>

                  {/* Row 3: Still developing */}
                  <div className="space-y-1.5 py-0.5">
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <span className="font-semibold text-slate-700 text-xs">Still developing</span>
                      <span className="text-xs font-bold text-slate-900">1,322 learners</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: "70%" }} />
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      1–19 credits
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hub Insights */}
            <div className="p-6 rounded-3xl bg-slate-50/50 border border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-3xs">
              <div className="space-y-1.5">
                <p className="text-[11px] text-slate-500 font-semibold">Open support tickets</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">23</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">98% resolution rate</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Fast tracking technical and offline package questions.</p>
              </div>

              <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-4 sm:pt-0 sm:pl-6">
                <p className="text-[11px] text-slate-500 font-semibold">Learner follow-up actions</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-amber-800">76</span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100/50">Review pending</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Portfolios currently queued for facilitator verification checks.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 2: Location Coverage */}
      {activeTab === "location" && (
        <div className="bg-white p-5 sm:p-7 rounded-[28px] border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Location coverage</h3>
              <p className="text-xs text-slate-500">Track learner participation across states, LGAs, and implementation hubs.</p>
            </div>
            <div className="text-xs bg-emerald-50/60 text-[#005C45] border border-emerald-100/50 px-3.5 py-1.5 rounded-full font-semibold self-start sm:self-center">
              Showing <span className="font-bold">{stateLgaData.length}</span> active location entries
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden border border-slate-200/70 rounded-3xl shadow-3xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/85 border-b border-slate-200 text-slate-500 text-xs font-semibold">
                  <th className="px-5 py-3.5">State</th>
                  <th className="px-5 py-3.5">LGA / hub</th>
                  <th className="px-5 py-3.5 text-center">Learners</th>
                  <th className="px-5 py-3.5 text-center">Active learners</th>
                  <th className="px-5 py-3.5 text-center">Completion</th>
                  <th className="px-5 py-3.5 text-center">CPD ready</th>
                  <th className="px-5 py-3.5 text-center">Certificates issued</th>
                  <th className="px-5 py-3.5 text-right">Low-bandwidth users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-800">
                {stateLgaData.length > 0 ? (
                  stateLgaData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/20 transition-colors">
                      <td className="px-5 py-3.5 text-slate-900 font-bold">{item.state}</td>
                      <td className="px-5 py-3.5 text-slate-500 font-normal">{item.lga}</td>
                      <td className="px-5 py-3.5 text-center text-slate-900">{item.learners.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-center text-slate-600">{item.active.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="text-emerald-800 bg-emerald-50/60 px-2.5 py-0.5 rounded-full border border-emerald-100/50">
                          {item.rate}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center text-emerald-700">{item.cpdReady}</td>
                      <td className="px-5 py-3.5 text-center text-slate-800">
                        <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50/50 px-2.5 py-0.5 rounded-full border border-amber-100/40">
                          {item.certReady}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right text-teal-900">
                        <span className="inline-flex items-center gap-1.5 text-teal-850 bg-teal-50/40 border border-teal-100/30 px-2.5 py-1 rounded-full font-bold">
                          {item.lowBandwidth.toLocaleString()}
                          <WifiOff className="h-3 w-3 text-teal-600 shrink-0" />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-slate-400 font-medium">
                      No location data matching current filters. Try resetting the State or LGA filters above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {stateLgaData.length > 0 ? (
              <>
                <div className="space-y-4">
                  {stateLgaData.slice(0, visibleLocations).map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/70 rounded-3xl p-5 space-y-4 shadow-sm text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] bg-slate-100 text-slate-650 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider block w-fit mb-1">
                            {item.state}
                          </span>
                          <p className="text-base font-bold text-slate-900">{item.lga}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                          {item.rate}% Completion
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-500 pt-3.5 border-t border-slate-100">
                        <div>
                          <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Learners</span>
                          <span className="text-slate-900 font-bold text-sm">{item.learners.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Active</span>
                          <span className="text-slate-900 font-bold text-sm">{item.active.toLocaleString()} ({item.rate}%)</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-0.5">CPD ready</span>
                          <span className="text-emerald-700 font-bold text-sm">{item.cpdReady}</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Certificates issued</span>
                          <span className="text-slate-800 font-bold text-sm">{item.certReady}</span>
                        </div>
                      </div>

                      <div className="bg-teal-50/30 border border-teal-100/40 rounded-2xl p-3 flex justify-between items-center text-xs">
                        <span className="text-teal-900 font-semibold">Low-bandwidth</span>
                        <span className="text-teal-950 font-bold flex items-center gap-1">
                          {item.lowBandwidth.toLocaleString()} learners
                          <WifiOff className="h-3 w-3 text-teal-650" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {stateLgaData.length > visibleLocations && (
                  <div className="flex justify-center pt-3">
                    <button
                      onClick={() => setVisibleLocations(prev => prev + 5)}
                      className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-[#005C45] bg-emerald-50 hover:bg-[#005C45] hover:text-white border border-emerald-100 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
                    >
                      Show more locations
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="py-8 text-center text-xs text-slate-400 font-medium">
                No location nodes found. Change the state filter to view other nodes.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab Panel 3: Gender Participation */}
      {activeTab === "gender" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-5 sm:p-7 rounded-[28px] border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Gender participation</h3>
              <p className="text-xs text-slate-500">View participation, completion, and CPD readiness across learner groups.</p>
            </div>

            {/* Participation Proportions horizontal bar */}
            <div className="space-y-3.5">
              <span className="text-xs font-semibold text-slate-500 block">Enrollment proportions</span>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#005C45]" style={{ width: "54%" }} title="Female: 54%" />
                <div className="h-full bg-slate-400" style={{ width: "44%" }} title="Male: 44%" />
                <div className="h-full bg-slate-200" style={{ width: "2%" }} title="Not specified: 2%" />
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-[#005C45]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#005C45]" />
                  <span>Female (54%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                  <span>Male (44%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span>Not specified (2%)</span>
                </div>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Female Card */}
              <div className="border border-slate-200/70 p-6 rounded-3xl space-y-4 bg-emerald-50/20 text-left relative overflow-hidden shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#005C45]" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Female learners</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100/50 px-2.5 py-0.5 rounded-full">
                    54% share
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight">2,314</h4>
                  <p className="text-xs text-slate-400 font-medium">Total enrolled</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-medium space-y-2.5 text-slate-650">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Completion rate</span>
                      <span className="font-bold text-slate-800">63%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#005C45] rounded-full" style={{ width: "63%" }} />
                    </div>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>CPD ready</span>
                    <span className="font-bold text-emerald-700">680 learners</span>
                  </div>
                </div>
              </div>

              {/* Male Card */}
              <div className="border border-slate-200/70 p-6 rounded-3xl space-y-4 bg-slate-50/40 text-left relative overflow-hidden shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-400" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Male learners</span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                    44% share
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight">1,876</h4>
                  <p className="text-xs text-slate-400 font-medium">Total enrolled</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-medium space-y-2.5 text-slate-650">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Completion rate</span>
                      <span className="font-bold text-slate-800">59%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-550 rounded-full" style={{ width: "59%" }} />
                    </div>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>CPD ready</span>
                    <span className="font-bold text-slate-800">498 learners</span>
                  </div>
                </div>
              </div>

              {/* Not Specified Card */}
              <div className="border border-slate-200/70 p-6 rounded-3xl space-y-4 bg-slate-50/40 text-left relative overflow-hidden shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Not specified</span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                    2% share
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight">96</h4>
                  <p className="text-xs text-slate-400 font-medium">Total enrolled</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-medium space-y-2.5 text-slate-650">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Completion rate</span>
                      <span className="font-bold text-slate-800">41%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: "41%" }} />
                    </div>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>CPD ready</span>
                    <span className="font-bold text-slate-800">26 learners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Panel 4: Pathway and CPD Progress */}
      {activeTab === "pathway" && (
        <div className="bg-white p-5 sm:p-7 rounded-[28px] border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="text-base font-bold text-slate-900">Pathway and CPD progress</h3>
            <p className="text-xs text-slate-500">Compare progress and CPD readiness across assigned learning pathways.</p>
          </div>

          <div className="space-y-5">
            {[
              { 
                name: "Youth Employability Pathway", 
                desc: "Focused on soft skills, professional communication, and job placement prep.",
                enrolled: 1860, 
                progress: 64, 
                cpd: 620, 
                cert: 210,
                lowBandwidth: 1120,
                colorClass: "bg-[#005C45]"
              },
              { 
                name: "Agribusiness SME Growth Pathway", 
                desc: "Sustained agricultural planning, operations finance, and market linking.",
                enrolled: 1420, 
                progress: 58, 
                cpd: 382, 
                cert: 168,
                lowBandwidth: 980,
                colorClass: "bg-teal-600"
              },
              { 
                name: "TVET Instructor CPD Pathway", 
                desc: "Technical education pedagogy, facilitator skills, and learning design standards.",
                enrolled: 1006, 
                progress: 67, 
                cpd: 202, 
                cert: 154,
                lowBandwidth: 579,
                colorClass: "bg-amber-500"
              }
            ].map((path) => (
              <div key={path.name} className="border border-slate-200/70 p-6 rounded-3xl space-y-5 bg-white hover:border-slate-300 transition-all text-left shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{path.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{path.desc}</p>
                  </div>
                  <span className="text-xs text-slate-650 font-bold bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-full shrink-0">
                    {path.enrolled.toLocaleString()} learners enrolled
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Average learning progress</span>
                    <span className="text-slate-900 font-bold">{path.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${path.colorClass} rounded-full`} style={{ width: `${path.progress}%` }} />
                  </div>
                </div>

                {/* KPI block inside */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="block text-slate-450 text-[10px] uppercase tracking-wider font-semibold mb-0.5">CPD ready</span>
                    <span className="text-[#005C45] font-extrabold text-sm sm:text-base">{path.cpd} learners</span>
                  </div>
                  <div>
                    <span className="block text-slate-450 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Certificates issued</span>
                    <span className="text-slate-800 font-extrabold text-sm sm:text-base">{path.cert}</span>
                  </div>
                  <div>
                    <span className="block text-slate-450 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Low-bandwidth usage</span>
                    <span className="text-teal-700 font-extrabold text-sm sm:text-base flex items-center gap-1">
                      {path.lowBandwidth}
                      <WifiOff className="h-3 w-3 text-teal-600 shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Panel 5: Certificate Pipeline */}
      {activeTab === "certificates" && (
        <div className="bg-white p-5 sm:p-7 rounded-[28px] border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="text-base font-bold text-slate-900">Certificate pipeline</h3>
            <p className="text-xs text-slate-500">Track learners moving from CPD readiness to certificate review and issued certificates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Not Eligible */}
            <div className="bg-slate-50/50 border border-slate-200/70 p-5 rounded-3xl space-y-3 flex flex-col justify-between shadow-3xs min-h-[140px]">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Not eligible yet</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-700 tracking-tight">2,104</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Active learners building up credits toward eligibility thresholds.</p>
            </div>

            {/* Ready for Review */}
            <div className="bg-amber-50/15 border border-amber-100/70 p-5 rounded-3xl space-y-3 flex flex-col justify-between shadow-3xs min-h-[140px]">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block">Ready for review</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-800 tracking-tight">312</p>
              </div>
              <p className="text-[10px] text-amber-700/95 leading-relaxed font-medium">Completed all milestones. Queued for facilitator verification.</p>
            </div>

            {/* Under Review */}
            <div className="bg-blue-50/15 border border-blue-100/70 p-5 rounded-3xl space-y-3 flex flex-col justify-between shadow-3xs min-h-[140px]">
              <div className="space-y-1">
                <span className="text-[10px] text-blue-800 font-bold uppercase tracking-wider block">Under review</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight">148</p>
              </div>
              <p className="text-[10px] text-blue-750 leading-relaxed font-medium">Facilitators currently cross-checking submissions & logs.</p>
            </div>

            {/* Issued */}
            <div className="bg-emerald-50/15 border border-emerald-100/70 p-5 rounded-3xl space-y-3 flex flex-col justify-between shadow-3xs min-h-[140px]">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Certificates issued</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight">532</p>
              </div>
              <p className="text-[10px] text-emerald-700/95 leading-relaxed font-medium">Fully certified and posted on the public ledger.</p>
            </div>

            {/* Needs action */}
            <div className="bg-rose-50/15 border border-rose-100/70 p-5 rounded-3xl space-y-3 flex flex-col justify-between shadow-3xs min-h-[140px]">
              <div className="space-y-1">
                <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider block">Needs facilitator action</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-rose-800 tracking-tight">76</p>
              </div>
              <p className="text-[10px] text-rose-700/95 leading-relaxed font-medium">Flagged portfolios requiring adjustments or correction.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 justify-end">
            <button
              onClick={() => handleOpenExport("pdf")}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              <span>Export certificate report</span>
            </button>
            <button
              onClick={() => {
                showToast("Opening certificate review workspace...");
                navigateTo("/programme/certificates");
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#005C45] hover:bg-[#003B2C] rounded-xl transition-all cursor-pointer shadow-3xs"
            >
              <span>Open certificate review</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab Panel 6: Low-Bandwidth Access */}
      {activeTab === "bandwidth" && (
        <div className="bg-white p-5 sm:p-7 rounded-[28px] border border-slate-200/80 shadow-sm space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="text-base font-bold text-slate-900">Low-bandwidth access</h3>
            <p className="text-xs text-slate-500">Monitor learners using lightweight pages, offline packs, and saved drafts.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="p-5 rounded-3xl bg-teal-50/35 border border-teal-100/50 space-y-2 shadow-3xs">
              <span className="text-[10px] text-teal-850 font-bold uppercase tracking-wider">Low-bandwidth users</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-950 tracking-tight">2,679</p>
              <p className="text-[10px] text-teal-700/90 font-medium">62.5% of overall learners</p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-3xl bg-teal-50/35 border border-teal-100/50 space-y-2 shadow-3xs">
              <span className="text-[10px] text-teal-850 font-bold uppercase tracking-wider">Offline packs opened</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-950 tracking-tight">210</p>
              <p className="text-[10px] text-teal-700/90 font-medium">Resources used offline</p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-3xl bg-teal-50/35 border border-teal-100/50 space-y-2 shadow-3xs">
              <span className="text-[10px] text-teal-850 font-bold uppercase tracking-wider">Saved drafts</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-950 tracking-tight">486</p>
              <p className="text-[10px] text-teal-700/90 font-medium">Local workspace drafts</p>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-3xl bg-amber-50/20 border border-amber-100/40 space-y-2 shadow-3xs">
              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Waiting to upload</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight">34</p>
              <p className="text-[10px] text-amber-800/90 font-medium">Pending network sync</p>
            </div>
          </div>

          {/* Location insights */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/50 border border-slate-200/70 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4.5 w-4.5 text-teal-700" />
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Communities with highest low-bandwidth usage</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs text-xs flex justify-between items-center">
                <span className="font-bold text-slate-800">Kano Municipal</span>
                <span className="bg-teal-50 text-teal-800 border border-teal-100/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">775 users</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs text-xs flex justify-between items-center">
                <span className="font-bold text-slate-800">Kaduna North</span>
                <span className="bg-teal-50 text-teal-800 border border-teal-100/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">600 users</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs text-xs flex justify-between items-center">
                <span className="font-bold text-slate-800">Oyo West</span>
                <span className="bg-teal-50 text-teal-800 border border-teal-100/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">160 users</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. EXPORT REPORT SUMMARY AT THE BOTTOM */}
      <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-slate-200/70 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mt-8">
        <div className="space-y-1.5 max-w-2xl">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight text-left">Export report summary</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal text-left">
            Prepare a report view for programme review, stakeholder updates, or internal planning. Choose from either CSV or high-fidelity PDF formats.
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3 pt-2 md:pt-0 shrink-0">
          <button 
            onClick={() => handleOpenExport("csv")}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold text-[#005C45] bg-emerald-50 hover:bg-[#005C45] hover:text-white rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-3xs border border-transparent"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => handleOpenExport("pdf")}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold text-slate-750 bg-white border border-slate-250 hover:border-slate-350 hover:bg-slate-50 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Download PDF Summary</span>
          </button>
        </div>
      </div>


      {/* 7. REUSABLE HIGH-FIDELITY EXPORT MODAL / SHEET */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full h-full sm:h-auto sm:max-w-md sm:rounded-[32px] flex flex-col justify-between sm:justify-start overflow-y-auto border-0 sm:border border-slate-200 shadow-2xl transition-all duration-300 relative animate-in slide-in-from-bottom sm:zoom-in duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Prepare report export</h3>
                <p className="text-xs text-slate-450 mt-0.5">Choose sections and export configuration options.</p>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                disabled={isExporting}
                className="p-1.5 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-600 transition-all cursor-pointer disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 space-y-5">
              {!isExporting && !exportDone && (
                <>
                  {/* Option 1: Choose Sections */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Include report sections</label>
                    
                    <div className="space-y-2">
                      {[
                        { key: "summary", label: "Programme summary" },
                        { key: "location", label: "Location coverage" },
                        { key: "gender", label: "Gender participation" },
                        { key: "pathway", label: "Pathway and CPD progress" },
                        { key: "pipeline", label: "Certificate pipeline" },
                        { key: "bandwidth", label: "Low-bandwidth access" },
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => toggleExportSection(item.key as any)}
                          className="w-full flex items-center gap-3 p-3 text-left rounded-xl hover:bg-slate-50 border border-slate-150 transition-all cursor-pointer"
                        >
                          <div className={`h-4.5 w-4.5 rounded-md flex items-center justify-center border transition-all ${
                            selectedSections[item.key as keyof typeof selectedSections] 
                              ? "bg-[#005C45] border-[#005C45] text-white" 
                              : "border-slate-300 text-transparent bg-white"
                          }`}>
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Option 2: Select format */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Document format</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setExportFormat("csv")}
                        className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                          exportFormat === "csv" 
                            ? "border-[#005C45] bg-emerald-50/10 text-[#005C45]" 
                            : "border-slate-200 bg-white text-slate-550 hover:bg-slate-50"
                        }`}
                      >
                        <FileSpreadsheet className="h-6 w-6" />
                        <span className="text-xs font-bold">CSV spreadsheet</span>
                      </button>

                      <button
                        onClick={() => setExportFormat("pdf")}
                        className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${
                          exportFormat === "pdf" 
                            ? "border-[#005C45] bg-emerald-50/10 text-[#005C45]" 
                            : "border-slate-200 bg-white text-slate-550 hover:bg-slate-50"
                        }`}
                      >
                        <FileText className="h-6 w-6" />
                        <span className="text-xs font-bold">PDF summary layout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Compiling Loader State */}
              {isExporting && (
                <div className="py-8 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                  <div className="h-10 w-10 border-4 border-emerald-100 border-t-[#005C45] rounded-full animate-spin" />
                  <div className="text-center space-y-1.5">
                    <p className="text-sm font-bold text-slate-900">Preparing report export...</p>
                    <p className="text-xs text-slate-450">Compiling dataset indicators ({exportProgress}%)</p>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-xs">
                    <div className="h-full bg-[#005C45] rounded-full transition-all duration-150" style={{ width: `${exportProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Done Success State */}
              {exportDone && (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="h-14 w-14 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-900">Roster compiled successfully</p>
                    <p className="text-xs text-slate-500 leading-relaxed px-4">
                      Your document <span className="font-semibold text-slate-800">sustain_reports_export.{exportFormat}</span> is prepared and ready for download. This is a secure high-fidelity frontend prototype simulation file.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              {!isExporting && !exportDone && (
                <>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="w-full sm:w-1/2 py-3 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartExport}
                    className="w-full sm:w-1/2 py-3 text-xs font-bold text-white bg-[#005C45] hover:bg-[#003B2C] rounded-xl transition-all cursor-pointer shadow-3xs"
                  >
                    Prepare export
                  </button>
                </>
              )}

              {isExporting && (
                <button
                  disabled
                  className="w-full py-3 text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 rounded-xl cursor-not-allowed opacity-60"
                >
                  Compiling indicators...
                </button>
              )}

              {exportDone && (
                <button
                  onClick={handleDownloadExportedFile}
                  className="w-full py-3 text-xs font-bold text-white bg-[#005C45] hover:bg-[#003B2C] rounded-xl transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Document</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProgrammeReports;
