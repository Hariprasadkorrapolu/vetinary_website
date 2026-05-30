"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, BriefcaseMedical, Handshake, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";

const stats = [
  { label: "Products", value: 500, suffix: "+", icon: BriefcaseMedical },
  { label: "Clients", value: 1000, suffix: "+", icon: Handshake },
  { label: "Veterinary Partners", value: 50, suffix: "+", icon: ShieldCheck },
  { label: "Years Experience", value: 20, suffix: "+", icon: Award }
];

export function Stats() {
  return (
    <section className="bg-mist py-16">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCard({
  label,
  value,
  suffix,
  icon: Icon
}: {
  label: string;
  value: number;
  suffix: string;
  icon: typeof Award;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-[1.75rem] bg-white p-6 shadow-soft"
    >
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-medical text-slateblue">
        <Icon className="h-5 w-5" />
      </div>
      <motion.p className="mt-7 text-4xl font-semibold tracking-tight text-ink">{rounded}</motion.p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{label}</p>
    </motion.div>
  );
}
