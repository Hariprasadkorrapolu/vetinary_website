import { AboutClient } from "@/components/about/about-client";

export const metadata = {
  title: "About Us | Stanmax Laboratories Private Limited",
  description:
    "Learn about Stanmax Laboratories Private Limited, a GMP and ISO 9001:2015 certified animal healthcare leader serving India's veterinary and poultry industry since 1996.",
  keywords: [
    "About Stanmax Laboratories",
    "veterinary manufacturing India",
    "WHO-GMP animal health",
    "poultry nutrition",
    "dairy healthcare products",
    "cooperative milk union supplier",
  ],
  openGraph: {
    title: "About Us | Stanmax Laboratories Private Limited",
    description:
      "GMP & ISO 9001:2015 Certified Veterinary Healthcare Company Serving India's Veterinary and Poultry Industry Since 1996.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
