"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

export function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex h-20 items-center justify-between border-t border-white/10 px-6 text-white md:px-12">
      <div className="font-mono text-[11px] text-white/50">
        © {new Date().getFullYear()}
      </div>
      <div className="font-mono text-[11px] text-white/50">
        Designed & Built by AbdeT
      </div>
      <div>
        <MagneticButton
          variant="ghost"
          className="!text-white/50 hover:!text-white"
          onClick={handleScrollTop}
        >
          ↑ Top
        </MagneticButton>
      </div>
    </footer>
  );
}
