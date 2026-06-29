import { ReactNode, ComponentPropsWithoutRef } from "react";

export interface StatusChipProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
  status: "completed" | "in-progress" | "locked" | "passed" | "pending" | "failed";
}

export function StatusChip({
  children,
  status,
  className = "",
  ...props
}: StatusChipProps) {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border";

  const styles = {
    completed: "bg-emerald-50 text-emerald-800 border-emerald-150",
    passed: "bg-emerald-50 text-emerald-800 border-emerald-150",
    "in-progress": "bg-sustain-50 text-sustain-900 border-sustain-200",
    pending: "bg-amber-50 text-amber-850 border-amber-150",
    locked: "bg-slate-50 text-slate-400 border-slate-150",
    failed: "bg-rose-50 text-rose-800 border-rose-150",
  };

  return (
    <span
      className={`${baseStyles} ${styles[status]} ${className}`}
      {...props}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${
        status === "completed" || status === "passed" ? "bg-emerald-500" :
        status === "in-progress" ? "bg-sustain-600" :
        status === "pending" ? "bg-amber-500" :
        status === "locked" ? "bg-slate-300" : "bg-rose-500"
      }`} />
      {children}
    </span>
  );
}
