import { useEffect, useState } from "react";

interface SustainPreloaderProps {
  onComplete: () => void;
}

export function SustainPreloader({ onComplete }: SustainPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("Preparing your learning pathway");
  const [isVisible, setIsVisible] = useState(true);
  const [isShortTransition, setIsShortTransition] = useState(false);

  useEffect(() => {
    const isSeen = sessionStorage.getItem("sustain_preloader_seen") === "true";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Reduced motion fallback: Show static loader for 800ms
      setProgress(100);
      setCaption("Your pathway is ready.");
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          sessionStorage.setItem("sustain_preloader_seen", "true");
          onComplete();
        }, 300); // Fade out duration
      }, 800);
      return () => clearTimeout(timer);
    }

    if (isSeen) {
      // Page refresh/revisit in same session: shorter 700ms soft transition
      setIsShortTransition(true);
      setProgress(100);
      setCaption("Your pathway is ready.");
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 300); // Fade out
      }, 700);
      return () => clearTimeout(timer);
    }

    // First visit in session: full premium 2.8s loader
    const duration = 2800; // 2.8 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const pct = Math.min((currentStep / steps) * 100, 100);
      setProgress(pct);

      // Support text sequence over time (0% to 100%)
      if (pct < 25) {
        setCaption("Checking assigned courses");
      } else if (pct < 50) {
        setCaption("Loading assessment progress");
      } else if (pct < 75) {
        setCaption("Preparing CPD record");
      } else if (pct < 90) {
        setCaption("Opening your workspace");
      } else {
        setCaption("Your pathway is ready.");
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            sessionStorage.setItem("sustain_preloader_seen", "true");
            onComplete();
          }, 300); // Fade out
        }, 300); // Hold final state for 300ms
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      id="sustain-preloader"
      aria-label="Loading SUSTAIN LMS"
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#002B20] via-[#003C2D] to-[#004A37] text-white overflow-hidden transition-opacity duration-300 select-none"
    >
      {/* Soft background radial highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-650/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md px-8 text-center space-y-10 relative z-10">
        {/* Brand Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight font-heading text-white flex items-center justify-center gap-2">
            <span className="w-2.5 h-6 bg-emerald-400 rounded-sm inline-block"></span>
            SUSTAIN <span className="font-light text-emerald-300 text-2xl">LMS</span>
          </h1>
          <p className="text-[10px] font-bold text-emerald-400/85 uppercase tracking-widest font-mono">
            Sustained Learning Pathways
          </p>
        </div>

        {/* Pathway Line with 4 Milestone Dots */}
        {!isShortTransition && (
          <div className="relative py-4 max-w-xs mx-auto">
            {/* Background connector line */}
            <div className="absolute top-[22px] left-2 right-2 h-[2px] bg-emerald-950/70 rounded-full" />
            
            {/* Dynamic filled progress line */}
            <div
              className="absolute top-[22px] left-2 h-[2px] bg-emerald-450 rounded-full transition-all duration-75 ease-out bg-emerald-400"
              style={{ width: `calc(${progress}% - 12px)` }}
            />

            {/* 4 milestones */}
            <div className="relative flex justify-between">
              {[
                { name: "Learn", percent: 0, colorClass: "bg-emerald-400 border-emerald-300 shadow-emerald-400/30" },
                { name: "Submit", percent: 33, colorClass: "bg-emerald-400 border-emerald-300 shadow-emerald-400/30" },
                { name: "Review", percent: 66, colorClass: "bg-emerald-400 border-emerald-300 shadow-emerald-400/30" },
                { name: "Certify", percent: 100, colorClass: "bg-amber-400 border-amber-300 shadow-amber-400/30" }
              ].map((m, idx) => {
                const isActive = progress >= m.percent;
                return (
                  <div key={idx} className="flex flex-col items-center space-y-2 w-14">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? `${m.colorClass} scale-110 shadow-md`
                          : "bg-[#003C2D] border-emerald-950/80 scale-90"
                      }`}
                    >
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-[#002B20] rounded-full" />
                      )}
                    </div>
                    <span
                      className={`text-[9px] font-bold tracking-wider font-heading transition-colors duration-300 ${
                        isActive ? "text-emerald-300" : "text-emerald-800"
                      }`}
                    >
                      {m.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Heading & Support text */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight font-heading text-emerald-50">
              Preparing your learning pathway
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/70 font-sans font-normal h-5 flex items-center justify-center">
              {caption}
            </p>
          </div>

          {!isShortTransition && (
            <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] font-bold text-emerald-400 bg-emerald-950/45 px-3 py-1 rounded-full border border-emerald-900/35 w-fit mx-auto">
              <span>{Math.round(progress)}%</span>
            </div>
          )}
        </div>

        {/* Footnote */}
        <div className="text-[9px] text-emerald-400/40 tracking-widest font-mono font-medium pt-4">
          LESSONS • ASSESSMENTS • CPD • CERTIFICATES
        </div>
      </div>
    </div>
  );
}
