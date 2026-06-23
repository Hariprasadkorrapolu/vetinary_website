export const WHATSAPP_URL =
  "https://wa.me/919505824365?text=Hello%20STANMAX%20Team%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20veterinary%20healthcare%20products.";

export const CONTACT_DETAILS = {
  address:
    "2-24-86/3/1, Lakshminarayananagar Colony, IDA Uppal, Hyderabad, Telangana - 500 03",
  phone: "+91 95058 24365 (Primary)",
  phoneSecondary: "+91 97031 74365 (Secondary)",
  email: "contact@stanmaxlabs.com",
  mapQuery:
    "2-24-86/3/1, Lakshminarayananagar Colony, IDA Uppal, Hyderabad, Telangana - 500 03",
};

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@stanmax_labs",
    href: "https://www.instagram.com/stanmax_labs?igsh=MTNiY3gxNWc4ZXdvdQ==",
  },
  {
    label: "Facebook",
    handle: "Stanmax Laboratories",
    href: "https://www.facebook.com/stanmaxlabs",
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "News & Events", href: "/news-events" },
  { label: "Contact Us", href: "/contact" },
];

export const categories = [
  "Poultry",
  "Sheep & Goat",
] as const;

export const productTypes = [
  "Antibiotics",
  "Antiprotozoal",
  "Dewormers",
  "Vitamin Supplements",
  "Nutritional Supplements",
  "Feed Supplements",
  "Therapeutic",
  "Water Soluble",
] as const;

export const productTypesByCategory: Record<typeof categories[number], readonly typeof productTypes[number][]> = {
  Poultry: [
    "Antibiotics",
    "Antiprotozoal",
    "Dewormers",
    "Vitamin Supplements",
    "Nutritional Supplements",
    "Feed Supplements",
  ],
  "Sheep & Goat": [
    "Antibiotics",
    "Dewormers",
    "Vitamin Supplements",
    "Nutritional Supplements",
  ],
};
