type PageHeroProps = {
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PageHero({ title, subtitle, imageSrc, imageAlt = "" }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[46vh] items-center justify-center overflow-hidden text-center">
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a_0%,#0d9488_45%,#1e3a8a_100%)]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,25,47,0.35)_0%,rgba(3,17,37,0.72)_100%)]" />
      <div className="relative z-[1] mx-auto max-w-[1200px] px-8 py-24 text-[color:var(--color-white)]">
        <h1 className="font-[family-name:var(--font-display-fallback)] text-4xl font-semibold drop-shadow md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/95 mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}
