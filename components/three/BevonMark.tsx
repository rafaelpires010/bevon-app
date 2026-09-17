"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { state } from "@/lib/scene-store";
import { pickBackdrop, projectBackdropPoint } from "./backdrop";
import { EXIT, PALETTE } from "./config";
import { createMarkFragments } from "./mark-fragments";
import { createMarkGeometry } from "./mark-shape";

/** Altura da marca em unidades de cena. */
const SIZE = 5.2;

const tmpHome = new THREE.Vector3();
const tmpOffset = new THREE.Vector3();

/**
 * Ferramentas para pousar a marca no pódio desenhado na arte do fundo.
 *
 * O caminho é um raio, não uma conta de trigonometria: a gente sabe em que
 * PONTO DA TELA o pódio está (o backdrop calcula isso a partir do corte da
 * imagem) e joga um raio da câmera por aquele pixel até o plano Z=0, onde a
 * marca vive. O que volta é a posição em unidades de cena.
 *
 * Vale a pena por causa do que vem de graça: distância da câmera, campo de
 * visão, proporção da janela e o balanço de ponteiro do Rig já estão todos
 * dentro da matriz da câmera. Qualquer um deles mudando, o raio acompanha, e a
 * marca não desliza do pódio.
 */
const tmpNdc = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
/** O plano em que a marca mora. */
const markPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

/** Suaviza as pontas: a saída começa e termina sem esbarrão. */
function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * A marca da Bevon, extrudada do vetor da logo real, que se desmonta na rolagem.
 *
 * Inteira ela balança em vez de girar: uma volta completa mostraria a face de
 * trás, onde o "B" aparece espelhado e lê como logo errada.
 *
 * Ao rolar a primeira tela ela se parte em cacos que voam para fora. O corte é
 * por células de grade (ver mark-fragments), e em repouso os cacos remontam o
 * desenho exato, sem costura. Quem some da tela é a marca; o conteúdo abaixo
 * fica com o fundo limpo.
 */
