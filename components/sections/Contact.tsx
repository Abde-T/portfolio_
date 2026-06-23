"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Footer } from "@/components/layout/Footer";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance wipe
      gsap.fromTo(
        sectionRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );

      // Heading chars reveal
      gsap.from(".contact-char", {
        y: "120%",
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 75%",
        },
      });

      // Email hover jitter effect
      const emailLink = emailRef.current;
      if (emailLink) {
        const chars = emailLink.querySelectorAll(".char");
        const onHover = () => {
          gsap.to(chars, {
            y: () => gsap.utils.random(-5, 5),
            stagger: 0.02,
            duration: 0.2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          });
        };
        emailLink.addEventListener("mouseenter", onHover);
        return () => emailLink.removeEventListener("mouseenter", onHover);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("tiamani3939@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 flex min-h-screen w-full flex-col bg-ink text-white"
    >
      <div className="container-custom flex flex-1 flex-col items-center justify-center text-center">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent mb-8">
          05 — Let&apos;s Build
        </span>

        <h2 className="contact-heading font-display text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight mb-8">
          <SplitHeading className="overflow-hidden" itemClass="contact-char">
            Have a project
          </SplitHeading>
          <br />
          <div className="flex justify-center">
            <SplitHeading className="overflow-hidden" itemClass="contact-char">
              in mind
            </SplitHeading>
            <span className="text-accent contact-char">?</span>
          </div>
        </h2>

        <p className="max-w-[480px] font-body text-base text-white/60 mb-16">
          Open to contract and part-time engineering roles. Fast response
          guaranteed.
        </p>

        <div className="flex flex-col items-center gap-6">
          <a
            ref={emailRef}
            href="mailto:tiamani3939@gmail.com"
            className="font-display text-[clamp(2rem,5vw,4rem)] font-bold text-white transition-colors hover:text-accent"
          >
            <SplitHeading splitBy="chars">tiamani3939@gmail.com</SplitHeading>
          </a>
          <button
            onClick={handleCopy}
            className="font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-white transition-colors flex items-center gap-2"
          >
            {copied ? "Copied!" : "Copy email →"}
          </button>
        </div>

        <div className="mt-24 flex items-center gap-8 font-body text-[13px] font-medium text-white/50">
          {[
            { name: "GitHub", link: "https://github.com/Abde-T" },
            {
              name: "LinkedIn",
              link: "https://www.linkedin.com/in/abde-t/",
            },
            { name: "Twitter", link: "https://x.com/Abde_T39" },
          ].map((social) => (
            <a
              key={social.link}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden hover:text-white transition-colors group"
            >
              {social.name}
              <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
}
