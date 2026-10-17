import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FileText, Github, Star, Eye } from "lucide-react";
import { projects } from "@/data/projects";
import { External, Reveal, SectionHeading, TechIcon } from "@/components/shared";
import ProjectModal from "@/components/ProjectModal";

const FILTERS = ["All", "Full-Stack", "Backend", "Frontend", "AI/ML"];

const STATUS_CLS = {
    Live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-500 dark:text-emerald-300",
    "In Progress": "border-amber-400/30 bg-amber-400/10 text-amber-500 dark:text-amber-300",
    "Open Source": "border-sky-400/30 bg-sky-400/10 text-sky-500 dark:text-sky-300",
};

function ProjectCard({ project, onOpen }) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            data-testid={`project-card-${project.id}`}
            className="card-surface group flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            aria-label={`Open details for ${project.title}`}
            onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
        >
            <div className="relative h-44 sm:h-48 overflow-hidden bg-muted">
                <img
                    src={project.thumbnail}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    width="800"
                    height="480"
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-card/90 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        View Project Story
                    </span>
                </div>
                <span data-testid={`project-status-${project.id}`} className={`absolute left-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-medium backdrop-blur-md ${STATUS_CLS[project.status]}`}>
                    {project.status}
                </span>
                {project.featured && (
                    <span data-testid={`project-featured-${project.id}`} className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-600 backdrop-blur-md dark:text-amber-400">
                        <Star className="h-3 w-3 fill-amber-500" aria-hidden="true" />
                        Featured
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">{project.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-foreground/80 font-medium">{project.tagline}</p>
                <p className="mt-2.5 sm:mt-3 line-clamp-2 text-xs sm:text-sm text-muted-foreground">{project.problem}</p>

                <ul className="mt-3.5 sm:mt-4 space-y-1.5 text-xs sm:text-sm" data-testid={`project-impact-${project.id}`}>
                    {project.impact.slice(0, 3).map((i) => (
                        <li key={i.metric} className="flex items-baseline gap-2">
                            <span className="font-mono text-xs sm:text-sm font-semibold text-foreground">{i.metric}</span>
                            <span className="text-muted-foreground text-xs sm:text-sm">{i.label}</span>
                        </li>
                    ))}
                </ul>

                <p className="mt-3.5 sm:mt-4 font-mono text-[11px] sm:text-xs text-muted-foreground">{project.role}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                        <span key={t} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[11px] sm:text-xs text-secondary-foreground font-medium">
                            <TechIcon devicon={t === "socket.io" ? "socketdotio" : t === "swagger" ? "swagger" : t} invertDark={t === "express" || t === "nextdotjs" || t === "vercel" || t === "swagger"} className="h-3 w-3" />
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 5 && <span className="text-[11px] sm:text-xs text-muted-foreground">+{project.tech.length - 5} more</span>}
                </div>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 border-t border-border pt-3.5 sm:pt-4" onClick={(e) => e.stopPropagation()}>
                    {project.links.live && (
                        <External href={project.links.live} testid={`project-live-${project.id}`} className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            Live Demo
                        </External>
                    )}
                    {project.links.github && (
                        <External href={project.links.github} testid={`project-github-${project.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent">
                            <Github className="h-3.5 w-3.5" aria-hidden="true" />
                            GitHub
                        </External>
                    )}
                    {project.links.docs && (
                        <External href={project.links.docs} testid={`project-docs-${project.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent">
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            API Docs
                        </External>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState("All");
    const [active, setActive] = useState(null);
    const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="projects" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28 overflow-hidden">
            <SectionHeading
                eyebrow="// portfolio"
                title="Featured Projects"
                subtitle="Shipped, measured and written up with architecture diagrams, challenge retrospectives, and live demos."
            />

            <Reveal>
                <div className="mb-8 sm:mb-12 flex flex-wrap justify-center gap-1.5 sm:gap-2" role="tablist" aria-label="Filter projects by category">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            type="button"
                            role="tab"
                            aria-selected={filter === f}
                            onClick={() => setFilter(f)}
                            data-testid={`project-filter-${f.toLowerCase().replace("/", "-")}`}
                            className={`relative rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${filter === f ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {filter === f && (
                                <motion.span
                                    layoutId="project-filter-pill"
                                    className="absolute inset-0 rounded-full bg-primary"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{f}</span>
                        </button>
                    ))}
                </div>
            </Reveal>

            <motion.div layout className="grid gap-7 md:grid-cols-2 xl:grid-cols-3" data-testid="projects-grid">
                <AnimatePresence mode="popLayout">
                    {visible.map((p) => (
                        <ProjectCard key={p.id} project={p} onOpen={setActive} />
                    ))}
                </AnimatePresence>
            </motion.div>

            <Reveal className="mt-14 flex justify-center">
                <External
                    href="https://github.com/mirjaj-ajij-milon?tab=repositories"
                    testid="projects-view-more"
                    className="btn-secondary !px-6 !py-3"
                >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View more on GitHub
                </External>
            </Reveal>

            <ProjectModal project={active} onClose={() => setActive(null)} />
        </section>
    );
}
