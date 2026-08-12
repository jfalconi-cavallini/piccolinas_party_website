"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const images = Array.from({ length: 15 }, (_, i) => `/images/decoration${i + 1}.jpg`);

export default function Gallery() {
  const revealRef = useReveal<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, close, prev, next]);

  return (
    <section id="gallery" style={{ padding: "120px 40px", background: "rgba(4,3,1,0.45)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div ref={revealRef} data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title" style={{ marginBottom: 16, color: "#FDF8F0" }}>
            A Glimpse of <em style={{ color: "#C9A84C" }}>Our Work</em>
          </h2>
          <p className="section-subtitle" style={{ color: "rgba(253,248,240,0.65)" }}>
            Every event tells a story. Here are some of the beautiful
            chapters we've had the honour of writing together.
          </p>
        </div>

        {/* Section divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 52 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
          <div style={{ width: 5, height: 5, background: "#C9A84C", transform: "rotate(45deg)", flexShrink: 0 }} />
          <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.2)" }} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "240px",
            gap: 8,
          }}
          className="gallery-grid"
        >
          {images.map((src, i) => {
            const isWide = i === 0 || i === 5 || i === 10;
            const isTall = i === 3 || i === 8;
            return (
              <div
                key={src}
                className="gallery-item"
                onClick={() => setActiveIndex(i)}
                style={{
                  gridColumn: isWide ? "span 2" : "span 1",
                  gridRow: isTall ? "span 2" : "span 1",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={src}
                  alt={`Decoration ${i + 1}`}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 60%)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  }}
                  className="gallery-overlay"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    width: 32,
                    height: 32,
                    border: "1px solid rgba(201,168,76,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    zIndex: 2,
                  }}
                  className="gallery-zoom"
                >
                  <span style={{ color: "#C9A84C", fontSize: 18, lineHeight: 1 }}>+</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,26,26,0.96)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: 30,
              right: 40,
              background: "none",
              border: "1px solid rgba(201,168,76,0.5)",
              color: "#C9A84C",
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              letterSpacing: "2px",
              padding: "8px 16px",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            Close
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: 24,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#C9A84C",
              width: 48,
              height: 48,
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#C9A84C",
              width: 48,
              height: 48,
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
            aria-label="Next"
          >
            ›
          </button>

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 900,
              maxHeight: "80vh",
              aspectRatio: "4/3",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt="Gallery"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Cinzel', serif",
              fontSize: 10,
              letterSpacing: "2px",
              color: "rgba(201,168,76,0.6)",
            }}
          >
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}

      <style>{`
        .gallery-item:hover img { transform: scale(1.08); }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover .gallery-zoom { opacity: 1 !important; }
        @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .gallery-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
