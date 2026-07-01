export interface RegionStat {
  state: string;
  enrolled: number;
  active: number;
  completed: number;
  target: number;
}

export interface PathwayStat {
  name: string;
  enrolled: number;
  completed: number;
  cpdTargetMet: number;
}

export interface CohortItem {
  id: string;
  name: string;
  pathway: string;
  location: string;
  lga?: string;
  status?: string;
  facilitator: string;
  enrolled: number;
  activeLearners: number;
  completedLearners: number;
  lowBandwidthUsers: number;
  avgProgress: number; // percentage
  reviewsPending: number;
  startDate?: string;
  expectedTarget?: number;
  lowBandwidthEnabled?: boolean;
}

export interface ProgrammeLearner {
  id: string;
  name: string;
  pathway: string;
  cohort: string;
  location: string;
  status: "Completed" | "Under Review" | "Active" | "Needs Follow-Up";
  cpdCredits: number;
  maxCredits: number;
  lowBandwidthEnabled: boolean;
  attendanceRate: number; // percentage
  gender: "Female" | "Male" | "Other";
  lastActive: string;
}

export interface CertificateReview {
  id: string;
  learnerId: string;
  learnerName: string;
  pathway: string;
  cohort: string;
  submittedAt: string;
  cpdCreditsEarned: number;
  facilitatorNotes: string;
  status: "Pending Approval" | "Query Raised" | "Approved";
  documents: { title: string; size: string }[];
}

export interface SupportTicket {
  id: string;
  cohortName: string;
  facilitatorName: string;
  location: string;
  subject: string;
  message: string;
  severity: "High" | "Medium" | "Low";
  hoursOpen: number;
  status: "Unresolved" | "In Progress" | "Resolved";
  responseTrend: "Alarm" | "Normal";
}

// -------------------------------------------------------------------------
// DATA INSTANCES
// -------------------------------------------------------------------------

export const REGION_STATS: RegionStat[] = [
  { state: "Lagos", enrolled: 1420, active: 1100, completed: 210, target: 3000 },
  { state: "Kano", enrolled: 1250, active: 950, completed: 180, target: 2500 },
  { state: "Kaduna", enrolled: 960, active: 780, completed: 90, target: 2500 },
  { state: "Enugu", enrolled: 656, active: 490, completed: 52, target: 2000 }
];

export const PATHWAY_STATS: PathwayStat[] = [
  { name: "Youth Employability Pathway", enrolled: 2580, completed: 312, cpdTargetMet: 420 },
  { name: "Work Readiness Foundation", enrolled: 1706, completed: 220, cpdTargetMet: 302 }
];

export const COHORTS_DATA: CohortItem[] = [
  {
    id: "COH-LAG-01",
    name: "Lagos Work Readiness 01",
    pathway: "Work Readiness Foundation",
    location: "Lagos",
    facilitator: "Adewale Okoye",
    enrolled: 124,
    activeLearners: 98,
    completedLearners: 12,
    lowBandwidthUsers: 45,
    avgProgress: 78,
    reviewsPending: 3
  },
  {
    id: "COH-KAN-02",
    name: "Kano Youth Employability 02",
    pathway: "Youth Employability Pathway",
    location: "Kano",
    facilitator: "Halima Sani",
    enrolled: 156,
    activeLearners: 112,
    completedLearners: 18,
    lowBandwidthUsers: 89,
    avgProgress: 64,
    reviewsPending: 8
  },
  {
    id: "COH-KAD-01",
    name: "Kaduna Youth Employability 01",
    pathway: "Youth Employability Pathway",
    location: "Kaduna",
    facilitator: "Ibrahim Musa",
    enrolled: 98,
    activeLearners: 74,
    completedLearners: 6,
    lowBandwidthUsers: 62,
    avgProgress: 59,
    reviewsPending: 2
  },
  {
    id: "COH-ENU-03",
    name: "Enugu Work Readiness 03",
    pathway: "Work Readiness Foundation",
    location: "Enugu",
    facilitator: "Chidi Nze",
    enrolled: 85,
    activeLearners: 62,
    completedLearners: 8,
    lowBandwidthUsers: 14,
    avgProgress: 82,
    reviewsPending: 0
  }
];

