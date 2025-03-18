"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CaseStudyProps {
  image: string;
  title: string;
  description: string;
  results: string[];
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

export default function Cases() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cases de Sucesso</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Conheça alguns dos projetos que transformaram a presença digital de nossos clientes.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <CaseStudy
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              title="E-commerce de Moda"
              description="Aumento de 150% em vendas online através de estratégia omnichannel."
              results={["150% aumento em vendas", "200% mais tráfego orgânico", "3x conversão mobile"]}
            />
            <CaseStudy
              image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
              title="Startup de Tecnologia"
              description="Desenvolvimento de plataforma SaaS e estratégia de aquisição de usuários."
              results={["1M+ usuários ativos", "98% satisfação", "30% redução em CAC"]}
            />
            <CaseStudy
              image="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0"
              title="Rede de Restaurantes"
              description="Sistema de delivery próprio e campanhas de marketing local."
              results={["70% pedidos online", "45% redução em custos", "4.8 avaliação média"]}
            />
            <CaseStudy
              image="https://images.unsplash.com/photo-1552664730-d307ca884978"
              title="Clínica Médica"
              description="Automação de agendamentos e estratégia de marketing digital."
              results={["90% agendamentos online", "60% novos pacientes", "25% mais eficiência"]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <Testimonial
              quote="A Bevon transformou completamente nossa presença digital. Os resultados superaram todas as expectativas."
              author="Maria Silva"
              role="CEO, Moda Express"
            />
            <Testimonial
              quote="Profissionais excepcionais e resultados impressionantes. Recomendo fortemente!"
              author="João Santos"
              role="Diretor, TechStart"
            />
            <Testimonial
              quote="O melhor investimento que fizemos em marketing digital. ROI excepcional."
              author="Ana Costa"
              role="Marketing, FoodNet"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseStudy({ image, title, description, results }: CaseStudyProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <ArrowRight className="w-4 h-4 text-purple-600 mr-2" />
              {result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <p className="text-gray-600 italic mb-6">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
}