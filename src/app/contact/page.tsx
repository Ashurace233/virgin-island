import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact | Ad Virgin Island Resort",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team"
        imageSrc="/assets/pool-area.png"
        imageAlt="Ad Virgin Island Resort"
      />

      <section className="px-8 py-20">
        <div className="mx-auto grid max-w-[960px] gap-6 md:grid-cols-3">
          {[
            {
              label: "Mail",
              href: "mailto:info@advirginislandresort.com",
              value: "info@advirginislandresort.com",
            },
            {
              label: "Phone",
              href: "tel:+233205381295",
              value: "+233 20 538 1295",
            },
            {
              label: "Location",
              value: "Island #12, Ada Foah, Greater Accra Region, Ghana",
            },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-[color:var(--color-marble)] bg-[color:var(--color-white)] px-8 py-10 text-center shadow-[var(--shadow-soft)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--color-primary)]">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-4 block text-base text-[color:var(--color-text)] hover:text-[color:var(--color-primary)]"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-4 text-base text-[color:var(--color-text)]">{item.value}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
