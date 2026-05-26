import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { TerminalBoot } from "@/components/animations/TerminalBoot";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <TerminalBoot />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <AboutSection />
        <ExpertiseSection />
        <TechStackSection />
        <ExperienceSection />
        <CaseStudiesSection />
        <CertificationsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
