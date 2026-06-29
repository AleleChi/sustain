# SUSTAIN LMS Design System & UI Standards

This document establishes the official design system, brand language, layout, accessibility, and architectural principles for SUSTAIN LMS. All future modifications, features, and refactorings must adhere strictly to these guidelines.

---

## 1. Product Identity
SUSTAIN LMS is a structured, credible, and premium learning management system optimized for high-impact educational delivery, youth employability pathways, and work-ready foundation training. 

*   **What it is:** A secure, robust, and beautiful pathway tracker that ties courses, micro-lessons, facilitator reviews, live sessions, offline support, CPD credits, and certificate verification into a unified stream.
*   **The Aesthetic:** High-contrast, clean, and professional. It must look like a highly polished, human-crafted educational tool.
*   **What it must NEVER feel like:** 
    *   An AI-generated system, internal sandbox, or tech prototype.
    *   A generic corporate SaaS dashboard.
    *   A childish or overly gamified interface.

---

## 2. Brand Personality
SUSTAIN LMS behaves like a trusted, encouraging, and clear learning companion.

*   **Tone of Voice:** Calm, direct, human-centric, reliable, and confidence-inspiring.
*   **Language Focus:** Focus entirely on realistic learning outcomes, professional development milestones, and physical or regional readiness.
*   **Avoid:** Tech jargon, platform-hype, buzzwords, flashy gamification metaphors, and empty marketing assertions (e.g., "unlock your hidden potential with our seamless paradigm").

---

## 3. Brand Colour System
Use the following colour palette for consistency and brand expression. Avoid neon, overly saturated, or random colours.

| Palette Category | Colour Name | Hex / Tailwind Equivalent | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | Deep Emerald | `#003B2C` to `#005C45` / `emerald-900`, `emerald-950` | Primary CTA, major action buttons, main headers, trust frames. |
| **Secondary Accent** | Mint / Soft Emerald | `emerald-50`, `emerald-100`, `emerald-600` | Completed items, active status tags, accent lines, success alerts. |
| **Warning / Milestone** | Warm Amber / Gold | `amber-50`, `amber-100`, `amber-600` | Certificate review status, pending items, timer warnings, minor alerts. |
| **Offline / Reliability**| Deep Teal | `teal-700`, `teal-800`, `teal-900` | Low-bandwidth mode flags, offline pack sync, local download indicators. |
| **Guidance / Support** | Soft Sky / Blue Slate| `sky-50`, `sky-100`, `slate-100`, `slate-200`| Informational cards, verification statuses, public lookup guides. |
| **Neutrals** | Pale Slate / Warm White| `slate-50`, `slate-100`, `slate-600`, `slate-950` | Backgrounds, grid borders, card surfaces, readable dark charcoal body text. |

*   **Forbidden Palette Patterns:**
    *   No neon purple, magenta, or harsh violet.
    *   No raw black borders (`border-black` or solid `#000000` borders).
    *   No high-opacity red, except for extremely critical timer expirations or destructive actions.

---

## 4. Typography System
SUSTAIN LMS relies on a highly legible, premium typography pair.

*   **Display / Headings Font:** **Plus Jakarta Sans** (sans-serif, tracking-tight, heavy weights reserved for display card headers).
*   **Body & UI Text Font:** **Inter** (sans-serif, robust legibility at small sizes).
*   **Rules for Typography:**
    *   **No font-black:** Avoid ultra-heavy weights like `font-black` except on extremely tiny uppercase tags where contrast requires it. Stick to `font-semibold` or `font-bold` for primary headers.
    *   **No excessive uppercase:** Uppercase is permitted ONLY on short tags or metadata labels (e.g., `CPD CREDITS`), using letter-spacing/tracking-wider. Never use full uppercase for body text, card descriptions, or buttons.
    *   **Subtle Metadata:** Secondary text and metadata should use `text-slate-500` or `text-slate-600` with clean margins, avoiding muddy combinations or unreadable thin fonts.
    *   **Monospace Limit:** Monospace typography (`font-mono`) is reserved strictly for verification IDs (e.g., `SUST-CERT-2026-0148`), timestamps, and numerical progress tracks (e.g., `22 / 35 Credits`). Do not use monospace for general status labels or headings.

---

