import Image from "next/image";
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  text,
  image
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 text-white">
      <Image src={image} alt="" fill priority className="object-cover opacity-35" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/84 to-slateblue/50" />
      <Container className="relative pb-24 pt-12">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-cyanline">{eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{text}</p>
        </div>
      </Container>
    </section>
  );
}
