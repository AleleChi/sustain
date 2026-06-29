export interface FacilitatorCohort {
  id: string;
  name: string;
  programme: string;
  pathway: string;
  learnerCount: number;
  completionStatus: number; // percentage
  pendingReviews: number;
  lastActivity: string;
  facilitatorNotes: string;
}

export interface FacilitatorLearner {
  id: string;
  name: string;
  email: string;
  cohortId: string;
  currentCourse: string;
  progress: number; // percentage
  lastActivity: string;
  supportStatus: "Stable" | "Needs Attention";
  reasonForAttention?: string;
  completedCourses: string[];
  assessmentHistory: {
    title: string;
    status: "Passed" | "Pending Review" | "Returned for Revision" | "Approved";
    score?: string;
    submittedDate?: string;
  }[];
  notes: string[];
}

export interface AssessmentSubmission {
  id: string;
  learnerId: string;
  learnerName: string;
  cohortId: string;
  cohortName: string;
  course: string;
  assessmentTitle: string;
  submissionDate: string;
  status: "Pending Review" | "Returned for Revision" | "Approved";
  studentResponses: {
    question: string;
    answer: string;
  }[];
  attachments: {
    name: string;
    size: string;
  }[];
  feedback?: {
    score: number; // e.g. 85 / 100
    comments: string;
    rubricScores: {
      criterion: string;
      score: number;
      maxScore: number;
      feedback: string;
    }[];
    reviewedBy: string;
    reviewedDate: string;
  };
}

export interface FacilitatorDiscussion {
  id: string;
  title: string;
  cohortId: string;
  cohortName: string;
  authorName: string;
  authorRole: "Learner" | "Facilitator" | "Coordinator";
  content: string;
  repliesCount: number;
  unreplied: boolean;
  lastActive: string;
  replies: {
    id: string;
    author: string;
    role: string;
    content: string;
    date: string;
  }[];
}

export interface FacilitatorSession {
  id: string;
  title: string;
  cohortId: string;
  cohortName: string;
  date: string; // e.g. "2026-06-28"
  time: string; // e.g. "10:00 AM - 12:00 PM"
  type: "In-Person Hub" | "Online Webinar" | "Virtual Workshop";
  venue: string; // e.g. "Kano Central Library Lab"
  status: "Upcoming" | "Completed" | "Cancelled";
  attendanceRecorded: boolean;
  attendanceRate?: number; // e.g. 92
  notes?: string;
}

export interface FacilitatorResource {
  id: string;
  title: string;
  category: "Guides" | "Rubrics" | "Programme Manuals" | "Facilitation Slides";
  type: "PDF" | "DOCX" | "SLIDES";
  size: string;
  description: string;
  lastUpdated: string;
}

export interface FacilitatorReport {
  id: string;
  cohortId: string;
  cohortName: string;
  metrics: {
    enrolled: number;
    activeThisWeek: number;
    completionRate: number; // %
    averageScore: number; // %
    attendanceRate: number; // %
  };
  weeklyActivityTrend: { week: string; engagementHours: number }[];
}

export interface FacilitatorMessage {
  id: string;
  senderName: string;
  senderRole: "Learner" | "Coordinator" | "System";
  avatarInitials: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: {
    id: string;
    sender: "You" | "Other";
    content: string;
    time: string;
  }[];
}

