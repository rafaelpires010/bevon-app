"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

/**
 * Congela o render loop quando a aba está em segundo plano.
 * Sem isso a cena continua desenhando e queimando bateria/CPU do visitante.
 */
export function FrameloopGuard() {
  const setFrameloop = useThree((s) => s.setFrameloop);

  useEffect(() => {
    const onVisibility = () => {
      setFrameloop(document.hidden ? "never" : "always");
    };

    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      setFrameloop("always");
    };
  }, [setFrameloop]);

  return null;
}
