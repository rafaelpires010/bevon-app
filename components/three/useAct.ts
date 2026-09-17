"use client";

import { useEffect, useRef } from "react";
import { registerAct } from "@/lib/scene-store";

/**
 * Ancora uma seção HTML a um ato da cena 3D.
 * A câmera interpola entre as âncoras conforme o scroll.
 */
export function useAct<T extends HTMLElement = HTMLElement>(index: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    registerAct(index, ref.current);
    return () => registerAct(index, null);
  }, [index]);

  return ref;
}
