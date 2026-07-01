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

*   **Certificate Design & Review Specifications:**
    1.  **Public Verification Privacy:** Public certificate verification must show a verified certificate record summary, not private learner evidence.
    2.  **Optional Public Preview:** Full certificate preview is optional and must only include public certificate fields.
    3.  **Strict Data Exclusion:** Public verification must not expose facilitator notes, CPD evidence, assessment details, attendance logs, or internal review comments.
    4.  **Readiness-Focused Language:** Programme certificate review must use certificate readiness language, not audit/portfolio/submission language.
    5.  **Oversight Checklist Requirements:** Certificate review should show CPD complete, assessment reviewed, attendance confirmed, facilitator confirmation, programme approval, and public verification readiness.
    6.  **Optimized Mobile Review Flow:** Mobile certificate review must use full-screen sheets, not squeezed desktop split panels.
    7.  **Actual Component Implementation Rule:** Programme certificate review must edit the actual rendered certificate component. The review queue should use calm learner review cards, sentence-case status chips, compact readiness chips, soft selected states, and pagination. The selected detail panel should use one checklist card, soft programme approval highlight, human certificate record language, refined facilitator notes, and balanced actions. Mobile must use review cards and a full-screen review sheet, never a squeezed split panel.

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
*   **Certificate Public Trust Experience:** Certificate verification must feel like a premium public trust experience, not a system registry or backend lookup form. Avoid mechanical labels and backend terminology. Do not use terms like "Certificate Registry", "Credential Tracking", "Pending Audit", "Issue Status", or compliance/system wording. Use sentence case like "Verify a SUSTAIN certificate".
*   **Verification Field & Placeholder Standards:** Keep input placeholders short, concise, and human-oriented (e.g., "Enter certificate ID"). Never use long examples inside the placeholder itself. Place clear, soft example selection chips below the lookup field.
*   **Simplified Login Experience:** The login experience must remain clean, minimal, and premium. To prevent looking like an administrative portal before the user actually signs in, do not display large role-aware dashboard previews or course statistics before authentication.
*   **Subtle Access Selection:** Role-based access selectors on the login screen must be subtle, highly polished segmented controls (e.g., "Continue as: Learner / Facilitator / Programme Team") and must not display dominant demo control banners. Provide a single, short helper line indicating that the correct workspace opens post-login.
*   **Interactive Public Cards & Hover States:** Public pages must utilize consistent visual standards with soft borders, rounded corners (`rounded-2xl` or `rounded-3xl`), and robust interaction feedback. On desktop hover, cards should lift slightly (`-translate-y-1`), feature a soft shadow (`shadow-md`), and strengthen icon accents without using aggressive flashes, glows, or blinking indicators. Support tap scaling on mobile (`active:scale-[0.99]`) and clear focus rings for keyboard accessibility.
*   **Matched Desktop Landing Quality:** The desktop landing experience must match the visual caliber of the mobile hero. Utilize a premium split layout with a clean typographic heading ("Every step, clearly connected."), golden/amber text highlights, realistic product previews, and zero disconnected gutters.
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
*   **Mobile-First Navigation Pattern Guidelines:**
    *   Learner and Facilitator modules must include a consistent mobile-first top navigation pattern.
    *   This consists of a fixed top header, an accessible slide-out hamburger drawer, an Ask Help shortcut, and a Profile shortcut.
    *   Mobile learner/facilitator navigation must use a closed overlay drawer. Do not render sidebars as permanent inline columns on mobile. Mobile content must remain full width and must not be squeezed by navigation. Desktop sidebars must only apply at desktop breakpoints.
    *   Drawer navigation must support active route highlighting and clean visual styling.
    *   Ensure content has appropriate top padding (e.g. 72px–80px) to prevent overlap with the fixed top header on mobile.
    *   Avoid using generic admin dashboard styling, black borders, system labels, or AI-powered/platform-generated wording.
    *   Mobile users should be able to navigate seamlessly through either the drawer links or by scrolling normal page content.
    *   **Mobile Landing Hero Guidelines:** Mobile landing hero must sit close to the top navigation with balanced spacing. Avoid large empty white gaps above the hero. Do not use animated “SUSTAIN:” badges in the hero. Hero copy should use a static human eyebrow or no eyebrow, strong headline typography, readable subtext, and preserved CTA hierarchy.

