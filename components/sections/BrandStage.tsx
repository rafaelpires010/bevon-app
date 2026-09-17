"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mouse } from "lucide-react";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { ACT } from "@/components/three/config";
import { useAct } from "@/components/three/useAct";
import { STATS } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/**
 * Primeira dobra: a promessa à esquerda, a marca 3D no pódio da arte.
 *
 * O texto é escuro, ao contrário do resto do site. Esta é a única tela em que
 * o fundo é claro — a arte existe para dar chão e contraste ao B —, então aqui
 * a regra se inverte. Ele rola para fora antes de o véu escurecer o fundo, que
 * é o que impede o texto escuro de ficar preso sobre o preto.
 *
 * Em tela deitada a coluna ocupa a metade esquerda, que é justamente a parte
 * vazia da arte; o pódio e os cards ficam do outro lado. Em tela em pé a arte
 * não tem essa folga, então o texto começa no alto e a leitura acontece por
 * cima dela.
 *
 * Também é esta seção que ancora o ato 0 da câmera e carrega o id #home.
 */
export function BrandStage() {
  const ref = useAct<HTMLElement>(ACT.HERO);

  return (
    <section
      ref={ref}
      id="home"
      /* No celular o painel sobe até quase encostar na barra: cada pixel de
         respiro ali em cima é um pixel a menos de painel em cima do B. */
      className="relative z-10 flex min-h-[100svh] items-start px-4 pb-16 pt-28 md:items-center md:pb-0 md:pt-24"
    >
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
        className="container mx-auto"
      >
        {/*
          No celular o texto ganha um painel; no desktop, não.

          A arte deitada tem a metade esquerda vazia, e ali o texto se apoia na
          seda sem precisar de nada. A arte em pé não tem essa folga: os cards
          ocupam o miolo e o B sobe até quase a metade da tela, então preto
          sobre aquilo vira sopa. O painel claro tira o fundo da conta — é o
          mesmo raciocínio do painel de vidro que existia no herói antigo, com
          as cores invertidas, porque agora quem precisa de contraste é texto
          escuro sobre fundo claro.
        */}
        <div className="max-w-xl rounded-3xl border border-black/5 bg-white/70 p-5 shadow-xl shadow-black/5 backdrop-blur-md sm:p-8 md:max-w-xl md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none lg:max-w-2xl">
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="block text-[0.65rem] font-medium uppercase tracking-[0.3em] text-primary sm:text-sm"
          >
            Tecnologia que impulsiona
          </motion.span>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-4 text-balance text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-[#05010F] sm:mt-6 sm:text-5xl sm:leading-[1.05] lg:text-6xl"
          >
            Ideias em{" "}
            {/* O degradê vai do roxo da luz ao roxo do corpo da marca: sobre
                fundo claro, roxo claro sozinho não fecha contraste. */}
            <span className="bg-gradient-to-r from-primary to-[#3F1A6B] bg-clip-text text-transparent">
              soluções reais.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-lg text-sm text-gray-600 sm:mt-6 sm:text-base md:text-lg"
          >
            Desenvolvemos sistemas, plataformas e automações que transformam
            negócios e simplificam o futuro.
          </motion.p>

          {/*
            No celular fica só o CTA principal. Os dois botões empilhados
            somavam uns 60px que o painel não tem para gastar: cada pixel de
            painel é um pixel a mais em cima do B, que na arte em pé começa
            quase na metade da tela. "Conheça a Bevon" volta na quebra sm, e
            no celular a página Sobre continua a um toque pelo menu.
          */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <CTAButton
              context="um projeto para a minha empresa"
              className="w-full py-3.5 sm:w-auto sm:py-4"
            >
              Iniciar um projeto
            </CTAButton>

            <Link
              href="/sobre"
              className="group hidden w-full items-center justify-center gap-3 rounded-full border border-black/10 bg-white/80 py-2 pl-2 pr-6 font-bold text-[#05010F] backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-white sm:inline-flex sm:w-auto sm:justify-start"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              Conheça a Bevon
            </Link>
          </motion.div>

          {/*
            Os números do mockup (+50 projetos, +30 clientes, +3 anos) não
            entram: são inventados, e lib/site-data.ts já registra que prova
            social fabricada saiu daqui uma vez (CDC art. 37). Estes são os
            reais, do mesmo lugar que alimenta a barra de prova.

            E só aparecem no desktop. No celular eles esticariam o painel por
            cima do B, e a barra de prova logo abaixo mostra exatamente os
            mesmos quatro números — a informação não se perde, muda de lugar.
          */}
          <motion.dl
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-12 hidden max-w-lg grid-cols-2 gap-x-6 gap-y-6 sm:max-w-none sm:grid-cols-4 md:grid"
          >
            {/* As divisórias só existem onde os quatro ficam na mesma linha.
                Em duas colunas elas cairiam no meio da grade e marcariam uma
                divisão que não existe. */}
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-black/10 sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
              >
                <dd className="text-2xl font-bold text-[#05010F] sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs leading-snug text-gray-500 sm:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </motion.dl>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-12 hidden items-center gap-3 text-sm text-gray-500 md:flex"
          >
            <Mouse className="h-5 w-5 shrink-0 text-gray-400" />
            Role para explorar
            <span className="h-px w-16 bg-gradient-to-r from-gray-400 to-transparent" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
