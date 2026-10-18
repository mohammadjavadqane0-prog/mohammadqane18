import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice, useStore } from "../context/StoreContext";
import { products } from "../data/products";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";

export default function AccountPage() {
  const { user, login, logout, wishlist, cartCount, cartDetailed, cartTotal } =
    useStore();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    login(email.trim(), name.trim() || undefined);
  };

  if (!user) {
    return (
      <main>
        <PageHeader
          eyebrow="MAISON VERT"
          title={mode === "login" ? "Sign In" : "Create Account"}
        />
        <div className="container-luxe max-w-md py-16 md:py-20">
          <div className="mb-6 border border-gold/30 bg-gold/10 px-5 py-3 font-body text-xs text-charcoal/75">
            <strong className="font-heading font-semibold">Demo accounts.</strong>{" "}
            This preview keeps sign-in in your browser only — no server
            authentication is connected yet.
          </div>
          <form onSubmit={submit} noValidate className="card-line p-8">
            {mode === "register" && (
              <div className="mb-5">
                <label htmlFor="a-name" className="eyebrow mb-2 block">
                  Full name
                </label>
                <input
                  id="a-name"
                  className="input-lux"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            )}
            <div className="mb-5">
              <label htmlFor="a-email" className="eyebrow mb-2 block">
                Email
              </label>
              <input
                id="a-email"
                type="email"
                className="input-lux"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="a-password" className="eyebrow mb-2 block">
                Password
              </label>
              <input
                id="a-password"
                type="password"
                className="input-lux"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </div>
            {error && (
              <p className="mt-2 font-body text-xs text-red-600" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="btn-gold mt-6 w-full">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
            <p className="mt-5 text-center font-body text-sm text-charcoal/60">
              {mode === "login" ? "New to MAISON VERT?" : "Already a member?"}{" "}
              <button
                type="button"
                className="font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted hover:text-ink"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                }}
              >
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </p>
          </form>
        </div>
      </main>
    );
  }

  const savedAddresses = [
    {
      label: "Home",
      lines: ["Rue du Vieux Marché 14", "1000 Brussels", "Belgium"],
    },
  ];

  return (
    <main>
      <PageHeader
        eyebrow={`Welcome back, ${user.name.split(" ")[0]}`}
        title="My Account"
      />
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-[1fr_1.6fr] md:py-20">
        <aside className="card-line h-fit p-7">
          <p className="font-heading text-sm font-bold tracking-wide text-ink">
            {user.name}
          </p>
          <p className="mt-1 font-body text-xs text-charcoal/55">{user.email}</p>
          <dl className="mt-6 space-y-3 font-body text-sm text-charcoal/70">
            <div className="flex justify-between border-t border-charcoal/10 pt-3">
              <dt>Wishlist items</dt>
              <dd className="font-heading font-bold text-ink">{wishlist.length}</dd>
            </div>
            <div className="flex justify-between border-t border-charcoal/10 pt-3">
              <dt>Cart items</dt>
              <dd className="font-heading font-bold text-ink">{cartCount}</dd>
            </div>
            <div className="flex justify-between border-t border-charcoal/10 pt-3">
              <dt>Cart subtotal</dt>
              <dd className="font-heading font-bold text-ink">
                {formatPrice(cartTotal)}
              </dd>
            </div>
          </dl>
          <button
            className="btn-outline-dark mt-7 w-full"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Sign Out
          </button>
        </aside>

        <div className="space-y-12">
          <section aria-label="Order history">
            <h2 className="font-heading text-xl font-bold tracking-wide text-ink">
              Order History
            </h2>
            {cartDetailed.length === 0 ? (
              <p className="mt-4 font-body text-sm text-charcoal/60">
                No orders yet — your placed demo orders will appear here.
              </p>
            ) : (
              <div className="card-line mt-4 px-6">
                <p className="py-4 font-body text-sm text-charcoal/70">
                  Current cart: {cartCount} item{cartCount === 1 ? "" : "s"} ·{" "}
                  {formatPrice(cartTotal)} —{" "}
                  <Link
                    to="/cart"
                    className="font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted hover:text-ink"
                  >
                    view cart
                  </Link>
                </p>
              </div>
            )}
          </section>

          <section aria-label="Saved addresses">
            <h2 className="font-heading text-xl font-bold tracking-wide text-ink">
              Saved Addresses
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {savedAddresses.map((a) => (
                <div key={a.label} className="card-line p-5">
                  <p className="eyebrow">{a.label}</p>
                  {a.lines.map((l) => (
                    <p key={l} className="mt-1 font-body text-sm text-charcoal/70">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Wishlist preview">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold tracking-wide text-ink">
                Wishlist
              </h2>
              <Link
                to="/wishlist"
                className="font-heading text-[11px] font-semibold uppercase tracking-wide2 text-gold-muted hover:text-ink"
              >
                View all
              </Link>
            </div>
            {wishlist.length === 0 ? (
              <p className="mt-4 font-body text-sm text-charcoal/60">
                Nothing saved yet — tap the heart on any piece you love.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
                {wishlist
                  .map((id) => products.find((p) => p.id === id))
                  .filter((p): p is NonNullable<typeof p> => !!p)
                  .slice(0, 3)
                  .map((p, i) => (
                    <Reveal key={p.id} delay={i * 80}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}


