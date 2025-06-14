"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { renderLetters } from "../Hero";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps) => {
  const components = useRef(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useLayoutEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Loop through each company and create individual ScrollTriggers
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/lego.mp3");
        audioRef.current.volume = 0.5;
      }
      slice.primary.exp.forEach((item, index) => {
        gsap.fromTo(
          `.animation-${index}`, // Target letters in this specific company
          {
            x: -100,
            opacity: 0,
            rotate: -10,
          },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            ease: "power4.out",
            duration: 1,
            transformOrigin: "left top",
            stagger: {
              each: 0.1,
              from: "random",
            },
            scrollTrigger: {
              trigger: `.company-${index}`, // Each company div is its own trigger
              start: "20px 100%",
              end: "50% 100%",
              scrub: 4,
              onEnter: () => {
                console.log("Element entered viewport");
                // Your enter logic here
                audioRef.current?.play();              },

              onLeave: () => {
                console.log("Element left viewport (scrolling down)");
                audioRef.current?.pause();              },
            },
          },
        );
      });
    }, components);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={components}
    >
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>
      {slice.primary.exp.map((item, index) => (
        <div
          key={index}
          className={`company-${index} ml-6 mt-8 max-w-prose md:ml-12 md:mt-16`}
        >
          <Heading as="h3" size="sm">
            {item.company_title}
          </Heading>

          <div
            className={`animate mt-1 flex w-fit items-center gap-1 text-2xl font-semibold uppercase tracking-tight text-white`}
          >
            <span>{renderLetters(item.company_name, index.toString())}</span>
          </div>
          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
            <span>{item.time_period}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
