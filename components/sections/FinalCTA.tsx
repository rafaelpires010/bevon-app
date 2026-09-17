"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { ACT } from "@/components/three/config";
import { useAct } from "@/components/three/useAct";
import { CONTACT } from "@/lib/site-data";

const REASSURANCE = [
  { icon: Clock, text: "Resposta em até 1h no horário comercial" },
  { icon: MapPin, text: `${CONTACT.city}, ${CONTACT.state} · atendemos todo o Brasil` },
  { icon: Mail, text: CONTACT.email },
];

/** Fechamento do funil: uma única ação, sem distração concorrente. */
export function FinalCTA() {
  const ref = useAct<HTMLElement>(ACT.CONTACT);

  return (
    <section ref={ref} id="contato" className="relative z-10 px-4 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-black/50 px-6 py-16 text-center backdrop-blur-2xl md:px-14"
      >
        <h2 className="text-balance text-4xl font-bold leading-tight md:text-6xl">
          Vamos conversar sobre o{" "}
          <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
            seu projeto
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300/90">
          Conte o que você precisa. Em poucos minutos você recebe um caminho
          claro — sem proposta genérica e sem compromisso.
        </p>

        <div className="mt-10">
          <CTAButton
            context="um projeto para a minha empresa"
            className="px-10 py-5 text-lg"
          >
            <MessageCircle className="h-6 w-6" />
            Chamar no WhatsApp
          </CTAButton>
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
          {REASSURANCE.map(({ icon: Icon, text }) => (
            <li key={text} className="flex flex-col items-center gap-2 text-sm text-gray-400">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-balance">{text}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
