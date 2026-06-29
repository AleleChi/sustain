import { useState } from "react";
import { 
  mockFacilitatorResources,
  FacilitatorResource 
} from "../../../data/mockFacilitator";
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  Bookmark,
  Layers,
  Sparkles
} from "lucide-react";

export function ResourcesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | "Guides" | "Rubrics" | "Programme Manuals" | "Facilitation Slides">("All");

  const categories = ["All", "Guides", "Rubrics", "Programme Manuals", "Facilitation Slides"];

  const filteredResources = mockFacilitatorResources.filter(res => {
    const matchesCategory = activeCategory === "All" || res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title: string) => {
    alert(`"${title}" downloaded successfully onto local workspace.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="text-left space-y-1.5">
        <span className="text-[10px] font-bold text-sustain-primary uppercase tracking-widest font-mono block">
          TRAINER TOOLKITS
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans leading-tight">
          Resource Library &amp; Guidelines
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Access grading matrices, course curriculum handbooks, lecture slide decks, and local delivery manuals.
        </p>
      </div>

      {/* Control filters bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-medium">
        
        {/* Category tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-50 p-1 border border-slate-100 rounded-xl w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeCategory === cat 
                  ? "bg-white text-slate-900 shadow-3xs" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {cat === "All" ? "All Resources" : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, topics..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-850 focus:bg-white text-slate-700 font-medium"
          />
        </div>

      </div>

      {/* Resources grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.length === 0 ? (
          <div className="md:col-span-2 text-center p-12 text-slate-400 text-xs font-semibold">
            No resources found matching current selection.
          </div>
        ) : (
          filteredResources.map((res) => (
            <div 
              key={res.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between hover:border-sustain-primary/40 hover:shadow-sm transition-all duration-300 text-left h-fit"
            >
              <div className="space-y-3.5">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200/50 px-2 py-0.5 rounded uppercase">
                    {res.category}
                  </span>
                  
                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider bg-slate-50 border border-slate-150 px-1.5 py-0.2 rounded">
                    {res.type} • {res.size}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-emerald-900">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold font-mono text-slate-400">
                <span>UPDATED: {res.lastUpdated}</span>
                
                <button 
                  onClick={() => handleDownload(res.title)}
                  className="flex items-center gap-1.5 text-emerald-850 hover:text-emerald-900 font-black cursor-pointer text-xs"
                >
                  <Download className="h-4 w-4" /> Download Document
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
