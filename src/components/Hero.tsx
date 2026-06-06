"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headRef      = useRef<HTMLDivElement>(null);
  const infoRef      = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    // Subtle parallax
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal headline
      if (headRef.current) {
        const lines = headRef.current.querySelectorAll(".hero-line");
        gsap.fromTo(lines,
          { y: "110%", rotate: 2 },
          { y: "0%", rotate: 0, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.1 }
        );
      }
      
      // Reveal info
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 1 }
      );

      // Reveal buttons
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={onMove}
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden grid-lines-dark bg-[#000000]"
      style={{
        backgroundPosition: `${mousePos.x * 0.5}px ${mousePos.y * 0.5}px`
      }}
    >
      {/* Heavy glow behind text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[140px] pointer-events-none opacity-40 transition-transform duration-100 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(212,255,0,0.15) 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${mousePos.x * 1.5}px), calc(-50% + ${mousePos.y * 1.5}px))`
        }}
      />

      <div className="px-6 md:px-10 lg:px-[8vw] relative z-10 w-full mb-16 md:mb-24">
        {/* Info header */}
        <div ref={infoRef} className="flex items-center gap-4 mb-10 md:mb-14" style={{ opacity: 0 }}>
          <div className="w-2.5 h-2.5 bg-[#D4FF00] animate-pulse" />
          <p className="text-white/60 text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-mono-custom font-bold">
            Samarth Sugandhi
            <span className="mx-3 text-white/20">|</span>
            Creative Developer
          </p>
        </div>

        {/* Headline */}
        <div ref={headRef} className="space-y-0">
          {[
            { text: "Building", color: "#FFF" },
            { text: "Production", color: "#FFF" },
            { text: "Ready Systems", color: "#D4FF00" },
          ].map((line, i) => (
            <div key={i} className="overflow-hidden py-1">
              <h1
                className="hero-line font-display leading-[0.85] uppercase block tracking-tight hover:scale-[1.01] transition-transform duration-500 origin-left"
                style={{
                  fontSize: "clamp(4.5rem, 15vw, 12rem)",
                  color: line.color,
                  transform: "translateY(110%)",
                }}
              >
                {line.text}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        className="absolute bottom-16 md:bottom-24 left-0 right-0 px-6 md:px-10 lg:px-[8vw] flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        style={{ opacity: 0 }}
      >
        <div className="flex gap-4">
          <button onClick={() => scrollTo("projects")} className="btn-primary">
            Explore Work
          </button>
          <button onClick={() => scrollTo("why")} className="btn-secondary hidden md:inline-flex">
            About Me
          </button>
        </div>
        
        <div className="text-white/20 text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-mono-custom max-w-[240px] md:text-right">
          Engineering scalable web apps &amp; intelligent AI agents.
        </div>
      </div>
    </section>
  );
}
