"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({ value, onChange, folder = "uploads" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const [error, setError]         = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    setUploading(true);
    setError("");
    const supabase = createClient();
    const ext  = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage.from("media").upload(path, file);
    if (uploadErr) { setError("Upload failed. Please try again."); setUploading(false); return; }

    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    onChange(publicUrl);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />

      {value ? (
        /* Preview with replace button */
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 8, overflow: "hidden", background: "#f4f4f5" }}>
          <Image src={value} alt="Preview" fill style={{ objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0)")}
          >
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                position: "absolute", bottom: 10, right: 10,
                background: "rgba(0,0,0,0.65)", color: "#fff",
                border: "none", borderRadius: 6,
                padding: "6px 12px", fontSize: 12, fontWeight: 500,
                cursor: "pointer", fontFamily: "system-ui, sans-serif",
                backdropFilter: "blur(4px)",
              }}
            >
              {uploading ? "Uploading…" : "Replace photo"}
            </button>
          </div>
        </div>
      ) : (
        /* Upload zone */
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) upload(f); }}
          style={{
            width: "100%",
            aspectRatio: "16/9",
            border: `2px dashed ${dragOver ? "#2563eb" : "#d4d4d8"}`,
            borderRadius: 8,
            background: dragOver ? "#eff6ff" : "#fafafa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: uploading ? "default" : "pointer",
            transition: "all 0.15s",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 24 }}>📷</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#52525b", fontFamily: "system-ui, sans-serif" }}>
            {uploading ? "Uploading…" : "Click or drag to upload photo"}
          </span>
        </div>
      )}

      {error && (
        <p style={{ fontSize: 12, color: "#dc2626", margin: "6px 0 0", fontFamily: "system-ui, sans-serif" }}>{error}</p>
      )}
    </div>
  );
}
