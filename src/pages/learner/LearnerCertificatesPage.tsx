import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { 
  Award, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight, 
  Info,
  MessageSquare,
  FileText
} from "lucide-react";

/* ==========================================
   SHARED MOCK DATA & CONFIGURATIONS
   ========================================== */
const LEARNER_INFO = {
  name: "Aisha Mohammed",
  id: "SUST-LRN-0442",
  programme: "SUSTAIN CPD Programme",
  pathway: "Youth Employability Pathway",
  organisation: "Kano Youth Skills Hub",
  cohort: "Kano Youth Employability Cohort 02",
  facilitator: "Halima Sani",
  currentCourse: "Work Readiness Foundation",
  currentLesson: "Preparing for Interviews",
  currentAssessment: "Work Readiness Assignment",
  assessmentStatus: "Draft started",
  certificate: "Work Readiness Certificate",
  certificateStatus: "Ready for certificate review",
  issueState: "Not issued",
  cpd: "22 of 35 credits",
  pendingCpd: "4 credits pending review"
};

const CPD_BREAKDOWN = [
  { id: 1, title: "Digital Readiness Basics", status: "Confirmed", credits: 8, evidence: "Course completed" },
  { id: 2, title: "Workplace Communication", status: "Confirmed", credits: 6, evidence: "Reflection task reviewed" },
  { id: 3, title: "Work Readiness Foundation", status: "Confirmed", credits: 8, evidence: "Course progress confirmed" },
  { id: 4, title: "Work Readiness Assignment", status: "Pending review", credits: 4, evidence: "Assessment review required" },
  { id: 5, title: "Remaining pathway credits", status: "Not yet confirmed", credits: 9, evidence: "Future assigned learning" },
];

const CERTIFICATE_RECORDS = [
  {
    id: 1,
    title: "Work Readiness Certificate",
    status: "Ready for certificate review",
    issueState: "Not issued",
    cpd: "22 of 35 credits",
    pending: "4 credits pending review",
    desc: "Required lessons and assessment score verified. Pending final administrative review signoff.",
    action: "View Certificate Track",
    route: "/learner/certificates/work-readiness-certificate"
  },
  {
    id: 2,
    title: "SUSTAIN CPD Record",
    status: "In progress",
    issueState: "Programme record only",
    cpd: "22 confirmed credits",
    pending: "4 credits pending review",
    desc: "Consolidated CPD points accumulated from courses, reflection logs, and verified reviews.",
    action: "View CPD Details",
    route: "/learner/certificates/work-readiness-certificate"
  },
  {
    id: 3,
    title: "Youth Employability Pathway Record",
    status: "In progress",
    issueState: "Pathway not complete",
    cpd: "35 target credits",
    pending: "Assessment review required",
    desc: "Consolidated tracking of Youth Employability pathway steps, facilitator signoffs, and milestones.",
    action: "View My Journey",
    route: "/learner/journey"
  }
];

const READINESS_CHECKLIST = [
  { label: "Learner profile active", status: "Complete" },
  { label: "Required courses started", status: "Complete" },
  { label: "Work Readiness Foundation progress", status: "In progress" },
  { label: "Work Readiness Assignment", status: "Pending submission/review" },
  { label: "CPD credit review", status: "Pending review" },
  { label: "Certificate issue", status: "Locked until review completion" },
  { label: "Public verification", status: "Unavailable until issued" },
];

const RECENT_ACTIVITY = [
  { title: "Certificate overview opened", context: "", time: "Today" },
  { title: "Certificate record viewed", context: "Work Readiness Certificate", time: "Today" },
  { title: "CPD record reviewed", context: "", time: "Today" },
  { title: "Assessment draft saved", context: "Work Readiness Assignment", time: "Yesterday" },
  { title: "Support response received", context: "Certificate readiness request", time: "Yesterday" },
];

const QUICK_ACTIONS = [
  { label: "View Certificate Track", helper: "Explore criteria & status", route: "/learner/certificates/work-readiness-certificate" },
  { label: "Continue Assessment", helper: "Complete pending items", route: "/learner/assessments/work-readiness-assignment" },
  { label: "View My Journey", helper: "Review your active roadmap", route: "/learner/journey" },
  { label: "Open Resources", helper: "Browse manuals & tools", route: "/learner/resources" },
  { label: "Open Support", helper: "Ask pathway questions", route: "/learner/support" },
  { label: "Open Notifications", helper: "Check recent inbox items", route: "/learner/notifications" },
];

/* ==========================================
   PARENT COMPONENT
   ========================================== */
