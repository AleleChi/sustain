import { useEffect, useState } from "react";

interface SustainPreloaderProps {
  onComplete: () => void;
}

export function SustainPreloader({ onComplete }: SustainPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("Preparing your learning pathway");
  const [isBrandVisible, setIsBrandVisible] = useState(false);
  const [isPathwayVisible, setIsPathwayVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isShortTransition, setIsShortTransition] = useState(false);

  useEffect(() => {
    const isSeen = sessionStorage.getItem("sustain_preloader_seen") === "true";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Reduced motion fallback: Show static loader for 800ms, then fade out smoothly
      setProgress(100);
      setCaption("Your pathway is ready.");
      setIsBrandVisible(true);
      setIsPathwayVisible(true);
      
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        const completeTimer = setTimeout(() => {
          sessionStorage.setItem("sustain_preloader_seen", "true");
          onComplete();
        }, 500); // Wait for fade-out
        return () => clearTimeout(completeTimer);
      }, 800);
      return () => clearTimeout(exitTimer);
    }

    if (isSeen) {
      // Page refresh/revisit in same session: shorter 700ms soft transition, then fade out smoothly
      setIsShortTransition(true);
      setProgress(100);
      setCaption("Your pathway is ready.");
      setIsBrandVisible(true);
      
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 500); // Wait for fade-out
        return () => clearTimeout(completeTimer);
      }, 700);
      return () => clearTimeout(exitTimer);
    }

    // First visit in session: exact timeline mapping from 0ms to 3000ms
    const intervalTime = 10; // High precision 10ms intervals
    let elapsed = 0;
    let brandVisible = false;
    let pathwayVisible = false;

    const timer = setInterval(() => {
      elapsed += intervalTime;

      // Brand fade in at 300ms
      if (elapsed >= 300 && !brandVisible) {
        brandVisible = true;
        setIsBrandVisible(true);
      }

      // Pathway begins drawing at 600ms
      if (elapsed >= 600 && !pathwayVisible) {
        pathwayVisible = true;
        setIsPathwayVisible(true);
      }

      // Compute progress & captions based on precise milestone timings
      if (elapsed < 600) {
        setProgress(0);
        setCaption("Preparing your learning pathway");
      } else if (elapsed >= 600 && elapsed < 1100) {
        // Learn (completes at 1100ms)
        const factor = (elapsed - 600) / 500;
        setProgress(factor * 33);
        setCaption("Checking assigned courses");
      } else if (elapsed >= 1100 && elapsed < 1600) {
        // Submit (completes at 1600ms)
        const factor = (elapsed - 1100) / 500;
        setProgress(33 + factor * 33);
        setCaption("Loading assessment progress");
      } else if (elapsed >= 1600 && elapsed < 2100) {
        // Review (completes at 2100ms)
        const factor = (elapsed - 1600) / 500;
        setProgress(66 + factor * 34);
        setCaption("Preparing CPD record");
      } else if (elapsed >= 2100 && elapsed < 2800) {
        // Certify/Workspace (completes Certify at 2600ms, then prepares workspace until 2800ms)
        if (elapsed < 2600) {
          const factor = (elapsed - 2100) / 500;
          setProgress(Math.min(75 + factor * 25, 100));
        } else {
          setProgress(100);
        }
        setCaption("Opening your workspace");
      } else {
        // Final state from 2800ms to 3000ms
        setProgress(100);
        setCaption("Your pathway is ready.");
      }

      // At 3000ms, start exit transition
      if (elapsed >= 3000) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(() => {
          sessionStorage.setItem("sustain_preloader_seen", "true");
          onComplete();
        }, 500); // Fade out duration matches transition-opacity duration-500
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="sustain-preloader"
      aria-label="Loading SUSTAIN LMS"
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#002B20] via-[#003C2D] to-[#004A37] text-white overflow-hidden transition-opacity duration-500 ease-in-out select-none ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Soft background radial highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-650/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md px-8 text-center space-y-10 relative z-10">
        {/* Brand Header */}
        <div className={`space-y-2 transition-all duration-700 transform ${
          isBrandVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <h1 className="text-3xl font-semibold tracking-tight font-heading text-white flex items-center justify-center gap-2">
            <span className="w-2.5 h-6 bg-emerald-400 rounded-sm inline-block"></span>
            SUSTAIN <span className="font-light text-emerald-300 text-2xl font-heading">LMS</span>
          </h1>
          <p className="text-xs font-medium text-emerald-300/85 font-sans">
            Sustained learning pathways
          </p>
        </div>

        {/* Pathway Line with 4 Milestone Dots */}
        {!isShortTransition && (
          <div className={`relative py-4 max-w-xs mx-auto transition-all duration-700 transform ${
            isPathwayVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            {/* Background connector line */}
            <div className="absolute top-[22px] left-2 right-2 h-[2px] bg-emerald-950/70 rounded-full" />
            
            {/* Dynamic filled progress line */}
            <div
              className="absolute top-[22px] left-2 h-[2px] bg-emerald-400 rounded-full transition-all duration-75 ease-out"
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
                      className={`text-[10px] font-medium tracking-wide font-sans transition-colors duration-300 ${
                        isActive ? "text-emerald-200 font-semibold" : "text-emerald-800"
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
            <div className="flex items-center justify-center gap-1.5 font-sans text-xs font-medium text-emerald-300 bg-emerald-950/45 px-3 py-1 rounded-full border border-emerald-900/35 w-fit mx-auto">
              <span>{Math.round(progress)}%</span>
            </div>
          )}
        </div>

        {/* Footnote */}
        <div className="text-[10px] text-emerald-400/50 font-sans font-medium pt-4">
          Lessons, assessments, CPD and certificates in one clear flow.
        </div>
      </div>
    </div>
  );
}
