import { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  X, 
  Send, 
  Mail, 
  FileText, 
  BookOpen, 
  Download, 
  Share2, 
  AlertCircle, 
  HelpCircle 
} from "lucide-react";

export interface ActionMenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface FacilitatorMobileActionMenuProps {
  items: ActionMenuItem[];
  onActionSelect: (key: string) => void;
}

export function FacilitatorMobileActionMenu({ items, onActionSelect }: FacilitatorMobileActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleItemClick = (key: string) => {
    onActionSelect(key);
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 z-45 transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Action Sheet Panel */}
      <div 
        ref={menuRef}
        className={`fixed left-0 right-0 z-48 bg-white border-t border-slate-200 rounded-t-2xl shadow-xl transition-all duration-200 text-left ${
          isOpen ? "bottom-16 opacity-100" : "bottom-[-100%] opacity-0 pointer-events-none"
        }`}
        style={{
          maxHeight: "calc(100vh - 120px)",
          paddingBottom: "1.5rem"
        }}
      >
        <div className="px-4 pt-4 pb-2 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Quick actions
          </h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-2 overflow-y-auto" style={{ maxHeight: "350px" }}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                className="w-full px-4 py-3.5 hover:bg-slate-50 flex items-center gap-3 text-slate-700 hover:text-emerald-900 transition-colors font-bold text-xs"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Icon className="h-4.5 w-4.5 text-emerald-850" />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 z-49 h-14 w-14 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg flex items-center justify-center active:scale-95 transition-all duration-200 border border-emerald-700 cursor-pointer"
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
        aria-expanded={isOpen}
      >
        <Plus 
          className={`h-6 w-6 transition-transform duration-250 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`} 
        />
      </button>
    </>
  );
}

export default FacilitatorMobileActionMenu;
