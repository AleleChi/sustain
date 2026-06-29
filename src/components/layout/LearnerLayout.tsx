import { ReactNode } from "react";
import { LearnerSidebar } from "../navigation/LearnerSidebar";
import { LearnerMobileNav } from "../navigation/LearnerMobileNav";
import { Search, Bell, HelpCircle } from "lucide-react";
import { mockLearner } from "../../data/mockLearner";
import { useRoute } from "../../context/RouteContext";

interface LearnerLayoutProps {
  children: ReactNode;
}

export function LearnerLayout({ children }: { children: ReactNode }) {
  const { navigateTo } = useRoute();
  return (
    <div id="learner-layout" className="min-h-screen bg-slate-50/55 flex flex-col lg:flex-row font-sans text-slate-800">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex shrink-0">
        <LearnerSidebar />
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <LearnerMobileNav />
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between h-16 bg-white border-b border-slate-100 px-8 shrink-0">
          {/* Left search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, lessons..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-100 rounded-lg focus:outline-hidden focus:border-sustain-600 focus:bg-white transition-all text-slate-700"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigateTo("/learner/notifications")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer" 
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" aria-label="Help">
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-100" />
            {/* User Profile */}
            <button 
              onClick={() => navigateTo("/learner/profile")}
              className="flex items-center gap-2.5 text-left focus:outline-hidden hover:opacity-95 transition-opacity cursor-pointer group"
            >
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-900 transition-colors">{mockLearner.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">{mockLearner.learnerId}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-900 border border-emerald-800 flex items-center justify-center font-bold text-xs text-white">
                AM
              </div>
            </button>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
