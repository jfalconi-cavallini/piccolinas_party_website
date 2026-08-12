"use client";

export default function Marquee() {
  const items = [
    "Luxury Weddings",
    "Quinceañeras",
    "Baby Showers",
    "Corporate Events",
    "Birthday Celebrations",
    "Piñatas",
    "Custom Centerpieces",
    "Foam Cutouts",
    "University Events",
    "School Events",
  ];

  return (
    <div
      style={{
        background: "#C9A84C",
        overflow: "hidden",
        padding: "14px 0",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          animation: "marquee 30s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#1A1A1A",
              display: "inline-flex",
              alignItems: "center",
              gap: 60,
              flexShrink: 0,
            }}
          >
            {item}
            <span style={{ opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
