"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Product, products } from "@/lib/products";
import { useEnquiry } from "@/components/modals/enquiry-provider";
import { WHATSAPP_URL } from "@/lib/constants";

export function ProductDetailClient({ product }: { product: Product }) {
  const { openEnquiry } = useEnquiry();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <section className="bg-mist pb-20 pt-32">
      <Container>
        <div className="mb-8 text-sm font-semibold text-slate-500">
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

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white shadow-premium">
              <Image src={product.image} alt={product.name} fill priority className="object-cover" sizes="60vw" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[product.image, ...related.map((item) => item.image)].slice(0, 3).map((image, index) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-soft">
                  <Image src={image} alt={`${product.name} gallery ${index + 1}`} fill className="object-cover" sizes="20vw" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slateblue/70">{product.category}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{product.name}</h1>
            {product.price ? (
              <p className="mt-4 text-3xl font-semibold text-slateblue">
                Rs. {product.price.toLocaleString("en-IN")}
              </p>
            ) : null}
            <p className="mt-6 text-base leading-8 text-slate-600">{product.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => openEnquiry(product.name)}>Contact Enquiry</Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slateblue transition hover:bg-medical"
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
              {product.warnings ? <Detail title="Warnings" text={product.warnings} /> : null}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Benefits</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {product.benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-2xl bg-mist p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-slateblue" />
                <p className="text-sm font-semibold leading-6 text-ink">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
