"use client";

import { Mail, MapPin, MessageCircle, Phone, Send, User } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CONTACT } from "@/lib/site-data";

const FIELD_CLASS =
  "w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-transparent focus:ring-2 focus:ring-primary";

/**
 * Rota desativada no middleware.ts.
 * O formulário anterior não tinha action nem handler — não enviava nada.
 * Este usa o endpoint FormSubmit que já funcionava na home.
 */
export default function ContatoPage() {
  return (
    <main className="relative text-white">
      <PageHero
        eyebrow="Contato"
        title="Vamos falar sobre o"
        highlight="seu projeto"
        description="O caminho mais rápido é o WhatsApp. Se preferir escrever, o formulário chega direto no nosso e-mail."
      />

      <section className="relative z-10 px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-black/50 px-6 py-12 text-center backdrop-blur-2xl md:px-12">
          <h2 className="text-2xl font-bold md:text-3xl">Resposta em até 1 hora</h2>
          <p className="mx-auto mt-3 max-w-lg text-gray-400">
            No horário comercial, falando direto com quem vai tocar o projeto.
          </p>
          <div className="mt-8">
            <CTAButton context="um projeto para a minha empresa" className="px-10 py-5 text-lg">
              <MessageCircle className="h-6 w-6" />
              Chamar no WhatsApp
            </CTAButton>
          </div>

          <ul className="mx-auto mt-10 grid max-w-xl gap-4 border-t border-white/10 pt-8 text-sm text-gray-400 sm:grid-cols-2">
            <li className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              {CONTACT.email}
            </li>
            <li className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {CONTACT.city}, {CONTACT.state}
            </li>
          </ul>
        </div>
      </section>

      <section className="relative z-10 px-4 py-12 pb-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold">Prefere escrever?</h2>

          <form
            action="https://formsubmit.co/rafapires2210@gmail.com"
            method="POST"
            className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="Novo contato via Site Bevon" />
            <input type="hidden" name="_next" value="https://bevon.com.br/obrigado" />

            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <User size={16} className="text-primary" /> Nome
              </label>
              <input id="name" name="name" type="text" required placeholder="Seu nome completo" className={FIELD_CLASS} />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Mail size={16} className="text-primary" /> E-mail
              </label>
              <input id="email" name="email" type="email" required placeholder="seu@email.com" className={FIELD_CLASS} />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <Phone size={16} className="text-primary" /> Telefone
              </label>
              <input id="phone" name="phone" type="tel" required placeholder="(31) 99999-9999" className={FIELD_CLASS} />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <MessageCircle size={16} className="text-primary" /> Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Como podemos ajudar?"
                className={`${FIELD_CLASS} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              <Send size={20} />
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
