export interface Course {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "locked";
  modulesCount: number;
  completedModulesCount?: number;
  isCurrent?: boolean;
  description?: string;
}

export interface AssessmentTask {
  id: string;
  title: string;
  dueDate?: string;
  status: "pending" | "passed" | "failed";
  score?: string;
  requiredForCertificate: boolean;
}

export interface CourseResource {
  id: string;
  title: string;
  type: "PDF" | "MP3" | "DOCX";
  size: string;
}

export interface ScheduleEvent {
  id: string;
  dateDay: string; // e.g. "22"
  dateMonth: string; // e.g. "OCT"
  title: string;
  time?: string;
  tag?: string;
  type: "live" | "deadline" | "release";
}

export interface Announcement {
  id: string;
  category: "PROGRAMME SUPPORT" | "FACILITATOR UPDATE" | "SYSTEM UPDATE";
  title: string;
  date: string;
}

export interface DiscussionTopic {
  id: string;
  title: string;
  author: string;
  replies: number;
}

export interface RecentActivityItem {
  id: string;
  description: string;
  time: string;
}

export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Digital Readiness Basics",
    status: "completed",
    modulesCount: 5,
    completedModulesCount: 5,
  },
  {
    id: "course-2",
    title: "Communication Skills",
    status: "completed",
    modulesCount: 4,
    completedModulesCount: 4,
  },
  {
    id: "course-3",
    title: "Work Readiness Foundation",
    status: "in-progress",
    modulesCount: 6,
    completedModulesCount: 3,
    isCurrent: true,
    description: "In Progress • 3 of 6 Modules",
  },
  {
    id: "course-4",
    title: "Interview Preparation",
    status: "locked",
    modulesCount: 5,
    description: "Locked • Complete previous course",
  },
];

export const mockAssessments: AssessmentTask[] = [
  {
    id: "assess-1",
    title: "Work Readiness Assignment",
    dueDate: "24 Oct 2026",
    status: "pending",
    requiredForCertificate: true,
  },
  {
    id: "assess-2",
    title: "Digital Readiness Quiz",
    status: "passed",
    score: "88%",
    requiredForCertificate: true,
  },
  {
    id: "assess-3",
    title: "Communication Skills Assessment",
    status: "passed",
    score: "92%",
    requiredForCertificate: true,
  },
];

export const mockResources: CourseResource[] = [
  {
    id: "res-1",
    title: "Lesson Summary",
    type: "PDF",
    size: "1.2 MB",
  },
  {
    id: "res-2",
    title: "Audio Lesson",
    type: "MP3",
    size: "8.4 MB",
  },
  {
    id: "res-3",
    title: "Assessment Guide",
    type: "DOCX",
    size: "0.5 MB",
  },
];

export const mockSchedule: ScheduleEvent[] = [
  {
    id: "evt-1",
    dateDay: "22",
    dateMonth: "OCT",
    title: "Live Q&A with Facilitator",
    time: "14:00",
    tag: "Scheduled",
    type: "live",
  },
  {
    id: "evt-2",
    dateDay: "24",
    dateMonth: "OCT",
    title: "Assignment Deadline",
    tag: "REQUIRED",
    type: "deadline",
  },
  {
    id: "evt-3",
    dateDay: "26",
    dateMonth: "OCT",
    title: "New Module Release",
    time: "Interview Skills",
    tag: "Recommended",
    type: "release",
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    category: "PROGRAMME SUPPORT",
    title: "New Learning Hub opening in Tarauni next week.",
    date: "12 Oct 2024",
  },
  {
    id: "ann-2",
    category: "FACILITATOR UPDATE",
    title: "Webinar recording for Interview Prep is now available.",
    date: "10 Oct 2024",
  },
  {
    id: "ann-3",
    category: "SYSTEM UPDATE",
    title: "Offline mode performance enhanced for mobile app.",
    date: "08 Oct 2024",
  },
];

export const mockDiscussions: DiscussionTopic[] = [
  {
    id: "disc-1",
    title: "Best practices for agribusiness networking in Kano?",
    author: "Musa D.",
    replies: 12,
  },
  {
    id: "disc-2",
    title: "Preparing for the Work Readiness Assignment.",
    author: "Fatima A.",
    replies: 4,
  },
];

export const mockActivities: RecentActivityItem[] = [
  {
    id: "act-1",
    description: "Started Preparing for Interviews",
    time: "Today, 09:12",
  },
  {
    id: "act-2",
    description: "Completed module Workplace Ethics",
    time: "Yesterday",
  },
  {
    id: "act-3",
    description: "Earned 5 CPD credits",
    time: "2 days ago",
  },
];
