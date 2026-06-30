import { useState } from "react";
import { Menu, HelpCircle, User, Bell } from "lucide-react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { AppNavigationDrawer } from "./AppNavigationDrawer";
import { mockLearner } from "../../data/mockLearner";

interface AppMobileHeaderProps {
  moduleType: "learner" | "facilitator";
  title?: string;
}

export function AppMobileHeader({ moduleType, title }: AppMobileHeaderProps) {
  const { navigateTo } = useRoute();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isLearner = moduleType === "learner";
  const defaultTitle = isLearner ? "SUSTAIN LMS" : "Facilitator Workspace";
  const displayTitle = title || defaultTitle;

  const profilePath = isLearner ? "/learner/profile" : "/facilitator/profile";
  const supportPath = isLearner ? "/learner/support" : "/facilitator/support-tickets";
  const notificationsPath = isLearner ? "/learner/notifications" : "/facilitator/communications";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 select-none shadow-xs">
        {/* Left: Hamburger menu trigger and Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 -ml-1 rounded-xl hover:bg-slate-50 text-slate-700 active:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5.5 w-5.5" />
          </button>

          {/* Title and context */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-tight text-slate-900 font-heading">
              {displayTitle}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider font-sans">
              {isLearner ? mockLearner.name : "Halima Sani"}
            </span>
          </div>
        </div>

        {/* Right: Notification, Help & Profile Shortcuts */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notification Icon */}
          {isLearner && (
            <button
              onClick={() => navigateTo(notificationsPath as RoutePath)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer relative"
              aria-label="View notifications"
            >
              <Bell className="h-5 w-5 text-slate-650" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-emerald-600 rounded-full animate-pulse" />
            </button>
          )}

          {/* Ask Help Button */}
          <button
            onClick={() => navigateTo(supportPath as RoutePath)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
            aria-label="Ask for help"
          >
            <HelpCircle className="h-5 w-5 text-[#005C45]" />
            <span className="hidden sm:inline text-xs font-bold text-[#005C45]">Ask Help</span>
          </button>

          <div className="h-5 w-px bg-slate-200 mx-0.5 sm:mx-1" />

          {/* Profile Shortcut */}
          <button
            onClick={() => navigateTo(profilePath as RoutePath)}
            className="flex items-center gap-1.5 focus:outline-hidden hover:opacity-90 active:opacity-80 transition-opacity cursor-pointer"
            aria-label="Open profile"
          >
            {isLearner ? (
              <div className="h-8 w-8 rounded-full bg-emerald-900 flex items-center justify-center font-bold text-xs text-white">
                AM
              </div>
            ) : (
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="Halima Sani"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover border border-slate-100"
              />
            )}
          </button>
        </div>
      </header>

      {/* Drawer */}
      <AppNavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        moduleType={moduleType}
      />
    </>
  );
}
