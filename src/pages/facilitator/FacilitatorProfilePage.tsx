import { useState } from "react";
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Save, 
  Eye, 
  ChevronRight, 
  Info, 
  Users, 
  CheckCircle, 
  Check, 
  Download, 
  Mail, 
  Phone, 
  Edit2, 
  ShieldCheck, 
  Star, 
  Layers, 
  LayoutDashboard, 
  ArrowLeft,
  Lock,
  Globe,
  MapPin,
  Sparkles
} from "lucide-react";
import { useRoute, RoutePath } from "../../context/RouteContext";

export function FacilitatorProfilePage() {
  const { navigateTo, showToast } = useRoute();

  // Local state for interactive form fields & toggles
  const [firstName, setFirstName] = useState("Halima");
  const [lastName, setLastName] = useState("Sani");
  const [displayName, setDisplayName] = useState("Halima Sani");
  const [role, setRole] = useState("Facilitator");
  const [organisation, setOrganisation] = useState("Kano Youth Skills Hub");
  const [stateLga, setStateLga] = useState("Kano / Tarauni");
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  const [jobTitle, setJobTitle] = useState("Senior Agribusiness Facilitator");
  const [bio, setBio] = useState("Specialist in sustainable crop management and supply chain logistics for Northern Nigeria.");

  const [email, setEmail] = useState("halima.sani@sustain.edu.ng");
  const [phone, setPhone] = useState("+234 803 123 4567");
  const [contactMethod, setContactMethod] = useState("Platform Notifications (Primary)");

  // Availability Toggles
  const [acceptingCohorts, setAcceptingCohorts] = useState(true);
  const [availableMessaging, setAvailableMessaging] = useState(true);

  // Notification Toggles
  const [notifLearnerQuestion, setNotifLearnerQuestion] = useState(true);
  const [notifAssessmentSubmissions, setNotifAssessmentSubmissions] = useState(true);
  const [notifMarketingUpdates, setNotifMarketingUpdates] = useState(false);

  // Account Security
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Helper functions for action mappings
  const handleSaveChanges = () => {
    showToast("Profile changes saved locally in this frontend prototype.");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      showToast(`Scrolling to ${id.replace("-", " ")}`);
    }
  };

  const handleUpdatePassword = () => {
    if (!newPassword) {
      showToast("Please enter a new password first.");
      return;
    }
    showToast("Password updated locally in this frontend prototype.");
    setNewPassword("");
  };

  const handle2FAToggle = (val: boolean) => {
    setTwoFactorAuth(val);
    showToast("Two-factor authentication setting updated locally.");
  };

  const handleExportCohort = () => {
    showToast("Cohort performance export simulated in this frontend prototype.");
  };

  const handleViewImpactReport = () => {
    showToast("Annual impact report opened in this frontend prototype.");
  };

  const handleSignOut = () => {
    showToast("Sign out action simulated in this frontend prototype.");
    setTimeout(() => {
      navigateTo("/login");
    }, 1500);
  };

  return (
    <div id="facilitator-profile-page" className="space-y-6 pb-24 lg:pb-12 text-slate-700">
      
      {/* Mobile Back / Header Bar */}
      <div className="lg:hidden flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <button 
          onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Dashboard</span>
        </button>
        <span className="font-bold text-slate-800 text-sm">Profile</span>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => showToast("You have no new notifications.")}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <Bell className="h-4.5 w-4.5" />
          </button>
          <button 
            onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Main Page Header Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start md:items-center gap-5">
          {/* Avatar Container with Verification Badge */}
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
              alt="Halima Sani Avatar"
              referrerPolicy="no-referrer"
              className="h-20 w-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-lg border-2 border-white shadow-xs">
              <Check className="h-3.5 w-3.5 stroke-[3px]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center flex-wrap gap-2">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
                Profile & Account Settings
              </h2>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border border-emerald-100">
                Active
              </span>
            </div>
            
            <p className="text-xs text-slate-500 font-medium">
              <strong className="text-slate-750 font-bold">{firstName} {lastName}</strong> • {organisation} • <span className="text-emerald-700 font-semibold">SUSTAIN CPD Programme</span>
            </p>
            
            <div className="flex items-center gap-2 pt-0.5">
              <span className="bg-emerald-600 text-white text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                {role}
              </span>
              <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Kano Central Hub
              </span>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleSaveChanges}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
          
          <button 
            onClick={() => scrollToSection("programme-support")}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Card 1: Profile Status */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Profile Status</span>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">Complete</h3>
            <p className="text-[10px] text-slate-500 font-medium">3 cohorts | 510 learners</p>
          </div>
        </div>

        {/* Card 2: Assigned Cohorts */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Assigned Cohorts</span>
            <Layers className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">3</h3>
            <p className="text-[10px] text-slate-500 font-medium">12 active modules</p>
          </div>
        </div>

        {/* Card 3: Primary Cohort */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Primary Cohort</span>
            <Star className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight truncate">Kano Cohort 02</h3>
            <p className="text-[10px] text-slate-500 font-medium">Agribusiness track</p>
          </div>
        </div>

        {/* Card 4: Learners Supported */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Learners Supported</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">510</h3>
            <p className="text-[10px] text-slate-500 font-medium">98% response rate</p>
          </div>
        </div>

        {/* Card 5: Role Access */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Role Access</span>
            <Shield className="h-4 w-4 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">Facilitator</h3>
            <p className="text-[10px] text-slate-500 font-medium">Reviewer authorized</p>
          </div>
        </div>

        {/* Card 6: Account Security */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Account Security</span>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">Active</h3>
            <p className="text-[10px] text-slate-500 font-medium">2FA secure enabled</p>
          </div>
        </div>

      </div>

      {/* Main Two-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Personal and Role Info */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Personal Information */}
          <div id="personal-info" className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <User className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Personal Information</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">User Details</span>
            </div>

            <div className="p-6 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">First Name</label>
                  <input 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Display Name</label>
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Role</label>
                  <input 
                    type="text" 
                    value={role} 
                    disabled
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Organisation</label>
                  <input 
                    type="text" 
                    value={organisation} 
                    onChange={(e) => setOrganisation(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">State/LGA</label>
                  <input 
                    type="text" 
                    value={stateLga} 
                    onChange={(e) => setStateLga(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Language</label>
                  <select 
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800 bg-white"
                  >
                    <option>English</option>
                    <option>Hausa</option>
                    <option>Yoruba</option>
                    <option>Igbo</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Job Title</label>
                    <input 
                      type="text" 
                      value={jobTitle} 
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bio (Short)</label>
                    <textarea 
                      rows={3}
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Card: Contact Details */}
          <div id="contact-details" className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Contact Details</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Notifications Link</span>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                    <Edit2 className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                    />
                    <Edit2 className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Contact Method</label>
                <select 
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800 bg-white"
                >
                  <option>Platform Notifications (Primary)</option>
                  <option>Direct Email</option>
                  <option>WhatsApp / SMS</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card: Role & Access Limits */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Shield className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Role & Access Limits</h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-lg">
                  Facilitator
                </span>
                <span className="bg-emerald-50 text-emerald-850 text-xs font-bold px-3 py-1 rounded-lg">
                  Assessment Reviewer
                </span>
                <button 
                  onClick={() => showToast("Admin view access is simulated in this frontend prototype.")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-850 underline ml-2 cursor-pointer"
                >
                  Admin View Access
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-4.5 space-y-2.5 text-xs font-medium text-slate-650">
                <p className="font-bold text-slate-500 text-[10px] tracking-wider uppercase">Access Scope</p>
                <div className="space-y-1.5 text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Manage assigned cohorts only (3 total)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Review assessments for assigned learners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Communicate via forum and direct follow-up</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-medium text-slate-400">
                Your access is managed by the SUSTAIN Institutional Admin. Contact HR for role changes.
              </p>
            </div>
          </div>

          {/* Card: Assigned Cohorts */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Layers className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Assigned Cohorts</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Active Tracks</span>
            </div>

            <div className="divide-y divide-slate-100">
              <div 
                onClick={() => navigateTo("/facilitator/cohorts" as RoutePath)}
                className="p-4.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Sustainable Maize Farming 2024-A</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Kano / Kaduna Hubs • Agribusiness core</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>

              <div 
                onClick={() => navigateTo("/facilitator/cohorts" as RoutePath)}
                className="p-4.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Agri-Logistics Masterclass (July)</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Lagos / Ogun Hubs • Commercial operations</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Card: Support Responsibilities */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Support Responsibilities</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Primary Duties</span>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3 p-3 bg-emerald-50/40 border border-emerald-100/50 rounded-xl">
                <HelpCircle className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Daily Learner Q&A Session Management</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Coordinate live messaging support and review unanswered threads.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50/40 border border-emerald-100/50 rounded-xl">
                <CheckCircle className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Weekly Module Assessment Reviews</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Deliver graded assessments and detailed feedback for designated tracks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50/40 border border-emerald-100/50 rounded-xl">
                <Users className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Community Forum Moderation</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Foster healthy conversations and monitor discussions across assigned hubs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Availability & Working Preferences */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Globe className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Availability & Working Preferences</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Workload Status</span>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Accepting New Cohorts</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Allow system to match your profile to newly formed cohorts.</p>
                </div>
                <button 
                  onClick={() => {
                    setAcceptingCohorts(!acceptingCohorts);
                    showToast(`Availability settings updated: ${!acceptingCohorts ? "Accepting" : "Not accepting"} cohorts.`);
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${acceptingCohorts ? "bg-emerald-600" : "bg-slate-250"}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${acceptingCohorts ? "translate-x-5" : ""}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Available for Direct Messaging</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Show "online" status and receive queries from enrolled learners.</p>
                </div>
                <button 
                  onClick={() => {
                    setAvailableMessaging(!availableMessaging);
                    showToast(`Direct messaging status updated: ${!availableMessaging ? "Available" : "Busy"}.`);
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${availableMessaging ? "bg-emerald-600" : "bg-slate-250"}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${availableMessaging ? "translate-x-5" : ""}`} />
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Timezone</label>
                <input 
                  type="text" 
                  value="West Africa Time (WAT) - GMT+1" 
                  disabled
                  className="w-full px-3 py-2 text-xs bg-slate-55 border border-slate-200 rounded-lg font-medium text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Settings & Security & Metadata */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Action Required Sticky Alert */}
          <div className="bg-emerald-800 text-white rounded-2xl p-5 shadow-md space-y-3 border border-emerald-900">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 shrink-0 mt-0.5 text-emerald-350 animate-bounce" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm tracking-tight text-white">Action Required</h4>
                <p className="text-[11px] leading-relaxed text-emerald-100">
                  Ensure your notification settings are optimized for the upcoming 2024 harvest season cohorts.
                </p>
              </div>
            </div>

            <button 
              onClick={() => scrollToSection("notification-settings")}
              className="w-full bg-white text-emerald-800 hover:bg-emerald-50 text-[11px] font-black tracking-wide py-2 rounded-xl transition-all shadow-xs cursor-pointer text-center"
            >
              Review Your Notification Settings
            </button>
          </div>

          {/* Card: Notification Settings */}
          <div id="notification-settings" className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Bell className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Notification Settings</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Preferences</span>
            </div>

            <div className="p-6 space-y-4">
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-xs text-slate-850">New Learner Question</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Real-time alerts for student queries on discussions or Q&A channels.</p>
                </div>
                <button 
                  onClick={() => setNotifLearnerQuestion(!notifLearnerQuestion)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${notifLearnerQuestion ? "bg-emerald-600" : "bg-slate-250"}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifLearnerQuestion ? "translate-x-5" : ""}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Assessment Submissions</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Alert when learner reviews are pending or reassigned back to you.</p>
                </div>
                <button 
                  onClick={() => setNotifAssessmentSubmissions(!notifAssessmentSubmissions)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${notifAssessmentSubmissions ? "bg-emerald-600" : "bg-slate-250"}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifAssessmentSubmissions ? "translate-x-5" : ""}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4 pt-3 border-t border-slate-100">
                <div>
                  <h4 className="font-bold text-xs text-slate-850">Marketing Updates</h4>
                  <p className="text-[10px] text-slate-500 font-medium">News, updates, and surveys from the SUSTAIN LMS platform.</p>
                </div>
                <button 
                  onClick={() => setNotifMarketingUpdates(!notifMarketingUpdates)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${notifMarketingUpdates ? "bg-emerald-600" : "bg-slate-250"}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifMarketingUpdates ? "translate-x-5" : ""}`} />
                </button>
              </div>

            </div>
          </div>

          {/* Card: Communication Channels */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Globe className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Communication Channels</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Integrations</span>
            </div>

            <div className="p-4 space-y-2.5">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-750">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>Email Notifications</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm uppercase tracking-wide">Approved</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-750">
                  <Bell className="h-4 w-4 text-emerald-600" />
                  <span>In-App Chat Alerts</span>
                </div>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm uppercase tracking-wide">Approved</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-750">
                  <Globe className="h-4 w-4 text-slate-400" />
                  <span>SMS Notifications</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">Disabled</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-750">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>WhatsApp Sync</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">Disabled</span>
              </div>
            </div>
          </div>

          {/* Card: Report & Export Access */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Download className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Report & Export Access</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Data Export</span>
            </div>

            <div className="p-5 space-y-3">
              <button 
                onClick={handleExportCohort}
                className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-800 group-hover:text-emerald-800">Export Cohort Performance</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Download complete CSV grades of your matched cohorts.</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button 
                onClick={handleViewImpactReport}
                className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-left transition-all cursor-pointer group shadow-2xs"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-800 group-hover:text-emerald-800">View Annual Impact Report</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Open PDF detailing state-wide agricultural and digital training metrics.</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Card: Account Security */}
          <div id="account-security" className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Lock className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Account Security</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Last updated: 45 days ago</span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword} 
                  disabled
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">New Password</label>
                <input 
                  type="password" 
                  placeholder="Min 8 characters"
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium text-slate-800"
                />
              </div>

              <button 
                onClick={handleUpdatePassword}
                className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-2 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                Update Password
              </button>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-850">Two-Factor Authentication</h4>
                    <p className="text-[9px] text-slate-400 font-medium">Verify login attempts using mobile Authenticator token.</p>
                  </div>
                </div>
                <button 
                  onClick={() => handle2FAToggle(!twoFactorAuth)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${twoFactorAuth ? "bg-emerald-600" : "bg-slate-250"}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${twoFactorAuth ? "translate-x-5" : ""}`} />
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 flex items-start gap-2.5 text-[10px] text-slate-450 leading-relaxed font-medium">
                <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  Your personal data is managed in compliance with Nigeria Data Protection Regulation (NDPR). You have the right to request access to your platform audit logs at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Programme Support */}
          <div id="programme-support" className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Users className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Programme Support</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Helpdesk</span>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50/30 border border-emerald-100/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-sm">
                    LT
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-850">LMS Tech Support</h4>
                    <p className="text-[10px] text-slate-500 font-medium">help@sustain.edu.ng</p>
                  </div>
                </div>
                <a 
                  href="mailto:help@sustain.edu.ng" 
                  className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Email
                </a>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50/30 border border-emerald-100/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-bold text-sm border border-slate-200">
                    IM
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-850">Dr. Ibrahim Musa</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Regional Programme Manager</p>
                  </div>
                </div>
                <button 
                  onClick={() => showToast("Co-director Ibrahim Musa was notified via direct message.")}
                  className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Card: Recent Activity */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <Settings className="h-4.5 w-4.5 text-slate-500" />
                <h3 className="font-extrabold text-sm text-slate-800">Recent Activity</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Audit Logs</span>
            </div>

            <div className="p-5 space-y-4.5 text-xs">
              
              <div className="flex gap-3">
                <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-800">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Account login from Lagos, NG</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Today, 09:24 AM • Chrome/macOS</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-800">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Updated Availability Status</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Yesterday, 11:15 PM • Mobile App</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 bg-emerald-100 p-1 rounded-full text-emerald-800">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Completed 2FA setup</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Oct 24, 2023 • Profile Panel</p>
                </div>
              </div>

            </div>
          </div>

          {/* Sign Out Button */}
          <button 
            onClick={handleSignOut}
            className="w-full bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-bold text-xs py-3 rounded-2xl shadow-3xs transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default FacilitatorProfilePage;
