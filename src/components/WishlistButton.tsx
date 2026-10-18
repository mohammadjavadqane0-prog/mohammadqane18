import React from "react";
import { useStore } from "../context/StoreContext";
import { IconHeart } from "./icons";

export function WishlistButton({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const { toggleWishlist, isWishlisted } = useStore();
  const active = isWishlisted(productId);

  return (
    <button
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={`grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition-all duration-300 ${
        active
          ? "border-gold bg-gold/90 text-forest-deep"
          : "border-white/50 bg-white/60 text-charcoal hover:border-gold hover:text-gold-muted"
      } ${className}`}
    >
      <IconHeart className="h-4 w-4" filled={active} />
    </button>
  );
}
