import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f4f4f5", minHeight: "100vh", color: "#18181b" }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f4f4f5", color: "#18181b", minHeight: "100vh" }}>
      <style>{`
        /* Reset globals bleeding in */
        .admin-root h1, .admin-root h2, .admin-root h3 {
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 700;
          line-height: 1.2;
        }

        /* Desktop: sidebar visible, main indented */
        .admin-sidebar  { display: flex; }
        .admin-mobile-bar { display: none; }
        .admin-main { margin-left: 220px; padding: 36px 40px; }

        /* Mobile: sidebar hidden, top bar shown */
        @media (max-width: 767px) {
          .admin-sidebar { display: none; position: fixed; inset: 0; z-index: 200; width: 260px; right: auto; }
          .admin-sidebar.sidebar-open { display: flex; }
          .admin-overlay { display: block !important; }
          .admin-mobile-bar { display: flex; }
          .admin-main { margin-left: 0; padding: 72px 16px 32px; }
        }

        .admin-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 199; }
      `}</style>

      <AdminSidebar />

      <main className="admin-main" style={{ minHeight: "100vh", boxSizing: "border-box" }}>
        <div className="admin-root">
          {children}
        </div>
      </main>
    </div>
  );
}
