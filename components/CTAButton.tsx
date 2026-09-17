"use client";

import { ArrowRight } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Props = {
  /** Contexto injetado na mensagem do WhatsApp — sempre preencha. */
  context?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  showIcon?: boolean;
};

/**
 * CTA único do site. Todo caminho de conversão passa por aqui, então
 * medir cliques (ou trocar o destino) é mudança de um arquivo só.
 */
export function CTAButton({
  context,
  children,
  variant = "primary",
  className,
  showIcon = true,
}: Props) {
  return (
    <a
      href={waLink(context)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={context ?? "generico"}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        variant === "primary" &&
          "bg-primary text-white shadow-[0_0_40px_-8px_rgba(107,47,255,0.9)] hover:bg-primary/90 hover:scale-[1.03]",
        variant === "ghost" &&
          "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:border-primary/60 hover:bg-white/10",
        className
      )}
    >
      {children}
      {showIcon && (
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}
