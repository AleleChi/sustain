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
  Filter, 
  Menu, 
  X, 
  BookMarked,
  Info,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  ClipboardList,
  WifiOff
} from "lucide-react";

// Types
export interface ResourceItem {
  id: string;
  title: string;
  type: string;
  course: string;
  category: string;
  size: string;
  status: "Recommended" | "Available" | "Required" | "Downloaded";
  action: "Download" | "View" | "Open";
}

// Mock Resource Items
const ALL_RESOURCES: ResourceItem[] = [
  {
    id: "res-1",
    title: "Preparing for Interviews Summary",
    type: "PDF summary",
    course: "Work Readiness Foundation",
    category: "Lesson material",
    size: "680 KB",
    status: "Recommended",
    action: "Download"
  },
  {
    id: "res-2",
    title: "Interview Preparation Transcript",
    type: "Text transcript",
    course: "Work Readiness Foundation",
    category: "Low-bandwidth material",
    size: "Lightweight",
    status: "Available",
    action: "View"
  },
  {
    id: "res-3",
    title: "Low-Bandwidth Reading Version",
    type: "Text reading version",
    course: "Work Readiness Foundation",
    category: "Low-bandwidth material",
    size: "Lightweight",
    status: "Recommended",
    action: "Open"
  },
  {
    id: "res-4",
    title: "Work Readiness Assignment Guide",
    type: "PDF guide",
    course: "Work Readiness Foundation",
    category: "Assessment material",
    size: "940 KB",
    status: "Required",
    action: "Download"
  },
  {
    id: "res-5",
    title: "Workplace Communication Summary",
    type: "PDF summary",
    course: "Workplace Communication",
    category: "Completed course material",
    size: "720 KB",
    status: "Downloaded",
    action: "Open"
  },
  {
    id: "res-6",
    title: "Digital Readiness Basics Summary",
    type: "PDF summary",
    course: "Digital Readiness Basics",
    category: "Completed course material",
    size: "1.1 MB",
    status: "Downloaded",
    action: "Open"
  },
  {
    id: "res-7",
    title: "Certificate Readiness Guide",
    type: "Guide",
    course: "Work Readiness Foundation",
    category: "Certificate guidance",
    size: "520 KB",
    status: "Available",
    action: "View"
  },
  {
    id: "res-8",
    title: "CPD Record Guide",
    type: "Guide",
    course: "SUSTAIN CPD Programme",
    category: "CPD guidance",
    size: "480 KB",
    status: "Available",
    action: "View"
  }
];

// -------------------------------------------------------------
// HELPER UTILITIES
// -------------------------------------------------------------
export function getResourceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("transcript")) {
    return <WifiOff className="h-5 w-5 text-emerald-905" />;
  }
  if (t.includes("reading version") || t.includes("book")) {
    return <BookOpen className="h-5 w-5 text-emerald-905" />;
  }
  if (t.includes("assignment") || t.includes("guide") && (t.includes("work") || t.includes("readiness"))) {
    if (t.includes("certificate")) {
      return <Award className="h-5 w-5 text-emerald-905" />;
    }
    return <ClipboardList className="h-5 w-5 text-emerald-905" />;
  }
  if (t.includes("certificate") || t.includes("cpd") || t.includes("record")) {
    return <Award className="h-5 w-5 text-emerald-905" />;
  }
  return <FileText className="h-5 w-5 text-emerald-905" />;
}

export function getResourceDescription(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("preparing for interviews summary")) {
    return "Quick PDF summary for reviewing interview preparation points.";
  }
  if (t.includes("interview preparation transcript")) {
    return "Text-only transcript for learners using low-bandwidth access.";
  }
  if (t.includes("low-bandwidth reading version")) {
    return "Lightweight reading version for easier access on slower connections.";
  }
  if (t.includes("work readiness assignment guide")) {
    return "Required guide for completing the current written assignment.";
  }
  if (t.includes("workplace communication summary")) {
    return "Review material from the completed communication course.";
  }
  if (t.includes("digital readiness basics summary")) {
    return "Summary material from the completed digital readiness course.";
  }
  if (t.includes("certificate readiness guide")) {
    return "Guide to understand certificate review requirements.";
  }
  if (t.includes("cpd record guide")) {
    return "Guide to understand confirmed and pending CPD credits.";
  }
  if (t.includes("work readiness certificate requirements")) {
    return "Review the course and assessment requirements linked to your certificate.";
  }
  return "Assigned pathway course reference material.";
}

// -------------------------------------------------------------
// REUSABLE SUBCOMPONENTS
// -------------------------------------------------------------
interface ResourceRowProps {
  res: ResourceItem;
  onAction: (res: ResourceItem) => void;
}

