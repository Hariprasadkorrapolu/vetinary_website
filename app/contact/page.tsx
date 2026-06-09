"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { useEnquiry } from "@/components/modals/enquiry-provider";
import { CONTACT_DETAILS, WHATSAPP_URL } from "@/lib/constants";

export default function ContactPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Connect with Stanmax Laboratories"
        text="Speak with our team for product inquiries, distribution discussions, and veterinary category support."
        image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1800&q=82"
      />

      <section className="section-pad bg-mist">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slateblue/70">Reach Us</p>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">Sales and support desk</h2>
              <div className="mt-8 space-y-5">
                <Info icon={Mail} title="Email" text={CONTACT_DETAILS.email} />
                <Info
                  icon={Phone}
                  title="Phone"
                  text={
                    <span>
                      <span className="block">{CONTACT_DETAILS.phone}</span>
                      <span className="block mt-1">{CONTACT_DETAILS.phoneSecondary}</span>
                    </span>
                  }
                />
                <Info icon={MapPin} title="Address" text={CONTACT_DETAILS.address} />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => openEnquiry()}>Contact Enquiry</Button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slateblue transition hover:bg-medical"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] bg-white shadow-premium">
              <iframe
                title="Stanmax location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT_DETAILS.mapQuery)}&output=embed`}
                className="h-[420px] w-full border-0"
                loading="lazy"
              />
              <div className="p-6">
                <form className="grid gap-4 sm:grid-cols-2">
                  <input className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-slateblue" placeholder="Name" />
                  <input className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-slateblue" placeholder="Email" />
                  <input className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-slateblue" placeholder="Phone" />
                  <input className="h-12 rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-slateblue" placeholder="Subject" />
                  <textarea className="min-h-28 resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slateblue sm:col-span-2" placeholder="Message" />
                  <button className="rounded-full bg-slateblue px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#263f59] sm:col-span-2">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Info({
  icon: Icon,
  title,
  text
}: {
  icon: typeof Mail;
  title: string;
  text: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-medical text-slateblue">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold text-ink">{title}</h3>
        <div className="mt-1 text-sm leading-6 text-slate-600">{text}</div>
      </div>
    </div>
  );
}
