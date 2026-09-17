"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SERVICES } from "@/lib/site-data";
import { state } from "@/lib/scene-store";
import { ACT_Z, PALETTE } from "./config";

/**
 * Ato 1 — o núcleo fragmentado em módulos, um por serviço.
 * A quantidade acompanha SERVICES: adicionar um serviço adiciona um módulo.
 */
export function ServiceModules({ lowQuality }: { lowQuality: boolean }) {
  const group = useRef<THREE.Group>(null);

  const modules = useMemo(
    () =>
      SERVICES.map((service, i) => {
        const angle = (i / SERVICES.length) * Math.PI * 2;
        return {
          id: service.id,
          angle,
          radius: 5.4,
          offsetY: (i % 2 === 0 ? 1 : -1) * 1.1,
          speed: 0.5 + (i % 3) * 0.16,
          color: i % 2 === 0 ? PALETTE.primary : PALETTE.accent,
        };
      }),
    []
  );

  useFrame((s, delta) => {
    if (!group.current || state.reducedMotion) return;
    const dt = Math.min(delta, 1 / 30);
    group.current.rotation.y += dt * 0.14;

    group.current.children.forEach((child, i) => {
      const m = modules[i];
      if (!m) return;
      child.position.y = m.offsetY + Math.sin(s.clock.elapsedTime * m.speed + i) * 0.5;
      child.rotation.x += dt * 0.3;
      child.rotation.z += dt * 0.2;
    });
  });

  return (
    <group ref={group} position={[0, 0, ACT_Z[1]]}>
      {modules.map((m) => (
        <mesh
          key={m.id}
          position={[Math.cos(m.angle) * m.radius, m.offsetY, Math.sin(m.angle) * m.radius]}
        >
          <octahedronGeometry args={[1.25, lowQuality ? 0 : 1]} />
          <meshStandardMaterial
            color={m.color}
            emissive={m.color}
            emissiveIntensity={0.7}
            roughness={0.15}
            metalness={0.9}
            flatShading
          />
        </mesh>
      ))}

      <pointLight color={PALETTE.primaryLight} intensity={26} distance={30} />
    </group>
  );
}
