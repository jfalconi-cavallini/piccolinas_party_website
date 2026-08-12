"use client";

import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  {
    quote:
      "Piccolinas Party transformed our wedding venue into something from a fairytale. Every single detail was beyond what we imagined. They made our day absolutely perfect.",
    author: "Sofia & Miguel R.",
    event: "Wedding · Merced, CA",
  },
  {
    quote:
      "For our daughter's quinceañera, they created an atmosphere so stunning our guests still talk about it years later. Professional, creative, and truly dedicated.",
    author: "Marisol V.",
    event: "Quinceañera Celebration",
  },
  {
    quote:
      "As UC Merced's event coordinator, I've worked with Piccolinas for multiple university events. Their reliability and artistry are unmatched in the entire Central Valley.",
    author: "Dr. James T.",
    event: "University Event Coordinator",
  },
];

export default function Testimonials() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <section
      style={{
        background: "rgba(4,2,0,0.48)",
        padding: "120px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 500,
          height: 500,
          border: "1px solid rgba(201,168,76,0.06)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 600,
          height: 600,
          border: "1px solid rgba(201,168,76,0.04)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={revealRef} data-reveal style={{ textAlign: "center", marginBottom: 72 }}>
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
            Kind Words
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#FDF8F0",
            }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* 3-up layout on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: "52px 48px",
                background: "rgba(255,252,248,0.04)",
                border: "1px solid rgba(201,168,76,0.12)",
                position: "relative",
              }}
              className="testimonial-card"
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "5rem",
                  lineHeight: 0.7,
                  color: "rgba(201,168,76,0.2)",
                  marginBottom: 28,
                  fontWeight: 700,
                }}
              >
                "
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(253,248,240,0.85)",
                  lineHeight: 1.8,
                  marginBottom: 36,
                  flexGrow: 1,
                }}
              >
                {t.quote}
              </p>

              <div style={{ height: 1, width: 40, background: "#C9A84C", marginBottom: 20 }} />

              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 11,
                  letterSpacing: "2px",
                  color: "#C9A84C",
                  marginBottom: 4,
                }}
              >
                {t.author}
              </div>
              <div
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 11,
                  fontWeight: 300,
                  letterSpacing: "1px",
                  color: "rgba(253,248,240,0.4)",
                  textTransform: "uppercase",
                }}
              >
                {t.event}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card {
          transition: border-color 0.4s ease;
        }
        .testimonial-card:hover {
          border-color: rgba(201,168,76,0.3) !important;
        }
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
