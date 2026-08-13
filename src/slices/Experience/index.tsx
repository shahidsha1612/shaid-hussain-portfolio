import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { experience as resumeExperience } from "@/data/experience";
import ExperienceEntry from "@/components/ExperienceEntry";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps) => {
  // The work-history "Experience" instance renders the ExperienceEntry
  // card design from the resume; the "Education" instance of this same
  // slice renders its CMS content through the same card component.
  const isWorkExperience = slice.primary.heading === "Experience";

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-10 md:py-14 lg:py-16"
    >
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>

      <div className="mt-6 flex flex-col gap-6 md:mt-10">
        {isWorkExperience
          ? resumeExperience.map((item) => (
              <ExperienceEntry
                key={`${item.company}-${item.title}`}
                title={item.title}
                company={item.company}
                location={item.location}
                startDate={item.startDate}
                endDate={item.endDate}
                initials={item.initials}
                current={item.current}
              >
                {item.bullets.map((bullet, bulletIndex) => (
                  <p key={bulletIndex}>● {bullet}</p>
                ))}
              </ExperienceEntry>
            ))
          : slice.primary.exp.map((item, index) => (
              <ExperienceEntry
                key={index}
                title={item.company_title ?? ""}
                company={item.company_name ?? ""}
                dateLabel={item.time_period ?? ""}
                initials={getInitials(item.company_name ?? "")}
              >
                <PrismicRichText field={item.description} />
              </ExperienceEntry>
            ))}
      </div>
    </Bounded>
  );
};

export default Experience;
