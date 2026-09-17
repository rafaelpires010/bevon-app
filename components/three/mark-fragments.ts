import * as THREE from "three";

/**
 * Quebra a marca em cacos para a desmontagem no scroll.
 *
 * O corte é por células de uma grade sobre o desenho: cada triângulo vai para
 * a célula onde cai o centro dele, e cada célula vira um caco. Os vértices não
 * são movidos nem duplicados, então em repouso os cacos remontam o "B" exato,
 * sem costura visível. O que separa os pedaços é a posição do mesh, não a
 * geometria.
 */

export type Fragment = {
  /** Geometria do caco, com a origem no próprio centro para girar direito. */
  geometry: THREE.BufferGeometry;
  /** Onde o caco fica quando a marca está inteira. */
  home: THREE.Vector3;
  /** Para onde ele voa. Normalizado. */
  direction: THREE.Vector3;
  /** Eixo e velocidade do giro durante o voo. */
  spin: THREE.Vector3;
  /** Atraso na saída, 0..1. Escalona a debandada em vez de soltar tudo junto. */
  delay: number;
  /** Distância de voo, em unidades da marca. */
  distance: number;
};

/** PRNG com semente: o efeito precisa ser igual em todo carregamento. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type FragmentOptions = {
  /** Divisões da grade na horizontal. */
  cols?: number;
  /** Divisões da grade na vertical. */
  rows?: number;
  /** Semente do sorteio das direções. */
  seed?: number;
};

export function createMarkFragments(
  source: THREE.BufferGeometry,
  options: FragmentOptions = {}
): Fragment[] {
  const { cols = 5, rows = 5, seed = 20260917 } = options;
  const random = mulberry32(seed);

  // Indexada, três vértices consecutivos não formam um triângulo. Desfaz o
  // índice para poder varrer triângulo a triângulo.
  const geometry = source.index ? source.toNonIndexed() : source;
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;

  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const spanX = box.max.x - box.min.x || 1;
  const spanY = box.max.y - box.min.y || 1;

  type Bucket = { positions: number[]; normals: number[] };
  const buckets = new Map<number, Bucket>();

  const triangleCount = position.count / 3;

  for (let t = 0; t < triangleCount; t++) {
    const base = t * 3;

    // Célula pelo centro do triângulo: o triângulo inteiro acompanha o caco,
    // então nenhuma face fica dividida entre dois pedaços.
    let cx = 0;
    let cy = 0;
    for (let v = 0; v < 3; v++) {
      cx += position.getX(base + v);
      cy += position.getY(base + v);
    }
    cx /= 3;
    cy /= 3;

    const col = Math.min(cols - 1, Math.floor(((cx - box.min.x) / spanX) * cols));
    const row = Math.min(rows - 1, Math.floor(((cy - box.min.y) / spanY) * rows));
    const key = row * cols + col;

    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { positions: [], normals: [] };
      buckets.set(key, bucket);
    }

    for (let v = 0; v < 3; v++) {
      const i = base + v;
      bucket.positions.push(position.getX(i), position.getY(i), position.getZ(i));
      if (normal) bucket.normals.push(normal.getX(i), normal.getY(i), normal.getZ(i));
    }
  }

  // toNonIndexed devolve uma cópia; a original não é nossa para descartar.
  if (geometry !== source) geometry.dispose();

  const fragments: Fragment[] = [];

  for (const bucket of Array.from(buckets.values())) {
    const count = bucket.positions.length / 3;
    if (count === 0) continue;

    // Centro do caco, para a geometria nascer na própria origem.
    const home = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      home.x += bucket.positions[i * 3];
      home.y += bucket.positions[i * 3 + 1];
      home.z += bucket.positions[i * 3 + 2];
    }
    home.divideScalar(count);

    const positions = new Float32Array(bucket.positions.length);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = bucket.positions[i * 3] - home.x;
      positions[i * 3 + 1] = bucket.positions[i * 3 + 1] - home.y;
      positions[i * 3 + 2] = bucket.positions[i * 3 + 2] - home.z;
    }

    const fragmentGeometry = new THREE.BufferGeometry();
    fragmentGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    if (bucket.normals.length) {
      fragmentGeometry.setAttribute(
        "normal",
        new THREE.BufferAttribute(new Float32Array(bucket.normals), 3)
      );
    } else {
      fragmentGeometry.computeVertexNormals();
    }

    // Voa para fora, na direção em que já estava. Quem nasce perto do centro
    // não tem direção própria, então ganha uma sorteada em vez de ficar parado.
    const direction = new THREE.Vector3(home.x, home.y, 0);
    if (direction.lengthSq() < 1e-4) {
      direction.set(random() - 0.5, random() - 0.5, 0);
    }
    direction.normalize();
    direction.x += (random() - 0.5) * 0.45;
    direction.y += (random() - 0.5) * 0.45;
    // Um empurrão para trás: os cacos se afastam de quem olha em vez de
    // passarem raspando pela câmera.
    direction.z = -0.15 - random() * 0.5;
    direction.normalize();

    fragments.push({
      geometry: fragmentGeometry,
      home,
      direction,
      spin: new THREE.Vector3(
        (random() - 0.5) * 3.2,
        (random() - 0.5) * 3.2,
        (random() - 0.5) * 3.2
      ),
      delay: random() * 0.35,
      // Em unidades da marca, onde o "B" inteiro mede 1. A cena escala isso
      // por SIZE, então 2.2 a 4.8 aqui já tira o caco da tela no fim do voo,
      // e o avanço é quadrático: a abertura bonita acontece no começo.
      distance: 2.2 + random() * 2.6,
    });
  }

  return fragments;
}
