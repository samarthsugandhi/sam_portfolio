"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);

  // Use refs for direct DOM manipulation (zero-latency)
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const rx = useSpring(mx, { stiffness: 130, damping: 18, mass: 0.6 });
  const ry = useSpring(my, { stiffness: 130, damping: 18, mass: 0.6 });

  const dx = useSpring(mx, { stiffness: 700, damping: 40 });
  const dy = useSpring(my, { stiffness: 700, damping: 40 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setIsMobile(false);
    }

    let isHoveringLink = false;
    let isLightMode = false;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      // Fast check for element under cursor
      const t = e.target as HTMLElement;
      if (!t) return;

      // 1. Check link hover
      const overLink = t.tagName === "A" || t.tagName === "BUTTON" || !!t.closest("a") || !!t.closest("button");
      
      // 2. Check background context
      const lightSection = !!t.closest('.bg-\\[\\#F4F4F0\\]') || !!t.closest('.bg-\\[\\#F2EFE8\\]');

      // 3. Update DOM directly if state changed (skipping React render cycle for max smoothness)
      if (overLink !== isHoveringLink || lightSection !== isLightMode) {
        isHoveringLink = overLink;
        isLightMode = lightSection;

        if (dotRef.current) {
          if (isHoveringLink) {
            dotRef.current.style.width = "0px";
            dotRef.current.style.height = "0px";
            dotRef.current.style.opacity = "0";
          } else {
            dotRef.current.style.width = "6px";
            dotRef.current.style.height = "6px";
            dotRef.current.style.opacity = "1";
            dotRef.current.style.backgroundColor = isLightMode ? "#4E8A1A" : "#FFFFFF";
          }
        }

        if (ringRef.current) {
          if (isHoveringLink) {
            ringRef.current.style.width = "56px";
            ringRef.current.style.height = "56px";
            ringRef.current.style.borderColor = isLightMode ? "rgba(0,0,0,0.8)" : "rgba(212,255,0,0.9)";
            ringRef.current.style.backgroundColor = isLightMode ? "rgba(0,0,0,0.05)" : "rgba(212,255,0,0.08)";
          } else {
            ringRef.current.style.width = "36px";
            ringRef.current.style.height = "36px";
            ringRef.current.style.borderColor = isLightMode ? "rgba(78,138,26,0.8)" : "rgba(255,255,255,0.3)";
            ringRef.current.style.backgroundColor = isLightMode ? "rgba(78,138,26,0.15)" : "transparent";
          }
        }
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  if (isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />

      {/* Large ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-200 ease-out"
        style={{
          width: 36, height: 36,
          borderColor: "rgba(255,255,255,0.3)",
          backgroundColor: "transparent",
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
        }}
      />

      {/* Small dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-200 ease-out"
        style={{
          width: 6, height: 6,
          backgroundColor: "#FFFFFF",
          x: dx, y: ry,
          translateX: "-50%", translateY: "-50%",
        }}
      />
    </>
  );
}
