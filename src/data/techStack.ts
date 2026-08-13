export type TechStackItem = {
  tech_name: string;
  tech_color: string;
};

/**
 * Sourced from Shaid's resume "Key Skills" section. Rendered ahead of
 * the existing Prismic-managed dev-tool list (React.Js, Next.Js,
 * Node.Js, MongoDB, GSAP, Three.Js) in the "What I Use" slice, since
 * GRC/security is the current professional focus, and don't
 * duplicate anything already configured there.
 */
export const techStack: TechStackItem[] = [
  { tech_name: "ISO 27001", tech_color: "#facc15" },
  { tech_name: "GRC", tech_color: "#fb923c" },
  { tech_name: "Risk Management", tech_color: "#f87171" },
  { tech_name: "Internal Audit", tech_color: "#38bdf8" },
  { tech_name: "NIST 800-171", tech_color: "#a78bfa" },
  { tech_name: "ISO 42001", tech_color: "#4ade80" },
  { tech_name: "UK GDPR", tech_color: "#f472b6" },
  { tech_name: "TPRM", tech_color: "#2dd4bf" },
  { tech_name: "AI Governance", tech_color: "#818cf8" },
  { tech_name: "Compliance Automation", tech_color: "#22d3ee" },
];
