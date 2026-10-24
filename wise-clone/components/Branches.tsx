"use client";

import { useMemo, useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";

type Branch = {
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
};

export function Branches({
  dict,
}: {
  dict: { all: string; items: Branch[] };
}) {
  const cities = useMemo(
    () => Array.from(new Set(dict.items.map((b) => b.city))),
    [dict.items]
  );
  const [city, setCity] = useState<string | null>(null);
  const list = city ? dict.items.filter((b) => b.city === city) : dict.items;

  return (
    <div className="branches-content">
      <div className="mb-6 flex flex-wrap gap-2">
        {cities.length > 1 && (
          <button
            type="button"
            onClick={() => setCity(null)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              city === null
                ? "bg-[#141414] text-[#d4af37]"
                : "border border-black/15 hover:bg-black/5"
            }`}
          >
            {dict.all}
          </button>
        )}
        {cities.length > 1 && cities.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCity(c)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              city === c
                ? "bg-[#141414] text-[#d4af37]"
                : "border border-black/15 hover:bg-black/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => (
          <div key={b.name} className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#9a7418]">{b.city}</p>
            <h3 className="mt-1 font-black">{b.name}</h3>
            <p className="mt-3 flex items-start gap-2 text-sm opacity-70">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {b.address}
            </p>
            {b.hours ? (
              <p className="mt-2 flex items-center gap-2 text-sm opacity-70">
                <Clock size={16} className="shrink-0" /> {b.hours}
              </p>
            ) : null}
            {b.phone && <a
              href={`tel:${b.phone.replace(/\s/g, "")}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#141414]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#d4af37] text-[#141414]">
                <Phone size={15} />
              </span>
              <span dir="ltr">{b.phone}</span>
            </a>}
          </div>
        ))}
      </div>
    </div>
  );
}
