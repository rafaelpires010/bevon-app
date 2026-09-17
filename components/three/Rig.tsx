"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { state } from "@/lib/scene-store";

/** Enquadramento de repouso da marca. */
const BASE = new THREE.Vector3(0, 0.4, 14);
const TARGET = new THREE.Vector3(0, 0, 0);

const tmpPosition = new THREE.Vector3();

/**
 * Segura a câmera no enquadramento da marca.
 *
 * Antes ela percorria um túnel de seis atos. Com a marca sozinha em cena não
 * há para onde viajar, então a câmera fica parada e só responde ao ponteiro.
 * Quem reage à rolagem agora é a própria marca.
 *
 * Lê o ponteiro do store por ref: durante o scroll NENHUM componente React
 * re-renderiza.
 */
export function Rig() {
  const { camera, size } = useThree();

  useFrame((_, delta) => {
    // Delta travado: evita salto brusco quando a aba volta do background.
    const dt = Math.min(delta, 1 / 30);
    const reduced = state.reducedMotion;

    tmpPosition.copy(BASE);

    // Em tela vertical o enquadramento horizontal aperta e a marca ocupa quase
    // todo o viewport, competindo com o texto. Recuar a câmera devolve o
    // respiro sem mexer na composição do desktop.
    const aspect = size.width / Math.max(size.height, 1);
    tmpPosition.z += THREE.MathUtils.clamp((1 - aspect) * 13, 0, 13);

    // Parallax de ponteiro, desligado em prefers-reduced-motion.
    if (!reduced) {
      tmpPosition.x += state.pointerX * 1.8;
      tmpPosition.y += -state.pointerY * 1.1;
    }

    const lambda = reduced ? 12 : 3.2;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tmpPosition.x, lambda, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, tmpPosition.y, lambda, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tmpPosition.z, lambda, dt);

    camera.lookAt(TARGET);
  });

  return null;
}
