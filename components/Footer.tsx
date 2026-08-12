"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "rgba(17,17,17,0.97)", color: "rgba(255,255,255,0.5)", padding: "80px 40px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Image
              src="/images/logo3.png"
              alt="Piccolinas Party"
              width={220}
              height={85}
              style={{ objectFit: "contain", marginBottom: 20, filter: "brightness(0.9)" }}
            />
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.4)",
                maxWidth: 280,
              }}
            >
              Merced's premier event design studio since 2005. Crafting
              unforgettable celebrations with artistry, elegance, and love.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: 24,
              }}
            >
              Quick Links
            </h4>
            {["Our Story", "Services", "Rentals", "Gallery", "Shop", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "")}`}
                style={{
                  display: "block",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  marginBottom: 12,
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: 24,
              }}
            >
              Services
            </h4>
            {["Weddings", "Quinceañeras", "Piñatas", "Centerpieces", "Rentals", "Foam Cutouts"].map((s) => (
              <a
                key={s}
                href="#services"
                style={{
                  display: "block",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  marginBottom: 12,
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
              >
                {s}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div>
            <h4
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: 24,
              }}
            >
              Connect
            </h4>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              Merced, California<br />
              Central Valley & Beyond
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-block",
                fontFamily: "'Cinzel', serif",
                fontSize: 9,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#C9A84C",
                textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.3)",
                padding: "10px 20px",
                transition: "all 0.3s ease",
              }}
            >
              Book an Event
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Piccolinas Party Decoration & Rental. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 9,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.4)",
            }}
          >
            Est. 2005 · Merced, CA
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
