"use client";

import { useId, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const errorId = useId();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 rounded-full border border-success/30 bg-success/10 px-6 py-4 text-step-0 font-medium text-success"
      >
        <Check className="h-5 w-5" aria-hidden="true" />
        You&apos;re on the list. We&apos;ll email you.
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          className="w-full rounded-full border border-white/20 bg-black/30 px-5 py-3.5 text-step-0 text-ink placeholder:text-muted outline-none focus-visible:border-gold"
        />
        <AnimatePresence>
          {status === "error" && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 pl-2 text-step--1 text-danger"
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-step-0 font-semibold text-ink-dark shadow-[0_12px_32px_-10px_rgba(232,116,47,0.7)] transition hover:bg-accent-strong active:scale-95 disabled:opacity-70"
      >
        {status === "loading" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        Join the waitlist
      </button>
    </form>
  );
}
