"use client";

import { useEffect, useRef, useState } from "react";

type SpotlightCopy = {
  title: string;
  description: string;
  note: string;
  button: string;
  pause: string;
  play: string;
};

export function StocksSection({ lang, dict, phone }: { lang: string; dict: SpotlightCopy; phone: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !motion.matches && !paused) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }, { threshold: 0.15 });
    const onMotionChange = () => {
      if (motion.matches) video.pause();
    };
    motion.addEventListener("change", onMotionChange);
    observer.observe(video);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      video.pause();
    };
  }, [paused]);

  return (
    <section id="stocks" className="stocks-section" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} aria-labelledby="stocks-title">
      <div className="stocks-copy">
        <h2 id="stocks-title">{dict.title}</h2>
        <p className="stocks-description">
          {dict.description}
        </p>
        <p className="stocks-disclaimer">{dict.note}</p>
        <a className="stocks-button" href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{dict.button}</a>
      </div>
      <div className="stocks-media">
        <video ref={videoRef} muted loop playsInline preload="none" width="1600" height="960"
          poster="/videos/stocks-poster.png" aria-hidden="true">
          <source src="/videos/stocks.mp4" type="video/mp4" />
        </video>
        <button className="stocks-motion" type="button" aria-pressed={paused}
          onClick={() => {
            const next = !paused;
            setPaused(next);
            if (next) videoRef.current?.pause();
            else void videoRef.current?.play().catch(() => {});
          }}>
          {paused ? dict.play : dict.pause}
        </button>
      </div>
    </section>
  );
}
