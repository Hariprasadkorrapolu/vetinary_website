"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navItems } from "@/lib/constants";
import { useEnquiry } from "@/components/modals/enquiry-provider";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === href : pathname.startsWith(href));

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-soft backdrop-blur-xl" : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <Container>
        <nav className="flex h-28 items-center justify-between">
          <Link href="/" aria-label="Stanmax home" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <div className="hidden items-center gap-10 xl:gap-12 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full px-3 py-2 text-base font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slateblue/45 focus-visible:ring-offset-4 xl:text-[17px] ${
                    active
                      ? "bg-slateblue/[0.08] text-slateblue"
                      : "text-slate-600 hover:scale-[1.04] hover:text-slateblue"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-1 h-0.5 origin-left rounded-full bg-slateblue transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Button onClick={() => openEnquiry()} className="px-6">
              Contact Sales
            </Button>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slateblue lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 right-0 z-50 min-h-screen w-screen bg-white px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slateblue"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-16 flex flex-col gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-3xl font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slateblue/45 ${
                    isActive(item.href)
                      ? "bg-medical text-slateblue"
                      : "text-ink hover:bg-mist hover:text-slateblue"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setOpen(false);
                  openEnquiry();
                }}
                className="mt-8 w-full"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
