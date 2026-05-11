"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  gradientClass?: string;
  className?: string;
};

export function BackdropImage({ src, alt, gradientClass, className }: Props) {
  const [showGradient, setShowGradient] = useState(false);

  return (
    <>
      {!showGradient ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={className}
          onError={() => setShowGradient(true)}
        />
      ) : null}
      {showGradient ? (
        <div
          aria-hidden
          className={`absolute inset-0 ${gradientClass ?? "bg-[linear-gradient(135deg,#0f172a_0%,#0d9488_45%,#1e3a8a_100%)]"}`}
        />
      ) : null}
    </>
  );
}
