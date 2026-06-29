import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  X, 
  Users, 
  Download, 
  Filter, 
  ArrowUpRight, 
  WifiOff, 
  Ticket, 
  Bell, 
  Zap 
} from "lucide-react";

export interface ActionItem {
  label: string;
  icon: any;
  onClick: () => void;
}

interface FacilitatorMobileActionMenuProps {
  actions: ActionItem[];
}

export function FacilitatorMobileActionMenu({ actions }: FacilitatorMobileActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle open state
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="lg:hidden fixed bottom-20 right-4 z-50">
      {/* Floating Action Button */}
      <button
        onClick={handleToggle}
        className={`h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg focus:outline-hidden transition-all duration-200 cursor-pointer ${
          isOpen ? "bg-emerald-950 scale-95" : "bg-emerald-900 hover:bg-emerald-850 active:scale-95"
        }`}
        id="facilitator-fab-btn"
        aria-label={isOpen ? "Close quick actions menu" : "Open quick actions menu"}
        aria-expanded={isOpen}
      >
        <span className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="h-5 w-5 transition-transform duration-200 rotate-0" />
          ) : (
            <Plus className="h-5 w-5 transition-transform duration-200 rotate-0" />
          )}
        </span>
      </button>

      {/* Backdrop overlay for focus and closing */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-up Quick Action Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.22 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 p-5 pb-6 text-left border-t border-slate-100 max-h-[80vh] overflow-y-auto"
          >
            {/* Header with notch decoration and title */}
            <div className="flex flex-col items-center justify-center mb-4">
              <div className="w-10 h-1 bg-slate-200 rounded-full mb-3" />
              <div className="flex items-center justify-between w-full">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Quick actions</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Action Items List */}
            <div className="space-y-1">
              {actions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsOpen(false);
                      // Slight delay to allow transition before triggering action
                      setTimeout(() => {
                        action.onClick();
                      }, 100);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 active:bg-slate-50/80 rounded-xl transition-colors text-left font-semibold text-xs cursor-pointer border border-transparent hover:border-slate-100"
                  >
                    <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-slate-800">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
