"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { waLink } from "@/lib/whatsapp";

/**
 * CTA persistente. Só aparece depois que o usuário passa da dobra —
 * antes disso o CTA do hero já está visível e o botão só competiria com ele.
 * No mobile vira barra inteira: alvo de toque muito maior.
 */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-4 bottom-4 z-50 md:inset-x-auto md:bottom-8 md:right-8"
        >
          <a
            href={waLink("um projeto para a minha empresa")}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="flutuante"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-white shadow-[0_0_40px_-6px_rgba(107,47,255,0.9)] transition-all duration-300 hover:bg-primary/90 md:w-auto md:hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            Falar no WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
