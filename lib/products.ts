import { categories, productTypes } from "@/lib/constants";

export type Category = (typeof categories)[number];
export type ProductType = (typeof productTypes)[number];

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: Category;
  type: ProductType;
  price?: number;
  popularity: number;
  isLatest: boolean;
  image: string;
  shortUsage: string;
  description: string;
  dosage: string;
  usage: string;
  benefits: string[];
  packaging: string;
  composition: string;
  warnings?: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: "welmax-plus",
    name: "WELMAX PLUS",
    image: "/products/WELMAX-PLUS.png",
    category: "Dairy",
    type: "Therapeutic",
    popularity: 95,
    isLatest: true,
    shortUsage: "Broad spectrum flukicide and dewormer",
    description:
      "WELMAX PLUS is a broad-spectrum antiparasitic suspension effective against flukes, gastrointestinal nematodes, and lungworms in cattle, sheep, and goats.",
    dosage: "1 ml per 4 kg body weight",
    usage:
      "Used for liver flukes, rumen flukes, GI nematodes, lungworms, and mixed infestations.",
    benefits: [
      "Improves animal health",
      "Improves performance",
      "Restores reproductive performance",
      "Hepato protective",
      "Reduces clinical toxemia",
    ],
    packaging: "500 ml, 1 Ltr",
    composition:
      "Oxyclozanide 6% W/v + Levamisole HCl 3% W/v + Silymarin 0.4% W/v",
  },
  {
    id: 2,
    slug: "trisole",
    name: "TRISOLE",
    image: "/products/TRISOLE.png",
    category: "Sheep & Goat",
    type: "Therapeutic",
    popularity: 90,
    isLatest: false,
    shortUsage: "Flukicide suspension",
    description:
      "TRISOLE is a triclabendazole-based flukicide effective against immature and adult liver flukes.",
    dosage: "1 ml per 5 kg body weight",
    usage: "Used for fasciolosis and liver fluke infections.",
    benefits: [
      "Better weight gain",
      "Improves productivity",
      "Improves liver function",
      "Improves feed conversion",
    ],
    packaging: "500 ml, 1 Ltr",
    composition: "Triclabendazole 5% W/v",
  },
  {
    id: 3,
    slug: "stanpiperz-45",
    name: "STANPIPERZ 45",
    image: "/products/STANPIPERZ 45.png",
    category: "Poultry",
    type: "Therapeutic",
    popularity: 80,
    isLatest: false,
    shortUsage: "Deworming solution",
    description:
      "STANPIPERZ 45 is a veterinary deworming formulation used against internal parasites.",
    dosage: "As directed by veterinarian",
    usage: "Used for treatment and control of internal parasites.",
    benefits: ["Controls parasitic infestations", "Improves animal health"],
    packaging: "As per PPT",
    composition: "Piperazine based formulation",
  },
  {
    id: 4,
    slug: "stanmisole",
    name: "STANMISOLE",
    image: "/products/STANMISOLE.png",
    category: "Poultry",
    type: "Water Soluble",
    popularity: 92,
    isLatest: false,
    shortUsage: "Water soluble dewormer",
    description:
      "STANMISOLE is a levamisole soluble powder used for treatment of internal parasites.",
    dosage: "1 gm per 25-40 kg body weight",
    usage: "Used against nematodes, haemonchus, and trichostrongylus.",
    benefits: [
      "Broad-spectrum dewormer",
      "Improves immunity",
      "Improves body weight",
      "Easy to administer",
    ],
    packaging: "100 gms, 500 gms, 1 kg",
    composition: "Levamisole 30% W/w Soluble Powder",
  },
  {
    id: 5,
    slug: "stanmectin",
    name: "STANMECTIN",
    image: "/products/STANMECTIN.png",
    category: "Dairy",
    type: "Therapeutic",
    popularity: 96,
    isLatest: true,
    shortUsage: "Broad spectrum antiparasitic solution",
    description:
      "STANMECTIN is an ivermectin oral solution effective against internal and external parasites.",
    dosage: "1 ml per 4 kg body weight",
    usage: "Used against roundworms, lungworms, lice, and mange mites.",
    benefits: [
      "Broad-spectrum dewormer",
      "Improves productivity",
      "Controls endo & ecto parasites",
      "Relieves skin irritation",
    ],
    packaging: "100 ml, 500 ml, 1 Ltr",
    composition: "Ivermectin I.P. 0.8 mg",
  },
  {
    id: 6,
    slug: "rafosole",
    name: "RAFOSOLE",
    image: "/products/RAFOSOLE.png",
    category: "Dairy",
    type: "Therapeutic",
    popularity: 94,
    isLatest: false,
    shortUsage: "Flukicide and dewormer",
    description:
      "RAFOSOLE is a rafoxanide and levamisole oral drench for liver flukes and GI parasites.",
    dosage: "1 ml per 2 kg body weight",
    usage:
      "Used against liver flukes, trematodes, GI nematodes, and lungworms.",
    benefits: [
      "Improves weight gain",
      "Improves feed conversion",
      "Improves milk production",
      "Safe in pregnant animals",
    ],
    packaging: "250 ml, 500 ml, 1 Ltr",
    composition: "Rafoxanide I.P. 15 mg + Levamisole HCl I.P. 15 mg",
  },
  {
    id: 7,
    slug: "rafosole-ds",
    name: "RAFOSOLE-DS",
    image: "/products/RAFOSOLE-DS.png",
    category: "Dairy",
    type: "Therapeutic",
    popularity: 91,
    isLatest: false,
    shortUsage: "Double strength dewormer",
    description:
      "RAFOSOLE-DS is a double-strength antiparasitic oral drench for flukes and worms.",
    dosage: "1 ml per 4 kg body weight",
    usage: "Used against liver flukes, GI nematodes, and lungworms.",
    benefits: [
      "Improves milk production",
      "Improves feed conversion",
      "Safe in pregnant animals",
    ],
    packaging: "100 ml, 250 ml",
    composition: "Rafoxanide I.P. 30 mg + Levamisole HCl I.P. 30 mg",
  },
  {
    id: 8,
    slug: "rafosole-i",
    name: "RAFOSOLE-I",
    image: "/products/RAFOSOLE-1.png",
    category: "Sheep & Goat",
    type: "Therapeutic",
    popularity: 90,
    isLatest: true,
    shortUsage: "Advanced antiparasitic oral drench",
    description:
      "RAFOSOLE-I combines rafoxanide and ivermectin for broad parasite control.",
    dosage: "1 ml per 4 kg body weight",
    usage: "Used against flukes, GI nematodes, lungworms, mites, and flies.",
    benefits: [
      "Improves milk production",
      "Improves reproductive performance",
      "Improves feed conversion",
    ],
    packaging: "100 ml, 250 ml, 500 ml, 1 Ltr",
    composition: "Rafoxanide I.P. 30 mg + Ivermectin I.P. 1 mg",
  },
  {
    id: 9,
    slug: "rafosole-i-plus",
    name: "RAFOSOLE-I PLUS",
    image: "/products/RAFOSOLE-1 PLUS.png",
    category: "Sheep & Goat",
    type: "Therapeutic",
    popularity: 97,
    isLatest: true,
    shortUsage: "Premium broad spectrum antiparasitic",
    description:
      "RAFOSOLE-I PLUS is an advanced antiparasitic oral drench for internal and external parasites.",
    dosage: "1 ml per 5 kg body weight",
    usage: "Used against liver flukes, GI nematodes, mites, and flies.",
    benefits: [
      "Improves fertility",
      "Improves body weight",
      "Improves milk production",
      "Safe in lactating animals",
    ],
    packaging: "100 ml, 250 ml, 500 ml, 1 Ltr",
    composition: "Rafoxanide 3.5% W/v + Ivermectin 0.2% W/v",
  },
  {
    id: 10,
    slug: "oxysole-n",
    name: "OXYSOLE-N",
    image: "/products/OXYSOLE-N.png",
    category: "Dairy",
    type: "Therapeutic",
    popularity: 88,
    isLatest: false,
    shortUsage: "Flukicide and tapeworm treatment",
    description:
      "OXYSOLE-N is an oral suspension effective against liver flukes and tapeworms.",
    dosage: "1 ml per 15 kg body weight",
    usage: "Used against liver flukes, tapeworms, and amphistomes.",
    benefits: [
      "Improves appetite",
      "Improves milk production",
      "Improves body weight",
    ],
    packaging: "100 ml, 250 ml, 500 ml, 1 Ltr",
    composition: "Niclosamide 12% W/v + Oxyclozanide 3% W/v",
  },
  {
    id: 11,
    slug: "niclomax-plus",
    name: "NICLOMAX PLUS",
    image: "/products/NICLOMAX PLUS.png",
    category: "Poultry",
    type: "Therapeutic",
    popularity: 89,
    isLatest: true,
    shortUsage: "Broad spectrum cestocidal dewormer",
    description:
      "NICLOMAX PLUS is a broad-spectrum antiparasitic formulation for poultry and livestock.",
    dosage: "1 ml per 1.5 kg body weight",
    usage: "Used against intestinal tapeworms, cestodes, and GI nematodes.",
    benefits: [
      "Improves body weight gain",
      "Improves milk production",
      "Reduces mortality",
    ],
    packaging: "100 ml, 250 ml, 500 ml, 1 Ltr",
    composition: "Niclosamide I.P. 500 mg + Albendazole I.P. 150 mg",
  },
  {
    id: 12,
    slug: "clozomax",
    name: "CLOZOMAX",
    image: "/products/Clozomax.png",
    category: "Dairy",
    type: "Therapeutic",
    popularity: 93,
    isLatest: false,
    shortUsage: "Closantel oral solution",
    description:
      "CLOZOMAX is a closantel oral solution effective against liver flukes and blood sucking parasites.",
    dosage: "1 ml per 15 kg body weight",
    usage: "Used against fascioliasis and blood feeding parasites.",
    benefits: [
      "Improves appetite",
      "Improves body weight",
      "Improves milk yield",
      "Reduces anaemia",
    ],
    packaging: "30 ml, 100 ml, 250 ml, 500 ml",
    composition: "Closantel 15% W/v Oral Solution",
  },
];

export const featuredProducts = products
  .filter((product) => product.isLatest)
  .slice(0, 5);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
