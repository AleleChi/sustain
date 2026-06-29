export interface LearnerContext {
  name: string;
  email: string;
  learnerId: string;
  programme: string;
  pathway: string;
  organisation: string;
  cohort: string;
  facilitator: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  currentCourse: string;
  currentModule: string;
  currentLesson: string;
  certificate: string;
  certificateStatus: string;
  pathwayProgress: number; // e.g., 42
  dailyGoalProgress: number; // e.g., 60
  coursesCompleted: number; // 2
  totalCourses: number; // 7
  lessonsCompleted: number; // 18
  totalLessons: number; // 42
  cpdCredits: number; // 22
  totalCpdCredits: number; // 35
  assessmentsDue: number; // 1
}

export const mockLearner: LearnerContext = {
  name: "Aisha Mohammed",
  email: "aisha.mohammed@example.com",
  learnerId: "SUST-LRN-0442",
  programme: "SUSTAIN CPD Programme",
  pathway: "Youth Employability Pathway",
  organisation: "Kano Youth Skills Hub",
  cohort: "Kano Youth Employability Cohort 02",
  facilitator: {
    name: "Halima Sani",
    role: "Lead Facilitator",
  },
  currentCourse: "Work Readiness Foundation",
  currentModule: "Workplace Communication",
  currentLesson: "Preparing for Interviews",
  certificate: "Work Readiness Certificate",
  certificateStatus: "Not Yet Eligible",
  pathwayProgress: 42,
  dailyGoalProgress: 60,
  coursesCompleted: 2,
  totalCourses: 7,
  lessonsCompleted: 18,
  totalLessons: 42,
  cpdCredits: 22,
  totalCpdCredits: 35,
  assessmentsDue: 1,
};
