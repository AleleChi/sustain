import React from "react";
import { 
  Plus, 
  Download, 
  ChevronRight, 
  ShieldCheck, 
  Grid, 
  Layers, 
  TrendingUp, 
  Award, 
  Clock, 
  FileSpreadsheet, 
  FileText,
  Sparkles
} from "lucide-react";

interface ReportViewsProps {
  activeInternalItem: string;
  selectedCohort: string;
  setSelectedCohort: (c: string) => void;
  selectedLearner: string;
  setSelectedLearner: (l: string) => void;
  selectedAssessment: string;
  setSelectedAssessment: (a: string) => void;
  workspaceFormat: "PDF" | "Excel" | "CSV";
  setWorkspaceFormat: (f: "PDF" | "Excel" | "CSV") => void;
  setNewReportType: (t: string) => void;
  setReportStep: (s: "form" | "success") => void;
  setIsCreateModalOpen: (o: boolean) => void;
  navigateTo: (path: any) => void;
  showToast: (msg: string) => void;
  exportHistory: Array<{ name: string; meta: string; by: string; status: string }>;
  handleGenerateSelectedExport: (f: "PDF" | "Excel" | "CSV") => void;
  incParticipation: boolean;
  setIncParticipation: (b: boolean) => void;
  incProgress: boolean;
  setIncProgress: (b: boolean) => void;
  incScores: boolean;
  setIncScores: (b: boolean) => void;
  incFollowUps: boolean;
  setIncFollowUps: (b: boolean) => void;
  incSupportTickets: boolean;
  setIncSupportTickets: (b: boolean) => void;
  incCertificates: boolean;
  setIncCertificates: (b: boolean) => void;
  incLowBandwidth: boolean;
  setIncLowBandwidth: (b: boolean) => void;
  incDemographics: boolean;
  setIncDemographics: (b: boolean) => void;
  newSummaryFirst: boolean;
  setNewSummaryFirst: (b: boolean) => void;
  newExcludePII: boolean;
  setNewExcludePII: (b: boolean) => void;
  newIncludeIDs: boolean;
  setNewIncludeIDs: (b: boolean) => void;
  newAddFacilitator: boolean;
  setNewAddFacilitator: (b: boolean) => void;
  newAddBranding: boolean;
  setNewAddBranding: (b: boolean) => void;
  getIncludedSections: () => string;
}

