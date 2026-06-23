"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Planning & Strategy",
    body: "Analyze the task, conduct tests to fully grasp the bug or feature to be addressed. And come up with with a work plan",
  },
  {
    num: "02",
    title: "Development & Progress Update",
    body: "Begin implementation and provide regular updates throughout the process",
  },
  {
    num: "03",
    title: "Further optimizations",
    body: "Enhance the code for better readability, maintainability, and future integration.",
  }
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left panel
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: leftRef.current,
        start: "top top",
        end: "bottom bottom",
      });

      // Reveal each step
      stepsRef.current.forEach((step, i) => {
        gsap.from(step, {
          clipPath: "inset(0 0 100% 0)",
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: step,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        // Line animation within step
        const line = step.querySelector(".step-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative z-10 w-full bg-surface"
    >
      <div className="container-custom flex min-h-[400vh] w-full items-start justify-between">
        {/* Left pinned section */}
        <div
          ref={leftRef}
          className="flex h-screen w-1/3 flex-col justify-center gap-4 py-24 sticky top-0"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            04 — How I Work
          </span>
          <h2 className="font-display text-[5rem] font-black leading-none text-ink">
            Process
          </h2>
        </div>

        {/* Right scrolling steps */}
        <div className="flex w-1/2 flex-col pt-[50vh] pb-[50vh] gap-[80vh]">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => {
                if (el) stepsRef.current[i] = el;
              }}
              className="relative flex flex-col gap-6 bg-surface"
              style={{ clipPath: "inset(0 0 0 0)" }}
            >
              <div className=" font-display text-[8rem] font-black text-accent/15 select-none pointer-events-none">
                {step.num}
              </div>
              <h3 className="relative z-10 font-display text-[2.5rem] font-bold text-ink">
                {step.title}
              </h3>
              <p className="relative z-10 max-w-[480px] font-body text-base text-ink-muted leading-relaxed">
                {step.body}
              </p>
              <div className="step-line mt-4 h-[1px] w-full origin-left bg-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
