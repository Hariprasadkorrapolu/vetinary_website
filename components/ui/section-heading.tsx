import { Container } from "@/components/ui/container";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <Container className={align === "center" ? "text-center" : ""}>
      <div className={align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slateblue/70">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
        {text ? <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{text}</p> : null}
      </div>
    </Container>
  );
}
