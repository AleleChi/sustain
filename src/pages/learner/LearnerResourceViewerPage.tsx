import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Download, 
  Eye, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Award, 
  Clock, 
  ChevronRight, 
  Menu, 
  X, 
  BookMarked,
  Info,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  ArrowLeft,
  Settings as SettingsIcon,
  Bookmark,
  ChevronLeft,
  FileDown
} from "lucide-react";

// Types
export interface RelatedItem {
  id: string;
  title: string;
  type: string;
  format: string;
  action: "Download" | "View" | "Open";
}

// Mock Related Items
const RELATED_MATERIALS: RelatedItem[] = [
  {
    id: "rel-1",
    title: "Preparing for Interviews Summary",
    type: "PDF Summary",
    format: "PDF • 680 KB",
    action: "Download"
  },
  {
    id: "rel-2",
    title: "Interview Preparation Transcript",
    type: "Text Transcript",
    format: "Text • Lightweight",
    action: "View"
  },
  {
    id: "rel-3",
    title: "Work Readiness Assignment Guide",
    type: "PDF Guide",
    format: "PDF • 940 KB",
    action: "Download"
  },
  {
    id: "rel-4",
    title: "Certificate Readiness Guide",
    type: "Guide",
    format: "Guide • 520 KB",
    action: "View"
  }
];

export default function LearnerResourceViewerPage() {
  return (
    <>
      <DesktopResourceViewer />
      <TabletResourceViewer />
      <MobileResourceViewer />
    </>
  );
}

// -------------------------------------------------------------
// SHARED INTERACTIVE LOGIC (CUSTOM HOOK)
// -------------------------------------------------------------
function useResourceViewerState() {
  const { navigateTo } = useRoute();
  
  // Reading Control Preferences
  const [textSizePref, setTextSizePref] = useState<"standard" | "large">("standard");
  const [readingModePref, setReadingModePref] = useState<"standard" | "comfortable">("standard");
  const [saveProgressPref, setSaveProgressPref] = useState(true);
  const [lowBandwidthPref, setLowBandwidthPref] = useState(true);

  // Applied Preferences (for active content rendering)
  const [activeTextSize, setActiveTextSize] = useState<"standard" | "large">("standard");
  const [activeReadingMode, setActiveReadingMode] = useState<"standard" | "comfortable">("comfortable");

  // Resource Notes
  const [noteText, setNoteText] = useState("");
  const [savedNote, setSavedNote] = useState("");

  // Search input
  const [searchQuery, setSearchQuery] = useState("");

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleApplyPreferences = () => {
    setActiveTextSize(textSizePref);
    setActiveReadingMode(readingModePref);
    showToast("Reading preferences applied.", "success");
  };

  const handleResetPreferences = () => {
    setTextSizePref("standard");
    setReadingModePref("standard");
    setSaveProgressPref(true);
    setLowBandwidthPref(true);
    setActiveTextSize("standard");
    setActiveReadingMode("standard");
    showToast("Reading controls reset.", "info");
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) {
      showToast("Please enter some text before saving.", "info");
      return;
    }
    setSavedNote(noteText);
    showToast("Resource note saved successfully.", "success");
  };

  const handleClearNote = () => {
    setNoteText("");
    setSavedNote("");
    showToast("Resource note cleared.", "info");
  };

  return {
    navigateTo,
    textSizePref,
    setTextSizePref,
    readingModePref,
    setReadingModePref,
    saveProgressPref,
    setSaveProgressPref,
    lowBandwidthPref,
    setLowBandwidthPref,
    activeTextSize,
    activeReadingMode,
    noteText,
    setNoteText,
    savedNote,
    searchQuery,
    setSearchQuery,
    toast,
    setToast,
    showToast,
    handleApplyPreferences,
    handleResetPreferences,
    handleSaveNote,
    handleClearNote
  };
}

// -------------------------------------------------------------
// REUSABLE VIEWER SUBCOMPONENTS
// -------------------------------------------------------------
interface RelatedMaterialRowProps {
  item: RelatedItem;
  onAction: (item: RelatedItem) => void;
}

