import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center space-y-6 mt-2 md:mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest text-white/70">
          <span className="w-2 h-2 rounded-full bg-gold"></span>
          SUITE 7-EN-1 • SANS LOGIN
        </div>

        <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight">
          L'ÉCOSYSTÈME <span className="text-gold">GOLDEN GEMINI</span><br />
          POUR APPLIX
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Site vitrine + app IA + NFC Studio + profils publics + hub + academy. Tout dans le même style.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
          <Button href="/nfc-studio" className="px-8 py-4 rounded-full">Ouvrir NFC Studio</Button>
          <Button href="/ai-app" variant="ghost" className="px-8 py-4 rounded-full border-gold">
            Voir IA App (v2)
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {[
          { title: "1. Creative Studio", desc: "Photos, Reels, Sites web, Ads, branding." , href:"/studio"},
          { title: "2. IA App (v2)", desc: "Interface app IA (version 2 préférée).", href:"/ai-app"},
          { title: "3. Produits Digitaux", desc: "Ebooks, packs PLR, templates prêts.", href:"/products"},
          { title: "4. Academy", desc: "Formations et masterclasses.", href:"/academy"},
          { title: "5. NFC Studio", desc: "Builder carte + profil + lien public.", href:"/nfc-studio"},
          { title: "6. Hub Abonnements", desc: "Zone hub (Netflix, Spotify, IA...).", href:"/hub"},
          { title: "7. IA Package", desc: "App IA mobile (Golden Gemini) + chat + images.", href:"/ai-package"}
        ].map((c) => (
          <a key={c.title} href={c.href} className="glass-card p-8 rounded-3xl hover:translate-y-[-4px] transition block">
            <div className="text-gold text-xs font-bold tracking-widest mb-2">APPLIX</div>
            <div className="text-xl font-bold mb-2">{c.title}</div>
            <div className="text-white/60 text-sm">{c.desc}</div>
          </a>
        ))}
      </div>

      <div className="mt-14 glass-card rounded-3xl p-8 border border-gold/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-display font-bold text-2xl">Scan → /u/[slug]</div>
            <div className="text-white/60 text-sm mt-1">
              Exemple : <span className="text-gold font-bold">/u/demo</span> (profil public)
            </div>
          </div>
          <Button href="/u/demo" variant="ghost" className="px-6 py-3 rounded-xl border-gold">
            Ouvrir profil demo
          </Button>
        </div>
      </div>
    </div>
  );
}
