"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function WhatsAppCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const phoneNumber = "919505824365";
  const defaultMessage = "Hello STANMAX Team,\nI would like to know more about your veterinary healthcare products.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Inactivity tracking
  useEffect(() => {
    setIsMounted(true);
    const alreadyShown = sessionStorage.getItem("stanmax_wa_inactivity_bubble_shown");
    if (alreadyShown === "true") return;

    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (sessionStorage.getItem("stanmax_wa_inactivity_bubble_shown") === "true") return;

      inactivityTimer = setTimeout(() => {
        setShowBubble(true);
        sessionStorage.setItem("stanmax_wa_inactivity_bubble_shown", "true");
      }, 8000); // 8 seconds of inactivity
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"];

    resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  // Periodic pulse animation every 15 seconds
  useEffect(() => {
    if (isMobile) return;
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1500);
      return () => clearTimeout(timer);
    }, 15000);

    return () => clearInterval(pulseInterval);
  }, [isMobile]);

  // Footer collision detection
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
    };
  }, []);

  if (!isMounted) return null;

  const handleCloseBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowBubble(false);
  };

  const handleChatClick = () => {
    setShowBubble(false);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wa-float {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }
        .wa-float-active {
          animation: wa-float 4.5s ease-in-out infinite;
        }
        @media (max-width: 767px) {
          .wa-float-active {
            animation: none;
          }
        }
      `}} />

      <div
        className={`fixed z-[45] transition-all duration-500 ease-out select-none
          bottom-6 left-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-8
          flex flex-col-reverse md:flex-row items-start md:items-center gap-4
          ${isFooterVisible ? "bottom-[180px] md:translate-y-[-180px]" : "bottom-6 md:-translate-y-1/2"}
        `}
      >
        {/* WhatsApp Button Floater Wrapper */}
        <div className="wa-float-active relative group">
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowBubble(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex h-14 items-center bg-[#25D366] md:bg-[#25D366]/95 md:backdrop-blur-md border border-white/15 rounded-full shadow-[0_16px_48px_rgba(37,211,102,0.24)] hover:shadow-[0_24px_60px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer select-none"
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: (isMobile || !isPulsing) ? 1 : [1, 1.04, 1],
              width: isMobile ? 120 : (isHovered ? 250 : 56),
            }}
            transition={{
              x: { type: "spring", stiffness: 100, damping: 18, delay: 0.1 },
              opacity: { duration: 0.6, delay: 0.1 },
              width: { type: "spring", stiffness: 180, damping: 22 },
              scale: { duration: 1.5, ease: "easeInOut" },
            }}
          >
            {/* WhatsApp Logo Container - perfectly centered when collapsed */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center">
              {/* Official WhatsApp SVG (High Resolution, white) */}
              <svg
                viewBox="0 0 24 24"
                className="h-[34px] w-[34px] fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.411 1.451 5.437 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.115-2.883-6.979C17.18 1.9 14.707.877 12.008.877 6.57 0 2.148 4.42 2.144 9.865c-.001 1.926.501 3.81 1.456 5.424l-.995 3.638 3.725-.978zm11.387-5.464c-.307-.154-1.817-.897-2.097-.999-.28-.102-.484-.154-.688.154-.204.307-.79.999-.97 1.203-.18.204-.36.229-.667.076-1.12-.56-2.204-1.03-3.056-1.884-.712-.71-1.168-1.58-1.31-1.83-.14-.25-.016-.386.11-.512.11-.112.25-.291.375-.436.064-.075.109-.13.15-.19.06-.098.09-.17.14-.28.08-.15.04-.28-.02-.38-.06-.1-.56-1.36-.77-1.85-.205-.49-.412-.422-.567-.43-.14-.006-.307-.008-.47-.008-.164 0-.43.06-.656.307-.226.246-.862.843-.862 2.057s.884 2.385.999 2.54c.115.154 1.74 2.656 4.215 3.722.589.255 1.05.408 1.41.52.593.189 1.133.162 1.56.098.476-.071 1.488-.608 1.7-1.192.21-.584.21-1.085.147-1.192-.063-.107-.24-.16-.547-.315z" />
              </svg>
            </div>

            {/* Text and Status container */}
            <div className="flex flex-col justify-center pr-6 text-left select-none overflow-hidden shrink-0">
              {isMobile ? (
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                  </span>
                  <span className="text-sm font-bold text-white whitespace-nowrap">
                    Chat
                  </span>
                </div>
              ) : (
                isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-center"
                  >
                    <span className="text-[9px] font-semibold text-emerald-100 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                      </span>
                      Quick Response
                    </span>
                    <span className="text-sm font-bold text-white whitespace-nowrap leading-tight">
                      Chat with STANMAX
                    </span>
                  </motion.div>
                )
              )}
            </div>
          </motion.a>
        </div>

        {/* Advanced Premium Inactivity Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15, x: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-[300px] bg-white border border-slate-200/60 p-5 rounded-3xl shadow-[0_12px_40px_rgba(47,62,111,0.12)] md:bg-white/95 md:backdrop-blur-md flex flex-col gap-3 text-left relative"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseBubble}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                aria-label="Close message"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Status indicator inside bubble */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Online Support
                </span>
              </div>

              {/* Inactivity message text */}
              <p className="text-[14px] font-medium text-brand-blue leading-snug pr-4">
                Need help choosing the right veterinary product?
              </p>

              {/* Buttons inside bubble */}
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={handleChatClick}
                  className="bg-slateblue hover:bg-slateblue/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 shadow-soft hover:shadow-premium hover:-translate-y-0.5"
                >
                  Chat on WhatsApp
                </button>
                <button
                  onClick={handleCloseBubble}
                  className="text-slate-500 hover:text-slate-800 text-xs font-semibold px-3 py-2.5 rounded-full hover:bg-slate-100 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
