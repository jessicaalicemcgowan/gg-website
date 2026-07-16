import Link from "next/link";
import clsx from "clsx";

export default function Tagline({ className }: { className?: string }) {
  return (
    <p className={clsx("font-body text-sm md:text-base leading-[1.4]", className)}>
      A creative practice of forgotten crafts focused on
      <br />
      <a href="#spaces" className="underline decoration-1 underline-offset-4">
        experiential spaces
      </a>{" "}
      and{" "}
      <Link href="/objects" className="underline decoration-1 underline-offset-4">
        functional objects
      </Link>
      .
    </p>
  );
}
