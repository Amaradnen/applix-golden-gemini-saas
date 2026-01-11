import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "ghost" | "white";
  className?: string;
  type?: "button" | "submit";
};

export default function Button({ children, href, onClick, variant="gold", className="", type="button" }: Props) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition select-none";
  const styles = {
    gold: "bg-gold text-black hover:opacity-90 shadow-[0_0_24px_rgba(227,181,46,0.18)]",
    white: "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10",
    ghost: "bg-white/5 text-white border border-white/10 hover:bg-white/10"
  }[variant];

  const cn = `${base} ${styles} ${className}`;

  if (href) return <Link href={href} className={cn}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cn}>{children}</button>;
}
