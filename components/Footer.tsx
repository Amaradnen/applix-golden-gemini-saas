export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold text-lg">APPLIX.</div>
          <div className="text-xs text-white/40">© {new Date().getFullYear()} — Golden Gemini Edition</div>
        </div>
        <div className="text-xs text-white/40">
          Sans login pour l’instant • Next.js + Tailwind • Backend prêt (Supabase plus tard)
        </div>
      </div>
    </footer>
  );
}
