"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useReveal } from "@/hooks/useReveal";

export default function Contact() {
  const revealRef = useReveal<HTMLDivElement>();
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        "rxwVzihhHWK9JLH-l"
      );
      setSent(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "120px 40px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(6,4,2,0.78) 8%, rgba(6,4,2,0.78) 92%, rgba(0,0,0,0) 100%)",
      }}
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
        <div ref={revealRef} data-reveal>
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title" style={{ marginBottom: 8, color: "#FDF8F0" }}>
            Let's Create
          </h2>
          <h2
            className="section-title"
            style={{ fontStyle: "italic", color: "#C9A84C", marginBottom: 32 }}
          >
            Something Beautiful
          </h2>

          <div style={{ height: 1, width: 80, background: "#C9A84C", marginBottom: 32 }} />

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: "rgba(253,248,240,0.72)",
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
              { label: "Location", value: "Merced, California", icon: "📍" },
              { label: "Service Area", value: "Central Valley & Beyond", icon: "🗺️" },
              { label: "Est.", value: "Since 2005 — 20+ Years of Excellence", icon: "✦" },
              { label: "Specialties", value: "Weddings · Quinceañeras · University Events", icon: "🌸" },
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
                      color: "rgba(253,248,240,0.85)",
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

              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
                  className="form-row"
                >
                  {[
                    { name: "name", placeholder: "Your Full Name", type: "text" },
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
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
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
                    <option value="" disabled>TYPE OF EVENT</option>
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
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#8B6914")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#C9A84C")}
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
