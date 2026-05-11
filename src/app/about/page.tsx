import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About | Ad Virgin Island Resort",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title="About Us"
        subtitle="Welcome to Virgin Island Resort"
        imageSrc="/assets/resort-aerial.png"
        imageAlt="Ad Virgin Island Resort"
      />

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-[family-name:var(--font-display-fallback)] text-3xl text-[color:var(--color-charcoal)]">
            A Tropical Paradise
          </h2>
          <p className="mt-6 text-[color:var(--color-text)]">
            A tropical paradise that offers an unforgettable getaway. Nestled among pristine beaches and
            crystal-clear waters, our resort provides luxurious accommodations, world-class dining, and a
            variety of adventure activities.
          </p>
          <p className="mt-4 text-[color:var(--color-text)]">
            Whether you&apos;re looking to relax by the pool, explore vibrant marine life, or indulge in
            rejuvenating spa treatments, Virgin Island Resort has something for everyone. Discover the
            beauty and serenity of our island oasis and create lasting memories with us.
          </p>
        </div>
      </section>
    </main>
  );
}
