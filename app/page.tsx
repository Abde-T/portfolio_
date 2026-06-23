"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { CursorDot } from "@/components/ui/CursorDot";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    // Initial page transition overlay
    const ctx = gsap.context(() => {
      gsap.to(".page-transition-overlay", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          setMounted(true);
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="page-transition-overlay fixed inset-0 z-[99999] bg-ink pointer-events-none" style={{ clipPath: "inset(0 0 0 0)" }} />
      <CursorDot />
      <NoiseOverlay />
      
      {/* Hide content until initial transition clears up some space to avoid layout shifts on load */}
      <div className="relative w-full opacity-100" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.1s" }}>
        <Navbar />
        <main className="w-full flex flex-col">
          <Hero />
          <About />
          <Stack />
          <Projects />
          <Experience />
          <Process />
          <Contact />
        </main>
      </div>
    </>
  );
}
