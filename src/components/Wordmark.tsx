import Link from "next/link";
import clsx from "clsx";

export default function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={clsx(
        "font-display tracking-label text-[15px] uppercase",
        className
      )}
    >
      Geoffrey Grunfeld
    </Link>
  );
}
