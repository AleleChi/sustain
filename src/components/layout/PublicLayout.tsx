import { ReactNode } from "react";
import { PublicHeader } from "../navigation/PublicHeader";
import { PublicFooter } from "../public/PublicFooter";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div id="public-layout" className="min-h-screen bg-slate-50/40 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-grow w-full">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
