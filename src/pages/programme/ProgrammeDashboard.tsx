import { useState, useMemo } from "react";
import { 
  Users, 
  Activity, 
  Layers, 
  Award, 
  WifiOff, 
  TrendingUp, 
  ArrowRight, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  BarChart3,
  ChevronRight,
  Inbox,
  CheckCircle2,
  X
} from "lucide-react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { nigeriaStates, getLGAsByState } from "../../data/nigeriaLocations";

export function ProgrammeDashboard() {
  const { navigateTo, showToast } = useRoute();
  
  // Interactive filters for Gender & Location coverage
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedLga, setSelectedLga] = useState<string>("All");

  // Get active LGAs when a state is selected
  const availableLgas = useMemo(() => {
    if (selectedState === "All") return [];
    return getLGAsByState(selectedState);
  }, [selectedState]);

  // Reset LGA when state changes
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedLga("All");
  };

  // Compute dynamic location reporting metrics based on state/LGA selections
  const locationStats = useMemo(() => {
    if (selectedState === "All") {
      return {
        enrolled: 4286,
        activeRate: 77.4,
        topHub: "Kano Municipal",
        lowBandwidthPct: 62.5,
        cpdReady: 1204,
      };
    }
    
    const seed = selectedState.length;
    const enrolled = 150 + (seed * 84) + (selectedLga !== "All" ? -45 : 0);
    const activeRate = 70 + (seed % 15) + (selectedLga !== "All" ? 2 : 0);
    const lowBandwidthPct = 40 + (seed * 3) % 35 + (selectedLga !== "All" ? 5 : 0);
    const cpdReady = Math.round(enrolled * 0.28);
    const topHub = selectedLga !== "All" ? selectedLga : (availableLgas[0]?.name || "Central Hub");

    return {
      enrolled,
      activeRate,
      topHub,
      lowBandwidthPct,
      cpdReady,
    };
  }, [selectedState, selectedLga, availableLgas]);

  return (
    <div className="space-y-5 md:space-y-6 text-left animate-in fade-in duration-300 pb-[calc(7rem+env(safe-area-inset-bottom))] lg:pb-8">
      
      {/* ========================================== */}
      {/* 1. MOBILE RESPONSIVE HERO FLOW (lg:hidden) */}
      {/* ========================================== */}
      <div className="block lg:hidden space-y-4">
        {/* COMPACT MOBILE PROGRAMME PULSE CARD */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-xs relative overflow-hidden">
          <div className="absolute right-0 top-0 h-32 w-32 bg-emerald-50/40 rounded-full blur-2xl -z-10" />
          
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-bold text-[#005C45] bg-emerald-50/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              SUSTAIN CPD Programme
            </span>
            
            <div className="space-y-1">
              <h1 className="text-xl font-extrabold text-slate-950 tracking-tight font-heading leading-tight">
                Programme Dashboard
              </h1>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Monitor enrolment, CPD readiness, certificate review, and low-bandwidth access.
              </p>
            </div>

            {/* Compact meta row with tiny chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                Nigeria-wide
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800">
                10,000 target
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#005C45]">
                Updated today
              </span>
            </div>
          </div>
        </div>

        {/* COMPACT MOBILE QUICK ACTIONS ROW */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => navigateTo("/programme/reports" as RoutePath)}
            className="flex flex-col items-center justify-center p-3.5 bg-white border border-slate-150 rounded-2xl active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            <BarChart3 className="h-5 w-5 text-slate-600 mb-1" />
            <span className="text-[10px] font-extrabold text-slate-800 font-sans">Reports</span>
          </button>
          <button
            onClick={() => navigateTo("/programme/learners" as RoutePath)}
            className="flex flex-col items-center justify-center p-3.5 bg-white border border-emerald-100 rounded-2xl active:scale-[0.99] transition-all cursor-pointer text-center"
          >
            <Users className="h-5 w-5 text-[#005C45] mb-1" />
            <span className="text-[10px] font-extrabold text-[#005C45] font-sans">Learners</span>
          </button>
          <button
            onClick={() => navigateTo("/programme/certificates" as RoutePath)}
            className="flex flex-col items-center justify-center p-3.5 bg-[#005C45] text-white rounded-2xl active:scale-[0.99] transition-all cursor-pointer text-center shadow-3xs"
          >
            <Award className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-extrabold font-sans">Certificates</span>
          </button>
        </div>

        {/* TODAY'S PRIORITY CARD (Unified Priority Oversight) */}
        <div className="bg-white p-4.5 rounded-3xl border border-amber-100/80 shadow-xs text-left">
          <div className="mb-3.5">
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide font-heading">Today's priority</h2>
            <p className="text-[10px] text-slate-450 font-semibold leading-relaxed mt-0.5">Actions that need programme team attention.</p>
          </div>

          <div className="space-y-2">
            {/* Priority 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100/50">
              <div className="text-left space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Certificate review</p>
                <p className="text-[10px] text-slate-500 font-medium">312 ready</p>
              </div>
              <button
                onClick={() => navigateTo("/programme/certificates" as RoutePath)}
                className="px-3.5 py-1.5 bg-[#005C45] text-white text-[10px] font-extrabold rounded-lg cursor-pointer hover:bg-[#003B2C] active:scale-95 transition-all"
              >
                Review
              </button>
            </div>

            {/* Priority 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/45 border border-blue-100/50">
              <div className="text-left space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Learner follow-up</p>
                <p className="text-[10px] text-slate-500 font-medium">148 inactive</p>
              </div>
              <button
                onClick={() => navigateTo("/programme/learners" as RoutePath)}
                className="px-3.5 py-1.5 bg-white text-[#005C45] border border-emerald-200 text-[10px] font-extrabold rounded-lg cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
              >
                View
              </button>
            </div>

            {/* Priority 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 border border-emerald-100/50">
              <div className="text-left space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Facilitator reviews</p>
                <p className="text-[10px] text-slate-500 font-medium">76 pending</p>
              </div>
              <button
                onClick={() => navigateTo("/programme/support" as RoutePath)}
                className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-[10px] font-extrabold rounded-lg cursor-pointer hover:bg-slate-200 active:scale-95 transition-all"
              >
                Check
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. DESKTOP RESPONSIVE HERO FLOW (lg:block) */}
      {/* ========================================== */}
      <div className="hidden lg:block space-y-6">
        {/* FULL-FEATURED HERO MONITOR BANNER */}
        <div className="relative overflow-hidden bg-white p-8 rounded-3xl border border-emerald-100 shadow-xs">
          <div className="absolute right-0 top-0 h-48 w-48 bg-emerald-50/45 rounded-full blur-3xl -z-10" />
          <div className="absolute left-1/3 bottom-0 h-36 w-36 bg-blue-50/30 rounded-full blur-2xl -z-10" />

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="space-y-4 max-w-3xl text-left">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-[#005C45] border border-emerald-100 uppercase tracking-wider font-sans">
                  SUSTAIN CPD Programme
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-150 uppercase tracking-wider font-sans">
                  Nigeria-wide implementation
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-150 uppercase tracking-wider font-sans">
                  10,000 learner target
                </span>
              </div>
              
              <div className="space-y-1.5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading leading-tight">
                  Programme Dashboard
                </h1>
                <p className="text-sm text-slate-600 font-medium leading-relaxed font-sans">
                  Monitor enrolment, cohort progress, CPD readiness, certificate review, and low-bandwidth access across SUSTAIN LMS.
                </p>
              </div>

              {/* Compact pulse row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-slate-100/85">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                  Today's focus:
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-100/60 font-sans">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  312 certificate reviews ready
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-100/60 font-sans">
                  148 learners need follow-up
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100/60 font-sans">
                  76 facilitator reviews pending
                </span>
              </div>
            </div>

            {/* Large primary actions */}
            <div className="flex gap-2.5 shrink-0">
              <button
                onClick={() => navigateTo("/programme/reports" as RoutePath)}
                className="px-5 py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-2xl border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5 h-[48px]"
              >
                <BarChart3 className="h-4 w-4 text-slate-600" />
                <span>View Reports</span>
              </button>
              <button
                onClick={() => navigateTo("/programme/learners" as RoutePath)}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-[#005C45] text-xs font-bold rounded-2xl border border-emerald-200 hover:border-[#005C45] transition-all cursor-pointer flex items-center gap-1.5 h-[48px]"
              >
                <Users className="h-4 w-4" />
                <span>Manage Learners</span>
              </button>
              <button
                onClick={() => navigateTo("/programme/certificates" as RoutePath)}
                className="px-6 py-3 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 h-[48px] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <Award className="h-4 w-4" />
                <span>Review Certificates</span>
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP DECISION FOCUS ROW */}
        <div className="bg-slate-50 p-1 rounded-3xl">
          <div className="mb-4">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Today's programme focus</h2>
            <p className="text-xs text-slate-500 font-medium">Critical oversight items and direct intervention actions required today.</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {/* Certs */}
            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-3xs flex flex-col justify-between gap-4 hover:shadow-2xs transition-all text-left">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-850 border border-amber-100 font-sans uppercase tracking-wider">
                  Action required
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 pt-1">Certificate review</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  312 learners met all progress rubrics and are ready for portfolio sign-off.
                </p>
              </div>
              <button
                onClick={() => navigateTo("/programme/certificates" as RoutePath)}
                className="w-full py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Review certificates</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Inactive */}
            <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-3xs flex flex-col justify-between gap-4 hover:shadow-2xs transition-all text-left">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-50 text-blue-800 border border-blue-100 font-sans uppercase tracking-wider">
                  Oversight alert
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 pt-1">Learner follow-up</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  148 learners inactive for 14+ days across Agribusiness pathways.
                </p>
              </div>
              <button
                onClick={() => navigateTo("/programme/learners" as RoutePath)}
                className="w-full py-2.5 bg-white hover:bg-slate-50 text-[#005C45] border border-emerald-250 hover:border-[#005C45] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View inactive list</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Facilitators */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs flex flex-col justify-between gap-4 hover:shadow-2xs transition-all text-left">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-sans uppercase tracking-wider">
                  Facilitator queue
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 pt-1">Facilitator action</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  76 portfolio assessment checklists waiting for regional facilitator logs.
                </p>
              </div>
              <button
                onClick={() => {
                  showToast("Redirecting to national oversight logs.");
                  navigateTo("/programme/support" as RoutePath);
                }}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Check queue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Support */}
            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-3xs flex flex-col justify-between gap-4 hover:shadow-2xs transition-all text-left">
              <div className="space-y-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-100/50 font-sans uppercase tracking-wider">
                  Support desk
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 pt-1">Support needs</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  23 open regional support tickets regarding offline lesson package keys.
                </p>
              </div>
              <button
                onClick={() => navigateTo("/programme/support" as RoutePath)}
                className="w-full py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Open support desk</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. PRIMARY KPI COMPACT SNAPSHOT GRID       */}
      {/* ========================================== */}
      <div id="kpi-grid" className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 md:gap-4">
        
        {/* KPI 1: Learners enrolled */}
        <div className="bg-white p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/70 shadow-xs space-y-3 md:space-y-4 text-left transition-all hover:border-emerald-250">
          <div className="flex items-center justify-between">
            <span className="text-[11px] md:text-xs font-bold text-slate-500 font-sans leading-none">Learners enrolled</span>
            <div className="p-1.5 md:p-2 bg-emerald-50 text-[#005C45] rounded-lg md:rounded-xl shrink-0">
              <Users className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
            </div>
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-xl md:text-[28px] font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
              4,286
            </p>
            <p className="text-[10px] text-slate-500 font-semibold font-sans flex items-center gap-1 leading-normal">
              <TrendingUp className="h-3 w-3 text-emerald-650 shrink-0" />
              <span>43% of target</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Active learners */}
        <div className="bg-white p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/70 shadow-xs space-y-3 md:space-y-4 text-left transition-all hover:border-blue-250">
          <div className="flex items-center justify-between">
            <span className="text-[11px] md:text-xs font-bold text-slate-500 font-sans leading-none">Active learners</span>
            <div className="p-1.5 md:p-2 bg-blue-50 text-blue-600 rounded-lg md:rounded-xl shrink-0">
              <Activity className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
            </div>
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-xl md:text-[28px] font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
              3,320
            </p>
            <p className="text-[10px] text-slate-500 font-semibold font-sans flex items-center gap-1 leading-normal">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              <span>Last 30 days</span>
            </p>
          </div>
        </div>

        {/* KPI 3: CPD readiness */}
        <div className="bg-white p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/70 shadow-xs space-y-3 md:space-y-4 text-left transition-all hover:border-amber-250">
          <div className="flex items-center justify-between">
            <span className="text-[11px] md:text-xs font-bold text-slate-500 font-sans leading-none">CPD readiness</span>
            <div className="p-1.5 md:p-2 bg-amber-50 text-amber-600 rounded-lg md:rounded-xl shrink-0">
              <Award className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
            </div>
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-xl md:text-[28px] font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
              1,204
            </p>
            <p className="text-[10px] text-slate-500 font-semibold font-sans flex items-center gap-1 leading-normal">
              <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
              <span>Near eligible</span>
            </p>
          </div>
        </div>

        {/* KPI 4: Certificates issued */}
        <div className="bg-white p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/70 shadow-xs space-y-3 md:space-y-4 text-left transition-all hover:border-amber-250">
          <div className="flex items-center justify-between">
            <span className="text-[11px] md:text-xs font-bold text-slate-500 font-sans leading-none">Certificates issued</span>
            <div className="p-1.5 md:p-2 bg-amber-50 text-amber-700 rounded-lg md:rounded-xl shrink-0">
              <Award className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
            </div>
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-xl md:text-[28px] font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
              532
            </p>
            <p className="text-[10px] text-amber-800 font-bold font-sans flex items-center gap-1 leading-normal">
              <Clock className="h-3 w-3 text-amber-600 shrink-0" />
              <span>312 ready</span>
            </p>
          </div>
        </div>

        {/* KPI 5: Course completion */}
        <div className="bg-white p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/70 shadow-xs space-y-3 md:space-y-4 text-left transition-all hover:border-emerald-250">
          <div className="flex items-center justify-between">
            <span className="text-[11px] md:text-xs font-bold text-slate-500 font-sans leading-none">Course completion</span>
            <div className="p-1.5 md:p-2 bg-emerald-50 text-emerald-600 rounded-lg md:rounded-xl shrink-0">
              <Layers className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
            </div>
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-xl md:text-[28px] font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
              61%
            </p>
            <p className="text-[10px] text-slate-500 font-semibold font-sans flex items-center gap-1 leading-normal">
              <CheckCircle className="h-3 w-3 text-emerald-650 shrink-0" />
              <span>Active pathways</span>
            </p>
          </div>
        </div>

        {/* KPI 6: Offline access */}
        <div className="bg-white p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/70 shadow-xs space-y-3 md:space-y-4 text-left transition-all hover:border-teal-250">
          <div className="flex items-center justify-between">
            <span className="text-[11px] md:text-xs font-bold text-slate-500 font-sans leading-none">Offline access</span>
            <div className="p-1.5 md:p-2 bg-teal-50 text-teal-605 rounded-lg md:rounded-xl shrink-0">
              <WifiOff className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
            </div>
          </div>
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-xl md:text-[28px] font-extrabold tracking-tight text-slate-950 font-sans leading-tight">
              62.5%
            </p>
            <p className="text-[10px] text-slate-500 font-semibold font-sans flex items-center gap-1 leading-normal">
              <MapPin className="h-3 w-3 text-teal-600 shrink-0" />
              <span>Lightweight packs</span>
            </p>
          </div>
        </div>

      </div>

      {/* DUAL-COLUMN BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
        
        {/* LEFT COLUMN: Progress, Cohort Health, Pathway, Gender & Location */}
        <div className="lg:col-span-7 space-y-5 md:space-y-6">
          
          {/* 4. PROGRAMME PROGRESS SUMMARY */}
          <div className="bg-white p-4.5 md:p-6 rounded-3xl border border-slate-200/75 shadow-xs space-y-4 md:space-y-5 text-left transition-all">
            <div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-heading tracking-tight">Programme progress</h3>
              <p className="text-[10px] md:text-[11px] text-slate-500 font-medium font-sans mt-0.5">How the current implementation is tracking against the first deployment target.</p>
            </div>

            <div className="space-y-4">
              {/* Progress 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-sans font-medium text-[11px] md:text-xs">Learner target: <span className="text-slate-900 font-bold">4,286 of 10,000</span></span>
                  <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[9px] md:text-[10px] border border-emerald-100">43%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#005C45] to-emerald-500 rounded-full transition-all" style={{ width: "43%" }} />
                </div>
              </div>

              {/* Progress 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-sans font-medium text-[11px] md:text-xs">CPD readiness: <span className="text-slate-900 font-bold">1,204 of 4,286</span></span>
                  <span className="text-[#005C45] font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[9px] md:text-[10px] border border-emerald-100">28%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#005C45] to-emerald-400 rounded-full transition-all" style={{ width: "28%" }} />
                </div>
              </div>

              {/* Progress 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-sans font-medium text-[11px] md:text-xs">Certificate pipeline: <span className="text-slate-900 font-bold">532 of 1,204</span></span>
                  <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md text-[9px] md:text-[10px] border border-amber-100">44%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-650 rounded-full transition-all" style={{ width: "44%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* 5. COHORT HEALTH SECTION */}
          <div className="bg-white p-4.5 md:p-6 rounded-3xl border border-slate-200/75 shadow-xs space-y-4 md:space-y-5 text-left transition-all">
            <div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-heading tracking-tight">Cohort health</h3>
              <p className="text-[10px] md:text-[11px] text-slate-500 font-medium font-sans mt-0.5">Track delivery progress across active cohorts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              
              {/* Cohort 1 */}
              <div className="p-3.5 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200/80 transition-all space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-extrabold text-slate-950 font-heading leading-tight truncate">Kano Employability 02</p>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-medium font-sans truncate">Kano Municipal | Aminu Umar</p>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold bg-emerald-50 text-[#005C45] border border-emerald-100 shrink-0">
                    On track
                  </span>
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex justify-between text-[9px] md:text-[10px] text-slate-500 font-bold font-sans">
                    <span>Average Progress</span>
                    <span className="text-emerald-700">64%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#005C45] rounded-full" style={{ width: "64%" }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold font-sans pt-0.5">
                    <span>1,860 enrolled</span>
                    <span>1,520 active</span>
                  </div>
                </div>
              </div>

              {/* Cohort 2 */}
              <div className="p-3.5 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200/80 transition-all space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-extrabold text-slate-950 font-heading leading-tight truncate">Kaduna SME 01</p>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-medium font-sans truncate">Kaduna North | Halima Sani</p>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-100 shrink-0">
                    Follow-up
                  </span>
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex justify-between text-[9px] md:text-[10px] text-slate-500 font-bold font-sans">
                    <span>Average Progress</span>
                    <span className="text-amber-700">58%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "58%" }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold font-sans pt-0.5">
                    <span>1,420 enrolled</span>
                    <span>1,120 active</span>
                  </div>
                </div>
              </div>

              {/* Cohort 3 */}
              <div className="p-3.5 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200/80 transition-all space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-extrabold text-slate-950 font-heading leading-tight truncate">Lagos TVET CPD 01</p>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-medium font-sans truncate">Ikeja | Funmi Adebayo</p>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold bg-blue-50 text-blue-750 border border-blue-100 shrink-0">
                    Pending
                  </span>
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex justify-between text-[9px] md:text-[10px] text-slate-500 font-bold font-sans">
                    <span>Average Progress</span>
                    <span className="text-blue-700">67%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-650 rounded-full" style={{ width: "67%" }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold font-sans pt-0.5">
                    <span>1,006 enrolled</span>
                    <span>680 active</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 6. PATHWAY PERFORMANCE SECTION */}
          <div className="bg-white p-4.5 md:p-6 rounded-3xl border border-slate-200/75 shadow-xs space-y-4 md:space-y-5 text-left transition-all">
            <div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-heading tracking-tight">Pathway performance</h3>
              <p className="text-[10px] md:text-[11px] text-slate-500 font-medium font-sans mt-0.5">Compare learner progress, CPD readiness, and certificate movement across pathway groups.</p>
            </div>

            <div className="space-y-3">
              {[
                { 
                  name: "Youth Employability Pathway", 
                  enrolled: "1,860 learners", 
                  progress: 64, 
                  cpdReady: "620 CPD ready",
                  bg: "bg-[#005C45]"
                },
                { 
                  name: "Agribusiness SME Growth Pathway", 
                  enrolled: "1,420 learners", 
                  progress: 58, 
                  cpdReady: "382 CPD ready",
                  bg: "bg-emerald-600"
                },
                { 
                  name: "TVET Instructor CPD Pathway", 
                  enrolled: "1,006 learners", 
                  progress: 67, 
                  cpdReady: "202 CPD ready",
                  bg: "bg-teal-700"
                }
              ].map((pathway, idx) => (
                <div key={idx} className="p-3.5 md:p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3.5 md:gap-4">
                  <div className="space-y-0.5 text-left flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-950 font-heading leading-tight truncate">{pathway.name}</p>
                    <div className="flex items-center gap-2.5 text-[9px] md:text-[10px] text-slate-500 font-bold font-sans">
                      <span>{pathway.enrolled}</span>
                      <span className="h-1 w-1 bg-slate-300 rounded-full shrink-0" />
                      <span className="text-[#005C45]">{pathway.cpdReady}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-44 shrink-0 space-y-1">
                    <div className="flex justify-between items-center text-[9px] md:text-[10px] font-bold font-sans text-slate-600">
                      <span>Average Progress</span>
                      <span className="text-slate-950 font-extrabold">{pathway.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-150 rounded-full overflow-hidden">
                      <div className={`h-full ${pathway.bg} rounded-full`} style={{ width: `${pathway.progress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo("/programme/cohorts" as RoutePath)}
                    type="button"
                    className="self-end md:self-auto text-[10px] font-extrabold text-[#005C45] hover:text-[#003B2C] flex items-center gap-0.5 cursor-pointer font-sans h-8"
                  >
                    <span>View pathway</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 7. GENDER AND LOCATION SNAPSHOT & COVERAGE */}
          <div className="bg-white p-4.5 md:p-6 rounded-3xl border border-slate-200/75 shadow-xs space-y-5 md:space-y-6 text-left transition-all">
            <div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-heading tracking-tight">Gender and location snapshot</h3>
              <p className="text-[10px] md:text-[11px] text-slate-500 font-medium font-sans mt-0.5">View learner participation, completion rates, and regional hub statistics.</p>
            </div>

            {/* Gender Sub-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 md:p-4 rounded-2xl bg-slate-50/55 border border-slate-100 text-left space-y-1">
                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 font-sans block uppercase tracking-wider">Female learners</span>
                <span className="text-xl md:text-2xl font-extrabold text-[#005C45] font-sans block leading-none">2,314</span>
                <div className="flex justify-between items-center text-[9px] md:text-[10px] text-slate-500 font-semibold font-sans mt-0.5">
                  <span>54% share</span>
                  <span className="text-emerald-700 font-bold">63% complete</span>
                </div>
              </div>
              <div className="p-3.5 md:p-4 rounded-2xl bg-slate-50/55 border border-slate-100 text-left space-y-1">
                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 font-sans block uppercase tracking-wider">Male learners</span>
                <span className="text-xl md:text-2xl font-extrabold text-blue-800 font-sans block leading-none">1,876</span>
                <div className="flex justify-between items-center text-[9px] md:text-[10px] text-slate-500 font-semibold font-sans mt-0.5">
                  <span>44% share</span>
                  <span className="text-blue-700 font-bold">59% complete</span>
                </div>
              </div>
              <div className="p-3.5 md:p-4 rounded-2xl bg-slate-50/55 border border-slate-100 text-left space-y-1">
                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 font-sans block uppercase tracking-wider">Not specified</span>
                <span className="text-xl md:text-2xl font-extrabold text-slate-700 font-sans block leading-none">96</span>
                <div className="flex justify-between items-center text-[9px] md:text-[10px] text-slate-500 font-semibold font-sans mt-0.5">
                  <span>2% share</span>
                  <span className="text-slate-650 font-bold">41% complete</span>
                </div>
              </div>
            </div>

            {/* Interactive Location Coverage Section */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wide">Location coverage</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-normal">
                    Track learner participation across states, LGAs, and implementation hubs.
                  </p>
                </div>

                {/* State/LGA Selection Controls */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 flex items-center gap-1 shrink-0">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">State:</span>
                    <select
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="bg-transparent border-0 text-xs font-bold text-slate-700 focus:outline-hidden"
                    >
                      <option value="All">All States</option>
                      {nigeriaStates.map((s) => (
                        <option key={s.slug} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 flex items-center gap-1 shrink-0">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">LGA:</span>
                    <select
                      value={selectedLga}
                      onChange={(e) => setSelectedLga(e.target.value)}
                      disabled={selectedState === "All"}
                      className="bg-transparent border-0 text-xs font-bold text-slate-700 focus:outline-hidden disabled:opacity-50"
                    >
                      <option value="All">All LGAs</option>
                      {availableLgas.map((l) => (
                        <option key={l.slug} value={l.name}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location stats card (Updates dynamically!) */}
              <div className="p-3.5 md:p-4 rounded-2xl bg-slate-50/55 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 text-left">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {selectedState === "All" ? "National Overview" : `${selectedState} State ${selectedLga !== "All" ? `— ${selectedLga}` : ""}`}
                  </p>
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-x-3.5 gap-y-1 text-[9px] md:text-[10px] text-slate-500 font-bold font-sans">
                    <span className="flex items-center gap-1 shrink-0">
                      <Users className="h-3.5 w-3.5 text-slate-450 shrink-0" />
                      {locationStats.enrolled.toLocaleString()} Enrolled
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Activity className="h-3.5 w-3.5 text-blue-550 shrink-0" />
                      {locationStats.activeRate}% Active
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <WifiOff className="h-3.5 w-3.5 text-teal-605 shrink-0" />
                      {locationStats.lowBandwidthPct}% Offline
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Award className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      {locationStats.cpdReady} CPD
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-150/70 w-full sm:w-auto">
                  <p className="text-[9px] text-slate-400 font-bold uppercase leading-none">Top Hub / LGA</p>
                  <p className="text-xs font-bold text-[#005C45] mt-1">{locationStats.topHub}</p>
                </div>
              </div>

              {/* Top implementation states (Required display) */}
              <div className="space-y-2 pt-1">
                <span className="text-[9px] md:text-[10px] font-bold text-slate-400 font-sans block uppercase tracking-wider">Top Implementation States</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    { name: "Kano", count: "1,250 learners", rate: "76% active" },
                    { name: "Kaduna", count: "1,110 learners", rate: "70% active" },
                    { name: "Lagos", count: "950 learners", rate: "84% active" },
                    { name: "FCT", count: "420 learners", rate: "81% active" },
                    { name: "Oyo", count: "310 learners", rate: "73% active" },
                    { name: "Enugu", count: "246 learners", rate: "75% active" }
                  ].map((loc) => (
                    <div 
                      key={loc.name} 
                      onClick={() => handleStateChange(loc.name)}
                      className={`px-3 py-2.5 md:px-4 md:py-3 rounded-xl border transition-all text-left cursor-pointer flex items-center justify-between gap-2 ${
                        selectedState === loc.name 
                          ? "bg-emerald-50 border-emerald-250 shadow-3xs" 
                          : "bg-slate-50/45 border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 font-heading leading-none truncate">{loc.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold font-sans mt-1 truncate">{loc.count}</p>
                        <p className="text-[9px] text-emerald-750 font-extrabold font-sans mt-0.5 truncate">{loc.rate}</p>
                      </div>
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${selectedState === loc.name ? "bg-emerald-600 animate-ping" : "bg-emerald-500"}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* View Full Location Report Link */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => navigateTo("/programme/reports" as RoutePath)}
                  className="text-xs font-bold text-[#005C45] hover:text-[#003B2C] flex items-center gap-1 cursor-pointer font-sans"
                >
                  <span>View full location report</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Low Bandwidth, Activity */}
        <div className="lg:col-span-5 space-y-5 md:space-y-6">
          
          {/* 8. LOW-BANDWIDTH ACCESS SUMMARY */}
          <div className="bg-[#003B2C] p-4.5 md:p-6 rounded-3xl text-white space-y-4 md:space-y-5 text-left transition-all">
            <div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-900/50 text-teal-300 border border-teal-800/80 font-sans uppercase tracking-wider mb-2">
                Bandwidth Management
              </span>
              <h3 className="text-sm md:text-base font-extrabold text-white font-heading tracking-tight">Low-bandwidth access</h3>
              <p className="text-[10px] md:text-[11px] text-emerald-100/85 font-medium font-sans mt-0.5">Monitor learners using lightweight pages, offline packs, and saved drafts.</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-0.5">
              {/* Metric 1 */}
              <div className="p-3 rounded-2xl bg-white/10 border border-white/5 space-y-1">
                <span className="text-[9px] md:text-[10px] text-emerald-200/90 font-bold font-sans block leading-none truncate">Low-bandwidth mode</span>
                <span className="text-lg md:text-xl font-bold text-white font-sans block">2,679</span>
                <span className="text-[9px] text-teal-200 font-semibold font-sans block leading-none pt-0.5">Lightweight site</span>
              </div>

              {/* Metric 2 */}
              <div className="p-3 rounded-2xl bg-white/10 border border-white/5 space-y-1">
                <span className="text-[9px] md:text-[10px] text-emerald-200/90 font-bold font-sans block leading-none truncate">Offline packs opened</span>
                <span className="text-lg md:text-xl font-bold text-white font-sans block">210</span>
                <span className="text-[9px] text-teal-200 font-semibold font-sans block leading-none pt-0.5">Local system study</span>
              </div>

              {/* Metric 3 */}
              <div className="p-3 rounded-2xl bg-white/10 border border-white/5 space-y-1">
                <span className="text-[9px] md:text-[10px] text-emerald-200/90 font-bold font-sans block leading-none truncate">Saved drafts</span>
                <span className="text-lg md:text-xl font-bold text-white font-sans block">486</span>
                <span className="text-[9px] text-teal-200 font-semibold font-sans block leading-none pt-0.5">Pending syncs</span>
              </div>

              {/* Metric 4 */}
              <div className="p-3 rounded-2xl bg-white/10 border border-white/5 space-y-1">
                <span className="text-[9px] md:text-[10px] text-emerald-200/90 font-bold font-sans block leading-none truncate">Waiting to upload</span>
                <span className="text-lg md:text-xl font-bold text-amber-300 font-sans block">34 items</span>
                <span className="text-[9px] text-teal-200 font-semibold font-sans block leading-none pt-0.5">Offline queue</span>
              </div>
            </div>

            {/* Location insights */}
            <div className="pt-3 border-t border-white/10 space-y-1.5 text-left">
              <span className="text-[9px] text-emerald-200/80 font-bold uppercase tracking-wider block">Highest low-bandwidth usage:</span>
              <div className="flex flex-wrap gap-1.5 text-[9px] md:text-[10px] text-emerald-100 font-medium">
                <span className="bg-teal-950/40 px-2 py-0.5 rounded-md border border-teal-800/50">Kano Municipal</span>
                <span className="bg-teal-950/40 px-2 py-0.5 rounded-md border border-teal-800/50">Kaduna North</span>
                <span className="bg-teal-950/40 px-2 py-0.5 rounded-md border border-teal-800/50">Oyo West</span>
              </div>
            </div>
          </div>

          {/* 9. RECENT PROGRAMME ACTIVITY */}
          <div className="bg-white p-4.5 md:p-6 rounded-3xl border border-slate-200/75 shadow-xs space-y-4 md:space-y-5 text-left transition-all">
            <div>
              <h3 className="text-sm md:text-base font-extrabold text-slate-900 font-heading tracking-tight">Recent programme activity</h3>
              <p className="text-[10px] md:text-[11px] text-slate-500 font-medium font-sans mt-0.5">National activity timeline log events across active cohorts.</p>
            </div>

            <div className="space-y-3.5 md:space-y-4">
              {[
                { 
                  text: "Kano Youth Employability Cohort 02 reached 64% average progress.", 
                  icon: TrendingUp, 
                  color: "text-emerald-650 bg-emerald-50",
                  time: "Updated today" 
                },
                { 
                  text: "312 learners moved into certificate review readiness.", 
                  icon: Award, 
                  color: "text-amber-600 bg-amber-50",
                  time: "Updated yesterday" 
                },
                { 
                  text: "76 assessment submissions are waiting for facilitator review.", 
                  icon: FileText, 
                  color: "text-blue-600 bg-blue-50",
                  time: "2 days ago" 
                },
                { 
                  text: "Low-bandwidth access was used by 2,679 learners this month.", 
                  icon: WifiOff, 
                  color: "text-teal-650 bg-teal-50",
                  time: "3 days ago" 
                },
                { 
                  text: "23 support tickets remain open across active cohorts.", 
                  icon: AlertCircle, 
                  color: "text-amber-700 bg-amber-50/50",
                  time: "4 days ago" 
                }
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-2.5 md:gap-3 items-start">
                  <div className={`p-2 rounded-xl shrink-0 ${activity.color}`}>
                    <activity.icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </div>
                  <div className="space-y-0.5 text-left flex-1 min-w-0">
                    <p className="text-xs text-slate-800 leading-relaxed font-sans font-semibold">
                      {activity.text}
                    </p>
                    <span className="text-[9px] md:text-[10px] text-slate-400 font-bold block">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProgrammeDashboard;