export const LEARNERS_DATA: ProgrammeLearner[] = [
  {
    id: "STN-2026-0091",
    name: "Amina Bello",
    pathway: "Youth Employability Pathway",
    cohort: "Kano Youth Employability 02",
    location: "Kano",
    status: "Completed",
    cpdCredits: 35,
    maxCredits: 35,
    lowBandwidthEnabled: true,
    attendanceRate: 98,
    gender: "Female",
    lastActive: "2 hours ago"
  },
  {
    id: "STN-2026-0428",
    name: "Chinedu Okafor",
    pathway: "Work Readiness Foundation",
    cohort: "Lagos Work Readiness 01",
    location: "Lagos",
    status: "Under Review",
    cpdCredits: 32,
    maxCredits: 35,
    lowBandwidthEnabled: false,
    attendanceRate: 92,
    gender: "Male",
    lastActive: "1 day ago"
  },
  {
    id: "STN-2026-1102",
    name: "Funmilayo Adebayo",
    pathway: "Youth Employability Pathway",
    cohort: "Lagos Work Readiness 01",
    location: "Lagos",
    status: "Active",
    cpdCredits: 22,
    maxCredits: 35,
    lowBandwidthEnabled: true,
    attendanceRate: 88,
    gender: "Female",
    lastActive: "30 mins ago"
  },
  {
    id: "STN-2026-0715",
    name: "Yusuf Yusuf",
    pathway: "Youth Employability Pathway",
    cohort: "Kano Youth Employability 02",
    location: "Kano",
    status: "Needs Follow-Up",
    cpdCredits: 14,
    maxCredits: 35,
    lowBandwidthEnabled: true,
    attendanceRate: 65,
    gender: "Male",
    lastActive: "5 days ago"
  },
  {
    id: "STN-2026-0811",
    name: "Chioma Egwu",
    pathway: "Work Readiness Foundation",
    cohort: "Enugu Work Readiness 03",
    location: "Enugu",
    status: "Completed",
    cpdCredits: 35,
    maxCredits: 35,
    lowBandwidthEnabled: false,
    attendanceRate: 100,
    gender: "Female",
    lastActive: "1 hour ago"
  },
  {
    id: "STN-2026-0549",
    name: "Murtala Mohammed",
    pathway: "Youth Employability Pathway",
    cohort: "Kaduna Youth Employability 01",
    location: "Kaduna",
    status: "Active",
    cpdCredits: 18,
    maxCredits: 35,
    lowBandwidthEnabled: true,
    attendanceRate: 85,
    gender: "Male",
    lastActive: "Yesterday"
  },
  {
    id: "STN-2026-1023",
    name: "Grace Edet",
    pathway: "Work Readiness Foundation",
    cohort: "Enugu Work Readiness 03",
    location: "Enugu",
    status: "Active",
    cpdCredits: 28,
    maxCredits: 35,
    lowBandwidthEnabled: false,
    attendanceRate: 95,
    gender: "Female",
    lastActive: "3 hours ago"
  }
];

