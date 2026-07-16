export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-[30px] pt-[60px] pb-[20px] px-6 md:px-[138px] text-center uppercase text-[#352523]">
      <div className="flex gap-[30px] items-baseline justify-center text-[12px] tracking-[2.4px]">
        <a href="mailto:hello@geoffreygrunfeld.com" className="hover:underline underline-offset-4 decoration-1">
          contact
        </a>
        <a
          href="https://www.instagram.com/geoffrey_grunfeld/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-4 decoration-1"
        >
          follow
        </a>
      </div>
      <div className="flex gap-[30px] items-baseline justify-center tracking-[1.8px]">
        <p className="text-[9px]">©Geoffrey Grunfeld, 2026</p>
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
