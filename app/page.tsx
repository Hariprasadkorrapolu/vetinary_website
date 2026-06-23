import Image from "next/image";
import { Beaker, CheckCircle2, Quote, Star } from "lucide-react";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { Stats } from "@/components/home/stats";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProducts } from "@/lib/products";
import { HomeCta } from "@/components/sections/home-cta";

const reviews = [
  {
    name: "Dr. Rakesh Patel",
    role: "Poultry Consultant",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    text: "Stanmax gives our farm clients dependable product support and clear technical communication.",
  },
  {
    name: "Meera Shah",
    role: "Dairy Farm Owner",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    text: "The dairy nutrition range feels practical, well packaged, and supported by people who understand field realities.",
  },
  {
    name: "AquaCare Distributors",
    role: "Channel Partner",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    text: "A professional portfolio, consistent supply conversations, and strong product presentation.",
  },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <section className="section-pad bg-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -left-5 -top-5 h-40 w-40 rounded-full bg-medical" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-premium">
                <Image
                  src="/who-we-are.jpg"
                  alt="Stanmax Veterinary Care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="glass absolute -bottom-8 right-5 max-w-xs rounded-3xl p-5 shadow-soft">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-slateblue text-white">
                  <Beaker className="h-5 w-5" />
                </div>
                <p className="text-sm leading-6 text-ink">
                  Every Farm Care We Are There.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.18em] text-slateblue/70">
                Who We Are
              </p>
              <h2 className="text-3xl tracking-tight text-ink sm:text-5xl">
                A rapidly growing animal welfare business established in 1996.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                STANMAX LABORATORIES PVT. LTD. has made great strides in the
                animal health care segment, producing and marketing a wide range
                of products for livestock, poultry, and companion animal
                segments.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                With the motto{" "}
                <span className="text-ink">“Every Farm Care We Are There”</span>
                , everything we do reflects our commitment to total animal
                wellness through quality, effective, and affordable animal
                health care solutions.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "Product innovation",
                  "Quality assurance",
                  "Flexible solutions",
                  "Cost-effectiveness",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <CheckCircle2 className="h-5 w-5 text-slateblue" />
                    {item}
                  </p>
                ))}
              </div>
              <Button href="/about" className="mt-9">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Stats />

      <section className="section-pad bg-white">
        <SectionHeading
          eyebrow="Featured Products"
          title="High-confidence products for veterinary and farm performance"
          text="A focused view of Stanmax product families across poultry, dairy, aqua, companion animal, and small ruminant needs."
        />
        <Container className="mt-12">
          <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {featuredProducts.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="min-w-[82%] snap-start sm:min-w-[45%] lg:min-w-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-mist">
        <SectionHeading
          eyebrow="Client Reviews"
          title="Trusted by veterinarians, farms, and distribution partners"
        />
        <Container className="mt-12">
          <div className="no-scrollbar flex gap-6 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="min-w-[86%] rounded-[1.75rem] bg-white p-6 shadow-soft sm:min-w-[44%] lg:min-w-0"
              >
                <Quote className="h-8 w-8 text-slateblue/30" />
                <div className="mt-5 flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {review.text}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-ink">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <HomeCta />
    </>
  );
}
