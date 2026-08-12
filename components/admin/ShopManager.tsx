"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { ShopItem } from "@/lib/supabase/types";
import AdminPageHeader from "./AdminPageHeader";
import ImageUpload from "./ImageUpload";

type Category = ShopItem["category"];
const CATEGORIES: { value: Category; label: string }[] = [
  { value: "decorations", label: "Centerpieces" },
  { value: "foamcutouts", label: "Foam Cutouts" },
  { value: "pinatas",     label: "Piñatas" },
];

const emptyItem = (category: Category): Omit<ShopItem, "id" | "created_at"> => ({
  name: "", category, image_url: "", badge: null, sort_order: 0, active: true,
});

export default function ShopManager({ initialData }: { initialData: ShopItem[] }) {
  const [items, setItems]         = useState(initialData);
  const [activeTab, setActiveTab] = useState<Category>("decorations");
  const [editing, setEditing]     = useState<ShopItem | null>(null);
  const [isNew, setIsNew]         = useState(false);
  const [form, setForm]           = useState(emptyItem("decorations"));
  const [saving, setSaving]       = useState(false);

  const filtered = items.filter((i) => i.category === activeTab);

  const openNew = () => { setForm({ ...emptyItem(activeTab), sort_order: filtered.length }); setIsNew(true); setEditing(null); };
  const openEdit = (item: ShopItem) => { setForm({ name: item.name, category: item.category, image_url: item.image_url, badge: item.badge, sort_order: item.sort_order, active: item.active }); setEditing(item); setIsNew(false); };
  const closeForm = () => { setEditing(null); setIsNew(false); };

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    if (isNew) {
      const { data } = await supabase.from("shop_items").insert(form).select().single();
      if (data) setItems((prev) => [...prev, data]);
    } else if (editing) {
      await supabase.from("shop_items").update(form).eq("id", editing.id);
      setItems((prev) => prev.map((i) => (i.id === editing.id ? { ...editing, ...form } : i)));
    }
    setSaving(false); closeForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await createClient().from("shop_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (editing?.id === id) closeForm();
  };

  const showForm = isNew || editing !== null;

  return (
    <div>
      <AdminPageHeader title="Shop" subtitle={`${items.filter((i) => i.active).length} active items`} action={<button onClick={openNew} style={btnStyle}>+ Add Item</button>} />

      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid #e4e4e7", overflowX: "auto" }}>
        {CATEGORIES.map((cat) => {
          const count  = items.filter((i) => i.category === cat.value).length;
          const active = activeTab === cat.value;
          return (
            <button key={cat.value} onClick={() => { setActiveTab(cat.value); closeForm(); }} style={{
              fontSize: 13, fontWeight: active ? 600 : 400, fontFamily: "system-ui, sans-serif",
              color: active ? "#2563eb" : "#71717a",
              background: "transparent", border: "none",
              borderBottom: active ? "2px solid #2563eb" : "2px solid transparent",
              padding: "10px 18px", cursor: "pointer",
            }}>
              {cat.label} <span style={{ opacity: 0.6 }}>({count})</span>
            </button>
          );
        })}
      </div>

      {showForm && (
        <div style={formCard}>
          <h3 style={formTitle}>{isNew ? "New Item" : `Edit: ${editing?.name}`}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
            <Field label="Item Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Badge (optional)" value={form.badge ?? ""} onChange={(v) => setForm({ ...form, badge: v || null })} />
          </div>
          <div style={{ marginBottom: 4 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#52525b", display: "block", marginBottom: 8 }}>Photo</label>
            <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="shop" />
          </div>
          <label style={{ ...checkLabel, marginTop: 16, marginBottom: 20 }}>
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} style={{ marginRight: 6 }} /> Active (visible on site)
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleSave} disabled={saving} style={btnStyle}>{saving ? "Saving…" : "Save"}</button>
            <button onClick={closeForm} style={ghostBtn}>Cancel</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p style={{ fontSize: 14, color: "#a1a1aa", textAlign: "center", padding: "60px 0" }}>No items in this category yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ background: "#fff", border: "1px solid #e4e4e7", borderRadius: 8, overflow: "hidden", opacity: item.active ? 1 : 0.5 }}>
              {item.image_url && (
                <div style={{ position: "relative", height: 120 }}>
                  <Image src={item.image_url} alt={item.name} fill style={{ objectFit: "cover" }} />
                  {item.badge && <span style={{ position: "absolute", top: 6, left: 6, fontSize: 10, fontWeight: 600, background: "#fff", color: "#18181b", padding: "2px 6px", borderRadius: 4 }}>{item.badge}</span>}
                </div>
              )}
              <div style={{ padding: "12px 14px" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#18181b", margin: "0 0 10px" }}>{item.name}</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => openEdit(item)} style={iconBtn}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ ...iconBtn, color: "#dc2626" }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 500, color: "#52525b", display: "block", marginBottom: 6 }}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", border: "1px solid #d4d4d8", borderRadius: 6, background: "#fff", color: "#18181b", fontSize: 13, padding: "8px 12px", outline: "none", boxSizing: "border-box", fontFamily: "system-ui, sans-serif" }} />
    </div>
  );
}

const btnStyle: React.CSSProperties = { background: "#2563eb", border: "none", color: "#fff", fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "system-ui, sans-serif" };
const ghostBtn: React.CSSProperties = { background: "#fff", border: "1px solid #d4d4d8", color: "#52525b", fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontFamily: "system-ui, sans-serif" };
const iconBtn: React.CSSProperties = { background: "none", border: "none", color: "#71717a", cursor: "pointer", fontSize: 12, fontFamily: "system-ui, sans-serif", padding: "4px 8px", borderRadius: 4 };
const checkLabel: React.CSSProperties = { fontSize: 13, color: "#52525b", display: "flex", alignItems: "center", cursor: "pointer", fontFamily: "system-ui, sans-serif" };
const formCard: React.CSSProperties = { background: "#fff", border: "1px solid #e4e4e7", borderRadius: 8, padding: "24px", marginBottom: 20 };
const formTitle: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: "#18181b", marginBottom: 20 };
