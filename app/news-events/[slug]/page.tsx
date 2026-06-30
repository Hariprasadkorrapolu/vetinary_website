import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { newsItems } from "@/lib/news";
import { CONTACT_DETAILS } from "@/lib/constants";

// Generate static params for all articles for fast static exports/rendering
export async function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = newsItems.find((item) => item.slug === slug);
  if (!item) return {};

  return {
    title: `${item.title} | Stanmax Laboratories`,
    description: item.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const itemIndex = newsItems.findIndex((item) => item.slug === slug);
  if (itemIndex === -1) {
    notFound();
  }

  const item = newsItems[itemIndex];

  // Previous & Next Navigation
  const prevItem = newsItems[itemIndex === 0 ? newsItems.length - 1 : itemIndex - 1];
  const nextItem = newsItems[itemIndex === newsItems.length - 1 ? 0 : itemIndex + 1];

  // Related News (other articles)
  const relatedNews = newsItems.filter((news) => news.slug !== slug);

  return (
    <div className="pt-24 lg:pt-32 bg-mist min-h-screen pb-16">
      <Container>
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-pink transition-colors">Home</Link>
          <span>/</span>
          <Link href="/news-events" className="hover:text-brand-pink transition-colors">News & Events</Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-[200px] sm:max-w-xs">{item.title}</span>
        </div>

        {/* Back Link */}
        <Link href="/news-events" className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-pink transition-colors mb-6 uppercase tracking-wider">
          <ArrowLeft className="h-4 w-4" />
          Back to News & Events
        </Link>

        {/* Header Block */}
        <div className="max-w-4xl mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="rounded-full bg-brand-pink/10 border border-brand-pink/20 px-3.5 py-1 text-xs font-semibold text-brand-pink uppercase tracking-wider">
              {item.category}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {item.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
              {item.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-brand-blue leading-tight">
            {item.title}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden border border-medical shadow-premium mb-12 bg-slate-200">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          {/* Main Article Content */}
          <article className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 shadow-soft">
            {/* Paragraphs */}
            <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              {item.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Event Highlights Section */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="mt-12 border-t border-slate-100 pt-10">
                <h3 className="text-xl sm:text-2xl font-bold text-brand-blue font-heading mb-6">
                  Event Highlights & Achievements
                </h3>
                <ul className="grid gap-4 sm:grid-cols-1 font-sans text-sm text-slate-600">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <div className="h-6 w-6 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed font-medium text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Related News */}
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
              <h3 className="text-lg font-bold text-brand-blue mb-6 pb-2 border-b border-slate-100">
                Related Stories
              </h3>
              <div className="space-y-6">
                {relatedNews.map((related) => (
                  <div key={related.slug} className="group">
                    <span className="text-[10px] uppercase font-bold text-brand-pink tracking-wider block mb-1">
                      {related.category}
                    </span>
                    <Link href={`/news-events/${related.slug}`} className="text-sm font-bold text-brand-blue hover:text-brand-pink transition-colors line-clamp-2 leading-snug font-heading">
                      {related.title}
                    </Link>
                    <span className="text-[11px] text-slate-400 block mt-1.5">
                      {related.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-gradient-to-br from-brand-blue to-[#202c52] text-white p-6 sm:p-8 rounded-[2.5rem] shadow-premium relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-110" />
              <h4 className="text-lg font-bold mb-3 font-heading">Need Media Support?</h4>
              <p className="text-xs leading-relaxed text-white/80 mb-6">
                Contact our communications team for official press releases, product brochures, or executive interview requests.
              </p>
              <div className="space-y-3">
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="flex items-center gap-2.5 text-xs font-semibold text-white hover:text-brand-yellow transition-colors">
                  <Mail className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span className="truncate">{CONTACT_DETAILS.email}</span>
                </a>
                <a href="tel:+919505824365" className="flex items-center gap-2.5 text-xs font-semibold text-white hover:text-brand-yellow transition-colors">
                  <Phone className="h-4 w-4 text-brand-yellow shrink-0" />
                  <span>+91 95058 24365</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Previous / Next Article Navigation */}
        <div className="mt-16 border-t border-slate-200/60 pt-8 flex flex-col sm:flex-row justify-between items-stretch gap-4">
          {/* Previous Link */}
          <Link href={`/news-events/${prevItem.slug}`} className="flex-1 bg-white border border-slate-100 hover:border-brand-pink/20 p-5 rounded-[2.5rem] shadow-soft hover:shadow-premium transition-all duration-300 flex items-center gap-4 group text-left">
            <div className="h-10 w-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-pink/10 group-hover:text-brand-pink transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-0.5">Previous Story</span>
              <h4 className="text-sm font-bold text-brand-blue group-hover:text-brand-pink transition-colors truncate font-heading">
                {prevItem.title}
              </h4>
            </div>
          </Link>

          {/* Next Link */}
          <Link href={`/news-events/${nextItem.slug}`} className="flex-1 bg-white border border-slate-100 hover:border-brand-pink/20 p-5 rounded-[2.5rem] shadow-soft hover:shadow-premium transition-all duration-300 flex items-center justify-between gap-4 group text-right">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-0.5">Next Story</span>
              <h4 className="text-sm font-bold text-brand-blue group-hover:text-brand-pink transition-colors truncate font-heading">
                {nextItem.title}
              </h4>
            </div>
            <div className="h-10 w-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-pink/10 group-hover:text-brand-pink transition-colors">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
}
