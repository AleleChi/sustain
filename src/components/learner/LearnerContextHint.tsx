import React, { useState, useEffect, useRef } from "react";
import { HelpCircle, X } from "lucide-react";

interface LearnerContextHintProps {
  title: "Helpful note" | "What this means" | "How this works" | "Why this matters" | "Tip";
  text: string;
  className?: string;
  align?: "left" | "right" | "center";
}

export function LearnerContextHint({
  title,
  text,
  className = "",
  align = "right"
}: LearnerContextHintProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    // Only auto-open if not a touch device (approximate using hover query)
    if (window.matchMedia("(hover: hover)").matches) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover)").matches) {
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  // Align positioning styles
  let alignClasses = "left-0 mt-2";
  if (align === "right") {
    alignClasses = "right-0 mt-2";
  } else if (align === "center") {
    alignClasses = "left-1/2 -translate-x-1/2 mt-2";
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative inline-block ${className}`}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        className="h-7 w-7 rounded-full bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center transition-all duration-200 ease-out hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 cursor-pointer shrink-0"
        aria-label={`Contextual help: ${title}`}
        aria-expanded={isOpen}
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {isOpen && (
        <div 
          className={`absolute ${alignClasses} z-50 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 transition-all duration-200 ease-out animate-in fade-in slide-in-from-top-1 text-left`}
          role="tooltip"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
              {title}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs font-medium text-slate-700 leading-relaxed">
            {text}
          </p>
        </div>
      )}
    </div>
  );
}
