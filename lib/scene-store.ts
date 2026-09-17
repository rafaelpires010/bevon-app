/**
 * Estado da cena 3D fora do React.
 *
 * Scroll e ponteiro são lidos dentro do useFrame via ref — durante o scroll
 * NENHUM componente React re-renderiza. Esse é o ponto crítico de
 * performance da cena persistente.
 */

export type Quality = "high" | "low" | "off";

export type SceneState = {
  /** Progresso do documento, 0..1. */
  progress: number;
  /**
   * Quanto da primeira tela já passou, 0..1.
   *
   * 0 no topo, 1 quando o visitante rolou uma altura de viewport inteira. É
   * isto que comanda a desmontagem da marca: `progress` não serve, porque
   * numa página longa o herói ocupa uma fração pequena demais dele e o efeito
   * mal sairia do lugar.
   */
  heroExit: number;
  /** Ato atual como float (0..ACT_COUNT-1), interpolado entre seções. */
  act: number;
  /** Ponteiro normalizado, -1..1. */
  pointerX: number;
  pointerY: number;
  quality: Quality;
  reducedMotion: boolean;
};

export const state: SceneState = {
  progress: 0,
  heroExit: 0,
  act: 0,
  pointerX: 0,
  pointerY: 0,
  quality: "high",
  reducedMotion: false,
};

/** Elementos HTML que ancoram cada ato da cena. */
const actAnchors = new Map<number, HTMLElement>();

/**
 * Centros das âncoras em coordenadas de documento.
 *
 * Medir com getBoundingClientRect a cada frame forçaria o navegador a
 * recalcular layout 60x por segundo. Medimos só quando o layout muda de fato
 * (resize da janela, imagem que carregou, seção que apareceu).
 */
let measured: { index: number; center: number }[] = [];
let needsMeasure = true;

export function registerAct(index: number, el: HTMLElement | null) {
  if (el) actAnchors.set(index, el);
  else actAnchors.delete(index);
  needsMeasure = true;
}

function measure() {
  measured = Array.from(actAnchors.entries())
    .map(([index, el]) => {
      const rect = el.getBoundingClientRect();
      return { index, center: rect.top + window.scrollY + rect.height / 2 };
    })
    .sort((a, b) => a.index - b.index);
  needsMeasure = false;
}

/**
 * Converte a posição de scroll num valor contínuo de "ato".
 * Interpola entre as duas âncoras vizinhas, para a câmera viajar
 * suavemente em vez de saltar entre seções.
 */
function computeAct(): number {
  if (needsMeasure) measure();
  if (measured.length === 0) return 0;

  const viewCenter = window.scrollY + window.innerHeight / 2;
  const first = measured[0];
  const last = measured[measured.length - 1];

  if (viewCenter <= first.center) return first.index;
  if (viewCenter >= last.center) return last.index;

  for (let i = 0; i < measured.length - 1; i++) {
    const a = measured[i];
    const b = measured[i + 1];
    if (viewCenter >= a.center && viewCenter <= b.center) {
      const span = b.center - a.center || 1;
      return a.index + ((viewCenter - a.center) / span) * (b.index - a.index);
    }
  }

  return last.index;
}

let rafId = 0;
let running = false;
let resizeObserver: ResizeObserver | null = null;

function tick() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  state.progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  state.heroExit = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
  state.act = computeAct();
  rafId = requestAnimationFrame(tick);
}

function onPointerMove(e: PointerEvent) {
  state.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
  state.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
}

function invalidateMeasure() {
  needsMeasure = true;
}

/** Inicia os listeners globais. Idempotente. */
export function startSceneDriver(): () => void {
  if (running) return () => {};
  running = true;

  state.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Parallax só onde existe um ponteiro de verdade.
   *
   * Em tela de toque, `pointermove` dispara no toque: um toque na lateral
   * esquerda jogava a câmera para o lado e empurrava a marca para fora da
   * borda direita. Sem listener, pointerX e pointerY ficam em zero e o Rig
   * simplesmente não tem o que aplicar.
   */
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (finePointer) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }

  window.addEventListener("resize", invalidateMeasure, { passive: true });

  // Pega mudanças de altura do documento (imagens carregando, fontes trocando).
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(invalidateMeasure);
    resizeObserver.observe(document.documentElement);
  }

  rafId = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", invalidateMeasure);
    resizeObserver?.disconnect();
    resizeObserver = null;
  };
}
