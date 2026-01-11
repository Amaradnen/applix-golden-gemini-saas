import AppShell from "@/components/AppShell";

export default function NfcStudioPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">NFC Studio Pro</h1>
            <p className="text-white/70 font-semibold">
              Interface "Golden Gemini" (version longue) — builder cartes + templates + panier + checkout.
            </p>
          </div>
          <a
            href="/nfc/studio-pro.html"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-4 py-2 font-black bg-white text-black hover:bg-white/90 transition"
          >
            Ouvrir en plein écran
          </a>
        </div>

        <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/20 shadow-[0_18px_70px_rgba(0,0,0,0.50)]">
          <iframe
            title="APPLIX NFC Studio Pro"
            src="/nfc/studio-pro.html"
            className="w-full"
            style={{ height: "82vh" }}
          />
        </div>
      </div>
    </AppShell>
  );
}
