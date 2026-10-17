import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop, { HireMeFloat } from "@/components/ScrollToTop";
import { Marquee } from "@/components/shared";
import { marqueeTech } from "@/data/projects";

export default function Portfolio() {
    return (
        <div data-testid="portfolio-page" className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <main className="w-full max-w-full overflow-x-hidden">
                <Hero />
                <Marquee items={marqueeTech} />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Achievements />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
            <ScrollToTop />
            <HireMeFloat />
        </div>
    );
}
