import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ContentList from "./ContentList";
import ProjectList from "./ProjectList";
import { createClient } from "@/prismicio";
import { projects } from "@/data/projects";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex: FC<ContentIndexProps> = async ({ slice }) => {
  const contentType = slice.primary.content_type || "Blog";

  const list =
    contentType === "Project" ? (
      <ProjectList
        projects={projects}
        viewMoreText={slice.primary.view_more_text ?? undefined}
      />
    ) : (
      <ContentList
        items={await createClient().getAllByType("blog_post")}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fall_back_item_image}
      />
    );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-10 md:py-14 lg:py-16"
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {contentType !== "Project" &&
        isFilled.richText(slice.primary.description) && (
          <div className="prose prose-xl invert mb-10">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
      {list}
    </Bounded>
  );
};

export default ContentIndex;
