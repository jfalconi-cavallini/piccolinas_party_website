"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Story", href: "#story" },
    { label: "Services", href: "#services" },
    { label: "Rentals", href: "#rentals" },
    { label: "Gallery", href: "#gallery" },
    { label: "Shop", href: "#shop" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(10,8,6,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(201,168,76,0.2)" : "none",
        transition: "all 0.4s ease",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? 70 : 90,
          transition: "height 0.4s ease",
        }}
      >
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image
            src="/images/logo3.png"
            alt="Piccolinas Party"
            width={220}
            height={85}
            style={{ objectFit: "contain" }}
          />
        </a>

        <ul
          style={{ display: "flex", gap: 40, listStyle: "none", alignItems: "center" }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 11,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#FDF8F0",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  padding: "4px 0",
                  borderBottom: "1px solid transparent",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.borderBottomColor = "#C9A84C")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.borderBottomColor = "transparent")}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#1A1A1A",
                textDecoration: "none",
                background: "#C9A84C",
                padding: "10px 24px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#8B6914")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#C9A84C")}
            >
              Book Now
            </a>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            flexDirection: "column",
            gap: 5,
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 1,
                background: "#FDF8F0",
                transition: "all 0.3s ease",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(4px, 4px)"
                    : menuOpen && i === 2
                      ? "rotate(-45deg) translate(4px, -4px)"
                      : menuOpen && i === 1
                        ? "scaleX(0)"
                        : "none",
              }}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            background: "rgba(10,8,6,0.97)",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            padding: "20px 40px",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "'Cinzel', serif",
                fontSize: 13,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#FDF8F0",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
