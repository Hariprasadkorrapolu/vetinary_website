"use client";

import { AnimatePresence, motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { MessageCircle, X } from "lucide-react";
import { createContext, useContext, useMemo, useState } from "react";
import { WHATSAPP_URL } from "@/lib/constants";
import { db } from "@/lib/firebase";

type EnquiryContextValue = {
  openEnquiry: (productName?: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return context;
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const value = useMemo(
    () => ({
      openEnquiry: (name?: string) => {
        setProductName(name ?? "");
        setSubmitted(false);
        setErrors({});
        setIsSubmitting(false);
        setOpen(true);
      },
    }),
    [],
  );

  async function submit(form: HTMLFormElement) {
    if (isSubmitting) return;

    const formData = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const productName = String(formData.get("productName") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email))
      nextErrors.email = "Please enter a valid email.";
    if (!/^[0-9+\-\s]{8,15}$/.test(phone))
      nextErrors.phone = "Please enter a valid phone number.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Persist the enquiry in Firestore using Firebase v9 modular APIs.
        await addDoc(collection(db, "contact_enquiries"), {
          name,
          email,
          phone,
          productName,
          message,
          createdAt: serverTimestamp(),
        });

        form.reset();
        setSubmitted(true);
        setProductName("");
        window.alert("Inquiry submitted successfully.");
      } catch (error) {
        console.error("Failed to submit contact enquiry:", error);
        setErrors({
          form: "Unable to submit your inquiry right now. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/55 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 28, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="glass relative w-full max-w-2xl rounded-[2rem] border border-medical/50 p-6 shadow-premium sm:p-8 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button
                type="button"
                aria-label="Close enquiry form"
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white text-slateblue shadow-soft"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-w-lg">
                <p className="text-sm uppercase tracking-[0.18em] text-slateblue/70">
                  Contact Enquiry
                </p>
                <h2 className="mt-3 text-3xl tracking-tight text-ink">
                  Speak with Stanmax sales
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Share your requirement and our team will respond with product
                  and distribution support.
                </p>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
                  <h3 className="text-xl text-ink">
                    Inquiry Received Successfully
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Thank you for contacting Stanmax. Our team has received your
                    enquiry and will get back to you shortly with product and
                    distribution support.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm text-white transition hover:bg-[#202c52]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    submit(event.currentTarget);
                  }}
                  className="mt-8 grid gap-4 sm:grid-cols-2"
                >
                  <Field name="name" label="Name" error={errors.name} />
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    error={errors.email}
                  />
                  <Field name="phone" label="Phone" error={errors.phone} />
                  <Field
                    name="productName"
                    label="Product Name"
                    defaultValue={productName}
                  />
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-sm text-ink">Message</span>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-white/86 px-4 py-3 text-sm outline-none transition focus:border-slateblue"
                      placeholder="Tell us about your requirement"
                    />
                  </label>
                  {errors.form ? (
                    <p className="text-sm text-red-600 sm:col-span-2">
                      {errors.form}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm text-white transition hover:bg-[#202c52]"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm text-slateblue"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </EnquiryContext.Provider>
  );
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm text-ink">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white/86 px-4 text-sm outline-none transition focus:border-slateblue"
      />
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
