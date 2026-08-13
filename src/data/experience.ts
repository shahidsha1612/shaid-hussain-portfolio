export type WorkExperienceItem = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  initials: string;
  current?: boolean;
  bullets: string[];
};

/**
 * Sourced from Shaid's resume "Career History / Work Experience"
 * section, in the same most-recent-first order as the resume.
 */
export const experience: WorkExperienceItem[] = [
  {
    title: "Information Security Consultant",
    company: "ADL Consulting Ltd",
    location: "UK",
    startDate: "2025-09",
    endDate: null,
    initials: "ADL",
    current: true,
    bullets: [
      "Deliver end to end ISO/IEC 27001:2022 ISMS implementation, certification readiness and maintenance programmes across seven concurrent client engagements spanning defence supply chain, Software as a Service (SaaS), research, nonprofit and professional services, each with its own regulatory drivers and certification deadlines.",
      "Plan and conduct internal audit programmes across multiple departments, producing audit plans, control matrices and schedules, and reporting nonconformities, corrective and preventive action (CAPA) and opportunities for improvement to senior management for tracking through to closure.",
      "Lead third party risk management (TPRM) and supplier due diligence, evaluating vendor certifications, data processing agreements (DPAs), data residency and UK GDPR processor obligations, and maintaining structured supplier risk registers as client ISMS evidence.",
      "Author full ISMS documentation suites including information security policies, business continuity and disaster recovery (BC/DR) plans and management review inputs supporting continual improvement.",
      "Perform gap analysis and produce prioritised remediation roadmaps against ISO 9001:2015, ISO/IEC 42001, NIST SP 800-171, Cyber Essentials and Cyber Essentials Plus.",
      "Bridge engineering and compliance by testing whether proposed controls are technically viable before they reach a Statement of Applicability, then translating the resulting risk into plain language for client directors and holding that position under challenge.",
    ],
  },
  {
    title: "Full Stack Developer (concurrent short engagement)",
    company: "Re:Healthify",
    location: "UK",
    startDate: "2025-07",
    endDate: "2025-08",
    initials: "RH",
    bullets: [
      "Designed and deployed an artificial intelligence health platform from core architecture through to production, implementing controls aligned to healthcare data protection and privacy requirements.",
      "Integrated electronic health record (EHR) data flows with data minimisation and access control designed from the outset rather than retrofitted.",
    ],
  },
  {
    title: "Full Stack Developer (concurrent)",
    company: "Lumel",
    location: "Remote",
    startDate: "2025-04",
    endDate: "2025-09",
    initials: "LU",
    bullets: [
      "Delivered high performance React and TypeScript applications for an enterprise analytics product serving a large scale user base, working across Next.js and Node.js.",
      "Applied secure development principles including input validation, authentication flow design and dependency management within the delivery lifecycle.",
    ],
  },
  {
    title: "Web Developer",
    company: "Freelance",
    location: "UK",
    startDate: "2023-09",
    endDate: "2025-07",
    initials: "FL",
    bullets: [
      "Delivered full stack web applications for international clients from design through development, testing and production release using React and Node.js, managing scoping, delivery timelines and handover documentation independently.",
    ],
  },
  {
    title: "Product Developer",
    company: "Lumel",
    location: "India",
    startDate: "2022-01",
    endDate: "2023-09",
    initials: "LU",
    bullets: [
      "Engineered complex frontend features in React.js and TypeScript, improving measured user satisfaction by 45% through enhanced functionality and usability.",
      "Led three concurrent projects under Agile methodology, achieving a 95% on time delivery rate and a 20% improvement in team efficiency.",
      "Built reusable component libraries reducing development time on new projects by 25%, and presented technical briefings to the wider engineering team to accelerate adoption.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Flyers Soft",
    location: "India",
    startDate: "2021-01",
    endDate: "2022-01",
    initials: "FS",
    bullets: [
      "Built and maintained responsive React.js frontend features for client web applications, working directly with clients from requirements through to production release and presenting delivered work in Agile sprint reviews.",
    ],
  },
];
