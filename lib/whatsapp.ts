import { CONTACT } from "./site-data";

/**
 * Monta o link do WhatsApp com mensagem pré-preenchida por contexto.
 * Contexto explícito = conversa começa qualificada = menos atrito.
 */
export function waLink(context?: string): string {
  const message = context
    ? `Olá! Vim pelo site da Bevon e quero falar sobre ${context}.`
    : "Olá! Vim pelo site da Bevon e quero falar sobre um projeto.";

  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}
