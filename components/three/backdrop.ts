/**
 * As artes da primeira tela e o que elas contêm.
 *
 * A composição está achatada no PNG — cards, fios e pódio são pixels, não
 * objetos de cena. O único ponto que o 3D precisa conhecer é o pódio, porque é
 * nele que a marca se apoia.
 *
 * São duas artes porque uma só não serve: a horizontal é 2,03:1 e a tela de
 * celular é ~0,49:1. Cobrir uma com a outra ampliaria a imagem umas quatro
 * vezes, e o pódio sairia maior que a largura da tela.
 */

/**
 * Como a arte ocupa a tela.
 *
 * `cover` é o comportamento normal: amplia até cobrir os dois eixos e corta o
 * que sobra, com `focus` decidindo por onde cortar.
 *
 * `width` é o caso do celular: a arte ocupa a largura inteira e a altura vem
 * do que ela é, sem corte lateral nenhum — é isso que mantém os quatro cards
 * dentro da tela. Sobra altura, e essa sobra é resolvida ancorando a arte
 * ABAIXO da borda de baixo (`bottomOffset`, em alturas de tela): o rodapé de
 * seda lisa sai de quadro, o pódio sobe, e o vazio vai todo para o topo, onde
 * a barra e o painel de texto já estão por cima.
 */
export type BackdropLayout =
  | { mode: "cover"; focus: { x: number; y: number } }
  | { mode: "width"; bottomOffset: number };

export type BackdropArt = {
  src: string;
  width: number;
  height: number;
  /**
   * Centro do topo do pódio, em fração da arte (0,0 no canto superior
   * esquerdo). É onde a BASE da marca encosta.
   */
  podium: { x: number; y: number };
  /**
   * Largura do pódio, em fração da largura da arte.
   *
   * É a régua da marca: o B é dimensionado como uma proporção disto, e não em
   * unidades fixas de cena. Sem essa régua, a marca mantinha o mesmo tamanho
   * de mundo enquanto a arte encolhia com a tela — e no celular ela crescia
   * para fora do pódio, subindo por cima do texto.
   */
  podiumWidth: number;
  /** Espelhado no CSS (.backdrop-art, em globals.css). Mudou aqui, mude lá. */
  layout: BackdropLayout;
};

/** Tela deitada: monitor, notebook, tablet virado. */
export const BACKDROP_WIDE: BackdropArt = {
  src: "/brand/fundo.png",
  width: 1786,
  height: 880,
  podium: { x: 0.71, y: 0.795 },
  podiumWidth: 0.35,
  layout: {
    mode: "cover",
    /**
     * Em janela mais estreita que 2,03:1 o corte é horizontal, e centralizar
     * levaria o pódio para fora pela direita. O enquadramento puxa para lá.
     */
    focus: { x: 0.78, y: 0.5 },
  },
};

/** Tela em pé: celular. */
export const BACKDROP_TALL: BackdropArt = {
  src: "/brand/fundo-mobile.png",
  width: 940,
  height: 1672,
  podium: { x: 0.571, y: 0.721 },
  podiumWidth: 0.6,
  layout: { mode: "width", bottomOffset: 0.12 },
};

/**
 * Quanto da arte aparece, de 0 a 1.
 *
 * Abaixo dela está a cor da cena (PALETTE.canvas), então baixar isto não abre
 * buraco: lava a arte na direção do claro da casa. As ondas e os cards perdem
 * força e o B, que é a peça mais escura e mais saturada da tela, ganha a
 * diferença. É o botão para dosar o quanto o fundo compete.
 *
 * É também a cor que preenche a faixa de cima no celular, onde a arte não
 * alcança — quanto mais lavada a arte, menos se percebe a emenda.
 */
export const BACKDROP_OPACITY = 0.6;

/**
 * Onde uma arte troca pela outra.
 *
 * 1 é o ponto em que a tela deixa de ser deitada e passa a ser em pé — a mesma
 * fronteira que o CSS chama de `orientation: portrait`, que é o que faz a
 * troca no navegador. As duas precisam bater, senão o 3D calcula o pódio de
 * uma arte enquanto a outra está na tela.
 */
export const BACKDROP_SWITCH_ASPECT = 1;

/** A arte que está na tela nesta proporção de janela. */
export function pickBackdrop(viewportAspect: number): BackdropArt {
  return viewportAspect < BACKDROP_SWITCH_ASPECT ? BACKDROP_TALL : BACKDROP_WIDE;
}

/**
 * Onde um ponto da arte cai na janela.
 *
 * Recebe um ponto em frações da arte e devolve frações da janela (0..1, do canto superior
 * esquerdo). Refaz em JavaScript o mesmo enquadramento que o CSS aplica na
 * imagem; sem isto a marca ficaria em cima do pódio só na proporção exata em
 * que a arte foi desenhada.
 *
 * Tudo em frações de tela, nunca em pixels: assim a conta daqui e a regra do
 * CSS não podem divergir por causa de barra de endereço que aparece e some.
 */
export function projectBackdropPoint(
  art: BackdropArt,
  point: { x: number; y: number },
  viewportAspect: number
): { x: number; y: number } {
  const artAspect = art.width / art.height;

  if (art.layout.mode === "width") {
    // Largura cheia: o eixo X passa direto. Altura da arte medida em alturas
    // de tela.
    const height = viewportAspect / artAspect;
    const top = 1 + art.layout.bottomOffset - height;
    return { x: point.x, y: top + point.y * height };
  }

  const { focus } = art.layout;

  if (viewportAspect >= artAspect) {
    // Janela mais larga que a arte: ela cobre a largura inteira e sobra altura.
    const visible = artAspect / viewportAspect;
    const top = focus.y * (1 - visible);
    return { x: point.x, y: (point.y - top) / visible };
  }

  // Janela mais estreita: cobre a altura inteira e sobra largura.
  const visible = viewportAspect / artAspect;
  const left = focus.x * (1 - visible);
  return { x: (point.x - left) / visible, y: point.y };
}
