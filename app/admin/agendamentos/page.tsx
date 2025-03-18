"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";

interface Agendamento {
    id: string;
    cliente: string;
    data: string;
    horario: string;
    tipo: string;
    status: "Pendente" | "Confirmado" | "Cancelado" | "Realizado";
}

export default function AgendamentosPage() {
    const agendamentos: Agendamento[] = [
        {
            id: "1",
            cliente: "Maria Santos",
            data: "2024-03-25",
            horario: "14:00",
            tipo: "Reunião Inicial",
            status: "Confirmado",
        },
        // Adicione mais agendamentos aqui
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Agendamentos</h1>
                <Button className="bg-purple-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Novo Agendamento
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {agendamentos.map((agendamento) => (
                        <TableRow key={agendamento.id}>
                            <TableCell>{agendamento.cliente}</TableCell>
                            <TableCell>{agendamento.data}</TableCell>
                            <TableCell>{agendamento.horario}</TableCell>
                            <TableCell>{agendamento.tipo}</TableCell>
                            <TableCell>{agendamento.status}</TableCell>
                            <TableCell className="space-x-2">
                                <Button variant="outline" size="sm">
                                    Editar
                                </Button>
                                <Button variant="destructive" size="sm">
                                    Cancelar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 