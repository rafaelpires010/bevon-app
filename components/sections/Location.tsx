"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

/**
 * Onde estamos.
 *
 * Volta do modelo antigo praticamente como era — mapa escurecido, alfinete
 * pulsando no centro e o cartão flutuante no canto. Duas mudanças: a animação
 * de entrada passou a ser a mesma das outras seções (o AnimatedSection que ela
 * usava não existe mais), e a cidade vem de CONTACT em vez de estar escrita no
 * componente.
 */
export function Location() {
  const city = `${CONTACT.city}, ${CONTACT.state}`;

  return (
    <section id="local" className="relative z-10 overflow-hidden px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Onde estamos
          </span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            De {CONTACT.city} para{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              todo o Brasil
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Time local, reunião no seu fuso e resposta no mesmo dia útil.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="group relative mt-16 h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {/*
            O mapa vem invertido e sem cor de propósito: o embed do Google é
            claro, e claro no meio de uma página escura é um buraco de luz.
            `loading="lazy"` porque isto é um iframe de terceiro no fim da
            página — carregar junto com o resto atrasaria o que converte.
          */}
          <iframe
            title={`Mapa de ${city}`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240097.00537299068!2d-44.14777978253637!3d-19.90266148819076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690a165324289%3A0x112170c9379de7b3!2sBelo%20Horizonte%2C%20MG!5e0!3m2!1sen!2sbr!4v1710000000000!5m2!1sen!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 opacity-80 transition-opacity duration-500 hover:opacity-100"
          />

          {/* Alfinete no centro. pointer-events-none para não roubar o
              arrasto do mapa de quem quiser explorar. */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex flex-col items-center">
              <div className="absolute -inset-4 animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_20px_rgba(168,85,247,0.6)]">
                <MapPin size={24} fill="currentColor" />
              </div>
              <div className="mt-2 whitespace-nowrap rounded-full border border-primary/30 bg-black/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                {CONTACT.city}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 z-10">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/90 px-6 py-3 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/50">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-bold text-white">{city}</p>
                <p className="text-xs text-primary">Base de operações</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
