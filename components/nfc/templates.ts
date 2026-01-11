export type CardMaterial = "metal-black" | "metal-gold" | "pvc-white";

export type CardTemplateKey = "minimal" | "center" | "lux" | "frame" | "logo-left";
export type ProfileTemplateKey = "creator" | "business" | "minimal" | "lux";

export const cardTemplates: { key: CardTemplateKey; name: string; desc: string }[] = [
  { key: "minimal", name: "Minimal", desc: "Nom + poste + icône NFC" },
  { key: "center", name: "Centré", desc: "Nom centré, ultra clean" },
  { key: "lux", name: "Lux", desc: "Gold accent + lignes fines" },
  { key: "frame", name: "Frame", desc: "Cadre discret, moderne" },
  { key: "logo-left", name: "Logo Left", desc: "Zone logo + nom" }
];

export const profileTemplates: { key: ProfileTemplateKey; name: string; desc: string }[] = [
  { key: "creator", name: "Creator", desc: "Hero + boutons + social" },
  { key: "business", name: "Business", desc: "Contact cards + CTA" },
  { key: "minimal", name: "Minimal", desc: "Simple, rapide, pro" },
  { key: "lux", name: "Lux", desc: "Gold premium" }
];
