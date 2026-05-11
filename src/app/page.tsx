import Link from "next/link";
import { BackdropImage } from "@/components/BackdropImage";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center">
        <BackdropImage
          src="/assets/resort-aerial.png"
          alt="Ad Virgin Island Resort aerial view"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,25,47,0.35)_0%,rgba(3,17,37,0.68)_100%)]" />
        <div className="relative z-[2] max-w-3xl px-6 py-24 text-[color:var(--color-white)]">
          <h1 className="font-[family-name:var(--font-display-fallback)] text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-tight drop-shadow">
            Exclusivity, Privacy and Luxury.
          </h1>
          <p className="mt-3 text-xl text-white/95">AD Virgin Island Resort, Ada Foah</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium">
            {["Waterfront Escape", "Premium Rooms", "Pool & Dining"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/40 bg-white/10 px-4 py-2 backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </div>
          <Link
            href="/book"
            className="mt-10 inline-block rounded bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent-blue)_100%)] px-8 py-3 text-sm font-semibold text-[color:var(--color-white)] shadow-[var(--shadow-soft)] transition hover:brightness-105"
          >
            Book Now
          </Link>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)] px-8 py-20">
        <div className="mx-auto max-w-[1200px] text-center">
          <h2 className="font-[family-name:var(--font-display-fallback)] text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[color:var(--color-charcoal)]">
            Welcome to Virgin Island Resort
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-[color:var(--color-text)]">
            A tropical paradise that offers an unforgettable getaway. Nestled among pristine beaches and
            crystal-clear waters, our resort provides luxurious accommodations, world-class dining, and a
            variety of adventure activities.
          </p>
          <p className="mx-auto mt-4 max-w-prose text-[color:var(--color-text)]">
            Whether you&apos;re looking to relax by the pool, explore vibrant marine life, or indulge in
            rejuvenating spa treatments, Virgin Island Resort has something for everyone. Discover the
            beauty and serenity of our island oasis and create lasting memories with us.
          </p>
          <Link
            href="/book-room"
            className="mt-8 inline-block rounded border-2 border-[color:var(--color-accent-blue)] bg-[color:var(--color-accent-blue)] px-8 py-3 text-sm font-semibold text-[color:var(--color-white)] transition hover:bg-[#1a2f6b]"
          >
            More Details
          </Link>
        </div>
      </section>

      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden px-8 py-20 text-center">
        <BackdropImage
          src="/assets/pool-area.png"
          alt="Resort pool and facilities"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,148,136,0.52)_0%,rgba(30,58,138,0.48)_100%)]" />
        <div className="relative z-[1] max-w-xl text-[color:var(--color-white)]">
          <h2 className="font-[family-name:var(--font-display-fallback)] text-[clamp(2rem,4vw,2.75rem)] font-semibold drop-shadow">
            The Virgin Island Experience
          </h2>
          <p className="mt-4 text-lg text-white/95">
            Relax by our stunning pool, enjoy the tropical sun, and unwind in paradise.
          </p>
          <Link
            href="/book-room"
            className="mt-8 inline-block rounded border-2 border-[color:var(--color-white)] bg-[color:var(--color-white)] px-8 py-3 text-sm font-semibold text-[color:var(--color-charcoal)] transition hover:bg-[color:var(--color-off-white)]"
          >
            Explore
          </Link>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8f8f8_0%,#f2f5f8_100%)] px-8 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/book-room", title: "Accommodations", copy: "Luxurious rooms and suites" },
            { href: "/eat-drink", title: "Food & Drinks", copy: "Dining and poolside service" },
            { href: "/events", title: "Events", copy: "Weddings, retreats, celebrations" },
            { href: "/book", title: "Book Your Stay", copy: "Reserve your paradise escape" },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-black/5 bg-[color:var(--color-white)] p-8 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <h3 className="font-[family-name:var(--font-display-fallback)] text-xl text-[color:var(--color-charcoal)]">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-[color:var(--color-text-light)]">{card.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[color:var(--color-marble)] px-8 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3">
          {[
            {
              title: "Private Island Feel",
              body: "Enjoy peaceful river views and a truly secluded atmosphere.",
            },
            {
              title: "Signature Hospitality",
              body: "Our team delivers personalized care from check-in to checkout.",
            },
            {
              title: "Memorable Experiences",
              body: "From floating breakfast to sunset moments, every stay feels special.",
            },
          ].map((item) => (
            <article key={item.title}>
              <h3 className="font-[family-name:var(--font-display-fallback)] text-xl text-[color:var(--color-charcoal)]">
                {item.title}
              </h3>
              <p className="mt-3 text-[color:var(--color-text-light)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
