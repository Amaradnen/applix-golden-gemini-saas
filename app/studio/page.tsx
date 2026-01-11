import Button from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="glass-card rounded-3xl p-8 border border-white/10">
        <div className="text-gold text-xs font-bold tracking-widest mb-2">APPLIX</div>
        <h2 className="text-4xl font-display font-bold mb-3">APPLIX STUDIO</h2>
        <p className="text-white/60 text-lg max-w-2xl">Production visuelle, Ads et acquisition. (Placeholder — tu peux coller ta vraie interface ensuite.)</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/dashboard" className="px-6 py-3 rounded-xl">Demander un devis</Button>
          <Button href="/nfc-studio" variant="ghost" className="px-6 py-3 rounded-xl border-gold">NFC Studio</Button>
        </div>
      </div>
    </div>
  );
}
