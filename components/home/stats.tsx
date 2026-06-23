"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Award, BriefcaseMedical, Handshake, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";

const stats = [
  { label: "Products", value: 100, suffix: "+", icon: BriefcaseMedical },
  { label: "Clients", value: 1000, suffix: "+", icon: Handshake },
  { label: "Veterinary Partners", value: 50, suffix: "+", icon: ShieldCheck },
  { label: "Years Experience", value: 29, suffix: "+", icon: Award },
];

export function Stats() {
  return (
    <section className="bg-mist py-10 sm:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
  icon: Icon,
}: {
  label: string;
  value: number;
  suffix: string;
  icon: typeof Award;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const rounded = useTransform(
    spring,
    (latest) => `${Math.round(latest)}${suffix}`,
  );

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (inView && !isMobile) motionValue.set(value);
  }, [inView, motionValue, value, isMobile]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-[1.5rem] sm:rounded-[1.75rem] border border-medical bg-white p-4 sm:p-6 shadow-soft"
    >
      <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl sm:rounded-2xl bg-medical text-slateblue">
        <Icon className="h-5 w-5" />
      </div>
      <motion.p className="mt-4 sm:mt-7 text-2xl sm:text-4xl tracking-tight text-ink">
        {isMobile ? `${value}${suffix}` : rounded}
      </motion.p>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">{label}</p>
    </motion.div>
  );
}
