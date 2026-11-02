import { getSettings } from "@/lib/content";

export default async function Footer() {
  const s = await getSettings();
  const link = "hover:underline underline-offset-4 decoration-1";
  return (
    <footer className="flex flex-col items-center gap-[30px] pt-[60px] pb-[20px] px-6 md:px-[138px] text-center uppercase text-[#352523]">
      <div className="flex gap-[30px] items-baseline justify-center text-[12px] tracking-[2.4px]">
        <a href={`mailto:${s.contactEmail}`} className={link}>
          contact
        </a>
        <a href={s.followUrl} target="_blank" rel="noopener noreferrer" className={link}>
          {s.followLabel}
        </a>
      </div>
      <div className="flex gap-[30px] items-baseline justify-center tracking-[1.8px]">
        <p className="text-[9px]">{s.legalText}</p>
        <p className="text-[9px]">
          website by{" "}
          <a href="https://jessicamcgowan-office.com" target="_blank" rel="noopener noreferrer" className="underline">
            jm. office
          </a>{" "}
          &amp; calvin teoh
        </p>
      </div>
    </footer>
  );
}
