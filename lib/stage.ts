/**
 * Onde existe a dobra clara com a marca 3D.
 *
 * Só na home: é lá que a primeira tela é reservada para o B em cima do pódio,
 * sobre a arte clara. Todo o resto do site nasce no escuro da casa.
 *
 * Duas coisas precisam concordar com isto, e por isso a regra mora num lugar
 * só: o fundo (SiteBackground escolhe entre a cena e o fundo escuro) e a barra
 * do topo (que é clara enquanto está sobre o claro). Se as duas discordassem,
 * a barra abriria branca sobre uma página preta.
 */
export function hasLightStage(pathname: string | null | undefined): boolean {
  return pathname === "/";
}
