"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/modals/enquiry-provider";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/75 md:bg-ink/58 px-4 py-8 md:backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            style={{ willChange: "transform, opacity" }}
            className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-medical bg-white shadow-premium md:grid-cols-2"
          >
            <button
              type="button"
              aria-label="Close quick view"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slateblue shadow-soft"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative min-h-[350px] bg-transparent border-b md:border-b-0 md:border-r border-medical/50 p-8 flex items-center justify-center">
              <div className="relative w-full h-full min-h-[250px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="p-7 sm:p-9">
              <p className="text-sm uppercase tracking-[0.18em] text-slateblue/70">
                {Array.isArray(product.category) ? product.category.join(" & ") : product.category}
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink">
                {product.name}
              </h2>
              {product.price ? (
                <p className="mt-3 text-2xl text-slateblue">
                  Rs. {product.price.toLocaleString("en-IN")}
                </p>
              ) : null}
              <p className="mt-5 text-sm leading-7 text-slate-600">
                {product.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => openEnquiry(
                  product.name,
                  "Product Inquiry",
                  typeof product.category === "string" ? product.category : product.category.join(", "),
                  product.type
                )}>
                  Contact Enquiry
                </Button>
                <Button href={`/products/${product.slug}`} variant="ghost">
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
