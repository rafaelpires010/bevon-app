/**
 * Layout espacial da cena persistente.
 *
 * A cena é um "túnel": cada ato ocupa uma faixa de Z, e a câmera viaja
 * de Z positivo para Z negativo conforme o usuário rola a página.
 * Cada seção HTML ancora um ato (ver useAct).
 */

export const ACT = {
  HERO: 0,
  SERVICES: 1,
  CASES: 2,
  PARTNERS: 3,
  PROCESS: 4,
  CONTACT: 5,
} as const;

export const ACT_COUNT = 6;

/** Profundidade de cada ato no túnel. */
export const ACT_Z = [0, -34, -68, -102, -136, -170];

/** Keyframes da câmera por ato: posição + alvo do olhar. */
export type CameraKeyframe = {
  position: [number, number, number];
  target: [number, number, number];
};

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { position: [0, 0.4, ACT_Z[0] + 14], target: [0, 0, ACT_Z[0]] },
  { position: [3.2, 1.2, ACT_Z[1] + 15], target: [0, 0, ACT_Z[1]] },
  { position: [-3.0, 0.8, ACT_Z[2] + 16], target: [0, 0, ACT_Z[2]] },
  { position: [0, 1.6, ACT_Z[3] + 17], target: [0, 0, ACT_Z[3]] },
  { position: [2.6, -0.8, ACT_Z[4] + 15], target: [0, 0, ACT_Z[4]] },
  { position: [0, 0, ACT_Z[5] + 13], target: [0, 0, ACT_Z[5]] },
];

/**
 * Paleta da cena.
 *
 * Dois roxos convivem de propósito: o #5E279F é o roxo do arquivo da logo e
 * veste o CORPO da marca; o #6B2FFF é o --primary do design system e faz a
 * LUZ. Um só nos dois papéis achata a cena; separados, viram profundidade.
 */
export const PALETTE = {
  /** Corpo da marca, amostrado do arquivo original da logo. */
  mark: "#5E279F",
  primary: "#6B2FFF",
  primaryLight: "#A855F7",
  accent: "#3B82F6",
  deep: "#05010F",
  glow: "#C4B5FD",
  /**
   * Fundo claro da cena.
   *
   * Não é #FFFFFF: branco puro vira uma parede chapada e faz a tela inteira
   * parecer um erro de carregamento. Este tem um fio do roxo da marca dentro,
   * lê como branco e dá ao B uma superfície com temperatura.
   */
  canvas: "#F6F4F9",
} as const;

/**
 * Marcos da saída do herói, medidos em `heroExit` (0 no topo da página, 1 uma
 * tela inteira abaixo).
 *
 * A marca e o fundo terminam no MESMO ponto de propósito: quando o último
 * caco apaga, o fundo já é o escuro do site. Por isso os dois leem estes
 * mesmos números em vez de cada um carregar a sua conta; separados, eles
 * saem de sincronia no primeiro ajuste.
 */
export const EXIT = {
  /** Onde o fundo começa a virar de claro para escuro. */
  backgroundStart: 0.15,
  /** Onde os cacos começam a apagar. Antes disto eles só se afastam. */
  fadeStart: 0.22,
  /** Onde a marca some e o fundo termina de escurecer. */
  fadeEnd: 0.84,
} as const;

/**
 * Onde a barra do topo troca de clara para escura.
 *
 * O fundo leva de `backgroundStart` a `fadeEnd` para virar; a barra troca no
 * meio dessa travessia, quando o fundo já é mais escuro que claro. É derivado,
 * não digitado: mexer no ponto em que a cena escurece leva a barra junto, em
 * vez de deixar as duas fora de compasso.
 */
export const BAR_SWAP = (EXIT.backgroundStart + EXIT.fadeEnd) / 2;

/**
 * Contagens por nível de qualidade.
 *
 * O dpr do perfil reduzido subiu de 1.15 para 1.5: sem antisserrilhado, quem
 * suaviza as diagonais do B é a densidade de pixel, e 1.15 numa tela de 3x
 * devolvia escada em cada aresta. Antisserrilhado continua desligado lá porque
 * custa mais caro que o meio ponto de dpr que o substitui.
 */
export const QUALITY_PRESETS = {
  high: { stars: 2600, dpr: [1, 2] as [number, number], antialias: true },
  low: { stars: 900, dpr: [1, 1.5] as [number, number], antialias: false },
} as const;
