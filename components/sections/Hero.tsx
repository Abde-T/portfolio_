"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      // Entrance animation
      tl.from(".hero-grid", { opacity: 0, duration: 1.2, ease: "power2.out" })
        .from(".hero-circle", { scale: 0, opacity: 0, duration: 1.4, ease: "expo.out" }, "-=0.8")
        .from(".char", { y: "110%", opacity: 0, stagger: 0.018, duration: 0.9, ease: "power4.out" }, "-=1")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .from([".hero-year", ".hero-scroll"], { opacity: 0, duration: 0.8 }, "-=0.2");

      // Scroll Parallax
      gsap.to(".hero-grid", { y: "-15%", ease: "none", scrollTrigger: { scrub: 1.5 } });
      gsap.to(".hero-circle", { y: "-30%", ease: "none", scrollTrigger: { scrub: 2 } });
      gsap.to(".hero-year", { y: "-50%", ease: "none", scrollTrigger: { scrub: 1 } });
      gsap.to(".hero-heading", { y: "-10%", ease: "none", scrollTrigger: { scrub: 1.2 } });

      // Rotate circle continuously
      gsap.to(".hero-circle", { rotation: 360, duration: 40, repeat: -1, ease: "none" });

      // Scroll indicator loop
      gsap.fromTo(
        ".scroll-line-fill",
        { y: "-100%" },
        { y: "100%", duration: 1.5, repeat: -1, ease: "power2.inOut" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[100svh] w-full items-end overflow-hidden pb-[clamp(3rem,6vw,5rem)]"
    >
      {/* 1. Background grid */}
      <div
        className="hero-grid absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 39px, var(--color-line) 39px, var(--color-line) 40px), repeating-linear-gradient(to bottom, transparent, transparent 39px, var(--color-line) 39px, var(--color-line) 40px)",
        }}
      />

      {/* 2. Floating year label */}
      <div className="hero-year absolute right-8 top-1/2 z-10 -translate-y-1/2 -rotate-90 font-mono text-[11px] tracking-widest text-ink-muted md:right-16">
        2025
      </div>

      {/* 3. Abstract shape */}
      <div className="hero-circle absolute -right-20 -top-20 z-10 h-[600px] w-[600px] rounded-full border border-accent opacity-15" />

      {/* Content Container */}
      <div className="container-custom relative z-20 flex w-full flex-col gap-6">
        {/* 4. Main heading */}
        <div className="hero-heading flex flex-col font-display text-[clamp(4rem,10vw,9rem)] font-black leading-[0.95] tracking-tight">
          <SplitHeading className="overflow-hidden">Full-Stack</SplitHeading>
          <SplitHeading className="overflow-hidden">Engineer &</SplitHeading>
          <div className="flex">
            <SplitHeading className="overflow-hidden">SaaS Founder</SplitHeading>
            <span className="text-accent char">.</span>
          </div>
        </div>

        {/* 5. Subheading */}
        {/* <p className="hero-sub max-w-[480px] font-body text-[clamp(1rem,2vw,1.25rem)] text-ink-muted">
          Building scalable web platforms and distributed media pipelines.
        </p> */}

        {/* 6. CTA row */}
        <div className="hero-cta mt-4 flex items-center gap-6">
          <MagneticButton onClick={() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}>
            View Work
          </MagneticButton>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-base font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            Download CV ↗
          </a>
        </div>
      </div>

      {/* 7. Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Scroll
        </span>
        <div className="relative h-10 w-[1px] overflow-hidden bg-line">
          <div className="scroll-line-fill absolute inset-0 bg-ink" />
        </div>
      </div>
    </section>
  );
}
