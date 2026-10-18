import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Github } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

const INITIAL_PROJECT_COUNT = 6;
export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECT_COUNT);

    // If projects expand beyond INITIAL_PROJECT_COUNT in the future, display paginated/expanded slice
    const displayedProjects = projects.slice(0, visibleCount);
    const hasMore = projects.length > visibleCount;

    const handleToggleViewMore = () => {
        if (hasMore) {
            // Expand all projects
            setVisibleCount(projects.length);
        } else {
            // Collapse back to initial 6
            setVisibleCount(INITIAL_PROJECT_COUNT);
        }
    };

    return (
        <section
            id="projects"
            data-testid="projects-section"
            className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >

            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                <span className="text-sm uppercase tracking-[0.1em] font-mono font-semibold text-accent">
                    Featured Work
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-text tracking-tight">
                    Featured Systems & Full-Stack Apps
                </h2>
                <p className="mt-3 text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl mx-auto">
                    A curated collection of full-stack applications showcasing real-time WebRTC media,
                    multi-tenant AI copilot architectures, Stripe payment flows, and robust backend engineering.
                </p>
            </div>

            {/* 3-Column Grid Layout (1 col mobile, 2 cols tablet, 3 cols desktop) */}
            <div
                data-testid="projects-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
                {displayedProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onOpen={(p) => setActiveProject(p)}
                    />
                ))}
            </div>

            {/* Bottom Actions: View More Expander & GitHub Repositories Link */}
            <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Dynamic 'View More' Button if projects are increased in data */}
                {projects.length > INITIAL_PROJECT_COUNT && (
                    <button
                        type="button"
                        onClick={handleToggleViewMore}
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-accent text-on-accent hover:bg-accent-hover transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                        <span>
                            {hasMore
                                ? `View More Projects (${projects.length - visibleCount} more)`
                                : "Show Less Projects"}
                        </span>
                        {hasMore ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronUp className="h-4 w-4" />
                        )}
                    </button>
                )}

                {/* Always-accessible GitHub Profile Repositories Link */}
                <a
                    href="https://github.com/mirjaj-ajij-milon?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-text bg-surface border border-text/15 hover:border-accent hover:text-accent transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                    <Github className="h-4 w-4 shrink-0" />
                    <span>View all repositories on GitHub</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70" />
                </a>
            </div>

            {/* Project Detail Modal / Mobile Bottom Sheet */}
            {activeProject && (
                <ProjectModal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                    allProjects={projects}
                    onSelectProject={(nextP) => setActiveProject(nextP)}
                />
            )}
        </section>
    );
}
