"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, MessageCircle, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(107,47,255,0.1),transparent_50%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Bevon Digital Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-white">Bevon Digital</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transformamos ideias em resultados digitais. Sua parceira em tecnologia e marketing para o futuro.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/bevon_digital/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Links Rápidos</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#home" className="text-gray-400 hover:text-primary transition-colors text-sm">Início</Link>
                            </li>
                            <li>
                                <Link href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">Serviços</Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contato</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Serviços</h3>
                        <ul className="space-y-4">
                            <li className="text-gray-400 text-sm">Criação de Sites</li>
                            <li className="text-gray-400 text-sm">Automação com IA</li>
                            <li className="text-gray-400 text-sm">Gestão de Tráfego</li>
                            <li className="text-gray-400 text-sm">Sistemas Web</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Contato</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>Belo Horizonte, MG</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:contato@bevon.com.br" className="hover:text-white transition-colors">contato@bevon.com.br</a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                                <a href="https://wa.me/5531974011149" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+55 (31) 97401-1149</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Bevon Digital. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacidade</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Termos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
