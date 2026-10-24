"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Copy = {
  slides: { title: string; description: string; label: string }[];
  supportTitle: string;
  supportDescription: string;
  button: string;
  pause: string;
  play: string;
  navigation: string;
};

function BackgroundVideo({ src, paused }: { src: string; paused: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !paused && !motion.matches) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.1 });
    observer.observe(video);
    motion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      video.pause();
    };
  }, [paused]);
  return <video ref={ref} className="company-background-video" muted loop playsInline
    preload="metadata" poster={src.replace(".mp4", ".jpg")} aria-hidden="true">
    <source src={src} type="video/mp4" />
  </video>;
}

export function CompanyVideoSections({ lang, dict, phone, part = "all" }: { lang: string; dict: Copy; phone: string; part?: "all" | "services" | "support" }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = dict.slides[active];
  const whatsapp = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    {part !== "support" && <section id="company-services" className={`company-video-section ${active === 0 ? "company-image-section" : ""}`} aria-labelledby="company-video-title">
      {active !== 0 && <BackgroundVideo key={active} src={`/videos/company-${active + 1}.mp4`} paused={paused} />}
      {active !== 0 && <div className="company-video-shade" aria-hidden="true" />}
      <div className="company-video-copy" key={`copy-${active}`}>
        <h2 id="company-video-title">{slide.title}</h2>
        <p>{slide.description}</p>
        <a className="stocks-button" href={whatsapp} target="_blank" rel="noopener noreferrer">{dict.button}</a>
      </div>
      {active === 0 && <div className="company-cards-image">
        <Image src="/features/khaldon-cards.png" alt="" width={1672} height={941}
          sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1200px) 50vw, 600px" />
      </div>}
      <div className="company-video-navigation" role="group" aria-label={dict.navigation}>
        {dict.slides.map((item, index) => <button key={item.label} type="button"
          aria-pressed={index === active} onClick={() => setActive(index)}>{item.label}</button>)}
      </div>
      {active !== 0 && <button className="company-video-motion" type="button" aria-pressed={paused}
        onClick={() => setPaused(!paused)}>{paused ? dict.play : dict.pause}</button>}
    </section>}
    {part !== "services" && <section id="company-support" className="company-video-section company-support-section company-support-image-section" aria-labelledby="company-support-title">
      <div className="company-support-art">
        <Image src="/features/khaldon-whatsapp.png" alt="" width={1916} height={821}
          sizes="(max-width: 767px) 100vw, (max-width: 1200px) 100vw, 1200px" />
      </div>
      <div className="company-video-copy">
        <h2 id="company-support-title">{dict.supportTitle}</h2>
        <p>{dict.supportDescription}</p>
        <a className="stocks-button" href={whatsapp} target="_blank" rel="noopener noreferrer">{dict.button}</a>
      </div>

    </section>}
  </div>;
}
