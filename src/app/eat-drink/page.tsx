import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Eat & Drink | Ad Virgin Island Resort",
};

export default function EatDrinkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title="Eat & Drink"
        subtitle="Coastal flavors, poolside bites, and memorable dining at Virgin Island"
        imageSrc="/assets/pool-area.png"
        imageAlt="Resort dining atmosphere"
      />
      <section id="menus" className="px-8 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display-fallback)] text-3xl text-[color:var(--color-charcoal)]">
            Menus
          </h2>
          <p className="mt-4 text-[color:var(--color-text-light)]">
            Bring your static menu content here or connect a CMS. This page preserves the Virgin Island
            navigation flow from your original site.
          </p>
        </div>
      </section>
      <section
        id="online-orders"
        className="border-t border-[color:var(--color-marble)] bg-[color:var(--color-off-white)] px-8 py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display-fallback)] text-3xl text-[color:var(--color-charcoal)]">
            Online Orders
          </h2>
          <p className="mt-4 text-[color:var(--color-text-light)]">
            Hook this block to your ordering provider or in-house flow when you are ready.
          </p>
        </div>
      </section>
    </main>
  );
}
