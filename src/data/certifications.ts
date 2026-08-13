export type Certification = {
  title: string;
  issuer?: string;
  dateLabel: string;
  initials: string;
};

/**
 * Sourced from Shaid's resume "Education / Qualifications" section,
 * excluding the two degree entries (those are already covered by the
 * About page's Education cards), in the same order as the resume.
 */
export const certifications: Certification[] = [
  {
    title: "Certified GRC Engineer - Auditor Specialty (CGE-AUD)",
    dateLabel: "Aug 2026",
    initials: "CGE",
  },
  {
    title: "ISO/IEC 42001 AI Management Systems Masterclass",
    dateLabel: "Aug 2026",
    initials: "AI",
  },
  {
    title: "ISO 9001:2015 Quality Management Systems",
    dateLabel: "Jul 2026",
    initials: "QMS",
  },
  {
    title: "Building an ISO 27001-Compliant Cybersecurity Program",
    dateLabel: "Dec 2024",
    initials: "ISM",
  },
  {
    title: "Architectural Thinking for Security",
    dateLabel: "Dec 2023",
    initials: "AT",
  },
  {
    title: "ISO/IEC 27001 Lead Auditor",
    issuer: "PECB",
    dateLabel: "Sep 2023",
    initials: "PECB",
  },
  {
    title: "Cybersecurity Job Simulation",
    issuer: "Mastercard",
    dateLabel: "Sep 2023",
    initials: "MC",
  },
];
