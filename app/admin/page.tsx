import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [gallery, services, shop] = await Promise.all([
    supabase.from("gallery_images").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }).eq("active", true),
    supabase.from("shop_items").select("id", { count: "exact", head: true }).eq("active", true),
  ]);

  const sections = [
    {
      label: "Gallery",
      count: gallery.count ?? 0,
      unit: "photos",
      href: "/admin/gallery",
      description: "Add, remove, and reorder photos shown in the website gallery.",
      icon: "🖼️",
    },
    {
      label: "Services",
      count: services.count ?? 0,
      unit: "active",
      href: "/admin/services",
      description: "Edit your service offerings, descriptions, and pricing info.",
      icon: "✨",
    },
    {
      label: "Shop",
      count: shop.count ?? 0,
      unit: "items",
      href: "/admin/shop",
      description: "Manage centerpieces, piñatas, and foam cutout listings.",
      icon: "🛍️",
    },
  ];

  return (
    <>
      <style>{`
        .dash-card { transition: box-shadow 0.15s, transform 0.15s; }
        .dash-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.09); transform: translateY(-1px); }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{
          fontSize: 26,
          fontWeight: 700,
          color: "#18181b",
          margin: "0 0 6px",
          letterSpacing: "-0.5px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
          Welcome back 👋
        </h1>
        <p style={{ fontSize: 14, color: "#71717a", margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
          Here's everything you can manage on your website.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 16,
        maxWidth: 720,
      }}>
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="dash-card"
            style={{
              display: "block",
              textDecoration: "none",
              background: "#fff",
              border: "1px solid #e4e4e7",
              borderRadius: 12,
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#2563eb",
                background: "#eff6ff",
                borderRadius: 20,
                padding: "3px 10px",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}>
                {s.count} {s.unit}
              </span>
            </div>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#18181b",
              marginBottom: 6,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
              {s.label}
            </div>
            <div style={{
              fontSize: 13,
              color: "#71717a",
              lineHeight: 1.5,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
              {s.description}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick link to public site */}
      <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #e4e4e7", maxWidth: 720 }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "#71717a",
            textDecoration: "none",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ↗ Open public website in new tab
        </a>
      </div>
    </>
  );
}
