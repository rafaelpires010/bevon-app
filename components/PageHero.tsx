"use client";

import { motion } from "framer-motion";

/** Cabeçalho padrão das páginas internas, em vidro sobre a cena 3D. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
}) {
  return (
    <section className="relative z-10 px-4 pb-8 pt-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-balance text-4xl font-bold leading-tight md:text-6xl">
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300/90">{description}</p>
      </motion.div>
    </section>
  );
}
