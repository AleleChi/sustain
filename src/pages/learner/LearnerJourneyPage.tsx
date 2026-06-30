import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { 
  Play, 
  Calendar, 
  Check, 
  HelpCircle, 
  Info,
  ChevronRight,
  BookOpen,
  Lock,
  Award,
  Activity,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle as QuestionIcon,
  Sparkles
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { useLearningState } from "../../context/LearningStateContext";
import { LmsSimulatorWidget } from "../../components/learner/LmsSimulatorWidget";

export function LearnerJourneyPage() {
  const { navigateTo } = useRoute();
  const { modules, cpdCredits, totalCpdCredits, certificateStatus } = useLearningState();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  const handleAction = (route: string) => {
    navigateTo(route as any);
  };

  // Shared Learner Info
  const learner = {
    name: "Aisha Mohammed",
    id: "SUST-LRN-0442",
    programme: "SUSTAIN CPD Programme",
    pathway: "Youth Employability Pathway",
    organisation: "Kano Youth Skills Hub",
    cohort: "Kano Youth Employability Cohort 02",
    facilitator: "Halima Sani"
  };

  return (
    <div id="journey-module-root" className="space-y-6 max-w-7xl mx-auto w-full text-slate-950 pb-12 relative font-sans">
      {/* Toast Overlay */}
      {toast && (
        <div 
          id="journey-toast"
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-950 text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in duration-300 max-w-sm"
        >
          <div className="h-2 w-2 rounded-full shrink-0 bg-emerald-400" />
          <span className="flex-1 leading-normal text-left">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:text-slate-300 p-1 cursor-pointer"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        
        {/* Left Column: Core Journey Roadmap & Progress */}
        <div className="space-y-8">
          
          {/* Journey Hero Card - Redesigned for premium look and feel */}
          <Card id="journey-hero-card" className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-850 text-white rounded-2xl p-6 sm:p-8 border border-emerald-950 shadow-sm relative overflow-hidden text-left">
            {/* Soft background glow */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-emerald-800/30 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              {/* Breadcrumbs / Context Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[9px] font-bold text-emerald-100 bg-emerald-800 px-2.5 py-1 rounded-full border border-emerald-700 uppercase tracking-wide">
                  {learner.pathway}
                </span>
                <span className="text-[9px] font-bold text-emerald-200 bg-emerald-850 px-2.5 py-1 rounded-full border border-emerald-800/40 uppercase tracking-wide">
                  Kano Cohort 02
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight font-heading">
                  My Journey Roadmap
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium max-w-xl">
                  Track your personal route through lessons, checkpoints, portfolio reviews, and certificate milestones.
                </p>
              </div>

              {/* Pathway progress strip */}
              <div className="space-y-2 pt-3 max-w-md border-t border-emerald-800/65">
                <div className="flex justify-between items-center text-xs text-emerald-100 font-semibold">
                  <span>Pathway Completion</span>
                  <span className="text-emerald-300 font-bold">40%</span>
                </div>
                <div className="w-full bg-emerald-950/50 h-2 rounded-full overflow-hidden border border-emerald-900/30">
                  <div 
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                    style={{ width: "40%" }} 
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Journey Overview Cards - Re-designed with rich, soft color washes to avoid feeling generic */}
          <div className="space-y-3">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-left pl-1">
              Journey Metrics
            </h2>
            <div id="journey-summary-grid" className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-left">
              
              {/* Card 1: Pathway progress */}
              <Card className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl flex flex-col justify-between min-h-[110px] hover:border-emerald-200 transition-colors">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">Roadmap Progress</span>
                <div>
                  <p className="text-2xl font-bold text-emerald-900 font-heading leading-none">40%</p>
                  <p className="text-[10px] text-emerald-700/80 font-semibold mt-1">Overall complete</p>
                </div>
              </Card>

              {/* Card 2: Courses completed */}
              <Card className="p-4 bg-slate-50/60 border border-slate-150 rounded-2xl flex flex-col justify-between min-h-[110px] hover:border-emerald-100 transition-colors">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Courses Completed</span>
                <div>
                  <p className="text-2xl font-bold text-slate-900 font-heading leading-none">2 of 5</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Verified modules</p>
                </div>
              </Card>

              {/* Card 3: CPD credits */}
              <Card className="p-4 bg-indigo-50/20 border border-indigo-100 rounded-2xl flex flex-col justify-between min-h-[110px] hover:border-indigo-200 transition-colors">
                <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wide">CPD Credits</span>
                <div>
                  <p className="text-2xl font-bold text-indigo-950 font-heading leading-none">14 of 35</p>
                  <p className="text-[10px] text-indigo-800/80 font-semibold mt-1">Confirmed record</p>
                </div>
              </Card>

              {/* Card 4: Certificate readiness */}
              <Card className="p-4 bg-amber-50/20 border border-amber-200/50 rounded-2xl flex flex-col justify-between min-h-[110px] hover:border-amber-300 transition-colors">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">Milestone Status</span>
                <div>
                  <p className="text-xs font-bold text-amber-900 font-heading leading-tight line-clamp-2">Not Eligible Yet</p>
                  <p className="text-[10px] text-amber-800/80 font-semibold mt-1">Requirements pending</p>
                </div>
              </Card>

            </div>
          </div>

          {/* Combined Roadmap Timeline & Interactive Next Steps - Merged to eliminate nested white boxes */}
          <div className="space-y-4 text-left">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 font-heading">
              My Pathway Milestone Roadmap
            </h2>

            <Card className="p-5 sm:p-7 bg-white border border-slate-200/80 shadow-3xs rounded-2xl">
              <div className="relative pl-1">
                {/* Vertical Timeline Connection Line */}
                <div className="absolute left-4.5 top-3.5 bottom-3.5 w-0.5 bg-slate-100" />

                {/* Timeline Items */}
                <div className="space-y-8">
                  
                  {/* Step 1: Completed Orientation */}
                  <div className="relative pl-10 text-left">
                    <div className="absolute left-2 top-0.5 h-5 w-5 rounded-full bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center shrink-0 shadow-3xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">Milestone 1: Pathway Orientation</h4>
                        <span className="text-[9px] font-bold text-emerald-850 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-100">Completed</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Completed at Kano Skills Centre on induction day.</p>
                    </div>
                  </div>

                  {/* Step 2: Completed Workplace Communication */}
                  <div className="relative pl-10 text-left">
                    <div className="absolute left-2 top-0.5 h-5 w-5 rounded-full bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center shrink-0 shadow-3xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">Milestone 2: Workplace Communication</h4>
                        <span className="text-[9px] font-bold text-emerald-850 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-100">Completed</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Learned foundational conversation mechanics, passive hearing, and CPD credit reviews.</p>
                    </div>
                  </div>

                  {/* Step 3: Current Active Step - Preparing for Interviews (EXPANDED DYNAMIC FOCUS) */}
                  <div className="relative pl-10 text-left">
                    {/* Pulsing indicator node */}
                    <div className="absolute left-2 top-1.5 h-5 w-5 rounded-full bg-emerald-100 border-2 border-emerald-800 text-emerald-900 flex items-center justify-center shrink-0 shadow-xs">
                      <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full animate-ping" />
                    </div>
                    
                    <div className="space-y-3.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-emerald-850 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wide">
                            Active Step
                          </span>
                          <span className="text-xs font-bold text-slate-500">Milestone 3 of 6</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading tracking-tight mt-1">
                          Interview Preparation & Star Model
                        </h3>
                      </div>

                      {/* Integrated Micro focus container (No double borders!) */}
                      <div className="bg-emerald-50/15 border border-emerald-200/60 p-4 sm:p-5 rounded-2xl space-y-4 max-w-2xl">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                          <span>Course Progress: Work Readiness</span>
                          <span className="text-emerald-800 font-bold">68%</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-700 h-full rounded-full" style={{ width: "68%" }} />
                        </div>

                        <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                          Continue your STAR response module, review the clinic timetable, and submit your written assignment draft to Halima Sani.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-3.5 text-[11px] text-slate-500 font-bold">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-emerald-700 shrink-0" />
                            <span>18 min remaining</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4 text-emerald-700 shrink-0" />
                            <span>Lesson & materials</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Award className="h-4 w-4 text-emerald-700 shrink-0" />
                            <span>2 CPD credits linked</span>
                          </span>
                        </div>

                        {/* Action buttons with strict 44px touch sizes */}
                        <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                          <button
                            onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                            className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                          >
                            <Play className="h-3.5 w-3.5 fill-current" />
                            <span>Continue Lesson</span>
                          </button>
                          <button
                            onClick={() => handleAction("/learner/assessments/work-readiness-assignment")}
                            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-850 font-bold text-xs py-3 px-5 rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1 cursor-pointer min-h-[44px]"
                          >
                            <span>Open Portfolio Task</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Step 4: Pending Written Assignment */}
                  <div className="relative pl-10 text-left">
                    <div className="absolute left-2.5 top-1 h-4 w-4 rounded-full bg-white border-2 border-amber-400 flex items-center justify-center shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800 leading-snug">Milestone 4: Work Readiness Assignment</h4>
                        <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-2 py-0.2 rounded border border-amber-200">Draft saved</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Submit portfolio answers to Halima Sani for review.</p>
                    </div>
                  </div>

                  {/* Step 5: Live Practice Sessions */}
                  <div className="relative pl-10 text-left">
                    <div className="absolute left-2.5 top-1 h-4 w-4 rounded-full bg-white border-2 border-indigo-400 flex items-center justify-center shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800 leading-snug">Milestone 5: Interactive Interview Practice Clinic</h4>
                        <span className="text-[9px] font-bold text-indigo-850 bg-indigo-50 px-2 py-0.2 rounded border border-indigo-150">Attendance pending</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Participate in live review clinics with Kano facilitators.</p>
                    </div>
                  </div>

                  {/* Step 6: Locked Certificate */}
                  <div className="relative pl-10 text-left">
                    <div className="absolute left-2 top-0.5 h-5 w-5 rounded-full bg-slate-50 border-2 border-slate-300 text-slate-400 flex items-center justify-center shrink-0">
                      <Lock className="h-3 w-3" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-400 leading-snug">Milestone 6: Work Readiness Certificate</h4>
                      <p className="text-xs text-slate-400 font-semibold leading-normal">Locked until written assignment draft is approved and attendance verified.</p>
                    </div>
                  </div>

                </div>
              </div>
            </Card>
          </div>

          {/* Simple & Flat Course Modules Progress List */}
          <div className="space-y-3.5 text-left">
            <div className="flex items-center justify-between pl-1">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
                Pathway Course Modules
              </h2>
              <button 
                onClick={() => handleAction("/learner/courses")}
                className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                View full curriculum
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Course 1: Work Readiness */}
              <Card 
                onClick={() => handleAction("/learner/courses/work-readiness-foundation")}
                className="p-4 bg-white border border-slate-200/80 hover:border-emerald-200 rounded-2xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[110px]"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Work Readiness Foundation</h4>
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">Active</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Build critical workplace preparation and remote interview skills.</p>
                </div>
                
                <div className="pt-3 border-t border-slate-100 space-y-1.5 mt-2">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-slate-650">
                    <span>Overall Completion</span>
                    <span className="text-emerald-800">68%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-700 h-full rounded-full" style={{ width: "68%" }} />
                  </div>
                </div>
              </Card>

              {/* Course 2: Digital Readiness */}
              <Card 
                onClick={() => handleAction("/learner/courses/digital-readiness-basics")}
                className="p-4 bg-white border border-slate-200/80 hover:border-emerald-200 rounded-2xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[110px]"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Digital Readiness Basics</h4>
                    <span className="text-[9px] font-bold text-slate-550 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Available</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Master standard digital collaborative tools, cloud systems, and privacy hygiene.</p>
                </div>
                
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-800 mt-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Ready to start</span>
                </div>
              </Card>

            </div>
          </div>

        </div>

        {/* Right Column: CPD Metrics, Actions, Context Help */}
        <div className="space-y-6">

          {/* CPD Metric Summary */}
          <div className="space-y-3 text-left">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 font-heading">
              Pathway Milestones
            </h2>

            <Card id="cpd-readiness-card" className="p-5 bg-amber-50/20 border border-amber-200/40 rounded-2xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-850 flex items-center justify-center shrink-0 shadow-3xs">
                  <Award className="h-5.5 w-5.5" />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 font-heading">CPD Credit Progress</h4>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                    14 of 35 confirmed credits verified in your profile.
                  </p>
                  <p className="text-xs text-amber-800 font-bold flex items-center gap-1 mt-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                    <span>Review pending credits</span>
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white/70 rounded-xl border border-amber-100 text-[11px] text-slate-600 leading-relaxed font-semibold">
                Submit your Work Readiness Assignment draft to Halima Sani to unlock your pending 4 credits.
              </div>

              <button
                onClick={() => handleAction("/learner/cpd-record")}
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs py-2.5 rounded-xl shadow-3xs transition-all cursor-pointer flex items-center justify-center gap-1 min-h-[40px]"
              >
                <span>Open CPD Record</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </Card>
          </div>

          {/* Recommended Quick Actions List */}
          <div className="space-y-3 text-left">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1 font-heading">
              Quick Actions
            </h2>

            <div className="space-y-2.5">
              
              {/* Action 1 */}
              <div 
                onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                className="p-3 bg-white border border-slate-200/85 hover:border-emerald-200 rounded-xl flex items-center justify-between gap-3 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 flex items-center justify-center shrink-0">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">Resume Lesson</p>
                    <p className="text-[10px] text-slate-450 truncate mt-0.5">Preparing for Interviews</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>

              {/* Action 2 */}
              <div 
                onClick={() => handleAction("/learner/assessments/work-readiness-assignment")}
                className="p-3 bg-white border border-slate-200/85 hover:border-emerald-200 rounded-xl flex items-center justify-between gap-3 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">Portfolio Task</p>
                    <p className="text-[10px] text-slate-450 truncate mt-0.5">Work Readiness Assignment</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>

              {/* Action 3 */}
              <div 
                onClick={() => handleAction("/learner/live-sessions/interview-practice-clinic")}
                className="p-3 bg-white border border-slate-200/85 hover:border-emerald-200 rounded-xl flex items-center justify-between gap-3 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">Clinic Timetable</p>
                    <p className="text-[10px] text-slate-450 truncate mt-0.5">Interview Practice Clinic</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>

            </div>
          </div>

          {/* Support / Help Card */}
          <Card id="support-journey-card" className="bg-emerald-50/20 border border-emerald-100/50 rounded-2xl p-5 text-left relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-900 border border-emerald-850 text-white flex items-center justify-center shrink-0 shadow-3xs">
                <QuestionIcon className="h-5.5 w-5.5" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-sm font-bold text-slate-900 font-heading">Need help with your journey?</h3>
                <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                  Reach out to Kano Skills Center support or ask Halima Sani if your pathway progress feels incorrect.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => handleAction("/learner/support")}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-3xs min-h-[40px]"
                  >
                    Get Support
                  </button>
                </div>
              </div>
            </div>
          </Card>

        </div>

      </div>

      {/* Simulator Widget for visual verification */}
      <LmsSimulatorWidget />
    </div>
  );
}

/* Helper small icons wrapper to prevent import issues */
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export default LearnerJourneyPage;
