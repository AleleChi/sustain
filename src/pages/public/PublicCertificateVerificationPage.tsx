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
  Globe,
  Award,
  ExternalLink,
  Lock,
  Calendar,
  X,
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";

export function PublicCertificateVerificationPage() {
  const { navigateTo, showToast } = useRoute();
  const [certId, setCertId] = useState("");
  const [searchStatus, setSearchStatus] = useState<"idle" | "searching" | "success" | "error" | "pending">("idle");
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

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
      } else if (normalizedId.includes("PEND") || normalizedId === "SUST-CERT-2026-PEND" || normalizedId === "SUST-LRN-0428" || normalizedId === "SUST-LRN-0091") {
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
    const id = certId.trim() || "SUST-CERT-2026-0148";
    const link = `${window.location.origin}/#verify-certificate?id=${id}`;
    navigator.clipboard.writeText(link);
    showToast("Verification link copied.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleQrMock = () => {
    showToast("Camera access simulated. QR code detected successfully.");
    setCertId("SUST-CERT-2026-0148");
    triggerVerification("SUST-CERT-2026-0148");
  };

  const selectExample = (code: string) => {
    setCertId(code);
    triggerVerification(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-left animate-in fade-in duration-350">
      
      {/* Back button */}
      <button 
        id="btn-back-home"
        onClick={() => navigateTo("/")}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-900 mb-8 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </button>

      {/* Main Content Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left Column: Context & Header */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100/60 w-fit">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              <span>Public verification</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Verify a SUSTAIN certificate
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Enter a certificate ID or verification code to confirm an issued SUSTAIN certificate record. Only formally issued certificates can be publicly verified.
            </p>
          </div>

          {/* Verification Explanation Cards */}
          <div className="pt-6 border-t border-slate-200/60 space-y-4 text-left">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              What verification confirms
            </h2>
            
            <div className="grid grid-cols-1 gap-3.5">
              <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex gap-3.5 hover:border-emerald-100 transition-all duration-300 shadow-3xs">
                <div className="h-9 w-9 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
                  <UserCheck className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="text-xs font-bold text-slate-800">Issued certificate</h3>
                  <p className="text-xs text-slate-500 leading-normal font-normal">
                    Confirms that the certificate has been formally issued.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex gap-3.5 hover:border-emerald-100 transition-all duration-300 shadow-3xs">
                <div className="h-9 w-9 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
                  <Globe className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="text-xs font-bold text-slate-800">Linked pathway</h3>
                  <p className="text-xs text-slate-500 leading-normal font-normal">
                    Shows the pathway connected to the certificate record.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200/60 rounded-2xl flex gap-3.5 hover:border-emerald-100 transition-all duration-300 shadow-3xs">
                <div className="h-9 w-9 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="text-xs font-bold text-slate-800">Public status</h3>
                  <p className="text-xs text-slate-500 leading-normal font-normal">
                    Confirms whether the certificate is available for public verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card & Live Results */}
        <div className="lg:col-span-7 space-y-6">
          <Card id="verification-form-card" className="p-6 sm:p-8 bg-white border border-slate-200/80 shadow-3xs rounded-3xl">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-left mb-5">
              Certificate lookup
            </h2>

            <form onSubmit={handleVerify} className="space-y-5 text-left">
              <div className="space-y-2">
                <label htmlFor="certificateId" className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
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
                    placeholder="Enter certificate ID e.g., SUST-CERT-2026-0148"
                    className="block w-full h-[52px] rounded-2xl border border-slate-200 bg-white pl-11 pr-20 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-[#005C45] focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
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
                <div className="pt-2.5 flex flex-wrap gap-2 items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wide mr-1">Quick examples:</span>
                  <button
                    type="button"
                    onClick={() => selectExample("SUST-CERT-2026-0148")}
                    className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-emerald-50 hover:text-[#005C45] text-slate-600 border border-slate-200 hover:border-emerald-200 transition-all cursor-pointer font-semibold"
                  >
                    SUST-CERT-2026-0148
                  </button>
                  <button
                    type="button"
                    onClick={() => selectExample("SUST-CERT-2026-PEND")}
                    className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-600 border border-slate-200 hover:border-amber-200 transition-all cursor-pointer font-semibold"
                  >
                    SUST-CERT-2026-PEND
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={searchStatus === "searching" || !certId.trim()}
                  className={`flex-1 min-h-[48px] rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 active:scale-[0.99] ${
                    !certId.trim() 
                      ? "bg-slate-150 text-slate-400 border border-slate-200 cursor-not-allowed"
                      : "bg-[#005C45] hover:bg-[#003B2C] text-white shadow-3xs"
                  }`}
                >
                  {searchStatus === "searching" ? (
                    <>
                      <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                      <span>Checking record...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4.5 w-4.5" />
                      <span>Verify Certificate</span>
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
                    className="px-5 min-h-[48px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </Card>

          {/* Results Area */}
          <div className="transition-all duration-350">
            {searchStatus === "idle" && (
              <Card className="p-8 bg-slate-50/55 border border-slate-200/80 border-dashed rounded-3xl flex flex-col items-center justify-center text-center min-h-[260px] space-y-4">
                <div className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-350 shadow-3xs">
                  <ShieldCheck className="h-7 w-7 text-slate-300" />
                </div>
                <div className="space-y-1.5 max-w-xs mx-auto">
                  <h3 className="text-sm font-bold text-slate-700">Awaiting lookup</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    Enter a certificate identifier above to search and confirm verified details instantly.
                  </p>
                </div>
              </Card>
            )}

            {searchStatus === "searching" && (
              <Card className="p-8 bg-white border border-slate-200/80 rounded-3xl flex flex-col items-center justify-center text-center min-h-[260px] space-y-4 shadow-3xs">
                <div className="relative">
                  <div className="h-11 w-11 rounded-full border-2 border-slate-100 border-t-[#005C45] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-[#005C45]">
                    <ShieldCheck className="h-4.5 w-4.5 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-700">Checking record</h3>
                  <p className="text-xs text-slate-400 font-normal animate-pulse">
                    Retrieving verification details securely...
                  </p>
                </div>
              </Card>
            )}

            {/* STATE 1: Valid certificate state */}
            {searchStatus === "success" && (
              <Card className="bg-white border border-slate-200 shadow-sm rounded-3xl text-left overflow-hidden">
                
                {/* Subtle emerald-tinted header area */}
                <div className="p-6 sm:p-8 bg-emerald-50/30 border-b border-emerald-100/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-[#005C45] rounded-xl shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-50 text-[#005C45] border-emerald-200/45">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span>Publicly verified</span>
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-1">Certificate verified</h3>
                    </div>
                  </div>
                  
                  <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-mono tracking-tight shrink-0">
                    ID: SUST-CERT-2026-0148
                  </span>
                </div>

                {/* Details area - Clean detail rows (no raw data-card table look) */}
                <div className="p-6 sm:p-8 space-y-6 text-left">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    This certificate has been issued by SUSTAIN LMS and is available for public verification.
                  </p>

                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Certificate details</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl text-left">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Learner</span>
                        <span className="font-bold text-slate-850 text-sm mt-0.5 block">Aisha Mohammed</span>
                      </div>
                      
                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl text-left">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Certificate</span>
                        <span className="font-bold text-slate-850 text-sm mt-0.5 block">Work Readiness Certificate</span>
                      </div>

                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl text-left">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Pathway</span>
                        <span className="font-semibold text-slate-700 text-xs mt-0.5 block">Youth Employability Pathway</span>
                      </div>

                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl text-left">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Issue Date</span>
                        <span className="font-bold text-slate-800 text-xs mt-0.5 block">25 Oct 2026</span>
                      </div>

                      <div className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl text-left">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide">Issuing Programme</span>
                        <span className="font-bold text-slate-800 text-xs mt-0.5 block">SUSTAIN CPD Programme</span>
                      </div>

                      <div className="bg-emerald-50/20 border border-emerald-100/60 p-3.5 rounded-xl text-left">
                        <span className="text-[10px] text-emerald-700 block font-bold uppercase tracking-wide">Verification Status</span>
                        <span className="font-bold text-[#005C45] text-xs mt-0.5 block">Verified</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wide mb-1">Certificate ID Record</span>
                      <div className="bg-slate-50 border border-slate-200/60 px-3.5 py-3 rounded-xl flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-slate-800">SUST-CERT-2026-0148</span>
                        <button 
                          type="button" 
                          onClick={handleCopyLink}
                          className="text-[#005C45] hover:text-[#003B2C] font-semibold flex items-center gap-1 bg-white hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-all active:scale-[0.98] cursor-pointer"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy verification link</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={handleDownloadClick}
                      className="flex-1 min-h-[44px] py-2.5 px-5 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.99] shadow-3xs"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download verification summary</span>
                    </button>
                    
                    <button
                      onClick={() => setShowPreviewModal(true)}
                      className="flex-1 min-h-[44px] py-2.5 px-5 bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.99]"
                    >
                      <Award className="h-4 w-4 text-[#005C45]" />
                      <span>View certificate preview</span>
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* STATE 2: Not issued yet state */}
            {searchStatus === "pending" && (
              <Card className="p-6 sm:p-8 bg-amber-50/20 border border-amber-200/60 shadow-3xs rounded-3xl text-left space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-50 border border-amber-100 text-amber-800 rounded-xl">
                    <AlertCircle className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-amber-50 text-amber-700 border-amber-200">
                      Pending confirmation
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">Certificate not issued yet</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  This record is not available for public verification until CPD, assessment, attendance, and programme approval requirements are completed.
                </p>

                <div className="bg-slate-50/75 rounded-2xl p-4 border border-slate-150 text-xs text-slate-500">
                  Requested Record Identifier: <span className="font-mono font-bold text-slate-800">{certId}</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigateTo("/support")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-amber-900 hover:bg-amber-850 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    Contact support
                  </button>
                  <button
                    onClick={() => setSearchStatus("idle")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    Try another search
                  </button>
                </div>
              </Card>
            )}

            {/* STATE 3: Not found state */}
            {searchStatus === "error" && (
              <Card className="p-6 sm:p-8 bg-slate-50 border border-slate-200/80 shadow-3xs rounded-3xl text-left space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-xl">
                    <XCircle className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-slate-100 text-slate-600 border-slate-250">
                      Record lookup failed
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">Certificate not found</h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Check the certificate ID and try again. If the issue continues, contact SUSTAIN support.
                </p>

                <div className="bg-slate-100/50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-500">
                  Queried ID: <span className="font-mono font-bold text-slate-800">{certId}</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSearchStatus("idle")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    Try another lookup
                  </button>
                  <button
                    onClick={() => navigateTo("/support")}
                    className="flex-1 min-h-[44px] py-2.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    Contact SUSTAIN support
                  </button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* VIEW CERTIFICATE PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 text-left animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-2xl w-full border border-slate-200/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#005C45]" />
                <h3 className="text-sm font-bold text-slate-900">Certificate preview</h3>
              </div>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Premium, watermarked Certificate design */}
            <div className="p-6 sm:p-10 bg-stone-50 flex items-center justify-center">
              
              {/* Actual Certificate Document Border */}
              <div className="relative w-full aspect-1.414 bg-white border-[14px] border-emerald-900 rounded-lg p-6 sm:p-10 shadow-lg text-center flex flex-col justify-between overflow-hidden">
                
                {/* Security Watermark overlays */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.035] transform rotate-[-30deg]">
                  <p className="text-3xl sm:text-5xl font-extrabold uppercase tracking-widest text-[#005C45]">
                    VERIFIED BY SUSTAIN LMS
                  </p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.025]">
                  <div className="border border-dashed border-[#005C45] w-[90%] h-[90%] rounded-full flex items-center justify-center">
                    <div className="border border-dotted border-[#005C45] w-[70%] h-[70%] rounded-full" />
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-700" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-700" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-700" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-700" />

                {/* Certificate Content */}
                <div className="space-y-4">
                  <div className="flex justify-center items-center gap-1.5">
                    <Award className="h-6 w-6 text-amber-600 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase tracking-widest">SUSTAIN LMS CPD Programme</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">This is to certify that</h4>
                    <p className="text-xl sm:text-2xl font-extrabold text-slate-900">Aisha Mohammed</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] sm:text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    has successfully met all required credits, clinical attendance, assessments, and competence milestones on the
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-emerald-950">Youth Employability Pathway</p>
                  <p className="text-[10px] font-bold text-slate-600 italic">Work Readiness Certificate</p>
                </div>

                {/* Footer with verification metadata */}
                <div className="grid grid-cols-3 items-end gap-2 pt-4 border-t border-slate-100/70 text-left">
                  <div>
                    <span className="text-[7px] sm:text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Issue Date</span>
                    <span className="font-bold text-slate-800 text-[8px] sm:text-xs">25 Oct 2026</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center">
                      <QrCode className="h-8 w-8 text-slate-600" />
                    </div>
                    <span className="text-[6px] sm:text-[8px] text-slate-400 block pt-1">Scan to Verify</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[7px] sm:text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Certificate ID</span>
                    <span className="font-mono font-bold text-slate-800 text-[8px] sm:text-xs">SUST-CERT-0148</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close Preview
              </button>
              <button 
                onClick={() => {
                  setShowPreviewModal(false);
                  handleDownloadClick();
                }}
                className="px-4 py-2 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOWNLOAD CONFIRMATION MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="relative bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 p-6 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-emerald-50 text-[#005C45] rounded-xl">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Verification summary download</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Verification summary download is prepared for this prototype and can be connected during production setup.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span className="font-medium">File name:</span>
                <span className="font-bold text-slate-800 font-mono">SUST-CERT-2026-0148.pdf</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span className="font-bold text-slate-800">High-fidelity PDF verification receipt</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setShowDownloadModal(false);
                  showToast("Verification summary prepared and downloaded successfully (prototype simulation).");
                }}
                className="px-4 py-2 bg-[#005C45] hover:bg-[#003B2C] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Confirm Download
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
