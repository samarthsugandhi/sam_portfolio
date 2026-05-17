"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const facts = [
  { label: "Degree",         value: "B.E. — Information Science" },
  { label: "CGPA",           value: "8.24 / 10.0"                },
  { label: "Hackathon Wins", value: "3 National Placements"       },
  { label: "Currently",      value: "AI Agents & Automation"      },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const bioRef     = useRef<HTMLDivElement>(null);
  const factsRef   = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, scrollTrigger: { trigger: labelRef.current, start: "top 88%" } }
      );
      if (headRef.current) {
        const lines = headRef.current.querySelectorAll(".headline-line");
        gsap.fromTo(lines,
          { y: "105%", rotate: 1 },
          { y: "0%", rotate: 0, duration: 0.9, stagger: 0.12, ease: "power4.out", scrollTrigger: { trigger: headRef.current, start: "top 82%" } }
        );
      }
      gsap.fromTo(bioRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: bioRef.current, start: "top 80%" } }
      );
      if (factsRef.current) {
        gsap.fromTo(factsRef.current.querySelectorAll(".fact-item"),
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: factsRef.current, start: "top 80%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headLines = ["Full-stack developer.", "Real systems,", "not side projects."];

  return (
    <section id="about" ref={sectionRef} className="bg-[#F2EFE8] text-[#111111] overflow-hidden dot-pattern">
      {/* Label */}
      <div ref={labelRef} className="flex items-center justify-between px-[5vw] py-5 border-b border-black/[0.08]" style={{ opacity: 0 }}>
        <span className="section-label-light">About</span>
        <span className="text-[#111111]/22 text-[10px] font-mono-custom">02</span>
      </div>

      <div className="px-[5vw] py-28 md:py-40">
        {/* Headline */}
        <div ref={headRef} className="mb-24 md:mb-32">
          {headLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <div className="headline-line" style={{ display: "block", transform: "translateY(105%)" }}>
                <h2
                  className="font-display leading-[0.9] text-[#111111] uppercase"
                  style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)" }}
                >
                  {line}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column */}
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-20 md:gap-32 border-t border-black/[0.08] pt-16 md:pt-20">
          {/* Bio */}
          <div ref={bioRef} className="space-y-8" style={{ opacity: 0 }}>
            <p className="text-[#111111]/65 text-[1.05rem] leading-[1.78]">
              I&apos;m{" "}
              <span className="text-[#111111] font-bold">Samarth Sugandhi</span>,
              a full-stack developer in my{" "}
              <span className="font-bold" style={{ color: "#4E8A1A" }}>6th semester at BEC (Information Science)</span>.
            </p>
            <p className="text-[#111111]/55 leading-[1.78] text-[0.98rem]">
              I build production-grade systems — from AI-integrated platforms to robust financial
              tools. I care about the entire stack: architecting databases, designing clean APIs,
              and crafting pixel-perfect UIs that users actually enjoy using.
            </p>
            <p className="text-[#111111]/55 leading-[1.78] text-[0.98rem]">
              Currently exploring{" "}
              <span className="font-semibold text-[#111111]">AI agents and intelligent automation</span>
              {" "}— contributing to GSSoC &amp; SSoC 2026 while integrating LLMs into real products.
            </p>
            {/* Edu chip */}
            <div className="pt-2 inline-flex items-center gap-2.5 bg-black/[0.05] border border-black/[0.08] rounded-full px-4 py-2.5 text-sm text-[#111111]/52">
              <span>🎓</span>
              <span>{personalInfo.education}</span>
            </div>
            {/* View work button */}
            <div className="pt-4">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-dark"
              >
                View Work <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Facts */}
          <div ref={factsRef}>
            {facts.map((item) => (
              <div
                key={item.label}
                className="fact-item flex items-center justify-between py-5 border-b border-black/[0.08] group"
                style={{ opacity: 0 }}
              >
                <span className="section-label-light">{item.label}</span>
                <span className="text-[#111111] font-semibold text-sm group-hover:text-[#4E8A1A] transition-colors duration-200 text-right max-w-[60%]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
