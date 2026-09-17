/**
 * Fundo escuro estático, sem cena e sem arte.
 *
 * Serve a dois casos que pedem a mesma coisa:
 *
 * 1. Páginas internas. A arte clara e a marca 3D são o palco da primeira tela
 *    da home — existem para dar chão e contraste ao B. Em /sobre ou /servicos
 *    o conteúdo começa colado no topo, e aí o palco vira armadilha: o site
 *    inteiro é escrito em branco, e branco sobre a seda clara não se lê.
 * 2. Quem não tem WebGL. Sem a marca em cena, o claro não tem função.
 *
 * Os dois roxos são os mesmos da cena, para a troca entre uma página e outra
 * não parecer troca de site.
 */
export function DarkBackdrop() {
  return (
    <div
      className="fixed inset-0 -z-20 bg-[#05010F]"
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107,47,255,0.28), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(59,130,246,0.16), transparent 60%)",
      }}
    />
  );
}
