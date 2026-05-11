"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/92 backdrop-blur-md shadow-[var(--shadow-soft)]">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-8 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display-fallback)] text-lg font-semibold text-[color:var(--color-charcoal)]"
        >
          Ad Virgin Island Resort
        </Link>
        <button
          type="button"
          className="relative z-10 flex flex-col gap-[5px] p-2 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-[color:var(--color-charcoal)] transition" />
          <span className="h-0.5 w-6 bg-[color:var(--color-charcoal)] transition" />
          <span className="h-0.5 w-6 bg-[color:var(--color-charcoal)] transition" />
        </button>
        <ul
          className={
            open
              ? "absolute left-0 top-full flex w-full flex-col gap-1 border-t border-neutral-100 bg-white px-6 py-4 shadow-[var(--shadow-elevated)] md:static md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none"
              : "absolute left-0 top-full hidden w-full flex-col gap-1 border-t border-neutral-100 bg-white px-6 py-4 shadow-[var(--shadow-elevated)] md:static md:flex md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none"
          }
        >
          <li>
            <Link
              href="/"
              className="block rounded px-3 py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] md:inline-block"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/book-room"
              className="block rounded px-3 py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] md:inline-block"
              onClick={() => setOpen(false)}
            >
              Book a Room
            </Link>
          </li>
          <li className="group relative">
            <Link
              href="/eat-drink"
              className="block rounded px-3 py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] md:inline-block"
              onClick={() => setOpen(false)}
            >
              Eat &amp; Drink
            </Link>
            <ul className="relative mt-2 min-w-[180px] md:absolute md:left-0 md:top-[calc(100%+2px)] md:mt-0 md:rounded md:bg-white md:py-2 md:opacity-0 md:invisible md:shadow-[var(--shadow-elevated)] md:transition md:duration-300 group-hover:opacity-100 group-hover:visible">
              <li>
                <Link
                  href="/eat-drink#menus"
                  className="block rounded px-3 py-2 text-sm text-[color:var(--color-text-light)] hover:bg-[color:var(--color-off-white)] md:px-5 md:py-3"
                  onClick={() => setOpen(false)}
                >
                  Menus
                </Link>
              </li>
              <li>
                <Link
                  href="/eat-drink#online-orders"
                  className="block rounded px-3 py-2 text-sm text-[color:var(--color-text-light)] hover:bg-[color:var(--color-off-white)] md:px-5 md:py-3"
                  onClick={() => setOpen(false)}
                >
                  Online Orders
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href="/events"
              className="block rounded px-3 py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] md:inline-block"
              onClick={() => setOpen(false)}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/book"
              className="mx-3 my-2 block rounded bg-[color:var(--color-primary)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--color-white)] hover:bg-[color:var(--color-primary-dark)] md:mx-0 md:my-0 md:inline-block"
              onClick={() => setOpen(false)}
            >
              Book Online
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block rounded px-3 py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] md:inline-block"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block rounded px-3 py-2 text-sm font-medium text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] md:inline-block"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
