import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { Card } from "../../components/ui/Card";
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, User, KeyRound, Globe } from "lucide-react";

export function OnboardingPage() {
  const { navigateTo, showToast } = useRoute();
  const [code, setCode] = useState("");
  const [emailOrId, setEmailOrId] = useState("");
  const [step, setStep] = useState(1); // 1 = Enter Code, 2 = Confirm Profile & Continue
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Inferred state from code input
  const [detectedRole, setDetectedRole] = useState<"learner" | "facilitator" | "admin">("learner");
  const [cohortName, setCohortName] = useState("");
  const [profileName, setProfileName] = useState("Aisha Mohammed");

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter your invitation or programme code.");
      return;
    }

    const cleanCode = code.trim().toUpperCase();

    if (cleanCode.includes("FAC") || cleanCode === "SUST-FAC-9921") {
      setDetectedRole("facilitator");
      setCohortName("Kano Youth Agribusiness Cohort 02 (Facilitator)");
      setProfileName("Cohort Facilitator");
      setStep(2);
    } else if (cleanCode.includes("PROG") || cleanCode.includes("AUTH") || cleanCode === "SUST-PROG-AUTH") {
      setDetectedRole("admin");
      setCohortName("National Coordinating Hub (Programme Team)");
      setProfileName("Programme Coordinator");
      setStep(2);
    } else {
      // Default or learner code
      setDetectedRole("learner");
      setCohortName("Kano Youth Agribusiness Cohort 02");
      setProfileName("Aisha Mohammed");
      setStep(2);
    }
  };

  const handleCompleteSetup = () => {
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      if (detectedRole === "learner") {
        showToast("Setup completed! Welcome to your learning pathway.");
        navigateTo("/learner");
      } else if (detectedRole === "facilitator") {
        showToast("Setup completed! Loading facilitator workspace.");
        navigateTo("/facilitator/dashboard");
      } else if (detectedRole === "admin") {
        setError("Programme Team self-registration requires manual authorization from the National Hub Coordinating Hub.");
      }
    }, 1200);
  };

  return (
    <div id="onboarding-page" className="space-y-6 text-left">
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold text-slate-900 font-heading tracking-tight">
          Complete your SUSTAIN setup
        </h2>
        <p className="text-xs text-slate-650 leading-relaxed font-medium">
          Connect your account to your assigned learning pathway or workspace.
        </p>
      </div>

      {/* Static Visual Step Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
          step === 1 ? "bg-emerald-50/40 border-emerald-200" : "bg-white border-slate-100/80 opacity-60"
        }`}>
          <div className="flex items-center gap-2">
            <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step > 1 ? "bg-emerald-900 text-white" : "bg-emerald-50 text-emerald-900"
            }`}>
              1
            </span>
            <span className="text-[10px] font-bold text-slate-800">Confirm Code</span>
          </div>
          <p className="text-[9px] text-slate-500 font-medium leading-tight">
            Use the code shared by your coordinator.
          </p>
        </div>

        <div className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
          step === 2 ? "bg-emerald-50/40 border-emerald-200" : "bg-white border-slate-100/80 opacity-60"
        }`}>
          <div className="flex items-center gap-2">
            <span className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step > 2 ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-600"
            }`}>
              2
            </span>
            <span className="text-[10px] font-bold text-slate-800">Review Profile</span>
          </div>
          <p className="text-[9px] text-slate-500 font-medium leading-tight">
            Check your name, email, and assigned cohort.
          </p>
        </div>

        <div className="p-3 rounded-xl border text-left bg-white border-slate-100/80 opacity-60 space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-4.5 w-4.5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold">
              3
            </span>
            <span className="text-[10px] font-bold text-slate-800">Workspace</span>
          </div>
          <p className="text-[9px] text-slate-500 font-medium leading-tight">
            Continue to your assigned space.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50/80 border border-red-100/70 text-red-800 text-xs rounded-xl font-medium leading-relaxed">
          {error}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          {/* Invitation or Programme Code */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Invitation or programme code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. SUST-KANO-02 or SUST-FAC-9921"
              className="w-full px-3.5 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 text-slate-900 placeholder-slate-400 font-medium transition-all"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Enter the unique code issued to your cohort or workspace team.
            </span>
          </div>

          {/* Email or Learner ID if needed (Optional) */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Email or learner ID <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
              placeholder="Email address or learner ID"
              className="w-full px-3.5 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 text-slate-900 placeholder-slate-400 font-medium transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[46px] bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer mt-3 flex items-center justify-center gap-1.5 shadow-xs"
          >
            Continue Setup
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <div className="space-y-5">
          {/* Profile Confirmation Card */}
          <Card className="p-5 bg-slate-50/50 border border-slate-200/80 rounded-2xl space-y-4 text-xs font-medium text-slate-600">
            <h3 className="text-slate-800 font-bold border-b border-slate-150 pb-2 flex items-center gap-1.5">
              <User className="h-4 w-4 text-emerald-800" />
              Inferred Account Profile
            </h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Name</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{profileName}</span>
              </div>
              
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Assigned Cohort / Workspace</span>
                <span className="font-bold text-emerald-900 mt-0.5 block">{cohortName}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Setup Access Level</span>
                <span className="font-bold text-slate-900 mt-0.5 block uppercase">
                  {detectedRole === "learner" && "Cohort Learner"}
                  {detectedRole === "facilitator" && "Regional Review Facilitator"}
                  {detectedRole === "admin" && "National Hub Administrator"}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 h-[46px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-750 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Change Code
            </button>
            <button
              type="button"
              onClick={handleCompleteSetup}
              disabled={isLoading}
              className="flex-1 h-[46px] bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Configuring Workspace...
                </>
              ) : (
                <>
                  Confirm & Go to Workspace
                  <ArrowRight className="h-4 w-4 text-emerald-300" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Helper Footer Link */}
      <div className="text-center text-xs text-slate-500 pt-2 font-medium">
        <button 
          onClick={() => navigateTo("/login")}
          className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Sign In
        </button>
      </div>
    </div>
  );
}
