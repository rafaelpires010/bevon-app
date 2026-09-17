/**
 * Fonte única de conteúdo do site.
 *
 * ⚠️ EDITE AQUI — nenhum texto de conteúdo fica hardcoded nos componentes.
 * Procure por "TODO" para os pontos que precisam dos seus dados reais.
 */

export const CONTACT = {
  whatsapp: "5531974011149",
  email: "contato@bevon.com.br",
  city: "Belo Horizonte",
  state: "MG",
  /** Empresa registrada: dá rastro a quem quer conferir com quem está falando. */
  cnpj: "69.125.898/0001-20",
} as const;

/* ------------------------------------------------------------------ */
/* Serviços                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  /** Promessa de resultado, não descrição de entrega. */
  outcome: string;
  description: string;
  bullets: string[];
  /** Contexto injetado na mensagem do WhatsApp. */
  waContext: string;
};

export const SERVICES: Service[] = [
  {
    id: "sites",
    title: "Sites e Landing Pages",
    outcome: "Páginas feitas para converter, não para enfeitar",
    description:
      "Design exclusivo, carregamento rápido e estrutura pensada em cima da jornada de compra do seu cliente.",
    bullets: ["Design sob medida", "Performance e SEO técnico", "Copy orientada a conversão"],
    waContext: "um site ou landing page",
  },
  {
    id: "automacao",
    title: "Automação com IA",
    outcome: "Seu atendimento respondendo 24/7 sem aumentar equipe",
    description:
      "Chatbots inteligentes e automações de WhatsApp que qualificam o lead antes de chegar em você.",
    bullets: ["WhatsApp automatizado", "Qualificação de leads por IA", "Integração com seu CRM"],
    waContext: "automação de atendimento com IA",
  },
  {
    id: "conteudo",
    title: "Gestão de Conteúdo",
    outcome: "Presença constante que gera demanda recorrente",
    description:
      "Estratégia, produção e distribuição de conteúdo que constrói autoridade e alimenta o topo do funil.",
    bullets: ["Calendário estratégico", "Produção e edição", "Relatório de performance"],
    waContext: "gestão de conteúdo e redes sociais",
  },
  {
    id: "sistemas",
    title: "Sistemas Personalizados",
    outcome: "Processo manual vira software que trabalha por você",
    description:
      "Plataformas sob medida para eliminar retrabalho e destravar a operação do seu negócio.",
    bullets: ["Levantamento de processo", "Desenvolvimento sob medida", "Suporte e evolução"],
    waContext: "um sistema personalizado",
  },
];

/* ------------------------------------------------------------------ */
/* Clientes — projetos reais já entregues                              */
/* ------------------------------------------------------------------ */

export type Client = {
  name: string;
  segment: string;
  /** Capa usada como textura 3D e no card. */
  cover: string;
  description: string;
  link: string;
  /** TODO: troque pelo resultado real. Logo sem número é decoração. */
  result?: string;
};

export const CLIENTS: Client[] = [
  {
    name: "Heros Lovers",
    segment: "Plataforma Web",
    cover: "/assets/heros_lovers_cover.png",
    description:
      "Comunidade digital interativa, conectando pessoas com paixões em comum através de uma interface moderna.",
    link: "https://heroslovers.com",
    // result: "TODO: ex. '+180% de cadastros em 3 meses'",
  },
  {
    name: "Adv Model",
    segment: "Solução Jurídica",
    cover: "/assets/adv_model_cover.png",
    description:
      "Plataforma para o setor jurídico, com modelos e ferramentas que otimizam o dia a dia da advocacia.",
    link: "https://advmodel.bevon.com.br",
  },
  {
    name: "Alves Formatura",
    segment: "Landing Page",
    cover: "/assets/alves_formatura_cover.png",
    description: "Página de captação para ensaios de formatura exclusivos.",
    link: "https://lpalvesformatura.vercel.app/",
  },
  {
    name: "Cão Soldado",
    segment: "Página de Vendas",
    cover: "/assets/cao_soldado_cover.png",
    description: "Página de vendas para programa de treinamento canino.",
    link: "https://sitedesafiocao15.vercel.app/",
  },
];

