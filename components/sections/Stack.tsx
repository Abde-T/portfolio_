"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TechBadge } from "@/components/ui/TechBadge";

const MARQUEE_TECH = [
  "React",
  "Node.js",
  "TypeScript",
  "GraphQL",
  "PostgreSQL",
  "Redis",
  "Docker",
  "FFmpeg",
  "Next.js",
  "Tailwind",
  "AWS",
];

const SKILL_CLUSTERS = [
  {
    label: "Frontend",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "GraphQL", "PostgreSQL", "REST APIs"],
  },
  {
    label: "Infrastructure",
    techs: ["Docker", "AWS / ECS", "Redis / BullMQ", "FFmpeg"],
  },
  {
    label: "Currently Exploring",
    techs: ["LLM Orchestration", "Game development"],
  },
];

export function Stack() {
  const containerRef = useRef<HTMLElement>(null);
  const marquee1 = useRef<HTMLDivElement>(null);
  const marquee2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      const m1 = gsap.to(marquee1.current, {
        x: "-50%",
        ease: "none",
        duration: 20,
        repeat: -1,
      });
      const m2 = gsap.to(marquee2.current, {
        x: "50%",
        ease: "none",
        duration: 20,
        repeat: -1,
      });
      // Start m2 at -50% to move right
      gsap.set(marquee2.current, { x: "-50%" });

      // Speed up on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          gsap.to([m1, m2], { timeScale: 1.5, duration: 0.5 });
        },
        onLeave: () => {
          gsap.to([m1, m2], { timeScale: 1, duration: 0.5 });
        },
        onEnterBack: () => {
          gsap.to([m1, m2], { timeScale: 1.5, duration: 0.5 });
        },
        onLeaveBack: () => {
          gsap.to([m1, m2], { timeScale: 1, duration: 0.5 });
        },
      });

      // Cluster reveal
      gsap.from(".skill-cluster", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skill-clusters-wrapper",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={containerRef} className="section-padding relative z-10 w-full overflow-hidden">
      {/* Marquee Strip */}
      <div className="flex flex-col gap-4 border-y border-line py-8">
        <div className="relative flex w-full overflow-hidden whitespace-nowrap">
          <div ref={marquee1} className="flex w-max shrink-0 items-center font-display text-[3rem] font-bold text-ink">
            {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
              <div key={i} className="flex items-center">
                <span className="px-6">{tech}</span>
                <span className="text-accent">·</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex w-full overflow-hidden whitespace-nowrap">
          <div ref={marquee2} className="flex w-max shrink-0 items-center font-display text-[3rem] font-bold text-ink">
            {[...MARQUEE_TECH, ...MARQUEE_TECH].reverse().map((tech, i) => (
              <div key={i} className="flex items-center">
                <span className="px-6">{tech}</span>
                <span className="text-accent">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Clusters */}
      <div className="skill-clusters-wrapper container-custom mt-24">
        <div className="flex flex-wrap items-start justify-between gap-12">
          {SKILL_CLUSTERS.map((cluster, i) => (
            <div key={i} className="skill-cluster flex flex-col gap-6">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                [ {cluster.label} ]
              </span>
              <div className="flex flex-col items-start gap-3">
                {cluster.techs.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
