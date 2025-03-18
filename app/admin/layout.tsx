"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users,
    Calendar,
    Settings,
    FileText,
    MessageSquare,
    LayoutDashboard
} from "lucide-react";

interface SidebarItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const sidebarItems: SidebarItem[] = [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard /> },
        { label: "Leads", href: "/admin/leads", icon: <Users /> },
        { label: "Agendamentos", href: "/admin/agendamentos", icon: <Calendar /> },
        { label: "Serviços", href: "/admin/servicos", icon: <Settings /> },
        { label: "Blog", href: "/admin/blog", icon: <FileText /> },
        { label: "Depoimentos", href: "/admin/depoimentos", icon: <MessageSquare /> },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-purple-900">Bevon Admin</h1>
                </div>
                <nav className="mt-6">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">{children}</main>
        </div>
    );
} 