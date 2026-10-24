"use client";

import { useEffect } from "react";
import { animate, inView } from "motion";
import { useReducedMotion } from "motion/react";

const selector = ".destination-grid > a, .business-feature-card, section h2, section > div > p, .service-card, .showcase-grid > div, .company-cards-image, .company-support-art, .branches-content > div:last-child > div, #how > div > div, figure, #news article, #faq details, #cta > div";

export function PageMotion() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;
    const running = new Map<HTMLElement, ReturnType<typeof animate>>();
    const lastReveal = new WeakMap<HTMLElement, number>();
    const reveal = (element: HTMLElement) => {
      const now = performance.now();
      if (now - (lastReveal.get(element) ?? -2000) < 1200) return;
      lastReveal.set(element, now);
      running.get(element)?.complete();
      const index = Array.from(element.parentElement?.children ?? []).indexOf(element);
      const delay = element.matches(".destination-grid > a, .service-card, .showcase-grid > div, figure, article, details")
        ? Math.min(Math.max(index, 0) * 0.09, 0.27) : 0;
      // Carousel positioning owns transform, so animate only its opacity.
      const frames = element.matches(".business-feature-card")
        ? { opacity: [0.4, 1] }
        : element.matches(".company-cards-image, .company-support-art")
          ? { opacity: [0.3, 1], scale: [0.97, 1], y: [18, 0] }
          : { opacity: [0.3, 1], y: [24, 0] };
      running.set(element, animate(element, frames, {
        duration: 0.7, delay, ease: [0.22, 1, 0.36, 1],
      }));
    };
    const cleanup = Array.from(main.querySelectorAll<HTMLElement>(selector)).map((element) =>
      inView(element, () => {
        reveal(element);
        // Returning an exit callback keeps Motion observing future entries.
        return () => running.get(element)?.complete();
      }, { margin: "0px 0px -50px 0px" })
    );

    let destination: HTMLElement | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const afterNavigation = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!destination) return;
        const nodes = [...(destination.matches(selector) ? [destination] : []), ...destination.querySelectorAll<HTMLElement>(selector)];
        const leafNodes = nodes.filter((node) => !nodes.some((parent) => parent !== node && parent.contains(node)));
        leafNodes.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) reveal(element);
        });
        destination = null;
      }, 160);
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || !link.hash) return;
      destination = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      afterNavigation();
    };
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", afterNavigation, { passive: true });
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", afterNavigation);
      cleanup.forEach((stop) => stop());
      running.forEach((control) => control.complete());
    };
  }, [reduced]);
  return null;
}
