"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const linksRef   = useRef<HTMLDivElement>(null);

  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700));
    window.location.href = `mailto:${personalInfo.email}?subject=Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`;
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: "top 88%" } }
      );
      if (headRef.current) {
        const lines = headRef.current.querySelectorAll(".contact-headline");
        gsap.fromTo(lines,
          { y: "105%", rotate: 0.8 },
          { y: "0%", rotate: 0, duration: 0.9, stagger: 0.12, ease: "power4.out", scrollTrigger: { trigger: headRef.current, start: "top 82%" } }
        );
      }
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, scrollTrigger: { trigger: ctaRef.current, start: "top 80%" } }
      );
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: formRef.current, start: "top 84%" } }
      );
      gsap.fromTo(linksRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, scrollTrigger: { trigger: linksRef.current, start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="overflow-hidden">

      {/* ── Dark CTA block ─────────────────────────────────── */}
      <div className="bg-[#000000] border-t border-white/[0.12]">
        <div ref={labelRef} className="flex items-center justify-between px-[5vw] py-5 border-b border-white/[0.07]" style={{ opacity: 0 }}>
          <span className="section-label-dark">Contact</span>
          <span className="text-white/18 text-[10px] font-mono-custom">08</span>
        </div>

        <div className="px-[5vw] py-28 md:py-40 grid md:grid-cols-2 gap-20 md:gap-28 items-end">
          {/* Headline */}
          <div ref={headRef}>
            <div className="overflow-hidden">
              <h2
                className="contact-headline font-display text-white uppercase leading-[0.88]"
                style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)", display: "block", transform: "translateY(105%)" }}
              >
                Ready to build
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="contact-headline font-display text-[#D4FF00] uppercase leading-[0.88]"
                style={{ fontSize: "clamp(2.8rem, 7.5vw, 7rem)", display: "block", transform: "translateY(105%)" }}
              >
                something real?
              </h2>
            </div>
          </div>

          {/* CTA side */}
          <div ref={ctaRef} className="space-y-8" style={{ opacity: 0 }}>
            <p className="text-white/42 text-[1.05rem] leading-[1.78] max-w-sm">
              Clear engineering, focused strategy — working together as one system to ship products that actually matter.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href={`mailto:${personalInfo.email}`} className="btn-primary">
                Let&apos;s talk <ArrowUpRight size={14} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn <ArrowUpRight size={13} />
              </a>
            </div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-white/25 hover:text-[#D4FF00] transition-colors text-sm font-mono-custom link-underline block"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* ── Social links bar ───────────────────────────────── */}
      <div className="bg-[#F4F4F0] border-t border-black/[0.12]">
        <div ref={linksRef} className="px-[5vw] py-7 flex flex-wrap items-center justify-between gap-4" style={{ opacity: 0 }}>
          <p className="text-[#111111]/40 text-sm">Connect with me</p>
          <div className="flex flex-wrap items-center gap-6">
            {[
              { label: "GitHub",    href: personalInfo.github    },
              { label: "LinkedIn",  href: personalInfo.linkedin  },
              { label: "Portfolio", href: "https://samarth-sugandhi-portfolio.vercel.app" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#111111]/40 hover:text-[#000] transition-colors text-[11px] uppercase tracking-widest font-bold"
              >
                {l.label} <ArrowUpRight size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact form ────────────────────────────────────── */}
      <div className="bg-[#F4F4F0] px-[5vw] py-28 md:py-40 border-t border-black/[0.12]">
        <div ref={formRef} className="max-w-2xl" style={{ opacity: 0 }}>
          <div className="overflow-hidden mb-16 md:mb-20">
            <h3
              className="font-display text-[#111111] uppercase leading-none"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Or send a message.
            </h3>
          </div>

          <form onSubmit={onSubmit} className="space-y-10">
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-[10px] font-bold text-[#111111]/32 uppercase tracking-[0.18em] mb-3 font-mono-custom"
                >
                  {field === "name" ? "Your Name" : "Email Address"} *
                </label>
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={onChange}
                  required
                  className="w-full border-b-2 border-black/[0.1] bg-transparent py-3.5 focus:outline-none focus:border-[#000] text-[#111111] text-[1.05rem] transition-colors duration-300 placeholder:text-[#111111]/20 rounded-none"
                  placeholder={field === "name" ? "Samarth Sugandhi" : "hello@example.com"}
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-[10px] font-bold text-[#111111]/32 uppercase tracking-[0.18em] mb-3 font-mono-custom"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                required
                className="w-full border-b-2 border-black/[0.1] bg-transparent py-3.5 focus:outline-none focus:border-[#4E8A1A] text-[#111111] text-[1.05rem] transition-colors duration-300 resize-none placeholder:text-[#111111]/20"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="btn-dark mt-4"
              style={{ width: "100%" }}
            >
              {status === "success" ? <CheckCircle2 size={15} /> : <Send size={15} />}
              {status === "sending" ? "Opening client…" : status === "success" ? "Message ready ✓" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
