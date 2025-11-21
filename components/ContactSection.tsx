"use client";

import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Phone } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function ContactSection() {
    return (
        <section id="contact" className="py-12 md:py-24 relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Entre em <span className="text-primary">Contato</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Tem um projeto em mente? Mande uma mensagem e vamos conversar sobre como podemos ajudar.
                    </p>

                </AnimatedSection>

                <div className="max-w-2xl mx-auto">
                    <AnimatedSection delay={0.2}>
                        <form
                            action="https://formsubmit.co/rafapires2210@gmail.com"
                            method="POST"
                            className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                        >
                            {/* Hidden fields for FormSubmit configuration */}
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_subject" value="Novo contato via Site Bevon" />
                            <input type="hidden" name="_next" value="https://bevon.com.br/obrigado" />

                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <User size={16} className="text-primary" /> Nome
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white transition-all placeholder:text-gray-600"
                                    placeholder="Seu nome completo"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Mail size={16} className="text-primary" /> Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white transition-all placeholder:text-gray-600"
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Phone size={16} className="text-primary" /> Telefone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white transition-all placeholder:text-gray-600"
                                    placeholder="(31) 99999-9999"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MessageSquare size={16} className="text-primary" /> Mensagem
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white transition-all placeholder:text-gray-600 resize-none"
                                    placeholder="Como podemos ajudar?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                            >
                                <Send size={20} />
                                Enviar Mensagem
                            </button>
                        </form>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
