import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EnquiryProvider } from "@/components/modals/enquiry-provider";
import { WhatsAppCTA } from "@/components/layout/whatsapp-cta";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Stanmax Laboratories Private Limited | Veterinary Pharmaceutical Solutions",
  description:
    "Premium veterinary, poultry, sheep, goat, and dairy cattle health product solutions from Stanmax Laboratories Private Limited.",
  keywords: [
    "Stanmax Laboratories",
    "veterinary products",
    "poultry health",
    "dairy nutrition",
    "sheep and goat health",
    "animal healthcare",
  ],
  openGraph: {
    title: "Stanmax Laboratories Private Limited",
    description:
      "Enterprise-grade veterinary and animal health product solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <EnquiryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppCTA />
        </EnquiryProvider>
      </body>
    </html>
  );
}
