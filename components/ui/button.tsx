"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const styles = {
  primary:
    "bg-slateblue text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#263f59] hover:shadow-premium",
  secondary:
    "border border-white/70 bg-white text-slateblue shadow-soft hover:-translate-y-0.5 hover:bg-medical",
  ghost:
    "border border-slate-200 bg-white text-slateblue hover:-translate-y-0.5 hover:border-slateblue/30 hover:shadow-soft"
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button"
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${styles[variant]} ${className}`;

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