export function BevonMark({ lowQuality }: { lowQuality: boolean }) {
  const group = useRef<THREE.Group>(null);
  const swing = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const pieces = useRef<(THREE.Mesh | null)[]>([]);

  const geometry = useMemo(
    () =>
      createMarkGeometry({
        depth: 0.2,
        bevel: lowQuality ? 0 : 0.014,
        bevelSegments: lowQuality ? 1 : 4,
        curveSegments: lowQuality ? 3 : 6,
      }),
    [lowQuality]
  );

  const fragments = useMemo(
    () =>
      createMarkFragments(geometry, {
        cols: lowQuality ? 3 : 5,
        rows: lowQuality ? 4 : 6,
      }),
    [geometry, lowQuality]
  );

  /**
   * Metal roxo anodizado.
   *
   * metalness alto só funciona porque StudioEnvironment coloca um ambiente na
   * cena: metal em PBR não tem cor própria, ele devolve o que está em volta.
   * A rugosidade baixa mantém o reflexo apertado, que é o que dá a leitura de
   * peça usinada em vez de plástico, e o verniz por cima acrescenta o brilho
   * duro na quina do chanfro.
   */
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: PALETTE.mark,
        roughness: 0.22,
        metalness: 0.92,
        envMapIntensity: 1.15,
        clearcoat: lowQuality ? 0 : 1,
        clearcoatRoughness: 0.08,
        transparent: true,
      }),
    [lowQuality]
  );

  // Geometrias e material construídos à mão: o React não libera isso sozinho.
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
      fragments.forEach((f) => f.geometry.dispose());
    };
  }, [geometry, material, fragments]);

  useFrame((s, delta) => {
    if (!group.current || !swing.current) return;
    const dt = Math.min(delta, 1 / 30);

    const exit = easeInOut(THREE.MathUtils.clamp(state.heroExit, 0, 1));
    const intact = 1 - exit;

    /*
      Onde o pódio da arte está na tela agora, e que ponto da cena é aquele.
      A conta refaz o corte do object-cover e o raio traz o resultado para
      unidades de mundo; `+ SIZE / 2` sobe do apoio até o centro da marca,
      porque a geometria é centrada nos três eixos e o pódio é o pé dela.
    */
    const camera = s.camera as THREE.PerspectiveCamera;
    const art = pickBackdrop(camera.aspect);
    const screen = projectBackdropPoint(art, camera.aspect);
    tmpNdc.set(screen.x * 2 - 1, 1 - screen.y * 2);
    raycaster.setFromCamera(tmpNdc, camera);

    if (raycaster.ray.intersectPlane(markPlane, tmpHome)) {
      tmpHome.y += SIZE / 2;
    } else {
      // Raio paralelo ao plano não acontece com esta câmera, mas se acontecer
      // a marca fica onde está em vez de saltar para a origem.
      tmpHome.copy(group.current.position);
    }

    if (!state.reducedMotion) {
      tmpHome.y += Math.sin(s.clock.elapsedTime * 0.5) * 0.3 * intact;
    }
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, tmpHome.x, 4, dt);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, tmpHome.y, 4, dt);

    // O balanço perde força conforme a marca se desfaz: peça quebrada não
    // balança junto, cada caco passa a ter o giro dele.
    if (state.reducedMotion) {
      swing.current.rotation.set(0, 0, 0);
    } else {
      const t = s.clock.elapsedTime;
      swing.current.rotation.y = Math.sin(t * 0.34) * 0.42 * intact;
      swing.current.rotation.x = Math.sin(t * 0.26) * 0.11 * intact;
    }

    // A sombra é uma silhueta inteira: some cedo, antes de os cacos abrirem
    // o bastante para ela aparecer solta atrás deles.
    if (shadow.current) {
      const shadowMaterial = shadow.current.material as THREE.MeshBasicMaterial;
      shadowMaterial.opacity = 0.14 * Math.max(0, 1 - exit * 3);
      shadow.current.visible = shadowMaterial.opacity > 0.001;
    }

    for (let i = 0; i < fragments.length; i++) {
      const mesh = pieces.current[i];
      const fragment = fragments[i];
      if (!mesh) continue;

      // Cada caco tem o próprio atraso: a debandada escalona em vez de a
      // marca inteira explodir num quadro só.
      const local = THREE.MathUtils.clamp(
        (exit - fragment.delay) / (1 - fragment.delay),
        0,
        1
      );
      const travel = local * local;

      tmpOffset.copy(fragment.direction).multiplyScalar(travel * fragment.distance);
      mesh.position.copy(fragment.home).add(tmpOffset);

      mesh.rotation.x = fragment.spin.x * travel;
      mesh.rotation.y = fragment.spin.y * travel;
      mesh.rotation.z = fragment.spin.z * travel;

      // Encolhem no fim do voo: evita caco gigante cruzando a tela na volta.
      mesh.scale.setScalar(1 - travel * 0.45);
    }

    // Opacidade é do material compartilhado: um material por caco custaria um
    // programa de shader para cada um.
    //
    // Os cacos ficam sólidos enquanto só se afastam, e só começam a apagar em
    // fadeStart. O zero cai em fadeEnd, o mesmo ponto em que o fundo termina de
    // escurecer: os dois lêem EXIT, então continuam casados em qualquer ajuste.
    const fade = THREE.MathUtils.clamp(
      (state.heroExit - EXIT.fadeStart) / (EXIT.fadeEnd - EXIT.fadeStart),
      0,
      1
    );
    material.opacity = 1 - easeInOut(fade);
    group.current.visible = material.opacity > 0.01;
  });

  // Ponto de partida do lado do pódio: o primeiro quadro já corrige para a
  // posição exata, e começar perto evita ver a marca deslizar até lá.
  return (
    <group ref={group} position={[3.2, 0, 0]}>
      <group ref={swing} scale={SIZE}>
        {/* Sombra: a mesma forma atrás, um fio maior e deslocada, em roxo
            fechado. Sobre fundo claro é isso que descola o B da parede.
            Um halo aditivo, que era o truque do fundo escuro, some por
            completo no branco: claro somado a claro continua claro. */}
        {!lowQuality && (
          <mesh ref={shadow} geometry={geometry} scale={1.02} position={[0.035, -0.045, -0.02]}>
            <meshBasicMaterial
              color={PALETTE.mark}
              transparent
              opacity={0.14}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        )}

        {fragments.map((fragment, i) => (
          <mesh
            key={i}
            ref={(mesh) => {
              pieces.current[i] = mesh;
            }}
            geometry={fragment.geometry}
            material={material}
            position={fragment.home}
          />
        ))}
      </group>
    </group>
  );
}
