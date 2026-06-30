import { ReactNode, ComponentPropsWithoutRef } from "react";

export interface StatusChipProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
  status: string;
}

export function StatusChip({
  children,
  status,
  className = "",
  ...props
}: StatusChipProps) {
  const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shrink-0 font-sans tracking-normal text-left transition-all";

  // Normalize status string
  const normalized = status.toLowerCase().replace(/_/g, "-").trim();

  // Determine styles and colors
  let styles = "bg-slate-50 text-slate-700 border-slate-200"; // default
  let dotColor = "bg-slate-400";
  let displayText = children;

  // 1. Course in progress / In progress / Lesson in progress
  if (
    normalized === "in-progress" ||
    normalized === "inprogress" ||
    normalized === "in progress" ||
    normalized === "course-in-progress" ||
    normalized === "lesson-in-progress" ||
    normalized === "current" ||
    normalized === "active"
  ) {
    styles = "bg-emerald-50 text-emerald-800 border-emerald-200";
    dotColor = "bg-emerald-500";
    if (!displayText) displayText = "Course in progress";
  }
  // 2. Completed / Passed / Complete
  else if (
    normalized === "completed" ||
    normalized === "passed" ||
    normalized === "complete"
  ) {
    styles = "bg-emerald-50 text-emerald-800 border-emerald-200";
    dotColor = "bg-emerald-500";
    if (!displayText) displayText = "Completed";
  }
  // 3. Draft / Draft Saved / Draft Started
  else if (
    normalized === "draft" ||
    normalized === "draft-saved" ||
    normalized === "draftsaved" ||
    normalized === "draft saved" ||
    normalized === "draft-started" ||
    normalized === "draftstarted" ||
    normalized === "draft started"
  ) {
    styles = "bg-amber-50 text-amber-800 border-amber-200";
    dotColor = "bg-amber-505"; // fallback dot bg
    styles = "bg-amber-50 text-amber-800 border-amber-200";
    dotColor = "bg-amber-500";
    if (!displayText) displayText = "Draft saved";
  }
  // 4. Pending / Attendance pending / Review pending / Review pending audit
  else if (
    normalized === "review-pending" ||
    normalized === "reviewpending" ||
    normalized === "review pending" ||
    normalized === "pending audit" ||
    normalized === "pending-audit" ||
    normalized === "pending_audit"
  ) {
    styles = "bg-amber-50 text-amber-800 border-amber-200";
    dotColor = "bg-amber-500";
    if (!displayText) displayText = "Review pending";
  }
  else if (
    normalized === "pending" ||
    normalized === "attendance-pending" ||
    normalized === "attendancepending" ||
    normalized === "attendance pending"
  ) {
    styles = "bg-blue-50 text-blue-800 border-blue-100";
    dotColor = "bg-blue-500";
    if (!displayText) displayText = "Pending";
  }
  // 5. Available
  else if (normalized === "available" || normalized === "start-course" || normalized === "start course") {
    styles = "bg-sky-50 text-sky-800 border-sky-100";
    dotColor = "bg-sky-500";
    if (!displayText) displayText = "Available";
  }
  // 6. Locked
  else if (normalized === "locked" || normalized === "locked-module") {
    styles = "bg-slate-100 text-slate-650 border-slate-200";
    dotColor = "bg-slate-400";
    if (!displayText) displayText = "Locked";
  }
  // 7. Certificate-linked
  else if (
    normalized === "certificate-linked" ||
    normalized === "certificatelinked" ||
    normalized === "certificate linked"
  ) {
    styles = "bg-amber-50 text-amber-850 border-amber-200";
    dotColor = "bg-amber-500";
    if (!displayText) displayText = "Certificate-linked";
  }
  // 8. CPD-linked
  else if (
    normalized === "cpd-linked" ||
    normalized === "cpdlinked" ||
    normalized === "cpd linked"
  ) {
    styles = "bg-teal-50 text-teal-800 border-teal-150";
    dotColor = "bg-teal-500";
    if (!displayText) displayText = "CPD-linked";
  }
  // 9. Active pathway / Pathway progress
  else if (
    normalized === "active-pathway" ||
    normalized === "activepathway" ||
    normalized === "active pathway" ||
    normalized === "pathway-progress"
  ) {
    styles = "bg-emerald-50 text-emerald-800 border-emerald-200";
    dotColor = "bg-emerald-500";
    if (!displayText) displayText = "Active pathway";
  }
  // 10. Not eligible / Not eligible yet
  else if (
    normalized === "not-eligible" ||
    normalized === "noteligible" ||
    normalized === "not eligible" ||
    normalized === "not-eligible-yet" ||
    normalized === "not eligible yet"
  ) {
    styles = "bg-slate-100 text-slate-700 border-slate-200";
    dotColor = "bg-slate-400";
    if (!displayText) displayText = "Not eligible yet";
  }
  // 11. Low-bandwidth / Offline / Offline packs
  else if (
    normalized === "offline" ||
    normalized === "offline-ready" ||
    normalized === "low-bandwidth" ||
    normalized === "lowbandwidth"
  ) {
    styles = "bg-teal-50 text-teal-800 border-teal-100";
    dotColor = "bg-teal-500";
    if (!displayText) displayText = "Offline-ready";
  }
  // 12. Info / Unread
  else if (normalized === "info" || normalized === "unread" || normalized === "new") {
    styles = "bg-blue-50 text-blue-800 border-blue-100";
    dotColor = "bg-blue-500";
    if (!displayText) displayText = "New";
  }
  // 13. Failed
  else if (normalized === "failed") {
    styles = "bg-rose-50 text-rose-800 border-rose-200";
    dotColor = "bg-rose-500";
    if (!displayText) displayText = "Failed";
  }

  // If there's custom children, we use the text passed as children
  if (children) {
    displayText = children;
  }

  // Fallback for custom display texts but using a derived style if known
  if (!displayText) {
    displayText = status.replace(/_/g, " ");
  }

  return (
    <span
      className={`${baseStyles} ${styles} ${className}`}
      {...props}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor} shrink-0`} />
      <span>{displayText}</span>
    </span>
  );
}
