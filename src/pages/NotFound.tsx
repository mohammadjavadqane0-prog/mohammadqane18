import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-forest-deep py-24 text-center">
      <div className="container-luxe">
        <p className="eyebrow !text-gold">Lost & Found</p>
        <h1 className="display-title mt-6 text-4xl text-ivory md:text-6xl">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md font-accent text-xl italic text-ivory/70 md:text-2xl">
          This room doesn't exist. Perhaps try the one we designed for you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-gold">
            Back to Home
          </Link>
          <Link to="/collection" className="btn-outline-light">
            Explore Collection
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
