import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { 
  Download, 
  HelpCircle, 
  Menu, 
  X, 
  Check, 
  Compass, 
  Bell, 
  Search, 
  BookOpen, 
  AlertCircle, 
  ChevronRight,
  Volume2,
  FileText,
  Database,
  Filter,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Bookmark,
  BookMarked,
  Info,
  Clock,
  ExternalLink
} from "lucide-react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";

// Types for download material data
interface MaterialItem {
  id: string;
  title: string;
  category: "Lesson material" | "Lesson summary" | "Transcript" | "Assessment guide" | "Certificate & CPD";
  linkedTo: string;
  format: string;
  size: string;
  status: "Available" | "Saved offline";
  helper: string;
  primaryAction: "Open" | "Download" | "Open Assessment" | "View Certificate Track";
  primaryRoute?: RoutePath;
  secondaryAction: "Save Offline" | "Preview" | "Download" | "Save";
}

export default function LearnerDownloadsPage() {
  const { navigateTo } = useRoute();
  
  // Simulated Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Mobile drawer menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search query & filter chip states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string>("All");
  
  // Local simulated offline queue storage
  const [savedMaterialIds, setSavedMaterialIds] = useState<string[]>([]);
  
  // Recent Activities list
  const [activities, setActivities] = useState([
    { id: 1, title: "Reading version opened", context: "Preparing for Interviews", time: "Today" },
    { id: 2, title: "Summary previewed", context: "Preparing for Interviews Summary", time: "Today" },
    { id: 3, title: "Assignment guide viewed", context: "Work Readiness Assignment", time: "Yesterday" },
    { id: 4, title: "Resource hub opened", context: "", time: "Yesterday" },
    { id: 5, title: "Certificate guide viewed", context: "Work Readiness Certificate", time: "2 days ago" }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Raw Materials Data according to guidelines
  const downloadMaterials: MaterialItem[] = [
    {
      id: "mat-low-bandwidth",
      title: "Low-Bandwidth Reading Version",
      category: "Lesson material",
      linkedTo: "Preparing for Interviews",
      format: "Reading version",
      size: "Lightweight",
      status: savedMaterialIds.includes("mat-low-bandwidth") ? "Saved offline" : "Available",
      helper: "Open a lightweight reading version of the current lesson.",
      primaryAction: "Open",
      primaryRoute: "/learner/resources/low-bandwidth-reading-version",
      secondaryAction: "Save Offline"
    },
    {
      id: "mat-summary",
      title: "Preparing for Interviews Summary",
      category: "Lesson summary",
      linkedTo: "Preparing for Interviews",
      format: "PDF summary",
      size: "Small file",
      status: "Available", // always available but downloaded simulated on primary click
      helper: "A concise summary of key interview preparation points.",
      primaryAction: "Download",
      secondaryAction: "Preview"
    },
    {
      id: "mat-transcript",
      title: "Interview Preparation Transcript",
      category: "Transcript",
      linkedTo: "Preparing for Interviews",
      format: "Text transcript",
      size: "Lightweight",
      status: savedMaterialIds.includes("mat-transcript") ? "Saved offline" : "Available",
      helper: "Text-only lesson transcript for low-connectivity reading.",
      primaryAction: "Open",
      primaryRoute: "/learner/resources/low-bandwidth-reading-version",
      secondaryAction: "Save Offline"
    },
    {
      id: "mat-assignment-guide",
      title: "Work Readiness Assignment Guide",
      category: "Assessment guide",
      linkedTo: "Work Readiness Assignment",
      format: "Guide",
      size: "Small file",
      status: "Available",
      helper: "Review the assignment expectations before continuing your draft.",
      primaryAction: "Open Assessment",
      primaryRoute: "/learner/assessments/work-readiness-assignment",
      secondaryAction: "Download"
    },
    {
      id: "mat-certificate-guide",
      title: "Certificate Readiness Guide",
      category: "Certificate & CPD",
      linkedTo: "Work Readiness Certificate",
      format: "Guide",
      size: "Small file",
      status: "Available",
      helper: "Understand certificate readiness, CPD, and pending review steps.",
      primaryAction: "View Certificate Track",
      primaryRoute: "/learner/certificates/work-readiness-certificate",
      secondaryAction: "Save"
    }
  ];

  // Apply filters on clientside data
  const filteredMaterials = downloadMaterials.filter((m) => {
    // 1. Search Query Match
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.helper.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.linkedTo.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // 2. Chip Filter Match
    if (activeChip === "All") return true;
    if (activeChip === "Low-bandwidth") {
      return m.format === "Reading version" || m.format === "Text transcript" || m.size === "Lightweight";
    }
    if (activeChip === "Lesson material") return m.category === "Lesson material";
    if (activeChip === "Summary") return m.category === "Lesson summary";
    if (activeChip === "Transcript") return m.category === "Transcript";
    if (activeChip === "Assessment guide") return m.category === "Assessment guide";
    if (activeChip === "Certificate & CPD") return m.category === "Certificate & CPD";
    
    return true;
  });

  // Action Handlers
  const handlePrimaryAction = (m: MaterialItem) => {
    if (m.primaryAction === "Open" && m.primaryRoute) {
      navigateTo(m.primaryRoute);
    } else if (m.primaryAction === "Open Assessment" && m.primaryRoute) {
      navigateTo(m.primaryRoute);
    } else if (m.primaryAction === "View Certificate Track" && m.primaryRoute) {
      navigateTo(m.primaryRoute);
    } else if (m.primaryAction === "Download") {
      showToast("Download started in this frontend prototype.");
    }
  };

  const handleSecondaryAction = (m: MaterialItem) => {
    if (m.secondaryAction === "Save Offline") {
      if (savedMaterialIds.includes(m.id)) {
        showToast("Material is already saved offline.");
      } else {
        setSavedMaterialIds(prev => [...prev, m.id]);
        showToast("Material saved offline in this frontend prototype.");
        // Add activity
        setActivities(prev => [
          { id: Date.now(), title: "Material saved offline", context: m.title, time: "Just now" },
          ...prev
        ]);
      }
    } else if (m.secondaryAction === "Preview") {
      showToast("Preview opened in this frontend prototype.");
    } else if (m.secondaryAction === "Download") {
      showToast("Download started in this frontend prototype.");
    } else if (m.secondaryAction === "Save") {
      showToast("Guide saved in this frontend prototype.");
    }
  };

  const handleRemoveSavedItem = (id: string, title: string) => {
    setSavedMaterialIds(prev => prev.filter(item => item !== id));
    showToast("Saved material removed in this frontend prototype.");
  };

  const handleApplyFiltersBtn = () => {
    showToast("Download filters applied.");
  };

  const handleResetFiltersBtn = () => {
    setSearchQuery("");
    setActiveChip("All");
  };

  const handleMarkHelpful = () => {
    showToast("Material marked helpful in this frontend prototype.");
  };

  return (
    <>
      {/* GLOBAL TOAST BANNER */}
      {toastMessage && (
        <div id="global-toast" className="fixed top-5 right-5 z-50 animate-bounce duration-300">
          <div className="bg-emerald-900 border border-emerald-800 text-white rounded-xl shadow-lg px-4 py-3 text-xs flex items-center gap-2.5 font-sans font-medium">
            <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* DESKTOP VIEWPORT */}
      <DesktopDownloadsPage 
        navigateTo={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        downloadMaterials={downloadMaterials}
        filteredMaterials={filteredMaterials}
        savedMaterialIds={savedMaterialIds}
        activities={activities}
        handlePrimaryAction={handlePrimaryAction}
        handleSecondaryAction={handleSecondaryAction}
        handleRemoveSavedItem={handleRemoveSavedItem}
        handleApplyFiltersBtn={handleApplyFiltersBtn}
        handleResetFiltersBtn={handleResetFiltersBtn}
        handleMarkHelpful={handleMarkHelpful}
        showToast={showToast}
      />

      {/* TABLET VIEWPORT */}
      <TabletDownloadsPage 
        navigateTo={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        downloadMaterials={downloadMaterials}
        filteredMaterials={filteredMaterials}
        savedMaterialIds={savedMaterialIds}
        activities={activities}
        handlePrimaryAction={handlePrimaryAction}
        handleSecondaryAction={handleSecondaryAction}
        handleRemoveSavedItem={handleRemoveSavedItem}
        handleApplyFiltersBtn={handleApplyFiltersBtn}
        handleResetFiltersBtn={handleResetFiltersBtn}
        handleMarkHelpful={handleMarkHelpful}
        showToast={showToast}
      />

      {/* MOBILE VIEWPORT */}
      <MobileDownloadsPage 
        navigateTo={navigateTo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        downloadMaterials={downloadMaterials}
        filteredMaterials={filteredMaterials}
        savedMaterialIds={savedMaterialIds}
        activities={activities}
        handlePrimaryAction={handlePrimaryAction}
        handleSecondaryAction={handleSecondaryAction}
        handleRemoveSavedItem={handleRemoveSavedItem}
        handleApplyFiltersBtn={handleApplyFiltersBtn}
        handleResetFiltersBtn={handleResetFiltersBtn}
        handleMarkHelpful={handleMarkHelpful}
        showToast={showToast}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </>
  );
}

// ---------------- DESKTOP LAYOUT (hidden lg:flex) ----------------
interface LayoutProps {
  navigateTo: (path: RoutePath) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeChip: string;
  setActiveChip: (chip: string) => void;
  downloadMaterials: MaterialItem[];
  filteredMaterials: MaterialItem[];
  savedMaterialIds: string[];
  activities: Array<{ id: number; title: string; context: string; time: string }>;
  handlePrimaryAction: (m: MaterialItem) => void;
  handleSecondaryAction: (m: MaterialItem) => void;
  handleRemoveSavedItem: (id: string, title: string) => void;
  handleApplyFiltersBtn: () => void;
  handleResetFiltersBtn: () => void;
  handleMarkHelpful: () => void;
  showToast: (msg: string) => void;
}

function DesktopDownloadsPage({
  navigateTo,
  searchQuery,
  setSearchQuery,
  activeChip,
  setActiveChip,
  downloadMaterials,
  filteredMaterials,
  savedMaterialIds,
  activities,
  handlePrimaryAction,
  handleSecondaryAction,
  handleRemoveSavedItem,
  handleApplyFiltersBtn,
  handleResetFiltersBtn,
  handleMarkHelpful,
  showToast
}: LayoutProps) {
  return (
    <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full font-sans">
      {/* Sidebar */}
      <LearnerSidebar />

      {/* Main Workspace Area */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search downloads, resources, lesson materials..."
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-800 focus:border-emerald-800 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-500 hover:text-slate-950 relative rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-700" />
            </button>
            <button 
              onClick={() => navigateTo("/learner/support")}
              className="p-1.5 text-slate-500 hover:text-slate-950 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="flex items-center gap-2 px-1.5 py-1 rounded-lg hover:bg-slate-50 transition-all text-left"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                AM
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Aisha Mohammed</p>
                <p className="text-[9px] text-slate-400 font-medium">SUST-LRN-0442</p>
              </div>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="px-8 py-8 space-y-6">
          {/* Section 1 - Downloads Hero */}
          <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-6 items-center">
              {/* Hero Left Content */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <span onClick={() => navigateTo("/learner")} className="hover:text-slate-900 cursor-pointer">Learner Workspace</span>
                    <ChevronRight className="h-3 w-3" />
                    <span onClick={() => navigateTo("/learner/resources")} className="hover:text-slate-900 cursor-pointer">Resources</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-slate-950">Downloads</span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="bg-emerald-50 text-emerald-855 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-100">
                      Low-bandwidth support
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-slate-200">
                      Offline materials
                    </span>
                  </div>

                  <h1 className="text-2xl font-black tracking-tight text-slate-900 pt-1">Downloads & Offline Materials</h1>
                  <p className="text-xs text-slate-650 leading-relaxed max-w-2xl">
                    Access lightweight reading versions, summaries, transcripts, and guides connected to your current lesson and assignment.
                  </p>
                </div>

                {/* Context Row */}
                <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500 font-semibold pt-1 border-t border-slate-100/70 max-w-xl">
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Aisha Mohammed</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span>Preparing for Interviews</span>
                  <span className="text-slate-300">•</span>
                  <span>Work Readiness Foundation</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-855">Facilitator: Halima Sani</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button 
                    onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                    className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-[0.99]"
                  >
                    Open Reading Version
                  </button>
                  <button 
                    onClick={() => navigateTo("/learner/resources")}
                    className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all active:scale-[0.99]"
                  >
                    Back to Resources
                  </button>
                </div>
              </div>

              {/* Hero Right Deep Green Panel */}
              <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-sm p-5 h-44 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-emerald-850/40 blur-xl pointer-events-none" />
                <div className="space-y-1.5 relative z-10">
                  <p className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Recommended Material</p>
                  <h3 className="text-sm font-extrabold leading-snug">Low-Bandwidth Reading Version</h3>
                  <p className="text-[11px] text-emerald-100/90 leading-normal">
                    Use a lightweight reading version when connection is limited or you need quick revision.
                  </p>
                </div>
                <div className="border-t border-emerald-850/60 pt-2 text-[10px] text-emerald-200 font-semibold relative z-10 flex justify-between items-center">
                  <span>Preparing for Interviews</span>
                  <span className="font-mono text-xs bg-emerald-950/40 px-1.5 py-0.5 rounded">Available now</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2 - Download Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            {/* 1. Available Materials */}
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Available Materials</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-2xl font-black text-slate-900">5</span>
                <span className="text-[10px] text-slate-500 font-semibold">Current pathway</span>
              </div>
              <div className="h-6" />
            </Card>

            {/* 2. Low-Bandwidth */}
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Low-Bandwidth</span>
                <LearnerContextHint 
                  title="Helpful note" 
                  text="Low-bandwidth materials use lighter text versions and transcripts to support learners with limited connectivity."
                  align="right"
                />
              </div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-2xl font-black text-slate-900">2</span>
                <span className="text-[10px] text-slate-500 font-semibold">Reading options</span>
              </div>
              <div className="h-6" />
            </Card>

            {/* 3. Saved Offline */}
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Saved Offline</span>
                <LearnerContextHint 
                  title="What this means" 
                  text="Offline saving is simulated in this frontend prototype and does not store real files on the device."
                  align="right"
                />
              </div>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-2xl font-black text-emerald-855">{savedMaterialIds.length}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Simulated only</span>
              </div>
              <div className="h-6" />
            </Card>

            {/* 4. Linked Assessment */}
            <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Linked Assessment</span>
              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="text-sm font-black text-slate-900 truncate">Work Readiness</span>
                <span className="text-[10px] text-slate-500 font-semibold shrink-0">Assignment guide</span>
              </div>
              <div className="h-6" />
            </Card>
          </div>

          {/* Main Grid: Left Column, Right Column */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
            {/* Left Column (Main functional widgets) */}
            <div className="space-y-6">
              {/* Section 3 - Material Filters */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Find Materials</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">Filter materials by type, course, or low-bandwidth support.</p>
                </div>

                <div className="space-y-3.5">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search materials..."
                      className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
                    />
                  </div>

                  {/* Filter Chips */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      "All",
                      "Low-bandwidth",
                      "Lesson material",
                      "Summary",
                      "Transcript",
                      "Assessment guide",
                      "Certificate & CPD"
                    ].map((chip) => {
                      const isActive = activeChip === chip;
                      return (
                        <button
                          key={chip}
                          onClick={() => {
                            setActiveChip(chip);
                            showToast(`Filtering materials: ${chip}`);
                          }}
                          className={`text-[10px] font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                            isActive 
                              ? "bg-emerald-900 border-emerald-900 text-white shadow-3xs" 
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                  <button 
                    onClick={handleResetFiltersBtn}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={handleApplyFiltersBtn}
                    className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Apply Filters
                  </button>
                </div>
              </Card>

              {/* Section 4 - Recommended Material Focus Card */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recommended Material</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">Start with the lightweight reading version for your current lesson.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3.5 hover:border-emerald-200 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded border border-emerald-100">Available</span>
                        <span className="bg-slate-100 text-slate-600 text-[9px] font-extrabold px-2 py-0.5 rounded border border-slate-200">Lesson material</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 mt-2">Low-Bandwidth Reading Version</h3>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Linked lesson: Preparing for Interviews • Reading version • Lightweight</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    Open a lightweight version of the lesson to revise interview preparation points without heavy media.
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                        className="bg-emerald-900 text-white hover:bg-emerald-800 text-[11px] font-bold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
                      >
                        Open Reading Version
                      </button>
                      <button 
                        onClick={() => handleSecondaryAction({
                          id: "mat-low-bandwidth",
                          title: "Low-Bandwidth Reading Version",
                          category: "Lesson material",
                          linkedTo: "Preparing for Interviews",
                          format: "Reading version",
                          size: "Lightweight",
                          status: "Available",
                          helper: "Open a lightweight reading version.",
                          primaryAction: "Open",
                          secondaryAction: "Save Offline"
                        })}
                        className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-[11px] font-bold px-3.5 py-2 rounded-lg transition-all cursor-pointer"
                      >
                        Save Offline
                      </button>
                    </div>

                    <button 
                      onClick={handleMarkHelpful}
                      className="text-slate-500 hover:text-emerald-900 text-[11px] font-extrabold underline cursor-pointer"
                    >
                      Mark Helpful
                    </button>
                  </div>
                </div>
              </Card>

              {/* Section 5 - Download Material List */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-black text-slate-900 tracking-tight">Available Materials</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Materials connected to your current course, lesson, assessment, and certificate readiness.</p>
                </div>

                {filteredMaterials.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <AlertCircle className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-600">No matching materials found.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Try resetting the filters or modifying your keywords.</p>
                    <button 
                      onClick={handleResetFiltersBtn}
                      className="text-emerald-800 font-extrabold text-xs underline mt-2 inline-block cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMaterials.map((m) => {
                      const isMP3 = m.format.includes("MP3") || m.title.includes("Audio") || m.title.includes("Transcript");
                      return (
                        <div 
                          key={m.id}
                          className="grid grid-cols-[44px_minmax(0,1fr)_auto] gap-4 items-start p-4 border border-slate-200 bg-white rounded-xl hover:border-emerald-200 transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          {/* Icon Block */}
                          <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-xl text-emerald-900 flex items-center justify-center shadow-3xs shrink-0">
                            {isMP3 ? <Volume2 className="h-4.5 w-4.5" /> : <FileText className="h-4.5 w-4.5" />}
                          </div>

                          {/* Info Block */}
                          <div className="space-y-1.5 text-left">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-extrabold text-slate-900">{m.title}</span>
                              <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200">
                                {m.category}
                              </span>
                              <span className="bg-emerald-50 text-emerald-855 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                                {m.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-semibold">
                              Linked: <span className="text-slate-700">{m.linkedTo}</span> • Format: {m.format} • Size: {m.size}
                            </p>
                            <p className="text-xs text-slate-600 font-medium">
                              {m.helper}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 shrink-0 text-right">
                            <button 
                              onClick={() => handlePrimaryAction(m)}
                              className="bg-emerald-900 text-white hover:bg-emerald-800 text-[11px] font-bold px-4 py-1.5 rounded-lg shadow-3xs transition-all text-center block cursor-pointer min-w-[110px]"
                            >
                              {m.primaryAction}
                            </button>
                            <button 
                              onClick={() => handleSecondaryAction(m)}
                              className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-[11px] font-bold px-4 py-1.5 rounded-lg transition-all text-center block cursor-pointer min-w-[110px]"
                            >
                              {m.secondaryAction}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Section 6 - Offline Queue */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Offline Queue</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">Saved materials shown here are simulated for the frontend prototype.</p>
                </div>

                {savedMaterialIds.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-3">
                    <div className="p-3 bg-white border border-slate-150 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-slate-300">
                      <Database className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-700">No materials saved yet</p>
                      <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                        Use Save Offline on a material to add it to this simulated queue.
                      </p>
                    </div>
                    <button 
                      onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                      className="bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                    >
                      Open Reading Version
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {downloadMaterials.filter(m => savedMaterialIds.includes(m.id)).map((item) => (
                      <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0 text-left">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900">{item.title}</p>
                          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                            Linked: {item.linkedTo} • <span className="text-emerald-800 font-bold">Saved offline</span>
                          </p>
                        </div>
                        <button 
                          onClick={() => handleRemoveSavedItem(item.id, item.title)}
                          className="text-red-750 hover:text-red-950 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Section 7 - Low-Bandwidth Guidance */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Low-Bandwidth Guidance</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">Use lighter materials when connection is limited.</p>
                </div>

                <div className="space-y-3.5 text-xs text-slate-750 font-semibold leading-relaxed">
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-855 text-[10px] flex items-center justify-center font-bold border border-emerald-100 shrink-0 mt-0.5">1</span>
                    <span>Start with reading versions before opening heavy media.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-855 text-[10px] flex items-center justify-center font-bold border border-emerald-100 shrink-0 mt-0.5">2</span>
                    <span>Use transcripts when audio or video is difficult to load.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-855 text-[10px] flex items-center justify-center font-bold border border-emerald-100 shrink-0 mt-0.5">3</span>
                    <span>Save key notes inside the lesson workspace.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-855 text-[10px] flex items-center justify-center font-bold border border-emerald-100 shrink-0 mt-0.5">4</span>
                    <span>Open support if learning materials are difficult to access.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-855 text-[10px] flex items-center justify-center font-bold border border-emerald-100 shrink-0 mt-0.5">5</span>
                    <span>Offline and download actions here are simulated for the frontend prototype.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-start">
                  <button 
                    onClick={() => navigateTo("/learner/support")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Open Support
                  </button>
                </div>
              </Card>

              {/* Section 8 - Recent Download Activity */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Download Activity</h2>
                </div>

                <div className="space-y-3">
                  {activities.map((act) => (
                    <div key={act.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-b-0 last:pb-0 text-left">
                      <div className="flex items-start gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-800 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{act.title}</p>
                          {act.context && <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{act.context}</p>}
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded border border-slate-150 shrink-0">
                        {act.time}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column (Sidecards) */}
            <div className="space-y-6">
              {/* Right Card 1 - Download Status */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Download Status</h3>
                </div>
                <div className="space-y-2.5 text-xs text-slate-600 font-semibold">
                  <div className="flex justify-between">
                    <span>Available materials:</span>
                    <span className="font-bold text-slate-900">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Low-bandwidth materials:</span>
                    <span className="font-bold text-slate-900">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current lesson:</span>
                    <span className="font-bold text-slate-900">Preparing for Interviews</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current course:</span>
                    <span className="font-bold text-slate-900 font-mono">Work Readiness</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offline queue:</span>
                    <span className="font-bold text-emerald-855 font-mono">Simulated</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all text-center block mt-3"
                >
                  Open Reading Version
                </button>
              </Card>

              {/* Right Card 2 - Linked Learning Context */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Linked Learning Context</h3>
                </div>
                <div className="space-y-2.5 text-xs text-slate-650 font-semibold">
                  <div className="flex justify-between">
                    <span>Course:</span>
                    <span className="font-bold text-slate-900">Work Readiness Foundation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lesson:</span>
                    <span className="font-bold text-slate-900">Preparing for Interviews</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assessment:</span>
                    <span className="font-bold text-slate-900">Work Readiness Assignment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate:</span>
                    <span className="font-bold text-slate-900">Work Readiness Certificate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPD:</span>
                    <span className="font-bold text-slate-900">22 of 35 credits</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    onClick={() => navigateTo("/learner/lessons/preparing-for-interviews")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white text-[11px] font-bold py-2 rounded-lg text-center"
                  >
                    Continue Lesson
                  </button>
                  <button 
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                    className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-[11px] font-bold py-2 rounded-lg text-center"
                  >
                    Open Assessment
                  </button>
                </div>
              </Card>

              {/* Right Card 3 - Related Resources */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Related Resources</h3>
                </div>
                <div className="space-y-2 text-xs text-slate-650 font-semibold">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span>Resource Hub</span>
                    <button onClick={() => navigateTo("/learner/resources")} className="text-emerald-800 hover:underline">Open</button>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span>Low-Bandwidth Reading Version</span>
                    <button onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")} className="text-emerald-800 hover:underline">Open</button>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span>Work Readiness Assignment Guide</span>
                    <button onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")} className="text-emerald-800 hover:underline">Open</button>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Certificate Readiness Guide</span>
                    <button onClick={() => navigateTo("/learner/certificates/work-readiness-certificate")} className="text-emerald-800 hover:underline">Open</button>
                  </div>
                </div>
              </Card>

              {/* Right Card 4 - Support Center Card (Using Approved emerald style) */}
              <LearnerSupportCard 
                title="Support Center"
                text="Need assistance with your learning pathway?"
                buttonText="Open Support"
              />

              {/* Right Card 5 - Quick Actions */}
              <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Actions</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { title: "Back to Resources", route: "/learner/resources" as RoutePath, help: "Explore all materials" },
                    { title: "Open Reading Version", route: "/learner/resources/low-bandwidth-reading-version" as RoutePath, help: "Lightweight study" },
                    { title: "Continue Lesson", route: "/learner/lessons/preparing-for-interviews" as RoutePath, help: "Preparing for Interviews" },
                    { title: "Open Assessment", route: "/learner/assessments/work-readiness-assignment" as RoutePath, help: "Work Readiness Assignment" },
                    { title: "View Certificate Track", route: "/learner/certificates/work-readiness-certificate" as RoutePath, help: "Track certificate review" },
                    { title: "Open Support", route: "/learner/support" as RoutePath, help: "Contact help center" }
                  ].map((action, i) => (
                    <div 
                      key={i}
                      onClick={() => navigateTo(action.route)}
                      className="group p-2.5 border border-slate-150 rounded-xl bg-slate-50/50 hover:bg-white hover:border-emerald-200 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">{action.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold group-hover:text-emerald-800 mt-0.5 transition-colors">{action.help}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------------- TABLET LAYOUT (hidden md:block lg:hidden) ----------------
function TabletDownloadsPage({
  navigateTo,
  searchQuery,
  setSearchQuery,
  activeChip,
  setActiveChip,
  downloadMaterials,
  filteredMaterials,
  savedMaterialIds,
  activities,
  handlePrimaryAction,
  handleSecondaryAction,
  handleRemoveSavedItem,
  handleApplyFiltersBtn,
  handleResetFiltersBtn,
  handleMarkHelpful,
  showToast
}: LayoutProps) {
  return (
    <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28 font-sans">
      {/* Tablet Compact Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-5 sticky top-0 z-40">
        <span className="text-base font-extrabold tracking-tight text-emerald-800">SUSTAIN LMS</span>
        
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo("/learner/notifications")} className="p-1 text-slate-500 hover:text-slate-900 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700" />
          </button>
          <button onClick={() => navigateTo("/learner/support")} className="p-1 text-slate-500 hover:text-slate-900">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <button onClick={() => navigateTo("/learner/profile")} className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              AM
            </div>
          </button>
        </div>
      </header>

      {/* Main Tablet Content */}
      <main className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        {/* 1. Downloads Hero (Stacked) */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-450">
              <span onClick={() => navigateTo("/learner")} className="hover:text-slate-900 cursor-pointer">Learner Workspace</span>
              <ChevronRight className="h-3 w-3" />
              <span onClick={() => navigateTo("/learner/resources")} className="hover:text-slate-900 cursor-pointer">Resources</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-950">Downloads</span>
            </div>

            <div className="flex items-center gap-2 pt-0.5 flex-wrap">
              <span className="bg-emerald-50 text-emerald-855 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-100">
                Low-bandwidth support
              </span>
              <span className="bg-slate-100 text-slate-600 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border border-slate-200">
                Offline materials
              </span>
            </div>

            <h1 className="text-xl font-black tracking-tight text-slate-900 pt-1">Downloads & Offline Materials</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Access lightweight reading versions, summaries, transcripts, and guides connected to your current lesson and assignment.
            </p>
          </div>

          {/* Context row */}
          <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500 font-semibold pt-1 border-t border-slate-100/70 text-left">
            <span>Aisha Mohammed</span>
            <span className="text-slate-300">•</span>
            <span>Preparing for Interviews</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-855">Facilitator: Halima Sani</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
              className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center min-h-[40px]"
            >
              Open Reading Version
            </button>
            <button 
              onClick={() => navigateTo("/learner/resources")}
              className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all min-h-[40px]"
            >
              Back to Resources
            </button>
          </div>

          {/* Deep Green panel */}
          <div className="bg-emerald-900 text-white rounded-xl border border-emerald-800 p-4 text-left">
            <p className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">Recommended Material</p>
            <h3 className="text-sm font-extrabold mt-1">Low-Bandwidth Reading Version</h3>
            <p className="text-[11px] text-emerald-100/90 mt-1">
              Use a lightweight reading version when connection is limited or you need quick revision.
            </p>
            <p className="text-[10px] text-emerald-200/95 font-semibold mt-3 pt-2 border-t border-emerald-800/80">
              Preparing for Interviews • Available now
            </p>
          </div>
        </Card>

        {/* 2. Download Summary Cards (2-column grid) */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-left h-24 flex flex-col justify-between">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Available Materials</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-slate-900">5</span>
              <span className="text-[10px] text-slate-500 font-semibold">Current pathway</span>
            </div>
          </Card>

          <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-left h-24 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Low-Bandwidth</span>
              <LearnerContextHint 
                title="Helpful note" 
                text="Low-bandwidth materials use lighter text versions and transcripts to support learners with limited connectivity."
                align="left"
              />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-slate-900">2</span>
              <span className="text-[10px] text-slate-500 font-semibold">Reading options</span>
            </div>
          </Card>

          <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-left h-24 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Saved Offline</span>
              <LearnerContextHint 
                title="What this means" 
                text="Offline saving is simulated in this frontend prototype and does not store real files on the device."
                align="left"
              />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-emerald-855">{savedMaterialIds.length}</span>
              <span className="text-[10px] text-slate-500 font-semibold">Simulated only</span>
            </div>
          </Card>

          <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-left h-24 flex flex-col justify-between">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Linked Assessment</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-sm font-black text-slate-900 truncate">Work Readiness</span>
            </div>
          </Card>
        </div>

        {/* 3. Material Filters */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-100 pb-2 text-left">
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">Find Materials</h2>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials..."
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                "All",
                "Low-bandwidth",
                "Lesson material",
                "Summary",
                "Transcript",
                "Assessment guide",
                "Certificate & CPD"
              ].map((chip) => {
                const isSelected = activeChip === chip;
                return (
                  <button
                    key={chip}
                    onClick={() => {
                      setActiveChip(chip);
                      showToast(`Filtering: ${chip}`);
                    }}
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${
                      isSelected 
                        ? "bg-emerald-900 text-white border-emerald-900" 
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button onClick={handleResetFiltersBtn} className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1">Reset</button>
            <button onClick={handleApplyFiltersBtn} className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold px-4 py-1 rounded-lg">Apply Filters</button>
          </div>
        </Card>

        {/* 4. Recommended Material (Focus) */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recommended Material</h3>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3.5">
            <div>
              <div className="flex gap-2">
                <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-100">Available</span>
                <span className="bg-slate-100 text-slate-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-slate-200">Lesson material</span>
              </div>
              <h4 className="text-xs font-black text-slate-900 mt-2">Low-Bandwidth Reading Version</h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Linked lesson: Preparing for Interviews • Lightweight</p>
            </div>
            <p className="text-xs text-slate-600 font-medium">Open a lightweight version of the lesson to revise interview preparation points without heavy media.</p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200/50">
              <button 
                onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg text-center"
              >
                Open Reading Version
              </button>
              <button 
                onClick={() => handleSecondaryAction({
                  id: "mat-low-bandwidth",
                  title: "Low-Bandwidth Reading Version",
                  category: "Lesson material",
                  linkedTo: "Preparing for Interviews",
                  format: "Reading version",
                  size: "Lightweight",
                  status: "Available",
                  helper: "Open a lightweight reading version.",
                  primaryAction: "Open",
                  secondaryAction: "Save Offline"
                })}
                className="bg-white border border-slate-200 text-slate-850 hover:bg-slate-50 text-xs font-bold px-3 py-1.5 rounded-lg text-center"
              >
                Save Offline
              </button>
            </div>
          </div>
        </Card>

        {/* 5. Download Material List */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Available Materials</h3>
          
          <div className="space-y-3">
            {filteredMaterials.map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-start gap-2 flex-wrap">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{m.title}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{m.category} • {m.size}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 text-[8px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-100">
                    {m.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{m.helper}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-150">
                  <button 
                    onClick={() => handlePrimaryAction(m)}
                    className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    {m.primaryAction}
                  </button>
                  <button 
                    onClick={() => handleSecondaryAction(m)}
                    className="bg-white border border-slate-200 text-slate-850 hover:bg-slate-50 text-xs font-bold px-3 py-1.5 rounded-lg"
                  >
                    {m.secondaryAction}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 6. Offline Queue */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Offline Queue</h3>
          {savedMaterialIds.length === 0 ? (
            <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs">
              <p className="font-bold text-slate-650">No materials saved yet</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Use Save Offline to study materials without network.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {downloadMaterials.filter(m => savedMaterialIds.includes(m.id)).map((item) => (
                <div key={item.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Saved offline</p>
                  </div>
                  <button onClick={() => handleRemoveSavedItem(item.id, item.title)} className="text-red-750 hover:bg-red-50 text-xs font-bold px-2.5 py-1 rounded">Remove</button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* 7. Low-Bandwidth Guidance */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Low-Bandwidth Guidance</h3>
          <ul className="space-y-2 text-xs text-slate-650 font-medium pl-1 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
              <span>Start with reading versions before opening heavy media.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
              <span>Use transcripts when audio or video is difficult to load.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
              <span>Offline and download actions here are simulated for the frontend prototype.</span>
            </li>
          </ul>
          <button onClick={() => navigateTo("/learner/support")} className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl mt-1 block">Open Support</button>
        </Card>

        {/* 8. Recent Download Activity */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Download Activity</h3>
          <div className="space-y-2">
            {activities.map((act) => (
              <div key={act.id} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-50 last:border-b-0">
                <span className="font-bold text-slate-700">{act.title}</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-150">{act.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 9. Download Status */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Download Status</h3>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs font-semibold text-slate-650">
            <div className="flex justify-between">
              <span>Available materials:</span>
              <span className="font-bold text-slate-900">5</span>
            </div>
            <div className="flex justify-between">
              <span>Low-bandwidth:</span>
              <span className="font-bold text-slate-900">2</span>
            </div>
          </div>
        </Card>

        {/* 10. Linked Learning Context */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Linked Learning Context</h3>
          <p className="text-xs text-slate-650 font-semibold">Course: <span className="font-bold text-slate-900">Work Readiness Foundation</span></p>
          <div className="flex items-center gap-2">
            <button onClick={() => navigateTo("/learner/lessons/preparing-for-interviews")} className="bg-emerald-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg">Continue Lesson</button>
            <button onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")} className="bg-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg">Open Assessment</button>
          </div>
        </Card>

        {/* 11. Related Resources */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Related Resources</h3>
          <div className="flex flex-col gap-1.5 text-xs">
            <button onClick={() => navigateTo("/learner/resources")} className="text-left text-emerald-855 font-bold hover:underline">Resource Hub</button>
            <button onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")} className="text-left text-emerald-855 font-bold hover:underline">Low-Bandwidth Reading Version</button>
          </div>
        </Card>

        {/* 12. Support Center Card */}
        <LearnerSupportCard />

        {/* 13. Quick Actions */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { title: "Back to Resources", route: "/learner/resources" as RoutePath },
              { title: "Open Reading Version", route: "/learner/resources/low-bandwidth-reading-version" as RoutePath },
              { title: "Continue Lesson", route: "/learner/lessons/preparing-for-interviews" as RoutePath },
              { title: "Open Assessment", route: "/learner/assessments/work-readiness-assignment" as RoutePath },
              { title: "View My Journey", route: "/learner/journey" as RoutePath },
              { title: "Open Support", route: "/learner/support" as RoutePath }
            ].map((action, i) => (
              <div 
                key={i} 
                onClick={() => navigateTo(action.route)}
                className="p-2.5 border border-slate-150 rounded-xl bg-slate-50/50 hover:bg-white hover:border-emerald-200 transition-all cursor-pointer flex justify-between items-center"
              >
                <span className="text-xs font-bold text-slate-800">{action.title}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Bottom Nav */}
      <LearnerMobileNav />
    </div>
  );
}

// ---------------- MOBILE LAYOUT (md:hidden) ----------------
interface MobileProps extends LayoutProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

function MobileDownloadsPage({
  navigateTo,
  searchQuery,
  setSearchQuery,
  activeChip,
  setActiveChip,
  downloadMaterials,
  filteredMaterials,
  savedMaterialIds,
  activities,
  handlePrimaryAction,
  handleSecondaryAction,
  handleRemoveSavedItem,
  handleApplyFiltersBtn,
  handleResetFiltersBtn,
  handleMarkHelpful,
  showToast,
  mobileMenuOpen,
  setMobileMenuOpen
}: MobileProps) {
  return (
    <div className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24 font-sans">
      {/* Mobile compact header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-extrabold tracking-tight text-emerald-800">SUSTAIN LMS</span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo("/learner/notifications")} className="p-1 text-slate-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700 animate-pulse" />
          </button>
          <button onClick={() => navigateTo("/learner/profile")} className="h-6 w-6 rounded-full bg-emerald-855 text-white flex items-center justify-center font-bold text-[10px]">
            AM
          </button>
        </div>
      </header>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex">
          <div className="w-[280px] bg-white h-full flex flex-col p-6 space-y-6 shadow-xl text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-emerald-800">SUSTAIN LMS</h2>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Youth Employability</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-450 hover:text-slate-950 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {[
                { name: "Dashboard", path: "/learner", icon: Compass },
                { name: "My Journey", path: "/learner/journey", icon: Compass },
                { name: "My Courses", path: "/learner/courses", icon: BookOpen },
                { name: "Downloads", path: "/learner/downloads", icon: BookMarked, active: true },
                { name: "Certificates", path: "/learner/certificates", icon: GraduationCap }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo(item.path as RoutePath);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-left transition-all ${
                      item.active ? "bg-emerald-50 text-emerald-855 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Mobile Content (Same as tablet content, stacked cleanly) */}
      <div className="max-w-xl mx-auto px-4 py-5 space-y-6">
        {/* 1. Downloads Hero (Stacked with full width buttons) */}
        <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="space-y-2 text-left">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Learner Workspace / Resources / Downloads</p>
            <div className="flex gap-1.5 flex-wrap">
              <span className="bg-emerald-50 text-emerald-855 text-[9px] font-extrabold px-2 py-0.5 rounded border border-emerald-100">Low-bandwidth support</span>
            </div>
            <h1 className="text-lg font-black text-slate-900 leading-tight">Downloads & Offline Materials</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Access lightweight reading versions, summaries, transcripts, and guides connected to your current lesson and assignment.
            </p>
          </div>

          <div className="space-y-1 text-xs text-slate-500 font-semibold border-t border-slate-50 pt-2 text-left">
            <p>Learner: Aisha Mohammed</p>
            <p>Lesson: Preparing for Interviews</p>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button 
              onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
              className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold py-3 px-4 rounded-xl shadow-sm text-center block min-h-[44px]"
            >
              Open Reading Version
            </button>
            <button 
              onClick={() => navigateTo("/learner/resources")}
              className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-bold py-3 px-4 rounded-xl text-center block min-h-[44px]"
            >
              Back to Resources
            </button>
          </div>

          <div className="bg-emerald-900 text-white rounded-xl border border-emerald-800 p-4 text-left space-y-1">
            <p className="text-[8px] font-bold uppercase tracking-wider text-emerald-300">Recommended Material</p>
            <h4 className="text-xs font-extrabold">Low-Bandwidth Reading Version</h4>
            <p className="text-[10px] text-emerald-200">Use lighter text versions when connection is limited.</p>
          </div>
        </Card>

        {/* 2. Summary Cards (stacked/grid) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-slate-200 rounded-xl text-left flex flex-col justify-between h-20">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase">Available</span>
            <span className="text-lg font-black text-slate-900 mt-1">5</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl text-left flex flex-col justify-between h-20">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase">Low-Bandwidth</span>
            <span className="text-lg font-black text-slate-900 mt-1">2</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl text-left flex flex-col justify-between h-20">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase">Saved Offline</span>
            <span className="text-lg font-black text-emerald-855 mt-1">{savedMaterialIds.length}</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl text-left flex flex-col justify-between h-20">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase">Linked</span>
            <span className="text-[11px] font-black text-slate-900 mt-1 truncate">Work Readiness</span>
          </div>
        </div>

        {/* 3. Material Filters */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 text-left">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Find Materials</h3>
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search materials..."
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {[
                "All",
                "Low-bandwidth",
                "Lesson material",
                "Summary",
                "Transcript"
              ].map((chip) => {
                const isActive = activeChip === chip;
                return (
                  <button
                    key={chip}
                    onClick={() => {
                      setActiveChip(chip);
                      showToast(`Filtering: ${chip}`);
                    }}
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap cursor-pointer ${
                      isActive ? "bg-emerald-900 text-white border-emerald-900" : "bg-slate-50 text-slate-500 border-slate-200"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* 4. Recommended Material */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recommended Material</h3>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
            <div>
              <p className="text-[9px] font-bold text-emerald-800 uppercase bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded inline-block">Available</p>
              <h4 className="text-xs font-black text-slate-900 mt-1.5">Low-Bandwidth Reading Version</h4>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Preparing for Interviews • Lightweight</p>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Open a lightweight reading version of the current lesson to save connectivity and study notes offline.
            </p>
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-150">
              <button 
                onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                className="w-full bg-emerald-900 text-white font-bold py-2.5 rounded-lg text-xs"
              >
                Open Reading Version
              </button>
              <button 
                onClick={() => handleSecondaryAction({
                  id: "mat-low-bandwidth",
                  title: "Low-Bandwidth Reading Version",
                  category: "Lesson material",
                  linkedTo: "Preparing for Interviews",
                  format: "Reading version",
                  size: "Lightweight",
                  status: "Available",
                  helper: "Open reading version.",
                  primaryAction: "Open",
                  secondaryAction: "Save Offline"
                })}
                className="w-full bg-white border border-slate-200 text-slate-800 font-bold py-2.5 rounded-lg text-xs"
              >
                Save Offline
              </button>
            </div>
          </div>
        </Card>

        {/* 5. Download Material List */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Available Materials</h3>

          <div className="space-y-3">
            {filteredMaterials.map((m) => (
              <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-left">
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{m.category} • {m.size}</p>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed font-semibold">{m.helper}</p>
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/50">
                  <button 
                    onClick={() => handlePrimaryAction(m)}
                    className="w-full bg-emerald-900 text-white font-bold py-2.5 rounded-lg text-xs text-center block"
                  >
                    {m.primaryAction}
                  </button>
                  <button 
                    onClick={() => handleSecondaryAction(m)}
                    className="w-full bg-white border border-slate-200 text-slate-800 font-bold py-2.5 rounded-lg text-xs text-center block"
                  >
                    {m.secondaryAction}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 6. Offline Queue */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Offline Queue</h3>
          {savedMaterialIds.length === 0 ? (
            <div className="p-5 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs">
              <p className="font-bold text-slate-650">No materials saved yet</p>
              <p className="text-[10px] text-slate-450 mt-1">Saved materials are simulated for the frontend prototype.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {downloadMaterials.filter(m => savedMaterialIds.includes(m.id)).map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-[10px] text-slate-450 mt-0.5">Saved offline</p>
                  </div>
                  <button onClick={() => handleRemoveSavedItem(item.id, item.title)} className="text-red-750 font-bold text-xs shrink-0 pl-2">Remove</button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* 7. Low-Bandwidth Guidance */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Low-Bandwidth Guidance</h3>
          <ul className="space-y-2 text-xs text-slate-650 font-medium leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
              <span>Start with reading versions before opening heavy media.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
              <span>Use transcripts when audio or video is difficult to load.</span>
            </li>
          </ul>
          <button 
            onClick={() => navigateTo("/learner/support")}
            className="w-full bg-emerald-900 text-white text-xs font-bold py-2.5 rounded-lg text-center"
          >
            Open Support
          </button>
        </Card>

        {/* 8. Recent Download Activity */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-2">
            {activities.slice(0, 3).map((act) => (
              <div key={act.id} className="flex justify-between items-center text-xs py-1 border-b border-slate-50 last:border-b-0">
                <span className="font-bold text-slate-700 truncate pr-2">{act.title}</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-150 shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 9. Download Status */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Download Status</h3>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs font-semibold text-slate-650">
            <div className="flex justify-between">
              <span>Available materials:</span>
              <span className="font-bold text-slate-900">5</span>
            </div>
            <div className="flex justify-between">
              <span>Low-bandwidth:</span>
              <span className="font-bold text-slate-900">2</span>
            </div>
          </div>
        </Card>

        {/* 10. Linked Learning Context */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-3">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Linked Learning Context</h3>
          <p className="text-xs text-slate-650 font-semibold">Course: Work Readiness Foundation</p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => navigateTo("/learner/lessons/preparing-for-interviews")}
              className="w-full bg-emerald-900 text-white text-xs font-bold py-2.5 rounded-lg"
            >
              Continue Lesson
            </button>
            <button 
              onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
              className="w-full bg-white border border-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-lg"
            >
              Open Assessment
            </button>
          </div>
        </Card>

        {/* 11. Related Resources */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Related Resources</h3>
          <div className="flex flex-col gap-2 text-xs">
            <button onClick={() => navigateTo("/learner/resources")} className="text-emerald-855 font-bold hover:underline text-left">Resource Hub</button>
            <button onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")} className="text-emerald-855 font-bold hover:underline text-left">Low-Bandwidth Reading Version</button>
          </div>
        </Card>

        {/* 12. Support Center Card */}
        <LearnerSupportCard />

        {/* 13. Quick Actions */}
        <Card className="bg-white border border-slate-200 rounded-2xl p-4 text-left space-y-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { title: "Back to Resources", route: "/learner/resources" as RoutePath },
              { title: "Open Reading Version", route: "/learner/resources/low-bandwidth-reading-version" as RoutePath },
              { title: "Continue Lesson", route: "/learner/lessons/preparing-for-interviews" as RoutePath },
              { title: "Open Assessment", route: "/learner/assessments/work-readiness-assignment" as RoutePath },
              { title: "View Certificate Track", route: "/learner/certificates/work-readiness-certificate" as RoutePath },
              { title: "Open Support", route: "/learner/support" as RoutePath }
            ].map((action, i) => (
              <div 
                key={i} 
                onClick={() => navigateTo(action.route)}
                className="p-3 border border-slate-150 rounded-xl bg-slate-50/50 flex justify-between items-center cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-800">{action.title}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Fixed Learner bottom nav */}
      <LearnerMobileNav />
    </div>
  );
}