## 25. Learner Notifications Module
*   **Learning Update Centre:** Learner notifications must function as a learning update centre. Avoid raw notification logs, harsh metadata cards, black borders, and backend-style record blocks.
*   **Grouping and Relevance:** Notifications must be grouped by learner-relevant categories such as assessments, live sessions, CPD, support, offline packs, and certificate readiness.
*   **Visual State Communication:** Use clear read/unread states with soft, high-legibility visual cues (e.g. subtle emerald left border for unread cards), clear contextual action buttons, and mobile-first card layouts.
*   **Compact Identity:** Replace heavy, dark-bordered user profile tables with compact, soft-background identity cards or context strips.

## 26. Learner My Journey Module
*   **Guided Mobile Roadmap:** The Learner My Journey module must behave like a guided mobile roadmap. Avoid repeated nested cards, backend-style progress blocks, harsh borders, scattered icons, and generic dashboard cards.
*   **Clear Structured Flow:** The page should show pathway context, current next step, timeline, course progress, CPD/certificate readiness, and recommended actions in a clear learner-first flow.

## 27. Individual Course Detail Pages
*   **Mobile Course Hub:** Individual course detail pages must behave like mobile course hubs. Avoid raw metadata cards, clipped text, black-bordered resource blocks, robotic document labels, and disconnected buttons. Course detail pages should show course progress, current lesson, module activities, lightweight resources, CPD/certificate link, and clear next actions.

## 28. Reusable Status Chip System
*   **Centralized Chip Patterns:** All status indicators across the Learner modules must use the centralized `StatusChip` system. Avoid raw database values, snake_case strings, or unstyled grey pills.
*   **Color-Coded Semantic States:**
    *   `Completed` / `Passed` / `In progress` / `Active`: Use soft, highly readable emerald backgrounds (`bg-emerald-50`, `text-emerald-800`, `border-emerald-200`) representing successful/active states.
    *   `Draft saved` / `Certificate-linked` / `Review pending`: Use amber accents (`bg-amber-50`, `text-amber-800`, `border-amber-200`) for states that require program visibility or are linked to credentials.
    *   `Pending` / `Attendance pending`: Use soft blue-slate accents (`bg-blue-50`, `text-blue-800`, `border-blue-100`) for scheduled or review states.
    *   `Locked`: Use quiet, high-contrast greys (`bg-slate-100`, `text-slate-650`, `border-slate-200`).
    *   `Offline` / `CPD-linked`: Use light teal tones (`bg-teal-50`, `text-teal-800`, `border-teal-150`).
*   **Consistent Visual Formats:** Every chip must be rendered with `rounded-full`, a small leading status dot, balanced typography (`font-semibold`), and strict AA readability margins.

## 29. Public Landing Hero & Brand Standards
*   **Static Clean Hero Layout:** Public landing hero sections must never use rotating/animated “SUSTAIN:” badges, badges carousels, or changing labels. The hero must start cleanly with the main headline and readable subtext.
*   **Shaped Memorable Headline:** Use human-centered, memorable, and product-specific headlines such as "Every step, clearly connected."
*   **Warm Amber Emphasis Accent:** One emphasis word may use warm amber (`#FBBF24`, `amber-300`, or `amber-400`) to highlight connection or progress. Avoid neon, harsh orange, red-orange, glow, or gradient text.
*   **Human Product Subtext:** Use clear, descriptive subtext outlining the end-to-end learning flow: lessons, CPD tracker, certificate review, and low-connectivity resilience.
*   **Mobile Spacing & Gutters:** Mobile landing hero must not create unnecessary side whitespace or look like a detached random card. Hero should be full-bleed, filling the mobile screen area with intentional, elegant padding. Mobile landing sections must flow naturally from hero to footer with consistent, balanced spacing, avoiding large, random white gaps or squeezed desktop grids on mobile viewports.
*   **Product Preview Card Safety:** Product preview cards must never let status chips or other metadata overflow outside card boundaries. Maintain responsive layout rows where status chips wrap gracefully beneath titles on extremely narrow viewports (e.g. 360px), ensuring robust alignment without absolute positioning or negative margins.
*   **Card Interactions and Layouts:**
    *   Landing cards must follow the SUSTAIN standard: `rounded-2xl` or `rounded-3xl`, bg-white, warm white, or soft-tinted surfaces, soft borders, subtle shadows, and spacious, balanced padding.
    *   No black borders, harsh outlines, raw grey pills, or unstyled system widgets.
    *   Clickable cards or buttons must have subtle focus/hover/tap states (e.g., scale adjustments `active:scale-[0.99]`, background transitions) for premium tactile feedback.
    *   Mobile landing flows must avoid desktop grids squeezed into mobile. Ensure full-width lists or single columns with generous gaps.
