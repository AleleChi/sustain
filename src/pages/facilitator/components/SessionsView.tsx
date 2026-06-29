import { useState } from "react";
import { 
  mockFacilitatorCohorts, 
  mockFacilitatorSessions,
  FacilitatorSession 
} from "../../../data/mockFacilitator";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  PlusCircle, 
  X, 
  Check, 
  UserCheck, 
  FileText, 
  CheckSquare, 
  Square,
  Sparkles
} from "lucide-react";

interface SessionsViewProps {
  sessions: FacilitatorSession[];
  onUpdateSessions: (updated: FacilitatorSession[]) => void;
}

export function SessionsView({ 
  sessions, 
  onUpdateSessions 
}: SessionsViewProps) {
  // Local state for Schedule Modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newSessTitle, setNewSessTitle] = useState("");
  const [newSessCohort, setNewSessCohort] = useState("kano-02");
  const [newSessDate, setNewSessDate] = useState("2026-06-28");
  const [newSessTime, setNewSessTime] = useState("10:00 AM - 12:00 PM");
  const [newSessType, setNewSessType] = useState<"In-Person Hub" | "Online Webinar" | "Virtual Workshop">("In-Person Hub");
  const [newSessVenue, setNewSessVenue] = useState("");
  const [newSessNotes, setNewSessNotes] = useState("");

  // Attendance Sheet state
  const [activeAttendanceSession, setActiveAttendanceSession] = useState<FacilitatorSession | null>(null);
  const [attendanceList, setAttendanceList] = useState<{ id: string; name: string; present: boolean }[]>([
    { id: "1", name: "Aisha Mohammed", present: true },
    { id: "2", name: "Yusuf Ibrahim", present: true },
    { id: "3", name: "Aminu Bello", present: false },
    { id: "4", name: "Fatima Aliyu", present: true },
    { id: "5", name: "Musa Danjuma", present: true }
  ]);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSessTitle.trim() || !newSessVenue.trim()) return;

    const cohortDetails = mockFacilitatorCohorts.find(c => c.id === newSessCohort);

    const newSess: FacilitatorSession = {
      id: `sess-${Date.now()}`,
      title: newSessTitle,
      cohortId: newSessCohort,
      cohortName: cohortDetails?.name || "Kano Cohort",
      date: newSessDate,
      time: newSessTime,
      type: newSessType,
      venue: newSessVenue,
      status: "Upcoming",
      attendanceRecorded: false,
      notes: newSessNotes
    };

    onUpdateSessions([newSess, ...sessions]);
    setNewSessTitle("");
    setNewSessVenue("");
    setNewSessNotes("");
    setShowScheduleModal(false);
  };

  const handleToggleAttendance = (id: string) => {
    setAttendanceList(prev => prev.map(student => {
      if (student.id === id) return { ...student, present: !student.present };
      return student;
    }));
  };

  const handleSaveAttendance = () => {
    if (!activeAttendanceSession) return;
    
    const presentCount = attendanceList.filter(s => s.present).length;
    const rate = Math.round((presentCount / attendanceList.length) * 100);

    const updated = sessions.map(s => {
      if (s.id === activeAttendanceSession.id) {
        return {
          ...s,
          attendanceRecorded: true,
          attendanceRate: rate,
          status: "Completed" as const
        };
      }
      return s;
    });

    onUpdateSessions(updated);
    setActiveAttendanceSession(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-sustain-primary uppercase tracking-widest font-mono block">
            FACILITATED WORKSHOPS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
            Sessions &amp; Attendance
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Schedule upcoming physical and online training webinars, record attendance registries, and document coaching notes.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="h-4 w-4" /> Schedule Session
        </button>
      </div>

      {/* Main Grid: Upcoming and Past Sessions split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Columns: Upcoming Sessions (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-left space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase font-sans">
              Upcoming Scheduled Sessions
            </h3>

            <div className="space-y-4">
              {sessions.filter(s => s.status === "Upcoming").length === 0 ? (
                <div className="text-center p-8 text-slate-400 text-xs font-semibold">
                  No upcoming facilitation classes scheduled.
                </div>
              ) : (
                sessions.filter(s => s.status === "Upcoming").map((sess) => (
                  <div key={sess.id} className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/50 px-2 py-0.5 rounded uppercase">
                        {sess.type}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono font-bold">
                        <Clock className="h-3.5 w-3.5" /> {sess.date}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{sess.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{sess.cohortName}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-250/30 gap-2 text-xs font-medium text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>{sess.venue} ({sess.time})</span>
                      </div>

                      <button 
                        onClick={() => {
                          setActiveAttendanceSession(sess);
                        }}
                        className="text-emerald-850 hover:text-emerald-900 font-bold hover:underline self-end sm:self-auto text-xs"
                      >
                        Launch Attendance Sheet
                      </button>
                    </div>

                    {sess.notes && (
                      <div className="p-2.5 bg-white border border-slate-100 rounded-lg text-[11px] text-slate-550 leading-relaxed font-medium">
                        <span className="font-bold text-slate-700 block mb-0.5">FACILITATION NOTES:</span>
                        {sess.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Completed / Past Sessions (Span 5) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase font-sans">
              Completed Session Archives
            </h3>

            <div className="space-y-3.5">
              {sessions.filter(s => s.status === "Completed").map((sess) => (
                <div key={sess.id} className="p-3.5 border border-slate-150 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center font-bold text-[10px] text-slate-400 font-mono">
                    <span>{sess.type}</span>
                    <span>{sess.date}</span>
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-slate-900 leading-tight">{sess.title}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{sess.cohortName}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-500">ATTENDANCE RATE</span>
                    <span className="text-emerald-800 font-extrabold bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded font-mono">
                      {sess.attendanceRecorded ? `${sess.attendanceRate}%` : "Not Logged"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* SCHEDULE SESSION MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-left space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-850" />
                <h3 className="text-base font-extrabold text-slate-900">Schedule Delivery Session</h3>
              </div>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSession} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                {/* Session Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Session Mode</label>
                  <select
                    value={newSessType}
                    onChange={(e: any) => setNewSessType(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50/50 p-2 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850 cursor-pointer"
                  >
                    <option value="In-Person Hub">In-Person Hub</option>
                    <option value="Online Webinar">Online Webinar</option>
                    <option value="Virtual Workshop">Virtual Workshop</option>
                  </select>
                </div>

                {/* Target Cohort */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Target Cohort</label>
                  <select
                    value={newSessCohort}
                    onChange={(e) => setNewSessCohort(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50/50 p-2 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850 cursor-pointer"
                  >
                    {mockFacilitatorCohorts.map(c => (
                      <option key={c.id} value={c.id}>{c.name.split(" ").slice(0, 2).join(" ")}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Session Topic Title</label>
                <input
                  type="text"
                  required
                  value={newSessTitle}
                  onChange={(e) => setNewSessTitle(e.target.value)}
                  placeholder="e.g. Workplace Ethics & Practical Dilemmas"
                  className="w-full border border-slate-200 bg-slate-50/50 p-2.5 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Date</label>
                  <input
                    type="date"
                    required
                    value={newSessDate}
                    onChange={(e) => setNewSessDate(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50/50 p-2 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                  />
                </div>

                {/* Time window */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Time Interval</label>
                  <input
                    type="text"
                    required
                    value={newSessTime}
                    onChange={(e) => setNewSessTime(e.target.value)}
                    placeholder="e.g. 10:00 AM - 12:00 PM"
                    className="w-full border border-slate-200 bg-slate-50/50 p-2 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                  />
                </div>
              </div>

              {/* Venue / Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Venue / Location / Link</label>
                <input
                  type="text"
                  required
                  value={newSessVenue}
                  onChange={(e) => setNewSessVenue(e.target.value)}
                  placeholder="e.g. Kano Hub Library Terminal or Zoom Webinar Link"
                  className="w-full border border-slate-200 bg-slate-50/50 p-2.5 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                />
              </div>

              {/* Prep Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Preparation Guidelines for Learners (Optional)</label>
                <textarea
                  rows={2}
                  value={newSessNotes}
                  onChange={(e) => setNewSessNotes(e.target.value)}
                  placeholder="e.g. Please read Module 4 Lesson 2 in advance."
                  className="w-full border border-slate-200 bg-slate-50/50 p-2 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                />
              </div>

              {/* Form buttons */}
              <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-150 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ATTENDANCE WORKSPACE SHEET DIALOG */}
      {activeAttendanceSession && (
        <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-left space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5 text-left">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-emerald-850" /> Record Session Attendance
                </h3>
                <p className="text-slate-500 text-xs font-medium">Topic: {activeAttendanceSession.title}</p>
              </div>
              <button 
                onClick={() => setActiveAttendanceSession(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              <span className="text-[10px] text-slate-400 font-bold font-mono uppercase block">Attendance Checklist</span>

              <div className="space-y-2">
                {attendanceList.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => handleToggleAttendance(student.id)}
                    className="flex items-center justify-between p-3 border border-slate-150 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-800">{student.name}</span>
                    <button className="text-emerald-850">
                      {student.present ? (
                        <CheckSquare className="h-5 w-5 text-emerald-850 fill-emerald-50" />
                      ) : (
                        <Square className="h-5 w-5 text-slate-300" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveAttendanceSession(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-150 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAttendance}
                className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                Save Attendance Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
