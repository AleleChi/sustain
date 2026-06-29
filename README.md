# SUSTAIN LMS Demo

A mobile-first Learning Management System prototype for the SUSTAIN CPD Programme.

Prepared by:

**Devnra Ltd**
Lead Consultant / Product Lead: **Alele Chigozie**

---

## 1. Project Overview

SUSTAIN LMS is a proposed digital learning platform designed to support Continuous Professional Development delivery for agribusiness practitioners, TVET instructors, young job seekers, facilitators, curriculum experts, and programme teams across Nigeria.

This demo presents the proposed user experience and workflow for a scalable, low-bandwidth, mobile-friendly LMS that connects:

* learning pathways
* course modules
* lessons
* assessments
* facilitator review
* live sessions
* CPD tracking
* certificate readiness
* offline learning support
* learner support
* community interaction
* programme reporting

The current version is a clickable frontend demo intended to show the product direction, user flows, interface structure, and delivery logic.

---

## 2. Purpose of This Demo

This demo was prepared to support the technical proposal for the provision, customisation, deployment, and support of a Learning Management System for the SUSTAIN CPD Programme.

It is intended to help stakeholders review:

* the proposed learner experience
* the facilitator workflow
* the public certificate verification concept
* low-bandwidth and offline learning approach
* assessment and CPD journey
* mobile-first interface direction
* future programme reporting direction

This demo is not presented as the final production platform. The final deployed system will include backend integration, secure authentication, database architecture, production hosting, analytics, reporting exports, administrator controls, course creator tools, data protection safeguards, user onboarding, training, and ongoing support.

---

## 3. Core Product Direction

SUSTAIN LMS is designed around one simple idea:

> Learners should be able to move from assigned learning pathways to assessment, facilitator review, CPD progress, and certificate readiness through one clear digital experience.

The platform is structured to support three main user groups:

### Learners

Learners can access assigned courses, complete lessons, submit assessments, attend live sessions, track CPD progress, use offline packs, ask for support, and monitor certificate readiness.

### Facilitators

Facilitators can review learner submissions, confirm attendance, respond to learner questions, manage CPD review items, support learners, and monitor pathway progress.

### Programme Teams

Programme teams can monitor cohorts, learner progress, gender-disaggregated data, course completion, CPD readiness, support trends, and certificate pipelines.

---

## 4. Key Features Demonstrated

The current demo includes frontend flows for:

### Public Experience

* landing page
* login page
* signup page
* post-registration setup concept
* public certificate verification concept

### Learner Experience

* learner dashboard
* assigned learning pathway
* course list
* course detail page
* curriculum accordion
* lesson experience
* checkpoint/review flow
* assessment details
* assessment attempt
* assessment review and submission
* assessment result concept
* live sessions
* single live session detail
* CPD record
* certificate readiness
* offline centre
* low-bandwidth mode
* support centre
* community page
* resources/downloads
* notifications
* profile and preferences

### Facilitator Experience

* facilitator dashboard concept
* live sessions and attendance workflow
* single live session management
* checkpoint review direction
* assessment review direction
* CPD review direction
* learner questions and support direction

---

## 5. Low-Bandwidth and Mobile-First Approach

The interface is designed with the assumption that many users may access the LMS through mobile devices and unstable internet connections.

The proposed approach includes:

* mobile-first page layouts
* lightweight interface patterns
* text-first learning support
* downloadable learning packs
* saved drafts
* pending sync states
* reduced media dependency
* clear offline centre
* low-bandwidth mode
* compact learner dashboards
* readable mobile cards and actions

Production implementation will extend this with proper caching, offline storage, sync queue, service worker support, and backend-controlled offline access rules.

---

## 6. CPD and Certificate Readiness

The demo separates CPD progress from certificate issue.

Learners can view:

* confirmed CPD credits
* pending review items
* credits required
* certificate readiness status
* facilitator review state
* certificate verification availability

Certificates are not presented as automatically issued. Public verification is only intended for certificates that have been formally issued through the production workflow.

---

## 7. Course Creator and Future Marketplace Direction

The full production platform is intended to include a course creator section where curriculum experts and industry practitioners can:

* upload course content
* organise modules and lessons
* add downloadable resources
* create assessments
* manage course drafts
* publish approved content
* support future payment integration

The current demo focuses mainly on the learner, facilitator, and public access experience. Course creator workflows will be expanded during production design and implementation.

---

## 8. Technology Stack

