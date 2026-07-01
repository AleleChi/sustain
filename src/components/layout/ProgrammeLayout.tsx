import { ReactNode } from "react";
import { ProgrammeSidebar } from "../navigation/ProgrammeSidebar";
import { ProgrammeMobileNav } from "../navigation/ProgrammeMobileNav";
import { AppMobileHeader } from "../navigation/AppMobileHeader";
import { Search, Bell, HelpCircle } from "lucide-react";
import { useRoute, RoutePath } from "../../context/RouteContext";

interface ProgrammeLayoutProps {
  children: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  headerTitle?: ReactNode;
}

export function ProgrammeLayout({ 
  children, 
  searchPlaceholder = "Search learners, cohorts, pathways, certificates...",
  searchValue,
  onSearchChange,
  headerTitle
}: ProgrammeLayoutProps) {
  const { navigateTo, showToast } = useRoute();

  return (
    <div id="programme-layout" className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* MOBILE CONTAINER (lg:hidden) */}
      <div className="lg:hidden min-h-screen bg-slate-50 overflow-x-hidden flex flex-col relative">
        <AppMobileHeader moduleType="programme" title="Programme Workspace" />
        <main className="w-full max-w-full pt-[72px] pb-24 px-4 sm:px-6 flex-1 flex flex-col">
          {children}
        </main>
        <ProgrammeMobileNav />
      </div>

      {/* DESKTOP CONTAINER (hidden lg:flex) */}
      <div className="hidden lg:flex min-h-screen bg-slate-50/55 flex-row">
        {/* Sidebar for Desktop */}
        <aside className="shrink-0">
          <ProgrammeSidebar />
        </aside>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop Header */}
          <header className="flex items-center justify-between h-16 bg-white border-b border-slate-200 px-8 shrink-0">
            {/* Left title & search */}
            <div className="flex items-center gap-6">
              {headerTitle && (
                <div className="flex items-center gap-2 text-[#005C45] font-extrabold text-sm tracking-tight">
                  <span className="text-[#005C45] text-base">🇳🇬</span>
                  <span className="font-extrabold text-[#004A37]">{headerTitle}</span>
                </div>
              )}
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchValue || ""}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-150 rounded-lg focus:outline-hidden focus:border-[#005C45] focus:bg-white transition-all text-slate-700 font-semibold"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-5">
              <button 
                onClick={() => showToast("No new delivery alerts.")}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer" 
                aria-label="Alerts"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
              </button>
              <button 
                onClick={() => navigateTo("/programme/support" as RoutePath)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" 
                aria-label="Help & Oversight Support"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-slate-100" />
              
              {/* User Profile */}
              <div 
                onClick={() => navigateTo("/programme/settings" as RoutePath)}
                className="flex items-center gap-2.5 text-left select-none cursor-pointer hover:opacity-85 transition-all"
              >
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">Programme Team</p>
                  <p className="text-[10px] text-emerald-700 font-bold tracking-wider font-sans uppercase">National Lead</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-[#005C45] flex items-center justify-center font-bold text-[10px] text-white">
                  PROG
                </div>
              </div>
            </div>
          </header>

          {/* Scrollable Content Container */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
