const flags = ["🇷🇺", "🇾🇪", "🇸🇦", "🇹🇷", "🇪🇬", "🇲🇾", "🇨🇳", "🇦🇪", "🇮🇶", "🇸🇩", "🇩🇿", "🇲🇦", "🇹🇳", "🇰🇼", "🇶🇦", "🇴🇲", "🇺🇸", "🇪🇺"];

type Copy = { title: string; description: string; note: string; button: string; names: string[] };
export function Destinations({ dict, phone }: { dict: Copy; phone: string }) {
  const whatsapp = `https://wa.me/${phone.replace(/\D/g, "")}`;
  return <section id="destinations" className="destinations-section">
    <div className="mx-auto max-w-6xl px-5">
      <h2>{dict.title}</h2><p className="destinations-intro">{dict.description}</p>
      <div className="destination-grid">{dict.names.map((name, index) =>
        <a key={name} href={`${whatsapp}?text=${encodeURIComponent(`${dict.button}: ${name}`)}`} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">{flags[index]}</span><strong>{name}</strong>
        </a>)}
      </div>
      <p className="destination-note">{dict.note}</p>
    </div>
  </section>;
}
