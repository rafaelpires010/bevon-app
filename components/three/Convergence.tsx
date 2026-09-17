"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { state } from "@/lib/scene-store";
import { ACT_Z, PALETTE } from "./config";
import { createMarkGeometry } from "./mark-shape";

const RINGS = [
  { radius: 3.0, tilt: 0.0, speed: 0.34 },
  { radius: 4.4, tilt: 0.7, speed: -0.26 },
  { radius: 5.8, tilt: 1.35, speed: 0.19 },
];

const SHARD_COUNT = 22;
const SHARD_START = 11;
const SHARD_END = 2.3;

/** Altura da marca no fecho: menor que a do herói, para o eco não competir. */
const SIZE = 3.4;

/** Direções bem distribuídas numa esfera (espiral de Fibonacci). */
function shardDirections(count: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    return {
      dir: new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r),
      spin: 0.4 + (i % 5) * 0.22,
      size: 0.28 + (i % 3) * 0.1,
    };
  });
}

/**
 * Ato 5 — a convergência. Os fragmentos espalhados pelo túnel voltam para o
 * centro e a marca da Bevon se remonta ali dentro dos anéis.
 *
 * A jornada abre com a marca inteira e fecha com ela se refazendo. O que
 * acontece no meio são os pedaços dela trabalhando.
 */
export function Convergence({ lowQuality }: { lowQuality: boolean }) {
  const rings = useRef<THREE.Group>(null);
  const shards = useRef<THREE.Group>(null);
  const mark = useRef<THREE.Group>(null);

  const directions = useMemo(
    () => shardDirections(lowQuality ? 12 : SHARD_COUNT),
    [lowQuality]
  );

  const geometry = useMemo(
    () =>
      createMarkGeometry({
        depth: 0.22,
        bevel: lowQuality ? 0 : 0.016,
        bevelSegments: lowQuality ? 1 : 3,
        curveSegments: lowQuality ? 3 : 5,
      }),
    [lowQuality]
  );

  const shardMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: PALETTE.primary,
        emissive: PALETTE.primaryLight,
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0.9,
        flatShading: true,
        transparent: true,
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      shardMaterial.dispose();
    };
  }, [geometry, shardMaterial]);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 1 / 30);

    // Quanto o visitante já percorreu do ato 4 para o 5. É scroll, não tempo:
    // a remontagem obedece a rolagem e funciona com movimento reduzido.
    const arrive = THREE.MathUtils.clamp(state.act - 4, 0, 1);
    const eased = arrive * arrive * (3 - 2 * arrive);

    if (shards.current) {
      const radius = THREE.MathUtils.lerp(SHARD_START, SHARD_END, eased);
      shards.current.children.forEach((child, i) => {
        const shard = directions[i];
        if (!shard) return;
        child.position.copy(shard.dir).multiplyScalar(radius);
        if (!state.reducedMotion) {
          child.rotation.x += dt * shard.spin;
          child.rotation.y += dt * shard.spin * 0.7;
        }
      });
      // Os cacos apagam na chegada: quem termina a frase é a marca.
      shardMaterial.opacity = 1 - eased * 0.95;
    }

    if (mark.current) {
      mark.current.scale.setScalar(SIZE * (0.25 + eased * 0.75));
      if (!state.reducedMotion) {
        mark.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.38;
      }
    }

    if (rings.current && !state.reducedMotion) {
      rings.current.children.forEach((child, i) => {
        const ring = RINGS[i];
        if (!ring) return;
        child.rotation.z += dt * ring.speed;
      });
    }
  });

  return (
    <group position={[0, 0, ACT_Z[5]]}>
      <group ref={rings}>
        {RINGS.map((ring) => (
          <mesh key={ring.radius} rotation={[ring.tilt, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.035, 12, 96]} />
            <meshBasicMaterial
              color={PALETTE.glow}
              transparent
              opacity={0.55}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <group ref={shards}>
        {directions.map((shard, i) => (
          <mesh key={i} material={shardMaterial}>
            <octahedronGeometry args={[shard.size, 0]} />
          </mesh>
        ))}
      </group>

      <group ref={mark}>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial
            color={PALETTE.mark}
            emissive={PALETTE.primary}
            emissiveIntensity={0.35}
            roughness={0.13}
            metalness={0.4}
            clearcoat={lowQuality ? 0 : 1}
            clearcoatRoughness={0.18}
          />
        </mesh>
      </group>

      <pointLight color={PALETTE.primaryLight} intensity={46} distance={30} />
    </group>
  );
}
