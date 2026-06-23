"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { experience } from "@/data";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        // Animate the main item container
        gsap.fromTo(
          item,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding container-custom relative z-10 w-full"
    >
      <div className="flex flex-col gap-16 md:flex-row md:gap-24">
        {/* Left Header */}
        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            06 — Career
          </span>
          <h2 className="font-display text-[4rem] font-black leading-none text-ink md:text-[5rem]">
            Experience
          </h2>
        </div>

        {/* Right List */}
        <div className="flex w-full flex-col gap-12 md:w-2/3">
          {experience.map((exp, i) => (
            <div
              key={i}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="group flex flex-col gap-4 border-b border-line pb-12 transition-colors duration-300 hover:border-accent md:flex-row md:gap-8"
            >
              {/* Logo / Date placeholder */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sharp bg-surface p-2 border border-line">
                {exp.img ? (
                  <img src={exp.img} alt={exp.name} className="h-full w-full object-contain" />
                ) : (
                  <div className="h-full w-full bg-line/20" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {exp.title}
                  </h3>
                  <span className="font-mono text-sm text-accent">
                    {exp.name}
                  </span>
                </div>
                <p className="font-body text-base leading-relaxed text-ink-muted mt-2">
                  {exp.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