The current frontend demo is built with:

* React
* TypeScript
* Vite
* Tailwind CSS
* Component-based UI structure
* Client-side routing
* Responsive layouts for mobile, tablet, and desktop

Recommended production additions:

* backend API
* database layer
* authentication system
* role-based access control
* course management backend
* reporting and analytics service
* certificate verification service
* notification service
* file/media storage
* monitoring and error tracking
* backup and recovery process

---

## 9. Project Structure

Typical structure:

```bash
src/
  components/
    auth/
    layout/
    navigation/
    public/
    learner/
    facilitator/
    shared/

  pages/
    public/
    auth/
    learner/
    facilitator/

  context/
    RouteContext.tsx

  assets/
  data/
  hooks/
  utils/

design.md
README.md
package.json
vite.config.ts
tailwind.config.js
```

Important project files:

```bash
design.md
```

Defines the SUSTAIN LMS design system, UI rules, content rules, forbidden patterns, brand colours, mobile layout principles, and implementation standards.

```bash
README.md
```

Explains the project, demo purpose, setup instructions, deployment steps, and production readiness notes.

---

## 10. Design System

The demo follows the SUSTAIN LMS design direction documented in `design.md`.

Core design principles:

* human and professional interface
* mobile-first layout
* clean card structure
* soft borders
* deep emerald primary colour
* warm white and pale slate backgrounds
* warm amber for review/certificate states
* teal for offline and low-bandwidth experiences
* blue-slate for reporting and guidance
* no black borders
* no system-version labels
* no artificial compliance badges
* no generic template language
* no public-facing copy that feels like an internal system

Before editing UI components, review:

```bash
design.md
```

---

## 11. Demo Routes

Main public routes:

```bash
/
 /home
 /login
 /signup
 /register
 /onboarding
 /verify-certificate
```

Learner routes:

```bash
/learner
/learner/dashboard
/learner/journey
/learner/courses
/learner/courses/work-readiness-foundation
/learner/courses/digital-readiness-basics
/learner/courses/work-readiness-foundation/lessons/preparing-for-interviews
/learner/checkpoints/interview-preparation/review
/learner/assessments
/learner/assessments/work-readiness-assessment
/learner/assessments/work-readiness-assessment/attempt
/learner/assessments/work-readiness-assessment/review-submit
/learner/assessments/work-readiness-assessment/submitted
/learner/assessments/work-readiness-assessment/result
/learner/live-sessions
/learner/live-sessions/interview-practice-clinic
/learner/cpd-record
/learner/certificates
/learner/offline
/learner/low-bandwidth
/learner/support
/learner/community
/learner/resources
/learner/downloads
/learner/notifications
/learner/profile
```

Facilitator routes:

```bash
/facilitator
/facilitator/dashboard
/facilitator/live-sessions
/facilitator/live-sessions/interview-practice-clinic
/facilitator/checkpoints
/facilitator/assessment-reviews
/facilitator/cpd-reviews
/facilitator/learner-questions
/facilitator/communications
/facilitator/reports
/facilitator/profile
```

---

## 12. Demo Walkthrough

Suggested demo flow:

1. Open the landing page.
2. Review the public explanation of SUSTAIN LMS.
3. Open the login page.
4. Select learner access and continue to learner dashboard.
5. Review assigned pathway and dashboard cards.
6. Open My Courses.
7. Expand Work Readiness Foundation.
8. Open the lesson page.
9. Open checkpoint or assessment flow.
10. Review assessment attempt and submission flow.
11. Open Live Sessions.
12. Review session attendance concept.
13. Open Offline Centre.
14. Review downloadable packs and pending sync concept.
15. Open CPD Record.
16. Review certificate readiness.
17. Switch to facilitator view.
18. Review facilitator live session and assessment workflow.
19. Return to public certificate verification page.

---

## 13. Demo Access

The demo may use role-based prototype navigation.

Suggested demo access labels:

```bash
Learner
Facilitator
Programme Team
```

Suggested demo accounts for presentation purposes:

```bash
Learner:
learner@sustain.demo

Facilitator:
facilitator@sustain.demo

Programme Team:
programme@sustain.demo
```

Note: These demo accounts are for presentation only unless connected to a production authentication service.

---

## 14. Local Development Setup

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

---

## 15. Vercel Deployment

This project can be deployed to Vercel as a frontend web application.

