"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useEnquiry } from "@/components/modals/enquiry-provider";

const slides = [
  {
    title: "Veterinary Excellence",
    text: "Science-led animal healthcare products built for veterinarians, distributors, and modern farms.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=82",
  },
  {
    title: "Poultry Health Solutions",
    text: "Performance-focused nutritional and therapeutic support for resilient commercial poultry operations.",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1800&q=82",
  },
  {
    title: "Dairy & Nutrition Care",
    text: "Premium mineral, metabolic, and productivity support for dairy herds and field veterinarians.",
    image:
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1800&q=82",
  },
  {
    title: "Advanced Aqua Products",
    text: "Specialized aqua farm solutions designed for growth, stress recovery, and managed productivity.",
    image:
      "https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?auto=format&fit=crop&w=1800&q=82",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const interval = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      6200,
    );
    return () => window.clearInterval(interval);
  }, []);

  const active = slides[index];

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-ink text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.title}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 7, ease: "linear" }}
          >
            <Image
              src={active.image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/85 to-brand-pink/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <Container className="relative flex min-h-[92vh] items-center pt-20">
        <div className="max-w-3xl">
          <motion.p
            key={`${active.title}-eyebrow`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-5 text-sm uppercase tracking-[0.24em] text-cyanline"
          >
            Stanmax Laboratories Private Limited
          </motion.p>
          <motion.h1
            key={active.title}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="text-5xl tracking-tight sm:text-6xl lg:text-7xl"
          >
            {active.title}
          </motion.h1>
          <motion.p
            key={active.text}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/78"
          >
            {active.text}
          </motion.p>
          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.24 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row w-full sm:w-auto"
          >
            <Button variant="secondary" href="/products" className="w-full sm:w-auto">Explore Products</Button>
            <Button variant="white" onClick={() => openEnquiry()} className="w-full sm:w-auto">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Show ${slide.title}`}
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 rounded-full transition-all ${
              slideIndex === index ? "w-10 bg-cyanline" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
