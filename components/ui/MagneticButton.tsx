"use client";

import { useRef, ReactNode, useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import clsx from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}

export function MagneticButton({ children, className, variant = "primary", onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) * 0.4;
      const y = (e.clientY - (top + height / 2)) * 0.4;

      gsap.to(button, { x, y, duration: 1, ease: "power3.out" });
      gsap.to(text, { x: x * 0.5, y: y * 0.5, duration: 1, ease: "power3.out" });
    };

    const onMouseLeave = () => {
      setIsHovered(false);
      gsap.to(button, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      gsap.to(text, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    const onMouseEnter = () => setIsHovered(true);

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseleave", onMouseLeave);
    button.addEventListener("mouseenter", onMouseEnter);

    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseleave", onMouseLeave);
      button.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={clsx(
        "relative flex items-center justify-center rounded-full px-6 py-3 font-body font-medium transition-colors duration-300",
        variant === "primary"
          ? "bg-accent text-white hover:bg-blue-600"
          : "bg-transparent text-ink hover:text-accent",
        className
      )}
    >
      <span ref={textRef} className="pointer-events-none inline-block">
        {children}
      </span>
    </button>
  );
}
