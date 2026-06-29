/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { 
  ArrowLeft, 
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
  Tv,
  Check,
  AlertCircle,
  FileText,
  BadgeAlert,
  Mic,
  BatteryCharging,
  Smartphone,
  BookOpen,
  Wifi,
  ExternalLink,
  ChevronDown,
  Search,
  Compass,
  GraduationCap,
  Award,
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LearnerLiveSessionPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Core local states for prototype
  const [attendanceStatus, setAttendanceStatus] = useState<
    "not_joined" | "joined" | "code_entered" | "pending_confirmation" | "confirmed"
  >("not_joined");
  const [selectedJoinMethod, setSelectedJoinMethod] = useState<"google_meet" | "zoom" | "low_bandwidth" | null>(null);
  const [attendanceCode, setAttendanceCode] = useState("");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [helpSubject, setHelpSubject] = useState("Help joining live session");
  const [helpMessage, setHelpMessage] = useState("");

  // Refs for smooth scroll
  const connectionMethodRef = useRef<HTMLDivElement>(null);
  const markAttendanceRef = useRef<HTMLDivElement>(null);

  // Mobile-specific verification input fields (6 cells)
  const [mobileCode, setMobileCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownloadPack = () => {
    showToast("Session pack download simulated in this frontend prototype.", "success");
  };

  const handleAddCalendar = () => {
    showToast("Calendar reminder saved locally in this frontend prototype.", "success");
  };

  const handleScrollToConnection = () => {
    const target = connectionMethodRef.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // In mobile, we can also scroll down or just show toast
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
    showToast("Choose connection method below", "info");
  };

  const handleScrollToMarkAttendance = () => {
    const target = markAttendanceRef.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 900, behavior: "smooth" });
    }
    showToast("Verify your attendance below", "info");
  };

  const handleJoinPlatform = (platform: "google_meet" | "zoom" | "low_bandwidth") => {
    setSelectedJoinMethod(platform);
    if (attendanceStatus === "not_joined") {
      setAttendanceStatus("joined");
    }
    
    if (platform === "google_meet") {
      showToast("Google Meet link opened in this frontend prototype.", "success");
    } else if (platform === "zoom") {
      showToast("Zoom link opened in this frontend prototype.", "success");
    } else {
      navigateTo("/learner/low-bandwidth");
    }
  };

  const handleCodeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!attendanceCode.trim()) {
      showToast("Please enter an attendance code.", "info");
      return;
    }
    setAttendanceStatus("code_entered");
    showToast("Attendance marked locally and pending facilitator confirmation.", "success");
  };

  const handleOneTapConfirm = () => {
    setAttendanceStatus("pending_confirmation");
    showToast("Attendance marked locally and pending facilitator confirmation.", "success");
  };

  const handleMobileConfirmAttendance = () => {
    const fullCode = mobileCode.join("");
    if (fullCode.length < 6) {
      showToast("Please enter a 6-digit attendance code.", "info");
      return;
    }
    setAttendanceStatus("code_entered");
    showToast("Attendance marked locally and pending facilitator confirmation.", "success");
  };

  const handleSendHelpMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHelpModalOpen(false);
    showToast("Message sent locally in this frontend prototype.", "success");
    setHelpMessage("");
  };

  const handleMobileCodeChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newCode = [...mobileCode];
      newCode[index] = value;
      setMobileCode(newCode);

      // Focus next element if filled
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleMobileCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && mobileCode[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Aisha profile image URL
  const aishaPhotoUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans relative">
      
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
        {/* Sidebar - Desktop/Tablet only */}
        <div className="hidden lg:block shrink-0">
          <LearnerSidebar />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* ========================================== */}
          {/* DESKTOP & TABLET VIEWPORT (md and up) */}
          {/* ========================================== */}
          <div className="hidden md:flex flex-col flex-1 pb-24">
            
            {/* DESKTOP/TABLET TOPBAR */}
            <header className="flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-20 shadow-2xs">
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search live sessions, guides..."
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
                  <img 
                    src={aishaPhotoUrl}
                    alt="Aisha Mohammed" 
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                </div>
              </div>
            </header>

            {/* MAIN CONTENT CONTAINER */}
            <main className="flex-1 p-8 max-w-7xl w-full mx-auto space-y-6">
              
              {/* Breadcrumb */}
              <div className="flex text-[11px] text-slate-400 font-bold items-center gap-1.5">
                <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigateTo("/learner/courses")}>Courses</span>
                <ChevronRight className="h-3 w-3 text-slate-300" />
                <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigateTo("/learner/courses/work-readiness-foundation")}>Work Readiness Foundation</span>
                <ChevronRight className="h-3 w-3 text-slate-300" />
                <span className="text-slate-600 font-extrabold">Live Session</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT/MAIN COLUMN (col-span-8) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Hero Card */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 text-left shadow-xs relative overflow-hidden">
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-5 flex-1 z-10">
                        {/* Requirement Chips */}
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                            Attendance required
                          </span>
                          <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                            Low-bandwidth supported
                          </span>
                          <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                            Module unlock requirement
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-1.5">
                          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
                            Interview Practice Clinic
                          </h2>
                          <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                            Join the live session and complete the requirement to advance your career pathway.
                          </p>
                        </div>

                        {/* Metadata Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-b border-slate-100 text-xs text-left font-sans">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                              <Calendar className="h-4 w-4 text-sustain-900" />
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                              <p className="font-bold text-slate-700 mt-0.5">Fri, 25 Oct 2026</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                              <Clock className="h-4 w-4 text-sustain-900" />
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Time</p>
                              <p className="font-bold text-slate-700 mt-0.5">10:00 AM WAT</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center shrink-0">
                              <User className="h-4 w-4 text-sustain-900" />
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Facilitator</p>
                              <p className="font-bold text-slate-700 mt-0.5">Halima Sani</p>
                            </div>
                          </div>
                        </div>

                        {/* Buttons Row */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            onClick={handleScrollToConnection}
                            className="text-xs font-bold py-2.5 px-5 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer"
                          >
                            Join Session Now
                          </button>
                          <button
                            onClick={handleDownloadPack}
                            className="text-xs font-bold py-2.5 px-5 bg-white border border-slate-200 hover:border-sustain-150 hover:bg-slate-50 text-slate-700 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5 text-slate-400" />
                            <span>Session Pack</span>
                          </button>
                          <button
                            onClick={handleAddCalendar}
                            className="text-xs font-bold py-2.5 px-5 bg-white border border-slate-200 hover:border-sustain-150 hover:bg-slate-50 text-slate-700 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                          >
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>Add to Calendar</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Big Soft Video Icon */}
                      <div className="hidden md:flex shrink-0 items-center justify-center h-24 w-32 bg-slate-50 border border-slate-150 rounded-2xl">
                        <Video className="h-12 w-12 text-slate-300" />
                      </div>
                    </div>
                  </div>

                  {/* Choose Connection Method */}
                  <div ref={connectionMethodRef} className="space-y-3 scroll-mt-20">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading text-left">
                      Choose Connection Method
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                      {/* Google Meet Card */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-sustain-200 hover:shadow-2xs transition-all duration-200">
                        <div className="space-y-2">
                          <div className="h-10 w-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                            <Video className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-900 font-heading">Google Meet</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Recommended for strong connections. Best for video interaction.
                          </p>
                        </div>
                        <button
                          onClick={() => handleJoinPlatform("google_meet")}
                          className="w-full text-left text-xs font-bold text-sustain-900 hover:text-sustain-800 transition-colors flex items-center gap-1 cursor-pointer pt-2"
                        >
                          <span>Primary Link</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Zoom Meeting Card */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-sustain-200 hover:shadow-2xs transition-all duration-200">
                        <div className="space-y-2">
                          <div className="h-10 w-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                            <Tv className="h-5 w-5 text-indigo-600" />
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-900 font-heading">Zoom Meeting</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Alternative session room. Requires Zoom app installation.
                          </p>
                        </div>
                        <button
                          onClick={() => handleJoinPlatform("zoom")}
                          className="w-full text-left text-xs font-bold text-sustain-900 hover:text-sustain-800 transition-colors flex items-center gap-1 cursor-pointer pt-2"
                        >
                          <span>Alternative</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Low-Bandwidth Card */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-sustain-200 hover:shadow-2xs transition-all duration-200">
                        <div className="space-y-2">
                          <div className="h-10 w-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                            <Smartphone className="h-5 w-5 text-emerald-600" />
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-900 font-heading">Low-Bandwidth</h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Optimized for 2G/3G. Audio only & text-based summaries.
                          </p>
                        </div>
                        <button
                          onClick={() => handleJoinPlatform("low_bandwidth")}
                          className="w-full text-left text-xs font-bold text-sustain-900 hover:text-sustain-800 transition-colors flex items-center gap-1 cursor-pointer pt-2"
                        >
                          <span>Switch Mode</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mark Your Attendance Split Card */}
                  <div ref={markAttendanceRef} className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-5 shadow-xs scroll-mt-20">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <CheckCircle2 className="h-5 w-5 text-sustain-900" />
                      <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                        Mark Your Attendance
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
                      {/* Vertical Split Line */}
                      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100" />

                      {/* Method 1 */}
                      <div className="space-y-3.5 pr-0 md:pr-4">
                        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Method 1: Enter Session Code</p>
                        
                        <form onSubmit={handleCodeSubmit} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="E.G. SUST-9904"
                            value={attendanceCode}
                            onChange={(e) => setAttendanceCode(e.target.value)}
                            className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold tracking-widest text-slate-700 bg-slate-50/55 uppercase focus:outline-none focus:border-sustain-900"
                          />
                          <button
                            type="submit"
                            className="bg-sustain-900 hover:bg-sustain-850 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0"
                          >
                            Submit
                          </button>
                        </form>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Code is shared by Halima Sani at the end of the session.
                        </p>
                      </div>

                      {/* Method 2 */}
                      <div className="space-y-3.5 pl-0 md:pl-4">
                        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Method 2: One-Tap Confirmation</p>
                        
                        <button
                          onClick={handleOneTapConfirm}
                          className="w-full text-center py-2.5 px-4 bg-white border border-sustain-900 hover:bg-sustain-50/10 text-sustain-900 font-bold text-xs rounded-xl transition-all cursor-pointer"
                        >
                          I have joined the session
                        </button>
                        
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                          Note: Attendance is verified against session logs. False marking may delay certification.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lower sections: Agenda & Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Session Agenda */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4 shadow-xs">
                      <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                        Session Agenda
                      </h3>

                      <div className="space-y-4 pl-1 relative">
                        {/* vertical line */}
                        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-100" />

                        {[
                          { time: "10:00 - 10:15", title: "Welcome & Icebreaker" },
                          { time: "10:15 - 11:00", title: "Discussion: Body Language" },
                          { time: "11:00 - 11:30", title: "Live Practice: STAR Method" },
                          { time: "11:30 - 12:00", title: "Reflection & Q&A" }
                        ].map((item, index) => (
                          <div key={index} className="flex gap-3 relative z-10 items-start">
                            <div className="h-3 w-3 bg-sustain-900 rounded-full border-4 border-white shadow-2xs mt-1 shrink-0" />
                            <div className="space-y-0.5">
                              <p className="text-[9px] font-bold text-sustain-900 font-sans">{item.time}</p>
                              <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Before You Join */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4 shadow-xs">
                      <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                        Before You Join
                      </h3>

                      <div className="space-y-3.5">
                        {[
                          { title: "Mic & Camera Check", desc: "Ensure you are in a quiet environment." },
                          { title: "Battery & Power", desc: "Connect to a power source for the full hour." },
                          { title: "Digital Notebook Ready", desc: "Have your module workbook open for practice." }
                        ].map((chk, index) => (
                          <div key={index} className="flex items-start gap-3 p-2 rounded-xl bg-slate-50/50 border border-slate-100">
                            <div className="h-5 w-5 rounded border border-slate-300 bg-white flex items-center justify-center shrink-0 text-sustain-900 mt-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                            <div className="text-xs">
                              <p className="font-bold text-slate-800">{chk.title}</p>
                              <p className="text-[10px] text-slate-400">{chk.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (col-span-4) */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                  
                  {/* Attendance Status */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-left shadow-xs">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">
                        Attendance Status
                      </h4>
                      <span className="text-[10px] font-extrabold py-0.5 px-2.5 bg-amber-55 text-amber-900 border border-amber-200 rounded-full">
                        Pending
                      </span>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Session Started", checked: true },
                        { label: "Successfully Joined", checked: attendanceStatus !== "not_joined" },
                        { label: "Min. 45 Min Participation", checked: attendanceStatus !== "not_joined" },
                        { label: "Attendance Code Verified", checked: attendanceStatus === "code_entered" || attendanceStatus === "pending_confirmation" }
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`h-5 w-5 border rounded-full flex items-center justify-center text-xs shrink-0 shadow-2xs ${
                            step.checked 
                              ? "bg-emerald-55 text-emerald-900 border-emerald-250" 
                              : "bg-slate-50 text-slate-300 border-slate-200"
                          }`}>
                            {step.checked && <Check className="h-3.5 w-3.5 stroke-[3.5]" />}
                          </div>
                          <span className={`text-xs font-semibold ${step.checked ? "text-slate-800" : "text-slate-400"}`}>
                            {step.label}
                          </span>
                        </div>
                      ))}

                      {/* progress bar */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                          <span>Overall Progress</span>
                          <span>{attendanceStatus === "not_joined" ? "20%" : (attendanceStatus === "joined" || attendanceStatus === "pending_confirmation") ? "75%" : "100%"}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-sustain-900 h-full rounded-full transition-all duration-500" 
                            style={{ width: attendanceStatus === "not_joined" ? "20%" : (attendanceStatus === "joined" || attendanceStatus === "pending_confirmation") ? "75%" : "100%" }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Module Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-left shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-2">
                      Next Module
                    </span>
                    
                    <div className="space-y-2">
                      <span className="bg-amber-50 text-amber-800 border border-amber-250 text-[10px] font-bold px-2 py-0.5 rounded-full block text-center uppercase tracking-wide">
                        Unlocks after attendance confirmation
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm font-heading">Module 4: Interview Preparation Practice</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Detailed simulation and post-session feedback analysis.
                      </p>
                    </div>
                  </div>

                  {/* Session Resources */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 text-left shadow-xs">
                    <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider border-b border-slate-100 pb-2">
                      Session Resources
                    </h4>

                    <div className="space-y-2">
                      <button 
                        onClick={() => showToast("Interview Cheat Sheet download simulated.", "success")}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-sustain-100 hover:bg-slate-50 text-left text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>Interview Cheat Sheet</span>
                        </div>
                        <Download className="h-4 w-4 text-slate-400" />
                      </button>

                      <button 
                        onClick={() => showToast("Session Slides PDF download simulated.", "success")}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-sustain-100 hover:bg-slate-50 text-left text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                          <span>Session Slides (PDF)</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* Dark Emerald Facilitator Card */}
                  <div className="bg-sustain-900 text-white rounded-2xl p-5 space-y-4 text-left shadow-xs relative overflow-hidden">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0">
                        HS
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm font-heading">Halima Sani</h4>
                        <p className="text-[10px] text-sustain-100 font-bold uppercase leading-none mt-0.5">Lead Facilitator</p>
                      </div>
                    </div>

                    <p className="text-xs text-sustain-100 font-medium leading-relaxed">
                      "Hi Aisha! If you have any trouble joining or connecting, message me here."
                    </p>

                    <button 
                      onClick={() => setIsHelpModalOpen(true)}
                      className="w-full text-center text-xs font-bold bg-white text-sustain-900 hover:bg-sustain-50 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                    >
                      Message Facilitator
                    </button>
                  </div>

                </div>

              </div>

            </main>

            {/* DESKTOP/TABLET STICKY BOTTOM ACTION BAR */}
            <div className="fixed bottom-0 left-0 lg:left-[280px] right-0 h-16 bg-white border-t border-slate-200 shadow-md z-30 px-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-sustain-900 rounded-full shrink-0 animate-pulse" />
                <p className="text-xs font-bold text-slate-700">
                  Session Status: <span className="text-slate-900 font-extrabold">Interview Practice Clinic is Active</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleScrollToConnection}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2 transition-colors cursor-pointer"
                >
                  Choose Connection
                </button>
                <button 
                  onClick={handleScrollToMarkAttendance}
                  className="text-xs font-bold py-2.5 px-6 bg-sustain-900 hover:bg-sustain-850 text-white rounded-xl transition-all shadow-2xs cursor-pointer"
                >
                  Mark Attendance
                </button>
              </div>
            </div>

          </div>

          {/* ========================================== */}
          {/* MOBILE VIEWPORT (less than md) */}
          {/* ========================================== */}
          <div className="md:hidden flex flex-col flex-1 pb-44">
            
            {/* MOBILE TOPBAR */}
            <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigateTo("/learner/journey")}
                  className="p-1 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                  aria-label="Back to journey"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-bold text-slate-900 tracking-tight font-heading">
                  Live Session
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
                <img 
                  src={aishaPhotoUrl}
                  alt="Aisha Mohammed" 
                  referrerPolicy="no-referrer"
                  className="h-7 w-7 rounded-full object-cover border border-slate-200 shrink-0"
                />
              </div>
            </header>

            {/* MOBILE SCROLLABLE CONTENT */}
            <div className="p-4 space-y-6">
              
              {/* 1. Mobile Hero Detail Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-4 shadow-2xs relative">
                
                {/* Top Line & Collision-free Status Badge */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Programme</p>
                    <p className="text-emerald-800 font-extrabold text-[11px] tracking-tight uppercase">
                      Youth Employability Pathway
                    </p>
                  </div>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0 uppercase tracking-wider">
                    <Clock className="h-3 w-3 text-amber-500 shrink-0" />
                    <span>Pending Attendance</span>
                  </span>
                </div>

                {/* Session Title */}
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-slate-900 text-base font-heading">
                    Interview Practice Clinic
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    Join the live session and complete the requirement to advance your learning pathway.
                  </p>
                </div>

                {/* Metadata vertical block */}
                <div className="space-y-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4 text-sustain-900 shrink-0" />
                    <span className="font-bold">Fri, 25 Oct 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4 text-sustain-900 shrink-0" />
                    <span className="font-bold">10:00 AM (90 mins)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="h-4 w-4 text-sustain-900 shrink-0" />
                    <span>Facilitator: <span className="font-bold text-slate-800">Halima Sani</span></span>
                  </div>
                </div>

                {/* Requirement Pills */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-indigo-50 border border-indigo-150 text-[9px] font-bold px-2 py-0.5 text-indigo-700 uppercase rounded tracking-wider">
                    Low-bandwidth Enabled
                  </span>
                  <span className="bg-emerald-50 border border-emerald-150 text-[9px] font-bold px-2 py-0.5 text-emerald-800 uppercase rounded tracking-wider">
                    Unlocks Module 4
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-1">
                  <button 
                    onClick={handleScrollToConnection}
                    className="w-full text-center font-bold text-xs py-3 px-4 bg-sustain-900 text-white rounded-xl shadow-2xs active:scale-95 cursor-pointer"
                  >
                    Join Session
                  </button>
                  <button 
                    onClick={handleDownloadPack}
                    className="w-full text-center font-bold text-xs py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-slate-400" />
                    <span>Download Pack</span>
                  </button>
                </div>
              </div>

              {/* 2. Mobile Attendance Progress Stepper Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Attendance Progress
                </h4>
                <div className="space-y-4 relative pl-1">
                  {/* stepper line */}
                  <div className="absolute left-[9px] top-2.5 bottom-2.5 w-0.5 bg-slate-100" />

                  {/* Step 1 */}
                  <div className="flex gap-3 relative z-10 items-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div className="text-xs space-y-0.5">
                      <p className="font-bold text-slate-800">Session Joined</p>
                      <p className="text-[10px] text-slate-400">Registered entry at 10:02 AM</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-3 relative z-10 items-start">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      attendanceStatus !== "not_joined" 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                        : "bg-amber-50 border-amber-200 text-amber-600"
                    }`}>
                      {attendanceStatus !== "not_joined" ? <Check className="h-3 w-3 stroke-[3]" /> : "2"}
                    </div>
                    <div className="text-xs space-y-0.5">
                      <p className={`font-bold ${attendanceStatus !== "not_joined" ? "text-slate-800" : "text-slate-700"}`}>Enter Session Code</p>
                      <p className="text-[10px] text-slate-400">Awaiting facilitator code</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-3 relative z-10 items-start">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      attendanceStatus === "code_entered" || attendanceStatus === "pending_confirmation" || attendanceStatus === "confirmed"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                        : "bg-slate-50 border-slate-200 text-slate-400"
                    }`}>
                      {(attendanceStatus === "code_entered" || attendanceStatus === "pending_confirmation" || attendanceStatus === "confirmed") ? <Check className="h-3 w-3 stroke-[3]" /> : "3"}
                    </div>
                    <div className="text-xs space-y-0.5">
                      <p className={`font-bold ${(attendanceStatus === "code_entered" || attendanceStatus === "pending_confirmation" || attendanceStatus === "confirmed") ? "text-slate-800" : "text-slate-400"}`}>Confirmation</p>
                      <p className="text-[10px] text-slate-400">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Mobile Choose Platform Section */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                  CHOOSE PLATFORM
                </h4>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-2xs">
                  {[
                    { title: "Google Meet", desc: "High quality video & chat", icon: Video, color: "bg-blue-50 text-blue-600 border-blue-100", id: "google_meet" },
                    { title: "Zoom Webinar", desc: "Interactive breakout rooms", icon: Tv, color: "bg-indigo-50 text-indigo-600 border-indigo-100", id: "zoom" },
                    { title: "Low-Bandwidth Mode", desc: "Audio + Live Text Transcripts", icon: Smartphone, color: "bg-emerald-50 text-emerald-600 border-emerald-100", id: "low_bandwidth" }
                  ].map((plat) => (
                    <button 
                      key={plat.id}
                      onClick={() => handleJoinPlatform(plat.id as any)}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-55 text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 ${plat.color} border rounded-xl flex items-center justify-center shrink-0`}>
                          <plat.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{plat.title}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{plat.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Mobile Verify Attendance Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Verify Attendance
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Enter the 6-digit code shared by the facilitator.
                </p>
                
                <div className="flex justify-between gap-1.5 py-1">
                  {mobileCode.map((cell, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={cell}
                      onChange={(e) => handleMobileCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleMobileCodeKeyDown(index, e)}
                      className="w-10 h-12 border border-slate-200 rounded-lg text-center text-sm font-bold bg-slate-50 focus:outline-none focus:border-sustain-900 focus:bg-white uppercase shrink-0"
                    />
                  ))}
                </div>

                <button 
                  onClick={handleMobileConfirmAttendance}
                  className="w-full bg-sustain-900 hover:bg-sustain-850 text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Confirm Attendance
                </button>

                <button
                  onClick={() => {
                    setAttendanceStatus("joined");
                    showToast("Switched platform view locally.", "info");
                  }}
                  className="w-full text-center text-[11px] font-bold text-sustain-900 hover:underline block cursor-pointer"
                >
                  I Joined via Low-Bandwidth Mode
                </button>
              </div>

            </div>

            {/* MOBILE STICKY BOTTOM ACTION BAR */}
            <div className="fixed bottom-16 left-0 right-0 p-3 bg-white border-t border-slate-200 z-30 shadow-md flex gap-2">
              <button 
                onClick={handleScrollToConnection}
                className="flex-1 bg-sustain-900 hover:bg-sustain-850 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Join Live</span>
              </button>
              <button 
                onClick={handleScrollToMarkAttendance}
                className="flex-1 bg-white border border-slate-200 hover:bg-slate-55 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Mark Attendance</span>
              </button>
            </div>

            {/* MOBILE BOTTOM NAVIGATION BAR */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 z-40 flex items-center justify-around shadow-lg px-2">
              {[
                { id: "home", label: "Home", icon: Home, path: "/learner" },
                { id: "journey", label: "Journey", icon: Compass, path: "/learner/journey" },
                { id: "courses", label: "Courses", icon: BookOpen, path: "/learner/courses" },
                { id: "tests", label: "Tests", icon: GraduationCap, path: "/learner/assessments" },
                { id: "support", label: "Support", icon: HelpCircle, path: "/learner/support" }
              ].map((item) => {
                const Icon = item.icon;
                const isItemActive = item.id === "journey";

                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.path as any)}
                    className={`flex flex-col items-center justify-center gap-1 h-full px-2 text-[10px] font-bold transition-colors cursor-pointer shrink-0 ${
                      isItemActive ? "text-sustain-900 font-extrabold" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <div className={`p-1 rounded-lg ${isItemActive ? "bg-sustain-55 text-sustain-900" : ""}`}>
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* ========================================== */}
      {/* MODALS & DIALOGS */}
      {/* ========================================== */}
      <AnimatePresence>
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
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-sustain-900 bg-slate-50/50"
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
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-sustain-900 bg-slate-50/50 resize-none"
                    placeholder="Describe any connection issues or attendance questions..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsHelpModalOpen(false)}
                    className="text-xs font-bold text-slate-500 border border-slate-200 py-2 px-4 rounded-xl hover:bg-slate-50 cursor-pointer"
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
      </AnimatePresence>

    </div>
  );
}
