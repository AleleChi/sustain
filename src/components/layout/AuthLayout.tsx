import { ReactNode } from "react";
import { AuthHeader } from "../navigation/AuthHeader";
import { useRoute } from "../../context/RouteContext";
import { 
  BookOpen, 
  Award, 
  Users, 
  CheckCircle,
  ArrowRight
} from "lucide-react";

export function AuthLayout({ children }: { children: ReactNode }) {
  const { navigateTo } = useRoute();

  return (
    <div id="auth-layout" className="min-h-screen bg-slate-50/20 flex flex-col font-sans text-left">
      <AuthHeader />
      
      {/* Split grid layout: Left Brand Panel, Right Form Panel */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Brand/Product Panel (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-b from-[#002B20] via-[#003C2D] to-[#00523D] text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#005C45]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative space-y-8 mt-4">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest font-mono bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/40 w-fit block shadow-3xs">
              SUSTAIN Learning platform
            </span>
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight font-heading text-emerald-50 leading-tight">
                Every step, <span className="text-amber-400">clearly connected.</span>
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed font-sans max-w-sm font-medium">
                From guided lessons to CPD credits and certificate review, SUSTAIN LMS keeps progress clear — even in limited connectivity settings.
              </p>
            </div>
          </div>

          {/* Minimal visual directory of workspace pathways instead of mock dashboards */}
          <div className="relative space-y-4 my-8 max-w-sm w-full">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-sans">
              Platform Workspaces
            </h3>

            <div className="space-y-3">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3.5">
                <div className="h-8 w-8 bg-emerald-950/60 border border-emerald-800/40 rounded-xl flex items-center justify-center text-emerald-300 shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-50 font-heading">Learner Pathway</h4>
                  <p className="text-[11.5px] text-emerald-100/70 leading-normal font-medium">
                    Access interactive courses, submit assessments offline, and log verified CPD progress.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3.5">
                <div className="h-8 w-8 bg-emerald-950/60 border border-emerald-800/40 rounded-xl flex items-center justify-center text-emerald-300 shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-50 font-heading">Facilitator workspace</h4>
                  <p className="text-[11.5px] text-emerald-100/70 leading-normal font-medium">
                    Review incoming student submissions, verify workshop attendance, and host live practice clinics.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3.5">
                <div className="h-8 w-8 bg-emerald-950/60 border border-emerald-800/40 rounded-xl flex items-center justify-center text-emerald-300 shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-50 font-heading">Programme monitoring</h4>
                  <p className="text-[11.5px] text-emerald-100/70 leading-normal font-medium">
                    Oversee cohort statistics, audit final certificate requests, and manage local delivery resources.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer of split panel */}
          <div className="relative text-[10.5px] text-emerald-300/70 font-semibold tracking-wide font-sans">
            Nigerian Agribusiness & TVET Capacity Development
          </div>
        </div>

        {/* Right: Interactive Forms (Mobile and Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-12 bg-slate-50/10">
          <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-3xs">
            {children}
          </div>
        </div>

      </div>

      <footer className="py-4 text-center text-[10px] text-slate-400 border-t border-slate-100 bg-white">
        <p>© 2026 SUSTAIN LMS. All rights reserved. Professional development and certificate verification for Nigerian Agribusiness.</p>
      </footer>
    </div>
  );
}
