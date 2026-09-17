"use client";

import dynamic from "next/dynamic";

/**
 * Ponto de entrada do 3D. ssr:false porque a cena depende de window/WebGL —
 * e assim o bundle do three.js sai do carregamento inicial da página.
 */
const SceneCanvas = dynamic(
  () => import("./SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

export function Scene3D() {
  return <SceneCanvas />;
}
