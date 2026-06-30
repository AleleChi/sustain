import { useState, useEffect } from "react";
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
  QrCode,
  FileText,
  UserCheck,
  Globe
} from "lucide-react";

export function PublicCertificateVerificationPage() {
  const { navigateTo, showToast } = useRoute();
  const [certId, setCertId] = useState("");
  const [searchStatus, setSearchStatus] = useState<"idle" | "searching" | "success" | "error" | "pending">("idle");
  const [copied, setCopied] = useState(false);

  // Check URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search || window.location.hash.split("?")[1]);
    const idParam = params.get("id");
    if (idParam) {
      setCertId(idParam);
      triggerVerification(idParam);
    }
  }, []);

  const triggerVerification = (id: string) => {
    if (!id.trim()) return;
    setSearchStatus("searching");
    setTimeout(() => {
      const normalizedId = id.trim().toUpperCase();
      if (normalizedId === "SUST-CERT-2026-0148") {
        setSearchStatus("success");
      } else if (normalizedId.includes("PEND") || normalizedId === "SUST-CERT-2026-PEND") {
        setSearchStatus("pending");
      } else {
        setSearchStatus("error");
      }
    }, 800);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    triggerVerification(certId);
  };

  const handleCopyLink = () => {
    setCopied(true);
    const link = `${window.location.origin}/#verify-certificate?id=${certId || "SUST-CERT-2026-0148"}`;
    navigator.clipboard.writeText(link);
    showToast("Verification link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    showToast("Certificate summary downloaded successfully.");
  };

  const handleQrMock = () => {
    showToast("Camera permission requested. Scanning simulated.");
    setCertId("SUST-CERT-2026-0148");
    triggerVerification("SUST-CERT-2026-0148");
  };

  const selectExample = (code: string) => {
    setCertId(code);
    triggerVerification(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 text-left">
      {/* Back button */}
      <button 
        id="btn-back-home"
        onClick={() => navigateTo("/")}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-900 mb-8 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </button>

      {/* Main Content Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left Column: Context & Header */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100/60 w-fit">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              Public verification
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
              Verify a SUSTAIN certificate
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Enter a certificate ID or verification code to confirm an issued SUSTAIN certificate record.
            </p>
            <p className="text-xs text-slate-500 font-normal">
              Only formally issued certificates can be publicly verified.
            </p>
          </div>

          {/* Verification Explanation Cards */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 font-heading">
              What verification confirms
            </h2>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex gap-3.5 hover:border-emerald-200 transition-all duration-300">
                <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                  <UserCheck className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-800 font-heading">Issued record</h3>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed">
                    Confirms that the certificate has been formally issued.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex gap-3.5 hover:border-emerald-200 transition-all duration-300">
                <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-800 font-heading">Learner pathway</h3>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed">
                    Shows the pathway linked to the certificate record.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex gap-3.5 hover:border-emerald-200 transition-all duration-300">
                <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-800 font-heading">Public status</h3>
                  <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed">
                    Confirms whether the certificate is available for public verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card & Live Results */}
        <div className="lg:col-span-7 space-y-6">
          <Card id="verification-form-card" className="p-6 sm:p-8 bg-white border border-slate-200 shadow-xs rounded-3xl">
            <h2 className="text-base font-bold text-slate-900 font-heading mb-6">
              Certificate lookup
            </h2>

            <form onSubmit={handleVerify} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="certificateId" className="block text-sm font-medium text-slate-700 font-sans">
                  Certificate ID or verification code
                </label>
                
                <div className="relative rounded-2xl">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="certificateId"
                    id="certificateId"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="Enter certificate ID"
                    className="block w-full h-[52px] rounded-2xl border border-slate-200 bg-white pl-11 pr-20 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                      type="button"
                      onClick={handleQrMock}
                      title="Scan QR Code"
                      className="p-2.5 text-slate-400 hover:text-emerald-950 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                    >
                      <QrCode className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Example selection chips */}
                <div className="pt-2 flex flex-wrap gap-2 items-center text-sm">
                  <span className="text-slate-400 font-medium mr-1">Try:</span>
                  <button
                    type="button"
                    onClick={() => selectExample("SUST-CERT-2026-0148")}
                    className="px-3.5 py-1 rounded-full text-sm bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-650 border border-slate-200/60 hover:border-emerald-200/60 transition-all cursor-pointer font-medium"
                  >
                    SUST-CERT-2026-0148
                  </button>
                  <button
                    type="button"
                    onClick={() => selectExample("SUST-CERT-2026-PEND")}
                    className="px-3.5 py-1 rounded-full text-sm bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-slate-650 border border-slate-200/60 hover:border-amber-200/60 transition-all cursor-pointer font-medium"
                  >
                    SUST-CERT-2026-PEND
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={searchStatus === "searching" || !certId.trim()}
                  className={`flex-1 min-h-[48px] rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
                    !certId.trim() 
                      ? "bg-slate-100 text-slate-400 border border-slate-200/80 cursor-not-allowed"
                      : "bg-[#005C45] hover:bg-[#004d3a] text-white shadow-xs"
                  }`}
                >
                  {searchStatus === "searching" ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Checking record...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4.5 w-4.5" />
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
                    className="px-5 min-h-[48px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </Card>

          {/* Results Area */}
          <div className="transition-all duration-300">
            {searchStatus === "idle" && (
              <Card className="p-8 bg-slate-50/50 border border-slate-200 border-dashed rounded-3xl flex flex-col items-center justify-center text-center min-h-[280px] space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-350 shadow-3xs">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div className="space-y-1 max-w-xs">
                  <h3 className="text-sm font-bold text-slate-800 font-heading">Awaiting Lookup</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Enter a certificate identifier above to search and confirm verified details instantly.
                  </p>
                </div>
              </Card>
            )}

            {searchStatus === "searching" && (
              <Card className="p-8 bg-white border border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center min-h-[280px] space-y-4 shadow-3xs">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-2 border-slate-150 border-t-emerald-700 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-emerald-800">
                    <ShieldCheck className="h-5 w-5 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Checking record...</h3>
                  <p className="text-xs text-slate-500 font-medium animate-pulse">
                    Retrieving verification details from database...
                  </p>
                </div>
              </Card>
            )}

            {/* STATE 2: Valid certificate state */}
            {searchStatus === "success" && (
              <Card className="p-6 sm:p-8 bg-emerald-50/20 border border-emerald-150 shadow-xs rounded-3xl text-left space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/40 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-100/60 text-emerald-800 rounded-xl">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/40 px-2.5 py-0.5 rounded-full border border-emerald-200/40 font-mono">
                      Verified Authentic
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1 font-heading">Certificate verified</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium relative z-10">
                  This certificate has been formally issued and is available for public verification.
                </p>

                <div className="border-t border-b border-slate-100 py-4.5 space-y-4 text-xs relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Learner</span>
                      <span className="font-bold text-slate-900 mt-1 block text-sm">Aisha Mohammed</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Certificate</span>
                      <span className="font-bold text-slate-900 mt-1 block text-sm">Work Readiness Certificate</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Pathway</span>
                      <span className="font-semibold text-slate-700 mt-1 block">Youth Employability Pathway</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Issue Date</span>
                      <span className="font-bold text-slate-800 mt-1 block">25 Oct 2026</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Certificate ID</span>
                    <span className="font-mono text-slate-800 font-bold bg-slate-50 px-2.5 py-1.5 rounded-xl block mt-1.5 text-xs border border-slate-200/50">
                      SUST-CERT-2026-0148
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                  <button
                    onClick={handleDownload}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-emerald-900 hover:bg-emerald-850 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-3xs"
                  >
                    <Download className="h-4 w-4" />
                    Download Summary
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </Card>
            )}

            {/* STATE 3: Not found state */}
            {searchStatus === "error" && (
              <Card className="p-6 sm:p-8 bg-slate-50 border border-slate-200 shadow-xs rounded-3xl text-left space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 border border-slate-200/60 text-slate-600 rounded-xl">
                    <XCircle className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/40">
                      Record not found
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1 font-heading">Certificate not found</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Check the certificate ID and try again. If the issue continues, contact the programme support team.
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-500">
                  Queried Identifier: <span className="font-mono font-bold text-slate-800">{certId}</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSearchStatus("idle")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    Try Another Lookup
                  </button>
                  <button
                    onClick={() => navigateTo("/support")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    Contact Support
                  </button>
                </div>
              </Card>
            )}

            {/* STATE 4: Pending / not issued state */}
            {searchStatus === "pending" && (
              <Card className="p-6 sm:p-8 bg-amber-50/25 border border-amber-200/80 shadow-xs rounded-3xl text-left space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 border border-amber-100/60 text-amber-800 rounded-xl">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/30 px-2.5 py-0.5 rounded-full border border-amber-200/40">
                      Pending Issuance
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1 font-heading">Certificate not issued yet</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  This record is not available for public verification until assessment, CPD, and review requirements are completed.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigateTo("/support")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    Contact Programme Support
                  </button>
                  <button
                    onClick={() => setSearchStatus("idle")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    Try New Code
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