*   **No Technical Larping or Robot Language:** Avoid terms like "AI-powered", "next-generation", "unlock your potential", "Secure Access Portal", "NDPR Compliant", "Protocol", "System v4", "Version 2.4", or slash numbering like "01 / PATHWAY". Use literal human labels: "assigned pathways", "CPD progress", "certificate readiness", "low-bandwidth access", and "offline packs".

## 30. Mobile Navigation Drawer & Sidebar Experience
*   **Premium Mobile App Panels:** Reusable learner/facilitator navigation drawers must feel like premium mobile app panels, not plain menu lists. They should include role-aware header context, grouped navigation, useful learner/facilitator status, visible support/profile/sign-out actions, and a sticky bottom action area.
*   **Hidden Overlay Behavior:** Mobile drawers must remain hidden overlays and must never push or replace page content.
*   **Sign Out Action & Confirmation Flow:** Reusable learner/facilitator drawers must include a visible Sign Out action in the sticky bottom action area. Sign Out should use a subtle destructive style and must trigger a confirmation modal or bottom sheet before routing to login. It must not be hidden below the drawer scroll or placed only as an icon.

## 31. Learner Profile Module Design Standards
*   **Mobile Account Hub Behavior:** The Learner Profile module must behave like a mobile account hub, not a generic settings page. It should include identity, pathway progress, preferences, access/connectivity settings, support/resources, and separated account actions.
*   **Sign Out Style:** Sign Out must use a subtle destructive style and confirmation flow. Avoid black borders, raw account records, backend-style labels, and generic settings rows.

## 32. Login Access Selection & Workspace Previews
*   **Polished Workspace Entry:** Login access selection must feel like a polished workspace entry experience, not a demo control. Avoid “Choose demo access” in public UI.
*   **Role-Aware Workspace Previews:** Role-aware previews should be compact, useful, and visually refined. Learner previews should show pathway progress, facilitator previews should show review work, and programme programme previews should show delivery visibility.
*   **Aesthetic & Styling Rules:** Do not use flat dark blocks, default grey pills, system labels, or prototype language in normal UI. Use premium segmented controls, light soft-tinted cards with appropriate AA accessible chips, and smooth transitions on role adjustments.

---

## 33. Technical Architecture & SPA Routing Guide
To preserve the premium feel and support fast, reliable operations (even in low-bandwidth regional contexts), SUSTAIN LMS utilizes a lightweight, fully integrated Single Page Application (SPA) architecture:

*   **State-Authoritative Routing Context:**
    *   **The Routing Engine:** Managed via a centralized `RouteContext` using hash-based navigation (`window.location.hash`). This allows rapid view switching, zero-flicker rendering, and natural browser forward/back tracking without expensive server handshakes.
    *   **Url Normalization:** All routes are normalized instantly. For example, hash changes are checked for sub-parameters such as `#login?role=facilitator` or `#verify-certificate?id=SUST-CERT-2026-0148`.
    *   **Workspace Synchronization:** The current authentication status and user roles (`learner`, `facilitator`, `admin`) are shared from this context. Components dynamically adapt their visual frames, sub-headers, sidebars, and actions based on the current active role state.
*   **Seamless Role Verification Flow:**
    *   **Automatic Role Binding:** In the Login interface, the standard "Continue as" segment switcher is omitted to protect internal database structures and look highly professional.
    *   **Dynamic Matching:** Instead, as the user types, the login controller runs a real-time pattern match on the text. Emails or identifiers containing `"facilitator"` automatically preset the Facilitator workspace layout, while `"admin"`, `"prog"`, or `"coordinator"` activate the Programme Team preview. All other entries default to the Learner workspace layout.
*   **Offline State Synchronization Cache:**
    *   **Local Resilience:** Real-time data and learning progress are saved to a localized frontend cache. When cellular signals fail or regional power cuts hit local hubs, learners can continue typing assignment drafts, checking finished course guides, and tracking completed checkpoints safely.
    *   **State Merging:** Once connectivity is re-established, the platform performs a background merge, pushing local changes up to the server and updating the core CPD credit counts smoothly.

