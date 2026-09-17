"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/lib/site-data";
import { initials } from "@/lib/utils";

/**
 * O retrato do cliente, ou as iniciais quando ainda não há foto.
 *
 * É background-image e não <img> porque o recorte aqui precisa de zoom, não só
 * de posição: um retrato de corpo inteiro num círculo de 56px vira um borrão
 * se entrar inteiro. `background-size` dá o zoom, `background-position` escolhe
 * o pedaço — os dois vêm do dado, por foto.
 */
function Avatar({ client }: { client: Testimonial }) {
  if (!client.photo) {
    return (
      <span
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary"
      >
        {initials(client.name)}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={`Foto de ${client.name}`}
      className="h-14 w-14 shrink-0 rounded-full border border-white/10 bg-black/40 bg-no-repeat"
      style={{
        backgroundImage: `url(${client.photo})`,
        backgroundSize: client.photoZoom ?? "cover",
        backgroundPosition: client.photoFocus ?? "50% 20%",
      }}
    />
  );
}

/**
 * Prova social. Renderiza apenas com clientes reais em lib/site-data.ts —
 * vazio, a seção não existe. Prova social inventada custa mais do que rende.
 *
 * Cada cartão tem duas formas. Com `quote`, é depoimento: aspas, aspas
 * gráficas e assinatura. Sem, é o que a Bevon afirma ter entregue, em terceira
 * pessoa. A segunda forma não é um depoimento pela metade; é outra coisa, e
 * por isso não se disfarça de aspas.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="relative z-10 px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Prova social
          </span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Quem já roda com a{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Bevon
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((client, i) => (
            <motion.figure
              key={client.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
            >
              {client.quote ? (
                <>
                  <Quote className="h-8 w-8 text-primary/60" />
                  <blockquote className="mt-5 leading-relaxed text-gray-300">
                    “{client.quote}”
                  </blockquote>
                </>
              ) : (
                <p className="leading-relaxed text-gray-300">{client.outcome}</p>
              )}

              {/* mt-auto: os textos têm alturas diferentes e as assinaturas
                  precisam alinhar, senão a linha de nomes fica torta. */}
              <figcaption className="mt-auto flex items-center gap-4 border-t border-white/10 pt-5">
                <Avatar client={client} />
                <span>
                  <span className="block font-bold text-white">{client.name}</span>
                  <span className="text-sm text-primary">
                    {client.role ? `${client.role} · ${client.company}` : client.company}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
