/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { useRoute } from "../../context/RouteContext";
import { 
  BookOpen, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  HelpCircle, 
  Compass, 
  LayoutDashboard, 
  ArrowRight, 
  MessageSquare, 
  Check, 
  Bell, 
  Search, 
  X,
  Award,
  BookMarked,
  Printer,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Send,
  Info,
  Calendar,
  User,
  GraduationCap
} from "lucide-react";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { motion, AnimatePresence } from "motion/react";

interface QuestionData {
  id: number;
  title: string;
  question: string;
  selectedAnswers: string[];
  incorrectUnselected: string[];
  explanation: string;
  feedbackStatus: string;
  score: string;
}

export default function LearnerAssessmentResultPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  
  // Modals & Bottom sheets state
  const [isFullResponseOpen, setIsFullResponseOpen] = useState(false);
  const [isClarificationOpen, setIsClarificationOpen] = useState(false);
  const [isAnswerReviewOpen, setIsAnswerReviewOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<QuestionData | null>(null);
  
  // Accordion state for in-page Answer Review card
  const [isAnswerSectionExpanded, setIsAnswerSectionExpanded] = useState(true);

  // Message form state
  const [subject, setSubject] = useState("Question about my assessment feedback");
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);

  // Scroll target for View Feedback
  const reviewerFeedbackRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewFeedback = () => {
    reviewerFeedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast("Scrolled to Reviewer Feedback", "info");
  };

  const handleContinueLearning = () => {
    navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews");
  };

  const handleBackToAssessments = () => {
    navigateTo("/learner/assessments");
  };

  const handleDownloadPDF = (type: string) => {
    showToast(`Result summary download simulated in this frontend prototype.`, "success");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setIsClarificationOpen(false);
      setMessageText("");
      showToast("Message sent locally in this frontend prototype.", "success");
    }, 1200);
  };

  const handleReviewAnswerClick = (index: number) => {
    const questions: QuestionData[] = [
      {
        id: 1,
        title: "Knowledge Check",
        question: "Which of the following describes the key requirements of active listening during a professional interview?",
        selectedAnswers: ["Maintaining consistent eye contact", "Paraphrasing or summarizing key prompts", "Asking relevant follow-up questions"],
        incorrectUnselected: ["Interrupting to show fast decision-making capabilities"],
        explanation: "Active listening demonstrates engagement and professional respect. Summarizing key points shows structured assimilation, and eye contact shows confidence.",
        feedbackStatus: "Correct",
        score: "2/2"
      },
      {
        id: 2,
        title: "Select All",
        question: "Which of the following are common interview formats in modern agribusiness?",
        selectedAnswers: ["Panel Interview", "One-on-One Interview"],
        incorrectUnselected: ["Shadowing Session"],
        explanation: "Panel and One-on-One interviews are standard professional formats in the agribusiness and corporate sectors. Shadowing sessions are typically part of on-the-job training and onboarding rather than the selection process.",
        feedbackStatus: "Mostly correct",
        score: "3/4"
      },
      {
        id: 3,
        title: "Written Response",
        question: "Describe a time you showed initiative in a project, applying the STAR method.",
        selectedAnswers: ["Situation: Farm inventory tracking bottleneck", "Task: Re-design tracking sheet", "Action: Developed spreadsheet-based database with automatic indicators"],
        incorrectUnselected: [],
        explanation: "Your structured approach matches the standard business application of STAR. Recommendations: include more quantitative results to stand out further.",
        feedbackStatus: "Passed",
        score: "32/40"
      }
    ];

    setActiveQuestion(questions[index]);
    setIsAnswerReviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 antialiased font-sans relative pb-28 lg:pb-36">
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-medium flex items-center gap-3"
          >
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white ml-2">
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer Layout container */}
      <div className="flex min-h-screen w-full">
        {/* Sidebar (Desktop only) */}
        <div className="hidden lg:block">
          <LearnerSidebar />
        </div>

        {/* Content Area wrapper */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* ========================================== */}
          {/* DESKTOP/TABLET TOPBAR (Hidden on Mobile) */}
          {/* ========================================== */}
          <header className="hidden md:flex h-16 bg-white border-b border-slate-100 items-center justify-between px-8 sticky top-0 z-20">
            <div className="relative w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, certificates, feedback..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50/75 border border-slate-100 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-700"
              />
            </div>

            <div className="flex items-center gap-5">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
              </button>
              <div className="h-8 w-px bg-slate-100" />
              <div className="flex items-center gap-2.5 text-left">
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-800">Aisha Mohammed</p>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">SUST-LRN-0442</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-950 flex items-center justify-center font-bold text-xs text-white">
                  AM
                </div>
              </div>
            </div>
          </header>

          {/* ========================================== */}
          {/* MOBILE TOPBAR (Hidden on Desktop/Tablet) */}
          {/* ========================================== */}
          <header className="md:hidden h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBackToAssessments}
                className="p-1 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                aria-label="Back to assessments"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-extrabold text-slate-900 tracking-tight font-heading">
                Assessment Result
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-1.5 text-slate-500 hover:text-slate-800 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
              </button>
              <div className="h-7 w-7 bg-emerald-950 text-white font-bold rounded-full flex items-center justify-center text-[10px] shadow-2xs">
                AM
              </div>
            </div>
          </header>

          {/* ========================================== */}
          {/* MAIN PAGE CONTAINER (All Viewports) */}
          {/* ========================================== */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
            
            {/* Breadcrumb - Desktop/Tablet only */}
            <div className="hidden md:flex text-[11px] text-slate-400 font-medium items-center gap-1.5">
              <span className="hover:text-slate-600 cursor-pointer" onClick={handleBackToAssessments}>Assessments</span>
              <ChevronRight className="h-3 w-3" />
              <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}>Work Readiness Assessment</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-600 font-bold">Result</span>
            </div>

            {/* Main grid structure (Responsive columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Main Assessment Feedback Sections (col-span-8) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Result Hero Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-6 md:p-8 relative overflow-hidden">
                  {/* Pale checkmark background decoration */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.03] text-emerald-900 pointer-events-none hidden md:block">
                    <Check className="h-44 w-44 stroke-[6]" />
                  </div>

                  <div className="relative z-10 space-y-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-emerald-50 text-[#005C45] border border-emerald-100 font-sans px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Passed</span>
                      </span>
                      <span className="bg-slate-50 text-slate-600 border border-slate-100 font-sans px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        Feedback released
                      </span>
                      <span className="bg-amber-50 text-amber-800 border border-amber-100 font-sans px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        4 CPD credits awarded
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
                        Work Readiness Assessment Result
                      </h2>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-2xl font-medium">
                        Your assessment has been reviewed. You met the passing threshold and your CPD record has been updated.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 pb-4 border-t border-b border-slate-50 text-xs">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Course</p>
                        <p className="font-bold text-slate-700 mt-0.5">Work Readiness Foundation</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Module</p>
                        <p className="font-bold text-slate-700 mt-0.5">Preparing for Interviews</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reviewed</p>
                        <p className="font-bold text-slate-700 mt-0.5">Today, 02:15 PM</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reviewer</p>
                        <p className="font-bold text-slate-700 mt-0.5">Halima Sani</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button 
                        onClick={handleViewFeedback}
                        className="text-xs font-bold py-2 px-5 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer"
                      >
                        View Feedback
                      </button>
                      <button 
                        onClick={handleContinueLearning}
                        className="text-xs font-bold py-2 px-5 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-emerald-900 rounded-xl transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Final Score */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between space-y-2 transition-all hover:border-emerald-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Final Score</span>
                    <div>
                      <p className="text-xl font-extrabold text-slate-900 leading-none">82%</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">Pass mark: 70%</p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between space-y-2 transition-all hover:border-emerald-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Result</span>
                    <div>
                      <p className="text-xl font-extrabold text-emerald-900 leading-none">Passed</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">Threshold: 70%</p>
                    </div>
                  </div>

                  {/* CPD Status */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between space-y-2 transition-all hover:border-emerald-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CPD Status</span>
                    <div>
                      <p className="text-xl font-extrabold text-slate-900 leading-none">4 Credits</p>
                      <p className="text-[10px] text-emerald-800 font-bold mt-1">Awarded Today</p>
                    </div>
                  </div>

                  {/* Module Status */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between space-y-2 transition-all hover:border-emerald-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Module Status</span>
                    <div>
                      <p className="text-xl font-extrabold text-slate-900 leading-none font-sans">Unlocked</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">1 Module Pending</p>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 md:p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-50 pb-3 font-heading">
                    Score Breakdown
                  </h3>

                  <div className="space-y-3">
                    {/* Row 1 */}
                    <div className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-800">Knowledge Check</span>
                          <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Correct</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">Great foundational knowledge.</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="text-xs font-bold text-slate-700">2/2 Points</span>
                        <button 
                          onClick={() => handleReviewAnswerClick(0)}
                          className="text-[11px] font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg transition-all"
                        >
                          Review Answer
                        </button>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-800">Select All</span>
                          <span className="bg-amber-50 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Mostly correct</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">Missed one key attribute.</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="text-xs font-bold text-slate-700">3/4 Points</span>
                        <button 
                          onClick={() => handleReviewAnswerClick(1)}
                          className="text-[11px] font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg transition-all"
                        >
                          Review Answer
                        </button>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-800">Written Response</span>
                          <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Passed</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">Strong structural approach.</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="text-xs font-bold text-slate-700">32/40 Points</span>
                        <button 
                          onClick={() => handleReviewAnswerClick(2)}
                          className="text-[11px] font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg transition-all"
                        >
                          Review Answer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facilitator Feedback Card */}
                <div ref={reviewerFeedbackRef} className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 md:p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-emerald-950 rounded-full flex items-center justify-center font-bold text-white border border-emerald-800 text-xs shadow-2xs shrink-0">
                        HS
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest leading-none">Reviewer Feedback</h3>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">Halima Sani</h4>
                        <p className="text-[10px] text-slate-400 font-semibold leading-none mt-0.5">Senior HR Consultant</p>
                      </div>
                    </div>
                    <MessageSquare className="h-5 w-5 text-slate-400 shrink-0" />
                  </div>

                  <div className="bg-emerald-50/30 border-l-4 border-emerald-600 rounded-r-xl p-5 italic text-slate-700 leading-relaxed text-xs md:text-sm">
                    "Aisha, your application of the STAR method in your written response was excellent. You clearly understand how to translate your farm management experience into professional competencies that corporate agribusinesses are looking for. Just focus on being more specific with measurable results in your future interviews."
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Strengths */}
                    <div className="bg-emerald-50/15 border border-emerald-100 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#005C45] uppercase tracking-wide">
                        <Sparkles className="h-4 w-4 shrink-0" />
                        <span>Strengths</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed font-medium pl-1">
                        <li>Deep understanding of interview preparation essentials</li>
                        <li>High-quality practical examples from farm operations</li>
                        <li>Perfect execution of the STAR structure</li>
                      </ul>
                    </div>

                    {/* Areas to improve */}
                    <div className="bg-amber-50/15 border border-amber-100 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-850 uppercase tracking-wide">
                        <HelpCircle className="h-4 w-4 shrink-0 text-amber-700" />
                        <span>Areas to Improve</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed font-medium pl-1">
                        <li>Include more measurable results/metrics in examples</li>
                        <li>Carefully review multi-select questions on compliance</li>
                        <li>Elaborate further on 'closing the interview' steps</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Answer Review Section */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 md:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
                      Answer Review
                    </h3>
                    <button 
                      onClick={() => setIsAnswerSectionExpanded(!isAnswerSectionExpanded)}
                      className="p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
                    >
                      <ChevronDown className={`h-4.5 w-4.5 transition-transform ${isAnswerSectionExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isAnswerSectionExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-4"
                      >
                        <div className="border border-slate-100 rounded-xl p-4 space-y-4">
                          <div className="flex items-center gap-2.5">
                            <span className="h-5 w-5 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center font-extrabold text-[10px] shadow-2xs">
                              01
                            </span>
                            <span className="text-xs font-bold text-slate-900 font-heading">Question 1: Common Interview Formats</span>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                              Which of the following are common interview formats in the modern agribusiness sector?
                            </p>

                            <div className="space-y-2.5">
                              {/* Selected correct 1 */}
                              <div className="p-3 bg-emerald-50/30 border border-emerald-100 rounded-lg flex items-center justify-between text-xs font-bold text-emerald-950">
                                <div className="flex items-center gap-2.5">
                                  <div className="h-4 w-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                                  </div>
                                  <span>Panel Interview</span>
                                </div>
                                <span className="text-[10px] text-emerald-800 uppercase tracking-wider">Your selection</span>
                              </div>

                              {/* Selected correct 2 */}
                              <div className="p-3 bg-emerald-50/30 border border-emerald-100 rounded-lg flex items-center justify-between text-xs font-bold text-emerald-950">
                                <div className="flex items-center gap-2.5">
                                  <div className="h-4 w-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                                  </div>
                                  <span>One-on-One Interview</span>
                                </div>
                                <span className="text-[10px] text-emerald-800 uppercase tracking-wider">Your selection</span>
                              </div>

                              {/* Incorrect unselected */}
                              <div className="p-3 bg-slate-50/45 border border-slate-100 rounded-lg flex items-center justify-between text-xs font-medium text-slate-500">
                                <div className="flex items-center gap-2.5">
                                  <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                                  <span>Shadowing Session</span>
                                </div>
                                <span className="text-[9px] text-slate-400 uppercase tracking-wider">Correctly omitted</span>
                              </div>
                            </div>
                          </div>

                          {/* Explanation block */}
                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">EXPLANATION</span>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                              Panel and One-on-One interviews are standard professional formats. Shadowing sessions are typically part of onboarding, not the interview process itself.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Written Case Study / Written Response Review Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 md:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Written Response Review</h3>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">Section: Written Case Study</h4>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 shrink-0">342 Words</span>
                  </div>

                  {/* STAR Breakdown progress indicators */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STAR BREAKDOWN</p>
                      
                      <div className="grid grid-cols-4 gap-2">
                        {/* Situation */}
                        <div className="space-y-1">
                          <div className="h-1.5 w-full bg-emerald-600 rounded-full" />
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-500">Situation</span>
                            <span className="text-emerald-800">Clear</span>
                          </div>
                        </div>

                        {/* Task */}
                        <div className="space-y-1">
                          <div className="h-1.5 w-full bg-emerald-600 rounded-full" />
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-500">Task</span>
                            <span className="text-emerald-800">Clear</span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="space-y-1">
                          <div className="h-1.5 w-full bg-emerald-600 rounded-full" />
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-500">Action</span>
                            <span className="text-emerald-800">Strong</span>
                          </div>
                        </div>

                        {/* Result */}
                        <div className="space-y-1">
                          <div className="h-1.5 w-full bg-amber-500 rounded-full" />
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-slate-500">Result</span>
                            <span className="text-amber-700">Good, Needs Metrics</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-xs text-slate-600 font-medium leading-relaxed italic">
                      "The STAR format was followed effectively for the Situation and Task. Recommendation: Focus more on the quantitative Results in future responses."
                    </div>

                    <div className="flex justify-center pt-1">
                      <button 
                        onClick={() => setIsFullResponseOpen(true)}
                        className="text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 py-1.5 px-5 rounded-lg transition-colors cursor-pointer"
                      >
                        View Full Response
                      </button>
                    </div>
                  </div>
                </div>

                {/* CPD / Module Complete Card */}
                <div className="bg-[#005C45] text-white rounded-2xl p-6 relative overflow-hidden space-y-4 shadow-sm">
                  {/* Decorative faint pattern */}
                  <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-emerald-800 opacity-20 pointer-events-none">
                    <Award className="h-36 w-36" />
                  </div>

                  <div className="relative z-10 space-y-3">
                    <h3 className="text-base md:text-lg font-bold font-heading">Module Complete!</h3>
                    <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                      You have earned 4 CPD credits and unlocked 'Interview Preparation'. Keep up the excellent momentum in your pathway.
                    </p>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-emerald-200 font-semibold">
                        <span>Course Completion</span>
                        <span>100%</span>
                      </div>
                      <div className="w-full bg-emerald-950 h-2 rounded-full overflow-hidden">
                        <div className="bg-white h-full rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button 
                        onClick={handleContinueLearning}
                        className="text-xs font-bold py-2 px-4 bg-white text-[#005C45] hover:bg-emerald-50 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Continue to Interview Preparation</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* ========================================== */}
              {/* RIGHT COLUMN: Sidebar widgets (col-span-4) */}
              {/* ========================================== */}
              <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                
                {/* Result Score Card with Circular Progress */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 flex flex-col items-center text-center space-y-4">
                  <div className="border-b border-slate-50 pb-2 w-full">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Score Breakdown Overview</span>
                  </div>

                  {/* Circular Score display */}
                  <div className="relative h-28 w-28 flex items-center justify-center">
                    {/* SVG circle track */}
                    <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="#E2E8F0" 
                        strokeWidth="8" 
                        fill="transparent" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="#005C45" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * 82) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="text-center">
                      <p className="text-2xl font-black text-slate-900">82%</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">SCORE</p>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-slate-600 leading-none">
                    Pass: 70% • <span className="text-emerald-800">Passed</span>
                  </p>

                  <button 
                    onClick={() => handleDownloadPDF("Result Summary")}
                    className="w-full text-center text-xs font-bold text-[#005C45] hover:text-[#004d3a] bg-emerald-50/55 hover:bg-emerald-50 py-2.5 rounded-xl border border-emerald-100/50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Result Summary</span>
                  </button>
                </div>

                {/* Certificate Progress Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 space-y-4">
                  <div className="flex justify-between items-baseline border-b border-slate-50 pb-2">
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Work Readiness Certificate
                    </h4>
                    <span className="text-sm font-black text-[#005C45]">78%</span>
                  </div>

                  <div className="space-y-3">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-700 h-full rounded-full" style={{ width: "78%" }} />
                    </div>

                    <div className="space-y-2 text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span>Core Theory — Complete</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span>Work Readiness Assessment — Complete</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <div className="h-4 w-4 rounded-full border-2 border-slate-200 bg-white shrink-0" />
                        <span>Live Attendance — Pending</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateTo("/learner/certificates")}
                    className="w-full text-center text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 py-2 rounded-xl border border-transparent transition-colors cursor-pointer"
                  >
                    View Certificate Track
                  </button>
                </div>

                {/* Next Step soft success card */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 space-y-4">
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">Next Step</span>
                    <h4 className="font-extrabold text-slate-900 text-sm font-heading leading-tight">Continue to Interview Preparation</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                      Your next module is now unlocked and ready for your review.
                    </p>
                  </div>

                  <button 
                    onClick={handleContinueLearning}
                    className="w-full text-center text-xs font-bold bg-[#005C45] hover:bg-[#004d3a] text-white py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Start Module
                  </button>
                </div>

                {/* Need Clarification card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-2xs p-5 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <MessageSquare className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-xs">
                      <h4 className="font-extrabold text-slate-900 font-heading">Need Clarification?</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-normal mt-0.5">
                        Message Halima Sani if you want to ask about your feedback.
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsClarificationOpen(true)}
                    className="w-full text-center text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Message Facilitator
                  </button>
                </div>

              </div>

            </div>

          </main>

          {/* ========================================== */}
          {/* STICKY BOTTOM ACTION BAR (Desktop/Tablet) */}
          {/* ========================================== */}
          <div className="hidden md:flex fixed bottom-0 left-0 lg:left-[280px] right-0 h-16 bg-white border-t border-slate-200 shadow-md z-30 px-8 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-600 rounded-full shrink-0" />
              <p className="text-xs font-semibold text-slate-700">
                Assessment: <span className="font-bold text-slate-900">Work Readiness Assessment</span>
              </p>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-2 py-0.5 rounded-md ml-2">
                Passed (82%)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={handleBackToAssessments}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-2 cursor-pointer transition-colors"
              >
                Back to Assessments
              </button>
              <button 
                onClick={handleContinueLearning}
                className="text-xs font-bold py-2 px-5 bg-[#005C45] hover:bg-[#004d3a] text-white rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <span>Continue to Interview Preparation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* ========================================== */}
          {/* MOBILE STICKY FOOTER CTA BUTTON */}
          {/* ========================================== */}
          <div className="md:hidden fixed bottom-16 left-0 right-0 p-3 bg-white border-t border-slate-200 z-30 shadow-md">
            <button 
              onClick={handleContinueLearning}
              className="w-full bg-[#005C45] hover:bg-[#004d3a] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <span>Continue to Interview Preparation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* ========================================== */}
          {/* MOBILE BOTTOM NAV BAR */}
          {/* ========================================== */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-40 flex items-center justify-around shadow-lg px-2">
            {[
              { id: "home", label: "Home", icon: LayoutDashboard, path: "/learner" },
              { id: "journey", label: "Journey", icon: Compass, path: "/learner/journey" },
              { id: "learn", label: "Courses", icon: BookOpen, path: "/learner/courses" },
              { id: "success", label: "Success", icon: Award, path: "/learner/assessments" },
              { id: "support", label: "Support", icon: HelpCircle, path: "/learner/support" }
            ].map((item) => {
              const Icon = item.icon;
              const isItemActive = item.id === "success";

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.path as any)}
                  className={`flex flex-col items-center justify-center gap-1 h-full px-2 text-[10px] font-bold transition-colors cursor-pointer shrink-0 ${
                    isItemActive ? "text-emerald-900 font-extrabold" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <div className={`p-1 rounded-lg ${isItemActive ? "bg-emerald-50 text-emerald-900" : ""}`}>
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ========================================== */}
      {/* 3. MODALS & DIALOGS */}
      {/* ========================================== */}
      <AnimatePresence>
        
        {/* Full Written Response View modal */}
        {isFullResponseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/55">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">Written Response Feedback</h3>
                <button 
                  onClick={() => setIsFullResponseOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4 text-xs text-slate-600 leading-relaxed font-sans">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prompt</p>
                  <p className="font-bold text-slate-800">Describe a time you showed initiative in a project, applying the STAR method.</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Submitted Response</p>
                  <p className="p-3 bg-slate-50 rounded-xl leading-relaxed italic text-slate-600 font-medium">
                    "At my recent farm cooperative project, I noticed a bottleneck in the grain collection records. I implemented a simple spreadsheet-based system to register quantities immediately. This eliminated long delays for smallholder farmers and helped build operational trust between farmers and off-takers..."
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reviewer Comment</p>
                  <p className="font-semibold text-slate-700 leading-relaxed">
                    The STAR format was followed effectively for the Situation and Task. Recommendation: Focus more on the quantitative Results in future responses.
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/55">
                <button 
                  onClick={() => handleDownloadPDF("Submitted Response Full")}
                  className="text-xs font-bold py-2 px-4 bg-emerald-50 text-emerald-950 rounded-xl hover:bg-emerald-100 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Feedback</span>
                </button>
                <button 
                  onClick={() => setIsFullResponseOpen(false)}
                  className="text-xs font-bold py-2 px-4 bg-emerald-900 text-white rounded-xl hover:bg-emerald-850 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Answer Review detail modal */}
        {isAnswerReviewOpen && activeQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/55">
                <div>
                  <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md">
                    {activeQuestion.feedbackStatus} ({activeQuestion.score})
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading mt-1">{activeQuestion.title} Review</h3>
                </div>
                <button 
                  onClick={() => setIsAnswerReviewOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[65vh] space-y-4 text-xs text-slate-600 leading-relaxed font-sans">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Question</p>
                  <p className="font-bold text-slate-800">{activeQuestion.question}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Answers & Omissions</p>
                  
                  <div className="space-y-2">
                    {activeQuestion.selectedAnswers.map((ans, aIdx) => (
                      <div key={aIdx} className="p-3 bg-emerald-50/30 border border-emerald-100 rounded-lg flex items-center gap-2.5 font-bold text-emerald-950">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span>{ans}</span>
                      </div>
                    ))}

                    {activeQuestion.incorrectUnselected.map((ans, aIdx) => (
                      <div key={aIdx} className="p-3 bg-slate-50/45 border border-slate-100 rounded-lg flex items-center gap-2.5 font-semibold text-slate-450">
                        <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                        <span>{ans}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">EXPLANATION</span>
                  <p className="text-xs text-slate-650 font-medium leading-relaxed">
                    {activeQuestion.explanation}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50/55">
                <button 
                  onClick={() => setIsAnswerReviewOpen(false)}
                  className="text-xs font-bold py-2 px-5 bg-emerald-900 text-white rounded-xl hover:bg-emerald-850 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Message Facilitator Sheet (Clarification Modal) */}
        {isClarificationOpen && (
          <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-t-2xl lg:rounded-2xl shadow-xl border border-slate-100 w-full lg:max-w-md overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/55">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Message Facilitator</h3>
                  <h2 className="text-sm font-bold text-slate-800 font-heading">Halima Sani</h2>
                </div>
                <button 
                  onClick={() => setIsClarificationOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSendMessage} className="p-5 space-y-4 text-xs font-sans">
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input 
                    id="subject"
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject..."
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/55 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-800 font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="messageText" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea 
                    id="messageText"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Ask Halima for advice or clarification on this review..."
                    rows={4}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50/55 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-800 leading-relaxed font-semibold"
                    required
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsClarificationOpen(false)}
                    className="flex-1 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl font-bold transition-all text-slate-600 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={sending}
                    className="flex-1 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                  >
                    {sending ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