---

## 35. Programme Settings Design Standards
*   **Human-Centric Copy:** Completely avoid technical database or administrative terms like "registry," "sync," "diagnostics," "cache," "metadata," "override," or "protocol." Replace them with warm, development-sector human language: "data updates," "programme targets," "CPD rules," and "reporting preferences."
*   **Premium Segmented Grid & Layout:** Organise settings at desktop widths into a balanced 2-column bento-like grid (e.g., 7/12 left-hand, 5/12 right-hand columns). Avoid vast, empty, or stretched card fields.
*   **Interactive Tactile Controllers:** Replace raw input sliders or numeric fields with custom interactive stepper buttons (+ / -) for targets and thresholds, and elegant, high-contrast, custom rounded switches (Enabled/Disabled toggles) featuring immediate micro-interactive state changes.
*   **Safe Sandbox Safeguards:** Ensure any action button that triggers advanced or mock integrations (e.g., view reports, export files, data refreshing) presents a beautiful high-fidelity overlay modal detailing that the operation is prepared and is ready for live production backend bindings.
*   **Typography & Card Highlights:** Programme settings cards must use refined typography, human labels, compact highlights, and soft setting rows. Numeric values must use normal UI typography, not monospace or system-generated styling. Mobile setting rows should stack when values are long. Avoid calculator-like controls, raw sliders, uppercase metric labels, and generated phrases such as “threshold necessary for graduation.” Each major settings card should include one useful highlight to improve scanning and hierarchy.

---

## 36. Programme Dashboard & Reporting Design Standards
*   **National Delivery Environment:** The Programme Dashboard must act as a world-class monitoring workspace for national delivery. Completely avoid mock-terminal or backend-system status chips like "Active Syncing" or "Registry Sync." Use clean, professional human language such as "Live programme data" or "Updated today."
*   **Storytelling Layout:** The Programme Dashboard must tell a coherent programme-management story instead of just presenting scattered KPI cards. The page flow should prioritise actionable oversight: Today's Programme Focus first, followed by the KPI strip, Programme Progress, Cohort Health, Pathway Performance, Gender & Location Snapshot, Low-Bandwidth adaptation, and Recent Activity.
*   **Durable Nigeria Location Reporting:** All state and local government area (LGA) tracking must utilize a reusable location data module (`src/data/nigeriaLocations.ts`) featuring structured states and LGA hierarchies.
*   **Dependent Multi-Level Filters:** State and LGA filters across the workspace must be strictly dependent. Selecting a state must update and restrict the available LGA options dynamically, resetting any generic selections.
*   **Strategic Detail Snapshots:** The main dashboard snapshot should present only the top performing or critical states and LGAs to maintain visual clarity, while the detailed Reports page provides comprehensive filtering, deep lists, and multi-column tables.
*   **Bento-style Desktop Layout:** Organize the dashboard into a highly refined, double-column bento grid. The left column (wider, e.g. 7/12) tracks program health (progress summary, cohort health, pathway performance, and gender/location snapshot). The right column (narrower, e.g. 5/12) focuses on intervention and oversight (attention required, low-bandwidth access summary, and recent activity timeline).
*   **Responsive Navigation Controls:**
    *   Mobile viewports stack all sections into a single clean column, using a h-16 bottom navigation bar for module navigation.
    *   Tablet and desktop viewports must strictly hide the bottom navigation bar when the desktop sidebar is rendered. The bottom navigation bar must never appear simultaneously with the sidebar on any viewport.
*   **Compact Mobile Cards & Table-to-Card Conversion:** Mobile views must feature compact, optimized cards. Multi-column tables (such as regional records or learner details) must be dynamically converted into stacked visual cards on mobile viewports to prevent overflow, scrolling, or squished texts.
*   **Mobile-First Programme Dashboard Flow:** The mobile dashboard must not use desktop hero patterns. It should start with a compact programme pulse card, today's priority actions, quick-action shortcuts, and highly compact KPI cards. Avoid stacked oversized chips, large vertical CTA buttons, long subtitles, heavy hero cards, and desktop-sized KPI cards. Mobile dashboards must surface useful data within the first screen and maintain safe spacing above the bottom navigation bar.
*   **Typography & Number Formats:** All key metrics, user counts, percentage trackers, and credits must utilize the clean, highly-readable "Inter" sans-serif font family. Monospace or slab-serif system fonts are forbidden for dashboard figures, ensuring consistent visual elegance.

