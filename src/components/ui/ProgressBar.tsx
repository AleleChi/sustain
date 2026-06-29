export interface ProgressBarProps {
  value: number; // percentage value from 0 to 100
  label?: string;
  subLabel?: string;
  size?: "sm" | "md";
  className?: string;
}

export function ProgressBar({
  value,
  label,
  subLabel,
  size = "sm",
  className = "",
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, value));

  const height = {
    sm: "h-1.5",
    md: "h-2.5",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || subLabel) && (
        <div className="flex justify-between items-center mb-1 text-xs">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {subLabel && <span className="text-slate-500 font-mono">{subLabel}</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height[size]}`}>
        <div
          className="bg-sustain-900 rounded-full h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
