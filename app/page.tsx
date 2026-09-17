import { About } from "@/components/sections/About";
import { BrandStage } from "@/components/sections/BrandStage";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Location } from "@/components/sections/Location";
import { Partners } from "@/components/sections/Partners";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/Footer";

/**
 * Home. A primeira dobra é a promessa sobre a marca; daí em diante:
 * oferta → parceiros → quem somos → confiança → onde estamos → fechamento.
 * Cada seção com useAct ancora um ato da cena 3D montada no layout.
 */
export default function Home() {
  return (
    <main className="relative text-white selection:bg-primary selection:text-white">
      <BrandStage />
      <Services />
      <Partners />
      <About />
      <Testimonials />
      {/* Antes do fechamento: "somos daqui" é a última objeção a cair antes
          de o visitante decidir falar com a gente. */}
      <Location />
      <FinalCTA />
      <Footer />
    </main>
  );
}
