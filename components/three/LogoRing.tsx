"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { CLIENTS, PARTNERS } from "@/lib/site-data";
import { state } from "@/lib/scene-store";
import { ACT_Z, PALETTE } from "./config";
import { createWordmarkTexture } from "./wordmark";

const PLATE_W = 4.2;
const PLATE_H = 1.32;

type RingProps = {
  labels: string[];
  radius: number;
  y: number;
  accent: string;
  direction: 1 | -1;
  speed: number;
};

/** Carrossel cilíndrico de placas, uma por marca. */
function Ring({ labels, radius, y, accent, direction, speed }: RingProps) {
  const group = useRef<THREE.Group>(null);

  const plates = useMemo(() => {
    if (labels.length === 0) return [];
    return labels.map((label, i) => ({
      label,
      angle: (i / labels.length) * Math.PI * 2,
      texture: createWordmarkTexture(label, accent),
    }));
  }, [labels, accent]);

  // Texturas de canvas são criadas à mão: precisam de dispose explícito.
  useEffect(() => {
    return () => plates.forEach((p) => p.texture.dispose());
  }, [plates]);

  useFrame((_, delta) => {
    if (!group.current || state.reducedMotion) return;
    group.current.rotation.y += Math.min(delta, 1 / 30) * speed * direction;
  });

  return (
    <group ref={group} position={[0, y, 0]}>
      {plates.map((plate) => (
        <mesh
          key={plate.label}
          position={[Math.sin(plate.angle) * radius, 0, Math.cos(plate.angle) * radius]}
          rotation={[0, plate.angle, 0]}
        >
          <planeGeometry args={[PLATE_W, PLATE_H]} />
          {/* FrontSide, não DoubleSide: pelo verso a textura aparece
              espelhada e o wordmark fica ilegível. As placas do arco de
              trás simplesmente não desenham — é o comportamento certo
              para um carrossel. */}
          <meshBasicMaterial
            map={plate.texture}
            transparent
            side={THREE.FrontSide}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Ato 3 — parceiros e clientes.
 * Dois anéis contra-rotativos: parceiros em cima, clientes embaixo.
 * Ambos alimentados por lib/site-data.ts.
 */
export function LogoRing() {
  const partnerLabels = useMemo(() => PARTNERS.map((p) => p.name), []);
  const clientLabels = useMemo(() => CLIENTS.map((c) => c.name), []);

  return (
    <group position={[0, 0, ACT_Z[3]]}>
      <Ring labels={partnerLabels} radius={8.6} y={2.4} accent={PALETTE.accent} direction={1} speed={0.16} />
      <Ring labels={clientLabels} radius={6.4} y={-2.2} accent={PALETTE.primaryLight} direction={-1} speed={0.22} />

      {/* Eixo luminoso ligando os dois anéis */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 10, 8]} />
        <meshBasicMaterial
          color={PALETTE.glow}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <pointLight color={PALETTE.primary} intensity={30} distance={32} />
    </group>
  );
}
