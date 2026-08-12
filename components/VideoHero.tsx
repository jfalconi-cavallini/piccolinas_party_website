"use client";

/*
  VIDEO HERO — CINEMATIC SCROLL SECTION
  ────────────────────────────────────────

  ARCHITECTURE:
  ─ 600vh outer section gives the user scroll room.
  ─ Position: sticky inner wrapper stays pinned at the viewport.
  ─ Three chapters — each an absolute-positioned div occupying the
    same space (no stacking, no layout shift).
  ─ Chapter 0 (hero) is visible immediately — no scroll required.
  ─ Chapters are written to the DOM directly in the RAF loop (no React
    state, no re-renders at 60fps).
  ─ Each chapter uses opacity AND translateY together so the motion
    feels cinematic rather than a simple toggle.

  CHAPTER TIMING (hero-local scroll progress 0–1):
  ─ Ch0 holds fully visible until p=0.12, then ascends+fades → gone by 0.36
  ─ Ch1 fades in 0.40–0.52, holds 0.52–0.68, ascends+fades out 0.68–0.80
  ─ Brief gap at 0.36–0.40 and 0.80–0.76 shows clean video (cinematic breath)
  ─ Ch2 fades in 0.76–0.88, holds 0.88–0.95, fades out 0.95–0.99

  MOBILE: renders a static 100vh hero with CSS fade-in.
*/

import { useEffect, useRef, useState } from "react";

const SCROLL_HEIGHT_VH = 600;

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
function easeIn(t: number): number {
  return t * t * t;
}

