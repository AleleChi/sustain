import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { StatusChip } from "../../components/ui/StatusChip";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Copy, 
  ArrowLeft, 
  ExternalLink, 
  FileText, 
  Info, 
  Calendar, 
  Users, 
  HelpCircle, 
  Search, 
  Bell, 
  BookOpen, 
  Sparkles,
  MessageSquare,
  Shield,
  BookMarked,
  ArrowRight
} from "lucide-react";

interface LayoutProps {
  onShowToast: (msg: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function LearnerCertificateDetailPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      showToast(`Navigated to: ${id.replace("-", " ")}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-950 font-sans antialiased">
      {/* Central Toast Notification */}
      {toastMessage && (
        <div 
          id="detail-toast-notification"
          className="fixed bottom-20 lg:bottom-6 right-6 left-6 lg:left-auto lg:w-96 z-50 bg-slate-900 text-white p-4 rounded-xl shadow-xl flex items-start gap-3 border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-semibold">SUSTAIN LMS Prototype</p>
            <p className="text-xs text-slate-300 mt-1">{toastMessage}</p>
          </div>
          <button 
            onClick={() => setToastMessage(null)} 
            className="text-slate-400 hover:text-white text-xs font-bold shrink-0 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Responsive Views */}
      <DesktopCertificateDetail onShowToast={showToast} onScrollToSection={handleScrollToSection} />
      <TabletCertificateDetail onShowToast={showToast} onScrollToSection={handleScrollToSection} />
      <MobileCertificateDetail onShowToast={showToast} onScrollToSection={handleScrollToSection} />
    </div>
  );
}

/* =========================================================================
   DESKTOP LAYOUT (hidden lg:flex)
   ========================================================================= */
function DesktopCertificateDetail({ onShowToast, onScrollToSection }: LayoutProps) {
  const { navigateTo } = useRoute();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} copied in this frontend prototype.`);
  };

