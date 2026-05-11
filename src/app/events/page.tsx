import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Events | Ad Virgin Island Resort",
};

export default function EventsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title="Events"
        subtitle="Make your event extraordinary in paradise"
        imageSrc="/assets/resort-aerial.png"
        imageAlt="Ad Virgin Island Resort"
      />

      <section className="bg-[linear-gradient(180deg,#f8f8f8_0%,#f2f5f8_100%)] px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-lg leading-relaxed text-[color:var(--color-text)]">
            At our stunning island resort, you can host a variety of ideal events that cater to every
            occasion. From breathtaking beach weddings and intimate corporate retreats to lively family
            reunions and unforgettable birthday celebrations, our venue offers the perfect backdrop.
            Guests enjoy seamless planning support, luxurious accommodations, and curated experiences
            that feel unmistakably Virgin Island.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.advirginislandresort.com/events"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent-blue)_100%)] px-8 py-3 text-sm font-semibold text-[color:var(--color-white)]"
            >
              See Upcoming Events
            </a>
            <Link
              href="/contact"
              className="inline-flex rounded border-2 border-[color:var(--color-accent-blue)] px-8 py-3 text-sm font-semibold text-[color:var(--color-accent-blue)] transition hover:bg-[color:var(--color-accent-blue)] hover:text-[color:var(--color-white)]"
            >
              Plan Your Event
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
