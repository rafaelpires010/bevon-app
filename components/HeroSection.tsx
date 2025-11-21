"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { Brain3D } from "./Brain3D";

export function HeroSection() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const xPct = clientX / innerWidth - 0.5;
        const yPct = clientY / innerHeight - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
    const contentX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const contentY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000"
            onMouseMove={handleMouseMove}
        >
            <HeroBackground />

            <motion.div
                className="container mx-auto px-4 relative z-10 text-center"
                style={{
                    rotateX,
                    rotateY,
                    x: contentX,
                    y: contentY,
                    perspective: 1000
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 flex justify-center"
                >
                    <Brain3D />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                >
                    Transformamos Ideias em <br />
                    <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Resultados Digitais
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
                >
                    Tecnologia, automação e sites profissionais para quem quer crescimento real.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="https://wa.me/5531974011149"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2"
                    >
                        Começar Agora
                        <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                        href="#services"
                        className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all hover:scale-105 font-medium"
                    >
                        Nossos Serviços
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
                    <div className="w-1 h-2 bg-primary rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
