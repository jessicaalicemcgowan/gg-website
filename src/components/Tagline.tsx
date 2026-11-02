import Link from "next/link";
import clsx from "clsx";

const DEFAULT =
  "A creative practice of forgotten crafts focused on\nexperiential spaces and functional objects.";

/** Editable tagline; the words "experiential spaces" / "functional objects" become links. */
export default function Tagline({ className, text }: { className?: string; text?: string }) {
  const t = text || DEFAULT;
  const parts = t.split(/(experiential spaces|functional objects)/i);
  const linkClass = "underline decoration-1 underline-offset-4";
  return (
    <p className={clsx("font-body text-sm md:text-base leading-[1.4] whitespace-pre-line", className)}>
      {parts.map((part, i) => {
        const l = part.toLowerCase();
        if (l === "experiential spaces")
          return (
            <a key={i} href="#spaces" className={linkClass}>
              {part}
            </a>
          );
        if (l === "functional objects")
          return (
            <Link key={i} href="/objects" className={linkClass}>
              {part}
            </Link>
          );
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
