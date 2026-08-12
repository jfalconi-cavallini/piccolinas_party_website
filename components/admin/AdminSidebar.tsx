"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Gallery",   href: "/admin/gallery" },
  { label: "Services",  href: "/admin/services" },
  { label: "Shop",      href: "/admin/shop" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside style={{
      width: 220,
      minHeight: "100vh",
      background: "#18181b",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* Brand */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #27272a" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
          Piccolinas
        </div>
        <div style={{ fontSize: 11, color: "#52525b", marginTop: 3, fontFamily: "system-ui, -apple-system, sans-serif" }}>
          Admin Panel
        </div>
      </div>

      {/* Nav — using div NOT nav to avoid global CSS `nav { position: fixed }` */}
      <div style={{ flex: 1, padding: "8px" }}>
        {navItems.map((item) => {
          const active = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} style={{
              display: "block",
              padding: "9px 12px",
              marginBottom: 2,
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? "#fff" : "#a1a1aa",
              textDecoration: "none",
              background: active ? "#27272a" : "transparent",
              borderRadius: 6,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 16px 20px", borderTop: "1px solid #27272a" }}>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{
          display: "block", fontSize: 12, color: "#71717a",
          textDecoration: "none", padding: "6px 0",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
          ↗ View website
        </a>
        <button onClick={handleLogout} style={{
          display: "block", width: "100%", textAlign: "left",
          fontSize: 12, color: "#71717a", background: "none",
          border: "none", cursor: "pointer", padding: "6px 0",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
