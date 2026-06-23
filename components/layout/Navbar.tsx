"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Line animate width
    gsap.fromTo(
      ".nav-logo-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // Stagger reveal links
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    // Bottom border fade in on scroll
    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add("border-line");
        nav.classList.remove("border-transparent");
      } else {
        nav.classList.remove("border-line");
        nav.classList.add("border-transparent");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex h-14 items-center justify-between border-b border-transparent bg-bg/85 px-6 backdrop-blur-md transition-colors duration-300 md:px-12"
    >
      <div className="flex items-center gap-1 nav-item">
        <span className="font-display text-lg font-bold">AbdeT</span>
        <div className="nav-logo-line h-[2px] w-4 origin-left bg-accent" />
      </div>

      <nav className="hidden items-center gap-8 md:flex">
        {["Stack", "Experience", "Process", "Contact"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="nav-item group relative font-body text-[13px] font-medium uppercase tracking-wider text-ink"
          >
            {link}
            <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 nav-item">
        <div className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 md:flex">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          <span className="font-mono text-[10px] uppercase text-ink-muted">
            Available for contracts
          </span>
        </div>
        <MagneticButton
          className="!px-4 !py-2 !text-sm"
          onClick={() => window.location.href = "mailto:tiamani3939@gmail.com"}
        >
          Let&apos;s talk →
        </MagneticButton>
      </div>
    </header>
  );
}
