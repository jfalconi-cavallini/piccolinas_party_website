"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const featured = [
  {
    title: "Weddings",
    subtitle: "Full-Service Luxury",
    description:
      "From first concept to final farewell, we orchestrate every floral, lighting, and décor element. Your love story deserves a stage worthy of its beauty.",
    image: "/images/decoration4.jpg",
  },
  {
    title: "Quinceañeras",
    subtitle: "Bespoke Styling",
    description:
      "A milestone celebration deserves a court worthy of its honoree — custom décor, staging, and styling that make the day utterly unforgettable.",
    image: "/images/decoration5.jpg",
  },
];

const supporting = [
  {
    title: "Birthday Parties",
    subtitle: "Celebrations of Joy",
    description:
      "From first birthdays to milestone ages, we design themed décor that turns any birthday into a beautifully unforgettable celebration.",
    image: "/images/decoration10.jpg",
  },
  {
    title: "Graduations",
    subtitle: "Milestone Moments",
    description:
      "Celebrate every achievement with custom colors, banners, and styling for grad parties big or small.",
    image: "/images/decoration11.jpg",
  },
  {
    title: "Special Events",
    subtitle: "Any Occasion",
    description:
      "Baby showers, corporate galas, university functions, school events — we transform any venue into a curated world built around your vision.",
    image: "/images/decoration12.jpg",
  },
  {
    title: "Custom Centerpieces",
    subtitle: "Artisan Crafted",
    description:
      "Each centerpiece is a work of art — handcrafted to match your palette and theme. No two alike, just as no two celebrations are alike.",
    image: "/images/decoration7.jpg",
  },
  {
    title: "Custom Foam Cutouts",
    subtitle: "Personalized Décor",
    description:
      "Custom foam cutout figures and letters — perfect for photo backdrops, entrance statements, and personalized party accents.",
    image: "/images/decoration8.jpg",
  },
  {
    title: "Custom Piñatas",
    subtitle: "Any Size & Design",
    description:
      "A beloved tradition brought to life with handcrafted artisan piñatas in any theme, character, size, or color.",
    image: "/images/pinata1.jpg",
  },
];

function ServiceCard({ svc, height }: { svc: typeof featured[0]; height: number }) {
  return (
    <div
      className="svc-card gallery-item"
      style={{ position: "relative", height, cursor: "pointer", overflow: "hidden" }}
    >
      <Image
        src={svc.image}
        alt={svc.title}
        fill
        style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,6,2,0.95) 0%, rgba(10,6,2,0.35) 55%, transparent 100%)",
          transition: "background 0.4s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "36px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 9,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 10,
          }}
        >
          {svc.subtitle}
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.9rem",
            fontWeight: 400,
            color: "#FDF8F0",
            marginBottom: 14,
          }}
        >
          {svc.title}
        </h3>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(253,248,240,0.72)",
            lineHeight: 1.75,
          }}
        >
          {svc.description}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#C9A84C",
          transform: "scaleX(0)",
          transition: "transform 0.4s ease",
          transformOrigin: "left",
          zIndex: 3,
        }}
        className="svc-accent"
      />
    </div>
  );
}

export default function Services() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      style={{
        background: "rgba(6,4,2,0.58)",
        padding: "120px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "28vw",
          fontWeight: 700,
          color: "rgba(201,168,76,0.025)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        PICCOL
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={revealRef} data-reveal style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C9A84C",
              display: "block",
              marginBottom: 16,
            }}
          >
            What We Offer
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "#FDF8F0",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Services Worthy of <em style={{ color: "#C9A84C" }}>Your Moment</em>
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: "rgba(253,248,240,0.55)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.85,
            }}
          >
            From intimate weddings to grand celebrations — every service is delivered with the
            same obsessive attention to detail and personal care.
          </p>
        </div>

        {/* Featured pair — Weddings + Quinceañeras */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}
          className="services-featured"
        >
          {featured.map((svc) => (
            <ServiceCard key={svc.title} svc={svc} height={500} />
          ))}
        </div>

        {/* Supporting grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}
          className="services-supporting"
        >
          {supporting.map((svc) => (
            <ServiceCard key={svc.title} svc={svc} height={320} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 60 }}>
          <a href="#contact" className="btn-primary">
            <span>Inquire About Your Event</span>
          </a>
        </div>
      </div>

      <style>{`
        .svc-card:hover .svc-accent { transform: scaleX(1) !important; }
        .svc-card:hover img { transform: scale(1.06); }
        @media (max-width: 900px) {
          .services-featured { grid-template-columns: 1fr !important; }
          .services-supporting { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .services-supporting { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