---

## 37. Programme Learner Management Design Standards
*   **Workspace Atmosphere:** Programme learner management must feel like a premium learner operations workspace, not a registry or database table. Avoid words such as registry, milestone pathway, bandwidth adaptation, verified complete, and standard bandwidth.
*   **Adaptive Responsive Layouts:** Desktop views may use a highly refined, elegant product table. Mobile and tablet viewports must strictly convert learner detail rows into stacked, highly optimized visual cards to prevent squeeze or horizontal scrolling.
*   **Dependent Nigeria Location Filters:** State and LGA dropdown filters must use the Nigeria location data module (`src/data/nigeriaLocations.ts`), and the LGA dropdown choices must depend dynamically on the selected state (hiding unrelated LGAs).
*   **Human Status & Access Language:** Status chips and labels must use human learner-support language:
    *   *Status:* "Active", "Review pending", "Certificate ready", "Needs follow-up".
    *   *Access:* "Low-bandwidth access" and "Standard access".
*   **Prototype Actions:** Action buttons like "Import Learners", "Export List", or "View Reports" that are not fully wired should trigger clean, informative prototype overlays.
*   **Premium Visual Refinements:** Programme learner management must use refined product-table design on desktop and learner cards on mobile/tablet. Learner IDs must not appear as broken grey blocks, gender must not be shown in uppercase, and repeated action buttons must remain compact. Avoid registry language, spreadsheet-style rows, heavy borders, boxed IDs, all-caps LGAs, oversized chips, and generic enterprise-table styling.

---

## 39. Learner Drawer, Mobile Views, and Pagination Standards
*   **Learner Record Drawer**:
    *   **Desktop Layout**: Opens as a sleek right-side drawer panel with a soft backdrop overlay (`bg-slate-950/40 backdrop-blur-xs`), smooth exit/entry transitions, and easy click-outside dismissal.
    *   **Mobile & Tablet Layout**: Adapts automatically into a bottom-sheet modal styled with generous corner rounding (`rounded-t-[32px]`) and scrolling behavior to maximize touch real estate.
    *   **Content Architecture**: Displays a human-centric "Learner summary", "Pathway and cohort" information, "Progress and CPD" metrics with a beautiful visual slider, and "Assessment and attendance" states.
    *   **Action Hub**: Features clear, compact action triggers for specific, realistic operations ("Review Certificate", "View Support Logs", "Send Follow-up") that open corresponding interactive feedback modals rather than leaving users with dead buttons.
*   **Mobile Card View**:
    *   Replaces wide, dense desktop tables with high-contrast, stacked cards (`bg-white rounded-3xl border border-slate-200/70 p-5 shadow-xs`).
    *   Programme learner cards on mobile must not copy desktop table density. Cards should prioritise learner identity, status, CPD progress, pathway/cohort/location, access mode, and one clear action. Avoid squeezed two-column detail layouts, broken learner IDs, oversized status chips, all-caps gender, heavy dividers, and competing bottom-row buttons.
    *   Includes clear, compact identity details (large dynamic avatar, learner ID, gender), location tags, pathway/cohort, progress bar, and touch-optimized action triggers (e.g., "View record" button) designed with a minimum 44px touch target.
*   **Dynamic Pagination Engine**:
    *   **Style & Aesthetic**: Encased in a bordered, white, shadowed footer container matching the parent list card perfectly.
    *   **Interactive Control**: Integrates rows-per-page selectors, compact page numbers, and responsive "Prev" / "Next" triggers styled with deep emerald active indicators and soft slate borders.
    *   **Ecosystem Integration**: Dynamically slices and paginates mock data arrays for high-fidelity interactive simulation, and automatically resets `currentPage` back to `1` when filters, search queries, or rows-per-page selectors are adjusted.

---

