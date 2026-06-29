import { useRoute } from "../../context/RouteContext";
import { HelpCircle, ArrowLeft } from "lucide-react";

export function AuthHeader() {
  const { navigateTo } = useRoute();

  return (
    <header id="auth-header" className="w-full bg-white border-b border-slate-100 py-4 px-6 flex items-center justify-between">
      <button 
        onClick={() => navigateTo("/")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </button>

      <div className="flex items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer">
        <HelpCircle className="h-4.5 w-4.5" />
        <span className="text-xs font-medium">Help</span>
      </div>
    </header>
  );
}
