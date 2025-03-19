"use client";

import { Award, Users, Target, Lightbulb } from "lucide-react";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
}

export default function About() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a Bevon</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Somos uma empresa apaixonada por transformação digital, focada em entregar resultados excepcionais através de estratégias inovadoras de marketing e desenvolvimento de software.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Missão</h3>
              <p className="text-gray-600">
                Impulsionar o sucesso dos nossos clientes através de soluções digitais inovadoras e eficientes.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Visão</h3>
              <p className="text-gray-600">
                Ser referência em transformação digital, reconhecida pela excelência e inovação.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Valores</h3>
              <p className="text-gray-600">
                Inovação, Comprometimento, Transparência e Resultados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/*<section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <TeamMember
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a"
              name="Carlos Silva"
              role="CEO"
            />
            <TeamMember
              image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
              name="Ana Santos"
              role="Diretora de Marketing"
            />
            <TeamMember
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
              name="Pedro Costa"
              role="CTO"
            />
          </div>
        </div>
      </section> */}
    </main>
  );
}

function TeamMember({ image, name, role }: TeamMemberProps) {
  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div
          className="w-full h-full rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}