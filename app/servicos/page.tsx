"use client";

import { Button } from "@/components/ui/button";
import {
  Rocket,
  Code2,
  LineChart,
  Smartphone,
  Globe,
  Search,
  Mail,
  Share2
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Services() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nossos Serviços</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Soluções completas em marketing digital e desenvolvimento de software para impulsionar seu negócio.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <ServiceCard
              icon={<Search className="w-12 h-12" />}
              title="SEO"
              description="Otimização para mecanismos de busca, aumentando sua visibilidade orgânica."
            />
            <ServiceCard
              icon={<Globe className="w-12 h-12" />}
              title="Desenvolvimento Web"
              description="Sites e aplicações web modernas e responsivas."
            />
            <ServiceCard
              icon={<Smartphone className="w-12 h-12" />}
              title="Aplicativos Mobile"
              description="Apps nativos e híbridos para iOS e Android."
            />
            <ServiceCard
              icon={<Mail className="w-12 h-12" />}
              title="Email Marketing"
              description="Campanhas estratégicas para nutrir e converter leads."
            />
            <ServiceCard
              icon={<LineChart className="w-12 h-12" />}
              title="Marketing de Performance"
              description="Campanhas otimizadas para máximo ROI."
            />
            <ServiceCard
              icon={<Share2 className="w-12 h-12" />}
              title="Mídias Sociais"
              description="Gestão completa de redes sociais e criação de conteúdo."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Vamos conversar sobre seu projeto?</h2>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6">
            Solicitar Orçamento
          </Button>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="text-purple-600 mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}