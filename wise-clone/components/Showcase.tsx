import type { getDictionary } from "@/app/[lang]/dictionaries";

// Kept as a simple contact panel; no demo accounts or estimated transfer rates.
export function Showcase({ dict }: { dict: Awaited<ReturnType<typeof getDictionary>> }) {
  return <div className="transfer-quote"><h2>{dict.quote.title}</h2><p>{dict.quote.text}</p>
    <a className="stocks-button" href={`https://wa.me/${dict.footer.phone.replace(/\D/g, "")}`}>{dict.quote.button}</a>
  </div>;
}
