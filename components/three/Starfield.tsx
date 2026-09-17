"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { state } from "@/lib/scene-store";
import { ACT_Z, PALETTE } from "./config";

/**
 * Campo de partículas que atravessa todo o túnel, dando continuidade
 * visual entre os atos. Um único THREE.Points instanciado.
 */
export function Starfield({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const near = new THREE.Color(PALETTE.primaryLight);
    const far = new THREE.Color(PALETTE.accent);
    const tmp = new THREE.Color();

    const depth = Math.abs(ACT_Z[ACT_Z.length - 1]) + 60;

    for (let i = 0; i < count; i++) {
      // Distribuição em casca cilíndrica: densa nas bordas, aberta no centro,
      // para não poluir a leitura do texto que fica por cima.
      const angle = Math.random() * Math.PI * 2;
      const radius = 7 + Math.pow(Math.random(), 0.6) * 26;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      positions[i * 3 + 2] = 20 - Math.random() * depth;

      tmp.copy(near).lerp(far, Math.random());
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;

      scales[i] = 0.5 + Math.random() * 1.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.16,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [count]);

  // Geometria e material vêm prontos por props: o R3F não assume a posse
  // deles, então o descarte é nosso.
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    if (!ref.current || state.reducedMotion) return;
    const dt = Math.min(delta, 1 / 30);
    // Rotação lenta do campo inteiro: sensação de movimento sem custo por partícula.
    ref.current.rotation.z += dt * 0.012;
  });

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
