"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const categories = [
  {
    title: "Tables",
    subtitle: "Banquet, Round & Cocktail",
    description:
      "A full range of banquet, round, and cocktail tables — available in multiple sizes to accommodate any guest count, styled to complement your event décor.",
    image: "/images/decoration1.jpg",
  },
  {
    title: "Chairs",
    subtitle: "Chiavari, Cross-Back & Folding",
    description:
      "Elegant Chiavari, cross-back, and padded folding chairs styled to match your palette — available individually or as complete table-and-chair packages.",
    image: "/images/decoration6.jpg",
  },
  {
    title: "Coolers",
    subtitle: "Commercial Grade",
    description:
      "Commercial-grade beverage coolers to keep drinks perfectly chilled throughout your event — no matter the size or duration of the celebration.",
    image: "/images/decoration9.jpg",
  },
  {
    title: "Heaters",
    subtitle: "Patio & Propane",
    description:
      "Patio and propane heaters ensuring guest comfort during evening and outdoor celebrations — so the party never has to end when the temperature drops.",
    image: "/images/decoration13.jpg",
  },
  {
    title: "Tents & Canopies",
    subtitle: "Frame & Pole Configurations",
    description:
      "Frame and pole tents in multiple configurations — creating sheltered, elegant spaces for any outdoor event, rain or shine.",
    image: "/images/decoration14.jpg",
  },
];

export default function Rentals() {
  const headerRef  = useReveal<HTMLDivElement>();
  const topRef     = useReveal<HTMLDivElement>();
  const bottomRef  = useReveal<HTMLDivElement>();

  return (
    <section
      id="rentals"
      style={{
        padding: "120px 0 140px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(6,4,2,0.76) 5%, rgba(6,4,2,0.76) 95%, rgba(0,0,0,0) 100%)",
      }}
    >
      {/* ── Header ── */}
      <div
        ref={headerRef}
        data-reveal
        style={{ textAlign: "center", padding: "0 40px", marginBottom: 72 }}
      >
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 11,
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "#C9A84C",
            display: "block",
            marginBottom: 20,
          }}
        >
          Rental Services
        </span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#FDF8F0",
            lineHeight: 1.1,
            marginBottom: 4,
          }}
        >
          Everything You Need,
        </h2>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#C9A84C",
            fontStyle: "italic",
            lineHeight: 1.1,
            marginBottom: 28,
          }}
        >
          Delivered & Set Up
        </h2>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: "rgba(253,248,240,0.60)",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.9,
          }}
        >
          From intimate gatherings to large-scale celebrations, our rental inventory covers
          every essential — delivered, professionally set up, and ready to impress.
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>

        {/* ── Top row: Tables + Chairs (2-col) ── */}
        <div
          ref={topRef}
          data-reveal
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}
          className="rentals-top"
        >
          {categories.slice(0, 2).map((cat) => (
            <div
              key={cat.title}
              className="rental-img-card"
              style={{ position: "relative", height: 420, overflow: "hidden", cursor: "default" }}
            >
              <Image src={cat.image} alt={cat.title} fill style={{ objectFit: "cover", transition: "transform 0.7s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,2,0,0.92) 0%, rgba(4,2,0,0.3) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px 40px", zIndex: 2 }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: "#C9A84C", marginBottom: 10 }}>{cat.subtitle}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "#FDF8F0", marginBottom: 14 }}>{cat.title}</h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, fontWeight: 300, color: "rgba(253,248,240,0.65)", lineHeight: 1.8 }}>{cat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom row: Coolers + Heaters + Tents (3-col) ── */}
        <div
          ref={bottomRef}
          data-reveal
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
          className="rentals-bottom"
        >
          {categories.slice(2).map((cat) => (
            <div
              key={cat.title}
              className="rental-img-card"
              style={{ position: "relative", height: 320, overflow: "hidden", cursor: "default" }}
            >
              <Image src={cat.image} alt={cat.title} fill style={{ objectFit: "cover", transition: "transform 0.7s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,2,0,0.93) 0%, rgba(4,2,0,0.25) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px", zIndex: 2 }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: "#C9A84C", marginBottom: 8 }}>{cat.subtitle}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "#FDF8F0", marginBottom: 10 }}>{cat.title}</h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(253,248,240,0.60)", lineHeight: 1.75 }}>{cat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", marginTop: 72 }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C9A84C",
              display: "block",
              marginBottom: 20,
            }}
          >
            Available for All Event Sizes
          </span>
          <a href="#contact" className="btn-primary">
            <span>Reserve Your Rentals</span>
          </a>
        </div>
      </div>

      <style>{`
        .rental-img-card:hover img { transform: scale(1.05); }
        @media (max-width: 900px) {
          .rentals-top { grid-template-columns: 1fr !important; }
          .rentals-bottom { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .rentals-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
