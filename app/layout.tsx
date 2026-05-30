import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EnquiryProvider } from "@/components/modals/enquiry-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Stanmax Laboratories Private Limited | Veterinary Pharmaceutical Solutions",
  description:
    "Premium veterinary, poultry, dairy, companion animal, and aqua health product solutions from Stanmax Laboratories Private Limited.",
  keywords: [
    "Stanmax Laboratories",
    "veterinary products",
    "poultry health",
    "dairy nutrition",
    "aqua products",
    "animal healthcare"
  ],
  openGraph: {
    title: "Stanmax Laboratories Private Limited",
    description: "Enterprise-grade veterinary and animal health product solutions.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <EnquiryProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </EnquiryProvider>
      </body>
    </html>
  );
}
