"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ACT } from "@/components/three/config";
import { useAct } from "@/components/three/useAct";
import { CONTACT, TEAM, type TeamMember } from "@/lib/site-data";
import { initials } from "@/lib/utils";

/**
 * O retrato, ou as iniciais no lugar dele.
 *
 * O retrato é redondo porque o enquadramento de foto de perfil quase sempre
 * vem centrado no rosto; `object-cover` num círculo perdoa arquivo torto e
 * proporção estranha melhor que um retângulo.
 */
function Portrait({ person }: { person: TeamMember }) {
  if (!person.photo) {
    return (
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-3xl font-bold tracking-tight text-primary"
        aria-hidden
      >
        {initials(person.name)}
      </div>
    );
  }

  return (
    <Image
      src={person.photo}
      alt={`${person.name}, ${person.role} da Bevon`}
      width={person.photoWidth ?? 256}
      height={person.photoHeight ?? 256}
      className="h-32 w-32 rounded-full border border-white/10 object-cover shadow-lg shadow-black/40"
      style={{ objectPosition: person.photoFocus ?? "50% 20%" }}
    />
  );
}

/**
 * Sobre nós.
 *
 * Entrou no lugar da seção de processo, que descrevia como o trabalho anda; a
 * resposta que faltava é quem faz o trabalho. O texto é o mesmo
 * posicionamento da página /sobre, encurtado, e o link leva para lá em vez de
 * repetir missão, visão e valores aqui.
 */
export function About() {
  const leader = TEAM[0];

  const ref = useAct<HTMLElement>(ACT.PROCESS);

  return (
    <section ref={ref} id="sobre-nos" className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Sobre nós
          </span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Um time{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              responsável pelo resultado
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            De {CONTACT.city} para todo o Brasil. Cada projeto é conduzido por
            quem construiu, sem camada de intermediário entre você e quem põe a
            mão no código.
          </p>
          <p className="mt-4 leading-relaxed text-gray-400">
            Transparência no escopo, clareza no prazo e responsabilidade sobre o
            número que combinamos entregar.
          </p>

          <Link
            href="/sobre"
            className="group mt-8 inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-white"
          >
            Conheça a Bevon por dentro
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {leader && (
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-col items-center rounded-3xl border border-white/10 bg-black/40 px-8 py-12 text-center backdrop-blur-xl"
          >
            <Portrait person={leader} />

            <figcaption className="mt-6">
              <p className="text-2xl font-bold text-white">{leader.name}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                {leader.role}
              </p>
            </figcaption>
          </motion.figure>
        )}
      </div>
    </section>
  );
}
