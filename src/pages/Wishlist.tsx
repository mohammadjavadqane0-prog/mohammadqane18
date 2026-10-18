import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { useStore } from "../context/StoreContext";
import { products } from "../data/products";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <main>
      <PageHeader
        eyebrow="Saved Pieces"
        title="Wishlist"
        subtitle={items.length ? undefined : "Nothing saved yet — tap the heart on any piece you love."}
      />
      <div className="container-luxe py-16 md:py-20">
        {items.length === 0 ? (
          <div className="card-line flex flex-col items-center gap-4 px-8 py-20 text-center">
            <p className="font-accent text-3xl italic text-charcoal/60">
              Your wishlist is waiting.
            </p>
            <Link to="/collection" className="btn-gold mt-2">
              Discover Furniture
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
