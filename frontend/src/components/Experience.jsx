import { ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { Chip, External, Reveal, SectionHeading } from "@/components/shared";

export default function Experience() {
    return (
        <section id="experience" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28 overflow-hidden">
            <SectionHeading
                eyebrow="// experience"
                title="Experience & Independent Work"
                subtitle="Internships, merged PRs, hackathon podiums and club leadership — every line here shipped something real."
            />

            <ol className="relative border-l border-border pl-4 sm:pl-8 lg:pl-10" data-testid="experience-timeline">
                {experience.map((job, i) => (
                    <li key={job.role + job.org} className="relative pb-8 sm:pb-10 last:pb-0">
                        <Reveal delay={i * 0.05}>
                            <span className="absolute -left-[21px] sm:-left-[37px] lg:-left-[45px] top-5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-background bg-primary" aria-hidden="true" />
                            <article data-testid={`experience-card-${i}`} className="card-surface p-4 sm:p-6 lg:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                                <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                                        {job.logo ? (
                                            <img
                                                src={job.logo}
                                                alt={`${job.org} logo`}
                                                className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl border border-border/60 bg-white p-1 object-contain shadow-xs"
                                            />
                                        ) : (
                                            <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-display text-sm font-bold text-primary">
                                                {job.logoText}
                                            </span>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-foreground">{job.role}</h3>
                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                {job.org} · <span className="text-muted-foreground/80">{job.orgType}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5 pl-13 sm:pl-0">
                                        <Chip className="font-mono text-[11px] sm:text-xs text-muted-foreground">{job.dates}</Chip>
                                        <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground">
                                            <MapPin className="h-3 w-3" aria-hidden="true" />
                                            {job.location}
                                        </span>
                                    </div>
                                </header>

                                <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5" data-testid={`experience-bullets-${i}`}>
                                    {job.bullets.map((b) => (
                                        <li key={b} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                                            <span className="flex-1">{b}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-3.5 sm:pt-4">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {job.tech.map((t) => (
                                            <Chip key={t} className="text-[11px] sm:text-xs py-0.5 px-2">{t}</Chip>
                                        ))}
                                    </div>
                                    {job.link && (
                                        <External
                                            href={job.link.url}
                                            testid={`experience-link-${i}`}
                                            className="inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-1.5 rounded-lg sm:rounded-none border sm:border-0 border-border bg-secondary/40 sm:bg-transparent px-3 py-2 sm:p-0 text-xs font-semibold text-primary transition-colors hover:underline shrink-0"
                                        >
                                            {job.link.label}
                                            <ExternalLink className="h-3.5 w-3.5 sm:h-3 sm:w-3" aria-hidden="true" />
                                        </External>
                                    )}
                                </div>
                            </article>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </section>
    );
}
