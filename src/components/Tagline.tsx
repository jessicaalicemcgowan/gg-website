import Link from "next/link";
import clsx from "clsx";
import type { TaglineBlock } from "@/lib/content";

const linkClass = "underline decoration-1 underline-offset-4";

/**
 * Editable tagline (rich text from Sanity). Words the editor has linked
 * become links: "Spaces" jumps to the Spaces section, "Objects" opens the
 * Objects page, or any other web address.
 */
export default function Tagline({ className, blocks }: { className?: string; blocks?: TaglineBlock[] }) {
  const cls = clsx("font-body text-sm md:text-base leading-[1.4] whitespace-pre-line", className);

  if (!blocks?.length) {
    return (
      <p className={cls}>
        A creative practice of forgotten crafts focused on
        {"\n"}
        <a href="#spaces" className={linkClass}>experiential spaces</a> and{" "}
        <Link href="/objects" className={linkClass}>functional objects</Link>.
      </p>
    );
  }

  return (
    <p className={cls}>
      {blocks.map((block, b) => (
        <span key={block._key} className="contents">
          {b > 0 && "\n"}
          {(block.children ?? []).map((child) => {
            const def = block.markDefs?.find((d) => child.marks?.includes(d._key));
            if (!def) return <span key={child._key}>{child.text}</span>;
            if (def.target === "spaces")
              return <a key={child._key} href="#spaces" className={linkClass}>{child.text}</a>;
            if (def.target === "objects")
              return <Link key={child._key} href="/objects" className={linkClass}>{child.text}</Link>;
            if (def.url)
              return (
                <a key={child._key} href={def.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {child.text}
                </a>
              );
            return <span key={child._key}>{child.text}</span>;
          })}
        </span>
      ))}
    </p>
  );
}
