import { useState } from "react";
import { SUPPORT_TICKETS, SupportTicket } from "../../data/programmeData";
import { 
  HelpCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  X,
  MailWarning
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";

export function ProgrammeSupport() {
  const { showToast } = useRoute();
  const [tickets, setTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleResolve = (id: string, subject: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "Resolved" } : t));
    showToast(`Support issue resolved: "${subject}"`);
    if (selectedTicket?.id === id) {
      setSelectedTicket(prev => prev ? { ...prev, status: "Resolved" } : null);
    }
  };

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) {
      showToast("Please enter reply message details.");
      return;
    }
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "In Progress" } : t));
    showToast("Response successfully dispatched to local facilitator's terminal.");
    setReplyText("");
    if (selectedTicket?.id === id) {
      setSelectedTicket(prev => prev ? { ...prev, status: "In Progress" } : null);
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "High":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-rose-800 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md">
            <AlertTriangle className="h-3 w-3 text-rose-600" />
            High SLA Alert
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
            <Clock className="h-3 w-3 text-amber-600" />
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-md">
            Low Priority
          </span>
        );
    }
  };

  const alarmTicketsCount = tickets.filter(t => t.responseTrend === "Alarm" && t.status !== "Resolved").length;

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-150 shadow-3xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Oversight Support Desk</h2>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Resolve facilitator queries, troubleshoot sync problems, and manage national delivery SLAs.
          </p>
        </div>
        
        {alarmTicketsCount > 0 && (
          <div className="bg-rose-50 border border-rose-150 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold text-rose-800 animate-pulse">
            <AlertTriangle className="h-4.5 w-4.5 text-rose-600" />
            <span>{alarmTicketsCount} Severe SLA Breach Warning</span>
          </div>
        )}
      </div>

      {/* Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column queue list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-150 shadow-3xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-150">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Open Facilitator Tickets</h3>
            </div>

            <div className="divide-y divide-slate-100">
              {tickets.map((t) => {
                const isActive = selectedTicket?.id === t.id;
                return (
                  <div 
                    key={t.id}
                    onClick={() => setSelectedTicket(t)}
                    className={`p-5 space-y-2.5 cursor-pointer transition-all ${
                      isActive ? "bg-emerald-50/20 border-l-4 border-[#005C45]" : "hover:bg-slate-50/40"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-slate-100 text-slate-655 text-slate-650 font-bold px-2 py-0.5 rounded-md font-mono">
                          {t.id}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-900">{t.subject}</h4>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {getSeverityBadge(t.severity)}
                        {t.status !== "Resolved" && t.responseTrend === "Alarm" && (
                          <span className="text-[9px] bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded-full animate-pulse uppercase">
                            Alarm
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {t.message}
                    </p>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-1.5 border-t border-slate-50/50">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {t.facilitatorName} ({t.location})
                      </span>
                      <span className={`${t.status === "Resolved" ? "text-emerald-700" : "text-amber-750 text-amber-700"}`}>
                        {t.status} • Opened {t.hoursOpen} hours ago
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column detail responder */}
        <div className="lg:col-span-1">
          {selectedTicket ? (
            <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-3xs space-y-5 sticky top-6 animate-in zoom-in-95 duration-150 text-left">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Ticket ID: {selectedTicket.id}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-1">{selectedTicket.subject}</h3>
                </div>
                <button 
                  onClick={() => setSelectedTicket(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Sender summary */}
              <div className="text-xs font-semibold text-slate-600 space-y-1">
                <p>
                  <span className="text-slate-400">Facilitator:</span> {selectedTicket.facilitatorName}
                </p>
                <p>
                  <span className="text-slate-400">Cohort:</span> {selectedTicket.cohortName}
                </p>
                <p>
                  <span className="text-slate-400">Location:</span> {selectedTicket.location} State
                </p>
              </div>

              {/* Message */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs font-medium text-slate-700 leading-relaxed space-y-3">
                <p className="font-semibold text-slate-500 uppercase text-[9px] tracking-wider leading-none">
                  Original message:
                </p>
                <p>"{selectedTicket.message}"</p>
              </div>

              {/* Resolution states */}
              {selectedTicket.status === "Resolved" ? (
                <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>This issue has been resolved. Dispatched back.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Reply form */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Oversight Reply</label>
                    <textarea
                      rows={4}
                      placeholder="Draft a compression guideline or diagnostic advice to send back to this facilitator..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-150 rounded-xl p-3 focus:outline-hidden focus:border-[#005C45] focus:bg-white font-medium"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-1">
                    <button
                      onClick={() => handleResolve(selectedTicket.id, selectedTicket.subject)}
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-150 rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => handleSendReply(selectedTicket.id)}
                      className="flex-1 py-2.5 bg-[#005C45] hover:bg-[#003B2C] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-3xs"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Dispatch</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-8 text-center text-slate-400 font-medium text-xs space-y-2 h-72 flex flex-col items-center justify-center">
              <HelpCircle className="h-8 w-8 text-slate-300" />
              <div>
                <p className="font-bold text-slate-600">No support ticket selected</p>
                <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto mt-0.5">Select a facilitator query to audit message details and dispatch instructions.</p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
