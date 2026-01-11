"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";

type Agent = { id: string; name: string; desc: string; tag: string; price: string };

const agents: Agent[] = [
  { id: "resto", name: "Agent Restaurant", desc: "Réservations auto, menu, réponses 24/7.", tag: "Populaire", price: "199€/m" },
  { id: "immo", name: "Agent Immobilier", desc: "Qualification acheteurs + prise RDV.", tag: "High ROI", price: "299€/m" },
  { id: "clinic", name: "Clinique / Salon", desc: "Agenda + rappels + FAQ prix.", tag: "Essentiel", price: "249€/m" },
  { id: "saas", name: "Mini SaaS", desc: "Générateur contenu, CRM auto, dashboards.", tag: "Custom", price: "Sur devis" }
];

export default function AiApp() {
  const [active, setActive] = useState<Agent>(agents[1]);
  const prompt = useMemo(() => {
    return `Je veux activer ${active.name}. Objectif: ${active.desc}. Donne: étapes, données nécessaires, scripts WhatsApp, et intégration workflow.`;
  }, [active]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/10">
          <div className="text-gold text-xs font-bold tracking-widest mb-2">APPLIX IA APP (v2)</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Agents & Automatisation</h2>
          <p className="text-white/60 text-sm mb-6">
            Version “app” : sélection d’agent, prompt prêt, checklist d’intégration. (Sans backend pour l’instant)
          </p>

          <div className="space-y-3">
            {agents.map((a) => {
              const on = a.id === active.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setActive(a)}
                  className={[
                    "w-full text-left glass-card rounded-2xl p-4 border transition",
                    on ? "border-gold/50 bg-white/[0.03]" : "border-white/10 hover:border-gold/30"
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold">{a.name}</div>
                      <div className="text-xs text-white/60 mt-1">{a.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-black bg-gold px-2 py-1 rounded-full inline-block">{a.tag}</div>
                      <div className="text-xs text-white/80 mt-2 font-bold">{a.price}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div className="text-white/50 text-xs font-bold tracking-widest">PROMPT READY</div>
              <div className="font-display font-bold text-2xl mt-1">{active.name}</div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  navigator.clipboard?.writeText(prompt);
                  alert("Prompt copié ✅");
                }}
                className="px-5 py-3 rounded-xl"
              >
                Copier prompt
              </Button>
              <Button href="/nfc-studio" variant="ghost" className="px-5 py-3 rounded-xl border-gold">
                NFC Studio
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <textarea
              className="w-full min-h-[220px] bg-black/30 border border-white/10 rounded-2xl p-4 text-sm text-white/90 outline-none focus:border-gold/40"
              value={prompt}
              readOnly
            />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-4 border border-white/10">
              <div className="text-gold text-xs font-bold tracking-widest mb-2">CHECKLIST</div>
              <ul className="text-sm text-white/70 space-y-2">
                <li>• Définir les canaux (WhatsApp / IG / Web)</li>
                <li>• Définir intent + FAQ + pricing</li>
                <li>• Connecter workflow (Make/n8n)</li>
                <li>• Stockage (Supabase) + logs</li>
                <li>• Test end-to-end + monitoring</li>
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-white/10">
              <div className="text-gold text-xs font-bold tracking-widest mb-2">NEXT STEP</div>
              <div className="text-sm text-white/70">
                Quand tu me donnes tes workflows (A,C,D) + tes agents Gemini (B), je te fais:
                mapping intents → tables Supabase → endpoints → triggers workflows.
              </div>
              <div className="mt-3 text-xs text-white/50">
                (Sans login maintenant, mais structure prête pour activer Auth plus tard.)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
