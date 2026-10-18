import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FileText, Github, Star, Eye } from "lucide-react";
import { projects } from "@/data/projects";
import { External, Reveal, SectionHeading, TechIcon } from "@/components/shared";
import ProjectModal from "@/components/ProjectModal";

const FILTERS = ["All", "Full-Stack", "Backend", "Frontend", "AI/ML"];

const STATUS_CLS = {
    Live: "border-border bg-badge-bg text-badge-text",
    "In Progress": "border-border bg-badge-bg text-badge-text",
    "Open Source": "border-border bg-badge-bg text-badge-text",
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
            className="card-surface group flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-control-border"
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            aria-label={`Open details for ${project.title}`}
            onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
        >
            <div className="relative h-44 sm:h-48 overflow-hidden bg-bg">
                <img
                    src={project.thumbnail}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    width="800"
                    height="480"
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-surface/95 px-3.5 py-1.5 text-xs font-semibold text-text shadow-sm">
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        View Project Story
                    </span>
                </div>
                <span data-testid={`project-status-${project.id}`} className={`absolute left-3 top-3 rounded-md border px-2.5 py-0.5 text-xs font-mono font-medium backdrop-blur-md ${STATUS_CLS[project.status]}`}>
                    {project.status}
                </span>
                {project.featured && (
                    <span data-testid={`project-featured-${project.id}`} className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-border bg-badge-bg px-2.5 py-0.5 text-xs font-mono font-medium text-badge-text backdrop-blur-md">
                        <Star className="h-3 w-3 fill-accent text-accent" aria-hidden="true" />
                        Featured
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-text">{project.title}</h3>
                <p className="mt-1 text-xs sm:text-sm text-text font-medium">{project.tagline}</p>
                <p className="mt-2.5 sm:mt-3 line-clamp-2 text-xs sm:text-sm text-text-muted">{project.problem}</p>

                <ul className="mt-3.5 sm:mt-4 space-y-1.5 text-xs sm:text-sm" data-testid={`project-impact-${project.id}`}>
                    {project.impact.slice(0, 3).map((i) => (
                        <li key={i.metric} className="flex items-baseline gap-2">
                            <span className="font-mono text-xs sm:text-sm font-semibold text-text">{i.metric}</span>
                            <span className="text-text-muted text-xs sm:text-sm">{i.label}</span>
                        </li>
                    ))}
                </ul>

                <p className="mt-3.5 sm:mt-4 font-mono text-[11px] sm:text-xs text-text-muted">{project.role}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                        <span key={t} className="badge-tech">
                            <TechIcon devicon={t === "socket.io" ? "socketdotio" : t === "swagger" ? "swagger" : t} invertDark={t === "express" || t === "nextdotjs" || t === "vercel" || t === "swagger"} className="h-3 w-3" />
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 5 && <span className="font-mono text-[11px] sm:text-xs text-text-muted">+{project.tech.length - 5} more</span>}
                </div>

                <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-3.5 sm:pt-4" onClick={(e) => e.stopPropagation()}>
                    {project.links.live && (
                        <External href={project.links.live} testid={`project-live-${project.id}`} className="link-accent inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-hover">
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            Live Demo
                        </External>
                    )}
                    {project.links.github && (
                        <External href={project.links.github} testid={`project-github-${project.id}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text underline underline-offset-4 transition-colors">
                            <Github className="h-3.5 w-3.5" aria-hidden="true" />
                            GitHub
                        </External>
                    )}
                    {project.links.docs && (
                        <External href={project.links.docs} testid={`project-docs-${project.id}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text underline underline-offset-4 transition-colors">
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
                            className={`relative rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${filter === f ? "text-on-accent font-semibold" : "text-text-muted hover:text-text"
                                }`}
                        >
                            {filter === f && (
                                <motion.span
                                    layoutId="project-filter-pill"
                                    className="absolute inset-0 rounded-full bg-accent"
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
