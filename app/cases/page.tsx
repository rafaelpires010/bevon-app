"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CLIENTS } from "@/lib/site-data";

/**
 * Rota desativada no middleware.ts.
 * Os cases anteriores eram fabricados (empresas, números e depoimentos
 * inventados sobre fotos de banco de imagens) — substituídos pelos
 * projetos reais de lib/site-data.ts.
 */
export default function CasesPage() {
  return (
    <main className="relative text-white">
      <PageHero
        eyebrow="Projetos"
        title="Trabalhos"
        highlight="publicados"
        description="Todos estão no ar e você pode abrir agora mesmo para conferir."
      />

      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {CLIENTS.map((client, i) => (
            <motion.article
              key={client.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-colors duration-300 hover:border-primary/50"
            >
              <a href={client.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={client.cover}
                    alt={`Projeto ${client.name} desenvolvido pela Bevon`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-sm font-medium text-primary">{client.segment}</span>
                      <h2 className="mt-1 text-2xl font-bold transition-colors group-hover:text-primary">
                        {client.name}
                      </h2>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 p-2 transition-all duration-300 group-hover:bg-primary">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-4 leading-relaxed text-gray-400">{client.description}</p>
                  {client.result && (
                    <p className="mt-5 inline-flex rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                      {client.result}
                    </p>
                  )}
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CTAButton context="um projeto parecido com os cases do site" className="px-10 py-5 text-lg">
            Quero um projeto assim
          </CTAButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
