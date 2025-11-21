"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href="https://wa.me/5531974011149"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Fale Conosco
        </Button>
      </a>
    </div>
  );
}