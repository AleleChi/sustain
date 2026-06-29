import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { Card } from "../../components/ui/Card";
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Copy, 
  Download, 
  RefreshCw, 
  ArrowLeft,
  QrCode
} from "lucide-react";

export function PublicCertificateVerificationPage() {
  const { navigateTo, showToast } = useRoute();
  const [certId, setCertId] = useState("");
  const [searchStatus, setSearchStatus] = useState<"idle" | "searching" | "success" | "error" | "pending">("idle");
  const [copied, setCopied] = useState(false);

  // Simulated search function
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setSearchStatus("searching");

    setTimeout(() => {
      const normalizedId = certId.trim().toUpperCase();
      if (normalizedId === "SUST-CERT-2026-0148") {
        setSearchStatus("success");
      } else if (normalizedId.includes("PEND") || normalizedId === "SUST-CERT-2026-PEND") {
        setSearchStatus("pending");
      } else {
        setSearchStatus("error");
      }
    }, 800);
  };

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.origin + "/verify-certificate?id=SUST-CERT-2026-0148");
    showToast("Verification link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    showToast("Download simulated in this frontend prototype");
  };

  const handleQrMock = () => {
    showToast("QR Scanner simulated. Enter SUST-CERT-2026-0148 in the input instead");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 text-left">
      {/* Back button */}
      <button 
        onClick={() => navigateTo("/")}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-900 mb-8 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Explanation & Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              Certificate Registry
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
              Verify a SUSTAIN Certificate
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Enter a certificate ID or learner verification code below to confirm the authenticity and status of credentials issued by SUSTAIN LMS.
            </p>
          </div>

          <Card className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="certificateId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Certificate ID or Verification Code
                </label>
                <div className="relative rounded-xl shadow-3xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="certificateId"
                    id="certificateId"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="e.g. SUST-CERT-2026-0148"
                    className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-20 text-sm text-slate-950 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                    <button
                      type="button"
                      onClick={handleQrMock}
                      title="Scan QR Code"
                      className="p-2 text-slate-400 hover:text-emerald-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <QrCode className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Try verifying using <span className="font-mono font-bold text-emerald-900">SUST-CERT-2026-0148</span> or <span className="font-mono font-bold text-purple-900">SUST-CERT-2026-PEND</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={searchStatus === "searching" || !certId.trim()}
                  className="flex-1 min-h-[44px] bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                >
                  {searchStatus === "searching" ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Verify Certificate
                    </>
                  )}
                </button>
                {searchStatus !== "idle" && (
                  <button
                    type="button"
                    onClick={() => {
                      setCertId("");
                      setSearchStatus("idle");
                    }}
                    className="px-4 min-h-[44px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </form>
          </Card>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed space-y-2">
            <h3 className="font-bold text-slate-900">About SUSTAIN Credentials</h3>
            <p className="font-medium">
              Only fully completed and formally approved certificates can be verified via this public lookup. Pending reviews or draft milestones will not render as issued credentials.
            </p>
          </div>
        </div>

        {/* Right column: Interactive Results */}
        <div className="lg:col-span-5">
          {searchStatus === "idle" && (
            <Card className="p-8 bg-slate-50/50 border border-slate-200 border-dashed rounded-2xl flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 text-slate-400 shadow-3xs">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-sm font-bold text-slate-800">Awaiting Lookup</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Enter a valid certificate identifier in the form to render verification details from the registry.
                </p>
              </div>
            </Card>
          )}

          {searchStatus === "searching" && (
            <Card className="p-8 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-2 border-slate-100 border-t-emerald-700 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-emerald-800">
                  <ShieldCheck className="h-5 w-5 animate-pulse" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-950">Searching Registry</h3>
                <p className="text-xs text-slate-500 font-medium animate-pulse">
                  Retrieving verification details...
                </p>
              </div>
            </Card>
          )}

          {/* STATE 2: Valid certificate state */}
          {searchStatus === "success" && (
            <Card className="p-6 bg-white border border-emerald-150 shadow-md rounded-2xl text-left space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/40 rounded-bl-full -z-0 pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Verified Authentic
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">Certificate Verified</h3>
                </div>
              </div>

              <div className="border-t border-b border-slate-100 py-4 space-y-3.5 text-xs relative z-10">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Learner Name</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">Aisha Mohammed</span>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Credential Issued</span>
                  <span className="font-bold text-emerald-950 mt-0.5 block">Work Readiness Certificate</span>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Programme Pathway</span>
                  <span className="font-semibold text-slate-700 mt-0.5 block">Youth Employability Pathway</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Issue Date</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">25 Oct 2026</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Verification Date</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">Today</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Certificate ID</span>
                  <span className="font-mono text-slate-900 font-bold bg-slate-50 px-1.5 py-0.5 rounded block mt-0.5 text-xs border border-slate-100">
                    SUST-CERT-2026-0148
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 relative z-10">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-2.5 px-3 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Summary
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 px-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </Card>
          )}

          {/* STATE 3: Not found state */}
          {searchStatus === "error" && (
            <Card className="p-6 bg-white border border-red-150 shadow-md rounded-2xl text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-50 border border-red-100 text-red-800 rounded-xl">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-red-800 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                    Registry Miss
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">Certificate Not Found</h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                We could not verify the certificate ID <span className="font-mono text-red-900 font-bold bg-red-50/50 px-1 py-0.5 rounded">{certId}</span>. Please double-check the spelling or verification code and try your query again.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setSearchStatus("idle")}
                  className="flex-1 py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-750 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigateTo("/support")}
                  className="flex-1 py-2.5 px-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </Card>
          )}

          {/* STATE 4: Pending / not issued state */}
          {searchStatus === "pending" && (
            <Card className="p-6 bg-white border border-amber-150 shadow-md rounded-2xl text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 border border-amber-100 text-amber-800 rounded-xl">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Review Status
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">Certificate Not Issued Yet</h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                This learner record exists but is currently under programme review. Only finalized and officially issued certificates can be verified publicly.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => navigateTo("/support")}
                  className="flex-1 py-2.5 px-3 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  Contact Programme Support
                </button>
                <button
                  onClick={() => setSearchStatus("idle")}
                  className="flex-1 py-2.5 px-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  Try New Code
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
