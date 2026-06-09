"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
  Fish,
  Heart,
  Activity,
  Sparkles,
  Network,
  Layers,
  ArrowUpRight,
  Check,
  Building,
  GraduationCap
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useEnquiry } from "@/components/modals/enquiry-provider";

// Helper component for animated numbers
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
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
  const [activeTimeline, setActiveTimeline] = useState(4); // default active timeline index (2028 Target)
  const [activeInfographicStep, setActiveInfographicStep] = useState(0);

  // Timeline events
  const timelineEvents = [
    { year: "1996", title: "Company Established", desc: "Stanmax Laboratories founded in Hyderabad, establishing core foundations in quality veterinary care." },
    { year: "2005", title: "Market Expansion", desc: "Expanding product range and establishing a robust presence across major states in India." },
    { year: "2015", title: "Institutional Growth", desc: "Securing key government, semi-government, and veterinary cooperative procurement approvals." },
    { year: "2024", title: "New Manufacturing Expansion", desc: "Inaugurating state-of-the-art facility aligned with modern WHO-GMP benchmarks." },
    { year: "2028", title: "₹500M Revenue Target", desc: "Aiming to touch the landmark milestone of ₹500 Million through strategic market penetration." }
  ];

  // Manufacturing infographic steps
  const manufacturingSteps = [
    { title: "WHO-GMP Formulations", desc: "Advanced process design with automated dosing and mixing controls to ensure uniformity.", icon: Factory },
    { title: "Advanced Quality Lab", desc: "In-house physical, chemical, and microbiological checks at every stage of production.", icon: ShieldCheck },
    { title: "Safety & Consistency", desc: "Classified HVAC systems and modular cleanroom panels maintaining precise environment controls.", icon: CheckCircle2 },
    { title: "Global Compliance", desc: "Adherence to international standards, positioning products for emerging global markets.", icon: Globe }
  ];

  // Infographic timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveInfographicStep((prev) => (prev + 1) % manufacturingSteps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white text-ink">
      
      {/* --------------------------------------------------
         SECTION 1: HERO SECTION
      -------------------------------------------------- */}
      <section className="relative min-h-[95vh] overflow-hidden bg-gradient-to-br from-ink via-[#0d1c2e] to-[#1e344f] pt-32 text-white flex flex-col justify-center">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1800&q=82"
            alt="Pharmaceutical manufacturing background"
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        {/* Content Container */}
        <Container className="relative z-10 py-12">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15]">
                29+ Years of Trusted <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Animal Healthcare
                </span> <br />
                Excellence
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                GMP & ISO 9001:2015 Certified Veterinary Healthcare Company Serving India's Veterinary and Poultry Industry Since 1996.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-bold text-ink shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-400/30"
                >
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={() => openEnquiry()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/40"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* Right Hero Stats Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-premium backdrop-blur-md"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl" />

              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-emerald-400">
                Corporate Quick Facts
              </h2>
              
              <div className="divide-y divide-white/10">
                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-emerald-400">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">Industry Standing</span>
                  </div>
                  <span className="text-lg font-bold text-white">29+ Years</span>
                </div>
                
                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-emerald-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">Quality Accreditation</span>
                  </div>
                  <span className="text-sm font-bold bg-emerald-400/10 px-3 py-1 rounded-full text-emerald-400 border border-emerald-400/20">
                    GMP Certified
                  </span>
                </div>

                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">Operations Standard</span>
                  </div>
                  <span className="text-sm font-bold bg-cyan-400/10 px-3 py-1 rounded-full text-cyan-400 border border-cyan-400/20">
                    ISO 9001:2015
                  </span>
                </div>

                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-emerald-400">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">Founded</span>
                  </div>
                  <span className="text-lg font-bold text-white">1996</span>
                </div>

                {/* Fact Item */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-2.5 text-emerald-400">
                      <Globe className="h-5 w-5" />
                    </div>
                    <span className="text-slate-300 text-sm">Corporate HQ</span>
                  </div>
                  <span className="text-lg font-bold text-white text-right">Hyderabad, India</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Diagonal Cut Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
      </section>

      {/* --------------------------------------------------
         SECTION 2: OUR FOUNDATION
      -------------------------------------------------- */}
      <section className="relative bg-white py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Company Roots</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Our Foundation</h2>
              </div>
              
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                STANMAX LABORATORIES PVT LTD is a GMP and ISO 9001:2015 certified animal healthcare company established in 1996 and headquartered in Hyderabad, India.
              </p>
              
              <p className="text-base leading-relaxed text-slate-600">
                We develop, manufacture and market high-quality veterinary healthcare solutions that improve animal health, productivity and farm profitability across India. Our strategic operations are engineered to integrate modern biosecurity protocols with robust raw material selection, setting benchmarks in veterinary formulation science.
              </p>

              {/* Timeline Horizontal / Vertical Visualizer */}
              <div className="pt-6">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">Our Milestones & Growth Targets</h3>
                
                {/* Horizontal Timeline on Desktop, Vertical on Mobile */}
                <div className="hidden sm:flex items-center justify-between relative pb-10">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                  
                  {timelineEvents.map((event, idx) => (
                    <button
                      key={event.year}
                      onClick={() => setActiveTimeline(idx)}
                      className="relative z-10 flex flex-col items-center group focus:outline-none"
                    >
                      <div className={`h-10 w-10 rounded-full border-4 flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        activeTimeline === idx 
                        ? "bg-emerald-500 border-emerald-100 text-ink scale-110 shadow-lg shadow-emerald-500/20" 
                        : "bg-white border-slate-200 text-slate-400 group-hover:border-emerald-300 group-hover:text-emerald-600"
                      }`}>
                        {event.year.slice(2)}
                      </div>
                      <span className={`mt-2 text-xs font-bold transition-all duration-300 ${
                        activeTimeline === idx ? "text-emerald-600" : "text-slate-500"
                      }`}>
                        {event.year}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Mobile Vertical Timeline */}
                <div className="flex flex-col gap-4 sm:hidden">
                  {timelineEvents.map((event, idx) => (
                    <div
                      key={event.year}
                      onClick={() => setActiveTimeline(idx)}
                      className={`flex gap-4 p-3 rounded-2xl border transition-all cursor-pointer ${
                        activeTimeline === idx 
                        ? "bg-slate-50 border-emerald-500/30" 
                        : "bg-white border-slate-100"
                      }`}
                    >
                      <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center font-bold text-xs ${
                        activeTimeline === idx ? "bg-emerald-500 text-ink" : "bg-slate-100 text-slate-500"
                      }`}>
                        {event.year.slice(2)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-ink">{event.title} ({event.year})</h4>
                        {activeTimeline === idx && (
                          <p className="mt-1 text-xs text-slate-600">{event.desc}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Timeline Details Card (Desktop) */}
                <div className="hidden sm:block">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTimeline}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-soft"
                    >
                      <h4 className="text-base font-bold text-ink flex items-center gap-2">
                        <span className="bg-emerald-500 text-ink px-2 py-0.5 rounded text-xs font-bold">
                          {timelineEvents[activeTimeline].year}
                        </span>
                        {timelineEvents[activeTimeline].title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {timelineEvents[activeTimeline].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Right Image Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-premium bg-slate-100 lg:h-[450px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                alt="Corporate manufacturing facility"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 backdrop-blur-sm shadow-soft border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Operations Hub</p>
                <p className="mt-1 text-sm font-semibold text-ink leading-snug">
                  Our advanced production setup ensures delivery of high-confidence therapeutics across the country.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
         SECTION 3: VISION & VALUES
      -------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink to-[#131d2a] py-28 text-white">
        {/* Glow Effects using Darkslate Blue #2F3E6F */}
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#2F3E6F]/20 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#2F3E6F]/10 blur-[140px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Info Column - 7 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#2F3E6F]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-300 border border-[#2F3E6F]/40">
                <Target className="h-4 w-4 text-[#2F3E6F] animate-pulse" />
                <span>Our Strategic Direction</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white">
                Our Vision
              </h2>
              <blockquote className="relative border-l-4 border-[#2F3E6F] pl-6 py-2">
                <p className="text-2xl sm:text-3xl font-bold italic tracking-tight text-slate-100 leading-normal">
                  “Rise Together — Healthier Animals, <br /> Stronger Business.”
                </p>
              </blockquote>
              <p className="text-base leading-relaxed text-slate-300 max-w-xl">
                We believe animal productivity and healthcare standards are key to industrial growth. By manufacturing stable, high-bioavailability veterinary and poultry therapeutics, we secure the operations of our farmer partners, veterinary practitioners, and institutional distributors.
              </p>
            </motion.div>

            {/* Right Card Column - 5 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-4"
            >
              {[
                {
                  title: "Sustainable Farms",
                  desc: "Optimizing animal nutrition and herd health to ensure sustainable, high-yield farm economics.",
                  badge: "Eco-Efficiency"
                },
                {
                  title: "Ethical Practice",
                  desc: "Ensuring 100% trace-monitored, GMP-compliant therapeutics for veterinary practitioners.",
                  badge: "High Safety"
                },
                {
                  title: "Partner Success",
                  desc: "Securing stable supply chains, volume consistency, and commercial strength for distributors.",
                  badge: "Mutual Growth"
                }
              ].map((value, idx) => (
                <div 
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:bg-[#2F3E6F]/10 hover:border-[#2F3E6F]/30 group"
                >
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[#2F3E6F]/5 blur-xl group-hover:bg-[#2F3E6F]/15 transition-colors" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <h4 className="text-base font-bold text-white group-hover:text-slate-100 transition-colors flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#2F3E6F]" />
                        {value.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{value.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F3E6F] bg-[#2F3E6F]/15 px-2 py-0.5 rounded border border-[#2F3E6F]/30 shrink-0">
                      {value.badge}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
         SECTION 4: MANUFACTURING EXCELLENCE
      -------------------------------------------------- */}
      <section className="bg-mist py-24 relative overflow-hidden">
        <Container>
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-700 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              NEW WHO-GMP FACILITY
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Manufacturing Excellence</h2>
            <p className="text-base text-slate-600 leading-relaxed font-semibold">
              Engineered for Safety, Consistency and Global Compliance
            </p>
          </div>
 
          <div className="grid gap-8 mt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* 4 Premium Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "State-of-the-Art Equipment",
                  desc: "Advanced machinery and process controls aligned with WHO-GMP benchmarks.",
                  icon: Factory
                },
                {
                  title: "Advanced Quality Management",
                  desc: "Streamlined operations ensuring the highest levels of product safety and consistency.",
                  icon: ShieldCheck
                },
                {
                  title: "Strategic Capacity Expansion",
                  desc: "Strengthens manufacturing capabilities and operational efficiency.",
                  icon: Activity
                },
                {
                  title: "Export-Ready Compliance",
                  desc: "Positions STANMAX for domestic growth and international export opportunities.",
                  icon: Globe
                }
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium group"
                >
                  <div className="rounded-2xl bg-emerald-50 p-3 w-12 h-12 flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-ink">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Interactive Infographic Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-premium space-y-6"
            >
              <h3 className="text-lg font-bold text-ink">Manufacturing Infographic Flow</h3>
              <p className="text-xs text-slate-500">How we maintain the highest compliance standards from raw materials to final packaging.</p>

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
                      className={`relative flex gap-4 p-3 rounded-2xl transition-all cursor-pointer ${
                        isActive ? "bg-emerald-50/50 border border-emerald-500/10 shadow-soft" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className={`relative z-10 h-10 w-10 shrink-0 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive ? "bg-emerald-500 border-emerald-500 text-ink scale-110" : "bg-white border-slate-200 text-slate-400"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-bold transition-colors ${isActive ? "text-emerald-700" : "text-ink"}`}>{step.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-normal">{step.desc}</p>
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
         SECTION 5: IMPORT OPERATIONS
      -------------------------------------------------- */}
      <section className="bg-white py-24 relative overflow-hidden">
        {/* Decorative background accent */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#2F3E6F]/5 blur-3xl pointer-events-none" />
        
        <Container>
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
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F3E6F]">Global Sourcing Network</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Import Operations</h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-700 font-semibold">
                Enhancing Poultry and Livestock Performance Through Premium Global Procurement
              </p>
              <p className="text-sm leading-relaxed text-slate-500">
                To guarantee maximum batch reliability and safety, we import essential active ingredients directly from world-class manufacturing partners. Our global sourcing pipeline is strictly verified, setting industry-leading benchmarks in ingredient purity.
              </p>
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-[#2F3E6F]" />
                  Global Partners
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#2F3E6F]" />
                  100% Quality Inspected
                </div>
              </div>
            </motion.div>

            {/* Right Column: Redesigned Cards with Darkslate Blue theme */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Card 1: Essential Amino Acids */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-premium hover:shadow-soft transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[#2F3E6F]/5 blur-xl group-hover:bg-[#2F3E6F]/10 transition-colors" />
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2F3E6F]" />
                
                <div className="rounded-2xl bg-[#2F3E6F]/10 p-3 w-11 h-11 flex items-center justify-center text-[#2F3E6F] mb-6">
                  <Layers className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-bold text-ink text-left">Essential Amino Acids</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal text-left">High-purity raw inputs sourced globally to balance poultry nutrition profiles.</p>
                
                <ul className="mt-5 space-y-2.5">
                  {["D-L Methionine", "L-Lysine", "Threonine", "Arginine"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#2F3E6F] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Card 2: Antibiotic Premixes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-premium hover:shadow-soft transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-[#2F3E6F]/5 blur-xl group-hover:bg-[#2F3E6F]/10 transition-colors" />
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2F3E6F]" />
                
                <div className="rounded-2xl bg-[#2F3E6F]/10 p-3 w-11 h-11 flex items-center justify-center text-[#2F3E6F] mb-6">
                  <Globe className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-bold text-ink text-left">Antibiotic Premixes</h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal text-left">Regulated formulations designed to secure livestock health outcomes.</p>
                
                <ul className="mt-5 space-y-2.5">
                  {["Chlortetracycline 15%", "Specialized Nutritional Inputs", "Feed Grade Additives"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-[#2F3E6F] shrink-0" />
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
         SECTION 6: OUR STRENGTH
      -------------------------------------------------- */}
      <section className="bg-gradient-to-br from-[#0b1726] to-[#12243b] py-24 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        <Container className="relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Why Stanmax</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Strength</h2>
            <p className="text-sm text-slate-300">Six pillars of veterinary excellence underpinning our business</p>
          </div>
 
          <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Quality Manufacturing",
                desc: "GMP-certified facility with advanced infrastructure.",
                icon: Factory
              },
              {
                title: "Quality Assurance",
                desc: "ISO 9001:2015 certified operations.",
                icon: ShieldCheck
              },
              {
                title: "Customer-Centric Approach",
                desc: "Long-term relationships built on trust and integrity.",
                icon: Users
              },
              {
                title: "Robust Distribution Network",
                desc: "Efficient servicing of government and institutional procurement.",
                icon: Network
              },
              {
                title: "Industry Expertise",
                desc: "Deep veterinary and poultry sector knowledge.",
                icon: Briefcase
              },
              {
                title: "Operational Excellence",
                desc: "Consistent quality, delivery and support.",
                icon: Award
              }
            ].map((strength, idx) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl border border-white/5 bg-white/5 p-6 shadow-soft hover:bg-white/10 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-emerald-500 group-hover:h-full transition-all duration-300" />
                <div className="rounded-xl bg-white/10 p-3 w-11 h-11 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                  <strength.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">{strength.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{strength.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
         SECTION 7: MARKET STANDING
      -------------------------------------------------- */}
      <section className="bg-white py-24">
        <Container>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F3E6F]">Enterprise Scale</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Trusted Across India's Veterinary & Poultry Industry
            </h2>
          </div>

          {/* Leadership Counters Grid with Darkslate Blue #2F3E6F */}
          <div className="grid gap-6 sm:grid-cols-3 mt-12 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center shadow-soft">
              <p className="text-3xl font-extrabold text-[#2F3E6F] sm:text-4xl">
                <Counter value={29} />+
              </p>
              <p className="mt-2 text-xs font-bold text-ink uppercase tracking-wider">Years Experience</p>
              <p className="mt-1 text-[10px] text-slate-400">Serving veterinarians since 1996</p>
            </div>
            
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center shadow-soft">
              <p className="text-3xl font-extrabold text-[#2F3E6F] sm:text-4xl">
                <Counter value={10} />
              </p>
              <p className="mt-2 text-xs font-bold text-ink uppercase tracking-wider">Key Client Managers</p>
              <p className="mt-1 text-[10px] text-slate-400">Dedicated institutional relationships</p>
            </div>
            
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center shadow-soft">
              <p className="text-3xl font-extrabold text-[#2F3E6F] sm:text-4xl">
                <Counter value={45} />+
              </p>
              <p className="mt-2 text-xs font-bold text-ink uppercase tracking-wider">Sales Executives</p>
              <p className="mt-1 text-[10px] text-slate-400">Extensive nationwide outreach network</p>
            </div>
          </div>

          {/* Two Side-by-Side Sector Cards Redesigned with Darkslate Blue #2F3E6F */}
          <div className="grid gap-8 mt-12 lg:grid-cols-2">
            {/* Veterinary Sector */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-premium relative overflow-hidden group hover:shadow-soft transition-all duration-300"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#2F3E6F]/5 blur-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2F3E6F]" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-2xl bg-[#2F3E6F]/10 p-3.5 text-[#2F3E6F]">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-ink">Veterinary Sector</h3>
                  <p className="text-xs text-slate-400">Approved Institutional Supplier</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed text-left">
                We maintain active corporate approvals, acting as a direct supplier of high-quality formulations to key public bodies:
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "State Governments",
                  "Semi-Government Bodies",
                  "Cooperative Societies",
                  "Veterinary Dairy Unions"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100/50 p-3 text-xs font-semibold text-slate-700 hover:border-[#2F3E6F]/20 transition-colors">
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
              className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-premium relative overflow-hidden group hover:shadow-soft transition-all duration-300"
            >
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#2F3E6F]/5 blur-2xl pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2F3E6F]" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-2xl bg-[#2F3E6F]/10 p-3.5 text-[#2F3E6F]">
                  <Bird className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-ink">Poultry Sector</h3>
                  <p className="text-xs text-slate-400">Trusted by Leading Poultry Groups</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-4 text-left">
                Recognized and preferred by major integrators, hatcheries, and technical experts across India:
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {["Venky's", "IB Group", "Baramati", "Nanda", "Komarla", "Anand"].map((client) => (
                  <span key={client} className="rounded-full bg-slate-50 border border-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:border-[#2F3E6F]/20 hover:bg-slate-100 transition-colors">
                    {client}
                  </span>
                ))}
              </div>

              <div className="grid gap-2 grid-cols-3 pt-3.5 border-t border-slate-100">
                {["Leading Integrators", "Hatcheries", "Nutritionists"].map((item) => (
                  <p key={item} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">{item}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
         SECTION 8: FINANCIAL GROWTH
      -------------------------------------------------- */}
      <section className="bg-mist py-24 relative overflow-hidden">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Investor Outlook</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Growth Journey</h2>
              <p className="text-sm leading-relaxed text-slate-600">
                Stanmax has demonstrated resilient financial performance and is on track for a significant capacity and revenue ramp-up.
              </p>

              {/* Data Blocks */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-sm font-semibold text-slate-500">FY 2024-25 Revenue</span>
                  <span className="text-lg font-bold text-ink">₹150 Million</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-sm font-semibold text-slate-500">FY 2025-26 Estimate</span>
                  <span className="text-lg font-bold text-ink">₹200 Million</span>
                </div>
                <div className="flex justify-between items-center pb-3">
                  <span className="text-sm font-semibold text-slate-500">FY 2028 Target</span>
                  <span className="text-lg font-bold text-emerald-600">₹500 Million Target</span>
                </div>
              </div>
            </div>

            {/* Right Chart Visualization */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-premium">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Revenue Trajectory (INR Millions)</h3>
              
              {/* SVG Animated Chart */}
              <div className="relative h-64 w-full">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="40" y1="180" x2="380" y2="180" stroke="#f1f5f9" strokeWidth="2" />
                  <line x1="40" y1="120" x2="380" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                  <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                  
                  {/* Axis labels */}
                  <text x="35" y="184" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">0</text>
                  <text x="35" y="124" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">250</text>
                  <text x="35" y="64" textAnchor="end" className="text-[10px] fill-slate-400 font-bold">500</text>

                  {/* X axis labels */}
                  <text x="80" y="196" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">FY 24-25</text>
                  <text x="210" y="196" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">FY 25-26</text>
                  <text x="340" y="196" textAnchor="middle" className="text-[10px] fill-slate-400 font-bold">FY 28 (T)</text>

                  {/* Gradient Area */}
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Gradient Shape */}
                  <path d="M 80 180 L 80 144 L 210 132 L 340 60 L 340 180 Z" fill="url(#chartGlow)" />

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
                  <circle cx="80" cy="144" r="6" className="fill-emerald-500 stroke-white stroke-2" />
                  <circle cx="210" cy="132" r="6" className="fill-emerald-500 stroke-white stroke-2" />
                  <circle cx="340" cy="60" r="7" className="fill-emerald-600 stroke-white stroke-2" />

                  {/* Text Values above nodes */}
                  <text x="80" y="128" textAnchor="middle" className="text-[10px] fill-ink font-bold">₹150M</text>
                  <text x="210" y="116" textAnchor="middle" className="text-[10px] fill-ink font-bold">₹200M</text>
                  <text x="340" y="44" textAnchor="middle" className="text-xs fill-emerald-600 font-bold">₹500M Target</text>
                </svg>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* --------------------------------------------------
         SECTION 9: STANMAX AT A GLANCE
      -------------------------------------------------- */}
      <section className="bg-white py-24">
        <Container>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Company Overview</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Stanmax at a Glance</h2>
            <p className="text-sm text-slate-500">Dashboard summarizing our operational capabilities and market advantages</p>
          </div>
 
          <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "29+ Years Industry Excellence",
                desc: "Strong market reputation and established technical excellence since 1996.",
                icon: Briefcase
              },
              {
                title: "GMP & ISO Certified Manufacturing",
                desc: "Quality systems strictly conforming to government drug department guidelines.",
                icon: ShieldCheck
              },
              {
                title: "Strong Institutional Presence",
                desc: "Preferred supply contractor for governments, dairy unions, and cooperatives.",
                icon: Building
              },
              {
                title: "Advanced Manufacturing Infrastructure",
                desc: "Robust processing, packaging, and clean room facilities in Telangana.",
                icon: Factory
              },
              {
                title: "Extensive Poultry Market Reach",
                desc: "Strategic supply access to major integrators, nutritionists, and breeders.",
                icon: Network
              },
              {
                title: "Experienced Leadership",
                desc: "Board directors and advisors with extensive veterinary pharmacy background.",
                icon: GraduationCap
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-soft transition-all duration-300 hover:bg-white hover:shadow-premium group relative"
              >
                <div className="rounded-xl bg-emerald-50 p-3 w-11 h-11 flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-500 group-hover:text-ink transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
