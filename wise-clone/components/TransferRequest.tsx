"use client";

import { useState, type FormEvent } from "react";
import { ArrowRightLeft, Check } from "lucide-react";

type Copy = {
  title: string; description: string; from: string; to: string; choose: string;
  amount: string; currency: string; name: string; optional: string; notes: string;
  button: string; notice: string; summary: string; intro: string; closing: string;
};
const countryFlags = ["🇷🇺", "🇾🇪", "🇸🇦", "🇹🇷", "🇪🇬", "🇲🇾", "🇨🇳", "🇦🇪", "🇮🇶", "🇸🇩", "🇩🇿", "🇲🇦", "🇹🇳", "🇰🇼", "🇶🇦", "🇴🇲", "🇺🇸", "🇪🇺"];
const currencyFlags: Record<string, string> = { USD: "🇺🇸", EUR: "🇪🇺", RUB: "🇷🇺", YER: "🇾🇪", SAR: "🇸🇦", TRY: "🇹🇷", AED: "🇦🇪", EGP: "🇪🇬", MYR: "🇲🇾", CNY: "🇨🇳", IQD: "🇮🇶", SDG: "🇸🇩", DZD: "🇩🇿", MAD: "🇲🇦", TND: "🇹🇳", KWD: "🇰🇼", QAR: "🇶🇦", OMR: "🇴🇲", GBP: "🇬🇧" };
const currencies = ["USD", "EUR", "RUB", "YER", "SAR", "TRY", "AED", "EGP", "MYR", "CNY", "IQD", "SDG", "DZD", "MAD", "TND", "KWD", "QAR", "OMR", "GBP"];

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" stroke="currentColor" strokeWidth="1.7"/><path d="M8.2 7.5c-.7 0-1.1 1-1 1.7.4 3 3.6 6.2 6.6 6.6.8.1 1.8-.4 1.9-1.2l-2.3-1.2-.9.9c-1.7-.7-2.7-1.7-3.4-3.4l.8-.9-1.1-2.5Z" fill="currentColor"/></svg>;
}

export function TransferRequest({ dict, countries, phone }: { dict: Copy; countries: string[]; phone: string }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) return;
    const message = [dict.intro, "", `${dict.from}: ${from}`, `${dict.to}: ${to}`,
      `${dict.amount}: ${amount} ${currency}`, name.trim() ? `${dict.name}: ${name.trim()}` : "",
      notes.trim() ? `${dict.notes}: ${notes.trim()}` : "", "", dict.closing].join("\n");
    window.location.assign(`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`);
  }
  return <section id="transfer-request" className="transfer-request-section">
    <div className="transfer-request-layout">
      <div className="transfer-request-intro"><span className="transfer-request-icon"><ArrowRightLeft size={24}/></span>
        <h2>{dict.title}</h2><p>{dict.description}</p>
        <p className="transfer-request-notice"><Check size={18}/>{dict.notice}</p>
      </div>
      <form onSubmit={submit} className="transfer-request-form">
        <div className="transfer-form-grid">
          <label>{dict.from}<select required value={from} onChange={(e) => setFrom(e.target.value)}><option value="" disabled>{dict.choose}</option>{countries.map((country, index) => <option key={country} value={country}>{countryFlags[index]} {country}</option>)}</select></label>
          <label>{dict.to}<select required value={to} onChange={(e) => setTo(e.target.value)}><option value="" disabled>{dict.choose}</option>{countries.map((country, index) => <option key={country} value={country}>{countryFlags[index]} {country}</option>)}</select></label>
          <label className="transfer-amount-field">{dict.amount}<input type="number" inputMode="decimal" required min="0.01" step="0.01" max="999999999" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1,000" dir="ltr" /></label>
          <label className="transfer-currency-field">{dict.currency}<select value={currency} onChange={(e) => setCurrency(e.target.value)}>{currencies.map((code) => <option key={code} value={code}>{currencyFlags[code]} {code}</option>)}</select></label>
        </div>
        <details className="transfer-extra"><summary>{dict.optional} · {dict.name} / {dict.notes}</summary><div>
        <label>{dict.name} <span>({dict.optional})</span><input autoComplete="name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label>{dict.notes} <span>({dict.optional})</span><textarea rows={2} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
        </div></details>
        {from && to && amount && <div className="transfer-request-summary" aria-live="polite"><span>{dict.summary}</span><strong>{countryFlags[countries.indexOf(from)]} {from} <span className="transfer-route-arrow" aria-hidden="true">→</span> {countryFlags[countries.indexOf(to)]} {to}</strong><b dir="ltr">{amount} {currency}</b></div>}
        <button type="submit"><WhatsAppIcon/>{dict.button}</button>
      </form>
    </div>
  </section>;
}
