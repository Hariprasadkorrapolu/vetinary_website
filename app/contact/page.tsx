"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Headphones,
  History,
  Info,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  TrendingUp,
  User,
  X
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { CONTACT_DETAILS } from "@/lib/constants";

// Trust Badges Data
const trustBadges = [
  {
    icon: ShieldCheck,
    title: "GMP Certified",
    description: "Certified manufacturing facilities ensuring gold-standard quality.",
    iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10",
    highlight: false,
  },
  {
    icon: Award,
    title: "ISO 9001:2015",
    description: "Quality Management Systems certified for process excellence.",
    iconColor: "text-brand-blue bg-brand-blue/10 border-brand-blue/20 shadow-brand-blue/10",
    highlight: true,
  },
  {
    icon: History,
    title: "29+ Years",
    description: "Established in 1996, serving veterinary needs for nearly 3 decades.",
    iconColor: "text-brand-yellow bg-brand-yellow/10 border-brand-yellow/20 shadow-brand-yellow/10",
    highlight: true,
  },
  {
    icon: TrendingUp,
    title: "WHO-GMP Expansion",
    description: "Actively scaling operations to match global WHOGMP criteria.",
    iconColor: "text-brand-pink bg-brand-pink/10 border-brand-pink/20 shadow-brand-pink/10",
    highlight: true,
  },
  {
    icon: MapPin,
    title: "Trusted Nationwide",
    description: "Supplying veterinary healthcare solutions all across India.",
    iconColor: "text-brand-blue bg-brand-blue/10 border-brand-blue/20 shadow-brand-blue/10",
    highlight: false,
  },
  {
    icon: Headphones,
    title: "Fast Support",
    description: "Dedicated account managers for client assistance.",
    iconColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/10",
    highlight: false,
  },
];

