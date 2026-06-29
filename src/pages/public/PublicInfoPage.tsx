import { useState } from "react";
import { useRoute } from "../../context/RouteContext";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { 
  GraduationCap, 
  HelpCircle, 
  Mail, 
  ShieldAlert, 
  FileText, 
  Accessibility as AccessIcon, 
  ArrowRight,
  BookOpen,
  Users,
  Lock,
  Compass,
  FileCheck2,
  LifeBuoy,
  Search
} from "lucide-react";

export function PublicInfoPage() {
  const { currentPath, navigateTo } = useRoute();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  
  // Contact Form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("general");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Help Search state
  const [helpSearch, setHelpSearch] = useState("");

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      showToast("Please fill in all required fields.", "info");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      showToast("Action saved in this frontend prototype.", "success");
      setContactName("");
      setContactEmail("");
      setContactSubject("general");
      setContactMessage("");
      setIsSubmitting(false);
    }, 800);
  };

  // Helper to choose content based on path
  const getPageData = () => {
    switch (currentPath) {
      case "/about":
        return {
          title: "About SUSTAIN LMS",
          description: "SUSTAIN LMS is a programme-supported learning platform designed to help learners and implementation teams manage structured CPD learning, assessment readiness, resources, support, and progress tracking.",
          icon: <GraduationCap className="h-8 w-8 text-emerald-800" />,
          content: (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 hover:shadow-md transition-all duration-200 border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-sans flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    What the platform supports
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed around professional learning tracks, SUSTAIN LMS integrates courses, micro-lessons, and draft-enabled assignments. It lets learners study efficiently and submit work directly to facilitators within structured pathways.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-md transition-all duration-200 border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-sans flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Who uses it
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The platform coordinates multiple key roles: learners tracking their pathways, facilitators reviewing student drafts, schools managing resources, and programme implementation teams monitoring overall progress and impact reports.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-md transition-all duration-200 border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-sans flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Learner-first design
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We focus on simplicity and accessibility. Interfaces are clean, distraction-free, and highly readable. Features like our low-bandwidth alternate reading version and offline-ready downloads ensure that learners with limited connectivity can thrive.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-md transition-all duration-200 border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-sans flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Programme coordination
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    SUSTAIN LMS provides programme sponsors and regional NGOs with robust visibility into cohort milestones, support ticket response rates, and certificate readiness pipelines without adding administrative noise.
                  </p>
                </Card>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-4">
                <h4 className="font-bold text-emerald-950 font-sans text-sm">Experience the Learner Workspace</h4>
                <p className="text-xs text-emerald-800 max-w-xl mx-auto leading-relaxed">
                  Interested in seeing how learners manage their courses, view facilitator comments, and review their CPD progress? Access our live, sandbox-ready learner workspace.
                </p>
                <Button 
                  onClick={() => navigateTo("/learner")} 
                  className="bg-emerald-900 text-white hover:bg-emerald-800 transition-colors inline-flex items-center gap-2 text-xs"
                >
                  Explore Learner Demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )
        };

      case "/contact":
        return {
          title: "Contact",
          description: "Use this page to find support pathways for SUSTAIN LMS access, learning support, programme coordination, and general enquiries.",
          icon: <Mail className="h-8 w-8 text-emerald-800" />,
          content: (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left column: Support pathways info */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight font-sans">Support Pathways</h2>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Sponsors, facilitators, and partners have assigned communication channels for smooth coordination.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5 border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Learner Support</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        For questions regarding your assigned pathway, lesson content, assessment status, or technical access issues.
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 font-mono">Contact details provided by your programme team.</span>
                    </Card>

                    <Card className="p-5 border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Programme Support</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        For cohort sponsors, facilitator access requests, progress report scheduling, and overall implementation timelines.
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 font-mono">Contact details provided by your programme team.</span>
                    </Card>

                    <Card className="p-5 border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Technical Support</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        To report system bugs, interface issues, accessibility blockages, or page rendering problems.
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 font-mono">Contact details provided by your programme team.</span>
                    </Card>

                    <Card className="p-5 border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Implementation Support</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        For training hubs, schools, regional coordinators, and partner NGOs seeking toolkits or training sessions.
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 font-mono">Contact details provided by your programme team.</span>
                    </Card>
                  </div>
                </div>

                {/* Right column: Interactive contact form */}
                <div className="lg:col-span-5">
                  <Card className="p-6 border-slate-200 bg-white">
                    <div className="space-y-1.5 mb-5 text-left">
                      <h3 className="text-sm font-bold text-slate-900 font-sans">Send an Enquiry</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        If you are a regional coordinator, NGO representative, or sponsor, use this form to reach our implementation support office.
                      </p>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Aisha Mohammed"
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-700 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="yourname@domain.org"
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-700 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Support Category *</label>
                        <select
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-700 transition-colors cursor-pointer"
                        >
                          <option value="general">General Enquiry</option>
                          <option value="pathway">Learner Pathway Assistance</option>
                          <option value="programme">Programme Coordination & Reporting</option>
                          <option value="technical">Technical Access & Bug Reports</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Message *</label>
                        <textarea
                          required
                          rows={4}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Describe your enquiry in detail..."
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-700 transition-colors resize-none"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-xs justify-center cursor-pointer shadow-xs"
                      >
                        {isSubmitting ? "Sending..." : "Submit Enquiry"}
                      </Button>
                    </form>
                  </Card>
                </div>

              </div>

              {/* Help Centre CTA strip */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="font-bold text-slate-900 font-sans text-sm">Need guided answers immediately?</h4>
                  <p className="text-xs text-slate-500 max-w-md">
                    Check out our structured Help Centre articles covering accounts, submissions, downloads, and certificates.
                  </p>
                </div>
                <Button 
                  onClick={() => navigateTo("/help")} 
                  variant="outline"
                  className="whitespace-nowrap text-xs text-slate-800 hover:bg-slate-100"
                >
                  Go to Help Centre
                </Button>
              </div>
            </div>
          )
        };

      case "/privacy":
        return {
          title: "Privacy Notice",
          description: "This Privacy Notice outlines how data is referenced and simulated. Note that this is a frontend prototype and does not process real learner records.",
          icon: <ShieldAlert className="h-8 w-8 text-emerald-800" />,
          content: (
            <div className="space-y-6 max-w-4xl">
              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Mock Data in Prototype</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All user identities, learner IDs (e.g., Aisha Mohammed, SUST-LRN-0442), facilitator names, and cohort designations are entirely simulated for demonstrating the platform. No real personal identifiers, tracking cookies, or payment mechanisms are stored or processed.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Learner Information</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In a production environment, SUSTAIN LMS processes student registration lists supplied directly by the sponsoring hub or school. This includes learner names, assigned paths, and cohort details to construct personalized educational roadmaps.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Support Requests & Workspace Activity</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Activity log data, local state assessments, and support requests are stored solely in your local browser storage (`localStorage`) as you navigate this prototype. Clearing your browser cache will reset these simulated interactions.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Programme Reporting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sponsors and implementation partners have restricted, read-only dashboard access to aggregated progress metrics. Individual student reflections, draft feedback histories, and support tickets are protected to maintain learner privacy.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact for Privacy Questions</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For administrative enquiries about this demonstration application, please consult with the development team. Contact details for programme-specific privacy coordinators will be distributed directly to each training centre.
                </p>
              </Card>
            </div>
          )
        };

      case "/terms":
        return {
          title: "Terms of Use",
          description: "These terms of use explain acceptable behaviour and parameters for accessing the SUSTAIN LMS frontend prototype for demonstration purposes.",
          icon: <FileText className="h-8 w-8 text-emerald-800" />,
          content: (
            <div className="space-y-6 max-w-4xl">
              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Acceptable Use</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  SUSTAIN LMS is provided as a professional educational sandbox. You agree to use the workspace to review product layouts, route flows, and feature templates. You may not upload offensive content, reverse-engineer proprietary packages, or abuse mock support interfaces.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Learner Responsibilities</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Learners are responsible for reviewing their progress and submitting assignment drafts accurately. While this environment is a simulation, production systems expect learners to complete their own work in accordance with training centre standards.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Assessment & Support Content</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Practice answers, forum messages, and support tickets submitted on the platform are purely educational. No legal or professional liability is assumed for advice exchanged in these simulated workspaces.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Prototype Limitations</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This system is a frontend prototype. Actions like submitting an assignment, initiating a support request, or marking a lesson as complete update local state and trigger simulated notifications but do not write to permanent backend databases.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Programme Guidance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Individual rules regarding program eligibility, grading criteria, and official CPD credit requirements are governed by respective cohort hubs. SUSTAIN LMS simply mirrors these policies for digital execution.
                </p>
              </Card>
            </div>
          )
        };

      case "/accessibility":
        return {
          title: "Accessibility",
          description: "SUSTAIN LMS aims to provide highly readable, mobile-friendly, keyboard-accessible interfaces and low-bandwidth learning options.",
          icon: <AccessIcon className="h-8 w-8 text-emerald-800" />,
          content: (
            <div className="space-y-6 max-w-4xl">
              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Keyboard Navigation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All critical elements—including headers, form fields, and pathway buttons—support standard keyboard navigation. Users can utilize `Tab` and `Shift+Tab` to move focus sequentially across the active workspace.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Focus States</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive buttons, input bars, and navigational cards are styled with high-contrast emerald focus outlines (`focus-visible:ring-2 focus-visible:ring-emerald-700`) to guarantee visibility during keyboard-only operations.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Readable Content</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We use highly legible system font families (such as Inter) and strictly enforce color contrast guidelines across our slate background and text hierarchy. We avoid unreadable pale green or mint-heavy text combinations.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Mobile Support</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every page automatically scales for smartphones and tablets. Tap targets are given extra padding (minimum 44px) to ensure touch events are responsive and prevent misclicks during on-the-go training.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Low-Bandwidth Materials</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To assist learners in remote areas, our resources module offers a simplified, clean reading version that strips heavy images and media, loading exclusively as high-legibility, lightweight text formats.
                </p>
              </Card>

              <Card className="p-6 space-y-4 border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Support for Access Issues</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you experience an accessibility blockage or have ideas to improve our screen-reader compatibility, please submit a support note. Our core team audits these recommendations regularly.
                </p>
              </Card>
            </div>
          )
        };

      case "/help":
      default: {
        const helpArticles = [
          {
            icon: <Lock className="h-5 w-5" />,
            title: "Sign in and account access",
            text: "Access is restricted to authorized invitees. Enter your registered email and password on the login page. If your program team has not yet invited you, contact your coordinator."
          },
          {
            icon: <BookOpen className="h-5 w-5" />,
            title: "Courses and lessons",
            text: "Navigate to \"My Courses\" in your workspace. You can explore lessons sequentially, complete text segments, jot down practice reflections, and mark milestones complete."
          },
          {
            icon: <FileCheck2 className="h-5 w-5" />,
            title: "Assessments and feedback",
            text: "Submit assignments directly under the Assessments tab. You can save rough drafts to prevent losing your work, then perform a final submission. Facilitator comments are logged under the assignment history."
          },
          {
            icon: <Compass className="h-5 w-5" />,
            title: "CPD and certificates",
            text: "Certificates require full curriculum completion and a \"graded\" assignment status. When ready, click \"View Certificate Track\" to check eligibility and request a review."
          },
          {
            icon: <LifeBuoy className="h-5 w-5" />,
            title: "Resources and downloads",
            text: "Access PDFs, guides, and worksheets in the Resources section. You can download items offline or toggle the low-bandwidth mode to save data during reading sessions."
          },
          {
            icon: <Users className="h-5 w-5" />,
            title: "Community and support",
            text: "Contribute safely to lesson discussion boards. If you run into technical, billing, or pathway issues, use the Support panel to open a simulated help thread."
          }
        ];

        const filteredArticles = helpArticles.filter(art => 
          art.title.toLowerCase().includes(helpSearch.toLowerCase()) || 
          art.text.toLowerCase().includes(helpSearch.toLowerCase())
        );

        return {
          title: "Help Centre",
          description: "Find clear guidance for signing in, accessing learning materials, continuing assessments, using support, and understanding certificate readiness.",
          icon: <HelpCircle className="h-8 w-8 text-emerald-800" />,
          content: (
            <div className="space-y-8 text-left">
              
              {/* Filter Search Input */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={helpSearch}
                  onChange={(e) => setHelpSearch(e.target.value)}
                  placeholder="Search articles (e.g. login, certificate, assignment)..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-700/10 transition-all font-medium"
                />
              </div>

              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((art, idx) => (
                    <Card key={idx} className="p-6 border-slate-200 hover:shadow-md transition-all duration-200 bg-white">
                      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-900 w-fit mb-4">
                        {art.icon}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-2">{art.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{art.text}</p>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-dashed border-slate-200 bg-white/50">
                  <HelpCircle className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-xs font-semibold text-slate-700">No matches found for "{helpSearch}"</p>
                  <p className="text-[11px] text-slate-400 mt-1">Try searching another topic, or check your spelling.</p>
                </Card>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4 max-w-xl mx-auto">
                <h4 className="font-bold text-slate-900 font-sans text-sm">Still have questions?</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our team is here to help with your assigned pathway, credential reviews, or technical issues.
                </p>
                <div className="flex justify-center gap-3">
                  <Button 
                    onClick={() => navigateTo("/contact")} 
                    variant="outline"
                    className="text-xs text-slate-800 hover:bg-slate-100 cursor-pointer"
                  >
                    Contact Support
                  </Button>
                  <Button 
                    onClick={() => navigateTo("/login")} 
                    className="bg-emerald-900 text-white hover:bg-emerald-800 text-xs cursor-pointer shadow-xs"
                  >
                    Sign in to Account
                  </Button>
                </div>
              </div>
            </div>
          )
        };
      }
    }
  };

  const page = getPageData();

  return (
    <div id="public-info-page" className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6 justify-between text-left">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl shrink-0">
              {page.icon}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight">
              {page.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {page.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="min-h-[300px]">
        {page.content}
      </section>

      {/* Global Toast for Interactive Simulations */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-950 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className={`h-2 w-2 rounded-full ${toast.type === "success" ? "bg-emerald-400" : "bg-blue-400"} shrink-0`} />
          <span className="flex-1 leading-normal text-left">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