function RelatedMaterialRow({ item, onAction }: RelatedMaterialRowProps) {
  return (
    <div 
      className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors cursor-pointer"
      onClick={() => onAction(item)}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-100 flex items-center justify-center shrink-0">
          {item.action === "Download" ? <FileDown className="h-4 w-4 text-emerald-800" /> : <Eye className="h-4 w-4 text-emerald-800" />}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 leading-snug truncate">{item.title}</p>
          <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5 leading-none">{item.format}</p>
        </div>
      </div>
      
      <div className="shrink-0 pl-2" onClick={(e) => e.stopPropagation()}>
        {item.action === "Download" ? (
          <button 
            onClick={() => onAction(item)}
            className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer min-h-[28px] border-none flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Download
          </button>
        ) : (
          <button 
            onClick={() => onAction(item)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-[10px] px-3.5 py-1.5 rounded-lg transition-all cursor-pointer min-h-[28px]"
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}

interface ActivityRowProps {
  title: string;
  context: string;
  time: string;
}

function ActivityRow({ title, context, time }: ActivityRowProps) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50/55 transition-colors">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
        <div className="min-w-0">
          <p className="font-bold text-xs text-slate-800 truncate">{title}</p>
          <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{context}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md shrink-0 ml-2">{time}</span>
    </div>
  );
}

// -------------------------------------------------------------
// DESKTOP LAYOUT
// -------------------------------------------------------------
function DesktopResourceViewer() {
  const state = useResourceViewerState();

  const handleRelatedAction = (item: RelatedItem) => {
    if (item.action === "Download") {
      state.showToast("Download started in this frontend prototype.", "success");
    } else {
      state.showToast("Opening material.", "success");
    }
  };

  return (
    <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950">
      <LearnerSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-slate-200 px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources, notes, lesson materials..."
              value={state.searchQuery}
              onChange={(e) => state.setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 pl-11 pr-4 py-2 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button 
              onClick={() => state.navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full animate-pulse" />
            </button>
            <button 
              onClick={() => state.navigateTo("/learner/support")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-150" />
            <button 
              onClick={() => state.navigateTo("/learner/profile")}
              className="flex items-center gap-2.5 text-left focus:outline-none hover:opacity-95 transition-opacity cursor-pointer group"
            >
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 transition-colors">Aisha Mohammed</p>
                <p className="text-[10px] text-slate-400 font-mono">SUST-LRN-0442</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-800 flex items-center justify-center font-bold text-xs text-white">
                AM
              </div>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 px-8 py-8">
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6">
            
            {/* Left Column Content */}
            <div className="space-y-6">
              
              {/* Breadcrumb Back Link */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <button 
                  onClick={() => state.navigateTo("/learner/resources")}
                  className="flex items-center gap-1.5 hover:text-emerald-900 transition-colors cursor-pointer bg-transparent border-none p-0 text-slate-500 font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Resources
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-450 font-semibold">Work Readiness Foundation</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-450 font-semibold">Preparing for Interviews</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-800 font-bold">Low-Bandwidth Reading Version</span>
              </div>

              {/* SECTION 1 — RESOURCE VIEWER HERO */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-6">
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-full text-[10px] font-bold mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Low-bandwidth material
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
                        Low-Bandwidth Reading Version
                      </h2>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Review the key points from Preparing for Interviews in a lightweight text format. Ideal for offline study or limited internet access.
                      </p>
                    </div>

                    {/* Context row */}
                    <div className="border-t border-slate-100 pt-4 mt-5">
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5 text-emerald-800" />
                          <span>Work Readiness Foundation</span>
                        </div>
                        <div className="h-3.5 w-px bg-slate-200" />
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-emerald-800" />
                          <span>Preparing for Interviews</span>
                        </div>
                        <div className="h-3.5 w-px bg-slate-200" />
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-emerald-800" />
                          <span>8 min read</span>
                        </div>
                        <div className="h-3.5 w-px bg-slate-200" />
                        <div className="flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5 text-emerald-800" />
                          <span>Lightweight</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Actions */}
                    <div className="flex items-center gap-3 mt-6">
                      <button 
                        onClick={() => state.navigateTo("/learner/courses")}
                        className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center border-none"
                      >
                        Continue Lesson
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => state.showToast("Resource saved for offline use in this frontend prototype.", "success")}
                          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
                        >
                          Save Offline
                        </button>
                        <LearnerContextHint 
                          title="Helpful note" 
                          text="Offline save is simulated in this prototype. A live version would need secure storage and sync support." 
                        />
                      </div>
                      <button 
                        onClick={() => state.showToast("Download started.", "success")}
                        className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
                      >
                        <Download className="h-4 w-4 text-slate-500" />
                        Download Summary
                      </button>
                    </div>
                  </div>

                  {/* Right Column of Hero - Deep Green Panel */}
                  <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-850 shadow-sm p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300">
                        Recommended Resource
                      </span>
                      <h3 className="font-bold text-base text-white mt-2 leading-snug">
                        Preparing for Interviews
                      </h3>
                      <p className="text-xs text-emerald-100 mt-2.5 leading-relaxed">
                        Text-friendly reading mode. Built specifically for mobile and desktop review without data overhead.
                      </p>
                    </div>

                    <div className="border-t border-emerald-800/80 pt-4 mt-4 flex items-center justify-between text-[11px] text-emerald-200 font-medium">
                      <span>Assessment-linked</span>
                      <span className="px-2.5 py-0.5 bg-emerald-800 text-emerald-100 rounded text-[9px] font-bold">
                        Low-bandwidth ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 — RESOURCE SUMMARY CARDS */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resource Type</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900">Text</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Reading version</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reading Time</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900">8 min</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Estimated</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Course</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-base font-bold text-slate-900 truncate max-w-[130px]">Work Readiness</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Foundation</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-base font-black text-emerald-900">Recommended</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">For current lesson</p>
                </div>
              </div>

              {/* SECTION 3 — READING CONTROLS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <SettingsIcon className="h-4.5 w-4.5 text-emerald-900" />
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight">Reading Controls</h3>
                  </div>
                  <LearnerContextHint 
                    title="How this works" 
                    text="These controls adjust the reading experience inside this frontend prototype. They do not change your account permanently." 
                  />
                </div>
                <p className="text-xs text-slate-500 mb-5">Adjust the reading experience in this frontend prototype.</p>

                <div className="grid grid-cols-4 gap-6">
                  {/* Text Size Pref */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Text Size</label>
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => state.setTextSizePref("standard")}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg border cursor-pointer transition-all ${
                          state.textSizePref === "standard"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Standard
                      </button>
                      <button 
                        onClick={() => state.setTextSizePref("large")}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg border cursor-pointer transition-all ${
                          state.textSizePref === "large"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Large
                      </button>
                    </div>
                  </div>

                  {/* Reading Mode Pref */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Reading Mode</label>
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => state.setReadingModePref("standard")}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg border cursor-pointer transition-all ${
                          state.readingModePref === "standard"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Standard
                      </button>
                      <button 
                        onClick={() => state.setReadingModePref("comfortable")}
                        className={`flex-1 text-xs font-bold py-2 rounded-lg border cursor-pointer transition-all ${
                          state.readingModePref === "comfortable"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Comfort
                      </button>
                    </div>
                  </div>

                  {/* Save Progress Toggle */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Save Progress</label>
                    <button 
                      onClick={() => state.setSaveProgressPref(!state.saveProgressPref)}
                      className={`w-full text-xs font-bold py-2 rounded-lg border cursor-pointer transition-all text-center ${
                        state.saveProgressPref
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {state.saveProgressPref ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  {/* Low-Bandwidth Mode */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Low-Bandwidth Mode</label>
                    <button 
                      onClick={() => state.setLowBandwidthPref(!state.lowBandwidthPref)}
                      className={`w-full text-xs font-bold py-2 rounded-lg border cursor-pointer transition-all text-center ${
                        state.lowBandwidthPref
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {state.lowBandwidthPref ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>

                {/* Preferences Actions */}
                <div className="flex justify-end gap-2.5 mt-5 pt-4 border-t border-slate-100">
                  <button 
                    onClick={state.handleResetPreferences}
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px]"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={state.handleApplyPreferences}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px] border-none"
                  >
                    Apply Reading Preferences
                  </button>
                </div>
              </div>

              {/* SECTION 4 — READING CONTENT */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <div className="border-b border-slate-100 pb-5 mb-6">
                  <h3 className="font-extrabold text-slate-900 text-xl tracking-tight">Preparing for Interviews</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Low-bandwidth reading version</p>
                </div>

                {/* Article content container styled based on interactive controls */}
                <div className={`text-slate-800 ${
                  state.activeTextSize === "large" ? "text-base md:text-lg" : "text-xs md:text-sm"
                } ${
                  state.activeReadingMode === "comfortable" ? "leading-loose tracking-wide max-w-3xl space-y-9" : "leading-relaxed tracking-normal space-y-7"
                }`}>
                  
                  {/* Part 1: Introduction */}
                  <section className="space-y-3">
                    <h4 className="font-bold text-slate-950 text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-emerald-800 rounded-sm inline-block" />
                      1. Introduction
                    </h4>
                    <p className="text-slate-700 font-medium">
                      Interviews are an opportunity to show your preparation, communication skills, and confidence. This lesson helps you prepare clear answers and present your experience in a professional way.
                    </p>
                  </section>

                  {/* Part 2: Before the interview */}
                  <section className="space-y-3">
                    <h4 className="font-bold text-slate-955 text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-emerald-800 rounded-sm inline-block" />
                      2. Before the interview
                    </h4>
                    <p className="text-slate-700 font-medium">
                      Success in an interview is largely determined by the actions you take before you even enter the room. Focus on the following key points:
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-emerald-200 transition-colors">
                        <span className="text-[9px] font-extrabold text-emerald-900 font-mono uppercase">Key point 01</span>
                        <h5 className="font-bold text-xs text-slate-900 mt-0.5">Review the Role</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed">Review the role or opportunity carefully to understand what skills are required.</p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-emerald-200 transition-colors">
                        <span className="text-[9px] font-extrabold text-emerald-900 font-mono uppercase">Key point 02</span>
                        <h5 className="font-bold text-xs text-slate-900 mt-0.5">Prepare Examples</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed">Prepare examples from your learning, work, volunteering, or community experience.</p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-emerald-200 transition-colors">
                        <span className="text-[9px] font-extrabold text-emerald-900 font-mono uppercase">Key point 03</span>
                        <h5 className="font-bold text-xs text-slate-900 mt-0.5">Practise Explanations</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed">Practise explaining what you did in previous roles and what you learned from them.</p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1 hover:border-emerald-200 transition-colors">
                        <span className="text-[9px] font-extrabold text-emerald-900 font-mono uppercase">Key point 04</span>
                        <h5 className="font-bold text-xs text-slate-900 mt-0.5">Plan Logistics</h5>
                        <p className="text-[11px] text-slate-500 leading-relaxed">Plan your travel, timing, documents, and clothing ahead of the interview day.</p>
                      </div>
                    </div>
                  </section>

                  {/* Part 3: During the interview */}
                  <section className="space-y-3">
                    <h4 className="font-bold text-slate-955 text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-emerald-800 rounded-sm inline-block" />
                      3. During the interview
                    </h4>
                    <p className="text-slate-700 font-medium">
                      While inside the interview, managing your focus, body language, and voice helps establish a lasting positive impression:
                    </p>
                    <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 space-y-3.5">
                      <ul className="space-y-3 text-slate-750">
                        <li className="flex items-start gap-2.5">
                          <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✓</span>
                          <span><strong>Listen carefully</strong> before answering. It is completely fine to pause and structure your thoughts.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✓</span>
                          <span><strong>Speak clearly</strong> and keep your answers focused on the question.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✓</span>
                          <span><strong>Use concrete examples</strong> to support your answer rather than just general claims.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">✓</span>
                          <span><strong>Ask for clarification</strong> if you do not understand a question or terminology.</span>
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Part 4: Using a structured answer */}
                  <section className="space-y-3">
                    <h4 className="font-bold text-slate-955 text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-emerald-800 rounded-sm inline-block" />
                      4. Using a structured answer
                    </h4>
                    <p className="text-slate-700 font-medium">
                      A useful way to answer interview questions is to explain the situation, the task, the action you took, and the result or learning. This helps your answer stay clear and specific.
                    </p>
                    <div className="grid grid-cols-4 gap-3.5 mt-1">
                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center hover:bg-emerald-50 transition-colors">
                        <p className="text-[9px] font-black text-emerald-900 uppercase">Step 1</p>
                        <p className="font-bold text-xs text-slate-900 mt-0.5">Situation</p>
                      </div>
                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center hover:bg-emerald-50 transition-colors">
                        <p className="text-[9px] font-black text-emerald-900 uppercase">Step 2</p>
                        <p className="font-bold text-xs text-slate-900 mt-0.5">Task</p>
                      </div>
                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center hover:bg-emerald-50 transition-colors">
                        <p className="text-[9px] font-black text-emerald-900 uppercase">Step 3</p>
                        <p className="font-bold text-xs text-slate-900 mt-0.5">Action</p>
                      </div>
                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center hover:bg-emerald-50 transition-colors">
                        <p className="text-[9px] font-black text-emerald-900 uppercase">Step 4</p>
                        <p className="font-bold text-xs text-slate-900 mt-0.5">Result</p>
                      </div>
                    </div>
                  </section>

                  {/* Part 5: After the interview */}
                  <section className="space-y-3">
                    <h4 className="font-bold text-slate-955 text-xs uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-emerald-800 rounded-sm inline-block" />
                      5. After the interview
                    </h4>
                    <p className="text-slate-700 font-medium">
                      Reflection and follow-up can differentiate you and help you learn from each interview experience:
                    </p>
                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="font-bold text-xs text-slate-800">1. Thank interviewer</p>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal">Thank the interviewer for their time before leaving and follow up with a message.</p>
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-800">2. Reflect & Assess</p>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal">Reflect honestly on what went well and identify specific areas to improve next time.</p>
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-800">3. Follow up</p>
                          <p className="text-[11px] text-slate-500 mt-1 leading-normal">Follow up professionally if appropriate within the stated timeline or communication pathway.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Part 6: Key takeaway */}
                  <section className="p-6 bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-sm text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Key Takeaway</span>
                    <blockquote className="mt-2 text-xs md:text-sm font-semibold italic leading-relaxed text-emerald-50">
                      "Good interview preparation is not about memorising answers. It is about understanding your experience, explaining it clearly, and showing that you are ready to learn and contribute to the community."
                    </blockquote>
                  </section>

                  {/* Part 7: Reflection prompt */}
                  <section className="p-6 bg-emerald-50/40 border border-emerald-250/60 rounded-2xl space-y-3 text-left">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Reflection Practice</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      What is one example from your experience (e.g. Kano Youth Skills Hub cohort, volunteering, or teamwork) that you can use in an interview answer?
                    </p>
                    <textarea 
                      placeholder="Type your reflection answer here to practice..."
                      className="w-full bg-white text-slate-850 p-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all min-h-[90px]"
                    />
                    <button 
                      onClick={() => state.showToast("Reflection saved locally.", "success")}
                      className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer border-none"
                    >
                      Save Reflection
                    </button>
                  </section>

                </div>

                {/* Section bottom CTA */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Ready to test your knowledge?</p>
                    <p className="font-bold text-xs text-slate-700 mt-0.5">Complete your current assignment</p>
                  </div>
                  <button 
                    onClick={() => state.navigateTo("/learner/assessments")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center border-none"
                  >
                    Open Assessment
                  </button>
                </div>
              </div>

              {/* SECTION 5 — RELATED MATERIALS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="mb-4 text-left">
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">Related Materials</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Explore additional resources tied to this lesson.</p>
                </div>

                <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-xs">
                  {RELATED_MATERIALS.map(item => (
                    <RelatedMaterialRow 
                      key={item.id} 
                      item={item} 
                      onAction={handleRelatedAction} 
                    />
                  ))}
                </div>
              </div>

              {/* SECTION 6 — RESOURCE NOTES */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-left">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">My Resource Notes</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Add a short note for yourself in this frontend prototype.</p>
                </div>

                <div className="mt-4 space-y-3">
                  <textarea
                    placeholder="Write a short note about what you want to remember..."
                    value={state.noteText}
                    onChange={(e) => state.setNoteText(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 p-4 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all min-h-[100px]"
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      {state.savedNote ? (
                        <span className="text-[10px] font-bold text-emerald-850 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                          Note saved locally
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">Notes are saved in local session</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={state.handleClearNote}
                        className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px]"
                      >
                        Clear Note
                      </button>
                      <button 
                        onClick={state.handleSaveNote}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer border-none min-h-[38px]"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column Content */}
            <div className="space-y-6">
              
              {/* RIGHT COLUMN CARD 1 — RESOURCE STATUS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-left">
                <h4 className="font-bold text-slate-950 text-xs tracking-wider uppercase mb-4">Resource Status</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Resource</span>
                    <span className="font-bold text-slate-855 text-right max-w-[160px] line-clamp-1">Low-Bandwidth Version</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Course</span>
                    <span className="font-bold text-slate-855 text-right max-w-[160px] line-clamp-1">Work Readiness Foundation</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Lesson</span>
                    <span className="font-bold text-slate-855 text-right max-w-[160px] line-clamp-1">Preparing for Interviews</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="font-extrabold text-emerald-900">Recommended</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Reading mode</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Low-bandwidth enabled</span>
                  </div>
                </div>
                <button 
                  onClick={() => state.navigateTo("/learner/downloads")}
                  className="w-full mt-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl border border-slate-250 transition-all cursor-pointer min-h-[44px]"
                >
                  Open Downloads
                </button>
              </div>

              {/* RIGHT COLUMN CARD 2 — CURRENT LEARNING CONTEXT */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-left">
                <h4 className="font-bold text-slate-950 text-xs tracking-wider uppercase mb-4">Current Learning Context</h4>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Course</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Foundation</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Lesson</span>
                    <p className="font-bold text-slate-800 mt-0.5">Preparing for Interviews</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Assessment</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Assignment</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Certificate</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Certificate</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => state.navigateTo("/learner/courses")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center min-h-[44px] border-none flex items-center justify-center"
                  >
                    Continue Lesson
                  </button>
                  <button 
                    onClick={() => state.navigateTo("/learner/assessments")}
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-[11px] py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center min-h-[44px] flex items-center justify-center"
                  >
                    Open Assessment
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN CARD 3 — SUPPORT CENTER CARD */}
              <LearnerSupportCard />

              {/* RIGHT COLUMN CARD 4 — RECENT RESOURCE ACTIVITY */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-left">
                <h4 className="font-bold text-slate-955 text-xs tracking-wider uppercase mb-4">Recent Resource Activity</h4>
                <div className="space-y-1">
                  <ActivityRow 
                    title="Opened Low-Bandwidth Reading Version"
                    context="Text reading version • Work Readiness Foundation"
                    time="Today"
                  />
                  <ActivityRow 
                    title="Viewed Preparing for Interviews Summary"
                    context="PDF Summary • Work Readiness Foundation"
                    time="Today"
                  />
                  <ActivityRow 
                    title="Downloaded Work Readiness Assignment Guide"
                    context="PDF Guide • Work Readiness Foundation"
                    time="Yesterday"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification overlay */}
      {state.toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white rounded-xl shadow-xl px-4 py-3.5 border border-slate-800 flex items-center gap-3.5 animate-in fade-in duration-200 max-w-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
          <p className="text-xs font-bold leading-relaxed">{state.toast.message}</p>
          <button 
            onClick={() => state.setToast(null)}
            className="ml-auto text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// TABLET LAYOUT
// -------------------------------------------------------------
function TabletResourceViewer() {
  const state = useResourceViewerState();

  const handleRelatedAction = (item: RelatedItem) => {
    if (item.action === "Download") {
      state.showToast("Download started.", "success");
    } else {
      state.showToast("Opening material.", "success");
    }
  };

  return (
    <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      
      {/* Tablet Header */}
      <header className="flex items-center justify-between h-14 bg-white border-b border-slate-200 px-5 shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-emerald-900">SUSTAIN LMS</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => state.navigateTo("/learner/notifications")}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <div className="h-8 w-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs">
            AM
          </div>
        </div>
      </header>

      {/* Main Tablet Container */}
      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        
        {/* Breadcrumb back */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button 
            onClick={() => state.navigateTo("/learner/resources")}
            className="flex items-center gap-1.5 hover:text-emerald-900 cursor-pointer bg-transparent border-none p-0 text-slate-500 font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Resources
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold">Low-Bandwidth Reading Version</span>
        </div>

        {/* 1. Resource Hero (Stacked) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5 text-left">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-950 rounded-full text-[10px] font-bold border border-emerald-100">
              Low-bandwidth material
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2.5 font-sans">
              Low-Bandwidth Reading Version
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Review the key points from Preparing for Interviews in a lightweight text format. Ideal for offline study or limited internet access.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span>Work Readiness Foundation</span>
            <span className="text-slate-200">•</span>
            <span>Preparing for Interviews</span>
            <span className="text-slate-200">•</span>
            <span>8 min read</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button 
              onClick={() => state.navigateTo("/learner/courses")}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer border-none flex-1 min-h-[44px] flex items-center justify-center"
            >
              Continue Lesson
            </button>
            <div className="flex items-center gap-1.5 flex-1">
              <button 
                onClick={() => state.showToast("Resource saved for offline use.", "success")}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer w-full min-h-[44px] flex items-center justify-center"
              >
                Save Offline
              </button>
              <LearnerContextHint 
                title="Helpful note" 
                text="Offline save is simulated in this prototype. A live version would need secure storage and sync support." 
              />
            </div>
          </div>
        </div>

        {/* 2. Resource Summary Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-24 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Resource Type</span>
            <span className="text-base font-extrabold text-slate-900">Text</span>
            <span className="text-[10px] text-slate-500 font-medium">Reading version</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-24 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Reading Time</span>
            <span className="text-base font-extrabold text-slate-900">8 min</span>
            <span className="text-[10px] text-slate-500 font-medium">Estimated</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-24 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Course</span>
            <span className="text-xs font-bold text-slate-900 line-clamp-1">Work Readiness</span>
            <span className="text-[10px] text-slate-500 font-medium">Foundation</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-24 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
            <span className="text-sm font-extrabold text-emerald-900">Recommended</span>
            <span className="text-[10px] text-slate-500 font-medium">For current lesson</span>
          </div>
        </div>

        {/* 3. Reading Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
              <SettingsIcon className="h-4 w-4 text-emerald-900" />
              Reading Controls
            </h3>
            <LearnerContextHint 
              title="How this works" 
              text="These controls adjust the reading experience inside this frontend prototype. They do not change your account permanently." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Text Size</label>
              <div className="flex gap-1">
                <button 
                  onClick={() => state.setTextSizePref("standard")}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg border cursor-pointer ${
                    state.textSizePref === "standard" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => state.setTextSizePref("large")}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg border cursor-pointer ${
                    state.textSizePref === "large" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Large
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Reading Mode</label>
              <div className="flex gap-1">
                <button 
                  onClick={() => state.setReadingModePref("standard")}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg border cursor-pointer ${
                    state.readingModePref === "standard" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => state.setReadingModePref("comfortable")}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg border cursor-pointer ${
                    state.readingModePref === "comfortable" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Comfort
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button 
              onClick={state.handleResetPreferences}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              Reset
            </button>
            <button 
              onClick={state.handleApplyPreferences}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer border-none"
            >
              Apply Preferences
            </button>
          </div>
        </div>

        {/* 4. Reading Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 text-left">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Preparing for Interviews</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">Low-bandwidth reading version</p>
          </div>

          <div className={`text-slate-800 ${
            state.activeTextSize === "large" ? "text-base" : "text-xs md:text-sm"
          } ${
            state.activeReadingMode === "comfortable" ? "leading-loose tracking-wide space-y-7" : "leading-relaxed space-y-5"
          }`}>
            <section className="space-y-2">
              <h4 className="font-bold text-slate-955 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-emerald-800 rounded-sm inline-block" />
                1. Introduction
              </h4>
              <p className="text-slate-650 font-medium">
                Interviews are an opportunity to show your preparation, communication skills, and confidence. This lesson helps you prepare clear answers and present your experience in a professional way.
              </p>
            </section>

            <section className="space-y-2.5">
              <h4 className="font-bold text-slate-955 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-emerald-800 rounded-sm inline-block" />
                2. Before the interview
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <h5 className="font-bold text-xs text-slate-900">Review Role</h5>
                  <p className="text-[11px] text-slate-500 leading-snug">Review role carefully to understand required skills.</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <h5 className="font-bold text-xs text-slate-900">Prepare Examples</h5>
                  <p className="text-[11px] text-slate-500 leading-snug">Prepare examples from work, learning, or community experience.</p>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-slate-955 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-emerald-800 rounded-sm inline-block" />
                3. During the interview
              </h4>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-slate-700 text-xs">
                <p>• <strong>Listen carefully</strong> before starting your answers.</p>
                <p>• <strong>Speak clearly</strong> and keep responses focused and directly target questions.</p>
                <p>• <strong>Use structured examples</strong> to provide concrete support.</p>
              </div>
            </section>

            <section className="p-5 bg-emerald-900 text-white rounded-xl border border-emerald-800 shadow-xs">
              <blockquote className="text-xs font-semibold italic text-emerald-50">
                "Good interview preparation is not about memorising answers. It is about understanding your experience, explaining it clearly, and showing that you are ready to learn."
              </blockquote>
            </section>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button 
              onClick={() => state.navigateTo("/learner/assessments")}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl transition-all border-none cursor-pointer"
            >
              Open Assessment
            </button>
          </div>
        </div>

        {/* 5. Related Materials */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 text-left">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight">Related Materials</h3>
          <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden">
            {RELATED_MATERIALS.map(item => (
              <RelatedMaterialRow 
                key={item.id} 
                item={item} 
                onAction={handleRelatedAction} 
              />
            ))}
          </div>
        </div>

        {/* 6. Resource Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 text-left">
          <h3 className="font-bold text-slate-900 text-sm tracking-tight">My Resource Notes</h3>
          <textarea
            placeholder="Write a short note about what you want to remember..."
            value={state.noteText}
            onChange={(e) => state.setNoteText(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 p-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none min-h-[90px]"
          />
          <div className="flex justify-end gap-2">
            <button 
              onClick={state.handleClearNote}
              className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
            >
              Clear Note
            </button>
            <button 
              onClick={state.handleSaveNote}
              className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl border-none cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </div>

        {/* 7. Resource Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 text-left">
          <h4 className="font-bold text-slate-950 text-xs tracking-wider uppercase">Resource Status</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Resource</span>
              <span className="font-bold text-slate-855">Low-Bandwidth Version</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Status</span>
              <span className="font-extrabold text-emerald-900">Recommended</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Reading mode</span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 rounded border border-emerald-100">Low-bandwidth enabled</span>
            </div>
          </div>
          <button 
            onClick={() => state.navigateTo("/learner/downloads")}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-xl border border-slate-250 cursor-pointer min-h-[44px]"
          >
            Open Downloads
          </button>
        </div>

        {/* 8. Current Learning Context */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3.5 text-left">
          <h4 className="font-bold text-slate-955 text-xs tracking-wider uppercase">Current Learning Context</h4>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Course</span>
              <p className="font-bold text-slate-800">Work Readiness Foundation</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Lesson</span>
              <p className="font-bold text-slate-800">Preparing for Interviews</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button 
              onClick={() => state.navigateTo("/learner/courses")}
              className="bg-emerald-900 text-white font-bold text-[11px] py-2 rounded-xl border-none cursor-pointer text-center min-h-[44px] flex items-center justify-center"
            >
              Continue Lesson
            </button>
            <button 
              onClick={() => state.navigateTo("/learner/assessments")}
              className="bg-white border border-slate-200 text-slate-800 font-bold text-[11px] py-2 rounded-xl cursor-pointer text-center min-h-[44px] flex items-center justify-center"
            >
              Open Assessment
            </button>
          </div>
        </div>

        {/* 9. Support Center Card */}
        <LearnerSupportCard />

      </div>

      {/* Fixed bottom tablet nav */}
      <LearnerMobileNav />

      {/* Toast */}
      {state.toast && (
        <div className="fixed bottom-20 right-6 z-50 bg-slate-950 text-white rounded-xl shadow-xl px-4 py-3.5 border border-slate-800 flex items-center gap-3 animate-slide-in-right max-w-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <p className="text-xs font-bold leading-relaxed">{state.toast.message}</p>
          <button onClick={() => state.setToast(null)} className="ml-auto text-slate-400 hover:text-white cursor-pointer">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// MOBILE LAYOUT
// -------------------------------------------------------------
function MobileResourceViewer() {
  const state = useResourceViewerState();

  const handleRelatedAction = (item: RelatedItem) => {
    if (item.action === "Download") {
      state.showToast("Download started.", "success");
    } else {
      state.showToast("Opening material.", "success");
    }
  };

  return (
    <div className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      
      {/* Mobile Compact Header */}
      <header className="flex items-center justify-between h-14 bg-white border-b border-slate-200 px-4 shrink-0 sticky top-0 z-40">
        <h1 className="text-sm font-bold text-emerald-900 tracking-tight">SUSTAIN LMS</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => state.navigateTo("/learner/notifications")}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <Bell className="h-4.5 w-4.5" />
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <div className="h-7 w-7 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-[10px]">
            AM
          </div>
        </div>
      </header>

      {/* Mobile Body */}
      <div className="px-4 py-4 space-y-4">
        
        {/* Back navigation line */}
        <button 
          onClick={() => state.navigateTo("/learner/resources")}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-950 bg-transparent border-none p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Resources
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-sm text-left">
          <div>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-950 rounded-full text-[9px] font-bold border border-emerald-100">
              Low-bandwidth material
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2 font-sans leading-tight">
              Low-Bandwidth Reading Version
            </h2>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Review the key points from Preparing for Interviews in a lightweight text format. Ideal for offline study or limited internet access.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wide">
            <span>8 min read</span>
            <span>•</span>
            <span>Work Readiness</span>
          </div>

          <div className="space-y-2 pt-1">
            <button 
              onClick={() => state.navigateTo("/learner/courses")}
              className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all border-none cursor-pointer min-h-[44px]"
            >
              Continue Lesson
            </button>
            <div className="flex items-center gap-1.5 w-full">
              <button 
                onClick={() => state.showToast("Resource saved for offline use.", "success")}
                className="flex-1 bg-white border border-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer min-h-[44px]"
              >
                Save Offline
              </button>
              <LearnerContextHint 
                title="Helpful note" 
                text="Offline save is simulated in this prototype. A live version would need secure storage and sync support." 
              />
            </div>
          </div>
        </div>

        {/* Resource Summary grid */}
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="bg-white rounded-xl border border-slate-200 p-3 h-20 flex flex-col justify-between">
            <span className="text-[8px] font-bold text-slate-400 uppercase">Type</span>
            <span className="text-sm font-bold text-slate-900">Text</span>
            <span className="text-[9px] text-slate-450 font-semibold">Reading view</span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-3 h-20 flex flex-col justify-between">
            <span className="text-[8px] font-bold text-slate-400 uppercase">Duration</span>
            <span className="text-sm font-bold text-slate-900">8 min</span>
            <span className="text-[9px] text-slate-450 font-semibold">Estimated</span>
          </div>
        </div>

        {/* Reading Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3.5 shadow-sm text-left">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <SettingsIcon className="h-4 w-4 text-emerald-900" />
              Reading Controls
            </h4>
            <LearnerContextHint 
              title="How this works" 
              text="These controls adjust the reading experience inside this frontend prototype. They do not change your account permanently." 
            />
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 mb-1">Text Size</span>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => state.setTextSizePref("standard")}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg border cursor-pointer ${
                    state.textSizePref === "standard" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Standard
                </button>
                <button 
                  onClick={() => state.setTextSizePref("large")}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg border cursor-pointer ${
                    state.textSizePref === "large" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  Large
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-slate-100 justify-end">
            <button 
              onClick={state.handleResetPreferences}
              className="bg-white border border-slate-200 text-slate-700 text-[11px] font-bold px-3 py-1.5 rounded-lg"
            >
              Reset
            </button>
            <button 
              onClick={state.handleApplyPreferences}
              className="bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border-none"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Reading Content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-sm text-left">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">Preparing for Interviews</h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Low-bandwidth material</p>
          </div>

          <div className={`text-slate-800 ${
            state.activeTextSize === "large" ? "text-sm leading-relaxed" : "text-[12px] leading-relaxed"
          }`}>
            <div className="space-y-5">
              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-950 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-emerald-800 rounded-sm inline-block" />
                  1. Introduction
                </h4>
                <p className="text-slate-650 leading-relaxed font-medium">
                  Interviews are an opportunity to show your preparation, communication skills, and confidence. This lesson helps you prepare clear answers and present your experience in a professional way.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-955 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-emerald-800 rounded-sm inline-block" />
                  2. Before the interview
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-slate-700 text-[11px]">
                  <p>• Review the role or opportunity carefully.</p>
                  <p>• Prepare examples from work or learning experience.</p>
                  <p>• Practise explaining what you did and learned.</p>
                  <p>• Plan your travel, timing, and documents.</p>
                </div>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-955 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-emerald-800 rounded-sm inline-block" />
                  3. During the interview
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-slate-700 text-[11px]">
                  <p>• Listen carefully before starting to answer.</p>
                  <p>• Speak clearly and keep your answers focused.</p>
                  <p>• Show respect and professional tone.</p>
                </div>
              </section>
            </div>
          </div>

          <button 
            onClick={() => state.navigateTo("/learner/assessments")}
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl border-none cursor-pointer min-h-[44px]"
          >
            Open Assessment
          </button>
        </div>

        {/* Related Materials */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm text-left">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Related Materials</h4>
          <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden">
            {RELATED_MATERIALS.slice(0, 3).map(item => (
              <RelatedMaterialRow 
                key={item.id} 
                item={item} 
                onAction={handleRelatedAction} 
              />
            ))}
          </div>
        </div>

        {/* Resource Notes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm text-left">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Resource Notes</h4>
          <textarea
            placeholder="Write a short note about what you want to remember..."
            value={state.noteText}
            onChange={(e) => state.setNoteText(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 p-3 rounded-xl border border-slate-200 text-[11px] font-medium min-h-[70px]"
          />
          <div className="flex gap-2 justify-end">
            <button 
              onClick={state.handleClearNote}
              className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg"
            >
              Clear
            </button>
            <button 
              onClick={state.handleSaveNote}
              className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border-none"
            >
              Save Note
            </button>
          </div>
        </div>

        {/* Resource Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm text-xs text-left">
          <h4 className="font-bold text-slate-955 text-xs tracking-wider uppercase">Resource Status</h4>
          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Resource</span>
              <span className="font-bold text-slate-850 truncate max-w-[120px]">Low-Bandwidth Version</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Status</span>
              <span className="font-extrabold text-emerald-900">Recommended</span>
            </div>
          </div>
          <button 
            onClick={() => state.navigateTo("/learner/downloads")}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-xl border border-slate-250 cursor-pointer min-h-[44px]"
          >
            Open Downloads
          </button>
        </div>

        {/* Learning Context */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm text-left">
          <h4 className="font-bold text-slate-955 text-xs tracking-wider uppercase">Learning Context</h4>
          <div className="space-y-1 text-[11px]">
            <p className="text-slate-400 font-bold uppercase text-[8px]">Course</p>
            <p className="font-bold text-slate-800 leading-snug">Work Readiness Foundation</p>
          </div>
          <button 
            onClick={() => state.navigateTo("/learner/courses")}
            className="w-full bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-xl border-none cursor-pointer min-h-[44px]"
          >
            Continue Lesson
          </button>
        </div>

        {/* Support Card */}
        <LearnerSupportCard />

      </div>

      {/* Mobile Bottom Navigation */}
      <LearnerMobileNav />

      {/* Toast Overlay */}
      {state.toast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-slate-950 text-white rounded-xl shadow-xl px-4 py-3 border border-slate-800 flex items-center gap-2 animate-in fade-in duration-200">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
          <p className="text-[11px] font-bold leading-relaxed">{state.toast.message}</p>
          <button onClick={() => state.setToast(null)} className="ml-auto text-slate-400 hover:text-white">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
