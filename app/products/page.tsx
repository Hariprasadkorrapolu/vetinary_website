import { PageHero } from "@/components/ui/page-hero";
import { ProductCatalog } from "@/components/products/product-catalog";

export const metadata = {
  title: "Our Products | Stanmax Laboratories",
  description:
    "Browse Stanmax veterinary, poultry, dairy, aqua, and companion animal product catalog.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Professional veterinary product catalog"
        text="Explore category-led animal health solutions with sticky filters, quick view, and detailed product information."
        image="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1800&q=82"
      />
      <ProductCatalog initialCategory={params.category} />
    </>
  );
}
