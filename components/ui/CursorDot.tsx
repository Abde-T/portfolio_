"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import clsx from "clsx";

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<"default" | "hover" | "project">("default");

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl.closest('a, button, [data-cursor="hover"]')) {
        setMode("hover");
      } else if (targetEl.closest('[data-cursor="project"]')) {
        setMode("project");
      } else {
        setMode("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    // Initial position to avoid snapping
    const onInitialMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
      window.removeEventListener("mousemove", onInitialMove);
    };
    window.addEventListener("mousemove", onInitialMove);

    const ticker = gsap.ticker.add(() => {
      cursor.current.x += (target.current.x - cursor.current.x) * 0.4;
      cursor.current.y += (target.current.y - cursor.current.y) * 0.4;
      
      if (dotRef.current) {
        gsap.set(dotRef.current, {
          x: cursor.current.x,
          y: cursor.current.y,
        });
      }
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      gsap.ticker.remove(ticker);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={clsx(
        "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center transition-all duration-300 ease-out",
        "mix-blend-difference" // Ensures visibility across backgrounds
      )}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div
        className={clsx(
          "rounded-full transition-all duration-300",
          mode === "default" && "w-3 h-3 bg-accent",
          mode === "hover" && "w-10 h-10 border border-accent bg-transparent",
          mode === "project" && "w-12 h-12 border border-accent bg-transparent"
        )}
      >
        {mode === "project" && (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-accent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-[1px] bg-accent" />
          </>
        )}
      </div>
    </div>
  );
}
