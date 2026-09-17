import * as THREE from "three";

const W = 512;
const H = 160;

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Gera a "placa" de um parceiro/cliente como textura de canvas.
 *
 * Wordmark desenhado em vez de arquivo de logo: zero assets para gerenciar,
 * nítido em qualquer distância e o anel aceita novos nomes só editando
 * lib/site-data.ts. Troque por useTexture se receber os logos oficiais.
 */
export function createWordmarkTexture(label: string, accent: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, W, H);

  // Placa de vidro
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "rgba(255,255,255,0.10)");
  bg.addColorStop(1, "rgba(255,255,255,0.03)");
  ctx.fillStyle = bg;
  roundedRect(ctx, 6, 6, W - 12, H - 12, 28);
  ctx.fill();

  ctx.strokeStyle = "rgba(196,181,253,0.35)";
  ctx.lineWidth = 2;
  roundedRect(ctx, 6, 6, W - 12, H - 12, 28);
  ctx.stroke();

  // Marcador de acento à esquerda
  ctx.fillStyle = accent;
  roundedRect(ctx, 26, H / 2 - 22, 6, 44, 3);
  ctx.fill();

  // Wordmark
  const fontSize = label.length > 16 ? 40 : label.length > 11 ? 48 : 56;
  ctx.font = `700 ${fontSize}px Inter, system-ui, -apple-system, "Segoe UI", sans-serif`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.shadowColor = accent;
  ctx.shadowBlur = 18;
  ctx.fillText(label, 52, H / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}
