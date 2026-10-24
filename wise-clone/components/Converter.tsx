"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Lock,
  Receipt,
  Zap,
} from "lucide-react";
import { currencies, convert, feeFor } from "@/lib/rates";

function CurrencyPill({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (code: string) => void;
  label: string;
}) {
  const cur = currencies.find((c) => c.code === value) ?? currencies[0];
  return (
    <span className="relative inline-flex shrink-0 items-center gap-1 rounded-full bg-black/[0.06] py-1.5 pe-2.5 ps-2 text-sm font-black">
      <span className="text-lg leading-none">{cur.flag}</span>
      {cur.code}
      <ChevronDown size={15} className="opacity-60" />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} — {c.name}
          </option>
        ))}
      </select>
    </span>
  );
}

export function Converter({
  dict,
}: {
  dict: {
    youSend: string;
    recipientGets: string;
    fee: string;
    rate: string;
    arrives: string;
    arrivesValue: string;
    arrivesToday: string;
    getStarted: string;
  };
}) {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const { fee, received, rate } = useMemo(() => {
    const fee = feeFor(amount || 0);
    const net = Math.max(0, (amount || 0) - fee);
    const received = convert(net, from, to);
    const rate = convert(1, from, to);
    return { fee, received, rate };
  }, [amount, from, to]);

  return (
    <div className="w-full converter-panel rounded-2xl bg-white p-5 text-[#141414] shadow-2xl sm:p-6">
      <div className="flex justify-end">
        <span className="inline-flex max-w-full items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-black/[0.06] px-3 py-1.5 text-xs font-bold">
          <Lock size={13} className="shrink-0" />
          <span className="truncate">
            1 {from} = {rate.toFixed(4)} {to}
          </span>
          <ChevronRight size={14} className="shrink-0 rtl:rotate-180" />
        </span>
      </div>

      <p className="mt-2 text-sm opacity-70">{dict.youSend}</p>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 bg-[#f8f8f5] px-3 py-4">
        <CurrencyPill value={from} onChange={setFrom} label={dict.youSend} />
        <input
          type="number"
          value={amount}
          min={1}
          onChange={(e) => setAmount(Number(e.target.value))}
          aria-label={dict.youSend}
          className="w-full min-w-0 bg-transparent text-end text-3xl font-black tabular-nums tracking-tight outline-none"
        />
      </div>

      <p className="mt-3 text-sm opacity-70">{dict.recipientGets}</p>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 bg-[#f8f8f5] px-3 py-4">
        <CurrencyPill value={to} onChange={setTo} label={dict.recipientGets} />
        <p className="w-full min-w-0 text-end text-3xl font-black tabular-nums tracking-tight">
          {received.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>
      </div>

      <div className="mt-3 space-y-2.5 border-t border-black/10 pt-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/15">
            <Zap size={18} />
          </span>
          <span>
            <span className="block text-sm opacity-60">{dict.arrives}</span>
            <strong className="block text-sm">{dict.arrivesToday}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/15">
            <Receipt size={18} />
          </span>
          <span>
            <span className="block text-sm opacity-60">{dict.fee}</span>
            <strong className="block text-sm">
              {fee.toFixed(2)} {from}
            </strong>
          </span>
        </div>
      </div>

      <a
        href="#cta"
        className="mt-5 block w-full rounded-xl bg-[#d3b575] py-3.5 text-center font-black text-[#141414] hover:bg-[#b8942f]"
      >
        {dict.getStarted}
      </a>
    </div>
  );
}
