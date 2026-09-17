/**
 * Vetoriza a marca da Bevon (o "B" com o raio) a partir do PNG do guia.
 *
 * Roda uma vez e grava dois arquivos:
 *   public/brand/bevon-mark.svg        -> vetor limpo, para favicon/navbar
 *   components/three/mark-contours.ts  -> contornos normalizados, para o 3D
 *
 * Uso: node scripts/trace-logo.mjs "caminho/da/logo.png"
 *
 * Sem dependências: o PNG é decodificado com o zlib que já vem no Node.
 * Se a logo mudar, rode de novo apontando para o arquivo novo.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = path.resolve(import.meta.dirname, "..");
const DEFAULT_SOURCE = path.join(ROOT, "ChatGPT Image 17 de set. de 2026, 11_46_21.png");

// ---------------------------------------------------------------- PNG

/** Decodifica PNG de 8 bits, não entrelaçado (RGB ou RGBA). */
function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("não é um PNG");

  let p = 8;
  let ihdr = null;
  const idat = [];

  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString("ascii", p + 4, p + 8);
    const data = buf.subarray(p + 8, p + 8 + len);
    if (type === "IHDR") ihdr = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    p += 12 + len;
  }

  const w = ihdr.readUInt32BE(0);
  const h = ihdr.readUInt32BE(4);
  const depth = ihdr[8];
  const colorType = ihdr[9];
  const interlace = ihdr[12];

  if (depth !== 8) throw new Error(`profundidade ${depth} não suportada, use 8 bits`);
  if (interlace !== 0) throw new Error("PNG entrelaçado não suportado");

  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`tipo de cor ${colorType} não suportado (use RGB ou RGBA)`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = channels;
  const stride = w * bpp;
  const out = Buffer.alloc(h * stride);
  const zero = Buffer.alloc(stride);

  let o = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[o++];
    const line = raw.subarray(o, o + stride);
    o += stride;

    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : zero;

    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const b = prev[i];
      const c = i >= bpp ? prev[i - bpp] : 0;
      let v = line[i];

      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const pp = a + b - c;
        const pa = Math.abs(pp - a);
        const pb = Math.abs(pp - b);
        const pc = Math.abs(pp - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[i] = v & 255;
    }
  }

  return { w, h, channels, data: out };
}

// --------------------------------------------------------------- MÁSCARA

/**
 * Isola o glifo do "B".
 *
 * A arte é: fundo roxo, placa branca arredondada, e o B em roxo DENTRO da
 * placa. Roxo sozinho pega fundo e glifo juntos, então o fundo é apagado com
 * um flood fill a partir da borda: o que sobra de roxo é só o B.
 */
function extractGlyphMask(img) {
  const { w, h, channels, data } = img;
  const at = (x, y) => (y * w + x) * channels;

  // A cor de fundo é a do canto — funciona para qualquer variação da arte.
  const bg = [data[at(2, 2)], data[at(2, 2) + 1], data[at(2, 2) + 2]];
  const isBgColor = (x, y) => {
    const i = at(x, y);
    return (
      Math.abs(data[i] - bg[0]) < 40 &&
      Math.abs(data[i + 1] - bg[1]) < 40 &&
      Math.abs(data[i + 2] - bg[2]) < 40
    );
  };

  // Tudo que não é branco é candidato a glifo (ou fundo).
  const isWhite = (x, y) => {
    const i = at(x, y);
    return data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200;
  };

  const candidate = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!isWhite(x, y)) candidate[y * w + x] = 1;
    }
  }

  // Flood fill a partir da moldura: derruba o fundo, preserva o B.
  const stack = [];
  const seen = new Uint8Array(w * h);
  for (let x = 0; x < w; x++) {
    stack.push(x, 0, x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    stack.push(0, y, w - 1, y);
  }

  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const k = y * w + x;
    if (seen[k] || !candidate[k] || !isBgColor(x, y)) continue;
    seen[k] = 1;
    candidate[k] = 0;
    stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  return candidate;
}

/** Mantém só o maior blob conectado: descarta respingos do anti-aliasing. */
function largestComponent(mask, w, h) {
  const label = new Int32Array(w * h).fill(-1);
  let best = -1;
  let bestSize = 0;
  let next = 0;

  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || label[start] !== -1) continue;
    const id = next++;
    let size = 0;
    const stack = [start];
    label[start] = id;

    while (stack.length) {
      const k = stack.pop();
      size++;
      const x = k % w;
      const y = (k / w) | 0;
      const neighbours = [
        x > 0 ? k - 1 : -1,
        x < w - 1 ? k + 1 : -1,
        y > 0 ? k - w : -1,
        y < h - 1 ? k + w : -1,
      ];
      for (const n of neighbours) {
        if (n >= 0 && mask[n] && label[n] === -1) {
          label[n] = id;
          stack.push(n);
        }
      }
    }

    if (size > bestSize) {
      bestSize = size;
      best = id;
    }
  }

  const out = new Uint8Array(w * h);
  for (let k = 0; k < out.length; k++) out[k] = label[k] === best ? 1 : 0;
  return out;
}

