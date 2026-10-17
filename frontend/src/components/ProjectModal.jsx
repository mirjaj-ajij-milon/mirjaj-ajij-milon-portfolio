import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, CircleDot, ExternalLink, FileText, Github, Lightbulb, Rocket, Wrench, X } from "lucide-react";
import { External, TechIcon } from "@/components/shared";

const STATUS_CLS = {
    Live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-500 dark:text-emerald-300",
    "In Progress": "border-amber-400/30 bg-amber-400/10 text-amber-500 dark:text-amber-300",
    "Open Source": "border-sky-400/30 bg-sky-400/10 text-sky-500 dark:text-sky-300",
};

function Carousel({ screenshots, title }) {
    const [idx, setIdx] = useState(0);
    const go = (d) => setIdx((i) => (i + d + screenshots.length) % screenshots.length);
    return (
        <div data-testid="project-screenshot-carousel" className="overflow-hidden rounded-2xl border border-border">
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={idx}
                        src={screenshots[idx]}
                        alt={`${title} screenshot ${idx + 1}`}
                        loading="lazy"
                        className="h-64 w-full object-cover object-top sm:h-80"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
                {screenshots.length > 1 && (
                    <>
                        <button type="button" onClick={() => go(-1)} data-testid="carousel-prev" aria-label="Previous screenshot" className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => go(1)} data-testid="carousel-next" aria-label="Next screenshot" className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                            {screenshots.map((_, i) => (
                                <span key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/40"}`} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function Block({ icon: Icon, title, children, testid }) {
    return (
        <section data-testid={testid}>
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                {title}
            </h3>
            {children}
        </section>
    );
}

export default function ProjectModal({ project, onClose }) {
    useEffect(() => {
        if (!project) return undefined;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [project, onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
                    <motion.div
                        data-testid="project-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${project.title} details`}
                        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border bg-card shadow-2xl sm:rounded-3xl"
                        initial={{ y: 60, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 60, opacity: 0, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    >
                        <div className="relative h-44 sm:h-64 md:h-72">
                            <img src={project.thumbnail} alt={`${project.title} cover`} className="h-full w-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" aria-hidden="true" />
                            <button type="button" onClick={onClose} data-testid="project-modal-close" aria-label="Close project details" className="absolute right-3 top-3 sm:right-4 sm:top-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70">
                                <X className="h-5 w-5" />
                            </button>
                            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
                                <span className={`mb-1.5 sm:mb-2 inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-md ${STATUS_CLS[project.status]}`}>
                                    {project.status}
                                </span>
                                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{project.title}</h2>
                            </div>
                        </div>

                        <div className="space-y-6 sm:space-y-8 p-4 sm:p-8">
                            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{project.overview}</p>

                            <div className="flex flex-wrap gap-2.5">
                                {project.links.live && (
                                    <External href={project.links.live} testid="modal-link-live" className="btn-primary">
                                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                        Live Demo
                                    </External>
                                )}
                                {project.links.github && (
                                    <External href={project.links.github} testid="modal-link-github" className="btn-secondary">
                                        <Github className="h-4 w-4" aria-hidden="true" />
                                        GitHub
                                    </External>
                                )}
                                {project.links.docs && (
                                    <External href={project.links.docs} testid="modal-link-docs" className="btn-secondary">
                                        <FileText className="h-4 w-4" aria-hidden="true" />
                                        API Docs
                                    </External>
                                )}
                            </div>

                            <Block icon={CircleDot} title="Architecture" testid="modal-architecture">
                                <div className="space-y-2">
                                    {project.architecture.map((layer, i) => (
                                        <div key={layer} className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 px-4 py-2.5">
                                            <span className="font-mono text-xs font-medium text-primary">{String(i + 1).padStart(2, "0")}</span>
                                            <span className="text-sm">{layer}</span>
                                        </div>
                                    ))}
                                </div>
                            </Block>

                            <Block icon={Wrench} title="Key Features" testid="modal-features">
                                <ul className="grid gap-2 sm:grid-cols-2">
                                    {project.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm">
                                            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </Block>

                            <Block icon={Lightbulb} title="Challenges & How I Solved Them" testid="modal-challenges">
                                <div className="space-y-3">
                                    {project.challenges.map((c) => (
                                        <div key={c.challenge} className="rounded-xl border border-border p-4">
                                            <p className="text-sm font-medium">
                                                <span className="mr-2 rounded-md border border-rose-400/30 bg-rose-400/10 px-1.5 py-0.5 font-mono text-xs uppercase text-rose-400">challenge</span>
                                                {c.challenge}
                                            </p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                <span className="mr-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-xs uppercase text-emerald-400">fix</span>
                                                {c.solution}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Block>

                            {project.screenshots.length > 0 && <Carousel screenshots={project.screenshots} title={project.title} />}

                            <Block icon={BookOpen} title="What I Learned" testid="modal-learnings">
                                <blockquote className="rounded-xl border-l-4 border-primary bg-secondary/40 px-5 py-4 text-sm italic leading-relaxed text-muted-foreground">
                                    {project.learnings}
                                </blockquote>
                            </Block>

                            <Block icon={Rocket} title="Future Improvements" testid="modal-future">
                                <ul className="flex flex-wrap gap-2">
                                    {project.future.map((f) => (
                                        <li key={f} className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">{f}</li>
                                    ))}
                                </ul>
                            </Block>

                            <footer className="flex flex-col gap-3 border-t border-border pt-6">
                                <p className="font-mono text-xs text-muted-foreground">{project.role}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech.map((t) => (
                                        <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-secondary-foreground">
                                            <TechIcon devicon={t === "socket.io" ? "socketdotio" : t === "swagger" ? "swagger" : t} invertDark={t === "express" || t === "nextdotjs" || t === "vercel" || t === "swagger"} className="h-3 w-3" />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </footer>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
