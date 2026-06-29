import { useState, useEffect, useRef } from "react";
import { useRoute, RoutePath } from "../../../context/RouteContext";
import { 
  Users, 
  Download, 
  SlidersHorizontal, 
  ArrowRight, 
  WifiOff, 
  FileText, 
  Bell, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown, 
  MessageSquare, 
  Send, 
  FileSpreadsheet, 
  CheckSquare, 
  Settings, 
  User, 
  HelpCircle, 
  ArrowLeft,
  X,
  Plus,
  ExternalLink
} from "lucide-react";
import { FacilitatorMobileActionMenu, ActionItem } from "../../../components/facilitator/FacilitatorMobileActionMenu";
import { motion, AnimatePresence } from "motion/react";

interface TaskItem {
  id: string;
  learnerName: string;
  learnerId: string;
  cohort: string;
  reason: string;
  priority: "High" | "Med" | "Low" | "Critical";
  due: string;
  status: "Open" | "In Progress" | "Resolved";
  lastActive: string;
  context: string;
  details: string;
  note: string;
  recommendation: string;
  progress: number;
  engagement: "High" | "Moderate" | "Low";
  avgQuizScore?: string;
  lowBandwidth?: boolean;
  avatarText: string;
}

export function FollowUpQueueView() {
  const { navigateTo, showToast } = useRoute();

  // Active Filter Categories for Mobile / Desktop
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [cohortFilter, setCohortFilter] = useState("Kano 02");
  const [statusFilter, setStatusFilter] = useState("Open");

  // Interaction Outcome Form states
  const [interactionType, setInteractionType] = useState("Direct Message");
  const [nextAction, setNextAction] = useState("");
  const [outcomeStatus, setOutcomeStatus] = useState("Contacted & Resolved");
  const [reviewDate, setReviewDate] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  // Messaging Panel State
  const [activeChannel, setActiveChannel] = useState<"WhatsApp" | "Email" | "SMS">("WhatsApp");
  const [messageContent, setMessageContent] = useState("");
  const [attachGuide, setAttachGuide] = useState(true);
  const [attachSummary, setAttachSummary] = useState(false);

  // Modal & Drawer visibility states
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isBatchRemindersOpen, setIsBatchRemindersOpen] = useState(false);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isSupportTicketOpen, setIsSupportTicketOpen] = useState(false);
  const [focusMessageArea, setFocusMessageArea] = useState(false);

  // Form states for creating a task
  const [newTaskLearner, setNewTaskLearner] = useState("Aisha Mohammed");
  const [newTaskType, setNewTaskType] = useState("Assessment reminder");
  const [newTaskPriority, setNewTaskPriority] = useState("High");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskChannel, setNewTaskChannel] = useState("WhatsApp/low-bandwidth note");
  const [newTaskNotes, setNewTaskNotes] = useState("");

  // Form states for creating a support ticket
  const [ticketLearner, setTicketLearner] = useState("Aisha Mohammed");
  const [ticketCohort, setTicketCohort] = useState("Kano 02");
  const [ticketFollowUp, setTicketFollowUp] = useState("Assessment Overdue (Module 3)");
  const [ticketCategory, setTicketCategory] = useState("Technical access / assessment upload");
  const [ticketPriority, setTicketPriority] = useState("High");
  const [ticketSummary, setTicketSummary] = useState("Learner needs support completing a pending assessment.");
  const [ticketNotes, setTicketNotes] = useState("");
  const [ticketAssignTo, setTicketAssignTo] = useState("Support Team");

  // Unified Interactive Tasks Data Set
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "task-1",
      learnerName: "Aisha Mohammed",
      learnerId: "AM-293",
      cohort: "Kano 02",
      reason: "Assessment Overdue (Module 3)",
      priority: "High",
      due: "Today",
      status: "Open",
      lastActive: "4 days ago",
      context: "Low-bandwidth user from rural Kano. Excellent performance in Modules 1 & 2 (92% average).",
      details: "Missed Module 3 assessment deadline (Oct 20). No login activity recorded for 4 days. Usually very active.",
      note: "Likely connectivity issues in Kano region due to recent storm. Needs empathy-first approach.",
      recommendation: "Send \"Assessment Support\" reminder via SMS/WhatsApp with Module 3 summary PDF.",
      progress: 68,
      engagement: "High",
      avgQuizScore: "94/100",
      lowBandwidth: true,
      avatarText: "AM"
    },
    {
      id: "task-2",
      learnerName: "Kabir Bello",
      learnerId: "KB-412",
      cohort: "Kano 02",
      reason: "Inactive for 14 days",
      priority: "Med",
      due: "Tomorrow",
      status: "Open",
      lastActive: "14 days ago",
      context: "Mid-bandwidth user from urban Kaduna. Struggled slightly with Module 1, but overall positive commitment.",
      details: "No login or platform touchpoint detected for two full weeks. Standard trigger for drop-out risk.",
      note: "Verify whether he is experiencing personal emergencies or has lost motivation.",
      recommendation: "Call directly or send a supportive 'Keep Going' prompt with a scheduled review.",
      progress: 42,
      engagement: "Moderate",
      avgQuizScore: "78/100",
      lowBandwidth: false,
      avatarText: "KB"
    },
    {
      id: "task-3",
      learnerName: "Efe Nwosu",
      learnerId: "EN-882",
      cohort: "Kano 02",
      reason: "Certification Query",
      priority: "Low",
      due: "Oct 24",
      status: "In Progress",
      lastActive: "2 hours ago",
      context: "High-bandwidth user from Lagos Hub. Extremely active and fast learner, typically submits assignments early.",
      details: "Logged a support query regarding certification uploads. Awaiting document validation.",
      note: "Needs a simple, reassuring guide on validation timeline and upload guidelines.",
      recommendation: "Provide clear certification upload instructions and confirm validation times.",
      progress: 98,
      engagement: "High",
      avgQuizScore: "96/100",
      lowBandwidth: false,
      avatarText: "EN"
    },
    {
      id: "task-4",
      learnerName: "Amina Bello",
      learnerId: "AB-554",
      cohort: "Abuja Cohort",
      reason: "Inactive for 12 days. Missing Module 3 quiz submission.",
      priority: "Critical",
      due: "Today",
      status: "Open",
      lastActive: "14 Oct",
      context: "Low-bandwidth user from Abuja fishery tract. Accesses training content on weekends only.",
      details: "Missed Module 3 Quiz on Fish Feed Ratios. Standard alert trigger triggered at 10 days inactive.",
      note: "Urgent check required. Try offline SMS sync check if cellular network remains low in suburbs.",
      recommendation: "Send \"Module 3 Support Pack\" via WhatsApp. Data-optimized PDF attached.",
      progress: 82,
      engagement: "Low",
      avgQuizScore: "94/100",
      lowBandwidth: true,
      avatarText: "AB"
    },
    {
      id: "task-5",
      learnerName: "Chidi Okechukwu",
      learnerId: "CO-102",
      cohort: "Lagos A",
      reason: "Requested guidance on CPD certification pathways.",
      priority: "Med",
      due: "Tomorrow",
      status: "Open",
      lastActive: "Yesterday",
      context: "Lagos Hub business lead candidate. Highly engaged and fast pace learner.",
      details: "Has requested detailed explanation on CPD modules alignment with future agribusiness certification.",
      note: "Provide standard program prospectus with CPD breakdowns.",
      recommendation: "Clarify requirement for Cohort B and outline standard validation checkpoints.",
      progress: 90,
      engagement: "High",
      avgQuizScore: "88/100",
      lowBandwidth: false,
      avatarText: "CO"
    }
  ]);

  // Track currently selected task
  const [selectedTaskId, setSelectedTaskId] = useState<string>("task-1");
  const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  const filteredTasks = tasks
    .filter(t => t.cohort === cohortFilter || cohortFilter === "All")
    .filter(t => t.priority === priorityFilter || priorityFilter === "All")
    .filter(t => t.status === statusFilter)
    .filter(t => t.learnerName.toLowerCase().includes(searchQuery.toLowerCase()));

  // Quick Templates messages
  const templates: Record<string, string> = {
    "Friendly Nudge: Missed Assessment": "Hello [Name], this is Halima from SUSTAIN. I noticed you missed the Module 3 assessment. We’re here to help if you’re facing any connectivity challenges. I’ve attached a lite summary guide to help you finish this week. You’re doing great!",
    "Standard Nudge": "Hi [Name], just checking in on your module progress. Let me know if you run into any hurdles with the platform content!",
    "Support Offer": "Notice you're stuck on agribusiness guidelines. How can I help resolve this with low-bandwidth offline packs?",
    "Cert Achievement": "Congratulations on completing your assessment! Ready for the final certificate validation steps now."
  };

  const [activeTemplate, setActiveTemplate] = useState("Friendly Nudge: Missed Assessment");

  // Sync message content when selected template or task changes
  useEffect(() => {
    if (selectedTask) {
      const templText = templates[activeTemplate] || templates["Friendly Nudge: Missed Assessment"];
      setMessageContent(templText.replace("[Name]", selectedTask.learnerName));
    }
  }, [selectedTaskId, activeTemplate]);

  // Handle outcome recording form completion
  const handleMarkTaskComplete = () => {
    showToast("Task marked complete in this frontend prototype.");
    // Simulate updating task status to Resolved
    setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, status: "Resolved" as const } : t));
  };

  const handleSaveFinalizeRecord = () => {
    showToast("Follow-up record saved locally in this frontend prototype.");
  };

  // Quick action toasts
  const handleStartHighestPriority = () => {
    showToast("Highest priority task opened in this frontend prototype.");
    // Find the critical task or high priority task and select it
    const critical = tasks.find(t => t.priority === "Critical" || t.priority === "High");
    if (critical) {
      setSelectedTaskId(critical.id);
      scrollToId("learner-context-card");
      scrollToId("mobile-context-insight");
    }
  };

  const handleCreateTask = () => {
    setIsCreateTaskOpen(true);
  };

  const handleSendTodayBatchReminders = () => {
    setIsBatchRemindersOpen(true);
  };

  const handleSendMessage = () => {
    showToast("Message sent locally in this frontend prototype.");
    // Simulate updating task state
    setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, status: "In Progress" as const } : t));
    setIsTaskDetailOpen(false);
  };

  const handleCreateSupportTicket = () => {
    setIsSupportTicketOpen(true);
  };

  const handleRunReportNow = () => {
    showToast("Report generation simulated in this frontend prototype.");
  };

  const handleEscalate = () => {
    setIsSupportTicketOpen(true);
  };

  // Helper to scroll smoothly to a mobile section ID
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Mobile FAB Actions configuration
  const mobileActions: ActionItem[] = [
    {
      label: "Start highest priority",
      icon: Zap,
      onClick: handleStartHighestPriority
    },
    {
      label: "Send batch reminders",
      icon: Bell,
      onClick: handleSendTodayBatchReminders
    },
    {
      label: "Create task",
      icon: Plus,
      onClick: handleCreateTask
    },
    {
      label: "Message learner",
      icon: Send,
      onClick: () => {
        setIsTaskDetailOpen(true);
        setFocusMessageArea(true);
      }
    },
    {
      label: "Record outcome",
      icon: CheckSquare,
      onClick: () => {
        setIsTaskDetailOpen(true);
        setFocusMessageArea(false);
      }
    },
    {
      label: "Escalate issue",
      icon: AlertTriangle,
      onClick: handleCreateSupportTicket
    }
  ];

  const messageAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (isTaskDetailOpen && focusMessageArea) {
      setTimeout(() => {
        if (messageAreaRef.current) {
          messageAreaRef.current.focus();
          messageAreaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }, [isTaskDetailOpen, focusMessageArea]);

  const renderOverlays = () => {
    return (
      <>
        {/* CREATE TASK MODAL */}
        <AnimatePresence>
          {isCreateTaskOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCreateTaskOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
              />
              
              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Create Follow-Up Task</h3>
                    <p className="text-[10.5px] text-slate-450 font-bold mt-0.5 font-sans">Manually queue a support task for a learner or cohort</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsCreateTaskOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-450 transition-colors cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const newTask: TaskItem = {
                    id: `task-${Date.now()}`,
                    learnerName: newTaskLearner,
                    learnerId: newTaskLearner === "Aisha Mohammed" ? "AM-293" : `LRN-${Math.floor(100+Math.random()*900)}`,
                    cohort: "Kano 02",
                    reason: newTaskType + " Required",
                    priority: newTaskPriority as any,
                    due: newTaskDueDate ? new Date(newTaskDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Today",
                    status: "Open",
                    lastActive: "Active recently",
                    context: "Manually registered follow-up case.",
                    details: newTaskNotes || "No notes provided.",
                    note: newTaskNotes,
                    recommendation: `Complete check-in via ${newTaskChannel}`,
                    progress: newTaskLearner === "Aisha Mohammed" ? 68 : 55,
                    engagement: "Moderate",
                    avgQuizScore: "85/100",
                    avatarText: newTaskLearner.split(" ").map(n => n[0]).join("").toUpperCase()
                  };
                  setTasks(prev => [newTask, ...prev]);
                  setSelectedTaskId(newTask.id);
                  setIsCreateTaskOpen(false);
                  showToast("Follow-up task created locally in this frontend prototype.");
                }} className="p-6 space-y-4">
                  
                  {/* Select Learner */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Learner Name</label>
                      <select 
                        value={newTaskLearner}
                        onChange={(e) => setNewTaskLearner(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      >
                        <option value="Aisha Mohammed">Aisha Mohammed</option>
                        <option value="Kabir Bello">Kabir Bello</option>
                        <option value="Efe Nwosu">Efe Nwosu</option>
                        <option value="Amina Bello">Amina Bello</option>
                        <option value="Chidi Okechukwu">Chidi Okechukwu</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Cohort</label>
                      <input 
                        type="text" 
                        value="Kano 02" 
                        disabled 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Task Type and Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Task Type</label>
                      <select 
                        value={newTaskType}
                        onChange={(e) => setNewTaskType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      >
                        <option value="Assessment reminder">Assessment reminder</option>
                        <option value="Low-bandwidth support">Low-bandwidth support</option>
                        <option value="Certification guidance">Certification guidance</option>
                        <option value="Direct check-in">Direct check-in</option>
                        <option value="Technical support">Technical support</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Priority</label>
                      <select 
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      >
                        <option value="High">High</option>
                        <option value="Med">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Due Date and Channel */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Due Date</label>
                      <input 
                        type="date"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Reminder Channel</label>
                      <select 
                        value={newTaskChannel}
                        onChange={(e) => setNewTaskChannel(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      >
                        <option value="In-app message">In-app message</option>
                        <option value="SMS">SMS</option>
                        <option value="Email">Email</option>
                        <option value="WhatsApp/low-bandwidth note">WhatsApp/low-bandwidth note</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Task Notes</label>
                    <textarea 
                      rows={3}
                      value={newTaskNotes}
                      onChange={(e) => setNewTaskNotes(e.target.value)}
                      placeholder="Describe what the facilitator should do next..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setIsCreateTaskOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer bg-white"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      Create Task
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SEND TODAY'S BATCH REMINDERS DRAWER */}
        <AnimatePresence>
          {isBatchRemindersOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsBatchRemindersOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              {/* Drawer panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
                className="relative w-full max-w-md md:max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 z-10"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Send Today’s Batch Reminders</h3>
                    <p className="text-[10.5px] text-slate-400 font-bold mt-0.5 font-sans">Review and launch bulk nudges to inactive or overdue learners</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsBatchRemindersOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-450 transition-colors cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Summary Box */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-left space-y-2">
                    <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block">Batch Summary</span>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block">RECIPIENTS</span>
                        <span className="text-slate-800 font-extrabold">7 Learners Needing Support</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block">PRIMARY REASON</span>
                        <span className="text-slate-800 font-extrabold">Assessment Overdue (Module 3)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block">DELIVERY CHANNEL</span>
                        <span className="text-slate-800 font-extrabold">In-App Notification + SMS Backup</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block">ESTIMATED LAUNCH</span>
                        <span className="text-slate-800 font-extrabold">Today (Immediate queue)</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipient List */}
                  <div className="space-y-2.5 text-left">
                    <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Target Recipients (7)</span>
                    <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 max-h-48 overflow-y-auto">
                      {[
                        { name: "Aisha Mohammed", desc: "Kano 02 • Assessment overdue 4 days", priority: "High" },
                        { name: "Amina Bello", desc: "Abuja Cohort • Inactive 12 days", priority: "Critical" },
                        { name: "Kabir Bello", desc: "Kano 02 • Inactive 14 days", priority: "Med" },
                        { name: "Fatima Musa", desc: "Kano 02 • Missed Agri-Finance test", priority: "High" },
                        { name: "Chidi Okechukwu", desc: "Lagos A • Certification queries", priority: "Med" },
                        { name: "Ibrahim Yusuf", desc: "Kano 02 • Inactive 8 days", priority: "Low" },
                        { name: "Efe Nwosu", desc: "Lagos A • Validation pending", priority: "Low" }
                      ].map((r, i) => (
                        <div key={i} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50/50">
                          <div>
                            <span className="font-extrabold text-slate-800 block">{r.name}</span>
                            <span className="text-[10px] text-slate-450 font-medium">{r.desc}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-xs text-[8.5px] border font-bold ${
                            r.priority === "Critical" ? "bg-rose-50 border-rose-100 text-rose-700" :
                            r.priority === "High" ? "bg-amber-50 border-amber-100 text-amber-700" : "bg-slate-50 border-slate-100 text-slate-500"
                          }`}>
                            {r.priority.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Message Template Preview</label>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-semibold text-slate-600 leading-relaxed relative">
                      <span className="absolute -top-2 left-4 bg-white border border-slate-200 px-2 py-0.5 rounded-full text-[8px] font-black text-slate-450 uppercase">Agri-Education Standard</span>
                      "Hello [Learner Name], this is a supportive reminder from your SUSTAIN Facilitator. I noticed you have some pending modules or assessments on your dashboard. Please complete them or reply here if you are facing connectivity issues! We are here to support your learning journey."
                    </div>
                  </div>

                  {/* Options Checkboxes */}
                  <div className="space-y-2.5 text-left pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Attachment & Notifications</span>
                    <div className="space-y-2">
                      <label className="flex items-start gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded-sm text-emerald-800 focus:ring-emerald-800" />
                        <span>Attach Module 3 Low-Bandwidth Study Summary (140 KB PDF)</span>
                      </label>
                      <label className="flex items-start gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded-sm text-emerald-800 focus:ring-emerald-800" />
                        <span>Include Direct WhatsApp backup nudge link</span>
                      </label>
                      <label className="flex items-start gap-2.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                        <input type="checkbox" defaultChecked className="mt-0.5 rounded-sm text-emerald-800 focus:ring-emerald-800" />
                        <span>Include Direct SMS backup nudge text</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => setIsBatchRemindersOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 bg-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsBatchRemindersOpen(false);
                        showToast("Batch reminder draft saved locally in this frontend prototype.");
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 bg-white text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Save Draft
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsBatchRemindersOpen(false);
                        showToast("Batch reminders simulated in this frontend prototype.");
                      }}
                      className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      Send Reminders
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FOLLOW-UP TASK DETAIL DRAWER */}
        <AnimatePresence>
          {isTaskDetailOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsTaskDetailOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              {/* Drawer panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
                className="relative w-full max-w-md md:max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 z-10"
              >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Follow-Up Task Detail</h3>
                    <p className="text-[10.5px] text-slate-400 font-bold mt-0.5">Review and resolve this active support queue item</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsTaskDetailOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-450 transition-colors cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Learner Summary */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Selected Learner</span>
                      <h4 className="text-sm font-black text-slate-900 mt-0.5">{selectedTask.learnerName}</h4>
                      <p className="text-[10px] text-slate-455 font-bold mt-0.5">{selectedTask.cohort} • Progress: {selectedTask.progress}%</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsTaskDetailOpen(false);
                        navigateTo("/facilitator/learners" as RoutePath);
                      }}
                      className="bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-3xs cursor-pointer flex items-center gap-1"
                    >
                      View Profile <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Task details card */}
                  <div className="border border-slate-150 rounded-2xl p-4 text-left space-y-3 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Task Details</span>
                      <span className={`px-2 py-0.5 rounded-xs text-[8.5px] border font-bold uppercase tracking-wider ${getPriorityStyle(selectedTask.priority)}`}>
                        {selectedTask.priority} Priority
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">ALERT REASON</span>
                        <p className="text-slate-800 font-extrabold mt-0.5">{selectedTask.reason}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">RECOMMENDED REMEDIATION</span>
                        <p className="text-slate-700 font-semibold mt-0.5">{selectedTask.recommendation}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">DUE DATE</span>
                          <span className="text-slate-800 font-extrabold mt-0.5 flex items-center gap-1 text-[11px]"><Clock className="h-3 w-3 text-slate-400" /> {selectedTask.due}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">STATUS</span>
                          <span className="text-blue-600 font-extrabold mt-0.5 block">{selectedTask.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs text-sky-950 font-semibold leading-relaxed mt-1">
                      <span className="block text-[9px] font-black text-sky-800 uppercase tracking-wider mb-0.5">CONTEXT DETAILS & INSIGHT</span>
                      {selectedTask.details}
                      {selectedTask.note && (
                        <p className="mt-1.5 border-t border-sky-200/50 pt-1.5 text-slate-500 italic">
                          💡 Facilitator Note: {selectedTask.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Learner Section */}
                  <div className="space-y-3.5 text-left pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-455 uppercase tracking-wider">Message Learner</span>
                      <span className="text-[9.5px] text-slate-400 font-bold">Via {selectedTask.lowBandwidth ? "WhatsApp (Low Bandwidth)" : "In-App Channel"}</span>
                    </div>

                    {/* Quick Templates */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Templates:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.keys(templates).map((title) => (
                          <button
                            key={title}
                            type="button"
                            onClick={() => {
                              setActiveTemplate(title);
                              setMessageContent(templates[title].replace("[Name]", selectedTask.learnerName));
                              showToast(`Loaded "${title}" template`);
                            }}
                            className={`px-2.5 py-1 rounded-full text-[9.5px] font-bold border transition-colors cursor-pointer ${
                              activeTemplate === title
                                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            {title.split(":")[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      ref={messageAreaRef}
                      rows={4}
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Write your supportive message..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/20"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => showToast("Attachment attached.")}
                        className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-black py-2 rounded-lg cursor-pointer text-center"
                      >
                        📎 Attach Module Summary
                      </button>
                      <button
                        type="button"
                        onClick={handleSendMessage}
                        className="flex-1 bg-emerald-900 hover:bg-emerald-850 text-white text-[10px] font-black py-2 rounded-lg cursor-pointer text-center"
                      >
                        ✉ Send Nudge Message
                      </button>
                    </div>
                  </div>

                  {/* Record Outcome Form */}
                  <div className="space-y-3.5 text-left pt-5 border-t border-slate-100">
                    <span className="text-[10px] font-black text-slate-455 uppercase tracking-wider block">Record Follow-Up Outcome</span>
                    
                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase">Outcome Status</label>
                        <select 
                          value={outcomeStatus}
                          onChange={(e) => setOutcomeStatus(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700"
                        >
                          <option value="Contacted & Resolved">Resolved</option>
                          <option value="Contacted & Pending">Contacted (Awaiting Reply)</option>
                          <option value="No Answer">No Answer / Left Voicemail</option>
                          <option value="Needs Escalation">Needs Escalation</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] font-bold text-slate-400 uppercase">Next Review Date</label>
                        <input 
                          type="date"
                          value={reviewDate}
                          onChange={(e) => setReviewDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-bold text-slate-400 uppercase">Facilitator Outcome Notes</label>
                      <input 
                        type="text"
                        value={nextAction}
                        onChange={(e) => setNextAction(e.target.value)}
                        placeholder="e.g. Check back in 48 hours to ensure guide was received"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-700"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, status: (outcomeStatus.includes("Resolved") ? "Resolved" : "In Progress") as any } : t));
                        setIsTaskDetailOpen(false);
                        showToast("Outcome recorded successfully!");
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold py-2.5 rounded-xl cursor-pointer text-center"
                    >
                      Save Follow-Up Record
                    </button>
                  </div>

                  {/* Escalation Short Cut */}
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-left space-y-2 mt-4 text-xs font-semibold text-rose-950">
                    <div>
                      <span className="text-[9px] font-black text-rose-800 uppercase tracking-wider block">Technical Escalation Required?</span>
                      <p className="text-[11px] text-rose-800 font-medium">If the learner cannot log in due to system errors, escalate immediately.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTaskDetailOpen(false);
                        setIsSupportTicketOpen(true);
                      }}
                      className="w-full bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 py-2 rounded-lg cursor-pointer font-bold text-center"
                    >
                      Create High-Level Support Ticket
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CREATE SUPPORT TICKET MODAL */}
        <AnimatePresence>
          {isSupportTicketOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSupportTicketOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
              />

              {/* Modal panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-10"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Create Support Ticket</h3>
                    <p className="text-[10.5px] text-slate-400 font-bold mt-0.5 font-sans font-medium">Escalate a learner issue directly to high-level tech support</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsSupportTicketOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-450 transition-colors cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setIsSupportTicketOpen(false);
                  showToast("Support ticket created locally in this frontend prototype.");
                }} className="p-6 space-y-4">
                  
                  {/* Learner Context Prefilled */}
                  <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-xl p-3 text-left grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">LEARNER CONTEXT</span>
                      <span className="text-xs font-bold text-slate-800">{selectedTask.learnerName}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">RELATED QUEUE ITEM</span>
                      <span className="text-xs font-bold text-slate-800 truncate block">{selectedTask.reason}</span>
                    </div>
                  </div>

                  {/* Issue Category & Priority */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider">Issue Category</label>
                      <select 
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      >
                        <option value="Technical access / assessment upload">Technical access / upload</option>
                        <option value="Content clarify request">Content clarity request</option>
                        <option value="Connectivity & network down">Connectivity / SMS fallback issue</option>
                        <option value="Validation process slow">Validation delay</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider">Priority</label>
                      <select 
                        value={ticketPriority}
                        onChange={(e) => setTicketPriority(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      >
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                        <option value="Normal">Normal</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider">Issue Summary</label>
                    <input 
                      type="text"
                      value={ticketSummary}
                      onChange={(e) => setTicketSummary(e.target.value)}
                      placeholder="Briefly state the support request..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      required
                    />
                  </div>

                  {/* Notes & Assignment */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-1.5 text-left">
                      <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider">Detailed Description & Steps Taken</label>
                      <textarea 
                        rows={3}
                        value={ticketNotes}
                        onChange={(e) => setTicketNotes(e.target.value)}
                        placeholder="Add background, network specs, or messages observed..."
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-slate-455 uppercase tracking-wider">Assign To</label>
                    <select 
                      value={ticketAssignTo}
                      onChange={(e) => setTicketAssignTo(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:border-emerald-700"
                    >
                      <option value="Support Team">Core Technical Support Team</option>
                      <option value="Regional Technical Lead">Regional Kano Tech Lead</option>
                      <option value="Programme Admin">Programme Administrator</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsSupportTicketOpen(false);
                        navigateTo("/facilitator/support-tickets" as RoutePath);
                      }}
                      className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                    >
                      View All Support Tickets
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsSupportTicketOpen(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer bg-white"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        Submit Support Ticket
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  };

  // Helper to render priority classes elegantly
  const getPriorityStyle = (p: string) => {
    switch (p) {
      case "Critical":
        return "bg-rose-50 text-rose-700 border-rose-100 font-bold";
      case "High":
        return "bg-amber-50 text-amber-700 border-amber-100 font-bold";
      case "Med":
      case "Medium":
        return "bg-blue-50 text-blue-700 border-blue-100 font-bold";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 text-left">

      {/* ====================================================
          DESKTOP WORKSPACE (lg:block, hidden on mobile)
          ==================================================== */}
      <div className="hidden lg:block space-y-6">
        
        {/* ROW 1: Hero & Today's Progress */}
        <div className="grid grid-cols-3 gap-6">
          {/* Hero Card */}
          <div className="col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xs relative overflow-hidden">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                  Operational Dashboard
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Follow-Up Queue</h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                  Prioritise learner support, send reminders, and record outcomes to ensure every participant stays on track for success.
                </p>
              </div>

              {/* Context Chips Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="bg-slate-55 border border-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  Programme: Agribusiness 101
                </span>
                <span className="bg-slate-55 border border-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  Kano 02
                </span>
                <span className="bg-slate-55 border border-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold">
                  Facilitator: Halima Sani
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3" />
                  18 Open Tasks
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={handleStartHighestPriority}
                className="bg-emerald-900 hover:bg-emerald-850 active:scale-98 transition-all text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Zap className="h-3.5 w-3.5" />
                Start Highest Priority
              </button>
              <button
                onClick={handleCreateTask}
                className="bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 active:scale-98 transition-all px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Create Task
              </button>
            </div>
          </div>

          {/* Today's Progress Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-slate-850 uppercase tracking-wider">Today's Progress</h3>
                <span className="bg-emerald-100 text-emerald-900 text-[9.5px] font-bold px-2 py-0.5 rounded-sm">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                You’ve completed <span className="font-bold text-slate-800">4 of 11</span> scheduled tasks for today.
              </p>

              {/* Custom High Fidelity Progress bar */}
              <div className="space-y-1">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-800 rounded-full" style={{ width: "36%" }} />
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                  <span>36% COMPLETED</span>
                  <span>7 REMAINING</span>
                </div>
              </div>
            </div>

            {/* Performance KPIs */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 mt-4">
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 text-left">
                <span className="text-slate-400 block text-[9px] font-bold uppercase tracking-wider mb-0.5">Avg Response</span>
                <span className="text-slate-800 font-black text-base">4.2h</span>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 text-left">
                <span className="text-slate-400 block text-[9px] font-bold uppercase tracking-wider mb-0.5">Cohort Health</span>
                <span className="text-emerald-800 font-black text-base">Good</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Six Task Metric Cards */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-2xs">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase mb-1">Open Tasks</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-900 font-black text-2xl">18</span>
              <span className="text-slate-400 text-[10px] font-bold">total</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-2xs">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase mb-1">Due Today</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-emerald-850 font-black text-2xl">7</span>
              <span className="text-slate-400 text-[10px] font-bold">tasks</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-2xs">
            <span className="text-rose-600 block text-[9px] font-bold tracking-wider uppercase mb-1">High Priority</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-rose-700 font-black text-2xl">5</span>
              <span className="text-rose-400 text-[10px] font-bold">critical</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-2xs">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase mb-1">Inactive Users</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-900 font-black text-2xl">46</span>
              <span className="text-slate-400 text-[10px] font-bold">learners</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-2xs">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase mb-1">Reminders</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-900 font-black text-2xl">42</span>
              <span className="text-slate-400 text-[10px] font-bold">sent</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 text-left shadow-2xs">
            <span className="text-slate-400 block text-[9px] font-bold tracking-wider uppercase mb-1">Completed</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-slate-800 font-black text-2xl">31</span>
              <span className="text-emerald-700 text-[10px] font-bold">resolved</span>
            </div>
          </div>
        </div>

        {/* ROW 3: Filters & Queue Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
          
          {/* Search & Filter Bar */}
          <div className="p-4 bg-slate-50/55 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-80">
              <SlidersHorizontal className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Find Follow-Up Tasks by learner name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700/25 transition-all text-slate-700 font-semibold"
              />
            </div>

            {/* Filter select pills */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Cohort:</span>
                <select
                  value={cohortFilter}
                  onChange={(e) => setCohortFilter(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-2.5 py-1 rounded-lg text-slate-700 font-bold focus:outline-hidden"
                >
                  <option value="Kano 02">Kano 02</option>
                  <option value="All">All Cohorts</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-2.5 py-1 rounded-lg text-slate-700 font-bold focus:outline-hidden"
                >
                  <option value="All">All</option>
                  <option value="High">High</option>
                  <option value="Med">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-2.5 py-1 rounded-lg text-slate-700 font-bold focus:outline-hidden"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setPriorityFilter("All");
                  setCohortFilter("Kano 02");
                  setStatusFilter("Open");
                  showToast("Filters reset.");
                }}
                className="text-[10px] text-slate-500 hover:text-slate-800 font-extrabold uppercase tracking-wider cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Queue Action Required Table */}
          <div className="relative">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Queue: Action Required</h3>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSendTodayBatchReminders}
                  className="bg-emerald-900 hover:bg-emerald-850 text-white rounded-full px-4 py-1.5 text-[10.5px] font-bold cursor-pointer flex items-center gap-1.5 active:scale-98 transition-all"
                >
                  <Bell className="h-3 w-3" />
                  Send Today's Batch Reminders (7)
                </button>
                <button onClick={() => showToast("Exporting list...")} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer hover:bg-slate-50">
                  <Download className="h-4.5 w-4.5" />
                </button>
                <button onClick={() => showToast("Table preferences...")} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer hover:bg-slate-50">
                  <Settings className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest select-none">
                  <th className="px-6 py-3">Learner</th>
                  <th className="px-6 py-3">Reason</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Due</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last Active</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((task) => {
                    const isSelected = selectedTaskId === task.id;
                    return (
                      <tr 
                        key={task.id}
                        onClick={() => {
                          setSelectedTaskId(task.id);
                          setIsTaskDetailOpen(true);
                          setFocusMessageArea(false);
                        }}
                        className={`cursor-pointer transition-colors group ${
                          isSelected ? "bg-emerald-50/40" : "hover:bg-slate-50/50"
                        }`}
                      >
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-850 flex items-center justify-center font-bold text-[10px]">
                              {task.avatarText}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 group-hover:text-emerald-900">{task.learnerName}</p>
                              <p className="text-[9.5px] font-mono text-slate-400">ID: {task.learnerId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-slate-600 font-semibold max-w-xs truncate">
                          {task.reason}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`px-2 py-0.5 rounded-sm text-[9.5px] border ${getPriorityStyle(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-500 font-bold">
                          {task.due}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`text-[10px] font-bold ${task.status === "Resolved" ? "text-emerald-700" : "text-blue-600"}`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-400 font-medium">
                          {task.lastActive}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTaskId(task.id);
                              setIsTaskDetailOpen(true);
                              setFocusMessageArea(true);
                              showToast(`Opening message drawer for ${task.learnerName}`);
                            }}
                            className="text-emerald-800 hover:text-emerald-950 hover:underline font-bold text-xs"
                          >
                            Message
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 4: Context / Details / Recommended Action Cards */}
        <div id="learner-context-card" className="grid grid-cols-3 gap-6 scroll-mt-6">
          
          {/* Learner Context */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs text-left space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-emerald-700" />
              <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Learner Context</h3>
            </div>
            
            <div className="space-y-3.5 pt-1">
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">LEARNER</span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{selectedTask.learnerName}</span>
              </div>

              <div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">BACKGROUND PROFILE</span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {selectedTask.context}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Completion</span>
                  <span className="text-slate-800 font-extrabold text-xs">{selectedTask.progress}%</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Engagement</span>
                  <span className="text-slate-800 font-extrabold text-xs">{selectedTask.engagement}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Follow-Up Details */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs text-left space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-emerald-700" />
              <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Follow-Up Details</h3>
            </div>
            
            <div className="space-y-3.5 pt-1">
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {selectedTask.details}
              </p>

              <div className="bg-rose-50/50 border border-rose-100/60 rounded-xl p-3 space-y-1">
                <span className="text-[9px] font-extrabold text-rose-800 tracking-wider block">FACILITATOR NOTE</span>
                <p className="text-xs text-rose-950 font-medium leading-relaxed">
                  {selectedTask.note}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="bg-white border border-slate-250/70 rounded-2xl p-5 shadow-2xs text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4.5 w-4.5 text-emerald-700" />
                <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Recommended Action</h3>
              </div>
              
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {selectedTask.recommendation}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <button
                onClick={() => {
                  scrollToId("message-learner-panel");
                  showToast("Draft loaded below.");
                }}
                className="w-full bg-emerald-900 hover:bg-emerald-850 active:scale-98 transition-all text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              >
                Prepare Message
              </button>
              
              <div className="flex items-center justify-between text-[9.5px] font-bold text-slate-400">
                <span>NEXT TASK</span>
                <span className="text-slate-500 uppercase tracking-wider">Kabir Bello (Inactivity)</span>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 5: Priority Support Groups & Message Learner Panel */}
        <div id="message-learner-panel" className="grid grid-cols-3 gap-6 scroll-mt-6">
          
          {/* Priority Support Groups */}
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block pl-1">
              Priority Support Groups
            </span>

            <div className="space-y-3">
              <div onClick={() => {
                setPriorityFilter("High");
                showToast("Filtered by High Priority tasks");
              }} className="bg-white border border-slate-200/85 hover:border-slate-300 transition-all rounded-xl p-3.5 flex items-center justify-between cursor-pointer shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center">
                    <AlertTriangle className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-extrabold text-slate-800">High Priority</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">5 learners needing urgent help</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>

              <div onClick={() => {
                showToast("Filtered by upcoming deadlines");
              }} className="bg-white border border-slate-200/85 hover:border-slate-300 transition-all rounded-xl p-3.5 flex items-center justify-between cursor-pointer shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-extrabold text-slate-800">Assessment Due</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">12 learners with deadlines today</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>

              <div onClick={() => {
                showToast("Filtered by low-bandwidth tag");
              }} className="bg-white border border-slate-200/85 hover:border-slate-300 transition-all rounded-xl p-3.5 flex items-center justify-between cursor-pointer shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
                    <WifiOff className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-extrabold text-slate-800">Low-Bandwidth</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">8 users requiring lite resources</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Message Learner Panel */}
          <div className="col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-emerald-800" />
                <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">
                  Message Learner: {selectedTask.learnerName}
                </h3>
              </div>
              <span className="bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Assessment Reminder
              </span>
            </div>

            {/* Channels & Templates */}
            <div className="grid grid-cols-2 gap-4">
              {/* Channel buttons */}
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 block mb-1.5 uppercase tracking-wider">CHANNEL</span>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                  <button 
                    onClick={() => setActiveChannel("WhatsApp")}
                    className={`flex-1 py-1 px-3 text-[10px] font-extrabold rounded-md cursor-pointer transition-colors ${
                      activeChannel === "WhatsApp" ? "bg-white text-emerald-900 shadow-2xs" : "text-slate-400"
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => setActiveChannel("Email")}
                    className={`flex-1 py-1 px-3 text-[10px] font-extrabold rounded-md cursor-pointer transition-colors ${
                      activeChannel === "Email" ? "bg-white text-emerald-900 shadow-2xs" : "text-slate-400"
                    }`}
                  >
                    Email
                  </button>
                  <button 
                    onClick={() => setActiveChannel("SMS")}
                    className={`flex-1 py-1 px-3 text-[10px] font-extrabold rounded-md cursor-pointer transition-colors ${
                      activeChannel === "SMS" ? "bg-white text-emerald-900 shadow-2xs" : "text-slate-400"
                    }`}
                  >
                    SMS
                  </button>
                </div>
              </div>

              {/* Templates */}
              <div>
                <span className="text-[9px] font-extrabold text-slate-400 block mb-1.5 uppercase tracking-wider">QUICK TEMPLATES</span>
                <select
                  value={activeTemplate}
                  onChange={(e) => setActiveTemplate(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs px-2.5 py-1.5 rounded-lg text-slate-700 font-bold focus:outline-hidden"
                >
                  <option value="Friendly Nudge: Missed Assessment">Friendly Nudge: Missed Assessment</option>
                  <option value="Standard Nudge">Standard Nudge</option>
                  <option value="Support Offer">Support Offer</option>
                  <option value="Cert Achievement">Cert Achievement</option>
                </select>
              </div>
            </div>

            {/* Message Text area */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-extrabold text-slate-400 block uppercase tracking-wider">MESSAGE CONTENT</span>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={4}
                className="w-full p-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-700 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Options and Send */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachGuide}
                    onChange={(e) => setAttachGuide(e.target.checked)}
                    className="h-3.5 w-3.5 rounded-sm border-slate-300 text-emerald-800 focus:ring-emerald-700"
                  />
                  Attach Guide
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-600 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachSummary}
                    onChange={(e) => setAttachSummary(e.target.checked)}
                    className="h-3.5 w-3.5 rounded-sm border-slate-300 text-emerald-800 focus:ring-emerald-700"
                  />
                  Attach Summary
                </label>
              </div>

              <button
                onClick={handleSendMessage}
                className="bg-emerald-900 hover:bg-emerald-850 text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-98 transition-all"
              >
                <Send className="h-3 w-3" />
                Send Message
              </button>
            </div>

          </div>

        </div>

        {/* ROW 6: Record Follow-Up Outcome Form */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs text-left space-y-5">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4.5 w-4.5 text-emerald-700" />
            <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Record Follow-Up Outcome</h3>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">INTERACTION TYPE</label>
              <select
                value={interactionType}
                onChange={(e) => setInteractionType(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs px-2.5 py-2 rounded-xl text-slate-700 font-bold focus:outline-hidden"
              >
                <option value="Direct Message">Direct Message</option>
                <option value="Phone Call">Phone Call</option>
                <option value="WhatsApp Discussion">WhatsApp Discussion</option>
                <option value="In-Person at Hub">In-Person at Hub</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">NEXT ACTION</label>
              <input
                type="text"
                placeholder="Check back in 48 hours"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs px-3 py-2 rounded-xl text-slate-700 font-semibold focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">OUTCOME STATUS</label>
              <select
                value={outcomeStatus}
                onChange={(e) => setOutcomeStatus(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs px-2.5 py-2 rounded-xl text-slate-700 font-bold focus:outline-hidden"
              >
                <option value="Contacted & Resolved">Contacted & Resolved</option>
                <option value="Awaiting Response">Awaiting Response</option>
                <option value="Escalated to Hub Lead">Escalated to Hub Lead</option>
                <option value="No Contact Reached">No Contact Reached</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">REVIEW DATE</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className="bg-white border border-slate-200 text-xs px-3 py-2 rounded-xl text-slate-700 font-semibold focus:outline-hidden flex-1"
                />
                <button
                  onClick={handleMarkTaskComplete}
                  className="bg-white border border-emerald-800 text-emerald-800 hover:bg-emerald-50 text-[10px] font-bold px-3 py-2 rounded-xl cursor-pointer transition-colors"
                >
                  Mark Task Complete
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold">
              Outcome will be permanently recorded in the central coordination register.
            </p>
            <button
              onClick={handleSaveFinalizeRecord}
              className="bg-emerald-900 hover:bg-emerald-850 text-white px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-2xs active:scale-98 transition-all"
            >
              Save & Finalize Record
            </button>
          </div>
        </div>

        {/* ROW 7: Timeline History / Templates / Reports Grid */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Timeline History */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs text-left space-y-4">
            <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Follow-Up History</h3>
            
            <div className="space-y-4 relative pl-3 border-l border-slate-100 ml-1.5 pt-1">
              <div className="space-y-1 relative">
                <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-emerald-600" />
                <h4 className="text-xs font-bold text-slate-800">Message Sent to Kabir Bello</h4>
                <p className="text-[10px] text-slate-400 font-bold">Today, 09:15 AM • WhatsApp</p>
              </div>

              <div className="space-y-1 relative">
                <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-emerald-600" />
                <h4 className="text-xs font-bold text-slate-800">Outcome Recorded: Efe Nwosu</h4>
                <p className="text-[10px] text-slate-400 font-bold">Yesterday, 04:30 PM • Resolved</p>
              </div>

              <div className="space-y-1 relative">
                <div className="absolute -left-[17px] top-1 h-2 w-2 rounded-full bg-slate-400" />
                <h4 className="text-xs font-bold text-slate-800">Mass Reminder Sent</h4>
                <p className="text-[10px] text-slate-400 font-bold">Oct 21 • 42 Learners</p>
              </div>
            </div>

            <button
              onClick={() => showToast("Timeline history log opened.")}
              className="text-[10.5px] font-bold text-emerald-800 hover:text-emerald-950 block pt-1 cursor-pointer"
            >
              View Full Timeline
            </button>
          </div>

          {/* Quick Templates List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs text-left space-y-4">
            <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Quick Templates</h3>
            
            <div className="space-y-3.5 pt-1">
              <div 
                onClick={() => {
                  setActiveTemplate("Standard Nudge");
                  showToast("Selected Standard Nudge");
                }}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 cursor-pointer text-xs space-y-1 hover:bg-slate-50/40"
              >
                <h4 className="font-bold text-slate-850">Standard Nudge</h4>
                <p className="text-[10.5px] text-slate-400 font-semibold truncate">"Hi [Name], just checking in on your module progress..."</p>
              </div>

              <div 
                onClick={() => {
                  setActiveTemplate("Support Offer");
                  showToast("Selected Support Offer");
                }}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 cursor-pointer text-xs space-y-1 hover:bg-slate-50/40"
              >
                <h4 className="font-bold text-slate-850">Support Offer</h4>
                <p className="text-[10.5px] text-slate-400 font-semibold truncate">"Notice you’re stuck on [Module]. How can I support..."</p>
              </div>

              <div 
                onClick={() => {
                  setActiveTemplate("Cert Achievement");
                  showToast("Selected Cert Achievement");
                }}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 cursor-pointer text-xs space-y-1 hover:bg-slate-50/40"
              >
                <h4 className="font-bold text-slate-850">Cert Achievement</h4>
                <p className="text-[10.5px] text-slate-400 font-semibold truncate">"Congratulations on completing your assessment..."</p>
              </div>
            </div>
          </div>

          {/* Reports & Exports */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs text-left flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Reports & Exports</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Generate cohort engagement summaries or detailed follow-up logs for institutional review.
              </p>
            </div>

            <div className="space-y-2 pt-6">
              <button 
                onClick={() => showToast("Follow-up Summary Log downloaded.")}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-xl border border-slate-200/50 flex items-center justify-between px-3.5 cursor-pointer"
              >
                <span>Follow-Up Summary Log</span>
                <FileSpreadsheet className="h-4 w-4 text-slate-400" />
              </button>
              
              <button 
                onClick={() => showToast("Engagement Data exported.")}
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-xl border border-slate-200/50 flex items-center justify-between px-3.5 cursor-pointer"
              >
                <span>Engagement Data Export</span>
                <FileSpreadsheet className="h-4 w-4 text-slate-400" />
              </button>

              <button 
                onClick={() => showToast("Template builder opened.")}
                className="w-full text-emerald-800 hover:text-emerald-900 text-xs font-extrabold text-center py-2 border border-dashed border-emerald-150 rounded-xl hover:bg-emerald-50/20 cursor-pointer"
              >
                Create Custom Report
              </button>
            </div>
          </div>

        </div>

        {/* ROW 8: Technical Escalation CTA */}
        <div className="bg-emerald-50/45 border border-emerald-100 rounded-2xl p-6 flex items-center justify-between shadow-2xs">
          <div className="text-left space-y-1">
            <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wider">Need to escalate a technical issue?</h3>
            <p className="text-xs text-slate-600 font-medium">
              If a learner cannot access the platform despite reminders, create a support ticket for our IT team.
            </p>
          </div>
          <button
            onClick={handleCreateSupportTicket}
            className="bg-emerald-900 hover:bg-emerald-850 active:scale-98 transition-all text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shadow-2xs"
          >
            Create Support Ticket
          </button>
        </div>

      </div>

      {/* ====================================================
          MOBILE VIEW: Visible on Mobile / Tablet (lg:hidden)
          ==================================================== */}
      <div className="lg:hidden space-y-5 pb-24 w-full max-w-full overflow-x-hidden box-border">
        
        {/* Mobile Top Bar */}
        <div className="bg-white border-b border-slate-100 px-4 py-3 -mx-4 -mt-6 flex items-center justify-between sticky top-0 z-40">
          <button 
            onClick={() => navigateTo("/facilitator/dashboard" as RoutePath)}
            className="p-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Follow-Up Queue
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => showToast("Notifications")}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
            </button>
            <button 
              onClick={() => showToast("Help & Guide")}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 1. Daily Goal Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs text-left space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Daily Goal</h3>
            <span className="bg-rose-100 text-rose-800 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              High Priority
            </span>
          </div>

          <p className="text-xs text-slate-500">
            <span className="font-bold text-slate-800">12 priority tasks</span> remaining today.
          </p>

          <div className="space-y-1">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-800 rounded-full" style={{ width: "45%" }} />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-bold">
              <span>45% ACHIEVED</span>
              <span>7 TO GO</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50">
            <button 
              onClick={handleStartHighestPriority}
              className="bg-emerald-900 hover:bg-emerald-850 active:scale-97 text-white text-xs font-bold py-2 rounded-xl transition-all cursor-pointer text-center block"
            >
              Start Task
            </button>
            <button 
              onClick={() => showToast("All tasks overview...")}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 rounded-xl cursor-pointer text-center block"
            >
              View All
            </button>
          </div>
        </div>

        {/* 2. Metric Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-left shadow-2xs">
            <span className="text-slate-400 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">Pending Tasks</span>
            <span className="text-slate-900 font-black text-xl">18</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-left shadow-2xs">
            <span className="text-rose-600 block text-[9.5px] font-bold tracking-wider uppercase mb-0.5">At Risk</span>
            <span className="text-rose-700 font-black text-xl">04</span>
          </div>
        </div>

        {/* 3. Task Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          {["All Tasks", "Inactive (7d+)", "Lapsed Fees", "Assessment Due"].map((pill) => (
            <button
              key={pill}
              onClick={() => {
                setActiveTab(pill);
                showToast(`Filter: ${pill}`);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                activeTab === pill
                  ? "bg-emerald-900 border-emerald-900 text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* 4. Task Queue */}
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-1">
              Task Queue
            </span>
            <button 
              onClick={() => showToast("Queue filters")}
              className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {(() => {
              const list = (() => {
                let temp = filteredTasks;
                if (activeTab === "Inactive (7d+)") {
                  temp = temp.filter(t => t.reason.toLowerCase().includes("inactive") || t.lastActive.toLowerCase().includes("days") || t.lastActive.includes("Oct") || t.lastActive.includes("14") || t.lastActive.includes("12"));
                } else if (activeTab === "Lapsed Fees") {
                  temp = temp.filter(t => t.reason.toLowerCase().includes("cpd") || t.reason.toLowerCase().includes("guidance") || t.reason.toLowerCase().includes("fee"));
                } else if (activeTab === "Assessment Due") {
                  temp = temp.filter(t => t.reason.toLowerCase().includes("assessment") || t.reason.toLowerCase().includes("quiz") || t.reason.toLowerCase().includes("due"));
                }
                return temp;
              })();

              if (list.length === 0) {
                return (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-400 font-semibold text-xs">
                    No tasks found in this queue.
                  </div>
                );
              }

              return list.map((task) => {
                const isSelected = selectedTaskId === task.id;
                const isCritical = task.priority === "Critical";
                const isHigh = task.priority === "High";
                const isMed = task.priority === "Med";
                
                return (
                  <div 
                    key={task.id}
                    onClick={() => {
                      setSelectedTaskId(task.id);
                      setIsTaskDetailOpen(true);
                      setFocusMessageArea(false);
                    }}
                    className={`bg-white border rounded-2xl p-4 text-left shadow-2xs transition-all relative overflow-hidden cursor-pointer active:scale-[0.99] ${
                      isSelected ? "border-emerald-800 ring-1 ring-emerald-800/10" : "border-slate-200"
                    }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      isCritical ? "bg-rose-600" :
                      isHigh ? "bg-amber-500" :
                      isMed ? "bg-blue-500" : "bg-slate-350"
                    }`} />
                    <div className="flex items-center justify-between mb-3 pl-1">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-850 flex items-center justify-center font-bold text-xs shrink-0">
                          {task.avatarText}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900 leading-tight">{task.learnerName}</h4>
                          <p className="text-[9.5px] font-bold text-slate-400">{task.cohort}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-sm text-[8.5px] border font-bold uppercase tracking-wider ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 font-semibold mb-3 leading-relaxed">
                      {task.reason}
                    </div>

                    <div className="flex items-center justify-between pl-1">
                      <span className="text-[9.5px] font-bold text-slate-400">Last active: {task.lastActive}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTaskId(task.id);
                          setIsTaskDetailOpen(true);
                          setFocusMessageArea(true);
                          showToast(`Opening message drawer for ${task.learnerName}`);
                        }}
                        className="bg-emerald-900 hover:bg-emerald-850 active:scale-95 text-white text-[10.5px] font-black px-4.5 py-1.5 rounded-lg shadow-2xs cursor-pointer"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* 5. Context & Insight */}
        <div id="mobile-context-insight" className="bg-white border border-emerald-800/35 rounded-2xl p-4 shadow-2xs text-left space-y-4 scroll-mt-16">
          <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-800" /> Context & Insight
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50 font-semibold">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Learner Progress</span>
              <span className="text-emerald-950 font-extrabold">{selectedTask.progress}% Complete</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50 font-semibold">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Avg. Quiz Score</span>
              <span className="text-slate-800 font-extrabold">{selectedTask.avgQuizScore || "94/100"}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50 font-semibold">
              <span className="text-slate-400 font-bold uppercase text-[9px]">Low-Bandwidth Mode</span>
              <span className="text-amber-800 font-extrabold">{selectedTask.lowBandwidth ? "Enabled" : "Disabled"}</span>
            </div>

            <div className="bg-[#f0f9f6] border border-emerald-100 rounded-xl p-3 space-y-1 mt-2">
              <span className="text-[8.5px] font-black text-emerald-800 uppercase tracking-wider block">RECOMMENDED ACTION</span>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                {selectedTask.recommendation}
              </p>
            </div>
          </div>
        </div>

        {/* 6. Message Learner */}
        <div id="mobile-message-learner" className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs text-left space-y-3.5 scroll-mt-16">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Message Learner</h3>
            <button 
              onClick={() => showToast("Expanded message mode")}
              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          <textarea
            rows={4}
            placeholder="Type your message here..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-150 rounded-xl text-xs font-medium focus:outline-hidden focus:bg-white resize-none"
          />

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => showToast("Attachments simulated in this prototype.")}
              className="bg-white border border-slate-250 text-slate-600 text-xs font-bold py-2 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-slate-400" />
              Attach
            </button>
            <button 
              onClick={() => showToast("Quick templates selector")}
              className="bg-white border border-slate-250 text-slate-600 text-xs font-bold py-2 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              Templates
            </button>
          </div>

          <button 
            onClick={handleSendMessage}
            className="w-full bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-extrabold py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            Send via Platform
          </button>
        </div>

        {/* 7. Support Shortcuts */}
        <div id="mobile-support-shortcuts" className="space-y-3 text-left scroll-mt-16">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-1">
            Support Shortcuts
          </span>

          <div className="space-y-2">
            <div onClick={handleSendTodayBatchReminders} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between cursor-pointer shadow-2xs hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="h-8.5 w-8.5 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Assessment Reminders</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Send bulk nudge to 14 learners</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>

            <div onClick={() => showToast("Low bandwidth offline resource packs optimized.")} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between cursor-pointer shadow-2xs hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="h-8.5 w-8.5 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <WifiOff className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Low-Bandwidth Support</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Optimize offline access assets</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>

            <div onClick={() => showToast("Certifications guidelines prospectus loaded.")} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between cursor-pointer shadow-2xs hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="h-8.5 w-8.5 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <SlidersHorizontal className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Cert/CPD Guidance</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Clarify requirement for Cohort B</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>
          </div>
        </div>

        {/* 8. Record Outcome */}
        <div id="mobile-record-outcome" className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs text-left space-y-4.5 scroll-mt-16">
          <h3 className="text-xs font-black text-slate-850 uppercase tracking-wider">Record Outcome</h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Status Update</label>
              <select
                value={outcomeStatus}
                onChange={(e) => setOutcomeStatus(e.target.value)}
                className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl font-bold focus:outline-hidden"
              >
                <option value="Resolved - Communicated">Resolved - Communicated</option>
                <option value="Awaiting Response">Awaiting Response</option>
                <option value="Escalated">Escalated</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Notes (Internal)</label>
              <textarea
                placeholder="Add a brief note..."
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl resize-none font-semibold text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={() => {
                setInternalNotes("");
                showToast("Cancelled outcome update.");
              }}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveFinalizeRecord}
              className="bg-emerald-900 hover:bg-emerald-850 text-white text-xs font-bold py-2.5 rounded-xl shadow-2xs cursor-pointer"
            >
              Save Record
            </button>
          </div>
        </div>

        {/* 9. Escalation Card */}
        <div id="mobile-escalate-card" className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-left flex items-center justify-between shadow-2xs text-xs scroll-mt-16">
          <div className="space-y-0.5">
            <h4 className="font-extrabold text-rose-950">Need escalation?</h4>
            <p className="text-[10px] text-rose-800 font-medium">Raise high-level tech ticket.</p>
          </div>
          <button
            onClick={handleEscalate}
            className="bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-[10.5px] font-black px-4 py-1.5 rounded-xl cursor-pointer"
          >
            Escalate
          </button>
        </div>

        {/* 10. Recent History */}
        <div className="space-y-3 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-1">
            Recent History
          </span>

          <div className="space-y-3.5 pl-3 border-l border-slate-200 ml-2 pt-1 text-xs font-semibold text-slate-700">
            <div className="relative space-y-0.5">
              <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-700 border-2 border-white ring-1 ring-emerald-700" />
              <h4 className="font-bold text-slate-850">Resolved Amina’s Access Issue</h4>
              <p className="text-[10px] text-slate-400">Today, 09:42 AM</p>
            </div>

            <div className="relative space-y-0.5">
              <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-700 border-2 border-white ring-1 ring-emerald-700" />
              <h4 className="font-bold text-slate-850">Messaged Cohort A Group</h4>
              <p className="text-[10px] text-slate-400">Yesterday, 04:15 PM</p>
            </div>
          </div>
        </div>

        {/* 11. Generate Report CTA */}
        <div id="mobile-generate-report" className="bg-emerald-900 text-white rounded-2xl p-5 text-left space-y-4 shadow-sm scroll-mt-16">
          <div className="space-y-1.5">
            <h3 className="text-sm font-black uppercase tracking-wider">Generate Report</h3>
            <p className="text-xs text-emerald-100 leading-relaxed font-semibold">
              Prepare the weekly engagement summary for the Abuja Fish Farming Cohort.
            </p>
          </div>
          <button
            onClick={handleRunReportNow}
            className="w-full bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-black py-2.5 rounded-xl cursor-pointer shadow-2xs text-center transition-colors block"
          >
            Run Report Now
          </button>
        </div>

      </div>

      {/* RENDER MODAL & DRAWER OVERLAYS */}
      {renderOverlays()}

      {/* REUSABLE MOBILE FLOATING ACTION MENU */}
      <FacilitatorMobileActionMenu actions={mobileActions} />

    </div>
  );
}