// -------------------------------------------------------------- CONTORNOS

/**
 * Segue a fronteira da máscara pelas arestas dos pixels.
 *
 * Cada pixel é um quadrado unitário. Toda aresta com dentro de um lado e fora
 * do outro entra num conjunto dirigido (dentro sempre à esquerda), e as
 * arestas são encadeadas em laços fechados. Contorno exato, sem suavizar nada
 * antes da hora.
 */
function traceContours(mask, w, h) {
  const inside = (x, y) => x >= 0 && y >= 0 && x < w && y < h && mask[y * w + x] === 1;
  const key = (x, y) => x * 100000 + y;

  const edges = new Map(); // ponto inicial -> lista de pontos finais

  const addEdge = (ax, ay, bx, by) => {
    const k = key(ax, ay);
    if (!edges.has(k)) edges.set(k, []);
    edges.get(k).push([bx, by]);
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!inside(x, y)) continue;
      if (!inside(x, y - 1)) addEdge(x, y, x + 1, y);
      if (!inside(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
      if (!inside(x, y + 1)) addEdge(x + 1, y + 1, x, y + 1);
      if (!inside(x - 1, y)) addEdge(x, y + 1, x, y);
    }
  }

  const loops = [];

  while (edges.size) {
    const firstKey = edges.keys().next().value;
    const start = [Math.floor(firstKey / 100000), firstKey % 100000];
    const loop = [start];
    let cur = start;
    let prev = null;

    while (true) {
      const k = key(cur[0], cur[1]);
      const options = edges.get(k);
      if (!options || options.length === 0) break;

      // Num cruzamento de quatro arestas, a curva mais fechada à direita
      // mantém blobs que só se tocam na diagonal separados.
      let pick = 0;
      if (options.length > 1 && prev) {
        const inDir = [cur[0] - prev[0], cur[1] - prev[1]];
        let bestScore = -Infinity;
        options.forEach(([nx, ny], i) => {
          const outDir = [nx - cur[0], ny - cur[1]];
          const cross = inDir[0] * outDir[1] - inDir[1] * outDir[0];
          const dot = inDir[0] * outDir[0] + inDir[1] * outDir[1];
          const score = cross !== 0 ? -cross * 2 : dot;
          if (score > bestScore) {
            bestScore = score;
            pick = i;
          }
        });
      }

      const nextPoint = options.splice(pick, 1)[0];
      if (options.length === 0) edges.delete(k);

      prev = cur;
      cur = nextPoint;

      if (cur[0] === start[0] && cur[1] === start[1]) break;
      loop.push(cur);
    }

    if (loop.length > 8) loops.push(loop);
  }

  return loops;
}

