import { HelpCircle } from "lucide-react";
import { useRoute } from "../../context/RouteContext";

interface LearnerSupportCardProps {
  className?: string;
  title?: string;
  text?: string;
  buttonText?: string;
}

export function LearnerSupportCard({ 
  className = "",
  title = "Support Center",
  text = "Need assistance with your learning pathway?",
  buttonText = "Open Support"
}: LearnerSupportCardProps) {
  const { navigateTo } = useRoute();

  return (
    <div 
      className={`p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200 shadow-sm space-y-4 text-left ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 bg-emerald-900 text-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-950">{title}</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
      
      <button
        onClick={() => navigateTo("/learner/support")}
        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-sm transition-colors text-center block cursor-pointer min-h-[44px] flex items-center justify-center border-none"
      >
        {buttonText}
      </button>
    </div>
  );
}
