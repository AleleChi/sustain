import { ReactNode } from "react";
import { AuthHeader } from "../navigation/AuthHeader";
import { useRoute } from "../../context/RouteContext";
import { 
  BookOpen, 
  Award, 
  WifiOff, 
  FileText, 
  CheckCircle, 
  Users, 
  CheckSquare, 
  HelpCircle, 
  TrendingUp, 
  Clock, 
  Layers, 
  FileCheck, 
  MessageSquare, 
  ClipboardList 
} from "lucide-react";

const ROLE_CONTENT = {
  learner: {
    badge: "Learner workspace",
    headline: "Pick up where your pathway continues.",
    subtitle: "View your current course, assessment progress, CPD credits, offline packs, and next required session from one workspace.",
    previewTitle: "Work Readiness Foundation",
    milestone: "Next milestone: Interview Practice Clinic",
  },
  facilitator: {
    badge: "Facilitator workspace",
    headline: "Review learner progress with clarity.",
    subtitle: "Confirm attendance, review assessments, respond to learner questions, and track CPD readiness across your cohort.",
    previewTitle: "Today’s review queue",
    milestone: "Next live session: Interview Practice Clinic • 14:00",
  },
  admin: {
    badge: "Programme workspace",
    headline: "Keep programme delivery visible.",
    subtitle: "Monitor cohorts, learning progress, facilitator activity, CPD readiness, and certificate review pipelines.",
    previewTitle: "Programme overview",
    milestone: "Support & Audit Queue: 18 pending review items",
  }
};

