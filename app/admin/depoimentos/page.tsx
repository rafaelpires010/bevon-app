"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash } from "lucide-react";

interface Depoimento {
    id: string;
    cliente: string;
    cargo: string;
    empresa: string;
    texto: string;
    ativo: boolean;
}

export default function DepoimentosPage() {
    const depoimentos: Depoimento[] = [
        {
            id: "1",
            cliente: "Maria Silva",
            cargo: "CEO",
            empresa: "Tech Solutions",
            texto: "A Bevon transformou completamente nossa presença digital...",
            ativo: true,
        },
        // Adicione mais depoimentos aqui
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Depoimentos</h1>
                <Button className="bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Depoimento
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {depoimentos.map((depoimento) => (
                    <Card key={depoimento.id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold">{depoimento.cliente}</h3>
                                <p className="text-gray-500">
                                    {depoimento.cargo} em {depoimento.empresa}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" size="icon">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">{depoimento.texto}</p>
                        <div className="flex justify-between items-center">
                            <span className={`px-2 py-1 rounded-full text-sm ${depoimento.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {depoimento.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
} 