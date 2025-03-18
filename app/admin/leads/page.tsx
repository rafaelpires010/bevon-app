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

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    status: "Novo" | "Contatado" | "Convertido" | "Perdido";
}

export default function LeadsPage() {
    const leads: Lead[] = [
        {
            id: "1",
            name: "João Silva",
            email: "joao@email.com",
            phone: "(11) 99999-9999",
            date: "2024-03-20",
            status: "Novo",
        },
        // Adicione mais leads aqui
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Leads</h1>
                <Button className="bg-purple-600">Exportar CSV</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leads.map((lead) => (
                        <TableRow key={lead.id}>
                            <TableCell>{lead.name}</TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{lead.date}</TableCell>
                            <TableCell>{lead.status}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 