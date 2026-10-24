"use client";

import { useState } from "react";
import Image from "next/image";

const FILES: Record<string, string> = {
  "Western Union": "/partners/western-union.svg",
  MoneyGram: "/partners/moneygram.svg",
  "Zain Cash": "/partners/zain.svg",
  FIB: "/partners/fib.svg",
};

function TextBadge({ name }: { name: string }) {
  return (
    <div className="flex h-24 w-48 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#f3f3f3] shadow-sm">
      {name === "Western Union" && (
        <>
          <span className="text-xl font-black leading-none text-black">Western</span>
          <span className="text-xl font-black leading-none text-black">Union</span>
        </>
      )}
      {name === "MoneyGram" && (
        <>
          <span className="text-xl font-black leading-none text-black">MoneyGram</span>
          <span className="text-xs font-bold text-black/60">money transfer</span>
        </>
      )}
      {name === "Zain Cash" && (
        <>
          <span className="text-xl font-black lowercase leading-none text-[#3f2a85]">zain</span>
          <span className="text-xs font-bold tracking-[0.3em] text-[#3f2a85]/80">CASH</span>
        </>
      )}
      {name === "FIB" && (
        <span className="text-2xl font-black tracking-[0.2em] text-[#4a4a4a]">FIB</span>
      )}
      {name === "Switch" && (
        <span className="text-2xl font-black uppercase text-black">Switch</span>
      )}
    </div>
  );
}

function PartnerLogo({ name, hidden }: { name: string; hidden?: boolean }) {
  const [failed, setFailed] = useState(false);
  const file = FILES[name];
  return (
    <div aria-hidden={hidden || undefined}>
      {!file || failed ? (
        <TextBadge name={name} />
      ) : (
        <div className="relative h-24 w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#f3f3f3] shadow-sm">
          <Image
            src={file}
            alt={name}
            fill
            sizes="192px"
            className="object-contain p-3"
            onError={() => setFailed(true)}
          />
        </div>
      )}
    </div>
  );
}

// Infinite auto-scrolling partner strip (original implementation,
// no third-party slider). Pauses on hover, disabled with reduced motion.
export function Partners({
  dict,
}: {
  dict: { title: string; sub: string; items: string[] };
}) {
  const doubled = [...dict.items, ...dict.items];
  return (
    <section className="partners-section overflow-hidden bg-[#08090b] pb-14 pt-16 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{dict.title}</h2>
        <p className="mt-3 text-white/55">{dict.sub}</p>
      </div>
      <div
        dir="ltr"
        className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="partners-track flex w-max hover:[animation-play-state:paused]">
          {doubled.map((n, i) => (
            <div key={`${n}-${i}`} className="me-6">
              <PartnerLogo name={n} hidden={i >= dict.items.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