## 5. Layout Principles
All views must exhibit precise visual geometry, intentional negative space, and aligned grids.

*   **Desktop Layout:**
    *   Maintain a clear visual layout: balanced sidebars or top-bar navigation elements.
    *   Use an aligned vertical grid with standardized margins (e.g., `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
    *   Do not let text stretch infinitely across wide displays; use column widths that preserve readable line lengths.
*   **Mobile App Layout:**
    *   Do not stack desktop widgets vertically. Instead, adapt screens to resemble a native smartphone application.
    *   Provide clear page-top contexts, bottom navigation components where relevant, or floating actions that remain completely reachable.
    *   Enforce a strict safety margin to prevent overlapping content. No horizontal overflow is permitted.

---

## 6. Card Design Rules
Cards are the primary container of structured learning content.

*   **Specifications:**
    *   Surfaces must use clean background values: `bg-white` or subtle tints like `bg-slate-50/50`.
    *   Corner rounding must use substantial values: `rounded-2xl` or `rounded-3xl` for high-quality container flow.
    *   Borders should be extremely subtle: `border-slate-200` or `border-slate-100`.
    *   Shadows should be soft: `shadow-xs` or `shadow-sm` (never harsh, heavy, dark black drop-shadows).
*   **Forbidden Styles:**
    *   No raw black frames, bright neon outline rings, or clipped text boxes.
    *   No empty placeholder boxes. Empty states must render beautiful illustration icons, helpful instructions, or intuitive actions.

---

## 7. Mobile App Experience Rules
The majority of SUSTAIN LMS learners study on mobile phones. Mobile interfaces must feel tactile, deliberate, and high-legibility.

*   **Design Standards:**
    *   Maintain a top-bar with screen context and clear navigation indicators.
    *   Touch target sizing must adhere to a strict minimum threshold of **44px** for buttons, active tabs, and input rows.
    *   Support smooth touch transitions, clear active states, and easily readable spacing.
    *   Ensure floating elements or sticky actions never cover critical viewport content.

---

## 8. Hero Section Rules
Hero segments establish the mood and provide an instant, readable status of the page. No flat, text-only hero sections.

*   **Composition:**
    *   Provide clear page hierarchy using title display typography.
    *   Show current learner context (e.g., current pathway, active module progress, or completion metrics).
    *   Primary action button alongside optional secondary link.
    *   Visual interest through soft background gradients, subtle brand-tinted geometric lines, or pristine product mock previews.

---

## 9. Button Rules
Every clickable element must be unambiguous and clearly signify its action.

*   **Primary Buttons:**
    *   `bg-emerald-900` or `#005C45` (`bg-emerald-800`), fading gracefully on hover to deep emerald shades.
    *   High-contrast white text, `rounded-xl` or `rounded-2xl`, and robust `font-semibold`.
    *   Minimum height of **44px** on mobile viewports.
*   **Secondary Buttons:**
    *   White or pale slate backdrops, outlined with clean `border-slate-200`, styled with text coloured with primary deep emerald or deep slate charcoal.
*   **Anti-Patterns:**
    *   No microscopic primary buttons.
    *   No text overlapping button boundaries.
    *   No "dead" buttons. Every button must route, open a modal, trigger a message/toast, or scroll to a target. Never display "This section is not available" on clicking.

---

## 10. Status Chip Rules
Keep badges and status labels readable, human, and contextually colored.

*   **Approved Status Text:**
    *   `Completed`
    *   `In progress`
    *   `Pending`
    *   `Draft started`
    *   `Review pending`
    *   `Attendance pending`
    *   `Ready for review`
    *   `Locked`
    *   `Synced`
    *   `Saved locally`
    *   `Missed`
*   **Forbidden Values:** No database fields, lowercases, or snake_case tags (e.g., `in_progress`, `locked_module`, `draft_started`).
*   **Semantic Color Bindings:**
    *   **Completed / Synced:** Soft emerald (`bg-emerald-50 text-emerald-800 border-emerald-100`).
    *   **Active / In progress:** Emerald or soft amber depending on contextual urgency.
    *   **Pending / Review:** Soft amber (`bg-amber-50 text-amber-800 border-amber-100`).
    *   **Locked:** Soft slate (`bg-slate-100 text-slate-500 border-slate-200`).
    *   **Missed / Failed / Critical:** Calm, desaturated red (`bg-red-50 text-red-800 border-red-100`).
    *   **Offline:** Soft teal (`bg-teal-50 text-teal-800 border-teal-100`).

---

## 11. Form and Input Rules
*   Form input boxes must feature robust rounding (`rounded-xl` or `rounded-2xl`), utilizing light backdrops (`bg-slate-50/50`) and clear gray borders (`border-slate-200`).
*   On focus, apply a crisp primary highlight ring: `focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600`.
*   Form grids must be fully legible on mobile with full-width stack blocks, while desktop layouts may use adjacent columns.
*   Provide helpful inline error or validation labels, avoiding dramatic bright red unless correcting critical format entries.

---

## 12. Public Landing Page Rules
The public-facing homepage represents the core identity of the platform and must look like a world-class, human-designed product.

*   **Landing Page Hero & Text Strip Rules:**
    *   **No Blinking Dot:** Public hero sections must not use blinking dots, pulsing status indicators, glowing circles, or animated neon signals.
    *   **Calm Animated Text Carousel:** Above the hero title, use a smooth, very slow text carousel or fade containing core product capabilities. Ensure there is a static text fallback when `prefers-reduced-motion` is active.
    *   **Human-Designed Copy:** Hero titles and description blocks should speak about concrete learning outcomes (lessons, assessments, clinics, CPD progress, certificate verification). Absolutely no AI, next-generation, or SaaS marketing slogans.

*   **SUSTAIN Pathway Preview Card Rules:**
    *   **Avoid Raw Dashboard Widgets:** Public product previews should tell a clear public-facing product story. Never render raw, mechanical dashboard blocks inside landing page previews.
    *   **Visual Style:** Outer container must be rounded-3xl with white or extremely pale slate backdrops, framed by soft borders (no dark or black outline borders). Use generous padding and visual layers with elegant shadows.
    *   **Clean Status Badges & Labels:** Use clear capitalized labels ("Current course", "Assessment", "CPD progress", "Required session"). Statuses must be color-coded appropriately using soft backgrounds and clear human wording.
    *   **No Internal System IDs:** Do not show raw codes, system versions, protocol labels, or ID numbers (e.g., do not show "SUST-501" or "ID: SUST-501" in public previews).

*   **Mobile Landing & Layout Safety Rules:**
    *   **Zero Overflow:** All elements must reside comfortably within the viewport. Absolutely no horizontal scroll, page clipping, or overflow on mobile widths (360px to 430px).
    *   **Touch Targets & Spacing:** Ensure a strict page padding (minimum 16px) is preserved. Touch targets must be at least 44px, and content containers must scale automatically.

*   **Essential Inclusions:**
    *   Highlight key product offerings: structured training pathways, direct facilitator feedback, offline content packs, live session compliance, CPD credit ledger, and public credential lookup.
    *   Pristine, non-generic imagery or styled vector graphics representing the platform's high utility.
*   **Forbidden Inclusions:**
    *   No system versions, software releases, or protocol numbering tags (e.g., "Version 2.4", "v4", "System v4").
    *   No generic marketing phrases, artificial claims, or AI tags ("AI-Powered", "Powered by AI", "Secure AI layer", "Intelligence Engine").
    *   No slash-numbering tags on features (e.g., do not show `01 / PATHWAY`).

---

## 13. Learner Workspace Rules
The learner dashboard coordinates comprehensive learning flows.

*   Provide direct, simple views tracking student pathway milestones, current courses, task checkpoints, assignment statuses, and low-bandwidth reading modules.
*   Include a central "Offline Center" allowing learners to check downloaded content, view saved drafts, and verify locally synced modules.
*   Ensure navigation stays intuitive, fast, and accessible across mobile networks.

---

## 14. Facilitator Workspace Rules
Facilitators review checkpoints, grade assignments, log session attendances, and coordinate with learner cohorts.

*   Facilitator screens must present clear cohort filters, intuitive check boxes for marking live lesson attendance, and elegant assignment reviews.
*   All facilitator routes must operate separately. Facilitators must never be redirected to typical student views unless utilizing an explicit "Student Preview Mode".

---

## 15. Low-Bandwidth and Offline Rules
Connectivity is a realistic constraint for many agribusiness training environments.

*   **Tone & Accuracy:**
    *   Never claim that the platform operates fully offline without downloading assets.
    *   Use direct, honest copy: *"Available offline after download. Your progress will sync automatically when you reconnect."*
*   **Low-Bandwidth Mode:**
    *   Renders simplified, lightweight, high-contrast text views.
    *   Hides high-bandwidth media (heavy audio, video, or rich images) and lists them as optional manual downloads.

---

## 16. CPD and Certificate Rules
Sustain credentials carry professional weight. The system must represent eligibility and certificate readiness stages with absolute transparency.

*   **Eligibility Stages:**
    *   `Not eligible yet` (Learner has not met the required lesson checkpoints or CPD thresholds).
    *   `Ready for review` / `Pending review` (Completed all milestones; waiting for the formal facilitator/coordinator validation).
    *   `Issued` (Certificate has been fully verified and is available for public ledger verification).
*   **Visual Indicators:**
    *   Renders a clear eligibility tracker matching the required credits (e.g., `22 / 35 Credits`).
    *   Maintains a secure credential verification look using spaced, formatted alphanumeric strings.

---

## 17. Timer and Alert Rules
Task checkpoints and assessment submissions feature standard timers. Timers must never introduce anxiety or distracting visual elements.

*   **Timer State Ranges:**
    *   **Normal (More than 5m):** Cool emerald or slate color schemes.
    *   **Warning (5m to 2m):** Warm amber, static text indicator.
    *   **Critical (Under 2m):** Bold desaturated red tag.
*   **Timer Constraints:**
    *   **No blinking, flashing, or pulsing.** Active animations are strictly forbidden, as they degrade readability and accessibility.
    *   Trigger alerts exactly once upon entering a warning or critical threshold.
    *   Do not run active count-down timers on assignment screens that are already submitted or are undergoing formal review.

---

## 18. Content and Microcopy Rules
Use natural, human, and professional copy.

*   **Approved Terminology:**
    *   `Assigned pathway` / `Sustained learning pathway`
    *   `Facilitator review` / `Coordinator validation`
    *   `CPD credits` / `Professional training credits`
    *   `Certificate readiness` / `Public verification`
    *   `Low-bandwidth reading version` / `Text-first mode`
    *   `Offline packs` / `Downloaded resources`
    *   `Saved locally` / `Pending sync`
    *   `Live session attendance`
*   **Forbidden Terminology:** Refer to Section 19.

---

## 19. Forbidden Words and Patterns
Do not let the following words, phrases, or visual styles enter user-facing interfaces:

| Category | Forbidden Phrase / Pattern | Approved Alternative |
| :--- | :--- | :--- |
| **System Versioning** | "Secure Programme System", "Version 2.4", "v4", "System v4" | *Remove completely; replace with useful product context* |
| **AI Assertions** | "AI-powered", "Powered by AI", "Secure AI system", "Intelligence layer" | *Remove completely; focus on direct learner/curriculum features* |
| **SaaS Buzzwords** | "Unlock your ultimate potential", "Transform your life", "Next-gen ecosystem" | "Structured learning for agribusiness pathways", "Work readiness foundation" |
| **Slogans** | "Professional Development for Impact", "AgriGrow", "Professional Dev" | "SUSTAIN LMS", "Youth Employability Pathway" |
| **Monetization** | "Premium Learner", "Upgrade to Pro", "View Plans" | *Remove; access is strictly managed via cohort sponsor invitations* |
| **Under-Development**| "This section is not available" / Dead routes | *Trigger a beautiful modal, render a prototype toast, or open support* |
| **Style Formatting** | Snake Case labels (e.g., `in_progress`, `locked_module`) | Capitalized, human-readable tags (e.g., `In progress`, `Locked`) |
| **Design Elements** | Harsh black borders, dark black shadows, bright neon cards | Subtly bordered, soft-shadowed white cards |

---

## 20. Accessibility Rules
Every element must prioritize inclusive accessibility standards.

*   Maintain strict AA color contrast margins. Ensure text elements are completely legible against backgrounds.
*   All interactive buttons and input fields must support tab-focus states, highlighted by a clear focus-ring: `focus-visible:ring-2 focus-visible:ring-emerald-700/50`.
*   Support reduced-motion preferences (`prefers-reduced-motion: reduce`) by automatically skipping entrance loaders, sliding banners, or dynamic progress bars.

---

## 21. Responsive Rules
The system must compile flawlessly and look magnificent across all standard device sizes.

*   **Mobile Screen Widths:** Test and adjust at `360px`, `375px`, `390px`, `414px`, and `430px`.
*   **Tablet Screen Widths:** Test and adjust at `768px`, `820px`, and `1024px`.
*   **Desktop Screen Widths:** Ensure optimal scaling and boundaries at `1280px`, `1440px`, and `1536px`.
*   Ensure cards, chevrons, chips, and headers wrap correctly without clipping or introducing horizontal page scrolling.

---

## 22. Route and Action Safety Rules
*   Do not leave any action in an unhandled, inactive state. Clicking an interactive button must always route to a valid page, open a functional modal/slide-out, scroll cleanly to a target section, or present a informative toast.
*   When demonstrating prototype functions, use a persistent notification toast indicating: *"Action saved in this frontend prototype."*

---

## 24. Public and Auth Refinement Rules
*   **No Public Role Hierarchy:** Do not prominently expose internal system hierarchy or workspaces (Learner, Facilitator, Programme Team) on the main public landing or auth hero sections. Let the landing page focus on value, and map roles *after* login or signup.
*   **Natural Credential Wording:** Never use terms like "Credential Tracking", "Pending Audit", "Issue Status", or "Under Review" as marketing labels on the landing page. Use human equivalents: "CPD and certificate readiness", "Review pending", "Certificate status: Review pending", and "CPD progress".
*   **Human-Centered Auth Copy:** Avoid uppercase, robotic or platform-sounding copy like "OR SIGN IN WITH YOUR SUSTAIN DETAILS". Instead, use calm human dividers like "or use your SUSTAIN account". Placeholders should be clean, concise, in the sans font (Inter), and use slate-400 or slate-500.
*   **Onboarding Setup Flow:** Role mapping should be completed securely on a post-registration onboarding or setup screen, away from public landing pages.
*   **Role-Aware Auth Panels:**
    *   Login visual panels must be role-aware where role selection exists.
    *   Learner login preview should show pathway and CPD progress.
    *   Facilitator login preview should show review and attendance work.
    *   Programme login preview should show oversight and cohort progress.
    *   Avoid “SUSTAIN LMS Portal” and system-like labels in public/auth UI.
    *   Auth copy must be human, calm, and product-specific.
    *   Public/auth UI must not use system-style trust badges or legal/compliance claims such as “Secure Access Portal” or “NDPR Compliant” unless the wording is approved and legally verified. Use plain product copy instead.
*   **Pathway Preloader Guidelines:**
    *   SUSTAIN LMS preloader must feel like a learning pathway, not a generic system loader.
    *   Do not use spinner-only loaders.
    *   Do not use blinking dots, bouncing dots, pulsing indicators, system badges, compliance claims, or version labels.
    *   Loader copy must be human and product-specific.
    *   Loader typography must use Plus Jakarta Sans and Inter.
    *   Loader should appear once per session.
    *   Loader duration should be calm: around 2.6–3 seconds on first load.
    *   Reduced motion must be supported.

## 25. Implementation Checklist
Before completing any UI, layout, or copy adjustment, verify the following checklist:

1.  [ ] **Read design.md:** Confirm changes match the official design rules.
2.  [ ] **Zero Forbidden Terms:** Ensure no system versions, AI tags, or snake_case fields are present in user-facing views.
3.  [ ] **AA Contrast & Focus:** Verify font colors are highly readable and interactive states are visible.
4.  [ ] **Touch Targets:** Confirm touch points are at least 44px on mobile views.
5.  [ ] **Mobile Wrap & Overflow:** Ensure no text clips, buttons are hidden, or horizontal scrolling occurs on mobile (360px+).
6.  [ ] **Prototype Integrity:** Check that all buttons lead to actual routes, open drawers/modals, or trigger valid toasts.
7.  [ ] **Flawless Compile:** Run `npm run lint` and `npm run build` to guarantee successful builds without any errors or warnings.
