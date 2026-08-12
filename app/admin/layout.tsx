import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div style={{
        /* Reset global site styles for the login page */
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#f4f4f5",
        minHeight: "100vh",
        color: "#18181b",
      }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{
      /* Reset global site styles (body is #0a0a0a, nav is position:fixed, etc.) */
      fontFamily: "system-ui, -apple-system, sans-serif",
      background: "#f4f4f5",
      color: "#18181b",
      minHeight: "100vh",
      display: "flex",
    }}>
      <AdminSidebar />
      <main style={{
        flex: 1,
        minHeight: "100vh",
        padding: "36px 40px",
        /* Clamp width so content doesn't stretch on very wide screens */
        maxWidth: "calc(100vw - 220px)",
        boxSizing: "border-box",
      }}>
        {/* Override h1/h2/h3 that globals.css sets to Cormorant Garamond */}
        <style>{`
          .admin-root h1,
          .admin-root h2,
          .admin-root h3 {
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: 700;
            line-height: 1.2;
          }
        `}</style>
        <div className="admin-root">
          {children}
        </div>
      </main>
    </div>
  );
}
