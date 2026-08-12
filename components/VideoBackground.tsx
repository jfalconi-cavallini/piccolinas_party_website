"use client";

import { useEffect, useRef, useState } from "react";

/*
  GLOBAL VIDEO BACKGROUND
  ─────────────────────────
  Fixed video at z-index -1. All page sections render on top of it.

  PIECEWISE VIDEO MAPPING
  ─────────────────────────
  Rather than a single linear map from scroll → video time, we define
  chapters. This lets important visual moments in the video align with
  the content sections being shown.

  The hero gets disproportionately more video time (first 22% of page
  scroll maps to the first 40% of the video) so the opening cinematic
  sequence has breathing room. Later sections get the remaining video.

  To tune: adjust the scroll endpoints (s0/s1) per chapter once you know
  where each section falls on the page, and the video endpoints (v0/v1)
  to align video content with page content.
*/

const CHAPTERS = [
  { s0: 0.00, s1: 0.22, v0: 0.00, v1: 0.40 }, // hero scroll
  { s0: 0.22, s1: 0.45, v0: 0.40, v1: 0.65 }, // story + services
  { s0: 0.45, s1: 0.70, v0: 0.65, v1: 0.82 }, // gallery + shop
  { s0: 0.70, s1: 1.00, v0: 0.82, v1: 1.00 }, // testimonials + contact
] as const;

function mapScrollToVideo(scrollP: number): number {
  const p = Math.max(0, Math.min(1, scrollP));
  for (const ch of CHAPTERS) {
    if (p <= ch.s1) {
      const local = (p - ch.s0) / (ch.s1 - ch.s0);
      return ch.v0 + local * (ch.v1 - ch.v0);
    }
  }
  return 1;
}

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let rafId: number;

    const tick = () => {
      const video = videoRef.current;
      if (video && video.duration && video.readyState >= 2) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
          const scrollP = window.scrollY / totalScroll;
          const videoP = mapScrollToVideo(scrollP);
          const target = videoP * video.duration;
          if (Math.abs(target - video.currentTime) > 0.01) {
            video.currentTime = target;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <video
      ref={videoRef}
      src="/website_hero.mp4"
      muted
      playsInline
      preload="auto"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
