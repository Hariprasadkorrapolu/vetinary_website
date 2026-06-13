import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { newsItems } from "@/lib/news";

export const metadata = {
  title: "News & Events | Stanmax Laboratories",
  description:
    "Company news, veterinary awareness events, product launches, and industry updates from Stanmax.",
};

export default function NewsEventsPage() {
  const [featured, ...items] = newsItems;

  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Field programs, launches, and veterinary industry updates"
        text="Follow Stanmax awareness events, product launches, partner programs, and technical updates."
        image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=82"
      />

      <section className="section-pad bg-mist">
        <Container>
          <article className="grid overflow-hidden rounded-[2rem] border border-medical bg-white shadow-premium lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-80">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="p-7 sm:p-10">
              <span className="rounded-full bg-medical px-3 py-1 text-xs text-slateblue">
                Featured {featured.category}
              </span>
              <h2 className="mt-5 text-3xl tracking-tight text-ink sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {featured.excerpt}
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm text-slateblue">
                <CalendarDays className="h-4 w-4" />
                {featured.date}
              </p>
            </div>
          </article>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[1.75rem] border border-medical bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-premium hover:border-brand-pink/30"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="rounded-full bg-medical px-3 py-1 text-xs text-slateblue">
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-xl tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.excerpt}
                  </p>
                  <p className="mt-5 flex items-center gap-2 text-sm text-slateblue">
                    <CalendarDays className="h-4 w-4" />
                    {item.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
