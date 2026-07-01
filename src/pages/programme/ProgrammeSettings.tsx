import { useState } from "react";
import { 
  Target, 
  Award, 
  RefreshCw,
  Globe,
  Users,
  WifiOff,
  BarChart3,
  Bell,
  ArrowRight,
  Info
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";

export function ProgrammeSettings() {
  const { showToast, navigateTo } = useRoute();

  // Settings State
  const [nationalTarget, setNationalTarget] = useState(10000);
  const [cpdThreshold, setCpdThreshold] = useState(35);
  
  // Toggles State
  const [allowOfflineEvidence, setAllowOfflineEvidence] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);
  const [allowAutoIssue, setAllowAutoIssue] = useState(false);

  const [lightweightMode, setLightweightMode] = useState(true);
  const [offlinePacks, setOfflinePacks] = useState(true);
  const [savedDrafts, setSavedDrafts] = useState(true);
  const [facilitatorOfflineEvidence, setFacilitatorOfflineEvidence] = useState(true);

  const [genderDisaggregated, setGenderDisaggregated] = useState(true);
  const [stateCohortReporting, setStateCohortReporting] = useState(true);
  const [pathwayPerformance, setPathwayPerformance] = useState(true);
  const [certificateReadiness, setCertificateReadiness] = useState(true);
  const [lowBandwidthUsage, setLowBandwidthUsage] = useState(true);

  const [inactiveLearnerAlerts, setInactiveLearnerAlerts] = useState(true);
  const [assessmentReminders, setAssessmentReminders] = useState(true);
  const [certReminders, setCertReminders] = useState(true);
  const [lowBandwidthAlerts, setLowBandwidthAlerts] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);

  // Modal State
  const [modalContent, setModalContent] = useState<{ title: string; message: string; type?: "info" | "success" } | null>(null);

  // Enrolled learners is static as per design rules
  const enrolledLearners = 4286;
  const targetReachedPercent = Math.min(100, Math.round((enrolledLearners / nationalTarget) * 100));

  const handleSaveChanges = () => {
    showToast("Changes saved successfully. Configuration synchronized across SUSTAIN LMS.");
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshSuccess(true);
      showToast("Dashboard data refreshed successfully with latest activity logs.");
      
      // Auto-hide success check after 4 seconds
      setTimeout(() => {
        setRefreshSuccess(false);
      }, 4000);
    }, 1200);
  };

  const showPrototypeModal = (title: string, message: string) => {
    setModalContent({ title, message, type: "info" });
  };

  // Helper toggle component to ensure identical layout and styling for premium rows
  const renderToggleRow = (
    label: string, 
    description: string, 
    enabled: boolean, 
    onToggle: () => void,
    disabledHint?: string
  ) => {
    return (
      <div className="flex items-start justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-all gap-4">
        <div className="space-y-1 text-left max-w-[80%]">
          <p className={`text-xs font-bold leading-snug font-heading ${enabled ? "text-slate-900" : "text-slate-500"}`}>
            {label}
          </p>
          <p className="text-[11px] text-slate-500 font-medium leading-normal font-sans">
            {description}
          </p>
          {disabledHint && !enabled && (
            <p className="text-[10px] text-amber-700 bg-amber-50/60 border border-amber-100/60 px-2 py-0.5 rounded-md w-fit mt-1.5 font-semibold font-sans">
              {disabledHint}
            </p>
          )}
        </div>
        <button
          onClick={onToggle}
          type="button"
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer shrink-0 transition-colors duration-200 ease-in-out focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700/50 ${
            enabled ? "bg-[#005C45]" : "bg-slate-200"
          }`}
          aria-label={`Toggle ${label}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6 text-left relative animate-in fade-in duration-300 pb-24 sm:pb-12">
      
      {/* Page Hero */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-8 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute right-0 top-0 h-40 w-40 bg-emerald-50/40 rounded-full blur-2xl -z-10" />
        
        <div className="space-y-2 text-left max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#005C45] border border-emerald-100 tracking-wide uppercase font-sans">
              SUSTAIN CPD Programme
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Programme Settings
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed font-sans">
            Manage programme targets, CPD rules, reporting preferences, low-bandwidth access, and certificate review settings.
          </p>
        </div>
        
        <button
          onClick={handleSaveChanges}
          type="button"
          className="px-6 py-3 bg-[#005C45] hover:bg-[#003B2C] active:scale-[0.99] text-white text-xs font-bold rounded-2xl transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 w-full sm:w-auto text-center self-stretch sm:self-auto flex items-center justify-center gap-2 shrink-0 h-[48px] font-sans"
        >
          Save Changes
        </button>
      </div>

      {/* Main 2-column bento layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols on lg, stacks on mobile) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION 1 — PROGRAMME OVERVIEW */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 text-slate-700 rounded-2xl">
                <Globe className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">Programme overview</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Core details used across dashboards, reports, and learner records.</p>
              </div>
            </div>

            {/* Top Highlight Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/50 flex flex-col gap-0.5 text-left">
              <p className="text-xs font-bold text-[#005C45] font-heading">SUSTAIN CPD Programme</p>
              <p className="text-[11px] text-emerald-800 font-medium font-sans">Nigeria-wide CPD delivery setup</p>
            </div>

            {/* Detail Rows */}
            <div className="space-y-2.5 pt-1 text-left">
              {[
                { label: "Programme name", value: "SUSTAIN CPD Programme" },
                { label: "Coverage", value: "Nigeria" },
                { label: "Target learners", value: `${nationalTarget.toLocaleString()} learners` },
                { label: "Active pathways", value: "3 pathways" },
                { label: "Delivery period", value: "18 months" },
              ].map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-slate-50/40 border border-slate-100 rounded-2xl gap-1.5 transition-all hover:border-slate-200">
                  <span className="text-xs font-bold text-slate-500 font-sans">{row.label}</span>
                  <span className="text-xs font-extrabold text-slate-950 font-sans sm:text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2 — LEARNER TARGETS */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-[#005C45] rounded-2xl">
                <Target className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">Learner targets</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Track enrolment progress against the approved programme target.</p>
              </div>
            </div>

            {/* Enrolment Progress Highlight Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/50 flex flex-col gap-0.5 text-left">
              <p className="text-xs font-bold text-[#005C45] font-heading">{enrolledLearners.toLocaleString()} learners enrolled</p>
              <p className="text-[11px] text-emerald-800 font-medium font-sans">{targetReachedPercent}% of first deployment target reached</p>
            </div>

            {/* Metric Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl text-left transition-all hover:border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 font-sans block">Target</span>
                <span className="text-base font-bold text-slate-950 font-sans mt-0.5 block">{nationalTarget.toLocaleString()} learners</span>
              </div>
              <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl text-left transition-all hover:border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 font-sans block">Enrolled</span>
                <span className="text-base font-bold text-[#005C45] font-sans mt-0.5 block">{enrolledLearners.toLocaleString()} learners</span>
              </div>
              <div className="p-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl text-left transition-all hover:border-slate-200">
                <span className="text-[11px] font-medium text-slate-500 font-sans block">Remaining</span>
                <span className="text-base font-bold text-slate-900 font-sans mt-0.5 block">{(nationalTarget - enrolledLearners).toLocaleString()} learners</span>
              </div>
            </div>

            {/* Progress Bar Area */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500 font-sans">Enrolment progress</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-[#005C45] border border-emerald-100 font-sans">
                  {targetReachedPercent}% reached
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#005C45] to-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${targetReachedPercent}%` }}
                />
              </div>
            </div>

            {/* Adjusted Learner Target Compact Action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
              <div className="text-left space-y-0.5">
                <span className="text-xs font-bold text-slate-800 font-heading block">Adjust learner target</span>
                <span className="text-[10px] text-slate-500 font-medium font-sans block">Used for programme planning and progress reporting.</span>
              </div>
              
              <button 
                onClick={() => showPrototypeModal("Adjust Learner Target", "Programme target editing is prepared for this prototype and can be connected during production setup.")}
                type="button"
                className="px-4 py-2 bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30 text-slate-750 hover:text-[#005C45] text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs active:scale-[0.98] h-10 flex items-center justify-center focus:outline-hidden font-sans"
              >
                Edit Target
              </button>
            </div>
          </div>

          {/* SECTION 3 — CPD AND CERTIFICATE RULES */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">CPD and certificate rules</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Set the requirements learners must complete before certificate review.</p>
              </div>
            </div>

            {/* Certificate Review Highlight area */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100/50 flex flex-col gap-0.5 text-left">
              <p className="text-xs font-bold text-amber-800 font-heading">Certificate review requirement</p>
              <p className="text-[11px] text-amber-700 font-medium font-sans">Requires CPD credits, reviewed assessment, and confirmed attendance.</p>
            </div>

            {/* Required CPD Credits Compact Value Card */}
            <div className="p-4 rounded-2xl bg-slate-50/60 border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all hover:border-slate-200">
              <div className="text-left space-y-0.5">
                <span className="text-xs font-bold text-slate-800 font-heading block">Required CPD credits</span>
                <span className="text-[10px] text-slate-500 font-medium font-sans block">Minimum required before certificate review</span>
                <span className="text-xs font-semibold text-slate-950 mt-1 block font-sans">Current threshold: <span className="font-extrabold text-[#005C45]">{cpdThreshold} credits</span></span>
              </div>
              
              <button 
                onClick={() => showPrototypeModal("CPD Rule Adjustment", "CPD rule editing is prepared for this prototype and can be connected during production setup.")}
                type="button"
                className="px-4 py-2 bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50/20 text-slate-750 hover:text-amber-800 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-3xs active:scale-[0.98] h-10 flex items-center justify-center focus:outline-hidden font-sans"
              >
                Edit Rule
              </button>
            </div>

            {/* Requirement Rows */}
            <div className="space-y-2.5">
              {[
                { 
                  label: "Assessment requirement", 
                  value: "Final assessment submitted and reviewed", 
                  chipText: "Required", 
                  chipStyle: "bg-blue-50 text-blue-700 border-blue-100" 
                },
                { 
                  label: "Attendance requirement", 
                  value: "Required live sessions confirmed", 
                  chipText: "Required", 
                  chipStyle: "bg-blue-50 text-blue-700 border-blue-100" 
                },
                { 
                  label: "Certificate review", 
                  value: "Programme approval required before public verification", 
                  chipText: "Approval required", 
                  chipStyle: "bg-amber-50 text-amber-700 border-amber-100/80" 
                },
                { 
                  label: "Offline evidence", 
                  value: "Facilitator-confirmed offline evidence allowed", 
                  chipText: "Enabled", 
                  chipStyle: "bg-emerald-50 text-[#005C45] border-emerald-100/80" 
                }
              ].map((row, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100 hover:border-slate-150 transition-all flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="space-y-1 text-left max-w-sm md:max-w-[75%]">
                    <p className="text-xs font-bold text-slate-800 font-heading leading-tight">{row.label}</p>
                    <p className="text-[11px] text-slate-500 font-medium leading-normal font-sans">{row.value}</p>
                  </div>
                  <div className="shrink-0 flex md:justify-end self-start">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border font-sans ${row.chipStyle}`}>
                      {row.chipText}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggles */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              {renderToggleRow(
                "Allow facilitator-confirmed offline evidence",
                "Accept locally saved progress and visual portfolio sign-offs when network availability is low.",
                allowOfflineEvidence,
                () => setAllowOfflineEvidence(!allowOfflineEvidence)
              )}

              {renderToggleRow(
                "Require programme approval before certificate issue",
                "Ensure a dedicated program lead audits submissions before credentials enter the public lookup registry.",
                requireApproval,
                () => setRequireApproval(!requireApproval)
              )}

              {renderToggleRow(
                "Allow automatic certificate issue",
                "Bypass manual reviews if learners complete all core credits and assessments successfully.",
                allowAutoIssue,
                () => setAllowAutoIssue(!allowAutoIssue),
                "Automatic issuing is disabled for this prototype. Programme approval remains required."
              )}
            </div>
          </div>

          {/* SECTION 4 — LOW-BANDWIDTH ACCESS */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-50 text-teal-800 rounded-2xl">
                <WifiOff className="h-5 w-5 text-teal-700" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">Low-bandwidth access</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Support learners who use lightweight pages, offline packs, and saved drafts.</p>
              </div>
            </div>

            {/* Low Bandwidth Highlight area */}
            <div className="p-4 rounded-2xl bg-teal-50/75 border border-teal-100/50 flex flex-col gap-0.5 text-left">
              <p className="text-xs font-bold text-teal-800 font-heading">Low-connectivity operations active</p>
              <p className="text-[11px] text-teal-700 font-medium font-sans">Learners can continue progress in limited connectivity environments and submit evidence when access improves.</p>
            </div>

            <div className="space-y-2.5 text-left">
              {renderToggleRow(
                "Lightweight learning mode",
                "Reduce data usage by default, presenting content-focused pages with optional media loading.",
                lightweightMode,
                () => setLightweightMode(!lightweightMode)
              )}

              {renderToggleRow(
                "Offline learning packs",
                "Allow downloading full course text, summaries, and quizzes for completely offline local study.",
                offlinePacks,
                () => setOfflinePacks(!offlinePacks)
              )}

              {renderToggleRow(
                "Saved assessment drafts",
                "Secure draft versions of assignments locally on the device until a stable sync connection is detected.",
                savedDrafts,
                () => setSavedDrafts(!savedDrafts)
              )}

              {renderToggleRow(
                "Facilitator-confirmed offline evidence",
                "Permit facilitators to verify low-bandwidth learner progress using offline spreadsheets or checklists.",
                facilitatorOfflineEvidence,
                () => setFacilitatorOfflineEvidence(!facilitatorOfflineEvidence)
              )}
            </div>
          </div>

        </div>

        {/* Right Column (5 cols on lg, stacks on mobile) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* REPLACED TECHNICAL PANEL — DATA UPDATES */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                <RefreshCw className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">Data updates</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Dashboard reporting utilities</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-semibold font-sans text-left">
              Programme dashboards update as learner activity, facilitator reviews, and certificate decisions are recorded. The programme team can refresh dashboard summaries after major learner imports or certificate review updates.
            </p>

            <button
              onClick={handleRefreshData}
              disabled={isRefreshing}
              type="button"
              className="w-full py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 disabled:bg-slate-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-3xs h-[44px] focus:outline-hidden font-sans"
            >
              <RefreshCw className={`h-4 w-4 text-slate-550 ${isRefreshing ? "animate-spin text-[#005C45]" : ""}`} />
              <span>
                {isRefreshing ? "Refreshing Dashboard..." : "Refresh Dashboard Data"}
              </span>
            </button>

            {refreshSuccess && (
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 animate-in zoom-in-95 duration-150 font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Dashboard data updated across 18 regional hubs</span>
              </div>
            )}
          </div>

          {/* SECTION 5 — REPORTING PREFERENCES */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 text-slate-700 rounded-2xl">
                <BarChart3 className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">Reporting preferences</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Choose the programme indicators shown in dashboards and exports.</p>
              </div>
            </div>

            {/* Reporting Preference Highlight Area */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100/50 flex flex-col gap-0.5 text-left">
              <p className="text-xs font-bold text-blue-800 font-heading">Reporting preference configuration</p>
              <p className="text-[11px] text-blue-750 font-medium font-sans">Choose indicators shown in dashboards and performance reports.</p>
            </div>

            <div className="space-y-2.5 text-left">
              {renderToggleRow(
                "Gender-disaggregated reporting",
                "Generate stats classified by gender for compliance reviews and proposal targets.",
                genderDisaggregated,
                () => setGenderDisaggregated(!genderDisaggregated)
              )}

              {renderToggleRow(
                "State and cohort reporting",
                "Group progress outcomes by physical locations and cohort classes.",
                stateCohortReporting,
                () => setStateCohortReporting(!stateCohortReporting)
              )}

              {renderToggleRow(
                "Pathway performance reports",
                "Display analytics comparing youth employability vs work readiness foundation pathways.",
                pathwayPerformance,
                () => setPathwayPerformance(!pathwayPerformance)
              )}

              {renderToggleRow(
                "Certificate readiness reports",
                "Highlight cohorts with candidates ready for final audit review cycles.",
                certificateReadiness,
                () => setCertificateReadiness(!certificateReadiness)
              )}

              {renderToggleRow(
                "Low-bandwidth usage reporting",
                "Document usage levels of lightweight modules and offline evidence packages.",
                lowBandwidthUsage,
                () => setLowBandwidthUsage(!lowBandwidthUsage)
              )}

              <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => showPrototypeModal("View Reports", "Report viewing is prepared for this prototype and can be connected during production setup.")}
                  type="button"
                  className="flex-1 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#005C45] rounded-xl text-xs font-bold text-[#005C45] transition-all cursor-pointer text-center h-[42px] focus:outline-hidden font-sans"
                >
                  View Reports
                </button>
                <button
                  onClick={() => showPrototypeModal("Export Summary", "Report export is prepared for this prototype and can be connected during production setup.")}
                  type="button"
                  className="flex-1 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center h-[42px] focus:outline-hidden shadow-xs font-sans"
                >
                  Export Summary
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 7 — SUPPORT AND NOTIFICATIONS */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl">
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">Support and notifications</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Control how support needs are surfaced to the programme team.</p>
              </div>
            </div>

            {/* Support Highlight Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100/50 flex flex-col gap-0.5 text-left">
              <p className="text-xs font-bold text-amber-800 font-heading">Support notification rules</p>
              <p className="text-[11px] text-amber-700 font-medium font-sans">Manage how support needs and reminders are surfaced to the programme team.</p>
            </div>

            <div className="space-y-2.5 text-left">
              {/* Display rows */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-slate-50/70 border border-slate-100 rounded-2xl gap-1.5 transition-all hover:border-slate-200">
                <span className="text-xs font-bold text-slate-500 font-sans">Open support tickets</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-850 border border-amber-100/80 font-sans">
                  Visible on dashboard
                </span>
              </div>

              {renderToggleRow(
                "Inactive learner alerts",
                "Flag learners who have not synced progress updates for over 14 days.",
                inactiveLearnerAlerts,
                () => setInactiveLearnerAlerts(!inactiveLearnerAlerts)
              )}

              {renderToggleRow(
                "Assessment review reminders",
                "Remind facilitators of pending assignment reviews every 48 hours.",
                assessmentReminders,
                () => setAssessmentReminders(!assessmentReminders)
              )}

              {renderToggleRow(
                "Certificate review reminders",
                "Notify program admins when learner certificate readiness submissions are pending.",
                certReminders,
                () => setCertReminders(!certReminders)
              )}

              {renderToggleRow(
                "Low-bandwidth support alerts",
                "Generate custom alerts when facilitators file low-connectivity physical checklist waivers.",
                lowBandwidthAlerts,
                () => setLowBandwidthAlerts(!lowBandwidthAlerts)
              )}

              <button
                onClick={() => navigateTo("/programme/support")}
                type="button"
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#005C45] rounded-xl text-xs font-bold text-[#005C45] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-3xs h-[44px] focus:outline-hidden font-sans"
              >
                <span>Open Support Oversight</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* SECTION 6 — ACCESS AND ROLES */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-200/70 shadow-xs space-y-5 transition-all hover:shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 text-slate-700 rounded-2xl">
                <Users className="h-5 w-5 text-slate-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-extrabold text-slate-900 font-heading tracking-tight">Access and roles</h3>
                <p className="text-[11px] text-slate-500 font-medium font-sans">Manage the workspace roles used across the programme.</p>
              </div>
            </div>

            <div className="space-y-3 pt-1 text-left">
              {[
                {
                  role: "Programme Team",
                  desc: "Can monitor delivery, review reports, and manage certificate approval.",
                  chipStyle: "bg-emerald-50 text-[#005C45] border-emerald-100/80"
                },
                {
                  role: "Facilitator",
                  desc: "Can review assessments, confirm attendance, and support learners.",
                  chipStyle: "bg-blue-50 text-blue-700 border-blue-100"
                },
                {
                  role: "Course Creator",
                  desc: "Can create and manage course content for approved pathways.",
                  chipStyle: "bg-teal-50 text-teal-850 border-teal-100"
                },
                {
                  role: "Learner",
                  desc: "Can access assigned courses, assessments, CPD progress, and certificates.",
                  chipStyle: "bg-slate-50 text-slate-700 border-slate-100"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100 flex flex-col md:flex-row md:items-start md:justify-between gap-3 hover:border-slate-150 transition-all">
                  <div className="space-y-1 text-left max-w-sm md:max-w-[75%]">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span className="text-xs font-extrabold text-slate-900 font-heading">{item.role}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-normal pl-3 font-sans">
                      {item.desc}
                    </p>
                  </div>
                  <div className="shrink-0 flex md:justify-end self-start pl-3 md:pl-0">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border font-sans ${item.chipStyle}`}>
                      Workspace Role
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Save Changes Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm mt-8 animate-in fade-in duration-500">
        <div className="text-left">
          <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5 font-heading">
            <span className="h-2 w-2 rounded-full bg-[#005C45] animate-pulse" />
            Active Programme Settings Session
          </p>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5 font-sans">
            Modify any rule, preference, or target above. Changes apply across all country hubs.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto self-stretch sm:self-auto">
          <button
            onClick={() => {
              setNationalTarget(10000);
              setCpdThreshold(35);
              showToast("Settings reverted to original baseline.");
            }}
            type="button"
            className="flex-1 sm:flex-initial px-5 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-2xl transition-all cursor-pointer h-[46px] focus:outline-hidden font-sans"
          >
            Reset Baseline
          </button>
          <button
            onClick={handleSaveChanges}
            type="button"
            className="flex-1 sm:flex-initial px-6 py-3 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-2xl transition-all cursor-pointer h-[46px] shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 text-center flex items-center justify-center font-sans"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Safe Prototype Modal Popup */}
      {modalContent && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-150 shadow-2xl p-6 max-w-sm w-full mx-auto text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center mx-auto">
              <Info className="h-6 w-6" />
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-base font-extrabold text-slate-900 font-heading">{modalContent.title}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                {modalContent.message}
              </p>
            </div>

            <button
              onClick={() => setModalContent(null)}
              type="button"
              className="w-full py-3 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-2xl transition-all cursor-pointer focus:outline-hidden text-center shadow-xs font-sans"
            >
              Understand
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProgrammeSettings;
