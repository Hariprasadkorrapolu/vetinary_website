import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Award, Users, Handshake, CheckCircle2, MessageSquare, Globe, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { newsItems } from "@/lib/news";

export const metadata = {
  title: "News, Awards & Exhibitions | Stanmax Laboratories",
  description:
    "Stay updated with STANMAX Laboratories' latest exhibitions, awards, corporate achievements, product launches, and industry milestones as we continue advancing veterinary healthcare.",
};

export default function NewsEventsPage() {
  const [featured, ...items] = newsItems;

  const highlights = [
    {
      icon: Award,
      title: "Product Showcase",
      description: "Successfully displaying our latest veterinary therapeutics, dewormers, and premium feed formulations.",
      color: "text-brand-pink bg-brand-pink/5 border-brand-pink/10"
    },
    {
      icon: Users,
      title: "Industry Networking",
      description: "Connecting directly with leading veterinarians, researchers, and poultry integrators from across India.",
      color: "text-brand-blue bg-brand-blue/5 border-brand-blue/10"
    },
    {
      icon: Handshake,
      title: "Business Partnerships",
      description: "Forging strategic commercial alliances, expanding regional distribution, and supporting stockists.",
      color: "text-brand-yellow bg-brand-yellow/5 border-brand-yellow/10"
    },
    {
      icon: CheckCircle2,
      title: "Veterinary Innovation",
      description: "Demonstrating our commitment to research-backed animal health solutions and flock safety standards.",
      color: "text-emerald-500 bg-emerald-50/50 border-emerald-100"
    },
    {
      icon: MessageSquare,
      title: "Customer Engagement",
      description: "Engaging in productive discussions to support livestock productivity and sustainable farming.",
      color: "text-indigo-500 bg-indigo-50/50 border-indigo-100"
    },
    {
      icon: Globe,
      title: "International Delegates",
      description: "Welcoming international delegates and actively exploring global business and export corridors.",
      color: "text-cyan-500 bg-cyan-50/50 border-cyan-100"
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="STANMAX Laboratories"
        title="News & Events"
        text="Stay updated with STANMAX Laboratories' latest exhibitions, awards, corporate achievements, product launches, and industry milestones as we continue advancing veterinary healthcare across India."
        image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=82"
      />

      {/* Main News Area */}
      <section className="section-pad bg-mist">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-pink transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-600">News & Events</span>
          </div>

          {/* Section Heading */}
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-pink">Featured Recognition</span>
            <h2 className="text-3xl sm:text-4xl mt-2 tracking-tight text-brand-blue font-heading font-bold">Major Corporate Milestone</h2>
          </div>

          {/* Featured Article */}
          <article className="grid overflow-hidden rounded-[2rem] border border-medical bg-white shadow-premium lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-80 sm:min-h-[400px] lg:min-h-full">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="rounded-full bg-brand-pink/10 border border-brand-pink/20 px-3.5 py-1 text-xs font-semibold text-brand-pink uppercase tracking-wider">
                  Featured {featured.category}
                </span>
                {featured.location && (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {featured.location}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-4xl tracking-tight text-brand-blue font-heading font-bold mb-4">
                {featured.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-8 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {featured.date}
                </span>
              </div>
              <div>
                <Button href={`/news-events/${featured.slug}`} variant="primary" className="font-bold">
                  Read Full Story
                </Button>
              </div>
            </div>
          </article>

          {/* Latest News Section */}
          <div className="mt-20">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-pink">Exhibitions & Events</span>
              <h2 className="text-3xl sm:text-4xl mt-2 tracking-tight text-brand-blue font-heading font-bold">Latest Expos & Milestones</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {items.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col overflow-hidden rounded-[2rem] border border-medical bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium hover:border-brand-pink/30 group"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-brand-blue/5 border border-brand-blue/10 px-3.5 py-1 text-xs font-semibold text-brand-blue uppercase tracking-wider">
                        {item.category}
                      </span>
                      {item.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3.5 w-3.5" />
                          {item.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl tracking-tight text-brand-blue font-heading font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans flex-1">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 mt-auto">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <CalendarDays className="h-4 w-4" />
                        {item.date}
                      </span>
                      <Link href={`/news-events/${item.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-pink transition-colors">
                        Read More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Event Highlights Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-pink">Event Highlights</span>
              <h2 className="text-3xl sm:text-4xl mt-2 tracking-tight text-brand-blue font-heading font-bold">Key Focus & Achievements</h2>
              <p className="text-slate-600 text-sm mt-3 max-w-xl mx-auto">
                Discover the key pillars and milestones of our participations as we present gold-standard veterinary care across the country.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h, idx) => {
                const Icon = h.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-[2rem] border bg-white shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4 ${h.color}`}
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                      <Icon className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-brand-blue mb-2">{h.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">{h.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </Container>
      </section>
    </>
  );
}
