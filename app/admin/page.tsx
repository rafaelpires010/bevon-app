"use client";

import { Card } from "@/components/ui/card";
import { Users, Calendar, FileText, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        {
            label: "Leads Totais",
            value: "150",
            icon: <Users className="w-6 h-6" />,
            change: "+12%",
        },
        {
            label: "Agendamentos",
            value: "28",
            icon: <Calendar className="w-6 h-6" />,
            change: "+5%",
        },
        {
            label: "Posts Blog",
            value: "45",
            icon: <FileText className="w-6 h-6" />,
            change: "+8%",
        },
        {
            label: "Depoimentos",
            value: "32",
            icon: <MessageSquare className="w-6 h-6" />,
            change: "+15%",
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-purple-600">{stat.icon}</div>
                            <span className="text-green-500 text-sm">{stat.change}</span>
                        </div>
                        <h3 className="text-gray-600 text-sm">{stat.label}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
} 