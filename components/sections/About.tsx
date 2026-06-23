"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitHeading } from "@/components/ui/SplitHeading";
import clsx from "clsx";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sticky image parallax
      gsap.to(".about-image", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Text reveal
      gsap.from(".about-text .word", {
        y: 20,
        opacity: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 75%",
        },
      });

      // Stats count up
      const stats = gsap.utils.toArray(".stat-number");
      stats.forEach((stat: any) => {
        const targetValue = parseFloat(stat.getAttribute("data-value"));
        gsap.fromTo(
          stat,
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: 1.5,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: ".about-stats",
              start: "top 80%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding container-custom relative z-10"
    >
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <span className="font-mono text-[11px] text-ink-muted">
            01 — About
          </span>
          <div className="relative w-full max-w-[400px]">
            <div className="about-image relative aspect-square w-full overflow-hidden rounded-sharp ">
              {/* Placeholder image box */}
              <img src="/logo.png" alt="" />
            </div>
            {/* Blue border tracing bottom and right */}
            <div className="absolute -bottom-2 -right-2 h-full w-full border-b-2 border-r-2 border-accent pointer-events-none" />
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[12px] text-ink">
            <span>Currently based in Morocco</span>
            <span className="text-accent">{time}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-7 flex flex-col gap-12 md:pl-12 lg:pl-24">
          <div className="about-text font-body text-xl md:text-2xl leading-relaxed text-ink mt-8">
            <span className="float-left mr-4 font-display text-[5rem] font-black leading-[0.8] text-accent">
              B
            </span>
            <SplitHeading splitBy="words" className="inline" itemClass="pb-1">
              uilding scalable web platforms and distributed media pipelines.
            </SplitHeading>
            <br />
            <br />
            <SplitHeading splitBy="words" className="inline" itemClass="pb-1">
              Currently building a Web-Based Video Editor SaaS with an AI-driven
              podcast-to-shorts pipeline — a system that automates short-form
              content generation at scale using FFmpeg, Redis queues, and
              computer vision. Open to contract and part-time engineering roles.
            </SplitHeading>
          </div>

          <div className="about-stats flex w-full border-t border-line pt-8">
            <div className="flex flex-1 flex-col gap-2 border-r border-line pr-6">
              <div className="flex font-display text-[2.5rem] font-bold tracking-tight">
                <span className="stat-number" data-value="2">
                  0
                </span>
                +
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                Years Exp
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 border-r border-line px-6">
              <div className="flex font-display text-[2.5rem] font-bold tracking-tight">
                <span className="stat-number" data-value="12">
                  0
                </span>
                +
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                Projects
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 pl-6">
              <div className="flex font-display text-[2.5rem] font-bold tracking-tight">
                <span className="stat-number" data-value="1">
                  0
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                SaaS Products
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
