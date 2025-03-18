"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare } from "lucide-react";

interface WhatsAppButtonProps {
    className?: string;
    showIcon?: boolean;
    variant?: "agendamento" | "orcamento" | "contato";
}

export function WhatsAppButton({ className, showIcon = true, variant = "agendamento" }: WhatsAppButtonProps) {
    const phoneNumber = "5531974011149"; // Substitua pelo número correto

    const variants = {
        agendamento: {
            text: "Agendar Reunião",
            message: "Olá! Gostaria de agendar uma reunião para conhecer melhor os serviços da Bevon.",
            icon: <Calendar className="mr-2 h-5 w-5" />
        },
        orcamento: {
            text: "Solicitar Orçamento",
            message: "Olá! Gostaria de solicitar um orçamento para os serviços da Bevon.",
            icon: <Calendar className="mr-2 h-5 w-5" />
        },
        contato: {
            text: "Fale Conosco",
            message: "Olá! Gostaria de mais informações sobre os serviços da Bevon.",
            icon: <MessageSquare className="mr-2 h-5 w-5" />
        }
    };

    const handleClick = () => {
        const encodedMessage = encodeURIComponent(variants[variant].message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <Button
            onClick={handleClick}
            className={className}
        >
            {showIcon && variants[variant].icon}
            {variants[variant].text}
        </Button>
    );
} 