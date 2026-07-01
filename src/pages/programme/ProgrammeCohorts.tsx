import { useState, useMemo, useEffect } from "react";
import { COHORTS_DATA, CohortItem } from "../../data/programmeData";
import { 
  Layers, 
  User, 
  MapPin, 
  WifiOff, 
  Award,
  ChevronRight,
  Inbox,
  Filter,
  X,
  Plus,
  Download,
  Users,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Clock,
  ChevronLeft,
  Edit,
  PlusCircle,
  Check,
  Briefcase
} from "lucide-react";
import { nigeriaStates, getLGAsByState } from "../../data/nigeriaLocations";
import { useRoute } from "../../context/RouteContext";

export function ProgrammeCohorts() {
  const { showToast } = useRoute();
  
  // Stateful cohort list to enable real interactive additions & modifications
  const [cohorts, setCohorts] = useState<CohortItem[]>(() => {
    return COHORTS_DATA.map(c => {
      // Map LGA dynamically based on ID
      let lga = "Central Hub";
      if (c.id.includes("LAG")) lga = "Ikeja";
      if (c.id.includes("KAN")) lga = "Kano Municipal";
      if (c.id.includes("KAD")) lga = "Kaduna North";
      if (c.id.includes("ENU")) lga = "Enugu North";
      
      // Initialise status according to approved design rules
      let status = "On track";
      if (c.id === "COH-LAG-01") status = "Review pending";
      if (c.id === "COH-KAN-02") status = "Needs follow-up";
      if (c.id === "COH-ENU-03") status = "Paused";
      
      return {
        ...c,
        lga,
        status
      };
    });
  });

  // Filter States
  const [selectedState, setSelectedState] = useState("All");
  const [selectedLga, setSelectedLga] = useState("All");
  const [selectedPathway, setSelectedPathway] = useState("All");
  const [selectedFacilitator, setSelectedFacilitator] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);

  // Modal / Drawer States
  const [viewingCohort, setViewingCohort] = useState<CohortItem | null>(null);
  
  // Interactive Create Cohort Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCohortName, setNewCohortName] = useState("");
  const [newCohortPathway, setNewCohortPathway] = useState("Youth Employability Pathway");
  const [newCohortState, setNewCohortState] = useState("Lagos");
  const [newCohortLga, setNewCohortLga] = useState("");
  const [newCohortFacilitator, setNewCohortFacilitator] = useState("Adewale Okoye");
  const [newCohortStartDate, setNewCohortStartDate] = useState("2026-07-01");
  const [newCohortTarget, setNewCohortTarget] = useState("120");
  const [newCohortLowBandwidth, setNewCohortLowBandwidth] = useState(false);

  // Bulk Assign States
  const [isBulkAssignOpen, setIsBulkAssignOpen] = useState(false);
  const [bulkAssignStep, setBulkAssignStep] = useState(1);
  const [bulkAssignPathway, setBulkAssignPathway] = useState("Youth Employability Pathway");
  const [bulkAssignState, setBulkAssignState] = useState("Lagos");
  const [bulkAssignLga, setBulkAssignLga] = useState("Ikeja");
  const [bulkAssignCohort, setBulkAssignCohort] = useState("Lagos Work Readiness 01");
  const [bulkAssignFacilitator, setBulkAssignFacilitator] = useState("Adewale Okoye");

  // Keep bulk assign LGA in sync
  useEffect(() => {
    const lgas = getLGAsByState(bulkAssignState);
    if (lgas.length > 0) {
      setBulkAssignLga(lgas[0].name);
    }
  }, [bulkAssignState]);

  // Interactive Edit Cohort Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState<CohortItem | null>(null);
  const [editCohortName, setEditCohortName] = useState("");
  const [editCohortPathway, setEditCohortPathway] = useState("Youth Employability Pathway");
  const [editCohortState, setEditCohortState] = useState("Lagos");
  const [editCohortLga, setEditCohortLga] = useState("");
  const [editCohortFacilitator, setEditCohortFacilitator] = useState("Adewale Okoye");
  const [editCohortProgress, setEditCohortProgress] = useState(0);
  const [editCohortStatus, setEditCohortStatus] = useState("On track");

  // Interactive Assign Facilitator Modal States
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assigningCohort, setAssigningCohort] = useState<CohortItem | null>(null);
  const [assignedFacilitatorName, setAssignedFacilitatorName] = useState("Adewale Okoye");

  // Interactive Import Learners Modal States
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importingCohort, setImportingCohort] = useState<CohortItem | null>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importSuccess, setImportSuccess] = useState(false);

  // Interactive Export Report Modal States
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportingCohort, setExportingCohort] = useState<CohortItem | null>(null);
  const [exportFormat, setExportFormat] = useState("xlsx");
  const [exportProgress, setExportProgress] = useState(0);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Reset LGA filter when state filter changes
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedLga("All");
  };

  // Dependent LGAs based on selected State
  const availableLgas = useMemo(() => {
    if (selectedState === "All") return [];
    return getLGAsByState(selectedState);
  }, [selectedState]);

  // Dependent LGAs for new cohort state
  const creationLgas = useMemo(() => {
    return getLGAsByState(newCohortState);
  }, [newCohortState]);

  // Dependent LGAs for editing cohort state
  const editLgas = useMemo(() => {
    return getLGAsByState(editCohortState);
  }, [editCohortState]);

  // Set default LGA on state changes in modals
  useMemo(() => {
    if (creationLgas.length > 0) {
      setNewCohortLga(creationLgas[0].name);
    }
  }, [creationLgas]);

  useMemo(() => {
    if (editLgas.length > 0) {
      setEditCohortLga(editLgas[0].name);
    }
  }, [editLgas]);

  // Filter cohorts based on selections
  const filteredCohorts = useMemo(() => {
    return cohorts.filter((cohort) => {
      const matchesState = selectedState === "All" || cohort.location === selectedState;
      const matchesLga = selectedLga === "All" || cohort.lga === selectedLga;
      const matchesPathway = selectedPathway === "All" || cohort.pathway === selectedPathway;
      const matchesFacilitator = selectedFacilitator === "All" || cohort.facilitator === selectedFacilitator;
      const matchesStatus = selectedStatus === "All" || cohort.status === selectedStatus;

      const matchesQuery = searchQuery === "" || 
        cohort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cohort.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cohort.facilitator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cohort.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cohort.pathway.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesState && matchesLga && matchesPathway && matchesFacilitator && matchesStatus && matchesQuery;
    });
  }, [cohorts, selectedState, selectedLga, selectedPathway, selectedFacilitator, selectedStatus, searchQuery]);

  // Count active filters (excluding search term)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedState !== "All") count++;
    if (selectedLga !== "All") count++;
    if (selectedPathway !== "All") count++;
    if (selectedFacilitator !== "All") count++;
    if (selectedStatus !== "All") count++;
    return count;
  }, [selectedState, selectedLga, selectedPathway, selectedFacilitator, selectedStatus]);

  // Open Edit Modal with prefilled state
  const handleOpenEditModal = (cohort: CohortItem) => {
    setEditingCohort(cohort);
    setEditCohortName(cohort.name);
    setEditCohortPathway(cohort.pathway);
    setEditCohortState(cohort.location);
    setEditCohortLga(cohort.lga || "Central Hub");
    setEditCohortFacilitator(cohort.facilitator);
    setEditCohortProgress(cohort.avgProgress);
    setEditCohortStatus(cohort.status || "On track");
    setIsEditModalOpen(true);
  };

  // Submit Cohort Creation
  const handleCreateCohortSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCohortName.trim()) {
      showToast("Please enter a cohort name.");
      return;
    }

    const stateSlug = newCohortState.substring(0, 3).toUpperCase();
    const cohortId = `COH-${stateSlug}-${String(cohorts.length + 1).padStart(2, "0")}`;

    const newCohort: CohortItem = {
      id: cohortId,
      name: newCohortName,
      pathway: newCohortPathway,
      location: newCohortState,
      lga: newCohortLga,
      facilitator: newCohortFacilitator,
      enrolled: 0,
      activeLearners: 0,
      completedLearners: 0,
      lowBandwidthUsers: newCohortLowBandwidth ? 1 : 0,
      avgProgress: 0,
      reviewsPending: 0,
      status: "New cohort",
      startDate: newCohortStartDate,
      expectedTarget: Number(newCohortTarget) || 120,
      lowBandwidthEnabled: newCohortLowBandwidth
    };

    setCohorts(prev => [newCohort, ...prev]);
    setIsCreateModalOpen(false);
    
    // Reset values
    setNewCohortName("");
    setNewCohortPathway("Youth Employability Pathway");
    setNewCohortState("Lagos");
    setNewCohortFacilitator("Adewale Okoye");
    setNewCohortStartDate("2026-07-01");
    setNewCohortTarget("120");
    setNewCohortLowBandwidth(false);

    showToast("Cohort created successfully!");
  };

  // Submit Cohort Edit
  const handleEditCohortSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCohortName.trim()) {
      showToast("Please enter a cohort name.");
      return;
    }

    setCohorts(prev => prev.map(c => {
      if (c.id === editingCohort?.id) {
        return {
          ...c,
          name: editCohortName,
          pathway: editCohortPathway,
          location: editCohortState,
          lga: editCohortLga,
          facilitator: editCohortFacilitator,
          avgProgress: Math.min(100, Math.max(0, editCohortProgress)),
          status: editCohortStatus
        };
      }
      return c;
    }));

    setIsEditModalOpen(false);
    
    // Also update viewing cohort if currently open
    if (viewingCohort && viewingCohort.id === editingCohort?.id) {
      setViewingCohort(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name: editCohortName,
          pathway: editCohortPathway,
          location: editCohortState,
          lga: editCohortLga,
          facilitator: editCohortFacilitator,
          avgProgress: Math.min(100, Math.max(0, editCohortProgress)),
          status: editCohortStatus
        };
      });
    }

    showToast("Cohort details updated successfully!");
  };

  // Submit Facilitator Assignment
  const handleAssignFacilitatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setCohorts(prev => prev.map(c => {
      // If a specific cohort was targeted, update only that, otherwise update based on selection
      if (assigningCohort && c.id === assigningCohort.id) {
        return { ...c, facilitator: assignedFacilitatorName };
      }
      return c;
    }));

    setIsAssignModalOpen(false);

    if (viewingCohort && assigningCohort && viewingCohort.id === assigningCohort.id) {
      setViewingCohort(prev => {
        if (!prev) return null;
        return { ...prev, facilitator: assignedFacilitatorName };
      });
    }

    showToast(`Assigned ${assignedFacilitatorName} as lead facilitator!`);
  };

  // Trigger Mock File Upload
  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImportFile(file);
      setImportProgress(0);
      setImportSuccess(false);

      // Simulate file upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setImportSuccess(true);
          
          // Increment enrolled count of cohort as high fidelity visual proof!
          setCohorts(prev => prev.map(c => {
            if (importingCohort && c.id === importingCohort.id) {
              return {
                ...c,
                enrolled: c.enrolled + 45,
                activeLearners: c.activeLearners + 38
              };
            }
            return c;
          }));

          showToast("Learners imported successfully!");
        }
        setImportProgress(progress);
      }, 150);
    }
  };

  // Trigger Mock Report Export
  const handleTriggerExport = () => {
    setExportProgress(0);
    setExportSuccess(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setExportSuccess(true);
        showToast(`Exported report in .${exportFormat.toUpperCase()} successfully!`);
      }
      setExportProgress(progress);
    }, 200);
  };

  // Helper status badge styles
  const getCohortStatusBadge = (status: string) => {
    switch (status) {
      case "On track":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100/50">
            On track
          </span>
        );
      case "Needs follow-up":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-semibold border border-rose-100/50">
            Needs follow-up
          </span>
        );
      case "Review pending":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-100/50">
            Review pending
          </span>
        );
      case "New cohort":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100/50">
            New cohort
          </span>
        );
      case "Paused":
        return (
          <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold border border-slate-200/50">
            Paused
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-semibold border border-slate-150">
            {status}
          </span>
        );
    }
  };

  // Custom alert row messages for cohort card
  const getCohortAlert = (cohort: CohortItem) => {
    if (cohort.reviewsPending > 0) {
      return (
        <div className="bg-amber-50/70 border border-amber-100/50 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-left">
          <Inbox className="h-4 w-4 text-amber-650 shrink-0 mt-0.5" />
          <div className="text-amber-950 font-medium leading-relaxed">
            <span className="font-bold text-amber-900">{cohort.reviewsPending} learners</span> awaiting CPD review
          </div>
        </div>
      );
    }
    if (cohort.id === "COH-KAD-01") {
      return (
        <div className="bg-rose-50/70 border border-rose-100/50 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-left">
          <AlertCircle className="h-4 w-4 text-rose-650 shrink-0 mt-0.5" />
          <div className="text-rose-950 font-medium leading-relaxed">
            <span className="font-bold text-rose-900">3 learners</span> need follow-up on Module 3
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300 pb-28 lg:pb-8">
      
      {/* 1. Page hero */}
      <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-200/70 shadow-3xs relative overflow-hidden flex flex-col xl:flex-row justify-between gap-6">
        <div className="space-y-4 max-w-2xl text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-[#005C45] bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100/50">
              SUSTAIN CPD Programme
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200/30">
              {cohorts.length} Active Cohorts
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-200/30">
              6 Implementation States
            </span>
          </div>
          
          <div className="space-y-1.5">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight font-heading leading-tight">
              Cohort Management
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              Create cohorts, assign facilitators, track learner progress, and monitor delivery across states and LGAs.
            </p>
          </div>
        </div>

        {/* Primary action handlers */}
        <div className="flex flex-col sm:flex-row xl:flex-col lg:flex-row items-stretch xl:items-end lg:items-center gap-2.5 shrink-0 justify-end">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="h-11 px-5 bg-[#005C45] hover:bg-[#004A38] text-white text-xs font-bold rounded-2xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span>Create Cohort</span>
          </button>
          
          <button
            onClick={() => {
              setBulkAssignStep(1);
              setIsBulkAssignOpen(true);
            }}
            className="h-11 px-5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs font-bold rounded-2xl shadow-3xs active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4 shrink-0 text-[#005C45]" />
            <span>Bulk Assign Learners</span>
          </button>
          
          <button
            onClick={() => {
              setAssigningCohort(null);
              setIsAssignModalOpen(true);
            }}
            className="h-11 px-5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs font-bold rounded-2xl shadow-3xs active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <User className="h-4 w-4 shrink-0 text-slate-450" />
            <span>Assign Facilitator</span>
          </button>

          <button
            onClick={() => {
              setExportingCohort(null);
              setIsExportModalOpen(true);
            }}
            className="h-11 px-5 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs font-bold rounded-2xl shadow-3xs active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4 shrink-0 text-slate-450" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. Cohort Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {[
          { label: "Active cohorts", value: cohorts.length, icon: Layers, color: "text-[#005C45] bg-emerald-50 border-emerald-100" },
          { label: "Learners assigned", value: "4,286", icon: Users, color: "text-[#005C45] bg-emerald-50 border-emerald-100" },
          { label: "Facilitators assigned", value: "42", icon: User, color: "text-[#005C45] bg-emerald-50 border-emerald-100" },
          { label: "CPD reviews pending", value: "76", icon: Inbox, color: "text-amber-700 bg-amber-50 border-amber-100" },
          { label: "Certificate ready", value: "312", icon: Award, color: "text-[#005C45] bg-emerald-50 border-emerald-100" },
          { label: "Low-bandwidth users", value: "2,679", icon: WifiOff, color: "text-teal-700 bg-teal-50 border-teal-100" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/70 p-4 rounded-2xl shadow-3xs flex flex-col justify-between text-left h-24">
              <div className="flex justify-between items-start">
                <p className="text-[10px] md:text-xs font-semibold text-slate-500 leading-none">{stat.label}</p>
                <div className={`p-1 rounded-lg border ${stat.color} shrink-0`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <p className="text-lg md:text-xl font-black text-slate-900 tracking-tight leading-none mt-2">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3. Search and Filter Panel */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-3xs space-y-4">
        
        {/* Filter Title */}
        <div className="text-left">
          <h2 className="text-sm font-bold text-slate-900 leading-none">Find cohorts</h2>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Filter cohorts by state, LGA, pathway, facilitator, and delivery status.
          </p>
        </div>

        {/* Search & Mobile Toggle */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pt-1">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cohort, facilitator, state, or pathway..."
              className="w-full h-11 pl-4 pr-4 bg-slate-50 hover:bg-slate-50/85 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium placeholder-slate-400 focus:outline-hidden focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Mobile responsive toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
              className={`flex-grow flex items-center justify-center gap-2 h-11 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mobileFiltersExpanded || activeFiltersCount > 0
                  ? "bg-emerald-50 text-[#005C45] border-emerald-100"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Filter className="h-4 w-4 shrink-0" />
              <span>{mobileFiltersExpanded ? "Hide Filters" : "Filters"}</span>
              {activeFiltersCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-[#005C45] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {(activeFiltersCount > 0 || searchQuery !== "") && (
              <button
                onClick={() => {
                  setSelectedState("All");
                  setSelectedLga("All");
                  setSelectedPathway("All");
                  setSelectedFacilitator("All");
                  setSelectedStatus("All");
                  setSearchQuery("");
                }}
                className="px-4 h-11 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Dropdowns (Grid layout on md+, collapsible on mobile) */}
        <div className={`${mobileFiltersExpanded ? "grid" : "hidden"} md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1`}>
          
          {/* State dropdown */}
          <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-xl px-3 h-[48px] hover:border-slate-350 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/50 transition-all">
            <span className="text-[9px] text-slate-400 font-bold leading-none mb-1 uppercase tracking-wider">State</span>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
            >
              <option value="All">All states</option>
              {nigeriaStates.map(state => (
                <option key={state.slug} value={state.name}>{state.name}</option>
              ))}
            </select>
          </div>

          {/* Dependent LGA dropdown */}
          <div className={`relative flex flex-col justify-center bg-white border border-slate-200 rounded-xl px-3 h-[48px] transition-all ${selectedState === "All" ? "opacity-50" : "hover:border-slate-350 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/50"}`}>
            <span className="text-[9px] text-slate-400 font-bold leading-none mb-1 uppercase tracking-wider">LGA</span>
            <select
              value={selectedLga}
              onChange={(e) => setSelectedLga(e.target.value)}
              disabled={selectedState === "All"}
              className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <option value="All">All LGAs</option>
              {availableLgas.map(lga => (
                <option key={lga.slug} value={lga.name}>{lga.name}</option>
              ))}
            </select>
          </div>

          {/* Pathway dropdown */}
          <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-xl px-3 h-[48px] hover:border-slate-350 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/50 transition-all">
            <span className="text-[9px] text-slate-400 font-bold leading-none mb-1 uppercase tracking-wider">Pathway</span>
            <select
              value={selectedPathway}
              onChange={(e) => setSelectedPathway(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
            >
              <option value="All">All pathways</option>
              <option value="Youth Employability Pathway">Employability</option>
              <option value="Work Readiness Foundation">Work Readiness</option>
            </select>
          </div>

          {/* Facilitator dropdown */}
          <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-xl px-3 h-[48px] hover:border-slate-350 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/50 transition-all">
            <span className="text-[9px] text-slate-400 font-bold leading-none mb-1 uppercase tracking-wider">Facilitator</span>
            <select
              value={selectedFacilitator}
              onChange={(e) => setSelectedFacilitator(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
            >
              <option value="All">All facilitators</option>
              <option value="Adewale Okoye">Adewale Okoye</option>
              <option value="Halima Sani">Halima Sani</option>
              <option value="Ibrahim Musa">Ibrahim Musa</option>
              <option value="Chidi Nze">Chidi Nze</option>
            </select>
          </div>

          {/* Status dropdown */}
          <div className="relative flex flex-col justify-center bg-white border border-slate-200 rounded-xl px-3 h-[48px] hover:border-slate-350 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50/50 transition-all">
            <span className="text-[9px] text-slate-400 font-bold leading-none mb-1 uppercase tracking-wider">Status</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-xs text-slate-900 font-bold focus:outline-hidden focus:ring-0 cursor-pointer"
            >
              <option value="All">All statuses</option>
              <option value="On track">On track</option>
              <option value="Needs follow-up">Needs follow-up</option>
              <option value="Review pending">Review pending</option>
              <option value="New cohort">New cohort</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

        </div>

      </div>

      {/* 4. Cohorts Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {filteredCohorts.length > 0 ? (
          filteredCohorts.map((cohort) => {
            const initials = cohort.facilitator.split(" ").map(n => n[0]).join("");
            return (
              <div 
                key={cohort.id} 
                className="bg-white border border-slate-200/70 rounded-[28px] p-5 md:p-6 shadow-3xs flex flex-col justify-between hover:border-emerald-200 hover:shadow-2xs hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 ease-out space-y-4 md:space-y-5"
              >
                {/* Card Top: Code, Name, Location & Status */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="space-y-1.5 text-left min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100/40 font-bold px-2 py-0.5 rounded-lg uppercase tracking-wide">
                        {cohort.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-semibold">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {cohort.location} State · {cohort.lga || "Central Hub"}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug truncate">
                      {cohort.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {cohort.pathway}
                    </p>
                  </div>

                  <div className="self-start sm:self-center shrink-0">
                    {getCohortStatusBadge(cohort.status || "On track")}
                  </div>
                </div>

                {/* Facilitator Block */}
                <div className="flex items-center gap-3 bg-slate-50/75 border border-slate-100 p-3 rounded-2xl text-left">
                  <div className="h-8.5 w-8.5 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center text-xs font-bold font-sans border border-emerald-100/40 shrink-0 uppercase">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 leading-tight truncate">{cohort.facilitator}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      Lead Facilitator
                    </p>
                  </div>
                </div>

                {/* Progress Bar & Rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Progress</p>
                    <span className="text-xs font-extrabold text-[#005C45]">{cohort.avgProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        cohort.status === "Needs follow-up" ? "bg-amber-500" : "bg-emerald-600"
                      }`} 
                      style={{ width: `${cohort.avgProgress}%` }} 
                    />
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center p-3.5 bg-slate-50/40 border border-slate-100 rounded-2xl">
                  <div>
                    <span className="block text-slate-950 font-sans font-bold text-sm md:text-base">{cohort.enrolled}</span>
                    <span className="text-[9px] md:text-[10px] text-slate-450 font-semibold">Enrolled</span>
                  </div>
                  <div className="border-l border-slate-100/60">
                    <span className="block text-slate-900 font-sans font-bold text-sm md:text-base">{cohort.activeLearners}</span>
                    <span className="text-[9px] md:text-[10px] text-slate-450 font-semibold">Active</span>
                  </div>
                  <div className="border-l border-slate-100/60">
                    <span className="block text-slate-900 font-sans font-bold text-sm md:text-base">{cohort.completedLearners}</span>
                    <span className="text-[9px] md:text-[10px] text-slate-450 font-semibold">CPD Ready</span>
                  </div>
                  <div className="border-l border-slate-100/60">
                    <span className="block text-teal-950 font-sans font-bold text-xs md:text-sm flex items-center justify-center gap-0.5">
                      {cohort.lowBandwidthUsers}
                      <WifiOff className="h-3 w-3 text-teal-650 shrink-0" />
                    </span>
                    <span className="text-[9px] md:text-[10px] text-slate-450 font-semibold">Offline access</span>
                  </div>
                </div>

                {/* Alerts / Operational highlights */}
                {getCohortAlert(cohort)}

                {/* Actions row */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 mt-auto flex-wrap sm:flex-nowrap">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(cohort)}
                      className="px-3 h-8.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-750 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                    >
                      <Edit className="h-3.5 w-3.5 text-slate-450" />
                      <span>Edit</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setAssigningCohort(cohort);
                        setAssignedFacilitatorName(cohort.facilitator);
                        setIsAssignModalOpen(true);
                      }}
                      className="px-3 h-8.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-750 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                    >
                      <User className="h-3.5 w-3.5 text-[#005C45]" />
                      <span>Assign Facilitator</span>
                    </button>

                    <button
                      onClick={() => {
                        setImportingCohort(cohort);
                        setIsImportModalOpen(true);
                      }}
                      className="px-3 h-8.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-750 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                    >
                      <PlusCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Add Learners</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setViewingCohort(cohort)}
                    className="px-3.5 h-8.5 bg-[#005C45]/5 hover:bg-[#005C45]/10 text-[#005C45] text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-[0.98] shrink-0"
                  >
                    <span>View cohort</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <p className="col-span-1 lg:col-span-2 py-16 text-center text-xs text-slate-400 font-medium bg-white rounded-[28px] border border-slate-200 shadow-3xs">
            No active cohorts match the selected filters.
          </p>
        )}
      </div>

      {/* 5. SIDE DRAWER / BOTTOM SHEET FOR COHORT DETAILS */}
      {viewingCohort && (() => {
        const cohort = viewingCohort;
        const offlinePct = cohort.enrolled > 0 ? Math.round((cohort.lowBandwidthUsers / cohort.enrolled) * 100) : 0;
        return (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[100] flex items-end lg:items-stretch lg:justify-end">
            <div className="absolute inset-0 bg-transparent" onClick={() => setViewingCohort(null)} />
            
            <div className="relative bg-slate-50 w-full lg:max-w-[500px] h-[94vh] lg:h-full rounded-t-[32px] lg:rounded-t-none lg:rounded-l-[32px] shadow-2xl border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right duration-300 text-left overflow-hidden z-10">
              {/* Drawer Header */}
              <div className="p-5 md:p-6 bg-white border-b border-slate-200/60 flex justify-between items-start shrink-0">
                <div className="space-y-1">
                  <span className="inline-flex items-center text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                    Cohort Profile
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-heading mt-1">{cohort.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{cohort.id}</span>
                    <span className="text-slate-300">•</span>
                    <span>{cohort.location} State</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button 
                    onClick={() => setViewingCohort(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer h-10 w-10 flex items-center justify-center border border-slate-100 shadow-3xs"
                    aria-label="Close cohort drawer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="mt-1">
                    {getCohortStatusBadge(cohort.status || "On track")}
                  </div>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
                
                {/* Cohort Overview block */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Cohort Overview</h4>
                  <div className="space-y-2.5 divide-y divide-slate-100/50 text-xs md:text-sm font-sans">
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-500 font-medium">Cohort Code</span>
                      <span className="text-slate-900 font-semibold">{cohort.id}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">Pathway</span>
                      <span className="text-slate-900 font-semibold">{cohort.pathway}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">State</span>
                      <span className="text-slate-900 font-semibold">{cohort.location} State</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5">
                      <span className="text-slate-500 font-medium">LGA</span>
                      <span className="text-slate-900 font-semibold">{cohort.lga || "Central Hub"}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery progress */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Delivery Progress</h4>
                  
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-xs md:text-sm font-sans">
                      <span className="text-slate-500 font-medium">Average progress</span>
                      <span className="text-[#005C45] font-semibold">{cohort.avgProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 rounded-full" 
                        style={{ width: `${cohort.avgProgress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Enrolled</span>
                      <span className="text-base font-black text-slate-900 block mt-1">{cohort.enrolled}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Active</span>
                      <span className="text-base font-black text-slate-900 block mt-1">{cohort.activeLearners}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">CPD ready</span>
                      <span className="text-base font-black text-emerald-800 block mt-1">{cohort.completedLearners}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Offline Mode</span>
                      <span className="text-base font-black text-teal-800 block mt-1">{offlinePct}% ({cohort.lowBandwidthUsers} users)</span>
                    </div>
                  </div>
                </div>

                {/* Lead facilitator */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Lead Facilitator</h4>
                    <button
                      onClick={() => {
                        setAssigningCohort(cohort);
                        setAssignedFacilitatorName(cohort.facilitator);
                        setIsAssignModalOpen(true);
                      }}
                      className="text-xs font-bold text-[#005C45] hover:underline cursor-pointer"
                    >
                      Assign facilitator
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="h-9 w-9 rounded-full bg-emerald-50 text-[#005C45] flex items-center justify-center text-xs font-extrabold uppercase border border-emerald-100/40 shrink-0">
                      {cohort.facilitator.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-bold text-slate-900 leading-none">{cohort.facilitator}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">
                        Assigned Lead Facilitator
                      </p>
                    </div>
                  </div>
                </div>

                {/* Learners needing action */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-4.5 shadow-xs space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">Action Highlights</h4>
                  
                  <div className="space-y-2.5">
                    <div className="p-3 bg-amber-50/70 border border-amber-100/50 rounded-xl flex items-start gap-2.5 text-xs">
                      <Inbox className="h-4 w-4 text-amber-650 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-950">CPD Reviews Pending</p>
                        <p className="text-amber-800 font-medium mt-0.5">{cohort.reviewsPending} learners awaiting CPD review portfolio evaluation.</p>
                      </div>
                    </div>

                    <div className="p-3 bg-rose-50/70 border border-rose-100/50 rounded-xl flex items-start gap-2.5 text-xs">
                      <AlertCircle className="h-4 w-4 text-rose-650 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-rose-950">Inactive monitoring</p>
                        <p className="text-rose-800 font-medium mt-0.5">4 learners need progress follow-up as they are behind schedule.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Drawer actions */}
              <div className="p-4 md:p-5 bg-white border-t border-slate-200/60 flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEditModal(cohort)}
                  className="flex-1 h-11 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Edit className="h-4 w-4 text-slate-500" />
                  <span>Edit Cohort</span>
                </button>
                
                <button
                  onClick={() => {
                    setImportingCohort(cohort);
                    setImportFile(null);
                    setImportProgress(0);
                    setImportSuccess(false);
                    setIsImportModalOpen(true);
                  }}
                  className="flex-1 h-11 bg-white border border-slate-200 hover:border-slate-350 text-[#005C45] text-xs font-bold rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <PlusCircle className="h-4 w-4 text-[#005C45]/80" />
                  <span>Import Learners</span>
                </button>

                <button
                  onClick={() => {
                    setExportingCohort(cohort);
                    setExportSuccess(false);
                    setExportProgress(0);
                    setIsExportModalOpen(true);
                  }}
                  className="flex-1 h-11 bg-white border border-slate-200 hover:border-slate-350 text-slate-700 text-xs font-bold rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4 text-slate-400" />
                  <span>Export Report</span>
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ==================================================== */}
      {/* MODALS SECTION: ALL HIGHER FIDELITY INTERACTIVE FLOWS */}
      {/* ==================================================== */}

      {/* A. CREATE COHORT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-250/50 flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight font-heading">Create Cohort</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateCohortSubmit} className="p-6 space-y-4 flex-1">
              {/* Cohort Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">Cohort Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lagos Work Readiness 02"
                  value={newCohortName}
                  onChange={(e) => setNewCohortName(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                />
              </div>

              {/* Pathway Option */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">Course Pathway</label>
                <select
                  value={newCohortPathway}
                  onChange={(e) => setNewCohortPathway(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Youth Employability Pathway">Youth Employability Pathway</option>
                  <option value="Work Readiness Foundation">Work Readiness Foundation</option>
                </select>
                <p className="text-[10px] text-slate-450 leading-normal pt-1">
                  Assigns an existing course pathway curriculum to the delivery group. Content edits must be performed in the Course Creator portal.
                </p>
              </div>

              {/* State & Dependent LGA */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">State</label>
                  <select
                    value={newCohortState}
                    onChange={(e) => setNewCohortState(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                  >
                    {nigeriaStates.map(state => (
                      <option key={state.slug} value={state.name}>{state.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">LGA</label>
                  <select
                    value={newCohortLga}
                    onChange={(e) => setNewCohortLga(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                  >
                    {creationLgas.map(lga => (
                      <option key={lga.slug} value={lga.name}>{lga.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lead Facilitator */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">Lead Facilitator</label>
                <select
                  value={newCohortFacilitator}
                  onChange={(e) => setNewCohortFacilitator(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Adewale Okoye">Adewale Okoye</option>
                  <option value="Halima Sani">Halima Sani</option>
                  <option value="Ibrahim Musa">Ibrahim Musa</option>
                  <option value="Chidi Nze">Chidi Nze</option>
                </select>
              </div>

              {/* Start Date & Expected Target */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">Start Date</label>
                  <input
                    type="date"
                    value={newCohortStartDate}
                    onChange={(e) => setNewCohortStartDate(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">Expected Learner Target</label>
                  <input
                    type="number"
                    min="1"
                    value={newCohortTarget}
                    onChange={(e) => setNewCohortTarget(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Low Bandwidth Support Enabled */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="newCohortLowBandwidth"
                  checked={newCohortLowBandwidth}
                  onChange={(e) => setNewCohortLowBandwidth(e.target.checked)}
                  className="rounded border-slate-300 text-[#005C45] focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="newCohortLowBandwidth" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  Enable Low-bandwidth Support for this cohort
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4.5 h-11 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-2xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-11 bg-[#005C45] hover:bg-[#004B38] text-white text-xs font-bold rounded-2xl cursor-pointer shadow-3xs"
                >
                  Create Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* B. EDIT COHORT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-250/50 flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight font-heading">Edit Cohort</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditCohortSubmit} className="p-6 space-y-4 flex-1">
              {/* Cohort Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">Cohort Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lagos Work Readiness 01"
                  value={editCohortName}
                  onChange={(e) => setEditCohortName(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                />
              </div>

              {/* Pathway Option */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">Course Pathway</label>
                <select
                  value={editCohortPathway}
                  onChange={(e) => setEditCohortPathway(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Youth Employability Pathway">Youth Employability Pathway</option>
                  <option value="Work Readiness Foundation">Work Readiness Foundation</option>
                </select>
              </div>

              {/* State & Dependent LGA */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">State</label>
                  <select
                    value={editCohortState}
                    onChange={(e) => setEditCohortState(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                  >
                    {nigeriaStates.map(state => (
                      <option key={state.slug} value={state.name}>{state.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">LGA</label>
                  <select
                    value={editCohortLga}
                    onChange={(e) => setEditCohortLga(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                  >
                    {editLgas.map(lga => (
                      <option key={lga.slug} value={lga.name}>{lga.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lead Facilitator */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-550 block">Lead Facilitator</label>
                <select
                  value={editCohortFacilitator}
                  onChange={(e) => setEditCohortFacilitator(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Adewale Okoye">Adewale Okoye</option>
                  <option value="Halima Sani">Halima Sani</option>
                  <option value="Ibrahim Musa">Ibrahim Musa</option>
                  <option value="Chidi Nze">Chidi Nze</option>
                </select>
              </div>

              {/* Progress and status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={editCohortProgress}
                    onChange={(e) => setEditCohortProgress(Number(e.target.value))}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">Status</label>
                  <select
                    value={editCohortStatus}
                    onChange={(e) => setEditCohortStatus(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="On track">On track</option>
                    <option value="Needs follow-up">Needs follow-up</option>
                    <option value="Review pending">Review pending</option>
                    <option value="New cohort">New cohort</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4.5 h-11 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-2xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-11 bg-[#005C45] hover:bg-[#004B38] text-white text-xs font-bold rounded-2xl cursor-pointer shadow-3xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* C. ASSIGN FACILITATOR MODAL */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-250/50 flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight font-heading">Assign Facilitator</h3>
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAssignFacilitatorSubmit} className="p-6 space-y-4 flex-1">
              <p className="text-xs text-slate-500 leading-normal">
                {assigningCohort 
                  ? `Select a certified regional facilitator to take lead of ${assigningCohort.name} operations.`
                  : "Select a regional delivery facilitator and assign them to active programme cohorts."
                }
              </p>

              {/* Cohort selector (if none assigned) */}
              {!assigningCohort && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">Target Cohort</label>
                  <select
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-850 font-semibold focus:outline-hidden"
                    onChange={(e) => {
                      const found = cohorts.find(c => c.id === e.target.value);
                      if (found) setAssigningCohort(found);
                    }}
                  >
                    <option value="">Select an active cohort...</option>
                    {cohorts.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Facilitator list */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-550 block">Available Lead Facilitators</label>
                
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {[
                    { name: "Adewale Okoye", location: "Lagos Hub", bio: "Certified Work Readiness Lead, 5 yrs experience" },
                    { name: "Halima Sani", location: "Kano Hub", bio: "Youth Employability Specialist, 4 yrs experience" },
                    { name: "Ibrahim Musa", location: "Kaduna Hub", bio: "Tech & Professional Skills Coach, 6 yrs experience" },
                    { name: "Chidi Nze", location: "Enugu Hub", bio: "Curriculum Delivery Coordinator, 3 yrs experience" }
                  ].map((fac) => (
                    <label 
                      key={fac.name}
                      onClick={() => setAssignedFacilitatorName(fac.name)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        assignedFacilitatorName === fac.name
                          ? "bg-emerald-50/60 border-emerald-300 text-slate-900"
                          : "bg-slate-50 hover:bg-slate-50/80 border-slate-200 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="facilitatorRadio"
                        checked={assignedFacilitatorName === fac.name}
                        onChange={() => setAssignedFacilitatorName(fac.name)}
                        className="mt-1 h-4 w-4 text-[#005C45] focus:ring-[#005C45]"
                      />
                      <div>
                        <p className="text-xs font-bold leading-tight">{fac.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{fac.location} · {fac.bio}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4.5 h-11 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-2xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!assigningCohort && !cohorts[0]}
                  className="px-5 h-11 bg-[#005C45] hover:bg-[#004B38] text-white text-xs font-bold rounded-2xl cursor-pointer shadow-3xs disabled:opacity-50 disabled:pointer-events-none"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* D. IMPORT LEARNERS MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-250/50 flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight font-heading">Import Learners</h3>
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-left">
              <p className="text-xs text-slate-500 leading-normal">
                Choose or drag-and-drop a CSV or XLSX spreadsheet containing learner roster data to enrol them into <span className="font-bold text-slate-800">{importingCohort?.name || "the cohort"}</span>.
              </p>

              {/* Upload area */}
              <div className="border-2 border-dashed border-slate-200 hover:border-[#005C45] transition-all rounded-2xl p-6 text-center cursor-pointer relative bg-slate-50">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleImportFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                <div className="space-y-2">
                  <PlusCircle className="h-8 w-8 mx-auto text-slate-400" />
                  <div className="text-xs font-bold text-slate-700">Click to upload spreadsheet</div>
                  <div className="text-[10px] text-slate-450">Supports CSV, XLSX, XLS up to 10MB</div>
                </div>
              </div>

              {/* Progress and status */}
              {importFile && (
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800 truncate max-w-[200px]">{importFile.name}</span>
                    <span className="text-slate-550 font-medium">{(importFile.size / 1024).toFixed(1)} KB</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full transition-all duration-150" style={{ width: `${importProgress}%` }} />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {importProgress < 100 ? "Processing records..." : "Import completed!"}
                    </span>
                    <span className="text-xs font-bold text-[#005C45]">{importProgress}%</span>
                  </div>
                </div>
              )}

              {/* Success state info */}
              {importSuccess && (
                <div className="p-3 bg-emerald-50/60 border border-emerald-100/50 rounded-xl flex items-start gap-2 text-xs">
                  <Check className="h-4 w-4 text-emerald-650 mt-0.5 shrink-0" />
                  <div className="text-emerald-950 font-medium">
                    <span className="font-bold">Success!</span> Enrolled <span className="font-bold text-emerald-900">45 new learners</span> into {importingCohort?.name}. Active student limits and offline packages have synced automatically.
                  </div>
                </div>
              )}

              {/* Close footer */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-6 h-11 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-2xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E. EXPORT REPORT MODAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-250/50 flex flex-col overflow-hidden text-left animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight font-heading">Export Delivery Report</h3>
              <button 
                onClick={() => setIsExportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-left">
              <p className="text-xs text-slate-500 leading-normal">
                Generate and download the delivery performance report for <span className="font-bold text-slate-800">{exportingCohort?.name || "all active implementation cohorts"}</span>.
              </p>

              {/* Select Format */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-550 block">Download Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {["xlsx", "csv", "pdf"].map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => {
                        setExportFormat(format);
                        setExportSuccess(false);
                        setExportProgress(0);
                      }}
                      className={`h-11 border text-xs font-bold rounded-xl transition-all cursor-pointer ${
                        exportFormat === format
                          ? "bg-emerald-50 text-[#005C45] border-emerald-300"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger Export Button */}
              {exportProgress === 0 && !exportSuccess && (
                <button
                  type="button"
                  onClick={handleTriggerExport}
                  className="w-full h-11 bg-[#005C45] hover:bg-[#004B38] text-white text-xs font-bold rounded-2xl cursor-pointer flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Generate Export Package</span>
                </button>
              )}

              {/* Progress and status */}
              {exportProgress > 0 && (
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">Generating Document...</span>
                    <span className="text-xs font-bold text-[#005C45]">{exportProgress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full transition-all duration-150" style={{ width: `${exportProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Success information */}
              {exportSuccess && (
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-100/50 rounded-xl flex items-start gap-2.5 text-xs">
                  <Check className="h-4 w-4 text-emerald-650 mt-0.5 shrink-0" />
                  <div className="text-emerald-950 font-medium">
                    <span className="font-bold">Export complete!</span> Your download package for {exportingCohort ? exportingCohort.id : "Sustain Cohorts"} has been compiled and is ready. The download should initiate immediately.
                  </div>
                </div>
              )}

              {/* Actions footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(false)}
                  className="px-5 h-11 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-2xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Assign Learners Modal (3-step interactive flow) */}
      {isBulkAssignOpen && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs z-[110] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] border border-slate-200/80 shadow-2xl max-w-lg w-full p-6 text-left space-y-5 animate-in zoom-in-95 duration-200 my-8">
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-100/60 font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider">
                  Bulk Operations
                </span>
                <h3 className="text-base font-bold text-slate-950">Bulk Assign Learners</h3>
              </div>
              <button 
                onClick={() => {
                  setIsBulkAssignOpen(false);
                  setBulkAssignStep(1);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer border border-slate-100"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Stepper Indicators */}
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
              {[
                { label: "Destination", active: bulkAssignStep >= 1 },
                { label: "Facilitator", active: bulkAssignStep >= 2 },
                { label: "Confirm", active: bulkAssignStep >= 3 }
              ].map((step, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${step.active ? "bg-[#005C45]" : "bg-slate-100"}`} />
                  <span className={step.active ? "text-[#005C45]" : "text-slate-400"}>{step.label}</span>
                </div>
              ))}
            </div>

            {/* STEP 1: Destination Setup */}
            {bulkAssignStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Select the target delivery pathway, geography, and cohort for batch learner assignment.
                </p>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target Pathway</label>
                    <select 
                      value={bulkAssignPathway}
                      onChange={(e) => setBulkAssignPathway(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Youth Employability Pathway">Youth Employability Pathway</option>
                      <option value="Advanced Digital Tech Pathway">Advanced Digital Tech Pathway</option>
                      <option value="Green Economy & Agritech">Green Economy & Agritech</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target State</label>
                      <select 
                        value={bulkAssignState}
                        onChange={(e) => setBulkAssignState(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                      >
                        {nigeriaStates.map((st) => (
                          <option key={st.slug} value={st.name}>{st.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target LGA</label>
                      <select 
                        value={bulkAssignLga}
                        onChange={(e) => setBulkAssignLga(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                      >
                        {getLGAsByState(bulkAssignState).map((lg) => (
                          <option key={lg.slug} value={lg.name}>{lg.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Target Cohort</label>
                    <select 
                      value={bulkAssignCohort}
                      onChange={(e) => setBulkAssignCohort(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Lagos Work Readiness 01">Lagos Work Readiness 01 (Lagos · Ikeja)</option>
                      <option value="Kano Youth Employability 02">Kano Youth Employability 02 (Kano · Kano Municipal)</option>
                      <option value="Kaduna Agritech Pilot">Kaduna Agritech Pilot (Kaduna · Kaduna North)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => setBulkAssignStep(2)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Facilitator</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Facilitator Selection */}
            {bulkAssignStep === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Assign a lead facilitator to handle regional CPD activities and localized low-bandwidth support for this batch.
                </p>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Lead Facilitator</label>
                    <select 
                      value={bulkAssignFacilitator}
                      onChange={(e) => setBulkAssignFacilitator(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-850 font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Adewale Okoye">Adewale Okoye (Lagos Central Hub · Active)</option>
                      <option value="Aminu Yusuf">Aminu Yusuf (Kano Municipal · Active)</option>
                      <option value="Chinedu Obi">Chinedu Obi (Enugu North · Active)</option>
                    </select>
                  </div>

                  <div className="p-3.5 bg-blue-50/45 border border-blue-100 rounded-2xl text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-blue-700 font-bold">
                      <User className="h-4 w-4 shrink-0" />
                      <span>Facilitator Load Review</span>
                    </div>
                    <p className="text-slate-650 font-medium leading-relaxed">
                      {bulkAssignFacilitator} currently monitors 32 active portfolios. Handing over these records will add safe localized work tracking.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => setBulkAssignStep(1)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setBulkAssignStep(3)}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Review & Confirm</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Review and Confirm */}
            {bulkAssignStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-2xl space-y-3 text-xs text-slate-700">
                  <div className="flex justify-between items-center pb-2 border-b border-emerald-100/30">
                    <span className="font-medium">Pathway</span>
                    <span className="text-[#005C45] font-extrabold">{bulkAssignPathway}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Target State & LGA</span>
                    <span className="text-slate-900 font-bold">{bulkAssignState} · {bulkAssignLga}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cohort assignment</span>
                    <span className="text-slate-900 font-bold">{bulkAssignCohort}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Assigned Lead Facilitator</span>
                    <span className="text-slate-900 font-bold">{bulkAssignFacilitator}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium leading-normal">
                  By confirming, batch learner matching rules will transition records to "{bulkAssignCohort}". If any of these learners have pre-existing courses, progress portfolios are preserved.
                </p>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => setBulkAssignStep(2)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      setIsBulkAssignOpen(false);
                      showToast(`Bulk assignment of learners to ${bulkAssignCohort} completed successfully!`);
                    }}
                    className="px-5 py-2.5 bg-[#005C45] hover:bg-[#004A37] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Confirm Assignment</span>
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProgrammeCohorts;
