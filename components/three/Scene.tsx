"use client";

import { Preload } from "@react-three/drei";
import * as THREE from "three";
import { BevonMark } from "./BevonMark";
import { PALETTE } from "./config";
import { Rig } from "./Rig";
import { StudioEnvironment } from "./StudioEnvironment";

/**
 * A cena: a marca da Bevon, e nada mais.
 *
 * Antes isto era um túnel de seis atos (módulos de serviço, telas de case,
 * anéis de logo, trilha de processo, convergência, campo de estrelas). Era
 * informação demais competindo com o texto que vende. Ficou a marca sozinha.
 *
 * Os componentes dos outros atos continuam no repositório, desligados. Se um
 * deles fizer falta, é só voltar a importar aqui.
 */
export function Scene({ lowQuality }: { lowQuality: boolean }) {
  return (
    <>
      {/*
        Sem fundo aqui dentro: o canvas é transparente e quem pinta é o
        SceneBackdrop, no DOM — a arte da primeira tela e o véu que a escurece
        na rolagem. O BackgroundFade, que fazia isso em WebGL, continua no
        repositório desligado, como os outros componentes dos atos antigos.
      */}

      {/* O estúdio que o metal reflete. Sem ele, metalness alto lê como preto. */}
      <StudioEnvironment />

      {/* Com ambiente em cena, a luz direta faz menos serviço: ela existe para
          cravar o brilho no chanfro, não para iluminar a peça. A ambiente caiu
          muito porque agora quem preenche a sombra é o reflexo do estúdio.
          A principal é branca de propósito: luz colorida sobre metal roxo
          desloca o tom da marca. */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 9, 8]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-7, -3, 4]} intensity={0.7} color={PALETTE.primaryLight} />

      <Rig />
      <BevonMark lowQuality={lowQuality} />

      <Preload all />
    </>
  );
}

export const TONE_MAPPING = THREE.ACESFilmicToneMapping;
