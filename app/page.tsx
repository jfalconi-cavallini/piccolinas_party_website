"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
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
        background: scrolled ? "rgba(253,248,240,0.97)" : "transparent",
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
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image
            src="/images/logo3.png"
            alt="Piccolinas Party"
            width={220}
            height={85}
            style={{ objectFit: "contain" }}
          />
        </a>

        {/* Desktop Links */}
        <ul
          style={{
            display: "flex",
            gap: 40,
            listStyle: "none",
            alignItems: "center",
          }}
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
                  color: scrolled ? "#1A1A1A" : "#FDF8F0",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  padding: "4px 0",
                  borderBottom: "1px solid transparent",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.borderBottomColor = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.borderBottomColor = "transparent")
                }
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
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.background = "#8B6914")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.background = "#C9A84C")
              }
            >
              Book Now
            </a>
          </li>
        </ul>

        {/* Hamburger */}
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
                background: scrolled ? "#1A1A1A" : "#FDF8F0",
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(253,248,240,0.99)",
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
                color: "#1A1A1A",
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

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        minHeight: 700,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#1A1A1A",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/decoration1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: loaded ? 0.55 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.4) 60%, rgba(139,105,20,0.25) 100%)",
        }}
      />

      {/* Decorative corner lines */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          width: 100,
          height: 100,
          borderTop: "1px solid rgba(201,168,76,0.5)",
          borderLeft: "1px solid rgba(201,168,76,0.5)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 100,
          height: 100,
          borderBottom: "1px solid rgba(201,168,76,0.5)",
          borderRight: "1px solid rgba(201,168,76,0.5)",
        }}
      />

      {/* Content */}
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
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#C9A84C",
            display: "block",
            marginBottom: 24,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          Est. 2006 · Merced, California
        </span>

        <h1
          className="hero-title"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
            fontWeight: 300,
            color: "#FDF8F0",
            lineHeight: 1.05,
            marginBottom: 8,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          Where Every
        </h1>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
            fontWeight: 300,
            color: "#FDF8F0",
            lineHeight: 1.05,
            marginBottom: 32,
            fontStyle: "italic",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.55s",
          }}
        >
          Dream{" "}
          <span style={{ color: "#C9A84C" }}>Blooms</span>
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            justifyContent: "center",
            marginBottom: 48,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          <div style={{ height: 1, width: 60, background: "rgba(201,168,76,0.6)" }} />
          <div style={{ width: 6, height: 6, background: "#C9A84C", transform: "rotate(45deg)" }} />
          <div style={{ height: 1, width: 60, background: "rgba(201,168,76,0.6)" }} />
        </div>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: "rgba(253,248,240,0.8)",
            letterSpacing: "1px",
            marginBottom: 48,
            maxWidth: 500,
            margin: "0 auto 48px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.8s",
          }}
        >
          Merced's most distinguished event design studio. Weddings, celebrations,
          and unforgettable moments — crafted with passion since 2006.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 1s",
          }}
        >
          <a
            href="#services"
            className="btn-solid"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#C9A84C",
              border: "1px solid #C9A84C",
              color: "#1A1A1A",
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "14px 36px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            Explore Our Services
          </a>
          <a
            href="#gallery"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.7)",
              color: "#E8D5A3",
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "14px 36px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            View Gallery
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: loaded ? 0.7 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      >
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 9,
            letterSpacing: "3px",
            color: "#C9A84C",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 50,
            background: "linear-gradient(to bottom, #C9A84C, transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: scaleY(0.8); }
            50% { opacity: 1; transform: scaleY(1); }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee() {
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

// ─── STORY ───────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section
      id="story"
      style={{
        padding: "120px 40px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 100,
          alignItems: "center",
        }}
        className="story-grid"
      >
        {/* Image collage */}
        <div style={{ position: "relative", height: 600 }}>
          <div
            className="gallery-item"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "70%",
              height: "70%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <Image
              src="/images/decoration2.jpg"
              alt="Decoration"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className="gallery-item"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "60%",
              height: "60%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <Image
              src="/images/decoration3.jpg"
              alt="Decoration"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Gold accent box */}
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
              18+
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

        {/* Text */}
        <div>
          <span className="section-eyebrow">Our Story</span>
          <h2
            className="section-title"
            style={{ marginBottom: 8 }}
          >
            Crafting Magic
          </h2>
          <h2
            className="section-title"
            style={{
              fontStyle: "italic",
              color: "#C9A84C",
              marginBottom: 32,
            }}
          >
            Since 2006
          </h2>

          <div
            style={{
              height: 1,
              width: 80,
              background: "#C9A84C",
              marginBottom: 32,
            }}
          />

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: "#8B7355",
              lineHeight: 1.9,
              marginBottom: 24,
            }}
          >
            Piccolinas Party Decoration & Rental was born from a deep love of celebration
            and a relentless pursuit of beauty. Founded in Merced, California, we have
            spent nearly two decades transforming ordinary spaces into breathtaking
            experiences.
          </p>

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: "#8B7355",
              lineHeight: 1.9,
              marginBottom: 40,
            }}
          >
            From intimate weddings to grand university galas, we have delivered
            on every promise — every deadline met, every vision exceeded.
            Our work spans school celebrations, quinceañeras, corporate functions,
            and the most cherished private events across the Central Valley.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
              marginBottom: 40,
            }}
          >
            {[
              { num: "500+", label: "Events Designed" },
              { num: "18+", label: "Years Experience" },
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
                    color: "#8B7355",
                    marginTop: 4,
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

      <style>{`
        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .story-grid > div:first-child { height: 400px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: "💍",
      title: "Wedding Design",
      subtitle: "Full-Service Luxury",
      description:
        "From the first concept to the final farewell, we orchestrate every floral, lighting, and décor detail. Your love story deserves a stage worthy of its beauty.",
      image: "/images/decoration4.jpg",
    },
    {
      icon: "🌸",
      title: "Event Decoration",
      subtitle: "Bespoke Styling",
      description:
        "Quinceañeras, birthdays, baby showers, corporate galas — we transform any venue into a curated world that reflects your personality and vision.",
      image: "/images/decoration5.jpg",
    },
    {
      icon: "🏛️",
      title: "Rental Services",
      subtitle: "Premium Inventory",
      description:
        "Access our curated collection of arches, charger plates, centerpiece vessels, draping, and furniture. Everything you need, delivered and set up.",
      image: "/images/decoration6.jpg",
    },
    {
      icon: "🎨",
      title: "Custom Centerpieces",
      subtitle: "Artisan Crafted",
      description:
        "Each centerpiece is a work of art — handcrafted to match your palette and theme. No two are alike, just like no two celebrations are alike.",
      image: "/images/decoration7.jpg",
    },
    {
      icon: "✂️",
      title: "Foam Cutouts",
      subtitle: "Personalized Décor",
      description:
        "Custom foam cutout figures and letters — perfect for photo backdrops, entrance statements, and personalized party accents that wow your guests.",
      image: "/images/decoration8.jpg",
    },
    {
      icon: "🎉",
      title: "Piñatas",
      subtitle: "Handcrafted Fun",
      description:
        "A beloved tradition brought to life with handcrafted artisan piñatas in any theme, character, or color — the unforgettable centerpiece of any fiesta.",
      image: "/images/pinata1.jpg",
    },
  ];

  return (
    <section
      id="services"
      style={{
        background: "#1A1A1A",
        padding: "120px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "30vw",
          fontWeight: 700,
          color: "rgba(201,168,76,0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        PICCOL
      </div>

      <div
        style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <div style={{ textAlign: "center", marginBottom: 80 }}>
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
            }}
          >
            Services Worthy of{" "}
            <em style={{ color: "#C9A84C" }}>Your Moment</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
          className="services-grid"
        >
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="gallery-item"
              style={{
                position: "relative",
                height: 420,
                cursor: "pointer",
                overflow: "hidden",
              }}
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
                  background:
                    "linear-gradient(to top, rgba(26,26,26,0.92) 40%, rgba(26,26,26,0.2) 100%)",
                  transition: "background 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "32px",
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
                    marginBottom: 8,
                  }}
                >
                  {svc.subtitle}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                    color: "#FDF8F0",
                    marginBottom: 12,
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    color: "rgba(253,248,240,0.75)",
                    lineHeight: 1.7,
                  }}
                >
                  {svc.description}
                </p>
              </div>
              {/* Top border accent on hover */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "#C9A84C",
                  transform: "scaleX(0)",
                  transition: "transform 0.4s ease",
                  transformOrigin: "left",
                }}
                className="service-accent-bar"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-item:hover .service-accent-bar { transform: scaleX(1) !important; }
        .gallery-item:hover img { transform: scale(1.08); }
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────
function Gallery() {
  const images = Array.from({ length: 15 }, (_, i) => `/images/decoration${i + 1}.jpg`);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="gallery"
      style={{ padding: "120px 40px", background: "#FDF8F0" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            A Glimpse of{" "}
            <em style={{ color: "#C9A84C" }}>Our Work</em>
          </h2>
          <p className="section-subtitle">
            Every event tells a story. Here are some of the beautiful
            chapters we've had the honour of writing together.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "220px",
            gap: 12,
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
                onClick={() => setActive(src)}
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
                    background:
                      "linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 60%)",
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
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,26,26,0.95)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
        >
          <button
            onClick={() => setActive(null)}
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
            }}
          >
            Close
          </button>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 900,
              maxHeight: "80vh",
              aspectRatio: "4/3",
            }}
          >
            <Image
              src={active}
              alt="Gallery"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      <style>{`
        .gallery-item:hover img { transform: scale(1.08); }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover .gallery-zoom { opacity: 1 !important; }
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── SHOP (PINATAS + PRODUCTS) ────────────────────────────────────────────────
function Shop() {
  const [activeTab, setActiveTab] = useState<"pinatas" | "decorations">("pinatas");

  const pinatas = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    src: `/images/pinata${i + 1}.jpg`,
    name: `Artisan Piñata ${i + 1}`,
    price: `$${25 + (i % 5) * 10}`,
    tag: i % 4 === 0 ? "Bestseller" : i % 7 === 0 ? "New" : null,
  }));

  const decorItems = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    src: `/images/decoration${i + 9}.jpg`,
    name: `Custom Centerpiece ${i + 1}`,
    price: `$${60 + (i % 5) * 15}`,
    tag: i % 3 === 0 ? "Custom" : null,
  }));

  const items = activeTab === "pinatas" ? pinatas : decorItems;

  return (
    <section
      id="shop"
      style={{ padding: "120px 40px", background: "#F5EDD8" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-eyebrow">Online Shop</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Shop Our{" "}
            <em style={{ color: "#C9A84C" }}>Collection</em>
          </h2>
          <p className="section-subtitle">
            Browse our curated selection of handcrafted piñatas, custom
            centerpieces, and party essentials — available for pickup in Merced.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            marginBottom: 60,
            border: "1px solid rgba(201,168,76,0.3)",
            width: "fit-content",
            margin: "0 auto 60px",
          }}
        >
          {(["pinatas", "decorations"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                padding: "14px 40px",
                background: activeTab === tab ? "#C9A84C" : "transparent",
                color: activeTab === tab ? "#1A1A1A" : "#8B7355",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {tab === "pinatas" ? "Piñatas" : "Centerpieces"}
            </button>
          ))}
        </div>

        {/* Products */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          className="shop-grid"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="product-card"
              style={{
                background: "white",
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
              <div
                className="gallery-item"
                style={{ height: 260, position: "relative", overflow: "hidden" }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                />
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}
                >
                  {item.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.4rem",
                      fontWeight: 500,
                      color: "#C9A84C",
                    }}
                  >
                    {item.price}
                  </span>
                  <a
                    href="#contact"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 9,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#8B7355",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(139,115,85,0.4)",
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

        <div style={{ textAlign: "center", marginTop: 60 }}>
          <a href="#contact" className="btn-primary">
            <span>Request Custom Order</span>
          </a>
        </div>
      </div>

      <style>{`
        .product-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(201,168,76,0.15); }
        .gallery-item:hover img { transform: scale(1.08); }
        @media (max-width: 1024px) {
          .shop-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .shop-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
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

  const [active, setActive] = useState(0);

  return (
    <section
      style={{
        background: "#1A1A1A",
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
        }}
      />

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
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
            marginBottom: 60,
          }}
        >
          What Our Clients Say
        </h2>

        {/* Quote mark */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "8rem",
            lineHeight: 0.5,
            color: "rgba(201,168,76,0.2)",
            marginBottom: 32,
            fontWeight: 700,
          }}
        >
          "
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(253,248,240,0.9)",
            lineHeight: 1.7,
            marginBottom: 40,
            minHeight: 120,
          }}
        >
          {testimonials[active].quote}
        </p>

        <div
          style={{
            height: 1,
            width: 60,
            background: "#C9A84C",
            margin: "0 auto 24px",
          }}
        />

        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 12,
            letterSpacing: "2px",
            color: "#C9A84C",
            marginBottom: 4,
          }}
        >
          {testimonials[active].author}
        </div>
        <div
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 12,
            fontWeight: 300,
            letterSpacing: "1px",
            color: "rgba(253,248,240,0.4)",
            textTransform: "uppercase",
          }}
        >
          {testimonials[active].event}
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 32 : 8,
                height: 1,
                background: i === active ? "#C9A84C" : "rgba(201,168,76,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_06jkroi",
        "template_3fioo6o",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          eventType: form.eventType,
          date: form.date,
          message: form.message,
        },
        "YOUR_PUBLIC_KEY"
      );
      setSent(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "120px 40px", background: "#FDF8F0" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 100,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left info */}
        <div>
          <span className="section-eyebrow">Get In Touch</span>
          <h2
            className="section-title"
            style={{ marginBottom: 8 }}
          >
            Let's Create
          </h2>
          <h2
            className="section-title"
            style={{ fontStyle: "italic", color: "#C9A84C", marginBottom: 32 }}
          >
            Something Beautiful
          </h2>

          <div
            style={{
              height: 1,
              width: 80,
              background: "#C9A84C",
              marginBottom: 32,
            }}
          />

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: "#8B7355",
              lineHeight: 1.9,
              marginBottom: 48,
            }}
          >
            Whether you're envisioning an intimate gathering or a grand
            celebration, we would love to hear about your dream. Reach
            out and let's begin designing something extraordinary together.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              {
                label: "Location",
                value: "Merced, California",
                icon: "📍",
              },
              {
                label: "Service Area",
                value: "Central Valley & Beyond",
                icon: "🗺️",
              },
              {
                label: "Est.",
                value: "Since 2006 — 18+ Years of Excellence",
                icon: "✦",
              },
              {
                label: "Specialties",
                value: "Weddings · Quinceañeras · University Events",
                icon: "🌸",
              },
            ].map((info) => (
              <div key={info.label} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid rgba(201,168,76,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 18,
                  }}
                >
                  {info.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 9,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      marginBottom: 2,
                    }}
                  >
                    {info.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#2D2D2D",
                    }}
                  >
                    {info.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div
              style={{
                padding: "60px 40px",
                background: "white",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(201,168,76,0.1)",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 20 }}>✦</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "#1A1A1A",
                  marginBottom: 16,
                }}
              >
                Thank You
              </h3>
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "#8B7355",
                  lineHeight: 1.8,
                }}
              >
                Your message has been received. We'll be in touch within
                24 hours to begin crafting your dream event.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "white",
                padding: "52px 48px",
                boxShadow: "0 20px 60px rgba(201,168,76,0.08)",
              }}
              className="contact-form-inner"
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 300,
                  color: "#1A1A1A",
                  marginBottom: 40,
                }}
              >
                Event Inquiry Form
              </h3>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 32 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                  }}
                  className="form-row"
                >
                  {[
                    {
                      name: "name",
                      placeholder: "Your Full Name",
                      type: "text",
                    },
                    { name: "email", placeholder: "Email Address", type: "email" },
                  ].map((f) => (
                    <div key={f.name}>
                      <input
                        type={f.type}
                        name={f.name}
                        placeholder={f.placeholder}
                        value={form[f.name as keyof typeof form]}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                  }}
                  className="form-row"
                >
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="form-input"
                      style={{ colorScheme: "light" }}
                    />
                  </div>
                </div>

                <div>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className="form-input"
                    style={{ cursor: "pointer" }}
                  >
                    <option value="" disabled>
                      TYPE OF EVENT
                    </option>
                    <option value="wedding">Wedding</option>
                    <option value="quincea">Quinceañera</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="corporate">Corporate / University Event</option>
                    <option value="school">School Event</option>
                    <option value="pinata">Piñata Order</option>
                    <option value="rental">Rental Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="TELL US ABOUT YOUR VISION"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="form-input"
                    style={{ resize: "none", fontFamily: "'Lato', sans-serif" }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={{
                    background: "#C9A84C",
                    border: "none",
                    color: "#1A1A1A",
                    fontFamily: "'Cinzel', serif",
                    fontSize: 11,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    padding: "16px 40px",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.background = "#8B6914")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.background = "#C9A84C")
                  }
                >
                  Send Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .contact-form-inner { padding: 32px 24px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── FULL-WIDTH BANNER ────────────────────────────────────────────────────────
function Banner() {
  return (
    <section
      style={{
        position: "relative",
        height: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/decoration9.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(26,26,26,0.78)",
        }}
      />
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
        >
          Start Planning Today
        </a>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#111111",
        color: "rgba(255,255,255,0.5)",
        padding: "80px 40px 40px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 60,
          }}
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
              Merced's premier event design studio since 2006. Crafting
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
            {["Our Story", "Services", "Gallery", "Shop", "Contact"].map(
              (link) => (
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
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)")
                  }
                >
                  {link}
                </a>
              )
            )}
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
            {[
              "Weddings",
              "Quinceañeras",
              "Piñatas",
              "Centerpieces",
              "Rentals",
              "Foam Cutouts",
            ].map((s) => (
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
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.4)")
                }
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
          <span
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 12,
              fontWeight: 300,
              color: "rgba(255,255,255,0.25)",
            }}
          >
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
            Est. 2006 · Merced, CA
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Story />
      <Services />
      <Gallery />
      <Shop />
      <Testimonials />
      <Banner />
      <Contact />
      <Footer />
    </>
  );
}