function ResourceCardDesktop({ res, onAction }: ResourceRowProps) {
  const icon = getResourceIcon(res.title);
  const desc = getResourceDescription(res.title);
  
  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm grid grid-cols-[48px_minmax(0,1fr)_auto] gap-4 items-center hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99]"
      onClick={() => onAction(res)}
    >
      <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-bold text-xs text-slate-900 leading-tight truncate max-w-[400px]">
            {res.title}
          </h4>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-[9px] font-bold shrink-0">
            {res.type}
          </span>
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border shrink-0 ${
            res.status === "Recommended" ? "bg-emerald-50 text-emerald-950 border-emerald-100" :
            res.status === "Required" ? "bg-amber-50 text-amber-950 border-amber-100" :
            res.status === "Downloaded" ? "bg-slate-100 text-slate-700 border-slate-200" :
            "bg-slate-50 text-slate-600 border-slate-150"
          }`}>
            {res.status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
          <span className="text-slate-500 font-semibold">{res.course}</span>
          <span>•</span>
          <span>{res.category}</span>
          <span>•</span>
          <span className="font-mono">{res.size}</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">{desc}</p>
      </div>
      <div className="shrink-0 pl-2" onClick={(e) => e.stopPropagation()}>
        {res.action === "Download" ? (
          <button 
            onClick={() => onAction(res)}
            className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer min-h-[38px] flex items-center gap-1.5 border-none"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        ) : (
          <button 
            onClick={() => onAction(res)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5"
          >
            <Eye className="h-4 w-4 text-slate-500" />
            {res.action}
          </button>
        )}
      </div>
    </div>
  );
}

function ResourceCardMobile({ res, onAction }: ResourceRowProps) {
  const icon = getResourceIcon(res.title);
  const desc = getResourceDescription(res.title);
  
  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 hover:border-emerald-250 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99] text-left"
      onClick={() => onAction(res)}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">{res.title}</h4>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-full text-[9px] font-bold">
          {res.type}
        </span>
        <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
          res.status === "Recommended" ? "bg-emerald-50 text-emerald-950 border-emerald-100" :
          res.status === "Required" ? "bg-amber-50 text-amber-950 border-amber-100" :
          res.status === "Downloaded" ? "bg-slate-100 text-slate-700 border-slate-200" :
          "bg-slate-50 text-slate-600 border-slate-150"
        }`}>
          {res.status}
        </span>
        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-medium font-mono">{res.size}</span>
      </div>
      
      <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
      
      <div onClick={(e) => e.stopPropagation()}>
        {res.action === "Download" ? (
          <button 
            onClick={() => onAction(res)}
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 border-none"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        ) : (
          <button 
            onClick={() => onAction(res)}
            className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <Eye className="h-4 w-4 text-slate-500" />
            {res.action}
          </button>
        )}
      </div>
    </div>
  );
}

interface LowBandwidthCardProps {
  title: string;
  type: string;
  helper: string;
  size: string;
  action: "View" | "Open" | "Download";
  onAction: () => void;
}

function LowBandwidthMaterialCard({ 
  title, 
  type, 
  helper, 
  size, 
  action, 
  onAction 
}: LowBandwidthCardProps) {
  const icon = getResourceIcon(title);
  
  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between h-64 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99] group text-left"
      onClick={onAction}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[9px] font-bold">
            {type}
          </span>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-xs text-slate-900 leading-tight group-hover:text-emerald-950 transition-colors">{title}</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{helper}</p>
        </div>
      </div>
      
      <div className="space-y-3 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold font-mono">
          <span>{size}</span>
          <span className="text-emerald-700 font-bold bg-emerald-50/70 px-1.5 py-0.5 rounded border border-emerald-100">Low-Bandwidth Ready</span>
        </div>
        {action === "Download" ? (
          <button 
            onClick={onAction}
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm cursor-pointer min-h-[38px] flex items-center justify-center gap-1 border-none"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        ) : (
          <button 
            onClick={onAction}
            className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px] flex items-center justify-center gap-1"
          >
            <Eye className="h-4 w-4 text-slate-500" />
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

interface CertificateCPDCardProps {
  title: string;
  type: string;
  helper: string;
  related: string;
  action: "View";
  onAction: () => void;
}

function CertificateCPDGuideCard({
  title,
  type,
  helper,
  related,
  action,
  onAction
}: CertificateCPDCardProps) {
  const icon = getResourceIcon(title);
  
  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between h-64 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99] group text-left"
      onClick={onAction}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            {icon}
          </div>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[9px] font-bold">
            {type}
          </span>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-xs text-slate-900 leading-tight group-hover:text-emerald-950 transition-colors">{title}</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{helper}</p>
        </div>
      </div>
      
      <div className="space-y-3 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col text-[10px] text-slate-400 font-semibold leading-tight">
          <span className="uppercase text-[8px] tracking-wider text-slate-400 font-bold">Related Area</span>
          <span className="text-slate-700 font-bold mt-0.5 truncate">{related}</span>
        </div>
        <button 
          onClick={onAction}
          className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer min-h-[38px] flex items-center justify-center gap-1"
        >
          <Eye className="h-4 w-4 text-slate-500" />
          {action}
        </button>
      </div>
    </div>
  );
}

interface QuickActionRowProps {
  label: string;
  helper: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
}

