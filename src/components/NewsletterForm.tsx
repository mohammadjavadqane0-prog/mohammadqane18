import React, { useState } from "react";
import { IconCheck } from "./icons";

/**
 * Newsletter signup — validates locally; shows an honest demo confirmation
 * (no backend subscription is performed).
 */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  if (done) {
    return (
      <p
        className={`flex items-center gap-2 font-body text-sm ${
          tone === "dark" ? "text-gold-soft" : "text-forest"
        }`}
        role="status"
      >
        <IconCheck /> Subscribed — welcome to the atelier list. (Demo: no email
        was sent.)
      </p>
    );
  }

  const dark = tone === "dark";

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div
        className={`flex overflow-hidden rounded-full border ${
          dark ? "border-ivory/20 bg-white/5" : "border-charcoal/15 bg-white"
        } transition-colors focus-within:border-gold-muted`}
      >
        <label htmlFor={dark ? "nl-footer" : "nl-home"} className="sr-only">
          Email address
        </label>
        <input
          id={dark ? "nl-footer" : "nl-home"}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="Your email address"
          className={`w-full bg-transparent px-5 py-3 font-body text-sm ${
            dark
              ? "text-ivory placeholder:text-ivory/35"
              : "text-ink placeholder:text-charcoal/35"
          } focus:outline-none`}
        />
        <button
          type="submit"
          className="shrink-0 bg-gold px-6 font-heading text-[11px] font-semibold uppercase tracking-wide2 text-forest-deep transition-all duration-300 hover:bg-gold-soft"
        >
          Subscribe
        </button>
      </div>
      {error && (
        <p
          className="mt-2 pl-2 font-body text-xs text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
}
