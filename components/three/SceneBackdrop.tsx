"use client";

import { useEffect, useRef } from "react";
import { state } from "@/lib/scene-store";
import { BACKDROP_OPACITY, BACKDROP_TALL, BACKDROP_WIDE } from "./backdrop";
import { EXIT, PALETTE } from "./config";

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * Fundo da cena: a arte clara embaixo, um véu escuro por cima.
 *
 * Antes o fundo era uma cor sólida pintada DENTRO do WebGL (BackgroundFade
 * interpolava scene.background a cada quadro). Uma imagem ali dentro custaria
 * uma textura de tela cheia e um quad com shader próprio para poder escurecer.
 * No DOM sai de graça: o navegador já sabe cobrir a tela com uma imagem, já
 * escolhe o tamanho certo por densidade de tela e já cacheia. O canvas passa a
 * ser transparente e só desenha a marca.
 *
 * O escurecimento é o mesmo da cena antiga — a mesma curva, as mesmas marcas
 * de EXIT — só que aplicado na opacidade do véu.
 */
export function SceneBackdrop() {
  const veil = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    // Última opacidade escrita: sem isto seriam 60 escritas de estilo por
    // segundo com a página parada, cada uma sujando o layout do navegador.
    let written = -1;

    const tick = () => {
      const span = EXIT.fadeEnd - EXIT.backgroundStart;
      const opacity = easeInOut(
        clamp01((state.heroExit - EXIT.backgroundStart) / span)
      );

      if (veil.current && Math.abs(opacity - written) > 0.002) {
        veil.current.style.opacity = opacity.toFixed(3);
        written = opacity;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 -z-20" aria-hidden="true">
      {/*
        A cor embaixo da imagem é a mesma com que a arte começa: enquanto o
        arquivo não chega (primeiro acesso, rede ruim), a tela nasce da cor
        certa em vez de piscar branco.

        <picture> em vez de next/image: são duas artes diferentes, não dois
        tamanhos da mesma, e é o navegador que escolhe qual baixar pela
        orientação da tela. Com duas <Image> o celular baixaria as duas, 2,4 MB
        para mostrar uma. (O projeto está com images.unoptimized, então o
        next/image aqui não somava nada além do preload.)

        `fetchPriority="high"` porque isto é a primeira tela: o varredor de
        pré-carga acha a tag no HTML e já começa a baixar.
      */}
      {/* overflow-hidden porque no celular a arte é ancorada abaixo da borda
          de baixo de propósito: é o recorte que tira o rodapé de seda lisa. */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: PALETTE.canvas }}
      >
        <picture>
          <source
            media="(orientation: portrait)"
            srcSet={BACKDROP_TALL.src}
            width={BACKDROP_TALL.width}
            height={BACKDROP_TALL.height}
          />
          <img
            src={BACKDROP_WIDE.src}
            alt=""
            width={BACKDROP_WIDE.width}
            height={BACKDROP_WIDE.height}
            fetchPriority="high"
            decoding="async"
            className="backdrop-art"
            style={{ opacity: BACKDROP_OPACITY }}
          />
        </picture>
      </div>

      {/*
        O véu. Nasce invisível e a rolagem o traz; quem escreve a opacidade é
        o efeito acima, direto no estilo do elemento, sem passar pelo React —
        durante a rolagem nenhum componente re-renderiza.
      */}
      <div
        ref={veil}
        className="absolute inset-0"
        style={{ backgroundColor: PALETTE.deep, opacity: 0 }}
      />
    </div>
  );
}
