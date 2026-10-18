import React from "react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-forest-deep py-24 text-center">
      <div className="container-luxe">
        <p className="eyebrow !text-gold">گم‌شده</p>
        <h1 className="display-title mt-6 text-4xl text-ivory md:text-6xl">
          ۴۰۴
        </h1>
        <p className="mx-auto mt-4 max-w-md font-accent text-xl text-ivory/70 md:text-2xl">
          این اتاق وجود ندارد. شاید اتاقی که برای شما چیده‌ایم را امتحان کنید.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-gold">
            بازگشت به خانه
          </Link>
          <Link to="/collection" className="btn-outline-light">
            مشاهده مجموعه‌ها
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
