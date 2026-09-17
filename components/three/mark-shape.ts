import * as THREE from "three";
import { MARK_HOLES, MARK_OUTLINE, type Contour } from "./mark-contours";

/**
 * Converte os contornos vetorizados da marca em geometria 3D.
 *
 * Os contornos já saem do tracer centrados na origem, com Y para cima e o
 * maior lado valendo 1 — a mesma convenção do three.js. Nada de transformar
 * aqui: o que o script gravou é o que entra na cena.
 */

function appendContour(target: THREE.Path | THREE.Shape, contour: Contour) {
  target.moveTo(contour[0][0], contour[0][1]);
  for (let i = 1; i < contour.length; i++) {
    target.lineTo(contour[i][0], contour[i][1]);
  }
  target.closePath();
}

/** A silhueta do "B" com seus vazios, pronta para extrusão. */
export function createMarkShape(): THREE.Shape {
  const shape = new THREE.Shape();
  appendContour(shape, MARK_OUTLINE);

  for (const hole of MARK_HOLES) {
    const path = new THREE.Path();
    appendContour(path, hole);
    shape.holes.push(path);
  }

  return shape;
}

export type MarkGeometryOptions = {
  /** Espessura da extrusão, na mesma escala do contorno (altura = 1). */
  depth?: number;
  /** Chanfro: a aresta viva que pega a luz. 0 desliga. */
  bevel?: number;
  /** Segmentos da curva do chanfro. Baixe em dispositivos modestos. */
  bevelSegments?: number;
  /** Subdivisão dos contornos. Baixe em dispositivos modestos. */
  curveSegments?: number;
};

/**
 * Marca extrudada, centrada nos três eixos.
 *
 * ExtrudeGeometry cresce de Z=0 para Z=depth, então a geometria é empurrada
 * meia profundidade para trás: assim ela gira em torno do próprio centro em
 * vez de orbitar a própria face traseira.
 *
 * O chanfro NÃO entra nessa conta: ele sobra igual dos dois lados (-bevel na
 * frente, +bevel atrás), então o meio continua sendo depth/2. Descontar o
 * chanfro aqui joga a marca para fora do eixo.
 */
export function createMarkGeometry(options: MarkGeometryOptions = {}): THREE.ExtrudeGeometry {
  const { depth = 0.2, bevel = 0.014, bevelSegments = 4, curveSegments = 6 } = options;

  const geometry = new THREE.ExtrudeGeometry(createMarkShape(), {
    depth,
    curveSegments,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: 0,
    bevelSegments,
  });

  geometry.translate(0, 0, -depth / 2);
  geometry.computeVertexNormals();

  return geometry;
}
