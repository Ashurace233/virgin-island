"use client";

import { useCallback, useEffect, useState } from "react";
import { backendBaseUrl, ROOM_OPTIONS, type RoomOption } from "@/lib/api";

type AvailabilityOk = {
  ok: true;
  available: true;
  nights: number;
  ratePerNightGhs: number;
  totalGhs: number;
  label: string;
};

type AvailabilityNo = {
  ok: true;
  available: false;
  reason: string;
};

type PaystackTx = { reference?: string };

type PaystackWindow = {
  PaystackPop?: {
    resumeTransaction: (
      accessCode: string,
      handlers: {
        key?: string;
        callback?: (transaction: PaystackTx) => void;
        onSuccess?: (transaction: PaystackTx) => void;
        onCancel?: () => void;
      }
    ) => void;
  };
};

function loadPaystackScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as PaystackWindow;
  if (w.PaystackPop) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Paystack script failed")), {
        once: true,
      });
      return;
    }
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Paystack script failed"));
    document.body.appendChild(s);
  });
}

export function BookingFlow() {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";

  const [roomTypeId, setRoomTypeId] = useState<RoomOption["id"]>("premium-suite");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [notes, setNotes] = useState("");

  const [availability, setAvailability] = useState<AvailabilityOk | AvailabilityNo | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!checkIn) return;
    setCheckOut((prev) => (prev && prev < checkIn ? checkIn : prev));
  }, [checkIn, checkOut]);

  const runAvailability = useCallback(async () => {
    setStatusMessage(null);
    if (!checkIn || !checkOut) {
      setStatusMessage("Select check-in and check-out dates.");
      return;
    }
    setLoadingAvailability(true);
    try {
      const res = await fetch(`${backendBaseUrl}/api/bookings/check-availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomTypeId, checkIn, checkOut }),
      });
      const data = (await res.json()) as AvailabilityOk | AvailabilityNo | { ok: false };
      if (!("available" in data)) {
        setAvailability(null);
        setStatusMessage("Could not read availability response.");
        return;
      }
      setAvailability(data);
      if (!data.available) {
        setStatusMessage(data.reason);
      }
    } catch {
      setAvailability(null);
      setStatusMessage("Could not reach the booking server. Is the backend running?");
    } finally {
      setLoadingAvailability(false);
    }
  }, [checkIn, checkOut, roomTypeId]);

  const openPaystack = async (accessCode: string, authorizationUrl: string) => {
    try {
      await loadPaystackScript();
    } catch {
      window.open(authorizationUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const w = window as PaystackWindow;
    if (!w.PaystackPop?.resumeTransaction) {
      window.open(authorizationUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const finish = async (transaction: PaystackTx) => {
      const ref = transaction.reference;
      if (!ref) {
        setStatusMessage("Payment completed but reference missing. Contact the resort.");
        return;
      }
      try {
        const confirm = await fetch(`${backendBaseUrl}/api/bookings/confirm-client`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: ref }),
        });
        const body = (await confirm.json()) as {
          ok: boolean;
          status?: string;
          message?: string;
        };
        if (body.ok) {
          window.location.href = `/book/success?ref=${encodeURIComponent(ref)}`;
        } else {
          setStatusMessage(
            body.message ??
              "Payment received. Finalizing your booking — you will get an email shortly."
          );
        }
      } catch {
        setStatusMessage(
          "Payment received. If you do not get a confirmation email within a few minutes, contact the resort."
        );
      }
    };

    w.PaystackPop.resumeTransaction(accessCode, {
      key: publicKey,
      callback: (tx) => void finish(tx),
      onSuccess: (tx) => void finish(tx),
      onCancel: () => {
        setStatusMessage("Payment window closed. You can try again when ready.");
      },
    });
  };

  const handleConfirm = async () => {
    setStatusMessage(null);
    if (!publicKey) {
      setStatusMessage("Paystack public key is not configured (NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY).");
      return;
    }
    if (!availability || !availability.available) {
      setStatusMessage("Check availability first — selected dates must be open.");
      await runAvailability();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${backendBaseUrl}/api/bookings/start-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomTypeId,
          checkIn,
          checkOut,
          guestName,
          guestEmail,
          guestPhone,
          guestCount: Number(guestCount),
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setStatusMessage(
          typeof data?.message === "string"
            ? data.message
            : typeof data?.reason === "string"
              ? data.reason
              : "Could not start payment."
        );
        return;
      }

      await openPaystack(data.accessCode as string, data.authorizationUrl as string);
    } catch {
      setStatusMessage("Network error starting payment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-3xl gap-8 rounded-2xl border border-[color:var(--color-marble)] bg-[color:var(--color-white)] p-8 shadow-[var(--shadow-soft)]">
      <div>
        <h2 className="text-center font-[family-name:var(--font-display-fallback)] text-3xl font-semibold text-[color:var(--color-charcoal)]">
          Reservation
        </h2>
        <p className="mt-2 text-center text-[color:var(--color-text-light)]">
          Choose dates, confirm availability for your villa category, then pay securely with Paystack.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)]">
          Full name
          <input
            required
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)]">
          Email
          <input
            type="email"
            required
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)]">
          Phone
          <input
            required
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)]">
          Guests
          <select
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          >
            {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
              <option key={n} value={n}>
                {n === "8" ? "8+" : n}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)] md:col-span-2">
          Room type
          <select
            value={roomTypeId}
            onChange={(e) => setRoomTypeId(e.target.value as RoomOption["id"])}
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          >
            {ROOM_OPTIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)]">
          Check-in
          <input
            type="date"
            required
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)]">
          Check-out
          <input
            type="date"
            required
            min={checkIn || undefined}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[color:var(--color-charcoal)] md:col-span-2">
          Special requests
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Celebrations, accessibility, dietary preferences…"
            className="rounded border border-[color:var(--color-marble)] px-3 py-2 text-[color:var(--color-text)] outline-none ring-[color:var(--color-primary)] focus:ring-2"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => void runAvailability()}
          disabled={loadingAvailability}
          className="rounded border-2 border-[color:var(--color-accent-blue)] px-6 py-3 text-sm font-semibold text-[color:var(--color-accent-blue)] transition hover:bg-[color:var(--color-accent-blue)] hover:text-[color:var(--color-white)] disabled:opacity-60"
        >
          {loadingAvailability ? "Checking…" : "Check availability"}
        </button>
        {availability?.available ? (
          <p className="text-sm text-[color:var(--color-text-light)] md:text-right">
            <span className="font-semibold text-[color:var(--color-charcoal)]">
              {availability.label}
            </span>
            <br />
            {availability.nights} night(s) · GHS {availability.ratePerNightGhs.toLocaleString()} / night ·{" "}
            <span className="font-semibold text-[color:var(--color-primary)]">
              Total GHS {availability.totalGhs.toLocaleString()}
            </span>
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 border-t border-[color:var(--color-marble)] pt-6">
        <button
          type="button"
          onClick={() => void handleConfirm()}
          disabled={submitting}
          className="w-full rounded bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-accent-blue)_100%)] px-6 py-4 text-base font-semibold text-[color:var(--color-white)] shadow-[var(--shadow-soft)] transition hover:brightness-[1.03] disabled:opacity-60"
        >
          {submitting ? "Connecting to Paystack…" : "Confirm booking"}
        </button>
        <p className="text-xs text-[color:var(--color-text-light)]">
          You will complete payment in Paystack&apos;s checkout. Successful payments finalize your stay,
          notify our team via Google Sheets and Calendar when configured on the server, and send email
          when SMTP credentials are set.
        </p>
      </div>

      {statusMessage ? (
        <p
          role="status"
          className="rounded border border-[color:var(--color-accent-gold)] bg-[#fffbeb] px-4 py-3 text-sm text-[color:var(--color-charcoal)]"
        >
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
