import { ReactNode, ComponentPropsWithoutRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "custom";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-sustain-600 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-sustain-900 text-white hover:bg-sustain-850 active:bg-sustain-950 shadow-xs",
    secondary: "bg-sustain-100 text-sustain-900 hover:bg-sustain-200 active:bg-sustain-300",
    outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100",
    ghost: "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
    custom: "",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