export const CERTIFICATE_REVIEWS: CertificateReview[] = [
  {
    id: "CR-001",
    learnerId: "STN-2026-0091",
    learnerName: "Amina Bello",
    pathway: "Youth Employability Pathway",
    cohort: "Kano Youth Employability 02",
    submittedAt: "2026-06-28",
    cpdCreditsEarned: 35,
    facilitatorNotes: "Excellent performance. Completed all 5 major modules. Low bandwidth pack verified, attendance verified 98%. Recommending for national certificate of competence.",
    status: "Pending Approval",
    documents: [
      { title: "Kano_CPD_Portfolio_AminaBello.pdf", size: "1.8 MB" },
      { title: "Verification_Checklist_Sani.pdf", size: "320 KB" }
    ]
  },
  {
    id: "CR-002",
    learnerId: "STN-2026-0811",
    learnerName: "Chioma Egwu",
    pathway: "Work Readiness Foundation",
    cohort: "Enugu Work Readiness 03",
    submittedAt: "2026-06-29",
    cpdCreditsEarned: 35,
    facilitatorNotes: "Perfect attendance record. Fully met the evaluation rubric of Enugu CPD review panel.",
    status: "Pending Approval",
    documents: [
      { title: "Enugu_Portfolio_ChiomaEgwu.pdf", size: "2.1 MB" }
    ]
  },
  {
    id: "CR-003",
    learnerId: "STN-2026-0428",
    learnerName: "Chinedu Okafor",
    pathway: "Work Readiness Foundation",
    cohort: "Lagos Work Readiness 01",
    submittedAt: "2026-06-25",
    cpdCreditsEarned: 32,
    facilitatorNotes: "CPD target was 35, but learner achieved 32 credits which meets local co-chair waiver standard for youth entering vocational internships.",
    status: "Query Raised",
    documents: [
      { title: "Lagos_Internship_Waiver_Approval.pdf", size: "1.1 MB" }
    ]
  }
];

export const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "TKT-042",
    cohortName: "Kano Youth Employability 02",
    facilitatorName: "Halima Sani",
    location: "Kano",
    subject: "Assessment verification upload failing over EDGE",
    message: "Two learners Amina Sani & Kabir Ahmed completed their offline interview exercises, but the visual portfolio PDF is failing to upload due to high network drop-out on EDGE. Do we have a localized compression recommendation?",
    severity: "High",
    hoursOpen: 48,
    status: "Unresolved",
    responseTrend: "Alarm"
  },
  {
    id: "TKT-038",
    cohortName: "Kaduna Youth Employability 01",
    facilitatorName: "Ibrahim Musa",
    location: "Kaduna",
    subject: "Unlocking Lesson 4 offline pack",
    message: "Unable to sync the offline lesson zip for Lesson 4 using our localized Facilitator hub key. Need confirmation from delivery office.",
    severity: "Medium",
    hoursOpen: 26,
    status: "In Progress",
    responseTrend: "Normal"
  },
  {
    id: "TKT-045",
    cohortName: "Lagos Work Readiness 01",
    facilitatorName: "Adewale Okoye",
    location: "Lagos",
    subject: "Waiver request process documentation",
    message: "Requesting clarity on whether we should upload local co-chair waiver docs directly in the portfolio checklist or email the national delivery office.",
    severity: "Low",
    hoursOpen: 3,
    status: "Unresolved",
    responseTrend: "Normal"
  }
];

// Gender-Disaggregated Data for RFP Reporting
export const GENDER_ANALYTICS = {
  overall: {
    total: 4286,
    female: 2357, // 55%
    male: 1886, // 44%
    other: 43 // 1%
  },
  pathwayDistribution: [
    { name: "Youth Employability Pathway", female: 1445, male: 1110, other: 25 },
    { name: "Work Readiness Foundation", female: 912, male: 776, other: 18 }
  ],
  completionByGender: {
    female: { enrolled: 2357, completed: 320, rate: 13.6 },
    male: { enrolled: 1886, completed: 206, rate: 10.9 },
    other: { enrolled: 43, completed: 6, rate: 14.0 }
  },
  cpdMilestones: [
    { title: "Reached 35 Credits", female: 320, male: 206 },
    { title: "20-34 Credits", female: 1145, male: 890 },
    { title: "1-19 Credits", female: 712, male: 610 },
    { title: "No Credits Yet", female: 180, male: 180 }
  ]
};