// Response Time Data
const responseTimes = [
  {
    icon: Phone,
    channel: "Phone Support",
    time: "Immediate",
    description: "Quick connections for urgent assistance.",
    statusColor: "bg-emerald-500",
    badgeBg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  {
    icon: MessageCircle,
    channel: "WhatsApp Chat",
    time: "Within 2 Hours",
    description: "Fast responses for catalog & product info.",
    statusColor: "bg-[#25D366]",
    badgeBg: "bg-green-50 text-green-700 border border-green-200",
  },
  {
    icon: Mail,
    channel: "Email Inquiries",
    time: "Within 24 Hours",
    description: "Detailed proposals and corporate support.",
    statusColor: "bg-blue-400",
    badgeBg: "bg-blue-50 text-blue-700 border border-blue-200",
  },
];

// Routing configuration
const routingMap: Record<string, { team: string; email: string; description: string }> = {
  "Product Information": {
    team: "Product Team",
    email: "products@stanmaxlaboratories.com",
    description: "For questions about ingredients, packaging, and product brochures."
  },
  "Technical Support": {
    team: "Technical Team",
    email: "technical@stanmaxlaboratories.com",
    description: "For clinical files, analysis sheets, or animal health questions."
  },
  "Sales Inquiry": {
    team: "Sales Team",
    email: "sales@stanmaxlaboratories.com",
    description: "For price quotes, bulk discounts, and order processing."
  },
  "Partnership Opportunity": {
    team: "Business Development",
    email: "bizdev@stanmaxlaboratories.com",
    description: "For private labeling, custom formulations, and joint ventures."
  },
  "Distributor Inquiry": {
    team: "Distribution Team",
    email: "distribution@stanmaxlaboratories.com",
    description: "For wholesale pricing, regional rights, and channel support."
  },
  "General Inquiry": {
    team: "Customer Support",
    email: "support@stanmaxlaboratories.com",
    description: "For general company inquiries, office contact, and careers."
  }
};

// FAQ Data
const faqs = [
  {
    question: "How quickly will I receive a response?",
    answer: "For phone inquiries, support is immediate during corporate hours (9:00 AM - 6:00 PM, Mon - Sat). WhatsApp inquiries are answered within 2 hours, and official email inquiries/form submissions receive detailed replies within 24 business hours."
  },
  {
    question: "Do you support institutional and government procurement?",
    answer: "Yes. Stanmax Laboratories is a registered veterinary manufacturer that actively participates in institutional sales, state tenders, and government supply contracts across India. Contact our Sales Team directly for tender documentation and compliance files."
  },
  {
    question: "Can I request product brochures?",
    answer: "Certainly. You can choose 'Product Information' in the contact form or request full digital catalogs via WhatsApp. Our team will share detailed PDF brochures, product cards, and technical datasheets."
  },
  {
    question: "Do you provide distributor opportunities?",
    answer: "Yes, we are actively expanding our distribution network. If you are an veterinary distributor or pharmaceutical channel partner with established regional networks, please submit a 'Distributor Inquiry' to review vacant territories and margin structures."
  },
  {
    question: "How can I obtain technical product support?",
    answer: "You can submit a 'Technical Support' inquiry or email technical@stanmaxlaboratories.com. Our scientific team provides batch analysis reports, safety parameters, dosage advice, and veterinary consultation support."
  },
  {
    question: "Can I schedule a business meeting?",
    answer: "Yes. Use our 'Schedule a Call' button on this page to pick a convenient date and time slot, or visit our headquarters in Hyderabad. We recommend scheduling in advance for proper team routing."
  }
];

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    emailAddress: "",
    inquiryType: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Modal Schedule state
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    name: "",
    phone: "",
    date: "",
    timeSlot: "10:00 AM - 11:00 AM",
    topic: "Sales Inquiry"
  });
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  // WhatsApp configuration
  const whatsappUrl = "https://wa.me/919505824365?text=" + encodeURIComponent(
    "Hello STANMAX Team,\nI would like to know more about your veterinary healthcare products."
  );

  // Real-time Validation Engine
  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "firstName" && value.trim().length < 2) {
      error = "First name must be at least 2 characters.";
    } else if (name === "lastName" && value.trim().length < 2) {
      error = "Last name must be at least 2 characters.";
    } else if (name === "emailAddress") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "Email address is required.";
      } else if (!emailRegex.test(value)) {
        error = "Please enter a valid email address.";
      }
    } else if (name === "phoneNumber") {
      const phoneRegex = /^\+?[0-9\s\-]{10,15}$/;
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!phoneRegex.test(value.replace(/\s+/g, ""))) {
        error = "Please enter a valid 10-15 digit phone number.";
      }
    } else if (name === "inquiryType" && !value) {
      error = "Please select an inquiry type.";
    } else if (name === "message") {
      if (value.trim().length < 10) {
        error = "Message must be at least 10 characters.";
      } else if (value.length > 1000) {
        error = "Message cannot exceed 1000 characters.";
      }
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touchedFields[name]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger validation on all fields
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    Object.keys(formData).forEach(key => {
      const val = formData[key as keyof typeof formData];
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
      newTouched[key] = true;
    });

    setFormErrors(newErrors);
    setTouchedFields(newTouched);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitSuccess(true);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      phoneNumber: "",
      emailAddress: "",
      inquiryType: "",
      message: ""
    });
    setFormErrors({});
    setTouchedFields({});
    setIsSubmitSuccess(false);
  };

  // Schedule Call Submit
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleData.name || !scheduleData.phone || !scheduleData.date) {
      alert("Please fill in all required fields.");
      return;
    }
    setScheduleSuccess(true);
    setTimeout(() => {
      setIsScheduleOpen(false);
      setScheduleSuccess(false);
      setScheduleData({
        name: "",
        phone: "",
        date: "",
        timeSlot: "10:00 AM - 11:00 AM",
        topic: "Sales Inquiry"
      });
    }, 2500);
  };

  return (
    <div className="pt-20 lg:pt-28">

      {/* SECTION 1: TRUST & CREDIBILITY BAR */}
      <section className="relative bg-white border-y border-slate-100 py-16 overflow-hidden">
        {/* Soft Background Glow */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-pink">Quality & Experience Assured</span>
            <h2 className="text-3xl mt-2 tracking-tight text-brand-blue font-heading font-bold">Veterinary Standards You Can Trust</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 items-stretch">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className={`relative flex flex-col items-center text-center p-6 rounded-[2rem] bg-white/70 border backdrop-blur-md shadow-soft hover:shadow-premium hover:bg-white hover:border-brand-blue/10 transition-all duration-300 group
                    ${badge.highlight ? 'border-brand-yellow/30 bg-gradient-to-b from-brand-yellow/5 to-white/70 shadow-soft' : 'border-slate-100'}
                  `}
                >
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 inset-x-8 h-1 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100
                    ${badge.highlight ? 'bg-brand-yellow' : 'bg-brand-blue'}
                  `} />

                  {/* Icon Badge */}
                  <div className={`grid h-16 w-16 place-items-center rounded-full mb-6 border transition-transform duration-500 group-hover:scale-110 shadow-lg ${badge.iconColor}`}>
                    <Icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[8deg]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-base font-bold leading-tight mb-2 font-heading transition-colors duration-300
                    ${badge.highlight ? 'text-brand-blue scale-102 font-extrabold' : 'text-slate-800'}
                  `}>
                    {badge.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {badge.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 2 & 3 & 4: RESPONSE TIMINGS, CONTACT CARDS & QUICK CTAs */}
      <section className="section-pad bg-mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            
            {/* Left side: Response Times + Quick Action Hub */}
            <div className="flex flex-col gap-10">
              
              {/* SECTION 2: Response Timings */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-pink/90 mb-3">Service Level Guarantees</p>
                <h2 className="text-3xl text-brand-blue mb-6">Designed For Rapid Response</h2>
                
                <div className="grid gap-5 sm:grid-cols-3">
                  {responseTimes.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="flex h-3 w-3 relative">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${item.statusColor}`}></span>
                              <span className={`relative inline-flex rounded-full h-3 w-3 ${item.statusColor}`}></span>
                            </span>
                            <div className="p-2 rounded-xl bg-slate-50 text-brand-blue">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>
                          <h3 className="text-sm font-bold text-brand-blue">{item.channel}</h3>
                          <p className="text-xs text-slate-500 mt-1.5">{item.description}</p>
                        </div>
                        <div className="mt-5">
                          <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${item.badgeBg}`}>
                            {item.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: Quick Contact CTAs */}
              <div className="bg-brand-blue/5 border border-brand-blue/10 p-6 sm:p-8 rounded-[2.5rem]">
                <h3 className="text-2xl text-brand-blue mb-2">Prefer a Quick Action?</h3>
                <p className="text-sm text-slate-600 mb-6">Choose any path below to connect with us in seconds.</p>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* WhatsApp CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba56] text-white p-4 rounded-2xl shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm justify-center sm:justify-start"
                  >
                    <MessageCircle className="h-5 w-5 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  {/* Call Now */}
                  <a
                    href="tel:+919505824365"
                    className="flex items-center gap-3 bg-brand-blue hover:bg-brand-blue/90 text-white p-4 rounded-2xl shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm justify-center sm:justify-start"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </a>

                  {/* Schedule Call */}
                  <button
                    onClick={() => setIsScheduleOpen(true)}
                    className="flex items-center gap-3 bg-white border border-slate-200 hover:border-brand-blue/30 text-brand-blue p-4 rounded-2xl shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm justify-center sm:justify-start"
                  >
                    <Calendar className="h-5 w-5 text-brand-pink" />
                    <span>Schedule a Call</span>
                  </button>

                  {/* Send Email */}
                  <a
                    href="mailto:info@stanmaxlaboratories.com"
                    className="flex items-center gap-3 bg-white border border-slate-200 hover:border-brand-blue/30 text-brand-blue p-4 rounded-2xl shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm justify-center sm:justify-start"
                  >
                    <Mail className="h-5 w-5 text-brand-yellow" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side: Section 3 Enhanced Contact Cards */}
            <div className="flex flex-col gap-6">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-pink/90">Official Channels</p>
              <h2 className="text-3xl text-brand-blue">Contact Information</h2>

              {/* Call Cards */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all duration-300 relative group">
                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active Desk
                </div>

                <div className="flex gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-brand-blue shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-brand-blue">Phone Channels</h3>
                    <div className="mt-4 space-y-3">
                      <div>
                        <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">Primary Desk</span>
                        <a href="tel:+919505824365" className="text-lg font-semibold text-brand-blue hover:text-brand-pink transition-colors">
                          +91 95058 24365
                        </a>
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">Secondary Desk</span>
                        <a href="tel:+919703174365" className="text-lg font-semibold text-brand-blue hover:text-brand-pink transition-colors">
                          +91 97031 74365
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all duration-300 relative group">
                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Replies in 24h
                </div>

                <div className="flex gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-50 text-brand-yellow shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-brand-blue">Email Support</h3>
                    <div className="mt-4">
                      <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">Business & Support</span>
                      <a href="mailto:info@stanmaxlaboratories.com" className="text-lg font-semibold text-brand-blue hover:text-brand-pink transition-colors block break-all mt-1">
                        info@stanmaxlaboratories.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-premium transition-all duration-300 relative group">
                <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  Open (Mon-Sat)
                </div>

                <div className="flex gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-brand-pink shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-brand-blue">Corporate Office</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {CONTACT_DETAILS.address}
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Stanmax+Laboratories+IDA+Uppal+Hyderabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-pink mt-4 group/btn transition-colors"
                    >
                      Get Directions
                      <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 & 6 & 7: ADVANCED CONTACT FORM, SMART ROUTING & PRIVACY */}
      <section id="contact-form-section" className="section-pad bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            
            {/* Form Side */}
            <div className="bg-slate-50 border border-slate-100 p-5 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSubmitSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-5 sm:grid-cols-2 relative z-10"
                  >
                    <div className="sm:col-span-2">
                      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-pink">Priority Dispatch</span>
                      <h3 className="text-2xl mt-1 text-brand-blue">Send an Official Inquiry</h3>
                      <p className="text-xs text-slate-500 mt-1">Fill out the secure form below. Your message will be routed in real-time.</p>
                    </div>

                    {/* First Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="firstName" className="text-xs font-bold text-brand-blue">First Name *</label>
                      <div className="relative">
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`h-12 w-full rounded-xl border bg-white px-4 py-2 pr-10 text-sm outline-none transition-all duration-300
                            ${touchedFields.firstName && formErrors.firstName ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200" : ""}
                            ${touchedFields.firstName && !formErrors.firstName ? "border-emerald-300 focus:border-emerald-500" : "border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/15"}
                          `}
                          placeholder="John"
                        />
                        {touchedFields.firstName && (
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            {formErrors.firstName ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-emerald-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {touchedFields.firstName && formErrors.firstName && (
                        <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lastName" className="text-xs font-bold text-brand-blue">Last Name *</label>
                      <div className="relative">
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`h-12 w-full rounded-xl border bg-white px-4 py-2 pr-10 text-sm outline-none transition-all duration-300
                            ${touchedFields.lastName && formErrors.lastName ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200" : ""}
                            ${touchedFields.lastName && !formErrors.lastName ? "border-emerald-300 focus:border-emerald-500" : "border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/15"}
                          `}
                          placeholder="Doe"
                        />
                        {touchedFields.lastName && (
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            {formErrors.lastName ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-emerald-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {touchedFields.lastName && formErrors.lastName && (
                        <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.lastName}</p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label htmlFor="companyName" className="text-xs font-bold text-brand-blue">Company Name (Optional)</label>
                      <div className="relative">
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/15 transition-all"
                          placeholder="e.g. VetCare Distributors"
                        />
                        <Building2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="emailAddress" className="text-xs font-bold text-brand-blue">Email Address *</label>
                      <div className="relative">
                        <input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`h-12 w-full rounded-xl border bg-white px-4 py-2 pr-10 text-sm outline-none transition-all duration-300
                            ${touchedFields.emailAddress && formErrors.emailAddress ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200" : ""}
                            ${touchedFields.emailAddress && !formErrors.emailAddress ? "border-emerald-300 focus:border-emerald-500" : "border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/15"}
                          `}
                          placeholder="john@example.com"
                        />
                        {touchedFields.emailAddress && (
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            {formErrors.emailAddress ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-emerald-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {touchedFields.emailAddress && formErrors.emailAddress && (
                        <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.emailAddress}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phoneNumber" className="text-xs font-bold text-brand-blue">Phone Number *</label>
                      <div className="relative">
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`h-12 w-full rounded-xl border bg-white px-4 py-2 pr-10 text-sm outline-none transition-all duration-300
                            ${touchedFields.phoneNumber && formErrors.phoneNumber ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200" : ""}
                            ${touchedFields.phoneNumber && !formErrors.phoneNumber ? "border-emerald-300 focus:border-emerald-500" : "border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/15"}
                          `}
                          placeholder="+91 XXXXX XXXXX"
                        />
                        {touchedFields.phoneNumber && (
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            {formErrors.phoneNumber ? (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-emerald-500" />
                            )}
                          </div>
                        )}
                      </div>
                      {touchedFields.phoneNumber && formErrors.phoneNumber && (
                        <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.phoneNumber}</p>
                      )}
                    </div>

                    {/* SECTION 6: Inquiry Type Dropdown with Smart Routing */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label htmlFor="inquiryType" className="text-xs font-bold text-brand-blue">Inquiry Type *</label>
                      <div className="relative">
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`h-12 w-full rounded-xl border bg-white px-4 py-2 pr-10 text-sm outline-none appearance-none transition-all duration-300
                            ${touchedFields.inquiryType && formErrors.inquiryType ? "border-red-400 focus:border-red-500" : ""}
                            ${touchedFields.inquiryType && !formErrors.inquiryType ? "border-emerald-300 focus:border-emerald-500" : "border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/15"}
                          `}
                        >
                          <option value="">-- Select Inquiry Type --</option>
                          {Object.keys(routingMap).map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                      {touchedFields.inquiryType && formErrors.inquiryType && (
                        <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.inquiryType}</p>
                      )}

                      {/* Smart Routing Information Display */}
                      <AnimatePresence>
                        {formData.inquiryType && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-brand-blue/5 border border-brand-blue/10 p-3.5 rounded-xl mt-2 flex items-start gap-2.5"
                          >
                            <Info className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                            <div className="text-[12px] leading-relaxed text-slate-600">
                              <span className="font-semibold text-brand-blue">Smart Routing:</span> Your inquiry will go to our{" "}
                              <span className="font-bold text-brand-pink uppercase tracking-wider text-[11px]">
                                {routingMap[formData.inquiryType].team}
                              </span>{" "}
                              ({routingMap[formData.inquiryType].email}).
                              <p className="text-slate-500 mt-1 text-[11.5px] italic">
                                {routingMap[formData.inquiryType].description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Area */}
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="message" className="text-xs font-bold text-brand-blue">Your Message *</label>
                        <span className={`text-[10px] font-semibold tracking-wider ${formData.message.length > 1000 ? "text-red-500" : "text-slate-400"}`}>
                          {formData.message.length} / 1000 Characters
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          rows={4}
                          className={`w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm outline-none resize-none transition-all duration-300
                            ${touchedFields.message && formErrors.message ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-200" : ""}
                            ${touchedFields.message && !formErrors.message ? "border-emerald-300 focus:border-emerald-500" : "border-slate-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/15"}
                          `}
                          placeholder="Please describe your requirements, animal category, or partnership query..."
                        />
                      </div>
                      {touchedFields.message && formErrors.message && (
                        <p className="text-[11px] text-red-500 font-medium mt-0.5">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Form Submit Buttons */}
                    <div className="sm:col-span-2 mt-3 flex items-center justify-between gap-4 flex-wrap">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-brand-blue hover:bg-brand-blue/90 disabled:bg-brand-blue/50 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Routing Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Inquire Message
                          </>
                        )}
                      </button>

                      {/* Mini Security Badge */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Lock className="h-3.5 w-3.5 text-slate-300" />
                        SSL Secure Connection
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-10 px-4"
                  >
                    <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-soft">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>
                    <h3 className="text-3xl text-brand-blue mb-3">Inquiry Dispatched Successfully</h3>
                    <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                      Thank you for reaching out, <span className="font-semibold">{formData.firstName}</span>. Your message has been routed to our{" "}
                      <span className="font-bold text-brand-pink uppercase tracking-wider text-[12px]">
                        {routingMap[formData.inquiryType]?.team || "Customer Support"}
                      </span>.
                    </p>
                    
                    <div className="bg-slate-100 border border-slate-200/50 p-4 rounded-2xl w-full max-w-sm mt-6 text-left text-xs text-slate-500 space-y-1">
                      <p><strong>Routing Destination:</strong> {routingMap[formData.inquiryType]?.email}</p>
                      <p><strong>Tracking status:</strong> Queue priority - High</p>
                      <p><strong>Target SLA:</strong> Review & Response within 2 hours</p>
                    </div>

                    <button
                      onClick={resetForm}
                      className="mt-8 text-xs font-bold text-brand-blue hover:text-brand-pink transition-colors border-b border-brand-blue hover:border-brand-pink pb-0.5"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Privacy Box & Trust Card */}
            <div className="flex flex-col justify-between gap-8">
              
              {/* SECTION 7: Security & Privacy Trust Box */}
              <div className="bg-slate-50 border border-slate-100 p-5 sm:p-8 rounded-[2rem] flex flex-col justify-center">
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-blue text-white shrink-0 shadow-[0_8px_20px_rgba(47,62,111,0.2)]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-blue mb-1.5">Your Information is Secure</h4>
                    <p className="text-sm leading-relaxed text-slate-600">
                      We strictly respect your privacy. All incoming inquiries are encrypted, processed in accordance with privacy laws, and used solely to address your specific veterinary healthcare needs.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="bg-slate-200/50 px-2 py-1 rounded">No Spam</span>
                      <span className="bg-slate-200/50 px-2 py-1 rounded">No Third-party Sharing</span>
                      <span className="bg-slate-200/50 px-2 py-1 rounded">GDPR Compliant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory Assurance Callout */}
              <div className="bg-gradient-to-br from-brand-blue to-[#202c52] text-white p-5 sm:p-8 rounded-[2rem] shadow-premium relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500" />
                <h4 className="text-xl font-bold mb-3">Looking for Distribution?</h4>
                <p className="text-sm leading-relaxed text-white/80 mb-6">
                  Stanmax Laboratories partners with verified veterinary distributors, stockists, and government agents nationwide to deliver certified livestock formulations.
                </p>
                <a
                  href="#contact-form-section"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, inquiryType: "Distributor Inquiry" }));
                    setTouchedFields(prev => ({ ...prev, inquiryType: true }));
                  }}
                  className="bg-brand-yellow hover:bg-[#d6aa3c] text-brand-blue text-xs font-bold px-5 py-3 rounded-full transition-all duration-300 inline-block shadow-soft"
                >
                  Apply as Distributor
                </a>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 8: INTERACTIVE GOOGLE MAP */}
      <section className="section-pad bg-mist">
        <Container>
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-blue/70">Geographic Headquarters</span>
            <h2 className="text-3xl text-brand-blue mt-1">Our Manufacturing & Admin Base</h2>
          </div>
          
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 bg-white shadow-premium min-h-[320px] sm:min-h-[500px] flex flex-col justify-end">
            
            {/* The Google Map Embed */}
            <iframe
              title="Stanmax location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.135061614051!2d78.56066277596043!3d17.405364102237887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9ebf66bbd097%3A0x6e9f1a236df7654!2sIDA%20Uppal%2C%20Uppal%20Industrial%20Area%2C%20Uppal%2C%20Hyderabad%2C%20Telangana%20500039!5e0!3m2!1sen!2sin!4v1715668903332!5m2!1sen!2sin"
              className="absolute inset-0 h-full w-full border-0 z-0"
              allowFullScreen={false}
              loading="lazy"
            />
            
            {/* Location details card floating on top of the Map */}
            <div className="relative z-10 m-4 sm:m-8 max-w-sm bg-white/95 backdrop-blur-md border border-slate-200/60 p-4 sm:p-7 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-wider mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                </span>
                Headquarters
              </span>
              <h3 className="text-lg font-bold text-brand-blue leading-tight mb-2">STANMAX LABORATORIES PVT LTD</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                2-24-86/3/1, Lakshminarayananagar Colony, IDA Uppal, Hyderabad, Telangana - 500039, India.
              </p>
              
              <div className="flex gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Stanmax+Laboratories+IDA+Uppal+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-blue hover:bg-[#202c52] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 inline-block shadow-soft"
                >
                  Get Directions
                </a>
                <a
                  href="tel:+919505824365"
                  className="border border-slate-200 hover:border-brand-blue/30 text-brand-blue text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-slate-100 transition-all duration-300 inline-block"
                >
                  Call Office
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 9: FAQ ACCORDION SECTION */}
      <section className="section-pad bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-pink">FAQ Guide</span>
              <h2 className="text-3xl text-brand-blue mt-1">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-500 mt-2">Get quick answers regarding lead times, tenders, packaging, and business relations.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border border-slate-100 rounded-2xl bg-slate-50/70 overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-brand-blue hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm font-bold leading-snug">{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-brand-blue shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="border-t border-slate-100/50 bg-white"
                        >
                          <div className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section className="bg-brand-blue text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/95 to-brand-pink/30" />
        <Container className="relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
            Let's Build Better Animal Health Together
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            Our team is ready to assist with product information, technical guidance, business partnerships, and distribution opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba56] text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5 fill-white" />
              Chat on WhatsApp
            </a>
            
            <a
              href="tel:+919505824365"
              className="w-full sm:w-auto bg-brand-yellow hover:bg-[#d6aa3c] text-brand-blue px-8 py-3.5 rounded-full font-semibold text-sm shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <a
              href="#contact-form-section"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Send Inquiry
            </a>
          </div>
        </Container>
      </section>

      {/* SCHEDULE A CALL DIALOG MODAL */}
      <AnimatePresence>
        {isScheduleOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScheduleOpen(false)}
              className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl shadow-premium border border-slate-100 max-w-md w-full p-6 sm:p-8 z-10"
            >
              <button
                onClick={() => setIsScheduleOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>

              <AnimatePresence mode="wait">
                {!scheduleSuccess ? (
                  <form onSubmit={handleScheduleSubmit} className="space-y-4">
                    <div className="text-left mb-2">
                      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-pink">Interactive Scheduler</span>
                      <h4 className="text-xl text-brand-blue mt-0.5">Schedule a Callback</h4>
                      <p className="text-xs text-slate-500 mt-1">Pick a convenient slot. An officer will call you directly.</p>
                    </div>

                    <div>
                      <label htmlFor="schedName" className="block text-xs font-bold text-brand-blue mb-1">Your Name *</label>
                      <input
                        id="schedName"
                        type="text"
                        required
                        value={scheduleData.name}
                        onChange={(e) => setScheduleData(prev => ({ ...prev, name: e.target.value }))}
                        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-blue transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="schedPhone" className="block text-xs font-bold text-brand-blue mb-1">Callback Phone *</label>
                      <input
                        id="schedPhone"
                        type="tel"
                        required
                        value={scheduleData.phone}
                        onChange={(e) => setScheduleData(prev => ({ ...prev, phone: e.target.value }))}
                        className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-blue transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="schedDate" className="block text-xs font-bold text-brand-blue mb-1">Preferred Date *</label>
                        <input
                          id="schedDate"
                          type="date"
                          required
                          value={scheduleData.date}
                          onChange={(e) => setScheduleData(prev => ({ ...prev, date: e.target.value }))}
                          className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs outline-none focus:border-brand-blue transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="schedTime" className="block text-xs font-bold text-brand-blue mb-1">Time Slot *</label>
                        <select
                          id="schedTime"
                          value={scheduleData.timeSlot}
                          onChange={(e) => setScheduleData(prev => ({ ...prev, timeSlot: e.target.value }))}
                          className="h-10 w-full rounded-xl border border-slate-200 px-2 text-xs outline-none focus:border-brand-blue transition-all"
                        >
                          <option>10:00 AM - 11:00 AM</option>
                          <option>11:00 AM - 12:00 PM</option>
                          <option>12:00 PM - 01:00 PM</option>
                          <option>02:00 PM - 03:00 PM</option>
                          <option>03:00 PM - 04:00 PM</option>
                          <option>04:00 PM - 05:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="schedTopic" className="block text-xs font-bold text-brand-blue mb-1">Discussion Topic</label>
                      <select
                        id="schedTopic"
                        value={scheduleData.topic}
                        onChange={(e) => setScheduleData(prev => ({ ...prev, topic: e.target.value }))}
                        className="h-10 w-full rounded-xl border border-slate-200 px-2 text-sm outline-none focus:border-brand-blue transition-all"
                      >
                        <option>Product Inquiry</option>
                        <option>Sales Inquiry</option>
                        <option>Distributor Inquiry</option>
                        <option>Technical Support</option>
                        <option>General Meeting</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-sm py-2.5 rounded-xl shadow-soft transition-all mt-4"
                    >
                      Confirm Booking Slot
                    </button>
                  </form>
                ) : (
                  <motion.div
                    key="sched-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-8 text-center flex flex-col items-center"
                  >
                    <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 stroke-[3]" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-blue">Callback Confirmed!</h4>
                    <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
                      Thank you, <span className="font-semibold text-slate-700">{scheduleData.name}</span>. We will call you on <span className="font-semibold text-slate-700">{scheduleData.date}</span> at <span className="font-semibold text-slate-700">{scheduleData.timeSlot}</span>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
