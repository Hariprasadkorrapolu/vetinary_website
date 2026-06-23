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
    image: "/veterinary-excellence.png",
  },
  {
    title: "Poultry Health Solutions",
    text: "Performance-focused nutritional and therapeutic support for resilient commercial poultry operations.",
    image: "/poultry-health.png",
  },
  {
    title: "Dairy & Nutrition Care",
    text: "Premium mineral, metabolic, and productivity support for dairy herds and field veterinarians.",
    image: "/dairy-care.png",
  },
  {
    title: "Advanced Aqua Products",
    text: "Specialized aqua farm solutions designed for growth, stress recovery, and managed productivity.",
    image: "/aqua-products.png",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          style={{ willChange: "opacity" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: isMobile ? 1 : 1.08 }}
            transition={{ duration: 7, ease: "linear" }}
            style={{ willChange: isMobile ? "auto" : "transform" }}
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
