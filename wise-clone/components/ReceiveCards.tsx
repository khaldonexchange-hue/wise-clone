"use client";

import { useEffect, useState } from "react";
import { Landmark, Pause, Play } from "lucide-react";

const CARDS = [
  { code: "EUR", flag: "🇪🇺", amount: "€5.211", cents: ",23", iban: "BE47 9672 0617 7203" },
  { code: "USD", flag: "🇺🇸", amount: "$12,480", cents: ".00", iban: "US64 0000 1234 5678" },
  { code: "GBP", flag: "🇬🇧", amount: "£8,940", cents: ".55", iban: "GB29 6016 1331 9268" },
];

// Stacked currency cards that auto-cycle, front card on top.
// Vertical offsets only, so it works the same in LTR and RTL.
export function ReceiveCards({
  pauseLabel,
  playLabel,
}: {
  pauseLabel: string;
  playLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % CARDS.length),
      3000
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div>
      <div className="receive-stack relative h-44" role="img" aria-label="Rotating currency balances">
        {CARDS.map((c, i) => {
          const pos = (i - index + CARDS.length) % CARDS.length;
          return (
            <div
              key={c.code}
              aria-hidden={pos !== 0}
              style={{ zIndex: CARDS.length - pos }}
              className={`absolute inset-x-0 rounded-2xl bg-white p-3 text-[#141414] shadow-xl transition-all duration-500 ${
                pos === 0
                  ? "top-6 scale-100 opacity-100"
                  : pos === 1
                    ? "top-3 scale-[0.96] opacity-80"
                    : "top-0 scale-[0.92] opacity-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-black">{c.code}</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#141414] text-sm">
                  {c.flag}
                </span>
              </div>
              <p className="mt-0.5 text-3xl font-black tracking-tight">
                {c.amount}
                <span className="text-lg">{c.cents}</span>
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs font-bold opacity-70">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#d4af37] text-[#141414]">
                  <Landmark size={12} />
                </span>
                {c.iban}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? playLabel : pauseLabel}
          className="grid h-8 w-8 place-items-center rounded-full bg-white/70 text-[#141414] shadow hover:bg-white"
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
    </div>
  );
}
