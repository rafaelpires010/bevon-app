"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Ambiente de estúdio para o metal da marca ter o que refletir.
 *
 * Metal em PBR não tem cor própria: ele devolve o que está em volta. Sem mapa
 * de ambiente, `metalness` alto não deixa a peça metálica, deixa quase preta,
 * e foi por isso que a marca estava com metalness zero até agora.
 *
 * O ambiente é GERADO aqui, não baixado. A alternativa comum é o Environment
 * do drei com um HDR de CDN, descartada pelo mesmo motivo que o useDetectGPU
 * já tinha sido (ver lib/detect-quality.ts): dependência de terceiro e latência
 * de rede numa página cujo objetivo é converter. O RoomEnvironment vem dentro
 * do three, custa zero requisição e dá exatamente o que a peça precisa, que são
 * fontes de luz retangulares para escorrer pelo chanfro.
 */
export function StudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = pmrem.fromScene(room, 0.04);

    scene.environment = target.texture;

    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      // RoomEnvironment é uma cena de verdade: as geometrias e materiais dela
      // ficam na GPU até alguém mandar embora.
      room.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
    };
  }, [gl, scene]);

  return null;
}
