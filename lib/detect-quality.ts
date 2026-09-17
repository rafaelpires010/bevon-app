import type { Quality } from "./scene-store";

/**
 * Decide o nível de qualidade da cena sem depender de rede.
 *
 * (Alternativa considerada: useDetectGPU do drei. Descartada porque baixa
 * uma base de benchmark de CDN externo em runtime — latência e dependência
 * de terceiro numa página cujo objetivo é converter.)
 */
export function detectQuality(): Quality {
  if (typeof window === "undefined") return "off";

  // 1. WebGL disponível?
  const canvas = document.createElement("canvas");
  const gl = (canvas.getContext("webgl2") ||
    canvas.getContext("webgl")) as WebGLRenderingContext | null;

  if (!gl) return "off";

  // 2. Renderizador por software (SwiftShader/llvmpipe) não aguenta a cena.
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  if (debugInfo) {
    const renderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) ?? "");
    if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return "off";
  }

  // Libera o contexto de teste — navegadores limitam contextos WebGL simultâneos.
  gl.getExtension("WEBGL_lose_context")?.loseContext();

  /*
    3. Sinais de dispositivo modesto → cena reduzida, não desligada.

    Duas armadilhas que estavam aqui e jogavam aparelho bom no perfil pobre:

    - "tela pequena e dedo" NÃO é sinal de fraqueza. Celular de hoje roda esta
      cena com folga, e essa regra sozinha condenava todos eles a dpr 1.15 sem
      antisserrilhado — o que se via era um B em escada, não um B de metal.
    - Ausência de informação não é informação. `deviceMemory` só existe em
      navegador Chromium; o `?? 4` transformava todo Safari, de iPhone a Mac,
      em "4 GB" e portanto em modesto. Agora só conta o sinal que existe.
  */
  const cores = navigator.hardwareConcurrency;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

  const weakCpu = typeof cores === "number" && cores <= 4;
  const weakMemory = typeof memory === "number" && memory <= 4;

  if (weakCpu || weakMemory) return "low";

  return "high";
}

/** Respeita a preferência de movimento reduzido do sistema. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
