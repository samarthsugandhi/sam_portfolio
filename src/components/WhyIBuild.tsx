"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const whyIBuild = [
  {
    id: 1,
    num: "01",
    title: "AI-Powered\nWorkflows",
    desc: "I architect systems that aren't just fast, but intelligent. Integrating multi-agent logic into traditional SaaS architectures to automate complex B2B settlements and reduce manual overhead.",
    bgColor: "#000000",
    textColor: "#FFF",
    mutedColor: "rgba(255,255,255,0.55)",
    accentColor: "#D4FF00",
    scrollTo: "projects"
  },
  {
    id: 2,
    num: "02",
    title: "Production-Grade\nFull Stack",
    desc: "From Next.js frontends to resilient Node.js / PostgreSQL backends. I don't just build UI; I design scalable database schemas, implement RBAC, and handle real-time concurrency.",
    bgColor: "#0A0A0A",
    textColor: "#FFF",
    mutedColor: "rgba(255,255,255,0.55)",
    accentColor: "#D4FF00",
    scrollTo: "projects"
  },
  {
    id: 3,
    num: "03",
    title: "Pixel-Perfect\nEngineering",
    desc: "Design is engineering. I build high-contrast, performant interfaces using GSAP and Framer Motion. Every animation is intentional, and every component serves the core product experience.",
    bgColor: "#000000",
    textColor: "#FFF",
    mutedColor: "rgba(255,255,255,0.55)",
    accentColor: "#D4FF00",
    scrollTo: "projects"
  }
];

gsap.registerPlugin(ScrollTrigger);

export default function WhyIBuild() {
  const containerRef = useRef<HTMLElement>(null);
  const labelRef     = useRef<HTMLDivElement>(null);
  const blockRefs    = useRef<HTMLDivElement[]>([]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, scrollTrigger: { trigger: containerRef.current, start: "top 88%" } }
      );
      
      blockRefs.current.forEach((block) => {
        if (!block) return;
        const num   = block.querySelector(".block-num");
        const title = block.querySelector(".block-title");
        const cont  = block.querySelector(".block-content");

        gsap.fromTo(num,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, scrollTrigger: { trigger: block, start: "top 85%" } }
        );
        gsap.fromTo(title,
          { y: "105%", rotate: 0.8 },
          { y: "0%", rotate: 0, duration: 0.8, ease: "power4.out", scrollTrigger: { trigger: block, start: "top 80%" } }
        );
        gsap.fromTo(cont,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1, scrollTrigger: { trigger: block, start: "top 80%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={containerRef}>
      {/* Label */}
      <div className="bg-[#000000] border-t border-white/[0.12]">
        <div ref={labelRef} className="flex items-center justify-between px-[5vw] py-6 border-b border-white/[0.12]" style={{ opacity: 0 }}>
          <span className="section-label-dark">What I Do</span>
          <span className="text-white/25 text-[12px] font-mono-custom">03</span>
        </div>
      </div>

      {whyIBuild.map((block, i) => (
        <div
          key={block.id}
          className="relative overflow-hidden border-t border-white/[0.12]"
          style={{ backgroundColor: block.bgColor, color: block.textColor }}
        >
          {/* Accent glow */}
          <div
            className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[120px] pointer-events-none opacity-40 translate-x-1/3 -translate-y-1/3"
            style={{ background: block.accentColor }}
          />

          <div
            ref={(el) => { blockRefs.current[i] = el!; }}
            className="px-[5vw] py-28 md:py-40 grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24 items-start relative z-10"
          >
            {/* Left */}
            <div>
              <p
                className="block-num text-[12px] font-mono-custom font-bold mb-6"
                style={{ color: block.accentColor, opacity: 0 }}
              >
                {block.num}
              </p>
              <div className="overflow-hidden">
                <h2
                  className="block-title font-display leading-[0.88] uppercase whitespace-pre-line"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 7rem)",
                    display: "block",
                    transform: "translateY(105%)",
                  }}
                >
                  {block.title}
                </h2>
              </div>
            </div>

            {/* Right */}
            <div
              className="block-content flex flex-col justify-between h-full gap-12 md:pt-6"
              style={{ opacity: 0 }}
            >
              <p className="text-[1.1rem] leading-[1.82]" style={{ color: block.mutedColor }}>
                {block.desc}
              </p>
              <button
                onClick={() => scrollTo(block.scrollTo)}
                className="self-start btn-secondary"
                style={{ marginTop: "1rem" }}
              >
                See work
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
