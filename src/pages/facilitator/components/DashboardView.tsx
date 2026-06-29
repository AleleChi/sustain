import { useState } from "react";
import { useRoute, RoutePath } from "../../../context/RouteContext";
import { 
  mockFacilitatorCohorts, 
  mockAssessmentSubmissions, 
  mockFacilitatorSessions, 
  AssessmentSubmission,
  FacilitatorLearner
} from "../../../data/mockFacilitator";
import { 
  Layers, 
  Users, 
  ClipboardCheck, 
  Calendar, 
  ArrowRight, 
  UserX, 
  PlusCircle, 
  MessageSquare, 
  FileText, 
  Clock,
  Activity,
  AlertTriangle,
  MoreVertical,
  Plus,
  HelpCircle,
  Bell,
  X
} from "lucide-react";
import { FacilitatorMobileActionMenu, ActionMenuItem } from "./FacilitatorMobileActionMenu";

interface DashboardViewProps {
  onNavigateToSub: (submissionId: string) => void;
  onNavigateToLearner: (learnerId: string) => void;
  onNavigateToCohort: (cohortId: string) => void;
  submissions: AssessmentSubmission[];
  learners: FacilitatorLearner[];
}

export function DashboardView({ 
  onNavigateToSub, 
  onNavigateToLearner, 
  onNavigateToCohort,
  submissions,
  learners
}: DashboardViewProps) {
  const { navigateTo, showToast } = useRoute();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [newCohortName, setNewCohortName] = useState("");
  const [newCohortRegion, setNewCohortRegion] = useState("Kano");

  return (
    <div className="space-y-8 font-sans pb-12">
      
      {/* ====================================================
          1. DESKTOP VIEWPORT LAYOUT
          ==================================================== */}
      <div className="hidden lg:block space-y-8">
        
        {/* Intro Area + Today's Priorities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Welcome Banner / Left Side */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[24px] p-8 shadow-[0_10px_30px_rgba(15,23,42,0.02)] flex flex-col justify-between text-left relative overflow-hidden">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none font-sans">
                Facilitator Dashboard
              </h2>
              <p className="text-slate-500 text-sm font-normal max-w-xl leading-relaxed">
                Welcome back, Halima. You are currently monitoring 3 active cohorts. 18 learners require immediate intervention to stay on track.
              </p>
              
              {/* Context Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-emerald-100">
                  SUSTAIN CPD
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-emerald-100">
                  Youth Employability
                </span>
                <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-emerald-100">
                  Kano Cohort 02
                </span>
              </div>
            </div>

            {/* Banner Actions */}
            <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-slate-100">
              <button 
                onClick={() => navigateTo("/facilitator/follow-up-queue" as RoutePath)}
                className="h-11 px-6 interactive-button-primary text-xs font-bold rounded-xl shadow-xs cursor-pointer focus-ring"
              >
                Review Follow-Up
              </button>
              <button 
                onClick={() => navigateTo("/facilitator/assessment-reviews" as RoutePath)}
                className="h-11 px-6 interactive-button-secondary text-xs font-bold rounded-xl cursor-pointer focus-ring"
              >
                Open Assessments
              </button>
            </div>
          </div>

          {/* Today's Priorities / Right Side */}
          <div className="lg:col-span-4 bg-[#F0F7FF] border border-blue-100 rounded-[24px] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.02)] flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-1.5 mb-4 text-slate-800 font-bold text-xs uppercase tracking-wider">
                <Calendar className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                <span>Today's Priorities</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => navigateTo("/facilitator/learners" as RoutePath)}
                  className="bg-white p-3.5 rounded-2xl border border-blue-50 cursor-pointer text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-blue-200 active:bg-blue-50/50 focus-ring"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigateTo("/facilitator/learners" as RoutePath)}
                >
                  <span className="text-2xl font-black text-rose-600 block leading-none">18</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1.5 leading-tight">At-risk learners</span>
                </div>
                <div 
                  onClick={() => navigateTo("/facilitator/assessment-reviews" as RoutePath)}
                  className="bg-white p-3.5 rounded-2xl border border-blue-50 cursor-pointer text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-blue-200 active:bg-blue-50/50 focus-ring"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigateTo("/facilitator/assessment-reviews" as RoutePath)}
                >
                  <span className="text-2xl font-black text-emerald-900 block leading-none">12</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1.5 leading-tight">Pending reviews</span>
                </div>
                <div 
                  onClick={() => navigateTo("/facilitator/learner-questions" as RoutePath)}
                  className="bg-white p-3.5 rounded-2xl border border-blue-50 cursor-pointer text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-blue-200 active:bg-blue-50/50 focus-ring"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigateTo("/facilitator/learner-questions" as RoutePath)}
                >
                  <span className="text-2xl font-black text-amber-600 block leading-none">06</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1.5 leading-tight">Open questions</span>
                </div>
                <div 
                  onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)}
                  className="bg-white p-3.5 rounded-2xl border border-blue-50 cursor-pointer text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm hover:border-blue-200 active:bg-blue-50/50 focus-ring"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigateTo("/facilitator/support-tickets" as RoutePath)}
                >
                  <span className="text-2xl font-black text-slate-700 block leading-none">03</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1.5 leading-tight">Tech tickets</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowScheduleModal(true)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors inline-flex items-center justify-center gap-1 mt-5 group cursor-pointer focus-ring rounded-lg px-2 py-1"
            >
              View full schedule <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>

        {/* Compact KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Assigned", val: "510", color: "text-slate-900" },
            { label: "Active", val: "386", color: "text-emerald-800" },
            { label: "At-Risk", val: "18", color: "text-rose-600" },
            { label: "Reviews", val: "12", color: "text-blue-700" },
            { label: "Questions", val: "06", color: "text-amber-600" },
            { label: "Tickets", val: "03", color: "text-slate-500" }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-[20px] p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.015)] flex flex-col justify-between min-h-[96px]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</span>
              <span className={`text-2xl font-black mt-1 leading-none ${kpi.color}`}>{kpi.val}</span>
            </div>
          ))}
        </div>

        {/* Cohort Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.02)] text-left flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Kano Cohort 02 Overview</h3>
                  <p className="text-xs text-slate-400 font-medium">Youth Employability Programme • Started Oct 12, 2023</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigateTo("/facilitator/reports" as RoutePath)}
                    className="h-9 px-4 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Detailed Report
                  </button>
                </div>
              </div>

              {/* Progress bars row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completion Rate</span>
                    <span className="text-xs font-bold text-emerald-800">58%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-800 h-full w-[58%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Score</span>
                    <span className="text-xs font-bold text-emerald-800">74.2%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-800 h-full w-[74.2%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Today</span>
                    <span className="text-xs font-bold text-slate-700">142 Learners</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-slate-750 h-full w-[85%]" />
                  </div>
                </div>
              </div>

              {/* Stacked Learner Progress Snapshot */}
              <div className="space-y-3 mt-6 pt-4 border-t border-slate-100/75 text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Learner Progress Snapshot</span>
                
                {/* Stacked Bar with responsive text */}
                <div className="w-full h-10 rounded-full overflow-hidden flex font-sans text-[10px] font-bold text-white shadow-3xs select-none">
                  {/* ON TRACK (65%) */}
                  <div style={{ width: '65%' }} className="bg-emerald-800 flex items-center justify-center transition-all hover:opacity-95 truncate px-1">
                    <span className="hidden sm:inline">ON TRACK (331)</span>
                    <span className="inline sm:hidden">331</span>
                  </div>
                  {/* MONITOR (20%) */}
                  <div style={{ width: '20%' }} className="bg-amber-500 flex items-center justify-center transition-all hover:opacity-95 truncate px-1">
                    <span className="hidden md:inline">MONITOR (102)</span>
                    <span className="inline md:hidden">102</span>
                  </div>
                  {/* SUPPORT (10%) */}
                  <div style={{ width: '10%' }} className="bg-rose-500 flex items-center justify-center transition-all hover:opacity-95 truncate px-1">
                    <span className="hidden lg:inline">SUPPORT (51)</span>
                    <span className="inline lg:hidden">51</span>
                  </div>
                  {/* FOLLOW-UP (5%) */}
                  <div style={{ width: '5%' }} className="bg-slate-700 flex items-center justify-center transition-all hover:opacity-95 truncate px-1">
                    <span className="hidden xl:inline">FOLLOW-UP (26)</span>
                    <span className="inline xl:hidden">26</span>
                  </div>
                </div>

                {/* Elegant legend beneath the bar */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-800 shrink-0" />
                    <span>On Track: <strong className="text-slate-800 font-bold">331</strong> <span className="text-slate-400 font-medium">(65%)</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Monitor: <strong className="text-slate-800 font-bold">102</strong> <span className="text-slate-400 font-medium">(20%)</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span>Support: <strong className="text-slate-800 font-bold">51</strong> <span className="text-slate-400 font-medium">(10%)</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-700 shrink-0" />
                    <span>Follow-Up: <strong className="text-slate-800 font-bold">26</strong> <span className="text-slate-400 font-medium">(5%)</span></span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right mini cohort cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {/* Kano Cohort 01 */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-5 text-left flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.015)] h-1/2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Kano Cohort 01</h4>
                  <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-150 rounded">Archive Pending</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-800 leading-none">94%</span>
                  <span className="text-[9px] text-slate-450 block font-semibold uppercase tracking-wider mt-0.5">Completion</span>
                </div>
              </div>
              <button 
                onClick={() => navigateTo("/facilitator/reports" as RoutePath)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 text-left transition-colors cursor-pointer pt-3 inline-flex items-center gap-0.5"
              >
                View Results <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Kano Cohort 03 */}
            <div className="bg-white border border-slate-200 rounded-[24px] p-5 text-left flex flex-col justify-between shadow-[0_10px_30px_rgba(15,23,42,0.015)] h-1/2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">Kano Cohort 03</h4>
                  <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100 rounded">Onboarding</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-600 leading-none">12%</span>
                  <span className="text-[9px] text-slate-450 block font-semibold uppercase tracking-wider mt-0.5">Profile Setup</span>
                </div>
              </div>
              <button 
                onClick={() => navigateTo("/facilitator/cohorts" as RoutePath)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 text-left transition-colors cursor-pointer pt-3 inline-flex items-center gap-0.5"
              >
                Manage Enrollments <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>

        {/* At-Risk Learner Queue */}
        <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 space-y-4 text-left">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-sans">At-Risk Learner Queue</h3>
              <p className="text-xs text-slate-400 font-medium">Manual interventions required based on activity and low assessment scores.</p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <button 
                onClick={() => showToast("Filters applied in this frontend prototype.")}
                className="h-9 px-3.5 interactive-button-secondary rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer focus-ring"
              >
                Filter
              </button>
              <button 
                onClick={() => showToast("Bulk action outreach simulated in this frontend prototype.")}
                className="h-9 px-3.5 interactive-button-primary rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer focus-ring"
              >
                Bulk Action
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[25%]">Learner</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[20%]">Progress</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[15%]">Last Active</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[20%]">Issue</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[10%]">Risk Level</th>
                  <th className="px-5 py-3 text-right text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[10%]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: "SUST-LRN-0442", name: "Aisha Mohammed", initials: "AM", progress: 34, active: "4 days ago", issue: "Low Assessment Score", risk: "Medium" },
                  { id: "SUST-LRN-0105", name: "Musa Danladi", initials: "MD", progress: 12, active: "12 days ago", issue: "Inactivity > 10 Days", risk: "High" },
                  { id: "SUST-LRN-0284", name: "Bello Kawu", initials: "BK", progress: 45, active: "Yesterday", issue: "Module Dropout Risk", risk: "Low" }
                ].map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="interactive-row focus-ring focus-within:bg-slate-50/50 group" 
                    onClick={() => onNavigateToLearner(row.id)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onNavigateToLearner(row.id)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          row.risk === "High" ? "bg-rose-50 text-rose-700" : row.risk === "Medium" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-700"
                        }`}>
                          {row.initials}
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-900 transition-colors">{row.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium block">{row.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden w-24">
                          <div style={{ width: `${row.progress}%` }} className={`h-full ${
                            row.risk === "High" ? "bg-rose-500" : row.risk === "Medium" ? "bg-amber-500" : "bg-emerald-800"
                          }`} />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500">{row.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-600">{row.active}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-700">{row.issue}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        row.risk === "High" ? "bg-rose-50 text-rose-700 border border-rose-100" : row.risk === "Medium" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-slate-50 text-slate-650 border border-slate-200"
                      }`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => {
                          if (row.risk === "High") {
                            navigateTo("/facilitator/support-tickets" as RoutePath);
                          } else if (row.risk === "Medium") {
                            navigateTo("/facilitator/follow-up-queue" as RoutePath);
                          } else {
                            navigateTo("/facilitator/assessment-reviews" as RoutePath);
                          }
                        }}
                        className={`text-xs font-extrabold cursor-pointer hover:underline transition-colors focus-ring rounded px-1.5 py-0.5 ${
                          row.risk === "High" ? "text-rose-600 hover:text-rose-800" : row.risk === "Medium" ? "text-emerald-850 hover:text-emerald-950" : "text-sky-700 hover:text-sky-900"
                        }`}
                      >
                        {row.risk === "High" ? "Escalate" : row.risk === "Medium" ? "Intervene" : "Review"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-3 text-center border-t border-slate-100/75">
            <button 
              onClick={() => navigateTo("/facilitator/learners" as RoutePath)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 cursor-pointer focus-ring rounded-lg px-2 py-1"
            >
              View all 18 at-risk learners <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Assessment Review Queue + Learner Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Assessment Review Queue */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 text-left shadow-[0_10px_30px_rgba(15,23,42,0.015)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-emerald-900 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm">Assessment Review Queue</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded-md border border-emerald-100 shrink-0">12 Pending</span>
              </div>

              <div className="divide-y divide-slate-100 space-y-4">
                {[
                  { title: "Work Readiness Assignment", cohort: "Kano Cohort 02 • 8 new submissions", badge: "Critical", badgeClass: "bg-rose-50 text-rose-700 border-rose-150" },
                  { title: "Communication Skills Level 1", cohort: "Kano Cohort 02 • 4 new submissions", badge: "Soft Skills", badgeClass: "bg-slate-50 text-slate-550 border-slate-200" }
                ].map((row, idx) => (
                  <div key={idx} className="flex justify-between items-start pt-4 first:pt-0">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm">{row.title}</h4>
                      <p className="text-xs text-slate-400 font-medium">{row.cohort}</p>
                    </div>
                    <div className="text-right space-y-2.5 shrink-0 pl-2">
                      <span className={`inline-block px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide rounded border ${row.badgeClass}`}>{row.badge}</span>
                      <button 
                        onClick={() => navigateTo("/facilitator/assessment-reviews" as RoutePath)}
                        className="text-emerald-800 hover:text-emerald-950 font-bold text-xs flex items-center justify-end gap-0.5 hover:underline cursor-pointer block w-full"
                      >
                        Grade Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learner Questions */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 text-left shadow-[0_10px_30px_rgba(15,23,42,0.015)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-500 shrink-0" />
                  <h3 className="font-bold text-slate-900 text-sm">Learner Questions</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-md border border-amber-100 shrink-0">6 Unanswered</span>
              </div>

              <div className="divide-y divide-slate-100 space-y-4">
                {[
                  { name: "John Okonkwo", time: "2h ago", text: "“I’m having trouble understanding the offline sync for module 3...”", initials: "JO" },
                  { name: "Aminu Yakubu", time: "5h ago", text: "“Is the certification recognized by the Kano State Ministry of Agric?”", initials: "AY" }
                ].map((row, idx) => (
                  <div key={idx} className="flex gap-3 pt-4 first:pt-0">
                    <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-3xs">
                      {row.initials}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{row.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{row.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 italic leading-relaxed">{row.text}</p>
                      <button 
                        onClick={() => navigateTo("/facilitator/learner-questions" as RoutePath)}
                        className="text-emerald-800 hover:text-emerald-950 font-bold text-xs mt-1 block hover:underline cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Lower Operational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Community Moderation */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.015)] flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Community Moderation</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold border-b border-slate-100 pb-2">
                  <span className="text-slate-450">Flagged posts</span>
                  <span className="font-bold text-slate-800">0</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-450">New introductions</span>
                  <span className="font-bold text-emerald-800">14</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigateTo("/facilitator/community" as RoutePath)}
              className="w-full mt-4 h-9 text-xs font-bold rounded-xl interactive-button-secondary cursor-pointer focus-ring"
            >
              Moderate Forum
            </button>
          </div>

          {/* Low-Bandwidth Support */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.015)] flex flex-col justify-between border-l-4 border-l-amber-500">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Low-Bandwidth Support
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                42 learners in Kano Cohort 02 are currently operating in offline-first mode.
              </p>
              <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100/60 mt-2">
                <p className="text-[10px] text-amber-800 leading-normal font-semibold">
                  <strong className="font-bold block text-amber-900">Action Required:</strong>
                  Verify sync completion for 12 learners before the Friday assessment deadline.
                </p>
              </div>
            </div>
          </div>

          {/* Open Tech Tickets */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.015)] flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Open Tech Tickets</h4>
              <div className="space-y-1.5 p-2.5 bg-slate-50/50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  <span className="text-xs font-mono font-bold text-slate-950">MD0241</span>
                </div>
                <p className="text-[11px] font-bold text-slate-700">Login Issue: Musa Danladi</p>
                <p className="text-[9px] font-black uppercase text-rose-600 tracking-wider">High Priority</p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)}
              className="w-full mt-4 h-9 text-xs font-bold rounded-xl interactive-button-secondary cursor-pointer focus-ring"
            >
              View Ticket Center
            </button>
          </div>
        </div>

        {/* Recent Facilitator Activity */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-6 text-left shadow-[0_10px_30px_rgba(15,23,42,0.02)] space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Facilitator Activity</h3>
              <p className="text-xs text-slate-400 font-medium">History of your interventions and cohort management actions.</p>
            </div>
            <button 
              onClick={() => showToast("Dashboard PDF export simulated in this frontend prototype.")}
              className="h-9 px-4 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs interactive-button-primary focus-ring"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </button>
          </div>

          <div className="relative pl-4 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {[
              { title: "Graded Communication Skills Module", details: "Kano Cohort 02 • 14 minutes ago", initials: "✓", bg: "bg-emerald-50 text-emerald-850 border-emerald-100" },
              { title: "Resolved Support Ticket #8821", details: "Learner: Fatimah Yusuf • 2 hours ago", initials: "👤", bg: "bg-amber-50 text-amber-800 border-amber-100" },
              { title: "Sent Outreach to 5 Inactive Learners", details: "Automated Intervention • Yesterday", initials: "✉", bg: "bg-slate-50 text-slate-500 border-slate-200" }
            ].map((act, idx) => (
              <div key={idx} className="flex gap-3.5 items-start relative">
                <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${act.bg} bg-white shadow-3xs z-10`}>
                  {act.initials}
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-slate-800">{act.title}</p>
                  <p className="text-xs text-slate-400 font-medium">{act.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Action */}
        <div className="bg-emerald-950 text-white rounded-[24px] p-6 text-left shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-emerald-900/50">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest leading-none">Recommended Next Action</span>
            </div>
            <h3 className="text-lg font-bold text-emerald-50">Focus on Inactive Learners</h3>
            <p className="text-xs text-emerald-250 max-w-2xl leading-relaxed">
              Based on current cohort data, you should focus on the 8 learners who haven’t logged in for 48 hours to prevent dropout.
            </p>
          </div>
          <button 
            onClick={() => navigateTo("/facilitator/follow-up-queue" as RoutePath)}
            className="h-11 px-5 text-xs font-bold rounded-xl shadow-xs cursor-pointer shrink-0 interactive-button-secondary border-none hover:bg-emerald-50 hover:text-emerald-950 active:bg-emerald-100 focus-ring"
          >
            Start Outreach
          </button>
        </div>

        {/* Footer */}
        <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-400 font-semibold">
          <span>© 2023 SUSTAIN LMS. Optimized for low-bandwidth environments.</span>
          <div className="flex gap-4">
            <button onClick={() => showToast("Privacy Policy")} className="hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => showToast("Support Center")} className="hover:text-slate-600 transition-colors cursor-pointer">Support Center</button>
            <button onClick={() => showToast("Facilitator Portal Help")} className="hover:text-slate-600 transition-colors cursor-pointer">Facilitator Portal Help</button>
          </div>
        </footer>

      </div>

      {/* ====================================================
          2. MOBILE VIEWPORT LAYOUT
          ==================================================== */}
      <div className="block lg:hidden space-y-6 text-left">
        
        {/* Mobile Top Header (Wait, Layout handles mobile sidebar toggle, but let's place a nice customized header inside the router view so it feels extremely customized) */}
        <div className="bg-white border border-slate-200/65 rounded-[22px] p-4 flex items-center justify-between shadow-3xs">
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[13px] font-bold text-slate-800">Facilitator Workspace</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => showToast("You have no new notifications.")}
              className="p-1 relative text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="h-7 w-7 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center text-[10px] font-bold text-white shadow-3xs">
              HS
            </div>
          </div>
        </div>

        {/* Mobile Hero / Greeting banner */}
        <div className="bg-emerald-900 text-white rounded-[24px] p-6 text-left shadow-sm relative overflow-hidden border border-emerald-850">
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-black text-emerald-50 leading-tight">Good morning, Halima</h3>
            <p className="text-xs text-emerald-200 leading-relaxed max-w-xs font-semibold">
              You have 12 learners at risk of missing the 'Sustainable Irrigation' deadline.
            </p>
            <button 
              onClick={() => navigateTo("/facilitator/learners" as RoutePath)}
              className="h-10 px-4 bg-white text-emerald-900 text-xs font-bold rounded-xl shadow-2xs transition-all cursor-pointer mt-4 inline-flex items-center justify-center gap-1 group"
            >
              View At-Risk Queue <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          {/* Subtle botanical decoration shape */}
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
            <Layers className="h-32 w-32 stroke-1 text-emerald-50" />
          </div>
        </div>

        {/* 2x2 Summary Card Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Active Cohorts", val: "04", trend: "+12%", trendColor: "text-emerald-400 bg-emerald-900/40" },
            { label: "Pending Reviews", val: "28", trend: "!", trendColor: "text-rose-400 bg-rose-950/40" },
            { label: "Learner Pulse", val: "82%", trend: "avg", trendColor: "text-blue-300 bg-blue-950/40" },
            { label: "Open Tickets", val: "07", trend: "New", trendColor: "text-amber-400 bg-amber-950/40" }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-[20px] p-4 text-left shadow-xs flex flex-col justify-between min-h-[96px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</span>
              <div className="flex justify-between items-end mt-2">
                <span className="text-2xl font-black text-slate-900 leading-none">{card.val}</span>
                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${card.trendColor}`}>{card.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Low Bandwidth Mode Notice */}
        <div className="bg-[#EBF5FF] border border-blue-100 rounded-[22px] p-4 flex gap-3 items-center shadow-3xs text-left">
          <div className="h-9 w-9 bg-white border border-blue-100/50 rounded-xl flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-800">Low-Bandwidth Mode Active</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-normal">
              Images are compressed to save data. Offline changes will sync when you return to base.
            </p>
          </div>
        </div>

        {/* Cohort Progress list */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline px-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Cohort Progress</h3>
            <button 
              onClick={() => navigateTo("/facilitator/cohorts" as RoutePath)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-[24px] p-4 text-left shadow-3xs space-y-3 relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-slate-100 text-slate-500 text-[9px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">MAIZE-DELTA-01</span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">Soil Fertility Mgmt</h4>
              </div>
              <button 
                onClick={() => navigateTo("/facilitator/cohorts" as RoutePath)}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <MoreVertical className="h-4.5 w-4.5" />
              </button>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                <span>Overall Completion</span>
                <span className="font-bold text-slate-700">74%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-emerald-900 h-full w-[74%]" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="h-5 w-5 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[8px] font-bold text-emerald-800">DA</div>
                <div className="h-5 w-5 rounded-full bg-amber-100 border border-white flex items-center justify-center text-[8px] font-bold text-amber-800">JC</div>
              </div>
              <span className="text-[10px] text-slate-450 font-bold">45 Active Learners</span>
            </div>
          </div>
        </div>

        {/* Urgent Actions list */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider px-1">Urgent Actions</h3>
          
          <div className="space-y-3">
            {[
              { name: "Chidi Azikiwe", sub: "Inactive for 5 days • Unit 4", btn: "Nudge", stripe: "border-l-rose-500", icon: UserX, iconBg: "bg-rose-50 text-rose-600" },
              { name: "Module 3 Submission", sub: "12 items pending review", btn: "Grade", stripe: "border-l-amber-500", icon: ClipboardCheck, iconBg: "bg-amber-50 text-amber-600" },
              { name: "New Learner Question", sub: "Topic: Pest Control Timing", btn: "Reply", stripe: "border-l-emerald-600", icon: MessageSquare, iconBg: "bg-emerald-50 text-emerald-800" }
            ].map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className={`bg-white border border-slate-200 border-l-4 ${act.stripe} rounded-[20px] p-4 flex justify-between items-center shadow-3xs`}>
                  <div className="flex gap-3 items-center">
                    <div className={`h-8 w-8 rounded-xl ${act.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className="h-4.5 w-4.5 stroke-[2]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-900 text-xs">{act.name}</h4>
                      <p className="text-[10px] text-slate-450 font-semibold">{act.sub}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (act.btn === "Nudge") {
                        navigateTo("/facilitator/follow-up-queue" as RoutePath);
                      } else if (act.btn === "Grade") {
                        navigateTo("/facilitator/assessment-reviews" as RoutePath);
                      } else if (act.btn === "Reply") {
                        navigateTo("/facilitator/learner-questions" as RoutePath);
                      }
                    }}
                    className="h-8 px-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {act.btn}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider px-1">Today's Schedule</h3>
          
          <div className="bg-white border border-slate-200 rounded-[24px] p-4 shadow-3xs space-y-4">
            <div className="flex gap-3 items-start border-b border-slate-50 pb-3">
              <div className="text-center shrink-0">
                <span className="text-xs font-bold text-slate-900 block leading-none">14:00</span>
                <span className="text-[9px] text-slate-400 font-bold block mt-0.5">WAT</span>
              </div>
              <div className="h-6 w-px bg-slate-100 self-stretch" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-xs leading-none">Live Q&A: Maize Cohort</h4>
                <p className="text-[10px] text-slate-450 font-semibold">Zoom Link • 24 RSVPs</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="text-center shrink-0">
                <span className="text-xs font-bold text-slate-900 block leading-none">16:30</span>
                <span className="text-[9px] text-slate-400 font-bold block mt-0.5">WAT</span>
              </div>
              <div className="h-6 w-px bg-slate-100 self-stretch" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-xs leading-none">Review Panel Meeting</h4>
                <p className="text-[10px] text-slate-450 font-semibold">HQ Building • Offline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Moderation list */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider px-1">Community Moderation</h3>

          <div className="bg-white border border-slate-200 rounded-[24px] p-4 shadow-3xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-xs font-bold text-slate-800">Forum Activity</span>
              <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[9px] font-bold rounded-full">3 Alerts</span>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-50">
              <div className="space-y-0.5 pt-1">
                <p className="text-[11px] text-slate-750 font-semibold leading-relaxed">
                  <span className="font-bold text-slate-900">Bolanle T.</span> reported a post for misinformation.
                </p>
                <span className="text-[9px] text-slate-400 font-bold block">2 hours ago</span>
              </div>
              <div className="space-y-0.5 pt-2">
                <p className="text-[11px] text-slate-755 font-semibold leading-relaxed">
                  <span className="font-bold text-slate-900">Obinna O.</span> tagged you in <span className="font-bold text-emerald-800">#IrrigationTechniques</span>
                </p>
                <span className="text-[9px] text-slate-400 font-bold block">4 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Wrap up / Certificate Card */}
        <div className="bg-slate-950 text-white rounded-[24px] p-6 text-center shadow-md border border-slate-900 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-center text-emerald-400">
              <Activity className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="text-xl font-black text-slate-100 leading-tight">Ready to wrap up?</h3>
            <p className="text-xs text-slate-350 leading-relaxed max-w-xs mx-auto font-semibold">
              You have 14 certificates ready for validation before the Friday deadline.
            </p>
            <button 
              onClick={() => showToast("Certification action simulated in this frontend prototype.")}
              className="h-11 w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-extrabold rounded-xl transition-all shadow-xs mt-3 cursor-pointer"
            >
              Process Certifications
            </button>
          </div>
        </div>

        {/* Floating Action Button (FAB) and custom sheet menu */}
        <FacilitatorMobileActionMenu 
          items={[
            { key: "new_cohort", label: "New Cohort", icon: Plus },
            { key: "support_ticket", label: "Create Support Ticket", icon: HelpCircle },
            { key: "follow_up", label: "Create Follow-Up Task", icon: UserX }
          ]}
          onActionSelect={(key) => {
            if (key === "new_cohort") {
              setShowCohortModal(true);
            } else if (key === "support_ticket") {
              navigateTo("/facilitator/support-tickets" as RoutePath);
            } else if (key === "follow_up") {
              navigateTo("/facilitator/follow-up-queue" as RoutePath);
            }
          }}
        />

      </div>

      {/* ====================================================
          3. SCHEDULE MODAL
          ==================================================== */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 transition-all duration-200 ease-out animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-emerald-900">
                <Calendar className="h-5 w-5" />
                <h3 className="text-lg font-bold">Facilitator Schedule</h3>
              </div>
              <p className="text-xs text-slate-500">
                Review your synchronous video calls, panel sessions, and community office hours scheduled for today.
              </p>

              <div className="space-y-3.5 divide-y divide-slate-150 pt-2">
                {[
                  { time: "10:30 WAT", title: "Office Hours: Soil Science", type: "Virtual", icon: MessageSquare },
                  { time: "14:00 WAT", title: "Live Q&A: Maize Cohort", type: "Zoom Link", icon: Users },
                  { time: "16:30 WAT", title: "Review Panel Meeting", type: "HQ Building (Offline)", icon: ClipboardCheck }
                ].map((session, idx) => {
                  const Icon = session.icon;
                  return (
                    <div key={idx} className="flex gap-3 items-start pt-3 first:pt-0">
                      <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">{session.time}</span>
                        <h4 className="text-xs font-bold text-slate-900">{session.title}</h4>
                        <p className="text-[10px] text-emerald-850 font-bold">{session.type}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="h-9 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowScheduleModal(false);
                    showToast("Calendar integration simulated in this frontend prototype.");
                  }}
                  className="h-9 px-4 bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Sync to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          4. CREATE COHORT MODAL
          ==================================================== */}
      {showCohortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 transition-all duration-200 ease-out animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowCohortModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-emerald-900">
                <PlusCircle className="h-5 w-5" />
                <h3 className="text-lg font-bold">Create New Cohort</h3>
              </div>
              <p className="text-xs text-slate-500">
                Initialize a new training cohort group. This will generate local learner registries and setup progress milestones.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-550 uppercase tracking-wider mb-1.5">Cohort Name</label>
                  <input 
                    type="text" 
                    value={newCohortName}
                    onChange={(e) => setNewCohortName(e.target.value)}
                    placeholder="e.g. Kano Youth Employability Cohort 03"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-550 uppercase tracking-wider mb-1.5">Region Location</label>
                  <select 
                    value={newCohortRegion}
                    onChange={(e) => setNewCohortRegion(e.target.value)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white"
                  >
                    <option value="Kano">Kano Region</option>
                    <option value="Kaduna">Kaduna Region</option>
                    <option value="Lagos">Lagos Region</option>
                    <option value="Abuja">Abuja Region</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  onClick={() => setShowCohortModal(false)}
                  className="h-9 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!newCohortName.trim()) {
                      showToast("Please enter a cohort name first.");
                      return;
                    }
                    setShowCohortModal(false);
                    setNewCohortName("");
                    showToast("New cohort creation simulated in this frontend prototype.");
                  }}
                  className="h-9 px-4 bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Create Cohort
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