  return (
    <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950">
      {/* Sidebar */}
      <LearnerSidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search certificate, CPD, review status..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-slate-700 font-medium font-sans"
            />
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-emerald-700 rounded-full" />
            </button>
            
            <button 
              onClick={() => navigateTo("/learner/support")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            
            <div className="h-6 w-px bg-slate-200" />
            
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="flex items-center gap-3 text-left focus:outline-none group hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800">Aisha Mohammed</p>
                <p className="text-[10px] text-slate-400 font-mono font-semibold">SUST-LRN-0442</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-800 flex items-center justify-center font-bold text-xs text-white shadow-xs">
                AM
              </div>
            </button>
          </div>
        </header>

        {/* Workspace Container */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 max-w-[1500px] w-full mx-auto">
          {/* Breadcrumb navigation */}
          <nav className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <button onClick={() => navigateTo("/learner/certificates")} className="hover:text-slate-600 transition-colors cursor-pointer">
              Certificates & CPD
            </button>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-800 font-semibold">Work Readiness Certificate</span>
          </nav>

          {/* Two-Column Grid Layout */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
            {/* Left Column (Primary Details) */}
            <div className="space-y-6">
              
              {/* SECTION 1 — CERTIFICATE DETAIL HERO */}
              <Card variant="flat" className="p-0 border-slate-200 overflow-hidden bg-white shadow-xs rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-8 p-6 lg:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusChip status="in-progress">Ready for certificate review</StatusChip>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-150">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          Not issued
                        </span>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-none pt-1">
                        Work Readiness Certificate
                      </h2>
                      <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-medium">
                        Review certificate readiness, CPD progress, pending requirements, and next steps before issue.
                      </p>
                    </div>

                    {/* Context Row */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Learner</span>
                        <p className="font-bold text-slate-800 mt-0.5">Aisha Mohammed</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">ID Number</span>
                        <p className="font-mono font-bold text-slate-700 mt-0.5">SUST-LRN-0442</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Programme</span>
                        <p className="font-bold text-slate-800 mt-0.5">SUSTAIN CPD Programme</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Cohort</span>
                        <p className="font-bold text-slate-800 mt-0.5">Kano Youth Employability Cohort 02</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="font-bold text-xs"
                        onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                      >
                        Continue Assessment →
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="font-bold text-xs"
                        onClick={() => navigateTo("/learner/certificates")}
                      >
                        Back to Certificates
                      </Button>
                    </div>
                  </div>

                  {/* Right Deep Green Card Panel */}
                  <div className="md:col-span-4 bg-emerald-900 text-white p-6 flex flex-col justify-between relative overflow-hidden min-h-[280px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-95" />
                    <div className="absolute -right-12 -bottom-12 text-emerald-850/30 transform rotate-12 pointer-events-none">
                      <Award className="h-44 w-44" />
                    </div>

                    <div className="relative z-10 space-y-1">
                      <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase block">
                        Certificate Readiness
                      </span>
                      <h3 className="text-xl font-bold leading-tight pt-1">
                        Ready for Review
                      </h3>
                      <p className="text-xs text-emerald-100 font-medium">
                        Assessment and CPD checks still need to be completed before issue.
                      </p>
                    </div>

                    <div className="relative z-10 bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-xl mt-6">
                      <p className="text-[10px] text-emerald-300 font-mono font-bold">CURRENT METRICS</p>
                      <p className="text-xs font-bold text-white mt-1 leading-snug">
                        22 of 35 CPD credits completed
                      </p>
                      <p className="text-[11px] text-emerald-200 mt-0.5">
                        • 4 credits pending review
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* SECTION 2 — SUMMARY CARDS */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4 bg-white border-slate-200 shadow-xs flex flex-col justify-between min-h-[110px] relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Certificate Status</p>
                    <LearnerContextHint 
                      title="What this means" 
                      text="Kano Youth Skills Hub staff are validating the course and CPD elements before issuing." 
                    />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-base font-bold text-slate-800">Ready for Review</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Not issued yet</p>
                </Card>

                <Card className="p-4 bg-white border-slate-200 shadow-xs flex flex-col justify-between min-h-[110px] relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CPD Credits</p>
                    <LearnerContextHint 
                      title="How this works" 
                      text="You have completed 22 confirmed credits. 4 credits are pending facilitator review." 
                    />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-base font-bold text-slate-800">22 of 35</span>
                  </div>
                  <p className="text-[10px] text-amber-700 font-bold mt-1">4 pending review</p>
                </Card>

                <Card className="p-4 bg-white border-slate-200 shadow-xs flex flex-col justify-between min-h-[110px]">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Review Requirement</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-base font-bold text-slate-800">Assessment Review</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Required before issue</p>
                </Card>

                <Card className="p-4 bg-white border-slate-200 shadow-xs flex flex-col justify-between min-h-[110px] relative">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verification</p>
                    <LearnerContextHint 
                      title="Why this matters" 
                      text="Public validation and secure QR scanning are only active for officially issued credentials." 
                    />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-base font-bold text-slate-400">Inactive</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Available after issue</p>
                </Card>
              </div>

              {/* SECTION 3 — CERTIFICATE RECORD */}
              <Card className="p-6 bg-white border-slate-200 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Certificate Record</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Learner and programme details connected to this certificate.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCopy("SUST-LRN-0442", "Learner ID")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy Learner ID
                    </button>
                    <button 
                      onClick={() => handleCopy("Work Readiness Certificate", "Certificate Title")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy Certificate Title
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Certificate", value: "Work Readiness Certificate" },
                    { label: "Learner", value: "Aisha Mohammed" },
                    { label: "Learner ID", value: "SUST-LRN-0442" },
                    { label: "Programme", value: "SUSTAIN CPD Programme" },
                    { label: "Pathway", value: "Youth Employability Pathway" },
                    { label: "Organisation", value: "Kano Youth Skills Hub" },
                    { label: "Cohort", value: "Kano Youth Employability Cohort 02" },
                    { label: "Facilitator", value: "Halima Sani" },
                    { label: "Linked course", value: "Work Readiness Foundation" },
                    { label: "Linked assessment", value: "Work Readiness Assignment" },
                    { label: "Issue state", value: "Not issued" },
                    { label: "Public verification", value: "Inactive until issued" },
                  ].map((row, idx) => (
                    <div key={idx} className="flex flex-col p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{row.label}</span>
                      <span className="text-xs font-bold text-slate-800 mt-1">{row.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* SECTION 4 — READINESS CHECKLIST */}
              <Card id="readiness-checklist" className="p-6 bg-white border-slate-200 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Certificate Readiness Checklist</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Track and verify specific requirement targets.</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    {
                      label: "Learner profile active",
                      status: "Complete",
                      type: "completed",
                      desc: "Kano Cohort enrollment validated.",
                    },
                    {
                      label: "Required courses started",
                      status: "Complete",
                      type: "completed",
                      desc: "Work Readiness Foundation course active.",
                    },
                    {
                      label: "Work Readiness Foundation progress",
                      status: "In Progress",
                      type: "in-progress",
                      desc: "Course modules are in progress.",
                    },
                    {
                      label: "Work Readiness Assignment",
                      status: "Pending Submission",
                      type: "pending",
                      desc: "Assignment draft saved; awaiting submit.",
                      action: { label: "Continue Assessment", path: "/learner/assessments/work-readiness-assignment" }
                    },
                    {
                      label: "CPD credit review",
                      status: "Pending Review",
                      type: "pending",
                      desc: "4 pending credits from reflection task.",
                      action: { label: "Open Support", path: "/learner/support" }
                    },
                    {
                      label: "Certificate issue",
                      status: "Locked",
                      type: "locked",
                      desc: "Awaiting administrative audit.",
                      action: { label: "View Next Steps", onClick: () => onScrollToSection("next-steps-card") }
                    },
                    {
                      label: "Public verification",
                      status: "Unavailable",
                      type: "locked",
                      desc: "QR code and link will be generated automatically upon issuance.",
                    }
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex gap-3">
                        <div className="mt-0.5 shrink-0">
                          {row.type === "completed" ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : row.type === "locked" ? (
                            <Lock className="h-4 w-4 text-slate-450" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{row.label}</p>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{row.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusChip status={row.type as any}>{row.status}</StatusChip>
                        {row.action && (
                          <button
                            onClick={() => {
                              if (row.action.path) {
                                navigateTo(row.action.path as any);
                              } else if (row.action.onClick) {
                                row.action.onClick();
                              }
                            }}
                            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer"
                          >
                            {row.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* SECTION 5 — CPD CREDIT BREAKDOWN */}
              <Card className="p-6 bg-white border-slate-200 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">CPD Credit Breakdown</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Breakdown of confirmed & pending credits by topic framework requirements.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Digital Readiness Basics", status: "Confirmed", credits: "8 credits", details: "Course completed", date: "12 Oct 2026", type: "confirmed" },
                    { title: "Workplace Communication", status: "Confirmed", credits: "6 credits", details: "Reflection task reviewed", date: "18 Oct 2026", type: "confirmed" },
                    { title: "Work Readiness Foundation", status: "Confirmed", credits: "8 credits", details: "Course progress confirmed", date: "Today", type: "confirmed" },
                    { title: "Work Readiness Assignment", status: "Pending review", credits: "4 credits", details: "Assessment review required", date: "Pending", type: "pending" },
                    { title: "Remaining pathway credits", status: "Not yet confirmed", credits: "9 credits", details: "Future assigned learning", date: "Not available", type: "remaining" },
                  ].map((row, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                      <div>
                        <p className="text-xs font-bold text-slate-800">{row.title}</p>
                        <p className="text-[11px] text-slate-450 mt-0.5 font-medium">{row.details} • {row.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-700 font-mono">{row.credits}</span>
                        <span className={`px-2.5 py-1 text-[10px] font-bold border rounded-md ${
                          row.type === "confirmed" ? "bg-emerald-50 text-emerald-850 border-emerald-150" :
                          row.type === "pending" ? "bg-amber-50 text-amber-850 border-amber-150" :
                          "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* SECTION 6 — CERTIFICATE PREVIEW STATE */}
              <Card className="p-6 bg-white border-slate-200 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Certificate Preview</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Certificate preview is locked until the certificate is issued.</p>
                </div>

                <div className="border border-dashed border-slate-250 bg-slate-50 rounded-2xl p-8 relative flex flex-col items-center justify-center min-h-[300px]">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  <div className="w-full max-w-lg border border-slate-200 bg-white p-6 rounded-lg shadow-xs opacity-35 select-none text-center pointer-events-none blur-[1.5px] space-y-4">
                    <div className="border-2 border-double border-slate-200 p-6">
                      <p className="font-serif text-lg tracking-widest text-slate-400 uppercase">Certificate of Completion</p>
                      <div className="h-px bg-slate-200 my-3 w-1/3 mx-auto"></div>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">This is to certify that</p>
                      <p className="text-lg font-serif font-bold text-slate-400 my-2">Aisha Mohammed</p>
                      <p className="text-[11px] text-slate-400 leading-normal max-w-xs mx-auto">
                        has completed the pathway <strong className="text-slate-500 font-semibold">Youth Employability Pathway</strong> under Kano Youth Skills Hub.
                      </p>
                    </div>
                  </div>

                  {/* Locked Cover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center rounded-2xl">
                    <div className="h-12 w-12 rounded-full bg-white border border-slate-250 flex items-center justify-center shadow-md mb-3 text-slate-700">
                      <Lock className="h-5 w-5 text-slate-600" />
                    </div>
                    <p className="text-xs font-extrabold text-slate-850">Work Readiness Certificate — Locked</p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-sm font-medium">
                      Certificate document and public verification will become available only after certificate review completion.
                    </p>
                    <div className="flex gap-2.5 mt-4">
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="text-[11px] font-bold py-1.5 px-3"
                        onClick={() => onScrollToSection("readiness-checklist")}
                      >
                        View Requirements
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[11px] font-bold py-1.5 px-3"
                        onClick={() => navigateTo("/learner/support")}
                      >
                        Open Support
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-3.5 mt-4 flex gap-3 text-xs text-amber-900">
                  <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="font-medium leading-relaxed">
                    <strong>Important Note:</strong> This frontend prototype does not issue real certificates, generate QR codes, or create downloadable PDFs.
                  </p>
                </div>
              </Card>

              {/* SECTION 7 — REVIEW TIMELINE */}
              <Card className="p-6 bg-white border-slate-200 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Review Timeline</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Timeline of learner achievements and system checkpoints.</p>
                </div>

                <div className="relative pl-6 border-l-2 border-slate-150 space-y-6 ml-3 py-1">
                  {[
                    { title: "Certificate record marked ready for review", date: "Today", desc: "Kano Cohort database compiled and marked for administrative check." },
                    { title: "Work Readiness Foundation progress updated", date: "Today", desc: "System updated course completion logs automatically." },
                    { title: "Work Readiness Assignment draft saved", date: "Yesterday", desc: "Learner local workplace reflection workspace auto-saved." },
                    { title: "Workplace Communication review completed", date: "18 Oct 2026", desc: "Facilitator Halima Sani approved reflection task." },
                    { title: "Digital Readiness Basics completed", date: "12 Oct 2026", desc: "Course final assessment passed successfully." },
                  ].map((row, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Node dot */}
                      <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-400 ring-2 ring-slate-150" />
                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="text-xs font-bold text-slate-800">{row.title}</p>
                          <span className="text-[10px] text-slate-400 font-bold font-mono shrink-0">{row.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">{row.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* SECTION 8 — SAFE CERTIFICATE GUIDANCE */}
              <Card className="p-6 bg-white border-slate-200 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Safe Certificate Guidance</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Recommended practices for security and verification safety.</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    "Do not share login details or verification codes.",
                    "Public verification is inactive until a certificate is issued.",
                    "Certificate PDF download is unavailable until issue.",
                    "Ask support if your CPD or review status looks incorrect.",
                    "Keep assessment work and learner records private.",
                  ].map((text, idx) => (
                    <div key={idx} className="flex gap-3 text-xs font-medium text-slate-700">
                      <span className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[10px] text-slate-500 font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <p className="leading-normal pt-0.5">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs font-bold"
                    onClick={() => navigateTo("/learner/support")}
                  >
                    Open Support
                  </Button>
                </div>
              </Card>

            </div>

            {/* Right Column (Sidebar Supportive Panels) */}
            <div className="space-y-6">

              {/* Record Status Card */}
              <Card className="p-5 bg-white border-slate-200 shadow-xs">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Record Status
                </h4>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Certificate</span>
                    <span className="font-bold text-slate-850 text-right">Work Readiness</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="font-bold text-emerald-800">Ready for review</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Issue state</span>
                    <span className="font-semibold text-slate-500">Not issued</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500 font-medium">Public verification</span>
                    <span className="font-semibold text-slate-550">Inactive</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-slate-500 font-medium">QR status</span>
                    <span className="font-semibold text-slate-400">Unavailable</span>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  className="w-full text-xs font-bold mt-5"
                  onClick={() => navigateTo("/learner/certificates")}
                >
                  Back to Certificates
                </Button>
              </Card>

              {/* Next Steps Card */}
              <Card id="next-steps-card" className="p-5 bg-white border-slate-200 shadow-xs">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Next Steps
                </h4>
                <div className="relative pl-5 border-l-2 border-emerald-900/20 space-y-4 text-xs font-medium text-slate-700 ml-1">
                  {[
                    "Continue the Work Readiness Assignment.",
                    "Submit when ready.",
                    "Wait for facilitator review.",
                    "Check CPD confirmation.",
                    "Certificate issue can proceed after review."
                  ].map((text, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[27px] top-1 h-2 w-2 rounded-full bg-emerald-900" />
                      <p>{text}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mt-5 pt-4 border-t border-slate-100">
                  <Button 
                    variant="primary" 
                    className="w-full text-xs font-bold py-2"
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                  >
                    Continue Assessment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-xs font-bold py-2"
                    onClick={() => navigateTo("/learner/support")}
                  >
                    Open Support
                  </Button>
                </div>
              </Card>

              {/* Related Learning Context */}
              <Card className="p-5 bg-white border-slate-200 shadow-xs">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Related Learning Context
                </h4>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Course</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Foundation</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Current Lesson</span>
                    <p className="font-bold text-slate-800 mt-0.5">Preparing for Interviews</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Assessment</span>
                    <p className="font-bold text-slate-800 mt-0.5">Work Readiness Assignment</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Facilitator</span>
                    <p className="font-bold text-slate-800 mt-0.5">Halima Sani</p>
                  </div>
                </div>

                <div className="space-y-2 mt-5 pt-4 border-t border-slate-100">
                  <Button 
                    variant="primary" 
                    className="w-full text-xs font-bold py-2"
                    onClick={() => navigateTo("/learner/lessons/preparing-for-interviews")}
                  >
                    Continue Lesson
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-xs font-bold py-2"
                    onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
                  >
                    Open Assessment
                  </Button>
                </div>
              </Card>

              {/* Support Center Card (Emerald Style) */}
              <Card variant="flat" className="p-5 bg-emerald-900 border-emerald-800 text-white rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-95" />
                <div className="relative z-10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Support Center
                  </h4>
                  <p className="text-xs font-medium text-emerald-50 leading-relaxed">
                    Need assistance with your certificate track or CPD credits? Ask Halima Sani or file a support ticket.
                  </p>
                  <Button 
                    variant="custom"
                    className="w-full py-2 text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 active:scale-[0.98] transition-all rounded-lg cursor-pointer text-center flex justify-center border-none"
                    onClick={() => navigateTo("/learner/support")}
                  >
                    Open Support
                  </Button>
                </div>
              </Card>

              {/* Recent Certificate Activity */}
              <Card className="p-5 bg-white border-slate-200 shadow-xs">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Recent Certificate Activity
                </h4>
                <div className="space-y-3.5 text-xs font-medium text-slate-700">
                  {[
                    { label: "Certificate record opened", date: "Today" },
                    { label: "CPD record reviewed", date: "Today" },
                    { label: "Assessment draft saved", date: "Yesterday" },
                    { label: "Support request viewed", date: "Yesterday" },
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <p>{row.label}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{row.date}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-5 bg-white border-slate-200 shadow-xs">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  {[
                    { label: "Back to Certificates", path: "/learner/certificates", icon: Award },
                    { label: "Continue Assessment", path: "/learner/assessments/work-readiness-assignment", icon: FileText },
                    { label: "Continue Lesson", path: "/learner/lessons/preparing-for-interviews", icon: BookMarked },
                    { label: "Open Resources", path: "/learner/resources", icon: BookOpen },
                    { label: "Open Support", path: "/learner/support", icon: HelpCircle },
                  ].map((row, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigateTo(row.path as any)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 bg-white text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-900 transition-colors">
                          <row.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-900 transition-colors">
                          {row.label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-900 transition-colors" />
                    </button>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TABLET LAYOUT (hidden md:block lg:hidden)
   ========================================================================= */
function TabletCertificateDetail({ onShowToast, onScrollToSection }: LayoutProps) {
  const { navigateTo } = useRoute();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} copied in this frontend prototype.`);
  };

  return (
    <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28 font-sans">
      {/* Compact Learner Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <h1 className="text-lg font-bold text-sustain-900 font-sans tracking-tight">SUSTAIN LMS</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo("/learner/notifications")} className="p-2 text-slate-400 hover:text-slate-600 relative cursor-pointer">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-emerald-700 rounded-full" />
          </button>
          <button onClick={() => navigateTo("/learner/support")} className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
            <HelpCircle className="h-5 w-5" />
          </button>
          <button onClick={() => navigateTo("/learner/profile")} className="h-8 w-8 rounded-full bg-emerald-900 text-white font-bold text-xs flex items-center justify-center cursor-pointer">
            AM
          </button>
        </div>
      </header>

      {/* Main content body */}
      <main className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <button onClick={() => navigateTo("/learner/certificates")} className="hover:text-slate-600 cursor-pointer">
            Certificates
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-700">Detail</span>
        </nav>

        {/* Certificate Hero Block stacked */}
        <Card variant="flat" className="p-0 border-slate-200 bg-white overflow-hidden shadow-xs rounded-2xl">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip status="in-progress">Ready for certificate review</StatusChip>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-150">
                  Not issued
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Work Readiness Certificate
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Review certificate readiness, CPD progress, pending requirements, and next steps before issue.
              </p>
            </div>

            {/* Context Details */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Learner</span>
                <p className="font-bold text-slate-800 mt-0.5">Aisha Mohammed</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">ID Number</span>
                <p className="font-mono font-bold text-slate-700 mt-0.5">SUST-LRN-0442</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="primary" 
                size="sm"
                className="font-bold text-xs flex-1"
                onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
              >
                Continue Assessment
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="font-bold text-xs"
                onClick={() => navigateTo("/learner/certificates")}
              >
                Back to Certificates
              </Button>
            </div>
          </div>

          {/* Deep Green Panel stacked */}
          <div className="bg-emerald-900 text-white p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-95" />
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold tracking-widest text-emerald-300 uppercase">
                  Certificate Readiness
                </span>
                <h3 className="text-base font-bold">Ready for Review</h3>
              </div>
              <div className="bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl text-xs">
                22 / 35 Credits • 4 pending
              </div>
            </div>
          </div>
        </Card>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-3.5 bg-white border-slate-200 flex flex-col justify-between min-h-[95px]">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Status</span>
            <p className="text-sm font-bold text-slate-800 mt-1">Ready for Review</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Not issued yet</p>
          </Card>
          <Card className="p-3.5 bg-white border-slate-200 flex flex-col justify-between min-h-[95px]">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">CPD Credits</span>
            <p className="text-sm font-bold text-slate-800 mt-1">22 of 35</p>
            <p className="text-[10px] text-amber-700 font-bold mt-0.5">4 pending review</p>
          </Card>
          <Card className="p-3.5 bg-white border-slate-200 flex flex-col justify-between min-h-[95px]">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Requirement</span>
            <p className="text-sm font-bold text-slate-800 mt-1">Assessment Review</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Required before issue</p>
          </Card>
          <Card className="p-3.5 bg-white border-slate-200 flex flex-col justify-between min-h-[95px]">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Verification</span>
            <p className="text-sm font-bold text-slate-400 mt-1">Inactive</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Available after issue</p>
          </Card>
        </div>

        {/* Supporting cards stacked cleanly */}
        <Card className="p-5 bg-white border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Certificate Record</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Certificate", value: "Work Readiness Certificate" },
              { label: "Learner", value: "Aisha Mohammed" },
              { label: "Learner ID", value: "SUST-LRN-0442" },
              { label: "Programme", value: "SUSTAIN CPD Programme" },
            ].map((row, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">{row.label}</span>
                <p className="text-xs font-bold text-slate-800 mt-1">{row.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 mt-4">
            <button 
              onClick={() => handleCopy("SUST-LRN-0442", "Learner ID")}
              className="flex-1 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
            >
              Copy Learner ID
            </button>
            <button 
              onClick={() => handleCopy("Work Readiness Certificate", "Certificate Title")}
              className="flex-1 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
            >
              Copy Title
            </button>
          </div>
        </Card>

        {/* Readiness Checklist */}
        <Card id="tablet-checklist" className="p-5 bg-white border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Certificate Readiness Checklist</h3>
          <div className="space-y-3">
            {[
              { label: "Learner profile active", status: "Complete", type: "completed" },
              { label: "Required courses started", status: "Complete", type: "completed" },
              { label: "Work Readiness Foundation progress", status: "In Progress", type: "in-progress" },
              { label: "Work Readiness Assignment", status: "Pending Submission", type: "pending" },
              { label: "CPD credit review", status: "Pending Review", type: "pending" },
              { label: "Certificate issue", status: "Locked", type: "locked" },
            ].map((row, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex gap-2">
                  {row.type === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : row.type === "locked" ? (
                    <Lock className="h-4 w-4 text-slate-450 shrink-0" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                  )}
                  <span className="text-xs font-bold text-slate-850">{row.label}</span>
                </div>
                <StatusChip status={row.type as any}>{row.status}</StatusChip>
              </div>
            ))}
          </div>
        </Card>

        {/* CPD breakdown */}
        <Card className="p-5 bg-white border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">CPD Credit Breakdown</h3>
          <div className="space-y-3">
            {[
              { title: "Digital Readiness Basics", credits: "8 credits", type: "confirmed" },
              { title: "Workplace Communication", credits: "6 credits", type: "confirmed" },
              { title: "Work Readiness Foundation", credits: "8 credits", type: "confirmed" },
              { title: "Work Readiness Assignment", credits: "4 credits", type: "pending" },
            ].map((row, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-xs font-bold text-slate-800">{row.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 font-mono">{row.credits}</span>
                  <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                    row.type === "confirmed" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
                  }`}>
                    {row.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Certificate Preview locked */}
        <Card className="p-5 bg-white border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Certificate Preview</h3>
          <div className="border border-dashed border-slate-250 bg-slate-50 rounded-xl p-6 text-center flex flex-col items-center justify-center min-h-[160px]">
            <Lock className="h-5 w-5 text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-800">Preview Locked until Issue</p>
            <p className="text-[11px] text-slate-500 max-w-sm mt-1">
              Checklist requirements must be complete to enable certificate document access.
            </p>
            <div className="flex gap-2 mt-4 w-full">
              <Button variant="primary" className="flex-1 text-xs py-1.5" onClick={() => navigateTo("/learner/support")}>
                Ask Support
              </Button>
              <Button variant="outline" className="flex-1 text-xs py-1.5" onClick={() => onScrollToSection("tablet-checklist")}>
                Requirements
              </Button>
            </div>
          </div>
        </Card>

        {/* Emerald Support Card */}
        <Card variant="flat" className="p-5 bg-emerald-900 border-emerald-800 text-white rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-95" />
          <div className="relative z-10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Support Center</h4>
            <p className="text-xs font-medium text-emerald-50 leading-relaxed">
              Need assistance with your certificate track or CPD credits? Ask Halima Sani or file a support ticket.
            </p>
            <Button 
              variant="custom"
              className="w-full py-2 text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 transition-all rounded-lg cursor-pointer text-center flex justify-center border-none"
              onClick={() => navigateTo("/learner/support")}
            >
              Open Support
            </Button>
          </div>
        </Card>
      </main>

      {/* Bottom Mobile/Tablet Nav */}
      <LearnerMobileNav />
    </div>
  );
}

/* =========================================================================
   MOBILE LAYOUT (md:hidden)
   ========================================================================= */
function MobileCertificateDetail({ onShowToast, onScrollToSection }: LayoutProps) {
  const { navigateTo } = useRoute();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} copied in this frontend prototype.`);
  };

  return (
    <div className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24 font-sans">
      {/* Compact Learner Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <h1 className="text-base font-bold text-sustain-900 font-sans tracking-tight">SUSTAIN LMS</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => navigateTo("/learner/notifications")} className="p-2 text-slate-400 hover:text-slate-600 relative cursor-pointer">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1 right-1 h-1 w-1 bg-emerald-700 rounded-full" />
          </button>
          <button onClick={() => navigateTo("/learner/support")} className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
          <button onClick={() => navigateTo("/learner/profile")} className="h-7 w-7 rounded-full bg-emerald-900 text-white font-bold text-[10px] flex items-center justify-center cursor-pointer">
            AM
          </button>
        </div>
      </header>

      {/* Main Workspace content */}
      <main className="px-4 py-4 space-y-5">
        
        {/* Certificate Hero Block */}
        <Card variant="flat" className="p-0 border-slate-200 bg-white overflow-hidden shadow-xs rounded-2xl">
          <div className="p-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <StatusChip status="in-progress">Ready for review</StatusChip>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-150">
                  Not issued
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                Work Readiness Certificate
              </h2>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Review readiness, CPD progress, and requirements before issue.
              </p>
            </div>

            <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
              <Button 
                variant="primary" 
                className="w-full text-xs font-bold py-2"
                onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
              >
                Continue Assessment
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-xs font-bold py-2"
                onClick={() => navigateTo("/learner/certificates")}
              >
                Back to Certificates
              </Button>
            </div>
          </div>

          <div className="bg-emerald-900 text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-95" />
            <div className="relative z-10 flex justify-between items-center text-xs font-bold">
              <span>Readiness Check</span>
              <span className="bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                22 / 35 Credits
              </span>
            </div>
          </div>
        </Card>

        {/* 4 Cards (Stacked / Clean grid) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <span className="text-[9px] text-slate-450 uppercase font-bold">Status</span>
            <p className="text-xs font-bold text-slate-800 mt-0.5">Ready for Review</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <span className="text-[9px] text-slate-450 uppercase font-bold">CPD Credits</span>
            <p className="text-xs font-bold text-slate-850 mt-0.5">22 of 35</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <span className="text-[9px] text-slate-450 uppercase font-bold">Requirement</span>
            <p className="text-xs font-bold text-slate-850 mt-0.5">Assessment Review</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <span className="text-[9px] text-slate-450 uppercase font-bold">Verification</span>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Inactive</p>
          </div>
        </div>

        {/* Certificate Record stacked */}
        <Card className="p-4 bg-white border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">
            Certificate Record
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { label: "Learner", value: "Aisha Mohammed" },
              { label: "Learner ID", value: "SUST-LRN-0442" },
              { label: "Cohort", value: "Kano Cohort 02" },
              { label: "Facilitator", value: "Halima Sani" },
            ].map((row, idx) => (
              <div key={idx} className="flex justify-between pb-1">
                <span className="text-slate-500">{row.label}</span>
                <span className="font-bold text-slate-850">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <button 
              onClick={() => handleCopy("SUST-LRN-0442", "Learner ID")}
              className="flex-1 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-lg cursor-pointer text-center"
            >
              Copy ID
            </button>
            <button 
              onClick={() => handleCopy("Work Readiness Certificate", "Certificate Title")}
              className="flex-1 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-lg cursor-pointer text-center"
            >
              Copy Title
            </button>
          </div>
        </Card>

        {/* Checklist */}
        <Card className="p-4 bg-white border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">
            Readiness Checklist
          </h3>
          <div className="space-y-2 text-xs">
            {[
              { label: "Learner profile active", status: "Complete", type: "completed" },
              { label: "Required courses started", status: "Complete", type: "completed" },
              { label: "Foundation progress", status: "In Progress", type: "in-progress" },
              { label: "Work Readiness Assignment", status: "Pending", type: "pending" },
              { label: "CPD credit review", status: "Pending", type: "pending" },
            ].map((row, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="font-bold text-slate-800">{row.label}</span>
                <span className={`text-[10px] font-bold ${row.type === 'completed' ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Certificate Preview Locked */}
        <Card className="p-4 bg-white border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">
            Certificate Preview
          </h3>
          <div className="border border-dashed border-slate-200 bg-slate-50 rounded-xl p-4 text-center">
            <Lock className="h-4.5 w-4.5 text-slate-450 mx-auto mb-1.5" />
            <p className="text-xs font-bold text-slate-800">Preview Locked</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Awaiting certificate issue verification</p>
          </div>
        </Card>

        {/* Emerald Support Center Card */}
        <Card variant="flat" className="p-4 bg-emerald-900 border-emerald-800 text-white rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 opacity-95" />
          <div className="relative z-10 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Support Center</h4>
            <p className="text-xs font-medium text-emerald-50 leading-relaxed">
              Need assistance with your certificate track or CPD credits? Ask Halima Sani or file a support ticket.
            </p>
            <Button 
              variant="custom"
              className="w-full py-2 text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 transition-all rounded-lg cursor-pointer text-center flex justify-center border-none"
              onClick={() => navigateTo("/learner/support")}
            >
              Open Support
            </Button>
          </div>
        </Card>

      </main>

      {/* Bottom Navigation */}
      <LearnerMobileNav />
    </div>
  );
}
