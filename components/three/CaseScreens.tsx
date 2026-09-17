"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CLIENTS } from "@/lib/site-data";
import { state } from "@/lib/scene-store";
import { ACT_Z, PALETTE } from "./config";

const PLANE_W = 6;
const PLANE_H = 3.6;

/**
 * Ato 2 — os cases entregues, como telas suspensas no túnel.
 * Usa as capas reais dos projetos como textura.
 */
export function CaseScreens() {
  const group = useRef<THREE.Group>(null);
  const textures = useTexture(CLIENTS.map((c) => c.cover));

  const layout = useMemo(
    () =>
      CLIENTS.map((client, i) => {
        const spread = (i - (CLIENTS.length - 1) / 2) * 7.4;
        return {
          name: client.name,
          x: spread,
          y: (i % 2 === 0 ? 1 : -1) * 1.5,
          z: -Math.abs(spread) * 0.42,
          // Telas das pontas giram para dentro, formando um arco côncavo.
          rotationY: -spread * 0.045,
          phase: i * 1.3,
        };
      }),
    []
  );

  useFrame((s) => {
    if (!group.current || state.reducedMotion) return;
    group.current.children.forEach((child, i) => {
      const item = layout[i];
      if (!item) return;
      child.position.y = item.y + Math.sin(s.clock.elapsedTime * 0.45 + item.phase) * 0.32;
    });
    group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.12) * 0.05;
  });

  return (
    <group ref={group} position={[0, 0, ACT_Z[2]]}>
      {layout.map((item, i) => {
        const texture = Array.isArray(textures) ? textures[i] : textures;
        if (texture) texture.colorSpace = THREE.SRGBColorSpace;

        return (
          <group key={item.name} position={[item.x, item.y, item.z]} rotation={[0, item.rotationY, 0]}>
            <mesh>
              <planeGeometry args={[PLANE_W, PLANE_H]} />
              <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
            </mesh>

            {/* Moldura luminosa */}
            <mesh position={[0, 0, -0.02]} scale={1.035}>
              <planeGeometry args={[PLANE_W, PLANE_H]} />
              <meshBasicMaterial
                color={PALETTE.primaryLight}
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}

      <pointLight color={PALETTE.accent} intensity={20} distance={40} position={[0, 0, 6]} />
    </group>
  );
}
