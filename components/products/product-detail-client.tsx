"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle, ZoomIn, ZoomOut, RotateCcw, X, Maximize2,
  FlaskConical, Activity, Gauge, Boxes, ArrowLeft,
  ShieldCheck, HeartPulse, Sparkles, TrendingUp, Scale,
  ThumbsUp, Droplets, CheckCircle2, ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Product, products } from "@/lib/products";
import { useEnquiry } from "@/components/modals/enquiry-provider";
import { WHATSAPP_URL } from "@/lib/constants";
import { ProductCard } from "@/components/products/product-card";

// Benefit icon mapper based on keywords
function getBenefitIcon(benefit: string) {
  const lower = benefit.toLowerCase();
  if (lower.includes("protect") || lower.includes("hepato") || lower.includes("immun") || lower.includes("broad-spectrum")) {
    return ShieldCheck;
  }
  if (lower.includes("health") || lower.includes("reproduct") || lower.includes("anaemia")) {
    return HeartPulse;
  }
  if (lower.includes("perform") || lower.includes("function") || lower.includes("activ")) {
    return Activity;
  }
  if (lower.includes("weight") || lower.includes("productivity") || lower.includes("gain") || lower.includes("yield")) {
    return TrendingUp;
  }
  if (lower.includes("feed") || lower.includes("conversion")) {
    return Scale;
  }
  if (lower.includes("easy") || lower.includes("safe") || lower.includes("adminis")) {
    return ThumbsUp;
  }
  if (lower.includes("milk")) {
    return Droplets;
  }
  if (lower.includes("skin") || lower.includes("reliev")) {
    return Sparkles;
  }
  if (lower.includes("control") || lower.includes("parasit") || lower.includes("toxemia")) {
    return ShieldAlert;
  }
  return CheckCircle2;
}

// Utility parser for usage to list items
function parseUsage(usageStr: string): string[] {
  if (!usageStr) return [];
  let cleaned = usageStr.replace(/^(Used for treatment and control of|Treatment and control of|Used against|Used for)\s+/i, "");
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  cleaned = cleaned.replace(/,\s*and\s+/gi, ", ").replace(/\s+and\s+/gi, ", ");
  if (cleaned.endsWith(".")) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned.split(/,\s+/).map(item => {
    const trimmed = item.trim();
    if (trimmed.length === 0) return "";
    if (trimmed.startsWith("GI")) {
      return "GI " + trimmed.slice(2).trim();
    }
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }).filter(Boolean);
}

// Utility parser for composition to ingredients and concentrations
function parseComposition(compositionStr: string): { ingredient: string; concentration: string }[] {
  if (!compositionStr) return [];
  const parts = compositionStr.split("+").map(p => p.trim());
  return parts.map(part => {
    const middlePattern = /(.*?)\s+(\d+(?:\.\d+)?\s*(?:%\s*W\/[vw]|mg|gm|g|%))\s*(.*)/i;
    const middleMatch = part.match(middlePattern);
    if (middleMatch) {
      const ingredient = `${middleMatch[1].trim()} ${middleMatch[3].trim()}`.trim();
      const concentration = middleMatch[2].trim();
      return { ingredient, concentration };
    }

    const endPattern = /(.*?)\s+(\d+(?:\.\d+)?\s*(?:%\s*W\/[vw]|mg|gm|g|%)(?:\s+I\.P\.)?)$/i;
    const endMatch = part.match(endPattern);
    if (endMatch) {
      return {
        ingredient: endMatch[1].trim(),
        concentration: endMatch[2].trim()
      };
    }

    return {
      ingredient: part,
      concentration: "Standardized"
    };
  });
}

