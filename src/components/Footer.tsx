"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef    = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLParagraphElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);
  const marqueeRef   = useRef<HTMLDivElement>(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(watermarkRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.4, ease: "power2.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: bottomRef.current, start: "top 95%" },
        }
      );
      gsap.fromTo(marqueeRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: marqueeRef.current, start: "top 92%" },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#000] border-t border-white/[0.12] overflow-hidden">

      {/* ── Giant ghost watermark ────────────────────────────── */}
      <div className="px-[2vw] pt-12 pb-0 select-none overflow-hidden">
        <p
          ref={watermarkRef}
          className="font-display leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(5rem, 22vw, 22rem)",
            color: "transparent",
            WebkitTextStroke: "2px rgba(212,255,0,0.5)",
            opacity: 0,
          }}
        >
          SAMARTH
        </p>
      </div>

      {/* ── Scrolling marquee ─────────────────────────────────── */}
      <div
        ref={marqueeRef}
        className="border-t border-white/[0.05] overflow-hidden py-5"
        style={{ opacity: 0 }}
      >
        <div className="marquee-track flex gap-10 whitespace-nowrap" style={{ width: "max-content" }}>
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="text-[#D4FF00] text-[13px] uppercase tracking-[0.32em] font-mono-custom flex-shrink-0 font-bold">
              Full Stack Developer &nbsp;·&nbsp; AI &amp; Automation &nbsp;·&nbsp; Open Source &nbsp;·&nbsp; Systems Design &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div
        ref={bottomRef}
        className="px-6 md:px-10 lg:px-[8vw] py-10 border-t border-white/[0.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        style={{ opacity: 0 }}
      >
        {/* Email + location */}
        <div className="space-y-2">
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-white hover:text-[#D4FF00] transition-colors duration-300 text-[16px] md:text-[20px] font-mono-custom block font-bold"
          >
            {personalInfo.email}
          </a>
          <p className="text-white/40 text-[12px] font-mono-custom tracking-widest uppercase">Available for new opportunities</p>
        </div>

        {/* Socials + back to top */}
        <div className="flex flex-wrap items-center gap-6 md:gap-10 text-white/40 text-[12px] uppercase tracking-[0.2em] font-bold">
          <a
            href={personalInfo.github}
            target="_blank" rel="noopener noreferrer"
            className="hover:text-[#D4FF00] transition-colors duration-200 flex items-center gap-2"
          >
            GitHub <ArrowUpRight size={12} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank" rel="noopener noreferrer"
            className="hover:text-[#D4FF00] transition-colors duration-200 flex items-center gap-2"
          >
            LinkedIn <ArrowUpRight size={12} />
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 border-2 border-white/[0.3] hover:border-[#D4FF00] hover:text-[#000] hover:bg-[#D4FF00] rounded-none px-6 py-3 transition-all duration-300 font-mono-custom text-[12px] ml-auto md:ml-0"
          >
            ↑ Top
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-6 md:px-10 lg:px-[8vw] pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-white/20 text-[11px] font-mono-custom uppercase tracking-widest">
          ©{new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
        </p>
        <p className="text-white/20 text-[11px] font-mono-custom uppercase tracking-widest">
          Built with Next.js &amp; GSAP
        </p>
      </div>
    </footer>
  );
}
