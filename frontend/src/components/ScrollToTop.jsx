import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Send } from "lucide-react";
import { scrollToId } from "@/components/shared";

export default function ScrollToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 16, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.9 }}
                    onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
                    data-testid="scroll-to-top-btn"
                    aria-label="Back to top"
                    className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-control-border bg-surface shadow-sm text-text transition-all hover:scale-105 hover:border-accent hover:text-accent"
                >
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export function HireMeFloat() {
    return (
        <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.4 }}
            onClick={() => scrollToId("contact")}
            data-testid="hire-me-float-btn"
            className="btn-primary fixed bottom-6 left-6 z-40 shadow-lg !px-4 !py-2.5 !rounded-full text-sm font-semibold lg:hidden"
            aria-label="Hire me — jump to contact form"
        >
            <Send className="h-4 w-4" aria-hidden="true" />
            Hire Me
        </motion.button>
    );
}
