"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/lib/supabase/types";
import AdminPageHeader from "./AdminPageHeader";
import ImageUpload from "./ImageUpload";

const emptyService = (): Omit<Service, "id" | "created_at"> => ({
  title: "", subtitle: "", description: "", image_url: "", is_featured: false, sort_order: 0, active: true,
});

export default function ServicesManager({ initialData }: { initialData: Service[] }) {
  const [services, setServices] = useState(initialData);
  const [editing, setEditing]   = useState<Service | null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [form, setForm]         = useState(emptyService());
  const [saving, setSaving]     = useState(false);

  const openNew = () => { setForm({ ...emptyService(), sort_order: services.length }); setIsNew(true); setEditing(null); };
  const openEdit = (s: Service) => { setForm({ title: s.title, subtitle: s.subtitle, description: s.description, image_url: s.image_url, is_featured: s.is_featured, sort_order: s.sort_order, active: s.active }); setEditing(s); setIsNew(false); };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    if (isNew) {
      const { data } = await supabase.from("services").insert(form).select().single();
      if (data) setServices((prev) => [...prev, data]);
    } else if (editing) {
      await supabase.from("services").update(form).eq("id", editing.id);
      setServices((prev) => prev.map((s) => (s.id === editing.id ? { ...editing, ...form } : s)));
    }
    setSaving(false); closeForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await createClient().from("services").delete().eq("id", id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    if (editing?.id === id) closeForm();
  };

  const toggleActive = async (s: Service) => {
    await createClient().from("services").update({ active: !s.active }).eq("id", s.id);
    setServices((prev) => prev.map((i) => (i.id === s.id ? { ...i, active: !i.active } : i)));
  };

  const showForm = isNew || editing !== null;

  return (
    <div>
      <AdminPageHeader title="Services" subtitle={`${services.filter((s) => s.active).length} active`} action={<button onClick={openNew} style={btnStyle}>+ Add Service</button>} />

      {showForm && (
        <div style={formCard}>
          <h3 style={formTitle}>{isNew ? "New Service" : `Edit: ${editing?.title}`}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            <Field label="Subtitle" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#52525b", display: "block", marginBottom: 8 }}>Photo</label>
            <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="services" />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 16, marginBottom: 20 }}>
            <label style={checkLabel}><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} style={{ marginRight: 6 }} /> Featured (shows larger)</label>
            <label style={checkLabel}><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} style={{ marginRight: 6 }} /> Active (visible on site)</label>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSave} disabled={saving} style={btnStyle}>{saving ? "Saving…" : "Save"}</button>
            <button onClick={closeForm} style={ghostBtn}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {services.map((svc) => (
          <div key={svc.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid #e4e4e7", borderRadius: 8, padding: "12px 16px", opacity: svc.active ? 1 : 0.5 }}>
            {svc.image_url && (
              <div style={{ position: "relative", width: 52, height: 40, flexShrink: 0, borderRadius: 4, overflow: "hidden" }}>
                <Image src={svc.image_url} alt={svc.title} fill style={{ objectFit: "cover" }} />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#18181b" }}>{svc.title}</span>
                {svc.is_featured && <span style={tagStyle}>Featured</span>}
                {!svc.active && <span style={{ ...tagStyle, background: "#f4f4f5", color: "#71717a" }}>Hidden</span>}
              </div>
              <p style={{ fontSize: 12, color: "#71717a", margin: "2px 0 0", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{svc.subtitle}</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button onClick={() => toggleActive(svc)} style={iconBtn} title={svc.active ? "Hide" : "Show"}>{svc.active ? "○" : "●"}</button>
              <button onClick={() => openEdit(svc)} style={iconBtn}>Edit</button>
              <button onClick={() => handleDelete(svc.id)} style={{ ...iconBtn, color: "#dc2626" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  const base: React.CSSProperties = { width: "100%", border: "1px solid #d4d4d8", borderRadius: 6, background: "#fff", color: "#18181b", fontSize: 13, padding: "8px 12px", outline: "none", boxSizing: "border-box", fontFamily: "system-ui, sans-serif", resize: "vertical" };
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 500, color: "#52525b", display: "block", marginBottom: 6 }}>{label}</label>
      {textarea ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={base} /> : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={base} />}
    </div>
  );
}

const btnStyle: React.CSSProperties = { background: "#2563eb", border: "none", color: "#fff", fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "system-ui, sans-serif" };
const ghostBtn: React.CSSProperties = { background: "#fff", border: "1px solid #d4d4d8", color: "#52525b", fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "system-ui, sans-serif" };
const iconBtn: React.CSSProperties = { background: "none", border: "none", color: "#71717a", cursor: "pointer", fontSize: 12, fontFamily: "system-ui, sans-serif", padding: "4px 8px", borderRadius: 4 };
const tagStyle: React.CSSProperties = { fontSize: 11, fontWeight: 500, background: "#eff6ff", color: "#2563eb", padding: "2px 8px", borderRadius: 4 };
const checkLabel: React.CSSProperties = { fontSize: 13, color: "#52525b", display: "flex", alignItems: "center", cursor: "pointer", fontFamily: "system-ui, sans-serif" };
const formCard: React.CSSProperties = { background: "#fff", border: "1px solid #e4e4e7", borderRadius: 8, padding: "24px", marginBottom: 20 };
const formTitle: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: "#18181b", marginBottom: 20 };
