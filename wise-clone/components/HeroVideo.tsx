"use client";

import { useEffect, useRef, useState } from "react";

type Copy = { brand: string; title: string; description: string; button: string; pause: string; play: string };

export function HeroVideo({ dict, phone }: { dict: Copy; phone: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const update = () => {
      if (!paused && !motion.matches && visible) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    motion.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      video.pause();
    };
  }, [paused]);

  return <section className="cinematic-hero" aria-labelledby="hero-title">
    <video ref={ref} className="cinematic-hero-video" muted loop playsInline preload="auto"
      poster="/videos/hero-khaldon-v2.jpg" width="1280" height="720" aria-hidden="true">
      <source src="/videos/hero-khaldon-v2.mp4" type="video/mp4" />
    </video>
    <div className="cinematic-hero-shade" aria-hidden="true" />
    <div className="cinematic-hero-container">
      <div className="cinematic-hero-copy">
        <span className="cinematic-hero-brand">{dict.brand}</span>
        <h1 id="hero-title">{dict.title}</h1>
        <p>{dict.description}</p>
        <a className="cinematic-hero-button" href={`https://wa.me/${phone.replace(/\D/g, "")}`}
          target="_blank" rel="noopener noreferrer">{dict.button}</a>
      </div>
    </div>
    <button className="company-video-motion" type="button" aria-pressed={paused}
      onClick={() => setPaused(!paused)}>{paused ? dict.play : dict.pause}</button>
  </section>;
}
