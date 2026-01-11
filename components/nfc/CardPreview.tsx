"use client";

import { useMemo, useState } from "react";
import type { CardMaterial, CardTemplateKey } from "./templates";

type Props = {
  material: CardMaterial;
  template: CardTemplateKey;
  name: string;
  title: string;
  slug: string;
};

function bg(material: CardMaterial) {
  if (material === "metal-black") return "linear-gradient(135deg, #101010 0%, #000 100%)";
  if (material === "metal-gold") return "linear-gradient(135deg, #F3D77C 0%, #B88A11 100%)";
  return "#ffffff";
}

export default function CardPreview({ material, template, name, title, slug }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const text = material === "pvc-white" ? "text-black" : "text-white";
  const muted = material === "pvc-white" ? "text-black/60" : "text-white/60";
  const border = material === "pvc-white" ? "border-black/10" : "border-white/10";

  const front = useMemo(() => {
    if (template === "center") {
      return (
        <div className={`h-full w-full p-8 flex items-center justify-center`}>
          <div className={`w-full h-full rounded-xl border ${border} flex flex-col items-center justify-center`}>
            <div className={`${text} font-display font-bold tracking-[0.22em] uppercase text-lg`}>{name}</div>
            <div className={`${muted} text-[10px] tracking-widest uppercase mt-2`}>{title}</div>
          </div>
        </div>
      );
    }
    if (template === "lux") {
      return (
        <div className="h-full w-full p-8 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="text-gold text-xs font-bold tracking-widest">APPLIX</div>
            <div className={`w-10 h-6 rounded border ${border}`} />
          </div>
          <div>
            <div className={`${text} font-display font-bold text-2xl`}>{name}</div>
            <div className={`${muted} text-[10px] tracking-widest uppercase mt-1`}>{title}</div>
            <div className="mt-4 h-px bg-gold/30 w-24" />
          </div>
          <div className={`${muted} text-[10px] tracking-widest uppercase`}>Tap to connect</div>
        </div>
      );
    }
    if (template === "frame") {
      return (
        <div className="h-full w-full p-6">
          <div className={`h-full w-full rounded-2xl border ${border} p-6 flex flex-col justify-between`}>
            <div className="text-gold text-xs font-bold tracking-widest">NFC</div>
            <div>
              <div className={`${text} font-display font-bold text-2xl`}>{name}</div>
              <div className={`${muted} text-[10px] tracking-widest uppercase mt-1`}>{title}</div>
            </div>
            <div className={`${muted} text-[10px] tracking-widest uppercase`}>APPLIX • GOLDEN</div>
          </div>
        </div>
      );
    }
    if (template === "logo-left") {
      return (
        <div className="h-full w-full p-8 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-black font-black">A</div>
            <div className="text-gold text-xs font-bold tracking-widest">APPLIX</div>
          </div>
          <div>
            <div className={`${text} font-display font-bold text-2xl`}>{name}</div>
            <div className={`${muted} text-[10px] tracking-widest uppercase mt-1`}>{title}</div>
          </div>
          <div className={`${muted} text-[10px] tracking-widest uppercase`}>Scan QR / Tap NFC</div>
        </div>
      );
    }
    return (
      <div className="h-full w-full p-8 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className={`w-10 h-6 rounded border ${border}`} />
          <div className="text-gold text-xs font-bold tracking-widest">APPLIX</div>
        </div>
        <div>
          <div className={`${text} font-display font-bold text-2xl`}>{name}</div>
          <div className={`${muted} text-[10px] tracking-widest uppercase mt-1`}>{title}</div>
        </div>
        <div className={`${muted} text-[10px] tracking-widest uppercase`}>NFC • Golden Gemini</div>
      </div>
    );
  }, [template, name, title, text, muted, border]);

  const back = useMemo(() => {
    return (
      <div className="h-full w-full p-8 flex items-center justify-between">
        <div>
          <div className="text-white/50 text-[10px] tracking-widest font-bold">APPLIX ID</div>
          <div className="text-white/40 text-xs mt-2 font-mono">SN: 8829-1029-EXP</div>
          <div className="text-white/40 text-xs mt-2">URL: /u/{slug}</div>
        </div>
        <div className="w-24 h-24 bg-white rounded-xl p-2">
          <div className="w-full h-full bg-black/10 rounded-lg flex items-center justify-center text-xs text-black/60">
            QR
          </div>
        </div>
      </div>
    );
  }, [slug]);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setIsFlipped((v) => !v)}
          className="px-4 py-2 rounded-full text-xs font-bold border border-white/10 bg-black/50 hover:bg-black transition"
        >
          {isFlipped ? "Voir recto" : "Voir verso"}
        </button>
      </div>

      <div
        className={[
          "relative w-[360px] sm:w-[400px] h-[225px] sm:h-[250px] rounded-2xl shadow-2xl",
          "transition-transform duration-700 [transform-style:preserve-3d]"
        ].join(" ")}
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden]" style={{ background: bg(material) }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, rgba(227,181,46,0.25), transparent 55%)" }} />
          {front}
        </div>

        <div
          className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ background: "#111", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          {back}
        </div>
      </div>

      <div className="text-center text-[10px] text-white/40 mt-4 tracking-widest uppercase">
        Flip seulement avec le bouton (pas en cliquant sur la carte)
      </div>
    </div>
  );
}
