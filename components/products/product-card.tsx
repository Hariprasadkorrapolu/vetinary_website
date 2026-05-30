"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

export function ProductCard({
  product,
  onQuickView
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-medical">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 25vw"
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-medical px-3 py-1 text-xs font-bold text-slateblue">{product.category}</span>
          {product.price ? (
            <span className="text-sm font-semibold text-ink">Rs. {product.price.toLocaleString("en-IN")}</span>
          ) : null}
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.shortUsage}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {onQuickView ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slateblue transition hover:bg-medical"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </button>
          ) : null}
          <Button href={`/products/${product.slug}`} variant="ghost" className="min-h-10 flex-1 py-2">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
