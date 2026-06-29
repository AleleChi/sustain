import { useState } from "react";
import { 
  mockFacilitatorCohorts, 
  mockFacilitatorDiscussions,
  FacilitatorDiscussion 
} from "../../../data/mockFacilitator";
import { 
  MessageSquare, 
  Megaphone, 
  PlusCircle, 
  Send, 
  Trash2, 
  X, 
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Lock,
  UserCheck
} from "lucide-react";

interface DiscussionsViewProps {
  discussions: FacilitatorDiscussion[];
  onUpdateDiscussions: (updated: FacilitatorDiscussion[]) => void;
}

interface Announcement {
  id: string;
  category: "PROGRAMME SUPPORT" | "FACILITATOR UPDATE" | "SYSTEM UPDATE";
  title: string;
  content: string;
  date: string;
  cohort: string;
}

export function DiscussionsView({ 
  discussions, 
  onUpdateDiscussions 
}: DiscussionsViewProps) {
  // Local state for discussions & announcements
  const [activeDiscussion, setActiveDiscussion] = useState<FacilitatorDiscussion | null>(null);
  const [replyText, setReplyText] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "ann-1",
      category: "FACILITATOR UPDATE",
      title: "Work Readiness Roleplay session details for Friday",
      content: "Please ensure all Kano Enterprise Growth Cohort learners print out or download the Interview prep sheets beforehand.",
      date: "Today, 10:00 AM",
      cohort: "Kano Enterprise Growth Cohort"
    },
    {
      id: "ann-2",
      category: "PROGRAMME SUPPORT",
      title: "LMS Offline reader PDF manual is now uploaded",
      content: "Learners in areas with high data costs can download the pre-packaged resource blocks.",
      date: "Yesterday, 03:00 PM",
      cohort: "All Cohorts"
    }
  ]);

  // Modal Composer State
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnContent, setNewAnnContent] = useState("");
  const [newAnnCategory, setNewAnnCategory] = useState<"PROGRAMME SUPPORT" | "FACILITATOR UPDATE" | "SYSTEM UPDATE">("FACILITATOR UPDATE");
  const [newAnnCohort, setNewAnnCohort] = useState("Kano Enterprise Growth Cohort");

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      category: newAnnCategory,
      title: newAnnTitle,
      content: newAnnContent,
      date: "Just Now",
      cohort: newAnnCohort
    };

    setAnnouncements([newAnn, ...announcements]);
    setNewAnnTitle("");
    setNewAnnContent("");
    setShowAnnounceModal(false);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeDiscussion) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: "Halima Sani (You)",
      role: "Lead Facilitator",
      content: replyText,
      date: "Just Now"
    };

    const updated = discussions.map(d => {
      if (d.id === activeDiscussion.id) {
        return {
          ...d,
          repliesCount: d.repliesCount + 1,
          unreplied: false,
          lastActive: "Just Now",
          replies: [...d.replies, newReply]
        };
      }
      return d;
    });

    onUpdateDiscussions(updated);
    setActiveDiscussion(updated.find(d => d.id === activeDiscussion.id) || null);
    setReplyText("");
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-sustain-primary uppercase tracking-widest font-mono block">
            SOCIAL DELIVERY FORUMS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
            Discussions &amp; Announcements
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Post announcements, answer unanswered learner concerns, and maintain the delivery dialogue boards.
          </p>
        </div>
        
        <button
          onClick={() => setShowAnnounceModal(true)}
          className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="h-4 w-4" /> Create Announcement
        </button>
      </div>

      {/* Main Forum Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Columns: Discussion Board threads */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-6 py-4 border-b border-slate-100 text-left">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase font-sans">
                Active Forum Threads
              </h3>
            </div>

            <div className="divide-y divide-slate-100 text-left">
              {discussions.map((disc) => (
                <div 
                  key={disc.id}
                  onClick={() => setActiveDiscussion(disc)}
                  className={`p-5 hover:bg-slate-50/50 transition-colors cursor-pointer space-y-2.5 ${
                    activeDiscussion?.id === disc.id ? "bg-slate-50/45 border-l-4 border-emerald-800 pl-4" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-emerald-850 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                      {disc.cohortName.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">{disc.lastActive}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-900">
                      {disc.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2">
                      {disc.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2 font-medium">
                      <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[9px] text-slate-600">
                        {disc.authorName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-slate-700 font-bold">{disc.authorName}</span>
                      <span className="text-slate-400 font-bold text-[10px]">• {disc.authorRole}</span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-850 font-bold text-[11px]">
                      <MessageSquare className="h-4 w-4" /> {disc.repliesCount} Replies
                      {disc.unreplied && (
                        <span className="h-2 w-2 rounded-full bg-amber-500 ml-1" title="Unreplied question" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Thread Details Pane */}
          {activeDiscussion && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-mono font-bold block uppercase">{activeDiscussion.cohortName}</span>
                  <h3 className="text-base font-extrabold text-slate-900">{activeDiscussion.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveDiscussion(null)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Thread Content */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 font-mono">
                    <span className="text-slate-700">{activeDiscussion.authorName}</span>
                    <span>({activeDiscussion.authorRole})</span>
                    <span>• {activeDiscussion.lastActive}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {activeDiscussion.content}
                  </p>
                </div>

                {/* Replies list */}
                <div className="space-y-3.5 pl-4 border-l-2 border-slate-100">
                  {activeDiscussion.replies.map((reply) => (
                    <div key={reply.id} className="space-y-1.5 text-xs text-left">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 font-mono">
                        <span className="text-slate-700 font-black">{reply.author}</span>
                        <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-100 px-1 py-0.2 rounded">
                          {reply.role}
                        </span>
                        <span>• {reply.date}</span>
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed bg-white border border-slate-100 p-3 rounded-lg">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Reply Form Composer */}
                <form onSubmit={handlePostReply} className="space-y-3 pt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Compose thread response..."
                      className="flex-1 border border-slate-200 bg-slate-50/50 rounded-xl px-4 py-2.5 text-xs focus:outline-hidden focus:border-emerald-850"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs px-4 rounded-xl flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <Send className="h-4 w-4" /> Reply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Announcements Stack (Span 5) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Announcements stack */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest font-mono">
              Live Cohort Announcements
            </h3>

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div 
                  key={ann.id} 
                  className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-3 relative group"
                >
                  <button 
                    onClick={() => handleDeleteAnnouncement(ann.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Delete announcement"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[8px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200/50 px-2 py-0.5 rounded">
                      {ann.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">{ann.date}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-900 leading-snug">{ann.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {ann.content}
                    </p>
                  </div>

                  <span className="text-[9px] text-slate-400 font-mono block border-t border-slate-200/60 pt-1.5 font-bold">
                    Recipient: {ann.cohort}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CREATE ANNOUNCEMENT MODAL COMPOSER */}
      {showAnnounceModal && (
        <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-left space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-emerald-850" />
                <h3 className="text-base font-extrabold text-slate-900">Compose New Announcement</h3>
              </div>
              <button 
                onClick={() => setShowAnnounceModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              {/* Category Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Information Channel</label>
                <select
                  value={newAnnCategory}
                  onChange={(e: any) => setNewAnnCategory(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50/50 p-2.5 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                >
                  <option value="FACILITATOR UPDATE">Facilitator Update (Classroom schedules, quizzes)</option>
                  <option value="PROGRAMME SUPPORT">Programme Support (Logistics, handouts)</option>
                  <option value="SYSTEM UPDATE">System Update (Platform features, mobile app)</option>
                </select>
              </div>

              {/* Recipient Cohort */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Target Cohort Recipients</label>
                <select
                  value={newAnnCohort}
                  onChange={(e) => setNewAnnCohort(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50/50 p-2.5 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                >
                  <option value="All Cohorts">All Cohorts (Broad broadcast)</option>
                  {mockFacilitatorCohorts.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Topic Title</label>
                <input
                  type="text"
                  required
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="e.g. Work Readiness assessment revision reminder..."
                  className="w-full border border-slate-200 bg-slate-50/50 p-2.5 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                />
              </div>

              {/* Content textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Announcement Details</label>
                <textarea
                  rows={4}
                  required
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  placeholder="Draft the details of your notification broadcast clearly..."
                  className="w-full border border-slate-200 bg-slate-50/50 p-3 text-xs rounded-xl focus:outline-hidden focus:border-emerald-850"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAnnounceModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-150 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-extrabold py-2.5 rounded-xl shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="h-4 w-4" /> Broadcast Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
