import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Infrastructure from "@/components/Infrastructure";
import Timeline from "@/components/Timeline";
import TechStack from "@/components/TechStack";
import Systems from "@/components/Systems";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Projects />
      <SectionDivider label="infrastructure" />
      <Infrastructure />
      <SectionDivider label="timeline" />
      <Timeline />
      <SectionDivider label="stack" />
      <TechStack />
      <SectionDivider label="systems" />
      <Systems />
      <SectionDivider label="contact" />
      <Contact />
      <Footer />
    </main>
  );
}
