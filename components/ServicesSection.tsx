"use client";

import { motion } from "framer-motion";
import { Code2, MessageSquare, PenTool, Layout } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { useEffect, useState, useRef } from "react";

const services = [
    {
        icon: <Layout className="w-8 h-8" />,
        title: "Sites e Landing Pages",
        description: "Design exclusivo e alta performance para converter visitantes em clientes.",
    },
    {
        icon: <MessageSquare className="w-8 h-8" />,
        title: "Automação com IA",
        description: "Chatbots inteligentes e automações de WhatsApp para escalar seu atendimento.",
    },
    {
        icon: <PenTool className="w-8 h-8" />,
        title: "Gestão de Conteúdo",
        description: "Estratégias de conteúdo que engajam e fortalecem sua marca nas redes.",
    },
    {
        icon: <Code2 className="w-8 h-8" />,
        title: "Sistemas Personalizados",
        description: "Soluções digitais sob medida para otimizar processos do seu negócio.",
    },
];

export function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: null,
                rootMargin: "-20% 0px -20% 0px", // Trigger when element is in the middle 60% of viewport
                threshold: 0.4,
            }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className="py-12 md:py-24 relative">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Soluções para o seu <span className="text-primary">Crescimento</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Tecnologia e estratégia unidas para impulsionar seus resultados no digital.
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                            <motion.div
                                ref={(el) => { cardsRef.current[index] = el }}
                                data-index={index}
                                whileHover={{ y: -10 }}
                                className={`h-full p-6 rounded-2xl bg-white/5 border transition-colors duration-300 group ${activeIndex === index
                                        ? "border-primary/50 bg-white/10"
                                        : "border-white/10 hover:border-primary/50"
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${activeIndex === index
                                        ? "bg-primary text-white"
                                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                                    }`}>
                                    {service.icon}
                                </div>
                                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${activeIndex === index
                                        ? "text-primary"
                                        : "text-white group-hover:text-primary"
                                    }`}>
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
