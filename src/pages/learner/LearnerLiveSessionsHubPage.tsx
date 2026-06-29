/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Calendar, 
  Clock, 
  User, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Download, 
  MessageSquare, 
  ChevronRight, 
  Sparkles, 
  ArrowLeft,
  Tv,
  Check,
  AlertCircle,
  FileText,
  BadgeAlert,
  Moon,
  WifiOff,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SessionHistoryItem {
  id: string;
  name: string;
  date: string;
  status: "Present" | "Pending" | "Missed";
  duration?: string;
  cpd: string;
  required: boolean;
}

export function LearnerLiveSessionsHubPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  
  // Tab/filter state
  const [activeFilter, setActiveFilter] = useState<"All" | "Upcoming" | "Required" | "Pending" | "Attended" | "Missed" | "CPD-linked">("All");

  // Modals state
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedSupportSession, setSelectedSupportSession] = useState("Agribusiness Market Readiness");
  const [supportReason, setSupportReason] = useState("Medical Emergency");
  const [supportMessage, setSupportMessage] = useState("");
  
  const [helpSubject, setHelpSubject] = useState("Help joining live session");
  const [helpMessage, setHelpMessage] = useState("");

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadPack = (sessionName: string) => {
    showToast(`Session pack download simulated in this frontend prototype.`, "success");
  };

  const handleAddCalendar = (sessionName: string) => {
    showToast(`Calendar reminder saved locally in this frontend prototype.`, "success");
  };

  const handleSetLocalReminder = () => {
    showToast(`Reminder saved locally in this frontend prototype.`, "success");
  };

  const handleDownloadSummaryBundle = () => {
    showToast(`Summary bundle download simulated in this frontend prototype.`, "success");
  };

  const handleSendSupportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSupportModalOpen(false);
    showToast("Attendance support request saved locally in this frontend prototype.", "success");
    setSupportMessage("");
  };

  const handleSendHelpMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHelpModalOpen(false);
    showToast("Message sent locally in this frontend prototype.", "success");
    setHelpMessage("");
  };

  // Mock static attendance records
  const attendanceHistory: SessionHistoryItem[] = [
    {
      id: "hist-1",
      name: "Digital Skills Orientation",
      date: "Oct 12, 2026",
      status: "Present",
      duration: "52m",
      cpd: "1.0",
      required: true
    },
    {
      id: "hist-2",
      name: "Workplace Communication Clinic",
      date: "Oct 15, 2026",
      status: "Present",
      duration: "58m",
      cpd: "1.0",
      required: true
    },
    {
      id: "hist-3",
      name: "Interview Practice Clinic",
      date: "Awaiting Verification",
      status: "Pending",
      duration: "Processing...",
      cpd: "Pending",
      required: true
    },
    {
      id: "hist-4",
      name: "Agribusiness Market Readiness",
      date: "Oct 20, 2026",
      status: "Missed",
      duration: "Session missed",
      cpd: "0.0",
      required: true
    }
  ];

  // Filtering logic
  const filteredHistory = attendanceHistory.filter(item => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pending" && item.status === "Pending") return true;
    if (activeFilter === "Attended" && item.status === "Present") return true;
    if (activeFilter === "Missed" && item.status === "Missed") return true;
    if (activeFilter === "CPD-linked" && item.cpd !== "0.0" && item.status === "Present") return true;
    if (activeFilter === "Required" && item.required) return true;
    return false; // Upcoming is handled separately in upcoming sessions
  });

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 antialiased font-sans relative pb-20 lg:pb-0">
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-3"
          >
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white ml-2">
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <LearnerSidebar />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* DESKTOP/TABLET TOPBAR */}
          <header className="hidden md:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-20">
            <div className="relative w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search live sessions, attendance, or resources..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50/75 border border-slate-200 rounded-lg focus:outline-none focus:border-sustain-600 focus:bg-white transition-all text-slate-700 font-sans"
              />
            </div>

            <div className="flex items-center gap-5">
              <button 
                onClick={() => showToast("You have no new notifications.", "info")}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full" />
              </button>
              
              <button 
                onClick={() => navigateTo("/learner/support")}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <HelpCircle className="h-5 w-5" />
              </button>

              <div className="h-8 w-px bg-slate-200" />
              
              <div className="flex items-center gap-2.5 text-left">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">Aisha Mohammed</p>
                  <p className="text-[10px] text-slate-400 font-bold tracking-wider">SUST-LRN-0442</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-sustain-900 flex items-center justify-center font-bold text-xs text-white">
                  AM
                </div>
              </div>
            </div>
          </header>

          {/* MOBILE TOPBAR */}
          <header className="md:hidden h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigateTo("/learner")}
                className="p-1 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span className="text-sm font-bold text-slate-900 tracking-tight font-heading">
                Live Sessions
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => showToast("You have no new notifications.", "info")}
                className="p-1.5 text-slate-500 hover:text-slate-800 relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              <div className="h-7 w-7 bg-sustain-900 text-white font-bold rounded-full flex items-center justify-center text-[10px]">
                AM
              </div>
            </div>
          </header>

          {/* MAIN PAGE CONTAINER */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">

            {/* DESKTOP & TABLET VIEWPORT LAYOUT */}
            <div className="hidden md:block space-y-6">
              
              {/* Breadcrumb */}
              <div className="text-[11px] text-slate-400 font-bold items-center gap-1.5 flex">
                <span className="hover:text-slate-600 transition-colors cursor-pointer" onClick={() => navigateTo("/learner")}>Learner Workspace</span>
                <ChevronRight className="h-3 w-3 text-slate-350" />
                <span className="text-slate-600 font-extrabold">Live Sessions</span>
              </div>

              {/* Title & Header area */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 text-left">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                    Live Sessions & Attendance
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-2xl font-medium">
                    Track upcoming sessions, attendance status, and certificate requirements.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <span className="bg-sustain-50 text-sustain-900 border border-sustain-100 font-sans px-3 py-1 text-[11px] font-bold rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sustain-900" />
                      <span>Programme: Youth Employability Pathway</span>
                    </span>
                    <span className="bg-slate-100 text-slate-600 border border-slate-200 font-sans px-3 py-1 text-[11px] font-bold rounded-lg">
                      Course: Work Readiness Foundation
                    </span>
                  </div>
                </div>

                {/* Right side Attendance Rate circle card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex items-center gap-4 text-left shrink-0">
                  <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
                    <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#E2E8F0" strokeWidth="10" fill="transparent" />
                      <circle cx="50" cy="50" r="40" stroke="#005C45" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 82) / 100} strokeLinecap="round" />
                    </svg>
                    <span className="text-xs font-extrabold text-slate-900">82%</span>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Attendance Rate</h4>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">9 Attended | 1 Pending | 2 Missed</p>
                  </div>
                </div>
              </div>

              {/* 4 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {/* KPI Card 1 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3 transition-all hover:border-sustain-150 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Upcoming Sessions</span>
                    <div className="h-7 w-7 bg-sustain-50 rounded-lg flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4 text-sustain-900" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-extrabold text-slate-900 leading-none">2</p>
                    <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                </div>

                {/* KPI Card 2 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3 transition-all hover:border-sustain-150 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Current Rate</span>
                    <div className="h-7 w-7 bg-sustain-50 rounded-lg flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-sustain-900" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-extrabold text-slate-900 leading-none">82%</p>
                    <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      +4% this month
                    </span>
                  </div>
                </div>

                {/* KPI Card 3 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3 transition-all hover:border-sustain-150 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Pending Review</span>
                    <div className="h-7 w-7 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-amber-700" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-extrabold text-slate-900 leading-none">1</p>
                    <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Awaiting
                    </span>
                  </div>
                </div>

                {/* KPI Card 4 */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-3 transition-all hover:border-sustain-150 h-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Sessions Remaining</span>
                    <div className="h-7 w-7 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center shrink-0">
                      <Tv className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-extrabold text-slate-900 leading-none">3</p>
                    <span className="bg-slate-50 text-slate-500 border border-slate-200 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      9 of 12
                    </span>
                  </div>
                </div>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {(["All", "Upcoming", "Required", "Pending", "Attended", "Missed", "CPD-linked"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                      activeFilter === filter 
                        ? "bg-sustain-900 text-white border-sustain-900 shadow-2xs" 
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Grid with Left Column (col-span-8) and Right Column (col-span-4) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Next Required Session */}
                  {(activeFilter === "All" || activeFilter === "Upcoming" || activeFilter === "Required") && (
                    <div className="space-y-3 text-left">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">
                        Next Required Session
                      </h3>
                      
                      <div className="bg-[#f0f9f6] rounded-2xl border border-[#a2dbcd] p-6 shadow-2xs relative overflow-hidden">
                        <div className="absolute top-4 right-4 bg-sustain-900 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          Required
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="flex gap-4 items-start">
                            <div className="h-12 w-12 bg-sustain-900 text-white rounded-xl flex items-center justify-center shrink-0">
                              <Tv className="h-6 w-6 stroke-[1.5]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-base font-bold text-slate-900">Interview Practice Clinic</h4>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs font-semibold">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                  <span>Oct 25, 2026</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                                  <span>10:00 AM WAT</span>
                                </span>
                              </div>
                              <p className="text-[11px] text-sustain-900 font-extrabold bg-sustain-100/60 border border-sustain-150 rounded-lg px-2.5 py-0.5 inline-block mt-2">
                                Required for next module unlock
                              </p>
                            </div>
                          </div>

                          <div className="w-full md:w-auto shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                            <button
                              onClick={() => handleDownloadPack("Interview Practice Clinic")}
                              className="flex-1 md:flex-none text-xs font-bold py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Pack</span>
                            </button>
                            <button
                              onClick={() => navigateTo("/learner/live-sessions/interview-practice-clinic")}
                              className="flex-1 md:flex-none text-xs font-bold py-2.5 px-5 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl transition-all shadow-2xs cursor-pointer inline-flex items-center justify-center"
                            >
                              View Session Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upcoming Sessions List */}
                  {(activeFilter === "All" || activeFilter === "Upcoming" || activeFilter === "Required") && (
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">
                          Upcoming Sessions
                        </h3>
                        <button 
                          onClick={() => showToast("Calendar view simulation.", "info")}
                          className="text-xs font-bold text-sustain-900 hover:text-sustain-850 cursor-pointer"
                        >
                          View Calendar
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Upcoming 1: Interview Practice Clinic */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row gap-5 items-center">
                          {/* Date Left Card */}
                          <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">OCT</span>
                            <span className="text-xl font-bold text-slate-800 leading-none">25</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-1.5 text-left">
                            <div className="flex items-center gap-2">
                              <span className="bg-red-50 text-red-700 border border-red-100 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                Required
                              </span>
                              <span className="text-xs text-slate-400 font-semibold">• 10:00 AM WAT</span>
                            </div>
                            <h4 className="text-base font-bold text-slate-900">Interview Practice Clinic</h4>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                              Interactive practice of STAR structures & response formats for critical agribusiness reviews. Required to unlock the next module.
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="w-full md:w-auto shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                            <button
                              onClick={() => handleDownloadPack("Interview Practice Clinic")}
                              className="flex-1 md:flex-none text-xs font-bold py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer"
                            >
                              Download Pack
                            </button>
                            <button
                              onClick={() => navigateTo("/learner/live-sessions/interview-practice-clinic")}
                              className="flex-1 md:flex-none text-xs font-bold py-2.5 px-4 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl transition-all cursor-pointer"
                            >
                              View Session
                            </button>
                          </div>
                        </div>

                        {/* Upcoming 2: Portfolio Reflection Workshop */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row gap-5 items-center">
                          {/* Date Left Card */}
                          <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">NOV</span>
                            <span className="text-xl font-bold text-slate-800 leading-none">01</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-1.5 text-left">
                            <div className="flex items-center gap-2">
                              <span className="bg-slate-50 text-slate-550 border border-slate-200 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                Optional
                              </span>
                              <span className="text-xs text-slate-400 font-semibold">• 11:00 AM WAT</span>
                            </div>
                            <h4 className="text-base font-bold text-slate-900">Portfolio Reflection Workshop</h4>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed">
                              Focus on visual storytelling and building an impactful reflection diary. Best for review of career development portfolios.
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="w-full md:w-auto shrink-0 flex items-center gap-2 pt-2 md:pt-0">
                            <button
                              onClick={() => handleAddCalendar("Portfolio Reflection Workshop")}
                              className="flex-1 md:flex-none text-xs font-bold py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer"
                            >
                              Add to Calendar
                            </button>
                            <button
                              onClick={() => {
                                showToast("This optional workshop opens on Nov 01.", "info");
                              }}
                              className="flex-1 md:flex-none text-xs font-bold py-2.5 px-4 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl transition-all cursor-pointer"
                            >
                              View Session
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attendance History Table */}
                  <div className="space-y-3 text-left">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-heading">
                      Attendance History
                    </h3>

                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                      {filteredHistory.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                          No attendance records match the selected filter.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50/70 border-b border-slate-150">
                                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-6 py-3.5">Session Name</th>
                                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-6 py-3.5">Date / Time</th>
                                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-6 py-3.5">Status</th>
                                <th className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-6 py-3.5 text-right">CPD Credits</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {filteredHistory.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                                  <td className="px-6 py-4.5">
                                    <div className="text-xs font-bold text-slate-900">{item.name}</div>
                                  </td>
                                  <td className="px-6 py-4.5">
                                    <div className="text-xs text-slate-500 font-medium">
                                      {item.date} {item.duration && `• ${item.duration}`}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4.5">
                                    {item.status === "Present" && (
                                      <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 bg-sustain-900 rounded-full" />
                                        <span>Present</span>
                                      </span>
                                    )}
                                    {item.status === "Pending" && (
                                      <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 bg-amber-600 rounded-full" />
                                        <span>Pending</span>
                                      </span>
                                    )}
                                    {item.status === "Missed" && (
                                      <div className="flex items-center gap-3">
                                        <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                                          <span className="h-1.5 w-1.5 bg-red-600 rounded-full" />
                                          <span>Missed</span>
                                        </span>
                                        <button
                                          onClick={() => {
                                            setSelectedSupportSession(item.name);
                                            setIsSupportModalOpen(true);
                                          }}
                                          className="text-[10px] font-extrabold text-sustain-900 hover:text-sustain-850 bg-sustain-50 hover:bg-sustain-100 border border-sustain-150 px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                                        >
                                          Request Support
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-6 py-4.5 text-right">
                                    <span className="text-xs text-slate-700 font-bold font-mono">
                                      {item.cpd} {item.cpd !== "---" && "CPD"}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Low Connectivity card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <WifiOff className="h-5 w-5 text-slate-600" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 font-heading">Unstable Connection?</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          We understand connectivity can vary. Access session packs and text-only summaries to keep your progress on track even when offline.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        onClick={handleDownloadSummaryBundle}
                        className="text-xs font-bold py-2 px-4 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl transition-all cursor-pointer shadow-2xs"
                      >
                        Download Summary Bundle
                      </button>
                      <button
                        onClick={() => showToast("SMS notification setup saved locally in this frontend prototype.", "success")}
                        className="text-xs font-bold py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer"
                      >
                        SMS Notification Setup
                      </button>
                      <button
                        onClick={() => navigateTo("/learner/low-bandwidth")}
                        className="text-xs font-bold py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all cursor-pointer"
                      >
                        Open Low-Bandwidth Mode
                      </button>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Right Card 1: Next Required Session Shortcut */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-2">
                      Next Required Session
                    </span>
                    
                    <div className="space-y-2.5">
                      <h4 className="font-bold text-slate-900 text-sm">Interview Practice Clinic</h4>
                      <div className="space-y-1.5 text-xs text-slate-500 font-medium">
                        <p className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span>Friday, 25 Oct 2026</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span>10:00 AM WAT</span>
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigateTo("/learner/live-sessions/interview-practice-clinic")}
                      className="w-full text-center text-xs font-bold bg-sustain-900 hover:bg-sustain-850 text-white py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      Go to Session
                    </button>
                  </div>

                  {/* Right Card 2: Certificate Status */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-left">
                    <div className="flex justify-between items-baseline border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Certificate Status
                      </h4>
                      <span className="text-xs font-extrabold text-sustain-900">75% Complete</span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 leading-normal font-medium">
                        You have completed 9 of 12 required live sessions for the Work Readiness Certificate.
                      </p>
                      
                      <div className="space-y-1.5">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-sustain-900 h-full rounded-full" style={{ width: "75%" }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                          <span>9 completed</span>
                          <span>3 remaining</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigateTo("/learner/cpd-record")}
                      className="w-full text-center text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 py-2.5 rounded-xl transition-colors cursor-pointer border border-slate-200/50"
                    >
                      View CPD Record
                    </button>
                  </div>

                  {/* Right Card 3: Need Help */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3.5 text-left flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-full bg-sustain-50 text-sustain-900 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-4.5 w-4.5" />
                      </div>
                      <div className="text-xs">
                        <h4 className="font-extrabold text-slate-900 font-heading">Need Help?</h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-normal mt-0.5">
                          Your session coordinator, Halima, is available for any attendance questions.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setIsHelpModalOpen(true)}
                      className="w-full text-center text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 py-2.5 rounded-xl transition-colors cursor-pointer border border-slate-200/50"
                    >
                      Message Halima Sani
                    </button>
                  </div>

                  {/* Right Card 4: Quick Resources */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 text-left">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                      Quick Resources
                    </h4>

                    <div className="space-y-2">
                      <button 
                        onClick={() => showToast("Opening Live Session Guide...", "info")}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-sustain-100 hover:bg-slate-50 text-left text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>LMS Navigation Guide</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </button>

                      <button 
                        onClick={() => showToast("Downloading Policies document...", "success")}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-sustain-100 hover:bg-slate-50 text-left text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>Session Policies (.PDF)</span>
                        </div>
                        <Download className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* MOBILE VIEWPORT LAYOUT */}
            <div className="md:hidden space-y-6 pb-20">
              
              {/* Mobile Hero (Current Status) */}
              <div className="bg-sustain-900 text-white rounded-2xl p-5 relative overflow-hidden space-y-4 shadow-sm text-left">
                <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
                  <Video className="h-20 w-20 stroke-[1.5]" />
                </div>
                <div className="space-y-1 relative z-10">
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-sustain-100">Current Status</p>
                  <h3 className="text-lg font-bold font-heading">82% Attendance</h3>
                  <p className="text-xs text-sustain-50/90 font-medium leading-relaxed max-w-xs">
                    You're on track for your Work Readiness Certificate. Keep it up!
                  </p>
                </div>
                <button 
                  onClick={() => navigateTo("/learner/live-sessions/interview-practice-clinic")}
                  className="w-full bg-white text-sustain-900 hover:bg-sustain-50 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>View Next Session</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile KPI Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                {/* Metric 1 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 h-full">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Upcoming</span>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-xl font-bold text-slate-900 leading-none">2</p>
                    <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[8px] font-bold px-1 py-0.5 rounded uppercase">Active</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 h-full">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Current Rate</span>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-xl font-bold text-slate-900 leading-none">82%</p>
                    <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[8px] font-bold px-1 py-0.5 rounded uppercase">+4%</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 h-full">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Pending</span>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-xl font-bold text-slate-900 leading-none">1</p>
                    <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[8px] font-bold px-1 py-0.5 rounded uppercase">Awaiting</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2 h-full">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Remaining</span>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-xl font-bold text-slate-900 leading-none">3</p>
                    <span className="text-slate-400 text-[8px] font-bold uppercase">9 of 12</span>
                  </div>
                </div>
              </div>

              {/* Mobile Filter Chips */}
              <div className="flex items-center overflow-x-auto pb-1 gap-2 scrollbar-none -mx-4 px-4">
                {(["All", "Upcoming", "Required", "Pending", "Attended", "Missed", "CPD-linked"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                      activeFilter === filter 
                        ? "bg-sustain-900 text-white border-sustain-900" 
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Mobile Next Required Session */}
              {(activeFilter === "All" || activeFilter === "Upcoming" || activeFilter === "Required") && (
                <div className="space-y-2 text-left">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Next Required Session
                  </h3>
                  <div className="bg-[#f0f9f6] border border-[#a2dbcd] rounded-xl p-4 space-y-3 relative overflow-hidden">
                    <div className="absolute top-3.5 right-3.5 bg-sustain-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Required
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">Interview Practice Clinic</h4>
                      <p className="text-[10px] text-slate-500 font-semibold">
                        Oct 25, 2026 • 10:00 AM WAT
                      </p>
                    </div>
                    <p className="text-[10px] text-sustain-900 font-bold bg-sustain-100/50 rounded-lg px-2 py-0.5 inline-block">
                      Required to unlock next module
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button 
                        onClick={() => handleDownloadPack("Interview Practice Clinic")}
                        className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2 rounded-lg"
                      >
                        Pack
                      </button>
                      <button 
                        onClick={() => navigateTo("/learner/live-sessions/interview-practice-clinic")}
                        className="flex-1 bg-sustain-900 text-white font-bold text-xs py-2 rounded-lg"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Recent Activity */}
              <div className="space-y-2 text-left">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {filteredHistory.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-2 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.name}</h4>
                        {item.status === "Present" && (
                          <span className="bg-emerald-50 text-sustain-900 border border-sustain-100 text-[8px] font-bold px-2 py-0.5 rounded-full shrink-0">
                            Present
                          </span>
                        )}
                        {item.status === "Pending" && (
                          <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[8px] font-bold px-2 py-0.5 rounded-full shrink-0">
                            Pending
                          </span>
                        )}
                        {item.status === "Missed" && (
                          <span className="bg-red-50 text-red-700 border border-red-100 text-[8px] font-bold px-2 py-0.5 rounded-full shrink-0">
                            Missed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                        <span>{item.date} {item.duration && `• ${item.duration}`}</span>
                        <span className="font-mono text-slate-600 font-bold">{item.cpd !== "---" ? `${item.cpd} CPD` : "Pending CPD"}</span>
                      </div>
                      {item.status === "Missed" && (
                        <div className="pt-2 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setSelectedSupportSession(item.name);
                              setIsSupportModalOpen(true);
                            }}
                            className="w-full text-center text-xs font-bold text-sustain-900 bg-sustain-50 hover:bg-sustain-100 border border-sustain-150 py-1.5 rounded-lg transition-all"
                          >
                            Request Support
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Certificate Progress */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-900 font-heading">
                    Certificate Status
                  </h3>
                  <span className="text-xs font-extrabold text-sustain-900">75% Complete</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  You have completed 9 of 12 required live sessions for the Work Readiness Certificate.
                </p>
                <div className="space-y-1.5">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-sustain-900 h-full rounded-full" style={{ width: "75%" }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase">
                    <span>9 completed</span>
                    <span>3 remaining</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigateTo("/learner/cpd-record")}
                  className="w-full text-center text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/50 py-2 rounded-lg"
                >
                  View CPD Record
                </button>
              </div>

              {/* Mobile Low Connectivity Mode */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-left">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 font-heading">Unstable Connection?</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Access session packs and text-only summaries to keep your progress on track offline.
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <button 
                    onClick={handleDownloadSummaryBundle}
                    className="w-full text-center text-xs font-bold bg-sustain-900 text-white py-2 rounded-lg"
                  >
                    Download Summary Bundle
                  </button>
                  <button 
                    onClick={() => showToast("SMS notification setup saved locally in this frontend prototype.", "success")}
                    className="w-full text-center text-xs font-bold bg-white border border-slate-200 text-slate-700 py-2 rounded-lg"
                  >
                    SMS Notification Setup
                  </button>
                  <button 
                    onClick={() => navigateTo("/learner/low-bandwidth")}
                    className="w-full text-center text-xs font-bold bg-white border border-slate-200 text-slate-700 py-2 rounded-lg"
                  >
                    Open Low-Bandwidth Mode
                  </button>
                </div>
              </div>

            </div>

          </main>

          {/* MOBILE BOTTOM NAVIGATION BAR */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-40 flex items-center justify-around shadow-lg px-2">
            {[
              { id: "home", label: "Home", icon: Tv, path: "/learner" },
              { id: "learn", label: "Courses", icon: FileText, path: "/learner/courses" },
              { id: "live", label: "Live", icon: Video, path: "/learner/live-sessions" },
              { id: "success", label: "Assess", icon: CheckCircle2, path: "/learner/assessments" },
              { id: "support", label: "Support", icon: HelpCircle, path: "/learner/support" }
            ].map((item) => {
              const Icon = item.icon;
              const isItemActive = item.id === "live";

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.path as any)}
                  className={`flex flex-col items-center justify-center gap-1 h-full px-2 text-[10px] font-bold transition-colors cursor-pointer shrink-0 ${
                    isItemActive ? "text-sustain-900 font-extrabold" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <div className={`p-1 rounded-lg ${isItemActive ? "bg-sustain-50 text-sustain-900" : ""}`}>
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
      {/* MODALS & SHEETS */}
      {/* ========================================== */}
      <AnimatePresence>
        
        {/* Help Facilitator Modal */}
        {isHelpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 w-full max-w-md overflow-hidden text-left shadow-2xl relative"
            >
              <div className="p-6 border-b border-slate-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-sustain-50 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-sustain-900" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Message Halima Sani</h3>
                </div>
                <button 
                  onClick={() => setIsHelpModalOpen(false)}
                  className="p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSendHelpMessage} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Subject</label>
                  <input 
                    type="text" 
                    value={helpSubject}
                    onChange={(e) => setHelpSubject(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-hidden focus:border-sustain-900 bg-slate-50/50"
                    placeholder="Enter message subject..."
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Message</label>
                  <textarea 
                    rows={4}
                    value={helpMessage}
                    onChange={(e) => setHelpMessage(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-hidden focus:border-sustain-900 bg-slate-50/50 resize-none"
                    placeholder="Describe any connection issues or attendance questions..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsHelpModalOpen(false)}
                    className="text-xs font-bold text-slate-550 border border-slate-250 py-2 px-4 rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="text-xs font-bold py-2 px-5 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Request Attendance Support Modal */}
        {isSupportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 w-full max-w-md overflow-hidden text-left shadow-2xl relative"
            >
              <div className="p-6 border-b border-slate-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <BadgeAlert className="h-4 w-4 text-red-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Attendance Support</h3>
                </div>
                <button 
                  onClick={() => setIsSupportModalOpen(false)}
                  className="p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSendSupportRequest} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Session</label>
                  <input 
                    type="text" 
                    value={selectedSupportSession}
                    disabled
                    className="w-full border border-slate-150 rounded-lg p-2.5 text-xs bg-slate-100 text-slate-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Reason for Request</label>
                  <select
                    value={supportReason}
                    onChange={(e) => setSupportReason(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-hidden focus:border-sustain-900 bg-slate-50/50"
                  >
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Technical Outage">Technical Outage / Network Crash</option>
                    <option value="Conflicting Exam">Conflicting Academic Exam</option>
                    <option value="Other">Other Reason</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Message</label>
                  <textarea 
                    rows={4}
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-hidden focus:border-sustain-900 bg-slate-50/50 resize-none"
                    placeholder="Provide details about why you missed the session and request an excusal support..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsSupportModalOpen(false)}
                    className="text-xs font-bold text-slate-550 border border-slate-250 py-2 px-4 rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="text-xs font-bold py-2 px-5 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl cursor-pointer"
                  >
                    Send Request
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
