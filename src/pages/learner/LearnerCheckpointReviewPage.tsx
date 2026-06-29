import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Award, 
  Check, 
  FileText, 
  Bookmark, 
  Bell, 
  ChevronRight,
  AlertTriangle,
  HelpCircle
} from "lucide-react";

export default function LearnerCheckpointReviewPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const answeredQuestions = [
    {
      id: 1,
      question: "Which of the following is the most suitable tool for offline geospatial field observations?",
      options: [
        { label: "Ona Mobile or KoboCollect", correct: true, selected: true },
        { label: "Standard Google Docs", correct: false, selected: false },
        { label: "Microsoft Excel Desktop", correct: false, selected: false }
      ],
      explanation: "Ona Mobile and KoboCollect support offline forms and geo-tagged data capture without internet access."
    },
    {
      id: 2,
      question: "True or False: Low-bandwidth reading modes completely ignore course curriculum requirements.",
      options: [
        { label: "True", correct: false, selected: false },
        { label: "False", correct: true, selected: true }
      ],
      explanation: "Low-bandwidth files compress media but maintain 100% of the educational content and curriculum."
    }
  ];

  return (
    <div id="checkpoint-review-root" className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col pb-24 lg:pb-0">
      {/* Toast Overlay */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="flex flex-1 min-h-screen w-full">
        {/* Sidebar for Desktop */}
        <LearnerSidebar />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* ========================================== */}
          {/* 1. DESKTOP HEADER (LARGE SCREEN ONLY) */}
          {/* ========================================== */}
          <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-20 shadow-2xs">
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                variant="outline"
                className="p-2 h-9 w-9 flex items-center justify-center rounded-xl border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 text-slate-600" />
              </Button>
              
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <h1 className="text-sm font-bold text-slate-950 font-sans tracking-tight">Checkpoint Review</h1>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Interview Preparation Checkpoint</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Calm Review Mode Chip */}
              <span className="bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-3xs">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-none"></span>
                <span>Review mode</span>
              </span>

              {/* Progress Chip */}
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-900 text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-3xs">
                <Check className="h-3.5 w-3.5 text-emerald-800" />
                <span>100% complete</span>
              </span>
            </div>
          </header>

          {/* ========================================== */}
          {/* 2. MOBILE HEADER (TWO-LEVEL REDESIGN) */}
          {/* ========================================== */}
          <div className="lg:hidden flex flex-col sticky top-0 z-20 bg-white">
            {/* Topbar Row 1 */}
            <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4">
              <button 
                onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                className="p-1 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              
              <span className="text-sm font-bold text-slate-900 font-sans tracking-tight">Checkpoint Review</span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => showToast("Checkpoint saved to your bookmarks", "info")}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
                <div className="h-7 w-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  AM
                </div>
              </div>
            </div>

            {/* Checkpoint Status Bar Row 2 */}
            <div className="bg-slate-50/95 border-b border-slate-200 p-3.5 flex flex-col gap-2.5 text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                Interview Preparation Checkpoint
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* Review status chip */}
                <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold py-1 px-2.5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  <span>Review mode</span>
                </span>
                
                {/* Progress chip */}
                <span className="bg-emerald-50 border border-emerald-150 text-emerald-900 text-[10px] font-bold py-1 px-2.5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <Check className="h-3 w-3 text-emerald-800" />
                  <span>100% complete</span>
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Pane */}
          <main className="flex-1 p-4 lg:p-8 max-w-3xl w-full mx-auto space-y-6 pb-24 mt-2 lg:mt-0">
            
            {/* Top overview card */}
            <Card className="p-5 md:p-6 bg-white border border-slate-200 rounded-2xl text-left space-y-3 shadow-3xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Checkpoint passed
                </span>
                <span className="bg-slate-150/80 text-slate-600 border border-slate-200/50 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  2/2 Correct answers
                </span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Interview Preparation Review</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                You completed this checkpoint on 18 Oct 2026. Review your questions and answers below.
              </p>
            </Card>

            {/* Answered Questions section */}
            <div className="space-y-4 text-left">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Answered Questions</h3>
              
              <div className="space-y-4">
                {answeredQuestions.map((q, idx) => (
                  <Card key={idx} className="p-5 md:p-6 bg-white border border-slate-200 rounded-2xl space-y-4 text-left shadow-3xs">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[10px] font-bold text-emerald-900 bg-emerald-50 h-5 w-5 rounded-md flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                        Q{q.id}
                      </span>
                      <p className="text-xs md:text-sm font-semibold text-slate-900 leading-relaxed">{q.question}</p>
                    </div>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => (
                        <div 
                          key={optIdx} 
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
                            opt.correct 
                              ? "bg-emerald-50/40 border-emerald-150 text-emerald-950" 
                              : "bg-white border-slate-200 text-slate-500"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                              opt.correct 
                                ? "bg-emerald-900 text-white border-emerald-900" 
                                : "bg-slate-100 border-slate-300 text-transparent"
                            }`}>
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-medium text-[11px] md:text-xs text-slate-700">{opt.label}</span>
                          </div>
                          {opt.correct && (
                            <span className="text-[9px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              Correct answer
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-left">
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold">Feedback Explanation</span>
                      <p className="text-[11px] text-slate-600 font-medium mt-1 leading-relaxed">{q.explanation}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Next Steps card */}
            <Card className="p-5 md:p-6 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-3xs">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Steps</h3>
              </div>
              
              <div className="divide-y divide-slate-100">
                <button
                  onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                  className="w-full py-3.5 flex items-center justify-between gap-4 text-left group hover:bg-slate-50/50 rounded-xl px-1.5 -mx-1.5 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-800 shrink-0">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">Review Lesson</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Go back to the interview preparation lesson.</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}
                  className="w-full py-3.5 flex items-center justify-between gap-4 text-left group hover:bg-slate-50/50 rounded-xl px-1.5 -mx-1.5 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">Open Assessment</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Continue the Work Readiness Assessment.</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => navigateTo("/learner/cpd-record")}
                  className="w-full py-3.5 flex items-center justify-between gap-4 text-left group hover:bg-slate-50/50 rounded-xl px-1.5 -mx-1.5 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-amber-800 shrink-0">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">View CPD Record</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Check certificate-linked progress.</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </Card>

            <div className="flex justify-start pt-2">
              <Button 
                onClick={() => navigateTo("/learner/assessments")}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Back to Assessments
              </Button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile nav bar at bottom */}
      <LearnerMobileNav />
    </div>
  );
}
