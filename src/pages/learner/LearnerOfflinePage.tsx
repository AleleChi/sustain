import { useState, useEffect } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { 
  Wifi, 
  WifiOff, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Database, 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  Clock, 
  ChevronRight, 
  Info, 
  Lock, 
  Unlock, 
  Settings, 
  RefreshCw, 
  Play, 
  CheckCircle2, 
  Trash2, 
  Download, 
  CloudLightning, 
  Shield, 
  FileText, 
  Volume2, 
  Zap, 
  ChevronDown, 
  Sliders, 
  MoreVertical, 
  ListTodo, 
  History,
  X,
  FileCheck
} from "lucide-react";

// Types for downloadable learning packs
interface LearningPack {
  id: string;
  title: string;
  status: "Downloaded" | "Available";
  size: number; // in MB
  category: string;
  description: string;
}

// Types for pending sync queue
interface SyncItem {
  id: string;
  title: string;
  context: string;
  status: "Pending sync" | "Saved locally" | "Ready to send" | "Synced";
  type: "checkpoint" | "assessment" | "message";
}

export default function LearnerOfflinePage() {
  const { navigateTo, currentPath } = useRoute();

  // ----------------------------------------------------
  // SIMULATED INTERACTIVE WORKSPACE STATE
  // ----------------------------------------------------
  const [downloadedCount, setDownloadedCount] = useState(5);
  const [offlineCount, setOfflineCount] = useState(9);
  const [pendingSyncCount, setPendingSyncCount] = useState(2);
  const [assessmentDraftsCount, setAssessmentDraftsCount] = useState(1);
  const [storageUsedMB, setStorageUsedMB] = useState(248);
  const [lastSyncTime, setLastSyncTime] = useState("10:42 AM");
  const [isOnline, setIsOnline] = useState(true);
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false);

  // Downloadable packs state
  const [packs, setPacks] = useState<LearningPack[]>([
    {
      id: "pack-1",
      title: "Preparing for Interviews",
      status: "Downloaded",
      size: 42,
      category: "Module 2: Interview Prep",
      description: "Text-first lesson notes, STAR response guide, and offline interview practice resources."
    },
    {
      id: "pack-2",
      title: "Low-Bandwidth Interview Prep",
      status: "Available",
      size: 18,
      category: "Module 2 Supplement",
      description: "Text-only optimized framework with minimal data requirements."
    },
    {
      id: "pack-3",
      title: "Work Readiness Fundamentals",
      status: "Available",
      size: 124,
      category: "Full Pathway Core",
      description: "Comprehensive foundational toolkit for career onboarding and professional workplace communication."
    }
  ]);

  // Sync queue state
  const [syncQueue, setSyncQueue] = useState<SyncItem[]>([
    {
      id: "sync-1",
      title: "Checkpoint answers",
      context: "Module 2: Interview Preparation",
      status: "Pending sync",
      type: "checkpoint"
    },
    {
      id: "sync-2",
      title: "Assessment draft",
      context: "Work Readiness Assessment",
      status: "Saved locally",
      type: "assessment"
    },
    {
      id: "sync-3",
      title: "Support message draft",
      context: "To: Halima Sani",
      status: "Ready to send",
      type: "message"
    }
  ]);

  // Filter selection state
  const [activeFilterTab, setActiveFilterTab] = useState<"All" | "Downloaded" | "Available">("All");

  // Modern UI Modals/Toast state
  const [activeModal, setActiveModal] = useState<"none" | "sync" | "download" | "clear" | "bandwidth" | "storage" | "download-pack-2" | "download-pack-3">("none");
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper trigger to show beautiful temporary feedback toast
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => prev === message ? null : prev);
    }, 4500);
  };

  // Simulated live clock sync triggers
  const executeLocalSync = () => {
    setActiveModal("sync");
    setSimulatedProgress(0);
  };

  const handleDownloadPack = (packId: string) => {
    if (packId === "pack-2") {
      setActiveModal("download-pack-2");
    } else {
      setActiveModal("download-pack-3");
    }
    setSimulatedProgress(0);
  };

  // Progress Bar simulation effects for sync & downloads
  useEffect(() => {
    let interval: any;
    if (activeModal === "sync" || activeModal === "download" || activeModal === "download-pack-2" || activeModal === "download-pack-3") {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Finalizing sync
              if (activeModal === "sync") {
                setPendingSyncCount(0);
                setSyncQueue(prevQueue => prevQueue.map(item => ({ ...item, status: "Synced" })));
                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes().toString().padStart(2, "0");
                const ampm = hours >= 12 ? "PM" : "AM";
                const displayHours = hours % 12 || 12;
                setLastSyncTime(`${displayHours}:${minutes} ${ampm}`);
                triggerToast("Sync complete! Saved work synced locally in this frontend prototype.");
              }
              // Finalizing pack downloads
              else if (activeModal === "download-pack-2") {
                setPacks(prev => prev.map(p => p.id === "pack-2" ? { ...p, status: "Downloaded" } : p));
                setDownloadedCount(prev => prev + 1);
                setStorageUsedMB(prev => prev + 18);
                setOfflineCount(prev => prev + 1);
                triggerToast("Learning pack saved for offline use on this device.");
              }
              else if (activeModal === "download-pack-3") {
                setPacks(prev => prev.map(p => p.id === "pack-3" ? { ...p, status: "Downloaded" } : p));
                setDownloadedCount(prev => prev + 1);
                setStorageUsedMB(prev => prev + 124);
                setOfflineCount(prev => prev + 1);
                triggerToast("Learning pack saved for offline use on this device.");
              }
              setActiveModal("none");
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [activeModal]);

  // Remove Pack handler
  const handleRemovePack = (packId: string, size: number) => {
    setPacks(prev => prev.map(p => p.id === packId ? { ...p, status: "Available" } : p));
    setDownloadedCount(prev => Math.max(0, prev - 1));
    setStorageUsedMB(prev => Math.max(0, prev - size));
    setOfflineCount(prev => Math.max(0, prev - 1));
    triggerToast("Learning pack removed from this device.");
  };

  // Clear all cached data handler
  const handleConfirmClearData = () => {
    setPacks(prev => prev.map(p => ({ ...p, status: "Available" })));
    setDownloadedCount(0);
    setStorageUsedMB(0);
    setOfflineCount(4); // default base elements only
    setAssessmentDraftsCount(0);
    triggerToast("This removes downloaded content from this device. Sync pending work before clearing data.");
    setActiveModal("none");
  };

  // Toggle bandwidth state
  const handleToggleBandwidth = () => {
    setLowBandwidthMode(prev => !prev);
    triggerToast(lowBandwidthMode ? "Standard bandwidth mode enabled." : "Low-Bandwidth Mode enabled: reducing asset sizes.");
  };

  // Filter packs based on selection
  const filteredPacks = packs.filter(p => {
    if (activeFilterTab === "All") return true;
    if (activeFilterTab === "Downloaded") return p.status === "Downloaded";
    if (activeFilterTab === "Available") return p.status === "Available";
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 lg:pb-0">
      
      {/* ----------------------------------------------------
          INTERACTIVE NOTIFICATION TOAST
          ---------------------------------------------------- */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] max-w-sm bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 p-4 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex gap-3 items-start">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-semibold leading-normal">{toastMessage}</p>
              <p className="text-[10px] text-slate-400 font-medium">Prototype Simulation Context</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer ml-auto">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MOCK LOADER / SYNC AND DOWNLOAD SIMULATOR MODALS
          ---------------------------------------------------- */}
      {activeModal === "sync" && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-4 border border-slate-100">
            <div className="w-12 h-12 bg-sustain-50 text-sustain-900 rounded-full flex items-center justify-center mx-auto animate-spin">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Syncing Local Workspace</h3>
              <p className="text-xs text-slate-500 font-medium">Uploading 2 pending drafts to SUSTAIN LMS cloud portal...</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-sustain-900 h-full transition-all duration-150 rounded-full"
                style={{ width: `${simulatedProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold font-mono">{simulatedProgress}% Transmitted</p>
          </div>
        </div>
      )}

      {(activeModal === "download-pack-2" || activeModal === "download-pack-3") && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-4 border border-slate-100">
            <div className="w-12 h-12 bg-sustain-50 text-sustain-900 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Download className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Downloading Learning Material</h3>
              <p className="text-xs text-slate-500 font-medium">Caching offline package nodes onto this local workspace browser engine...</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-sustain-900 h-full transition-all duration-150 rounded-full"
                style={{ width: `${simulatedProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold font-mono">{simulatedProgress}% Cached</p>
          </div>
        </div>
      )}

      {activeModal === "clear" && (
        <div className="fixed inset-0 z-[110] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-100 text-left">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-650 flex items-center justify-center shrink-0">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900">Clear Offline Content?</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  This removes downloaded content from this device. Any unsynced pending drafts should be synced to your portal profile first.
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setActiveModal("none")}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmClearData}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer shadow-3xs"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "bandwidth" && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-100 text-left">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-sustain-50 text-sustain-900 flex items-center justify-center shrink-0">
                <Sliders className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900">Bandwidth Settings</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Configure asset quality behavior for unstable mobile networking.
                </p>
              </div>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Low-Bandwidth Mode</p>
                  <p className="text-[10px] text-slate-400 font-medium">Serve compact reading packs first</p>
                </div>
                <button 
                  onClick={handleToggleBandwidth}
                  className={`w-10 h-6 rounded-full transition-all duration-150 p-0.5 ${lowBandwidthMode ? "bg-sustain-900" : "bg-slate-300"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-all ${lowBandwidthMode ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Video Auto-Pause</p>
                  <p className="text-[10px] text-slate-400 font-medium">Pause large video files when offline</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-sustain-900 p-0.5">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-4" />
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setActiveModal("none")}
                className="bg-sustain-900 text-white hover:bg-sustain-800 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "storage" && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-100 text-left">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-sustain-50 text-sustain-900 flex items-center justify-center shrink-0">
                <Database className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900">Storage Audit</h3>
                <p className="text-xs text-slate-500 font-medium">Detailed allocation of offline filesystem cache.</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex justify-between border-b border-slate-50 pb-1.5 font-medium">
                <span className="text-slate-500">Learning Packs (Downloaded)</span>
                <span className="font-bold text-slate-800">{storageUsedMB} MB</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5 font-medium">
                <span className="text-slate-500">App Framework Shell & Icons</span>
                <span className="font-bold text-slate-800">42 MB</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5 font-medium">
                <span className="text-slate-500">Form Draft Assets</span>
                <span className="font-bold text-slate-800">12 MB</span>
              </div>
              <div className="flex justify-between font-bold pt-1">
                <span className="text-slate-700">Total Browser Allocation</span>
                <span className="text-sustain-900">{storageUsedMB + 54} MB</span>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2 border-t border-slate-100">
              <button 
                onClick={() => setActiveModal("none")}
                className="bg-sustain-900 text-white hover:bg-sustain-800 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ----------------------------------------------------
          DESKTOP VIEWPORT LAYOUT (hidden lg:flex)
          ---------------------------------------------------- */}
      <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-800 w-full font-sans">
        
        {/* Left Navigation Sidebar */}
        <LearnerSidebar />

        {/* Main Center Content and Header */}
        <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
          
          {/* Topbar Header */}
          <header className="h-16 bg-white border-b border-slate-250/60 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources or help..."
                className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-750 focus:outline-hidden focus:ring-1 focus:ring-sustain-900 focus:border-sustain-900 transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateTo("/learner/notifications")}
                className="p-1.5 text-slate-500 hover:text-slate-900 relative rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-sustain-900" />
              </button>
              <button 
                onClick={() => navigateTo("/learner/support")}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-slate-200" />
              
              <button 
                onClick={() => navigateTo("/learner/profile")}
                className="flex items-center gap-2 px-1.5 py-1 rounded-lg hover:bg-slate-50 transition-all text-left cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-sustain-900 text-white flex items-center justify-center font-bold text-xs shadow-3xs">
                  AM
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Aisha Mohammed</p>
                  <p className="text-[9px] text-slate-450 font-semibold tracking-wider">SUST-LRN-0442</p>
                </div>
              </button>
            </div>
          </header>

          {/* Desktop Content Grid (Main column & Right column) */}
          <div className="p-8 grid grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
            
            {/* Center Main Column */}
            <div className="space-y-6">
              
              {/* Breadcrumb & Top Section */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                  <span onClick={() => navigateTo("/learner")} className="hover:text-slate-900 cursor-pointer transition-colors">Learner Workspace</span>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-slate-950 font-bold">Offline Centre</span>
                </div>
              </div>

              {/* Desktop Hero Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-5 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sustain-50/20 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-50 text-sustain-900 text-[10px] font-extrabold px-3 py-0.5 rounded-full border border-sustain-100 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sustain-900 animate-pulse" />
                    Online now
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-extrabold px-3 py-0.5 rounded-full border border-slate-200">
                    Offline-ready content
                  </span>
                  <span className="bg-amber-50 text-amber-800 text-[10px] font-extrabold px-3 py-0.5 rounded-full border border-amber-200">
                    Pending sync: {pendingSyncCount}
                  </span>
                </div>

                <div className="space-y-2 max-w-2xl">
                  <h1 className="text-2xl font-semibold text-slate-900 tracking-tight leading-none pt-1">
                    Offline Downloads & Sync Centre
                  </h1>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Download learning packs, continue studying without internet, and sync your saved work when you reconnect.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button 
                    onClick={executeLocalSync}
                    className="bg-sustain-900 text-white hover:bg-sustain-800 text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Sync Now
                  </button>
                  <button 
                    onClick={() => handleDownloadPack("pack-2")}
                    className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-3xs"
                  >
                    Download Current Module
                  </button>
                </div>
              </div>

              {/* Six KPI Cards Grid */}
              <div className="grid grid-cols-6 gap-3.5">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-4 text-left flex flex-col justify-between min-h-[96px]">
                  <span className="text-xs font-medium text-slate-500 block">Downloaded Packs</span>
                  <span className="text-2xl font-medium text-slate-800 mt-2 block">{downloadedCount}</span>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-4 text-left flex flex-col justify-between min-h-[96px]">
                  <span className="text-xs font-medium text-slate-500 block">Available Offline</span>
                  <span className="text-2xl font-medium text-slate-800 mt-2 block">{offlineCount} items</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-4 text-left flex flex-col justify-between min-h-[96px]">
                  <span className="text-xs font-medium text-slate-500 block">Pending Sync</span>
                  <span className="text-2xl font-medium text-amber-700 mt-2 block">{pendingSyncCount}</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-4 text-left flex flex-col justify-between min-h-[96px]">
                  <span className="text-xs font-medium text-slate-500 block">Assessment Drafts</span>
                  <span className="text-2xl font-medium text-slate-800 mt-2 block">{assessmentDraftsCount}</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-4 text-left flex flex-col justify-between min-h-[96px]">
                  <span className="text-xs font-medium text-slate-500 block">Storage Used</span>
                  <span className="text-2xl font-medium text-slate-800 mt-2 block">{storageUsedMB} MB</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-4 text-left flex flex-col justify-between min-h-[96px]">
                  <span className="text-xs font-medium text-slate-500 block">Last Sync</span>
                  <span className="text-lg font-medium text-emerald-800 mt-2 block tracking-tight">{lastSyncTime}</span>
                </div>
              </div>

              {/* Offline Readiness Checklist */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Offline Readiness Checklist</h2>
                  <p className="text-[11px] text-slate-500 font-medium">Verify your browser workspace configurations for absolute offline study.</p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs text-slate-700 font-medium flex items-center gap-2">
                      <span className="h-5 w-5 bg-emerald-50 text-sustain-900 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      App shell saved
                    </span>
                    <span className="text-[10px] text-sustain-900 font-extrabold bg-sustain-50/50 px-2 py-0.5 rounded">Ready</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs text-slate-700 font-medium flex items-center gap-2">
                      <span className="h-5 w-5 bg-emerald-50 text-sustain-900 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      Current module downloaded
                    </span>
                    <span className="text-[10px] text-sustain-900 font-extrabold bg-sustain-50/50 px-2 py-0.5 rounded">Ready</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs text-slate-700 font-medium flex items-center gap-2">
                      <span className="h-5 w-5 bg-emerald-50 text-sustain-900 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      Lesson reading pack downloaded
                    </span>
                    <span className="text-[10px] text-sustain-900 font-extrabold bg-sustain-50/50 px-2 py-0.5 rounded">Ready</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs text-slate-700 font-medium flex items-center gap-2">
                      <span className="h-5 w-5 bg-emerald-50 text-sustain-900 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      Checkpoint draft enabled
                    </span>
                    <span className="text-[10px] text-sustain-900 font-extrabold bg-sustain-50/50 px-2 py-0.5 rounded">Active</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs text-slate-700 font-medium flex items-center gap-2">
                      <span className="h-5 w-5 bg-emerald-50 text-sustain-900 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      Assessment draft enabled
                    </span>
                    <span className="text-[10px] text-sustain-900 font-extrabold bg-sustain-50/50 px-2 py-0.5 rounded">Active</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs text-slate-700 font-medium flex items-center gap-2">
                      <span className="h-5 w-5 bg-emerald-50 text-sustain-900 rounded-full flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      Sync available
                    </span>
                    <span className="text-[10px] text-amber-700 font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Pending</span>
                  </div>
                </div>
              </div>

              {/* Downloadable Learning Packs */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 flex-wrap gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Downloadable Learning Packs</h2>
                    <p className="text-[11px] text-slate-500 font-medium">Toggle, cache, and prune core module payloads locally.</p>
                  </div>
                  
                  {/* Filter tabs */}
                  <div className="flex items-center gap-1.5 bg-slate-150 p-0.5 rounded-lg border border-slate-200 shrink-0">
                    {(["All", "Downloaded", "Available"] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveFilterTab(tab)}
                        className={`text-[10px] font-bold px-3 py-1 rounded-md transition-all cursor-pointer ${
                          activeFilterTab === tab 
                            ? "bg-white text-slate-900 shadow-3xs" 
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3.5">
                  {filteredPacks.map(pack => (
                    <div 
                      key={pack.id} 
                      className="flex items-center justify-between p-4 bg-slate-50/60 rounded-xl border border-slate-250/70 hover:border-sustain-200 transition-all gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="p-3 bg-white border border-slate-200/60 rounded-xl text-sustain-900 flex items-center justify-center shrink-0 shadow-3xs">
                          <FileText className="h-4.5 w-4.5" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-semibold text-slate-900">{pack.title}</h4>
                          <p className="text-[10px] text-slate-550 font-semibold">
                            {pack.category} • <span className="font-medium text-slate-400">{pack.size}MB</span>
                          </p>
                          <p className="text-[11px] text-slate-600 font-medium leading-relaxed max-w-lg mt-1">
                            {pack.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {pack.status === "Downloaded" ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-sustain-900 bg-sustain-50 border border-sustain-100 px-2 py-1 rounded-lg">
                              Downloaded
                            </span>
                            <button
                              onClick={() => handleRemovePack(pack.id, pack.size)}
                              className="text-[11px] text-red-650 hover:text-red-800 font-bold px-3 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleDownloadPack(pack.id)}
                            className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold px-4 py-1.5 rounded-lg transition-all shadow-3xs cursor-pointer flex items-center gap-1"
                          >
                            <Download className="h-3 w-3 text-slate-500" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Sync Queue */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Pending Sync Queue</h2>
                  <p className="text-[11px] text-slate-500 font-medium">Your offline actions saved locally. These will publish on reconnect.</p>
                </div>

                <div className="space-y-2.5 divide-y divide-slate-100/60">
                  {syncQueue.map((item, index) => (
                    <div key={item.id} className={`flex items-center justify-between py-3 ${index === 0 ? "pt-0" : ""}`}>
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
                          {item.type === "checkpoint" ? (
                            <ListTodo className="h-4 w-4 text-amber-650" />
                          ) : item.type === "assessment" ? (
                            <FileCheck className="h-4 w-4 text-blue-600" />
                          ) : (
                            <FileText className="h-4 w-4 text-sustain-900" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-950">{item.title}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{item.context}</p>
                        </div>
                      </div>

                      <div>
                        {item.status === "Synced" ? (
                          <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Check className="h-3 w-3" /> Synced
                          </span>
                        ) : item.status === "Pending sync" ? (
                          <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            Pending sync
                          </span>
                        ) : item.status === "Saved locally" ? (
                          <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            Saved locally
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[10px] font-bold px-2.5 py-1 rounded-full">
                            Ready to send
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storage Management */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Storage Management</h2>
                  <span className="text-xs font-semibold text-slate-500">{storageUsedMB} MB / 500 MB used</span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-sustain-900 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(storageUsedMB / 500) * 100}%` }}
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button 
                    onClick={() => setActiveModal("clear")}
                    className="bg-white border border-red-200 text-red-650 hover:bg-red-50 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-3xs cursor-pointer"
                  >
                    Clear Local Cache & Data
                  </button>
                </div>
              </div>

              {/* Low-Bandwidth / Offline Comparison (Two Side by Side Cards) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-100/60 p-5 rounded-2xl border border-slate-200/40 text-left flex flex-col justify-between h-44">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Sliders className="h-4 w-4 text-slate-700" />
                      <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Low-Bandwidth Mode</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                      Automatically reduces video quality and pauses large downloads to save data when connection is unstable.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveModal("bandwidth")}
                    className="text-xs font-bold text-sustain-900 hover:text-sustain-700 flex items-center gap-1 cursor-pointer"
                  >
                    Toggle Settings <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="bg-sustain-50/40 p-5 rounded-2xl border border-sustain-100 text-left flex flex-col justify-between h-44">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <WifiOff className="h-4 w-4 text-sustain-900" />
                      <h4 className="text-xs font-semibold text-sustain-900 uppercase tracking-wider">Offline Mode</h4>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                      Access downloaded content without any internet connection. Work is saved locally and synced later.
                    </p>
                  </div>
                  <button 
                    onClick={() => triggerToast("Offline handbook guide prepared.")}
                    className="text-xs font-bold text-sustain-900 hover:text-sustain-700 flex items-center gap-1 cursor-pointer"
                  >
                    Learn More <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* What Works Offline Comparison Grid */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 text-left">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">What Works Offline</h2>
                  <p className="text-[11px] text-slate-500 font-medium">Verify workspace capabilities prior to field deployment.</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features Available</h5>
                    <ul className="space-y-2 text-xs font-medium text-slate-700">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-sustain-900 shrink-0" />
                        Reading course materials & slides
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-sustain-900 shrink-0" />
                        Drafting assessment answers
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-sustain-900 shrink-0" />
                        Viewing downloaded PDFs & guides
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-sustain-900 shrink-0" />
                        Offline checkpoints auto-save
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Requires Internet</h5>
                    <ul className="space-y-2 text-xs font-medium text-slate-500">
                      <li className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono text-sm">✕</span>
                        Live streaming sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono text-sm">✕</span>
                        Submitting final assessments
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono text-sm">✕</span>
                        Community forum discussions
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono text-sm">✕</span>
                        Downloading new learning packs
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h2 className="text-sm font-semibold text-slate-900 tracking-tight">Recent Activity</h2>
                  <button 
                    onClick={() => triggerToast("History tracker loaded locally.")}
                    className="text-xs font-bold text-sustain-900 hover:underline cursor-pointer"
                  >
                    View History
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-xs">
                    <div className="h-2 w-2 rounded-full bg-sustain-900 mt-1.5 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">Success: Synced 4 checkpoints</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{lastSyncTime === "10:42 AM" ? "10:42 AM • Today" : `${lastSyncTime} • Today`}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <div className="h-2 w-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">Download completed: Interview Prep Pack</p>
                      <p className="text-[10px] text-slate-400 font-semibold">09:15 AM • Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs">
                    <div className="h-2 w-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">Switched to Offline Mode</p>
                      <p className="text-[10px] text-slate-400 font-semibold">05:30 PM • Oct 12</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Status / Action Column */}
            <div className="space-y-6">
              
              {/* Card 1: Sync Status */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 text-left space-y-3.5">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-sustain-50 text-sustain-900 rounded-lg">
                    <RefreshCw className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-450 uppercase tracking-wider">Sync Status</h3>
                    <p className="text-sm font-semibold text-slate-900">
                      {pendingSyncCount > 0 ? "Changes Pending" : "Fully Backed Up"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 font-semibold pt-1 border-t border-slate-50">
                  <p className="flex justify-between">
                    <span className="text-slate-400">Last manual sync:</span>
                    <span>23m ago</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Auto-sync:</span>
                    <span className="text-sustain-900 font-bold">Enabled</span>
                  </p>
                </div>

                <button 
                  onClick={executeLocalSync}
                  className="w-full bg-sustain-900 hover:bg-sustain-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all text-center cursor-pointer shadow-3xs"
                >
                  Sync Now
                </button>
              </div>

              {/* Card 2: Current Module */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 text-left space-y-3">
                <h3 className="text-xs font-semibold text-slate-450 uppercase tracking-wider block">Current Module</h3>
                
                <div className="flex gap-3 items-center">
                  <div className="p-2.5 bg-sustain-50 text-sustain-900 rounded-xl">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Preparing for Interviews</p>
                    <p className="text-[10px] text-slate-400 font-semibold">80% Downloaded</p>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sustain-900 h-full w-[80%] rounded-full" />
                </div>

                <button 
                  onClick={() => triggerToast("Checking for module content updates...")}
                  className="w-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-bold py-2.5 rounded-xl transition-all text-center cursor-pointer shadow-3xs"
                >
                  Update Content
                </button>
              </div>

              {/* Card 3: Privacy Reminder */}
              <div className="bg-white rounded-2xl border border-amber-200/70 shadow-xs p-5 text-left space-y-3 bg-amber-50/10">
                <div className="flex gap-2 items-center">
                  <Shield className="h-4.5 w-4.5 text-amber-700 shrink-0" />
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Privacy Reminder</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed font-semibold">
                  Offline content is stored on this device. Remember to clear your data if using a public computer.
                </p>
                <button 
                  onClick={() => setActiveModal("clear")}
                  className="w-full bg-white border border-amber-250 text-amber-800 hover:bg-amber-50 text-xs font-bold py-2 rounded-xl transition-all text-center cursor-pointer shadow-3xs"
                >
                  Clear Offline Data
                </button>
              </div>

              {/* Card 4: Quick Actions */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 text-left">
                <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 pb-2 block border-b border-slate-50">Quick Actions</h3>
                <div className="divide-y divide-slate-50">
                  <button 
                    onClick={() => setActiveModal("bandwidth")}
                    className="w-full flex items-center justify-between py-3 px-2 text-xs font-bold text-slate-700 hover:text-sustain-900 hover:bg-slate-50/50 rounded-lg transition-all cursor-pointer text-left"
                  >
                    <span>Bandwidth Settings</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button 
                    onClick={() => triggerToast("Local drafts exported as SUSTAIN-Draft-Package.json")}
                    className="w-full flex items-center justify-between py-3 px-2 text-xs font-bold text-slate-700 hover:text-sustain-900 hover:bg-slate-50/50 rounded-lg transition-all cursor-pointer text-left"
                  >
                    <span>Export Local Drafts</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>

                  <button 
                    onClick={() => setActiveModal("storage")}
                    className="w-full flex items-center justify-between py-3 px-2 text-xs font-bold text-slate-700 hover:text-sustain-900 hover:bg-slate-50/50 rounded-lg transition-all cursor-pointer text-left"
                  >
                    <span>Storage Audit</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Card 5: Need Help? */}
              <div className="bg-sustain-900 text-white rounded-2xl border border-sustain-900 shadow-xs p-5 text-left space-y-3.5 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-sustain-800/40 rounded-full blur-lg pointer-events-none" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold">Need Help?</h3>
                  <p className="text-xs text-sustain-100/90 leading-relaxed font-medium">
                    Facing issues with syncing or downloads? Our support team is here to help.
                  </p>
                </div>
                <button 
                  onClick={() => navigateTo("/learner/support")}
                  className="w-full bg-white text-sustain-900 hover:bg-sustain-50 text-xs font-bold py-2.5 rounded-xl transition-all text-center cursor-pointer shadow-3xs"
                >
                  Open Support Ticket
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ----------------------------------------------------
          MOBILE VIEWPORT LAYOUT (lg:hidden)
          ---------------------------------------------------- */}
      <div className="lg:hidden min-h-screen bg-slate-50 text-slate-800 flex flex-col w-full relative">
        
        {/* Mobile Topbar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner")} 
              className="p-1 text-slate-600 hover:text-slate-900 rounded-lg active:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-semibold text-slate-900">Offline Centre</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-500 hover:text-slate-950 relative rounded-lg"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-sustain-900" />
            </button>
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="h-7 w-7 rounded-full bg-sustain-900 text-white flex items-center justify-center text-[10px] font-bold"
            >
              AM
            </button>
          </div>
        </header>

        {/* Mobile Content Scroll Pane */}
        <main className="flex-1 p-4 space-y-5 pb-32 overflow-y-auto">
          
          {/* Mobile Hero: Dark Emerald Offline Ready Card */}
          <div className="bg-emerald-900 text-white rounded-2xl p-5 space-y-4 relative overflow-hidden text-left border-none shadow-sm">
            <div className="absolute right-4 top-4 text-emerald-300">
              <Info className="h-5 w-5 cursor-pointer" onClick={() => triggerToast("Packs are saved inside your local database.")} />
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/40 text-emerald-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                <span className="h-1 w-1 bg-emerald-400 rounded-full animate-ping" />
                Online now
              </span>
              <h2 className="text-lg font-semibold tracking-tight pt-1">Offline Ready</h2>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {downloadedCount} packs available offline. {pendingSyncCount} items pending sync to your profile.
              </p>
            </div>

            <button 
              onClick={executeLocalSync}
              className="bg-white text-emerald-950 active:bg-emerald-50 text-xs font-semibold w-full py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RefreshCw className="h-4 w-4 animate-spin-slow" />
              Sync Now
            </button>
          </div>

          {/* Mobile KPI Grid (4 Cards, 2-Column) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-left flex flex-col justify-between min-h-[96px] shadow-3xs relative">
              <div className="absolute top-3 right-3 text-emerald-800">
                <Check className="h-4 w-4" />
              </div>
              <p className="text-2xl font-medium text-slate-800 leading-none">{downloadedCount}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Downloaded Packs</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-left flex flex-col justify-between min-h-[96px] shadow-3xs relative">
              <div className="absolute top-3 right-3 text-slate-400">
                <WifiOff className="h-4 w-4" />
              </div>
              <p className="text-2xl font-medium text-slate-800 leading-none">{offlineCount}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Offline Items</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-left flex flex-col justify-between min-h-[96px] shadow-3xs relative">
              <div className="absolute top-3 right-3 text-amber-500">
                <RefreshCw className="h-4 w-4" />
              </div>
              <p className="text-2xl font-medium text-amber-750 leading-none">{pendingSyncCount}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Pending Sync</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 text-left flex flex-col justify-between min-h-[96px] shadow-3xs relative">
              <div className="absolute top-3 right-3 text-slate-400">
                <Database className="h-4 w-4" />
              </div>
              <p className="text-2xl font-medium text-slate-800 leading-none">{storageUsedMB}MB</p>
              <p className="text-xs font-medium text-slate-500 mt-1">Storage Used</p>
            </div>
          </div>

          {/* READINESS CHECKLIST */}
          <div className="space-y-2 text-left">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Readiness Checklist</h3>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs overflow-hidden divide-y divide-slate-100">
              <div className="flex items-center justify-between p-3.5">
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  Core Modules Downloaded
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3.5">
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  Assessment Forms Ready
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5">
                <span className="text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-3.5 w-3.5" />
                  </span>
                  Resource Update Pending
                </span>
              </div>
            </div>
          </div>

          {/* PENDING SYNC QUEUE */}
          <div className="space-y-2 text-left">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Sync Queue</h3>
              <span className="text-[10px] font-semibold text-red-650 bg-red-50/60 px-2.5 py-0.5 rounded-full">Priority</span>
            </div>

            <div className="space-y-3">
              {syncQueue.slice(0, 2).map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between gap-3 shadow-3xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 bg-slate-50 text-slate-700 rounded-xl shrink-0 border border-slate-100">
                      {item.type === "checkpoint" ? (
                        <ListTodo className="h-4.5 w-4.5 text-amber-500" />
                      ) : (
                        <FileCheck className="h-4.5 w-4.5 text-blue-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {item.type === "checkpoint" ? "Draft: Interview Response" : item.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">
                        {item.type === "checkpoint" ? "Module 2: Work Readiness" : "Awaiting connection"}
                      </p>
                    </div>
                  </div>

                  <div>
                    {item.status === "Synced" ? (
                      <span className="text-[10px] text-sustain-900 bg-sustain-50 px-2.5 py-1 rounded-lg font-semibold">Synced</span>
                    ) : item.type === "checkpoint" ? (
                      <button 
                        onClick={executeLocalSync}
                        className="bg-sustain-900 text-white active:bg-sustain-800 text-[11px] font-semibold px-4 py-1.5 rounded-xl cursor-pointer shadow-3xs"
                      >
                        Sync
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                        className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer"
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LEARNING PACKS */}
          <div className="space-y-2 text-left">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Learning Packs</h3>

            {/* Large feature pack card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-emerald-900/95 to-emerald-800 text-white p-4 relative flex flex-col justify-between">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <span className="bg-emerald-950/60 text-emerald-200 text-[9px] font-semibold px-2 py-0.5 rounded">Module 2</span>
                  <span className="bg-white/25 text-white text-[9px] font-semibold px-2.5 py-0.5 rounded-md">64MB</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold leading-tight text-white">Interview Preparation Pack</h4>
                  <p className="text-[10px] text-emerald-100 font-medium">SUSTAIN Employment Toolkit</p>
                </div>
              </div>

              <div className="p-4 space-y-3.5">
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Text-first lesson notes, STAR response guide, and offline interview practice resources.
                </p>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownloadPack("pack-2")}
                    className="flex-1 bg-emerald-900 text-white active:bg-emerald-800 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button 
                    onClick={() => triggerToast("Additional options available in settings.")}
                    className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-200 cursor-pointer"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Second smaller pack row */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center justify-between gap-3 shadow-3xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center font-semibold">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">Work Readiness Guide</h4>
                  <p className="text-[10px] text-emerald-800 font-medium">Ready to view</p>
                </div>
              </div>

              <button 
                onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
                className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center active:bg-emerald-100 cursor-pointer border border-emerald-100"
              >
                <Play className="h-4 w-4 fill-emerald-800 text-emerald-800 translate-x-[1px]" />
              </button>
            </div>
          </div>

          {/* STORAGE USED CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4.5 text-left shadow-3xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                <Database className="h-4 w-4 text-slate-500" />
                Storage Used
              </span>
              <span className="text-[10px] font-medium text-slate-450 font-mono">248MB of 2.0GB</span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-800 h-full w-[12.4%]" />
            </div>

            <button 
              onClick={() => setActiveModal("storage")}
              className="text-xs font-semibold text-emerald-800 hover:underline pt-1 block cursor-pointer text-left"
            >
              Manage Storage
            </button>
          </div>

          {/* MOBILE OPTIMIZED CONNECTIVITY CARD */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 text-left space-y-3.5 relative overflow-hidden shadow-3xs">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                <Sliders className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Optimized Connectivity</h4>
                <p className="text-xs font-semibold text-slate-800">Low-Bandwidth Mode</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Reduce download payloads and prioritize text content over images on unstable connections.
            </p>

            <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-3xs">
              <div>
                <p className="text-xs font-semibold text-slate-800">Enable Low-Bandwidth Mode</p>
                <p className="text-[11px] text-slate-500 font-normal">Optimized for 2G/3G networks</p>
              </div>
              <button 
                onClick={handleToggleBandwidth}
                className={`w-10 h-6 rounded-full transition-all duration-150 p-0.5 flex items-center ${lowBandwidthMode ? "bg-emerald-800" : "bg-slate-300"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all ${lowBandwidthMode ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>

            <button 
              onClick={() => navigateTo("/learner/low-bandwidth")}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold py-2.5 rounded-xl transition-all text-center cursor-pointer shadow-3xs text-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>Go to Low-Bandwidth Portal</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* MOBILE ACTIVITY LOG */}
          <div className="space-y-2 text-left">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Recent Activity Log</h3>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-3xs p-4.5 space-y-4">
              <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
                {/* Item 1 */}
                <div className="flex items-start gap-3 text-xs pl-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-800 mt-1 shrink-0 relative z-10 ring-4 ring-white" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-800">Success: Synced 4 checkpoints</p>
                    <p className="text-[11px] text-slate-450 font-normal">{lastSyncTime} • Today</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3 text-xs pl-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 mt-1 shrink-0 relative z-10 ring-4 ring-white" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-800">Download completed: Interview Prep Pack</p>
                    <p className="text-[11px] text-slate-450 font-normal">09:15 AM • Yesterday</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3 text-xs pl-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300 mt-1 shrink-0 relative z-10 ring-4 ring-white" />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-800">Switched to Offline Mode</p>
                    <p className="text-[11px] text-slate-450 font-normal">05:30 PM • Oct 12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* Floating Action Button (Fixed position, safe from overlap) */}
        <button 
          onClick={() => triggerToast("Lightning diagnostics run: Offline databases optimized.")}
          className="fixed bottom-20 right-4 h-11 w-11 bg-emerald-950 text-white rounded-full flex items-center justify-center active:bg-emerald-900 shadow-lg cursor-pointer z-40"
          title="Lightning Diagnostics"
        >
          <Zap className="h-5 w-5 fill-white" />
        </button>

        {/* Mobile Bottom Navigation */}
        <LearnerMobileNav />

      </div>

    </div>
  );
}