## 40. Programme Cohort Management Design Standards
*   **National Delivery Tone:** Deliver a highly polished, professional cohort tracking dashboard. Absolutely avoid administrative lingo like "Localized workloads," "Cohort controls," "Database sync," and "Pending portfolios." Instead, use clean, development-sector human language: "Find cohorts," "LGA delivery," and "CPD reviews pending."
*   **Bento summary strip:** The top of the page must feature a highly compact stat summary strip summarizing active delivery states, learners assigned, regional facilitators, and reviews pending to tell a clear delivery story.
*   **Interactive Modal Flows:** Actionable operations for the Programme Team (Create Cohort, Edit Details, Assign Facilitator, Import Learners, and Export Reports) must be fully interactive with stateful, high-fidelity overlays, file drop progress animations, format selectors, and immediate visual success indicators.
*   **Dependent Nigeria Location Filters:** State and LGA selection must utilize the Nigeria location module (`src/data/nigeriaLocations.ts`). The LGA field must be disabled until a state is chosen, and dynamically restrict its dropdown choices to the selected state's LGAs.
*   **Cohort Card Responsive Ordering:** Cohort cards must follow the precise mobile card layout hierarchy:
    1.  Cohort ID and Status chip (Top row)
    2.  Cohort Name (Sentence case) and Pathway subtitle
    3.  Lead Facilitator block (Clean card, circular avatar with initials)
    4.  Progress indicator (Compact horizontal bar, percentage value)
    5.  Key metrics grid (Enrolled, Active, CPD Ready, Offline mode)
    6.  Alert banner (Soft amber/rose card highlighting critical actions required, e.g. "8 learners awaiting CPD review")
    7.  Compact actions row (Edit details, Assign Lead, View Cohort drawer)
*   **Bottom Sheet (Mobile) & Sliding Right Drawer (Desktop):** Detailed cohort overviews must use a slide-out right drawer on desktop and transition into a touch-optimized bottom sheet modal on mobile. The drawer must display comprehensive delivery breakdowns, active tutor profiles, pending checklists, and direct CTA actions.

---

## 42. Programme Reports Design Standards
*   **Premium Reports Atmosphere:** Programme Reports must feel like a premium reporting and insights workspace, not an audit or compliance module.
*   **Strict Language Safeguards:** Completely avoid technical database, administrative, or compliance terms like "audit," "compliance audit," "statistical distribution," "gender ratios," "connectivity adaptation," "official statistics," "registry," "sync," "metadata," or "reporting deadlines." Replace them with warm, human programme language: "reports and insights," "participation," "completion rate," "CPD readiness," "certificate pipeline," "location coverage," "gender participation," "low-bandwidth access," "offline packs," "saved drafts," and "waiting to upload."
*   **Layout and Device Adaptability:**
    *   **Mobile viewports:** Must feature a compact, clean hero, simple collapsed filters behind a "More filters" button, active filter chips for easily managing criteria, and horizontal-scrolling sentence-case tabs. Tables must be automatically transformed into stacked mobile cards with generous spacing.
    *   **Tablet viewports:** Organize filters into 2 or 3 columns and key programme indicators (KPIs) into balanced columns. Ensure no sidebar conflict exists.
    *   **Desktop viewports:** Maintain a full-screen premium analytics environment. Present KPIs in a balanced grid (such as 3 columns x 2 rows), and render location coverage data as an elegant, clean tabular workspace.
*   **Tactile and Interactive Elements:** Report exports (PDF and CSV) must not be dead links. Trigger a beautiful, high-fidelity modal detailing exactly which report sections to include and the progress of the compilation simulation. Once completed, allow downloading the mock prototype document, transitioning into a successful state with feedback.
*   **Soft Containment & Layout Details:** Programme report sections must use soft containment, not heavy bordered report panels. Tables on desktop should feel like premium product tables with sentence-case headers, soft row dividers, and subtle hover states. On mobile, every table must convert to readable cards. Avoid dark section borders, uppercase metric headers, harsh table frames, compliance/admin language, and raw spreadsheet styling. Use softly lifted white cards with rounded-3xl, custom shadows, and borders with `border-slate-200/70` rather than thick or dark borders. Progress bars must be modern, highly refined, with proper color fills and balanced text.


---

