"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash, Eye } from "lucide-react";

interface Post {
    id: string;
    titulo: string;
    excerpt: string;
    autor: string;
    data: string;
    status: "Rascunho" | "Publicado";
}

export default function BlogPage() {
    const posts: Post[] = [
        {
            id: "1",
            titulo: "Como o Marketing Digital está Revolucionando os Negócios",
            excerpt: "Descubra as últimas tendências que estão transformando o mercado...",
            autor: "Ana Silva",
            data: "2024-03-20",
            status: "Publicado",
        },
        // Adicione mais posts aqui
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Blog</h1>
                <Button className="bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Post
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {posts.map((post) => (
                    <Card key={post.id} className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{post.titulo}</h3>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <span>{post.autor}</span>
                                    <span>{post.data}</span>
                                    <span className={`px-2 py-1 rounded-full ${post.status === 'Publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {post.status}
                                    </span>
                                </div>
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="icon">
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
} 