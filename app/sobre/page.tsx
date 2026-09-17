"use client";

import { motion } from "framer-motion";
import { Award, Lightbulb, MapPin, Target } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CONTACT, PROCESS, STATS } from "@/lib/site-data";

const PILLARS = [
  {
    icon: Target,
    title: "Missão",
    description:
      "Impulsionar o crescimento dos nossos clientes com soluções digitais que podem ser medidas em faturamento.",
  },
  {
    icon: Lightbulb,
    title: "Visão",
    description:
      "Ser a referência em Minas Gerais quando uma empresa precisa transformar tecnologia em resultado comercial.",
  },
  {
    icon: Award,
    title: "Valores",
    description:
      "Transparência no escopo, clareza no prazo e responsabilidade sobre o número que combinamos entregar.",
  },
];

export default function SobrePage() {
  return (
    <main className="relative text-white">
      <PageHero
        eyebrow="Sobre a Bevon"
        title="Um time"
        highlight="responsável pelo resultado"
        description={`De ${CONTACT.city} para todo o Brasil. Cada projeto é conduzido por quem construiu, sem camada de intermediário.`}
      />

      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, description }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="mt-4 leading-relaxed text-gray-400">{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Como conduzimos <span className="text-primary">cada projeto</span>
          </h2>

          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {PROCESS.map((item, i) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-black/40 p-7 backdrop-blur-xl"
              >
                <span className="block bg-gradient-to-b from-primary to-primary/20 bg-clip-text text-4xl font-bold text-transparent">
                  {item.step}
                </span>
                <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-black/50 px-6 py-14 text-center backdrop-blur-2xl md:px-12">
          <p className="inline-flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4 text-primary" />
            {/* O mesmo número da home, da mesma fonte: duas contagens
                diferentes de "projetos no ar" no mesmo site derrubam as duas. */}
            {CONTACT.city}, {CONTACT.state} · {STATS[0].value} projetos no ar
          </p>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            Quer conhecer melhor <span className="text-primary">nosso trabalho?</span>
          </h2>
          <div className="mt-8">
            <CTAButton context="conhecer melhor o trabalho da Bevon" className="px-10 py-5 text-lg">
              Falar com o time
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
