"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Layout,
  MessageSquare,
  PenTool,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CTAButton } from "@/components/CTAButton";
import { ACT } from "@/components/three/config";
import { useAct } from "@/components/three/useAct";
import { SERVICES } from "@/lib/site-data";

const ICONS: Record<string, React.ReactNode> = {
  sites: <Layout className="h-7 w-7" />,
  automacao: <MessageSquare className="h-7 w-7" />,
  conteudo: <PenTool className="h-7 w-7" />,
  sistemas: <Code2 className="h-7 w-7" />,
};

export function Services() {
  const ref = useAct<HTMLElement>(ACT.SERVICES);

  /**
   * O carrossel é o scroll horizontal do próprio navegador, com scroll-snap.
   *
   * Sem biblioteca: o arrasto com o dedo, a inércia, a barra de rolagem por
   * teclado e o respeito a prefers-reduced-motion já vêm prontos e nativos —
   * uma lib de slider reimplementa tudo isso em JavaScript e cobra uns 40 KB
   * por algo que o navegador faz melhor. As setas e os pontos só empurram esse
   * scroll; se o JavaScript falhar, a seção continua deslizável no dedo.
   */
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /** Largura de um card mais o espaço entre eles: o passo de uma seta. */
  const step = () => {
    const el = track.current;
    if (!el) return 0;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return el.clientWidth;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return card.offsetWidth + gap;
  };

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;

    // 2px de tolerância: com zoom e densidade fracionária o scrollLeft máximo
    // não fecha exatamente com a conta, e a seta ficaria ativa para sempre.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);

    const s = step();
    setIndex(s > 0 ? Math.round(el.scrollLeft / s) : 0);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const move = (direction: 1 | -1) => {
    track.current?.scrollBy({ left: direction * step(), behavior: "smooth" });
  };

  const goTo = (i: number) => {
    track.current?.scrollTo({ left: i * step(), behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="services"
      className="relative z-10 overflow-hidden px-4 py-24 md:py-32"
    >
      {/* Clarão roxo atrás da seção. É o que separa a oferta do resto da
          página, que é preto de ponta a ponta: sem ele, esta seção tem o mesmo
          peso visual de um rodapé. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] max-w-[130vw] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            O que fazemos
          </span>
          <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
            Quatro formas de{" "}
            <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
              aumentar seu faturamento
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Escolha por onde começar. O diagnóstico é sem custo e sem compromisso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-16"
        >
          {/*
            tabIndex + role region: sem isso o teclado não alcança a régua de
            rolagem e quem não usa mouse fica preso no primeiro card.
            A barra de rolagem some porque as setas e os pontos já contam a
            mesma história, com menos ruído.
          */}
          <div
            ref={track}
            onScroll={sync}
            role="region"
            aria-label="Serviços"
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
          >
            {/*
              O cartão deixou de ser uma caixa preta sobre preto. Agora tem
              superfície (degradê de branco quase transparente, que num fundo
              escuro lê como volume), um fio roxo no topo e um brilho que acende
              no hover. Era só borda antes, e borda sozinha não distingue "onde
              eu compro" de "rodapé".
            */}
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className="group relative flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_24px_70px_-30px_rgba(107,47,255,0.9)] sm:w-[60%] lg:w-[calc((100%-1.5rem)/2)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* O ícone virou peça de cor: chapa roxa e ícone branco desde o
                    repouso, em vez de esperar o mouse para ganhar vida. */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
                  {ICONS[service.id]}
                </div>

                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="mt-2 font-semibold text-primary">{service.outcome}</p>
                <p className="mt-4 leading-relaxed text-gray-400">{service.description}</p>

                <ul className="mt-6 space-y-2.5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <Check className="h-3 w-3 text-primary" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* mt-auto: os cards têm textos de alturas diferentes, e sem
                    isso o botão de cada um para numa altura.

                    Cheio, e não fantasma: esta é a seção onde se vende, e o
                    botão fantasma pedia o mesmo peso de atenção que a borda do
                    card. */}
                <div className="mt-auto pt-8">
                  <CTAButton
                    context={service.waContext}
                    className="w-full px-6 py-3.5 text-sm"
                  >
                    Quero saber mais
                  </CTAButton>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              {SERVICES.map((service, i) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir para ${service.title}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={atStart}
                aria-label="Serviço anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-primary/60 hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                disabled={atEnd}
                aria-label="Próximo serviço"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-primary/60 hover:bg-primary/20 disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
