"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ProjectCard } from "@/components/ui/ProjectCard";

import { projects } from "@/data";

// Optional: you can augment the `projects` from data/index.ts with some dynamic thumbnail components if needed,
// but for now we'll adapt the data to match the ProjectCard format.
const MAPPED_PROJECTS = projects.map((p, index) => ({
  label: `0${index + 1} · Project`,
  title: p.title,
  description: p.des,
  // We can mock some techs or use iconLists as hints, but let's just use some strings
  techs: ["React", "Node.js", "Tailwind", "GSAP"],
  thumbnail: (
    <div className="relative flex h-full w-full items-center justify-center bg-[#0d0d0d] overflow-hidden">
      {/* If there's an image, we can try to render it, otherwise fallback */}
      {p.img && p.img.endsWith('.mp4') ? (
        <video src={p.img} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" />
      ) : (
        <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  ),
  liveLink: p.link,
}));

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (progressRef.current) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
        gsap.set(progressRef.current, { scaleX: progress });
      }
    };

    track.addEventListener("scroll", handleScroll);
    // Initial set
    handleScroll();

    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative z-10 h-[80vh] min-h-[600px] w-full overflow-hidden bg-bg"
    >
      <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col pl-[clamp(1.5rem,5vw,5rem)] z-20 pointer-events-none">
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          03 — Selected Work
        </span>
        <div className="flex items-start">
          <h2 className="font-display text-[6rem] font-black leading-none text-ink drop-shadow-md">
            Projects
          </h2>
          <span className="font-mono text-sm text-accent drop-shadow-md">(3)</span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="projects-track flex h-full items-center gap-[10vw] pl-[50vw] pr-[10vw] overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {MAPPED_PROJECTS.map((project, i) => (
          <div key={i} className="snap-center shrink-0">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-line/50 z-20">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-accent"
        />
      </div>
    </section>
  );
}
