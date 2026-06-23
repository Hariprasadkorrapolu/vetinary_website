"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Award,
  ShieldCheck,
  TrendingUp,
  Factory,
  Globe,
  Users,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Target,
  Stethoscope,
  Bird,
  Heart,
  Activity,
  Sparkles,
  Network,
  Layers,
  ArrowUpRight,
  Check,
  Building,
  GraduationCap,
  X,
  Calendar,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useEnquiry } from "@/components/modals/enquiry-provider";

// Helper component for animated numbers
function Counter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      if (window.innerWidth < 768) {
        setCount(value);
        return;
      }
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.min(Math.ceil(totalMiliseconds / end), 50);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={elementRef}>{count}</span>;
}

export function AboutClient() {
  const { openEnquiry } = useEnquiry();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Timeline State - auto-traverses every 3 seconds
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeInfographicStep, setActiveInfographicStep] = useState(0);

  // Timeline events
  const timelineEvents = [
    {
      year: "1996",
      title: "Company Founded in Hyderabad",
      desc: "Stanmax Laboratories founded in Hyderabad, establishing core foundations in quality veterinary care.",
      icon: Building,
      image:
        "https://images.unsplash.com/photo-1513828722001-c24074862e40?auto=format&fit=crop&w=600&q=80",
    },
    {
      year: "2005",
      title: "Veterinary Market Expansion",
      desc: "Expanding product range and establishing a robust presence across major states in India.",
      icon: TrendingUp,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    },
    {
      year: "2015",
      title: "Institutional & Government Supply Leadership",
      desc: "Securing key government, semi-government, and veterinary cooperative procurement approvals.",
      icon: Users,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
    },
    {
      year: "2024",
      title: "New WHO-GMP Manufacturing Expansion",
      desc: "Inaugurating state-of-the-art facility aligned with modern WHO-GMP benchmarks.",
      icon: Factory,
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    },
    {
      year: "2028",
      title: "₹500 Million Revenue Growth Vision",
      desc: "Aiming to touch the landmark milestone of ₹500 Million through strategic market penetration.",
      icon: Target,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Auto-playing loop every 3 seconds (pauses when hovered)
  useEffect(() => {
    if (isHovered) return;
    if (isMobile) return;
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % timelineEvents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, isMobile]);

  // Manufacturing infographic steps
  const manufacturingSteps = [
    {
      title: "WHO-GMP Formulations",
      desc: "Advanced process design with automated dosing and mixing controls to ensure uniformity.",
      icon: Factory,
    },
    {
      title: "Advanced Quality Lab",
      desc: "In-house physical, chemical, and microbiological checks at every stage of production.",
      icon: ShieldCheck,
    },
    {
      title: "Safety & Consistency",
      desc: "Classified HVAC systems and modular cleanroom panels maintaining precise environment controls.",
      icon: CheckCircle2,
    },
    {
      title: "Global Compliance",
      desc: "Adherence to international standards, positioning products for emerging global markets.",
      icon: Globe,
    },
  ];

  // Infographic timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveInfographicStep(
        (prev) => (prev + 1) % manufacturingSteps.length,
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Compute progress percentage from 1996 (idx 0) to 2028 (idx 4)
  const progressPercentage =
    (activeTimeline / (timelineEvents.length - 1)) * 100;

  return (
    <div className="relative overflow-hidden bg-white text-ink">
      {/* --------------------------------------------------
      SECTION 1: HERO SECTION
      -------------------------------------------------- */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-ink via-[#0d1c2e] to-[#1e344f] pt-36 text-white flex flex-col justify-center">
        {/* Abstract Background Design with Parallax Zoom */}
        <motion.div
          animate={isMobile ? { scale: 1.02 } : { scale: [1.02, 1.07, 1.02] }}
          transition={isMobile ? { duration: 0.1 } : { duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0 opacity-25"
        >
          <Image
            src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1800&q=82"
            alt="Pharmaceutical manufacturing background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Animated Gradient Overlays and Floating Orbs */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-yellow/15 via-transparent to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/65 to-transparent" />
        <div className="absolute -left-20 top-20 h-[350px] w-[350px] rounded-full bg-brand-blue/30 blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute right-10 bottom-10 h-[300px] w-[300px] rounded-full bg-brand-pink/15 blur-[120px] pointer-events-none" />

        {/* Content Container */}
        <Container className="relative z-10 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            {/* Left Hero Text - Animated Reveal Upward */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-brand-yellow border border-white/10 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-brand-yellow" />
                <span>Established 1996</span>
              </div>

              <h1 className="text-4xl tracking-tight sm:text-5xl lg:text-6xl font-bold font-heading leading-[1.12]">
                29+ Years of Trusted <br />
                <span className="bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-yellow bg-clip-text text-transparent">
                  Animal Healthcare
                </span>{" "}
                <br />
                Excellence
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                GMP & ISO 9001:2015 Certified Veterinary Healthcare Leader
                Serving India's Veterinary, Livestock, and Poultry Industry.
              </p>

              {/* Action Buttons - Lift and Cast Shadow */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  variant="secondary"
                  href="/products"
                  className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-premium hover:scale-[1.03]"
                >
                  Explore Products
                </Button>
                <Button
                  variant="white"
                  onClick={() => openEnquiry()}
                  className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-premium hover:scale-[1.03]"
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>

            {/* Right Hero Stats Panel - Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-premium backdrop-blur-md"
            >
              <h2 className="mb-6 text-sm uppercase tracking-widest text-brand-yellow text-left">
                Corporate Quick Facts
              </h2>

              <div className="divide-y divide-white/10">
                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-brand-yellow">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">
                      Industry Standing
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-white">
                    29+ Years
                  </span>
                </div>

                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-brand-yellow">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">
                      Quality Accreditation
                    </span>
                  </div>
                  <span className="text-xs bg-brand-yellow/10 px-3 py-1 rounded-full text-brand-yellow border border-brand-yellow/20 font-medium">
                    GMP Certified
                  </span>
                </div>

                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-brand-yellow">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">
                      Operations Standard
                    </span>
                  </div>
                  <span className="text-xs bg-brand-pink/10 px-3 py-1 rounded-full text-brand-pink border border-brand-pink/20 font-medium">
                    ISO 9001:2015
                  </span>
                </div>

                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-brand-yellow">
                      <Globe className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">Corporate HQ</span>
                  </div>
                  <span className="text-sm font-semibold text-white text-right">
                    Hyderabad, India
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Curved Dividers */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />
      </section>

      {/* --------------------------------------------------
      SECTION 2: COMPANY STORY & TIMELINE (AUTO-TRAVERSING ROADMAP)
      -------------------------------------------------- */}
      <section className="relative bg-white py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column: Story & Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-left"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-brand-pink font-semibold">
                  Company Roots
                </span>
                <h2 className="text-3xl tracking-tight text-ink sm:text-4xl font-bold font-heading">
                  Our Foundation & Story
                </h2>
              </div>

              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                STANMAX LABORATORIES PVT LTD is a GMP and ISO 9001:2015
                certified animal healthcare company established in 1996.
              </p>

              <p className="text-base leading-relaxed text-slate-600">
                We develop, manufacture, and market high-quality veterinary
                healthcare solutions that improve animal health, productivity,
                and farm profitability across India. Our strategic operations
                are engineered to integrate modern biosecurity protocols with
                robust raw material selection, setting benchmarks in veterinary
                formulation science.
              </p>

              {/* Redesigned Premium Interactive Timeline */}
              <div
                className="pt-8 relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <h3 className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-4">
                  Our Corporate Journey
                </h3>

                {/* 1. Desktop Horizontal Timeline */}
                <div className="hidden sm:block relative pb-12 pt-6 px-4">
                  {/* Underlay Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full" />

                  {/* Dynamic yellow progress line starts from 1996 (idx 0) to 2028 (idx 4) */}
                  <motion.div
                    className="absolute top-1/2 left-4 h-1 bg-brand-yellow -translate-y-1/2 z-10 rounded-full shadow-[0_0_8px_#E8BE56]"
                    style={{ width: `calc(${progressPercentage}% - 8px)` }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  />

                  {/* Nodes */}
                  <div className="flex items-center justify-between relative z-20">
                    {timelineEvents.map((event, idx) => {
                      const isActive = activeTimeline === idx;

                      return (
                        <div
                          key={event.year}
                          className="relative flex flex-col items-center cursor-pointer"
                          onMouseEnter={() => setActiveTimeline(idx)}
                          onClick={() => setActiveTimeline(idx)}
                        >
                          {/* Year Circle Node */}
                          <motion.div
                            animate={
                              (isActive && !isMobile) ? { scale: [1, 1.15, 1] } : { scale: 1 }
                            }
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={`h-14 w-14 rounded-full border-4 flex items-center justify-center text-xs font-bold transition-all duration-300 relative cursor-pointer ${
                              isActive
                                ? "bg-brand-yellow border-brand-blue text-brand-blue shadow-[0_0_20px_rgba(232,190,86,0.6)] scale-110"
                                : "bg-white border-slate-200 text-slate-400 hover:border-brand-yellow/60 hover:text-brand-yellow"
                            }`}
                          >
                            <span>{event.year}</span>

                            {/* Glowing Active Particle ring (Spark) */}
                            {isActive && !isMobile && (
                              <span className="absolute -inset-2 rounded-full border border-brand-yellow/30 animate-ping" />
                            )}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Mobile Vertical Timeline Roadmap */}
                <div className="flex flex-col gap-6 sm:hidden relative pl-4 pt-4">
                  <div className="absolute left-6 top-4 bottom-4 w-1 bg-slate-100 rounded-full" />

                  {/* Vertical traveling progress line */}
                  <motion.div
                    className="absolute left-[22px] top-4 w-1 bg-brand-yellow rounded-full shadow-[0_0_8px_#E8BE56]"
                    style={{ height: `${progressPercentage}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  />

                  {timelineEvents.map((event, idx) => {
                    const isActive = activeTimeline === idx;
                    return (
                      <div
                        key={event.year}
                        onMouseEnter={() => setActiveTimeline(idx)}
                        onClick={() => setActiveTimeline(idx)}
                        className={`flex gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-brand-blue/5 border-brand-yellow shadow-soft translate-x-1"
                            : "bg-white border-slate-100 hover:border-brand-blue/20"
                        }`}
                      >
                        <div
                          className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-xs font-bold transition-all relative ${
                            isActive
                              ? "bg-brand-yellow text-brand-blue shadow-[0_0_15px_rgba(232,190,86,0.5)]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {event.year}
                          {isActive && !isMobile && (
                            <span className="absolute -inset-1.5 rounded-full border border-brand-yellow/30 animate-ping" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <h4
                            className={`text-sm font-semibold transition-colors ${isActive ? "text-brand-blue" : "text-slate-700"}`}
                          >
                            {event.title}
                          </h4>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-1.5 text-xs text-slate-500 leading-relaxed"
                            >
                              {event.desc}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3. Active Milestone Display Card (Desktop Only) */}
                <div className="hidden sm:block">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTimeline}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-3xl border border-medical bg-mist p-8 shadow-soft text-left hover:shadow-premium transition-all duration-300 relative"
                    >
                      <h4 className="text-xl font-bold text-brand-blue flex items-center gap-3">
                        <span className="bg-brand-yellow text-brand-blue px-3.5 py-1 rounded-full text-xs font-bold">
                          {timelineEvents[activeTimeline].year}
                        </span>
                        {timelineEvents[activeTimeline].title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 font-normal">
                        {timelineEvents[activeTimeline].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Layered Image Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 lg:p-10"
            >
              <div className="absolute -left-4 -top-4 right-12 bottom-12 rounded-[2.5rem] border-2 border-brand-yellow/30 pointer-events-none" />

              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-premium bg-slate-100 w-full group">
                <Image
                  src="/our-story.jpg"
                  alt="Stanmax Foundation & Story"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-90" />

                {/* Floating Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 backdrop-blur-sm shadow-soft border border-slate-100 text-left">
                  <p className="text-xs uppercase tracking-wider text-brand-pink font-semibold">
                    Operations Hub
                  </p>
                  <p className="mt-1 text-sm text-ink leading-snug">
                    Our advanced production setup ensures delivery of
                    high-confidence therapeutics across the country.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 3: PREMIUM METRICS (STATS) SECTION
      -------------------------------------------------- */}
      <section className="bg-gradient-to-br from-brand-blue to-[#1e2e5c] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-pink/10 via-transparent to-transparent pointer-events-none" />
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Years Experience",
                value: 29,
                suffix: "+",
                desc: "Trusted quality since 1996",
              },
              {
                label: "Distribution Partners",
                value: 500,
                suffix: "+",
                desc: "Nationwide supply network",
              },
              {
                label: "Veterinary Products",
                value: 100,
                suffix: "+",
                desc: "GMP & ISO certified list",
              },
              {
                label: "Customers Served",
                value: 50,
                suffix: "K+",
                desc: "Livestock & poultry farms",
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-soft hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-3"
              >
                <div className="absolute top-0 right-0 h-16 w-16 rounded-full bg-brand-yellow/5 blur-xl group-hover:bg-brand-yellow/10 transition-colors" />
                <h3 className="text-4xl sm:text-5xl font-bold font-heading text-brand-yellow">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </h3>
                <h4 className="mt-4 text-base font-semibold text-white">
                  {stat.label}
                </h4>
                <p className="mt-2 text-xs text-slate-300">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 4: VISION & VALUES (STRATEGIC PILLARS)
      -------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c1322] to-[#172237] py-28 text-white">
        {/* Glow Effects */}
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-brand-blue/25 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-brand-pink/10 blur-[140px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue/30 px-4 py-1.5 text-xs uppercase tracking-widest text-brand-yellow border border-brand-blue/50">
                <Target className="h-4 w-4 text-brand-yellow animate-pulse" />
                <span>Our Strategic Direction</span>
              </div>
              <h2 className="text-4xl tracking-tight sm:text-5xl leading-tight text-white font-bold font-heading">
                Our Vision
              </h2>
              <blockquote className="relative border-l-4 border-brand-pink pl-6 py-2">
                <p className="text-2xl sm:text-3xl italic tracking-tight text-slate-100 leading-normal">
                  “Rise Together — Healthier Animals, <br /> Stronger Business.”
                </p>
              </blockquote>
              <p className="text-base leading-relaxed text-slate-300">
                We believe animal productivity and healthcare standards are key
                to industrial growth. By manufacturing stable,
                high-bioavailability veterinary and poultry therapeutics, we
                secure the operations of our farmer partners, veterinary
                practitioners, and institutional distributors.
              </p>
            </motion.div>

            {/* Right Pillars Column - Redesigned Interactive Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  num: "01",
                  title: "Ethical Practice",
                  desc: "Ensuring 100% trace-monitored, GMP-compliant therapeutics for veterinary practitioners.",
                  badge: "High Safety",
                  borderColor: "hover:border-brand-pink/50",
                  numColor: "text-brand-pink",
                },
                {
                  num: "02",
                  title: "Partner Success",
                  desc: "Securing stable supply chains, volume consistency, and commercial strength for distributors.",
                  badge: "Partner Success",
                  borderColor: "hover:border-brand-yellow/50",
                  numColor: "text-brand-yellow",
                },
              ].map((value, idx) => (
                <div
                  key={value.title}
                  className={`group relative rounded-3xl border border-white/5 bg-white/5 p-5 sm:p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-3 ${value.borderColor}`}
                >
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-blue/5 blur-2xl group-hover:bg-brand-blue/10 transition-colors" />
                  <div className="flex items-start gap-6">
                    <span
                      className={`text-3xl font-bold font-heading shrink-0 ${value.numColor}`}
                    >
                      {value.num}
                    </span>
                    <div className="space-y-2 text-left">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-xl text-white font-semibold">
                          {value.title}
                        </h4>
                        <span className="text-[10px] uppercase tracking-wider text-white bg-white/10 px-2 py-0.5 rounded border border-white/10 shrink-0">
                          {value.badge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 5: CORE VALUES SECTION
      -------------------------------------------------- */}
      <section className="bg-white py-24 relative overflow-hidden">
        <Container>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-pink font-semibold">
              Corporate Beliefs
            </span>
            <h2 className="text-3xl tracking-tight text-ink sm:text-4xl font-bold font-heading">
              Our Core Values
            </h2>
            <p className="text-sm text-slate-500">
              Four premium pillars guiding our operations, decisions, and
              industry commitments
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Quality Excellence",
                desc: "Uncompromising quality checks in our certified production lines.",
                icon: Award,
                gradient:
                  "group-hover:from-brand-blue/10 group-hover:to-transparent",
              },
              {
                title: "Constant Innovation",
                desc: "Developing next-generation bioavailability formulations for optimal health.",
                icon: Sparkles,
                gradient:
                  "group-hover:from-brand-yellow/10 group-hover:to-transparent",
              },
              {
                title: "Animal Welfare",
                desc: "Designing therapeutic products that prioritize livestock and poultry wellness.",
                icon: Heart,
                gradient:
                  "group-hover:from-brand-pink/10 group-hover:to-transparent",
              },
              {
                title: "Corporate Trust",
                desc: "Cultivating secure, long-term partnerships with distributors and milk unions.",
                icon: ShieldCheck,
                gradient:
                  "group-hover:from-brand-blue/10 group-hover:to-transparent",
              },
            ].map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl border border-medical bg-white p-4 sm:p-7 shadow-soft transition-all duration-500 hover:-translate-y-3 hover:shadow-premium group relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent transition-all duration-500 ${value.gradient}`}
                />
                <div className="relative z-10">
                  <div className="rounded-2xl bg-brand-blue/5 p-3.5 w-12 h-12 flex items-center justify-center text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:scale-115">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-ink text-left">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500 text-left">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 6: MANUFACTURING EXCELLENCE
      -------------------------------------------------- */}
      <section className="bg-mist py-24 relative overflow-hidden">
        {/* Animated Background Molecular Particles */}
        {!isMobile && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-5">
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-12 w-8 h-8 rounded-full border-2 border-brand-blue"
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-48 right-24 w-12 h-12 rounded-full border-2 border-brand-pink"
            />
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-32 left-1/3 w-6 h-6 rounded-full border border-brand-yellow"
            />
          </div>
        )}

        <Container className="relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-pink font-semibold">
              Advanced Infrastructure
            </span>
            <h2 className="text-3xl tracking-tight text-ink sm:text-4xl font-bold font-heading">
              Manufacturing Excellence
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Engineered for Safety, Consistency, and Global Compliance
            </p>
          </div>

          <div className="grid gap-6 mt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* 4 Premium Cards Grid with Independent Floating Animations */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "State-of-the-Art Equipment",
                  desc: "Advanced machinery and process controls aligned with WHO-GMP benchmarks.",
                  icon: Factory,
                  floatRange: [0, -8, 0],
                  duration: 5,
                  delay: 0,
                },
                {
                  title: "Advanced Quality Management",
                  desc: "Streamlined operations ensuring the highest levels of product safety and consistency.",
                  icon: ShieldCheck,
                  floatRange: [0, 8, 0],
                  duration: 5.5,
                  delay: 0.5,
                },
                {
                  title: "Strategic Capacity Expansion",
                  desc: "Strengthens manufacturing capabilities and operational efficiency.",
                  icon: Activity,
                  floatRange: [0, -6, 0],
                  duration: 6,
                  delay: 0.2,
                },
                {
                  title: "Export-Ready Compliance",
                  desc: "Positions STANMAX for domestic growth and international export opportunities.",
                  icon: Globe,
                  floatRange: [0, 6, 0],
                  duration: 6.5,
                  delay: 0.7,
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  animate={isMobile ? { y: 0 } : { y: card.floatRange }}
                  transition={isMobile ? {} : {
                    repeat: Infinity,
                    duration: card.duration,
                    ease: "easeInOut",
                    delay: card.delay,
                  }}
                  className="rounded-[1.5rem] sm:rounded-[1.75rem] border border-slate-100 bg-white p-4 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-premium group text-left hover:-translate-y-3 cursor-pointer"
                >
                  <div className="rounded-2xl bg-brand-blue/10 p-3 w-12 h-12 flex items-center justify-center text-brand-pink transition-all duration-300 group-hover:bg-brand-yellow group-hover:text-white group-hover:scale-115">
                    <card.icon className="h-5 w-5 group-hover:animate-pulse" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Interactive Infographic Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-medical bg-white p-8 shadow-premium space-y-6 text-left"
            >
              <div>
                <h3 className="text-lg font-bold text-ink">
                  Manufacturing Infographic Flow
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How we maintain the highest compliance standards from raw
                  materials to final packaging.
                </p>
              </div>

              {/* Steps Layout */}
              <div className="relative space-y-4">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100" />

                {manufacturingSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeInfographicStep === idx;
                  return (
                    <div
                      key={step.title}
                      onClick={() => setActiveInfographicStep(idx)}
                      className={`relative flex gap-4 p-3.5 rounded-2xl transition-all cursor-pointer ${
                        isActive
                          ? "bg-brand-blue/5 border border-brand-blue/10 shadow-soft"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`relative z-10 h-10 w-10 shrink-0 rounded-full flex items-center justify-center border-2 transition-all ${
                          isActive
                            ? "bg-brand-yellow border-brand-blue text-brand-blue scale-110 shadow-soft"
                            : "bg-white border-slate-200 text-slate-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`text-sm font-semibold transition-colors ${isActive ? "text-brand-blue" : "text-ink"}`}
                        >
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-normal">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 6.5: LEADERSHIP & VISION
      -------------------------------------------------- */}
      <section className="bg-mist py-24 relative overflow-hidden border-t border-b border-slate-100">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-yellow/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -right-20 top-20 h-[300px] w-[300px] rounded-full bg-brand-pink/5 blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2F3E6F] font-semibold">
              Corporate Governance
            </span>
            <h2 className="text-3xl tracking-tight text-ink sm:text-4xl font-bold font-heading">
              Leadership & Vision
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Guiding STANMAX with experience, innovation, and an unwavering commitment to animal healthcare excellence.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* Left Side: Photo Frame */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative group max-w-sm w-full">
                {/* Decorative border offset */}
                <div className="absolute -left-4 -top-4 right-4 bottom-4 rounded-[2.5rem] border-2 border-brand-yellow/40 pointer-events-none transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
                
                {/* Photo container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] shadow-premium bg-slate-100 border border-slate-200">
                  <Image
                    src="/managing-director.jpg"
                    alt="Ghanukota Sravan Kumar"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Right Side: Profile & Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-left"
            >
              {/* Profile Header */}
              <div>
                <h3 className="text-2xl font-bold text-ink">Ghanukota Sravan Kumar</h3>
                <p className="text-brand-pink font-semibold text-sm tracking-wider uppercase mt-1">
                  Managing Director
                </p>
                <span className="inline-block bg-brand-blue/5 border border-brand-blue/10 rounded-full px-3.5 py-1 text-xs text-brand-blue font-medium mt-2.5">
                  First-Generation Entrepreneur
                </span>
              </div>

              {/* MD Message & Biography */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Ghanukota Sravan Kumar is a first-generation entrepreneur and Managing Director with over 35 years of experience in the poultry and veterinary healthcare industry. A B.Sc. Poultry Science graduate from Kakatiya University, he has built his career on technical expertise in poultry health management, disease prevention, and solving grassroots farmer challenges.
                </p>
                <p>
                  With 19 years of leadership experience, he is widely recognized for combining scientific knowledge with practical, farmer-centric solutions that improve animal health and farmer livelihoods. His leadership is driven by resilience, ethical values, innovation, and a strong commitment to quality and sustainable growth.
                </p>
                <p>
                  Mr. Kumar has actively participated in national and international industry expos to adopt global best practices and strengthen the veterinary and poultry healthcare sector. His professional journey reflects adaptability, visionary leadership, and a lifelong dedication to advancing poultry healthcare while supporting farming communities across India through impactful and sustainable solutions.
                </p>
              </div>

              {/* Achievement Highlights Badges Grid */}
              <div>
                <h4 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-4">
                  Leadership Accolades
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { text: "B.Sc. Poultry Science (Kakatiya University)", icon: "🎓" },
                    { text: "35+ Years Industry Experience", icon: "🐔" },
                    { text: "19+ Years Leadership Experience", icon: "👨‍💼" },
                    { text: "International Industry Exposure", icon: "🌍" },
                    { text: "Innovation-Driven Leadership", icon: "💡" },
                    { text: "Farmer-Centric Approach", icon: "🤝" },
                  ].map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 rounded-2xl border border-medical bg-white p-3.5 shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span className="text-xl shrink-0 w-8 h-8 rounded-xl bg-brand-blue/5 flex items-center justify-center">
                        {badge.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                        {badge.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership Quote Card */}
              <div className="relative rounded-3xl border border-brand-yellow/30 bg-gradient-to-br from-brand-yellow/5 to-transparent p-6 sm:p-8 text-left overflow-hidden">
                {/* Big decorative quotes sign in background */}
                <span className="absolute right-6 top-2 text-7xl font-serif text-brand-yellow/20 pointer-events-none select-none">
                  “
                </span>
                <blockquote className="relative space-y-4">
                  <p className="text-lg sm:text-xl font-heading font-bold text-brand-blue leading-snug italic">
                    "Rise Together — Healthier Animals, Stronger Business."
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                    <cite className="not-italic text-xs sm:text-sm text-slate-500 font-medium">
                      <span className="font-bold text-ink">Ghanukota Sravan Kumar</span>, Managing Director
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 7: IMPORT OPERATIONS (GLOBAL NETWORK)
      -------------------------------------------------- */}
      <section className="bg-white py-24 relative overflow-hidden">
        {/* Animated Network connection lines background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
            <path
              d="M100 200 Q250 100 450 250 T800 150"
              stroke="#2F3E6F"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <path
              d="M150 450 Q300 350 600 400 T900 300"
              stroke="#ED6E80"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            <motion.circle
              r="4"
              fill="#E8BE56"
              animate={{
                pathLength: [0, 1],
                offsetDistance: ["0%", "100%"],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                motionPath: "path('M100 200 Q250 100 450 250 T800 150')",
              }}
            />
            <motion.circle
              r="3"
              fill="#ED6E80"
              animate={{
                pathLength: [0, 1],
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 7.5,
                repeat: Infinity,
                ease: "linear",
                delay: 2,
              }}
              style={{
                motionPath: "path('M150 450 Q300 350 600 400 T900 300')",
              }}
            />
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            {/* Left Column: Context Introduction */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-left"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#2F3E6F] font-semibold">
                  Global Sourcing Network
                </span>
                <h2 className="text-3xl tracking-tight text-ink sm:text-4xl font-bold font-heading">
                  Import Operations
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                Enhancing Poultry and Livestock Performance Through Premium
                Global Procurement
              </p>
              <p className="text-sm leading-relaxed text-slate-500 font-normal">
                To guarantee maximum batch reliability and safety, we import
                essential active ingredients directly from world-class
                manufacturing partners. Our global sourcing pipeline is strictly
                verified, setting industry-leading benchmarks in ingredient
                purity.
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <Globe className="h-4 w-4 text-[#2F3E6F]" />
                  Global Partners
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#2F3E6F]" />
                  100% Quality Inspected
                </div>
              </div>
            </motion.div>

            {/* Right Sourcing Cards with Independent Floating Motions */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Card 1: Essential Amino Acids */}
              <motion.div
                animate={isMobile ? { y: 0 } : { y: [0, -10, 0] }}
                transition={isMobile ? {} : {
                  repeat: Infinity,
                  duration: 4.8,
                  ease: "easeInOut",
                }}
                className="rounded-3xl border border-medical bg-white p-6 shadow-premium hover:shadow-premium transition-all duration-300 relative overflow-hidden group hover:-translate-y-3 cursor-pointer"
              >
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-brand-blue/5 blur-xl group-hover:bg-brand-blue/10 transition-colors" />
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue" />

                <div className="rounded-2xl bg-brand-blue/10 p-3 w-11 h-11 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-115 transition-transform duration-300">
                  <Layers className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-bold text-ink text-left">
                  Essential Amino Acids
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-normal text-left">
                  High-purity raw inputs sourced globally to balance poultry
                  nutrition profiles.
                </p>

                <ul className="mt-5 space-y-2.5 text-left">
                  {["D-L Methionine", "L-Lysine", "Threonine", "Arginine"].map(
                    (item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </motion.div>

              {/* Card 2: Antibiotic Premixes */}
              <motion.div
                animate={isMobile ? { y: 0 } : { y: [0, 10, 0] }}
                transition={isMobile ? {} : {
                  repeat: Infinity,
                  duration: 5.6,
                  ease: "easeInOut",
                }}
                className="rounded-3xl border border-medical bg-white p-6 shadow-premium hover:shadow-premium transition-all duration-300 relative overflow-hidden group hover:-translate-y-3 cursor-pointer"
              >
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-brand-blue/5 blur-xl group-hover:bg-brand-blue/10 transition-colors" />
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue" />

                <div className="rounded-2xl bg-brand-blue/10 p-3 w-11 h-11 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-115 transition-transform duration-300">
                  <Globe className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-bold text-ink text-left">
                  Antibiotic Premixes
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-normal text-left">
                  Regulated formulations designed to secure livestock health
                  outcomes.
                </p>

                <ul className="mt-5 space-y-2.5 text-left">
                  {[
                    "Chlortetracycline 15%",
                    "Specialized Nutritional Inputs",
                    "Feed Grade Additives",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 8: MARKET STANDING
      -------------------------------------------------- */}
      <section className="bg-mist py-24 relative overflow-hidden">
        <Container>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2F3E6F] font-semibold">
              Enterprise Scale
            </span>
            <h2 className="text-3xl tracking-tight text-ink sm:text-4xl font-bold font-heading">
              Trusted Across India's Veterinary & Poultry Industry
            </h2>
          </div>

          {/* Two Side-by-Side Sector Cards */}
          <div className="grid gap-8 mt-12 lg:grid-cols-2">
            {/* Veterinary Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-medical bg-white p-8 shadow-premium relative overflow-hidden group hover:shadow-soft hover:-translate-y-3 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#2F3E6F]/5 blur-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue" />

              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-2xl bg-[#2F3E6F]/10 p-3.5 text-[#2F3E6F]">
                  <Stethoscope className="h-6 w-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-ink">
                    Veterinary Sector
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Approved Institutional Supplier
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed text-left">
                We maintain active corporate approvals, acting as a direct
                supplier of high-quality formulations to key public bodies:
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "State Governments",
                  "Semi-Government Bodies",
                  "Cooperative Societies",
                  "Veterinary Dairy Unions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100/50 p-3 text-xs text-slate-700 hover:border-[#2F3E6F]/20 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#2F3E6F] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Poultry Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-[2rem] border border-medical bg-white p-8 shadow-premium relative overflow-hidden group hover:shadow-soft hover:-translate-y-3 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#2F3E6F]/5 blur-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue" />

              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-2xl bg-[#2F3E6F]/10 p-3.5 text-[#2F3E6F]">
                  <Bird className="h-6 w-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-ink">Poultry Sector</h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Trusted by Leading Poultry Groups
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4 text-left">
                Recognized and preferred by major integrators, hatcheries, and
                technical experts across India:
              </p>

              <div className="flex flex-wrap gap-2 mb-4 text-left">
                {[
                  "Venky's",
                  "IB Group",
                  "Baramati",
                  "Nanda",
                  "Komarla",
                  "Anand",
                ].map((client) => (
                  <span
                    key={client}
                    className="rounded-full bg-slate-50 border border-slate-100 px-3.5 py-1.5 text-xs text-slate-700 hover:border-[#2F3E6F]/20 hover:bg-slate-100 transition-colors font-medium"
                  >
                    {client}
                  </span>
                ))}
              </div>

              <div className="grid gap-2 grid-cols-3 pt-3.5 border-t border-slate-100">
                {["Leading Integrators", "Hatcheries", "Nutritionists"].map(
                  (item) => (
                    <p
                      key={item}
                      className="text-[10px] text-slate-400 uppercase tracking-wider text-center font-semibold"
                    >
                      {item}
                    </p>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 9: FINANCIAL GROWTH
      -------------------------------------------------- */}
      <section className="bg-white py-24 relative overflow-hidden">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            {/* Left Content */}
            <div className="space-y-6 text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-pink font-semibold">
                Investor Outlook
              </span>
              <h2 className="text-3xl tracking-tight text-ink sm:text-4xl font-bold font-heading">
                Growth Journey
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Stanmax has demonstrated resilient financial performance and is
                on track for a significant capacity and revenue ramp-up.
              </p>

              {/* Data Blocks */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-sm text-slate-500 font-medium">
                    FY 2024-25 Revenue
                  </span>
                  <span className="text-lg font-semibold text-ink">
                    ₹150 Million
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-sm text-slate-500 font-medium">
                    FY 2025-26 Estimate
                  </span>
                  <span className="text-lg font-semibold text-ink">
                    ₹200 Million
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-sm text-slate-500 font-medium">
                    FY 2028 Target
                  </span>
                  <span className="text-lg font-bold text-emerald-600">
                    ₹500 Million Target
                  </span>
                </div>
              </div>
            </div>

            {/* Right Chart Visualization */}
            <div className="rounded-3xl border border-medical bg-white p-8 shadow-premium">
              <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-6 font-semibold text-left">
                Revenue Trajectory (INR Millions)
              </h3>

              {/* SVG Animated Chart */}
              <div className="relative h-64 w-full">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Grid Lines */}
                  <line
                    x1="40"
                    y1="180"
                    x2="380"
                    y2="180"
                    stroke="#f1f5f9"
                    strokeWidth="2"
                  />
                  <line
                    x1="40"
                    y1="120"
                    x2="380"
                    y2="120"
                    stroke="#f1f5f9"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <line
                    x1="40"
                    y1="60"
                    x2="380"
                    y2="60"
                    stroke="#f1f5f9"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />

                  {/* Axis labels */}
                  <text
                    x="35"
                    y="184"
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-semibold"
                  >
                    0
                  </text>
                  <text
                    x="35"
                    y="124"
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-semibold"
                  >
                    250
                  </text>
                  <text
                    x="35"
                    y="64"
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-semibold"
                  >
                    500
                  </text>

                  {/* X axis labels */}
                  <text
                    x="80"
                    y="196"
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-semibold"
                  >
                    FY 24-25
                  </text>
                  <text
                    x="210"
                    y="196"
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-semibold"
                  >
                    FY 25-26
                  </text>
                  <text
                    x="340"
                    y="196"
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-semibold"
                  >
                    FY 28 (T)
                  </text>

                  {/* Gradient Area */}
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>

                  {/* Gradient Shape */}
                  <path
                    d="M 80 180 L 80 144 L 210 132 L 340 60 L 340 180 Z"
                    fill="url(#chartGlow)"
                  />

                  {/* Connection Line */}
                  <motion.path
                    d="M 80 144 L 210 132 L 340 60"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Interactive Nodes */}
                  <circle
                    cx="80"
                    cy="144"
                    r="6"
                    className="fill-emerald-500 stroke-white stroke-2"
                  />
                  <circle
                    cx="210"
                    cy="132"
                    r="6"
                    className="fill-emerald-500 stroke-white stroke-2"
                  />
                  <circle
                    cx="340"
                    cy="60"
                    r="7"
                    className="fill-emerald-600 stroke-white stroke-2"
                  />

                  {/* Text Values above nodes */}
                  <text
                    x="80"
                    y="128"
                    textAnchor="middle"
                    className="text-[10px] fill-ink font-semibold"
                  >
                    ₹150M
                  </text>
                  <text
                    x="210"
                    y="116"
                    textAnchor="middle"
                    className="text-[10px] fill-ink font-semibold"
                  >
                    ₹200M
                  </text>
                  <text
                    x="340"
                    y="44"
                    textAnchor="middle"
                    className="text-xs fill-emerald-600 font-bold"
                  >
                    ₹500M Target
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
      SECTION 10: PREMIUM CALL TO ACTION SECTION
      -------------------------------------------------- */}
      <section className="bg-gradient-to-br from-[#0c1322] via-brand-blue to-[#1e344f] py-28 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-yellow/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-brand-pink/15 blur-[130px] pointer-events-none" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-brand-yellow border border-white/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-brand-yellow" />
              <span>Partner With Stanmax</span>
            </span>

            <h2 className="text-4xl tracking-tight sm:text-5xl font-bold font-heading leading-tight">
              Ready to Drive Animal <br /> Healthcare Forward?
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Get in touch with our institutional sales and distribution team to
              explore supply arrangements, private formulations, and regional
              distribution rights.
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                variant="secondary"
                onClick={() => openEnquiry()}
                className="px-8 py-4 text-base transition-transform duration-300 hover:-translate-y-1 hover:shadow-premium hover:scale-[1.03]"
              >
                Send Partnership Enquiry
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
