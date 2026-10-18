import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { formatPrice } from "../context/StoreContext";
import {
  IconCart,
  IconClose,
  IconHeart,
  IconMenu,
  IconSearch,
  IconUser,
} from "./icons";

const mainLinks = [
  { to: "/collection", label: "Furniture", dropdown: true },
  { to: "/designers", label: "Designers" },
  { to: "/trends", label: "Trends" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About Us" },
];

function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link to="/" className="group inline-flex flex-col items-start leading-none">
      <span
        className={`font-heading text-lg font-extrabold tracking-wide2 ${
          tone === "light" ? "text-ivory" : "text-forest"
        }`}
      >
        MAISON VERT
      </span>
      <span
        className={`mt-1 font-heading text-[8px] font-semibold uppercase tracking-luxe ${
          tone === "light" ? "text-gold" : "text-gold-muted"
        }`}
      >
        Furniture Design
      </span>
    </Link>
  );
}

export function Navbar() {
  const { cartCount, wishlist, openCart, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  const searchResults =
    query.trim().length > 1
      ? products
          .filter((p) =>
            `${p.name} ${p.category} ${p.material}`
              .toLowerCase()
              .includes(query.trim().toLowerCase())
          )
          .slice(0, 6)
      : [];

  const navIconBtn =
    "relative grid h-10 w-10 place-items-center rounded-full text-ivory/85 transition-colors duration-300 hover:bg-white/5 hover:text-gold";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-nav/95 shadow-[0_10px_40px_-15px_rgba(11,26,21,0.8)] backdrop-blur"
            : "bg-nav"
        }`}
      >
        <div className="container-luxe flex h-[68px] items-center justify-between gap-4">
          <Wordmark />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
            {mainLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (dropdownTimer.current)
                      clearTimeout(dropdownTimer.current);
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    dropdownTimer.current = setTimeout(
                      () => setDropdownOpen(false),
                      120
                    );
                  }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "nav-link-active" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                  <div
                    className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 transition-all duration-300 ${
                      dropdownOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="border border-gold/20 bg-nav py-3 shadow-2xl">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/collection/${c.slug}`}
                          className="block px-5 py-2.5 font-heading text-[12px] font-medium tracking-wide2 text-ivory/75 transition-colors duration-200 hover:bg-white/5 hover:text-gold"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "nav-link-active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-0.5">
            <button
              className={navIconBtn}
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch />
            </button>
            <Link
              to="/wishlist"
              className={`${navIconBtn} hidden sm:grid`}
              aria-label="Wishlist"
            >
              <IconHeart filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-gold font-heading text-[9px] font-bold text-forest-deep">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              className={navIconBtn}
              aria-label="Shopping cart"
              onClick={openCart}
            >
              <IconCart />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-1 grid h-4 w-4 place-items-center rounded-full bg-gold font-heading text-[9px] font-bold text-forest-deep">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/account"
              className={`${navIconBtn} hidden sm:grid`}
              aria-label="Account"
              title={user ? user.name : "Account"}
            >
              <IconUser />
            </Link>
            <button
              className={`${navIconBtn} lg:hidden`}
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          menuOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-forest-deepest/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-nav px-7 py-6 transition-transform duration-400 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Wordmark />
            <button
              className="grid h-10 w-10 place-items-center rounded-full text-ivory/80 hover:bg-white/5"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <IconClose />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
            {mainLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="border-b border-white/5 py-4 font-heading text-base font-semibold tracking-wide2 text-ivory transition-colors hover:text-gold"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-6 eyebrow">Collections</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/collection/${c.slug}`}
                className="border border-gold/15 px-3 py-2.5 text-center font-heading text-[11px] uppercase tracking-wide2 text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                onClick={() => setMenuOpen(false)}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex gap-3 pt-8">
            <Link
              to="/wishlist"
              className="btn-outline-gold flex-1"
              onClick={() => setMenuOpen(false)}
            >
              Wishlist ({wishlist.length})
            </Link>
            <Link
              to="/account"
              className="btn-outline-gold flex-1"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>
          </div>
        </aside>
      </div>

      {/* Search overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          searchOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div
          className="absolute inset-0 bg-forest-deepest/80 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        />
        <div className="relative mx-auto mt-[18vh] w-[90%] max-w-2xl animate-fade-up">
          <div className="flex items-center gap-3 border border-gold/30 bg-nav px-5 py-4">
            <IconSearch className="h-5 w-5 shrink-0 text-gold" />
            <input
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  navigate(`/collection?q=${encodeURIComponent(query.trim())}`);
                  setSearchOpen(false);
                  setQuery("");
                }
                if (e.key === "Escape") setSearchOpen(false);
              }}
              placeholder="Search furniture, materials, designers…"
              className="w-full bg-transparent font-body text-base text-ivory placeholder:text-ivory/35 focus:outline-none"
              aria-label="Search products"
            />
            <button
              className="text-ivory/60 transition-colors hover:text-gold"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              <IconClose />
            </button>
          </div>
          {searchResults.length > 0 && (
            <ul className="mt-3 animate-fade-up divide-y divide-white/5 border border-gold/20 bg-nav">
              {searchResults.map((p) => (
                <li key={p.id}>
                  <button
                    className="flex w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-white/5"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-12 w-12 shrink-0 object-cover"
                      loading="lazy"
                    />
                    <span className="flex-1 font-heading text-sm font-semibold tracking-wide text-ivory">
                      {p.name}
                      <span className="ml-3 text-[11px] font-medium uppercase tracking-wide2 text-ivory/45">
                        {p.category}
                      </span>
                    </span>
                    <span className="font-heading text-sm text-gold">
                      {formatPrice(p.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
