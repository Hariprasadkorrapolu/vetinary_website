"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useEnquiry } from "@/components/modals/enquiry-provider";
import { WHATSAPP_URL } from "@/lib/constants";

export function HomeCta() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative overflow-hidden bg-slateblue py-20 text-white">
      <Image
        src="https://images.unsplash.com/photo-1581093458791-9d42e67ef09d?auto=format&fit=crop&w=1800&q=82"
        alt=""
        fill
        className="object-cover opacity-20"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/92 to-brand-pink/35" />
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_auto]">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-cyanline">
              Partner with Stanmax
            </p>
            <h2 className="max-w-3xl text-3xl tracking-tight sm:text-5xl">
              Looking for Veterinary Product Solutions?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
              Connect with our sales and technical team for product
              recommendations, distribution discussions, and category-level
              portfolio support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
            <Button variant="secondary" onClick={() => openEnquiry()} className="w-full sm:w-auto">
              Contact Enquiry
            </Button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/18 w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
