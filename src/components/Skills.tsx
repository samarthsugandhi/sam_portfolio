"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const rowRefs    = useRef<HTMLDivElement[]>([]);
  const tagsRef    = useRef<Record<number, HTMLDivElement | null>>({});
  const [open, setOpen] = useState<number>(0);

  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: "top 88%" } }
      );
      if (headRef.current) {
        gsap.fromTo(headRef.current.querySelector(".head-text"),
          { y: "105%", rotate: 0.8 },
          { y: "0%", rotate: 0, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: headRef.current, start: "top 82%" } }
        );
      }
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.55, ease: "power2.out", delay: i * 0.06, scrollTrigger: { trigger: row, start: "top 88%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open >= 0 && tagsRef.current[open]) {
      const tags = tagsRef.current[open]!.querySelectorAll(".skill-tag");
      gsap.fromTo(tags,
        { opacity: 0, y: 10, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" }
      );
    }
  }, [open]);

  return (
    <section id="skills" ref={sectionRef} className="bg-[#F4F4F0] text-[#000] overflow-hidden dot-pattern">
      {/* Label */}
      <div ref={labelRef} className="flex items-center justify-between px-[5vw] py-5 border-b border-black/[0.08]" style={{ opacity: 0 }}>
        <span className="section-label-light">Stack</span>
        <span className="text-[#111111]/22 text-[10px] font-mono-custom">06</span>
      </div>

      <div className="px-[5vw] py-28 md:py-40">
        {/* Headline */}
        <div ref={headRef} className="overflow-hidden mb-20 md:mb-24">
          <h2
            className="head-text font-display text-[#111111] uppercase leading-none block"
            style={{ fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)", transform: "translateY(105%)" }}
          >
            Tools I build with.
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-t border-black/[0.08]">
          {skills.map((group, i) => (
            <div
              key={group.category}
              ref={(el) => { rowRefs.current[i] = el!; }}
              className="border-b border-black/[0.08]"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-8 md:py-10 group text-left"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="text-[#111111]/22 font-mono-custom text-[10px] min-w-[2rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display text-[#111111] uppercase group-hover:translate-x-2 transition-transform duration-300"
                    style={{ fontSize: "clamp(1.7rem, 4.5vw, 3.8rem)", lineHeight: 1 }}
                  >
                    {group.category}
                  </span>
                </div>
                {/* Plus/minus toggle */}
                <span
                  className="text-lg font-light leading-none flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    background: open === i ? "rgba(212,255,0,0.2)" : "transparent",
                    borderColor: open === i ? "rgba(212,255,0,0.8)" : "rgba(0,0,0,0.15)",
                    color: open === i ? "#000" : "rgba(0,0,0,0.4)",
                    transition: "transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                  }}
                >
                  +
                </span>
              </button>

              {/* Tags */}
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{ maxHeight: open === i ? "320px" : "0px" }}
              >
                <div
                  ref={(el) => { tagsRef.current[i] = el; }}
                  className="flex flex-wrap gap-2.5 pb-8 pl-[calc(2rem+1.5rem+1.5rem)] md:pl-[calc(2rem+2.5rem+2.5rem)]"
                >
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag px-5 py-2.5 rounded-none border-2 border-black/[0.15] text-[#000]/70 text-[0.85rem] hover:border-[#000] hover:text-[#000] hover:bg-[#D4FF00] transition-all duration-200 cursor-default font-bold uppercase tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
