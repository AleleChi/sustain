import { ReactNode } from "react";
import { FacilitatorSidebar } from "../navigation/FacilitatorSidebar";
import { FacilitatorMobileNav } from "../navigation/FacilitatorMobileNav";
import { Search, Bell, HelpCircle } from "lucide-react";
import { useRoute, RoutePath } from "../../context/RouteContext";

interface FacilitatorLayoutProps {
  children: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  headerTitle?: ReactNode;
}

export function FacilitatorLayout({ 
  children, 
  searchPlaceholder = "Search cohorts, learners, reviews...",
  searchValue,
  onSearchChange,
  headerTitle
}: FacilitatorLayoutProps) {
  const { navigateTo, showToast } = useRoute();

  return (
    <div id="facilitator-layout" className="min-h-screen bg-slate-55 flex flex-col lg:flex-row font-sans text-slate-800 pb-16 lg:pb-0">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex shrink-0">
        <FacilitatorSidebar />
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <FacilitatorMobileNav />
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between h-16 bg-white border-b border-slate-100 px-8 shrink-0">
          {/* Left title & search */}
          <div className="flex items-center gap-6">
            {headerTitle && (
              <div className="flex items-center gap-2 text-[#006644] font-extrabold text-sm tracking-tight">
                <span className="text-[#006644] text-base">🎓</span>
                <span className="font-extrabold text-[#004d33]">{headerTitle}</span>
              </div>
            )}
            <div className="relative w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchValue || ""}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-100 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all text-slate-700 font-medium"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <button 
              onClick={() => showToast("You have no new notifications.")}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer" 
              aria-label="Messages"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-emerald-600 rounded-full" />
            </button>
            <button 
              onClick={() => navigateTo("/facilitator/support-tickets" as RoutePath)}
              className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" 
              aria-label="Help & Support"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-slate-100" />
            
            {/* Facilitator User Profile */}
            <div 
              onClick={() => navigateTo("/facilitator/profile" as RoutePath)}
              className="flex items-center gap-2.5 text-left select-none cursor-pointer hover:opacity-85 transition-all"
            >
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800">Halima Sani</p>
                <p className="text-[10px] text-emerald-700 font-semibold tracking-wider font-sans uppercase">Kano Hub Lead</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="Halima Sani"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover border border-slate-200 shadow-2xs"
              />
            </div>
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
