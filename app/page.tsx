"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Code2,
  MessageSquare,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bevon Digital",
    "url": "https://www.bevon.com.br",
    "logo": "https://www.bevon.com.br/bevon-icon.png",
    "description": "Agência especializada em marketing digital e desenvolvimento de software em Belo Horizonte.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Belo Horizonte",
      "addressRegion": "MG",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-31-97401-1149",
      "contactType": "customer service"
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Marketing Digital e Desenvolvimento de Software em Belo Horizonte
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Marketing digital e desenvolvimento de software para impulsionar seu negócio ao próximo nível
          </p>
          <WhatsAppButton
            variant="agendamento"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Soluções Completas em Marketing Digital e Desenvolvimento
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos expertise técnica com estratégia de negócios para impulsionar seu crescimento digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 mb-4">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resultados Comprovados</h3>
              <p className="text-gray-600">
                Média de 150% de aumento em conversões para nossos clientes nos primeiros 6 meses
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 mb-4">
                <TrendingUp className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Estratégia Personalizada</h3>
              <p className="text-gray-600">
                Soluções sob medida alinhadas com seus objetivos e mercado específico
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 mb-4">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipe Especializada</h3>
              <p className="text-gray-600">
                Profissionais certificados com mais de 10 anos de experiência no mercado
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 mb-4">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte Contínuo</h3>
              <p className="text-gray-600">
                Acompanhamento dedicado e ajustes estratégicos para maximizar resultados
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <WhatsAppButton
              variant="agendamento"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Nossos Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <ServiceCard
              icon={<Rocket className="w-10 h-10" />}
              title="Marketing Digital"
              description="Estratégias personalizadas para aumentar sua visibilidade online e atrair mais clientes qualificados."
            />
            <ServiceCard
              icon={<Code2 className="w-10 h-10" />}
              title="Desenvolvimento de Software"
              description="Soluções tecnológicas sob medida para otimizar seus processos e melhorar a experiência do usuário."
            />
            <ServiceCard
              icon={<MessageSquare className="w-10 h-10" />}
              title="Consultoria Estratégica"
              description="Análise aprofundada e recomendações para alavancar seu negócio no ambiente digital."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Agende uma reunião gratuita com nossa equipe e descubra como podemos ajudar sua empresa a crescer.
          </p>
          <WhatsAppButton
            variant="agendamento"
            className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-full"
          />
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="text-purple-600 mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}