import { ProductCatalog } from "@/components/products/product-catalog";

export const metadata = {
  title: "Our Products | Stanmax Laboratories",
  description:
    "Browse Stanmax veterinary, poultry, sheep, goat, and dairy cattle product catalog.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="pt-20 lg:pt-28">
      <ProductCatalog initialCategory={params.category} />
    </div>
  );
}
