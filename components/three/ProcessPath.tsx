"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PROCESS } from "@/lib/site-data";
import { state } from "@/lib/scene-store";
import { ACT_Z, PALETTE } from "./config";

/**
 * Ato 4 — o processo, como uma trilha de nós conectados.
 * Um nó por etapa em PROCESS.
 */
export function ProcessPath() {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      PROCESS.map((step, i) => {
        const t = i / Math.max(PROCESS.length - 1, 1);
        return {
          step: step.step,
          x: -7 + t * 14,
          y: Math.sin(t * Math.PI) * 2.2 - 0.6,
          phase: i * 0.9,
        };
      }),
    []
  );

  // Tubo suave passando por todos os nós.
  const tubeGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(nodes.map((n) => new THREE.Vector3(n.x, n.y, 0)));
    return new THREE.TubeGeometry(curve, 64, 0.045, 8, false);
  }, [nodes]);

  useEffect(() => () => tubeGeometry.dispose(), [tubeGeometry]);

  useFrame((s) => {
    if (!group.current || state.reducedMotion) return;
    group.current.children.forEach((child, i) => {
      const node = nodes[i];
      if (!node) return;
      const pulse = 1 + Math.sin(s.clock.elapsedTime * 1.6 + node.phase) * 0.14;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group position={[0, 0, ACT_Z[4]]}>
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={PALETTE.primaryLight}
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group ref={group}>
        {nodes.map((node) => (
          <mesh key={node.step} position={[node.x, node.y, 0]}>
            <sphereGeometry args={[0.44, 20, 20]} />
            <meshStandardMaterial
              color={PALETTE.primary}
              emissive={PALETTE.primaryLight}
              emissiveIntensity={1.1}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        ))}
      </group>

      <pointLight color={PALETTE.accent} intensity={24} distance={34} />
    </group>
  );
}
