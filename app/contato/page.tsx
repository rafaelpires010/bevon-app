"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Estamos prontos para ajudar sua empresa a alcançar seu potencial máximo no mundo digital.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Envie sua mensagem</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <Input type="text" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <Input type="tel" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    placeholder="Como podemos ajudar?"
                    className="min-h-[150px]"
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                <div className="space-y-4">
                  <ContactInfo
                    icon={<Mail className="w-6 h-6" />}
                    title="Email"
                    content="contato@bevon.com"
                  />
                  <ContactInfo
                    icon={<Phone className="w-6 h-6" />}
                    title="Telefone"
                    content="+55 (11) 99999-9999"
                  />
                  <ContactInfo
                    icon={<MapPin className="w-6 h-6" />}
                    title="Endereço"
                    content="Av. Paulista, 1000 - São Paulo, SP"
                  />
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-200 rounded-xl h-[300px] relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.098371735362!2d-46.65390668502168!3d-23.564611384683764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactInfo({ icon, title, content }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-purple-600">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}