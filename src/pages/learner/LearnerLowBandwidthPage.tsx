import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { 
  WifiOff, 
  Download, 
  EyeOff, 
  FileText, 
  Compass, 
  ArrowLeft, 
  Check, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileDown
} from "lucide-react";

export default function LearnerLowBandwidthPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [textOnlyMode, setTextOnlyMode] = useState(true);
  const [downloadedCount, setDownloadedCount] = useState(0);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleTextMode = () => {
    setTextOnlyMode(!textOnlyMode);
    showToast(
      !textOnlyMode 
        ? "Text-First mode enabled. Media content hidden to save data." 
        : "Standard view enabled. Images will be loaded when available.",
      "info"
    );
  };

  const handleDownloadResource = (title: string) => {
    setDownloadedCount(prev => prev + 1);
    showToast(`“${title}” download simulated in this frontend prototype. Saved to local storage.`, "success");
  };

  const resources = [
    { title: "Interview Practice Guide (Text-Only)", size: "45 KB", type: "text" },
    { title: "Agribusiness Fundamentals Summary", size: "32 KB", type: "text" },
    { title: "Work Readiness Checklist & Milestones", size: "18 KB", type: "text" },
    { title: "Kano Cohort Discussion Transcript", size: "78 KB", type: "text" }
  ];

  return (
    <div id="low-bandwidth-root" className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col pb-16 lg:pb-0">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="flex flex-1 min-h-screen w-full">
        {/* Sidebar */}
        <LearnerSidebar />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigateTo("/learner/assessments")}
                variant="outline"
                className="lg:hidden p-2 h-9 w-9 flex items-center justify-center rounded-lg border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 text-slate-600" />
              </Button>
              <div>
                <h1 className="text-sm lg:text-base font-bold text-slate-900 font-sans">Low-Bandwidth Learner Mode</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Optimised for slow/unstable networks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                onClick={handleToggleTextMode}
                className={`text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all min-h-[36px] ${
                  textOnlyMode 
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100" 
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <EyeOff className="h-3.5 w-3.5" />
                <span>{textOnlyMode ? "Text Mode Active" : "Standard Mode"}</span>
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8 max-w-4xl w-full mx-auto space-y-6 pb-24">
            {/* Status Card */}
            <Card className="p-6 border border-amber-200 bg-amber-50/40 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 text-left">
                <div className="h-10 w-10 bg-amber-100 text-amber-900 rounded-xl flex items-center justify-center shrink-0 border border-amber-200">
                  <WifiOff className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Low Connection Speed Detected</h2>
                  <p className="text-xs text-slate-650 mt-1 leading-relaxed">
                    This page uses standard HTML texts and minimum styling weight. Images and videos are blocked unless you switch to standard view. All files can be pre-downloaded for offline usage.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  Offline files: {downloadedCount} saved
                </span>
              </div>
            </Card>

            {/* Assessment Material Box */}
            <Card className="p-6 border border-slate-200 bg-white rounded-2xl text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">Active Lesson Reading Version</h3>
                  <p className="text-[11px] text-slate-400 font-semibold">Preparing for Interviews — Written Briefing</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-100 py-0.5 px-2 rounded-md">
                  45 KB lightweight text
                </span>
              </div>

              <div className="space-y-3.5 bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                <p className="font-bold text-emerald-950">1. Interview Preparation Overview</p>
                <p>
                  Interviewers assess more than technical knowledge. They want to observe communication clarity, core motivation, agribusiness suitability, and ethical posture.
                </p>
                <p className="font-bold text-emerald-950">2. Key Steps for Success</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Research:</strong> Learn about the local agribusiness employer’s crops, distribution streams, and sustainable principles.</li>
                  <li><strong>Practice:</strong> Structure responses using the STAR method (Situation, Task, Action, Result). Focus actions on collaboration.</li>
                  <li><strong>Follow-up:</strong> Send a polite, text-based feedback message or note of appreciation within 24 hours.</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button 
                  onClick={() => handleDownloadResource("Interview Preparation Lesson - Full Text")}
                  className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all min-h-[40px] flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Reading Text (Offline)</span>
                </Button>
                <Button 
                  onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                  variant="outline"
                  className="bg-white border border-slate-200 text-slate-850 hover:bg-slate-50 text-xs font-bold px-4 py-2 rounded-xl transition-all min-h-[40px] flex items-center gap-1.5"
                >
                  <span>Continue Assessment Attempt</span>
                  <ArrowRight className="h-4 w-4 text-emerald-900" />
                </Button>
              </div>
            </Card>

            {/* Downloadable Resources List */}
            <div className="space-y-3 text-left">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lightweight Offline Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resources.map((res, index) => (
                  <Card 
                    key={index}
                    className="p-4 bg-white border border-slate-200 rounded-xl hover:-translate-y-0.5 hover:shadow-xs hover:border-emerald-200 transition-all duration-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="h-4.5 w-4.5 text-slate-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{res.title}</h4>
                        <span className="text-[10px] font-semibold text-slate-400 block mt-0.5 font-mono">{res.size} • Saved locally</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownloadResource(res.title)}
                      variant="outline"
                      className="p-2 h-9 w-9 rounded-lg border-slate-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer shrink-0"
                      title="Download"
                    >
                      <Download className="h-4 w-4 text-slate-500 hover:text-emerald-900" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile navigation */}
      <LearnerMobileNav />
    </div>
  );
}