export default function LearnerCertificatesPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const [searchQuery, setSearchQuery] = useState("");

  const triggerToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => (prev.message === message ? { ...prev, visible: false } : prev));
    }, 4000);
  };

  const handleAction = (message: string, path?: string) => {
    triggerToast(message);
    if (path) {
      setTimeout(() => {
        navigateTo(path as any);
      }, 800);
    }
  };

  return (
    <div id="certificates-page-root" className="min-h-screen bg-slate-50 text-slate-950 font-sans antialiased relative">
      {/* Toast Notification */}
      {toast.visible && (
        <div 
          id="certificates-toast"
          className="fixed bottom-20 lg:bottom-6 right-6 left-6 lg:left-auto lg:w-96 z-50 bg-slate-900 text-white p-4 rounded-xl shadow-xl flex items-start gap-3 border border-slate-800 animate-slide-up"
        >
          <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-emerald-400">SUSTAIN LMS Simulation</p>
            <p className="text-xs text-slate-300 mt-1">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast({ message: "", visible: false })}
            className="text-slate-400 hover:text-white text-xs font-bold shrink-0 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Responsive Outputs */}
      <DesktopCertificatesOverview 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAction={handleAction}
      />
      <TabletCertificatesOverview 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAction={handleAction}
      />
      <MobileCertificatesOverview 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleAction={handleAction}
      />
    </div>
  );
}

/* ==========================================
   DESKTOP COMPONENT (hidden lg:flex)
   ========================================== */
interface LayoutProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleAction: (msg: string, path?: string) => void;
}

