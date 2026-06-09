import Link from "next/link";
import { AtSign, ExternalLink, Mail, MapPin, Phone, UsersRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { CONTACT_DETAILS, SOCIAL_LINKS, categories, navItems } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <div className="inline-flex rounded-2xl bg-white px-5 py-4">
              <Logo />
            </div>
            <div className="mt-7 space-y-3">
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = index === 0 ? AtSign : UsersRound;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex max-w-sm items-center justify-between gap-4 rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/76 transition hover:bg-white/12 hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-cyanline">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/44">
                          {social.label}
                        </span>
                        <span className="font-semibold">{social.handle}</span>
                      </span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <div className="mt-5 space-y-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-white/68 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Categories</h3>
            <div className="mt-5 space-y-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="block text-sm text-white/68 hover:text-white"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-white/68">
              <p className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 text-cyanline" />
                {CONTACT_DETAILS.address}
              </p>
              <p className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 text-cyanline" />
                <span>
                  <span className="block">{CONTACT_DETAILS.phone}</span>
                  <span className="block mt-1">{CONTACT_DETAILS.phoneSecondary}</span>
                </span>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 text-cyanline" />
                {CONTACT_DETAILS.email}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/55">
          Copyright 2026 Stanmax Laboratories Private Limited. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
