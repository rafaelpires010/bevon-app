"use client";

import { motion } from "framer-motion";
import { Check, Code2, Layout, MessageSquare, PenTool } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SERVICES } from "@/lib/site-data";

const ICONS: Record<string, React.ReactNode> = {
  sites: <Layout className="h-7 w-7" />,
  automacao: <MessageSquare className="h-7 w-7" />,
  conteudo: <PenTool className="h-7 w-7" />,
  sistemas: <Code2 className="h-7 w-7" />,
};

/** Detalha os mesmos SERVICES da home — uma fonte de verdade só. */
export default function ServicosPage() {
  return (
    <main className="relative text-white">
      <PageHero
        eyebrow="Serviços"
        title="Tecnologia que"
        highlight="gera receita"
        description="Quatro frentes de trabalho, todas com o mesmo objetivo: transformar visitante em cliente."
      />

      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl transition-colors duration-300 hover:border-primary/50"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                {ICONS[service.id]}
              </div>
              <h2 className="text-2xl font-bold">{service.title}</h2>
              <p className="mt-2 font-medium text-primary">{service.outcome}</p>
              <p className="mt-4 leading-relaxed text-gray-400">{service.description}</p>

              <ul className="mt-6 space-y-2.5">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <CTAButton context={service.waContext} variant="ghost" className="w-full px-6 py-3 text-sm">
                  Quero saber mais
                </CTAButton>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CTAButton context="um projeto para a minha empresa" className="px-10 py-5 text-lg">
            Falar com um especialista
          </CTAButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
