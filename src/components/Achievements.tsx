"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const statsRow = [
  { v: "3+",  l: "Hackathons"    },
  { v: "24h", l: "Sprint Record" },
  { v: "2×",  l: "Open Source"   },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: "top 88%" } }
      );
      if (headRef.current) {
        gsap.fromTo(headRef.current.querySelector(".head-text"),
          { y: "105%", rotate: 1 },
          { y: "0%", rotate: 0, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: headRef.current, start: "top 82%" } }
        );
      }
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, scrollTrigger: { trigger: subRef.current, start: "top 82%" } }
      );
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll(".stat-block"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: statsRef.current, start: "top 82%" } }
        );
      }
      if (listRef.current) {
        gsap.fromTo(listRef.current.querySelectorAll(".achievement-item"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: listRef.current, start: "top 80%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="bg-[#000000] border-t border-white/[0.12] overflow-hidden"
    >
      {/* Label */}
      <div ref={labelRef} className="flex items-center justify-between px-6 md:px-10 lg:px-[8vw] py-6 border-b border-white/[0.12]" style={{ opacity: 0 }}>
        <span className="section-label-dark">Achievements</span>
        <span className="text-white/25 text-[12px] font-mono-custom">07</span>
      </div>

      <div className="px-6 md:px-10 lg:px-[8vw] py-28 md:py-40 grid md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24 items-start">

        {/* ── Left ─────────────────────────────────────────── */}
        <div className="sticky top-28">
          <div ref={headRef} className="overflow-hidden mb-12">
            <h2
              className="head-text font-display text-white uppercase leading-[0.88]"
              style={{ fontSize: "clamp(3rem, 8.5vw, 7.5rem)", display: "block", transform: "translateY(105%)" }}
            >
              Wins That<br />Matter.
            </h2>
          </div>

          <p ref={subRef} className="text-white/38 text-[0.95rem] leading-[1.78] max-w-[260px] mb-20" style={{ opacity: 0 }}>
            Results from competing and building under real-time pressure — against real teams, on real problems.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex gap-8 pt-10 border-t border-white/[0.12]">
            {statsRow.map((s) => (
              <div key={s.l} className="stat-block" style={{ opacity: 0 }}>
                <p className="font-display text-[3.2rem] text-[#D4FF00] leading-none">{s.v}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.14em] mt-1.5 font-mono-custom">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right (Blocks) ───────────────────────────────── */}
        <div ref={listRef} className="flex flex-col gap-6 md:gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="achievement-item group bg-[#0A0A0A] border border-white/[0.12] p-8 md:p-10 transition-colors duration-300 hover:bg-[#111111] relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, rgba(212,255,0,0.04) 0%, transparent 60%)` }}
              />
              
              <div className="flex items-start gap-6 relative z-10">
                <span className="text-3xl flex-shrink-0 mt-1">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-white/25 text-[12px] font-mono-custom bg-white/[0.05] px-3 py-1 border border-white/[0.08]">{item.year}</span>
                    {item.highlight && (
                      <span className="text-[#000] text-[10px] uppercase tracking-[0.2em] font-bold bg-[#D4FF00] px-3 py-1">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-display text-white uppercase leading-none group-hover:text-[#D4FF00] transition-colors duration-300"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[#D4FF00] text-[11px] uppercase tracking-[0.2em] mt-3 font-mono-custom font-bold">
                    {item.subtitle}
                  </p>
                  <p className="text-white/55 text-[1rem] leading-[1.8] mt-5">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
