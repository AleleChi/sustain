import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { 
  ArrowLeft, 
  Check, 
  HelpCircle, 
  CheckCircle, 
  Clock, 
  BookOpen,
  ChevronRight
} from "lucide-react";

export default function LearnerQuizAttemptPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const questions = [
    {
      id: 1,
      text: "Which method is most effective for protecting fresh grain stores from insect damage under high humidity?",
      options: [
        "Airtight hermetic bag storage",
        "Open-air ventilation and spreading",
        "Direct chemical spraying on raw grain"
      ]
    },
    {
      id: 2,
      text: "True or False: Cold-chain logistics are only required for leafy vegetables and never for dairy transport.",
      options: [
        "True",
        "False"
      ]
    }
  ];

  const handleSelectOption = (qId: number, option: string) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
    showToast("Answer saved locally in this frontend prototype.", "success");
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length < questions.length) {
      showToast("Please answer all questions before submitting.", "info");
      return;
    }
    setQuizSubmitted(true);
    showToast("Quiz submitted successfully! Performance logged.", "success");
  };

  return (
    <div id="quiz-attempt-root" className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col pb-16 lg:pb-0">
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
                className="p-2 h-9 w-9 flex items-center justify-center rounded-lg border-slate-200 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 text-slate-600" />
              </Button>
              <div>
                <h1 className="text-sm lg:text-base font-bold text-slate-900 font-sans">Agri-Logistics Quiz</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Module Quiz Attempt</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <Clock className="h-3.5 w-3.5 text-emerald-900" />
                <span>15 Min Limit</span>
              </span>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8 max-w-3xl w-full mx-auto space-y-6 pb-24">
            {quizSubmitted ? (
              <Card className="p-6 md:p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-6">
                <div className="h-14 w-14 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-lg md:text-xl font-bold text-slate-900">Quiz Completed!</h2>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                    You have successfully submitted the Agri-Logistics Quiz. Your score is 2/2 (100% correct).
                  </p>
                </div>
                <div className="flex justify-center pt-2">
                  <Button 
                    onClick={() => navigateTo("/learner/assessments")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md"
                  >
                    Back to Assessment Centre
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Intro details card */}
                <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-sustain-50 text-sustain-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-150 uppercase tracking-wider">
                      Module quiz
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Instructions</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Answer all questions based on the Agribusiness Operations lesson materials. Your progress will be saved automatically.
                  </p>
                </Card>

                {/* Questions */}
                <div className="space-y-4 text-left">
                  {questions.map((q, idx) => (
                    <Card key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 h-6 w-6 rounded-md flex items-center justify-center border border-slate-100 shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs md:text-sm font-bold text-slate-900 leading-relaxed">{q.text}</p>
                      </div>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = answers[q.id] === opt;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, opt)}
                              className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-3 transition-all ${
                                isSelected 
                                  ? "bg-emerald-50/50 border-emerald-300 text-emerald-950" 
                                  : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50/50 hover:border-slate-300"
                              }`}
                            >
                              <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected 
                                  ? "bg-emerald-900 text-white border-emerald-900" 
                                  : "bg-white border-slate-300"
                              }`}>
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  <Button 
                    onClick={() => navigateTo("/learner/assessments")}
                    variant="outline"
                    className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 text-xs font-semibold px-4 py-2.5 rounded-xl min-h-[44px]"
                  >
                    Cancel Quiz
                  </Button>
                  <Button 
                    onClick={handleSubmitQuiz}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm min-h-[44px]"
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile nav */}
      <LearnerMobileNav />
    </div>
  );
}
