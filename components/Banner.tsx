"use client";

export default function Banner() {
  return (
    <section
      style={{
        position: "relative",
        height: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        // Dark overlay over the global video background — no separate bg image needed
        background: "rgba(8,4,0,0.52)",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
        }}
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
          Serving Merced & The Central Valley
        </span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
            color: "#FDF8F0",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Every Deadline. Every Detail.
          <br />
          <em style={{ color: "#C9A84C" }}>Every Time.</em>
        </h2>
        <a
          href="#contact"
          style={{
            display: "inline-block",
            fontFamily: "'Cinzel', serif",
            fontSize: 11,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#1A1A1A",
            textDecoration: "none",
            background: "#C9A84C",
            padding: "14px 40px",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#8B6914")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#C9A84C")}
        >
          Start Planning Today
        </a>
      </div>
    </section>
  );
}
