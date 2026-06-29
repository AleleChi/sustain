import { ReactNode, ComponentPropsWithoutRef } from "react";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  variant?: "default" | "muted" | "flat";
}

export function Card({
  children,
  variant = "default",
  className = "",
  ...props
}: CardProps) {
  const baseStyles = "rounded-xl overflow-hidden transition-all duration-200";
  
  const variants = {
    default: "bg-white border border-slate-100 shadow-xs hover:shadow-md/5",
    muted: "bg-slate-50 border border-slate-100",
    flat: "bg-white border border-slate-200",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
