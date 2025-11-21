"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

export function OfficeSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                            <Image
                                src="/assets/office.jpg"
                                alt="Escritório Bevon Digital"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Nosso <span className="text-primary">Espaço Criativo</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Ambiente moderno e inspirado para entregar soluções digitais de alta qualidade.
                            Aqui é onde a tecnologia encontra a criatividade para impulsionar o seu negócio.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <h3 className="text-2xl font-bold text-white mb-1">100%</h3>
                                <p className="text-sm text-gray-400">Foco em Resultados</p>
                            </div>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <h3 className="text-2xl font-bold text-white mb-1">24/7</h3>
                                <p className="text-sm text-gray-400">Suporte Dedicado</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
