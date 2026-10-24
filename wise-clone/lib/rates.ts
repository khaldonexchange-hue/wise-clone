export type Currency = {
  code: string;
  symbol: string;
  name: string;
  flag: string;
};

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "EGP", symbol: "£", name: "Egyptian Pound", flag: "🇪🇬" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
];

// Mock mid-market rates relative to USD (demo only)
const ratesToUsd: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.6725,
  SAR: 3.75,
  EGP: 48.5,
  TRY: 34.1,
  INR: 83.8,
};

export function convert(amount: number, from: string, to: string): number {
  const fromRate = ratesToUsd[from] ?? 1;
  const toRate = ratesToUsd[to] ?? 1;
  const inUsd = amount / fromRate;
  return inUsd * toRate;
}

export function feeFor(amount: number): number {
  // Wise-like: 0.43% + small fixed, demo simplified
  return Math.max(0.5, amount * 0.0043);
}
