"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";

export function MobileMenu({
  links,
  callLabel,
  phone,
  dark,
}: {
  links: { href: string; label: string }[];
  callLabel: string;
  phone: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Menu"
        className={`grid h-10 w-10 place-items-center rounded-full border ${
          dark ? "border-white/20 text-white" : "border-black/15"
        }`}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div
          className={`absolute inset-x-0 top-full mt-2 overflow-hidden rounded-3xl border px-2 py-2 backdrop-blur-xl ${
            dark
              ? "border-white/10 bg-[#181818]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
              : "border-black/10 bg-white/95"
          }`}
        >
          <nav className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-bold ${
                  dark ? "hover:bg-white/10" : "hover:bg-black/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#181818] hover:bg-[#e5e5e5]"
            >
              <Phone size={16} /> {callLabel}
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
