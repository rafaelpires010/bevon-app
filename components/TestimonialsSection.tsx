"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const testimonials = [
    {
        name: "Ricardo Silva",
        role: "CEO, TechStart",
        content: "A Bevon transformou nossa presença digital. O novo site não só é lindo, mas converte muito mais.",
        image: "https://ui-avatars.com/api/?name=Ricardo+Silva&background=6B2FFF&color=fff"
    },
    {
        name: "Ana Martins",
        role: "Diretora de Marketing",
        content: "As automações de WhatsApp economizaram horas da nossa equipe. Profissionalismo nota 10!",
        image: "https://ui-avatars.com/api/?name=Ana+Martins&background=6B2FFF&color=fff"
    },
    {
        name: "Carlos Eduardo",
        role: "Empreendedor",
        content: "Excelente trabalho na gestão de tráfego e conteúdo. Resultados visíveis no primeiro mês.",
        image: "https://ui-avatars.com/api/?name=Carlos+Eduardo&background=6B2FFF&color=fff"
    }
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />

            <div className="container mx-auto px-4 relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        O que dizem nossos <span className="text-primary">Clientes</span>
                    </h2>
                </AnimatedSection>

                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/50">
                            <Quote size={24} />
                        </div>

                        <div className="relative h-[200px] md:h-[150px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <p className="text-lg md:text-xl text-gray-300 italic mb-8 leading-relaxed">
                                        "{testimonials[currentIndex].content}"
                                    </p>
                                    <div className="flex items-center justify-center gap-4">
                                        <img
                                            src={testimonials[currentIndex].image}
                                            alt={testimonials[currentIndex].name}
                                            className="w-12 h-12 rounded-full border-2 border-primary"
                                        />
                                        <div className="text-left">
                                            <h4 className="font-bold text-white">{testimonials[currentIndex].name}</h4>
                                            <p className="text-sm text-primary">{testimonials[currentIndex].role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 hover:bg-primary/20 text-white transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 hover:bg-primary/20 text-white transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-primary" : "bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
