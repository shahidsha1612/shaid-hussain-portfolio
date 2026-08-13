export type Project = {
  uid: string;
  title: string;
  tags: string[];
  summary: string;
  link?: string;
  image?: string;
};

/**
 * Sourced from Shaid's resume "Projects" section. Simple Supplier
 * Management is pinned to the top since it's the only one with a
 * live public link.
 */
export const projects: Project[] = [
  {
    uid: "simple-supplier-management",
    title: "Simple Supplier Management (SSM)",
    tags: ["Full Stack", "ISO/IEC 27001", "SaaS"],
    summary:
      "Designed and contributed to crucial features of the application centralising supplier records, certifications, renewal dates and risk ratings, replacing spreadsheet based registers. Combines ISO/IEC 27001 supplier controls A.5.19-A.5.22 with practical engineering delivery. Currently used by one of the top 10 financial sector companies in the UK and more. Led townhall meetings and managed secure code practices including input validation, output encoding, parameterised queries, secrets management, least privilege access control and dependency vulnerability scanning, aligned to the OWASP Top 10.",
    link: "https://simplesuppliermanagement.com/",
    image: "/ssm.png",
  },
  {
    uid: "worked-in-inforiver-projects",
    title: "Inforiver Projects",
    tags: ["Power BI", "React.js", "TypeScript", "Clean Code"],
    summary:
      "Delivered high performance React and TypeScript features for Inforiver, Lumel's enterprise Power BI analytics and reporting product, serving a large scale user base across Next.js and Node.js, with a focus on clean, maintainable code.",
    link: "https://inforiver.com/",
    image: "/reporting-powerbi-hero-scaled.png",
  },
  {
    uid: "isms-risk-control-assurance",
    title: "ISMS Risk and Control Assurance Across a Seven Client Portfolio",
    tags: ["GRC", "Risk Management", "Internal Audit"],
    summary:
      "Own the risk assessment, control mapping and internal audit workstreams for seven concurrent clients across defence supply chain, SaaS, research, non-profit and professional services, building risk registers, mapping Statement of Applicability controls to live risk entries and tracking remediation to closure. On the largest engagement, mapped 85 Statement of Applicability included controls across 76 live risk entries with a programmatic validation gate so only approved controls could be linked, then integrated internal audit findings against the affected risk rows to give the certification body a single traceable evidence chain.",
  },
  {
    uid: "nist-800-171-gap-analysis",
    title: "NIST SP 800-171 Gap Analysis for a Defence Supply Chain Manufacturer",
    tags: ["NIST SP 800-171", "CMMC", "Gap Analysis"],
    summary:
      "Reviewed 110 controls against an existing System Security Plan and a subsequent ISO/IEC 27001 internal audit, categorising each control by implementation status and evidencing the delta. Produced a prioritised remediation roadmap supporting the client route to Cybersecurity Maturity Model Certification (CMMC) readiness.",
  },
  {
    uid: "multi-department-internal-audit",
    title: "Multi Department Internal Audit Programme, Software Client",
    tags: ["ISO/IEC 27001", "Internal Audit"],
    summary:
      "Planned and led a full ISO/IEC 27001:2022 internal audit programme across eight departments, producing the audit plan, control matrix and schedule, conducting the audits and reporting nonconformities and opportunities for improvement to senior management for corrective action tracking.",
  },
];