// Utility parser for packaging format
function parsePackaging(packagingStr: string): string[] {
  if (!packagingStr) return [];
  return packagingStr.split(/,\s+/).map(item => item.trim()).filter(Boolean);
}

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

  const parsedComposition = useMemo(() => parseComposition(product.composition), [product.composition]);
  const parsedUsage = useMemo(() => parseUsage(product.usage), [product.usage]);
  const parsedPackaging = useMemo(() => parsePackaging(product.packaging), [product.packaging]);

  const related = useMemo(() => products
    .filter((item) => {
      if (item.id === product.id) return false;
      const itemCats = Array.isArray(item.category) ? item.category : [item.category];
      const prodCats = Array.isArray(product.category) ? product.category : [product.category];
      return itemCats.some((cat) => prodCats.includes(cat));
    })
    .slice(0, 3), [product.category, product.id]);

  return (
    <section className="bg-mist pb-24 pt-32 min-h-screen">
      <Container>
        {/* Breadcrumbs & Navigation */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 font-sans">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#2F3E6F] transition-colors font-medium">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/products" className="hover:text-[#2F3E6F] transition-colors font-medium">
              Products
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#2F3E6F] font-semibold">{product.name}</span>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F3E6F] hover:text-[#ED6E80] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalogue
          </Link>
        </div>

        {/* Product Hero Section */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start mb-16">
          {/* Left Column: Image Section */}
          <div className="w-full">
            <div
              className="relative w-full aspect-square overflow-hidden rounded-[2rem] border border-[#F0F4F8] bg-white shadow-premium p-6 sm:p-8 md:p-12 flex items-center justify-center group"
            >
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f4f8_1px,transparent_1px),linear-gradient(to_bottom,#f0f4f8_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

              {/* Product Badge */}
              <div className="absolute top-4 left-6 z-10 flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 border border-slate-100 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8BE56] animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Interactive Zoom</span>
              </div>

              {/* Image zoom wrapper */}
              <div
                className="relative w-full h-full cursor-zoom-in overflow-hidden z-10"
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
              <div className="absolute right-6 bottom-6 pointer-events-none rounded-full bg-[#2F3E6F]/90 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm shadow-md z-20">
                <Maximize2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Right Column: Hero Content */}
          <div className="flex flex-col h-full justify-between">
            <div>
              {/* Badges Container */}
              <div className="flex flex-wrap gap-2.5 mb-4">
                {Array.isArray(product.category) ? (
                  product.category.map((cat) => (
                    <span key={cat} className="inline-flex items-center rounded-full bg-[#2F3E6F]/10 px-3.5 py-1 text-xs font-bold text-[#2F3E6F]">
                      {cat}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center rounded-full bg-[#2F3E6F]/10 px-3.5 py-1 text-xs font-bold text-[#2F3E6F]">
                    {product.category}
                  </span>
                )}
                <span className="inline-flex items-center rounded-full bg-[#ED6E80]/10 px-3.5 py-1 text-xs font-bold text-[#ED6E80]">
                  {product.type}
                </span>
                {product.isLatest && (
                  <span className="inline-flex items-center rounded-full bg-[#E8BE56]/15 px-3.5 py-1 text-xs font-bold text-[#b88c1c]">
                    Latest formulation
                  </span>
                )}
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F3E6F]/60">
                Pharmaceutical Profile
              </span>

              <h1 className="mt-2 text-4xl lg:text-5xl font-bold tracking-tight text-[#2F3E6F] font-heading leading-tight">
                {product.name}
              </h1>

              <p className="mt-3 text-xl font-semibold text-[#ED6E80] leading-relaxed">
                {product.shortUsage}
              </p>

              <div className="mt-6 border-t border-slate-200/80 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Short Product Overview</h3>
                <p className="text-base text-slate-600 leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons in top fold (First section) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => openEnquiry(product.name)}
                  variant="primary"
                  className="w-full sm:w-auto font-bold"
                >
                  Contact Enquiry
                </Button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#2F3E6F] transition-all duration-300 hover:bg-slate-50 hover:border-[#2F3E6F]/30 hover:shadow-soft hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4.5 w-4.5 text-[#E8BE56]" />
                  WhatsApp Enquiry
                </a>
              </div>

              {/* Key Benefits Section (Visually Outstanding) */}
              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ED6E80]"></span>
                  Efficacy & Key Benefits
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.benefits.map((benefit) => {
                    const Icon = getBenefitIcon(benefit);
                    return (
                      <div
                        key={benefit}
                        className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/60 bg-white p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#2F3E6F]/25"
                      >
                        <div className="rounded-xl bg-[#2F3E6F]/5 p-2 text-[#2F3E6F] transition-colors duration-300 group-hover:bg-[#2F3E6F]/10 shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 leading-snug group-hover:text-[#2F3E6F] transition-colors duration-300">
                          {benefit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mb-16">
          <div className="border-t border-slate-200 pt-12 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED6E80]">
              Clinical Specifications
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#2F3E6F] font-heading mt-1">
              Technical & Prescribing Information
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {/* Composition Card */}
            <div className="rounded-[2rem] border border-[#F0F4F8] bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3 border-b border-[#F0F4F8] pb-5 mb-5">
                <div className="rounded-xl bg-[#2F3E6F]/5 p-3 text-[#2F3E6F]">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2F3E6F] font-heading">Composition</h3>
                  <p className="text-xs text-slate-400 font-sans">Active ingredients concentration profile</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-100 font-sans">
                <table className="w-full text-left text-sm table-fixed">
                  <thead className="bg-[#2F3E6F]/5 text-xs font-bold uppercase tracking-wider text-[#2F3E6F]">
                    <tr>
                      <th className="px-4 sm:px-5 py-3 w-[60%]">Active Ingredient</th>
                      <th className="px-4 sm:px-5 py-3 text-right w-[40%]">Concentration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {parsedComposition.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors duration-200">
                        <td className="px-4 sm:px-5 py-3.5 font-semibold text-slate-800 break-words">{item.ingredient}</td>
                        <td className="px-4 sm:px-5 py-3.5 text-right font-bold text-[#2F3E6F] bg-slate-50/30 break-words">
                          {item.concentration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Indications Card ("Recommended For") */}
            <div className="rounded-[2rem] border border-[#F0F4F8] bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3 border-b border-[#F0F4F8] pb-5 mb-5">
                <div className="rounded-xl bg-[#2F3E6F]/5 p-3 text-[#2F3E6F]">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2F3E6F] font-heading">Recommended For</h3>
                  <p className="text-xs text-slate-400 font-sans">Target parasites, conditions, and infections</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 font-sans">
                {parsedUsage.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl border border-slate-50 bg-[#F5F8FB]/70 px-4.5 py-3.5 transition-colors duration-200 hover:bg-[#F5F8FB]"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8BE56]/20 text-[#b88c1c]">
                      <svg className="h-3.5 w-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-bold text-slate-700 leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosage & Administration Card */}
            <div className="rounded-[2rem] border border-[#F0F4F8] bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3 border-b border-[#F0F4F8] pb-5 mb-5">
                <div className="rounded-xl bg-[#E8BE56]/10 p-3 text-[#b88c1c]">
                  <Gauge className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2F3E6F] font-heading">Dosage & Administration</h3>
                  <p className="text-xs text-slate-400 font-sans">Therapeutic routes and administration volumes</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E8BE56]/20 bg-[#E8BE56]/5 p-5.5 font-sans">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-[#E8BE56] p-1.5 text-white shrink-0">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2F3E6F]">Clinical Guidance Notice</h4>
                    <p className="mt-1 text-sm font-semibold text-slate-700 leading-relaxed">
                      {product.dosage}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Packaging Card */}
            <div className="rounded-[2rem] border border-[#F0F4F8] bg-white p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-md">
              <div className="flex items-center gap-3 border-b border-[#F0F4F8] pb-5 mb-5">
                <div className="rounded-xl bg-[#2F3E6F]/5 p-3 text-[#2F3E6F]">
                  <Boxes className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2F3E6F] font-heading">Packaging</h3>
                  <p className="text-xs text-slate-400 font-sans">Available commercial packaging configurations</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 font-sans">
                {parsedPackaging.map((pack, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-bold text-[#2F3E6F] transition-all duration-200 hover:border-[#2F3E6F]/30 hover:bg-[#2F3E6F]/5"
                  >
                    {pack}
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings Section (Spans full width if present) */}
            {product.warnings && (
              <div className="rounded-[2rem] border border-rose-100 bg-rose-50/40 p-6 sm:p-8 shadow-soft transition-all duration-300 hover:shadow-md col-span-full">
                <div className="flex items-start gap-4 font-sans">
                  <div className="rounded-xl bg-[#ED6E80]/15 p-3 text-[#ED6E80] shrink-0">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2F3E6F]">Contraindications & Clinical Warnings</h3>
                    <p className="mt-1.5 text-sm font-semibold text-slate-600 leading-relaxed">
                      {product.warnings}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="border-t border-slate-200 pt-12 mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ED6E80]">
                Therapeutic Alternatives
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#2F3E6F] font-heading mt-1">
                Related Healthcare Solutions
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

        {/* Enquiry CTA Section */}
        <div className="mt-20 overflow-hidden rounded-[2.5rem] bg-[#2F3E6F] text-white shadow-premium relative">
          {/* Decorative shapes */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#E8BE56]/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#ED6E80]/15 blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

          <div className="relative px-5 py-14 sm:px-12 sm:py-20 text-center max-w-3xl mx-auto z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E8BE56] backdrop-blur-sm border border-white/5 mb-6">
              <MessageCircle className="h-3.5 w-3.5" />
              Direct Support Channels
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-heading">
              Need Product Information?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-2xl mx-auto">
              Contact our veterinary product specialists for dosage guidance, distribution opportunities, and technical support.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                onClick={() => openEnquiry(product.name)}
                className="w-full sm:w-auto bg-[#E8BE56] hover:bg-[#d9b047] text-[#2F3E6F] font-bold px-8 py-6 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Contact Enquiry
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4.5 text-base font-bold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
              >
                <MessageCircle className="h-5 w-5 text-[#E8BE56]" />
                WhatsApp Enquiry
              </a>
            </div>
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
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                {Array.isArray(product.category) ? product.category.join(" & ") : product.category}
              </p>
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

          {/* Zoom controls at bottom */}
          <div className="absolute bottom-6 flex items-center gap-4 bg-slate-900/90 border border-white/10 rounded-full px-6 py-3 text-white shadow-lg backdrop-blur-md">
            <button
              onClick={() => setLightboxScale(prev => Math.max(1, prev - 0.25))}
              disabled={lightboxScale <= 1}
              className="hover:text-[#E8BE56] disabled:opacity-40 transition-colors p-1"
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
              className="hover:text-[#E8BE56] disabled:opacity-40 transition-colors p-1"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <div className="h-4 w-[1px] bg-white/20 mx-1" />
            <button
              onClick={() => setLightboxScale(1)}
              disabled={lightboxScale === 1}
              className="hover:text-[#E8BE56] disabled:opacity-40 transition-colors p-1"
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
