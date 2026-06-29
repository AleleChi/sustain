import { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { StatusChip } from "../../components/ui/StatusChip";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { 
  Play, 
  Download, 
  HelpCircle, 
  ChevronRight,
  ChevronDown,
  Award,
  Zap,
  Check,
  Compass,
  Bell,
  Search,
  BookOpen,
  AlertCircle,
  Clock,
  MessageSquare,
  FileText,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Settings,
  LogOut,
  Sparkles,
  Volume2,
  Calendar,
  Activity,
  X
} from "lucide-react";
import { useRoute } from "../../context/RouteContext";
import { LearnerSidebar } from "../../components/navigation/LearnerSidebar";
import { LearnerMobileNav } from "../../components/navigation/LearnerMobileNav";
import { LearnerContextHint } from "../../components/learner/LearnerContextHint";
import { LearnerSupportCard } from "../../components/learner/LearnerSupportCard";
import { CourseCurriculumAccordion, SUSTAIN_CURRICULUM_DATA } from "../../components/learner/CourseCurriculumAccordion";

export function LearnerCourseDetailPage() {
  const { navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "warning" } | null>(null);
  
  // Simulated State
  const [modulesExpanded, setModulesExpanded] = useState<Record<number, boolean>>({
    1: false,
    2: true,
    3: false,
    4: false,
    5: false,
  });

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => prev?.message === message ? null : prev);
    }, 4500);
  };

  const toggleModule = (id: number) => {
    setModulesExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Learner Context
  const learnerContext = {
    name: "Aisha Mohammed",
    id: "SUST-LRN-0442",
    programme: "SUSTAIN CPD Programme",
    pathway: "Youth Employability Pathway",
    organisation: "Kano Youth Skills Hub",
    cohort: "Kano Youth Employability Cohort 02",
    facilitator: "Halima Sani"
  };

  // Course Context
  const courseData = {
    title: "Work Readiness Foundation",
    status: "In progress",
    progress: 42,
    lessonsCompleted: "6 of 14",
    currentLesson: "Preparing for Interviews",
    courseMode: "Reading, practice, and assignment",
    remainingTime: "2 hours 40 minutes",
    assessment: "Work Readiness Assignment",
    certificate: "Work Readiness Certificate",
    confirmedCpd: 8,
    pendingCpd: 4,
    facilitator: "Halima Sani",
    objective: "Help learners build core work readiness skills, prepare for interviews, communicate clearly, and complete the certificate-linked assignment."
  };

  // Course Lessons/Modules List (14 in total)
  const modules = [
    {
      id: 1,
      title: "1. Understanding Work Readiness",
      status: "completed",
      time: "12 min",
      type: "Reading",
      description: "Learn the foundational components of professional readiness and workplace standards."
    },
    {
      id: 2,
      title: "2. Workplace Expectations",
      status: "completed",
      time: "15 min",
      type: "Reading and practice",
      description: "Discover standard duties, professional dress codes, and typical workspace hierarchies."
    },
    {
      id: 3,
      title: "3. Communication at Work",
      status: "completed",
      time: "18 min",
      type: "Reflection",
      description: "Evaluate workplace discussion scenarios, verbal phrasing, and non-verbal actions."
    },
    {
      id: 4,
      title: "4. Listening and Responding",
      status: "completed",
      time: "14 min",
      type: "Practice",
      description: "Practise active listening methods, interactive note-taking, and feedback loops."
    },
    {
      id: 5,
      title: "5. Building Confidence",
      status: "completed",
      time: "16 min",
      type: "Practice",
      description: "Build robust strategies to manage communication pressure and present ideas confidently."
    },
    {
      id: 6,
      title: "6. Preparing Your Examples",
      status: "completed",
      time: "20 min",
      type: "Practice",
      description: "Map your study, local volunteering, or household chores into employer-aligned keywords."
    },
    {
      id: 7,
      title: "7. Preparing for Interviews",
      status: "in-progress",
      time: "18 min",
      type: "Reading and practice",
      route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews",
      description: "Structure key interview replies using the STAR model and audit remote technical equipment."
    },
    {
      id: 8,
      title: "8. Following Up After Interviews",
      status: "upcoming",
      time: "14 min",
      type: "Reading",
      description: "Learn polite thank-you message templates and professional follow-up etiquette."
    },
    {
      id: 9,
      title: "9. Workplace Problem Solving",
      status: "upcoming",
      time: "16 min",
      type: "Practice",
      description: "Work with team members to resolve task blockers and address critical issues."
    },
    {
      id: 10,
      title: "10. Professional Communication Review",
      status: "upcoming",
      time: "18 min",
      type: "Reflection",
      description: "Evaluate your workplace communication standards against key performance criteria."
    },
    {
      id: 11,
      title: "11. Assignment Preparation",
      status: "upcoming",
      time: "20 min",
      type: "Assessment preparation",
      description: "Format your work written portfolio to meet assessment submission rules."
    },
    {
      id: 12,
      title: "12. Work Readiness Assignment",
      status: "draft-started",
      time: "Assessment task",
      type: "Written assignment",
      route: "/learner/assessments/work-readiness-assignment",
      description: "Draft, edit, and submit your portfolio assignment to Halima Sani for review."
    },
    {
      id: 13,
      title: "13. Professionalism & Ethics",
      status: "upcoming",
      time: "15 min",
      type: "Reading",
      description: "Navigate common ethical problems, data confidentiality, and respect."
    },
    {
      id: 14,
      title: "14. Pathway Evaluation & Survey",
      status: "upcoming",
      time: "15 min",
      type: "Reflection",
      description: "Share valuable feedback about your learning journey under the SUSTAIN CPD Programme."
    }
  ];

  // Course Materials
  const courseMaterials = [
    {
      title: "Low-Bandwidth Reading Version",
      helper: "Open a lightweight reading version of the current lesson.",
      route: "/learner/resources/low-bandwidth-reading-version",
      actionType: "Open"
    },
    {
      title: "Preparing for Interviews Summary",
      helper: "Download a concise summary of the current lesson.",
      actionType: "Download"
    },
    {
      title: "Interview Preparation Transcript",
      helper: "Read the text transcript without heavy media.",
      route: "/learner/resources/low-bandwidth-reading-version",
      actionType: "View"
    },
    {
      title: "Work Readiness Assignment Guide",
      helper: "Review the current assignment guide.",
      actionType: "Download"
    }
  ];

  // Helper Sub-Components for clean modular layout rendering
  
  // 1. Course Hero
  const CourseHero = () => (
    <Card id="course-hero" className="p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-stretch">
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <span onClick={() => navigateTo("/learner/courses")} className="hover:text-slate-900 cursor-pointer transition-colors">My Courses</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-900 font-bold">{courseData.title}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="neutral" className="bg-emerald-50 text-emerald-800 font-bold border border-emerald-100 text-[10px] px-2.5 py-0.5">
                Course in progress
              </Badge>
              <Badge variant="neutral" className="bg-blue-50 text-blue-800 font-bold border border-blue-100 text-[10px] px-2.5 py-0.5">
                Certificate-linked
              </Badge>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight pt-1">
              {courseData.title}
            </h2>
            <p className="text-xs text-slate-650 max-w-2xl leading-relaxed font-medium">
              Build practical work readiness skills, continue your interview preparation lesson, and complete the certificate-linked assignment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-3 bg-slate-50/50 border border-slate-100 p-4 rounded-xl text-xs font-semibold text-slate-600">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pathway</p>
              <p className="text-slate-900 truncate mt-0.5">{learnerContext.pathway}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lessons</p>
              <p className="text-slate-900 truncate mt-0.5">{courseData.lessonsCompleted} Completed</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Progress</p>
              <p className="text-slate-900 truncate mt-0.5">{courseData.progress}% Complete</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Facilitator</p>
              <p className="text-slate-900 truncate mt-0.5">{courseData.facilitator}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              Continue Lesson
            </Button>
            <Button
              onClick={() => navigateTo("/learner/courses")}
              variant="outline"
              className="border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer"
            >
              Back to My Courses
            </Button>
          </div>
        </div>

        {/* Right Deep Green Panel */}
        <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[220px]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-850/60 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 h-24 bg-emerald-800/40 rounded-full blur-lg pointer-events-none" />
          
          <div className="relative z-10 space-y-1">
            <span className="text-[9px] font-black text-emerald-200 uppercase tracking-widest bg-emerald-800/75 px-2 py-0.5 rounded-md inline-block">
              Current Lesson
            </span>
            <h4 className="text-base font-black text-white leading-snug pt-1">
              Preparing for Interviews
            </h4>
            <p className="text-[11px] text-emerald-100 leading-relaxed font-medium">
              Continue your lesson and practise clear answers before moving to the assignment.
            </p>
          </div>

          <div className="relative z-10 border-t border-emerald-800/60 pt-4 mt-2 flex items-center justify-between text-[10px] text-emerald-200/95 font-semibold">
            <span>Linked to Work Readiness Assignment</span>
            <span className="font-mono bg-emerald-850 px-1.5 py-0.5 rounded">SUSTAIN</span>
          </div>
        </div>
      </div>
    </Card>
  );

  // 2. Course Summary Cards
  const CourseSummaryCards = () => (
    <div id="course-summary-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Course Progress */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Course Progress</span>
          <p className="text-xl font-black text-emerald-800 font-sans">{courseData.progress}%</p>
          <span className="text-[10px] text-slate-500 font-medium block">{courseData.lessonsCompleted} lessons</span>
        </div>
        <LearnerContextHint
          title="What this means"
          text="Course progress is simulated in this frontend prototype and shows your current lesson completion state."
          align="right"
        />
      </Card>

      {/* Card 2: Current Lesson */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex flex-col justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200 text-left">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Current Lesson</span>
          <p className="text-xs font-black text-slate-800 truncate pr-2">{courseData.currentLesson}</p>
          <span className="text-[10px] text-slate-500 font-medium block">Reading and practice</span>
        </div>
      </Card>

      {/* Card 3: CPD Credits */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200">
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">CPD Credits</span>
          <p className="text-xl font-black text-slate-800 font-sans">{courseData.confirmedCpd} confirmed</p>
          <span className="text-[10px] text-slate-500 font-medium block">{courseData.pendingCpd} pending after review</span>
        </div>
        <LearnerContextHint
          title="How this works"
          text="Confirmed CPD credits count toward your SUSTAIN CPD Programme record. Pending credits depend on assessment review."
          align="right"
        />
      </Card>

      {/* Card 4: Certificate Link */}
      <Card className="p-4 bg-white border border-slate-200 shadow-sm rounded-xl flex flex-col justify-between min-h-[90px] hover:border-emerald-200 transition-all duration-200 text-left">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Certificate Link</span>
          <p className="text-xs font-black text-slate-800 truncate">Work Readiness</p>
          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded font-semibold inline-block border border-amber-100">
            Certificate review pending
          </span>
        </div>
      </Card>
    </div>
  );

  // 3. Continue Learning Focus
  const ContinueLearningFocus = () => (
    <Card id="continue-learning-focus" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Continue Learning</h3>
        <p className="text-xs text-slate-500">Your next recommended action in this course.</p>
      </div>

      <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-4 hover:border-emerald-200 transition-all">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-100">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">Preparing for Interviews</h4>
                <StatusChip status="in-progress">In progress</StatusChip>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold font-sans">68% lesson progress</p>
              <p className="text-xs text-slate-650 leading-relaxed font-medium pt-1">
                Practise clear interview answers using examples from your learning, work, volunteering, or community experience.
              </p>
            </div>
          </div>
          <div className="flex flex-col text-xs text-slate-500 gap-1.5 shrink-0 bg-white border border-slate-200 p-3 rounded-lg md:w-48 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-800" />
              18 min lesson
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-emerald-800" />
              Reading and practice
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-800" />
              Linked assignment
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1 border-t border-slate-200/60">
          <Button 
            onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
            className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Continue Lesson
          </Button>
          <Button 
            onClick={() => navigateTo("/learner/resources/low-bandwidth-reading-version")}
            variant="outline"
            className="border-slate-250 text-slate-700 hover:bg-slate-50 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer"
          >
            Open Low-Bandwidth Reading Version
          </Button>
          <Button 
            onClick={() => navigateTo("/learner/community/interview-preparation-discussion")}
            variant="outline"
            className="border-slate-250 text-slate-700 hover:bg-slate-50 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer"
          >
            Open Discussion
          </Button>
        </div>
      </div>
    </Card>
  );

  // 4. Course Modules
  const CourseModules = () => (
    <div id="course-modules" className="space-y-4">
      <div className="text-left bg-white p-5 border border-slate-200 rounded-2xl shadow-xs">
        <h3 className="text-base font-semibold text-slate-950 font-heading tracking-tight">Course Curriculum</h3>
        <p className="text-xs text-slate-500 mt-1">Open each module below to navigate lessons, checkpoints, assignments, and attendance requirements.</p>
      </div>
      <CourseCurriculumAccordion course={SUSTAIN_CURRICULUM_DATA} />
    </div>
  );

  // 5. Course Materials
  const CourseMaterials = () => (
    <Card id="course-materials" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">Course Materials</h3>
          <p className="text-xs text-slate-500">Resources connected to your current lesson and assessment.</p>
        </div>
        <Button 
          onClick={() => navigateTo("/learner/resources")}
          variant="outline"
          className="text-xs font-bold border-emerald-200 text-emerald-800 hover:bg-emerald-50/50 py-1.5 px-3 rounded-lg cursor-pointer"
        >
          Open Resources
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courseMaterials.map((mat, i) => (
          <div key={i} className="p-4 bg-slate-50/50 border border-slate-150 rounded-xl flex flex-col justify-between hover:border-emerald-200 transition-all">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-900">{mat.title}</h4>
              <p className="text-[11px] text-slate-600 leading-normal font-medium">{mat.helper}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                {mat.actionType === "Download" ? "PDF format" : "Text document"}
              </span>
              <Button
                onClick={() => {
                  if (mat.route) {
                    navigateTo(mat.route as any);
                  } else {
                    showToast("Download started in this frontend prototype.", "success");
                  }
                }}
                variant="outline"
                className="text-[10px] font-black py-1 px-3 border-slate-200 text-slate-700 hover:bg-white rounded-lg cursor-pointer"
              >
                {mat.actionType}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  // 6. Assessment Connection
  const AssessmentConnection = () => (
    <Card id="assessment-connection" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Assessment Connection</h3>
        <p className="text-xs text-slate-500">This course is linked to the Work Readiness Assignment and certificate review.</p>
      </div>

      <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Linked Evaluation Task</p>
            <p className="text-sm font-black text-slate-800">{courseData.assessment}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Draft started</span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-150 px-2 py-0.5 rounded border border-slate-200">Facilitator review required</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Credential Outcome</p>
            <p className="text-sm font-black text-slate-800">{courseData.certificate}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-150">Ready for certificate review</span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-150">Not issued</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-slate-650 leading-relaxed font-semibold max-w-md">
            Your final CPD credits (+4 CPD credits) will remain pending until Halima Sani completes her facilitator evaluation review of your submitted written assignment.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              onClick={() => navigateTo("/learner/assessments/work-readiness-assignment")}
              className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-4 rounded-lg cursor-pointer w-full sm:w-auto"
            >
              Open Assessment
            </Button>
            <Button 
              onClick={() => navigateTo("/learner/certificates/work-readiness-certificate")}
              variant="outline"
              className="border-slate-250 text-slate-700 hover:bg-slate-50 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer w-full sm:w-auto"
            >
              View Certificate Track
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  // 7. Practice and Community
  const CoursePracticeAndCommunity = () => (
    <Card id="practice-and-community" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Practice & Community</h3>
        <p className="text-xs text-slate-500">Use discussion and practice activities to strengthen your course learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Interview preparation discussion */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-emerald-200 transition-all h-full text-left">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 shrink-0">
              <MessageSquare className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 pt-1">Interview preparation discussion</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Practise common interview questions with facilitator guidance.
            </p>
          </div>
          <Button 
            onClick={() => navigateTo("/learner/community/interview-preparation-discussion")}
            variant="outline"
            className="w-full text-[10px] font-black py-2 mt-4 border-slate-200 text-slate-700 hover:bg-white rounded-lg cursor-pointer"
          >
            Open Discussion
          </Button>
        </div>

        {/* Card 2: Practice interview answer */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-emerald-200 transition-all h-full text-left">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 shrink-0">
              <Compass className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 pt-1">Practice interview answer</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Use the current lesson practice activity to write a short answer.
            </p>
          </div>
          <Button 
            onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
            variant="outline"
            className="w-full text-[10px] font-black py-2 mt-4 border-slate-200 text-slate-700 hover:bg-white rounded-lg cursor-pointer"
          >
            Open Lesson
          </Button>
        </div>

        {/* Card 3: Ask facilitator */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between hover:border-emerald-200 transition-all h-full text-left">
          <div className="space-y-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 shrink-0">
              <HelpCircle className="h-4.5 w-4.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 pt-1">Ask facilitator</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              Use support if you need help with the assignment or certificate readiness.
            </p>
          </div>
          <Button 
            onClick={() => navigateTo("/learner/support")}
            variant="outline"
            className="w-full text-[10px] font-black py-2 mt-4 border-slate-200 text-slate-700 hover:bg-white rounded-lg cursor-pointer"
          >
            Open Support
          </Button>
        </div>
      </div>
    </Card>
  );

  // 8. Course Completion Roadmap
  const CourseCompletionRoadmap = () => (
    <Card id="completion-roadmap" className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl text-left space-y-4">
      <div>
        <h3 className="text-base font-black text-slate-900 tracking-tight">Course Completion Roadmap</h3>
        <p className="text-xs text-slate-500">Your path from current lesson to assignment review.</p>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-150 space-y-6 pt-2 ml-2">
        {/* Row 1 */}
        <div className="relative">
          <span className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">1. Complete current lesson</p>
            <p className="text-[11px] text-amber-800 font-semibold">In progress</p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative">
          <span className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center shadow-xs">
            <Check className="h-2.5 w-2.5 text-white" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">2. Review low-bandwidth resources</p>
            <p className="text-[11px] text-emerald-800 font-semibold">Available</p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="relative">
          <span className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center shadow-xs">
            <Check className="h-2.5 w-2.5 text-white" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">3. Practise interview answer</p>
            <p className="text-[11px] text-emerald-800 font-semibold">Recommended</p>
          </div>
        </div>

        {/* Row 4 */}
        <div className="relative">
          <span className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">4. Complete Work Readiness Assignment</p>
            <p className="text-[11px] text-amber-800 font-semibold">Draft started</p>
          </div>
        </div>

        {/* Row 5 */}
        <div className="relative">
          <span className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">5. Facilitator review</p>
            <p className="text-[11px] text-slate-500 font-semibold">Pending after submission</p>
          </div>
        </div>

        {/* Row 6 */}
        <div className="relative">
          <span className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">6. CPD confirmation</p>
            <p className="text-[11px] text-slate-500 font-semibold">Pending review</p>
          </div>
        </div>

        {/* Row 7 */}
        <div className="relative">
          <span className="absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center shadow-xs">
            <Lock className="h-2.5 w-2.5 text-slate-400" />
          </span>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">7. Certificate issue</p>
            <p className="text-[11px] text-slate-500 font-semibold">Locked until review completion</p>
          </div>
        </div>
      </div>
    </Card>
  );

  // 9. Side status widget
  const CourseStatusWidget = () => (
    <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
        Course Status
      </h3>
      
      <div className="space-y-3 text-xs">
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Course</p>
          <p className="font-extrabold text-slate-900">{courseData.title}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Status</p>
          <p className="font-bold text-emerald-800">{courseData.status}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Progress</p>
          <p className="font-sans font-bold text-slate-900">{courseData.progress}%</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Lessons</p>
          <p className="font-bold text-slate-800">{courseData.lessonsCompleted} completed</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Remaining Time</p>
          <p className="font-bold text-slate-800">{courseData.remainingTime}</p>
        </div>
      </div>

      <Button
        onClick={() => navigateTo("/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews")}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-2"
      >
        Continue Lesson
      </Button>
    </Card>
  );

  // 10. Learning Pathway Context Widget
  const PathwayContextWidget = () => (
    <Card 
      id="learning-pathway-context-card"
      className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-left hover:border-emerald-200 hover:shadow-md transition-all duration-200 ease-out space-y-5"
    >
      <div>
        <h3 className="text-xl font-semibold text-slate-950 font-heading">Learning Pathway Context</h3>
        <p className="text-sm text-slate-600 mt-0.5">Your course, cohort, and certificate progress at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Pathway Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">Pathway</span>
            <p className="text-sm font-semibold text-slate-950 font-sans mt-1 leading-snug">{learnerContext.pathway}</p>
          </div>
        </div>

        {/* Programme Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">Programme</span>
            <p className="text-sm font-semibold text-slate-950 font-sans mt-1 leading-snug">{learnerContext.programme}</p>
          </div>
        </div>

        {/* Cohort Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">Cohort</span>
            <p className="text-sm font-semibold text-slate-950 font-sans mt-1 leading-snug">{learnerContext.cohort}</p>
          </div>
        </div>

        {/* Facilitator Block */}
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 font-sans">Facilitator</span>
            <p className="text-sm font-semibold text-emerald-800 font-sans mt-1 leading-snug">{learnerContext.facilitator}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Button 
          variant="custom"
          onClick={() => navigateTo("/learner/journey")}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2.5 rounded-xl min-h-[44px] transition-colors"
        >
          View My Journey
        </Button>
        <Button 
          variant="custom"
          onClick={() => navigateTo("/learner/profile")}
          className="w-full bg-white border border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 text-xs font-semibold py-2.5 rounded-xl min-h-[44px] transition-colors"
        >
          Open Profile
        </Button>
      </div>
    </Card>
  );

  // 11. Certificate & CPD Widget
  const CertificateCpdWidget = () => (
    <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
        Certificate & CPD Connection
      </h3>

      <div className="space-y-3 text-xs">
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Certificate</p>
          <p className="font-extrabold text-slate-800">{courseData.certificate}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Status</p>
          <span className="inline-block text-[10px] font-bold text-amber-805 bg-amber-50 px-2 py-0.5 rounded border border-amber-150 mt-1">
            Ready for certificate review
          </span>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Issue State</p>
          <p className="font-bold text-slate-500">Not issued</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">CPD Progress</p>
          <p className="font-bold text-slate-800">22 of 35 credits</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase">Pending CPD</p>
          <p className="font-bold text-amber-800">4 credits</p>
        </div>
      </div>

      <Button
        onClick={() => navigateTo("/learner/certificates/work-readiness-certificate")}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer mt-2"
      >
        View Certificate Track
      </Button>
    </Card>
  );

  // 12. Recent Course Activity
  const RecentActivityWidget = () => (
    <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
        Recent Course Activity
      </h3>

      <div className="space-y-3 text-xs">
        <div className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2">
          <p className="font-bold text-slate-800">Course detail opened</p>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">Today</span>
        </div>
        <div className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2">
          <p className="font-bold text-slate-800">Preparing for Interviews continued</p>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">Today</span>
        </div>
        <div className="flex items-start justify-between gap-2 border-b border-slate-50 pb-2">
          <p className="font-bold text-slate-800">Low-bandwidth resource opened</p>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">Yesterday</span>
        </div>
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-slate-800">Work Readiness Assignment draft saved</p>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">Yesterday</span>
        </div>
      </div>
    </Card>
  );

  // 13. Quick Actions
  const QuickActionsWidget = () => {
    const actions = [
      { id: "back", label: "Back to My Courses", route: "/learner/courses", helper: "Return to the courses overview." },
      { id: "continue", label: "Continue Lesson", route: "/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews", helper: "Open the current interactive lesson." },
      { id: "resource", label: "Open Resource", route: "/learner/resources/low-bandwidth-reading-version", helper: "Read the lightweight lesson transcript." },
      { id: "assessment", label: "Open Assessment", route: "/learner/assessments/work-readiness-assignment", helper: "Draft or edit your written assignment." },
      { id: "discussion", label: "Open Discussion", route: "/learner/community/interview-preparation-discussion", helper: "Participate in professional cohort discussions." },
      { id: "certificate", label: "View Certificate Track", route: "/learner/certificates/work-readiness-certificate", helper: "Check eligibility status and requirements." },
      { id: "support", label: "Open Support", route: "/learner/support", helper: "Ask questions or review support tickets." }
    ];

    return (
      <Card className="p-5 border-slate-200 bg-white space-y-4 rounded-xl text-left">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Quick Actions
        </h3>

        <div className="space-y-2">
          {actions.map((act) => (
            <div 
              key={act.id}
              onClick={() => navigateTo(act.route as any)}
              className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-slate-50/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate">
                  {act.label}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
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

  // 14. Responsive Layouts

  // A. Desktop Experience
  const DesktopCourseDetail = () => (
    <div id="desktop-course-detail" className="hidden lg:flex min-h-screen bg-slate-50 text-slate-950 w-full">
      {/* SIDEBAR */}
      <LearnerSidebar />

      {/* MAIN MAIN CONTENT CONTAINER */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search lessons, course materials, assessments..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-800 transition-all font-semibold"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo("/learner/notifications")} 
              className="p-1.5 text-slate-500 hover:text-slate-900 relative transition-colors cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-700 animate-pulse" />
            </button>
            <button 
              onClick={() => navigateTo("/learner/support")} 
              className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div 
              onClick={() => navigateTo("/learner/profile")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-emerald-700 group-hover:scale-105 transition-transform">
                AM
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-900">{learnerContext.name}</p>
                <p className="text-[9px] text-slate-400 font-mono font-bold leading-none">{learnerContext.id}</p>
              </div>
            </div>
          </div>
        </header>

        {/* BODY WRAPPER */}
        <div className="p-8 space-y-6 max-w-[1400px] w-full mx-auto">
          {/* Hero */}
          <CourseHero />

          {/* KPI summaries */}
          <CourseSummaryCards />

          {/* Content columns */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
            {/* Left elements */}
            <div className="space-y-6">
              <ContinueLearningFocus />
              <CourseModules />
              <CourseMaterials />
              <AssessmentConnection />
              <CoursePracticeAndCommunity />
              <CourseCompletionRoadmap />
            </div>

            {/* Right widgets */}
            <div className="space-y-6">
              <CourseStatusWidget />
              <PathwayContextWidget />
              <CertificateCpdWidget />
              <LearnerSupportCard 
                title="Support Center"
                text="Need assistance with your learning pathway?"
                buttonText="Open Support"
              />
              <RecentActivityWidget />
              <QuickActionsWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // B. Tablet Experience
  const TabletCourseDetail = () => (
    <div id="tablet-course-detail" className="hidden md:block lg:hidden min-h-screen bg-slate-50 text-slate-950 pb-28">
      {/* Compact Learner Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center font-black text-xs">
            S
          </div>
          <span className="text-sm font-black text-slate-900 tracking-tight">SUSTAIN LMS</span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo("/learner/support")} className="p-1.5 text-slate-500">
            <HelpCircle className="h-4.5 w-4.5" />
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <div onClick={() => navigateTo("/learner/profile")} className="flex items-center gap-2 cursor-pointer">
            <div className="h-7 w-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              AM
            </div>
            <span className="text-xs font-bold text-slate-800">{learnerContext.name}</span>
          </div>
        </div>
      </header>

      {/* Main stacked contents */}
      <main className="max-w-4xl mx-auto px-5 py-6 space-y-6">
        <CourseHero />
        <CourseSummaryCards />
        <ContinueLearningFocus />
        <CourseModules />
        <CourseMaterials />
        <AssessmentConnection />
        <CoursePracticeAndCommunity />
        <CourseCompletionRoadmap />
        <CourseStatusWidget />
        <PathwayContextWidget />
        <CertificateCpdWidget />
        <LearnerSupportCard 
          title="Support Center"
          text="Need assistance with your learning pathway?"
          buttonText="Open Support"
        />
        <RecentActivityWidget />
        <QuickActionsWidget />
      </main>

      {/* Nav */}
      <LearnerMobileNav />
    </div>
  );

  // C. Mobile Experience
  const MobileCourseDetail = () => (
    <div id="mobile-course-detail" className="md:hidden min-h-screen bg-slate-50 text-slate-950 pb-24">
      {/* Compact Mobile Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => navigateTo("/learner/courses")}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 cursor-pointer shrink-0"
            aria-label="Back to courses"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-md font-extrabold tracking-tight text-emerald-900 font-sans">SUSTAIN LMS</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateTo("/learner/support")} 
            className="p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
            aria-label="Support"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <div 
            onClick={() => navigateTo("/learner/profile")} 
            className="h-8 w-8 rounded-full bg-emerald-900 text-white font-extrabold text-xs flex items-center justify-center cursor-pointer shrink-0 shadow-xs"
          >
            AM
          </div>
        </div>
      </header>

      {/* Stacked content */}
      <main className="p-4 space-y-5">
        <CourseHero />
        <CourseSummaryCards />
        <CourseModules />
        <CourseMaterials />
        <AssessmentConnection />
        <CoursePracticeAndCommunity />
        <CourseCompletionRoadmap />
      </main>

      {/* Bottom Nav */}
      <LearnerMobileNav />
    </div>
  );

  return (
    <div id="course-detail-root" className="min-h-screen bg-slate-50 text-slate-950 antialiased selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* Toast Layer */}
      {toast && (
        <div 
          id="toast-notification"
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-slate-900 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-2xl border border-slate-800 animate-slide-in-right max-w-sm"
        >
          <div className={`h-2 w-2 rounded-full ${
            toast.type === "success" ? "bg-emerald-500" :
            toast.type === "warning" ? "bg-amber-500" : "bg-blue-500"
          }`} />
          <span>{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:text-slate-300 cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Responsive renderers */}
      <DesktopCourseDetail />
      <TabletCourseDetail />
      <MobileCourseDetail />
    </div>
  );
}

export default LearnerCourseDetailPage;
