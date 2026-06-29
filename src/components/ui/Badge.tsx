import { ReactNode, ComponentPropsWithoutRef } from "react";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "neutral";
}

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium";

  const variants = {
    default: "bg-sustain-50 text-sustain-900 border border-sustain-100",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-100",
    warning: "bg-amber-50 text-amber-800 border border-amber-100",
    info: "bg-sky-50 text-sky-800 border border-sky-100",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
