"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { state } from "@/lib/scene-store";
import { EXIT, PALETTE } from "./config";

/** Hex "#RRGGBB" para os três canais em 0..1. */
function channels(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
  };
}

const LIGHT = channels(PALETTE.canvas);
const DARK = channels(PALETTE.deep);

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * Faz o fundo virar de claro para escuro enquanto a marca se desmonta.
 *
 * O claro existe para dar contraste ao "B". Terminada a desconstrução ele não
 * serve mais a ninguém, e o site abaixo é escrito em branco sobre escuro, então
 * o fundo volta a ser o escuro da casa exatamente quando o último caco apaga.
 *
 * A interpolação é feita em sRGB, não no espaço linear de trabalho do three.
 * Misturar quase-branco com quase-preto em linear despenca para o escuro logo
 * no começo do trajeto, e o degradê fica com um tranco no meio.
 */
export function BackgroundFade() {
  const scene = useThree((s) => s.scene);
  const color = useMemo(() => new THREE.Color(PALETTE.canvas), []);

  // O mesmo objeto de cor fica preso na cena e é mutado a cada quadro: trocar
  // scene.background por uma cor nova a 60fps geraria lixo sem necessidade.
  useEffect(() => {
    const previous = scene.background;
    scene.background = color;
    return () => {
      scene.background = previous;
    };
  }, [scene, color]);

  useFrame(() => {
    const span = EXIT.fadeEnd - EXIT.backgroundStart;
    const t = easeInOut(
      THREE.MathUtils.clamp((state.heroExit - EXIT.backgroundStart) / span, 0, 1)
    );

    color.setRGB(
      LIGHT.r + (DARK.r - LIGHT.r) * t,
      LIGHT.g + (DARK.g - LIGHT.g) * t,
      LIGHT.b + (DARK.b - LIGHT.b) * t,
      THREE.SRGBColorSpace
    );
  });

  return null;
}
