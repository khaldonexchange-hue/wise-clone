import { TransferRequest } from "@/components/TransferRequest";
import { PageMotion } from "@/components/PageMotion";
import { BusinessFeatures } from "@/components/BusinessFeatures";
import { HeroVideo } from "@/components/HeroVideo";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { CompanyVideoSections } from "@/components/CompanyVideoSections";
import { StocksSection } from "@/components/StocksSection";
import { Destinations } from "@/components/Destinations";
import { Branches } from "@/components/Branches";
import { Partners } from "@/components/Partners";
import { Banknote, Briefcase, Receipt, Send } from "lucide-react";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const icons = [Send, Banknote, Receipt, Briefcase];

  return (
    <div className="premium-page">
      <PageMotion />
      <HeroVideo dict={dict.cinematicHero} phone={dict.footer.phone} />

      <TransferRequest dict={dict.transferRequest} countries={dict.destinations.names} phone={dict.footer.phone} />

      <BusinessFeatures lang={lang} dict={dict.businessFeatures} phone={dict.footer.phone} />

      <div className="services-dark-area">
      {/* ABOUT + SERVICES */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <h2 className="mb-3 max-w-2xl text-3xl font-black sm:text-4xl">{dict.about.title}</h2>
        <p className="mb-6 max-w-3xl opacity-70">{dict.about.text}</p>
        <ul className="company-principles">{dict.about.principles.map((item) => <li key={item}>{item}</li>)}</ul>
        <div id="services" className="grid scroll-mt-20 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.services.items.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={c.title} className="service-card rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#d4af37] text-[#141414]">
                  <Icon size={22} />
                </span>
                <h3 className="mb-2 font-black">{c.title}</h3>
                <p className="text-sm opacity-70">{c.text}</p>
                <a href="#company-services" className="mt-3 inline-block text-sm font-bold underline underline-offset-4">
                  {dict.services.more}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      </div>

      <CompanyVideoSections part="services" lang={lang} dict={dict.companyVideos} phone={dict.footer.phone} />

      <Destinations dict={dict.destinations} phone={dict.footer.phone} />

      <div className="lower-sections">
      {/* STEPS */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <h2 className="mb-8 text-center text-3xl font-black">{dict.steps.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {dict.steps.items.map((s) => (
            <div key={s.title} className="rounded-3xl bg-[#faf6ec] p-6">
              <h3 className="mb-2 font-black">{s.title}</h3>
              <p className="text-sm opacity-70">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      </div>

      <section id="pricing" className="transfer-quote">
        <div><h2>{dict.quote.title}</h2><p>{dict.quote.text}</p>
        <a className="stocks-button" href={`https://wa.me/${dict.footer.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{dict.quote.button}</a></div>
      </section>

      <div className="lower-sections">
      {/* BRANCHES */}
      <section id="branches" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <h2 className="mb-2 text-3xl font-black sm:text-4xl">{dict.branches.title}</h2>
        <p className="mb-8 opacity-70">{dict.branches.sub}</p>
        <Branches dict={dict.branches} />
      </section>

      <Partners dict={dict.partners} />

      <CompanyVideoSections part="support" lang={lang} dict={dict.companyVideos} phone={dict.footer.phone} />

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16">
        <h2 className="mb-6 text-center text-3xl font-black">{dict.faq.title}</h2>
        <div className="space-y-3">
          {dict.faq.items.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-black/10 bg-[#faf6ec] p-5">
              <summary className="cursor-pointer font-bold">{f.q}</summary>
              <p className="mt-2 text-sm opacity-70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <StocksSection lang={lang} dict={dict.companySpotlight} phone={dict.footer.phone} />

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20">
        <div className="rounded-[2rem] bg-[#d4af37] px-6 py-14 text-center text-[#141414]">
          <h2 className="mb-2 text-3xl font-black sm:text-4xl">{dict.cta.title}</h2>
          <p className="mb-6 opacity-70">{dict.cta.text}</p>
          <a href="#transfer-request" className="rounded-full bg-[#141414] px-8 py-3 font-bold text-white">
            {dict.cta.button}
          </a>
        </div>
      </section>
      </div>
    </div>
  );
}
