import { useState, useEffect } from "react";
import { useRoute } from "../../context/RouteContext";
import { Eye, EyeOff, ShieldCheck, KeyRound, HelpCircle, ArrowRight, X } from "lucide-react";

type RoleType = "learner" | "facilitator" | "admin";

export function LoginPage() {
  const { navigateTo, showToast, authRole: role, setAuthRole: setRole } = useRoute();
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Auto-detect role preselection from location hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("role=facilitator")) {
      setRole("facilitator");
    } else if (hash.includes("role=admin")) {
      setRole("admin");
    }
  }, [setRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!emailOrId.trim()) {
      setError("Please enter your registered email address or learner ID.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your account password.");
      return;
    }

    setIsLoading(true);

    // Simulate network authentication delay
    setTimeout(() => {
      setIsLoading(false);
      if (role === "learner") {
        showToast("Logged in successfully as Aisha Mohammed");
        navigateTo("/learner");
      } else if (role === "facilitator") {
        showToast("Logged in successfully as Cohort Facilitator");
        navigateTo("/facilitator/dashboard");
      } else if (role === "admin") {
        setShowAdminModal(true);
      }
    }, 700);
  };

  const handleGoogleSignIn = () => {
    showToast("Google authentication is prepared in this frontend prototype. Connect OAuth before production use.");
  };

  const handleForgotPassword = () => {
    showToast("Password reset link has been dispatched to your registered address.");
  };

  return (
    <div id="login-page" className="space-y-6 text-left">
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold text-slate-900 font-heading tracking-tight">
          Welcome back
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Sign in to continue your learning pathway or workspace.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50/80 border border-red-100/70 text-red-800 text-xs rounded-xl font-medium leading-relaxed">
          {error}
        </div>
      )}

      {/* Google Authentication Option at top of options */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full h-[46px] bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-3xs"
        >
          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-150" />
          <span className="text-xs text-slate-450 font-medium">
            or use your SUSTAIN account
          </span>
          <div className="flex-1 h-px bg-slate-150" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or learner ID */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700">
            Email or learner ID
          </label>
          <input
            type="text"
            value={emailOrId}
            onChange={(e) => {
              const val = e.target.value;
              setEmailOrId(val);
              const valLower = val.toLowerCase().trim();
              if (valLower.includes("facilitator") || valLower.includes("teacher")) {
                setRole("facilitator");
              } else if (valLower.includes("admin") || valLower.includes("prog") || valLower.includes("coordinator")) {
                setRole("admin");
              } else {
                setRole("learner");
              }
            }}
            placeholder="Email address or learner ID"
            className="w-full px-3.5 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 text-slate-900 placeholder-slate-400 font-medium transition-all"
          />
          {role === "learner" && (
            <span className="text-[10px] text-slate-450 mt-1 block font-sans">
              Example: <span className="font-mono font-semibold text-slate-600">SUST-LRN-0442</span> or any email
            </span>
          )}
          {role === "facilitator" && (
            <span className="text-[10px] text-emerald-700 mt-1 block font-sans font-medium">
              Detected Facilitator workspace role
            </span>
          )}
          {role === "admin" && (
            <span className="text-[10px] text-teal-700 mt-1 block font-sans font-medium">
              Detected Programme Team workspace role
            </span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <button 
              type="button" 
              onClick={handleForgotPassword}
              className="text-xs font-semibold text-[#005C45] hover:text-[#003B2C] cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative rounded-xl">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-3.5 pr-10 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30 text-slate-900 placeholder-slate-400 font-medium transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember this device checkbox & Subtle Access Selector */}
        <div className="flex flex-col gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4.5 w-4.5 rounded-md border-slate-300 text-emerald-900 focus:ring-emerald-600/20 cursor-pointer accent-[#005C45]"
            />
            <label htmlFor="remember-me" className="ml-2.5 text-xs text-slate-600 cursor-pointer select-none font-medium">
              Remember this device
            </label>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">
              Continue as
            </label>
            <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-2xl border border-slate-200/20 min-h-[46px] items-center">
              {(["learner", "facilitator", "admin"] as RoleType[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setError("");
                  }}
                  className={`text-xs font-bold py-2.5 px-3 rounded-xl transition-all duration-200 cursor-pointer text-center min-h-[38px] flex items-center justify-center border-none ${
                    role === r 
                      ? "bg-[#005C45] text-white shadow-xs" 
                      : "text-slate-600 hover:text-slate-800 bg-transparent hover:bg-slate-200/30"
                  }`}
                >
                  {r === "learner" && "Learner"}
                  {r === "facilitator" && "Facilitator"}
                  {r === "admin" && "Programme Team"}
                </button>
              ))}
            </div>
            <p className="text-[10.5px] text-slate-450 leading-normal font-sans font-medium">
              Your workspace opens after sign-in based on your account access.
            </p>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-[46px] bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer mt-3 flex items-center justify-center gap-1.5 shadow-xs"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-1.5">
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing In...
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-bold">
              <KeyRound className="h-4 w-4 text-emerald-200" />
              {role === "learner" && "Sign in to continue"}
              {role === "facilitator" && "Sign in to review"}
              {role === "admin" && "Sign in to monitor"}
            </span>
          )}
        </button>
        
        <p className="text-[10.5px] text-slate-400 mt-3 text-center leading-relaxed font-sans font-medium">
          Pro-tip: Type <span className="font-mono font-bold text-[#005C45] bg-emerald-50/70 px-1 py-0.5 rounded-sm">facilitator</span> or <span className="font-mono font-bold text-[#005C45] bg-emerald-50/70 px-1 py-0.5 rounded-sm">admin</span> in the email field to dynamically view and access different workspaces.
        </p>
      </form>

      {/* Public lookup info link */}
      <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-3.5 text-[11px] text-slate-600 font-medium flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[#005C45] shrink-0" />
          Need to verify a credentials code?
        </span>
        <button 
          onClick={() => navigateTo("/verify-certificate")}
          className="text-xs font-bold text-[#005C45] hover:text-[#003B2C] cursor-pointer shrink-0"
        >
          Verify certificate
        </button>
      </div>

      {/* Alternative actions */}
      <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-5 font-medium space-y-4">
        <div>
          New to SUSTAIN LMS?{" "}
          <button 
            onClick={() => navigateTo("/signup")}
            className="font-bold text-[#005C45] hover:text-[#003B2C] cursor-pointer"
          >
            Create an account
          </button>
        </div>
      </div>

      {/* Programme Team Demo Alert Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-150 overflow-hidden text-left transform transition-all animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#005C45] flex items-center justify-center font-bold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowAdminModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer border-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Programme Workspace Prepared
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Programme workspace preview is prepared for this demo. Connect the final programme dashboard during production setup.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                className="w-full h-11 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-center border-none"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
