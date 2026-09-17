"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BAR_SWAP } from "@/components/three/config";
import { hasLightStage } from "@/lib/stage";
import { waLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { name: "Serviços", href: "#services" },
  /* "Projetos" saiu junto com a seção de cases: o #cases não existe mais na
     home, e a rota /cases está desativada no middleware. Link que não leva a
     lugar nenhum é pior que link que não existe. */
  { name: "Parceiros", href: "#parceiros" },
  /* "Processo" saiu junto com a seção: o #processo não existe mais na home.
     Os passos continuam na página /sobre, que é para onde o link abaixo vai. */
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "#contato" },
];

/**
 * Barra do topo: assinatura à esquerda, navegação e CTA à direita.
 *
 * A navegação tem duas formas, não duas versões: no desktop os nomes das
 * seções ficam escritos na barra, porque há largura para eles e um clique a
 * menos é um clique a menos; no celular eles viram o painel do botão de menu,
 * que só existe lá.
 *
 * A barra também troca de pele. A cena 3D nasce clara, para dar contraste ao
 * B, e escurece na primeira tela de rolagem; uma barra de cor só erraria uma
 * das duas metades. Ela é clara enquanto está sobre o claro e escura do resto
 * da página em diante.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * A faixa clara existe só na home (ver lib/stage.ts). Nas páginas internas a
   * barra já nasce escura e nunca troca — sem essa conta ela abriria branca
   * sobre uma página preta.
   *
   * O valor inicial é o do topo da página, igual no servidor e no cliente para
   * não dar mismatch de hidratação; o efeito abaixo corrige quem chega com a
   * página já rolada (F5 no meio).
   */
  const lightStage = hasLightStage(usePathname());
  const [isOverLight, setIsOverLight] = useState(lightStage);
  const { scrollY } = useScroll();

  /**
   * `scrollY / altura da janela` é a mesma conta que a cena chama de heroExit
   * e usa para desmontar a marca e virar o fundo. Calculada aqui de novo, em
   * vez de lida do store, porque o store é atualizado a 60fps dentro de um
   * requestAnimationFrame: assinar aquilo faria a barra re-renderizar por
   * quadro para trocar de cor duas vezes na vida.
   */
  const syncToScroll = (y: number) => {
    setIsScrolled(y > 50);
    setIsOverLight(lightStage && y / Math.max(window.innerHeight, 1) < BAR_SWAP);
  };

  useMotionValueEvent(scrollY, "change", syncToScroll);

  useEffect(() => {
    syncToScroll(window.scrollY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightStage]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      /**
       * Opaca nos dois estados, nunca translúcida: a marca 3D passa por baixo
       * da barra, e com fundo semitransparente cada caco que cruza ali mudaria
       * o contraste do logo e dos links. Sólida, o texto só depende do fundo
       * dela mesma — por isso a troca de pele no meio da travessia não abre
       * nenhum vale de contraste, mesmo com a página em cinza médio atrás.
       *
       * A borda inferior existe nos dois: é ela que separa a barra branca do
       * fundo claro, que é quase da mesma cor.
       */
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        isOverLight
          ? "border-black/5 bg-white"
          : "border-white/10 bg-[#05010F]"
      } ${
        isScrolled
          ? `py-3 shadow-lg ${isOverLight ? "shadow-black/10" : "shadow-purple-950/40"}`
          : `py-4 shadow-md ${isOverLight ? "shadow-black/5" : "shadow-black/30"}`
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4">
        {/*
          Assinatura: símbolo + nome, travados como uma peça só.
          O nome é texto, não imagem: herda a fonte da marca (--font-bevon),
          fica nítido em qualquer densidade de tela e é o que o buscador lê.
          "Bevon" e "Software" empilhados porque a segunda palavra é
          qualificação, não parte do nome — peso e tamanho dizem isso.
        */}
        <Link href="/" className="group flex items-center gap-3">
          <div
            className={`relative shrink-0 transition-all duration-500 ${
              isScrolled ? "h-12 w-12" : "h-14 w-14"
            }`}
          >
            {/*
              Duas versões do mesmo desenho, pela mesma razão que o texto ao
              lado troca de cor: a pastilha branca some no fundo branco e a
              roxa afunda no fundo escuro. São SVG gerados do vetor da marca —
              nítidos em qualquer tamanho e mais leves que o PNG que estava
              aqui, que era um B roxo sobre quadrado branco e, na barra clara,
              virava um B solto sem pastilha.
            */}
            <Image
              src={isOverLight ? "/brand/mark-on-light.svg" : "/brand/mark-on-dark.svg"}
              alt="Bevon Software"
              fill
              sizes="56px"
              priority
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <span className="flex flex-col leading-none">
            <span
              className={`font-bold tracking-tight transition-all duration-500 ${
                isScrolled ? "text-lg" : "text-xl"
              } ${isOverLight ? "text-[#05010F]" : "text-white"}`}
            >
              Bevon
            </span>
            <span
              className={`mt-1 text-[0.625rem] font-medium uppercase tracking-[0.32em] transition-colors group-hover:text-primary ${
                isOverLight ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Software
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop: as seções escritas. Sem botão, sem painel, sem clique
              extra — a barra tem largura de sobra e esconder cinco palavras
              atrás de um ícone só custa um passo ao visitante. */}
          <nav aria-label="Seções do site" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                /*
                  O hover é um traço que cresce da esquerda, não só a cor
                  mudando: num item de uma palavra a troca de cinza para preto
                  é sutil demais para confirmar em qual link o cursor está. O
                  traço aparece embaixo da palavra exata, e o roxo da marca
                  fecha contraste tanto na barra clara quanto na escura.

                  É `scale-x` e não `width` porque transformação não recalcula
                  layout: o texto ao lado não se mexe enquanto o traço corre.
                */
                className={`group relative py-1 text-sm font-medium transition-colors ${
                  isOverLight
                    ? "text-gray-600 hover:text-[#05010F]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Celular: o mesmo conteúdo, colapsado. O ícone sozinho lia como
              enfeite; com pílula, borda e rótulo ele vira alvo. */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 md:hidden ${
              isOverLight
                ? "border-black/10 bg-black/5 text-[#05010F] hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                : "border-white/20 bg-white/10 text-white hover:border-primary/70 hover:bg-primary/20"
            }`}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span>{isMenuOpen ? "Fechar" : "Menu"}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          /* O painel é a continuação da barra: troca de pele junto, senão
             abriria uma tábua preta pendurada numa barra branca. */
          className={`absolute inset-x-0 top-full border-b shadow-2xl md:hidden ${
            isOverLight
              ? "border-black/5 bg-white shadow-black/10"
              : "border-white/10 bg-[#05010F] shadow-black/40"
          }`}
        >
          {/* No toque não existe hover, mas existe o dedo apoiado antes de
              soltar: o item inteiro acende, e não só a palavra, porque o alvo
              aqui é a linha toda. */}
          <div className="container mx-auto flex flex-col gap-4 px-4 py-6 sm:max-w-md sm:items-stretch">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`-mx-3 rounded-xl px-3 py-2 text-lg font-medium transition-colors duration-200 hover:text-primary active:text-primary ${
                  isOverLight
                    ? "text-gray-700 hover:bg-primary/5 active:bg-primary/5"
                    : "text-gray-300 hover:bg-white/5 active:bg-white/5"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={waLink("um projeto para a minha empresa")}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="navbar-menu"
              className="mt-2 block w-full rounded-full bg-primary py-3 text-center font-bold text-white transition-colors hover:bg-primary/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
