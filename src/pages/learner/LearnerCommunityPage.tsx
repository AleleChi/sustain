import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { 
  Users, 
  MessageSquare, 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  Bookmark, 
  ThumbsUp, 
  Shield, 
  BookOpen,
  Award,
  Clock,
  X
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";

interface DiscussionItem {
  id: string;
  title: string;
  category: string;
  status: string;
  type: string;
  startedBy: string;
  replies: number;
  views: number;
  latest: string;
  helper: string;
  previewText?: string;
  linkedLesson?: string;
  route?: string;
}

export function LearnerCommunityPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4000);
  };

  const handleAction = (route: string) => {
    navigateTo(route as any);
  };

  // Shared Learner Context
  const learner = {
    name: "Aisha Mohammed",
    id: "SUST-LRN-0442",
    programme: "SUSTAIN CPD Programme",
    pathway: "Youth Employability Pathway",
    organisation: "Kano Youth Skills Hub",
    cohort: "Kano Youth Employability Cohort 02",
    facilitator: "Halima Sani",
    currentCourse: "Work Readiness Foundation",
    currentLesson: "Preparing for Interviews",
    currentAssessment: "Work Readiness Assignment",
    certificate: "Work Readiness Certificate"
  };

  const discussionsData: DiscussionItem[] = [
    {
      id: "disc-1",
      title: "Interview preparation tips for Work Readiness learners",
      category: "Work Readiness Foundation",
      status: "Pinned",
      type: "Facilitator-Led",
      startedBy: "Halima Sani",
      replies: 6,
      views: 48,
      latest: "Today",
      helper: "Practise common interview questions and prepare clear answers.",
      previewText: "Share one interview question you find difficult and how you would prepare a clear answer for it.",
      linkedLesson: "Preparing for Interviews",
      route: "/learner/community/interview-preparation-discussion"
    },
    {
      id: "disc-2",
      title: "How to answer “Tell me about yourself”",
      category: "Preparing for Interviews",
      status: "Active",
      type: "Learner Practice",
      startedBy: "Halima Sani",
      replies: 9,
      views: 72,
      latest: "Today",
      helper: "Share a short introduction answer and learn from examples."
    },
    {
      id: "disc-3",
      title: "Examples for workplace strengths",
      category: "Work Readiness Foundation",
      status: "Active",
      type: "Peer Discussion",
      startedBy: "Musa Bello",
      replies: 5,
      views: 31,
      latest: "Yesterday",
      helper: "Discuss practical strengths learners can mention in interviews."
    },
    {
      id: "disc-4",
      title: "Staying calm during interviews",
      category: "Preparing for Interviews",
      status: "Active",
      type: "Support Discussion",
      startedBy: "Zainab Ibrahim",
      replies: 4,
      views: 29,
      latest: "Yesterday",
      helper: "Share practical ways to manage nerves before and during interviews."
    },
    {
      id: "disc-5",
      title: "Work Readiness Assignment questions",
      category: "Assessment Support",
      status: "Facilitator Monitored",
      type: "Assessment Discussion",
      startedBy: "Halima Sani",
      replies: 7,
      views: 64,
      latest: "2 days ago",
      helper: "Ask general questions about the assignment brief without sharing private work.",
      route: "/learner/assessments/work-readiness-assignment"
    }
  ];

  // Client-side filtering logic
  const filteredDiscussions = discussionsData.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.helper.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeFilter === "All") return true;
    if (activeFilter === "Pinned") return d.status === "Pinned";
    if (activeFilter === "Facilitator-led") return d.type === "Facilitator-Led" || d.status === "Facilitator Monitored";
    if (activeFilter === "Work Readiness") return d.category === "Work Readiness Foundation";
    if (activeFilter === "Interview Practice") return d.category === "Preparing for Interviews" || d.title.toLowerCase().includes("interview");
    if (activeFilter === "Assessment") return d.category === "Assessment Support" || d.type === "Assessment Discussion";
    if (activeFilter === "Low-Bandwidth") return true; // Simulated view
    
    return true;
  });

  const handleApplyFilters = () => {
    showToast("Community filters applied.", "success");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
    showToast("Filters and search cleared.", "info");
  };

  const handleSaveDiscussion = () => {
    showToast("Discussion saved locally in this frontend prototype.", "success");
  };

  const handleMarkHelpful = () => {
    showToast("Helpful vote saved locally.", "success");
  };

  const handleOpenDiscussionAction = (discussion: DiscussionItem) => {
    if (discussion.route) {
      handleAction(discussion.route);
    } else {
      showToast("Discussion preview simulated.", "info");
    }
  };

  // -------------------------------------------------------------------------
  // REUSABLE COMPONENTS
  // -------------------------------------------------------------------------

  // DESKTOP HERO CLEANUP
  const CommunityHeroDesktop = () => (
    <Card id="community-hero" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch">
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="hover:text-slate-650 cursor-pointer" onClick={() => handleAction("/learner")}>Learner Workspace</span>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              <span className="text-slate-700 font-semibold">Community</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold text-emerald-805 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Facilitator-Guided
              </span>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-150/40 px-2.5 py-0.5 rounded-full border border-slate-200/50">
                Work Readiness Discussions
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-heading leading-tight mt-1">
              Community
            </h1>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xl">
              Join safe learner discussions, practise interview answers, and get guidance linked to your current course.
            </p>
          </div>

          {/* Context row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600">
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Pathway</p>
              <p className="text-slate-900 font-semibold truncate mt-0.5">{learner.pathway}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Current Course</p>
              <p className="text-slate-900 font-semibold truncate mt-0.5">{learner.currentCourse}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Facilitator</p>
              <p className="text-emerald-900 font-semibold truncate mt-0.5">{learner.facilitator}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Discussion count</p>
              <p className="text-slate-900 font-semibold truncate mt-0.5">5 active discussions</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={() => handleAction("/learner/community/interview-preparation-discussion")}
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Open Interview Discussion
            </Button>
            <Button
              onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
              variant="outline"
              className="border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer"
            >
              Continue Lesson
            </Button>
          </div>
        </div>

        {/* Featured Discussion Right Panel */}
        <div className="bg-emerald-950 text-white rounded-2xl border border-emerald-900 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[220px]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-900/60 rounded-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-1.5 text-left">
            <span className="text-[9px] font-semibold text-emerald-200 uppercase tracking-wide bg-emerald-900/80 px-2 py-0.5 rounded inline-block">
              Featured Discussion
            </span>
            <h4 className="text-base font-bold text-white leading-snug pt-1 font-heading">
              Interview preparation tips
            </h4>
            <p className="text-[11px] text-emerald-100/90 leading-relaxed font-normal">
              Practise clear interview answers with facilitator guidance.
            </p>
          </div>

          <div className="relative z-10 border-t border-emerald-900/40 pt-4 mt-2 flex items-center justify-between text-[10px] text-emerald-200/90 font-medium">
            <span>Pinned discussion</span>
            <span>•</span>
            <span>6 replies</span>
            <span>•</span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </Card>
  );

  // MOBILE HERO CLEANUP
  const CommunityHeroMobile = () => (
    <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-left space-y-4">
      <div className="space-y-2">
        <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
          <span className="hover:text-slate-750 cursor-pointer" onClick={() => handleAction("/learner")}>Workspace</span>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-700 font-semibold">Community</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[10px] font-semibold text-emerald-805 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Facilitator-Guided
          </span>
          <span className="text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/50">
            Work Readiness Discussions
          </span>
        </div>

        <h1 className="text-xl font-bold text-slate-900 font-heading tracking-tight leading-tight">
          Community
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Join safe learner discussions, practise interview answers, and get guidance linked to your current course.
        </p>
      </div>

      {/* Context rows */}
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
        <div className="flex justify-between items-center py-0.5">
          <span className="text-slate-500 font-medium">Pathway</span>
          <span className="text-slate-800 font-semibold text-right max-w-[180px] truncate">{learner.pathway}</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-t border-slate-100 pt-2">
          <span className="text-slate-500 font-medium">Current course</span>
          <span className="text-slate-850 font-semibold text-right max-w-[180px] truncate">{learner.currentCourse}</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-t border-slate-100 pt-2">
          <span className="text-slate-500 font-medium">Facilitator</span>
          <span className="text-emerald-900 font-semibold">{learner.facilitator}</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-t border-slate-100 pt-2">
          <span className="text-slate-500 font-medium">Discussion count</span>
          <span className="text-slate-800 font-semibold">5 active discussions</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <Button
          onClick={() => handleAction("/learner/community/interview-preparation-discussion")}
          className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl border-none cursor-pointer shadow-sm active:scale-[0.98] transition-all"
        >
          Open Interview Discussion
        </Button>
        <Button
          onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
          variant="outline"
          className="w-full border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl cursor-pointer"
        >
          Continue Lesson
        </Button>
      </div>
    </Card>
  );

  // QUICK COMMUNITY STATS
  const CommunitySummaryCards = () => (
    <div id="community-summary-cards" className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
      <Card className="p-4 bg-white border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between min-h-[85px] hover:border-emerald-200/50 transition-all duration-200">
        <div className="space-y-0.5">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide block">Active Discussions</span>
          <p className="text-lg font-bold text-slate-800 font-heading">5</p>
          <span className="text-[10px] text-slate-500 font-medium block">Work readiness topics</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between min-h-[85px] hover:border-emerald-200/50 transition-all duration-200">
        <div className="space-y-0.5">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide block">Facilitator Replies</span>
          <p className="text-lg font-bold text-slate-800 font-heading">3</p>
          <span className="text-[10px] text-slate-500 font-medium block">Recent guidance</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between min-h-[85px] hover:border-emerald-200/50 transition-all duration-200">
        <div className="space-y-0.5">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide block">Learner Replies</span>
          <p className="text-lg font-bold text-slate-800 font-heading">24</p>
          <span className="text-[10px] text-slate-500 font-medium block">Across discussions</span>
        </div>
      </Card>

      <Card className="p-4 bg-white border border-slate-200 shadow-xs rounded-xl flex flex-col justify-between min-h-[85px] hover:border-emerald-200/50 transition-all duration-200">
        <div className="space-y-0.5">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide block">Safe Participation</span>
          <p className="text-sm font-bold text-emerald-850 font-heading">Enabled</p>
          <span className="text-[10px] text-slate-500 font-medium block">Guidelines visible</span>
        </div>
      </Card>
    </div>
  );

  // FIND DISCUSSIONS CLEANUP
  const FindDiscussions = () => (
    <Card id="find-discussions" className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight font-heading">Find Discussions</h3>
        <p className="text-xs text-slate-500 font-medium">Filter discussions by course, topic, or support need.</p>
      </div>

      <div className="space-y-3 pt-1">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-800 transition-all font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          )}
        </div>

        {/* Filter chips (wrapping cleanly) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {[
            "All",
            "Pinned",
            "Facilitator-led",
            "Work Readiness",
            "Interview Practice",
            "Assessment",
            "Low-Bandwidth"
          ].map((chip) => {
            const active = activeFilter === chip;
            return (
              <button
                key={chip}
                onClick={() => {
                  setActiveFilter(chip);
                  showToast(`Filter switched to: ${chip}`, "info");
                }}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  active 
                    ? "bg-emerald-950 text-white border-emerald-955 shadow-xs" 
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );

  // FEATURED DISCUSSION CLEANUP
  const FeaturedDiscussionCard = () => {
    const feat = discussionsData[0];
    return (
      <Card id="featured-discussion" className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight font-heading">Featured Discussion</h3>
          <p className="text-xs text-slate-500 font-medium">Start here if you are working on the interview preparation lesson.</p>
        </div>

        <div className="p-4 bg-white border border-slate-150 rounded-2xl space-y-4 hover:border-emerald-200/50 transition-all duration-200 shadow-xs">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold text-amber-805 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                Pinned
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                Facilitator-Led
              </span>
              <span className="text-xs text-slate-500 font-medium ml-auto">
                Started by {feat.startedBy}
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug font-heading">
              {feat.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {feat.helper}
            </p>

            {/* Prompt Box */}
            <div className="p-4 bg-slate-50 border-l-4 border-emerald-850 rounded-r-xl text-xs text-slate-600 font-medium leading-relaxed">
              {feat.previewText}
            </div>

            {/* Details metadata */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 font-sans">Category:</span> <span className="text-slate-700 font-semibold font-sans">{feat.category}</span>
              </div>
              <div className="hidden sm:block text-slate-300 font-sans">•</div>
              <div>
                <span className="text-slate-400 font-sans">Linked lesson:</span> <span className="text-emerald-800 font-semibold font-sans">{feat.linkedLesson}</span>
              </div>
              <div className="hidden sm:block text-slate-300 font-sans">•</div>
              <div>
                <span className="text-slate-700 font-semibold font-sans">{feat.replies}</span> <span className="text-slate-400 font-sans font-normal">replies</span>
              </div>
              <div className="hidden sm:block text-slate-300 font-sans">•</div>
              <div>
                <span className="text-slate-700 font-semibold font-sans">{feat.views}</span> <span className="text-slate-400 font-sans font-normal">views</span>
              </div>
              <div className="hidden sm:block text-slate-300 font-sans">•</div>
              <div>
                <span className="text-slate-400 font-sans">Active:</span> <span className="text-slate-700 font-semibold font-sans">{feat.latest}</span>
              </div>
            </div>
          </div>

          {/* Action buttons (responsive) */}
          <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-100">
            <Button
              onClick={() => handleAction(feat.route!)}
              className="w-full sm:flex-1 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl border-none cursor-pointer text-center shadow-xs"
            >
              Open Discussion
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={handleSaveDiscussion}
                variant="outline"
                className="flex-1 sm:flex-none border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Bookmark className="h-4 w-4 text-slate-550" />
                <span>Save</span>
              </Button>
              <Button
                onClick={handleMarkHelpful}
                variant="outline"
                className="flex-1 sm:flex-none border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ThumbsUp className="h-4 w-4 text-slate-550" />
                <span>Helpful</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // COURSE DISCUSSIONS LIST CLEANUP
  const DiscussionList = () => {
    return (
      <Card id="discussion-list" className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight font-heading">Course Discussions</h3>
          <p className="text-xs text-slate-500 font-medium">Discussions linked to your current learning pathway.</p>
        </div>

        <div className="space-y-3.5 pt-1">
          {filteredDiscussions.map((disc) => (
            <div 
              key={disc.id} 
              className="p-4 bg-white border border-slate-150 rounded-2xl hover:border-emerald-250 hover:shadow-xs transition-all duration-200 cursor-pointer text-left space-y-3"
              onClick={() => handleOpenDiscussionAction(disc)}
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-semibold text-emerald-805 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                      {disc.type}
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                      disc.status.includes("Pinned") 
                        ? "text-amber-805 bg-amber-50 border-amber-100" 
                        : "text-slate-650 bg-slate-100 border-slate-200/60"
                    }`}>
                      {disc.status}
                    </span>
                    <span className="text-[11px] text-slate-450 font-medium ml-auto">
                      By {disc.startedBy}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug font-heading">
                    {disc.title}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {disc.helper}
              </p>

              <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-slate-100 text-xs font-medium text-slate-500">
                <div>
                  <span className="text-slate-700 font-semibold">{disc.replies}</span> <span className="text-slate-400">replies</span>
                  <span className="mx-1.5 text-slate-300">•</span>
                  <span className="text-slate-700 font-semibold">{disc.views}</span> <span className="text-slate-400">views</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleSaveDiscussion(); }}
                    className="p-1.5 text-slate-500 hover:text-slate-850 hover:bg-slate-50 rounded-lg border border-slate-200/60 bg-white shadow-2xs cursor-pointer"
                    title="Save"
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleMarkHelpful(); }}
                    className="p-1.5 text-slate-500 hover:text-slate-850 hover:bg-slate-50 rounded-lg border border-slate-200/60 bg-white shadow-2xs cursor-pointer"
                    title="Helpful"
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDiscussionAction(disc);
                    }}
                    className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-[11px] py-1.5 px-3 rounded-lg border-none cursor-pointer"
                  >
                    Open
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </Card>
    );
  };

  // PRACTICE PROMPTS CLEANUP
  const PracticePrompts = () => {
    const prompts = [
      {
        id: 1,
        title: "Tell me about yourself",
        helper: "Write a short answer that mentions your learning pathway, one strength, and one example."
      },
      {
        id: 2,
        title: "What is one strength you bring?",
        helper: "Choose a strength and support it with a practical example."
      }
    ];

    return (
      <Card id="practice-prompts" className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight font-heading">Practice Prompts</h3>
          <p className="text-xs text-slate-500 font-medium">Use this prompt to prepare for your current lesson and assignment.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {prompts.map((pr) => (
            <div key={pr.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-emerald-250 transition-all duration-200 text-left">
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Prompt 0{pr.id}
                </span>
                <h4 className="text-xs font-bold text-slate-900 font-heading leading-snug">{pr.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {pr.helper}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-3 mt-3 border-t border-slate-150/50">
                <Button 
                  onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
                  className="w-full text-xs font-semibold py-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg border-none cursor-pointer text-center"
                >
                  Practise in Lesson
                </Button>
                <Button 
                  onClick={() => handleAction("/learner/community/interview-preparation-discussion")}
                  variant="outline"
                  className="w-full text-xs font-semibold py-2 border-slate-200 text-slate-700 hover:bg-white rounded-lg cursor-pointer text-center"
                >
                  Open Discussion
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // SAFE PARTICIPATION GUIDELINES
  const SafeParticipationGuidelines = () => (
    <Card id="guidelines-card" className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight font-heading">Safe Participation Guidelines</h3>
        <p className="text-xs text-slate-500 font-medium">Use community spaces respectfully and keep private information protected.</p>
      </div>

      <div className="space-y-2">
        {[
          "Stay on the learning topic.",
          "Be respectful when replying to other learners.",
          "Do not share phone numbers, passwords, verification codes, or private documents.",
          "Use support for private learning, assessment, or certificate questions.",
          "Report anything that feels unsafe or inappropriate."
        ].map((row, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5 text-[10px] font-bold font-sans">
              {idx + 1}
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {row}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-400">Need private assistance?</span>
        <Button
          onClick={() => handleAction("/learner/support")}
          variant="outline"
          className="text-xs font-semibold py-1.5 px-3 border-slate-200 text-slate-705 hover:bg-slate-50 rounded-lg cursor-pointer"
        >
          Open Support
        </Button>
      </div>
    </Card>
  );

  // COMMUNITY STATUS CLEANUP
  const CommunityStatus = () => (
    <Card className="p-4.5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 font-heading">
        Community Status
      </h3>
      
      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-start py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Pathway</span>
          <span className="font-semibold text-slate-800 text-right max-w-[180px]">{learner.pathway}</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Active discussions</span>
          <span className="font-semibold text-slate-800">5</span>
        </div>
        <div className="flex justify-between items-start py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Featured</span>
          <span className="font-semibold text-slate-800 text-right max-w-[180px]">Interview preparation tips</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Facilitator</span>
          <span className="font-semibold text-emerald-800">{learner.facilitator}</span>
        </div>
        <div className="flex justify-between items-start py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Current topic</span>
          <span className="font-semibold text-emerald-800 text-right max-w-[180px]">{learner.currentLesson}</span>
        </div>
        <div className="flex justify-between items-center py-0.5">
          <span className="text-slate-500 font-medium">Safe guidelines</span>
          <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            Visible
          </span>
        </div>
      </div>

      <Button
        onClick={() => handleAction("/learner/community/interview-preparation-discussion")}
        className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-1 border-none shadow-xs"
      >
        Open Featured Discussion
      </Button>
    </Card>
  );

  // LINKED LEARNING CONTEXT CLEANUP
  const LinkedLearningContext = () => (
    <Card className="p-4.5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 font-heading">
        Linked Learning Context
      </h3>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-start py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Course</span>
          <span className="font-semibold text-slate-900 text-right max-w-[180px]">{learner.currentCourse}</span>
        </div>
        <div className="flex justify-between items-start py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Lesson</span>
          <span className="font-semibold text-emerald-800 text-right max-w-[180px]">{learner.currentLesson}</span>
        </div>
        <div className="flex justify-between items-start py-0.5 border-b border-slate-50 pb-2">
          <span className="text-slate-500 font-medium">Assessment</span>
          <span className="font-semibold text-slate-800 text-right max-w-[180px]">{learner.currentAssessment}</span>
        </div>
        <div className="flex justify-between items-start py-0.5">
          <span className="text-slate-500 font-medium">Certificate</span>
          <span className="font-semibold text-slate-800 text-right max-w-[180px]">{learner.certificate}</span>
        </div>
      </div>

      <div className="pt-1.5 flex flex-col gap-2">
        <Button
          onClick={() => handleAction("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
          className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs py-2.5 rounded-xl cursor-pointer border-none shadow-xs"
        >
          Continue Lesson
        </Button>
        <Button
          onClick={() => handleAction("/learner/assessments/work-readiness-assessment")}
          variant="outline"
          className="w-full border-slate-200 text-slate-705 hover:bg-slate-50 font-semibold text-xs py-2.5 rounded-xl cursor-pointer"
        >
          Open Assessment
        </Button>
      </div>
    </Card>
  );

  // QUICK ACTIONS
  const QuickActionsWidget = () => {
    const actions = [
      { id: "featured", label: "Open Featured Discussion", route: "/learner/community/interview-preparation-discussion", helper: "Practise with cohort & Halima." },
      { id: "continue", label: "Continue Lesson", route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews", helper: "Preparing for Interviews lesson." },
      { id: "assessment", label: "Open Assessment", route: "/learner/assessments/work-readiness-assessment", helper: "Draft work readiness assignment." },
      { id: "support", label: "Open Support", route: "/learner/support", helper: "Kano support desk query channel." }
    ];

    return (
      <Card className="p-4.5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2 font-heading">
          Quick Actions
        </h3>

        <div className="space-y-2">
          {actions.map((act) => (
            <div 
              key={act.id}
              onClick={() => handleAction(act.route)}
              className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-slate-50/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-950 truncate font-heading">
                  {act.label}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-normal">
                  {act.helper}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-800 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // SAFE REMINDER
  const SafeParticipationReminder = () => (
    <Card className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl text-left space-y-3">
      <div className="flex items-start gap-2.5">
        <Shield className="h-4.5 w-4.5 text-emerald-800 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-emerald-900 font-heading">Safe Space Policy</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
            This workspace is monitored by course facilitator Halima Sani. Keep discussions productive and supportive.
          </p>
        </div>
      </div>
    </Card>
  );

  // RECENT COMMUNITY ACTIVITY (DESKTOP ONLY)
  const RecentCommunityActivity = () => {
    const logs = [
      { id: 1, text: "Halima replied to interview preparation tips", time: "Today" },
      { id: 2, text: "Aisha drafted a reply", time: "Today" },
      { id: 3, text: "Musa marked a reply helpful", time: "Yesterday" }
    ];

    return (
      <Card id="community-activity" className="p-5 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight font-heading">Recent Community Activity</h3>
          <p className="text-xs text-slate-500 font-medium">Activity history tied to your pathway learning roadmap.</p>
        </div>

        <div className="space-y-2.5">
          {logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200/55 transition-all duration-150">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-2 w-2 rounded-full bg-emerald-700 shrink-0" />
                <p className="text-xs font-medium text-slate-700 truncate">
                  {log.text}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shrink-0 ml-3">
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // -------------------------------------------------------------------------
  // LAYOUT ENGINES
  // -------------------------------------------------------------------------

  // DESKTOP VIEW
  const DesktopCommunityHub = () => (
    <div id="desktop-community" className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full">
      <LearnerSidebar />

      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions, replies, lessons..."
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/10 focus:border-emerald-800 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleAction("/learner/notifications")} 
              className="p-1.5 text-slate-500 hover:text-slate-800 relative transition-colors cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-750 animate-pulse" />
            </button>
            <button 
              onClick={() => handleAction("/learner/support")} 
              className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div 
              onClick={() => handleAction("/learner/profile")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-900 group-hover:text-emerald-950 leading-tight">{learner.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{learner.id}</p>
              </div>
              <div className="h-8 w-8 bg-emerald-950 text-white font-semibold rounded-full flex items-center justify-center border border-emerald-900/10 shadow-sm">
                AM
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
          <CommunityHeroDesktop />
          <CommunitySummaryCards />

          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
            <div className="space-y-6">
              <FindDiscussions />
              <FeaturedDiscussionCard />
              <DiscussionList />
              <PracticePrompts />
              <SafeParticipationGuidelines />
              <RecentCommunityActivity />
            </div>

            <div className="space-y-6 shrink-0">
              <CommunityStatus />
              <LinkedLearningContext />
              <QuickActionsWidget />
              <SafeParticipationReminder />
              <LearnerSupportCard 
                className="p-5 border border-slate-200 rounded-xl text-left bg-white"
                title="Support Center"
                text="Need assistance with your learning pathway?"
                buttonText="Open Support"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // TABLET VIEW
  const TabletCommunityHub = () => (
    <div id="tablet-community" className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-slate-900 font-heading">
            SUSTAIN <span className="text-emerald-800">LMS</span>
          </span>
          <Badge className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0 border-0 font-bold">Tablet</Badge>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => handleAction("/learner/notifications")} className="p-1 text-slate-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-700" />
          </button>
          <button onClick={() => handleAction("/learner/support")} className="p-1 text-slate-500">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="h-7 w-px bg-slate-200" />
          <div onClick={() => handleAction("/learner/profile")} className="h-8 w-8 bg-emerald-950 text-white font-semibold rounded-full flex items-center justify-center cursor-pointer text-xs">
            AM
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        <CommunityHeroMobile />
        <CommunitySummaryCards />
        <FindDiscussions />
        <FeaturedDiscussionCard />
        <DiscussionList />
        <PracticePrompts />
        <SafeParticipationGuidelines />
        
        <div className="grid grid-cols-2 gap-4">
          <CommunityStatus />
          <LinkedLearningContext />
        </div>
        <QuickActionsWidget />
        <SafeParticipationReminder />
      </div>

      <LearnerMobileNav />
    </div>
  );

  // MOBILE VIEW (md:hidden)
  const MobileCommunityHub = () => (
    <div id="mobile-community" className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-bold text-sm tracking-tight text-slate-900 font-heading">
          SUSTAIN <span className="text-emerald-800">LMS</span>
        </span>
        <div className="flex items-center gap-3">
          <button onClick={() => handleAction("/learner/notifications")} className="p-1.5 text-slate-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0.5 right-0.5 h-1 w-1 rounded-full bg-emerald-700" />
          </button>
          <button onClick={() => handleAction("/learner/support")} className="p-1.5 text-slate-500">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div onClick={() => handleAction("/learner/profile")} className="h-7 w-7 bg-emerald-950 text-white font-semibold rounded-full flex items-center justify-center text-[11px]">
            AM
          </div>
        </div>
      </header>

      {/* Stacked content in exact mobile order */}
      <div className="px-4 py-4 space-y-5">
        {/* 1. Mobile topbar (rendered in header above) */}
        {/* 2. Hero / community summary */}
        <CommunityHeroMobile />
        
        {/* 3. Quick community stats */}
        <CommunitySummaryCards />
        
        {/* 4. Find Discussions */}
        <FindDiscussions />
        
        {/* 5. Featured Discussion */}
        <FeaturedDiscussionCard />
        
        {/* 6. Course Discussions */}
        <DiscussionList />
        
        {/* 7. Practice Prompt */}
        <PracticePrompts />
        
        {/* 8. Safe Participation Guidelines */}
        <SafeParticipationGuidelines />
        
        {/* 9. Community Status */}
        <CommunityStatus />
        
        {/* 10. Linked Learning Context */}
        <LinkedLearningContext />
      </div>

      {/* 11. Bottom navigation */}
      <LearnerMobileNav />
    </div>
  );

  return (
    <>
      {toast && (
        <div 
          id="toast-alert"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-950 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-sm text-left"
        >
          <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${
            toast.type === "success" ? "bg-emerald-500" : toast.type === "warning" ? "bg-amber-500" : "bg-blue-400"
          }`} />
          <span className="flex-1 leading-normal font-sans">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white shrink-0 ml-1 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <DesktopCommunityHub />
      <TabletCommunityHub />
      <MobileCommunityHub />
    </>
  );
}

export default LearnerCommunityPage;