## 41. Programme Certificates Design Standards
*   **Workflow Atmosphere:** Programme Certificates must feel like a certificate review and issuance workflow, not an audit queue.
*   **Programme Certificates Rule:** The Programme Certificates module must be action-complete, not decorative. Every visible action must either navigate, open a modal/sheet, update selected state, or show a prototype-safe confirmation. Review buttons must update the selected certificate detail panel on desktop and open a full-screen review sheet on mobile. Issue certificate, request follow-up, bulk issue, export, learner record, pagination, and public verification actions must never be dead. Desktop uses a two-column review workspace; mobile uses cards and full-screen sheets. Avoid nested scrollbars, fixed desktop action footers, raw checkboxes, dark chip borders, broken overlays, and disconnected side panels.
*   **Strict Language Safeguards:** Completely avoid technical database, administrative, or compliance terms like "audit," "portfolio submissions," "evidence checklists," "query raised," "registry," "credential tracking," "issue status," "protocol," "database," "sync," or "metadata." Replace them with warm, human programme language: "Certificate Review", "Certificate Review and Issuance", "Certificate readiness", "Ready for review", "Requires follow-up", "Facilitator confirmation", "CPD complete", "Assessment reviewed", "Attendance confirmed", "Programme approval", "Public verification", "facilitator notes", and "learner record".
*   **Scroll Architecture (One-Scroll-Owner Rule):** Programme Certificates must follow a one-scroll-owner rule. Desktop certificate detail panels must not use internal scroll containers or fixed action footers; actions sit naturally after content. Mobile review sheets may use one full-screen scroll container with a safe sticky footer. Avoid nested scrollbars, content scrolling under buttons, raw checkboxes, flat admin queue rows, dark chip borders, and split-panel layouts on mobile.
*   **Layout and Device Adaptability:**
    *   **Mobile viewports:** Must feature a compact, clean hero, simple collapsed filters, and active filter chips. List items must be rendered as high-contrast, stacked cards with learner identity at the top, a status chip, and requirement indicators. Tapping "Review" or a card opens a full-screen review sheet modal with a sticky header and sticky bottom action bar, avoiding squeezed right-panel layouts on smaller screens.
    *   **Tablet viewports:** Cards remain balanced and filters collapsed/grid. Squeezed split panels are disabled at 768px and 820px, switching to a wider list + bottom sheet review modal workflow.
    *   **Desktop viewports:** Premium full-screen two-panel workspace where the left panel houses a polished review list and the right panel houses the selected learner's certificate detail. Avoid massive blank empty states in the right panel by default, and instead show a helpful guide/workflow explanation.
*   **Interactive Modals:** Actionable operations (Issue Certificate, Request Follow-up, View Learner Record) must trigger stateful, high-fidelity overlays or confirmation dialogs with clear checks, safe prototype language, and success feedback states.
*   **Mobile Pagination & Records Summary standards:**
    *   The records and page status indicator must use clear vertical layout hierarchies. Avoid cramped lines or awkward text alignment on mobile screens. 
    *   The "Page X of Y" descriptor and record counts must be left-aligned on small displays to establish a professional reading grid.
*   **Refined Mobile Details Sheet (Active Review Panel):**
    *   **Stacked layout:** Labels and values must be clean, stacked, sentence-case, utilizing standard sans-serif text (never monospace for normal values, never uppercase).
    *   **No nested scrolling:** The sheet overlay must utilize a single scrolling container with safe bottom padding to prevent double scrollbars.
    *   **44px tap targets:** Close buttons and action boundaries must maintain minimum 44px boundaries for easy mobile operation.
    *   **Premium Review Certificate Detail Flow:** Review Certificate detail views must use a premium certificate-review flow: sticky header, summary card, compact learner details, one readiness checklist card, refined certificate record, facilitator confirmation, and safe sticky actions. On mobile, avoid raw two-column record layouts, long pending-value text that wraps awkwardly, black borders, nested scrollbars, raw tables, and generic form-like panels.


---

## 43. Implementation Checklist
Before completing any UI, layout, or copy adjustment, verify the following checklist:

1.  [x] **Read design.md:** Confirm changes match the official design rules.
2.  [x] **Zero Forbidden Terms:** Ensure no system versions, AI tags, or snake_case fields are present in user-facing views.
3.  [x] **AA Contrast & Focus:** Verify font colors are highly readable and interactive states are visible.
4.  [x] **Touch Targets:** Confirm touch points are at least 44px on mobile views.
5.  [x] **Mobile Wrap & Overflow:** Ensure no text clips, buttons are hidden, or horizontal scrolling occurs on mobile (360px+).
6.  [x] **Prototype Integrity:** Check that all buttons lead to actual routes, open drawers/modals, or trigger valid toasts.
7.  [x] **Flawless Compile:** Run `npm run lint` and `npm run build` to guarantee successful builds without any errors or warnings.
