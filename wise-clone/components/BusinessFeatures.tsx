"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Copy = {
  title: string; description: string; primary: string; secondary: string;
  previous: string; next: string; navigation: string;
  items: { title: string; detail: string }[];
};
const images = ["/features/business-1.png", "/features/business-5.png", "/hero-bg.jpg", "/features/business-4.png", "/features/business-5.png"];

export function BusinessFeatures({ lang, dict, phone }: { lang: string; dict: Copy; phone: string }) {
  const [active, setActive] = useState(0);
  const start = useRef<number | null>(null);
  const rtl = lang === "ar";
  const change = (step: number) => setActive((index) => (index + step + dict.items.length) % dict.items.length);
  return <section id="khaldon-solutions" className="business-features" aria-labelledby="business-features-title">
    <div className="business-features-copy">
      <span className="business-features-brand">{lang === "ar" ? "خلدون جميل" : "Khaldon Gamil"}</span>
      <h2 id="business-features-title">{dict.title}</h2>
      <p>{dict.description}</p>
      <div className="business-features-actions">
        <a href={`https://wa.me/${phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{dict.primary}</a>
        <a href="#branches">{dict.secondary}</a>
      </div>
    </div>
    <div className="business-carousel" role="region" aria-roledescription="carousel" aria-label={dict.navigation}
      onPointerDown={(event) => { start.current = event.clientX; }}
      onPointerUp={(event) => {
        if (start.current !== null && Math.abs(event.clientX - start.current) > 45) {
          const step = event.clientX < start.current ? 1 : -1;
          change(rtl ? -step : step);
        }
        start.current = null;
      }} onPointerCancel={() => { start.current = null; }}>
      {dict.items.map((item, index) => {
        let offset = (index - active + dict.items.length) % dict.items.length;
        if (offset > Math.floor(dict.items.length / 2)) offset -= dict.items.length;
        const distance = Math.abs(offset);
        return <button key={item.title} type="button" className={`business-feature-card ${distance === 0 ? "is-active" : ""}`}
          aria-pressed={index === active} aria-label={item.title} onClick={() => setActive(index)}
          style={{ transform: `translateX(calc(-50% + ${offset * (rtl ? -1 : 1)} * (var(--feature-card-width) + 16px))) scale(${distance === 0 ? 1 : .94})`, zIndex: 5 - distance }}>
          <Image src={images[index % images.length]} alt="" fill sizes="(max-width: 640px) 60vw, 212px" draggable={false} />
          <div className="business-feature-card-shade" />
          <span className="business-feature-card-title">{item.title}</span>
          <span className="business-feature-card-detail"><span className="business-feature-monogram">KJ</span><span>{item.detail}</span></span>
        </button>;
      })}
    </div>
    <div className="business-carousel-controls">
      <button type="button" aria-label={dict.previous} onClick={() => change(-1)}>{rtl ? <ArrowRight size={19} /> : <ArrowLeft size={19} />}</button>
      <div role="group" aria-label={dict.navigation}>
        {dict.items.map((item, index) => <button key={item.title} type="button" aria-label={item.title}
          aria-pressed={active === index} onClick={() => setActive(index)} className={active === index ? "is-active" : ""} />)}
      </div>
      <button type="button" aria-label={dict.next} onClick={() => change(1)}>{rtl ? <ArrowLeft size={19} /> : <ArrowRight size={19} />}</button>
    </div>
  </section>;
}
