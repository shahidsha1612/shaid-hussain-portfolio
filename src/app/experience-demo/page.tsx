import ExperienceEntry from "@/components/ExperienceEntry";

export default function ExperienceDemoPage() {
  return (
    <main className="min-h-screen bg-surface-page px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <ExperienceEntry
          title="Information Security Consultant"
          company="ADL Consulting Ltd"
          location="United Kingdom"
          startDate="2025-09"
          endDate={null}
          initials="ADL"
          current
        >
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Deliver end to end ISO/IEC 27001:2022 ISMS implementation,
              certification readiness and maintenance programmes across seven
              concurrent client engagements.
            </li>
            <li>
              Lead third party risk management (TPRM) and supplier due
              diligence, maintaining structured supplier risk registers as
              client ISMS evidence.
            </li>
            <li>
              Perform gap analysis and produce prioritised remediation
              roadmaps against ISO 9001:2015, ISO/IEC 42001 and NIST SP
              800-171.
            </li>
          </ul>
        </ExperienceEntry>

        <ExperienceEntry
          title="Full Stack Developer (concurrent)"
          company="Lumel"
          location="Remote"
          startDate="2025-04"
          endDate="2025-09"
          initials="LU"
        >
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Delivered high performance React and TypeScript applications
              for an enterprise analytics product serving a large scale user
              base, working across Next.js and Node.js.
            </li>
            <li>
              Applied secure development principles including input
              validation, authentication flow design and dependency
              management within the delivery lifecycle.
            </li>
          </ul>
        </ExperienceEntry>

        <ExperienceEntry
          title="Frontend Developer"
          company="Flyers Soft"
          location=""
          startDate="2021-01"
          endDate="2022-01"
          initials="FS"
        >
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Built and maintained responsive React.js frontend features for
              client web applications, working directly with clients from
              requirements through to production release.
            </li>
          </ul>
        </ExperienceEntry>
      </div>
    </main>
  );
}
