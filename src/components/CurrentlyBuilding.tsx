"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const areas = [
  {
    label: "AI Agents",
    tag: "Exploring",
    desc: "Autonomous LLM-powered workflows that navigate interfaces and execute complex multi-step logic.",
    icon: "⚡",
    accent: "#D4FF00",
  },
  {
    label: "Open Source",
    tag: "Active — GSSoC & SSoC 2026",
    desc: "Contributing to production-grade open source AI & agent projects alongside developers globally.",
    icon: "🌐",
    accent: "#D4FF00",
  },
  {
    label: "Scalable Web Apps",
    tag: "Shipping",
    desc: "High-performance backends paired with real-time, production-grade frontends that actually scale.",
    icon: "🚀",
    accent: "#D4FF00",
  },
];

export default function CurrentlyBuilding() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
      gsap.fromTo(tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } }
      );
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        // Advanced 3D reveal
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateX: 15, scale: 0.9 },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.9, ease: "power3.out", delay: i * 0.15, scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section ref={sectionRef} id="currently-building" className="bg-[#000000] border-t border-white/[0.12] pt-12 pb-20 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      {/* Label */}
      <div ref={labelRef} className="flex items-center justify-between px-[5vw] py-6 border-b border-white/[0.12]" style={{ opacity: 0 }}>
        <span className="section-label-dark">Currently</span>
        <span className="text-white/25 text-[12px] font-mono-custom">04</span>
      </div>

      <div className="px-[5vw] py-28 md:py-40">
        {/* Status tag */}
        <div ref={tagRef} className="flex items-center gap-3 mb-24" style={{ opacity: 0 }}>
          <span className="w-2.5 h-2.5 bg-[#D4FF00] animate-pulse flex-shrink-0" />
          <span className="text-[#D4FF00] text-[13px] uppercase tracking-[0.2em] font-bold font-mono-custom">
            Currently Building & Contributing
          </span>
        </div>

        {/* Cards - Separated with 3D hover effects */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 perspective-[1000px]">
          {areas.map((area, i) => (
            <div
              key={area.label}
              ref={(el) => { cardsRef.current[i] = el!; }}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              className="bg-[#0A0A0A] border border-white/[0.15] p-10 md:p-14 hover:bg-[#111111] transition-all duration-500 group relative overflow-hidden transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,255,0,0.05)] cursor-default"
              style={{ opacity: 0, transformStyle: "preserve-3d" }}
            >
              {/* Flashlight hover effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${area.accent}15, transparent 40%)`
                }}
              />
              <span className="text-4xl block mb-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 origin-left">{area.icon}</span>
              <span className="text-white/20 text-[12px] font-mono-custom block mb-4">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="inline-block text-[11px] uppercase tracking-[0.2em] font-bold border border-white/[0.12] px-4 py-2 mb-8"
              >
                {area.tag}
              </span>
              <h4
                className="font-display text-[2.2rem] md:text-[2.8rem] text-white uppercase leading-[0.9] mb-6 transition-colors duration-300"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = area.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFF"; }}
              >
                {area.label}
              </h4>
              <p className="text-white/55 text-[1.05rem] leading-[1.8]">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
