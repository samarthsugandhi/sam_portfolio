"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { id: "hero",         label: "Home",       num: "01" },
  { id: "about",        label: "About",       num: "02" },
  { id: "projects",     label: "Projects",    num: "03" },
  { id: "skills",       label: "Stack",       num: "04" },
  { id: "achievements", label: "Achievements", num: "05" },
  { id: "contact",      label: "Contact",     num: "06" },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(true);
  const [time,     setTime]     = useState("");
  const lastY      = useRef(0);
  const navRef     = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef   = useRef<HTMLLIElement[]>([]);

  /* Live time */
  useEffect(() => {
    const tick = () => setTime(
      new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* Scroll logic */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setVisible(y < 80 || y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Entrance animation */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  /* Scroll-hide */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, { y: visible ? 0 : -90, opacity: visible ? 1 : 0, duration: 0.38, ease: "power2.out" });
  }, [visible]);

  /* Overlay GSAP */
  useEffect(() => {
    if (!overlayRef.current) return;
    const overlay = overlayRef.current;
    const links   = linksRef.current.filter(Boolean);

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex", clipPath: "inset(0 0 100% 0)" });
      gsap.to(overlay,  { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power4.inOut" });
      gsap.fromTo(links,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power4.inOut",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      open ? 620 : 0
    );
  };

  return (
    <>
      {/* ── Floating navbar ───────────────────────────────────── */}
      <nav
        ref={navRef}
        className={[
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-[8vw] transition-all duration-300",
          scrolled ? "navbar-glass h-[64px]" : "h-[72px]",
        ].join(" ")}
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <button
          onClick={() => go("hero")}
          className="font-display text-[1.25rem] tracking-[0.18em] text-white uppercase select-none group"
        >
          Samarth<span className="text-[#C8FF57] group-hover:opacity-70 transition-opacity">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.slice(1, -1).map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className="text-white/45 hover:text-white text-[11px] uppercase tracking-[0.16em] font-semibold transition-colors duration-200 link-underline"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:samarthsugandhi04@gmail.com"
            className="hidden md:inline-flex btn-secondary"
            style={{ padding: "10px 24px", fontSize: "11px", borderWidth: "1.5px" }}
          >
            Hire me
          </a>
          <button
            onClick={() => setOpen(true)}
            className="btn-primary"
            style={{ padding: "10px 24px", fontSize: "11px", borderWidth: "1.5px", gap: "8px" }}
          >
            <span className="w-1.5 h-1.5 bg-[#000] animate-pulse" />
            Menu
          </button>
        </div>
      </nav>

      {/* ── Full-screen overlay ───────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-[#05050A] flex-col justify-between px-[6vw] py-6"
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
      >
        {/* Top */}
        <div className="flex justify-between items-center border-b border-white/[0.06] pb-6">
          <span className="font-display text-lg tracking-widest text-white uppercase">
            Samarth<span className="text-[#C8FF57]">.</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-[0.18em] font-bold group"
          >
            Close
            <span className="w-9 h-9 rounded-full border border-white/[0.15] flex items-center justify-center group-hover:border-[#C8FF57]/50 group-hover:text-[#C8FF57] transition-all text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center py-6">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li
                key={link.id}
                ref={(el) => { linksRef.current[i] = el!; }}
                className="overflow-hidden border-b border-white/[0.05]"
                style={{ opacity: 0, transform: "translateY(80px)" }}
              >
                <button
                  onClick={() => go(link.id)}
                  className="flex items-baseline gap-6 md:gap-8 py-4 group w-full text-left"
                >
                  <span className="text-white/16 text-[10px] font-mono-custom min-w-[28px]">{link.num}</span>
                  <span className="font-display text-[13vw] md:text-[8vw] text-white/10 group-hover:text-white transition-colors duration-300 leading-[1.05] uppercase tracking-tight">
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer row */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white/22 text-[10px] uppercase tracking-widest">
          <div className="space-y-1.5">
            <p className="font-mono-custom">India — {time}</p>
            <a href="mailto:samarthsugandhi04@gmail.com" className="hover:text-[#C8FF57] transition-colors font-mono-custom">
              samarthsugandhi04@gmail.com
            </a>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/samarthsugandhi" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8FF57] transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/samarth-sugandhi-0082a32bb" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8FF57] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  );
}