function QuickActionRow({ label, helper, icon: Icon, onClick }: QuickActionRowProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 ease-out group cursor-pointer active:scale-[0.99] border-none text-left"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-50 text-emerald-900 rounded-lg group-hover:bg-emerald-900 group-hover:text-white transition-colors duration-200">
          <Icon className="h-4 w-4 shrink-0" />
        </div>
        <div>
          <p className="font-bold text-xs text-slate-800 group-hover:text-emerald-950 transition-colors">{label}</p>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-0.5">{helper}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-900 transition-all shrink-0" />
    </button>
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

export default function LearnerResourcesPage() {
  return (
    <>
      <DesktopLearnerResources />
      <TabletLearnerResources />
      <MobileLearnerResources />
    </>
  );
}

// -------------------------------------------------------------
// DESKTOP LAYOUT
// -------------------------------------------------------------
function DesktopLearnerResources() {
  const { navigateTo } = useRoute();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveChip("All");
    showToast("Filters cleared.", "info");
  };

  const handleApplyFilters = () => {
    showToast("Resource filters applied.", "success");
  };

  const handleResourceAction = (res: ResourceItem) => {
    if (res.action === "Download") {
      showToast("Download started in this frontend prototype.", "success");
    } else if (res.action === "View" || res.action === "Open") {
      navigateTo("/learner/resources/low-bandwidth-reading-version");
    }
  };

  // Filtering logic
  const filteredResources = ALL_RESOURCES.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    if (activeChip === "All") return true;
    if (activeChip === "Recommended") return item.status === "Recommended";
    if (activeChip === "Lesson materials") return item.category === "Lesson material" || item.category === "Completed course material";
    if (activeChip === "Assessment guides") return item.category === "Assessment material";
    if (activeChip === "Low-bandwidth") return item.category === "Low-bandwidth material";
    if (activeChip === "Certificate") return item.category === "Certificate guidance";
    if (activeChip === "CPD") return item.category === "CPD guidance";
    
    return true;
  });

  return (
    <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950">
      <LearnerSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-slate-200 px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources, materials, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 pl-11 pr-4 py-2 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full animate-pulse" />
            </button>
            <button 
              onClick={() => navigateTo("/learner/support")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-150" />
            <button 
              onClick={() => navigateTo("/learner/profile")}
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
              
              {/* SECTION 1 — RESOURCES HERO */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-6">
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 rounded-full text-[10px] font-bold border border-emerald-100 mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Learning materials available
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">Resources & Materials Hub</h2>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        Access lesson summaries, transcripts, assessment guides, low-bandwidth materials, certificate guidance, and CPD support resources.
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-4">
                      <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
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
                          <span className="font-semibold text-slate-700">Facilitator:</span>
                          <span>Halima Sani</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-5">
                      <button 
                        onClick={() => navigateTo("/learner/downloads")}
                        className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center border-none"
                      >
                        Open Downloads
                      </button>
                      <button 
                        onClick={() => showToast("Assessment guide opened in this frontend prototype.", "info")}
                        className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center"
                      >
                        View Assessment Guide
                      </button>
                    </div>
                  </div>

                  {/* Deep Green Panel on Right */}
                  <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-sm p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300">
                        Recommended Resource
                      </span>
                      <h3 className="font-bold text-sm text-white mt-1.5 leading-snug">
                        Preparing for Interviews Summary
                      </h3>
                      <p className="text-[11px] text-emerald-100 mt-2 leading-relaxed">
                        Low-bandwidth summary available for immediate download. Ideal for interview revision.
                      </p>
                    </div>

                    <div className="border-t border-emerald-850/80 pt-3 mt-4 flex items-center justify-between text-[11px] text-emerald-200 font-medium">
                      <span>PDF • 680 KB</span>
                      <span className="px-2 py-0.5 bg-emerald-850 text-emerald-100 rounded text-[9px] font-bold">
                        Recommended
                      </span>
                    </div>

                    <button 
                      onClick={() => showToast("Download started in this frontend prototype.", "success")}
                      className="w-full bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs py-2.5 px-4 rounded-xl mt-4 transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer min-h-[44px] border-none"
                    >
                      <Download className="h-4 w-4" />
                      Download Summary
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 2 — RESOURCE SUMMARY CARDS */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Resources</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900">8</span>
                    <span className="text-[10px] text-slate-400">files</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Assigned materials</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recommended</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-emerald-900">3</span>
                    <span className="text-[10px] text-emerald-700">active</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">For current lesson</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Downloaded</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900">2</span>
                    <span className="text-[10px] text-slate-400">offline</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Saved materials</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-28">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Low-Bandwidth</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-black text-slate-900">3</span>
                    <span className="text-[10px] text-slate-400">text</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Text-friendly options</p>
                </div>
              </div>

              {/* SECTION 3 — RESOURCE FILTERS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight">Find Resources</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Filter learning materials by course, type, status, or purpose.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleApplyFilters}
                      className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold px-4 py-2 rounded-xl transition-all min-h-[38px] cursor-pointer border-none"
                    >
                      Apply Filters
                    </button>
                    <button 
                      onClick={handleResetFilters}
                      className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all min-h-[38px] cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {["All", "Recommended", "Lesson materials", "Assessment guides", "Low-bandwidth", "Certificate", "CPD"].map(chip => {
                    const isActive = activeChip === chip;
                    return (
                      <button
                        key={chip}
                        onClick={() => setActiveChip(chip)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all border cursor-pointer ${
                          isActive 
                            ? "bg-emerald-900 text-white border-emerald-900" 
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>

                {/* Sub Search inside Filter Card */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 pl-10 pr-4 py-2 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all"
                  />
                </div>
              </div>

              {/* SECTION 4 — RECOMMENDED MATERIALS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight">Recommended Materials</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Start with the resources linked to your current lesson and assessment.</p>
                  </div>
                  <LearnerContextHint 
                    title="Helpful note" 
                    text="Recommended resources are linked to your current lesson, assessment, or certificate readiness." 
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                  {/* Item 1 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-56 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99]" onClick={() => handleResourceAction(ALL_RESOURCES[0])}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">PDF Summary</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded text-[9px] font-bold">Recommended</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 mt-2.5 line-clamp-2">Preparing for Interviews Summary</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Work Readiness Foundation</p>
                      <p className="text-[10.5px] text-slate-500 mt-1.5 leading-snug">{getResourceDescription("Preparing for Interviews Summary")}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[10px] text-slate-400 font-bold font-mono">680 KB</span>
                      <button 
                        onClick={() => handleResourceAction(ALL_RESOURCES[0])}
                        className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1 border-none"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-56 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99]" onClick={() => handleResourceAction(ALL_RESOURCES[3])}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">PDF Guide</span>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-100 rounded text-[9px] font-bold">Required</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 mt-2.5 line-clamp-2">Work Readiness Assignment Guide</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Work Readiness Foundation</p>
                      <p className="text-[10.5px] text-slate-500 mt-1.5 leading-snug">{getResourceDescription("Work Readiness Assignment Guide")}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[10px] text-slate-400 font-bold font-mono">940 KB</span>
                      <button 
                        onClick={() => handleResourceAction(ALL_RESOURCES[3])}
                        className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1 border-none"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-56 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 ease-out cursor-pointer active:scale-[0.99]" onClick={() => handleResourceAction(ALL_RESOURCES[2])}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Text version</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded text-[9px] font-bold">Recommended</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 mt-2.5 line-clamp-2">Low-Bandwidth Reading Version</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Work Readiness Foundation</p>
                      <p className="text-[10.5px] text-slate-500 mt-1.5 leading-snug">{getResourceDescription("Low-Bandwidth Reading Version")}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[10px] text-slate-400 font-bold font-mono">Lightweight</span>
                      <button 
                        onClick={() => handleResourceAction(ALL_RESOURCES[2])}
                        className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-[10px] px-3.5 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5 text-slate-500" />
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 5 — RESOURCE LIBRARY */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">Resource Library</h3>
                  <p className="text-xs text-slate-400 mt-0.5">All resources available for your assigned pathway ({filteredResources.length} shown).</p>
                </div>

                {filteredResources.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl mt-5">
                    <p className="text-xs text-slate-500 font-medium">No resources match your active search or filters.</p>
                    <button 
                      onClick={handleResetFilters}
                      className="mt-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-[11px] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 mt-5">
                    {filteredResources.map((res) => (
                      <ResourceCardDesktop 
                        key={res.id} 
                        res={res} 
                        onAction={handleResourceAction} 
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 6 — LOW-BANDWIDTH MATERIALS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight">Low-Bandwidth Materials</h3>
                      <LearnerContextHint 
                        title="Why this matters" 
                        text="Low-bandwidth materials help learners access content using lighter text versions, transcripts, or smaller files." 
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Use lightweight content when connection is unstable or limited.</p>
                  </div>
                  <button 
                    onClick={() => navigateTo("/learner/downloads")}
                    className="bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 transition-all min-h-[38px] cursor-pointer"
                  >
                    Open Downloads
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                  <LowBandwidthMaterialCard 
                    title="Interview Preparation Transcript"
                    type="Text transcript"
                    helper="Read the lesson transcript without heavy media."
                    size="Lightweight"
                    action="View"
                    onAction={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                  />
                  <LowBandwidthMaterialCard 
                    title="Low-Bandwidth Reading Version"
                    type="Text reading version"
                    helper="Open the simplified reading version for slower connections."
                    size="Lightweight"
                    action="Open"
                    onAction={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                  />
                  <LowBandwidthMaterialCard 
                    title="Preparing for Interviews Summary"
                    type="PDF summary"
                    helper="Download a concise summary of the current lesson."
                    size="680 KB"
                    action="Download"
                    onAction={() => showToast("Download started in this frontend prototype.", "success")}
                  />
                </div>
              </div>

              {/* SECTION 7 — CERTIFICATE AND CPD GUIDES */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight">Certificate & CPD Guides</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Understand your pathway progression and credential requirements.</p>
                  </div>
                  <button 
                    onClick={() => navigateTo("/learner/certificates")}
                    className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold px-4 py-2 rounded-xl transition-all min-h-[38px] cursor-pointer border-none"
                  >
                    View Certificate Track
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                  <CertificateCPDGuideCard 
                    title="Certificate Readiness Guide"
                    type="Guidance"
                    helper="Understand what is checked before certificate review."
                    related="Work Readiness Certificate"
                    action="View"
                    onAction={() => showToast("Opening certificate readiness guide.", "info")}
                  />
                  <CertificateCPDGuideCard 
                    title="CPD Record Guide"
                    type="CPD Guidance"
                    helper="See how confirmed and pending CPD credits are displayed."
                    related="SUSTAIN CPD Programme"
                    action="View"
                    onAction={() => showToast("Opening CPD record guide.", "info")}
                  />
                  <CertificateCPDGuideCard 
                    title="Work Readiness Certificate Requirements"
                    type="Certificate Guide"
                    helper="Review the course and assessment requirements linked to your certificate."
                    related="Certificate readiness"
                    action="View"
                    onAction={() => showToast("Opening requirements guide.", "info")}
                  />
                </div>
              </div>

            </div>

            {/* Right Column Content */}
            <div className="space-y-6">
              
              {/* RIGHT COLUMN CARD 1 — RESOURCE STATUS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-4">Resource Status</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Available resources</span>
                    <span className="font-black text-slate-900">8</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Recommended now</span>
                    <span className="font-bold text-emerald-900">3</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Downloaded</span>
                    <span className="font-black text-slate-900">2</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Low-bandwidth</span>
                    <span className="font-black text-slate-900">3</span>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Current course</span>
                    <span className="font-bold text-slate-800 mt-1">Work Readiness Foundation</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigateTo("/learner/downloads")}
                  className="w-full mt-4 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer min-h-[44px]"
                >
                  Open Downloads
                </button>
              </div>

              {/* RIGHT COLUMN CARD 2 — CURRENT LEARNING CONTEXT */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-4">Learning Context</h4>
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
                <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => navigateTo("/learner/courses")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[11px] py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center min-h-[44px] border-none"
                  >
                    Continue Lesson
                  </button>
                  <button 
                    onClick={() => navigateTo("/learner/assessments")}
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-[11px] py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center min-h-[44px]"
                  >
                    Open Assessment
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN CARD 3 — SUPPORT CENTER CARD */}
              <LearnerSupportCard />

              {/* RIGHT COLUMN CARD 4 — RECENT RESOURCE ACTIVITY */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-4">Recent Resource Activity</h4>
                <div className="space-y-1">
                  <ActivityRow 
                    title="Opened Preparing for Interviews Summary"
                    context="PDF Summary • Work Readiness Foundation"
                    time="Today"
                  />
                  <ActivityRow 
                    title="Downloaded Work Readiness Assignment Guide"
                    context="PDF Guide • Work Readiness Foundation"
                    time="Today"
                  />
                  <ActivityRow 
                    title="Viewed CPD Record Guide"
                    context="Guide • SUSTAIN CPD Programme"
                    time="Yesterday"
                  />
                  <ActivityRow 
                    title="Opened Low-Bandwidth Reading Version"
                    context="Text reading version • Work Readiness Foundation"
                    time="2 days ago"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN CARD 5 — QUICK ACTIONS */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <h4 className="font-bold text-slate-900 text-xs tracking-wider uppercase mb-3">Quick Actions</h4>
                <div className="space-y-1.5">
                  <QuickActionRow 
                    label="Open Downloads"
                    helper="Access downloadable and low-bandwidth materials."
                    icon={Download}
                    onClick={() => navigateTo("/learner/downloads")}
                  />
                  <QuickActionRow 
                    label="Continue Lesson"
                    helper="Return to Preparing for Interviews."
                    icon={BookOpen}
                    onClick={() => navigateTo("/learner/courses")}
                  />
                  <QuickActionRow 
                    label="Open Assessment"
                    helper="Continue the Work Readiness Assignment."
                    icon={ClipboardList}
                    onClick={() => navigateTo("/learner/assessments")}
                  />
                  <QuickActionRow 
                    label="View Certificate Track"
                    helper="Review certificate and CPD readiness."
                    icon={Award}
                    onClick={() => navigateTo("/learner/certificates")}
                  />
                  <QuickActionRow 
                    label="Ask Facilitator"
                    helper="Simulated facilitator support action."
                    icon={HelpCircle}
                    onClick={() => showToast("Facilitator support action simulated in this frontend prototype.", "info")}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification overlay */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white rounded-xl shadow-xl px-4 py-3.5 border border-slate-800 flex items-center gap-3.5 animate-in fade-in duration-200 max-w-sm">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
          <p className="text-xs font-bold leading-relaxed">{toast.message}</p>
          <button 
            onClick={() => setToast(null)}
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
function TabletLearnerResources() {
  const { navigateTo } = useRoute();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveChip("All");
    showToast("Filters cleared.", "info");
  };

  const handleApplyFilters = () => {
    showToast("Resource filters applied.", "success");
  };

  const handleResourceAction = (res: ResourceItem) => {
    if (res.action === "Download") {
      showToast("Download started in this frontend prototype.", "success");
    } else if (res.action === "View" || res.action === "Open") {
      navigateTo("/learner/resources/low-bandwidth-reading-version");
    }
  };

  const filteredResources = ALL_RESOURCES.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    if (activeChip === "All") return true;
    if (activeChip === "Recommended") return item.status === "Recommended";
    if (activeChip === "Lesson materials") return item.category === "Lesson material" || item.category === "Completed course material";
    if (activeChip === "Assessment guides") return item.category === "Assessment material";
    if (activeChip === "Low-bandwidth") return item.category === "Low-bandwidth material";
    if (activeChip === "Certificate") return item.category === "Certificate guidance";
    if (activeChip === "CPD") return item.category === "CPD guidance";
    
    return true;
  });

  return (
    <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      {/* Tablet Header */}
      <header className="flex items-center justify-between h-16 bg-white border-b border-slate-200 px-5 shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-slate-500" />
          <h1 className="text-lg font-black tracking-tight text-emerald-900">SUSTAIN LMS</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo("/learner/notifications")}
            className="p-1.5 text-slate-400 hover:text-slate-600 relative cursor-pointer"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full animate-pulse" />
          </button>
          <div className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-800 text-white flex items-center justify-center font-black text-xs">
            AM
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        
        {/* RESOURCES HERO */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-900 rounded-full text-[10px] font-bold border border-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Learning materials available
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">Resources & Materials Hub</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Access lesson summaries, transcripts, assessment guides, low-bandwidth materials, certificate guidance, and CPD support resources.
            </p>
          </div>

          <div className="border-t border-b border-slate-100 py-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500 font-medium">
            <span><strong>Course:</strong> Work Readiness Foundation</span>
            <span className="text-slate-300">•</span>
            <span><strong>Lesson:</strong> Preparing for Interviews</span>
            <span className="text-slate-300">•</span>
            <span><strong>Facilitator:</strong> Halima Sani</span>
          </div>

          {/* Featured recommended card stack for tablet */}
          <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-300">Recommended Resource</span>
              <h3 className="font-bold text-sm text-white mt-1 leading-snug">Preparing for Interviews Summary</h3>
              <p className="text-xs text-emerald-100 mt-1.5 leading-relaxed">Low-bandwidth summary available (PDF • 680 KB). Designed specifically for quick mobile and desktop review without data overhead.</p>
            </div>
            <button 
              onClick={() => showToast("Download started in this frontend prototype.", "success")}
              className="mt-4 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs py-2.5 px-4 rounded-xl w-full transition-all text-center min-h-[44px] flex items-center justify-center border-none"
            >
              <Download className="h-4 w-4 mr-1.5 shrink-0" />
              Download PDF Summary
            </button>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => navigateTo("/learner/downloads")}
              className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition-all text-center min-h-[44px] flex items-center justify-center border-none"
            >
              Open Downloads
            </button>
            <button 
              onClick={() => showToast("Assessment guide opened in this frontend prototype.", "info")}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs py-3 rounded-xl transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              View Assessment Guide
            </button>
          </div>
        </div>

        {/* RESOURCE SUMMARY GRID (Tablet: 2-column) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-24 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Available Resources</span>
            <span className="text-xl font-black text-slate-900">8 files</span>
            <p className="text-[11px] text-slate-500 font-medium">Assigned materials</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-24 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Recommended</span>
            <span className="text-xl font-black text-emerald-900">3 active</span>
            <p className="text-[11px] text-slate-500 font-medium">For current lesson</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-24 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Downloaded</span>
            <span className="text-xl font-black text-slate-900">2 files</span>
            <p className="text-[11px] text-slate-500 font-medium">Saved materials</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-24 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Low-Bandwidth</span>
            <span className="text-xl font-black text-slate-900">3 options</span>
            <p className="text-[11px] text-slate-500 font-medium">Text-friendly options</p>
          </div>
        </div>

        {/* RESOURCE FILTERS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Find Resources</h3>
            <p className="text-xs text-slate-400 mt-0.5">Filter learning materials by course, type, status, or purpose.</p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 pl-9 pr-4 py-2 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none"
              />
            </div>
            <button 
              onClick={handleApplyFilters}
              className="bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer min-h-[38px] border-none"
            >
              Apply
            </button>
            <button 
              onClick={handleResetFilters}
              className="bg-white border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer min-h-[38px]"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {["All", "Recommended", "Lesson materials", "Assessment guides", "Low-bandwidth", "Certificate", "CPD"].map(chip => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-full border transition-all cursor-pointer ${
                  activeChip === chip 
                    ? "bg-emerald-900 text-white border-emerald-900" 
                    : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* RECOMMENDED MATERIALS (Polished cards layout) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recommended Materials</h3>
              <p className="text-xs text-slate-400 mt-0.5">Linked to your current lesson and assessment.</p>
            </div>
            <LearnerContextHint 
              title="Helpful note" 
              text="Recommended resources are linked to your current lesson, assessment, or certificate readiness." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {ALL_RESOURCES.filter(r => r.status === "Recommended" || r.status === "Required").map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between h-48 hover:border-emerald-200 transition-all cursor-pointer"
                onClick={() => handleResourceAction(item)}
              >
                <div className="min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-slate-400">{item.type}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${item.status === "Required" ? "bg-amber-50 text-amber-900 border border-amber-100" : "bg-emerald-50 text-emerald-900 border-emerald-100"}`}>{item.status}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2 truncate">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{item.size}</p>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{getResourceDescription(item.title)}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleResourceAction(item); }}
                  className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[10px] px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border-none w-full text-center mt-2 flex items-center justify-center"
                >
                  {item.action === "Download" ? <Download className="h-3.5 w-3.5 mr-1" /> : <Eye className="h-3.5 w-3.5 mr-1" />}
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RESOURCE LIBRARY */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Resource Library</h3>
            <p className="text-xs text-slate-400 mt-0.5">All resources available for your pathway ({filteredResources.length} shown).</p>
          </div>

          <div className="space-y-3">
            {filteredResources.map((res) => (
              <ResourceCardDesktop 
                key={res.id} 
                res={res} 
                onAction={handleResourceAction} 
              />
            ))}
          </div>
        </div>

        {/* LOW-BANDWIDTH MATERIALS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-900 text-sm">Low-Bandwidth Materials</h3>
              <LearnerContextHint 
                title="Why this matters" 
                text="Low-bandwidth materials help learners access content using lighter text versions, transcripts, or smaller files." 
              />
            </div>
            <button 
              onClick={() => navigateTo("/learner/downloads")}
              className="text-[11px] font-bold text-emerald-900 hover:underline cursor-pointer shrink-0 mt-0.5"
            >
              Open Downloads
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <LowBandwidthMaterialCard 
              title="Interview Preparation Transcript"
              type="Text transcript"
              helper="Read the lesson transcript without heavy media."
              size="Lightweight"
              action="View"
              onAction={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
            />
            <LowBandwidthMaterialCard 
              title="Low-Bandwidth Reading Version"
              type="Text reading version"
              helper="Open the simplified reading version for slower connections."
              size="Lightweight"
              action="Open"
              onAction={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
            />
          </div>
        </div>

        {/* CERTIFICATE & CPD GUIDES */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Certificate & CPD Guides</h3>
            <button 
              onClick={() => navigateTo("/learner/certificates")}
              className="text-[11px] font-bold text-emerald-900 hover:underline cursor-pointer"
            >
              View Certificate Track
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CertificateCPDGuideCard 
              title="Certificate Readiness Guide"
              type="Guidance"
              helper="Understand what is checked before certificate review."
              related="Work Readiness Certificate"
              action="View"
              onAction={() => showToast("Opening certificate readiness guide.", "info")}
            />
            <CertificateCPDGuideCard 
              title="CPD Record Guide"
              type="CPD Guidance"
              helper="See how confirmed and pending CPD credits are displayed."
              related="SUSTAIN CPD Programme"
              action="View"
              onAction={() => showToast("Opening CPD record guide.", "info")}
            />
          </div>
        </div>

        {/* RESOURCE STATUS CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Resource Status</h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="border-b border-slate-100 pb-2 flex justify-between">
              <span className="text-slate-500">Available resources</span>
              <span className="font-black text-slate-900">8</span>
            </div>
            <div className="border-b border-slate-100 pb-2 flex justify-between">
              <span className="text-slate-500">Recommended now</span>
              <span className="font-black text-emerald-900">3</span>
            </div>
            <div className="border-b border-slate-100 pb-2 flex justify-between">
              <span className="text-slate-500">Downloaded offline</span>
              <span className="font-black text-slate-900">2</span>
            </div>
            <div className="border-b border-slate-100 pb-2 flex justify-between">
              <span className="text-slate-500">Low-bandwidth</span>
              <span className="font-black text-slate-900">3</span>
            </div>
          </div>
          <button 
            onClick={() => navigateTo("/learner/downloads")}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl mt-4 min-h-[44px]"
          >
            Open Downloads
          </button>
        </div>

        {/* CURRENT LEARNING CONTEXT */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Current Learning Context</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs">
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
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button 
              onClick={() => navigateTo("/learner/courses")}
              className="bg-emerald-900 text-white font-bold text-xs py-2.5 rounded-xl min-h-[44px] border-none"
            >
              Continue Lesson
            </button>
            <button 
              onClick={() => navigateTo("/learner/assessments")}
              className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl min-h-[44px]"
            >
              Open Assessment
            </button>
          </div>
        </div>

        {/* SUPPORT CENTER CARD */}
        <LearnerSupportCard />

        {/* RECENT RESOURCE ACTIVITY */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Recent Resource Activity</h3>
          <div className="space-y-1">
            <ActivityRow 
              title="Opened Preparing for Interviews Summary"
              context="PDF Summary • Work Readiness Foundation"
              time="Today"
            />
            <ActivityRow 
              title="Downloaded Work Readiness Assignment Guide"
              context="PDF Guide • Work Readiness Foundation"
              time="Today"
            />
            <ActivityRow 
              title="Viewed CPD Record Guide"
              context="Guide • SUSTAIN CPD Programme"
              time="Yesterday"
            />
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="space-y-1.5">
            <QuickActionRow 
              label="Open Downloads"
              helper="Access downloadable and low-bandwidth materials."
              icon={Download}
              onClick={() => navigateTo("/learner/downloads")}
            />
            <QuickActionRow 
              label="Continue Lesson"
              helper="Return to Preparing for Interviews."
              icon={BookOpen}
              onClick={() => navigateTo("/learner/courses")}
            />
            <QuickActionRow 
              label="Open Assessment"
              helper="Continue the Work Readiness Assignment."
              icon={ClipboardList}
              onClick={() => navigateTo("/learner/assessments")}
            />
            <QuickActionRow 
              label="View Certificate Track"
              helper="Review certificate and CPD readiness."
              icon={Award}
              onClick={() => navigateTo("/learner/certificates")}
            />
          </div>
        </div>

      </main>

      {/* Fixed Bottom Navigation */}
      <LearnerMobileNav />

      {/* Toast Notification overlay */}
      {toast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-slate-950 text-white rounded-xl shadow-xl px-4 py-3 border border-slate-800 flex items-center gap-3 animate-in fade-in duration-200">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <p className="text-xs font-bold leading-relaxed">{toast.message}</p>
          <button onClick={() => setToast(null)} className="ml-auto text-slate-400 hover:text-white">
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
function MobileLearnerResources() {
  const { navigateTo } = useRoute();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveChip("All");
    showToast("Filters cleared.", "info");
  };

  const handleApplyFilters = () => {
    showToast("Filters applied.", "success");
  };

  const handleResourceAction = (res: ResourceItem) => {
    if (res.action === "Download") {
      showToast("Download started in this frontend prototype.", "success");
    } else if (res.action === "View" || res.action === "Open") {
      navigateTo("/learner/resources/low-bandwidth-reading-version");
    }
  };

  const filteredResources = ALL_RESOURCES.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    
    if (activeChip === "All") return true;
    if (activeChip === "Recommended") return item.status === "Recommended";
    if (activeChip === "Lesson materials") return item.category === "Lesson material" || item.category === "Completed course material";
    if (activeChip === "Assessment guides") return item.category === "Assessment material";
    if (activeChip === "Low-bandwidth") return item.category === "Low-bandwidth material";
    if (activeChip === "Certificate") return item.category === "Certificate guidance";
    if (activeChip === "CPD") return item.category === "CPD guidance";
    
    return true;
  });

  return (
    <div className="block md:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      {/* Mobile Header */}
      <header className="flex items-center justify-between h-14 bg-white border-b border-slate-200 px-4 shrink-0 sticky top-0 z-40">
        <h1 className="text-base font-black tracking-tight text-emerald-900">SUSTAIN LMS</h1>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateTo("/learner/notifications")}
            className="p-1 relative cursor-pointer text-slate-400"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
          </button>
          <div className="h-7 w-7 rounded-full bg-emerald-900 text-white flex items-center justify-center font-black text-[11px]">
            AM
          </div>
        </div>
      </header>

      {/* Content Main */}
      <main className="px-4 py-4 space-y-5">
        
        {/* HERO */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4 text-left">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-full text-[9px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Resources available
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">Resources Hub</h2>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Access lightweight summaries, transcripts, and guides.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-3 text-[10px] text-slate-500 space-y-1">
            <p><strong>Course:</strong> Work Readiness Foundation</p>
            <p><strong>Lesson:</strong> Preparing for Interviews</p>
          </div>

          <button 
            onClick={() => navigateTo("/learner/downloads")}
            className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px] flex items-center justify-center border-none"
          >
            Open Downloads
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Find Resources</h3>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 pl-9 pr-4 py-2 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {["All", "Recommended", "Low-bandwidth", "Certificate"].map(chip => (
              <button
                key={chip}
                onClick={() => {
                  setActiveChip(chip);
                  showToast(`Filtered by ${chip}`, "info");
                }}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full border transition-all ${
                  activeChip === chip 
                    ? "bg-emerald-900 text-white border-emerald-900" 
                    : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* RECOMMENDED */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Recommended</h3>
          <div className="space-y-3">
            {ALL_RESOURCES.filter(r => r.status === "Recommended" || r.status === "Required").map((item) => (
              <ResourceCardMobile 
                key={item.id}
                res={item}
                onAction={handleResourceAction}
              />
            ))}
          </div>
        </div>

        {/* RESOURCE LIBRARY */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Resource Library</h3>
          {filteredResources.length === 0 ? (
            <p className="text-[11px] text-slate-500 py-4 text-center">No matching resources found.</p>
          ) : (
            <div className="space-y-3">
              {filteredResources.map((res) => (
                <ResourceCardMobile 
                  key={res.id} 
                  res={res} 
                  onAction={handleResourceAction} 
                />
              ))}
            </div>
          )}
        </div>

        {/* LOW-BANDWIDTH MATERIALS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Low-Bandwidth</h3>
            <button 
              onClick={() => navigateTo("/learner/downloads")}
              className="text-[10px] font-bold text-emerald-900 cursor-pointer"
            >
              Downloads
            </button>
          </div>
          <div className="space-y-3">
            <LowBandwidthMaterialCard 
              title="Interview Preparation Transcript"
              type="Text transcript"
              helper="Read the lesson transcript without heavy media."
              size="Lightweight"
              action="View"
              onAction={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
            />
            <LowBandwidthMaterialCard 
              title="Low-Bandwidth Reading Version"
              type="Text reading version"
              helper="Open the simplified reading version for slower connections."
              size="Lightweight"
              action="Open"
              onAction={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
            />
          </div>
        </div>

        {/* CERTIFICATE & CPD GUIDES */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Guides</h3>
            <button 
              onClick={() => navigateTo("/learner/certificates")}
              className="text-[10px] font-bold text-emerald-900 cursor-pointer"
            >
              Certificates
            </button>
          </div>
          <div className="space-y-3">
            <CertificateCPDGuideCard 
              title="Certificate Readiness Guide"
              type="Guidance"
              helper="Understand what is checked before certificate review."
              related="Work Readiness Certificate"
              action="View"
              onAction={() => showToast("Opening certificate readiness guide.", "info")}
            />
            <CertificateCPDGuideCard 
              title="CPD Record Guide"
              type="CPD Guidance"
              helper="See how confirmed and pending CPD credits are displayed."
              related="SUSTAIN CPD Programme"
              action="View"
              onAction={() => showToast("Opening CPD record guide.", "info")}
            />
          </div>
        </div>

        {/* STATUS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Status Overview</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-50 pb-1.5">
              <span className="text-slate-500">Available</span>
              <span className="font-black text-slate-900">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Recommended</span>
              <span className="font-black text-emerald-900">3</span>
            </div>
          </div>
          <button 
            onClick={() => navigateTo("/learner/downloads")}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg cursor-pointer min-h-[44px]"
          >
            Open Downloads
          </button>
        </div>

        {/* CONTEXT */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 text-left">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Learning Context</h3>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase">Course</span>
              <p className="font-bold text-slate-800 leading-tight">Work Readiness Foundation</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase">Lesson</span>
              <p className="font-bold text-slate-800 leading-tight">Preparing for Interviews</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={() => navigateTo("/learner/courses")}
              className="bg-emerald-900 text-white font-bold text-xs py-2 rounded-lg cursor-pointer min-h-[44px] border-none"
            >
              Continue
            </button>
            <button 
              onClick={() => navigateTo("/learner/assessments")}
              className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2 rounded-lg cursor-pointer min-h-[44px]"
            >
              Assessments
            </button>
          </div>
        </div>

        {/* SUPPORT */}
        <LearnerSupportCard />

        {/* ACTIVITY */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-left">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Recent Activity</h3>
          <div className="space-y-1.5">
            <ActivityRow 
              title="Opened Preparing for Interviews Summary"
              context="PDF Summary • Work Readiness"
              time="Today"
            />
            <ActivityRow 
              title="Downloaded Work Readiness Guide"
              context="PDF Guide • Work Readiness"
              time="Today"
            />
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-left">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Quick Actions</h3>
          <div className="space-y-1">
            <QuickActionRow 
              label="Open Downloads"
              helper="Access downloadable materials."
              icon={Download}
              onClick={() => navigateTo("/learner/downloads")}
            />
            <QuickActionRow 
              label="Continue Lesson"
              helper="Return to Preparing for Interviews."
              icon={BookOpen}
              onClick={() => navigateTo("/learner/courses")}
            />
            <QuickActionRow 
              label="Open Assessment"
              helper="Continue the Work Readiness Assignment."
              icon={ClipboardList}
              onClick={() => navigateTo("/learner/assessments")}
            />
            <QuickActionRow 
              label="Ask Facilitator"
              helper="Simulated facilitator support action."
              icon={HelpCircle}
              onClick={() => showToast("Facilitator support action simulated.", "info")}
            />
          </div>
        </div>

      </main>

      {/* Fixed Bottom Navigation */}
      <LearnerMobileNav />

      {/* Toast Notification overlay */}
      {toast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 bg-slate-950 text-white rounded-xl shadow-xl px-4 py-3 border border-slate-800 flex items-center gap-2 animate-in fade-in duration-200">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
          <p className="text-[11px] font-bold leading-relaxed">{toast.message}</p>
          <button onClick={() => setToast(null)} className="ml-auto text-slate-400 hover:text-white">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
