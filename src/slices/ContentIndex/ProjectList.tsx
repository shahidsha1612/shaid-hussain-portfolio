"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import { Project } from "@/data/projects";
import { renderLetters } from "../Hero";

gsap.registerPlugin(ScrollTrigger);

type ProjectListProps = {
  projects: Project[];
  viewMoreText?: string;
};

export default function ProjectList({
  projects,
  viewMoreText = "View Project",
}: ProjectListProps) {
  const component = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const revealRef = useRef(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const hoveredImage = currentItem !== null ? projects[currentItem]?.image : undefined;

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
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/lego.mp3");
        audioRef.current.volume = 0.5;
      }

      // Letter-by-letter title reveal + scroll-triggered sound,
      // matching the Experience slice used on the About page. Uses a
      // one-shot "play" trigger rather than Experience's scrub, since
      // scrub snaps straight to the end state (no visible animation)
      // for cards already in view on load -- which happens here
      // because the Projects heading is short, unlike Experience
      // where Biography/TechList always push it below the fold.
      projects.forEach((_, index) => {
        gsap.fromTo(
          `.animation-project-title-${index}`,
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
              each: 0.05,
              from: "random",
            },
            scrollTrigger: {
              trigger: itemsRef.current[index],
              start: "20px 100%",
              toggleActions: "play none none none",
              onEnter: () => {
                audioRef.current?.play().catch(() => {});
              },
            },
          },
        );
      });

      return () => ctx.revert(); // cleanup!
    }, component);
  }, [projects]);

  useEffect(() => {
    // Mouse move event listener for the floating image preview
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      const ctx = gsap.context(() => {
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
          });
          gsap.to(revealRef.current, {
            opacity: hovering && hoveredImage ? 1 : 0,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.4,
          });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert(); // cleanup!
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovering, currentItem, hoveredImage]);

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
    if (!hovering) setHovering(true);
  };

  const onMouseLeave = () => {
    setHovering(false);
    setCurrentItem(null);
  };

  return (
    <ul
      ref={component}
      className="grid border-b border-b-slate-100"
      onMouseLeave={onMouseLeave}
    >
      {projects.map((project, index) => {
        const Wrapper = project.link ? "a" : "div";
        return (
          <li
            key={project.uid}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            onMouseEnter={() => onMouseEnter(index)}
          >
            <Wrapper
              {...(project.link
                ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex flex-col justify-between gap-4 border-t border-t-slate-100 py-10 text-slate-200 md:flex-row md:items-start"
              aria-label={project.title}
            >
              <div className="flex flex-col gap-3 md:max-w-3xl">
                <span className="text-3xl font-bold max-[600px]:text-[15px]">
                  {renderLetters(project.title, `project-title-${index}`)}
                </span>
                <p className="text-base font-normal text-slate-400 max-[600px]:text-[13px]">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-3 text-yellow-400">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-lg font-bold max-[600px]:text-[15px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {project.link && (
                <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0 max-[600px]:mt-[20px]">
                  {viewMoreText} <MdArrowOutward />
                </span>
              )}
            </Wrapper>
          </li>
        );
      })}

      {/* Hover image preview */}
      <div
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage: hoveredImage ? `url(${hoveredImage})` : "none",
        }}
        ref={revealRef}
      ></div>
    </ul>
  );
}
