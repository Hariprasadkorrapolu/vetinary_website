"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "ghost" | "white";
  className?: string;
  type?: "button" | "submit";
};

const styles = {
  primary:
    "bg-brand-blue text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#202c52] hover:shadow-premium",
  secondary:
    "bg-brand-yellow text-brand-blue shadow-soft hover:-translate-y-0.5 hover:bg-[#d6aa3c] hover:shadow-premium",
  accent:
    "bg-brand-pink text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#db5467] hover:shadow-premium",
  ghost:
    "border border-slate-200 bg-white text-brand-blue hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-soft",
  white:
    "border border-white/70 bg-white text-brand-blue shadow-soft hover:-translate-y-0.5 hover:bg-medical",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm transition-all duration-300 ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
