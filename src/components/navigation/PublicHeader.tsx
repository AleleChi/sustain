import { useState } from "react";
import { useRoute, RoutePath } from "../../context/RouteContext";
import { GraduationCap, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

export function PublicHeader() {
  const { currentPath, navigateTo } = useRoute();
  const [isOpen, setIsOpen] = useState(false);

  // Helper to handle smooth scroll to anchor
  const handleScrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (currentPath !== "/") {
      navigateTo("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNav = (route: RoutePath, sectionId?: string) => {
    setIsOpen(false);
    if (sectionId) {
      handleScrollToSection(sectionId);
    } else {
      navigateTo(route);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header id="public-header" className="sticky top-0 z-50 w-full h-[72px] bg-white border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <div 
          onClick={() => handleNav("/")}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-900 group-hover:bg-emerald-100 transition-colors">
            <GraduationCap className="h-5 w-5 text-emerald-800" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight font-sans">
            SUSTAIN LMS
          </span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <button
            onClick={() => handleNav("/")}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentPath === "/" 
                ? "text-emerald-900 font-semibold" 
                : "text-slate-650 hover:text-slate-900"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav("/", "pathways")}
            className="text-sm font-medium text-slate-650 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Pathways
          </button>
          <button
            onClick={() => handleNav("/", "how-it-works")}
            className="text-sm font-medium text-slate-650 hover:text-slate-900 transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNav("/verify-certificate")}
            className="text-sm font-medium text-slate-650 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Verify Certificate
          </button>
          <button
            onClick={() => handleNav("/", "need-help")}
            className="text-sm font-medium text-slate-650 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Support
          </button>
        </nav>

        {/* Right: Auth CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => handleNav("/login")} 
            className="text-sm font-medium text-slate-700 hover:text-slate-950 px-3 py-2 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <Button 
            variant="primary" 
            onClick={() => handleNav("/signup")} 
            className="bg-emerald-900 hover:bg-emerald-850 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Register
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 focus:outline-hidden transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Drawer panel (Full height, slide-in/fade) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity duration-200" 
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-900">
                    <GraduationCap className="h-5 w-5 text-emerald-800" />
                  </div>
                  <span className="text-base font-bold text-slate-900 tracking-tight font-sans">
                    SUSTAIN LMS
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleNav("/")}
                  className={`w-full text-left px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentPath === "/" 
                      ? "bg-emerald-50/70 text-emerald-900" 
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNav("/", "pathways")}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Pathways
                </button>
                <button
                  onClick={() => handleNav("/", "how-it-works")}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNav("/verify-certificate")}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Verify Certificate
                </button>
                <button
                  onClick={() => handleNav("/", "need-help")}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Support
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleNav("/login")} 
                className="w-full py-3 justify-center text-sm font-semibold text-slate-800 border-slate-200"
              >
                Sign In
              </Button>
              <Button 
                variant="primary" 
                onClick={() => handleNav("/signup")} 
                className="w-full py-3 justify-center text-sm font-semibold bg-emerald-900 hover:bg-emerald-850 text-white"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