// Mock Data Definitions
export const mockFacilitatorCohorts: FacilitatorCohort[] = [
  {
    id: "kaduna-01",
    name: "Kaduna Agribusiness Cohort",
    programme: "SUSTAIN Agribusiness Programme",
    pathway: "Agribusiness Value Chain Pathway",
    learnerCount: 24,
    completionStatus: 75,
    pendingReviews: 1,
    lastActivity: "Yesterday, 04:45 PM",
    facilitatorNotes: "Strong participation in farm management modules."
  },
  {
    id: "abuja-03",
    name: "Abuja Cooperative Development Cohort",
    programme: "SUSTAIN Cooperative Programme",
    pathway: "Cooperative Leadership Pathway",
    learnerCount: 34,
    completionStatus: 18,
    pendingReviews: 0,
    lastActivity: "3 days ago",
    facilitatorNotes: "Focus on community leadership and micro-savings models."
  },
  {
    id: "lagos-01",
    name: "Lagos Market Access Cohort",
    programme: "SUSTAIN Enterprise Programme",
    pathway: "Market Integration Pathway",
    learnerCount: 19,
    completionStatus: 50,
    pendingReviews: 2,
    lastActivity: "2 hours ago",
    facilitatorNotes: "Highly active in direct-to-consumer digital marketing tasks."
  },
  {
    id: "kano-02",
    name: "Kano Youth Employability Cohort 02",
    programme: "SUSTAIN CPD Programme",
    pathway: "Youth Employability",
    learnerCount: 510,
    completionStatus: 58,
    pendingReviews: 18,
    lastActivity: "Today, 10:30 AM",
    facilitatorNotes: "Monitor learner progress, assessment status, CPD credits, certificate readiness, and follow-up actions for this cohort."
  }
];

export const mockFacilitatorLearners: FacilitatorLearner[] = [
  {
    id: "SUST-LRN-0442",
    name: "Aisha Mohammed",
    email: "aisha.mohammed@example.com",
    cohortId: "kano-02",
    currentCourse: "Work Readiness Foundation",
    progress: 42,
    lastActivity: "Today, 09:12 AM",
    supportStatus: "Stable",
    completedCourses: ["Digital Readiness Basics", "Communication Skills"],
    assessmentHistory: [
      { title: "Work Readiness Assignment", status: "Pending Review", submittedDate: "24 Jun 2026" },
      { title: "Digital Readiness Quiz", status: "Passed", score: "88%" },
      { title: "Communication Skills Assessment", status: "Passed", score: "92%" }
    ],
    notes: [
      "Aisha is very engaged in class discussion. Highly articulate in her written responses.",
      "Struggled initially with the online assessment platform, resolved after a short check-in on June 18."
    ]
  },
  {
    id: "SUST-LRN-0443",
    name: "Yusuf Ibrahim",
    email: "yusuf.ibrahim@example.com",
    cohortId: "kano-02",
    currentCourse: "Work Readiness Foundation",
    progress: 35,
    lastActivity: "Yesterday, 03:30 PM",
    supportStatus: "Stable",
    completedCourses: ["Digital Readiness Basics"],
    assessmentHistory: [
      { title: "Work Readiness Assignment", status: "Returned for Revision", submittedDate: "22 Jun 2026" },
      { title: "Digital Readiness Quiz", status: "Passed", score: "72%" }
    ],
    notes: [
      "Returned his work-readiness assignment for revision. He missed Section 3 on workplace communication protocols.",
      "Eager to learn, just needs to slow down and read rubrics fully."
    ]
  },
  {
    id: "SUST-LRN-0444",
    name: "Aminu Bello",
    email: "aminu.bello@example.com",
    cohortId: "kano-02",
    currentCourse: "Work Readiness Foundation",
    progress: 12,
    lastActivity: "5 days ago",
    supportStatus: "Needs Attention",
    reasonForAttention: "Inactive for 5+ days & missing foundational module submissions",
    completedCourses: [],
    assessmentHistory: [
      { title: "Digital Readiness Quiz", status: "Returned for Revision", submittedDate: "15 Jun 2026" }
    ],
    notes: [
      "Having sporadic electricity and internet challenges in Kano hub outskirts.",
      "Needs a facilitator phone call outreach to discuss low-bandwidth offline options."
    ]
  },
  {
    id: "SUST-LRN-0445",
    name: "Chidi Okeke",
    email: "chidi.okeke@example.com",
    cohortId: "kaduna-01",
    currentCourse: "Digital Literacy Advanced",
    progress: 85,
    lastActivity: "Today, 11:40 AM",
    supportStatus: "Stable",
    completedCourses: ["Digital Readiness Basics", "Communication Skills", "Work Readiness Foundation"],
    assessmentHistory: [
      { title: "Advanced Cybersecurity Basics", status: "Passed", score: "96%" },
      { title: "Excel Mastery Quiz", status: "Passed", score: "100%" }
    ],
    notes: [
      "Exceptional student. Ready to act as a volunteer peer-leader for upcoming cohorts.",
      "Requested details about advanced certification on June 20."
    ]
  },
  {
    id: "SUST-LRN-0446",
    name: "Fatima Aliyu",
    email: "fatima.aliyu@example.com",
    cohortId: "kano-02",
    currentCourse: "Work Readiness Foundation",
    progress: 48,
    lastActivity: "2 hours ago",
    supportStatus: "Stable",
    completedCourses: ["Digital Readiness Basics", "Communication Skills"],
    assessmentHistory: [
      { title: "Work Readiness Assignment", status: "Approved", score: "90%", submittedDate: "20 Jun 2026" },
      { title: "Communication Skills Assessment", status: "Passed", score: "84%" }
    ],
    notes: [
      "Demonstrates high critical-thinking skills. Beautiful assignment paper."
    ]
  },
  {
    id: "LNR-2026-1045",
    name: "Amina Yusuf",
    email: "amina.yusuf@example.com",
    cohortId: "kaduna-01",
    currentCourse: "Sustainable Supply Chains",
    progress: 68,
    lastActivity: "Today, 10:15 AM",
    supportStatus: "Needs Attention",
    completedCourses: ["Agribusiness Foundations", "Market Access Fundamentals"],
    assessmentHistory: [
      { title: "Sustainable Supply Chains Project", status: "Pending Review", submittedDate: "24 Jun 2026" },
      { title: "Market Access Fundamentals Assessment", status: "Approved", score: "88%", submittedDate: "14 Jun 2026" },
      { title: "Agribusiness Foundations Assessment", status: "Passed", score: "92%", submittedDate: "28 May 2026" }
    ],
    notes: [
      "Learner requires additional support.",
      "Recommended follow-up after assessment.",
      "Excellent participation during recent session."
    ]
  }
];

