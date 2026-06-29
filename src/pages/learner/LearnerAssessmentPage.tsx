/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Check, 
  HelpCircle, 
  BookOpen, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  Bell, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Download, 
  Menu, 
  X,
  Award,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Activity,
  GraduationCap,
  Users,
  CheckCircle2,
  Lock,
  MessageSquare,
  FileText,
  PlayCircle,
  ExternalLink,
  Send,
  Wifi,
  Bookmark,
  Shield,
  Briefcase
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { Card } from "../../components/ui/Card";

export default function LearnerAssessmentPage() {
  const { navigateTo } = useRoute();
  
  // Simulated State for Interactive Prototype
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [textOnlyMode, setTextOnlyMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Message Form State
  const [messageSubject, setMessageSubject] = useState("Question about Work Readiness Assignment");
  const [messageBody, setMessageBody] = useState("");

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      showToast("Please enter a message.", "info");
      return;
    }
    setIsMessageModalOpen(false);
    setMessageBody("");
    showToast("Message sent locally in this frontend prototype. Facilitator Halima Sani notified.", "success");
  };

  return (
    <div 
      id="learner-assessment-instructions-root" 
      className={`min-h-screen bg-slate-50 text-slate-950 font-sans relative antialiased selection:bg-emerald-150 selection:text-emerald-950 ${
        textOnlyMode ? "contrast-125 saturate-50" : ""
      }`}
    >
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-250 max-w-sm">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 border-l-4 border-l-emerald-700 flex items-start gap-3">
            <div className="p-1.5 bg-emerald-50 text-emerald-900 rounded-lg shrink-0">
              <Check className="h-4.5 w-4.5 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-normal">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* 1. DESKTOP VIEW */}
      <div className="hidden lg:flex min-h-screen">
        <LearnerSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
            <div className="w-96 relative">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search assessments, guides..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white focus:border-emerald-700 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigateTo("/learner/notifications")}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl relative transition-all"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-700 rounded-full"></span>
              </button>
              
              <button 
                onClick={() => setIsGuideModalOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all"
                title="Help"
              >
                <HelpCircle className="h-4.5 w-4.5" />
              </button>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">Aisha Mohammed</p>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">SUST-LRN-0442</p>
                </div>
                <div 
                  onClick={() => navigateTo("/learner/profile")}
                  className="h-9 w-9 bg-emerald-900 text-white font-extrabold rounded-full flex items-center justify-center text-xs shadow-sm cursor-pointer hover:bg-emerald-800 transition-all"
                >
                  AM
                </div>
              </div>
            </div>
          </header>

          {/* Main Dashboard Layout */}
          <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8 items-start">
              
              {/* Left Column (Main Content) */}
              <div className="space-y-8">
                
                {/* HERO CARD */}
                <Card className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6 text-left">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-heading">
                      <span onClick={() => navigateTo("/learner/assessments")} className="hover:text-emerald-900 cursor-pointer transition-colors">
                        Assessments
                      </span>
                      <ChevronRight className="h-3 w-3 text-slate-300" />
                      <span className="text-emerald-900">Work Readiness Assignment</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Draft started
                      </span>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Certificate-linked
                      </span>
                      <span className="bg-indigo-50 border border-indigo-100 text-indigo-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        4 CPD credits pending
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-none font-heading">
                      Work Readiness Assignment
                    </h2>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                      Read the brief, check the requirements, and continue your draft when you are ready.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider block font-bold">Course</span>
                        <span className="text-slate-800 font-bold">Work Readiness Foundation</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider block font-bold">Lesson</span>
                        <span className="text-slate-800 font-bold">Preparing for Interviews</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider block font-bold">Due Date</span>
                        <span className="text-red-600 font-extrabold">24 Oct 2026</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 tracking-wider block font-bold">Facilitator</span>
                        <span className="text-slate-800 font-bold">Halima Sani</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button 
                        onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                        className="bg-[#005C45] hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all shadow-xs cursor-pointer min-h-[42px] flex items-center justify-center gap-1"
                      >
                        <span>Continue Draft</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => navigateTo("/learner/assessments")}
                        className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer min-h-[42px] flex items-center justify-center"
                      >
                        Back to Assessments
                      </button>
                    </div>
                  </div>
                </Card>

                {/* ASSIGNMENT BRIEF */}
                <Card className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-6">
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                    <FileText className="h-5 w-5 text-emerald-800 shrink-0" />
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Assignment Brief</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    Effective workplace communication is the backbone of successful agribusiness operations. In this assignment, you are required to reflect on a real-world scenario where you demonstrated professional problem-solving and communication skills.
                  </p>

                  {/* Task Panel */}
                  <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-emerald-900 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">✓</div>
                      <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Your Task</span>
                    </div>
                    <div className="space-y-3 pl-7">
                      <p className="text-xs md:text-sm font-bold text-slate-900 leading-relaxed">
                        Describe a specific professional challenge you faced using the STAR method. You must focus on a situation relevant to agribusiness, value chain management, or community outreach.
                      </p>
                      <ul className="space-y-2 text-xs text-slate-600 font-medium list-disc pl-4">
                        <li>Describe the <strong className="text-slate-900 font-semibold">Situation</strong> clearly</li>
                        <li>Detail the <strong className="text-slate-900 font-semibold">Task</strong> you were responsible for</li>
                        <li>Explain the <strong className="text-slate-900 font-semibold">Action</strong> you personally took</li>
                        <li>Show the <strong className="text-slate-900 font-semibold">Result</strong> and what you learned</li>
                      </ul>
                    </div>
                  </div>

                  {/* Note Panel */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50/40 border border-blue-100 rounded-xl text-xs font-medium text-slate-600">
                    <AlertCircle className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                    <p>
                      Note: We encourage you to use specific agribusiness examples from your recent fieldwork or internships.
                    </p>
                  </div>
                </Card>

                {/* HOW TO STRUCTURE YOUR ANSWER */}
                <div className="space-y-5 text-left">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">How to Structure Your Answer</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { l: "S", t: "Situation", c: "What was happening? Provide context and key details." },
                      { l: "T", t: "Task", c: "What were you specifically responsible for in this case?" },
                      { l: "A", t: "Action", c: "What did you actually do? Use \"I\" statements, not \"We\"." },
                      { l: "R", t: "Result", c: "What changed or was achieved? Quantify if possible." }
                    ].map((step, idx) => (
                      <Card key={idx} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3 flex flex-col items-center text-center transition-all hover:border-emerald-200">
                        <div className="h-10 w-10 rounded-full bg-emerald-50 text-[#005C45] font-extrabold flex items-center justify-center text-sm shadow-2xs">
                          {step.l}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{step.t}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                          {step.c}
                        </p>
                      </Card>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500 italic font-medium">
                    Tip: Focus on clear, complete responses over perfect academic wording.
                  </p>
                </div>

                {/* SUBMISSION REQUIREMENTS */}
                <Card className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-6">
                  <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-800 shrink-0" />
                    <h3 className="text-lg font-bold text-slate-900 font-heading">Submission Requirements</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { t: "Use the STAR structure", d: "Must follow the 4-part framework" },
                      { t: "Explain your personal role", d: "Clarity on individual contribution" },
                      { t: "400–700 words", d: "Comprehensive but concise" },
                      { t: "Confirm declaration", d: "Must sign the anti-plagiarism form" }
                    ].map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-1 bg-emerald-50 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{req.t}</h4>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{req.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* HOW THIS WILL BE REVIEWED */}
                <Card className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-800 shrink-0" />
                      <h3 className="text-lg font-bold text-slate-900 font-heading">How This Will Be Reviewed</h3>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                      70% Pass
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 items-stretch">
                    {/* Criteria list */}
                    <div className="space-y-4 flex flex-col justify-center">
                      {[
                        { title: "Clear explanation", weight: 25 },
                        { title: "Practical action", weight: 30 },
                        { title: "Reflection", weight: 25 },
                        { title: "Professional communication", weight: 20 }
                      ].map((crit, idx) => (
                        <div key={idx} className="space-y-2 pb-3 border-b border-slate-100 last:border-b-0">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-800 font-semibold">{crit.title}</span>
                            <span className="text-emerald-800 font-bold font-mono">{crit.weight}%</span>
                          </div>
                          {/* Subtle progress bar */}
                          <div className="w-full h-1.5 bg-slate-150 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${crit.weight}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reviewer Card */}
                    <div className="bg-emerald-50/40 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" 
                          alt="Halima Sani"
                          className="h-16 w-16 rounded-full object-cover ring-2 ring-emerald-600/20 shadow-md"
                        />
                        <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-flex items-center bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                          Primary Reviewer
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 pt-1 leading-none">Halima Sani</h4>
                        <p className="text-xs text-slate-500 font-medium">Senior Facilitator, Agribusiness</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* PROGRESSION REQUIREMENT */}
                <Card className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">Progression Requirement</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Completion of this assignment is mandatory to unlock the <strong className="text-slate-800 font-semibold">'Sustainable Value Chains'</strong> module.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider font-heading">Lesson Checkpoint</span>
                        <h4 className="text-xs font-bold text-slate-800">Complete</h4>
                      </div>
                      <div className="h-7 w-7 rounded-full bg-emerald-900 text-white flex items-center justify-center shrink-0">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider font-heading">Assignment & Review</span>
                        <h4 className="text-xs font-bold text-slate-800">Action Required</h4>
                      </div>
                      <div className="h-7 w-7 rounded-full bg-amber-700 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                        !
                      </div>
                    </div>
                  </div>
                </Card>

              </div>

              {/* Right Column (Sidebar Widgets) */}
              <div className="space-y-6">
                
                {/* ASSESSMENT STATUS */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Assessment Status</h3>
                    <span className="text-xs font-bold text-slate-400">70% Complete</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-950 font-bold">70% Complete</span>
                      <span className="text-slate-500">Draft Phase</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-800 rounded-full" style={{ width: "70%" }} />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed leading-snug">
                    Your draft has been started. Complete the required sections and declaration before submitting for facilitator review.
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-semibold">
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span className="text-slate-700">Draft response</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">Complete</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                        <span className="text-slate-700">Evidence (Optional)</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">Complete</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                        <span className="text-slate-700">Declaration</span>
                      </div>
                      <span className="bg-amber-50 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">Pending</span>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-slate-400 font-medium">Submission</span>
                      </div>
                      <span className="bg-slate-100 text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">Locked</span>
                    </div>
                  </div>
                </Card>

                {/* READY TO CONTINUE? */}
                <div className="p-6 bg-emerald-850 text-white rounded-2xl shadow-sm text-left space-y-4">
                  <h3 className="text-lg font-bold text-white font-heading">Ready to Continue?</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Your current progress is saved. Click below to return to your editor and finish the final sections.
                  </p>

                  <button 
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                    className="w-full h-11 bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-800 font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-800"
                  >
                    Continue Draft
                  </button>
                </div>

                {/* ASSESSMENT DETAILS */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-3.5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading pb-2 border-b border-slate-100">
                    Assessment Details
                  </h3>

                  <div className="space-y-2.5 text-xs font-semibold">
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Type</span>
                      <span className="text-slate-900">Written Reflection</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Due Date</span>
                      <span className="text-red-500 font-extrabold">24 Oct 2026</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">CPD Credits</span>
                      <span className="text-slate-900">4 Credits</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Attempts</span>
                      <span className="text-slate-900">1 of 3 used</span>
                    </div>
                  </div>
                </Card>

                {/* NEED HELP? */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading pb-2 border-b border-slate-100">
                    Need Help?
                  </h3>

                  <div className="space-y-1">
                    <button 
                      onClick={() => setIsMessageModalOpen(true)}
                      className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-all text-xs font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4.5 w-4.5 text-slate-400" />
                        <span>Message Halima Sani</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>

                    <button 
                      onClick={() => setIsGuideModalOpen(true)}
                      className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-all text-xs font-bold text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-4.5 w-4.5 text-slate-400" />
                        <span>Open Reflection Guide</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>
                  </div>
                </Card>

                {/* CONNECTIVITY TOOLS */}
                <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading pb-2 border-b border-slate-100">
                    Connectivity Tools
                  </h3>

                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed leading-snug">
                    Experiencing slow internet? Download the brief for offline use.
                  </p>

                  <div className="space-y-3 pt-1">
                    <button 
                      onClick={() => showToast("PDF guide download simulated in this frontend prototype.", "success")}
                      className="w-full flex items-center justify-center gap-2 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-[#005C45] font-bold text-xs py-2 rounded-xl transition-all"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download PDF Guide</span>
                    </button>

                    <label className="flex items-center justify-between p-1 select-none cursor-pointer">
                      <span className="text-xs font-bold text-slate-700">Text-only Mode</span>
                      <button 
                        role="switch"
                        aria-checked={textOnlyMode}
                        onClick={() => {
                          setTextOnlyMode(!textOnlyMode);
                          showToast(textOnlyMode ? "Standard theme mode activated." : "Text-only Mode activated. Theme simplified.", "info");
                        }}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                          textOnlyMode ? "bg-[#005C45]" : "bg-slate-200"
                        }`}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white transition-transform ${
                          textOnlyMode ? "translate-x-4" : "translate-x-0"
                        }`} />
                      </button>
                    </label>
                  </div>
                </Card>

              </div>

            </div>
          </main>
        </div>
      </div>

      {/* 2. TABLET VIEW (md to lg) */}
      <div className="hidden md:block lg:hidden min-h-screen pb-28">
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-emerald-900 tracking-tight">SUSTAIN LMS</span>
            <span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-150 py-0.5 px-2 rounded-md uppercase tracking-wider">
              Youth Employability
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg relative"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-900 rounded-full"></span>
            </button>
            <div 
              onClick={() => navigateTo("/learner/profile")}
              className="h-8 w-8 bg-emerald-900 text-white font-bold rounded-full flex items-center justify-center text-[11px] shadow-sm cursor-pointer"
            >
              AM
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-6 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-heading text-left">
            <span onClick={() => navigateTo("/learner/assessments")} className="hover:text-emerald-900 cursor-pointer">
              Assessments
            </span>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-emerald-900">Work Readiness Assignment</span>
          </div>

          {/* Hero Card Stacked */}
          <Card className="p-6 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-50 border border-amber-200 text-amber-850 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Draft started
              </span>
              <span className="bg-emerald-50 border border-emerald-100 text-emerald-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Certificate-linked
              </span>
            </div>

            <h2 className="text-xl font-black text-slate-950 font-heading">Work Readiness Assignment</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 text-xs font-semibold border-t border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Course</span>
                <span className="text-slate-800">Work Readiness Foundation</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Lesson</span>
                <span className="text-slate-800">Preparing for Interviews</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Due Date</span>
                <span className="text-red-600 font-extrabold">24 Oct 2026</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Facilitator</span>
                <span className="text-slate-800">Halima Sani</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button 
                onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                className="bg-[#005C45] hover:bg-emerald-800 active:bg-emerald-950 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer min-h-[40px] flex items-center justify-center gap-1.5"
              >
                <span>Continue Draft</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => navigateTo("/learner/assessments")}
                className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer min-h-[40px]"
              >
                Back to Assessments
              </button>
            </div>
          </Card>

          {/* TWO-COLUMN GRID FOR TABLET */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 items-start">
            <div className="space-y-6">
              
              {/* Assignment Brief */}
              <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 font-heading">Assignment Brief</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Effective workplace communication is the backbone of successful agribusiness operations. In this assignment, you are required to reflect on a real-world scenario where you demonstrated professional problem-solving and communication skills.
                </p>
                <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl text-left space-y-2">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">Your Task</span>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                    Describe a specific professional challenge you faced using the STAR method. You must focus on a situation relevant to agribusiness, value chain management, or community outreach.
                  </p>
                </div>
              </Card>

              {/* STAR Cards Grid (2x2) */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-heading">How to Structure Your Answer</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: "S", t: "Situation", c: "What was happening? Provide context." },
                    { l: "T", t: "Task", c: "What were you responsible for?" },
                    { l: "A", t: "Action", c: "What did you actually do? Use \"I\"." },
                    { l: "R", t: "Result", c: "What was achieved? Quantify." }
                  ].map((step, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl text-center space-y-1">
                      <div className="h-8 w-8 rounded-full bg-emerald-50 text-[#005C45] font-extrabold flex items-center justify-center text-xs mx-auto">
                        {step.l}
                      </div>
                      <span className="text-[10px] font-bold text-slate-900 uppercase block">{step.t}</span>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">{step.c}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submission Requirements */}
              <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-4">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Submission Requirements</h3>
                <div className="space-y-3">
                  {[
                    { t: "Use the STAR structure", d: "Must follow the 4-part framework" },
                    { t: "Explain your role", d: "Individual contribution clarity" },
                    { t: "400–700 words", d: "Comprehensive and concise" }
                  ].map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-800 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{req.t}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{req.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* HOW THIS WILL BE REVIEWED */}
              <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-emerald-800 shrink-0" />
                    <h3 className="text-base font-bold text-slate-900 font-heading">How This Will Be Reviewed</h3>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                    70% Pass
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* Criteria list */}
                  <div className="space-y-3">
                    {[
                      { title: "Clear explanation", weight: 25 },
                      { title: "Practical action", weight: 30 },
                      { title: "Reflection", weight: 25 },
                      { title: "Professional communication", weight: 20 }
                    ].map((crit, idx) => (
                      <div key={idx} className="space-y-1.5 pb-2.5 border-b border-slate-100 last:border-b-0">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-800 font-semibold">{crit.title}</span>
                          <span className="text-emerald-800 font-bold font-mono">{crit.weight}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-150 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${crit.weight}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reviewer Card stacked below */}
                  <div className="bg-emerald-50/40 border border-emerald-100 p-5 rounded-xl flex items-center gap-4 text-left shadow-2xs">
                    <div className="relative shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop" 
                        alt="Halima Sani"
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-600/20 shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center bg-emerald-100 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/50">
                        Primary Reviewer
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 pt-0.5">Halima Sani</h4>
                      <p className="text-[10px] text-slate-500 font-medium leading-none">Senior Facilitator, Agribusiness</p>
                    </div>
                  </div>
                </div>
              </Card>

            </div>

            {/* Tablet Right Side Columns stacked */}
            <div className="space-y-6">
              <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase font-heading">Assessment Status</h4>
                <div className="w-full h-1.5 bg-slate-150 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-800" style={{ width: "70%" }} />
                </div>
                <p className="text-[10px] text-slate-500 font-medium">70% complete. Continue to draft.</p>
                <button 
                  onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                  className="w-full bg-[#005C45] hover:bg-emerald-800 text-white font-bold text-xs py-2 rounded-xl transition-all cursor-pointer text-center"
                >
                  Continue Draft
                </button>
              </Card>

              {/* READY TO CONTINUE? */}
              <div className="p-6 bg-emerald-850 text-white rounded-2xl shadow-sm text-left space-y-4">
                <h3 className="text-lg font-bold text-white font-heading">Ready to Continue?</h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Your current progress is saved. Click below to return to your editor and finish the final sections.
                </p>

                <button 
                  onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                  className="w-full h-11 bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-800 font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-800"
                >
                  Continue Draft
                </button>
              </div>

              <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-2.5 text-xs font-semibold">
                <h4 className="text-xs font-bold text-slate-500 uppercase font-heading pb-1 border-b border-slate-100">Details</h4>
                <div className="flex justify-between">
                  <span className="text-slate-450">Credits</span>
                  <span>4 Credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450">Due</span>
                  <span className="text-red-500 font-extrabold">24 Oct 2026</span>
                </div>
              </Card>

              <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-2 text-xs font-bold">
                <h4 className="text-xs font-bold text-slate-500 uppercase font-heading pb-1 border-b border-slate-100">Need Help?</h4>
                <button onClick={() => setIsMessageModalOpen(true)} className="w-full text-left p-1.5 hover:bg-slate-50 rounded-lg text-slate-700">
                  Message Facilitator
                </button>
                <button onClick={() => setIsGuideModalOpen(true)} className="w-full text-left p-1.5 hover:bg-slate-50 rounded-lg text-slate-700">
                  Reflection Guide
                </button>
              </Card>
            </div>
          </div>
        </main>

        <LearnerMobileNav />
      </div>

      {/* 3. MOBILE VIEW */}
      <div className="md:hidden min-h-screen pb-28">
        
        {/* Mobile Header */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner/assessments")}
              className="p-1 text-slate-600 hover:text-slate-950 rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-base font-semibold text-slate-900 tracking-tight font-heading">
              Assignment Details
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-500 hover:text-slate-850 rounded-lg relative"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-700 rounded-full"></span>
            </button>
            <div 
              onClick={() => navigateTo("/learner/profile")}
              className="h-7 w-7 bg-emerald-900 text-white font-bold rounded-full flex items-center justify-center text-[10px] shadow-sm cursor-pointer"
            >
              AM
            </div>
          </div>
        </header>

        {/* Mobile Content Stack */}
        <main className="px-4 py-4 space-y-5">
          
          {/* MOBILE SUMMARY HERO CARD */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Draft started
                </span>
                
                {/* 4 CPD Badge */}
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  ★ 4 CPD Credits
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-950 tracking-tight leading-snug font-heading">
                Work Readiness Assignment
              </h2>
              
              <p className="text-xs text-slate-650 font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Due 24 Oct 2026</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
                className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl text-center shadow-xs cursor-pointer min-h-[40px] transition-colors duration-150"
              >
                Continue Draft
              </button>
              <button 
                onClick={() => navigateTo("/learner/assessments")}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-805 font-semibold text-xs py-2.5 rounded-xl text-center cursor-pointer min-h-[40px] transition-colors duration-150"
              >
                Back
              </button>
            </div>
          </Card>

          {/* MOBILE ASSIGNMENT STATUS CARD */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-heading">Assignment Status</h3>
              <span className="text-xs font-bold text-emerald-700">70%</span>
            </div>

            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600" style={{ width: "70%" }} />
            </div>

            <div className="space-y-2.5 text-xs font-semibold">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Draft Answer</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-semibold px-2 py-0.5 rounded-md">Complete</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Supporting Evidence</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-semibold px-2 py-0.5 rounded-md">Complete</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border border-slate-300" />
                  <span className="text-slate-700">Integrity Declaration</span>
                </div>
                <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[9px] font-semibold px-2 py-0.5 rounded-md">Pending</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-400 font-medium">Final Submission</span>
                </div>
                <span className="bg-slate-50 text-slate-400 border border-slate-200 text-[9px] font-semibold px-2 py-0.5 rounded-md">Locked</span>
              </div>
            </div>
          </Card>

          {/* READY TO CONTINUE? (DEEP EMERALD) */}
          <div className="p-6 bg-emerald-800 text-white rounded-2xl shadow-sm text-left space-y-4">
            <h3 className="text-lg font-semibold text-white font-heading">Ready to Continue?</h3>
            <p className="text-sm text-white/95 leading-relaxed">
              Your current progress is saved. Click below to return to your editor and finish the final sections.
            </p>

            <button 
              onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
              className="w-full h-11 bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-800 font-semibold text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-800"
            >
              Continue Draft
            </button>
          </div>

          {/* MOBILE ASSIGNMENT BRIEF */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-950 font-heading">Assignment Brief</h3>
            
            <div className="bg-emerald-50 border-l-4 border-l-emerald-600 p-4 rounded-r-xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider block">YOUR TASK</span>
              <p className="text-xs text-slate-950 leading-relaxed font-semibold">
                Demonstrate your professional problem-solving capabilities by detailing a specific challenge you faced. Use the STAR method to structure your narrative clearly.
              </p>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 bg-amber-50/40 border border-amber-150 rounded-xl text-xs font-medium text-slate-800">
              <span className="text-amber-600 shrink-0 mt-0.5 text-sm">💡</span>
              <p>
                Tip: To excel, use examples specifically from the Nigerian agribusiness sector, such as supply chain logistics or farm-to-market improvements.
              </p>
            </div>
          </Card>

          {/* MOBILE SUBMISSION REQUIREMENTS */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 font-heading">Submission Requirements</h3>
            
            <ul className="space-y-3 text-xs font-medium text-slate-700">
              {[
                "Adherence to STAR structure (Situation, Task, Action, Result).",
                "Clearly explained role and individual contribution.",
                "Word count between 500 and 800 words.",
                "Signed learner integrity declaration form.",
                "PDF format preferred for evidence uploads."
              ].map((requirement, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* MOBILE HOW TO STRUCTURE YOUR ANSWER */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 bg-emerald-600 rounded-full" />
              <h3 className="text-sm font-semibold text-slate-950 font-heading">
                How to Structure Your Answer
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { l: "S", t: "Situation", d: "Set the context. Where were you and what was the problem?" },
                { l: "T", t: "Task", d: "What was your specific responsibility in that situation?" },
                { l: "A", t: "Action", d: "Detail the steps you took to address the challenge." },
                { l: "R", t: "Result", d: "What was the outcome? Use data or quantifiable metrics if possible." }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-md bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-3xs">
                    {step.l}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-semibold text-slate-900">{step.t}</h4>
                    <p className="text-[11px] text-slate-650 font-medium leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* MOBILE HOW THIS WILL BE REVIEWED */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-5 shadow-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Award className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-heading">How This Will Be Reviewed</h3>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                70% Pass
              </span>
            </div>

            <div className="space-y-4">
              {/* Criteria list */}
              <div className="space-y-3">
                {[
                  { title: "Clear explanation", weight: 25 },
                  { title: "Practical action", weight: 30 },
                  { title: "Reflection", weight: 25 },
                  { title: "Professional communication", weight: 20 }
                ].map((crit, idx) => (
                  <div key={idx} className="space-y-1.5 pb-2.5 border-b border-slate-100 last:border-b-0">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-800 font-semibold">{crit.title}</span>
                      <span className="text-emerald-800 font-mono font-bold">{crit.weight}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${crit.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviewer Card stacked below */}
              <div className="bg-emerald-50/40 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-left">
                <div className="relative shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" 
                    alt="Halima Sani"
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-600/20 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="inline-flex items-center bg-emerald-100 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/50">
                    Primary Reviewer
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">Halima Sani</h4>
                  <p className="text-[10px] text-slate-500 font-medium truncate">Senior Facilitator, Agribusiness</p>
                </div>
              </div>
            </div>
          </Card>

          {/* MOBILE UNLOCKS */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-3 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-950 font-heading">Unlocks</h3>
            <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                <Lock className="h-4 w-4 text-emerald-900" />
              </div>
              <p className="text-xs font-medium text-slate-700 leading-normal">
                Submitting this assessment unlocks the <strong className="text-slate-900 font-semibold">Strategic Leadership Capstone</strong>.
              </p>
            </div>
          </Card>

          {/* MOBILE RELATED RESOURCES */}
          <Card className="p-5 bg-white border border-slate-200 rounded-2xl text-left space-y-3 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-950 font-heading">Related Resources</h3>
            
            <div className="space-y-2">
              <button 
                onClick={() => showToast("PDF guide download simulated in this frontend prototype.", "success")}
                className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40 rounded-xl text-left transition-colors duration-150 cursor-pointer"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <span>STAR Response Guide</span>
                </span>
                <Download className="h-4 w-4 text-emerald-700" />
              </button>

              <button 
                onClick={() => showToast("Resource summary sheet opened.", "info")}
                className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40 rounded-xl text-left transition-colors duration-150 cursor-pointer"
              >
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <PlayCircle className="h-4 w-4 text-slate-500" />
                  <span>Preparing for Interviews Summary</span>
                </span>
                <ExternalLink className="h-4 w-4 text-emerald-700" />
              </button>
            </div>
          </Card>

          {/* MOBILE NEED HELP CARD */}
          <div 
            onClick={() => setIsMessageModalOpen(true)}
            className="p-4 bg-slate-50 border border-slate-200 hover:border-emerald-200 hover:bg-slate-100 rounded-2xl text-left flex items-center justify-between gap-3 shadow-sm cursor-pointer transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" 
                alt="Halima Sani"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-2xs"
              />
              <div>
                <h4 className="text-xs font-semibold text-slate-900 leading-none">Need Help?</h4>
                <p className="text-[10px] text-slate-500 font-medium mt-1">Message Halima Sani</p>
              </div>
            </div>
            
            <div className="h-8 w-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shrink-0">
              <Send className="h-4 w-4" />
            </div>
          </div>

        </main>

        {/* Sticky bottom mobile action bar */}
        <div className="fixed bottom-[58px] left-0 right-0 bg-white border-t border-slate-200 p-3 flex gap-3 z-30 shadow-md">
          <button 
            onClick={() => navigateTo("/learner/assessments")}
            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs py-2.5 rounded-xl text-center min-h-[40px] cursor-pointer transition-colors"
          >
            Back
          </button>
          <button 
            onClick={() => navigateTo("/learner/assessments/work-readiness-assessment/attempt")}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl text-center shadow-xs min-h-[40px] cursor-pointer transition-colors"
          >
            Continue Draft
          </button>
        </div>

        {/* Bottom Nav */}
        <LearnerMobileNav />
      </div>

      {/* ========================================================
          MODAL OVERLAYS (SHARE STATE & BEHAVIORS)
         ======================================================== */}
      
      {/* 1. MESSAGE HALIMA SANI MODAL */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl p-6 text-left animate-in scale-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-950">Message Halima Sani</h3>
              <button 
                onClick={() => setIsMessageModalOpen(false)}
                className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 pt-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-450 block font-bold">Subject</label>
                <input 
                  type="text" 
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white focus:border-emerald-700"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 block font-bold">Message</label>
                <textarea 
                  rows={4}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Type your question or request for feedback here..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-850 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white focus:border-emerald-700 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsMessageModalOpen(false)}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#005C45] hover:bg-emerald-800 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. REFLECTION GUIDE MODAL */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl p-6 text-left animate-in scale-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-950">Reflection Guide</h3>
              <button 
                onClick={() => setIsGuideModalOpen(false)}
                className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-650 leading-relaxed font-medium">
              <p>
                Use the <strong className="text-slate-900">STAR method</strong> to explain the situation, your task, the action you took, and the result. Keep your response clear, practical, and connected to your learning pathway.
              </p>
              
              <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                <h4 className="font-bold text-emerald-950 uppercase tracking-wider text-[10px]">Agribusiness Practice Tip</h4>
                <p className="text-[11px] text-slate-700">
                  Focus on demonstrating real agribusiness problem solving, like logistics management or field community organization.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 text-xs font-bold">
              <button 
                onClick={() => setIsGuideModalOpen(false)}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 px-4 rounded-xl"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setIsGuideModalOpen(false);
                  navigateTo("/learner/assessments/work-readiness-assessment/attempt");
                }}
                className="bg-[#005C45] hover:bg-emerald-800 text-white py-2 px-4 rounded-xl flex items-center gap-1"
              >
                <span>Continue Draft</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
