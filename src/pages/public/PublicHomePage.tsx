import { useState, useEffect } from "react";
import { useRoute } from "../../context/RouteContext";
import { Card } from "../../components/ui/Card";
import { SustainPreloader } from "../../components/public/SustainPreloader";
import { StatusChip } from "../../components/ui/StatusChip";
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  GraduationCap, 
  LayoutDashboard, 
  Lock, 
  ShieldCheck, 
  WifiOff, 
  RefreshCw, 
  Users, 
  AlertCircle, 
  Database, 
  ArrowRight, 
  UserCheck, 
  MessageSquare,
  Sparkles,
  Inbox,
  Clock,
  Layers,
  FileCheck
} from "lucide-react";

export function PublicHomePage() {
  const { navigateTo } = useRoute();

  // Preloader state
  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window !== "undefined") {
      if ((window as any).__sustain_spa_loaded) {
        return false;
      }
      return true;
    }
    return true;
  });

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    if (typeof window !== "undefined") {
      (window as any).__sustain_spa_loaded = true;
    }
  };

  // Sticky bottom action bar state
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Scroll listener for mobile sticky action bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setShowStickyBar(window.scrollY > 350);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="public-home" className="space-y-0 text-left font-sans bg-slate-50/20">
      
      {/* =========================================================
          A. UNIQUE SUSTAIN PATHWAY PRELOADER (Runs once per session)
          ========================================================= */}
      {showPreloader && (
        <SustainPreloader onComplete={handlePreloaderComplete} />
      )}


      {/* =========================================================
          B. MOBILE-FIRST LANDING FLOW (Only visible on mobile: <md)
          ========================================================= */}
      <div className="block md:hidden space-y-0 bg-white">
        
        {/* 1. FULL-WIDTH DEEP EMERALD HERO SECTION */}
        <section className="bg-emerald-950 text-white w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="px-5 pt-12 pb-12 text-center flex flex-col items-center">
            <div className="space-y-4 max-w-sm mx-auto">
              <h1 className="text-[36px] font-bold tracking-tight text-white font-heading leading-[1.1]">
                Every step, clearly <span className="text-[#FBBF24]">connected.</span>
              </h1>
              
              <p className="text-sm leading-relaxed text-emerald-100/90 max-w-[320px] mx-auto pt-1 font-sans">
                From lessons to CPD and certificate review, SUSTAIN LMS keeps each learner’s progress clear — even with limited connectivity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-6 w-full max-w-[320px] mx-auto">
              <button 
                onClick={() => navigateTo("/signup")}
                className="h-11 bg-white hover:bg-slate-50 text-[#005C45] rounded-xl text-xs font-bold transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5 shadow-xs border-none"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5 text-[#005C45]" />
              </button>
              <button 
                onClick={() => navigateTo("/login")}
                className="h-11 bg-emerald-900/50 hover:bg-emerald-900/70 border border-emerald-800/60 text-white rounded-xl text-xs font-bold transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center"
              >
                Sign In
              </button>
            </div>
            <div className="text-center pt-4 w-full">
              <button
                onClick={() => navigateTo("/verify-certificate")}
                className="text-[11px] font-bold text-emerald-300 hover:text-white transition-colors underline underline-offset-4 decoration-emerald-500/50 cursor-pointer bg-transparent border-none"
              >
                Verify an issued certificate
              </button>
            </div>
          </div>
        </section>

        {/* 2. PRODUCT PREVIEW CARD */}
        <section className="bg-slate-50 w-full px-4 py-8 border-b border-slate-100 flex flex-col items-center">
          <div className="w-full max-w-[360px] bg-white text-slate-900 border border-slate-150 shadow-md rounded-3xl p-5 space-y-4">
            
            {/* Pathway Header */}
            <div className="pb-3 border-b border-slate-100 text-left">
              <span className="text-[9px] text-emerald-800 font-bold uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 inline-block">
                Sustained learning pathway
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 font-heading">Youth Employability Pathway</h4>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-normal font-medium">
                Course progress, assessment review, CPD credits, and session attendance in one clear flow.
              </p>
            </div>

            {/* Status items */}
            <div className="space-y-3 text-[11px] font-medium text-slate-700">
              
              {/* Row 1: Current course */}
              <div className="flex flex-col gap-1.5 p-2.5 bg-slate-50/55 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#005C45] shrink-0" />
                  <div className="min-w-0 flex-1 text-left">
                    <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider">Current course</span>
                    <span className="font-semibold text-slate-800 block text-[10px] truncate">Work Readiness Foundation</span>
                  </div>
                </div>
                <div className="flex justify-end pt-0.5">
                  <StatusChip status="in-progress" className="text-[9px] py-0.5 px-2 font-semibold" />
                </div>
              </div>

              {/* Row 2: Assessment */}
              <div className="flex flex-col gap-1.5 p-2.5 bg-slate-50/55 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#005C45] shrink-0" />
                  <div className="min-w-0 flex-1 text-left">
                    <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider">Assessment</span>
                    <span className="font-semibold text-slate-800 block text-[10px] truncate">Work Readiness Assignment</span>
                  </div>
                </div>
                <div className="flex justify-end pt-0.5">
                  <StatusChip status="draft-saved" className="text-[9px] py-0.5 px-2 font-semibold" />
                </div>
              </div>

              {/* Row 3: CPD progress bar */}
              <div className="bg-slate-50/55 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-left">
                  <span className="font-semibold text-slate-850 text-[10px] flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-[#005C45] shrink-0" />
                    CPD progress
                  </span>
                  <span className="font-bold text-slate-900 text-[10px]">22 of 35 credits</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#005C45] rounded-full" style={{ width: "62.8%" }} />
                </div>
              </div>

              {/* Row 4: Required session */}
              <div className="flex flex-col gap-1.5 p-2.5 bg-slate-50/55 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#005C45] shrink-0" />
                  <div className="min-w-0 flex-1 text-left">
                    <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider">Required session</span>
                    <span className="font-semibold text-slate-800 block text-[10px] truncate">Interview Practice Clinic</span>
                  </div>
                </div>
                <div className="flex justify-end pt-0.5">
                  <StatusChip status="attendance-pending" className="text-[9px] py-0.5 px-2 font-semibold" />
                </div>
              </div>

              {/* Bottom chips */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <StatusChip status="review-pending" className="text-[9px] py-1 px-1.5 justify-center font-semibold">Certificate review pending</StatusChip>
                <StatusChip status="offline-ready" className="text-[9px] py-1 px-1.5 justify-center font-semibold">Offline packs ready</StatusChip>
              </div>

            </div>
          </div>
        </section>

        {/* 3. WHAT SUSTAIN LMS SUPPORTS */}
        <section className="px-5 py-10 space-y-6 bg-white w-full">
          <div className="space-y-1.5 text-left">
            <span className="text-[9px] font-bold text-[#005C45] uppercase tracking-wider font-mono">PLATFORM CAPABILITIES</span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight font-heading">What SUSTAIN LMS supports</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Empowering structured Agribusiness professional development programs.</p>
          </div>

          <div className="space-y-4 text-left">
            {/* Pathways card */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <BookOpen className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Assigned learning pathways</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Follow customized course sequences, complete sequential lesson checklists, and track milestones designated by implementation teams.
              </p>
            </div>

            {/* Assessment card */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <FileText className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Assessments and facilitator review</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Complete and submit written response assignments, save local drafts, and receive grade sheets and direct coaching from certified coordinators.
              </p>
            </div>

            {/* CPD card */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <Award className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">CPD progress and certificate readiness</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Gather verified learning credits through core courses and required clinical attendance before coordinator certificate review.
              </p>
            </div>
          </div>
        </section>

        {/* 4. BUILT FOR REAL CONNECTIVITY CONDITIONS */}
        <section className="px-5 py-10 space-y-6 bg-slate-50 w-full border-t border-b border-slate-100">
          <div className="space-y-1.5 text-left">
            <span className="text-[9px] font-bold text-[#005C45] uppercase tracking-wider font-mono">OFFLINE ADAPTIVE</span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight font-heading">Built for real connectivity conditions</h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Continuous study features designed specifically for regional networks.</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <BookOpen className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Low-bandwidth mode</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Swap video modules instantly with high-efficiency reading guides and static graphics to maintain progress without heavy cellular data use.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <WifiOff className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Offline packs</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Download lessons and template questions when connected to local WiFi, and access course files completely offline anytime.
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <RefreshCw className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Saved drafts and sync-ready progress</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Write assignment drafts locally and log your hours securely; your work will sync automatically once an internet connection is established.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FOR LEARNERS, FACILITATORS, AND PROGRAMME TEAMS */}
        <section className="px-5 py-10 space-y-6 bg-white w-full">
          <div className="space-y-1.5 text-left">
            <span className="text-[9px] font-bold text-[#005C45] uppercase tracking-wider font-mono">WORKSPACE ROLES</span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight font-heading">For learners, facilitators, and programme teams</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">Dedicated spaces for each stage of regional agribusiness training.</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <GraduationCap className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Learner workspace</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Log in to follow your designated training pathway, access offline packs, save local drafts, and check your earned credit metrics.
              </p>
              <button
                onClick={() => navigateTo("/login")}
                className="w-full h-11 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5 shadow-xs border-none"
              >
                Learner Sign In
                <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
              </button>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <Users className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Facilitator review workspace</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Review written assignment declarations, submit clinic attendance logs, audit CPD credit claims, and support agribusiness cohorts.
              </p>
              <button
                onClick={() => navigateTo("/login")}
                className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5"
              >
                Facilitator Sign In
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-3xs hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-2 text-[#005C45]">
                <LayoutDashboard className="h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">Programme visibility</h3>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed font-medium">
                Access national analytics, manage pathway standards, audit active cohorts, and supervise certificate registration.
              </p>
              <button
                onClick={() => navigateTo("/login")}
                className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-1.5"
              >
                Admin Sign In
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </section>

        {/* 6. PUBLIC CERTIFICATE VERIFICATION */}
        <section className="px-5 py-10 bg-slate-50 w-full border-t border-b border-slate-100">
          <div className="bg-gradient-to-r from-[#003B2C] via-[#005C45] to-[#003B2C] text-white rounded-[28px] p-6 space-y-4 text-left shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-900/20 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-widest font-mono bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/30 w-fit block">
              PUBLIC LOOKUP
            </span>
            <h2 className="text-lg font-semibold tracking-tight font-heading">Certificate verification</h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Issued certificates can be verified through a public verification page. Employers or partners can verify issued agribusiness certificates instantly by credential code.
            </p>
            <button
              onClick={() => navigateTo("/verify-certificate")}
              className="w-full h-11 bg-white hover:bg-slate-50 text-emerald-950 rounded-xl text-xs font-bold transition-all active:scale-[0.99] cursor-pointer text-center border-none"
            >
              Verify Certificate
            </button>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="px-5 py-12 bg-white w-full text-center space-y-6">
          <div className="max-w-sm mx-auto space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">
              Start with SUSTAIN LMS
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Take the next step in structured agribusiness learning. Continue your journey with offline support and transparent progression.
            </p>
          </div>
          <div className="flex flex-col gap-3 max-w-[280px] mx-auto pt-2">
            <button
              onClick={() => navigateTo("/signup")}
              className="h-11 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center gap-1.5 border-none"
            >
              Get Started
              <ArrowRight className="h-4 w-4 text-emerald-300" />
            </button>
            <button
              onClick={() => navigateTo("/login")}
              className="h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-3xs cursor-pointer transition-all active:scale-[0.99] flex items-center justify-center"
            >
              Sign In
            </button>
          </div>
        </section>

      </div>


      {/* =========================================================
          C. PRISTINE DESKTOP LANDING LAYOUT (Only visible on tablet/desktop: >=md)
          ========================================================= */}
      <div className="hidden md:block space-y-0 bg-slate-50/5 pb-0">
        
        {/* 1. LANDING HERO SECTION */}
        <section className="relative bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 pt-20 pb-28 border-b border-slate-200/50 overflow-hidden">
          {/* Subtle background depth */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E8F5E9]/50 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#FFF8E1]/30 rounded-full blur-[110px] pointer-events-none -z-10" />

          <div className="mx-auto grid max-w-[1340px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-16 xl:gap-24 px-8 lg:px-10">
            
            {/* Left Content */}
            <div className="space-y-6 max-w-2xl text-left">
              <h1 className="text-4xl lg:text-[60px] xl:text-[72px] font-extrabold tracking-tight text-slate-900 font-heading leading-[1.02] flex flex-col">
                <span>Every step, clearly</span>
                <span className="text-[#D97706] mt-2">connected.</span>
              </h1>
              
              <p className="text-base lg:text-[19px] leading-8 text-slate-600 font-sans font-medium max-w-[620px] mt-7">
                From lessons to CPD and certificate review, SUSTAIN LMS keeps each learner’s progress clear — even with limited connectivity.
              </p>

              {/* CTA Buttons with pristine visual pairings */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-5 mt-10">
                <button 
                  onClick={() => navigateTo("/signup")} 
                  className="h-[56px] px-8 flex items-center justify-center gap-2.5 font-bold bg-[#005C45] text-white hover:bg-[#004735] text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.99] rounded-2xl cursor-pointer hover:-translate-y-0.5 border-none"
                >
                  Get Started
                  <ArrowRight className="h-4.5 w-4.5 text-emerald-300" />
                </button>
                <button 
                  onClick={() => navigateTo("/verify-certificate")} 
                  className="h-[56px] px-7 flex items-center justify-center gap-2 font-bold bg-white border border-slate-200 text-slate-700 hover:text-emerald-950 hover:bg-slate-50 hover:border-emerald-200 text-xs sm:text-sm shadow-3xs hover:shadow-md transition-all duration-300 active:scale-[0.99] rounded-2xl cursor-pointer hover:-translate-y-0.5"
                >
                  <ShieldCheck className="h-4.5 w-4.5 text-[#005C45]" />
                  Verify an issued certificate
                </button>
                <button 
                  onClick={() => navigateTo("/login")} 
                  className="px-5 h-[56px] flex items-center justify-center font-bold text-slate-600 hover:text-[#005C45] text-xs sm:text-sm cursor-pointer transition-all hover:bg-slate-100/50 rounded-2xl"
                >
                  Sign In
                </button>
              </div>

              {/* Trust Context Line under CTA */}
              <p className="text-xs lg:text-sm text-slate-500 mt-6 font-medium">
                Built for mobile-first learning, facilitator review, CPD tracking, and certificate readiness.
              </p>
            </div>

            {/* Right Content — PREMIUM LAYERED PRODUCT PREVIEW */}
            <div className="w-full flex justify-end">
              <Card className="w-full max-w-[480px] bg-white border border-slate-200/80 shadow-xl rounded-[32px] p-7 lg:p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-emerald-150">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/40 rounded-bl-full pointer-events-none" />
                
                <div className="relative space-y-5">
                  {/* Header Info */}
                  <div className="pb-3.5 border-b border-slate-100 text-left">
                    <span className="text-[9px] text-emerald-800 font-bold uppercase tracking-wider bg-emerald-100/40 px-2.5 py-0.5 rounded-full border border-emerald-200/30">
                      Sustained learning pathway
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-2 font-heading">Youth Employability Pathway</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Work readiness progress, assessment review, CPD credits, and session attendance in one connected flow.</p>
                  </div>

                  {/* Sub-cards / Details */}
                  <div className="space-y-3.5 text-xs">
                    {/* Current course */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between hover:border-emerald-200 hover:bg-white transition-all duration-200">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white text-[#005C45] rounded-xl border border-slate-100 shadow-4xs">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Current course</span>
                          <p className="font-bold text-slate-800 mt-0.5">Work Readiness Foundation</p>
                        </div>
                      </div>
                      <StatusChip status="in-progress" className="text-[10px] py-0.5 px-2.5 font-bold" />
                    </div>

                    {/* Assessment */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between hover:border-emerald-200 hover:bg-white transition-all duration-200">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white text-[#005C45] rounded-xl border border-slate-100 shadow-4xs">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Assessment</span>
                          <p className="font-bold text-slate-800 mt-0.5">Work Readiness Assignment</p>
                        </div>
                      </div>
                      <StatusChip status="draft-saved" className="text-[10px] py-0.5 px-2.5 font-bold" />
                    </div>

                    {/* CPD progress with progress bar */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60 space-y-2.5 hover:border-emerald-200 hover:bg-white transition-all duration-200">
                      <div className="flex items-center justify-between text-left">
                        <div className="flex items-center gap-2">
                          <Award className="h-4.5 w-4.5 text-[#005C45]" />
                          <span className="font-bold text-slate-800 text-[11px]">CPD progress</span>
                        </div>
                        <span className="font-bold text-slate-900 text-[11px]">22 of 35 credits</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "62.8%" }} />
                      </div>
                    </div>

                    {/* Required session */}
                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60 flex items-center justify-between hover:border-emerald-200 hover:bg-white transition-all duration-200">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white text-[#005C45] rounded-xl border border-slate-100 shadow-4xs">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Required session</span>
                          <p className="font-bold text-slate-800 mt-0.5">Interview Practice Clinic</p>
                        </div>
                      </div>
                      <StatusChip status="attendance-pending" className="text-[10px] py-0.5 px-2.5 font-bold" />
                    </div>

                    {/* Status pills row */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <StatusChip status="review-pending" className="text-[10px] py-1 px-2.5 justify-center font-bold">Certificate review pending</StatusChip>
                      <StatusChip status="offline-ready" className="text-[10px] py-1 px-2.5 justify-center font-bold">Offline packs ready</StatusChip>
                    </div>
                  </div>

                  {/* Footer label */}
                  <div className="pt-2 flex items-center justify-between text-[9px] text-slate-400 font-bold font-mono">
                    <span>PATHWAY ACTIVE</span>
                    <span>CPD RECORD AVAILABLE</span>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </section>

        {/* 2. TRUST / PROGRAMME CONTEXT STRIP */}
        <section className="bg-white py-10 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 text-center md:text-left">
              <div className="lg:px-4 flex flex-col justify-center border-l-2 border-emerald-500/30 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">PATHWAY</span>
                <p className="text-xs font-bold text-slate-800 mt-1 leading-tight">Assigned training</p>
              </div>
              <div className="lg:px-4 flex flex-col justify-center border-l-2 border-emerald-500/30 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">ASSESSMENT</span>
                <p className="text-xs font-bold text-slate-800 mt-1 leading-tight">Facilitator review</p>
              </div>
              <div className="lg:px-4 flex flex-col justify-center border-l-2 border-emerald-500/30 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">SESSIONS</span>
                <p className="text-xs font-bold text-slate-800 mt-1 leading-tight">Live session tracking</p>
              </div>
              <div className="lg:px-4 flex flex-col justify-center border-l-2 border-emerald-500/30 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">TRACKING</span>
                <p className="text-xs font-bold text-slate-800 mt-1 leading-tight">CPD credit metrics</p>
              </div>
              <div className="lg:px-4 flex flex-col justify-center border-l-2 border-emerald-500/30 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">CREDENTIALS</span>
                <p className="text-xs font-bold text-slate-800 mt-1 leading-tight">Public lookup</p>
              </div>
              <div className="lg:px-4 flex flex-col justify-center border-l-2 border-emerald-500/30 pl-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">CONNECTIVITY</span>
                <p className="text-xs font-bold text-slate-800 mt-1 leading-tight">Low-bandwidth packs</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HOW SUSTAIN WORKS SECTION with interaction lifts */}
        <section id="how-it-works" className="bg-slate-50/50 py-16 sm:py-24 border-b border-slate-100 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-left max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                How SUSTAIN works
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                A clear learning flow from pathway assignment to certificate readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {/* Step 1 */}
              <Card className="p-6 bg-white border border-slate-200/80 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200/80 transition-all duration-300 active:scale-[0.99] rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-950 font-bold font-mono text-xs flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100/60 transition-colors">
                    1
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Join a pathway</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Learners are assigned courses, modules, lessons, and milestones tailored to their regional pathway requirements.
                  </p>
                </div>
              </Card>

              {/* Step 2 */}
              <Card className="p-6 bg-white border border-slate-200/80 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200/80 transition-all duration-300 active:scale-[0.99] rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-950 font-bold font-mono text-xs flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100/60 transition-colors">
                    2
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Learn and complete checkpoints</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Lessons, low-bandwidth alternate materials, and local checkpoints help learners build professional knowledge.
                  </p>
                </div>
              </Card>

              {/* Step 3 */}
              <Card className="p-6 bg-white border border-slate-200/80 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200/80 transition-all duration-300 active:scale-[0.99] rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-950 font-bold font-mono text-xs flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100/60 transition-colors">
                    3
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Submit assessments</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Learners complete written response declarations, saving local drafts before executing official submissions.
                  </p>
                </div>
              </Card>

              {/* Step 4 */}
              <Card className="p-6 bg-white border border-slate-200/80 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200/80 transition-all duration-300 active:scale-[0.99] rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-950 font-bold font-mono text-xs flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100/60 transition-colors">
                    4
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Attend live sessions</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Required regional practice clinics and discussions contribute directly to curriculum progression logs.
                  </p>
                </div>
              </Card>

              {/* Step 5 */}
              <Card className="p-6 bg-white border border-slate-200/80 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200/80 transition-all duration-300 active:scale-[0.99] rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-950 font-bold font-mono text-xs flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100/60 transition-colors">
                    5
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Track CPD and certificate status</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    View verified learning credits, pending coordinator reviews, and eligibility checklists in real-time.
                  </p>
                </div>
              </Card>

              {/* Step 6 */}
              <Card className="p-6 bg-white border border-slate-200/80 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200/80 transition-all duration-300 active:scale-[0.99] rounded-2xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-950 font-bold font-mono text-xs flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-100/60 transition-colors">
                    6
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Verify certificates</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Certificate verification is available for issued records to check credentials instantly.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 4. LEARNING PATHWAY PREVIEW SECTION */}
        <section id="pathways" className="bg-white py-16 sm:py-24 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-left max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                A clearer pathway for every learner
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                Learners can see where they are, what comes next, and which activities affect progress.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Pathway Flow Column */}
              <div className="lg:col-span-8 space-y-4">
                <Card className="p-5 sm:p-6 bg-white border border-slate-200/80 shadow-3xs rounded-3xl space-y-4">
                  <div className="flex flex-col gap-4 text-xs font-medium">
                    
                    {/* Item 1 */}
                    <div className="flex items-start gap-4 p-3 bg-slate-50/60 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[10px] mt-1 shrink-0 font-mono">
                        ✓
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-900 truncate">Work Readiness Foundation</span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg shrink-0">Complete</span>
                        </div>
                        <p className="text-slate-500 text-[11.5px] mt-0.5">Core modules and checkpoints covering essential skills.</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-4 p-3 bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-200 shadow-4xs">
                      <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 flex items-center justify-center font-bold text-[10px] mt-1 shrink-0 font-mono">
                        ●
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-900 truncate">Preparing for Interviews</span>
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg shrink-0">Current</span>
                        </div>
                        <p className="text-slate-500 text-[11.5px] mt-0.5">Interview clinic preparedness, portfolio reviews, and checklists.</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-4 p-3 bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-200 shadow-4xs">
                      <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-[10px] mt-1 shrink-0 font-mono">
                        3
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-700 truncate">Work Readiness Assignment</span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg shrink-0">Locked</span>
                        </div>
                        <p className="text-slate-400 text-[11.5px] mt-0.5">Submit structured questions for cohort grading.</p>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-start gap-4 p-3 bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-200 shadow-4xs">
                      <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-[10px] mt-1 shrink-0 font-mono">
                        4
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-700 truncate">Interview Practice Clinic</span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg shrink-0">Live Class</span>
                        </div>
                        <p className="text-slate-400 text-[11.5px] mt-0.5">Active practical workshop and supervisor confirmation.</p>
                      </div>
                    </div>

                    {/* Item 5 */}
                    <div className="flex items-start gap-4 p-3 bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-200 shadow-4xs">
                      <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center font-bold text-[10px] mt-1 shrink-0 font-mono">
                        5
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-700 truncate">CPD Record & Verification</span>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg shrink-0">Milestone</span>
                        </div>
                        <p className="text-slate-400 text-[11.5px] mt-0.5">Final pathway audit and certificate review submission.</p>
                      </div>
                    </div>

                  </div>
                </Card>
              </div>

              {/* Description Card Column */}
              <div className="lg:col-span-4 space-y-6 text-left">
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 space-y-4">
                  <Award className="h-8 w-8 text-[#005C45]" />
                  <h3 className="text-base font-bold text-slate-900 font-heading">Empowering success</h3>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                    The pathway dashboard provides clear status indicators, helping learners see where they are in their training, what is required for review, and how many credits they have gathered.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo("/signup")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005C45] hover:text-[#003B2C] cursor-pointer bg-transparent border-none"
                    >
                      Join structured pathways
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LOW-BANDWIDTH AND OFFLINE SECTION */}
        <section className="bg-gradient-to-b from-slate-50 to-emerald-50/10 py-16 sm:py-24 border-y border-slate-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-left max-w-2xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-850 uppercase tracking-wider font-mono">OFFLINE ADAPTIVE</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                Built for low-connectivity learning
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                Learners can use lighter materials, download packs, save drafts locally, and sync work when they reconnect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <Card className="p-6 bg-white border border-slate-200/85 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 transition-all duration-350 rounded-2xl space-y-4">
                <div className="p-2.5 bg-emerald-50/50 text-emerald-950 w-fit rounded-xl border border-emerald-100/50">
                  <BookOpen className="h-5 w-5 text-[#005C45]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Low-bandwidth mode</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Text-first lesson options, stripped resource view, and reduced media parameters allow continuous progress.
                </p>
              </Card>

              <Card className="p-6 bg-white border border-slate-200/85 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 transition-all duration-350 rounded-2xl space-y-4">
                <div className="p-2.5 bg-emerald-50/50 text-emerald-950 w-fit rounded-xl border border-emerald-100/50">
                  <WifiOff className="h-5 w-5 text-[#005C45]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Offline Centre</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Downloaded course packs, saved drafts, and pending synchronization indicators are always visible.
                </p>
              </Card>

              <Card className="p-6 bg-white border border-slate-200/85 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 transition-all duration-350 rounded-2xl space-y-4">
                <div className="p-2.5 bg-emerald-50/50 text-emerald-950 w-fit rounded-xl border border-emerald-100/50">
                  <Calendar className="h-5 w-5 text-[#005C45]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Session packs</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Access live session details and attendance templates offline to prepare for scheduled workshops in advance.
                </p>
              </Card>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-xl text-[11px] text-slate-500 font-medium text-left">
              * Offline learning features rely on local storage cache and coordinate updates during session connectivity.
            </div>
          </div>
        </section>

        {/* 6. FACILITATOR REVIEW SECTION */}
        <section className="bg-white py-16 sm:py-24 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-left max-w-2xl space-y-2">
              <span className="text-[10px] font-bold text-[#005C45] uppercase tracking-wider font-mono">COHORT COORDINATION</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                Facilitator review without confusion
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                Facilitators can review checkpoint outcomes, assessment submissions, attendance logs, CPD files, and certificate readiness.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="p-5 bg-slate-50/50 border border-slate-200/70 rounded-2xl hover:shadow-md hover:-translate-y-1 hover:bg-white hover:border-emerald-200 transition-all duration-300 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 font-heading">Assessment reviews</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium font-sans">Evaluate uploaded student responses and grade assessments using standard regional guidelines.</p>
              </div>
              <div className="p-5 bg-slate-50/50 border border-slate-200/70 rounded-2xl hover:shadow-md hover:-translate-y-1 hover:bg-white hover:border-emerald-200 transition-all duration-300 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 font-heading">Attendance logs</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium font-sans">Confirm learner attendance for required agribusiness clinics and regional hub sessions.</p>
              </div>
              <div className="p-5 bg-slate-50/50 border border-slate-200/70 rounded-2xl hover:shadow-md hover:-translate-y-1 hover:bg-white hover:border-emerald-200 transition-all duration-300 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 font-heading">CPD review queue</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium font-sans">Review submitted learner credits to verify task compliance and regional alignment.</p>
              </div>
              <div className="p-5 bg-slate-50/50 border border-slate-200/70 rounded-2xl hover:shadow-md hover:-translate-y-1 hover:bg-white hover:border-emerald-200 transition-all duration-300 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 font-heading">Learner messaging</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium font-sans">Provide developmental advice and reply to learner support requests inside dedicated course boards.</p>
              </div>
              <div className="p-5 bg-slate-50/50 border border-slate-200/70 rounded-2xl hover:shadow-md hover:-translate-y-1 hover:bg-white hover:border-emerald-200 transition-all duration-300 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 font-heading">Module unlocks</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium font-sans">Adjust advanced module parameters and track cohort pacing logs for active regional plans.</p>
              </div>
              <div className="p-5 bg-slate-50/50 border border-slate-200/70 rounded-2xl hover:shadow-md hover:-translate-y-1 hover:bg-white hover:border-emerald-200 transition-all duration-300 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 font-heading">Announcements</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium font-sans">Broadcast notices and programmatic guidelines to keep all cohort learners aligned.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CPD AND CERTIFICATE SECTION */}
        <section className="bg-slate-50/30 py-16 sm:py-24 border-b border-slate-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-semibold text-[#005C45] uppercase tracking-wider font-sans">Certificate Readiness</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                  CPD and certificate readiness, made visible
                </h2>
                <p className="text-xs sm:text-sm text-slate-650 font-semibold leading-relaxed font-sans">
                  Learners can understand confirmed credits, pending review items, and what remains before final certificate review.
                </p>
              </div>

              <div className="lg:col-span-7">
                <Card className="p-6 bg-white border border-slate-200 shadow-xs hover:border-emerald-150 hover:shadow-md transition-all duration-300 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-800 border border-emerald-100/50">
                        <Award className="h-5 w-5 text-[#005C45]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 font-heading">Work Readiness Certificate</h4>
                        <span className="text-[10px] text-slate-400 font-medium font-sans block mt-0.5">Youth Employability Pathway</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Review pending
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-100 py-4 text-center">
                    <div>
                      <span className="text-[10px] text-slate-450 font-semibold block uppercase tracking-wider">CPD Progress</span>
                      <span className="font-bold text-slate-900 text-xs mt-1 block font-sans">22 / 35 credits</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-450 font-semibold block uppercase tracking-wider">Review Pending</span>
                      <span className="font-bold text-slate-900 text-xs mt-1 block font-sans">4 items</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-450 font-semibold block uppercase tracking-wider">Certificate Status</span>
                      <span className="font-semibold text-amber-800 text-xs mt-1 block">Review pending</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium italic text-left">
                    * Certificates are subject to formal programme review and audit, and are only publicly searchable once issued.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CERTIFICATE VERIFICATION CALLOUT */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#003B2C] via-[#005C45] to-[#003B2C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative space-y-6 max-w-xl text-left">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest font-mono bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/30 w-fit block">
                  PUBLIC LOOKUP
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">Verify an issued certificate</h2>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                  Check a SUSTAIN certificate using a certificate ID or learner verification code to confirm an issued certificate record.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={() => navigateTo("/verify-certificate")}
                    className="h-11 px-6 bg-white hover:bg-slate-50 text-[#005C45] rounded-xl text-xs font-bold transition-all cursor-pointer text-center border-none"
                  >
                    Verify Certificate
                  </button>
                  <button
                    onClick={() => navigateTo("/help")}
                    className="h-11 px-4 text-emerald-250 hover:text-white text-xs font-semibold cursor-pointer text-center transition-colors bg-transparent border-none"
                  >
                    Learn how verification works
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. ROLE-BASED ENTRY CARDS with premium hover states */}
        <section className="bg-slate-50/30 py-16 sm:py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-left max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                Access your pathway or workspace
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Learner Card */}
              <Card className="p-6 bg-white border border-slate-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between rounded-2xl h-full text-left active:scale-[0.99] group">
                <div className="space-y-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-950 w-fit rounded-xl border border-emerald-100/50 group-hover:bg-emerald-100/50 transition-colors">
                    <GraduationCap className="h-5 w-5 text-[#005C45]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Learner Workspace</h3>
                  <p className="text-xs text-slate-650 leading-relaxed font-medium">
                    Continue lessons, assessments, live sessions, CPD records, and support tracking.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => navigateTo("/login")}
                    className="w-full h-11 bg-[#005C45] hover:bg-[#004735] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border-none"
                  >
                    Learner Sign In
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
                  </button>
                </div>
              </Card>

              {/* Facilitator Card */}
              <Card className="p-6 bg-white border border-slate-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between rounded-2xl h-full text-left active:scale-[0.99] group">
                <div className="space-y-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-950 w-fit rounded-xl border border-emerald-100/50 group-hover:bg-emerald-100/50 transition-colors">
                    <Users className="h-5 w-5 text-[#005C45]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Facilitator Workspace</h3>
                  <p className="text-xs text-slate-650 leading-relaxed font-medium">
                    Review submissions, attendance, CPD credits, learner questions, and progression.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => navigateTo("/login")}
                    className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Facilitator Sign In
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                </div>
              </Card>

              {/* Verifier Card */}
              <Card className="p-6 bg-white border border-slate-200 hover:-translate-y-1 hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between rounded-2xl h-full text-left active:scale-[0.99] group">
                <div className="space-y-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-950 w-fit rounded-xl border border-emerald-100/50 group-hover:bg-emerald-100/50 transition-colors">
                    <ShieldCheck className="h-5 w-5 text-[#005C45]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Public Verification</h3>
                  <p className="text-xs text-slate-650 leading-relaxed font-medium">
                    Confirm issued certificate records instantly.
                  </p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => navigateTo("/verify-certificate")}
                    className="w-full h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Verify Certificate
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 10. FINAL CTA */}
        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-amber-50/15 via-white to-emerald-50/15 border border-slate-200/80 rounded-3xl py-12 px-6 sm:px-12 shadow-sm text-center max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
                Start with a clear learning pathway.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-sans leading-relaxed font-medium">
                Use SUSTAIN LMS to manage structured learning, review, support, CPD progress, and certificate readiness.
              </p>
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-stretch sm:items-center pt-2 max-w-md mx-auto">
                <button
                  onClick={() => navigateTo("/signup")}
                  className="h-11 px-6 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1.5 border-none"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 text-emerald-300" />
                </button>
                <button
                  onClick={() => navigateTo("/login")}
                  className="h-11 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-3xs cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateTo("/verify-certificate")}
                  className="h-11 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold shadow-3xs cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  Verify Certificate
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* =========================================================
          D. LIGHTWEIGHT STICKY BOTTOM ACTION BAR (Mobile only, scroll triggered)
          ========================================================= */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 pb-safe flex items-center justify-between gap-3 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] animate-in slide-in-from-bottom duration-350">
          <button 
            onClick={() => navigateTo("/signup")}
            className="flex-1 h-11 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center shadow-xs border-none"
          >
            Get Started
          </button>
          <button 
            onClick={() => navigateTo("/login")}
            className="flex-1 h-11 bg-white hover:bg-slate-50 border border-slate-200 text-slate-750 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center shadow-3xs"
          >
            Sign In
          </button>
        </div>
      )}

    </div>
  );
}
