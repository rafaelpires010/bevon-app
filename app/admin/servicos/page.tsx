"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash } from "lucide-react";

interface Servico {
    id: string;
    titulo: string;
    descricao: string;
    icone: string;
    ativo: boolean;
}

export default function ServicosPage() {
    const servicos: Servico[] = [
        {
            id: "1",
            titulo: "Marketing Digital",
            descricao: "Estratégias personalizadas para aumentar sua visibilidade online.",
            icone: "rocket",
            ativo: true,
        },
        // Adicione mais serviços aqui
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Serviços</h1>
                <Button className="bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Serviço
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicos.map((servico) => (
                    <Card key={servico.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold">{servico.titulo}</h3>
                            <div className="space-x-2">
                                <Button variant="outline" size="icon">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">{servico.descricao}</p>
                        <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 rounded-full text-sm ${servico.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {servico.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
} 