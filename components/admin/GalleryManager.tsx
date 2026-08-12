"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createClient } from "@/lib/supabase/client";
import type { GalleryImage } from "@/lib/supabase/types";

// ─── Single draggable photo card ────────────────────────────────────────────

function SortablePhoto({
  image,
  onDelete,
}: {
  image: GalleryImage;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
        aspectRatio: "1",
        borderRadius: 10,
        overflow: "hidden",
        opacity: isDragging ? 0.35 : 1,
        boxShadow: isDragging
          ? "0 12px 32px rgba(0,0,0,0.18)"
          : "0 1px 4px rgba(0,0,0,0.08)",
        background: "#e4e4e7",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isDragging ? 10 : 1,
        userSelect: "none",
      }}
      {...attributes}
      {...listeners}
    >
      <Image
        src={image.public_url}
        alt=""
        fill
        sizes="(max-width: 768px) 50vw, 220px"
        style={{ objectFit: "cover", pointerEvents: "none" }}
        draggable={false}
      />

      {/* Delete button — stopPropagation so drag doesn't fire */}
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Remove photo"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.55)",
          border: "none",
          color: "#fff",
          fontSize: 18,
          lineHeight: 1,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(220,38,38,0.85)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
      >
        ×
      </button>
    </div>
  );
}

// ─── Main gallery manager ────────────────────────────────────────────────────

export default function GalleryManager({ initialData }: { initialData: GalleryImage[] }) {
  const [photos, setPhotos]           = useState(initialData);
  const [uploading, setUploading]     = useState(false);
  const [dragOver, setDragOver]       = useState(false);
  const [toast, setToast]             = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [deleting, setDeleting]       = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Upload ──────────────────────────────────────────────────────────────────
  const handleUpload = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    setUploading(true);
    setDragOver(false);
    const supabase = createClient();
    const added: GalleryImage[] = [];

    for (const file of imageFiles) {
      const ext  = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadErr } = await supabase.storage.from("media").upload(path, file);
      if (uploadErr) { showToast("Upload failed. Please try again.", "error"); continue; }

      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);

      const { data: row } = await supabase
        .from("gallery_images")
        .insert({ storage_path: path, public_url: publicUrl, alt: "", sort_order: photos.length + added.length })
        .select()
        .single();

      if (row) added.push(row);
    }

    if (added.length > 0) {
      setPhotos((prev) => [...prev, ...added]);
      showToast(added.length === 1 ? "Photo added!" : `${added.length} photos added!`);
    }
    setUploading(false);

    // Reset input so same file can be re-selected
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Reorder ─────────────────────────────────────────────────────────────────
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = photos.findIndex((p) => p.id === active.id);
    const newIndex = photos.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(photos, oldIndex, newIndex);
    setPhotos(reordered);

    const supabase = createClient();
    await Promise.all(
      reordered.map((photo, i) =>
        supabase.from("gallery_images").update({ sort_order: i }).eq("id", photo.id)
      )
    );
    showToast("Order saved!");
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const supabase = createClient();
    await supabase.storage.from("media").remove([deleteTarget.storage_path]);
    await supabase.from("gallery_images").delete().eq("id", deleteTarget.id);
    setPhotos((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setDeleting(false);
    showToast("Photo removed.");
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      style={{ maxWidth: 980, fontFamily: "system-ui, -apple-system, sans-serif" }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false); }}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); e.dataTransfer.files && handleUpload(e.dataTransfer.files); }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#18181b", margin: "0 0 6px", letterSpacing: "-0.4px" }}>
            Gallery
          </h1>
          <p style={{ fontSize: 14, color: "#71717a", margin: 0 }}>
            Manage the photos shown on your website.
          </p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "11px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: uploading ? "default" : "pointer",
            opacity: uploading ? 0.7 : 1,
            flexShrink: 0,
            transition: "opacity 0.15s",
          }}
        >
          {uploading ? "Uploading…" : "+ Add Photos"}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
      />

      {/* Toast */}
      {toast && (
        <div style={{
          background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecaca"}`,
          color: toast.type === "success" ? "#15803d" : "#dc2626",
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 20,
          fontSize: 14,
          fontWeight: 500,
        }}>
          {toast.type === "success" ? "✓ " : "⚠ "}{toast.msg}
        </div>
      )}

      {/* Empty state */}
      {photos.length === 0 && !uploading && (
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#2563eb" : "#d4d4d8"}`,
            borderRadius: 16,
            padding: "80px 40px",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "#eff6ff" : "#fafafa",
            transition: "all 0.2s",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16, lineHeight: 1 }}>📷</div>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#18181b", margin: "0 0 6px" }}>
            No photos yet
          </p>
          <p style={{ fontSize: 14, color: "#71717a", margin: 0 }}>
            Click here or drag photos in to get started
          </p>
        </div>
      )}

      {/* Uploading indicator (when photos exist) */}
      {uploading && photos.length > 0 && (
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#1d4ed8" }}>
          Uploading photos…
        </div>
      )}

      {/* Drag-over overlay (when photos exist) */}
      {dragOver && photos.length > 0 && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(37,99,235,0.08)",
          border: "3px dashed #2563eb", borderRadius: 12, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: "24px 40px", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#2563eb", margin: 0 }}>Drop to add photos</p>
          </div>
        </div>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 12,
              }}>
                {photos.map((photo) => (
                  <SortablePhoto
                    key={photo.id}
                    image={photo}
                    onDelete={() => setDeleteTarget(photo)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <p style={{ fontSize: 13, color: "#a1a1aa", textAlign: "center", marginTop: 24, marginBottom: 0 }}>
            Drag photos to change their order — saves automatically.
          </p>
        </>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: 24,
          }}
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div
            style={{
              background: "#fff", borderRadius: 14, padding: "32px",
              maxWidth: 360, width: "100%", textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative", width: 88, height: 88, borderRadius: 10, overflow: "hidden", margin: "0 auto 20px" }}>
              <Image src={deleteTarget.public_url} alt="" fill style={{ objectFit: "cover" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#18181b", margin: "0 0 8px" }}>
              Remove this photo?
            </h3>
            <p style={{ fontSize: 14, color: "#71717a", margin: "0 0 28px", lineHeight: 1.5 }}>
              It will be removed from your website gallery.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                style={{ flex: 1, padding: "12px", borderRadius: 8, border: "1px solid #d4d4d8", background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#18181b" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: "#dc2626", color: "#fff", fontSize: 14, fontWeight: 600, cursor: deleting ? "default" : "pointer", opacity: deleting ? 0.7 : 1 }}
              >
                {deleting ? "Removing…" : "Remove Photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
