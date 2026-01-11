import Button from "@/components/ui/Button";

// Next.js 15: `params` is async (Promise) in App Router Server Components.
export default async function PublicProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug ?? "demo";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card rounded-3xl p-8 border border-gold/20">
        <div className="text-gold text-xs font-bold tracking-widest mb-2">APPLIX PUBLIC PROFILE</div>
        <h1 className="text-4xl font-display font-bold mb-2">/u/{slug}</h1>
        <p className="text-white/60">
          Sans backend pour l’instant: cette page simule le rendu public.
          Quand on branchera Supabase, on chargera automatiquement {"{name,bio,links,template}"} depuis la DB.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/nfc-studio" className="px-6 py-3 rounded-xl">Modifier dans NFC Studio</Button>
          <Button href="/" variant="ghost" className="px-6 py-3 rounded-xl border-gold">Retour Home</Button>
        </div>
      </div>

      <div className="mt-8 glass-card rounded-3xl p-8 border border-white/10">
        <div className="text-xs font-bold tracking-widest text-white/50 mb-3 uppercase">CTA rapides (placeholder)</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <a className="glass-card rounded-2xl p-5 border border-white/10 hover:border-gold/30 transition" href="#">
            <div className="font-bold">WhatsApp</div>
            <div className="text-white/60 text-sm mt-1">Contacter maintenant</div>
          </a>
          <a className="glass-card rounded-2xl p-5 border border-white/10 hover:border-gold/30 transition" href="#">
            <div className="font-bold">Website</div>
            <div className="text-white/60 text-sm mt-1">Voir le site</div>
          </a>
          <a className="glass-card rounded-2xl p-5 border border-white/10 hover:border-gold/30 transition" href="#">
            <div className="font-bold">Instagram</div>
            <div className="text-white/60 text-sm mt-1">@applix</div>
          </a>
          <a className="glass-card rounded-2xl p-5 border border-white/10 hover:border-gold/30 transition" href="#">
            <div className="font-bold">LinkedIn</div>
            <div className="text-white/60 text-sm mt-1">Profil</div>
          </a>
        </div>
      </div>
    </div>
  );
}
