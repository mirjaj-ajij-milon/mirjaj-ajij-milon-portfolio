import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Cpu,
    ExternalLink,
    Github,
    Layers,
    Lightbulb,
    Sparkles,
    User,
    X,
} from "lucide-react";
import TechChip from "@/components/TechChip";

/**
 * High-contrast badge styling ensuring readability against any screenshot image.
 */
function getModalBadgeStyle(badge = "") {
    if (badge.includes("1st Place") || badge.includes("🏆")) {
        return "bg-black/90 text-amber-300 border-amber-400/50 shadow-md";
    }
    if (badge.includes("Stripe") || badge.includes("Food")) {
        return "bg-black/90 text-purple-300 border-purple-400/50 shadow-md";
    }
    if (badge.includes("WebRTC") || badge.includes("Video")) {
        return "bg-black/90 text-cyan-300 border-cyan-400/50 shadow-md";
    }
    if (badge.includes("MVC") || badge.includes("Marketplace")) {
        return "bg-black/90 text-emerald-300 border-emerald-400/50 shadow-md";
    }
    if (badge.includes("Trading") || badge.includes("Simulator")) {
        return "bg-black/90 text-blue-300 border-blue-400/50 shadow-md";
    }
    if (badge.includes("Gemini") || badge.includes("Chat")) {
        return "bg-black/90 text-rose-300 border-rose-400/50 shadow-md";
    }
    return "bg-black/90 text-teal-300 border-teal-400/50 shadow-md";
}

/**
 * ProjectModal component
 * - Robust 3-layer architecture:
 *   1. Fixed Top Header (shrink-0) with close button & mobile drag handle
 *   2. Scrollable Middle Body (flex-1 overflow-y-auto min-h-0)
 *   3. Fixed Bottom Footer (shrink-0) ensuring Prev/Next navigation is ALWAYS visible on mobile
 * - Full responsiveness for mobile (<640px) and desktop (>=640px)
 */