/* ------------------------------------------------------------------ */
/* Parceiros                                                           */
/* ------------------------------------------------------------------ */

/**
 * Parceiros comerciais reais.
 *
 * O logo é opcional de propósito: sem arquivo, o cartão mostra o nome como
 * wordmark e a seção continua de pé. É o que permite publicar um parceiro no
 * dia em que ele é fechado, sem esperar o arquivo chegar.
 *
 * As medidas do arquivo entram aqui para o espaço ser reservado antes de a
 * imagem carregar — sem elas o cartão pula de altura no meio do carregamento.
 */
export type Partner = {
  name: string;
  /** Ramo, em uma linha curta. */
  segment: string;
  url?: string;
  /** Caminho em public/brand/. */
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  /**
   * O arquivo tem fundo próprio, em vez de transparência.
   *
   * Solto no cartão ele viraria um quadrado com borda visível; marcado assim,
   * é exibido como pastilha arredondada, que lê como decisão e não como falha
   * de recorte.
   */
  logoBoxed?: boolean;
};

export const PARTNERS: Partner[] = [
  {
    name: "NOVAEO",
    // Do próprio site: "a dynamic team of eCommerce specialists
    // revolutionizing the health and wellness market".
    segment: "E-commerce de saúde e bem-estar",
    url: "https://novaeo.co",
    logo: "/brand/parceiro-novaeo.png",
    logoWidth: 134,
    logoHeight: 75,
  },
  {
    name: "Ilma's Burguer",
    segment: "Hamburgueria",
    url: "https://www.instagram.com/ilmasburguer/",
    logo: "/brand/parceiro-ilmas.png",
    logoWidth: 1254,
    logoHeight: 1254,
    logoBoxed: true,
  },
  {
    // O nome da marca é "Alves Formatura", como está no logo e no site deles.
    name: "Alves Formatura",
    segment: "Fotografia de formatura",
    url: "https://lpalvesformatura.vercel.app",
    logo: "/brand/parceiro-alves.png",
    logoWidth: 2560,
    logoHeight: 2008,
  },
];

/**
 * Plataformas e tecnologias sobre as quais a Bevon constrói.
 *
 * Não são parceiros — são ferramentas. Ficaram aqui porque descrevem a
 * entrega, mas hoje nenhuma seção da home as mostra.
 */
export const TECH_STACK: Partner[] = [
  { name: "Next.js", segment: "Framework", url: "https://nextjs.org" },
  { name: "Vercel", segment: "Infraestrutura", url: "https://vercel.com" },
  { name: "WhatsApp API", segment: "Atendimento", url: "https://business.whatsapp.com" },
  { name: "OpenAI", segment: "IA", url: "https://openai.com" },
  { name: "Supabase", segment: "Banco de dados", url: "https://supabase.com" },
  { name: "Meta Ads", segment: "Mídia paga", url: "https://business.meta.com" },
  { name: "Google Ads", segment: "Mídia paga", url: "https://ads.google.com" },
  { name: "Stripe", segment: "Pagamentos", url: "https://stripe.com" },
];

/* ------------------------------------------------------------------ */
/* Time                                                                */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string;
  role: string;
  /**
   * Caminho em public/brand/. Sem arquivo, a seção mostra as iniciais num
   * círculo — nome e cargo continuam de pé, que é o que importa ali.
   */
  photo?: string;
  photoWidth?: number;
  photoHeight?: number;
  /**
   * `object-position` do recorte redondo. Padrão: "50% 20%".
   *
   * Retrato é sempre mais alto que largo, e o rosto quase nunca está no meio
   * da altura: centrado, o círculo corta a testa e sobra ombro.
   */
  photoFocus?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Rafael Pires",
    role: "CEO",
    photo: "/brand/rafael-pires.png",
    photoWidth: 1024,
    photoHeight: 1536,
    // Retrato 2:3: o rosto ocupa o terço de cima. Alinhado pelo topo, ele cai
    // no meio do círculo; centrado, o corte comeria a cabeça.
    photoFocus: "50% 0%",
  },
];

