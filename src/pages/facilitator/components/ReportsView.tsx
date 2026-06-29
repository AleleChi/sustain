import { useState } from "react";
import { 
  mockFacilitatorCohorts, 
  mockFacilitatorReports,
  FacilitatorReport 
} from "../../../data/mockFacilitator";
import { 
  Layers, 
  Users, 
  TrendingUp, 
  Award, 
  Calendar, 
  FileSpreadsheet, 
  Clock 
} from "lucide-react";

export function ReportsView() {
  const [selectedCohortId, setSelectedCohortId] = useState<string>("kano-02");

  const reportData = mockFacilitatorReports.find(r => r.cohortId === selectedCohortId) || mockFacilitatorReports[0];
  const cohortInfo = mockFacilitatorCohorts.find(c => c.id === selectedCohortId);

  const handleExport = () => {
    alert(`Cohort progression CSV sheet exported successfully to downloads folder.`);
  };

  // Generate SVG points for a beautiful line chart
  const hours = reportData.weeklyActivityTrend.map(t => t.engagementHours);
  const maxHours = Math.max(...hours, 200);
  const svgWidth = 500;
  const svgHeight = 150;
  const padding = 20;
  const graphWidth = svgWidth - padding * 2;
  const graphHeight = svgHeight - padding * 2;

  const points = reportData.weeklyActivityTrend.map((t, idx) => {
    const x = padding + (idx / (reportData.weeklyActivityTrend.length - 1)) * graphWidth;
    const y = svgHeight - padding - (t.engagementHours / maxHours) * graphHeight;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-sustain-primary uppercase tracking-widest font-mono block">
            EVALUATION METRICS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
            Cohort Progress Reports
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Monitor real cohort participation, coursework completion ratios, and lecture attendance statistics.
          </p>
        </div>

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0 shadow-3xs"
        >
          <FileSpreadsheet className="h-4.5 w-4.5 text-emerald-800" /> Export CSV Summary
        </button>
      </div>

      {/* Selector and overview panel */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div className="space-y-1">
          <span className="text-slate-400 font-bold font-mono text-[9px] uppercase">Active Report Context</span>
          <h3 className="text-base font-extrabold text-slate-900 leading-snug">
            {cohortInfo?.name || mockFacilitatorCohorts[0]?.name}
          </h3>
          <p className="text-[11px] text-slate-550 font-medium">{cohortInfo?.programme}</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Layers className="h-4.5 w-4.5 text-slate-400 hidden sm:block shrink-0" />
          <select
            value={selectedCohortId}
            onChange={(e) => setSelectedCohortId(e.target.value)}
            className="w-full sm:w-64 border border-slate-200 bg-slate-50 text-slate-700 py-2 px-3 text-xs rounded-xl focus:outline-hidden focus:border-emerald-800 font-medium cursor-pointer"
          >
            {mockFacilitatorCohorts.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cohort Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Enrolled", val: `${reportData.metrics.enrolled} Students`, sub: "Registered files", icon: Users, color: "text-emerald-850 bg-emerald-50 border-emerald-100" },
          { label: "Weekly Active", val: `${reportData.metrics.activeThisWeek} Students`, sub: `${Math.round((reportData.metrics.activeThisWeek / reportData.metrics.enrolled) * 100)}% Engagement`, icon: TrendingUp, color: "text-blue-700 bg-blue-50 border-blue-100" },
          { label: "LMS Progress", val: `${reportData.metrics.completionRate}% Avg`, sub: "Curriculum complete", icon: Award, color: "text-purple-700 bg-purple-50 border-purple-100" },
          { label: "Live Attendance", val: `${reportData.metrics.attendanceRate}% Rate`, sub: "In-person webinars", icon: Calendar, color: "text-amber-700 bg-amber-50 border-amber-100" }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between text-left shadow-2xs">
            <div className="space-y-1.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block font-mono">{metric.label}</span>
              <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none">{metric.val}</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{metric.sub}</p>
            </div>
            <div className={`p-2 rounded-xl border ${metric.color} shrink-0 hidden sm:block`}>
              <metric.icon className="h-4.5 w-4.5 stroke-[2.5]" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Graphs Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Weekly Engagement Trend Graph Card (Span 8) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 text-left">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono">
              Weekly Learner Platform Activity Hours
            </h3>
            <span className="text-[11px] font-bold text-slate-500">Aggregate Study Minutes</span>
          </div>

          <div className="space-y-4">
            {/* Native SVG Chart */}
            <div className="w-full bg-slate-50 border border-slate-150 rounded-xl p-3.5 flex justify-center">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
                {/* Horizontal grid lines */}
                {[0, 0.5, 1].map((val, idx) => {
                  const y = padding + val * graphHeight;
                  return (
                    <line 
                      key={idx}
                      x1={padding} 
                      y1={y} 
                      x2={svgWidth - padding} 
                      y2={y} 
                      stroke="#e2e8f0" 
                      strokeWidth="1" 
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke="#047857"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />

                {/* Draw Circular Vertex Dots and Value text */}
                {reportData.weeklyActivityTrend.map((t, idx) => {
                  const x = padding + (idx / (reportData.weeklyActivityTrend.length - 1)) * graphWidth;
                  const y = svgHeight - padding - (t.engagementHours / maxHours) * graphHeight;
                  return (
                    <g key={idx}>
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="5.5" 
                        fill="#ffffff" 
                        stroke="#065f46" 
                        strokeWidth="3" 
                      />
                      <text 
                        x={x} 
                        y={y - 12} 
                        textAnchor="middle" 
                        fontSize="9.5" 
                        className="font-bold fill-slate-800 font-mono"
                      >
                        {t.engagementHours}h
                      </text>
                      <text 
                        x={x} 
                        y={svgHeight - 2} 
                        textAnchor="middle" 
                        fontSize="9" 
                        className="font-bold fill-slate-400 font-mono"
                      >
                        {t.week}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal font-medium text-center">
              * Engagement hours represent the total duration spent on course player lessons, quiz submission runs, and discussion posts.
            </p>
          </div>
        </div>

        {/* Evaluation Summary Statistics (Span 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4 text-left">
          <h3 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono">
            Cohorts Grade Performance
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>Classroom Passing Ratio</span>
                <span className="font-extrabold text-slate-900">100% Passed</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                <div className="bg-emerald-800 h-full rounded-full" style={{ width: "95%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>Average Assignment Mark</span>
                <span className="font-extrabold text-slate-900">{reportData.metrics.averageScore}% avg</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                <div className="bg-blue-700 h-full rounded-full" style={{ width: `${reportData.metrics.averageScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span>Support Flag Ratio</span>
                <span className="font-extrabold text-slate-900">3% Flagged</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: "4%" }} />
              </div>
            </div>
            
            <div className="pt-2 bg-slate-50 p-3 rounded-xl border border-slate-100/80">
              <span className="text-[9px] text-slate-400 font-bold block font-mono">COHORT REMARKS</span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium mt-1">
                {cohortInfo?.name || "The cohort"} is demonstrating high grade metrics with standard {reportData.metrics.attendanceRate}% lecture attendance rates. Outlying flags are isolated electricity signal concerns.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
