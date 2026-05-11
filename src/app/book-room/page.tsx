import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Book a Room | Ad Virgin Island Resort",
};

const ROOMS = [
  {
    title: "Premium Suite",
    copy: "Spacious rooms with floor-to-ceiling views, plush bedding, and sophisticated furnishings.",
    image: "/assets/bedroom-luxury.png",
  },
  {
    title: "Island View Room",
    copy: "Wake up to stunning views. Modern amenities meet coastal charm in every detail.",
    image: "/assets/bedroom-cozy.png",
  },
  {
    title: "Royal Deluxe Room",
    copy: "Stylish interiors, ambient lighting, and extra-comfort bedding for a truly elevated stay.",
    image: "/assets/room-royal.png",
  },
];

export default function BookRoomPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title="Luxurious Accommodations"
        subtitle="Experience comfort and elegance in our thoughtfully designed rooms"
        imageSrc="/assets/resort-aerial.png"
        imageAlt="Ad Virgin Island Resort"
      />

      <section className="bg-[linear-gradient(180deg,#f8f8f8_0%,#f2f5f8_100%)] px-8 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-3">
          {ROOMS.map((room) => (
            <article
              key={room.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-[color:var(--color-white)] shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.image} alt="" className="h-[280px] w-full object-cover" />
              <div className="flex flex-1 flex-col px-8 py-8">
                <h3 className="font-[family-name:var(--font-display-fallback)] text-2xl text-[color:var(--color-charcoal)]">
                  {room.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-[color:var(--color-text-light)]">{room.copy}</p>
                <Link
                  href="/book"
                  className="mt-6 inline-flex justify-center rounded border-2 border-[color:var(--color-accent-blue)] px-5 py-2 text-sm font-semibold text-[color:var(--color-accent-blue)] transition hover:bg-[color:var(--color-accent-blue)] hover:text-[color:var(--color-white)]"
                >
                  View &amp; Book
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-[1200px] text-center">
          <Link
            href="/book"
            className="inline-flex rounded bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent-blue)_100%)] px-10 py-4 text-base font-semibold text-[color:var(--color-white)] shadow-[var(--shadow-soft)]"
          >
            Book Your Stay
          </Link>
        </div>
      </section>
    </main>
  );
}