/* ------------------------------------------------------------------ */
/* Prova social                                                        */
/* ------------------------------------------------------------------ */

export type Stat = { value: string; label: string };

export const STATS: Stat[] = [
  /*
    Número informado pela Bevon, não mais derivado de CLIENTS.
    Antes era `CLIENTS.length`, que contava só os quatro projetos com case
    publicado — dava 4+. O total entregue é outra coisa, e quem sabe esse
    número é a empresa. Se um dia sair de 1.000, é aqui que se muda.
  */
  { value: "1.000+", label: "projetos no ar" },
  { value: "100%", label: "código próprio, sem template" },
  { value: "< 1h", label: "tempo de resposta no WhatsApp" },
  { value: "BH", label: "time local, atendimento nacional" },
];

export type Testimonial = {
  name: string;
  /** Cargo, quando existe um. */
  role?: string;
  company: string;
  /**
   * O que mudou no negócio do cliente.
   *
   * Terceira pessoa, escrito pela Bevon: é afirmação da agência sobre o
   * trabalho, e a agência responde por ela.
   */
  outcome: string;
  /**
   * Depoimento literal, e só quando a pessoa tiver aprovado ESTE texto.
   *
   * Existindo, é ele que aparece, entre aspas e assinado. Sem ele, o cartão
   * mostra o `outcome`. A distinção não é preciosismo: frase entre aspas no
   * nome de alguém que não a disse é depoimento fabricado, o mesmo problema
   * que esvaziou esta lista uma vez (CDC art. 37).
   */
  quote?: string;
  /** Caminho em public/brand/. Sem foto, o cartão mostra as iniciais. */
  photo?: string;
  /**
   * Enquadramento do recorte redondo, quando o padrão não serve.
   *
   * `photoZoom` é o background-size e `photoFocus` o background-position. Foto
   * de corpo inteiro num avatar de 56px vira um borrão se entrar inteira: o
   * zoom aproxima o rosto e o foco escolhe qual pedaço fica no círculo.
   * Padrões: "cover" e "50% 20%".
   */
  photoZoom?: string;
  photoFocus?: string;
};

/**
 * Clientes reais, trabalho real.
 * Lista vazia = a seção não renderiza.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Derrek Wiedeman",
    role: "Co-CEO",
    company: "NOVAEO",
    outcome:
      "Trocou o controle em planilhas por um sistema de produção automatizado de ponta a ponta.",
    // Do site da NOVAEO: /assets/front/img/about-img2.jpg
    photo: "/brand/derrek-wiedeman.jpg",
    // O rosto está no alto e à esquerda do quadro; centrado, o círculo pegaria
    // o peito. Estes dois números põem o rosto no meio do avatar.
    photoZoom: "auto 190%",
    photoFocus: "0% 2%",
  },
  {
    name: "Rogério Pires",
    company: "Ilma's Burguer",
    outcome:
      "Opera o dia a dia da hamburgueria com Bevon Delivery, PDV e Bevon ERP.",
  },
  {
    name: "Anderson Alves",
    company: "Alves Formatura",
    outcome: "Criou com a Bevon a landing page de captação de formandos.",
  },
];

/* ------------------------------------------------------------------ */
/* Processo                                                            */
/* ------------------------------------------------------------------ */

export const PROCESS = [
  { step: "01", title: "Diagnóstico", description: "Entendemos seu negócio, seu funil e onde o dinheiro está vazando." },
  { step: "02", title: "Proposta", description: "Escopo fechado, prazo e preço claros. Sem surpresa no meio do caminho." },
  { step: "03", title: "Construção", description: "Você acompanha o progresso e valida cada etapa antes de seguir." },
  { step: "04", title: "No ar e medindo", description: "Entrega, acompanhamento dos números e ajuste do que não performar." },
];

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
};

/**
 * Os posts anteriores eram fictícios (inclusive a autora) e foram removidos.
 * Preencha com conteúdo real e a listagem volta a renderizar.
 * A rota segue desativada no middleware.ts até existir conteúdo.
 */
export const POSTS: Post[] = [];