function DesktopCertificatesOverview({ searchQuery, setSearchQuery, handleAction }: LayoutProps) {
  return (
    <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950">
      <LearnerSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search certificates, CPD, review status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleAction("Navigating to Notifications...", "/learner/notifications")} 
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-emerald-700 rounded-full"></span>
            </button>
            <button 
              onClick={() => handleAction("Navigating to Support...", "/learner/support")} 
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <button 
              onClick={() => handleAction("Navigating to Profile...", "/learner/profile")}
              className="flex items-center gap-3 text-left hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800">Aisha Mohammed</p>
                <p className="text-[10px] text-slate-400 font-mono font-semibold">SUST-LRN-0442</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-800 flex items-center justify-center font-bold text-xs text-white">
                AM
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
          <CertificatesHero handleAction={handleAction} />
          <SummaryCards />
          
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6">
            <div className="space-y-6">
              <ReadinessFocus handleAction={handleAction} />
              <ProgrammeRecords searchQuery={searchQuery} handleAction={handleAction} />
              <CpdBreakdown searchQuery={searchQuery} />
              <ReadinessChecklist handleAction={handleAction} />
              <SafetyNote handleAction={handleAction} />
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <CStatusCard handleAction={handleAction} />
              <CpdStatusCard handleAction={handleAction} />
              <NextStepsCard handleAction={handleAction} />
              <SupportCenterCard handleAction={handleAction} />
              <QuickActionsCard handleAction={handleAction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   TABLET COMPONENT (hidden md:block lg:hidden)
   ========================================== */
function TabletCertificatesOverview({ searchQuery, setSearchQuery, handleAction }: LayoutProps) {
  return (
    <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      {/* Compact Tablet Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-900 flex items-center justify-center text-white font-bold text-xs">
            SU
          </div>
          <div>
            <p className="text-xs font-extrabold text-emerald-900 tracking-wider">SUSTAIN LMS</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">CPD Pathway</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-800">Aisha Mohammed</p>
            <p className="text-[10px] text-slate-400 font-mono">Cohort 02</p>
          </div>
          <button 
            onClick={() => handleAction("Navigating to Profile...", "/learner/profile")}
            className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs"
          >
            AM
          </button>
        </div>
      </header>

      {/* Main Column */}
      <main className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        <CertificatesHero handleAction={handleAction} />
        <SummaryCards />
        <ReadinessFocus handleAction={handleAction} />
        <ProgrammeRecords searchQuery={searchQuery} handleAction={handleAction} />
        <CpdBreakdown searchQuery={searchQuery} />
        <ReadinessChecklist handleAction={handleAction} />
        <SafetyNote handleAction={handleAction} />
        <RecentActivity />
        <CStatusCard handleAction={handleAction} />
        <CpdStatusCard handleAction={handleAction} />
        <NextStepsCard handleAction={handleAction} />
        <SupportCenterCard handleAction={handleAction} />
        <QuickActionsCard handleAction={handleAction} />
      </main>

      <LearnerMobileNav />
    </div>
  );
}

/* ==========================================
   MOBILE COMPONENT (md:hidden)
   ========================================== */
function MobileHeroCard({ handleAction }: { handleAction: (msg: string, path?: string) => void }) {
  return (
    <div id="mobile-certificate-hero-card" className="bg-white rounded-[24px] border border-slate-200/80 shadow-xs p-6 text-left space-y-4 animate-fade-in">
      {/* Soft elegant chips */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-amber-50 text-amber-800 border border-amber-100/50 rounded-full px-2.5 py-0.5 text-[10px] font-semibold flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          Certificate review pending
        </span>
        <span className="bg-emerald-50 text-emerald-800 border border-emerald-100/50 rounded-full px-2.5 py-0.5 text-[10px] font-semibold flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          CPD record active
        </span>
      </div>

      {/* Header title & desc */}
      <div className="space-y-1.5">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
          Certificates & CPD
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          Review your certificate readiness, confirmed CPD credits, pending review items, and next steps toward issue.
        </p>
      </div>

      {/* Metadata info block */}
      <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 grid grid-cols-2 gap-y-3.5 gap-x-2">
        <div>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Learner</span>
          <span className="text-xs font-semibold text-slate-800 mt-0.5 block">{LEARNER_INFO.name}</span>
        </div>
        <div>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Target Certificate</span>
          <span className="text-xs font-semibold text-slate-800 mt-0.5 block truncate">{LEARNER_INFO.certificate}</span>
        </div>
        <div>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">CPD Wallet</span>
          <span className="text-xs font-bold text-emerald-900 mt-0.5 block">{LEARNER_INFO.cpd}</span>
        </div>
        <div>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Facilitator</span>
          <span className="text-xs font-semibold text-slate-800 mt-0.5 block">{LEARNER_INFO.facilitator}</span>
        </div>
      </div>

      {/* Action Buttons with 390px responsive alignment */}
      <div className="grid grid-cols-1 min-[390px]:grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={() => handleAction("Navigating to Certificate Track...", "/learner/certificates/work-readiness-certificate")}
          className="w-full bg-emerald-900 hover:bg-emerald-850 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 min-h-[40px] cursor-pointer active:scale-[0.98]"
        >
          <Award className="h-3.5 w-3.5" />
          <span>View Certificate Track</span>
        </button>
        <button
          onClick={() => handleAction("Opening active assessment draft...", "/learner/assessments/work-readiness-assignment")}
          className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 min-h-[40px] cursor-pointer active:scale-[0.98]"
        >
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          <span>Continue Assessment</span>
        </button>
      </div>
    </div>
  );
}

function MobileQuickStatsGrid() {
  return (
    <div id="mobile-certificates-quick-stats" className="grid grid-cols-2 gap-3">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between min-h-[110px] text-left">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Certificate Status</span>
        <div className="my-1">
          <span className="text-xs font-bold text-slate-800 block leading-tight">Ready for Review</span>
        </div>
        <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md self-start border border-amber-100/50">Not issued yet</span>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between min-h-[110px] text-left">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">CPD Credits</span>
        <div className="my-1">
          <span className="text-xs font-bold text-slate-800 block leading-tight">22 of 35</span>
        </div>
        <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md self-start border border-emerald-100/50">In progress</span>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between min-h-[110px] text-left">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Pending Review</span>
        <div className="my-1">
          <span className="text-xs font-bold text-amber-700 block leading-tight">4 credits</span>
        </div>
        <span className="text-[9px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md self-start border border-slate-100/55">Assessment-linked</span>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col justify-between min-h-[110px] text-left">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Issue Status</span>
        <div className="my-1">
          <span className="text-xs font-bold text-slate-500 font-mono block leading-tight">Not issued yet</span>
        </div>
        <span className="text-[9px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md self-start border border-slate-100/55">Awaiting check</span>
      </div>
    </div>
  );
}

function MobileCertificateReadiness() {
  return (
    <div id="mobile-certificate-readiness" className="bg-white rounded-[22px] border border-slate-200 shadow-xs p-5 text-left space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certificate Readiness</h2>
          <p className="text-[10px] text-slate-400 mt-0.5">Key requirements pending for final issue.</p>
        </div>
        <Award className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
      </div>

      {/* List / progress indicators */}
      <div className="space-y-3">
        {/* Row 1 */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 truncate">Assessment completed / in review</span>
          </div>
          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 uppercase font-mono shrink-0">Done</span>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-amber-500 shrink-0" />
              <span className="text-xs font-semibold text-slate-700">CPD threshold progress</span>
            </div>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 uppercase font-mono shrink-0">In Progress</span>
          </div>
          {/* Subtle Progress Bar */}
          <div className="space-y-1 mt-1">
            <div className="h-1.5 w-full bg-slate-200/70 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${(22/35)*100}%` }} />
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono font-bold">
              <span>22 of 35 Credits</span>
              <span>62% complete</span>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <Clock className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 truncate">Pending facilitator review</span>
          </div>
          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 uppercase font-mono shrink-0">Pending</span>
        </div>

        {/* Row 4 */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl opacity-60">
          <div className="flex items-center gap-2.5 min-w-0">
            <Lock className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-700 truncate">Verification unlocks after issue</span>
          </div>
          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 uppercase font-mono shrink-0">Locked</span>
        </div>
      </div>

      {/* Helper note */}
      <div className="bg-slate-50/70 p-3.5 border border-slate-100 rounded-xl">
        <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
          Your certificate is not yet issued. Assessment review and CPD checks must be completed before final issue.
        </p>
      </div>
    </div>
  );
}

function MobileCurrentStatusCard() {
  return (
    <div id="mobile-certificate-current-status" className="bg-white rounded-[22px] border border-slate-200 shadow-xs p-5 text-left space-y-4">
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Status</h2>
        <p className="text-[10px] text-slate-400 mt-0.5 font-normal">Official track records from Kano Youth Skills Hub.</p>
      </div>

      <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
        <div className="flex items-center justify-between px-3.5 py-2.5 text-xs bg-white">
          <span className="text-slate-500 font-medium">Certificate</span>
          <span className="font-semibold text-slate-800">{LEARNER_INFO.certificate}</span>
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5 text-xs bg-white">
          <span className="text-slate-500 font-medium">Status</span>
          <span className="font-semibold text-amber-700 bg-amber-50/65 border border-amber-100/50 px-2 py-0.5 rounded-full text-[10px]">Ready for review</span>
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5 text-xs bg-white">
          <span className="text-slate-500 font-medium">Issue State</span>
          <span className="font-semibold text-slate-500 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-full text-[10px] font-mono">Not issued yet</span>
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5 text-xs bg-white">
          <span className="text-slate-500 font-medium">CPD Progress</span>
          <span className="font-semibold text-emerald-800 text-xs">22 of 35 credits</span>
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5 text-xs bg-white">
          <span className="text-slate-500 font-medium">Pending Credits</span>
          <span className="font-semibold text-amber-700 text-xs">4 credits pending</span>
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5 text-xs bg-white">
          <span className="text-slate-500 font-medium">Facilitator</span>
          <span className="font-semibold text-slate-800">{LEARNER_INFO.facilitator}</span>
        </div>
      </div>
    </div>
  );
}

function MobileNextStepCard({ handleAction }: { handleAction: (msg: string, path?: string) => void }) {
  return (
    <div id="mobile-certificate-next-step" className="bg-white rounded-[22px] border border-slate-200 shadow-xs p-5 text-left space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Step</h2>
          <p className="text-[10px] text-slate-400 mt-0.5">Primary action required to advance review.</p>
        </div>
        <span className="bg-emerald-50 text-emerald-800 text-[9px] px-2 py-0.5 rounded-full font-bold border border-emerald-100 font-mono uppercase">
          Draft Started
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-800">Work Readiness Assignment</h3>
        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          Continue your assessment submission to move toward certificate review and complete your pending CPD points.
        </p>
      </div>

      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
          <span>Complete final workplace scenario task</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
          <span>Unlocks remaining 4 CPD credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={() => handleAction("Opening active assessment draft...", "/learner/assessments/work-readiness-assignment")}
          className="w-full bg-emerald-900 hover:bg-emerald-850 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 min-h-[40px] cursor-pointer active:scale-[0.98]"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Continue Assessment</span>
        </button>
        <button
          onClick={() => handleAction("Opening Support Center...", "/learner/support")}
          className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 min-h-[40px] cursor-pointer active:scale-[0.98]"
        >
          <span>Open Support</span>
        </button>
      </div>
    </div>
  );
}

function MobilePendingReviewCard() {
  return (
    <div id="mobile-certificate-pending-review" className="bg-amber-50/40 rounded-[22px] border border-amber-200/45 p-5 text-left space-y-3">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-amber-100/60 border border-amber-200/30 flex items-center justify-center shrink-0">
          <Clock className="h-4.5 w-4.5 text-amber-700" />
        </div>
        <div className="space-y-0.5 flex-1">
          <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider block">Pending Credits</span>
          <h4 className="text-sm font-bold text-amber-900">4 Credits Pending Review</h4>
          <p className="text-xs text-amber-800/80 leading-relaxed font-normal">
            These credits are linked directly to your active Work Readiness Assignment.
          </p>
        </div>
      </div>

      <p className="text-[11px] text-amber-900 bg-white/85 p-3 rounded-xl border border-amber-200/20 leading-relaxed font-medium">
        Once the review is completed by Halima Sani, eligible credits will be automatically added to your consolidated certificate record.
      </p>
    </div>
  );
}

function MobileCertificateTrackTimeline({ handleAction }: { handleAction: (msg: string, path?: string) => void }) {
  return (
    <div id="mobile-certificate-timeline-track" className="bg-white rounded-[22px] border border-slate-200 shadow-xs p-5 text-left space-y-4">
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certificate Track</h2>
        <p className="text-[10px] text-slate-400 mt-0.5">Your official progress checklist towards issue.</p>
      </div>

      {/* Timeline tracker */}
      <div className="relative pl-6 space-y-5">
        {/* Connection line */}
        <div className="absolute top-2 left-[6px] bottom-2 w-px bg-slate-200/80" />

        {/* Step 1 */}
        <div className="relative flex items-start gap-3">
          <span className="absolute -left-[24px] top-0.5 h-3 w-3 rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center z-10 shrink-0">
            <span className="h-1 w-1 rounded-full bg-emerald-600" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-800">Digital Readiness Basics</p>
            <p className="text-[10px] text-slate-400 font-medium">Complete & Confirmed • 8 Credits</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex items-start gap-3">
          <span className="absolute -left-[24px] top-0.5 h-3 w-3 rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center z-10 shrink-0">
            <span className="h-1 w-1 rounded-full bg-emerald-600" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-800">Workplace Communication</p>
            <p className="text-[10px] text-slate-400 font-medium">Complete & Confirmed • 6 Credits</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex items-start gap-3">
          <span className="absolute -left-[24px] top-0.5 h-3 w-3 rounded-full bg-amber-50 border-2 border-amber-500 flex items-center justify-center z-10 shrink-0">
            <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-850">Work Readiness Assessment</p>
            <p className="text-[10px] text-amber-700 font-semibold">Draft started • 4 Credits Pending Review</p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative flex items-start gap-3 opacity-60">
          <span className="absolute -left-[24px] top-0.5 h-3 w-3 rounded-full bg-slate-50 border-2 border-slate-300 flex items-center justify-center z-10 shrink-0" />
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-500">Remaining Pathway Credits</p>
            <p className="text-[10px] text-slate-400 font-medium">Future assigned learning • 9 credits</p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="relative flex items-start gap-3 opacity-50">
          <span className="absolute -left-[24px] top-0.5 h-3.5 w-3.5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center z-10 shrink-0">
            <Lock className="h-2 w-2 text-slate-400" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-400">Public Verification Link</p>
            <p className="text-[10px] text-slate-400 font-mono">Locks until certificate generation</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
        <button
          onClick={() => handleAction("Opening certificate details...", "/learner/certificates/work-readiness-certificate")}
          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] text-center"
        >
          Open Details
        </button>
        <button
          onClick={() => handleAction("Opening CPD Record...", "/learner/cpd-record")}
          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] text-center"
        >
          View CPD Record
        </button>
      </div>
    </div>
  );
}

function MobileQuickActions({ handleAction }: { handleAction: (msg: string, path?: string) => void }) {
  const actionsList = [
    { label: "Open Assessment", route: "/learner/assessments/work-readiness-assignment", helper: "Complete submission" },
    { label: "Certificate Track", route: "/learner/certificates/work-readiness-certificate", helper: "Explore criteria" },
    { label: "Open CPD Record", route: "/learner/cpd-record", helper: "View points" },
    { label: "Open Support", route: "/learner/support", helper: "Ask pathway questions" },
    { label: "Open Notifications", route: "/learner/notifications", helper: "Recent inbox items" },
    { label: "Open Resources", route: "/learner/resources", helper: "Browse manuals" }
  ];

  return (
    <div id="mobile-certificate-quick-actions" className="space-y-3 text-left">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {actionsList.map((act, idx) => (
          <button
            key={idx}
            onClick={() => handleAction(`Navigating to ${act.label}...`, act.route)}
            className="bg-white border border-slate-200/80 rounded-2xl p-4 text-left space-y-1.5 shadow-xs hover:border-emerald-200 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 line-clamp-1">{act.label}</span>
              <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
            </div>
            <p className="text-[9px] text-slate-400 font-medium truncate">{act.helper}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileFacilitatorSupport({ handleAction }: { handleAction: (msg: string, path?: string) => void }) {
  return (
    <div id="mobile-certificate-facilitator-support" className="bg-white rounded-[22px] border border-slate-200 shadow-xs p-5 text-left space-y-4">
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Need help?</h2>
        <p className="text-[10px] text-slate-400 mt-0.5">Assigned pathway support expert.</p>
      </div>

      <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
        <div className="h-10 w-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-sm shadow-sm border border-emerald-800/15 shrink-0">
          HS
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">{LEARNER_INFO.facilitator}</h4>
          <p className="text-[10px] text-slate-400 font-medium">Lead Facilitator</p>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
        Have questions about your certificate readiness progress, assignment drafts, or CPD credit validation? Contact your facilitator.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          onClick={() => handleAction("Message sent to Halima Sani in this frontend prototype.", "/learner/community")}
          className="w-full bg-emerald-900 hover:bg-emerald-850 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 min-h-[40px] cursor-pointer active:scale-[0.98]"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Message Facilitator</span>
        </button>
        <button
          onClick={() => handleAction("Opening new Support Request ticket...", "/learner/support/certificate-readiness-request")}
          className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 min-h-[40px] cursor-pointer active:scale-[0.98]"
        >
          <span>Open Support Request</span>
        </button>
      </div>
    </div>
  );
}

function MobileCertificatesOverview({ searchQuery, setSearchQuery, handleAction }: LayoutProps) {
  return (
    <div className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      {/* 1. Mobile topbar */}
      <header className="h-14 bg-white border-b border-slate-200/60 px-4 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-emerald-900 uppercase tracking-widest font-sans">SUSTAIN LMS</span>
          <span className="bg-emerald-50 text-emerald-800 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-100">
            Learner
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => handleAction("Opening Notifications...", "/learner/notifications")}
            className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl relative cursor-pointer transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
          </button>
          <button 
            onClick={() => handleAction("Opening Support...", "/learner/support")}
            className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-xl cursor-pointer transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
          <div className="h-5 w-px bg-slate-200 mx-1" />
          <button 
            onClick={() => handleAction("Opening Profile...", "/learner/profile")}
            className="flex items-center focus:outline-none cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shadow-sm border border-emerald-800/20 active:scale-95 transition-transform">
              AM
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Content Stack - Beautiful, premium workflow */}
      <main className="px-4 py-5 space-y-5">
        {/* 2. Certificate Hero / Summary Card */}
        <MobileHeroCard handleAction={handleAction} />

        {/* 3. Quick Stats Grid */}
        <MobileQuickStatsGrid />

        {/* 4. Certificate Readiness Section */}
        <MobileCertificateReadiness />

        {/* 5. Current Certificate / CPD Status Card */}
        <MobileCurrentStatusCard />

        {/* 6. Linked Assessment / Next Step Card */}
        <MobileNextStepCard handleAction={handleAction} />

        {/* 7. Pending Review / Pending Credits Card */}
        <MobilePendingReviewCard />

        {/* 8. Certificate Track Timeline / Checklist */}
        <MobileCertificateTrackTimeline handleAction={handleAction} />

        {/* 9. Quick Actions */}
        <MobileQuickActions handleAction={handleAction} />

        {/* 10. Facilitator Support / Help Card */}
        <MobileFacilitatorSupport handleAction={handleAction} />
      </main>

      {/* 11. Bottom Nav */}
      <LearnerMobileNav />
    </div>
  );
}

/* ==========================================
   HELPER SUB-COMPONENTS (PROPORTIONAL RENDER)
   ========================================== */
interface SharedSubProps {
  handleAction: (msg: string, path?: string) => void;
}

function CertificatesHero({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6">
        {/* Left Side */}
        <div className="p-6 lg:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest flex items-center gap-1">
              <span>Learner Workspace</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-600">Certificates & CPD</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3.5">
              <span className="bg-amber-50 text-amber-800 border border-amber-100 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                Certificate review pending
              </span>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                CPD record active
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 mt-3 font-sans">
              Certificates & CPD
            </h1>
            
            <p className="text-xs lg:text-sm text-slate-500 mt-2 leading-relaxed">
              Review your certificate readiness, confirmed CPD credits, pending review items, and next steps toward issue.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
            <div>
              <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">Learner</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{LEARNER_INFO.name}</p>
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">Target Certificate</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{LEARNER_INFO.certificate}</p>
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">CPD Wallet</p>
              <p className="text-xs font-bold text-emerald-900 mt-0.5">{LEARNER_INFO.cpd}</p>
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">Facilitator</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{LEARNER_INFO.facilitator}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/certificates/work-readiness-certificate")}
              className="bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              View Certificate Track
            </button>
            <button
              onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/assessments/work-readiness-assignment")}
              className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
            >
              Continue Assessment
            </button>
          </div>
        </div>

        {/* Right Deep Green Panel */}
        <div className="bg-emerald-900 text-white p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
          <div className="absolute -right-12 -bottom-12 text-emerald-850/40 transform rotate-12">
            <Award className="h-48 w-48 pointer-events-none" />
          </div>
          <div className="relative z-10 space-y-1">
            <span className="text-[9px] font-bold tracking-widest text-emerald-300 uppercase block">
              Certificate Status
            </span>
            <h3 className="text-xl font-bold font-sans text-white pt-1">
              Ready for Review
            </h3>
            <p className="text-xs text-emerald-100 font-medium leading-relaxed pt-2">
              Your certificate is not issued yet. Assessment and CPD checks must be completed before issue.
            </p>
          </div>
          <div className="relative z-10 pt-4 border-t border-emerald-800 mt-4">
            <p className="text-xs font-bold text-emerald-200">
              22 of 35 CPD credits • 4 pending review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 cursor-pointer">
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Certificate Status</p>
          <LearnerContextHint
            title="What this means"
            text="Your certificate is not issued yet. It can move forward after required assessment review and CPD checks are complete."
            align="right"
          />
        </div>
        <div className="my-2">
          <p className="text-lg font-extrabold text-slate-850">Ready for Review</p>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold">Not issued yet</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 cursor-pointer">
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">CPD Credits</p>
          <LearnerContextHint
            title="How this works"
            text="Confirmed CPD credits count toward your SUSTAIN CPD Programme record. Pending credits depend on assessment review."
            align="right"
          />
        </div>
        <div className="my-2">
          <p className="text-lg font-extrabold text-slate-850">22 of 35</p>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold">4 pending review</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 cursor-pointer">
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Pending Review</p>
          <LearnerContextHint
            title="How this works"
            text="Pending CPD credits are waiting for review. Once confirmed, they will count toward your certificate-linked CPD record."
            align="right"
          />
        </div>
        <div className="my-2">
          <p className="text-lg font-extrabold text-amber-600">4 credits</p>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold">Assessment-linked</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 cursor-pointer">
        <div className="flex items-center justify-between">
          <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Verification</p>
          <LearnerContextHint
            title="Helpful note"
            text="Public verification is only available after a certificate has been issued. This frontend prototype does not generate real verification links."
            align="right"
          />
        </div>
        <div className="my-2">
          <p className="text-lg font-extrabold text-slate-400 font-mono">Inactive</p>
        </div>
        <p className="text-[10px] text-slate-400 font-semibold">Available after issue</p>
      </div>
    </div>
  );
}

function ReadinessFocus({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Certificate Readiness Focus</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your current certificate record and what must happen next.</p>
        </div>
        <Award className="h-5 w-5 text-emerald-800 shrink-0" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 border border-slate-100 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
            <Award className="h-5 w-5 text-emerald-900" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Work Readiness Certificate</h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="bg-amber-50 text-amber-800 border border-amber-100 rounded px-2 py-0.5 text-[9px] font-bold uppercase">
                Ready for certificate review
              </span>
              <span className="bg-slate-100 text-slate-600 border border-slate-200 rounded px-2 py-0.5 text-[9px] font-bold uppercase">
                Not issued
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
              Your certificate can move forward after the Work Readiness Assignment is submitted and reviewed, and pending CPD credits are confirmed.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
        <div>
          <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">CPD Tracker</p>
          <p className="text-xs font-bold text-slate-800 mt-0.5">22 of 35 Credits</p>
        </div>
        <div>
          <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">Pending</p>
          <p className="text-xs font-bold text-amber-600 mt-0.5">4 Credits</p>
        </div>
        <div>
          <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">Verification</p>
          <p className="text-xs font-bold text-slate-500 mt-0.5 font-mono">Inactive</p>
        </div>
        <div>
          <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest">QR Code Status</p>
          <p className="text-xs font-bold text-slate-500 mt-0.5">Unavailable</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/certificates/work-readiness-certificate")}
          className="bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm"
        >
          View Certificate Track
        </button>
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/assessments/work-readiness-assignment")}
          className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          Continue Assessment
        </button>
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/support")}
          className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          Open Support
        </button>
      </div>
    </div>
  );
}

interface SearchProps extends SharedSubProps {
  searchQuery: string;
}

function ProgrammeRecords({ searchQuery, handleAction }: SearchProps) {
  const filtered = CERTIFICATE_RECORDS.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Certificate & Programme Records</h2>
        <p className="text-xs text-slate-400 mt-0.5">Records connected to your learner pathway.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleAction("Certificate action completed in this frontend prototype.", item.route)}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <div className="space-y-3.5">
              <div className="h-9 w-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Award className="h-4.5 w-4.5 text-emerald-900" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-850 leading-snug">{item.title}</h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  <span className="bg-amber-50 text-amber-800 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {item.status}
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                    {item.issueState}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {item.desc}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <p className="text-[10px] font-medium text-slate-500">CPD: <span className="font-bold text-slate-700">{item.cpd}</span></p>
                <p className="text-[10px] font-medium text-amber-600">Pending: <span className="font-bold">{item.pending}</span></p>
              </div>
            </div>
            <span className="text-emerald-900 font-bold text-[10px] text-left hover:text-emerald-700 transition-colors mt-4 block">
              {item.action} →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CpdBreakdown({ searchQuery }: { searchQuery: string }) {
  const filtered = CPD_BREAKDOWN.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">CPD Breakdown</h2>
        <p className="text-xs text-slate-400 mt-0.5">Confirmed, pending, and remaining CPD linked to your pathway.</p>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const isConfirmed = item.status === "Confirmed";
          const isPending = item.status === "Pending review";
          
          return (
            <div 
              key={item.id} 
              className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full shrink-0 ${isConfirmed ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-slate-300'}`} />
                <div>
                  <p className="text-xs font-extrabold text-slate-800">{item.id}. {item.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Evidence: {item.evidence}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`border rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  isConfirmed ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 
                  isPending ? 'bg-amber-50 text-amber-800 border-amber-100' : 
                  'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {item.status}
                </span>
                <span className="text-xs font-extrabold text-slate-700 font-mono">{item.credits} credits</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReadinessChecklist({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Certificate Readiness Checklist</h2>
        <p className="text-xs text-slate-400 mt-0.5">Items that must be completed before certificate issue.</p>
      </div>

      <div className="space-y-3.5">
        {READINESS_CHECKLIST.map((item, idx) => {
          const isComplete = item.status === "Complete";
          const isInProgress = item.status === "In progress" || item.status.includes("Pending");
          
          return (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl ${
                !isComplete && !isInProgress ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {isComplete ? (
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                ) : isInProgress ? (
                  <Clock className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                ) : (
                  <Lock className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                )}
                <span className="text-xs font-bold text-slate-700">{item.label}</span>
              </div>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase font-mono ${
                isComplete ? 'text-emerald-700 bg-emerald-50' : 
                isInProgress ? 'text-amber-700 bg-amber-50' : 
                'text-slate-500 bg-slate-100'
              }`}>
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/assessments/work-readiness-assignment")}
          className="bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-xs px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm"
        >
          Continue Assessment
        </button>
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/certificates/work-readiness-certificate")}
          className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          Open Certificate Detail
        </button>
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/support")}
          className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          Open Support
        </button>
      </div>
    </div>
  );
}

function SafetyNote({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Certificate Safety Note</h2>
        <p className="text-xs text-slate-400 mt-0.5">Understand what is available now and what is not yet available.</p>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-3.5">
        <div className="flex items-start gap-2.5">
          <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
          <p className="text-xs text-slate-600 font-medium leading-relaxed pt-0.5">The Work Readiness Certificate is not issued yet.</p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
          <p className="text-xs text-slate-600 font-medium leading-relaxed pt-0.5">Public verification is inactive until issue.</p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
          <p className="text-xs text-slate-600 font-medium leading-relaxed pt-0.5">QR code is unavailable until issue.</p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
          <p className="text-xs text-slate-600 font-medium leading-relaxed pt-0.5">PDF download is unavailable until issue.</p>
        </div>
        <div className="flex items-start gap-2.5">
          <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">5</span>
          <p className="text-xs text-slate-600 font-medium leading-relaxed pt-0.5">Ask support if your CPD or review status looks incorrect.</p>
        </div>

        <div className="pt-4 border-t border-slate-200 mt-4">
          <button
            onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/support")}
            className="bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-xs px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm"
          >
            Open Support
          </button>
        </div>
      </div>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Certificate Activity</h2>
        <p className="text-xs text-slate-400 mt-0.5">Timeline of updates regarding your learning achievements.</p>
      </div>

      <div className="relative">
        <div className="absolute top-2.5 left-3.5 bottom-2.5 w-0.5 bg-slate-100 z-0" />
        
        <div className="space-y-5 relative z-10">
          {RECENT_ACTIVITY.map((act, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <span className="h-7 w-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-700">{act.title}</p>
                  <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-bold font-mono">{act.time}</span>
                </div>
                {act.context && (
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5 font-mono">{act.context}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CStatusCard({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certificate Status</h3>
      </div>
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Certificate</span>
          <span className="font-bold text-slate-800">{LEARNER_INFO.certificate}</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Status</span>
          <span className="font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">Ready for review</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Issue state</span>
          <span className="font-bold text-slate-500">{LEARNER_INFO.issueState}</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Public verification</span>
          <span className="font-bold text-slate-400 uppercase font-mono">Inactive</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5">
          <span className="text-slate-500 font-medium">QR status</span>
          <span className="font-bold text-slate-400 font-mono">Unavailable</span>
        </div>
      </div>
      <button
        onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/certificates/work-readiness-certificate")}
        className="w-full mt-4 bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-xs py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-xs text-center"
      >
        View Certificate Track
      </button>
    </div>
  );
}

function CpdStatusCard({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">CPD Status</h3>
      </div>
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Confirmed</span>
          <span className="font-extrabold text-emerald-900 font-mono text-sm">22 credits</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Target</span>
          <span className="font-bold text-slate-800 font-mono">35 credits</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Pending review</span>
          <span className="font-bold text-amber-600 font-mono">4 credits</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Remaining</span>
          <span className="font-bold text-slate-500 font-mono">9 credits</span>
        </div>
        <div className="flex items-center justify-between text-xs py-1.5">
          <span className="text-slate-500 font-medium">Programme</span>
          <span className="font-bold text-slate-800 text-[10px]">{LEARNER_INFO.programme}</span>
        </div>
      </div>
      <button
        onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/certificates/work-readiness-certificate")}
        className="w-full mt-4 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-xs text-center"
      >
        View CPD Details
      </button>
    </div>
  );
}

function NextStepsCard({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Steps</h3>
      </div>
      <ul className="space-y-3 text-xs text-slate-600 font-medium">
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-slate-150 text-slate-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
          <span className="pt-0.5">Continue the Work Readiness Assignment.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-slate-150 text-slate-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
          <span className="pt-0.5">Submit when ready.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-slate-150 text-slate-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
          <span className="pt-0.5">Wait for facilitator review.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-slate-150 text-slate-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
          <span className="pt-0.5">Check CPD confirmation.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="h-5 w-5 rounded-full bg-slate-150 text-slate-700 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
          <span className="pt-0.5">Certificate issue can proceed after review.</span>
        </li>
      </ul>
      <div className="grid grid-cols-2 gap-2 mt-5">
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/assessments/work-readiness-assignment")}
          className="bg-emerald-900 text-white hover:bg-emerald-800 font-bold text-xs py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-xs text-center"
        >
          Continue
        </button>
        <button
          onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/support")}
          className="bg-white border border-slate-200 text-slate-850 hover:bg-slate-50 font-bold text-xs py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-xs text-center"
        >
          Open Support
        </button>
      </div>
    </div>
  );
}

function SupportCenterCard({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-sm p-6 flex flex-col justify-between relative overflow-hidden min-h-[160px]">
      <div className="absolute -right-8 -bottom-8 text-emerald-850/40 transform rotate-12">
        <HelpCircle className="h-28 w-28 pointer-events-none" />
      </div>
      <div className="relative z-10 space-y-1.5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Support Center</h3>
        <p className="text-xs text-emerald-100 leading-relaxed max-w-[220px]">
          Need assistance with your learning pathway?
        </p>
      </div>
      <button
        onClick={() => handleAction("Certificate action completed in this frontend prototype.", "/learner/support")}
        className="relative z-10 mt-5 bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] text-center"
      >
        Open Support
      </button>
    </div>
  );
}

function QuickActionsCard({ handleAction }: SharedSubProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="border-b border-slate-100 pb-3 mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
      </div>
      <div className="space-y-1">
        {QUICK_ACTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleAction("Certificate action completed in this frontend prototype.", item.route)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-emerald-200 hover:bg-slate-50 transition-all duration-200 group text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-900 transition-colors" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-700 group-hover:text-emerald-900 transition-colors">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-medium">{item.helper}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
}