export const mockAssessmentSubmissions: AssessmentSubmission[] = [
  {
    id: "sub-101",
    learnerId: "SUST-LRN-0442",
    learnerName: "Aisha Mohammed",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    course: "Work Readiness Foundation",
    assessmentTitle: "Work Readiness Assignment",
    submissionDate: "24 Jun 2026",
    status: "Pending Review",
    studentResponses: [
      {
        question: "Explain how you would handle conflict in a team setting where a peer is not contributing their share of a group presentation.",
        answer: "I would approach my peer privately first to express my concerns using positive and non-accusatory language. I would ask if they are facing any specific challenges or constraints, and try to find a collaborative compromise. If the behaviour persists and threatens the project delivery, I would seek support from our team leads or facilitators while maintaining objective and professional documentation of our communications."
      },
      {
        question: "Describe your personal schedule management strategy for balancing study goals with daily community responsibilities.",
        answer: "I use a structured block-scheduling technique. I reserve 8:00 AM to 10:00 AM every morning strictly for my SUSTAIN online courseware while my local hub has stable internet access. I allocate my family and community responsibilities to afternoon blocks. By setting this dedicated space, I keep a stable daily progress pace of 3-4 lessons per week."
      }
    ],
    attachments: [
      { name: "Work_Readiness_Draft_Aisha.pdf", size: "1.4 MB" },
      { name: "Team_Coordination_Flowchart.docx", size: "480 KB" }
    ]
  },
  {
    id: "sub-102",
    learnerId: "SUST-LRN-0443",
    learnerName: "Yusuf Ibrahim",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    course: "Work Readiness Foundation",
    assessmentTitle: "Work Readiness Assignment",
    submissionDate: "22 Jun 2026",
    status: "Returned for Revision",
    studentResponses: [
      {
        question: "Explain how you would handle conflict in a team setting where a peer is not contributing their share of a group presentation.",
        answer: "I would just do the whole work myself and let the facilitator know after the presentation is over, so the grade does not get ruined."
      },
      {
        question: "Describe your personal schedule management strategy for balancing study goals with daily community responsibilities.",
        answer: "I just study whenever I am free. I do not have a set schedule."
      }
    ],
    attachments: [
      { name: "Work_Readiness_Notes.docx", size: "120 KB" }
    ],
    feedback: {
      score: 55,
      comments: "Yusuf, while your work represents honest effort, please review Module 3 on Collaborative Workspaces. Doing the entire project yourself is not an effective conflict resolution or team strategy. Please rewrite your responses using the collaborative steps outlined in the curriculum and re-submit.",
      rubricScores: [
        { criterion: "Conflict Management Principles", score: 10, maxScore: 25, feedback: "Response promotes solo-execution over constructive team engagement." },
        { criterion: "Time and Resource Planning", score: 15, maxScore: 25, feedback: "Need more structure and evidence of actual study block planning." }
      ],
      reviewedBy: "Halima Sani",
      reviewedDate: "23 Jun 2026"
    }
  },
  {
    id: "sub-103",
    learnerId: "SUST-LRN-0444",
    learnerName: "Aminu Bello",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    course: "Digital Readiness Basics",
    assessmentTitle: "Foundational Digital Security Project",
    submissionDate: "15 Jun 2026",
    status: "Returned for Revision",
    studentResponses: [
      {
        question: "Outline three essential security actions required when setting up a shared community computing workstation.",
        answer: "1. Log out after each session.\n2. Keep your password written on a sticky note next to the monitor for easy memory.\n3. Clear browser cookies occasionally."
      }
    ],
    attachments: [],
    feedback: {
      score: 40,
      comments: "Aminu, please do not write down or leave your password next to any monitor! This completely defeats computer security. Please read the section on password management and re-submit.",
      rubricScores: [
        { criterion: "Information Security Principles", score: 10, maxScore: 50, feedback: "Leaving passwords in physical proximity to shared systems violates primary security rules." }
      ],
      reviewedBy: "Halima Sani",
      reviewedDate: "16 Jun 2026"
    }
  },
  {
    id: "sub-104",
    learnerId: "SUST-LRN-0446",
    learnerName: "Fatima Aliyu",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    course: "Work Readiness Foundation",
    assessmentTitle: "Work Readiness Assignment",
    submissionDate: "20 Jun 2026",
    status: "Approved",
    studentResponses: [
      {
        question: "Explain how you would handle conflict in a team setting where a peer is not contributing their share of a group presentation.",
        answer: "I would suggest a neutral team conversation where we review assigned responsibilities. I would ask everyone to confirm if the deadlines are feasible. If my peer is struggling, we could re-distribute some sub-tasks, making sure everyone stays accountable while accommodating individual challenges."
      },
      {
        question: "Describe your personal schedule management strategy for balancing study goals with daily community responsibilities.",
        answer: "I split my study into early morning sessions and evening review blocks. I maintain a physical notebook tracker where I check off lessons. I have shared my schedule with my family so they know not to interrupt during my two-hour focus windows."
      }
    ],
    attachments: [
      { name: "Fatima_Work_Readiness_Final.pdf", size: "2.1 MB" }
    ],
    feedback: {
      score: 90,
      comments: "Fatima, this is an exemplary piece of work! Your focus on active communication and sharing your focus schedule with your family is brilliant and a highly practical solution.",
      rubricScores: [
        { criterion: "Conflict Management Principles", score: 23, maxScore: 25, feedback: "Excellent collaborative approach." },
        { criterion: "Time and Resource Planning", score: 22, maxScore: 25, feedback: "Highly practical scheduling system and active boundary management." }
      ],
      reviewedBy: "Halima Sani",
      reviewedDate: "21 Jun 2026"
    }
  },
  {
    id: "sub-105",
    learnerId: "LNR-2026-1045",
    learnerName: "Amina Yusuf",
    cohortId: "kaduna-01",
    cohortName: "Kaduna Agribusiness Cohort",
    course: "Sustainable Supply Chains",
    assessmentTitle: "Sustainable Supply Chains Project",
    submissionDate: "24 Jun 2026",
    status: "Pending Review",
    studentResponses: [
      {
        question: "Describe your proposed sustainable sourcing strategy for smallholder maize cooperatives in Kaduna.",
        answer: "My strategy involves establishing local cooperative collection hubs near farms to reduce post-harvest transport losses. We will implement dry-grain storage standards using moisture meters and hermetic bags. This ensures high-quality retention and enables smallholders to aggregate their harvest, giving them better leverage during price negotiations with processing firms."
      },
      {
        question: "Explain the environmental benefit of cold-chain optimization in the dairy supply chain.",
        answer: "Cold-chain optimization prevents premature spoilage of milk during early morning transit from rural pastures to processing depots. By keeping the milk chilled below 4 degrees Celsius using solar-powered cooling tanks, we reduce total supply chain waste by up to 40%, lowering the carbon footprint per liter of milk delivered."
      }
    ],
    attachments: [
      { name: "Sourcing_Strategy_AminaYusuf.pdf", size: "1.8 MB" },
      { name: "Moisture_Control_Specs.docx", size: "320 KB" }
    ]
  }
];

