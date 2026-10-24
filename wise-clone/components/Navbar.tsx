import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { type Locale } from "@/app/[lang]/dictionaries";
import { MobileMenu } from "./MobileMenu";

type Dict = Awaited<ReturnType<typeof import("@/app/[lang]/dictionaries").getDictionary>>;

const LANGS: { code: Locale; label: string; flag: string }[] = [
  { code: "ar", label: "عربي", flag: "🇾🇪" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
];

export function Navbar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dict;
}) {
  const links = [
    { href: "#about", label: dict.nav.about },
    { href: "#services", label: dict.nav.services },
    { href: "#branches", label: dict.nav.branches },
    { href: "#transfer-request", label: lang === "ar" ? "اطلب حوالة" : lang === "ru" ? "Заявка" : "Request transfer" },
    { href: "#destinations", label: lang === "ar" ? "دول التحويل" : lang === "ru" ? "Направления" : "Destinations" },
    { href: "#faq", label: dict.nav.help },
  ];
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-5">
      {/* Main bar */}
      <div className="relative mx-auto flex h-16 max-w-6xl items-center gap-3 rounded-full border border-white/15 bg-[#181818]/95 px-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:h-[72px] sm:px-5">
          <Link href={`/${lang}`} className="flex items-center gap-2 text-xl font-black">
            <Image
              src="/logo.svg"
              alt={lang === "ar" ? "خلدون جميل للصرافة والتحويلات" : "Khaldon Gamil for Exchange & Transfers"}
              width={48}
              height={48}
              priority
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/20 "
            />
            <span className="company-brand-name flex flex-col leading-tight">
              <span className="text-[#d8bd78]">{lang === "ar" ? "خلدون جميل" : "Khaldon Gamil"}</span>
              <span className="text-[11px] font-medium text-white/50">
                {lang === "ar" ? "للصرافة والتحويلات" : "Exchange & Transfers"}
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative rounded-full px-3 py-2 text-white/70 transition after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-white/80 after:transition-transform hover:bg-white/5 hover:text-white hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <div
              role="group"
              aria-label="Language"
              className="flex items-center rounded-full border border-white/15 bg-white/5 p-1"
            >
              {LANGS.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  aria-current={l.code === lang ? "true" : undefined}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black transition ${
                    l.code === lang
                      ? "bg-white text-[#181818] shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  
                  {l.label}
                </Link>
              ))}
            </div>
            <a
              href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-black text-[#181818] transition hover:bg-[#e5e5e5] sm:inline-flex"
            >
              <Phone size={15} />
              {dict.nav.call}
            </a>
            <MobileMenu links={links} callLabel={dict.nav.call} phone={dict.footer.phone} dark />
          </div>
      </div>
    </header>
  );
}
