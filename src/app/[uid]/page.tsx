import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Certifications from "@/components/Certifications";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());
  const slices = page.data.slices;

  // On the About page, the Certifications section isn't Prismic
  // content -- inject it directly above the work-history "Experience"
  // slice (not the "Education" instance of the same slice type).
  if (uid === "about") {
    const workExperienceIndex = slices.findIndex(
      (slice) =>
        slice.slice_type === "experience" &&
        "heading" in slice.primary &&
        slice.primary.heading === "Experience",
    );

    if (workExperienceIndex !== -1) {
      return (
        <>
          <SliceZone
            slices={slices.slice(0, workExperienceIndex)}
            components={components}
          />
          <Certifications />
          <SliceZone
            slices={slices.slice(workExperienceIndex)}
            components={components}
          />
        </>
      );
    }
  }

  return <SliceZone slices={slices} components={components} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages.map((page) => ({ uid: page.uid }));
}