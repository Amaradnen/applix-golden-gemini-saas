"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  Bot,
  Check,
  ChevronRight,
  Code,
  Download,
  Home,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  User,
  Video,
  Zap,
} from "lucide-react";

type Model = {
  id: string;
  name: string;
  desc: string;
  type: "text" | "image" | "video";
  premium?: boolean;
  modelId?: string;
  icon: React.ReactNode;
};

const MODELS: Model[] = [
  {
    id: "gemini-2.5",
    name: "Gemini 2.5 Flash",
    desc: "Le plus rapide & intelligent",
    icon: <Sparkles className="w-6 h-6 text-indigo-300" />,
    type: "text",
    premium: false,
    modelId: "gemini-2.5-flash-preview-09-2025",
  },
  {
    id: "gpt-5-sim",
    name: "GPT-5 (Preview)",
    desc: "Raisonnement complexe (simulé)",
    icon: <span className="text-xl">🧠</span>,
    type: "text",
    premium: true,
    modelId: "gemini-2.5-flash-preview-09-2025",
  },
  {
    id: "claude-3-sim",
    name: "Claude 3.5 Sonnet",
    desc: "Expert code & nuances (simulé)",
    icon: <span className="text-xl">🤖</span>,
    type: "text",
    premium: true,
    modelId: "gemini-2.5-flash-preview-09-2025",
  },
  {
    id: "imagen-4",
    name: "Imagen",
    desc: "Génération d'images",
    icon: <ImageIcon className="w-6 h-6 text-pink-300" />,
    type: "image",
    premium: true,
  },
  {
    id: "sora-sim",
    name: "Sora",
    desc: "Vidéo (bientôt)",
    icon: <Video className="w-6 h-6 text-orange-300" />,
    type: "video",
    premium: true,
  },
];

