"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck, ZoomIn, ZoomOut, RotateCcw, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Product, products } from "@/lib/products";
import { useEnquiry } from "@/components/modals/enquiry-provider";
import { WHATSAPP_URL } from "@/lib/constants";

export function ProductDetailClient({ product }: { product: Product }) {
  const { openEnquiry } = useEnquiry();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 3);

  return (
    <section className="bg-mist pb-20 pt-32">
      <Container>
        <div className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slateblue">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-slateblue">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
          {/* Left Column: Image Section */}
          <div className="w-full">
            <div 
              className="relative w-full aspect-square overflow-hidden rounded-[2rem] border border-medical bg-transparent shadow-premium p-6 sm:p-8 md:p-12 flex items-center justify-center group"
            >
              {/* Image zoom wrapper */}
              <div 
                className="relative w-full h-full cursor-zoom-in overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setMousePos({ x: 50, y: 50 });
                }}
                onClick={() => {
                  setLightboxScale(1);
                  setIsLightboxOpen(true);
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain transition-transform duration-100 ease-out select-none"
                  style={{
                    transform: isHovering ? "scale(1.8)" : "scale(1)",
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>

              {/* Subtle hover prompt icon */}
              <div className="absolute right-6 bottom-6 pointer-events-none rounded-full bg-slate-900/70 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm shadow-md">
                <Maximize2 className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-medical bg-white p-6 shadow-soft sm:p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-slateblue/70">
              {product.category}
            </p>
            <h1 className="mt-3 text-4xl tracking-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            {product.price ? (
              <p className="mt-4 text-3xl text-slateblue">
                Rs. {product.price.toLocaleString("en-IN")}
              </p>
            ) : null}
            <p className="mt-6 text-base leading-8 text-slate-600">
              {product.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => openEnquiry(product.name)}>
                Contact Enquiry
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slateblue transition hover:bg-medical"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Inquiry
              </a>
            </div>

            <div className="mt-9 grid gap-4">
              <Detail title="Dosage" text={product.dosage} />
              <Detail title="Usage" text={product.usage} />
              <Detail title="Composition" text={product.composition} />
              <Detail title="Packaging" text={product.packaging} />
              {product.warnings ? (
                <Detail title="Warnings" text={product.warnings} />
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-medical bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl tracking-tight text-ink">Benefits</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {product.benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-2xl bg-mist p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-slateblue" />
                <p className="text-sm leading-6 text-ink">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300">
          {/* Header */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between p-6 text-white bg-gradient-to-b from-black/80 to-transparent">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{product.name}</h2>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{product.category}</p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Central image display */}
          <div className="relative flex items-center justify-center w-full max-w-4xl h-[70vh] overflow-hidden rounded-2xl bg-white/5 p-4">
            <div 
              className="relative w-full h-full transition-transform duration-200 ease-out select-none"
              style={{
                transform: `scale(${lightboxScale})`,
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Zoom controls at the bottom */}
          <div className="absolute bottom-6 flex items-center gap-4 bg-slate-900/90 border border-white/10 rounded-full px-6 py-3 text-white shadow-lg backdrop-blur-md">
            <button
              onClick={() => setLightboxScale(prev => Math.max(1, prev - 0.25))}
              disabled={lightboxScale <= 1}
              className="hover:text-cyanline disabled:opacity-40 transition-colors p-1"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium w-12 text-center select-none">
              {Math.round(lightboxScale * 100)}%
            </span>
            <button
              onClick={() => setLightboxScale(prev => Math.min(3, prev + 0.25))}
              disabled={lightboxScale >= 3}
              className="hover:text-cyanline disabled:opacity-40 transition-colors p-1"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            <button
              onClick={() => setLightboxScale(1)}
              disabled={lightboxScale === 1}
              className="hover:text-cyanline disabled:opacity-40 transition-colors p-1"
              aria-label="Reset zoom"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-medical p-4">
      <h3 className="text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
