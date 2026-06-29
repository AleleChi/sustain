import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { 
  Lock, 
  Calendar, 
  BookOpen, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft,
  Users,
  CheckCircle,
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function LearnerLockedModulePage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const requirements = [
    { 
      title: "Complete Work Readiness Assessment", 
      status: "In Progress (45%)", 
      isCompleted: false, 
      actionLabel: "Continue Assessment", 
      onClick: () => navigateTo("/learner/assessments/work-readiness-assessment/attempt") 
    },
    { 
      title: "Attend Interview Practice Clinic", 
      status: "Scheduled for Friday, 25 Oct 2026", 
      isCompleted: false, 
      actionLabel: "View Live Session", 
      onClick: () => navigateTo("/learner/live-sessions/interview-practice-clinic") 
    },
    { 
      title: "Prerequisite: Review Lesson Material", 
      status: "Completed", 
      isCompleted: true, 
      actionLabel: "Reviewed", 
      onClick: () => {} 
    }
  ];

  return (
    <div id="locked-module-root" className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col pb-16 lg:pb-0">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
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
                className="p-2 h-9 w-9 flex items-center justify-center rounded-lg border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 text-slate-600" />
              </Button>
              <div>
                <h1 className="text-sm lg:text-base font-bold text-slate-900 font-sans">Locked Reflection</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unlock Requirements</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-red-50 border border-red-200 text-red-950 text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-red-950" />
                <span>Locked Unit</span>
              </span>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8 max-w-3xl w-full mx-auto space-y-6 pb-24">
            {/* Lock Hero Card */}
            <Card className="p-6 md:p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-4">
              <div className="h-14 w-14 bg-red-50 border border-red-100 rounded-2xl text-red-700 flex items-center justify-center mx-auto shadow-xs">
                <Lock className="h-7 w-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Live Session Reflection is Locked</h2>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  This reflection requires you to complete your core draft and attend the live practice clinic to unlock reflection questions.
                </p>
              </div>
            </Card>

            {/* Stepper / Requirement Cards */}
            <div className="space-y-3 text-left">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unlocking Checklist</h3>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <Card 
                    key={index}
                    className={`p-5 bg-white border rounded-2xl transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      req.isCompleted 
                        ? "border-slate-200/80 bg-slate-50/20 opacity-80" 
                        : "border-slate-200 hover:border-emerald-200"
                    }`}
                  >
                    <div className="flex items-start gap-3 text-left">
                      <div className={`h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 ${
                        req.isCompleted 
                          ? "bg-emerald-50 border-emerald-100 text-emerald-900" 
                          : "bg-slate-50 border-slate-100 text-slate-400"
                      }`}>
                        {req.isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <span className="font-mono text-xs font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs md:text-sm font-bold text-slate-900">{req.title}</h4>
                        <span className={`text-[10px] font-semibold block mt-0.5 ${
                          req.isCompleted ? "text-emerald-900" : "text-slate-400"
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>

                    {!req.isCompleted && (
                      <Button 
                        onClick={req.onClick}
                        className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all min-h-[38px] cursor-pointer"
                      >
                        {req.actionLabel}
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Facilitator / Assistance Column */}
            <Card className="p-6 bg-white border border-slate-200 rounded-2xl text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900">Need help or having internet issues?</h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Contact Kano Skills support or request a lightweight, low-bandwidth text replacement.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button 
                  onClick={() => showToast("Facilitator support ticket created. Halima Sani has been notified.", "success")}
                  variant="outline"
                  className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-[11px] font-bold py-2 px-3.5 rounded-xl transition-all"
                >
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                  <span>Message Facilitator</span>
                </Button>
                <Button 
                  onClick={() => navigateTo("/learner/low-bandwidth")}
                  variant="outline"
                  className="bg-white border border-slate-200 text-slate-850 hover:bg-slate-50 text-[11px] font-bold py-2 px-3.5 rounded-xl transition-all"
                >
                  <span>Open Low-Bandwidth Mode</span>
                </Button>
              </div>
            </Card>
          </main>
        </div>
      </div>

      {/* Mobile nav */}
      <LearnerMobileNav />
    </div>
  );
}