### Recommended Deployment Steps

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Log in to Vercel.
3. Create a new project.
4. Import the repository.
5. Select the correct framework preset.
6. Use the build command:

```bash
npm run build
```

7. Use the output directory:

```bash
dist
```

8. Deploy.

---

## 16. Vercel SPA Routing Support

If the project uses client-side routing, add a `vercel.json` file in the project root to prevent route refresh errors.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures routes such as `/learner/dashboard`, `/login`, and `/verify-certificate` load correctly when refreshed directly in the browser.

---

## 17. Environment Variables

The current frontend demo may not require environment variables.

For production, the following may be required:

```bash
VITE_API_BASE_URL=
VITE_AUTH_PROVIDER_URL=
VITE_CERTIFICATE_VERIFY_URL=
VITE_STORAGE_URL=
VITE_ANALYTICS_KEY=
```

Do not commit real secrets to the repository.

Production secrets should be managed through the hosting provider’s environment variable settings.

---

## 18. Production Readiness Notes

The current demo demonstrates the frontend experience and workflow. Before full production use, the following should be implemented:

### Authentication

* secure login
* role-based access control
* password reset
* invitation/programme code validation
* user session management

### Backend and Database

* learner records
* course records
* assessment submissions
* CPD records
* attendance records
* certificate records
* support tickets
* community moderation data

### Reporting

* gender-disaggregated analytics
* state/LGA reporting
* cohort progress
* course completion
* assessment performance
* CPD readiness
* exportable reports

### Security and Privacy

* encrypted access
* secure data storage
* audit logging
* access controls
* data retention rules
* backup and recovery

### Offline and Low-Bandwidth

* service worker
* local storage or IndexedDB strategy
* downloadable learning packs
* sync queue
* offline draft recovery
* reduced media delivery

### Support and Maintenance

* helpdesk workflow
* administrator training
* facilitator onboarding
* learner support materials
* issue tracking
* regular updates
* monitoring and performance checks

---

## 19. Quality Checklist Before Deployment

Before sharing the demo link, confirm:

* landing page loads correctly
* login page works
* signup page works
* learner dashboard opens
* course pages open
* assessment routes open
* live session routes open
* offline centre opens
* CPD record opens
* facilitator dashboard opens
* certificate verification page opens
* no horizontal overflow on mobile
* no broken buttons
* no placeholder system copy
* no black borders
* no console errors
* `npm run lint` passes
* `npm run build` passes

---

## 20. Known Demo Limitations

The current demo is frontend-focused.

The following features are presented as interface concepts and require production integration:

* real user authentication
* Google sign-in
* database persistence
* certificate issue and verification backend
* real email/SMS notifications
* live analytics
* downloadable file storage
* offline sync engine
* payment gateway integration
* course creator approval workflow
* production administrator controls

---

## 21. Proposed Production Implementation Phases

### Phase 1: Discovery and Validation

* confirm user groups
* validate course structures
* define reporting needs
* confirm low-bandwidth requirements
* align certificate workflow
* finalise technical architecture

### Phase 2: Platform Customisation and Core Build

* configure user roles
* build learning pathway structure
* implement course management
* implement assessments
* implement facilitator review
* implement CPD tracking
* implement certificate readiness logic

### Phase 3: Pilot Deployment

* onboard pilot users
* upload initial CPD content
* test learner workflows
* test facilitator workflows
* test reporting outputs
* collect feedback
* improve usability

### Phase 4: Full Deployment

* onboard wider learner groups
* train administrators and facilitators
* activate reporting dashboards
* monitor performance
* resolve early-stage issues

### Phase 5: Support and Optimisation

* provide technical support
* maintain platform
* improve workflows
* support reporting cycles
* optimise low-bandwidth performance
* prepare scale-up improvements

---

## 22. Ownership and Data

For production deployment, all project data generated, collected, or processed through the LMS should remain the property of the project owner.

The production system should include clear rules for:

* data ownership
* data access
* user privacy
* content ownership
* administrator permissions
* reporting exports
* backup and retention

---

## 23. Contact

Prepared by:

**Alele Chigozie**
Lead Consultant / Product Lead
**Devnra Ltd**

Email: `<alelechi17@gmail.com>`
Phone: `<+2348108501037>`
Location: Abuja Nigeria

---

## 24. Status

Current status:

```bash
Frontend demo ready for review
```

Recommended next step:

```bash
Deploy demo to Vercel and share the live link as part of the technical proposal package.
```
