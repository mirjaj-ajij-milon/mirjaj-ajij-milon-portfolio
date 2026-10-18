import { useState } from "react";
import { ChevronRight, ExternalLink, Github } from "lucide-react";
import TechChip from "@/components/TechChip";

/**
 * Returns a high-contrast, theme-proof badge style with dark glassmorphism
 * ensuring 100% legibility on white, light, or dark screenshot images.
 */
function getBadgeColorClasses(badge = "") {
    if (badge.includes("1st Place") || badge.includes("🏆")) {
        return "bg-black/90 text-amber-300 border-amber-400/50 shadow-amber-950/30";
    }
    if (badge.includes("Stripe") || badge.includes("Food")) {
        return "bg-black/90 text-purple-300 border-purple-400/50 shadow-purple-950/30";
    }
    if (badge.includes("WebRTC") || badge.includes("Video")) {
        return "bg-black/90 text-cyan-300 border-cyan-400/50 shadow-cyan-950/30";
    }
    if (badge.includes("MVC") || badge.includes("Marketplace")) {
        return "bg-black/90 text-emerald-300 border-emerald-400/50 shadow-emerald-950/30";
    }
    if (badge.includes("Trading") || badge.includes("Simulator")) {
        return "bg-black/90 text-blue-300 border-blue-400/50 shadow-blue-950/30";
    }
    if (badge.includes("Gemini") || badge.includes("Chat")) {
        return "bg-black/90 text-rose-300 border-rose-400/50 shadow-rose-950/30";
    }
    return "bg-black/90 text-teal-300 border-teal-400/50 shadow-teal-950/30";
}

export default function ProjectCard({ project, onOpen }) {
    const [imgError, setImgError] = useState(false);
    const isLive = Boolean(project.links?.live);

    // Limit visible tech chips to 4 to ensure clean spacing, with +N overflow
    const visibleStack = project.stack ? project.stack.slice(0, 4) : [];
    const remainingCount = project.stack ? project.stack.length - 4 : 0;

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
        }
    };

    return (
        <article
            role="button"
            tabIndex={0}
            data-testid={`project-card-${project.id}`}
            aria-label={`View details for ${project.title}`}
            onClick={() => onOpen(project)}
            onKeyDown={handleKeyDown}
            className="group relative flex flex-col h-full rounded-2xl bg-surface border border-text/10 shadow-sm overflow-hidden text-left cursor-pointer transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-bg [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-xl [@media(hover:hover)]:hover:border-accent/40"
        >
            {/* 1. Cover Image with High-Contrast Badge Overlay */}
            <div className="relative w-full aspect-video overflow-hidden bg-text/[0.04] border-b border-text/10">
                {!imgError && project.image ? (
                    <img
                        src={project.image}
                        alt={`${project.title} interface preview`}
                        loading="lazy"
                        width="800"
                        height="450"
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-text/[0.04] to-accent/10 p-6 text-center">
                        <span className="font-display font-bold text-lg text-text-muted">
                            {project.shortTitle || project.title}
                        </span>
                    </div>
                )}

                {/* Dark gradient vignette at top for 100% badge legibility even on pure white images */}
                <div
                    className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none"
                    aria-hidden="true"
                />

                {/* Subtle bottom gradient vignette */}
                <div
                    className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                    aria-hidden="true"
                />

                {/* Badges on Image (Solid dark high-contrast pills) */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                    {project.badge ? (
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border shadow-md backdrop-blur-md ${getBadgeColorClasses(
                                project.badge
                            )}`}
                        >
                            {project.badge}
                        </span>
                    ) : (
                        <span />
                    )}

                    {isLive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-black/90 text-emerald-300 border border-emerald-400/50 shadow-md backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-black/90 text-slate-300 border border-white/20 shadow-md backdrop-blur-md">
                            Code
                        </span>
                    )}
                </div>
            </div>

            {/* 2. Card Content Body */}
            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                    {/* Title */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-text tracking-tight group-hover:text-accent transition-colors line-clamp-1">
                        {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
                        {project.summary}
                    </p>

                    {/* Tech Chips */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {visibleStack.map((tech) => (
                            <TechChip key={tech} name={tech} />
                        ))}
                        {remainingCount > 0 && (
                            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-text-muted bg-text/[0.04] border border-text/10">
                                +{remainingCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* 3. Action Row (Pinned at bottom) */}
                <div
                    className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-text/10 pt-4"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    {/* Primary Button: View details */}
                    <button
                        type="button"
                        onClick={() => onOpen(project)}
                        aria-label={`Open details modal for ${project.title}`}
                        className="inline-flex min-h-[40px] items-center gap-1 rounded-lg px-2 text-xs sm:text-sm font-semibold text-accent hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                    >
                        <span>View details</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    {/* Links: Live & Repos */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {project.links?.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open live site for ${project.title}`}
                                className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-text-muted hover:text-accent hover:bg-accent/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                            >
                                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                <span>Live</span>
                            </a>
                        )}

                        {project.links?.repos?.map((repo) => (
                            <a
                                key={repo.url}
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${repo.label} repository for ${project.title}`}
                                className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-text-muted hover:text-text hover:bg-text/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                            >
                                <Github className="h-3 w-3 shrink-0" />
                                <span>
                                    {repo.label.toLowerCase() === "github" ? "Code" : repo.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
