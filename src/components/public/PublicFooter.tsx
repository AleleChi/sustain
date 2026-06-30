import { useRoute, RoutePath } from "../../context/RouteContext";
import { GraduationCap } from "lucide-react";

export function PublicFooter() {
  const { navigateTo, currentPath } = useRoute();

  const handleScrollToSection = (sectionId: string) => {
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

  const handleNav = (path: RoutePath, sectionId?: string) => {
    if (sectionId) {
      handleScrollToSection(sectionId);
    } else {
      navigateTo(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="public-footer" className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Column 1 - Brand */}
          <div className="md:col-span-4 space-y-3 text-left">
            <div 
              onClick={() => handleNav("/")}
              className="flex items-center gap-2 cursor-pointer group w-fit"
            >
              <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-800">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight font-sans">
                SUSTAIN LMS
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Mobile-first CPD delivery for learning pathways, review, and certificate readiness.
            </p>
          </div>

          {/* Column 2 - Platform */}
          <div className="md:col-span-2 space-y-2 text-left">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => handleNav("/")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("/", "pathways")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Pathways
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("/", "how-it-works")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 - Access */}
          <div className="md:col-span-2 space-y-2 text-left">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Access</h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => handleNav("/login")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("/signup")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Register
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("/verify-certificate")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Verify Certificate
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 - Information */}
          <div className="md:col-span-4 space-y-2 text-left">
            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Information</h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => handleNav("/about")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("/privacy")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("/terms")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav("/contact")} 
                  className="text-xs text-slate-500 hover:text-emerald-900 transition-colors text-left cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © 2026 SUSTAIN LMS. Prototype prepared by Devnra Ltd for proposal demonstration.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-[10px]">
              Assigned Pathway Access
            </span>
            <span className="text-[10px]">
              Accessibility Supported
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