/** Área com sinal. Positiva = anti-horário no sistema do SVG (y para baixo). */
function signedArea(points) {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

/** Douglas-Peucker: joga fora os pontos que não mudam a silhueta. */
function simplify(points, epsilon) {
  if (points.length < 3) return points;

  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;

  const stack = [[0, points.length - 1]];

  while (stack.length) {
    const [first, last] = stack.pop();
    if (last - first < 2) continue;

    const [x1, y1] = points[first];
    const [x2, y2] = points[last];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;

    let maxDist = 0;
    let index = -1;

    for (let i = first + 1; i < last; i++) {
      const [px, py] = points[i];
      const dist = Math.abs(dy * px - dx * py + x2 * y1 - y2 * x1) / len;
      if (dist > maxDist) {
        maxDist = dist;
        index = i;
      }
    }

    if (maxDist > epsilon && index > 0) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }

  return points.filter((_, i) => keep[i]);
}

/**
 * Média móvel curta: tira a escadinha dos pixels.
 *
 * Roda no contorno DENSO, com os vizinhos a um pixel de distância, antes da
 * simplificação. Nessa ordem o raio de suavização fica em ~2px num desenho de
 * 300px e as quinas ficam de pé. Rodar depois de simplificar arredondaria os
 * cantos em ~7px, porque lá os vizinhos estão a 20px.
 */
function smooth(points, strength, passes) {
  const n = points.length;
  if (n < 5) return points;

  let cur = points;
  for (let pass = 0; pass < passes; pass++) {
    const src = cur;
    cur = src.map((p, i) => {
      const prev = src[(i - 1 + n) % n];
      const next = src[(i + 1) % n];
      return [
        p[0] * (1 - strength) + ((prev[0] + next[0]) / 2) * strength,
        p[1] * (1 - strength) + ((prev[1] + next[1]) / 2) * strength,
      ];
    });
  }
  return cur;
}

// ----------------------------------------------------------------- SAÍDA

function main() {
  const source = process.argv[2] || DEFAULT_SOURCE;
  if (!fs.existsSync(source)) {
    console.error(`Arquivo não encontrado: ${source}`);
    process.exit(1);
  }

  console.log(`Lendo ${path.basename(source)}`);
  const img = decodePNG(fs.readFileSync(source));
  console.log(`  ${img.w}x${img.h}, ${img.channels} canais`);

  const raw = extractGlyphMask(img);
  const mask = largestComponent(raw, img.w, img.h);
  const filled = mask.reduce((n, v) => n + v, 0);
  console.log(`  glifo isolado: ${filled} pixels`);

  if (filled < 1000) throw new Error("máscara vazia: a arte de origem não tem o formato esperado");

  const loops = traceContours(mask, img.w, img.h);
  console.log(`  ${loops.length} contorno(s) bruto(s)`);

  // Suaviza primeiro (mata a escadinha), simplifica depois (mantém a quina).
  const processed = loops
    .map((loop) => simplify(smooth(loop, 0.5, 3), 0.5))
    .filter((loop) => Math.abs(signedArea(loop)) > 40);

  processed.sort((a, b) => Math.abs(signedArea(b)) - Math.abs(signedArea(a)));
  console.log(`  ${processed.length} contorno(s) após limpeza`);
  processed.forEach((loop, i) => {
    console.log(`    ${i === 0 ? "externo" : "furo   "}: ${loop.length} pontos`);
  });

  // Caixa delimitadora, para normalizar em torno do centro do glifo.
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const loop of processed) {
    for (const [x, y] of loop) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const spanX = maxX - minX;
  const spanY = maxY - minY;
  const span = Math.max(spanX, spanY);
  console.log(`  caixa: ${spanX.toFixed(0)}x${spanY.toFixed(0)}px`);

  // ---- SVG (y para baixo, viewBox justo no glifo)
  const toPath = (loop) =>
    loop
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${(x - minX).toFixed(1)} ${(y - minY).toFixed(1)}`)
      .join("") + "Z";

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${spanX.toFixed(1)} ${spanY.toFixed(1)}" fill="none">`,
    `  <title>Bevon</title>`,
    `  <path fill="currentColor" fill-rule="evenodd" d="${processed.map(toPath).join("")}"/>`,
    `</svg>`,
    ``,
  ].join("\n");

  const svgPath = path.join(ROOT, "public", "brand", "bevon-mark.svg");
  fs.mkdirSync(path.dirname(svgPath), { recursive: true });
  fs.writeFileSync(svgPath, svg);
  console.log(`Gravado ${path.relative(ROOT, svgPath)} (${(svg.length / 1024).toFixed(1)} KB)`);

  // ---- Contornos para o three.js: centrados em 0, y para CIMA, altura 1.
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const norm = (loop) =>
    loop.map(([x, y]) => [
      Number(((x - cx) / span).toFixed(4)),
      Number((-(y - cy) / span).toFixed(4)),
    ]);

  // A inversão do Y troca o sinal da área, então a orientação é recalculada
  // depois de normalizar, nunca antes.
  const normalized = processed.map(norm);
  const outer = normalized[0];
  const holes = normalized.slice(1);

  const fmt = (loop) =>
    "  [\n" +
    loop.map(([x, y]) => `    [${x}, ${y}],`).join("\n") +
    "\n  ],";

  const ts = [
    "/**",
    " * Contornos da marca da Bevon, gerados por scripts/trace-logo.mjs.",
    " *",
    " * NÃO EDITE À MÃO. Para atualizar, rode:",
    " *   node scripts/trace-logo.mjs \"caminho/da/logo.png\"",
    " *",
    " * Sistema de coordenadas: centrado na origem, Y para cima, maior lado = 1.",
    " * Pronto para THREE.Shape sem nenhuma transformação.",
    " */",
    "",
    "export type Contour = [number, number][];",
    "",
    `/** Silhueta externa do "B". */`,
    "export const MARK_OUTLINE: Contour = [",
    outer.map(([x, y]) => `  [${x}, ${y}],`).join("\n"),
    "];",
    "",
    "/** Vazios internos: o contra-forma do B e o corte do raio. */",
    "export const MARK_HOLES: Contour[] = [",
    holes.map(fmt).join("\n"),
    "];",
    "",
    "/** Proporção largura/altura do glifo, para enquadrar sem distorcer. */",
    `export const MARK_ASPECT = ${(spanX / spanY).toFixed(4)};`,
    "",
  ].join("\n");

  const tsPath = path.join(ROOT, "components", "three", "mark-contours.ts");
  fs.writeFileSync(tsPath, ts);
  console.log(`Gravado ${path.relative(ROOT, tsPath)} (${(ts.length / 1024).toFixed(1)} KB)`);
}

main();
