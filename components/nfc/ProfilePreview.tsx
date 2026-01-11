"use client";

import type { ProfileTemplateKey } from "./templates";

type Props = {
  template: ProfileTemplateKey;
  name: string;
  bio: string;
  slug: string;
};

export default function ProfilePreview({ template, name, bio, slug }: Props) {
  const hero = (
    <div className="h-36 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(700px 280px at 25% 25%, rgba(227,181,46,0.25), transparent 60%)," +
            "radial-gradient(700px 280px at 80% 30%, rgba(227,181,46,0.12), transparent 60%)"
        }}
      />
      <div className="absolute -bottom-8 left-6 w-20 h-20 rounded-2xl bg-gold text-black font-black flex items-center justify-center shadow-xl">
        A
      </div>
    </div>
  );

  if (template === "business") {
    return (
      <div className="bg-white text-black h-full">
        <div className="p-6 pb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full -mr-10 -mt-10"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-black">A</div>
            <div>
              <div className="font-bold text-xl">{name}</div>
              <div className="text-xs font-bold text-[#a77d0a] bg-yellow-50 inline-block px-2 py-1 rounded mt-1">
                Professional
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 -mt-6 relative z-20 space-y-3 pb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-[10px] text-gray-400 font-bold tracking-widest">PUBLIC URL</div>
            <div className="font-mono text-sm mt-1">/u/{slug}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-[10px] text-gray-400 font-bold tracking-widest">BIO</div>
            <div className="text-sm mt-1 text-gray-700">{bio}</div>
          </div>
          <button className="w-full py-3 bg-black text-white font-bold rounded-xl">Enregistrer le contact</button>
        </div>
      </div>
    );
  }

  if (template === "minimal") {
    return (
      <div className="bg-white text-black h-full p-6">
        <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-black">A</div>
        <div className="mt-4 font-bold text-2xl">{name}</div>
        <div className="text-sm text-gray-600 mt-2">{bio}</div>
        <div className="mt-6 text-xs text-gray-400 font-bold tracking-widest">LINK</div>
        <div className="font-mono text-sm">/u/{slug}</div>
        <div className="mt-6 space-y-2">
          <button className="w-full py-3 rounded-xl bg-black text-white font-bold">WhatsApp</button>
          <button className="w-full py-3 rounded-xl bg-gray-100 text-black font-bold">Website</button>
        </div>
      </div>
    );
  }

  if (template === "lux") {
    return (
      <div className="bg-black text-white h-full">
        {hero}
        <div className="px-6 pt-14 pb-8 text-center">
          <div className="text-3xl font-display font-bold">{name}</div>
          <div className="text-white/60 text-sm mt-2">{bio}</div>
          <div className="mt-6 space-y-2">
            <button className="w-full py-3.5 rounded-xl bg-gold text-black font-bold">S'abonner</button>
            <button className="w-full py-3.5 rounded-xl bg-white/10 border border-gold/30 text-white font-bold">
              Mon Site Web
            </button>
          </div>
          <div className="mt-8 text-[10px] tracking-widest text-white/40 uppercase">
            Public: /u/{slug}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-full">
      {hero}
      <div className="px-6 pt-14 pb-8 text-center">
        <div className="text-3xl font-display font-bold">{name}</div>
        <div className="text-white/60 text-sm mt-2">{bio}</div>
        <div className="mt-6 space-y-2">
          <button className="w-full py-3.5 rounded-xl bg-white text-black font-bold">S'abonner</button>
          <button className="w-full py-3.5 rounded-xl bg-white/10 border border-white/10 text-white font-bold">
            Mon Site Web
          </button>
        </div>
        <div className="mt-8 text-[10px] tracking-widest text-white/40 uppercase">
          Public: /u/{slug}
        </div>
      </div>
    </div>
  );
}
