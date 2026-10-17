import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { scrollToId, useActiveSection } from "@/components/shared";
import ThemeToggle from "@/components/ThemeToggle";

const SECTION_IDS = ["about", "skills", "projects", "experience", "education", "contact"];
const LINKS = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const active = useActiveSection(SECTION_IDS);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id) => {
        setOpen(false);
        setTimeout(() => scrollToId(id), open ? 250 : 0);
    };

    return (
        <header
            data-testid="navbar"
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => go("home")}
                    data-testid="nav-logo"
                    className="flex items-center gap-2.5"
                    aria-label="Back to top"
                >
                    <img src="/logo.svg" alt={`${site.name} logo`} className="h-8 w-8 rounded-lg" width="32" height="32" />
                    <span className="font-display text-lg font-bold tracking-tight">
                        {site.logoWord.split(".")[0]}
                        <span className="text-primary">.dev</span>
                    </span>
                </button>

                <ul className="hidden items-center gap-1 lg:flex">
                    {LINKS.map((l) => (
                        <li key={l.id}>
                            <button
                                type="button"
                                onClick={() => go(l.id)}
                                data-testid={`nav-link-${l.id}`}
                                aria-current={active === l.id ? "true" : undefined}
                                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {l.label}
                                {active === l.id && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2.5">
                    <a
                        href={site.resumePath}
                        download={site.resumeFileName}
                        data-testid="nav-resume-btn"
                        className="btn-primary !px-4 !py-2 hidden md:inline-flex"
                    >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download Resume
                    </a>
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        data-testid="nav-hamburger-btn"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="btn-icon !rounded-full lg:hidden"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />
                        <motion.aside
                            data-testid="mobile-drawer"
                            className="fixed right-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-72 flex-col gap-1 border-l border-border bg-background p-6 shadow-xl lg:hidden"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 32 }}
                        >
                            {LINKS.map((l) => (
                                <button
                                    key={l.id}
                                    type="button"
                                    onClick={() => go(l.id)}
                                    data-testid={`mobile-link-${l.id}`}
                                    className={`rounded-xl px-4 py-3 text-left text-base transition-colors ${active === l.id ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/60"
                                        }`}
                                >
                                    {l.label}
                                </button>
                            ))}
                            <a
                                href={site.resumePath}
                                download={site.resumeFileName}
                                data-testid="mobile-resume-btn"
                                className="btn-primary mt-4 w-full py-3 text-sm"
                            >
                                <Download className="h-4 w-4" aria-hidden="true" />
                                Download Resume
                            </a>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
