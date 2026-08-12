"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

type Tab = "decorations" | "foamcutouts" | "pinatas";

const centerpieces = [
  "Rose Garden Centerpiece",
  "Golden Cascading Tower",
  "Floral Dream Arrangement",
  "Crystal & Greenery Display",
  "Bohemian Wildflower Setting",
  "Champagne Elegance Setup",
  "Pastel Garden Design",
];

const foamNames = [
  "Custom Name Display",
  "Number Silhouette Set",
  "Character Foam Cutout",
  "Monogram Letter Set",
  "Crown & Stars Display",
  "Custom Theme Board",
];

const pinataNamesArr = [
  "Star Burst Piñata",
  "Princess Theme Piñata",
  "Unicorn Piñata",
  "Birthday Explosion Piñata",
  "Floral Piñata Design",
  "Animal Theme Piñata",
  "Rainbow Mini Piñata",
  "Color Confetti Piñata",
  "Geometric Piñata",
  "Custom Portrait Piñata",
  "Fiesta Jumbo Piñata",
  "Celebration Burst Piñata",
  "Classic Star Piñata",
];

const decorItems = centerpieces.map((name, i) => ({
  id: i + 1,
  src: `/images/decoration${i + 9}.jpg`,
  name,
  tag: i % 3 === 0 ? "Custom" : null,
}));

const foamCutoutItems = foamNames.map((name, i) => ({
  id: i + 1,
  src: `/images/decoration${(i % 15) + 1}.jpg`,
  name,
  tag: i % 3 === 0 ? "Popular" : null,
}));

const pinatas = pinataNamesArr.map((name, i) => ({
  id: i + 1,
  src: `/images/pinata${i + 1}.jpg`,
  name,
  tag: i % 4 === 0 ? "Bestseller" : i % 7 === 0 ? "New" : null,
}));

const tabLabels: Record<Tab, string> = {
  decorations: "Centerpieces",
  foamcutouts: "Foam Cutouts",
  pinatas: "Piñatas",
};

export default function Shop() {
  const revealRef = useReveal<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<Tab>("decorations");

  const items =
    activeTab === "pinatas" ? pinatas : activeTab === "foamcutouts" ? foamCutoutItems : decorItems;

  return (
    <section
      id="shop"
      style={{
        padding: "120px 40px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(6,4,2,0.76) 6%, rgba(6,4,2,0.76) 94%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div ref={revealRef} data-reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-eyebrow">Online Shop</span>
          <h2 className="section-title" style={{ marginBottom: 16, color: "#FDF8F0" }}>
            Shop Our <em style={{ color: "#C9A84C" }}>Collection</em>
          </h2>
          <p className="section-subtitle" style={{ color: "rgba(253,248,240,0.60)" }}>
            Browse our curated selection of handcrafted centerpieces, custom foam cutouts,
            and artisan piñatas — available for pickup in Merced.
          </p>
        </div>

        {/* Editorial tab bar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 60 }}>
          {(["decorations", "foamcutouts", "pinatas"] as Tab[]).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 10,
                letterSpacing: "3px",
                textTransform: "uppercase",
                padding: "14px 40px",
                background: "transparent",
                color: activeTab === tab ? "#C9A84C" : "rgba(253,248,240,0.38)",
                border: "none",
                borderBottom: activeTab === tab
                  ? "1px solid #C9A84C"
                  : "1px solid rgba(201,168,76,0.15)",
                borderLeft: i > 0 ? "1px solid rgba(201,168,76,0.1)" : "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
          className="shop-grid"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="shop-card"
              style={{
                background: "rgba(16,10,3,0.72)",
                border: "1px solid rgba(201,168,76,0.12)",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            >
              {item.tag && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "#C9A84C",
                    color: "#1A1A1A",
                    fontFamily: "'Cinzel', serif",
                    fontSize: 9,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    zIndex: 2,
                  }}
                >
                  {item.tag}
                </div>
              )}
              <div className="gallery-item" style={{ height: 240, position: "relative", overflow: "hidden" }}>
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                />
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "#FDF8F0",
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  {item.name}
                </h3>
                <div style={{ height: 1, width: "100%", background: "rgba(201,168,76,0.1)", marginBottom: 12 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 10,
                      fontWeight: 300,
                      color: "rgba(253,248,240,0.35)",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    Price on Inquiry
                  </span>
                  <a
                    href="#contact"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 9,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(201,168,76,0.4)",
                      paddingBottom: 2,
                      transition: "color 0.3s ease",
                    }}
                  >
                    Inquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 64 }}>
          <a href="#contact" className="btn-primary">
            <span>Request Custom Order</span>
          </a>
        </div>
      </div>

      <style>{`
        .shop-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201,168,76,0.28) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }
        .gallery-item:hover img { transform: scale(1.08); }
        @media (max-width: 1024px) { .shop-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .shop-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .shop-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