function CodeBlock({ language, value }: { language?: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-white/10 bg-black/30">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <span className="text-[10px] font-mono text-white/60 uppercase">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-white"
        >
          {copied ? (
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <Check size={14} /> Copié
            </span>
          ) : (
            <span>Copier</span>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-[12px] text-white/80">
          <code>{value}</code>
        </pre>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="backdrop-blur-sm hover:brightness-125 active:scale-[0.98] transition-all p-3 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-3 h-28"
    >
      <div className="p-2.5 bg-black/40 rounded-full border border-white/10">
        {icon}
      </div>
      <span className="text-xs font-black text-white/80">{text}</span>
    </button>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap border ${
        active
          ? "bg-white text-black border-white/20"
          : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function NavIcon({
  icon,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${
        active
          ? "text-yellow-300 scale-110"
          : "text-white/50 hover:text-white/80"
      }`}
    >
      {icon}
      <div
        className={`w-1 h-1 bg-yellow-300 rounded-full transition-all duration-300 ${
          active ? "opacity-100" : "opacity-0 scale-0"
        }`}
      />
    </button>
  );
}

function Dashboard({
  onNavigate,
  onSelectModel,
}: {
  onNavigate: (v: View) => void;
  onSelectModel: (m: Model) => void;
}) {
  const [activeTab, setActiveTab] = useState<"popular" | "text" | "image">(
    "popular"
  );

  const filteredModels =
    activeTab === "popular"
      ? MODELS
      : MODELS.filter((m) => (activeTab === "text" ? m.type === "text" : m.type === "image"));

  return (
    <div className="pb-28 animate-in fade-in duration-500">
      <div className="relative pt-8 pb-10 px-6 rounded-b-[2.5rem] border-b border-white/10 bg-black/20">
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-b-[2.5rem]">
          <div className="absolute -top-20 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-500/12 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[220px] bg-cyan-400/8 rounded-full blur-3xl" />
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white">
              APPLIX <span className="text-yellow-300">IA</span>
            </h2>
            <p className="text-white/60 font-semibold text-sm mt-1">
              Golden Gemini • Suite IA (Chat + Images)
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400/80 to-amber-600/80 p-[2px]">
            <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center border border-white/10">
              <User className="text-white w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ActionButton
            icon={<MessageSquare className="w-5 h-5 text-yellow-200" />}
            text="Nouveau Chat"
            onClick={() => onNavigate("chat")}
          />
          <ActionButton
            icon={<ImageIcon className="w-5 h-5 text-pink-200" />}
            text="Générer Image"
            onClick={() => onNavigate("image")}
          />
          <ActionButton
            icon={<Video className="w-5 h-5 text-orange-200" />}
            text="Studio Vidéo"
            onClick={() => alert("Module vidéo bientôt disponible")}
          />
          <ActionButton
            icon={<Code className="w-5 h-5 text-emerald-200" />}
            text="Assistant Code"
            onClick={() => onNavigate("chat")}
          />
        </div>
      </div>

      <div className="px-6 mt-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-black text-white">Modèles IA</h3>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" as any }}>
          <TabButton
            label="Populaires"
            active={activeTab === "popular"}
            onClick={() => setActiveTab("popular")}
          />
          <TabButton
            label="Texte"
            active={activeTab === "text"}
            onClick={() => setActiveTab("text")}
          />
          <TabButton
            label="Images"
            active={activeTab === "image"}
            onClick={() => setActiveTab("image")}
          />
        </div>

        <div className="space-y-3">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="group p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-300/40 flex items-center gap-4 active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="w-12 h-12 bg-black/40 rounded-xl flex items-center justify-center text-2xl border border-white/10">
                {model.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-white">{model.name}</h4>
                  {model.premium && (
                    <span className="text-[10px] bg-yellow-400/15 text-yellow-200 border border-yellow-400/20 px-2 py-0.5 rounded-full font-black">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-white/55 text-xs mt-1 font-semibold">
                  {model.desc}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-yellow-300 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatInterface({ onBack, model }: { onBack: () => void; model?: Model | null }) {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    {
      role: "model",
      text: `Bonjour ! Je suis ${model?.name || "Gemini"}. Comment puis-je vous aider ?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "⚠️ Clé API manquante. Ajoute NEXT_PUBLIC_GEMINI_API_KEY dans Vercel (Environment Variables).",
          },
        ]);
        return;
      }

      const history = messages.slice(-6).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const modelId = model?.modelId || "gemini-2.5-flash-preview-09-2025";

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [...history, { role: "user", parts: [{ text: userText }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
          }),
        }
      );

      const data = await res.json();
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.error?.message ||
        "Erreur de réponse API.";

      setMessages((prev) => [...prev, { role: "model", text: botResponse }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Désolé, une erreur est survenue lors de la connexion à Gemini.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="bg-black/40 backdrop-blur-md p-4 flex items-center gap-3 sticky top-0 z-10 border-b border-white/10">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full">
          <ArrowLeft className="w-5 h-5 text-white/70" />
        </button>
        <div>
          <h3 className="font-black text-white text-sm">{model?.name || "Chat"}</h3>
          <p className="text-[10px] text-emerald-300 flex items-center gap-1 font-black">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            En ligne
          </p>
        </div>
        <div className="ml-auto">
          <MoreHorizontal className="text-white/40" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "model" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400/80 to-amber-600/80 flex items-center justify-center flex-shrink-0 border border-white/10">
                <Sparkles size={14} className="text-black" />
              </div>
            )}
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed border ${
                msg.role === "user"
                  ? "bg-yellow-400 text-black border-yellow-300/30 rounded-br-sm"
                  : "bg-white/5 text-white/85 border-white/10 rounded-bl-sm"
              }`}
            >
              {msg.role === "user" ? (
                msg.text
              ) : (
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline ? (
                        <CodeBlock
                          language={match?.[1]}
                          value={String(children).replace(/\n$/, "")}
                        />
                      ) : (
                        <code
                          className="bg-black/40 px-1 rounded text-yellow-200 font-mono text-xs border border-white/10"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
              <Bot size={14} className="text-white/40" />
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:120ms]" />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:240ms]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-black/40 backdrop-blur border-t border-white/10">
        <div className="flex items-end gap-2 bg-white/5 p-1.5 rounded-[1.5rem] border border-white/10 focus-within:border-yellow-300/40 transition-colors">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-white px-4 py-3 placeholder:text-white/40"
            placeholder="Posez une question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-full transition-all border ${
              input.trim()
                ? "bg-yellow-400 text-black border-yellow-300/30 active:scale-95"
                : "bg-white/5 text-white/30 border-white/10"
            }`}
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageGenerator({ onBack }: { onBack: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    setError(null);
    setImageResult(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      if (!apiKey) {
        setError("Clé API manquante: NEXT_PUBLIC_GEMINI_API_KEY");
        return;
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instances: [{ prompt }],
            parameters: { sampleCount: 1 },
          }),
        }
      );

      const data = await res.json();
      const base64 = data?.predictions?.[0]?.bytesBase64Encoded;
      if (!base64) {
        throw new Error(data?.error?.message || "Pas d'image dans la réponse");
      }
      setImageResult(`data:image/png;base64,${base64}`);
    } catch (e: any) {
      console.error(e);
      setError("Erreur de génération. " + (e?.message || ""));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="p-4 flex items-center gap-3 border-b border-white/10 bg-black/40 backdrop-blur">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full">
          <ArrowLeft className="w-6 h-6 text-white/70" />
        </button>
        <h3 className="font-black flex items-center gap-2">
          Imagen <span className="text-[10px] bg-yellow-400/15 text-yellow-200 px-2 rounded-full border border-yellow-400/20">PRO</span>
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {imageResult ? (
          <div className="animate-in zoom-in duration-300">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
              <img src={imageResult} alt="Result" className="w-full" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = imageResult;
                    link.download = `imagen-${Date.now()}.png`;
                    link.click();
                  }}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full font-black flex gap-2 items-center border border-yellow-300/30"
                >
                  <Download size={16} /> Sauvegarder
                </button>
              </div>
            </div>
            <button
              onClick={() => setImageResult(null)}
              className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-black border border-white/10 transition-colors"
            >
              Générer une autre
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-white/40 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
            {error ? (
              <div className="text-center p-4">
                <p className="text-red-300 font-black mb-2">Oups !</p>
                <p className="text-xs text-white/60 font-semibold">{error}</p>
              </div>
            ) : (
              <>
                <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-semibold">Votre image apparaîtra ici</p>
              </>
            )}
          </div>
        )}

        <div className="mt-8">
          <label className="text-xs text-yellow-200 font-black uppercase tracking-wider ml-1">
            Votre vision
          </label>
          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mt-3 text-white h-32 focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/30 outline-none transition-all placeholder:text-white/30 resize-none"
            placeholder="Un chat cyberpunk mangeant des sushis dans l'espace, style néon..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={generating || !prompt}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-600 py-4 rounded-xl font-black mt-4 border border-yellow-300/20 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-black"
          >
            {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {generating ? "Création en cours..." : "Générer l'image"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Subscription() {
  return (
    <div className="p-6 pb-28 bg-black min-h-full h-full overflow-y-auto">
      <div className="text-center mt-2 mb-8">
        <h2 className="text-2xl font-black text-white">APPLIX IA Pro</h2>
        <p className="text-white/50 text-sm mt-1 font-semibold">Débloquez la puissance ultime</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 opacity-70">
          <h3 className="text-lg font-black text-white/80">Standard</h3>
          <div className="text-3xl font-black my-2 text-white">
            0€<span className="text-sm font-semibold text-white/40">/mois</span>
          </div>
          <ul className="space-y-3 text-sm text-white/55 mb-6 mt-4 font-semibold">
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-white/40" /> Chat basique
            </li>
            <li className="flex gap-3 items-center">
              <Check className="w-4 h-4 text-white/40" /> Images limitées
            </li>
          </ul>
          <button className="w-full py-2 border border-white/15 text-white/60 rounded-xl font-black text-sm">
            Plan actuel
          </button>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl shadow-2xl relative overflow-hidden border border-yellow-300/30">
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-yellow-400 to-amber-600 text-black text-[10px] font-black px-3 py-1.5 rounded-bl-2xl">
            RECOMMANDÉ
          </div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-400/10 blur-3xl rounded-full" />

          <h3 className="text-lg font-black text-white flex items-center gap-2">
            Ultimate <Sparkles size={16} className="text-yellow-300" />
          </h3>
          <div className="text-4xl font-black my-3 text-white">
            19.99€<span className="text-sm font-semibold text-white/50">/mois</span>
          </div>

          <ul className="space-y-3 text-sm text-white/70 mb-8 mt-6 relative z-10 font-semibold">
            <li className="flex gap-3 items-center">
              <div className="bg-yellow-400/10 p-1 rounded-full border border-yellow-300/20">
                <Check className="w-3 h-3 text-yellow-200" />
              </div>
              Multi-modèles + mémoire
            </li>
            <li className="flex gap-3 items-center">
              <div className="bg-yellow-400/10 p-1 rounded-full border border-yellow-300/20">
                <Check className="w-3 h-3 text-yellow-200" />
              </div>
              Imagen (HD)
            </li>
            <li className="flex gap-3 items-center">
              <div className="bg-yellow-400/10 p-1 rounded-full border border-yellow-300/20">
                <Check className="w-3 h-3 text-yellow-200" />
              </div>
              Génération illimitée
            </li>
          </ul>

          <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-600 hover:brightness-110 rounded-xl font-black shadow-lg flex justify-center items-center gap-2 text-black relative z-10 active:scale-95 transition-all">
            S'abonner maintenant <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

type View = "home" | "chat" | "image" | "sub" | "profile";

export default function AiPackagePage() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [selectedModel, setSelectedModel] = useState<Model | null>(MODELS[0]);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <Dashboard
            onNavigate={setCurrentView}
            onSelectModel={(m) => {
              setSelectedModel(m);
              if (m.type === "image") setCurrentView("image");
              else if (m.type === "video") alert("Vidéo bientôt disponible");
              else setCurrentView("chat");
            }}
          />
        );
      case "chat":
        return <ChatInterface onBack={() => setCurrentView("home")} model={selectedModel} />;
      case "image":
        return <ImageGenerator onBack={() => setCurrentView("home")} />;
      case "sub":
        return <Subscription />;
      case "profile":
        return (
          <div className="flex flex-col items-center justify-center h-full text-white/50 bg-black">
            <User size={48} className="mb-4 opacity-20" />
            <p className="font-semibold">Profil Utilisateur</p>
            <button
              onClick={() => setCurrentView("home")}
              className="mt-4 text-yellow-300 text-sm font-black"
            >
              Retour
            </button>
          </div>
        );
      default:
        return <div />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-88px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-black/30 shadow-2xl relative flex flex-col overflow-hidden sm:rounded-[30px] sm:border sm:border-white/10 sm:min-h-[90vh]">
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">{renderView()}</div>

        <div className="flex-none w-full bg-black/50 backdrop-blur-lg border-t border-white/10 px-6 py-4 flex justify-between items-center pb-6 sm:pb-4">
          <NavIcon
            icon={<Home className="w-6 h-6" />}
            active={currentView === "home"}
            onClick={() => setCurrentView("home")}
          />
          <NavIcon icon={<Search className="w-6 h-6" />} active={false} onClick={() => {}} />

          <button
            onClick={() => setCurrentView("sub")}
            className="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-full flex items-center justify-center -mt-12 shadow-lg border-[6px] border-black active:scale-90 hover:scale-105 transition-transform"
            title="Pro"
          >
            <Zap className="w-6 h-6 text-black fill-black" />
          </button>

          <NavIcon
            icon={<MessageSquare className="w-6 h-6" />}
            active={currentView === "chat"}
            onClick={() => setCurrentView("chat")}
          />
          <NavIcon
            icon={<User className="w-6 h-6" />}
            active={currentView === "profile"}
            onClick={() => setCurrentView("profile")}
          />
        </div>
      </div>
    </div>
  );
}
