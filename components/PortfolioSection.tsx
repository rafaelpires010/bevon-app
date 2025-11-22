"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
    {
        title: "Heros Lovers",
        category: "Plataforma Web",
        image: "/assets/heros_lovers_cover.png",
        description: "Uma comunidade digital vibrante e interativa, conectando pessoas com paixões em comum através de uma interface moderna.",
        link: "https://heroslovers.com"
    },
    {
        title: "Adv Model",
        category: "Solução Jurídica",
        image: "/assets/adv_model_cover.png",
        description: "Plataforma especializada para o setor jurídico, oferecendo modelos e ferramentas para otimizar a advocacia.",
        link: "https://advmodel.bevon.com.br"
    },
    {
        title: "Alves Formatura",
        category: "Landing Page",
        image: "/assets/alves_formatura_cover.png",
        description: "Capturando momentos inesquecíveis com ensaios de formatura exclusivos.",
        link: "https://lpalvesformatura.vercel.app/"
    },
    {
        title: "Cão Soldado",
        category: "Landing Page",
        image: "/assets/cao_soldado_cover.png",
        description: "Pagina de vendas para treinamento de cães soldados.",
        link: "https://sitedesafiocao15.vercel.app/"
    }
];

export function PortfolioSection() {
    return (
        <section id="portfolio" className="py-24 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary font-medium tracking-wider uppercase text-sm">Nosso Trabalho</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Conheça alguns de nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">trabalhos e modelos</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Conheça algumas das soluções digitais que desenvolvemos para transformar negócios.
                    </p>
                </motion.div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    grabCursor={true}
                    centeredSlides={false}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="mySwiper w-full py-12"
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors h-full">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-primary text-sm font-medium mb-2 block">{project.category}</span>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full bg-white/10 hover:bg-primary text-white transition-all hover:scale-110"
                                        >
                                            <ArrowUpRight size={20} />
                                        </a>
                                    </div>
                                    <p className="text-gray-400 mb-6">
                                        {project.description}
                                    </p>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                                    >
                                        Ver Detalhes <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-black"
                    >
                        Iniciar Seu Projeto
                    </a>
                </motion.div>
            </div>
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background-color: #fff;
                    opacity: 0.5;
                }
                .swiper-pagination-bullet-active {
                    background-color: #9333ea; /* Primary purple */
                    opacity: 1;
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: #9333ea;
                }
                @media (max-width: 768px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        display: none !important;
                    }
                }
            `}</style>
        </section>
    );
}
