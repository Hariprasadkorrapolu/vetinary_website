"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/modals/enquiry-provider";

export function QuickViewModal({
  product,
  onClose
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/58 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            className="relative grid w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-premium md:grid-cols-2"
          >
            <button
              type="button"
              aria-label="Close quick view"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-slateblue shadow-soft"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative min-h-72 bg-medical">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
            </div>
            <div className="p-7 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slateblue/70">{product.category}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">{product.name}</h2>
              {product.price ? (
                <p className="mt-3 text-2xl font-semibold text-slateblue">
                  Rs. {product.price.toLocaleString("en-IN")}
                </p>
              ) : null}
              <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => openEnquiry(product.name)}>Contact Enquiry</Button>
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
