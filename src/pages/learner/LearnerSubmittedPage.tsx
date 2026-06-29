import React, { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { 
  Check, 
  ChevronRight, 
  Search, 
  Bell, 
  Clock, 
  ArrowLeft, 
  FileText, 
  X,
  MessageSquare,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Info,
  AlertCircle,
  Calendar,
  User,
  Download,
  BookOpen,
  Compass,
  AlertTriangle,
  Eye,
  Wifi,
  FileDown,
  Lock,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCheck,
  HelpCircle,
  TrendingUp,
  Sprout
} from "lucide-react";

export default function LearnerSubmittedPage() {
  const { navigateTo } = useRoute();
  
  // States
  const [isAnswersExpanded, setIsAnswersExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "message_facilitator" | "request_revision" | "view_full_written" | "pdf_viewer" | null
  >(null);
  const [msgSubject, setMsgSubject] = useState("Question about Work Readiness Assessment Submission");
  const [msgBody, setMsgBody] = useState("");
  const [revisionReason, setRevisionReason] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgBody.trim()) {
      showToast("Please enter a message body.", "info");
      return;
    }
    setActiveModal(null);
    showToast("Message sent successfully. Halima Sani will respond shortly.", "success");
    setMsgBody("");
  };

  const handleRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionReason.trim()) {
      showToast("Please explain why you are requesting a revision.", "info");
      return;
    }
    setActiveModal(null);
    showToast("Revision support request submitted. You will be contacted within 24 hours.", "success");
    setRevisionReason("");
  };

  const sampleQuestions = [
    {
      id: "Q01",
      num: "QUESTION 01",
      type: "MULTIPLE CHOICE",
      text: "Which of the following is most important when preparing for an interview in the agricultural sector?",
      selectedAnswer: "Understanding local market supply chains",
      isCorrect: true,
      locked: true
    },
    {
      id: "Q02",
      num: "QUESTION 02",
      type: "MULTIPLE CHOICE",
      text: "Which of the following represents the correct order of the Agribusiness value chain?",
      selectedAnswer: "Input Supply → Production → Processing → Marketing",
      isCorrect: true,
      locked: true
    },
    {
      id: "Q03",
      num: "QUESTION 03",
      type: "TRUE / FALSE",
      text: "A learner should confirm the correct session before marking attendance.",
      selectedAnswer: "True",
      isCorrect: true,
      locked: true
    },
    {
      id: "Q04",
      num: "QUESTION 04",
      type: "SHORT ANSWER",
      text: "Explain why preparation matters before an interview.",
      selectedAnswer: "Preparation helps reduce avoidable issues and supports confident communication.",
      isCorrect: true,
      locked: true
    },
    {
      id: "Q05",
      num: "QUESTION 05",
      type: "WRITTEN RESPONSE (STAR)",
      text: "Describe a time you handled a difficult situation in a professional or community environment.",
      selectedAnswer: `"During my internship at the Lagos Agri-Hub, I was responsible for coordinating a small group of vendors. One afternoon, a logistics error meant that two deliveries of organic fertilizer arrived simultaneously, blocking the main loading bay and causing a bottleneck. I immediately stepped in, calmed the frustrated drivers, and negotiated a temporary parking spot with an adjacent farm manager while directing the loading crew. Within 45 minutes, we cleared the bay and restored the schedules. This showed my ability to make quick decisions and coordinate effectively under pressure."`,
      wordCount: "512 / 700",
      isCorrect: true,
      locked: true,
      isSTAR: true
    },
    {
      id: "Q06",
      num: "QUESTION 06",
      type: "SELECTION",
      text: "Which tools are recommended for real-time crop health tracking?",
      selectedAnswer: "Multispectral drone imaging and localized soil sensors",
      isCorrect: true,
      locked: true
    },
    {
      id: "Q07",
      num: "QUESTION 07",
      type: "REFLECTION",
      text: "How do you intend to apply agribusiness logistics concepts in your future career?",
      selectedAnswer: "I plan to optimize distribution routes for local smallholder farming cooperatives in my community to minimize post-harvest food waste.",
      isCorrect: true,
      locked: true
    },
    {
      id: "Q08",
      num: "QUESTION 08",
      type: "EVIDENCE PORTFOLIO",
      text: "Upload your updated CV and professional cover letter.",
      files: [
        { name: "Aisha_M_CV_2024.pdf", size: "1.2 MB" },
        { name: "Cover_Letter_AgriIntern.pdf", size: "840 KB" }
      ],
      locked: true,
      isEvidence: true
    }
  ];

  return (
    <div id="submitted-view-root" className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col pb-16 lg:pb-0">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-250 max-w-sm">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 border-l-4 border-l-sustain-900 flex items-start gap-3">
            <div className="p-1.5 bg-emerald-50 text-emerald-950 rounded-lg shrink-0">
              <Check className="h-4.5 w-4.5 text-sustain-900" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-normal">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 ml-auto p-0.5">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. DESKTOP LAYOUT (LARGE SCREEN)                          */}
      {/* ========================================================= */}
      <div className="hidden lg:flex flex-1 min-h-screen">
        <LearnerSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 max-w-7xl mx-auto w-full px-8 py-6">
          
          {/* Topbar */}
          <header className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="relative w-80">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search submissions, feedback, or resources..." 
                className="w-full bg-slate-150/40 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:border-sustain-900 focus:ring-1 focus:ring-sustain-900 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => showToast("No new notifications.", "success")}
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-amber-500 rounded-full border-2 border-white"></span>
              </button>
              <button 
                onClick={() => showToast("Help system is active locally.", "success")}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
              >
                <HelpCircle className="h-4.5 w-4.5" />
              </button>
              
              <div className="h-8 w-px bg-slate-200"></div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 font-heading">Aisha Mohammed</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Learner ID: #SU-8821</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop" 
                  alt="Aisha Mohammed" 
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-sustain-900/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </header>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-5">
            <span onClick={() => navigateTo("/learner/assessments")} className="hover:text-sustain-900 cursor-pointer transition-colors">
              Assessments
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")} className="hover:text-sustain-900 cursor-pointer transition-colors">
              Work Readiness Assessment
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-slate-600 font-extrabold">Submitted</span>
          </div>

          {/* Badge Pills Row */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-sustain-900 border border-sustain-200 text-[11px] font-bold px-3 py-1 rounded-full">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              Submitted for review
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold px-3 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              Awaiting facilitator review
            </span>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold px-3 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              4 CPD credits pending
            </span>
          </div>

          {/* Page Hero Description */}
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">Assessment Submitted</h1>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1.5 max-w-3xl">
              Your responses have been sent to <span className="font-semibold text-slate-800">Halima Sani</span> for review. You will be notified when feedback is ready.
            </p>
          </div>

          {/* Horizontal Meta Info Table Row */}
          <div className="border-y border-slate-150 py-5 grid grid-cols-4 gap-6 mb-8 text-xs font-semibold">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Course</p>
              <p className="text-slate-800 font-bold">Work Readiness Foundation</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Module</p>
              <p className="text-slate-800 font-bold">Preparing for Interviews</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Submitted</p>
              <p className="text-slate-800 font-bold">Today, 09:42 AM</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Facilitator</p>
              <p className="text-slate-800 font-bold">Halima Sani</p>
            </div>
          </div>

          {/* Hero Button Row */}
          <div className="flex gap-3.5 mb-8">
            <button 
              onClick={() => {
                const element = document.getElementById("desktop-submitted-answers-header");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 bg-sustain-900 hover:bg-sustain-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              <span>View Submitted Answers</span>
            </button>
            <button 
              onClick={() => navigateTo("/learner/assessments")}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-sustain-200 text-sustain-900 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <span>Back to Assessments</span>
            </button>
          </div>

          {/* Main Grid: Left Column 2/3, Right Column 1/3 */}
          <div className="grid grid-cols-12 gap-8 items-start pb-24">
            
            {/* Left Column (col-span-8) */}
            <div className="col-span-8 space-y-8">
              
              {/* Highlight Status Boxes (4 column subgrid) */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold mb-1">Status</span>
                  <span className="text-sm font-extrabold text-sustain-900 block">Submitted</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold mb-1">Questions</span>
                  <span className="text-sm font-extrabold text-slate-800 block">8 of 8</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold mb-1">Stage</span>
                  <span className="text-sm font-extrabold text-slate-800 block">Facilitator Review</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold mb-1">CPD Credits</span>
                  <span className="text-sm font-extrabold text-amber-700 block">4 Pending</span>
                </div>
              </div>

              {/* Review Timeline Card */}
              <Card className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
                <h3 className="text-base font-extrabold text-slate-900 font-heading mb-6">Review Timeline</h3>
                
                <div className="relative border-l border-slate-150 pl-6 ml-3 space-y-6">
                  
                  {/* Item 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 bg-emerald-50 border border-sustain-250 h-5 w-5 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-sustain-900 stroke-[3px]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Assessment submitted</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Completed Today, 09:42 AM</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 bg-emerald-50 border border-sustain-250 h-5 w-5 rounded-full flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-sustain-900 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Objective answer check</h4>
                      <p className="text-[10px] text-slate-500 font-medium">In progress (automated system validation)</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 bg-white border border-slate-250 h-5 w-5 rounded-full" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 font-medium">Facilitator review</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Pending: Halima Sani</p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 bg-white border border-slate-250 h-5 w-5 rounded-full" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 font-medium">Feedback released</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Pending notification</p>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 bg-white border border-slate-250 h-5 w-5 rounded-full" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 font-medium">CPD record updated</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Pending completion of review</p>
                    </div>
                  </div>

                </div>
              </Card>

              {/* Submitted Answers Heading Block */}
              <div id="desktop-submitted-answers-header" className="pt-2 border-t border-slate-150">
                <h3 className="text-base font-extrabold text-slate-900 font-heading">Submitted Answers</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Read-only view of your assessment submission</p>
              </div>

              {/* Question list summaries */}
              <div className="space-y-4">
                {sampleQuestions
                  .slice(0, isAnswersExpanded ? sampleQuestions.length : 3)
                  .map((q) => (
                    <Card key={q.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs relative">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          {q.num} • {q.type}
                        </span>
                        <Lock className="h-3.5 w-3.5 text-slate-350" />
                      </div>
                      
                      <h4 className="text-xs font-bold text-slate-800 leading-normal mb-3">{q.text}</h4>

                      {q.isEvidence ? (
                        <div className="grid grid-cols-2 gap-3.5">
                          {q.files?.map((file, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-between">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="h-8 w-8 rounded-lg bg-sustain-50 border border-sustain-200 text-sustain-900 flex items-center justify-center shrink-0">
                                  <FileText className="h-4.5 w-4.5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[11px] font-bold text-slate-900 truncate">{file.name}</p>
                                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{file.size}</p>
                                </div>
                              </div>
                              <button 
                                onClick={() => showToast(`Opening ${file.name} in simulated preview.`, "success")}
                                className="p-1.5 bg-white border border-slate-250 text-slate-500 hover:text-slate-800 hover:border-slate-350 rounded-lg shadow-3xs transition-all cursor-pointer"
                                title="View Document"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : q.isSTAR ? (
                        <div className="space-y-2">
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 leading-relaxed font-semibold text-xs text-slate-600 blockquote italic">
                            {q.selectedAnswer}
                          </div>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                              Word count: {q.wordCount}
                            </span>
                            <button 
                              onClick={() => {
                                setMsgSubject(`Question about response to Question 5`);
                                setMsgBody("");
                                setActiveModal("view_full_written");
                              }}
                              className="text-xs font-bold text-sustain-900 hover:text-sustain-800 underline cursor-pointer"
                            >
                              Read Full Submission
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-sustain-50/20 border border-sustain-100 flex items-center justify-between gap-3 text-xs font-semibold text-slate-800">
                          <div className="flex items-center gap-2.5">
                            <div className="h-5 w-5 rounded-full bg-sustain-900 text-white flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </div>
                            <span>{q.selectedAnswer}</span>
                          </div>
                          <button 
                            onClick={() => showToast("Viewing full detailed response context.", "success")}
                            className="text-slate-400 hover:text-sustain-900 text-[11px] font-bold tracking-tight cursor-pointer"
                          >
                            View Answer
                          </button>
                        </div>
                      )}
                    </Card>
                  ))}

                {/* Show All Toggle Button */}
                <button
                  onClick={() => setIsAnswersExpanded(!isAnswersExpanded)}
                  className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isAnswersExpanded ? "Collapse Answers View" : "View All 8 Answers"}</span>
                  {isAnswersExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>

            </div>

            {/* Right Column (col-span-4) */}
            <div className="col-span-4 space-y-6">
              
              {/* Review Status Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-heading">Review Status</h3>
                </div>

                <div className="space-y-3 text-xs font-semibold">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500">Assigned to:</span>
                    <span className="text-slate-800 font-bold">Halima Sani</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500">Review window:</span>
                    <span className="text-slate-800 font-bold">3-5 Working Days</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500">Current Priority:</span>
                    <span className="bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                      Normal
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setMsgSubject("Question about my Work Readiness Assessment Submission");
                    setMsgBody("");
                    setActiveModal("message_facilitator");
                  }}
                  className="w-full py-2.5 bg-white border border-sustain-200 hover:bg-sustain-50 hover:text-sustain-900 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>Message Facilitator</span>
                </button>
              </div>

              {/* Journey Progression Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-heading">Journey Progression</h3>
                
                <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                    <span className="text-[10px] text-amber-900 uppercase font-bold tracking-wider">Next Module Locked</span>
                  </div>
                  <p className="text-slate-600 leading-normal text-[11px] font-semibold">
                    &apos;Advanced Agribusiness Negotiation&apos; will unlock automatically once this assessment is graded with a passing score.
                  </p>
                </div>
              </div>

              {/* Related Resources Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-heading">Related Resources</h3>
                
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <BookOpen className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">Assessment Guide</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">PDF • 2.4 MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Downloading Assessment Guide PDF.", "success")}
                      className="text-slate-400 hover:text-slate-800 cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">Module Summary</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Interactive Doc</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Opening interactive module summary.", "success")}
                      className="text-slate-400 hover:text-slate-800 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Need to make a change? Revision support */}
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 space-y-3 text-left">
                <h4 className="text-xs font-bold text-slate-900 font-heading">Need to make a change?</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  If you realized you uploaded the wrong document or want to refine an answer, you can request a revision.
                </p>
                <button 
                  onClick={() => {
                    setRevisionReason("");
                    setActiveModal("request_revision");
                  }}
                  className="text-xs font-extrabold text-sustain-900 hover:text-sustain-800 flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>Request Revision Support</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>


      {/* ========================================================= */}
      {/* 2. TABLET & MOBILE LAYOUT                                 */}
      {/* ========================================================= */}
      <div className="lg:hidden flex flex-col flex-1">
        
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="bg-sustain-900 text-white p-1.5 rounded-lg shrink-0">
              <Sprout className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-sustain-900 tracking-tight font-heading">SUSTAIN LMS</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => showToast("No new notifications.", "success")}
              className="relative p-1 text-slate-500 hover:text-slate-800 rounded-lg"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-amber-500 rounded-full border-2 border-white"></span>
            </button>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop" 
              alt="Aisha Mohammed" 
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-sustain-900/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </header>

        {/* Green Banner Area */}
        <div className="bg-sustain-900 text-white px-5 py-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Check className="h-5 w-5 text-emerald-300 stroke-[3px]" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-250 block">
                Assessment Submitted
              </span>
              <h2 className="text-lg font-black font-heading leading-tight">
                Work Readiness Assessment
              </h2>
              <p className="text-[11px] text-emerald-100 font-medium">
                Submitted on Oct 24, 2023 • 14:32 PM
              </p>
            </div>
          </div>

          {/* Module Pills */}
          <div className="flex gap-2 pt-1">
            <span className="bg-white/15 text-white font-bold text-[10px] px-3 py-1 rounded-full border border-white/5">
              Module 4
            </span>
            <span className="bg-white/15 text-white font-bold text-[10px] px-3 py-1 rounded-full border border-white/5">
              Career Path
            </span>
          </div>
        </div>

        {/* Scrollable Mobile Body Content */}
        <div className="px-4 py-5 space-y-6 max-w-2xl mx-auto w-full">
          
          {/* Card: Awaiting Review */}
          <Card className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Awaiting Review</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Estimated: 48 Hours</p>
              </div>
            </div>
            <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              In Progress
            </span>
          </Card>

          {/* Row of 2 Small Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Questions</span>
              <span className="text-base font-extrabold text-slate-800">15 / 15</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Time Spent</span>
              <span className="text-base font-extrabold text-slate-800">42 mins</span>
            </div>
          </div>

          {/* Submissions Section Header */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 font-heading pl-1">Your Submissions</h3>

            {/* Q01 Mobile View */}
            <Card className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs space-y-2.5 relative">
              <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <span>QUESTION 01</span>
                <Lock className="h-3.5 w-3.5 text-slate-350" />
              </div>
              <p className="text-xs font-bold text-slate-800 leading-normal">
                Describe your approach to managing a multi-disciplinary team on a poultry farm.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 text-xs font-semibold text-slate-600 blockquote italic leading-relaxed">
                &quot;I believe the core of managing such a team lies in clear communication...&quot;
              </div>
            </Card>

            {/* Q02 Mobile View */}
            <Card className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs space-y-2.5 relative">
              <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <span>QUESTION 02</span>
                <Lock className="h-3.5 w-3.5 text-slate-350" />
              </div>
              <p className="text-xs font-bold text-slate-800 leading-normal">
                Which of the following represents the correct order of the Agribusiness value chain?
              </p>
              <div className="p-3 rounded-xl bg-sustain-50/30 border border-sustain-150 flex items-center gap-2.5 text-xs font-semibold text-slate-850">
                <div className="h-4.5 w-4.5 rounded-full bg-sustain-900 text-white flex items-center justify-center shrink-0">
                  <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                </div>
                <span>Input Supply → Production → Processing → Marketing</span>
              </div>
            </Card>

            {/* Expandable answers inline stack */}
            {isAnswersExpanded && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {sampleQuestions.slice(2).map((q) => (
                  <Card key={q.id} className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-2xs space-y-2.5 relative">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      <span>{q.num}</span>
                      <Lock className="h-3.5 w-3.5 text-slate-350" />
                    </div>
                    <p className="text-xs font-bold text-slate-800 leading-normal">
                      {q.text}
                    </p>
                    {q.isEvidence ? (
                      <div className="space-y-2.5">
                        {q.files?.map((file, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-700 truncate mr-2">{file.name}</span>
                            <span className="text-[9px] text-slate-400 font-bold tracking-wider">{file.size}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-150 text-xs font-semibold text-slate-650 leading-relaxed italic">
                        {q.selectedAnswer}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* View All answers toggle */}
            <button
              onClick={() => setIsAnswersExpanded(!isAnswersExpanded)}
              className="w-full text-center text-xs font-extrabold text-sustain-900 hover:text-sustain-850 py-1 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{isAnswersExpanded ? "Collapse Submission View" : "View All 15 Answers"}</span>
              {isAnswersExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Timeline Section */}
          <div className="space-y-3.5">
            <h3 className="text-base font-extrabold text-slate-900 font-heading pl-1">Review Timeline</h3>
            
            <Card className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
              <div className="relative border-l border-slate-150 pl-5 ml-2.5 space-y-5 text-xs font-semibold">
                
                <div className="relative">
                  <div className="absolute -left-[27px] top-0.5 h-4.5 w-4.5 bg-sustain-900 text-white rounded-full flex items-center justify-center shadow-3xs">
                    <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold">Assessment Completed</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Oct 24 • 14:32</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-0.5 h-4.5 w-4.5 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-3xs">
                    <Clock className="h-2.5 w-2.5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-amber-850">Review Initiated</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Queued for Specialist Review</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-0.5 h-4.5 w-4.5 bg-slate-100 border border-slate-250 rounded-full" />
                  <div>
                    <h4 className="text-slate-400 font-semibold">Final Feedback Issued</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Est. Oct 26</p>
                  </div>
                </div>

              </div>
            </Card>
          </div>

          {/* What's Next Section */}
          <div className="space-y-3.5">
            <h3 className="text-base font-extrabold text-slate-900 font-heading pl-1">What&apos;s Next?</h3>

            <Card className="bg-blue-50/50 border border-blue-150 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 bg-emerald-50 rounded-lg text-sustain-900 flex items-center justify-center shrink-0 border border-sustain-200">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold text-slate-650 leading-relaxed">
                  Great job completing the assessment! While our educators review your work, you can continue exploring the <span className="text-sustain-900 font-bold">Farm Logistics module</span>.
                </p>
              </div>

              {/* Progress Tracker Card Inner block */}
              <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-heading">
                    Progress to Certificate
                  </span>
                  <span className="text-xs font-black text-sustain-900">85%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sustain-900 rounded-full" style={{ width: "85%" }} />
                </div>
                <p className="text-[10px] text-slate-400 font-semibold leading-snug">
                  Complete this review to unlock the Final Certification exam.
                </p>
              </div>
            </Card>
          </div>

          {/* Prepare for Results Slider row */}
          <div className="space-y-3.5 pb-20">
            <h3 className="text-base font-extrabold text-slate-900 font-heading pl-1">Prepare for Results</h3>
            
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x whitespace-nowrap">
              
              {/* Card 1 */}
              <div className="inline-block w-64 bg-white border border-slate-200 rounded-2xl overflow-hidden shrink-0 snap-start text-left shadow-3xs">
                <img 
                  src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500&h=320&fit=crop" 
                  alt="Agriculture notes" 
                  className="h-32 w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4.5 space-y-1 whitespace-normal">
                  <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1">Interview Excellence Guide</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">15 Pages • PDF Document</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-normal line-clamp-2 mt-1">
                    Master the 10 most common interview topics in professional agribusiness logistics.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="inline-block w-64 bg-white border border-slate-200 rounded-2xl overflow-hidden shrink-0 snap-start text-left shadow-3xs">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=320&fit=crop" 
                  alt="Career guide" 
                  className="h-32 w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4.5 space-y-1 whitespace-normal">
                  <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1">Agribusiness Career Pathways</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Interactive Map • Tool</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-normal line-clamp-2 mt-1">
                    Explore high-growth management careers and roles in domestic logistics.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Floating/Sticky Mobile Button Footer */}
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex gap-3 shadow-md">
          <button 
            onClick={() => navigateTo("/learner/assessments")}
            className="flex-1 h-11 bg-white hover:bg-slate-50 border border-slate-250 text-slate-700 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <button 
            onClick={() => setIsAnswersExpanded(!isAnswersExpanded)}
            className="flex-1 h-11 bg-sustain-900 hover:bg-sustain-850 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>{isAnswersExpanded ? "Hide Answers" : "View Answers"}</span>
          </button>
        </div>

        {/* Real Bottom Navigation Mobile Bar */}
        <LearnerMobileNav />

      </div>

      {/* ========================================================= */}
      {/* MODAL DIALOGS                                            */}
      {/* ========================================================= */}
      
      {/* 1. MESSAGE FACILITATOR MODAL */}
      {activeModal === "message_facilitator" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900 font-heading">Message Facilitator</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">To</label>
                <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-2">
                  <User className="h-4 w-4 text-sustain-900" />
                  <span>Halima Sani (Facilitator)</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Subject</label>
                <input 
                  type="text" 
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-sustain-900 focus:ring-1 focus:ring-sustain-900"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Message</label>
                <textarea 
                  rows={4}
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  placeholder="Ask a question about your assessment review timeline or file submission..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sustain-900 focus:ring-1 focus:ring-sustain-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4.5 py-2 bg-sustain-900 hover:bg-sustain-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. REQUEST REVISION MODAL */}
      {activeModal === "request_revision" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900 font-heading">Request Revision Support</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRequestRevision} className="p-6 space-y-4">
              <div className="p-3.5 bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 rounded-xl leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="h-4.5 w-4.5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Important note:</span> Revisions must be approved by your facilitator before your attempt is unlocked for editing.
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Reason for Revision Request</label>
                <textarea 
                  rows={5}
                  value={revisionReason}
                  onChange={(e) => setRevisionReason(e.target.value)}
                  placeholder="Explain why you need to revise your answers or replace submitted evidence files (e.g. uploaded the wrong file, need to correct a response)..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sustain-900 focus:ring-1 focus:ring-sustain-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4.5 py-2 bg-sustain-900 hover:bg-sustain-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. VIEW FULL WRITTEN RESPONSE MODAL */}
      {activeModal === "view_full_written" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading">Question 5 Submission</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Written Response (STAR Method)</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[450px] overflow-y-auto">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Question Text</p>
                <p className="text-xs font-bold text-slate-800 leading-normal">
                  Describe a time you handled a difficult situation in a professional or community environment.
                </p>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-3">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Submitted Response</p>
                
                <div className="space-y-3 text-xs text-slate-750 font-semibold leading-relaxed">
                  <p>
                    <span className="text-sustain-900 font-bold">Situation:</span> During my internship at the Lagos Agri-Hub, I was responsible for coordinating a small group of vendors. One afternoon, a logistics error meant that two deliveries of organic fertilizer arrived simultaneously, blocking the main loading bay and causing a bottleneck.
                  </p>
                  <p>
                    <span className="text-sustain-900 font-bold">Task:</span> We needed to maintain safe access for local farmers and prevent long vehicle queues from spilling onto the adjacent rural public road.
                  </p>
                  <p>
                    <span className="text-sustain-900 font-bold">Action:</span> I immediately stepped in, calmed the frustrated drivers, and negotiated a temporary parking spot with an adjacent farm manager while directing the loading crew. I structured the flow of incoming trucks manually to prioritize the load that could be discharged quickest.
                  </p>
                  <p>
                    <span className="text-sustain-900 font-bold">Result:</span> Within 45 minutes, we cleared the loading bay completely, resolved the dispute between drivers, and restored normal schedules with zero safety incidents.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span>Total Words: 512</span>
                <span className="text-sustain-900">Word Limit Checked</span>
              </div>
            </div>

            <div className="flex justify-end px-6 py-4 border-t border-slate-100">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
