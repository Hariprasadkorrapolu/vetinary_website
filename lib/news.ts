export type NewsItem = {
  slug: string;
  title: string;
  category: "Awards" | "Exhibition" | "Events" | "Company News" | "Product Launch";
  date: string;
  location?: string;
  image: string;
  excerpt: string;
  content: string[];
  highlights: string[];
};

export const newsItems: NewsItem[] = [
  {
    slug: "pharma-leader-of-the-year-2025-26",
    title: "Pharma Leader of the Year 2025–26",
    category: "Awards",
    date: "30th May 2026",
    location: "Hyderabad, India",
    image: "/news/pharmaleader.jpg",
    excerpt: "Stanmax Laboratories MD, Mr. Sravan Kumar Ghanukota, honored with the prestigious 'Pharma Leader of the Year' award by the Hyderabad Management Association.",
    content: [
      "Stanmax Laboratories proudly congratulates our Managing Director, Mr. Sravan Kumar Ghanukota, on receiving the prestigious 'Pharma Leader of the Year – 2025–26' award from the Hyderabad Management Association (HMA) on 30th May 2026. This esteemed recognition celebrates his visionary leadership and significant contributions to the veterinary pharmaceutical sector.",
      "Under his guidance, Stanmax Laboratories has consistently driven innovation, scaled its manufacturing capabilities, and expanded access to gold-standard animal healthcare solutions across India. The award ceremony highlighted his dedication to elevating industry standards and fostering sustainable livestock development.",
      "The Hyderabad Management Association's annual awards recognize outstanding leaders who have demonstrated exceptional business acumen and a commitment to society. This milestone reinforces Stanmax's position as a trusted leader in veterinary pharmaceuticals, dedicated to quality, innovation, and client satisfaction."
    ],
    highlights: [
      "Awarded by the prestigious Hyderabad Management Association (HMA).",
      "Celebrates visionary leadership in the veterinary pharmaceutical sector.",
      "Highlights a commitment to gold-standard quality and sustainable animal healthcare."
    ]
  },
  {
    slug: "india-poultry-expo-2025-hyderabad",
    title: "India Poultry Expo 2025 – Hyderabad",
    category: "Exhibition",
    date: "26th to 28th November 2025",
    location: "Hyderabad, India",
    image: "/news/expo-2025.jpg",
    excerpt: "Stanmax Laboratories proudly showcased its latest veterinary and poultry healthcare innovations at the India Poultry Expo 2025 in Hyderabad.",
    content: [
      "Stanmax Laboratories Pvt. Ltd. proudly participated in the India Poultry Expo 2025, held in Hyderabad from 26th to 28th November 2025. As one of the country's premier poultry industry exhibitions, the event served as a vital platform for showcasing our latest veterinary advancements and therapeutic formulations.",
      "Our delegation engaged in deep discussions with customers, regional distributors, and veterinary professionals from across India, discussing innovative herd health management and sustainable farming practices. We also welcomed international delegates, exploring export opportunities and global business partnerships.",
      "Our participation reinforces Stanmax's long-standing commitment to delivering high-quality, research-backed formulations that support animal welfare, improve feed conversion, and enhance farm productivity."
    ],
    highlights: [
      "Successfully showcased our latest veterinary and poultry healthcare products.",
      "Connected with customers, distributors, and industry professionals from across India.",
      "Welcomed delegates from multiple countries and explored international business opportunities.",
      "Conducted productive discussions on innovative animal healthcare solutions and sustainable poultry farming.",
      "Strengthened existing partnerships while establishing valuable new business relationships.",
      "Reinforced Stanmax Laboratories' commitment to quality, innovation, and customer-centric solutions in the veterinary and poultry healthcare sector."
    ]
  },
  {
    slug: "india-poultry-expo-2023-namakkal",
    title: "India Poultry Expo 2023 – Namakkal",
    category: "Exhibition",
    date: "2023",
    location: "Namakkal, Tamil Nadu, India",
    image: "/news/expo-2023.jpg",
    excerpt: "Stanmax Laboratories demonstrated its comprehensive poultry healthcare range at the India Poultry Expo 2023 in Namakkal, Tamil Nadu.",
    content: [
      "Stanmax Laboratories Pvt. Ltd. proudly participated in the India Poultry Expo 2023, held in Namakkal, Tamil Nadu, the poultry hub of Southern India. This regional exhibition was an exceptional venue to present our complete poultry portfolio, from specialized dewormers to vitamin and mineral feed supplements.",
      "Our team engaged with leading veterinarians, researchers, and poultry integrators from across the country, sharing insights on flock health management, disease prevention, and farm efficiency. The event helped us consolidate our strong presence in Southern India and forge new commercial alliances.",
      "By showcasing our products in Namakkal, Stanmax continues to build on its mission to empower poultry farmers with premium, reliable formulations that ensure flock health and operational sustainability."
    ],
    highlights: [
      "Successfully showcased Stanmax's complete range of poultry healthcare products.",
      "Strengthened relationships with customers, distributors, and poultry integrators.",
      "Engaged with veterinarians, researchers, and industry experts from across India.",
      "Explored new business opportunities and strategic partnerships.",
      "Demonstrated our commitment to innovation, quality, and sustainable poultry farming.",
      "Reinforced Stanmax Laboratories' growing presence in the Indian poultry healthcare sector."
    ]
  }
];
