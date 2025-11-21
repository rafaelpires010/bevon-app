"use client";

import { MapPin } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function LocationSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Onde <span className="text-primary">Estamos</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Atendemos clientes de todo o Brasil diretamente de Belo Horizonte.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240097.00537299068!2d-44.14777978253637!3d-19.90266148819076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690a165324289%3A0x112170c9379de7b3!2sBelo%20Horizonte%2C%20MG!5e0!3m2!1sen!2sbr!4v1710000000000!5m2!1sen!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 opacity-80 hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Centered Pin Overlay */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                            <div className="relative flex flex-col items-center">
                                <div className="absolute -inset-4 bg-primary/50 rounded-full animate-ping" />
                                <div className="relative w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] z-10">
                                    <MapPin size={24} fill="currentColor" />
                                </div>
                                <div className="mt-2 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-primary/30 text-xs font-bold text-white whitespace-nowrap">
                                    Belo Horizonte
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 z-10">
                            <div className="bg-black/90 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-xl">
                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/50">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Belo Horizonte, MG</p>
                                    <p className="text-primary text-xs">Base de Operações</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
