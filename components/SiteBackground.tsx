"use client";

import { usePathname } from "next/navigation";
import { DarkBackdrop } from "@/components/three/DarkBackdrop";
import { Scene3D } from "@/components/three/Scene3D";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";
import { hasLightStage } from "@/lib/stage";

/**
 * Monta o fundo do site público: a arte da primeira tela e, por cima dela, a
 * cena 3D.
 *
 * A ordem importa. O canvas é carregado com ssr:false, porque depende de
 * window e WebGL e porque o three.js não tem o que fazer no bundle inicial;
 * se a arte morasse lá dentro, a primeira tela ficaria na cor de pré-hidratação
 * (escura) até o JS chegar, e só então piscaria para claro. Fora dele, a
 * imagem vem no HTML da resposta e o navegador já a busca com prioridade.
 *
 * O painel /admin fica de fora dos dois: é ferramenta de trabalho, não peça de
 * conversão — não faz sentido gastar GPU nem atrapalhar a leitura de tabelas.
 */
export function SiteBackground() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  /*
    A arte clara e a marca 3D são o palco da PRIMEIRA TELA DA HOME, e só dela.

    A home reserva uma dobra inteira sem texto para o B ficar em cima do pódio,
    e o véu escurece o fundo conforme a pessoa rola dali para baixo. As páginas
    internas não têm essa dobra: o conteúdo começa logo abaixo da barra, em
    branco sobre escuro, e cair sobre a seda clara deixava título e corpo
    ilegíveis — além de a marca 3D passar por trás dos cartões.

    Então elas nascem no escuro da casa, direto.
  */
  if (!hasLightStage(pathname)) return <DarkBackdrop />;

  return (
    <>
      <SceneBackdrop />
      <Scene3D />
    </>
  );
}