export const ReportViews: React.FC<ReportViewsProps> = ({
  activeInternalItem,
  selectedCohort,
  setSelectedCohort,
  selectedLearner,
  setSelectedLearner,
  selectedAssessment,
  setSelectedAssessment,
  workspaceFormat,
  setWorkspaceFormat,
  setNewReportType,
  setReportStep,
  setIsCreateModalOpen,
  navigateTo,
  showToast,
  exportHistory,
  handleGenerateSelectedExport,
  incParticipation,
  setIncParticipation,
  incProgress,
  setIncProgress,
  incScores,
  setIncScores,
  incFollowUps,
  setIncFollowUps,
  incSupportTickets,
  setIncSupportTickets,
  incCertificates,
  setIncCertificates,
  incLowBandwidth,
  setIncLowBandwidth,
  incDemographics,
  setIncDemographics,
  newSummaryFirst,
  setNewSummaryFirst,
  newExcludePII,
  setNewExcludePII,
  newIncludeIDs,
  setNewIncludeIDs,
  newAddFacilitator,
  setNewAddFacilitator,
  newAddBranding,
  setNewAddBranding,
  getIncludedSections
}) => {
  if (activeInternalItem === "Dashboard") {
    return null; // Dashboard is handled inline in the page
  }

  return (
    <div className="w-full space-y-6">
      {/* COHORT SUMMARIES VIEW */}
      {activeInternalItem === "Cohort Summaries" && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Cohort Summary Reports</h2>
              <p className="text-xs text-slate-500 mt-1">Review cohort-level progress, completion, certification, and support activity.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => {
                  setNewReportType("Cohort Summary");
                  setReportStep("form");
                  setIsCreateModalOpen(true);
                }}
                className="bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all shadow-3xs hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 focus-ring"
              >
                <Plus className="h-4 w-4" />
                <span>Create Cohort Summary</span>
              </button>
              <button 
                onClick={() => showToast("Cohort summary export simulated in this frontend prototype.")}
                className="bg-white border border-slate-250 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer focus-ring"
              >
                <span>Export Summary</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Total Learners", value: "510" },
              { label: "Average Progress", value: "58%" },
              { label: "Certificate Ready", value: "64" },
              { label: "At-Risk Learners", value: "18", color: "text-red-600" },
              { label: "Assessments Due", value: "42", color: "text-amber-600" }
            ].map((card) => (
              <div key={card.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono block">{card.label}</span>
                <span className={`text-xl font-black ${card.color || "text-slate-850"} mt-1 block`}>{card.value}</span>
              </div>
            ))}
          </div>

          {/* Grid Layout: Table & Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Table (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
              <h3 className="text-xs font-extrabold text-slate-550 uppercase tracking-widest font-mono pb-4 border-b border-slate-100">Cohort Summary Ledger</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                      <th className="py-3 font-mono">Cohort</th>
                      <th className="py-3 font-mono">Programme</th>
                      <th className="py-3 font-mono text-center">Learners</th>
                      <th className="py-3 font-mono text-center">Avg Progress</th>
                      <th className="py-3 font-mono text-center">At Risk</th>
                      <th className="py-3 text-right font-mono">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Kano Youth Employability Cohort 02", prog: "SUSTAIN CPD", count: 386, progress: "58%", atRisk: 18, date: "Oct 24" },
                      { name: "Kaduna Agribusiness Cohort", prog: "SUSTAIN Agribusiness", count: 124, progress: "74%", atRisk: 6, date: "Oct 22" },
                      { name: "Lagos Market Access Cohort", prog: "SUSTAIN Enterprise", count: 98, progress: "50%", atRisk: 9, date: "Oct 20" }
                    ].map((row) => {
                      const isSelected = selectedCohort === row.name;
                      return (
                        <tr 
                          key={row.name} 
                          onClick={() => setSelectedCohort(row.name)}
                          className={`border-b border-slate-100/80 last:border-0 hover:bg-emerald-50/20 cursor-pointer transition-colors ${
                            isSelected ? "bg-emerald-50/30" : ""
                          }`}
                        >
                          <td className="py-4 font-bold text-slate-700 text-xs max-w-[180px] truncate">{row.name}</td>
                          <td className="py-4 text-slate-500 font-medium text-xs">{row.prog}</td>
                          <td className="py-4 text-center text-slate-700 font-bold text-xs">{row.count}</td>
                          <td className="py-4 text-center text-[#005c45] font-black text-xs">{row.progress}</td>
                          <td className="py-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.atRisk > 10 ? "bg-red-50 text-red-700 border border-red-150" : "bg-amber-50 text-amber-700 border border-amber-150"}`}>
                              {row.atRisk}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-emerald-700 hover:text-white rounded-lg transition-all focus-ring">
                              View Summary
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail Panel (4 cols) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[9px] text-slate-455 font-extrabold uppercase tracking-wider font-mono">Selected Cohort Overview</span>
                <h4 className="text-xs font-black text-slate-800 leading-snug mt-1">{selectedCohort}</h4>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Completion Overview</span>
                    <span className="text-emerald-800">58%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#005c45] h-full rounded-full" style={{ width: "58%" }}></div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex gap-2.5 items-start">
                    <div className="h-2 w-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-700">Assessment Readiness</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">84% of required CPD coursework assessments completed successfully.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-700">Follow-Up Needs</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">18 learners currently flagged as at-risk due to low participation activity.</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <div className="h-2 w-2 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-700">Low-Bandwidth Support</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed">72% of learners interact using SMS, low-bandwidth transcription, or USSD.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button 
                  onClick={() => {
                    setNewReportType("Cohort Summary");
                    setReportStep("form");
                    setIsCreateModalOpen(true);
                  }}
                  className="w-full bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer shadow-3xs"
                >
                  Generate Report
                </button>
                <button 
                  onClick={() => showToast("Cohort summary export simulated in this frontend prototype.")}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer"
                >
                  Export PDF
                </button>
                <button 
                  onClick={() => navigateTo("/facilitator/cohorts" as any)}
                  className="w-full bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl py-2 text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Open Cohort Detail</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEARNER PROGRESS VIEW */}
      {activeInternalItem === "Learner Progress" && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Learner Progress Reports</h2>
              <p className="text-xs text-slate-500 mt-1">Track individual learner completion, activity, assessment status, and support needs.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => {
                  setNewReportType("Learner Progress");
                  setReportStep("form");
                  setIsCreateModalOpen(true);
                }}
                className="bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all shadow-3xs hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 focus-ring"
              >
                <Plus className="h-4 w-4" />
                <span>Generate Learner Progress Report</span>
              </button>
              <button 
                onClick={() => showToast("Learner progress report export simulated in this frontend prototype.")}
                className="bg-white border border-slate-250 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer focus-ring"
              >
                <span>Export Learner Data</span>
              </button>
            </div>
          </div>

          {/* Filters block */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Cohort</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>Kano Youth Employability Cohort 02</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Course</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>Work Readiness Foundation</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Progress Level</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>All Levels</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Activity Status</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>All Statuses</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Assessment Status</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>All</option>
              </select>
            </div>
          </div>

          {/* Table & Detail panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
              <h3 className="text-xs font-extrabold text-slate-550 uppercase tracking-widest font-mono pb-4 border-b border-slate-100">Learner Roster</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                      <th className="py-3 font-mono">Learner</th>
                      <th className="py-3 font-mono">Cohort</th>
                      <th className="py-3 font-mono">Current Course</th>
                      <th className="py-3 font-mono text-center">Progress</th>
                      <th className="py-3 font-mono text-center">Status</th>
                      <th className="py-3 text-right font-mono">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Aisha Mohammed", cohort: "Kano 02", course: "Work Readiness", progress: "42%", lastActive: "9 days ago", status: "Overdue", support: "Medium" },
                      { name: "Musa Danladi", cohort: "Kano 02", course: "Digital Basics", progress: "12%", lastActive: "14 days ago", status: "Not Started", support: "High" },
                      { name: "Chigozie Ugwu", cohort: "Kano 02", course: "Interview Prep", progress: "88%", lastActive: "1 day ago", status: "Passed", support: "Low" }
                    ].map((row) => {
                      const isSelected = selectedLearner === row.name;
                      return (
                        <tr 
                          key={row.name} 
                          onClick={() => setSelectedLearner(row.name)}
                          className={`border-b border-slate-100/80 last:border-0 hover:bg-emerald-50/20 cursor-pointer transition-colors ${
                            isSelected ? "bg-emerald-50/30" : ""
                          }`}
                        >
                          <td className="py-4 font-bold text-slate-700 text-xs">{row.name}</td>
                          <td className="py-4 text-slate-500 font-semibold text-xs">{row.cohort}</td>
                          <td className="py-4 text-slate-600 font-medium text-xs">{row.course}</td>
                          <td className="py-4 text-center text-slate-800 font-black text-xs">{row.progress}</td>
                          <td className="py-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              row.status === "Passed" 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                                : row.status === "Overdue" 
                                ? "bg-amber-50 text-amber-700 border border-amber-150" 
                                : "bg-red-50 text-red-700 border border-red-150"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-emerald-700 hover:text-white rounded-lg transition-all focus-ring">
                              View Record
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center gap-3">
                <div className="h-9 w-9 bg-indigo-50 border border-indigo-100 text-indigo-950 font-extrabold flex items-center justify-center rounded-full font-mono text-xs shrink-0">
                  {selectedLearner.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <span className="text-[9px] text-slate-455 font-extrabold uppercase tracking-wider font-mono">Selected Learner Progress</span>
                  <h4 className="text-xs font-black text-slate-800 mt-0.5">{selectedLearner}</h4>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <p className="text-slate-400 font-bold font-mono text-[10px] uppercase">Course Completion</p>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>{selectedLearner === "Aisha Mohammed" ? "Work Readiness Foundation" : selectedLearner === "Musa Danladi" ? "Digital Basics" : "Interview Prep"}</span>
                    <span className="text-emerald-800 font-black">{selectedLearner === "Aisha Mohammed" ? "42%" : selectedLearner === "Musa Danladi" ? "12%" : "88%"}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-[#005c45] h-full rounded-full" style={{ width: selectedLearner === "Aisha Mohammed" ? "42%" : selectedLearner === "Musa Danladi" ? "12%" : "88%" }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-medium leading-relaxed">
                  <div className="bg-slate-55 border border-slate-150 rounded-lg p-2.5">
                    <p className="text-slate-400 font-mono text-[9px] uppercase">Lessons Completed</p>
                    <p className="text-xs font-extrabold text-slate-755 mt-0.5">{selectedLearner === "Aisha Mohammed" ? "14 / 32 Lessons" : selectedLearner === "Musa Danladi" ? "4 / 32 Lessons" : "28 / 32 Lessons"}</p>
                  </div>
                  <div className="bg-slate-55 border border-slate-150 rounded-lg p-2.5">
                    <p className="text-slate-400 font-mono text-[9px] uppercase">CPD Credits</p>
                    <p className="text-xs font-extrabold text-slate-755 mt-0.5">{selectedLearner === "Aisha Mohammed" ? "12 Credits" : selectedLearner === "Musa Danladi" ? "3 Credits" : "24 Credits"}</p>
                  </div>
                </div>

                <div className="bg-[#f0f9ff]/50 border border-sky-100 rounded-xl p-3 space-y-1">
                  <p className="font-bold text-slate-700 text-[11px]">Recommended Support Outreach</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {selectedLearner === "Aisha Mohammed" 
                      ? "Reach out via standard SMS to complete overdue Work Readiness Foundation modules." 
                      : selectedLearner === "Musa Danladi" 
                      ? "High at-risk indicator. Call directly to assist with initial setup issues and course access." 
                      : "No immediate outreach required. Learner is actively working ahead of cohort schedule."}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button 
                  onClick={() => navigateTo(`/facilitator/learners` as any)}
                  className="w-full bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer shadow-3xs"
                >
                  View Learner Record
                </button>
                <button 
                  onClick={() => navigateTo("/facilitator/support-tickets" as any)}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer"
                >
                  Create Follow-Up
                </button>
                <button 
                  onClick={() => showToast("Learner progress report export simulated in this frontend prototype.")}
                  className="w-full bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl py-2 text-xs font-bold transition-all text-center cursor-pointer"
                >
                  Export Learner Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ASSESSMENT REVIEWS REPORT VIEW */}
      {activeInternalItem === "Assessment Reviews" && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Assessment Review Reports</h2>
              <p className="text-xs text-slate-500 mt-1">Review assessment completion, grading activity, pending submissions, and score trends.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => {
                  setNewReportType("Assessment Review");
                  setReportStep("form");
                  setIsCreateModalOpen(true);
                }}
                className="bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all shadow-3xs hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 focus-ring"
              >
                <Plus className="h-4 w-4" />
                <span>Generate Assessment Report</span>
              </button>
              <button 
                onClick={() => navigateTo("/facilitator/support-tickets" as any)}
                className="bg-white border border-slate-250 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer focus-ring"
              >
                <span>Open Assessment Reviews</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Pending Reviews", value: "12", color: "text-amber-600" },
              { label: "Reviewed This Week", value: "28" },
              { label: "Average Score", value: "82%" },
              { label: "Returned Submissions", value: "5", color: "text-red-600" },
              { label: "Passed", value: "142", color: "text-emerald-700" }
            ].map((card) => (
              <div key={card.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono block">{card.label}</span>
                <span className={`text-xl font-black ${card.color || "text-slate-850"} mt-1 block`}>{card.value}</span>
              </div>
            ))}
          </div>

          {/* Main content split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
              <h3 className="text-xs font-extrabold text-slate-550 uppercase tracking-widest font-mono pb-4 border-b border-slate-100">Assessment Ledger</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-[10px] font-bold text-slate-455 uppercase tracking-wider">
                      <th className="py-3 font-mono">Assessment</th>
                      <th className="py-3 font-mono">Course</th>
                      <th className="py-3 font-mono text-center">Pending</th>
                      <th className="py-3 font-mono text-center">Reviewed</th>
                      <th className="py-3 font-mono text-center">Avg Score</th>
                      <th className="py-3 font-mono text-center">Pass Rate</th>
                      <th className="py-3 text-right font-mono">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Work Readiness Assignment", course: "Work Readiness Foundation", pending: 12, reviewed: 28, score: "82%", returned: 5, pass: "88%" },
                      { name: "Agribusiness Plan V1", course: "Entrepreneurship 101", pending: 6, reviewed: 18, score: "76%", returned: 2, pass: "80%" },
                      { name: "Digital Readiness Quiz", course: "Digital Basics", pending: 0, reviewed: 42, score: "88%", returned: 1, pass: "94%" }
                    ].map((row) => {
                      const isSelected = selectedAssessment === row.name;
                      return (
                        <tr 
                          key={row.name} 
                          onClick={() => setSelectedAssessment(row.name)}
                          className={`border-b border-slate-100/80 last:border-0 hover:bg-emerald-50/20 cursor-pointer transition-colors ${
                            isSelected ? "bg-emerald-50/30" : ""
                          }`}
                        >
                          <td className="py-4 font-bold text-slate-700 text-xs">{row.name}</td>
                          <td className="py-4 text-slate-500 font-semibold text-xs">{row.course}</td>
                          <td className="py-4 text-center text-slate-700 font-bold text-xs">
                            <span className={row.pending > 0 ? "text-amber-600 font-extrabold" : "text-slate-400"}>{row.pending}</span>
                          </td>
                          <td className="py-4 text-center text-slate-600 text-xs font-medium">{row.reviewed}</td>
                          <td className="py-4 text-center text-slate-800 font-bold text-xs">{row.score}</td>
                          <td className="py-4 text-center text-emerald-700 font-black text-xs">{row.pass}</td>
                          <td className="py-4 text-right">
                            <button className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-700 hover:bg-emerald-700 hover:text-white rounded-lg transition-all focus-ring">
                              View Breakdown
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right breakdown panel */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[9px] text-slate-455 font-extrabold uppercase tracking-wider font-mono">Selected Assessment breakdown</span>
                <h4 className="text-xs font-black text-slate-800 mt-1 leading-snug">{selectedAssessment}</h4>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="space-y-1">
                  <p className="font-bold text-slate-700">Submissions Queue Summary</p>
                  <p className="text-[11px] text-slate-500">
                    {selectedAssessment === "Work Readiness Assignment" 
                      ? "12 submissions currently awaiting grading. Recommend review before end-of-week freeze." 
                      : selectedAssessment === "Agribusiness Plan V1" 
                      ? "6 pending reviews. Grading queue is currently 70% complete." 
                      : "All submissions evaluated. 42 reviews completed successfully."}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="font-bold text-slate-700">Common Feedback Themes</p>
                  <p className="text-[11px] text-slate-500">
                    "Excellent self-reflective exercises. Some learners struggle with standard formatting of career timelines."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-[11px] font-medium leading-relaxed">
                  <div className="bg-slate-55 border border-slate-150 rounded-lg p-2.5">
                    <p className="text-slate-400 font-mono text-[9px] uppercase">Avg attempts</p>
                    <p className="text-xs font-extrabold text-slate-755 mt-0.5">1.4 Attempts</p>
                  </div>
                  <div className="bg-slate-55 border border-slate-150 rounded-lg p-2.5">
                    <p className="text-slate-400 font-mono text-[9px] uppercase">Returned for Edit</p>
                    <p className="text-xs font-extrabold text-slate-755 mt-0.5">{selectedAssessment === "Work Readiness Assignment" ? "5 returned" : selectedAssessment === "Agribusiness Plan V1" ? "2 returned" : "1 returned"}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button 
                  onClick={() => navigateTo("/facilitator/support-tickets" as any)}
                  className="w-full bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer shadow-3xs"
                >
                  Open Review Queue
                </button>
                <button 
                  onClick={() => showToast("Assessment report export simulated in this frontend prototype.")}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer"
                >
                  Export Assessment Report
                </button>
                <button 
                  onClick={() => navigateTo("/facilitator/support-tickets" as any)}
                  className="w-full bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl py-2 text-xs font-bold transition-all text-center cursor-pointer"
                >
                  View Learner Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPORT HISTORY LEDGER VIEW */}
      {activeInternalItem === "History Ledger" && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Report History Ledger</h2>
              <p className="text-xs text-slate-500 mt-1">Review generated reports, export activity, download records, and audit status.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => showToast("Report history export simulated in this frontend prototype.")}
                className="bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all shadow-3xs hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 focus-ring animate-pulse"
              >
                <Download className="h-4 w-4" />
                <span>Export History Log</span>
              </button>
              <button 
                onClick={() => showToast("Filters cleared")}
                className="bg-white border border-slate-250 text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer focus-ring"
              >
                <span>Clear Filters</span>
              </button>
            </div>
          </div>

          {/* Filters block */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-3xs grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Date Range</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Report Type</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>All Types</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Generated By</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>All Users</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Format</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>All Formats</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase font-mono">Status</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-medium">
                <option>All Statuses</option>
              </select>
            </div>
          </div>

          {/* Table & Timeline split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
              <h3 className="text-xs font-extrabold text-slate-555 uppercase tracking-widest font-mono pb-4 border-b border-slate-100">Compiled Documents</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 text-[10px] font-bold text-slate-455 uppercase tracking-wider">
                      <th className="py-3 font-mono">Report Name</th>
                      <th className="py-3 font-mono">Type</th>
                      <th className="py-3 font-mono">Generated By</th>
                      <th className="py-3 font-mono text-center">Format</th>
                      <th className="py-3 font-mono text-center">Audit Status</th>
                      <th className="py-3 text-right font-mono">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportHistory.map((row) => {
                      const formatExt = row.name.split(".").pop()?.toUpperCase() || "PDF";
                      return (
                        <tr key={row.name} className="border-b border-slate-100/80 last:border-0 hover:bg-emerald-50/15 transition-all">
                          <td className="py-4 font-bold text-slate-700 text-xs">
                            <p className="truncate max-w-[200px]" title={row.name}>{row.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{row.meta}</p>
                          </td>
                          <td className="py-4 text-slate-550 font-semibold text-xs">{row.name.includes("Progress") ? "Learner Progress" : row.name.includes("Bandwidth") ? "Low-Bandwidth Support" : "Cohort Summary"}</td>
                          <td className="py-4 text-slate-600 font-medium text-xs">{row.by}</td>
                          <td className="py-4 text-center">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              formatExt === "PDF" 
                                ? "bg-red-50 text-red-700 border-red-150" 
                                : formatExt === "XLSX" || formatExt === "EXCEL" 
                                ? "bg-emerald-50 text-emerald-700 border-emerald-150" 
                                : "bg-blue-50 text-blue-700 border-blue-150"
                            }`}>
                              {formatExt}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                              Logged
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => showToast("Report download simulated in this frontend prototype.")}
                              className="p-1.5 text-slate-400 hover:text-emerald-850 hover:bg-slate-50 border border-slate-200 hover:border-emerald-300 rounded-lg cursor-pointer transition-all inline-flex items-center gap-1 focus-ring"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[9px] text-slate-455 font-extrabold uppercase tracking-wider font-mono">Export Activity Audit log</span>
                <h4 className="text-xs font-black text-slate-800 mt-1">Audit Tracking</h4>
              </div>

              <div className="space-y-4 text-xs">
                {[
                  { time: "Today, 09:12", event: "Cohort Summary report generated", desc: "Kano_C02_Monthly_Summary_Oct.pdf compiled by Halima Sani" },
                  { time: "Yesterday, 15:44", event: "Learner Progress export downloaded", desc: "Progress DeepDive spreadsheet exported for target tracking" },
                  { time: "Oct 18, 11:02", event: "Low-bandwidth support log generated", desc: "SMS and transcription packet sync completed successfully" }
                ].map((log, idx) => (
                  <div key={idx} className="flex gap-3 items-start relative pb-2">
                    {idx !== 2 && <div className="absolute left-1.5 top-3 bottom-0 w-0.5 bg-slate-150" />}
                    <div className="h-3 w-3 rounded-full bg-emerald-600 border border-white shrink-0 mt-1.5 z-10" />
                    <div className="space-y-0.5">
                      <p className="text-[10px] text-slate-400 font-mono font-bold">{log.time}</p>
                      <p className="font-bold text-slate-800">{log.event}</p>
                      <p className="text-[11px] text-slate-500 leading-normal">{log.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button 
                  onClick={() => showToast("Report download simulated in this frontend prototype.")}
                  className="w-full bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer shadow-3xs"
                >
                  Download All Recent
                </button>
                <button 
                  onClick={() => showToast("Report history export simulated in this frontend prototype.")}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer"
                >
                  Export History Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT WORKSPACE VIEW */}
      {activeInternalItem === "Export Workspace" && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs">
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Export Workspace</h2>
              <p className="text-xs text-slate-500 mt-1">Choose export formats, privacy settings, and report packaging options.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => {
                  setNewReportType("Cohort Summary");
                  setReportStep("form");
                  setIsCreateModalOpen(true);
                }}
                className="bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2 px-4 text-xs font-bold transition-all shadow-3xs hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 focus-ring"
              >
                <Plus className="h-4 w-4" />
                <span>Create Export Package</span>
              </button>
              <button 
                onClick={() => handleGenerateSelectedExport(workspaceFormat)}
                className="bg-white border border-slate-250 text-[#005c45] hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 rounded-xl py-2 px-4 text-xs font-bold transition-all cursor-pointer focus-ring"
              >
                <span>Generate Selected Export</span>
              </button>
            </div>
          </div>

          {/* Settings columns and preview card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Columns (Format, Sections, Privacy) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Format Column */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-[#005c45] uppercase tracking-widest font-mono border-b border-slate-100 pb-3">Export Format</h3>
                  <div className="space-y-3">
                    {[
                      { id: "PDF", name: "Professional PDF", desc: "Best for executive reporting and visual reviews" },
                      { id: "Excel", name: "Excel Spreadsheet", desc: "Best for data analytics and table tracking" },
                      { id: "CSV", name: "CSV Data File", desc: "Flat file format for simple integrations" }
                    ].map((fmt) => (
                      <div 
                        key={fmt.id}
                        onClick={() => setWorkspaceFormat(fmt.id as "PDF" | "Excel" | "CSV")}
                        className={`p-3 border rounded-xl cursor-pointer transition-all text-left ${
                          workspaceFormat === fmt.id 
                            ? "border-emerald-600 bg-emerald-50/30" 
                            : "border-slate-200 hover:border-emerald-200"
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-850">{fmt.name}</p>
                        <p className="text-[10px] text-slate-450 leading-relaxed mt-1">{fmt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sections Column */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-[#005c45] uppercase tracking-widest font-mono border-b border-slate-100 pb-3">Included Sections</h3>
                  <div className="space-y-2.5">
                    {[
                      { id: "ws_cohort", label: "Cohort summary", checked: incParticipation, set: setIncParticipation },
                      { id: "ws_learner", label: "Learner progress", checked: incProgress, set: setIncProgress },
                      { id: "ws_scores", label: "Assessment scores", checked: incScores, set: setIncScores },
                      { id: "ws_followups", label: "Follow-up actions", checked: incFollowUps, set: setIncFollowUps },
                      { id: "ws_tickets", label: "Support tickets", checked: incSupportTickets, set: setIncSupportTickets },
                      { id: "ws_certificates", label: "Certificate readiness", checked: incCertificates, set: setIncCertificates },
                      { id: "ws_lowbandwidth", label: "Low-bandwidth support", checked: incLowBandwidth, set: setIncLowBandwidth },
                      { id: "ws_demographics", label: "Demographics & details", checked: incDemographics, set: setIncDemographics }
                    ].map((sec) => (
                      <label key={sec.id} className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={sec.checked}
                          onChange={(e) => sec.set(e.target.checked)}
                          className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                        />
                        <span className="text-xs text-slate-655 font-medium">{sec.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Privacy Column */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-[#005c45] uppercase tracking-widest font-mono border-b border-slate-100 pb-3">Privacy Settings</h3>
                  <div className="space-y-2.5">
                    {[
                      { id: "ws_summary", label: "Summary page first", checked: newSummaryFirst, set: setNewSummaryFirst },
                      { id: "ws_pii", label: "Exclude contact details (PII)", checked: newExcludePII, set: setNewExcludePII },
                      { id: "ws_ids", label: "Include learner IDs", checked: newIncludeIDs, set: setNewIncludeIDs },
                      { id: "ws_fac", label: "Include facilitator name", checked: newAddFacilitator, set: setNewAddFacilitator },
                      { id: "ws_brand", label: "Add programme branding", checked: newAddBranding, set: setNewAddBranding }
                    ].map((priv) => (
                      <label key={priv.id} className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input 
                          type="checkbox"
                          checked={priv.checked}
                          onChange={(e) => priv.set(e.target.checked)}
                          className="rounded-md border-slate-300 text-emerald-700 focus:ring-emerald-500 h-4 w-4"
                        />
                        <span className="text-xs text-slate-655 font-medium">{priv.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Card (3 cols) */}
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[9px] text-indigo-855 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-md font-bold font-mono">LIVE PREVIEW</span>
                  <h4 className="text-xs font-black text-slate-800 mt-2">Export Package Preview</h4>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-slate-55 border border-slate-150 p-3 rounded-xl space-y-2 font-medium text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">File Type:</span>
                      <span className="text-slate-700 font-bold">.{workspaceFormat.toLowerCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Learners:</span>
                      <span className="text-slate-700 font-bold">510 Learners</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">PII Redacted:</span>
                      <span className="text-slate-700 font-bold">{newExcludePII ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sections Included:</span>
                      <span className="text-slate-700 font-bold text-right truncate pl-2">{getIncludedSections()}</span>
                    </div>
                  </div>

                  <div className="bg-[#f0f9ff]/50 border border-sky-100 rounded-xl p-3 flex gap-2 items-start">
                    <ShieldCheck className="h-4 w-4 text-sky-700 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-slate-500 leading-relaxed">Logged for NDPR data compliance on generation.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button 
                  onClick={() => handleGenerateSelectedExport(workspaceFormat)}
                  className="w-full bg-[#005c45] hover:bg-emerald-850 text-white rounded-xl py-2.5 text-xs font-bold transition-all focus-ring text-center cursor-pointer shadow-3xs hover:-translate-y-0.5"
                >
                  Generate Selected Export
                </button>
                <button 
                  onClick={() => {
                    setNewReportType("Cohort Summary");
                    setReportStep("form");
                    setIsCreateModalOpen(true);
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl py-2 text-xs font-bold transition-all focus-ring text-center cursor-pointer"
                >
                  Configure in Drawer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
