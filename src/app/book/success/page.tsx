import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Ad Virgin Island Resort",
};

export default async function BookSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ ref?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const ref = params.ref;

  return (
    <main className="mx-auto flex flex-1 max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
        Thank you
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display-fallback)] text-4xl font-semibold text-[color:var(--color-charcoal)]">
        Payment received
      </h1>
      {ref ? (
        <p className="mt-4 rounded bg-[color:var(--color-off-white)] px-4 py-2 font-mono text-sm text-[color:var(--color-text-light)]">
          Reference:&nbsp;<span className="text-[color:var(--color-charcoal)]">{ref}</span>
        </p>
      ) : null}
      <p className="mt-6 text-[color:var(--color-text-light)]">
        You should receive email confirmation shortly if outgoing mail is configured. Our team dashboard
        updates via Google Sheets and Calendar when enabled on the backend.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex rounded bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent-blue)_100%)] px-8 py-3 text-sm font-semibold text-[color:var(--color-white)]"
      >
        Back to home
      </Link>
    </main>
  );
}