export default function ProjectModal({
    project,
    onClose,
    allProjects = [],
    onSelectProject,
}) {
    const dialogRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const previousActiveElementRef = useRef(null);
    const [imgError, setImgError] = useState(false);

    // Reset scroll position and image error when project switches
    useEffect(() => {
        setImgError(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [project?.id]);

    // Compute previous and next projects for footer navigation
    const currentIndex = allProjects.findIndex((p) => p.id === project?.id);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject =
        currentIndex >= 0 && currentIndex < allProjects.length - 1
            ? allProjects[currentIndex + 1]
            : null;

    // Accessibility: Focus trap, Esc key listener, scroll lock, and focus restore
    useEffect(() => {
        if (!project) return undefined;

        previousActiveElementRef.current = document.activeElement;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Initial focus into modal close button
        const focusTimer = setTimeout(() => {
            if (dialogRef.current) {
                const closeBtn = dialogRef.current.querySelector(
                    '[data-testid="project-modal-close"]'
                );
                if (closeBtn) closeBtn.focus();
                else dialogRef.current.focus();
            }
        }, 50);

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
                return;
            }

            if (e.key === "Tab" && dialogRef.current) {
                const focusables = Array.from(
                    dialogRef.current.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    )
                ).filter(
                    (el) =>
                        !el.hasAttribute("disabled") &&
                        el.getAttribute("aria-hidden") !== "true" &&
                        el.offsetParent !== null
                );

                if (focusables.length === 0) return;

                const firstEl = focusables[0];
                const lastEl = focusables[focusables.length - 1];

                if (e.shiftKey && document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                } else if (!e.shiftKey && document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(focusTimer);
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);

            // Restore focus
            if (
                previousActiveElementRef.current &&
                typeof previousActiveElementRef.current.focus === "function"
            ) {
                previousActiveElementRef.current.focus();
            }
        };
    }, [project, onClose]);

    if (!project) return null;

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
                data-testid="project-modal-backdrop"
            >
                {/* Backdrop Blur Overlay */}
                <motion.div
                    className="fixed inset-0 bg-black/75 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    aria-hidden="true"
                />

                {/* Dialog / Bottom Sheet Container */}
                <motion.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="project-modal-title"
                    tabIndex={-1}
                    data-testid="project-modal-dialog"
                    initial={
                        prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 30, scale: 0.98 }
                    }
                    animate={
                        prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: 1, y: 0, scale: 1 }
                    }
                    exit={
                        prefersReducedMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 30, scale: 0.98 }
                    }
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col w-full bg-surface text-text border border-text/10 shadow-2xl overflow-hidden focus:outline-none h-[88vh] max-h-[88vh] rounded-t-3xl sm:h-auto sm:max-h-[85vh] sm:w-[calc(100%-32px)] sm:max-w-4xl sm:rounded-2xl"
                >
                    {/* 1. FIXED TOP HEADER BAR (shrink-0: always pinned at top) */}
                    <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5 bg-surface border-b border-text/10 z-20">
                        <div className="flex items-center gap-2 min-w-0">
                            {/* Mobile Drag Indicator */}
                            <div className="sm:hidden w-8 h-1 rounded-full bg-text/25 mr-1 shrink-0" />
                            <span className="font-display font-bold text-sm sm:text-base text-text truncate max-w-[200px] sm:max-w-md">
                                {project.shortTitle || project.title}
                            </span>
                            {project.links?.live && (
                                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shrink-0">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Live
                                </span>
                            )}
                        </div>

                        {/* Top Close Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            data-testid="project-modal-close"
                            aria-label="Close project modal"
                            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-text/[0.06] hover:bg-text/12 text-text hover:text-accent border border-text/10 transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0 ml-2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* 2. SCROLLABLE MIDDLE BODY (flex-1 overflow-y-auto min-h-0: content scrolls cleanly) */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto min-h-0 overscroll-contain scroll-smooth"
                    >
                        {/* Banner Screenshot Image */}
                        <div className="relative w-full h-44 sm:h-56 md:h-64 bg-text/[0.04] overflow-hidden border-b border-text/10">
                            {!imgError && project.image ? (
                                <img
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    loading="lazy"
                                    onError={() => setImgError(true)}
                                    className="h-full w-full object-cover object-top"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-text/[0.04] to-accent/10 p-6 text-center">
                                    <span className="font-display font-bold text-xl text-text-muted">
                                        {project.shortTitle || project.title}
                                    </span>
                                </div>
                            )}

                            {/* Top Dark Scrim for 100% Badge Contrast */}
                            <div
                                className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none"
                                aria-hidden="true"
                            />
                            {/* Bottom Fade */}
                            <div
                                className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none"
                                aria-hidden="true"
                            />

                            {/* Floating Badge on Image */}
                            {project.badge && (
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border shadow-md backdrop-blur-md ${getModalBadgeStyle(
                                            project.badge
                                        )}`}
                                    >
                                        {project.badge}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Modal Body Content */}
                        <div className="px-4 sm:px-8 md:px-10 py-5 sm:py-7 space-y-6">
                            {/* Title & Summary */}
                            <div className="space-y-2.5">
                                <h2
                                    id="project-modal-title"
                                    className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-text tracking-tight leading-snug"
                                >
                                    {project.title}
                                </h2>

                                <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed">
                                    {project.summary}
                                </p>

                                {/* Action Buttons */}
                                <div className="pt-2 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
                                    {project.links?.live && (
                                        <a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto min-h-[42px] sm:min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-on-accent font-semibold text-xs sm:text-sm shadow-sm hover:bg-accent-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                        >
                                            <ExternalLink className="h-4 w-4 shrink-0" />
                                            <span>Open Live Application</span>
                                        </a>
                                    )}

                                    {project.links?.repos?.map((repo) => (
                                        <a
                                            key={repo.url}
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto min-h-[42px] sm:min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-text/15 bg-surface text-text hover:border-accent hover:text-accent font-medium text-xs sm:text-sm transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                        >
                                            <Github className="h-4 w-4 shrink-0" />
                                            <span>
                                                {repo.label.toLowerCase() === "github"
                                                    ? "GitHub Repository"
                                                    : `GitHub · ${repo.label}`}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Quick Stats Strip (Upfront info for mobile users) */}
                            <div className="lg:hidden grid grid-cols-3 gap-2 p-3 rounded-xl bg-text/[0.03] border border-text/10 text-center">
                                <div>
                                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">
                                        Role
                                    </span>
                                    <span className="text-xs font-semibold text-text truncate block mt-0.5">
                                        {project.role}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">
                                        Year
                                    </span>
                                    <span className="text-xs font-semibold text-text block mt-0.5">
                                        {project.year}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted">
                                        Status
                                    </span>
                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                                        {project.links?.live ? "Live" : "Code"}
                                    </span>
                                </div>
                                <div className="col-span-3 pt-2 mt-1 border-t border-text/10 text-left">
                                    <span className="block text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1.5">
                                        Core Stack
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.stack?.map((tech) => (
                                            <TechChip key={tech} name={tech} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Main Grid: Narrative & Desktop Metadata Panel */}
                            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 lg:gap-8 items-start">
                                {/* Case Study Sections */}
                                <div className="space-y-4 sm:space-y-5 text-left">
                                    {/* Problem & Solution Cards */}
                                    {project.problem && project.solution && (
                                        <div className="space-y-3">
                                            {/* Problem Box */}
                                            <div className="rounded-xl bg-amber-500/[0.06] border border-amber-500/20 p-3.5 sm:p-4">
                                                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400 mb-1">
                                                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                                    <span>The Challenge / Problem</span>
                                                </div>
                                                <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                                                    {project.problem}
                                                </p>
                                            </div>

                                            {/* Solution Box */}
                                            <div className="rounded-xl bg-accent/[0.06] border border-accent/25 p-3.5 sm:p-4">
                                                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-accent mb-1">
                                                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                                                    <span>Engineered Solution</span>
                                                </div>
                                                <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                                                    {project.solution}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Key Features Section */}
                                    {project.features && project.features.length > 0 && (
                                        <section className="rounded-xl bg-surface border border-text/10 p-4 sm:p-5 space-y-2.5 shadow-xs">
                                            <h4 className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold text-accent">
                                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                                <span>Key Functional Features</span>
                                            </h4>
                                            <ul className="space-y-2">
                                                {project.features.map((feat, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-text-muted"
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                                        <span>{feat}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {/* Engineering Highlights Section */}
                                    {project.highlights && project.highlights.length > 0 && (
                                        <section className="rounded-xl bg-surface border border-text/10 p-4 sm:p-5 space-y-2.5 shadow-xs">
                                            <h4 className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold text-accent">
                                                <Layers className="h-4 w-4 shrink-0" />
                                                <span>Engineering & Architecture</span>
                                            </h4>
                                            <ul className="space-y-2">
                                                {project.highlights.map((high, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-text-muted"
                                                    >
                                                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                                        <span>{high}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {/* What I'd Improve Next */}
                                    {project.nextImprovement && (
                                        <section className="rounded-xl bg-surface border border-text/10 p-4 sm:p-5 space-y-1.5 shadow-xs">
                                            <h4 className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold text-accent">
                                                <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
                                                <span>Future Roadmap</span>
                                            </h4>
                                            <p className="text-xs sm:text-sm leading-relaxed text-text-muted">
                                                {project.nextImprovement}
                                            </p>
                                        </section>
                                    )}
                                </div>

                                {/* Desktop Metadata Sidebar (Hidden on mobile to avoid duplication) */}
                                <div className="hidden lg:block rounded-2xl p-5 sm:p-6 bg-surface border border-text/10 space-y-5 lg:sticky lg:top-4 shadow-xs">
                                    <div className="flex items-center gap-2 pb-3 border-b border-text/10">
                                        <Cpu className="h-4 w-4 text-accent" />
                                        <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-text">
                                            Project Metadata
                                        </h3>
                                    </div>

                                    {/* Role & Year Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-muted mb-1">
                                                <User className="h-3.5 w-3.5" />
                                                <span>Role</span>
                                            </span>
                                            <span className="text-sm font-semibold text-text">
                                                {project.role}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-muted mb-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>Year</span>
                                            </span>
                                            <span className="text-sm font-semibold text-text">
                                                {project.year}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-text-muted mb-2">
                                            Technologies Used
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.stack?.map((tech) => (
                                                <TechChip key={tech} name={tech} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Core Skills */}
                                    {project.skills && project.skills.length > 0 && (
                                        <div className="pt-2 border-t border-text/10">
                                            <span className="block text-xs uppercase tracking-wider text-text-muted mb-2">
                                                Core Competencies
                                            </span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-accent/5 text-text border border-accent/20"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Extra bottom scroll buffer */}
                        <div className="h-6" />
                    </div>

                    {/* 3. FIXED BOTTOM FOOTER BAR (shrink-0: ALWAYS visible on both mobile and desktop) */}
                    <div className="shrink-0 bg-surface border-t border-text/10 px-4 sm:px-6 py-2.5 sm:py-3 pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-2 z-20">
                        {prevProject ? (
                            <button
                                type="button"
                                onClick={() => onSelectProject?.(prevProject)}
                                aria-label={`Go to previous project: ${prevProject.shortTitle || prevProject.title}`}
                                className="inline-flex min-h-[36px] sm:min-h-[40px] items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg px-2.5 py-1"
                            >
                                <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
                                <span>
                                    Prev:{" "}
                                    <span className="hidden sm:inline font-bold">
                                        {prevProject.shortTitle || prevProject.title}
                                    </span>
                                </span>
                            </button>
                        ) : (
                            <div />
                        )}

                        {/* Project Position Indicator */}
                        <span className="text-xs font-mono font-medium text-text-muted bg-text/[0.04] px-2.5 py-0.5 rounded-full border border-text/10">
                            {currentIndex + 1} of {allProjects.length}
                        </span>

                        {nextProject ? (
                            <button
                                type="button"
                                onClick={() => onSelectProject?.(nextProject)}
                                aria-label={`Go to next project: ${nextProject.shortTitle || nextProject.title}`}
                                className="inline-flex min-h-[36px] sm:min-h-[40px] items-center gap-1.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg px-2.5 py-1"
                            >
                                <span>
                                    Next:{" "}
                                    <span className="hidden sm:inline font-bold">
                                        {nextProject.shortTitle || nextProject.title}
                                    </span>
                                </span>
                                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                            </button>
                        ) : (
                            <div />
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
