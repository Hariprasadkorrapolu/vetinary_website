"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-medical/85 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium hover:border-brand-pink/30 flex flex-col h-full">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-medical shrink-0"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {Array.isArray(product.category) ? (
            product.category.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] text-brand-blue font-bold shadow-sm"
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] text-brand-blue font-bold shadow-sm">
              {product.category}
            </span>
          )}
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-brand-pink/8 px-2.5 py-1 text-[10px] text-brand-pink font-bold uppercase tracking-wider">
              {product.type}
            </span>
            {product.price ? (
              <span className="text-sm font-semibold text-ink">
                Rs. {product.price.toLocaleString("en-IN")}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3.5 text-xl font-bold tracking-tight text-ink group-hover:text-brand-blue transition-colors duration-300">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 font-sans">
            {product.shortUsage}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:text-brand-blue"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </button>
          ) : null}
          <Button
            href={`/products/${product.slug}`}
            variant="ghost"
            className="min-h-10 flex-1 py-2 text-xs font-bold border border-transparent hover:border-brand-blue/10"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
