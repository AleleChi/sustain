import { useState } from "react";
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  BookOpen, 
  Award, 
  Clock, 
  Compass, 
  HelpCircle, 
  LogOut, 
  Copy, 
  Save, 
  RefreshCw, 
  Sliders, 
  Eye, 
  Zap, 
  ChevronRight, 
  Info, 
  Users, 
  CheckCircle, 
  X,
  Search,
  Check,
  Flame,
  Download,
  Database,
  Lock,
  Wifi,
  FileText
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";

export default function LearnerProfilePage() {
  const { navigateTo } = useRoute();

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Dialog / Modal States
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  // 1. Learning Preferences State
  const [lowBandwidth, setLowBandwidth] = useState(true);
  const [autoSaveProgress, setAutoSaveProgress] = useState(true);
  const [showReminders, setShowReminders] = useState(true);
  const [readableText, setReadableText] = useState(true);
  const [reduceMedia, setReduceMedia] = useState(true);

  // 2. Notification Preferences State
  const [notifLessons, setNotifLessons] = useState(true);
  const [notifAssessments, setNotifAssessments] = useState(true);
  const [notifCertificates, setNotifCertificates] = useState(true);
  const [notifCpd, setNotifCpd] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(true);
  const [notifMaterials, setNotifMaterials] = useState(true);
  const [notifLiveSessions, setNotifLiveSessions] = useState(true);
  const [notifOfflineSync, setNotifOfflineSync] = useState(true);

  // 3. Accessibility Preferences State
  const [accessReadableText, setAccessReadableText] = useState(true);
  const [accessContrast, setAccessContrast] = useState(true);
  const [accessReducedMotion, setAccessReducedMotion] = useState(false);
  const [accessCompactCards, setAccessCompactCards] = useState(false);
  const [accessLargeTapTargets, setAccessLargeTapTargets] = useState(false);
  const [accessSimplifiedLayout, setAccessSimplifiedLayout] = useState(false);

  // Simulated Interactions
  const handleCopyLearnerId = () => {
    try {
      navigator.clipboard.writeText("SUST-LRN-0442");
    } catch (e) {
      // Fallback
    }
    showToast("Learner ID copied to clipboard.", "success");
  };

  const handleSaveLearningPrefs = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Preferences saved locally.", "success");
  };

  const handleResetLearningPrefs = () => {
    setShowResetModal(false);
    setLowBandwidth(true);
    setAutoSaveProgress(true);
    setShowReminders(true);
    setReadableText(true);
    setReduceMedia(true);
    showToast("Preferences reset to default values.", "info");
  };

  const handleSaveNotifPrefs = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Notification preferences saved locally.", "success");
  };

  const handleSaveAccessPrefs = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Accessibility preferences saved locally.", "success");
  };

  const handleEditPreferencesScroll = () => {
    const el = document.getElementById("desktop-learning-preferences-section") || 
               document.getElementById("tablet-learning-preferences-section") || 
               document.getElementById("mobile-learning-preferences-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      showToast("Scrolled to preferences section.", "info");
    }
  };

  const handleClearOfflineData = () => {
    showToast("Offline content and cached data cleared successfully.", "success");
  };

  const handleExportLocalDrafts = () => {
    showToast("Local assessment drafts exported successfully.", "success");
  };

  // Compact, high-fidelity toggle switch (completely non-harsh, emerald / slate styling)
  const Toggle = ({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) => (
    <button
      type="button"
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-150 ease-in-out focus:outline-hidden ${
        checked ? "bg-emerald-800" : "bg-slate-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-150 ease-in-out mt-[2px] ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  // -------------------------------------------------------------------------
  // REUSABLE VISUAL SUB-RENDERERS (Shared across Desktop, Tablet, and Mobile)
  // -------------------------------------------------------------------------

  // 1. Profile Summary Card
  const renderProfileSummaryCard = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch">
          {/* Left Details */}
          <div className="flex flex-col justify-between space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-xl tracking-wide border border-emerald-100 shrink-0">
                AM
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 font-sans">Aisha Mohammed</h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-805 border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active learner
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  SUSTAIN LMS learner in the Youth Employability Pathway
                </p>
                
                {/* Context row with soft formatting */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">ID: SUST-LRN-0442</span>
                  <span className="text-slate-300">•</span>
                  <span>Kano Youth Employability Cohort 02</span>
                  <span className="text-slate-300">•</span>
                  <span>SUSTAIN CPD Programme</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={handleEditPreferencesScroll}
                className="bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer min-h-[40px] flex items-center justify-center"
              >
                Edit Preferences
              </button>
              <button
                onClick={() => navigateTo("/learner/cpd-record" as any)}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer min-h-[40px] flex items-center justify-center"
              >
                View Certificate Record
              </button>
            </div>
          </div>

          {/* Right Premium Dark Emerald Panel */}
          <div className="bg-emerald-950 text-white rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[160px]">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-emerald-900/40 rounded-full blur-xl pointer-events-none" />
            <div className="space-y-1.5 relative z-10">
              <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider block">
                Learning Identity
              </span>
              <h4 className="text-sm font-bold tracking-tight font-heading">Youth Employability Pathway</h4>
              <p className="text-xs text-emerald-100/90 leading-normal font-normal">
                Work Readiness Foundation
              </p>
            </div>
            <div className="pt-4 border-t border-emerald-900/65 mt-4 text-xs text-emerald-200/95 flex justify-between items-center font-medium relative z-10">
              <span>22 of 35 CPD credits</span>
              <span className="bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-800/40 text-emerald-300 font-semibold text-[10px]">
                Review Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Profile Insight Cards
  const renderProfileInsightCards = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 text-left">
        {/* Pathway Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 flex flex-col justify-between min-h-[110px]">
          <span className="text-xs font-medium text-slate-500 block">
            Learning Pathway
          </span>
          <div className="space-y-0.5">
            <h4 className="text-base font-semibold text-slate-900 leading-snug">Youth Employability</h4>
            <p className="text-xs text-emerald-805 font-medium flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active pathway
            </p>
          </div>
        </div>

        {/* Current Course */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 flex flex-col justify-between min-h-[110px]">
          <span className="text-xs font-medium text-slate-500 block">
            Current Course
          </span>
          <div className="space-y-0.5">
            <h4 className="text-base font-semibold text-slate-900 leading-snug truncate">Work Readiness</h4>
            <p className="text-xs text-slate-500 font-medium">
              42% progress
            </p>
          </div>
        </div>

        {/* CPD Credits */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 flex flex-col justify-between min-h-[110px]">
          <span className="text-xs font-medium text-slate-500 block">
            CPD Credits
          </span>
          <div className="space-y-0.5">
            <h4 className="text-base font-semibold text-slate-900 leading-snug">22 of 35</h4>
            <p className="text-[10px] text-amber-805 font-semibold bg-amber-50/50 px-2 py-0.5 rounded border border-amber-100 inline-block">
              4 pending review
            </p>
          </div>
        </div>

        {/* Certificate Status */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4.5 flex flex-col justify-between min-h-[110px]">
          <span className="text-xs font-medium text-slate-500 block">
            Certificate Status
          </span>
          <div className="space-y-0.5">
            <h4 className="text-base font-semibold text-slate-900 leading-snug">Ready for review</h4>
            <p className="text-xs text-slate-500 font-medium truncate">
              Work Readiness Certificate
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 3. Learning Identity (Non-table layout, soft detail rows)
  const renderLearningIdentityCard = () => {
    const details = [
      { label: "Full name", value: "Aisha Mohammed" },
      { label: "Learner ID", value: "SUST-LRN-0442" },
      { label: "Programme", value: "SUSTAIN CPD Programme" },
      { label: "Pathway", value: "Youth Employability Pathway" },
      { label: "Organisation", value: "Kano Youth Skills Hub" },
      { label: "Cohort", value: "Kano Youth Employability Cohort 02" },
      { label: "Facilitator", value: "Halima Sani" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-left">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 font-sans">Learning Identity</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            These details identify your learner record.
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          {details.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 last:border-0 gap-1 sm:gap-4">
              <span className="text-xs text-slate-500 font-medium font-sans">{item.label}</span>
              <span className="text-sm font-medium text-slate-805 text-left sm:text-right break-all">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={handleCopyLearnerId}
            className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs min-h-[38px]"
          >
            <Copy className="h-3.5 w-3.5 text-slate-500" />
            <span>Copy Learner ID</span>
          </button>
        </div>
      </div>
    );
  };

  // 4. Learning Preferences ( Visibly updated, soft row layout )
  const renderLearningPreferencesCard = (idPrefix: string) => {
    return (
      <div id={`${idPrefix}-learning-preferences-section`} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 text-left">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 font-sans">Learning Preferences</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Choose how you prefer to access learning materials and continue your course.
          </p>
        </div>

        <form onSubmit={handleSaveLearningPrefs} className="space-y-4">
          <div className="space-y-3">
            {/* Low-bandwidth mode */}
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs text-left animate-fade-in">
              <div className="space-y-1 flex-1 pr-2">
                <span className="text-sm font-semibold text-slate-900 block">Low-bandwidth mode</span>
                <span className="text-xs text-slate-600 font-normal leading-relaxed block">
                  Prioritise text summaries, transcripts, and lightweight materials.
                </span>
              </div>
              <div className="self-end min-[380px]:self-auto shrink-0">
                <Toggle checked={lowBandwidth} onChange={setLowBandwidth} id={`${idPrefix}-toggle-low-bandwidth`} />
              </div>
            </div>

            {/* Auto-save progress */}
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs text-left">
              <div className="space-y-1 flex-1 pr-2">
                <span className="text-sm font-semibold text-slate-900 block">Auto-save learning progress</span>
                <span className="text-xs text-slate-600 font-normal leading-relaxed block">
                  Keep local progress changes safe while learning.
                </span>
              </div>
              <div className="self-end min-[380px]:self-auto shrink-0">
                <Toggle checked={autoSaveProgress} onChange={setAutoSaveProgress} id={`${idPrefix}-toggle-auto-save`} />
              </div>
            </div>

            {/* Lesson reminders */}
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs text-left">
              <div className="space-y-1 flex-1 pr-2">
                <span className="text-sm font-semibold text-slate-900 block">Lesson reminders</span>
                <span className="text-xs text-slate-600 font-normal leading-relaxed block">
                  Display learning reminders inside the learner workspace.
                </span>
              </div>
              <div className="self-end min-[380px]:self-auto shrink-0">
                <Toggle checked={showReminders} onChange={setShowReminders} id={`${idPrefix}-toggle-show-reminders`} />
              </div>
            </div>

            {/* Readable text size */}
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs text-left">
              <div className="space-y-1 flex-1 pr-2">
                <span className="text-sm font-semibold text-slate-900 block">Readable text size</span>
                <span className="text-xs text-slate-600 font-normal leading-relaxed block">
                  Use comfortable text size for course and assessment content.
                </span>
              </div>
              <div className="self-end min-[380px]:self-auto shrink-0">
                <Toggle checked={readableText} onChange={setReadableText} id={`${idPrefix}-toggle-readable-text`} />
              </div>
            </div>

            {/* Reduce large media */}
            <div className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl shadow-xs text-left">
              <div className="space-y-1 flex-1 pr-2">
                <span className="text-sm font-semibold text-slate-900 block">Reduce large media</span>
                <span className="text-xs text-slate-600 font-normal leading-relaxed block">
                  Use lighter content where available.
                </span>
              </div>
              <div className="self-end min-[380px]:self-auto shrink-0">
                <Toggle checked={reduceMedia} onChange={setReduceMedia} id={`${idPrefix}-toggle-reduce-media`} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="bg-emerald-900 text-white hover:bg-emerald-850 text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] shadow-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <Save className="h-4 w-4" />
              <span>Save Preferences</span>
            </button>
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] shadow-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
              <span>Reset Preferences</span>
            </button>
          </div>
        </form>
      </div>
    );
  };

  // 5. Notification Preferences ( Visibly updated, 2-column or stacked layout )
  const renderNotificationPreferencesCard = (idPrefix: string) => {
    const items = [
      { id: "lessons", label: "Lesson reminders", state: notifLessons, setter: setNotifLessons },
      { id: "assessments", label: "Assessment reminders", state: notifAssessments, setter: setNotifAssessments },
      { id: "certs", label: "Certificate readiness", state: notifCertificates, setter: setNotifCertificates },
      { id: "cpd", label: "CPD record updates", state: notifCpd, setter: setNotifCpd },
      { id: "community", label: "Community replies", state: notifCommunity, setter: setNotifCommunity },
      { id: "mats", label: "Materials updates", state: notifMaterials, setter: setNotifMaterials },
      { id: "live", label: "Live session reminders", state: notifLiveSessions, setter: setNotifLiveSessions },
      { id: "offline", label: "Offline sync updates", state: notifOfflineSync, setter: setNotifOfflineSync }
    ];

    return (
      <div id={`${idPrefix}-notification-preferences-section`} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 text-left">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 font-sans">Notification Preferences</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Choose which learner reminders appear in your workspace.
          </p>
        </div>

        <form onSubmit={handleSaveNotifPrefs} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-xs text-left">
                <span className="text-xs font-semibold text-slate-800">{item.label}</span>
                <div className="self-end min-[380px]:self-auto shrink-0">
                  <Toggle checked={item.state} onChange={item.setter} id={`${idPrefix}-toggle-notif-${item.id}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-emerald-900 text-white hover:bg-emerald-850 text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] shadow-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <Save className="h-4 w-4" />
              <span>Save Notifications</span>
            </button>
          </div>
        </form>
      </div>
    );
  };

  // 6. Accessibility Preferences ( Visibly updated, soft row layout )
  const renderAccessibilityPreferencesCard = (idPrefix: string) => {
    const items = [
      { id: "text", label: "Readable text size", state: accessReadableText, setter: setAccessReadableText },
      { id: "contrast", label: "Clear contrast mode", state: accessContrast, setter: setAccessContrast },
      { id: "motion", label: "Reduced motion", state: accessReducedMotion, setter: setAccessReducedMotion },
      { id: "cards", label: "Compact cards", state: accessCompactCards, setter: setAccessCompactCards },
      { id: "targets", label: "Large tap targets", state: accessLargeTapTargets, setter: setAccessLargeTapTargets },
      { id: "layout", label: "Simplified lesson layout", state: accessSimplifiedLayout, setter: setAccessSimplifiedLayout }
    ];

    return (
      <div id={`${idPrefix}-accessibility-preferences-section`} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 text-left">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 font-sans">Accessibility Preferences</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Adjust the learner workspace display to support comfortable learning.
          </p>
        </div>

        <form onSubmit={handleSaveAccessPrefs} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl shadow-xs text-left">
                <span className="text-xs font-semibold text-slate-800">{item.label}</span>
                <div className="self-end min-[380px]:self-auto shrink-0">
                  <Toggle checked={item.state} onChange={item.setter} id={`${idPrefix}-toggle-access-${item.id}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-emerald-900 text-white hover:bg-emerald-850 text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] shadow-xs flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <Save className="h-4 w-4" />
              <span>Save Accessibility</span>
            </button>
          </div>
        </form>
      </div>
    );
  };

  // 7. Privacy & Device Data Section
  const renderPrivacyDeviceDataCard = () => {
    const dataItems = [
      { label: "Offline downloads", value: "5 packs saved" },
      { label: "Pending sync", value: "2 items" },
      { label: "Saved drafts", value: "1 assessment draft" },
      { label: "Last sync", value: "Today, 10:42 AM" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 text-left">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-slate-900 font-sans">Privacy & Device Data</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Manage local drafts, offline downloads, and saved learning data on this device.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {dataItems.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2.5 border-b border-slate-100 last:border-0 text-xs">
              <span className="text-slate-500 font-medium font-sans">{item.label}</span>
              <span className="font-semibold text-slate-800">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={() => navigateTo("/learner/offline")}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer min-h-[38px]"
          >
            Open Offline Centre
          </button>
          <button
            onClick={handleExportLocalDrafts}
            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer min-h-[38px]"
          >
            Export Local Drafts
          </button>
          <button
            onClick={handleClearOfflineData}
            className="bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer min-h-[38px]"
          >
            Clear Offline Data
          </button>
        </div>
      </div>
    );
  };

  // 8. Account Actions Card
  const renderAccountActionsCard = () => {
    const actions = [
      { label: "Open Support", path: "/learner/support" as const },
      { label: "View Notifications", path: "/learner/notifications" as const },
      { label: "View Resources", path: "/learner/resources" as const }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-left">
        <h3 className="text-base font-semibold text-slate-900 font-sans">Account Actions</h3>

        <div className="space-y-2 pt-1">
          {actions.map((act, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(act.path)}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/60 border border-slate-150 rounded-xl transition-all cursor-pointer text-left"
            >
              <span className="text-xs font-semibold text-slate-805">{act.label}</span>
              <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
            </button>
          ))}

          <button
            onClick={() => setShowSignOutModal(true)}
            className="w-full flex items-center justify-between p-3.5 bg-red-50/20 hover:bg-red-50/50 border border-red-100 rounded-xl transition-all cursor-pointer text-left group"
          >
            <span className="text-xs font-semibold text-red-650 group-hover:text-red-700">Sign Out</span>
            <LogOut className="h-4 w-4 text-red-400 shrink-0 group-hover:text-red-500" />
          </button>
        </div>
      </div>
    );
  };

  // 9. Account Safety Card (No harsh borders, updated layout)
  const renderAccountSafetyCard = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 text-left">
        <div className="flex items-center gap-2">
          <Shield className="h-4.5 w-4.5 text-emerald-800 shrink-0" />
          <h3 className="text-base font-semibold text-slate-900 font-sans">Account Safety</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Do not share passwords, verification codes, reset links, or private credentials in community discussions or support requests.
        </p>

        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5 text-xs text-slate-650">
          <div className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
            <span>Keep login details private.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
            <span>Use learner support for private concerns.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
            <span>Report anything that feels unsafe or inappropriate.</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigateTo("/learner/support")}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer min-h-[40px] flex items-center justify-center shadow-xs"
          >
            Open Support
          </button>
        </div>
      </div>
    );
  };

  // -------------------------------------------------------------------------
  // RIGHT COLUMN COMPONENT RENDERERS
  // -------------------------------------------------------------------------

  // Card 1: Profile Status
  const renderProfileStatusCard = () => {
    const rows = [
      { label: "Learner status", value: "Active", isGreen: true },
      { label: "Current pathway", value: "Youth Employability Pathway" },
      { label: "Current course", value: "Work Readiness Foundation" },
      { label: "Facilitator", value: "Halima Sani" },
      { label: "Low-bandwidth mode", value: "Enabled", isGreen: true }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider font-sans">
          Profile Status
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {rows.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2.5 gap-2">
              <span className="text-slate-500 shrink-0 font-medium font-sans">{item.label}</span>
              <span className={`font-medium text-right truncate max-w-[170px] ${
                item.isGreen ? "text-emerald-800 font-semibold" : "text-slate-800"
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Card 2: Certificate & CPD Record
  const renderCertCpdRecordCard = () => {
    const rows = [
      { label: "Certificate", value: "Work Readiness Certificate" },
      { label: "Status", value: "Ready for review", isAmber: true },
      { label: "CPD progress", value: "22 of 35 credits" },
      { label: "Pending CPD", value: "4 credits" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-sm font-semibold text-slate-900 font-sans">
          Certificate & CPD Record
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {rows.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2.5 gap-2">
              <span className="text-slate-500 shrink-0 font-medium font-sans">{item.label}</span>
              <span className={`font-medium text-right ${
                item.isAmber ? "text-amber-700 font-semibold" : "text-slate-805"
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={() => navigateTo("/learner/cpd-record" as any)}
            className="w-full bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all text-center cursor-pointer min-h-[38px] flex items-center justify-center shadow-xs"
          >
            View Certificate Record
          </button>
        </div>
      </div>
    );
  };

  // Card 3: Current Learning
  const renderCurrentLearningCard = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-sm font-semibold text-slate-900 font-sans">
          Current Learning
        </h3>

        <div className="divide-y divide-slate-100 text-xs space-y-2 pb-2">
          <div className="py-2.5">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wide font-semibold font-sans">Course</span>
            <span className="font-semibold text-slate-900 block mt-0.5 truncate">Work Readiness Foundation</span>
          </div>
          <div className="py-2.5">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wide font-semibold font-sans">Current Lesson</span>
            <span className="font-medium text-slate-805 block mt-0.5 truncate">Preparing for Interviews</span>
          </div>
          <div className="py-2.5">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wide font-semibold font-sans">Assessment</span>
            <span className="font-medium text-slate-805 block mt-0.5 truncate">Work Readiness Assignment</span>
          </div>
          <div className="py-2.5">
            <span className="text-slate-500 block text-[10px] uppercase tracking-wide font-semibold font-sans">Live Session</span>
            <span className="font-medium text-slate-805 block mt-0.5 truncate">Interview Practice Clinic</span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium font-sans">Progress</span>
            <span className="font-semibold text-slate-900">42%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-800 h-1.5 rounded-full" style={{ width: "42%" }} />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
            className="w-full bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all text-center cursor-pointer min-h-[38px] flex items-center justify-center shadow-xs"
          >
            Continue Lesson
          </button>
          <button
            onClick={() => navigateTo("/learner/assessments/work-readiness-assessment" as any)}
            className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all text-center cursor-pointer min-h-[38px] flex items-center justify-center shadow-xs"
          >
            Open Assessment
          </button>
        </div>
      </div>
    );
  };

  // Card 4: Offline & Bandwidth
  const renderOfflineBandwidthCard = () => {
    const rows = [
      { label: "Low-bandwidth mode", value: "Enabled", isGreen: true },
      { label: "Downloaded packs", value: "5 packs" },
      { label: "Pending sync", value: "2 items" },
      { label: "Storage used", value: "248 MB" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider font-sans">
          Offline & Bandwidth
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {rows.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2.5 gap-2">
              <span className="text-slate-500 shrink-0 font-medium font-sans">{item.label}</span>
              <span className={`font-medium text-right ${
                item.isGreen ? "text-emerald-800 font-semibold" : "text-slate-800"
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigateTo("/learner/low-bandwidth" as any)}
          className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-200 transition-all text-center cursor-pointer min-h-[36px] flex items-center justify-center"
        >
          Open Low-Bandwidth Mode
        </button>
      </div>
    );
  };

  // Card 5: Quick Actions Shortcuts
  const renderQuickActionsCard = () => {
    const actions = [
      { label: "My Journey", path: "/learner/journey" as const, icon: Compass },
      { label: "My Courses", path: "/learner" as const, icon: BookOpen },
      { label: "Assessment", path: "/learner/assessments/work-readiness-assessment" as const, icon: FileText },
      { label: "Live Session", path: "/learner/live-sessions/interview-practice-clinic" as any, icon: Users },
      { label: "CPD Record", path: "/learner/cpd-record" as const, icon: Award },
      { label: "Support", path: "/learner/support" as const, icon: HelpCircle }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3.5 text-left">
        <h3 className="text-sm font-semibold text-slate-900 font-sans">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={() => navigateTo(act.path)}
                className="flex flex-col items-center justify-center p-3.5 bg-slate-50 hover:bg-emerald-50/40 border border-slate-200 rounded-xl transition-all cursor-pointer text-center group gap-1.5"
              >
                <div className="p-1 text-slate-500 group-hover:text-emerald-900 shrink-0">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-[11px] font-semibold text-slate-800 group-hover:text-emerald-950 transition-colors">
                  {act.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Card 6: Support Center Card
  const renderSupportCenterCard = () => {
    return <LearnerSupportCard />;
  };

  // -------------------------------------------------------------------------
  // MOBILE-SPECIFIC SUB-RENDERERS FOR PREMIUM MOBILE PROFILE EXPERIENCE
  // -------------------------------------------------------------------------

  const renderMobileProfileHeroCard = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-left space-y-4">
        {/* Top Row: Avatar on left, name/status on right */}
        <div className="flex items-start gap-3.5">
          <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-lg border border-emerald-100 shrink-0 shadow-xs">
            AM
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-900">Aisha Mohammed</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active learner
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Youth Employability Pathway learner
            </p>
          </div>
        </div>

        {/* Metadata Rows */}
        <div className="space-y-1.5 pt-1.5 text-xs text-slate-600 border-t border-slate-100">
          <div className="flex justify-between">
            <span className="text-slate-400">Learner ID</span>
            <span className="font-semibold text-slate-800">SUST-LRN-0442</span>
          </div>
          <div className="flex justify-between items-start gap-4">
            <span className="text-slate-400 shrink-0">Cohort</span>
            <span className="font-medium text-slate-800 text-right">Kano Youth Employability Cohort 02</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={handleEditPreferencesScroll}
            className="w-full bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-semibold h-12 rounded-2xl transition-all shadow-sm cursor-pointer flex items-center justify-center border-none"
          >
            Edit Preferences
          </button>
          <button
            onClick={() => navigateTo("/learner/cpd-record")}
            className="w-full bg-slate-50/50 hover:bg-slate-100/50 border border-slate-200 text-emerald-800 text-xs font-semibold h-12 rounded-2xl transition-all shadow-sm cursor-pointer flex items-center justify-center"
          >
            Certificate Record
          </button>
        </div>
      </div>
    );
  };

  const renderMobileLearningIdentityCard = () => {
    return (
      <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-2xl p-5 text-left shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
              Learning Identity
            </span>
            <h4 className="text-base font-bold tracking-tight text-white">Youth Employability Pathway</h4>
          </div>
          <span className="bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-800/40 text-emerald-300 font-semibold text-[10px] shrink-0 mt-0.5">
            Review pending
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-emerald-900/60">
          <div>
            <span className="text-emerald-300 block text-[10px]">Course</span>
            <span className="font-semibold text-white mt-0.5 block">Work Readiness Foundation</span>
          </div>
          <div>
            <span className="text-emerald-300 block text-[10px]">CPD Progress</span>
            <span className="font-semibold text-white mt-0.5 block">22 of 35 credits</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigateTo("/learner/cpd-record")}
            className="w-full bg-emerald-900/70 hover:bg-emerald-900 text-emerald-100 hover:text-white border border-emerald-800/40 text-xs font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <span>View CPD Record</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  };

  const renderMobileProgressSnapshot = () => {
    const snapshots = [
      {
        title: "Current Course",
        value: "Work Readiness",
        sub: "42% progress",
        icon: BookOpen,
        iconColor: "text-blue-600 bg-blue-50"
      },
      {
        title: "CPD Credits",
        value: "22 of 35",
        sub: "4 pending",
        icon: Award,
        iconColor: "text-amber-600 bg-amber-50"
      },
      {
        title: "Certificate",
        value: "Ready for review",
        sub: "Not issued yet",
        icon: CheckCircle,
        iconColor: "text-emerald-600 bg-emerald-50"
      },
      {
        title: "Low-Bandwidth",
        value: "Enabled",
        sub: "5 packs offline",
        icon: Wifi,
        iconColor: "text-indigo-600 bg-indigo-50"
      }
    ];

    return (
      <div className="grid grid-cols-2 gap-3 text-left">
        {snapshots.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3.5 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg shrink-0 ${item.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-slate-500">{item.title}</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900 leading-tight">{item.value}</h4>
                <p className="text-[10px] text-slate-500 font-medium">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMobileQuickActionsGrid = () => {
    const actions = [
      { label: "My Journey", path: "/learner/journey" as const, icon: Compass, iconBg: "bg-teal-50 text-teal-700" },
      { label: "Courses", path: "/learner/courses" as any, icon: BookOpen, iconBg: "bg-emerald-50 text-emerald-700" },
      { label: "Assessment", path: "/learner/assessments/work-readiness-assessment" as const, icon: FileText, iconBg: "bg-violet-50 text-violet-700" },
      { label: "Live Session", path: "/learner/live-sessions/interview-practice-clinic" as any, icon: Users, iconBg: "bg-rose-50 text-rose-700" },
      { label: "Offline Centre", path: "/learner/offline" as any, icon: Download, iconBg: "bg-blue-50 text-blue-700" },
      { label: "Support", path: "/learner/support" as const, icon: HelpCircle, iconBg: "bg-amber-50 text-amber-700" }
    ];

    return (
      <div className="space-y-3 text-left">
        <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={() => navigateTo(act.path)}
                className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-xs text-left group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 ${act.iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {act.label}
                  </span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMobileCurrentLearningCard = () => {
    const rows = [
      { label: "Course", value: "Work Readiness Foundation" },
      { label: "Lesson", value: "Preparing for Interviews" },
      { label: "Assessment", value: "Work Readiness Assignment" },
      { label: "Live Session", value: "Interview Practice Clinic" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-sm font-bold text-slate-900">Current Learning</h3>

        <div className="divide-y divide-slate-100 text-xs">
          {rows.map((row, idx) => (
            <div key={idx} className="py-2.5 first:pt-0 last:pb-0">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{row.label}</span>
              <span className="font-medium text-slate-800 block mt-0.5 truncate">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
            className="w-full bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            Continue Lesson
          </button>
          <button
            onClick={() => navigateTo("/learner/assessments/work-readiness-assessment")}
            className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            Open Assessment
          </button>
        </div>
      </div>
    );
  };

  const renderMobileCertCpdCard = () => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-sm font-bold text-slate-900">Certificate & CPD</h3>

        <div className="space-y-3.5">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Certificate</span>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-800 text-xs">Work Readiness Certificate</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-850 border border-amber-100">
                Ready for review
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">CPD Progress (22 of 35 credits)</span>
              <span className="font-semibold text-slate-800">63%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-800 h-2 rounded-full" style={{ width: "63%" }} />
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              4 credits are currently pending review
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => navigateTo("/learner/cpd-record")}
            className="w-full bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            View Certificate Record
          </button>
          <button
            onClick={() => navigateTo("/learner/cpd-record")}
            className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            View CPD Details
          </button>
        </div>
      </div>
    );
  };

  const renderMobilePreferencesHub = () => {
    const hubItems = [
      {
        id: "learning",
        title: "Learning Preferences",
        desc: "Low-bandwidth, auto-save, reminders",
        icon: Sliders,
        iconBg: "bg-emerald-50 text-emerald-700",
        targetId: "mobile-learning-preferences-section"
      },
      {
        id: "notifications",
        title: "Notifications",
        desc: "Lessons, assessments, CPD, community",
        icon: Bell,
        iconBg: "bg-blue-50 text-blue-700",
        targetId: "mobile-notification-preferences-section"
      },
      {
        id: "accessibility",
        title: "Accessibility",
        desc: "Readable text, reduced motion, compact cards",
        icon: Eye,
        iconBg: "bg-indigo-50 text-indigo-700",
        targetId: "mobile-accessibility-preferences-section"
      }
    ];

    const handleHubScroll = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        showToast("Scrolled to preferences section.", "info");
      }
    };

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900">Preferences</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Manage learning, notification, and accessibility options.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {hubItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleHubScroll(item.targetId)}
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/60 border border-slate-150 rounded-xl transition-all cursor-pointer text-left group gap-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-xl shrink-0 ${item.iconBg}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-xs font-semibold text-slate-800 block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal block truncate">
                      {item.desc}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMobileOfflineBandwidthCard = () => {
    const rows = [
      { label: "Low-bandwidth mode", value: "Enabled", isTag: true },
      { label: "Downloaded packs", value: "5 packs" },
      { label: "Pending sync", value: "2 items" },
      { label: "Storage used", value: "248 MB" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-sm font-bold text-slate-900">Offline & Bandwidth</h3>

        <div className="divide-y divide-slate-100 text-xs">
          {rows.map((row, idx) => (
            <div key={idx} className="flex justify-between py-2.5 first:pt-0 last:pb-0 items-center">
              <span className="text-slate-500 font-medium">{row.label}</span>
              {row.isTag ? (
                <span className="bg-emerald-50 text-emerald-805 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {row.value}
                </span>
              ) : (
                <span className="font-semibold text-slate-800">{row.value}</span>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => navigateTo("/learner/offline")}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            Open Offline Centre
          </button>
          <button
            onClick={() => navigateTo("/learner/low-bandwidth")}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            Open Low-Bandwidth Mode
          </button>
        </div>
      </div>
    );
  };

  const renderMobilePrivacyDeviceDataCard = () => {
    const rows = [
      { label: "Offline downloads", value: "5 packs saved" },
      { label: "Pending sync", value: "2 items" },
      { label: "Saved drafts", value: "1 assessment draft" },
      { label: "Last sync", value: "Today, 10:42 AM" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900">Privacy & Device Data</h3>
          <p className="text-xs text-slate-500 leading-normal">
            Manage local drafts, offline downloads, and saved learning data on this device.
          </p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {rows.map((row, idx) => (
            <div key={idx} className="flex justify-between py-2.5 first:pt-0 last:pb-0 items-center">
              <span className="text-slate-500 font-medium">{row.label}</span>
              <span className="font-semibold text-slate-800">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <button
            onClick={handleExportLocalDrafts}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            Export Local Drafts
          </button>
          <button
            onClick={handleClearOfflineData}
            className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50/50 text-xs font-semibold h-10 rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer"
          >
            Clear Offline Data
          </button>
        </div>
      </div>
    );
  };

  const renderMobileSupportAccountCard = () => {
    const items = [
      { label: "Open Support", path: "/learner/support" as const, icon: HelpCircle, iconBg: "bg-emerald-50 text-emerald-800" },
      { label: "View Notifications", path: "/learner/notifications" as const, icon: Bell, iconBg: "bg-blue-50 text-blue-800" },
      { label: "View Resources", path: "/learner/resources" as const, icon: BookOpen, iconBg: "bg-violet-50 text-violet-800" }
    ];

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 text-left">
        <h3 className="text-sm font-bold text-slate-900">Support & Account</h3>

        <div className="space-y-2">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => navigateTo(item.path)}
                className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/60 border border-slate-150 rounded-xl transition-all cursor-pointer text-left group gap-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-1.5 rounded-lg shrink-0 ${item.iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 block">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}

          <button
            onClick={() => setShowSignOutModal(true)}
            className="w-full flex items-center justify-between p-3 bg-red-50/20 hover:bg-red-50/40 border border-red-100 rounded-xl transition-all cursor-pointer text-left group gap-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 rounded-lg bg-red-50 text-red-700 shrink-0">
                <LogOut className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-red-650 group-hover:text-red-700 block">
                Sign Out
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-red-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    );
  };


  // -------------------------------------------------------------------------
  // MAIN SCENARIOS RENDERING BY VIEWPORT
  // -------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Toast Notification Container */}
      {toast && (
        <div 
          id="profile-toast"
          className="fixed top-4 right-4 z-55 flex items-center gap-3 bg-slate-900 text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm text-left"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="flex-1 leading-normal">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:text-slate-300 transition-colors p-1 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Confirmation Modal: Reset Preferences */}
      {showResetModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-55 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl text-left space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 font-sans">Reset Learning Preferences</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to restore learning preferences to their default states? Any custom switches will be reverted.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleResetLearningPrefs}
                className="bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] flex-1"
              >
                Yes, Reset Preferences
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Sign Out */}
      {showSignOutModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-55 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl text-left space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 font-sans">Sign Out of Workspace</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to sign out of the SUSTAIN LMS learner dashboard? You will need to log back in to access your pathway.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setShowSignOutModal(false);
                  navigateTo("/login");
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] flex-1 text-center"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowSignOutModal(false)}
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer min-h-[40px] flex-1 text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {/* -------------------------------------------------------------------------
          A. DESKTOP VIEWPORT LAYOUT (hidden lg:flex)
          ------------------------------------------------------------------------- */}
      <div className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950">
        <LearnerSidebar />

        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Top Header */}
          <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-40 shrink-0">
            <div className="relative w-96">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search profile settings, preferences, certificates..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 text-slate-850 text-sm rounded-xl focus:outline-hidden focus:ring-1 focus:ring-emerald-900 focus:border-emerald-900 focus:bg-white transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-5">
              <button 
                onClick={() => navigateTo("/learner/notifications")}
                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition-colors relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              </button>
              <button 
                onClick={() => navigateTo("/learner/support")}
                className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              
              <div className="h-8 w-px bg-slate-200" />
              
              <button 
                onClick={() => navigateTo("/learner/profile")}
                className="flex items-center gap-3 text-left focus:outline-hidden group hover:opacity-90 transition-opacity cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-none group-hover:text-emerald-900">
                    Aisha Mohammed
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">
                    SUST-LRN-0442
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm">
                  AM
                </div>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-8 overflow-y-auto space-y-8">
            <div className="space-y-1 text-left">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Youth Employability Pathway / Profile Settings
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
                Learner Profile & Preferences
              </h2>
              <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-3xl mt-1">
                Manage your learning identity, bandwidth modes, interface preferences, notifications, and accessibility options.
              </p>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
              {/* Left major content columns */}
              <div className="space-y-6">
                {renderProfileSummaryCard()}
                {renderProfileInsightCards()}
                {renderLearningIdentityCard()}
                {renderLearningPreferencesCard("desktop")}
                {renderNotificationPreferencesCard("desktop")}
                {renderAccessibilityPreferencesCard("desktop")}
                {renderPrivacyDeviceDataCard()}
                {renderAccountSafetyCard()}
              </div>

              {/* Right utility columns */}
              <div className="space-y-6 shrink-0">
                {renderProfileStatusCard()}
                {renderCertCpdRecordCard()}
                {renderCurrentLearningCard()}
                {renderOfflineBandwidthCard()}
                {renderQuickActionsCard()}
                {renderSupportCenterCard()}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* -------------------------------------------------------------------------
          B. TABLET VIEWPORT LAYOUT (hidden md:block lg:hidden)
          ------------------------------------------------------------------------- */}
      <div className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
        <header className="h-14 px-6 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold tracking-tight text-slate-900 font-heading">SUSTAIN LMS</h1>
            <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              Learner
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-lg relative cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </button>
            <div className="h-7 w-px bg-slate-200" />
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="flex items-center gap-2 text-left focus:outline-none cursor-pointer"
            >
              <span className="text-xs font-bold text-slate-855">Aisha M.</span>
              <div className="h-8 w-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                AM
              </div>
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-5 py-6 space-y-6">
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Youth Employability Pathway / Profile
            </p>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 font-sans">Learner Profile & Preferences</h2>
            <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1">
              Manage your learning identity, bandwidth modes, interface preferences, notifications, and accessibility options.
            </p>
          </div>

          <div className="space-y-6">
            {renderProfileSummaryCard()}
            {renderProfileInsightCards()}
            {renderLearningIdentityCard()}
            {renderLearningPreferencesCard("tablet")}
            {renderNotificationPreferencesCard("tablet")}
            {renderAccessibilityPreferencesCard("tablet")}
            {renderPrivacyDeviceDataCard()}
            {renderAccountActionsCard()}
            
            {/* Status & Support Widgets */}
            <div className="grid grid-cols-2 gap-4">
              {renderProfileStatusCard()}
              {renderOfflineBandwidthCard()}
            </div>
            {renderCertCpdRecordCard()}
            {renderCurrentLearningCard()}
            {renderQuickActionsCard()}
            {renderSupportCenterCard()}
            {renderAccountSafetyCard()}
          </div>
        </main>

        <LearnerMobileNav />
      </div>

      {/* -------------------------------------------------------------------------
          C. MOBILE VIEWPORT LAYOUT (md:hidden)
          ------------------------------------------------------------------------- */}
      <div className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
        {/* 1. Mobile topbar */}
        <header className="h-14 px-4 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-slate-900 font-heading">SUSTAIN LMS</h1>
            <span className="bg-emerald-50 text-emerald-800 text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider border border-emerald-100">
              Learner
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 hover:bg-slate-50 text-slate-500 rounded-lg relative cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-xs shadow-sm border border-emerald-800/20">
                AM
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Main Contents Stacking (Strictly following requested order) */}
        <main className="px-4 py-4 space-y-5">
          {/* Header Title */}
          <div className="space-y-0.5 text-left px-1">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Learner Workspace</span>
            <h2 className="text-lg font-bold text-slate-950 font-sans">Profile & Preferences</h2>
          </div>

          <div className="space-y-5">
            {/* 2. Compact profile hero card */}
            {renderMobileProfileHeroCard()}

            {/* 3. Learning identity highlight card */}
            {renderMobileLearningIdentityCard()}

            {/* 4. Profile progress snapshot */}
            {renderMobileProgressSnapshot()}

            {/* 5. Quick actions grid */}
            {renderMobileQuickActionsGrid()}

            {/* 6. Current learning card */}
            {renderMobileCurrentLearningCard()}

            {/* 7. Certificate & CPD card */}
            {renderMobileCertCpdCard()}

            {/* 8. Preferences hub */}
            {renderMobilePreferencesHub()}

            {/* 9. Offline & bandwidth card */}
            {renderMobileOfflineBandwidthCard()}

            {/* 10. Privacy & device data */}
            {renderMobilePrivacyDeviceDataCard()}

            {/* 11. Support and account actions */}
            {renderMobileSupportAccountCard()}

            {/* Detailed Scroll-Target Preference Sections */}
            <div className="pt-6 border-t border-slate-200/60 space-y-5">
              <div className="px-1 text-left">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Configure Specific Rules</h4>
              </div>
              {renderLearningPreferencesCard("mobile")}
              {renderNotificationPreferencesCard("mobile")}
              {renderAccessibilityPreferencesCard("mobile")}
              {renderAccountSafetyCard()}
            </div>
          </div>
        </main>

        {/* 12. Bottom navigation */}
        <LearnerMobileNav />
      </div>

    </div>
  );
}
