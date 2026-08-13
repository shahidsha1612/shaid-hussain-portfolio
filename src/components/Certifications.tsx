import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ExperienceEntry from "@/components/ExperienceEntry";
import { certifications } from "@/data/certifications";

export default function Certifications() {
  return (
    <Bounded className="py-10 md:py-14 lg:py-16">
      <Heading as="h2" size="lg">
        Certifications
      </Heading>

      <div className="mt-4 flex flex-col gap-6 md:mt-8">
        {certifications.map((cert) => (
          <ExperienceEntry
            key={cert.title}
            title={cert.title}
            company={cert.issuer}
            dateLabel={cert.dateLabel}
            initials={cert.initials}
          >
            {null}
          </ExperienceEntry>
        ))}
      </div>
    </Bounded>
  );
}