export const mockFacilitatorDiscussions: FacilitatorDiscussion[] = [
  {
    id: "disc-101",
    title: "Agribusiness networking strategies in Kano State hubs",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    authorName: "Musa Danjuma",
    authorRole: "Learner",
    content: "Hi everyone! I am preparing to reach out to some agricultural co-operatives in the state for my upcoming internship assignment. What are the best practices for professional introductions in our local agricultural hubs?",
    repliesCount: 3,
    unreplied: true,
    lastActive: "Today, 11:20 AM",
    replies: [
      {
        id: "rep-1",
        author: "Fatima Aliyu",
        role: "Learner",
        content: "I recommend writing a brief physical letter of introduction first. In agricultural cooperatives here, formal paper is often treated with much more seriousness than an unsolicited email.",
        date: "Today, 11:45 AM"
      },
      {
        id: "rep-2",
        author: "Yusuf Ibrahim",
        role: "Learner",
        content: "Very true, Fatima. Physical visits on market mornings are also effective if you dress professionally.",
        date: "Today, 12:10 PM"
      }
    ]
  },
  {
    id: "disc-102",
    title: "Tips for preparing the Work Readiness Assignment",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    authorName: "Aisha Mohammed",
    authorRole: "Learner",
    content: "Hello team, I am compiling my scheduling block-planning worksheet. Should we detail our entire weekly workload, or focus only on study hours versus chores?",
    repliesCount: 1,
    unreplied: false,
    lastActive: "Yesterday, 02:30 PM",
    replies: [
      {
        id: "rep-3",
        author: "Halima Sani",
        role: "Facilitator",
        content: "Hi Aisha! You should include both. Showing how your study block integrates into your general weekly obligations gives a more authentic view of your time management.",
        date: "Yesterday, 03:15 PM"
      }
    ]
  }
];

