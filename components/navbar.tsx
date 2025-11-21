"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "py-3 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-purple-900/5"
        : "py-6 bg-black/50 backdrop-blur-sm border-b border-white/5"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`relative transition-all duration-500 ${isScrolled ? "w-8 h-8" : "w-10 h-10"}`}>
            <Image
              src="/assets/logo.png"
              alt="Bevon Digital Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className={`font-bold tracking-tight text-white group-hover:text-primary transition-all duration-500 ${isScrolled ? "text-lg" : "text-xl"}`}>
            Bevon Digital
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <a
            href="https://wa.me/5531974011149"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary rounded-full transition-all duration-300 text-sm font-medium ${isScrolled ? "scale-95" : "scale-100"
              }`}
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-300 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/5531974011149"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-3 bg-primary text-white rounded-lg text-center font-medium hover:bg-primary/90 transition-colors block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fale Conosco
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}