"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

const milestones = [
  {
    year: "2005",
    label: "Founded",
    detail: "Established in Merced, California with a singular vision — to bring extraordinary beauty to every celebration.",
  },
  {
    year: "2010",
    label: "Growing",
    detail: "Expanded our portfolio to include corporate galas and university events across the Central Valley.",
  },
  {
    year: "2015",
    label: "Milestone",
    detail: "Crossed 200 events with our signature quinceañera and wedding collections earning regional acclaim.",
  },
  {
    year: "2020",
    label: "Resilient",
    detail: "Navigated unprecedented times, emerging stronger with new offerings and deeper client relationships.",
  },
  {
    year: "2025+",
    label: "Excellence",
    detail: "Over 500 celebrations complete — and still crafting magic, one unforgettable event at a time.",
  },
];

export default function Story() {
  const headerRef   = useReveal<HTMLDivElement>();
  const gridRef     = useReveal<HTMLDivElement>();
  const timelineRef = useReveal<HTMLDivElement>();
  const closingRef  = useReveal<HTMLDivElement>();

  return (
    <section
      id="story"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(8,5,2,0.84) 5%, rgba(8,5,2,0.84) 95%, rgba(0,0,0,0) 100%)",
        padding: "120px 0 140px",
      }}
    >
      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        data-reveal
        style={{ textAlign: "center", padding: "0 40px", marginBottom: 96 }}
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
          Our Story
        </span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "#FDF8F0",
            lineHeight: 1.05,
            marginBottom: 4,
          }}
        >
          Crafting Magic
        </h2>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            fontWeight: 300,
            color: "#C9A84C",
            lineHeight: 1.05,
            fontStyle: "italic",
            marginBottom: 36,
          }}
        >
          Since 2005
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 28 }}>
          <div style={{ height: 1, width: 60, background: "rgba(201,168,76,0.4)" }} />
          <div style={{ width: 5, height: 5, background: "#C9A84C", transform: "rotate(45deg)" }} />
          <div style={{ height: 1, width: 60, background: "rgba(201,168,76,0.4)" }} />
        </div>
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: "rgba(253,248,240,0.65)",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.9,
          }}
        >
          Two decades of transforming ordinary spaces into breathtaking experiences — across weddings,
          quinceañeras, birthdays, and every milestone that defines a lifetime.
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>

        {/* ── 2-col image + founder story ── */}
        <div
          ref={gridRef}
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 100,
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Image collage */}
          <div style={{ position: "relative", height: 620 }}>
            <div
              className="gallery-item"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "70%",
                height: "70%",
                boxShadow: "0 24px 72px rgba(0,0,0,0.5)",
              }}
            >
              <Image src="/images/decoration2.jpg" alt="Decoration" fill style={{ objectFit: "cover" }} />
            </div>
            <div
              className="gallery-item"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "60%",
                height: "60%",
                boxShadow: "0 24px 72px rgba(0,0,0,0.5)",
              }}
            >
              <Image src="/images/decoration3.jpg" alt="Decoration" fill style={{ objectFit: "cover" }} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: -20,
                background: "#C9A84C",
                padding: "28px 32px",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.5rem",
                  fontWeight: 300,
                  color: "#1A1A1A",
                  lineHeight: 1,
                }}
              >
                20+
              </div>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 9,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#1A1A1A",
                  marginTop: 4,
                }}
              >
                Years of Excellence
              </div>
            </div>
          </div>

          {/* Founder text */}
          <div>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: "rgba(253,248,240,0.78)",
                lineHeight: 1.95,
                marginBottom: 24,
              }}
            >
              Piccolinas Party Decoration & Rental was born from a deep love of celebration and a
              relentless pursuit of beauty. Founded in Merced, California, we have spent over two
              decades transforming ordinary spaces into breathtaking experiences.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: "rgba(253,248,240,0.78)",
                lineHeight: 1.95,
                marginBottom: 24,
              }}
            >
              Every event we design is built around a singular philosophy: the details are
              everything. From the first consultation to the final floral placement, we treat each
              celebration as a work of art — one that belongs entirely to you.
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: "rgba(253,248,240,0.78)",
                lineHeight: 1.95,
                marginBottom: 48,
              }}
            >
              Our work spans weddings, quinceañeras, milestone birthdays, graduations, baby showers,
              corporate galas, and the most cherished private events across the Central Valley — every
              deadline met, every vision exceeded.
            </p>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "28px 40px",
                marginBottom: 48,
                paddingBottom: 48,
                borderBottom: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              {[
                { num: "500+", label: "Events Designed" },
                { num: "20+", label: "Years Experience" },
                { num: "100%", label: "Deadline Record" },
                { num: "∞", label: "Memories Made" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "3rem",
                      fontWeight: 300,
                      color: "#C9A84C",
                      lineHeight: 1,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 9,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "rgba(253,248,240,0.45)",
                      marginTop: 6,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary">
              <span>Begin Your Journey</span>
            </a>
          </div>
        </div>

        {/* ── Milestone Timeline ── */}
        <div
          ref={timelineRef}
          data-reveal
          style={{
            marginTop: 120,
            paddingTop: 80,
            borderTop: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 72 }}>
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
              Our Journey
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                color: "#FDF8F0",
                lineHeight: 1.1,
              }}
            >
              Two Decades of <em style={{ color: "#C9A84C" }}>Excellence</em>
            </h3>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}
            className="timeline-grid"
          >
            {milestones.map((m, i) => (
              <div
                key={m.year}
                style={{
                  padding: "36px 28px",
                  borderLeft: i > 0 ? "1px solid rgba(201,168,76,0.15)" : undefined,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.8rem",
                    fontWeight: 300,
                    color: "#C9A84C",
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {m.year}
                </div>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 9,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#FDF8F0",
                    marginBottom: 14,
                  }}
                >
                  {m.label}
                </div>
                <div style={{ height: 1, width: 24, background: "#C9A84C", marginBottom: 16 }} />
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    color: "rgba(253,248,240,0.52)",
                    lineHeight: 1.8,
                  }}
                >
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom image strip + closing CTA ── */}
        <div ref={closingRef} data-reveal style={{ marginTop: 100 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 3,
              height: 340,
              marginBottom: 88,
            }}
            className="story-images"
          >
            {["/images/decoration4.jpg", "/images/decoration6.jpg", "/images/decoration5.jpg"].map((src, i) => (
              <div key={i} className="gallery-item" style={{ position: "relative", overflow: "hidden" }}>
                <Image src={src} alt="Event design" fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
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
              Ready to Begin?
            </span>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#FDF8F0",
                lineHeight: 1.1,
                marginBottom: 40,
              }}
            >
              Let's Create Something <em style={{ color: "#C9A84C" }}>Unforgettable</em>
            </h3>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#C9A84C",
                border: "1px solid #C9A84C",
                color: "#1A1A1A",
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                padding: "14px 48px",
                textDecoration: "none",
                transition: "background 0.3s ease",
              }}
            >
              Inquire About Your Event
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .timeline-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .story-grid > div:first-child { height: 440px !important; }
          .timeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .story-images { grid-template-columns: 1fr !important; height: auto !important; }
          .story-images > div { height: 200px; }
        }
        @media (max-width: 600px) {
          .timeline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