export const mockFacilitatorSessions: FacilitatorSession[] = [
  {
    id: "sess-101",
    title: "Workplace Communication & Interview Roleplay",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    date: "2026-06-28",
    time: "10:00 AM - 12:00 PM",
    type: "In-Person Hub",
    venue: "Kano Central Library Lab",
    status: "Upcoming",
    attendanceRecorded: false,
    notes: "Please ask learners to review Lesson 4 ('Preparing for Interviews') before attending. We will perform live mock-interview trials."
  },
  {
    id: "sess-102",
    title: "Digital Readiness Foundational Check-in",
    cohortId: "kaduna-01",
    cohortName: "Kaduna Agribusiness Cohort",
    date: "2026-06-24",
    time: "02:00 PM - 03:30 PM",
    type: "Online Webinar",
    venue: "Zoom Online Conference Room",
    status: "Completed",
    attendanceRecorded: true,
    attendanceRate: 93,
    notes: "Excellent attendance. Solved the questions about cybersecurity password safety. Reminded them of safe physical security practices."
  }
];

export const mockFacilitatorResources: FacilitatorResource[] = [
  {
    id: "res-101",
    title: "SUSTAIN Work Readiness Rubric Guide",
    category: "Rubrics",
    type: "PDF",
    size: "1.8 MB",
    description: "Detailed grading matrix and expected quality metrics for checking and reviewing the final Work Readiness Assignment.",
    lastUpdated: "12 May 2026"
  },
  {
    id: "res-102",
    title: "Facilitation Master Deck — Modules 1-4",
    category: "Facilitation Slides",
    type: "SLIDES",
    size: "12.4 MB",
    description: "Official presentation slides for cohort trainers delivering in-person sessions at physical hub locations.",
    lastUpdated: "10 Jan 2026"
  },
  {
    id: "res-103",
    title: "Youth Employability Pathway Coordinator Manual",
    category: "Programme Manuals",
    type: "PDF",
    size: "4.2 MB",
    description: "Comprehensive guideline for local partners detailing role descriptions, reporting metrics, and coordinator frameworks.",
    lastUpdated: "15 Oct 2025"
  },
  {
    id: "res-104",
    title: "Facilitator Coaching & Active Listening Handbook",
    category: "Guides",
    type: "PDF",
    size: "2.5 MB",
    description: "Practical guide covering online support coaching, active listening skills, and feedback best practices.",
    lastUpdated: "04 Apr 2026"
  }
];

