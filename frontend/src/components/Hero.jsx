import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { site } from "@/data/site";
import { socials } from "@/data/socials";
import { External, scrollToId, SocialIcon, StatCounter } from "@/components/shared";

export default function Hero() {
    const sectionRef = useRef(null);

    return (
        <section id="home" ref={sectionRef} data-testid="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="hero-grid absolute inset-0" aria-hidden="true" />

            <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-16 pt-24 text-center sm:px-6 sm:pb-20 sm:pt-28">
                {/* Centered Profile Picture - prominent, crisp, and beautifully framed */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    data-testid="hero-avatar-card"
                    className="relative mb-5"
                >
                    <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44 overflow-hidden rounded-full border-2 border-border bg-surface ring-2 ring-accent/20 transition-transform duration-300 hover:scale-[1.02]">
                        <img
                            src={site.avatar}
                            alt={`Portrait of ${site.name}`}
                            width="176"
                            height="176"
                            fetchpriority="high"
                            className="h-full w-full object-cover object-[center_15%]"
                        />
                    </div>
                </motion.div>

                {/* Open to Work / Availability Badge */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    data-testid="hero-availability-badge"
                    className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-badge-bg px-3.5 py-1 font-mono text-xs font-medium text-badge-text"
                >
                    <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{site.availability}</span>
                </motion.p>

                {/* Headline (Name written strictly ONCE) */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-tight">
                        Hi, I&apos;m{" "}
                        <span className="text-accent">{site.name}</span>
                    </h1>
                    <p className="mt-2 text-base sm:text-xl lg:text-2xl font-medium text-text">
                        {site.role}
                    </p>
                </motion.div>

                {/* Developer Key Details */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl text-xs sm:text-sm px-2"
                >
                    <span className="inline-flex max-w-full items-center text-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-text">
                        🎓 B.Tech CSE · Brainware University
                    </span>
                    <span className="inline-flex max-w-full items-center text-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-text">
                        🏆 1st Place @ DIGONTOM Hackathon
                    </span>
                    <span className="inline-flex max-w-full items-center text-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-text">
                        ⚡ Ex-Backend Intern @ Gameonix
                    </span>
                    <span className="inline-flex max-w-full items-center text-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-text">
                        📍 {site.location}
                    </span>
                </motion.div>

                {/* Pitch / Summary */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.23 }}
                    className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-text-muted"
                >
                    {site.pitch}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto"
                >
                    <button
                        type="button"
                        onClick={() => scrollToId("projects")}
                        data-testid="hero-cta-projects"
                        className="btn-primary w-full sm:w-auto justify-center text-xs sm:text-sm py-2.5 sm:py-2"
                    >
                        View Projects
                    </button>
                    <a
                        href={site.resumePath}
                        download={site.resumeFileName}
                        data-testid="hero-cta-resume"
                        className="btn-secondary w-full sm:w-auto justify-center text-xs sm:text-sm py-2.5 sm:py-2"
                    >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download Resume
                    </a>
                    <button
                        type="button"
                        onClick={() => scrollToId("contact")}
                        data-testid="hero-cta-contact"
                        className="btn-ghost w-full sm:w-auto justify-center text-xs sm:text-sm py-2.5 sm:py-2"
                    >
                        Contact Me
                    </button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-5 sm:mt-6 flex items-center justify-center gap-2"
                >
                    <TooltipProvider delayDuration={100}>
                        {socials.slice(0, 5).map((s) => (
                            <Tooltip key={s.name}>
                                <TooltipTrigger asChild>
                                    <External
                                        href={s.url}
                                        testid={`hero-social-${s.icon}`}
                                        ariaLabel={s.label}
                                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-muted transition-colors hover:border-control-border hover:text-text"
                                    >
                                        <SocialIcon icon={s.icon} className="h-4 w-4" />
                                    </External>
                                </TooltipTrigger>
                                <TooltipContent>{s.name}</TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </motion.div>

                {/* Stats Counters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="mt-8 sm:mt-10 grid w-full max-w-2xl grid-cols-2 gap-4 sm:gap-6 border-t border-border pt-6 sm:pt-8 sm:grid-cols-4"
                >
                    {site.stats.map((s) => (
                        <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} testid={`hero-stat-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`} />
                    ))}
                </motion.div>
            </div>

            <button
                type="button"
                onClick={() => scrollToId("about")}
                data-testid="hero-scroll-indicator"
                aria-label="Scroll to about section"
                className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-text-muted transition-colors hover:text-text sm:flex"
            >
                <span className="font-mono text-[11px] uppercase tracking-[0.25em]">scroll</span>
                <span className="flex h-8 w-5 items-start justify-center rounded-full border border-border p-1">
                    <span className="scroll-wheel h-1.5 w-1 rounded-full bg-accent" />
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
            </button>
        </section>
    );
}
