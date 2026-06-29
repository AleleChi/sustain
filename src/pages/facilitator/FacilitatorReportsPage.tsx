import { useState, useEffect, useRef } from "react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { ReportViews } from "../../components/ReportViews";
import { 
  BarChart3, 
  Layers, 
  Users, 
  TrendingUp, 
  Award, 
  Calendar, 
  FileSpreadsheet, 
  Clock, 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  ChevronRight, 
  Plus, 
  X, 
  Maximize2, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  ArrowLeft, 
  Grid, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  MoreVertical,
  Mail,
  User,
  Trash2,
  ListFilter
} from "lucide-react";

export function FacilitatorReportsPage() {
  const { currentPath, navigateTo, showToast } = useRoute();

  // Selected filters state
  const [programme, setProgramme] = useState("SUSTAIN");
  const [pathway, setPathway] = useState("Agri-Bus");
  const [cohort, setCohort] = useState("Cohort 02");
  const [state, setState] = useState("Kano");
  const [lga, setLga] = useState("Tarauni");
  const [status, setStatus] = useState("All");

  // Filter dropdown state for mobile
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Selected Export Format
  const [selectedFormat, setSelectedFormat] = useState<"pdf" | "xlsx" | "drive">("pdf");

  // Export settings state
  const [includePII, setIncludePII] = useState(true);
  const [summaryFirst, setSummaryFirst] = useState(true);
  const [donorBranding, setDonorBranding] = useState(false);

  // Floating action menu state
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  // Active internal sidebar item
  const [activeInternalItem, setActiveInternalItem] = useState("Dashboard");

  // State for selected items across different report views
  const [selectedCohort, setSelectedCohort] = useState("Kano Youth Employability Cohort 02");
  const [selectedLearner, setSelectedLearner] = useState("Aisha Mohammed");
  const [selectedAssessment, setSelectedAssessment] = useState("Work Readiness Assignment");

  // State for Workspace Export selection
  const [workspaceFormat, setWorkspaceFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");

  // Simulated search query
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [reportStep, setReportStep] = useState<"form" | "success">("form");

  // SECTION 1: Report Details
  const [newReportType, setNewReportType] = useState("Cohort Summary");
  const [newReportName, setNewReportName] = useState("");
  const [newProgramme, setNewProgramme] = useState("SUSTAIN CPD Programme");
  const [newCohort, setNewCohort] = useState("Kano Youth Employability Cohort 02");
  const [newState, setNewState] = useState("Kano");
  const [newLga, setNewLga] = useState("Tarauni");
  const [newDateRange, setNewDateRange] = useState("This Month");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  // SECTION 2: Data to Include
  const [incParticipation, setIncParticipation] = useState(true);
  const [incProgress, setIncProgress] = useState(true);
  const [incScores, setIncScores] = useState(true);
  const [incFollowUps, setIncFollowUps] = useState(false);
  const [incSupportTickets, setIncSupportTickets] = useState(false);
  const [incCertificates, setIncCertificates] = useState(true);
  const [incLowBandwidth, setIncLowBandwidth] = useState(false);
  const [incDemographics, setIncDemographics] = useState(false);

  // SECTION 3: Privacy & Export options
  const [newExportFormat, setNewExportFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [newSummaryFirst, setNewSummaryFirst] = useState(true);
  const [newExcludePII, setNewExcludePII] = useState(true);
  const [newIncludeIDs, setNewIncludeIDs] = useState(false);
  const [newAddFacilitator, setNewAddFacilitator] = useState(true);
  const [newAddBranding, setNewAddBranding] = useState(true);


  // Urgent Review states
  const [isUrgentReviewOpen, setIsUrgentReviewOpen] = useState(false);
  const [isSendReminderOpen, setIsSendReminderOpen] = useState(false);
  const [isBatchReminderOpen, setIsBatchReminderOpen] = useState(false);
  const [reminderSuccessState, setReminderSuccessState] = useState(false);

  // Send Reminder form states
  const [reminderType, setReminderType] = useState("Assessment reminder");
  const [channelInApp, setChannelInApp] = useState(true);
  const [channelSMS, setChannelSMS] = useState(true);
  const [channelEmail, setChannelEmail] = useState(false);
  const [channelWhatsApp, setChannelWhatsApp] = useState(false);
  
  const [messageTemplate, setMessageTemplate] = useState("Friendly assessment reminder");
  const [reminderMessage, setReminderMessage] = useState(
    "Hi Aisha, this is a reminder from your SUSTAIN facilitator. Please complete your pending assessment when you can. I have attached a low-bandwidth guide to help you continue even if your internet connection is limited. Reply if you need support."
  );
  
  const [attachGuide, setAttachGuide] = useState(true);
  const [attachLowBandwidth, setAttachLowBandwidth] = useState(true);
  const [attachSummary, setAttachSummary] = useState(false);
  const [attachCPD, setAttachCPD] = useState(false);
  
  const [createFollowUpTask, setCreateFollowUpTask] = useState(false);

  const urgentLearners = [
    {
      name: "Aisha Mohammed",
      reason: "Assessment reminder due today",
      course: "Work Readiness Assignment",
      priority: "High" as const,
      cohort: "Kano Youth Employability Cohort 02",
      progress: "42%",
      lastActive: "9 days ago",
    },
    {
      name: "Musa Danladi",
      reason: "Inactive for 14 days",
      course: "Digital Basics",
      priority: "High" as const,
      cohort: "Kano Youth Employability Cohort 02",
      progress: "28%",
      lastActive: "14 days ago",
    },
    {
      name: "Fatima Lawal",
      reason: "Low progress warning",
      course: "Agribusiness Foundation",
      priority: "Medium" as const,
      cohort: "Kano Youth Employability Cohort 02",
      progress: "15%",
      lastActive: "3 days ago",
    },
    {
      name: "Kabir Bello",
      reason: "Missed assessment deadline",
      course: "Module 3",
      priority: "Medium" as const,
      cohort: "Kano Youth Employability Cohort 02",
      progress: "55%",
      lastActive: "5 days ago",
    }
  ];

  // Selected learner info for reminder
  const [selectedUrgentLearner, setSelectedUrgentLearner] = useState<{
    name: string;
    reason: string;
    course: string;
    priority: "Low" | "Medium" | "High";
    cohort: string;
    progress: string;
    lastActive: string;
  }>(urgentLearners[0]);

  // Synchronize reminder message template with selected learner and template selection
  useEffect(() => {
    const name = selectedUrgentLearner?.name || "Aisha";
    if (messageTemplate === "Friendly assessment reminder") {
      setReminderMessage(`Hi ${name}, this is a reminder from your SUSTAIN facilitator. Please complete your pending assessment when you can. I have attached a low-bandwidth guide to help you continue even if your internet connection is limited. Reply if you need support.`);
    } else if (messageTemplate === "Low-bandwidth support note") {
      setReminderMessage(`Hi ${name}, I noticed you might be facing connectivity issues. Here is a compressed offline-friendly guide to help you continue your learning offline. Let me know if this helps!`);
    } else if (messageTemplate === "Missed activity check-in") {
      setReminderMessage(`Hi ${name}, we missed you at our latest learning session. Please check out the attached summaries and let me know if you need any assistance getting back on track.`);
    } else if (messageTemplate === "Certification reminder") {
      setReminderMessage(`Hi ${name}, congratulations on almost completing your SUSTAIN training! Please finish any pending assessments to finalize your certificate eligibility.`);
    }
  }, [messageTemplate, selectedUrgentLearner]);

  // Settings Modal options
  const [settingsDefaultFormat, setSettingsDefaultFormat] = useState("PDF");
  const [settingsSummaryFirst, setSettingsSummaryFirst] = useState(true);
  const [settingsBranding, setSettingsBranding] = useState(true);
  const [settingsExcludePII, setSettingsExcludePII] = useState(true);
  const [settingsAutoSync, setSettingsAutoSync] = useState(true);

  // Dynamic lists for history
  const [exportHistory, setExportHistory] = useState([
    { name: "Kano_C02_Monthly_Summary_Oct.pdf", meta: "Oct 24, 2026 • 2.4MB", by: "Halima Sani", status: "Ready" },
    { name: "Learner_Progress_DeepDive_Kano.xlsx", meta: "Oct 21, 2026 • 1.1MB", by: "Halima Sani", status: "Ready" },
    { name: "Low_Bandwidth_Interaction_Log.csv", meta: "Oct 18, 2026 • 0.8MB", by: "Halima Sani", status: "Ready" }
  ]);

  const [mobileDownloads, setMobileDownloads] = useState([
    { name: "Agribusiness_Q3_Kano.pdf", date: "24 Jun • Halima Sani" },
    { name: "Learner_Progress_A.xlsx", date: "22 Jun • Halima Sani" },
    { name: "Assessment_Metrics.csv", date: "19 Jun • Halima Sani" }
  ]);

  const handleGenerateReport = () => {
    const ext = newExportFormat === "PDF" ? "pdf" : newExportFormat === "Excel" ? "xlsx" : "csv";
    const baseName = newReportName.trim().replace(/[\s\W]+/g, "_") || "Kano_C02_New_Report";
    const fileName = `${baseName}.${ext}`;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const formattedDayMonth = now.toLocaleDateString("en-US", { day: "numeric", month: "short" });

    const newDesktopItem = {
      name: fileName,
      meta: `${formattedDate} • 1.2MB`,
      by: "Halima Sani",
      status: "Ready"
    };

    const newMobileItem = {
      name: fileName,
      date: `${formattedDayMonth} • Halima Sani`
    };

    setExportHistory([newDesktopItem, ...exportHistory]);
    setMobileDownloads([newMobileItem, ...mobileDownloads]);

    showToast("Report generated locally in this frontend prototype.");
    setReportStep("success");
  };

  const handleSaveDraft = () => {
    showToast("Report draft saved locally in this frontend prototype.");
    setIsCreateModalOpen(false);
  };

  const handleSaveSettings = () => {
    showToast("Report settings saved locally in this frontend prototype.");
    setIsSettingsModalOpen(false);
  };

  const handleGenerateSelectedExport = (format: "PDF" | "Excel" | "CSV") => {
    const ext = format === "PDF" ? "pdf" : format === "Excel" ? "xlsx" : "csv";
    const fileName = `Kano_C02_Workspace_Export.${ext}`;
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const formattedDayMonth = now.toLocaleDateString("en-US", { day: "numeric", month: "short" });

    const newDesktopItem = {
      name: fileName,
      meta: `${formattedDate} • 1.5MB`,
      by: "Halima Sani",
      status: "Ready"
    };

    const newMobileItem = {
      name: fileName,
      date: `${formattedDayMonth} • Halima Sani`
    };

    setExportHistory([newDesktopItem, ...exportHistory]);
    setMobileDownloads([newMobileItem, ...mobileDownloads]);

    showToast("Selected export generated locally in this frontend prototype.");
    setActiveInternalItem("History Ledger");
  };

  const getIncludedSections = () => {
    const sections = [];
    if (incParticipation) sections.push("Progress");
    if (incProgress) sections.push("assessments");
    if (incScores) sections.push("certification");
    if (incFollowUps) sections.push("support actions");
    if (incSupportTickets) sections.push("support tickets");
    if (incCertificates) sections.push("certificates");
    if (incLowBandwidth) sections.push("low-bandwidth");
    if (incDemographics) sections.push("demographics");
    
    if (sections.length === 0) return "none";
    if (sections.length === 1) return sections[0];
    if (sections.length === 2) return `${sections[0]} and ${sections[1]}`;
    return `${sections.slice(0, -1).join(", ")}, and ${sections[sections.length - 1]}`;
  };

  const scrollToExportHistory = () => {
    setIsCreateModalOpen(false);
    setTimeout(() => {
      const isMobile = window.innerWidth < 1024;
      const targetId = isMobile ? "mobile-recent-downloads" : "export-history";
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("ring-2", "ring-emerald-500", "transition-all", "duration-500");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-emerald-500");
        }, 3000);
      }
    }, 200);
  };

  const handleAction = (label: string, message: string, scrollTargetId?: string) => {
    showToast(message);
    if (scrollTargetId) {
      const element = document.getElementById(scrollTargetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    setIsFabMenuOpen(false);
  };

  // Close menus on click outside
  const fabMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fabMenuRef.current && !fabMenuRef.current.contains(event.target as Node)) {
        setIsFabMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-55 font-sans antialiased text-slate-800">
      
      {/* ========================================================
          DESKTOP & TABLET VIEW (1024px and wider)
         ======================================================== */}
      <div className="hidden lg:flex min-h-screen">
        
        {/* Reports-specific Internal Sidebar */}
        <aside className="w-[260px] shrink-0 bg-slate-50 border-r border-slate-200/80 flex flex-col justify-between p-6 select-none">
          <div className="space-y-6">
            {/* Top Workspace Label */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Workspace
              </span>
              <span className="text-xs font-bold text-slate-600 uppercase block tracking-wider mt-0.5">
                FACILITATOR PORTAL
              </span>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1">
              {[
                { name: "Dashboard", icon: Grid },
                { name: "Cohort Summaries", icon: Layers },
                { name: "Learner Progress", icon: TrendingUp },
                { name: "Assessment Reviews", icon: Award },
                { name: "History Ledger", icon: Clock },
                { name: "Export Workspace", icon: FileSpreadsheet },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeInternalItem === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveInternalItem(item.name);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer text-left focus-ring ${
                      isActive 
                        ? "bg-indigo-50 text-indigo-950 font-extrabold border border-indigo-100 shadow-3xs" 
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-indigo-800" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-4 pt-6 border-t border-slate-200/60">
            <button 
              onClick={() => {
                setReportStep("form");
                setIsCreateModalOpen(true);
              }}
              className="w-full bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2.5 px-4 text-xs font-bold transition-all duration-200 shadow-3xs hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5 focus-ring"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Report</span>
            </button>

            <div className="space-y-0.5">
              <button 
                onClick={() => setIsSettingsModalOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-150 hover:text-slate-800 transition-all cursor-pointer text-left"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                <span>Settings</span>
              </button>
              <button 
                onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-150 hover:text-slate-800 transition-all cursor-pointer text-left"
              >
                <HelpCircle className="h-4 w-4 text-slate-400" />
                <span>Support</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Bar Header */}
          <header className="h-16 bg-white border-b border-slate-150 px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#005c45] hover:bg-emerald-50 hover:text-emerald-900 transition-all rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 outline-hidden"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>← Dashboard</span>
              </button>

              <div className="h-4 w-px bg-slate-200" />

              <h1 className="text-lg font-black tracking-tight text-[#005c45] font-sans">
                SUSTAIN Reporting
              </h1>
              
              {/* Search Bar */}
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search reports, learners, or cohorts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-all text-slate-700 font-medium placeholder-slate-400"
                />
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-5">
              <button 
                onClick={() => showToast("Notifications are not configured in this reports prototype.")}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
              </button>
              <button 
                onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <HelpCircle className="h-4.5 w-4.5" />
              </button>
              <button 
                onClick={() => setIsSettingsModalOpen(true)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <Settings className="h-4.5 w-4.5" />
              </button>
              <div className="h-8 w-px bg-slate-150" />
              
              {/* Facilitator User profile */}
              <div 
                onClick={() => showToast("User profile details are simulated.")}
                className="flex items-center gap-2.5 text-left select-none cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">Halima Sani</p>
                  <p className="text-[9px] text-emerald-800 font-extrabold tracking-wider font-sans uppercase">FACILITATOR</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center font-bold text-xs text-white">
                  HS
                </div>
              </div>
            </div>
          </header>

          {/* Main Workspace Content */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {activeInternalItem === "Dashboard" ? (
                <>
                  {/* Hero Section + Status Card */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Hero Card */}
                <div className="lg:col-span-8 bg-[#005c45] text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-xs">
                  {/* Background graphic elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-emerald-800/15 rounded-full translate-y-16 pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                        Reports & Exports
                      </h2>
                      <p className="text-xs text-emerald-100 max-w-lg font-medium leading-relaxed">
                        Generate and download certified aggregate logs, evaluation scores, low-bandwidth data saves, and cohort readiness statistics.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-emerald-800/60 text-emerald-50 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-600/30">
                        🛡️ SUSTAIN CPD Programme
                      </span>
                      <span className="bg-emerald-800/60 text-emerald-50 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-600/30">
                        📍 Kano Youth Employability Cohort 02
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-2">
                    <button 
                      onClick={() => {
                        setNewReportType("Cohort Summary");
                        setReportStep("form");
                        setIsCreateModalOpen(true);
                      }}
                      className="bg-white text-[#005c45] hover:bg-slate-50 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all duration-200 ease-out shadow-xs hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 focus-ring"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Generate Cohort Report</span>
                    </button>
                    <button 
                      onClick={() => {
                        setActiveInternalItem("History Ledger");
                      }}
                      className="bg-transparent text-white hover:bg-white/10 font-bold px-4 py-2.5 border border-white/20 rounded-xl text-xs transition-all cursor-pointer focus-ring"
                    >
                      View Export History
                    </button>
                  </div>
                </div>

                {/* Report Status Card */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-3xs">
                  <div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono">
                        Report Status
                      </h3>
                      <span className="p-1 bg-emerald-50 text-[#005c45] rounded-lg">
                        <BarChart3 className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="py-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-600">Active Templates</span>
                        <span className="text-base font-black text-slate-800">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-600">Recent Exports (7d)</span>
                        <span className="text-base font-black text-slate-800">6</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>Next automatic sync in 2 hours</span>
                  </div>
                </div>

              </div>

              {/* Six Report Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Templates", value: "12", color: "bg-[#005c45]" },
                  { label: "Recent Exports", value: "6", color: "bg-[#005c45]" },
                  { label: "Learners", value: "510", color: "bg-[#005c45]" },
                  { label: "Follow-Ups", value: "18", color: "bg-red-600" },
                  { label: "Pending Reviews", value: "12", color: "bg-amber-500" },
                  { label: "Formats", value: "3", color: "bg-slate-500" },
                ].map((metric) => (
                  <div 
                    key={metric.label}
                    onClick={() => showToast(`Opening summary metrics for ${metric.label}`)}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-emerald-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all duration-200 group text-left h-[110px]"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
                        {metric.label}
                      </span>
                      <span className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                        {metric.value}
                      </span>
                    </div>
                    {/* Tiny visual progress bar indicator */}
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${metric.color}`} style={{ width: "65%" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Report Filters */}
              <section id="report-filters" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs text-left">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                  <Filter className="h-4.5 w-4.5 text-slate-500" />
                  <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono">
                    Report Filters
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 items-end">
                  
                  {/* Programme */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-extrabold uppercase font-mono block">Programme</label>
                    <select 
                      value={programme} 
                      onChange={(e) => setProgramme(e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 py-1.5 px-2 text-xs rounded-xl focus:border-emerald-700 focus:bg-white font-medium cursor-pointer focus:ring-2 focus:ring-emerald-100 outline-hidden"
                    >
                      <option value="SUSTAIN">SUSTAIN</option>
                      <option value="CPD">CPD Advanced</option>
                      <option value="YOUTH-EMP">Youth Employability</option>
                    </select>
                  </div>

                  {/* Pathway */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-extrabold uppercase font-mono block">Pathway</label>
                    <select 
                      value={pathway} 
                      onChange={(e) => setPathway(e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 py-1.5 px-2 text-xs rounded-xl focus:border-emerald-700 focus:bg-white font-medium cursor-pointer focus:ring-2 focus:ring-emerald-100 outline-hidden"
                    >
                      <option value="Agri-Bus">Agri-Bus</option>
                      <option value="Digital-Lit">Digital Literacy</option>
                      <option value="Core-Skills">Core Skills</option>
                    </select>
                  </div>

                  {/* Cohort */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-extrabold uppercase font-mono block">Cohort</label>
                    <select 
                      value={cohort} 
                      onChange={(e) => setCohort(e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 py-1.5 px-2 text-xs rounded-xl focus:border-emerald-700 focus:bg-white font-medium cursor-pointer focus:ring-2 focus:ring-emerald-100 outline-hidden"
                    >
                      <option value="Cohort 02">Cohort 02</option>
                      <option value="Cohort 01">Cohort 01</option>
                      <option value="Cohort 03">Cohort 03</option>
                    </select>
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-extrabold uppercase font-mono block">State</label>
                    <select 
                      value={state} 
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 py-1.5 px-2 text-xs rounded-xl focus:border-emerald-700 focus:bg-white font-medium cursor-pointer focus:ring-2 focus:ring-emerald-100 outline-hidden"
                    >
                      <option value="Kano">Kano</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="FCT">Abuja (FCT)</option>
                    </select>
                  </div>

                  {/* LGA */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-extrabold uppercase font-mono block">LGA</label>
                    <select 
                      value={lga} 
                      onChange={(e) => setLga(e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 py-1.5 px-2 text-xs rounded-xl focus:border-emerald-700 focus:bg-white font-medium cursor-pointer focus:ring-2 focus:ring-emerald-100 outline-hidden"
                    >
                      <option value="Tarauni">Tarauni</option>
                      <option value="Nassarawa">Nassarawa</option>
                      <option value="Fagge">Fagge</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-extrabold uppercase font-mono block">Status</label>
                    <select 
                      value={status} 
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50 py-1.5 px-2 text-xs rounded-xl focus:border-emerald-700 focus:bg-white font-medium cursor-pointer focus:ring-2 focus:ring-emerald-100 outline-hidden"
                    >
                      <option value="All">All Learners</option>
                      <option value="Active">Active Learners</option>
                      <option value="Completed">Ready CPD Only</option>
                    </select>
                  </div>

                  {/* Action */}
                  <button 
                    onClick={() => handleAction("Apply Filters", "Report filters applied in this frontend prototype.")}
                    className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-200/80 rounded-xl py-1.5 text-xs font-bold transition-all cursor-pointer focus-ring text-center"
                  >
                    Apply Filters
                  </button>

                </div>
              </section>

              {/* Report Template Library */}
              <section id="template-library" className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-slate-500 uppercase tracking-widest font-mono">
                    Report Template Library
                  </h3>
                  <button 
                    onClick={() => handleAction("View All", "Template library expanded in this frontend prototype.")}
                    className="text-xs font-bold text-[#005c45] hover:text-[#004d33] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Cohort Summary", desc: "Aggregated progress metrics and engagement..." },
                    { title: "Learner Progress", desc: "Granular view of individual learner lesson completion..." },
                    { title: "Assessment Review", desc: "Detailed breakdown of quiz scores, attempt counts,..." },
                    { title: "Follow-Up Action", desc: "List of learners requiring direct intervention or..." },
                    { title: "Support Ticket", desc: "Overview of technical issues and administrative..." },
                    { title: "Certificate Readiness", desc: "Identifies learners who have met all CPD..." },
                    { title: "Low-Bandwidth Support", desc: "Analysis of offline module usage and SMS-based..." },
                    { title: "Gender & Location", desc: "Demographic breakdown of the cohort for donor..." }
                  ].map((temp) => (
                    <div 
                      key={temp.title}
                      onClick={() => handleAction(temp.title, `Selected ${temp.title} template.`)}
                      className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between text-left shadow-3xs"
                    >
                      <div className="space-y-3">
                        <span className="p-2 bg-emerald-50 text-[#005c45] rounded-xl inline-block">
                          <FileText className="h-4 w-4" />
                        </span>
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-slate-800 tracking-tight leading-tight">
                            {temp.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                            {temp.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Report Preview Grid */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Large Card: Cohort Summary Preview + Learner Progress Preview */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Cohort Summary Preview */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-3xs text-left overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                      <h4 className="text-xs font-extrabold text-slate-550 uppercase tracking-widest font-mono">
                        Cohort Summary Preview
                      </h4>
                      <button 
                        onClick={() => handleAction("Expand", "Cohort preview expanded.")}
                        className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-6 text-center border-b border-slate-100 pb-6 mb-6">
                        <div>
                          <p className="text-2xl font-black text-slate-800 font-sans leading-none">510</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 font-mono">Enrolled</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-800 font-sans leading-none">58%</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 font-mono">Avg Progress</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-800 font-sans leading-none">64</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1 font-mono">Ready</p>
                        </div>
                      </div>

                      {/* Learner Progress Preview Sub-table */}
                      <div className="space-y-4">
                        <h5 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">
                          Learner Progress Preview
                        </h5>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                                <th className="pb-2 font-mono">Learner Name</th>
                                <th className="pb-2 font-mono">Progress</th>
                                <th className="pb-2 text-right font-mono">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { name: "Aisha Mohammed", progress: 42, color: "bg-emerald-700" },
                                { name: "Musa Danladi", progress: 28, color: "bg-amber-600" },
                                { name: "Fatima Lawal", progress: 76, color: "bg-emerald-700" }
                              ].map((row) => (
                                <tr key={row.name} className="border-b border-slate-100/60 hover:bg-emerald-50/20 transition-colors">
                                  <td className="py-3 text-xs font-bold text-slate-700">{row.name}</td>
                                  <td className="py-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/50 shrink-0">
                                        <div className={`h-full ${row.color}`} style={{ width: `${row.progress}%` }} />
                                      </div>
                                      <span className="text-[11px] font-bold text-slate-500 font-mono">{row.progress}%</span>
                                    </div>
                                  </td>
                                  <td className="py-3 text-right">
                                    <button 
                                      onClick={() => handleAction("View Row", `Previewing details for ${row.name}`)}
                                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer transition-all"
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right Stacks: Assessment, Follow-Ups, Support, CPD Readiness */}
                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 text-left">
                  
                  {/* Assessment Summary */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
                      Assessment Summary
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-600">12 Pending</span>
                        <span className="text-xs font-black text-slate-800">76% Average Score</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#005c45] h-full" style={{ width: "76%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Follow-Up Tasks */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
                        Follow-Up Tasks
                      </h4>
                      <div className="space-y-1">
                        <p className="text-base font-black text-red-600">18 Open</p>
                        <p className="text-[10px] text-slate-400 font-mono">7 due today</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsUrgentReviewOpen(true)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200/50 rounded-xl py-1.5 text-xs font-bold transition-all cursor-pointer focus-ring text-center"
                    >
                      Review Urgents
                    </button>
                  </div>

                  {/* Support Tickets */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
                      Support Tickets
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-slate-50 p-2 rounded-xl">
                        <p className="text-xs font-black text-slate-700">9</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase font-mono">Open</p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-xl">
                        <p className="text-xs font-black text-blue-700">4</p>
                        <p className="text-[9px] text-blue-400 font-bold uppercase font-mono">In-Progress</p>
                      </div>
                      <div className="bg-red-50 p-2 rounded-xl">
                        <p className="text-xs font-black text-red-600">2</p>
                        <p className="text-[9px] text-red-400 font-bold uppercase font-mono">Escalated</p>
                      </div>
                    </div>
                  </div>

                  {/* CPD Readiness */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
                      CPD Readiness
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span className="text-xs font-black">64 Ready</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                        <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                        <span>118 Near Eligible</span>
                      </div>
                    </div>
                  </div>

                </div>

              </section>

              {/* Gender Breakdown + Location Focus */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
                
                {/* Gender Breakdown (Span 5) */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
                  <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono border-b border-slate-100 pb-3">
                    Gender Breakdown
                  </h4>

                  <div className="flex flex-col sm:flex-row items-center justify-around py-6 gap-6">
                    {/* SVG Donut Chart */}
                    <div className="relative h-28 w-28 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* Background track (Male: 44%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e0f2fe" strokeWidth="3" />
                        {/* Segment overlay (Female: 56%) */}
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="15.915" 
                          fill="none" 
                          stroke="#005c45" 
                          strokeWidth="3.5" 
                          strokeDasharray="56 44" 
                          strokeDashoffset="0" 
                        />
                      </svg>
                      {/* Inside center text */}
                      <div className="absolute text-center">
                        <p className="text-xl font-black text-slate-800 leading-none">510</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Total</p>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="space-y-3 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#005c45] shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Female: 286</p>
                          <p className="text-[10px] text-slate-400 font-bold font-mono">(56% of Cohort)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-sky-200 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">Male: 224</p>
                          <p className="text-[10px] text-slate-400 font-bold font-mono">(44% of Cohort)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Focus (Span 7) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
                  <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono border-b border-slate-100 pb-3">
                    Location Focus
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2 items-center">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider font-mono">PRIMARY REGION</span>
                        <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-[#005c45]" /> State: Kano
                          </span>
                          <span className="bg-indigo-50 text-indigo-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
                            92% of Cohort
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider font-mono">SECONDARY SECTOR</span>
                        <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-[#005c45]" /> LGA: Tarauni
                          </span>
                          <span className="bg-indigo-50 text-indigo-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
                            48% of Cohort
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Static Map-style Placeholder */}
                    <div className="w-full bg-slate-100 h-32 rounded-xl relative border border-slate-200/60 overflow-hidden flex flex-col justify-end p-2 text-center">
                      <div className="absolute inset-0 bg-sky-50 flex items-center justify-center">
                        <div className="relative w-full h-full opacity-65 flex flex-col justify-around">
                          {/* Map drawing representation */}
                          <div className="w-full h-0.5 bg-slate-200 rotate-12" />
                          <div className="w-full h-0.5 bg-slate-200 -rotate-12" />
                          <div className="w-0.5 h-full bg-slate-200 left-1/3 absolute" />
                          <div className="w-0.5 h-full bg-slate-200 left-2/3 absolute" />
                        </div>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                        <div className="p-2 bg-[#005c45] text-white rounded-full shadow-md animate-bounce">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <p className="text-[11px] font-bold text-slate-750 bg-white/95 border border-slate-200 py-0.5 px-2.5 rounded-full shadow-3xs mt-1.5">
                          Kano Hub Sector
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </section>

              {/* Export Formats + Export History */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Export Formats (Span 4) */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono border-b border-slate-100 pb-3">
                      Export Formats
                    </h4>

                    {/* Selectable Formats */}
                    <div className="space-y-3">
                      {[
                        { id: "pdf", title: "Professional PDF", ext: "pdf", subtitle: "Official program reports" },
                        { id: "xlsx", title: "Excel (.xlsx)", ext: "xlsx", subtitle: "Standard analysis spreadsheet" },
                        { id: "drive", title: "Drive File", ext: "drive", subtitle: "Sync directly to Workspace" }
                      ].map((fmt) => {
                        const isSel = selectedFormat === fmt.id;
                        return (
                          <div 
                            key={fmt.id}
                            onClick={() => setSelectedFormat(fmt.id as "pdf" | "xlsx" | "drive")}
                            className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                              isSel 
                                ? "border-[#005c45] bg-emerald-50/20" 
                                : "border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSel ? "border-[#005c45]" : "border-slate-300"
                              }`}>
                                {isSel && <span className="h-2 w-2 rounded-full bg-[#005c45]" />}
                              </span>
                              <div className="text-left">
                                <p className="text-xs font-bold text-slate-850 leading-tight">{fmt.title}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{fmt.subtitle}</p>
                              </div>
                            </div>
                            <span className="text-[9px] text-slate-400 font-bold uppercase font-mono">{fmt.ext}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Options checkboxes inside a beautiful block */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3 mt-4">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider font-mono">SETTINGS</span>
                      <div className="space-y-2.5">
                        <label className="flex items-center gap-2.5 text-xs text-slate-650 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={includePII} 
                            onChange={(e) => setIncludePII(e.target.checked)}
                            className="rounded-sm border-slate-300 text-[#005c45] focus:ring-emerald-100"
                          />
                          <span className="font-medium">Include PII Data</span>
                        </label>
                        <label className="flex items-center gap-2.5 text-xs text-slate-650 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={summaryFirst} 
                            onChange={(e) => setSummaryFirst(e.target.checked)}
                            className="rounded-sm border-slate-300 text-[#005c45] focus:ring-emerald-100"
                          />
                          <span className="font-medium">Summary Page First</span>
                        </label>
                        <label className="flex items-center gap-2.5 text-xs text-slate-650 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={donorBranding} 
                            onChange={(e) => setDonorBranding(e.target.checked)}
                            className="rounded-sm border-slate-300 text-[#005c45] focus:ring-emerald-100"
                          />
                          <span className="font-medium">Donor Branding</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Export History (Span 8) */}
                <div id="export-history" className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <h4 className="text-xs font-extrabold text-slate-550 uppercase tracking-widest font-mono">
                        Export History
                      </h4>
                      <span className="text-[10px] text-slate-400 font-extrabold font-mono">
                        Last 30 Days
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-150 text-[10px] font-bold text-slate-450 uppercase tracking-wider pb-2">
                            <th className="pb-3 font-mono">Report Name</th>
                            <th className="pb-3 font-mono">Generated By</th>
                            <th className="pb-3 font-mono">Status</th>
                            <th className="pb-3 text-right font-mono">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exportHistory.map((exp) => (
                            <tr key={exp.name} className="border-b border-slate-100/80 hover:bg-emerald-50/15 transition-all">
                              <td className="py-4">
                                <p className="text-xs font-bold text-slate-700">{exp.name}</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{exp.meta}</p>
                              </td>
                              <td className="py-4 text-xs font-semibold text-slate-600">{exp.by}</td>
                              <td className="py-4">
                                <span className="bg-emerald-50 text-emerald-850 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-150">
                                  {exp.status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <button 
                                  onClick={() => handleAction("Download", `Report download simulated in this frontend prototype.`)}
                                  className="p-1.5 text-slate-400 hover:text-emerald-850 hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-lg cursor-pointer transition-all inline-flex items-center gap-1 focus-ring"
                                  title="Download"
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </section>

              {/* Privacy Note + Recommended Next Action Card */}
              <div className="pt-6 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
                
                {/* Privacy disclaimer */}
                <div className="max-w-xl space-y-1">
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    <span className="font-extrabold text-slate-700">Report Access & Privacy:</span> Facilitator data permissions are limited to assigned cohorts within the Kano State workspace. Exporting sensitive learner data (PII) is logged and audited according to SUSTAIN LMS data security protocols.
                  </p>
                </div>

                {/* Recommended action CTA card */}
                <div className="bg-emerald-50 border-l-4 border-[#005c45] p-5 rounded-r-2xl max-w-md w-full shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-3xs">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">Recommended Next Action</p>
                    <p className="text-xs font-extrabold text-slate-800 leading-snug">Ensure your end-of-month reporting is complete.</p>
                  </div>
                  <button 
                    onClick={() => handleAction("Generate Monthly", "Monthly cohort summary generated locally in this frontend prototype.")}
                    className="bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 px-3.5 text-xs font-bold transition-all shrink-0 hover:-translate-y-0.5 shadow-3xs cursor-pointer flex items-center gap-1 focus-ring"
                  >
                    <span>Generate summary</span>
                    <Sparkles className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
              </>
              ) : (
                <ReportViews
                  activeInternalItem={activeInternalItem}
                  selectedCohort={selectedCohort}
                  setSelectedCohort={setSelectedCohort}
                  selectedLearner={selectedLearner}
                  setSelectedLearner={setSelectedLearner}
                  selectedAssessment={selectedAssessment}
                  setSelectedAssessment={setSelectedAssessment}
                  workspaceFormat={workspaceFormat}
                  setWorkspaceFormat={setWorkspaceFormat}
                  setNewReportType={setNewReportType}
                  setReportStep={setReportStep}
                  setIsCreateModalOpen={setIsCreateModalOpen}
                  navigateTo={navigateTo}
                  showToast={showToast}
                  exportHistory={exportHistory}
                  handleGenerateSelectedExport={handleGenerateSelectedExport}
                  incParticipation={incParticipation}
                  setIncParticipation={setIncParticipation}
                  incProgress={incProgress}
                  setIncProgress={setIncProgress}
                  incScores={incScores}
                  setIncScores={setIncScores}
                  incFollowUps={incFollowUps}
                  setIncFollowUps={setIncFollowUps}
                  incSupportTickets={incSupportTickets}
                  setIncSupportTickets={setIncSupportTickets}
                  incCertificates={incCertificates}
                  setIncCertificates={setIncCertificates}
                  incLowBandwidth={incLowBandwidth}
                  setIncLowBandwidth={setIncLowBandwidth}
                  incDemographics={incDemographics}
                  setIncDemographics={setIncDemographics}
                  newSummaryFirst={newSummaryFirst}
                  setNewSummaryFirst={setNewSummaryFirst}
                  newExcludePII={newExcludePII}
                  setNewExcludePII={setNewExcludePII}
                  newIncludeIDs={newIncludeIDs}
                  setNewIncludeIDs={setNewIncludeIDs}
                  newAddFacilitator={newAddFacilitator}
                  setNewAddFacilitator={setNewAddFacilitator}
                  newAddBranding={newAddBranding}
                  setNewAddBranding={setNewAddBranding}
                  getIncludedSections={getIncludedSections}
                />
              )}

            </div>
          </main>

        </div>

      </div>


      {/* ========================================================
          MOBILE VIEW (Below 1024px width)
         ======================================================== */}
      <div className="block lg:hidden min-h-screen pb-24">
        
        {/* Mobile Header Top Bar */}
        <header className="h-14 bg-white border-b border-slate-150 px-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)}
              className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer focus-ring"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-base font-black text-slate-800 font-sans tracking-tight">
              Reports
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => showToast("Notifications are not configured in this reports prototype.")}
              className="p-1 text-slate-400 hover:text-slate-600 relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
            </button>
            <div className="h-8 w-8 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center font-bold text-xs text-white">
              HS
            </div>
          </div>
        </header>

        {/* Mobile Page Content wrapper */}
        <main className="p-4 space-y-6 text-left">
          
          {/* Mobile Internal Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none shrink-0 -mx-4 px-4 border-b border-slate-150">
            {[
              { name: "Dashboard", icon: Grid },
              { name: "Cohort Summaries", icon: Layers },
              { name: "Learner Progress", icon: TrendingUp },
              { name: "Assessment Reviews", icon: Award },
              { name: "History Ledger", icon: Clock },
              { name: "Export Workspace", icon: FileSpreadsheet },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeInternalItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveInternalItem(item.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive 
                      ? "bg-indigo-50 text-indigo-950 border border-indigo-150 shadow-3xs" 
                      : "bg-white text-slate-500 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-900"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-indigo-800" : "text-slate-450"}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {activeInternalItem === "Dashboard" ? (
            <>
              {/* Label Context + Mobile Hero */}
              <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                WORKSPACE DASHBOARD
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Reports & Exports
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500">
                Q3 2024 • Kano State Cohort A-F
              </p>
            </div>

            {/* Mobile primary quick action buttons */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  setReportStep("form");
                  setIsCreateModalOpen(true);
                }}
                className="w-full bg-[#005c45] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer flex items-center justify-center gap-2 active:bg-emerald-900 focus-ring"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Report</span>
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById("mobile-recent-downloads");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                className="w-full bg-indigo-50 text-indigo-950 border border-indigo-200/50 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:bg-indigo-100 focus-ring"
              >
                <Clock className="h-4.5 w-4.5 text-indigo-800" />
                <span>View Export History</span>
              </button>
            </div>
          </div>

          {/* Active Workspace status info card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs flex justify-between items-center text-left">
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">System Readiness</span>
              <h3 className="text-xs font-extrabold text-[#005c45] uppercase">Active Workspace</h3>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-800 leading-none">12</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase font-mono mt-0.5">Templates</p>
            </div>
          </div>

          {/* Metric cards grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Recent Exports", value: "6" },
              { label: "Active Learners", value: "510" },
              { label: "Pending Reviews", value: "18" },
              { label: "Programmes", value: "04" },
            ].map((metric) => (
              <div 
                key={metric.label}
                onClick={() => showToast(`Selected metric ${metric.label}`)}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs text-left active:bg-slate-50 transition-colors cursor-pointer select-none"
              >
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
                  {metric.label}
                </span>
                <span className="text-xl font-black text-slate-800 mt-1 block">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile Report Filters Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-3xs overflow-hidden">
            <button 
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full p-4 flex justify-between items-center bg-slate-50/50 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-slate-700">
                <ListFilter className="h-4 w-4" />
                <span className="text-xs font-extrabold uppercase tracking-wider font-mono">Report Filters</span>
              </div>
              {mobileFiltersOpen ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
            </button>

            {mobileFiltersOpen && (
              <div className="p-4 border-t border-slate-100 space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold uppercase font-mono">Agribusiness Foundation</label>
                    <select className="w-full border border-slate-200 py-1.5 px-2 text-xs rounded-xl font-medium">
                      <option>Agribusiness Foundation</option>
                      <option>CPD Professional Course</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold uppercase font-mono">Cohort A (Kano North)</label>
                    <select className="w-full border border-slate-200 py-1.5 px-2 text-xs rounded-xl font-medium">
                      <option>Cohort A (Kano North)</option>
                      <option>Cohort B (Kano Central)</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={() => handleAction("Apply Mobile Filters", "Report filters applied in this frontend prototype.")}
                  className="w-full bg-[#005c45] text-white py-2 rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer text-center"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>

          {/* Mobile Template Library List */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono">
              Template Library
            </h3>

            <div className="space-y-2">
              {[
                { name: "Cohort Summary", sub: "Performance & participation trends" },
                { name: "Learner Progress", sub: "Individual tracking & completion" },
                { name: "Assessment Review", sub: "Score distributions & item analysis" }
              ].map((temp) => (
                <div 
                  key={temp.name}
                  onClick={() => handleAction(temp.name, `Selected ${temp.name} template.`)}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs flex items-center justify-between cursor-pointer active:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 bg-emerald-50 text-[#005c45] rounded-xl">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-850 leading-tight">{temp.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{temp.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4.5 w-4.5 text-slate-350" />
                </div>
              ))}
            </div>
          </div>

          {/* Pending Actions card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs text-left space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono">Pending Actions</span>
              <span className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-100/40 uppercase tracking-wider font-mono">
                URGENT
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold">
                  <span>SUPPORT TICKET #442</span>
                  <span>2h ago</span>
                </div>
                <p className="text-xs font-black text-slate-800 leading-tight">Unable to access Module 3 Quiz</p>
                <p className="text-[10px] text-slate-500 font-medium leading-tight">Learner: Musa Ibrahim (Cohort B)...</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold">
                  <span>QUESTION REVIEW</span>
                  <span>5h ago</span>
                </div>
                <p className="text-xs font-black text-slate-800 leading-tight">Calculation clarification on Soil PH</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button 
                onClick={() => handleAction("Reply", "Replying to support ticket.")}
                className="bg-[#005c45] text-white py-2 px-4 rounded-xl text-xs font-bold text-center cursor-pointer active:bg-emerald-900 focus-ring"
              >
                Reply
              </button>
              <button 
                onClick={() => handleAction("Dismiss", "Action item dismissed locally.")}
                className="bg-slate-50 text-slate-600 border border-slate-200 py-2 px-4 rounded-xl text-xs font-bold text-center cursor-pointer active:bg-slate-100 focus-ring"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Certification Status card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs text-left space-y-4">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
              Certification Status
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                  <span>Ready for Issuance</span>
                  <span className="font-extrabold text-slate-900">64</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                  <div className="bg-[#005c45] h-full" style={{ width: "35%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                  <span>Near Eligibility (&gt;85%)</span>
                  <span className="font-extrabold text-slate-900">118</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                  <div className="bg-slate-500 h-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Low-Bandwidth Mode card */}
          <div className="bg-[#1e293b] text-slate-200 border border-slate-850 rounded-2xl p-5 shadow-3xs text-left space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-900/40 text-emerald-400 rounded-xl">
                <FileSpreadsheet className="h-4.5 w-4.5" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">Low-Bandwidth Mode</h4>
                <p className="text-[10px] text-slate-400">Optimization metrics</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-base font-black text-white leading-none">
                118 <span className="text-xs font-medium text-slate-450">/ 146 learners using transcripts</span>
              </p>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[10px] font-mono">
                <span className="text-slate-400 uppercase">DATA SAVINGS</span>
                <span className="text-emerald-400 font-bold">~420 MB / Learner</span>
              </div>
            </div>
          </div>

          {/* Demographics Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs text-left space-y-4">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
              Demographics
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-0.5">
                <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">LOCATION FOCUS</span>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">Kano State</h4>
                <p className="text-[10px] text-slate-400 font-mono font-medium">Tarauni LGA • 510 Total Learners</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-xs font-extrabold text-slate-500 font-mono">FEMALE</p>
                  <p className="text-lg font-black text-[#005c45] mt-0.5 leading-none">62%</p>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#005c45] h-full" style={{ width: "62%" }} />
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-xs font-extrabold text-slate-500 font-mono">MALE</p>
                  <p className="text-lg font-black text-slate-800 mt-0.5 leading-none">38%</p>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                    <div className="bg-slate-400 h-full" style={{ width: "38%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Workspace card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs text-left space-y-3">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">
              Export Workspace
            </h3>

            <div className="space-y-2">
              {[
                { id: "pdf", title: "Export as PDF Document", ext: "pdf" },
                { id: "xlsx", title: "Export as Excel Sheet", ext: "xlsx" },
                { id: "csv", title: "Export as CSV Data", ext: "csv" }
              ].map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleAction(item.title, `${item.ext.toUpperCase()} export simulated in this frontend prototype.`)}
                  className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50/50 hover:bg-slate-50 rounded-xl cursor-pointer active:bg-slate-100 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <FileSpreadsheet className="h-4.5 w-4.5 text-slate-400" />
                    <span>{item.title}</span>
                  </span>
                  <Download className="h-4 w-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Downloads card */}
          <div id="mobile-recent-downloads" className="bg-white border border-slate-200 rounded-2xl p-4 shadow-3xs text-left space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest font-mono">
                Recent Downloads
              </h3>
              <span className="text-[10px] text-slate-450 font-bold font-mono">Last 30 Days</span>
            </div>

            <div className="space-y-3.5 pt-1">
              {mobileDownloads.map((doc) => (
                <div 
                  key={doc.name}
                  onClick={() => handleAction("Download Row", `Report download simulated in this frontend prototype.`)}
                  className="flex justify-between items-center pb-3 border-b border-slate-100/60 last:border-0 last:pb-0 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-700 leading-tight">{doc.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{doc.date}</p>
                  </div>
                  <MoreVertical className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy/security note block */}
          <div className="bg-[#f0f9ff]/50 border border-sky-100 rounded-2xl p-4 text-center">
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              🔒 All exports are encrypted and contain PII. Data handling complies with Nigeria Data Protection Regulation (NDPR). Access is logged for audit purposes.
            </p>
          </div>

          {/* Recommended Action mobile CTA */}
          <div className="bg-[#005c45] text-white rounded-2xl p-5 shadow-3xs text-center space-y-4 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-800/10 rounded-full" />
            <div className="space-y-1 relative z-10">
              <span className="text-[9px] text-emerald-100 font-bold uppercase tracking-wider font-mono">RECOMMENDED ACTION</span>
              <h4 className="text-sm font-black leading-tight text-white">Generate the Monthly Cohort Summary</h4>
            </div>
            <button 
              onClick={() => handleAction("Run Auto-Report", "Auto-report generated locally in this frontend prototype.")}
              className="w-full bg-white text-[#005c45] py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer shadow-3xs active:bg-slate-50 focus-ring"
            >
              Run Auto-Report
            </button>
          </div>

          </>
          ) : (
            <ReportViews
              activeInternalItem={activeInternalItem}
              selectedCohort={selectedCohort}
              setSelectedCohort={setSelectedCohort}
              selectedLearner={selectedLearner}
              setSelectedLearner={setSelectedLearner}
              selectedAssessment={selectedAssessment}
              setSelectedAssessment={setSelectedAssessment}
              workspaceFormat={workspaceFormat}
              setWorkspaceFormat={setWorkspaceFormat}
              setNewReportType={setNewReportType}
              setReportStep={setReportStep}
              setIsCreateModalOpen={setIsCreateModalOpen}
              navigateTo={navigateTo}
              showToast={showToast}
              exportHistory={exportHistory}
              handleGenerateSelectedExport={handleGenerateSelectedExport}
              incParticipation={incParticipation}
              setIncParticipation={setIncParticipation}
              incProgress={incProgress}
              setIncProgress={setIncProgress}
              incScores={incScores}
              setIncScores={setIncScores}
              incFollowUps={incFollowUps}
              setIncFollowUps={setIncFollowUps}
              incSupportTickets={incSupportTickets}
              setIncSupportTickets={setIncSupportTickets}
              incCertificates={incCertificates}
              setIncCertificates={setIncCertificates}
              incLowBandwidth={incLowBandwidth}
              setIncLowBandwidth={setIncLowBandwidth}
              incDemographics={incDemographics}
              setIncDemographics={setIncDemographics}
              newSummaryFirst={newSummaryFirst}
              setNewSummaryFirst={setNewSummaryFirst}
              newExcludePII={newExcludePII}
              setNewExcludePII={setNewExcludePII}
              newIncludeIDs={newIncludeIDs}
              setNewIncludeIDs={setNewIncludeIDs}
              newAddFacilitator={newAddFacilitator}
              setNewAddFacilitator={setNewAddFacilitator}
              newAddBranding={newAddBranding}
              setNewAddBranding={setNewAddBranding}
              getIncludedSections={getIncludedSections}
            />
          )}

        </main>

        {/* Mobile Bottom Navigation Bar */}
        <div 
          id="facilitator-mobile-nav" 
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 h-16 flex items-center justify-between shadow-lg px-2"
        >
          {[
            { id: "overview", label: "Overview", icon: Grid, path: "/facilitator/dashboard" },
            { id: "cohorts", label: "Cohorts", icon: Layers, path: "/facilitator/cohorts" },
            { id: "reports", label: "Reports", icon: BarChart3, path: "/facilitator/reports" },
            { id: "reviews", label: "Reviews", icon: Mail, path: "/facilitator/support-tickets" },
            { id: "support", label: "Support", icon: HelpCircle, path: "/facilitator/support" }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = item.id === "reports";
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.path) {
                    navigateTo(item.path as RoutePath);
                  }
                }}
                className={`flex flex-col items-center justify-center gap-1 h-full flex-1 min-w-0 text-[9px] font-extrabold transition-all duration-150 cursor-pointer select-none active:bg-slate-50 focus-ring ${
                  isActive ? "text-[#005C45]" : "text-slate-400"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-[#005C45] scale-105" : "text-slate-400"}`} />
                <span className="truncate max-w-full text-center">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            REUSABLE MOBILE FLOATING ACTION MENU
           ======================================================== */}
        <div ref={fabMenuRef} className="fixed bottom-20 right-4 z-50">
          
          {/* FAB Button */}
          <button
            onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
            className="h-12 w-12 rounded-full bg-[#005c45] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer focus-ring"
            aria-label="Reporting Actions Menu"
          >
            {isFabMenuOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-5.5 w-5.5" />}
          </button>

          {/* Action List Modal/Popup */}
          {isFabMenuOpen && (
            <div className="absolute bottom-14 right-0 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 w-60 text-left space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
              <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider font-mono px-3 pb-2 border-b border-slate-100">
                REPORT ACTIONS
              </span>
              
              <div className="space-y-0.5 pt-1">
                {[
                  { label: "Create New Report", msg: "Opening Create New Report...", isModal: true },
                  { label: "Generate cohort report", msg: "Cohort report generated locally in this frontend prototype." },
                  { label: "View export history", msg: "Scrolling to Export history...", target: "mobile-recent-downloads" },
                  { label: "Apply report filters", msg: "Scrolling to Report filters...", target: "report-filters" },
                  { label: "Open template library", msg: "Scrolling to Template library...", target: "template-library" },
                  { label: "Export PDF", msg: "PDF export simulated in this frontend prototype." },
                  { label: "Export Excel", msg: "Excel export simulated in this frontend prototype." },
                  { label: "Export CSV", msg: "CSV export simulated in this frontend prototype." },
                  { label: "Run auto-report", msg: "Monthly cohort summary generated locally in this frontend prototype." }
                ].map((act) => (
                  <button
                    key={act.label}
                    onClick={() => {
                      if (act.isModal) {
                        setReportStep("form");
                        setIsCreateModalOpen(true);
                        setIsFabMenuOpen(false);
                      } else {
                        handleAction(act.label, act.msg, act.target);
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-slate-650 hover:bg-emerald-50 hover:text-[#005c45] rounded-lg transition-colors cursor-pointer block truncate mobile-action-item"
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ==========================================
          CREATE NEW REPORT MODAL / DRAWER
          ========================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          {/* Centered Modal Content Container (Desktop: max-w-2xl, Mobile: full screen / bottom sheet layout) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-start shrink-0">
              <div className="space-y-0.5 text-left">
                <h3 className="text-sm font-extrabold text-[#005c45] uppercase tracking-wider font-mono">
                  Create New Report
                </h3>
                <p className="text-xs text-slate-500">
                  Choose the report type, cohort, date range, and export format.
                </p>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {reportStep === "form" ? (
              <>
                {/* Modal Body (Scrollable form) */}
                <div className="p-6 overflow-y-auto space-y-6 text-left text-xs text-slate-700">
                  
                  {/* SECTION 1: Report Details */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 text-xs pb-1 border-b border-slate-150 uppercase tracking-wide">
                      Section 1: Report Details
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Report Type */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Report Type</label>
                        <select 
                          value={newReportType}
                          onChange={(e) => setNewReportType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                        >
                          <option value="Cohort Summary">Cohort Summary</option>
                          <option value="Learner Progress">Learner Progress</option>
                          <option value="Assessment Review">Assessment Review</option>
                          <option value="Follow-Up Action">Follow-Up Action</option>
                          <option value="Support Ticket">Support Ticket</option>
                          <option value="Certificate Readiness">Certificate Readiness</option>
                          <option value="Low-Bandwidth Support">Low-Bandwidth Support</option>
                          <option value="Gender & Location">Gender & Location</option>
                        </select>
                      </div>

                      {/* Report Name */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Report Name</label>
                        <input 
                          type="text"
                          value={newReportName}
                          onChange={(e) => setNewReportName(e.target.value)}
                          placeholder="e.g. Kano Cohort 02 Monthly Summary"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium placeholder-slate-400"
                        />
                      </div>

                      {/* Programme */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Programme</label>
                        <select 
                          value={newProgramme}
                          onChange={(e) => setNewProgramme(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                        >
                          <option value="SUSTAIN CPD Programme">SUSTAIN CPD Programme</option>
                          <option value="SUSTAIN Agri-Business">SUSTAIN Agri-Business</option>
                          <option value="SUSTAIN Digital Literacy">SUSTAIN Digital Literacy</option>
                        </select>
                      </div>

                      {/* Cohort */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">Cohort</label>
                        <select 
                          value={newCohort}
                          onChange={(e) => setNewCohort(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                        >
                          <option value="Kano Youth Employability Cohort 02">Kano Youth Employability Cohort 02</option>
                          <option value="Kano Youth Employability Cohort 01">Kano Youth Employability Cohort 01</option>
                          <option value="Kano Youth Employability Cohort 03">Kano Youth Employability Cohort 03</option>
                        </select>
                      </div>

                      {/* State */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">State</label>
                        <select 
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                        >
                          <option value="Kano">Kano</option>
                          <option value="Kaduna">Kaduna</option>
                          <option value="Abuja (FCT)">Abuja (FCT)</option>
                        </select>
                      </div>

                      {/* LGA */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-600">LGA</label>
                        <select 
                          value={newLga}
                          onChange={(e) => setNewLga(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                        >
                          <option value="Tarauni">Tarauni</option>
                          <option value="Nassarawa">Nassarawa</option>
                          <option value="Fagge">Fagge</option>
                        </select>
                      </div>

                      {/* Date Range */}
                      <div className="space-y-1 sm:col-span-2">
                        <label className="font-bold text-slate-600">Date Range</label>
                        <select 
                          value={newDateRange}
                          onChange={(e) => setNewDateRange(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                        >
                          <option value="This Month">This Month</option>
                          <option value="Last 30 Days">Last 30 Days</option>
                          <option value="This Quarter">This Quarter</option>
                          <option value="Custom Range">Custom Range</option>
                        </select>
                      </div>

                      {/* Custom Range Start/End Dates */}
                      {newDateRange === "Custom Range" && (
                        <>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-600">Start Date</label>
                            <input 
                              type="date"
                              value={newStartDate}
                              onChange={(e) => setNewStartDate(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-600">End Date</label>
                            <input 
                              type="date"
                              value={newEndDate}
                              onChange={(e) => setNewEndDate(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                            />
                          </div>
                        </>
                      )}

                    </div>
                  </div>

                  {/* SECTION 2: Data to Include */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-xs pb-1 border-b border-slate-150 uppercase tracking-wide">
                      Section 2: Data to Include
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Select which metrics and details to compile into this export document.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-1">
                      {[
                        { id: "incParticipation", label: "Learner participation summary", val: incParticipation, set: setIncParticipation },
                        { id: "incProgress", label: "Course progress", val: incProgress, set: setIncProgress },
                        { id: "incScores", label: "Assessment scores", val: incScores, set: setIncScores },
                        { id: "incFollowUps", label: "Follow-up actions", val: incFollowUps, set: setIncFollowUps },
                        { id: "incSupportTickets", label: "Support ticket activity", val: incSupportTickets, set: setIncSupportTickets },
                        { id: "incCertificates", label: "Certificate readiness", val: incCertificates, set: setIncCertificates },
                        { id: "incLowBandwidth", label: "Low-bandwidth usage", val: incLowBandwidth, set: setIncLowBandwidth },
                        { id: "incDemographics", label: "Gender and location breakdown", val: incDemographics, set: setIncDemographics }
                      ].map((chk) => (
                        <label key={chk.id} className="flex items-center gap-2.5 cursor-pointer py-1 hover:bg-slate-50/50 rounded-lg transition-colors select-none">
                          <input 
                            type="checkbox"
                            checked={chk.val}
                            onChange={(e) => chk.set(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-xs text-slate-650 font-medium">{chk.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: Privacy & Export Options */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 text-xs pb-1 border-b border-slate-150 uppercase tracking-wide">
                      Section 3: Privacy and Export Options
                    </h4>

                    {/* Export Format (Radio cards) */}
                    <div className="space-y-2">
                      <label className="font-bold text-slate-600 block">Export Format</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "PDF", title: "Professional PDF", desc: "Formatted document with program styling", icon: FileText },
                          { id: "Excel", title: "Excel (.xlsx)", desc: "Raw spreadsheet with summary calculations", icon: FileSpreadsheet },
                          { id: "CSV", title: "CSV Data", desc: "Standard flat data for analytics integration", icon: Download }
                        ].map((fmt) => {
                          const IconComp = fmt.icon;
                          const isSel = newExportFormat === fmt.id;
                          return (
                            <div 
                              key={fmt.id}
                              onClick={() => setNewExportFormat(fmt.id as "PDF" | "Excel" | "CSV")}
                              className={`flex flex-col p-3 border rounded-xl cursor-pointer transition-all ${
                                isSel 
                                  ? "border-emerald-600 bg-emerald-50/40 shadow-2xs" 
                                  : "border-slate-200 hover:border-emerald-250 hover:bg-slate-50/50"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <IconComp className={`h-4 w-4 shrink-0 ${isSel ? "text-emerald-800" : "text-slate-450"}`} />
                                <span className={`text-xs font-bold ${isSel ? "text-emerald-950" : "text-slate-700"}`}>{fmt.title}</span>
                              </div>
                              <p className="text-[10px] text-slate-450 leading-normal">{fmt.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Privacy Option checkboxes */}
                    <div className="space-y-2.5 pt-1">
                      <label className="font-bold text-slate-600 block">Privacy Options</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {[
                          { id: "newSummaryFirst", label: "Summary page first", val: newSummaryFirst, set: setNewSummaryFirst },
                          { id: "newExcludePII", label: "Exclude personal contact details (PII)", val: newExcludePII, set: setNewExcludePII },
                          { id: "newIncludeIDs", label: "Include learner IDs", val: newIncludeIDs, set: setNewIncludeIDs },
                          { id: "newAddFacilitator", label: "Add facilitator name (Halima Sani)", val: newAddFacilitator, set: setNewAddFacilitator },
                          { id: "newAddBranding", label: "Add programme branding", val: newAddBranding, set: setNewAddBranding }
                        ].map((chk) => (
                          <label key={chk.id} className="flex items-center gap-2.5 cursor-pointer py-1 select-none">
                            <input 
                              type="checkbox"
                              checked={chk.val}
                              onChange={(e) => chk.set(e.target.checked)}
                              className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                            />
                            <span className="text-xs text-slate-650 font-medium">{chk.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Compliance Box */}
                    <div className="bg-[#f0f9ff]/50 border border-sky-100 rounded-xl p-3 flex gap-2.5 items-start">
                      <ShieldCheck className="h-5 w-5 text-sky-700 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-500 leading-relaxed text-left">
                        Exports containing learner data are logged for audit purposes and should only be shared with authorised programme teams in compliance with Nigeria Data Protection Regulation (NDPR).
                      </p>
                    </div>

                  </div>

                  {/* SECTION 4: Report Preview Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-150 pb-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Report Preview</span>
                      <span className="text-[10px] bg-indigo-50 text-indigo-850 px-2 py-0.5 rounded-md font-bold border border-indigo-100">Live Preview</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] leading-relaxed">
                      <div>
                        <span className="text-slate-400 font-medium">Type:</span>{" "}
                        <span className="text-slate-700 font-bold">{newReportType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Cohort:</span>{" "}
                        <span className="text-slate-700 font-bold">{newCohort}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Expected Format:</span>{" "}
                        <span className="text-slate-700 font-bold">{newExportFormat}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Estimated Row Count:</span>{" "}
                        <span className="text-slate-700 font-bold">510 Learners</span>
                      </div>
                      <div className="col-span-2 text-left">
                        <span className="text-slate-400 font-medium">Included fields:</span>{" "}
                        <span className="text-slate-700 font-bold truncate block">{getIncludedSections()}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Modal Footer (Actions) */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-250 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all active:scale-95 focus-ring"
                  >
                    Cancel
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSaveDraft}
                      className="px-4 py-2 bg-slate-150 hover:bg-slate-200 text-slate-755 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 focus-ring"
                    >
                      Save Draft
                    </button>
                    <button 
                      onClick={handleGenerateReport}
                      className="px-4 py-2 bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs hover:-translate-y-0.5 active:scale-95 focus-ring"
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* SUCCESS STATE VIEW */
              <div className="p-8 text-center space-y-6 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
                <div className="h-14 w-14 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center border border-emerald-150 shadow-3xs">
                  <CheckCircle2 className="h-8 w-8 text-emerald-700" />
                </div>
                
                <div className="space-y-2 max-w-sm">
                  <h4 className="text-base font-black text-slate-800">
                    Report Compiled Successfully!
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The requested file <span className="font-bold text-slate-755">"{newReportName.trim().replace(/[\s\W]+/g, "_") || "Kano_C02_New_Report"}.{newExportFormat === "PDF" ? "pdf" : newExportFormat === "Excel" ? "xlsx" : "csv"}"</span> has been constructed in this interactive sandbox session and added to the Export History Ledger.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm pt-2">
                  <button 
                    onClick={scrollToExportHistory}
                    className="flex-1 px-4 py-2.5 bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs text-center active:scale-95 focus-ring"
                  >
                    View Export History
                  </button>
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer transition-all text-center active:scale-95 focus-ring"
                  >
                    Close Drawer
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}


      {/* ==========================================
          REPORT SETTINGS MODAL
          ========================================== */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col w-full max-w-md max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
              <div className="space-y-0.5 text-left">
                <h3 className="text-xs font-extrabold text-[#005c45] uppercase tracking-wider font-mono">
                  Report Settings
                </h3>
                <p className="text-[11px] text-slate-400">
                  Configure default preferences for generating documents.
                </p>
              </div>
              <button 
                onClick={() => setIsSettingsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-left text-xs text-slate-700">
              {/* Default export format */}
              <div className="space-y-1">
                <label className="font-bold text-slate-600">Default Export Format</label>
                <select 
                  value={settingsDefaultFormat}
                  onChange={(e) => setSettingsDefaultFormat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-700 focus:bg-white text-slate-800 font-medium"
                >
                  <option value="PDF">Professional PDF (.pdf)</option>
                  <option value="Excel">Excel Spreadsheet (.xlsx)</option>
                  <option value="CSV">Flat CSV Data (.csv)</option>
                </select>
              </div>

              {/* Preferences Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="font-bold text-slate-600 block">Default Policy Rules</label>
                <div className="space-y-2">
                  {[
                    { id: "settingsSummaryFirst", label: "Include summary page first", val: settingsSummaryFirst, set: setSettingsSummaryFirst },
                    { id: "settingsBranding", label: "Include programme branding", val: settingsBranding, set: setSettingsBranding },
                    { id: "settingsExcludePII", label: "Exclude personal contact details (PII)", val: settingsExcludePII, set: setSettingsExcludePII },
                    { id: "settingsAutoSync", label: "Auto-sync export history with workspace", val: settingsAutoSync, set: setSettingsAutoSync }
                  ].map((chk) => (
                    <label key={chk.id} className="flex items-center gap-2.5 cursor-pointer py-0.5 select-none">
                      <input 
                        type="checkbox"
                        checked={chk.val}
                        onChange={(e) => chk.set(e.target.checked)}
                        className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                      />
                      <span className="text-xs text-slate-650 font-medium">{chk.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Technical Notice block */}
              <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex gap-2 items-start mt-2">
                <ShieldCheck className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-450 leading-relaxed">
                  These settings are stored within your active browser workspace session. Modifying options will affect all upcoming report creations.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button 
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-4 py-1.5 bg-white border border-slate-250 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSettings}
                className="px-4 py-1.5 bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs active:scale-95"
              >
                Save Settings
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          URGENT FOLLOW-UP REVIEW DRAWER
          ========================================== */}
      {isUrgentReviewOpen && (
        <div className="fixed inset-0 z-50 flex md:justify-end justify-center items-end md:items-stretch bg-slate-900/60 backdrop-blur-xs">
          {/* Overlay to close */}
          <div className="absolute inset-0" onClick={() => setIsUrgentReviewOpen(false)} />
          
          {/* Responsive Drawer Container */}
          <div className="relative w-full md:max-w-xl bg-white h-[85vh] md:h-full rounded-t-3xl md:rounded-none md:rounded-l-3xl shadow-2xl flex flex-col z-10 border-t md:border-t-0 md:border-l border-slate-200 animate-in slide-in-from-bottom md:slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex justify-between items-start shrink-0 rounded-t-3xl md:rounded-none">
              <div className="text-left space-y-1">
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Urgent Follow-Up Review
                </h3>
                <p className="text-xs text-slate-500">
                  Review learners with due follow-up actions and choose the next support step.
                </p>
              </div>
              <button 
                onClick={() => setIsUrgentReviewOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
              
              {/* Top Summary Card */}
              <div className="bg-amber-50/60 border border-amber-250/40 rounded-2xl p-4.5 space-y-3">
                <h4 className="text-xs font-extrabold text-amber-850 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  Urgent Follow-Up Summary
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-amber-100/50 rounded-xl p-3 shadow-3xs">
                    <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Open Follow-ups</div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">18</div>
                  </div>
                  <div className="bg-white border border-amber-100/50 rounded-xl p-3 shadow-3xs">
                    <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Due Today</div>
                    <div className="text-lg font-black text-red-600 mt-0.5">7</div>
                  </div>
                </div>
                <div className="text-xs space-y-1 text-slate-700 pt-1 border-t border-amber-200/40">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Highest priority:</span>
                    <span className="font-bold text-slate-800">Assessment reminders</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Recommended action:</span>
                    <span className="font-bold text-emerald-800">Send reminders to overdue assessment tasks.</span>
                  </div>
                </div>
              </div>

              {/* Urgent Learners List */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
                  Urgent Items ({urgentLearners.length})
                </h4>
                
                <div className="space-y-3">
                  {urgentLearners.map((learner) => (
                    <div 
                      key={learner.name}
                      className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-emerald-200 hover:shadow-xs transition-all duration-200"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="text-left space-y-1">
                          <h5 className="font-black text-slate-900 text-xs sm:text-sm">{learner.name}</h5>
                          <p className="text-[11px] text-red-650 font-bold">{learner.reason}</p>
                          <p className="text-[10px] text-slate-450 font-mono">Module: {learner.course}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border rounded-md shrink-0 ${
                          learner.priority === "High"
                            ? "bg-red-50 text-red-750 border-red-200"
                            : "bg-amber-50/70 text-amber-850 border-amber-200"
                        }`}>
                          {learner.priority}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setSelectedUrgentLearner(learner);
                            setReminderSuccessState(false);
                            setIsSendReminderOpen(true);
                          }}
                          className="bg-[#005c45] hover:bg-emerald-800 text-white font-bold text-[10px] sm:text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Send Reminder
                        </button>
                        <button
                          onClick={() => {
                            navigateTo("/facilitator/learners/aisha-mohammed" as RoutePath);
                            setIsUrgentReviewOpen(false);
                          }}
                          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-250 font-bold text-[10px] sm:text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          View Learner
                        </button>
                        <button
                          onClick={() => {
                            navigateTo("/facilitator/follow-up-queue" as RoutePath);
                            setIsUrgentReviewOpen(false);
                          }}
                          className="bg-white hover:bg-emerald-50/40 text-emerald-800 border border-slate-250 font-bold text-[10px] sm:text-[11px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Open Follow-Up
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-2 shrink-0">
              <button 
                onClick={() => setIsUrgentReviewOpen(false)}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-600 border border-slate-250 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors text-center"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  navigateTo("/facilitator/follow-up-queue" as RoutePath);
                  setIsUrgentReviewOpen(false);
                }}
                className="w-full sm:w-auto bg-white hover:bg-emerald-50/50 text-[#005c45] border border-emerald-250 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors text-center"
              >
                Open Follow-Up Queue
              </button>
              <button 
                onClick={() => setIsBatchReminderOpen(true)}
                className="w-full sm:w-auto bg-[#005c45] hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors text-center"
              >
                Send Batch Reminder
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          SEND ASSESSMENT REMINDER MODAL / DRAWER
          ========================================== */}
      {isSendReminderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          {/* Centered Modal / Responsive Drawer Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-250">
            
            {/* Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-start shrink-0">
              <div className="text-left space-y-0.5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide font-mono">
                  Send Assessment Reminder
                </h3>
                <p className="text-[11px] text-slate-500">
                  Send a supportive reminder and attach the right learning guide.
                </p>
              </div>
              <button 
                onClick={() => setIsSendReminderOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700 text-left">
              
              {!reminderSuccessState ? (
                <>
                  {/* Context Card */}
                  <div className="bg-emerald-50/40 border border-emerald-150 rounded-2xl p-4 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase font-mono">Learner</div>
                        <div className="font-extrabold text-slate-900 text-sm mt-0.5">{selectedUrgentLearner?.name}</div>
                      </div>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 text-[9px] font-black uppercase rounded-sm border border-amber-200/50 font-mono">
                        {selectedUrgentLearner?.priority} Priority
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-[11px] pt-2 border-t border-emerald-100">
                      <div>
                        <span className="font-semibold text-slate-500 block">Cohort:</span>
                        <span className="font-bold text-slate-800">{selectedUrgentLearner?.cohort}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 block">Reason:</span>
                        <span className="font-bold text-slate-800 leading-tight">Overdue support and learning guide check-in</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 block">Current Course:</span>
                        <span className="font-bold text-slate-800">{selectedUrgentLearner?.course}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-semibold text-slate-500 block">Progress:</span>
                          <span className="font-bold text-slate-800">{selectedUrgentLearner?.progress}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-500 block">Last Active:</span>
                          <span className="font-bold text-slate-800">{selectedUrgentLearner?.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    {/* Reminder Type */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Reminder Type</label>
                      <select 
                        value={reminderType}
                        onChange={(e) => setReminderType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-800 font-medium font-mono"
                      >
                        <option value="Assessment reminder">Assessment reminder</option>
                        <option value="Low-bandwidth support">Low-bandwidth support</option>
                        <option value="Missed activity check-in">Missed activity check-in</option>
                        <option value="Certificate readiness reminder">Certificate readiness reminder</option>
                        <option value="General progress reminder">General progress reminder</option>
                      </select>
                    </div>

                    {/* Channel Checkboxes */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-600 block">Delivery Channels</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={channelInApp}
                            onChange={(e) => setChannelInApp(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">In-App Message</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={channelSMS}
                            onChange={(e) => setChannelSMS(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">SMS Reminder</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={channelEmail}
                            onChange={(e) => setChannelEmail(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={channelWhatsApp}
                            onChange={(e) => setChannelWhatsApp(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">WhatsApp / Low-Bandwidth</span>
                        </label>
                      </div>
                    </div>

                    {/* Message Template selection */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Message Template</label>
                      <select 
                        value={messageTemplate}
                        onChange={(e) => setMessageTemplate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-800 font-medium font-mono"
                      >
                        <option value="Friendly assessment reminder">Friendly assessment reminder</option>
                        <option value="Low-bandwidth support note">Low-bandwidth support note</option>
                        <option value="Missed activity check-in">Missed activity check-in</option>
                        <option value="Certification reminder">Certification reminder</option>
                      </select>
                    </div>

                    {/* Message Textarea */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">Support Message</label>
                      <textarea
                        value={reminderMessage}
                        onChange={(e) => setReminderMessage(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:bg-white text-slate-800 font-medium leading-relaxed"
                      />
                    </div>

                    {/* Attachments Checkboxes */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-600 block">Attachments</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachGuide}
                            onChange={(e) => setAttachGuide(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Assessment Guide</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachLowBandwidth}
                            onChange={(e) => setAttachLowBandwidth(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Low-Bandwidth Guide</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachSummary}
                            onChange={(e) => setAttachSummary(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">Lesson Summary</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={attachCPD}
                            onChange={(e) => setAttachCPD(e.target.checked)}
                            className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className="text-[11px] font-semibold text-slate-700">CPD Requirement Note</span>
                        </label>
                      </div>
                    </div>

                    {/* Follow-Up option */}
                    <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
                      <input 
                        type="checkbox"
                        checked={createFollowUpTask}
                        onChange={(e) => setCreateFollowUpTask(e.target.checked)}
                        className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4.5 w-4.5"
                      />
                      <span className="font-semibold text-slate-750">
                        Create follow-up task if learner does not respond within 48 hours
                      </span>
                    </label>
                  </div>
                </>
              ) : (
                /* SUCCESS SCREEN */
                <div className="py-8 px-4 flex flex-col items-center text-center space-y-4">
                  <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-[#005c45] text-3xl shrink-0 animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-slate-900">Assessment Reminder Sent</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      The supportive reminder and low-bandwidth guide have been pre-staged successfully.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full text-left space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">Recipients:</span>
                      <span className="font-bold text-slate-800">{selectedUrgentLearner?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">Delivery Mode:</span>
                      <span className="font-bold text-slate-800 font-mono">In-App, SMS ({channelSMS ? "Active" : "Inactive"})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450 font-medium">Attachment count:</span>
                      <span className="font-bold text-slate-800">2 digital guides</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-3 flex gap-2 text-left w-full">
                    <ShieldCheck className="h-4.5 w-4.5 text-[#005c45] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-emerald-800 leading-relaxed font-semibold">
                      This is a frontend action prototype simulation. No real network packets, cellular SMS, or emails have been transmitted.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              {!reminderSuccessState ? (
                <>
                  <button 
                    onClick={() => setIsSendReminderOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-250 text-slate-650 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      showToast("Reminder draft saved locally in this frontend prototype.");
                      setIsSendReminderOpen(false);
                    }}
                    className="px-4 py-2 bg-white border border-emerald-250 text-[#005c45] hover:bg-emerald-50/40 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95"
                  >
                    Save Draft
                  </button>
                  <button 
                    onClick={() => {
                      showToast("Reminder sent locally in this frontend prototype.");
                      setReminderSuccessState(true);
                    }}
                    className="px-4 py-2 bg-[#005c45] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs active:scale-95 animate-pulse"
                  >
                    Send Reminder
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setIsSendReminderOpen(false);
                      setIsUrgentReviewOpen(false);
                      setReminderSuccessState(false);
                    }}
                    className="px-4 py-2 bg-white border border-slate-250 text-slate-650 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all active:scale-95"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setIsSendReminderOpen(false);
                      setIsUrgentReviewOpen(false);
                      setReminderSuccessState(false);
                      navigateTo("/facilitator/follow-up-queue" as RoutePath);
                    }}
                    className="px-4 py-2 bg-[#005c45] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs active:scale-95"
                  >
                    View Follow-Up Queue
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          BATCH REMINDER REVIEW DRAWER / MODAL
          ========================================== */}
      {isBatchReminderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          {/* Centered Modal / Responsive Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-250">
            
            {/* Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-start shrink-0">
              <div className="text-left space-y-0.5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide font-mono">
                  Batch Reminder Review
                </h3>
                <p className="text-[11px] text-slate-500">
                  Review and send supportive reminders to all selected urgent learners.
                </p>
              </div>
              <button 
                onClick={() => setIsBatchReminderOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700 text-left">
              
              {/* Recipients card */}
              <div className="bg-emerald-50/40 border border-emerald-150 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                  <span className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px] font-mono">Recipients Selected</span>
                  <span className="font-black text-[#005c45] text-xs">4 Learners</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {urgentLearners.map(l => (
                    <span key={l.name} className="bg-white border border-emerald-200/80 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-750 shadow-3xs flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                      {l.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Channels summary */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-600 block">Active Dispatch Channels</span>
                <div className="flex gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold">
                  <span className="text-[#005c45] flex items-center gap-1.5 text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    In-App Notification
                  </span>
                  <span className="text-[#005c45] flex items-center gap-1.5 text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    SMS Reminder
                  </span>
                </div>
              </div>

              {/* Message Draft Template */}
              <div className="space-y-1">
                <span className="font-bold text-slate-600 block">Batch message preview (Customized per learner name)</span>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed font-semibold text-slate-600 font-mono text-[11px]">
                  "Hi [Learner Name], this is a reminder from your SUSTAIN facilitator. Please complete your pending assessment when you can. I have attached a low-bandwidth guide to help you continue even if your internet connection is limited. Reply if you need support."
                </div>
              </div>

              {/* Prototype warning */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-450 leading-relaxed">
                  Batch reminder review opened locally in this frontend prototype. Confirming batch dispatch will immediately stage and flag progress reports locally.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 shrink-0">
              <button 
                onClick={() => setIsBatchReminderOpen(false)}
                className="px-4 py-2 bg-white border border-slate-250 text-slate-650 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  showToast("Batch reminder review opened locally in this frontend prototype.");
                  setIsBatchReminderOpen(false);
                  setIsUrgentReviewOpen(false);
                }}
                className="px-4 py-2 bg-[#005c45] hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-3xs active:scale-95"
              >
                Send Batch Reminder
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default FacilitatorReportsPage;
