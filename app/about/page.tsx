import Image from "next/image";
import { Award, Microscope, ShieldCheck, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = {
  title: "About Us | Stanmax Laboratories",
  description: "Learn about Stanmax Laboratories Private Limited, our mission, quality systems, and veterinary commitment."
};

const values = [
  {
    title: "Mission",
    text: "To serve the professional community and farms with quality and effective animal health care solutions, animal well-being, and affordable product availability.",
    icon: Stethoscope
  },
  {
    title: "Vision",
    text: "To provide quality products and solutions to veterinarians and enhance the health, well-being, performance, and productivity of animals with professional and business ethics.",
    icon: Microscope
  },
  {
    title: "Quality Assurance",
    text: "A licensed manufacturing facility follows suitable technologies, raw material selection, manufacturing controls, finished product checks, and GMP quality standards.",
    icon: ShieldCheck
  },
  {
    title: "ISO 9001-2015",
    text: "Customer satisfaction and compliance guide everyday operations through a quality management system aligned with ISO 9001-2015 standards.",
    icon: Award
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Every Farm Care We Are There"
        text="STANMAX LABORATORIES PVT. LTD. is a rapidly growing business in the animal welfare division with a broad product range for farm and companion animals."
        image="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1800&q=82"
      />

      <section className="section-pad bg-white">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slateblue/70">Who We Are</p>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                Established in 1996, built for total animal wellness.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                STANMAX LABORATORIES PVT. LTD. has made great strides in the animal health care
                segment since its establishment in 1996. The company produces and markets a wide
                range of products for livestock, poultry, and companion animal segments.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Everything we do reflects our commitment to serving total animal wellness. We offer
                a broad range of products for farm animals and companion animals, guided by the motto
                <span className="font-semibold text-ink"> “Every Farm Care We Are There.”</span>
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                STANMAX LABS has developed expertise in liquid, suspension, and powder dosage forms
                for Poultry, Dairy, Sheep & Goat, and Aqua Farming. Our cornerstones are product
                innovation, quality assurance, flexibility, and cost-effectiveness, supported by
                20 years of experience in marketing and production.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                We are equipped with a licensed manufacturing facility using suitable technologies,
                careful raw material selection, controlled manufacturing processes, and finished
                product checks. We follow quality standards as per GMP norms of the department.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-premium">
              <Image
                src="https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1400&q=82"
                alt="Quality assurance laboratory"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-mist">
        <SectionHeading
          eyebrow="Our Foundation"
          title="Quality products, ethical solutions, and dependable farm care"
          text="The company is expanding its reach in the world of animal health care while keeping customer satisfaction, compliance, and product quality at the center."
        />
        <Container className="mt-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="rounded-[1.75rem] bg-white p-6 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-medical text-slateblue">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{value.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
