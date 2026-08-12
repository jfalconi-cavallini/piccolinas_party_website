"use client";

import { useState } from "react";
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
  const pathname    = usePathname();
  const router      = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const close = () => setOpen(false);

  const sidebarContent = (
    <>
      {/* Brand */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "system-ui, sans-serif" }}>Piccolinas</div>
          <div style={{ fontSize: 11, color: "#52525b", marginTop: 2, fontFamily: "system-ui, sans-serif" }}>Admin Panel</div>
        </div>
        {/* Close button — only visible on mobile */}
        <button
          onClick={close}
          className="admin-sidebar-close"
          style={{ background: "none", border: "none", color: "#71717a", fontSize: 22, cursor: "pointer", padding: "4px 6px", lineHeight: 1 }}
        >
          ✕
        </button>
      </div>

      {/* Nav links */}
      <div style={{ flex: 1, padding: "8px" }}>
        {navItems.map((item) => {
          const active = item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={close} style={{
              display: "block",
              padding: "10px 12px",
              marginBottom: 2,
              fontSize: 14,
              fontWeight: active ? 600 : 400,
              color: active ? "#fff" : "#a1a1aa",
              textDecoration: "none",
              background: active ? "#27272a" : "transparent",
              borderRadius: 6,
              fontFamily: "system-ui, sans-serif",
            }}>
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 16px 24px", borderTop: "1px solid #27272a" }}>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 13, color: "#71717a", textDecoration: "none", padding: "7px 0", fontFamily: "system-ui, sans-serif" }}>
          ↗ View website
        </a>
        <button onClick={handleLogout} style={{ display: "block", width: "100%", textAlign: "left", fontSize: 13, color: "#71717a", background: "none", border: "none", cursor: "pointer", padding: "7px 0", fontFamily: "system-ui, sans-serif" }}>
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="admin-mobile-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 56,
        background: "#18181b", zIndex: 198, alignItems: "center",
        padding: "0 16px", justifyContent: "space-between",
        borderBottom: "1px solid #27272a",
      }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "system-ui, sans-serif" }}>Piccolinas Admin</span>
        <button onClick={() => setOpen(true)} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: "4px 6px", lineHeight: 1 }}>
          ☰
        </button>
      </div>

      {/* Overlay (mobile only) */}
      {open && (
        <div className="admin-overlay" onClick={close} />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar${open ? " sidebar-open" : ""}`}
        style={{
          background: "#18181b",
          width: 220,
          minHeight: "100vh",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {sidebarContent}
      </aside>

      {/* Hide close button on desktop */}
      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar-close { display: none !important; }
        }
      `}</style>
    </>
  );
}
