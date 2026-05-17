"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const rowsRef     = useRef<HTMLDivElement[]>([]);
  const [hovered, setHovered]   = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (previewRef.current) {
      gsap.to(previewRef.current, { left: e.clientX + 28, top: e.clientY - 115, duration: 0.18, ease: "power2.out" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: "top 88%" } }
      );
      if (headRef.current) {
        const lines = headRef.current.querySelectorAll(".head-line");
        gsap.fromTo(lines,
          { y: "105%", rotate: 0.8 },
          { y: "0%", rotate: 0, duration: 0.95, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: headRef.current, start: "top 82%" } }
        );
      }
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(row,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: i * 0.04, scrollTrigger: { trigger: row, start: "top 88%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!previewRef.current) return;
    if (hovered !== null) {
      gsap.to(previewRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 0.22, ease: "power2.out" });
    } else {
      gsap.to(previewRef.current, { opacity: 0, scale: 0.9, duration: 0.18, ease: "power2.in" });
    }
  }, [hovered]);

  const hoveredProject = projects.find(p => p.id === hovered);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#000000] overflow-hidden border-t border-white/[0.12]"
      onMouseMove={onMove}
    >
      {/* Label */}
      <div ref={labelRef} className="flex items-center justify-between px-[5vw] py-6 border-b border-white/[0.12]" style={{ opacity: 0 }}>
        <span className="section-label-dark">Selected Works</span>
        <span className="text-white/25 text-[12px] font-mono-custom">05</span>
      </div>

      {/* Headline */}
      <div ref={headRef} className="px-[5vw] pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="overflow-hidden">
          <h2
            className="head-line font-display text-[#EFEFEF] uppercase leading-none block"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)", transform: "translateY(105%)" }}
          >
            Selected
          </h2>
        </div>
        <div className="overflow-hidden">
          <h2
            className="head-line font-display uppercase leading-none block"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              transform: "translateY(105%)",
              WebkitTextStroke: "2px #D4FF00",
              color: "transparent",
            }}
          >
            Works
          </h2>
        </div>
      </div>

      {/* Project rows */}
      <div className="border-t border-white/[0.12]">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { rowsRef.current[i] = el!; }}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            className="group flex flex-col md:flex-row md:items-center gap-4 px-[5vw] py-12 md:py-16 border-b border-white/[0.12] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer"
            style={{ opacity: 0 }}
          >
            {/* Index */}
            <span className="text-white/12 text-[10px] font-mono-custom md:min-w-[2.2rem] flex-shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Name */}
            <div className="flex-1 md:mx-6">
              <h3
                className="font-display text-white uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-400"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4.2rem)", lineHeight: 1 }}
              >
                {project.name}
              </h3>
              {project.award && (
                <span className="inline-block mt-2 text-[#D4FF00] text-[10px] uppercase tracking-widest font-bold font-mono-custom">
                  ↑ {project.award}
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="md:text-right space-y-1.5 flex-shrink-0 min-w-[180px]">
              <p className="text-white/30 text-[10px] uppercase tracking-[0.14em] font-mono-custom">
                {project.category}
              </p>
              <div className="flex md:justify-end flex-wrap gap-3">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-white/18 text-[10px] font-mono-custom">{t}</span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <a
              href={project.live !== "#" ? project.live : project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 md:ml-6 w-12 h-12 rounded-none border-2 border-white/[0.15] flex items-center justify-center text-white/30 group-hover:text-[#000] group-hover:border-[#D4FF00] group-hover:bg-[#D4FF00] transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={16} />
            </a>
          </div>
        ))}
      </div>

      {/* Floating preview */}
      <div
        ref={previewRef}
        className="hidden md:block fixed pointer-events-none z-[200] w-[320px] h-[200px] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.1]"
        style={{ opacity: 0, scale: 0.9, left: mousePos.x + 28, top: mousePos.y - 115 }}
      >
        {hoveredProject && (
          <div className={`w-full h-full bg-gradient-to-br ${hoveredProject.gradient} flex flex-col items-start justify-end p-6 relative`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10">
              <p className="font-display text-[2.1rem] text-white uppercase leading-none mb-1">
                {hoveredProject.name}
              </p>
              <p className="text-white/45 text-[9px] uppercase tracking-widest font-mono-custom">
                {hoveredProject.category}
              </p>
              {hoveredProject.award && (
                <p className="text-[#C8FF57] text-[9px] uppercase tracking-widest font-mono-custom mt-1">
                  {hoveredProject.award}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
