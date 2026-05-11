import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[color:var(--color-charcoal-dark)] text-[color:var(--color-off-white)] py-14 mt-auto">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="text-center md:text-left">
          <p className="font-[family-name:var(--font-display-fallback)] text-xl font-semibold">
            Ad Virgin Island Resort
          </p>
          <p className="mt-1 text-[color:var(--color-marble)]">Ada Foah, Ghana</p>
          <nav className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start text-sm uppercase tracking-[0.12em] text-[color:var(--color-marble)]">
            {(["Instagram", "Facebook", "Twitter", "LinkedIn", "YouTube", "TikTok"] as const).map(
              (label) => (
                <Link key={label} href="#" className="hover:text-[color:var(--color-white)] transition">
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>
        <p className="mt-10 border-t border-white/15 pt-6 text-center text-sm text-neutral-400">
          &copy; {year} Ad Virgin Island Resort
        </p>
      </div>
    </footer>
  );
}
