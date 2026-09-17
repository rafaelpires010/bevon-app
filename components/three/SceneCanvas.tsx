"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { detectQuality, prefersReducedMotion } from "@/lib/detect-quality";
import { startSceneDriver, state, type Quality } from "@/lib/scene-store";
import { QUALITY_PRESETS } from "./config";
import { FrameloopGuard } from "./FrameloopGuard";
import { DarkBackdrop } from "./DarkBackdrop";
import { Scene } from "./Scene";

/**
 * Camada 3D persistente: um único canvas fixo atrás de todo o conteúdo.
 * O HTML rola normalmente por cima — scroll nativo, âncoras, SEO e
 * acessibilidade permanecem intactos.
 */
export function SceneCanvas() {
  const [quality, setQuality] = useState<Quality | null>(null);

  useEffect(() => {
    const detected = detectQuality();
    state.quality = detected;
    state.reducedMotion = prefersReducedMotion();
    setQuality(detected);

    const stop = startSceneDriver();
    return stop;
  }, []);

  // Sem WebGL não há marca para contrastar, e o site inteiro é escrito em
  // branco sobre escuro: o fundo claro só atrapalharia. Aqui ele fica escuro
  // de uma vez. O site funciona sem uma linha de 3D.
  if (quality === "off") {
    return <DarkBackdrop />;
  }

  // Ainda detectando: nada. A arte do fundo não mora aqui dentro (ver
  // SiteBackground), então a tela já está pintada enquanto isto decide.
  if (quality === null) {
    return null;
  }

  const preset = quality === "low" ? QUALITY_PRESETS.low : QUALITY_PRESETS.high;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={preset.dpr}
        gl={{
          antialias: preset.antialias,
          powerPreference: "high-performance",
          // Transparente: quem pinta o fundo agora é o SceneBackdrop, no DOM.
          // Com alpha falso o canvas cobriria a arte com preto opaco.
          alpha: true,
        }}
        camera={{ fov: 52, near: 0.1, far: 260, position: [0, 0.4, 14] }}
        onCreated={({ gl }) => {
          // Sem tone mapping de propósito. O ACES comprime as altas luzes e
          // devolveria o fundo claro como cinza (1.0 sai em torno de 0.8), o
          // que faz a tela parecer suja. Sem ele, o branco sai branco.
          gl.toneMapping = THREE.NoToneMapping;
          gl.toneMappingExposure = 1;
        }}
      >
        <FrameloopGuard />
        <AdaptiveDpr pixelated />
        <Scene lowQuality={quality === "low"} />
      </Canvas>
    </div>
  );
}
