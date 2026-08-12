"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLogin() {
  const router  = useRouter();
  const params  = useSearchParams();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: authError } = await createClient().auth.signInWithPassword({ email, password });
    if (authError) { setError("Invalid email or password."); setLoading(false); return; }
    router.push(params.get("next") ?? "/admin");
    router.refresh();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 380, background: "#fff", border: "1px solid #e4e4e7", borderRadius: 10, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#18181b", margin: "0 0 4px", letterSpacing: "-0.4px" }}>Piccolinas Admin</h1>
          <p style={{ fontSize: 13, color: "#71717a", margin: 0 }}>Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#18181b", display: "block", marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
              style={{ width: "100%", border: "1px solid #d4d4d8", borderRadius: 6, padding: "10px 12px", fontSize: 14, color: "#18181b", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#18181b", display: "block", marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
              style={{ width: "100%", border: "1px solid #d4d4d8", borderRadius: 6, padding: "10px 12px", fontSize: 14, color: "#18181b", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>

          {error && <p style={{ fontSize: 13, color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "10px 12px", margin: 0 }}>{error}</p>}

          <button type="submit" disabled={loading}
            style={{ background: loading ? "#93c5fd" : "#2563eb", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, padding: "11px", borderRadius: 6, cursor: loading ? "default" : "pointer", marginTop: 4, fontFamily: "inherit" }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
