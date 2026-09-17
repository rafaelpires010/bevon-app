"use client";

import { Calendar, Clock, PenSquare, User } from "lucide-react";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { POSTS } from "@/lib/site-data";

/**
 * Rota desativada no middleware.ts enquanto não houver conteúdo real.
 * Os posts anteriores eram fictícios, inclusive a autora assinada.
 */
export default function BlogPage() {
  return (
    <main className="relative text-white">
      <PageHero
        eyebrow="Blog"
        title="Conteúdo sobre"
        highlight="tecnologia e vendas"
        description="Ideias práticas sobre marketing digital, automação e desenvolvimento de software."
      />

      <section className="relative z-10 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {POSTS.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-black/40 px-8 py-16 text-center backdrop-blur-xl">
              <PenSquare className="mx-auto h-10 w-10 text-primary" />
              <h2 className="mt-6 text-2xl font-bold">Os primeiros artigos estão a caminho</h2>
              <p className="mt-4 leading-relaxed text-gray-400">
                Enquanto isso, se você tem uma dúvida específica sobre o digital do
                seu negócio, pergunte direto para o time — a resposta sai na hora.
              </p>
              <div className="mt-8">
                <CTAButton context="uma dúvida sobre marketing digital" variant="ghost">
                  Tirar uma dúvida
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl transition-colors hover:border-primary/50"
                >
                  <h2 className="text-2xl font-bold">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-4 leading-relaxed text-gray-400">{post.excerpt}</p>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readingTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
