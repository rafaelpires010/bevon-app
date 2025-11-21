"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/HeroSection";
import { OfficeSection } from "@/components/OfficeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LocationSection } from "@/components/LocationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-primary selection:text-white">
      <Navbar />
      <HeroSection />
      <OfficeSection />
      <ServicesSection />
      <TestimonialsSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}