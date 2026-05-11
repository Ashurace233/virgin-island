import type { Metadata } from "next";
import { BookingFlow } from "@/components/BookingFlow";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Book Online | Ad Virgin Island Resort",
};

export default function BookPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title="Book Your Stay"
        subtitle="Reserve your paradise escape at Ad Virgin Island Resort"
        imageSrc="/assets/resort-aerial.png"
        imageAlt="Ad Virgin Island Resort"
      />
      <section className="flex-1 bg-[linear-gradient(180deg,#f8f8f8_0%,#f2f5f8_100%)] px-6 py-16">
        <BookingFlow />
      </section>
    </main>
  );
}
