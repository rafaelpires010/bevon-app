"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

export default function Blog() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Bevon</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Insights, tendências e novidades sobre marketing digital e desenvolvimento de software.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="h-96 bg-cover bg-center rounded-xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f')",
              }}
            />
            <div>
              <span className="text-purple-600 font-semibold">Em Destaque</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">
                Como o Marketing Digital está Revolucionando os Negócios em 2025
              </h2>
              <p className="text-gray-600 mb-6">
                Descubra as últimas tendências e estratégias que estão transformando
                o cenário digital e impulsionando o crescimento das empresas.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  15 Abril 2025
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  10 min leitura
                </span>
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Por Ana Silva
                </span>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Ler Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Posts Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <BlogPost
              image="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0"
              title="10 Tendências de UX Design para 2025"
              excerpt="Explore as principais tendências que estão moldando a experiência do usuário este ano."
              date="12 Abril 2025"
              readTime="8 min"
              author="Pedro Santos"
            />
            <BlogPost
              image="https://images.unsplash.com/photo-1552664730-d307ca884978"
              title="Inteligência Artificial no Marketing"
              excerpt="Como a IA está revolucionando as estratégias de marketing digital."
              date="10 Abril 2025"
              readTime="12 min"
              author="Maria Costa"
            />
            <BlogPost
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              title="SEO em 2025: O Que Mudou?"
              excerpt="As principais atualizações e estratégias para rankear melhor no Google."
              date="8 Abril 2025"
              readTime="15 min"
              author="Carlos Lima"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function BlogPost({ image, title, excerpt, date, readTime, author }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {date}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {readTime}
          </span>
          <span className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            {author}
          </span>
        </div>
      </div>
    </div>
  );
}