export default function VideoHero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const ch0Ref        = useRef<HTMLDivElement>(null);
  const ch1Ref        = useRef<HTMLDivElement>(null);
  const ch2Ref        = useRef<HTMLDivElement>(null);
  const scrollIndRef  = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile]         = useState(false);
  const [staticLoaded, setStaticLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const t = setTimeout(() => setStaticLoaded(true), 80);
    return () => clearTimeout(t);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    let rafId: number;

    const tick = () => {
      const section = sectionRef.current;
      if (!section) { rafId = requestAnimationFrame(tick); return; }

      const rect      = section.getBoundingClientRect();
      const totalRoom = section.offsetHeight - window.innerHeight;
      const scrolled  = Math.max(0, Math.min(-rect.top, totalRoom));
      const p         = totalRoom > 0 ? scrolled / totalRoom : 0;

      // ── Chapter 0: hero composition ─────────────────────────────────────
      // Fully visible at p=0 (hero is "already there").
      // Holds at 100% until p=0.12, then floats up and fades by p=0.36.
      const ch0 = ch0Ref.current;
      if (ch0) {
        let op0: number, ty0: number;
        if (p <= 0.12) {
          op0 = 1; ty0 = 0;
        } else if (p >= 0.36) {
          op0 = 0; ty0 = -26;
        } else {
          op0 = easeIn(1 - (p - 0.12) / 0.24);
          ty0 = -26 * (1 - op0);
        }
        ch0.style.opacity   = String(op0);
        ch0.style.transform = `translateY(${ty0}px)`;
      }

      // ── Chapter 1: mid cinematic ─────────────────────────────────────────
      // Rises in from below at p=0.40, holds, ascends away by p=0.80.
      const ch1 = ch1Ref.current;
      if (ch1) {
        let op1: number, ty1: number;
        if (p < 0.40 || p > 0.80) {
          op1 = 0; ty1 = p < 0.40 ? 20 : -26;
        } else if (p <= 0.52) {
          op1 = easeOut((p - 0.40) / 0.12);
          ty1 = 20 * (1 - op1);
        } else if (p <= 0.68) {
          op1 = 1; ty1 = 0;
        } else {
          op1 = easeIn(1 - (p - 0.68) / 0.12);
          ty1 = -26 * (1 - op1);
        }
        ch1.style.opacity   = String(op1);
        ch1.style.transform = `translateY(${ty1}px)`;
      }

      // ── Chapter 2: closing ───────────────────────────────────────────────
      const ch2 = ch2Ref.current;
      if (ch2) {
        let op2: number, ty2: number;
        if (p < 0.76 || p > 0.99) {
          op2 = 0; ty2 = p < 0.76 ? 20 : -26;
        } else if (p <= 0.88) {
          op2 = easeOut((p - 0.76) / 0.12);
          ty2 = 20 * (1 - op2);
        } else if (p <= 0.95) {
          op2 = 1; ty2 = 0;
        } else {
          op2 = easeIn(1 - (p - 0.95) / 0.04);
          ty2 = -26 * (1 - op2);
        }
        ch2.style.opacity   = String(op2);
        ch2.style.transform = `translateY(${ty2}px)`;
      }

      // Scroll indicator — fades as soon as user starts scrolling
      if (scrollIndRef.current) {
        scrollIndRef.current.style.opacity = String(Math.max(0, 1 - p * 10));
      }

      // Gold progress bar
      if (progressRef.current) {
        progressRef.current.style.width = `${p * 100}%`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile]);

  // ── Mobile: static 100vh hero ──────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        id="hero"
        style={{
          height: "100vh",
          minHeight: 680,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/decoration1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: staticLoaded ? 0.5 : 0,
            transition: "opacity 1.4s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(8,5,2,0.6) 0%, rgba(8,5,2,0.3) 50%, rgba(8,5,2,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 32px",
            opacity: staticLoaded ? 1 : 0,
            transform: staticLoaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}
        >
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "6px", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: 28 }}>
            Est. 2005 · Merced, California
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 10vw, 5rem)", fontWeight: 300, color: "#FDF8F0", lineHeight: 1.05, marginBottom: 4 }}>
            Where Every
          </h1>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 10vw, 5rem)", fontWeight: 300, color: "#FDF8F0", lineHeight: 1.05, fontStyle: "italic", marginBottom: 36 }}>
            Dream <span style={{ color: "#C9A84C" }}>Blooms</span>
          </h1>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, fontWeight: 300, color: "rgba(253,248,240,0.75)", letterSpacing: "0.5px", maxWidth: 380, margin: "0 auto 36px", lineHeight: 1.8 }}>
            Merced's premier event design studio. Weddings, celebrations, and
            unforgettable moments crafted since 2005.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#services" style={{ display: "inline-flex", alignItems: "center", background: "#C9A84C", border: "1px solid #C9A84C", color: "#1A1A1A", fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", padding: "12px 28px", textDecoration: "none" }}>
              Explore Services
            </a>
            <a href="#gallery" style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "1px solid rgba(201,168,76,0.6)", color: "#E8D5A3", fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", padding: "12px 28px", textDecoration: "none" }}>
              View Gallery
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: 600vh cinematic scroll section ────────────────────────────
  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ height: `${SCROLL_HEIGHT_VH}vh`, position: "relative" }}
    >
      {/*
        The sticky wrapper stays pinned to the top of the viewport as
        the outer 600vh section scrolls past. Background is a very light
        tint — the video (position: fixed, z-index: -1) shows through.
        The hero-enter CSS animation fades this in on page load.
      */}
      <div
        className="hero-enter"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "rgba(4, 2, 0, 0.18)",
        }}
      >
        {/* Gold progress bar — thin accent at top of viewport */}
        <div
          ref={progressRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 1,
            width: "0%",
            background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />

        {/* Corner accents */}
        <div style={{ position: "absolute", top: 80, left: 52, width: 72, height: 72, borderTop: "1px solid rgba(201,168,76,0.35)", borderLeft: "1px solid rgba(201,168,76,0.35)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 52, right: 52, width: 72, height: 72, borderBottom: "1px solid rgba(201,168,76,0.35)", borderRight: "1px solid rgba(201,168,76,0.35)", pointerEvents: "none" }} />

        {/* Centered radial vignette — localizes darkening behind text without covering full viewport */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.52) 0%, transparent 100%)", pointerEvents: "none" }} />

        {/*
          All chapters share this same absolute-positioned container.
          Each chapter div is also absolute (inset: 0) so they all occupy
          identical space. Only opacity + translateY change — zero layout shift.
        */}
        <div style={{ position: "absolute", inset: 0 }}>

          {/* ── Chapter 0: hero — starts fully visible ── */}
          <div
            ref={ch0Ref}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 40px",
              gap: 0,
              opacity: 1,
              willChange: "opacity, transform",
            }}
          >
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "6px", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: 32, textShadow: "0 1px 14px rgba(0,0,0,0.95)" }}>
              Est. 2005 · Merced, California
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.8rem, 8vw, 7.5rem)", fontWeight: 300, color: "#FDF8F0", lineHeight: 1.0, marginBottom: 2, textShadow: "0 2px 28px rgba(0,0,0,0.8)" }}>
              Where Every
            </h1>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.8rem, 8vw, 7.5rem)", fontWeight: 300, color: "#FDF8F0", lineHeight: 1.0, fontStyle: "italic", marginBottom: 36, textShadow: "0 2px 28px rgba(0,0,0,0.8)" }}>
              Dream <span style={{ color: "#C9A84C" }}>Blooms</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 40 }}>
              <div style={{ height: 1, width: 52, background: "rgba(201,168,76,0.5)" }} />
              <div style={{ width: 5, height: 5, background: "#C9A84C", transform: "rotate(45deg)" }} />
              <div style={{ height: 1, width: 52, background: "rgba(201,168,76,0.5)" }} />
            </div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 15, fontWeight: 300, color: "rgba(253,248,240,0.90)", letterSpacing: "0.5px", maxWidth: 460, margin: "0 0 44px", lineHeight: 1.85, textShadow: "0 1px 16px rgba(0,0,0,0.9)" }}>
              Merced's most distinguished event design studio. Weddings, celebrations,
              and unforgettable moments — crafted with passion since 2005.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#services" style={{ display: "inline-flex", alignItems: "center", background: "#C9A84C", border: "1px solid #C9A84C", color: "#1A1A1A", fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", padding: "14px 36px", textDecoration: "none", transition: "background 0.3s ease" }}>
                Explore Our Services
              </a>
              <a href="#gallery" style={{ display: "inline-flex", alignItems: "center", background: "rgba(0,0,0,0.25)", backdropFilter: "blur(6px)", border: "1px solid rgba(201,168,76,0.75)", color: "#E8D5A3", fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", padding: "14px 36px", textDecoration: "none", transition: "border-color 0.3s ease" }}>
                View Gallery
              </a>
            </div>
          </div>

          {/* ── Chapter 1: mid ── */}
          <div
            ref={ch1Ref}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 40px",
              opacity: 0,
              transform: "translateY(20px)",
              willChange: "opacity, transform",
            }}
          >
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: 28, textShadow: "0 1px 14px rgba(0,0,0,0.95)" }}>
              Handcrafted · Elegant · Unforgettable
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 300, color: "#FDF8F0", lineHeight: 1.1, marginBottom: 2, textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}>
              Every Detail
            </h2>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 300, color: "#C9A84C", lineHeight: 1.1, fontStyle: "italic", textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}>
              Tells Your Story
            </h2>
          </div>

          {/* ── Chapter 2: closing ── */}
          <div
            ref={ch2Ref}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 40px",
              opacity: 0,
              transform: "translateY(20px)",
              willChange: "opacity, transform",
            }}
          >
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: "#C9A84C", display: "block", marginBottom: 28, textShadow: "0 1px 14px rgba(0,0,0,0.95)" }}>
              500+ Events · 20+ Years of Excellence
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 300, color: "#FDF8F0", lineHeight: 1.1, marginBottom: 2, textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}>
              Begin Your
            </h2>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 300, color: "#C9A84C", lineHeight: 1.1, fontStyle: "italic", marginBottom: 44, textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}>
              Journey With Us
            </h2>
            <a href="#story" style={{ display: "inline-flex", alignItems: "center", background: "#C9A84C", border: "1px solid #C9A84C", color: "#1A1A1A", fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", padding: "14px 40px", textDecoration: "none" }}>
              Discover Our Story
            </a>
          </div>
        </div>

        {/* Scroll indicator — fades away as soon as scrolling begins */}
        <div
          ref={scrollIndRef}
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            pointerEvents: "none",
          }}
        >
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "4px", color: "rgba(201,168,76,0.85)", textTransform: "uppercase", textShadow: "0 1px 10px rgba(0,0,0,1)" }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)", animation: "videoPulse 2.2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes videoPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(0.85); }
          50%       { opacity: 0.9;  transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