export const mockFacilitatorReports: FacilitatorReport[] = [
  {
    id: "rep-101",
    cohortId: "kano-02",
    cohortName: "Kano Enterprise Growth Cohort",
    metrics: {
      enrolled: 28,
      activeThisWeek: 26,
      completionRate: 42,
      averageScore: 84,
      attendanceRate: 91
    },
    weeklyActivityTrend: [
      { week: "Week 1", engagementHours: 120 },
      { week: "Week 2", engagementHours: 145 },
      { week: "Week 3", engagementHours: 160 },
      { week: "Week 4", engagementHours: 155 }
    ]
  },
  {
    id: "rep-102",
    cohortId: "kaduna-01",
    cohortName: "Kaduna Agribusiness Cohort",
    metrics: {
      enrolled: 15,
      activeThisWeek: 14,
      completionRate: 75,
      averageScore: 88,
      attendanceRate: 93
    },
    weeklyActivityTrend: [
      { week: "Week 1", engagementHours: 75 },
      { week: "Week 2", engagementHours: 88 },
      { week: "Week 3", engagementHours: 92 },
      { week: "Week 4", engagementHours: 96 }
    ]
  }
];

export const mockFacilitatorMessages: FacilitatorMessage[] = [
  {
    id: "msg-101",
    senderName: "Halima Ibrahim (Coordinator)",
    senderRole: "Coordinator",
    avatarInitials: "HI",
    lastMessage: "Hi Halima, please ensure all assessments submitted by Kano Cohort 02 before yesterday are graded by Friday.",
    timestamp: "Today, 02:15 PM",
    unread: true,
    messages: [
      { id: "1", sender: "Other", content: "Hi Halima, the state sponsors are asking for the Kano Cohort 02 monthly progression report.", time: "Yesterday, 10:00 AM" },
      { id: "2", sender: "You", content: "Hi coordinator, sure! I am finalizing the grade evaluations for Aisha and Yusuf today. I will compile and send the summary spreadsheet directly to you.", time: "Yesterday, 11:30 AM" },
      { id: "3", sender: "Other", content: "Hi Halima, please ensure all assessments submitted by Kano Cohort 02 before yesterday are graded by Friday.", time: "Today, 02:15 PM" }
    ]
  },
  {
    id: "msg-102",
    senderName: "Aminu Bello",
    senderRole: "Learner",
    avatarInitials: "AB",
    lastMessage: "Thank you ma, I will review the offline PDF reading version. The data cost has been very high.",
    timestamp: "Yesterday, 04:30 PM",
    unread: false,
    messages: [
      { id: "1", sender: "Other", content: "Hello ma, I am struggling with stable connection this week. I was unable to load the interactive quiz.", time: "Yesterday, 01:10 PM" },
      { id: "2", sender: "You", content: "Hi Aminu! I completely understand. I have added the offline reading materials and resource PDFs to the portal. You can download them at any community center and review them offline. You can submit your quiz answers on a text file whenever you have signal.", time: "Yesterday, 03:45 PM" },
      { id: "3", sender: "Other", content: "Thank you ma, I will review the offline PDF reading version. The data cost has been very high.", time: "Yesterday, 04:30 PM" }
    ]
  }
];
