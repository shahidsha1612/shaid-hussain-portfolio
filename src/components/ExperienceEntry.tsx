"use client";
import { ReactNode, useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { renderLetters } from "@/slices/Hero";

gsap.registerPlugin(ScrollTrigger);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Dates are "YYYY-MM" or "YYYY-MM-DD" strings, parsed by splitting
// rather than via Date() to avoid timezone-shifted months.
function formatMonthYear(date: string): string {
  const [year, month] = date.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export type ExperienceEntryProps = {
  title: string;
  company?: string;
  location?: string;
  // Either pass startDate (+ optional endDate) for a resume-style
  // entry with real, per-month dates -- or pass a pre-formatted
  // dateLabel for content (e.g. from a CMS) that isn't broken into
  // clean "YYYY-MM" fields.
  startDate?: string;
  endDate?: string | null;
  dateLabel?: string;
  initials: string;
  logoSrc?: string;
  current?: boolean;
  children: ReactNode;
};

export default function ExperienceEntry({
  title,
  company,
  location,
  startDate,
  endDate,
  dateLabel,

  current = false,
  children,
}: ExperienceEntryProps) {
  const endLabel = endDate ? formatMonthYear(endDate) : "Present";
  const dateRange = startDate
    ? `${formatMonthYear(startDate)} – ${endLabel}`
    : dateLabel ?? "";

  const articleRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Unique per mounted card so each entry's letters/ScrollTrigger
  // target only their own spans, not every card's on the page.
  const animationKey = useId().replace(/[^a-zA-Z0-9]/g, "");

  useLayoutEffect(() => {
    audioRef.current = new Audio("/sounds/lego.mp3");
    audioRef.current.volume = 0.5;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.animation-${animationKey}`,
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
            trigger: articleRef.current,
            // Scrubbed to scroll position, not an automatic one-shot
            // tween: the letters fall into place as you scroll.
            start: "20px 100%",
            end: "50% 100%",
            scrub: 4,
            onEnter: () => {
              audioRef.current?.play().catch(() => {});
            },
            onLeave: () => {
              audioRef.current?.pause();
            },
          },
        },
      );
    }, articleRef);

    return () => {
      ctx.revert();
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [animationKey]);

  return (
    <article
      ref={articleRef}
      aria-label={
        company ? `${title} at ${company}, ${dateRange}` : `${title}, ${dateRange}`
      }
      className="margin-bottom-8"
    >
      <div className="flex flex-wrap items-center gap-3.5 sm:flex-nowrap">
        <div className="flex min-w-0 flex-1 items-center gap-3.5">

          <div className="min-w-0 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2.5">
            {company && (
              <h3 className="text-xl font-semibold text-text-muted sm:text-2xl">
              {renderLetters(
                location ? `${company} · (${location})` : company,
                animationKey,
              )}{" "}
              <span className="hidden sm:inline">-</span>
              </h3>
            )}
            <p className="text-xl font-bold text-text-primary sm:text-2xl">
                {renderLetters(title, animationKey)}
            </p>
          </div>
        </div>

        <span className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full bg-surface-pill px-2.5 py-1 text-1xl text-[#ffdf20]">
          {current && (
            <span
              aria-hidden="true"
              className="size-1.5 flex-none rounded-full bg-accent-live animate-pulse-dot motion-reduce:animate-none"
            />
          )}
          {startDate ? (
            <>
              <time dateTime={startDate}>{formatMonthYear(startDate)}</time>
              <span aria-hidden="true">–</span>
              {endDate ? (
                <time dateTime={endDate}>{endLabel}</time>
              ) : (
                <span>{endLabel}</span>
              )}
            </>
          ) : (
            <span>{dateLabel}</span>
          )}
        </span>
      </div>

      <div className="prose prose-lg prose-invert mt-4 max-w-none">
        {children}
      </div>
    </article>
  );
}