export function AuthLayout({ children }: { children: ReactNode }) {
  const { authRole } = useRoute();
  const content = ROLE_CONTENT[authRole] || ROLE_CONTENT.learner;

  return (
    <div id="auth-layout" className="min-h-screen bg-slate-50/20 flex flex-col font-sans text-left">
      <AuthHeader />
      
      {/* Split grid layout: Left Brand, Right Form */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Brand/Product Panel (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-b from-[#002B20] via-[#003C2D] to-[#00523D] text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/25 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#005C45]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative space-y-6">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest font-mono bg-emerald-950/55 px-3 py-1 rounded-full border border-emerald-800/40 w-fit block shadow-3xs">
              {content.badge}
            </span>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading text-emerald-50 leading-snug">
                {content.headline}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed font-sans max-w-sm">
                {content.subtitle}
              </p>
            </div>
          </div>

          {/* Product Preview Cards based on the selected role */}
          <div className="relative space-y-4 my-8 max-w-md w-full">
            {authRole === "learner" && (
              <div className="bg-white/[0.08] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg text-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-300" />
                    <span className="font-bold text-white tracking-wide font-heading text-sm">{content.previewTitle}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-250 bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-800/30">
                    Active Pathway
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-emerald-300 font-mono font-medium">
                    <span>62% COMPLETE</span>
                    <span>22 / 35 CPD CREDITS</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: "62%" }} />
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] border-t border-white/5">
                  <div className="flex items-center gap-2 text-emerald-100/90 font-medium">
                    <FileText className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                    Assessment draft saved
                  </div>
                  <div className="flex items-center gap-2 text-emerald-100/90 font-medium">
                    <WifiOff className="h-3.5 w-3.5 text-emerald-350 shrink-0" />
                    5 offline packs available
                  </div>
                </div>
              </div>
            )}

            {authRole === "facilitator" && (
              <div className="bg-white/[0.08] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg text-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-emerald-300" />
                    <span className="font-bold text-white tracking-wide font-heading text-sm">{content.previewTitle}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/45 px-2.5 py-0.5 rounded-full border border-amber-800/30">
                    Pending Actions
                  </span>
                </div>

                {/* Queue items */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-emerald-100/90 font-medium flex items-center gap-2">
                      <FileCheck className="h-3.5 w-3.5 text-amber-300" />
                      Assessments pending
                    </span>
                    <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded">8 pending</span>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-emerald-100/90 font-medium flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-teal-300" />
                      Attendance confirmations
                    </span>
                    <span className="font-mono text-[10px] font-bold text-teal-300 bg-teal-950/40 px-2 py-0.5 rounded">12 ready</span>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-emerald-100/90 font-medium flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-emerald-300" />
                      CPD review requests
                    </span>
                    <span className="font-mono text-[10px] font-bold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded">4 reviews</span>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-emerald-100/90 font-medium flex items-center gap-2">
                      <MessageSquare className="h-3.5 w-3.5 text-sky-300" />
                      Learner questions
                    </span>
                    <span className="font-mono text-[10px] font-bold text-sky-300 bg-sky-950/40 px-2 py-0.5 rounded">6 questions</span>
                  </div>
                </div>
              </div>
            )}

            {authRole === "admin" && (
              <div className="bg-white/[0.08] backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg text-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-300" />
                    <span className="font-bold text-white tracking-wide font-heading text-sm">{content.previewTitle}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-teal-300 bg-teal-950/45 px-2.5 py-0.5 rounded-full border border-teal-800/30">
                    Hub Oversight
                  </span>
                </div>

                {/* Oversight metrics */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center space-y-1">
                    <span className="text-[10px] text-emerald-300/80 block uppercase tracking-wider font-semibold">Cohorts</span>
                    <span className="text-base font-bold text-white block">3 Active</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center space-y-1">
                    <span className="text-[10px] text-emerald-300/80 block uppercase tracking-wider font-semibold">Learners</span>
                    <span className="text-base font-bold text-white block">148 Enrolled</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center space-y-1">
                    <span className="text-[10px] text-emerald-300/80 block uppercase tracking-wider font-semibold">Progress</span>
                    <span className="text-base font-bold text-teal-300 block">72% Avg</span>
                  </div>
                </div>

                {/* Secondary status rows */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-emerald-100/90 font-medium flex items-center gap-2">
                      <FileCheck className="h-3.5 w-3.5 text-emerald-300" />
                      Certificates awaiting audit
                    </span>
                    <span className="font-mono text-[10px] font-bold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded">31 ready</span>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-emerald-100/90 font-medium flex items-center gap-2">
                      <HelpCircle className="h-3.5 w-3.5 text-amber-300" />
                      Pending coordinator assistance
                    </span>
                    <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded">18 items</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Required Milestone Card */}
            <div className="bg-emerald-950/45 p-4 rounded-2xl border border-white/5 flex items-center justify-between text-[11px] text-emerald-100/90 font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                {content.milestone}
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                REQUIRED
              </span>
            </div>
          </div>

          {/* Footer of split panel */}
          <div className="relative text-[10px] text-emerald-300/80 font-semibold tracking-wider font-mono">
            YOUR ACCESS IS LINKED TO YOUR ASSIGNED PATHWAY
          </div>
        </div>

        {/* Right: Interactive Forms (Mobile and Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-12 bg-slate-50/20">
          <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-3xs">
            {children}
          </div>

          {/* Mobile and Tablet contextual preview card, appearing below login card */}
          <div className="w-full max-w-md mt-6 lg:hidden">
            <div className="bg-gradient-to-r from-[#003B2C] to-[#005C45] p-5 rounded-2xl text-white space-y-3.5 shadow-xs border border-emerald-800/20">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-800/20">
                  {content.badge} Preview
                </span>
                <span className="text-[10px] font-medium text-emerald-200 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Required
                </span>
              </div>

              {authRole === "learner" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{content.previewTitle}</span>
                    <span className="text-emerald-300 font-mono text-[10px]">62% Complete</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-emerald-100/90 pt-1 border-t border-white/5">
                    <div>
                      <span className="text-[9px] text-emerald-300 block font-semibold">CPD</span>
                      <span className="font-bold">22 Credits</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-300 block font-semibold">Assessment</span>
                      <span className="font-bold">Draft Saved</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-300 block font-semibold">Offline Packs</span>
                      <span className="font-bold">5 Available</span>
                    </div>
                  </div>
                </div>
              )}

              {authRole === "facilitator" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{content.previewTitle}</span>
                    <span className="text-amber-300 font-mono text-[10px]">Actions Needed</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-emerald-100/90 pt-1 border-t border-white/5 text-center">
                    <div className="bg-white/5 p-1 rounded">
                      <span className="text-[8px] text-emerald-300 block uppercase font-semibold">Assessments</span>
                      <span className="font-bold text-amber-300">8 Pending</span>
                    </div>
                    <div className="bg-white/5 p-1 rounded">
                      <span className="text-[8px] text-emerald-300 block uppercase font-semibold">Attendance</span>
                      <span className="font-bold text-teal-300">12 Ready</span>
                    </div>
                    <div className="bg-white/5 p-1 rounded">
                      <span className="text-[8px] text-emerald-300 block uppercase font-semibold">Questions</span>
                      <span className="font-bold text-sky-300">6 Queue</span>
                    </div>
                  </div>
                </div>
              )}

              {authRole === "admin" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{content.previewTitle}</span>
                    <span className="text-teal-300 font-mono text-[10px]">Hub Status</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] text-emerald-100/90 pt-1 border-t border-white/5 text-center">
                    <div className="bg-white/5 p-1 rounded">
                      <span className="text-[8px] text-emerald-300 block uppercase font-semibold">Cohorts</span>
                      <span className="font-bold text-white">3 Active</span>
                    </div>
                    <div className="bg-white/5 p-1 rounded">
                      <span className="text-[8px] text-emerald-300 block uppercase font-semibold">Learners</span>
                      <span className="font-bold text-white">148 Total</span>
                    </div>
                    <div className="bg-white/5 p-1 rounded">
                      <span className="text-[8px] text-emerald-300 block uppercase font-semibold">Pipeline</span>
                      <span className="font-bold text-emerald-300">31 Ready</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-100 bg-white">
        <p>© 2026 SUSTAIN LMS. All rights reserved. Assigned pathways, CPD credits, and certificate verification for Nigerian Agribusiness.</p>
      </footer>
    </div>
  );
}
