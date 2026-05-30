export const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=919246188013&text=Hello%20Stanmax%20Laboratories%2C%20I%20would%20like%20to%20know%20more%20about%20your%20veterinary%20product%20solutions.";

export const CONTACT_DETAILS = {
  address: "2-24-86/3/1, Lakshminarayananagar Colony, IDA Uppal, Hyderabad, Telangana - 500 03",
  phone: "+91 92461 88013",
  email: "contact@stanmaxlabs.com",
  mapQuery:
    "2-24-86/3/1, Lakshminarayananagar Colony, IDA Uppal, Hyderabad, Telangana - 500 03"
};

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@stanmaxlabs",
    href: "https://www.instagram.com/stanmaxlabs"
  },
  {
    label: "Facebook",
    handle: "Stanmax Laboratories",
    href: "https://www.facebook.com/stanmaxlabs"
  }
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "News & Events", href: "/news-events" },
  { label: "Contact Us", href: "/contact" }
];

export const categories = ["Poultry", "Dog & Cat", "Sheep & Goat", "Dairy", "Aqua"] as const;

export const productTypes = ["Nutrition", "Supplement", "Therapeutic", "Water Soluble"] as const;
