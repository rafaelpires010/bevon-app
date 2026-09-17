"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ACT } from "@/components/three/config";
import { useAct } from "@/components/three/useAct";
import { PARTNERS, type Partner } from "@/lib/site-data";

/**
 * O logo, ou o nome no lugar dele.
 *
 * Os arquivos vêm de marcas diferentes, cada um com sua proporção, então o que
 * se fixa é a ALTURA da faixa e não o tamanho da imagem: `object-contain`
 * dentro de uma caixa de altura fixa faz logo largo e logo quadrado ocuparem o
 * mesmo peso visual na linha.
 */
function PartnerLogo({ partner }: { partner: Partner }) {
  if (!partner.logo) {
    return (
      <span className="text-2xl font-bold tracking-tight text-white">
        {partner.name}
      </span>
    );
  }

  return (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={partner.logoWidth ?? 160}
      height={partner.logoHeight ?? 80}
      className={
        partner.logoBoxed
          ? "h-16 w-16 rounded-xl object-cover"
          : "h-12 w-auto object-contain"
      }
    />
  );
}

/**
 * Nossos parceiros.
 *
 * Os cartões ficam no escuro e os logos vão direto sobre ele, sem pastilha
 * branca por trás: o logo da NOVAEO é texto branco sobre aquarela, e numa
 * pastilha clara ele sumiria.
 */
export function Partners() {
  const ref = useAct<HTMLElement>(ACT.PARTNERS);

  return (
    <section ref={ref} id="parceiros" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Parceiros
          </span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Nossos{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              parceiros
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-400">
            Marcas com que a Bevon trabalha lado a lado.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner, i) => {
            const content = (
              <>
                {/* Altura fixa para a linha dos logos: sem ela, cada arquivo
                    puxaria o nome para uma altura diferente. */}
                <div className="flex h-16 items-center justify-center">
                  <PartnerLogo partner={partner} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-white">{partner.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{partner.segment}</p>

                {/* O rótulo diz para onde vai de verdade: "visitar site"
                    apontando para um perfil do Instagram promete uma coisa e
                    entrega outra. */}
                {partner.url && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {partner.url.includes("instagram.com")
                      ? "Ver no Instagram"
                      : "Visitar site"}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                )}
              </>
            );

            const card =
              "group flex flex-col items-center rounded-2xl border border-white/10 bg-black/40 px-6 py-10 text-center backdrop-blur-xl transition-all duration-300";

            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {/* Só vira link quem tem para onde ir. Um cartão clicável que
                    não leva a lugar nenhum é pior que um cartão parado. */}
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${card} h-full hover:-translate-y-1 hover:border-primary/50`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={`${card} h-full`}>{content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
