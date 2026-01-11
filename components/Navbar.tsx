"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/ai-app", label: "IA App (v2)" },
  { href: "/products", label: "Produits" },
  { href: "/academy", label: "Academy" },
  { href: "/nfc-studio", label: "NFC Studio" },
  { href: "/hub", label: "Hub" }
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 w-full z-50">
      <div className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, rgba(227,181,46,1) 0%, rgba(255,255,255,0.15) 100%)" }}
            >
              <span className="font-black text-black">A</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-xl tracking-tight">APPLIX</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold transition-colors">
                Golden Gemini
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
            {nav.map((i) => {
              const active = pathname === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={[
                    "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition",
                    active ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/10"
                  ].join(" ")}
                >
                  {i.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/nfc-studio"
              className="px-5 py-2.5 rounded-full font-bold text-sm bg-gold text-black hover:opacity-90 transition shadow-[0_0_24px_rgba(227,181,46,0.18)]"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
