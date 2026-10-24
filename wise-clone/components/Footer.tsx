import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

type Dict = Awaited<ReturnType<typeof import("@/app/[lang]/dictionaries").getDictionary>>;

export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const destinations = [
    ["#about", "#branches", "#services", "#destinations"],
    ["#company-services", "#services", "#services", "#khaldon-solutions"],
    ["#company-support", "#pricing", "#faq", `tel:${dict.footer.phone.replace(/\s/g, "")}`],
  ];
  return (
    <footer className="bg-[#141414] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xl font-black">
            <Image
              src="/logo.svg"
              alt={lang === "ar" ? "خلدون جميل للصرافة والتحويلات" : "Khaldon Gamil for Exchange & Transfers"}
              width={48}
              height={48}
              className="h-10 w-10 rounded-md object-cover"
            />
            {lang === "ar" ? "خلدون جميل" : "Khaldon Gamil"}
          </div>
          <p className="opacity-70">{dict.footer.tagline}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2 opacity-80">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#d4af37]" />
              {dict.footer.address}
            </li>
            <li>
              <a href={`tel:${dict.footer.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 opacity-80 hover:opacity-100">
                <Phone size={16} className="shrink-0 text-[#d4af37]" />
                <span dir="ltr">{dict.footer.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${dict.footer.email}`} className="flex items-center gap-2 opacity-80 hover:opacity-100">
                <Mail size={16} className="shrink-0 text-[#d4af37]" />
                {dict.footer.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {dict.footer.columns.map((col, columnIndex) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-bold uppercase opacity-60">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l, linkIndex) => (
                  <li key={l}><a href={destinations[columnIndex]?.[linkIndex] ?? "#company-support"} className="opacity-80 hover:opacity-100">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs opacity-60">{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
