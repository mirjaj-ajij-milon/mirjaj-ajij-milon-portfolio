import { BadgeCheck, BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/education";
import { Chip, External, Reveal, SectionHeading } from "@/components/shared";

export default function Education() {
    return (
        <section id="education" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28 overflow-hidden">
            <SectionHeading
                eyebrow="// education"
                title="Education & Certifications"
                subtitle="Strong CS fundamentals, plus certificates I actually earned — every one links to verification."
            />

            <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_1fr] min-w-0 max-w-full">
                <div className="min-w-0 max-w-full">
                    <h3 className="mb-4 sm:mb-6 flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        <GraduationCap className="h-4 w-4" aria-hidden="true" />
                        Education
                    </h3>
                    <ol className="relative border-l border-border pl-4 sm:pl-6" data-testid="education-timeline">
                        {education.map((e, i) => (
                            <li key={e.title} className="relative pb-6 sm:pb-8 last:pb-0">
                                <Reveal delay={i * 0.06}>
                                    <span className="absolute -left-[21px] sm:-left-[29px] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" aria-hidden="true" />
                                    <div className="card-surface p-4 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-control-border" data-testid={`education-card-${i}`}>
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <h4 className="font-display text-sm sm:text-base font-bold tracking-tight text-text">{e.title}</h4>
                                            <Chip className="font-mono text-[11px] sm:text-xs font-medium">{e.score}</Chip>
                                        </div>
                                        <p className="mt-1 text-xs sm:text-sm text-text-muted">{e.org}</p>
                                        <p className="mt-0.5 font-mono text-[11px] sm:text-xs text-text-muted">{e.dates}</p>
                                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-muted">{e.detail}</p>
                                        {e.coursework.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {e.coursework.map((c) => (
                                                    <Chip key={c} className="text-[11px] sm:text-xs">{c}</Chip>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="min-w-0 max-w-full">
                    <h3 className="mb-4 sm:mb-6 flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                        Certifications
                    </h3>
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2" data-testid="certifications-grid">
                        {certifications.map((c, i) => (
                            <Reveal key={c.title} delay={i * 0.05}>
                                <div className="card-surface flex h-full flex-col p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-control-border" data-testid={`certification-card-${i}`}>
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        {c.logo ? (
                                            <img
                                                src={c.logo}
                                                alt={`${c.issuer} logo`}
                                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-border bg-surface p-1 object-contain shrink-0"
                                            />
                                        ) : (
                                            <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-badge-bg font-display text-xs font-bold text-accent shrink-0">
                                                {c.issuer.slice(0, 2).toUpperCase()}
                                            </span>
                                        )}
                                        <span className="font-mono text-[11px] text-text-muted">{c.date}</span>
                                    </div>
                                    <h4 className="text-xs sm:text-sm font-semibold leading-snug text-text">{c.title}</h4>
                                    <p className="mt-1 text-xs text-text-muted">{c.issuer}</p>
                                    {c.detail && (
                                        <p className="mt-2 text-xs leading-relaxed text-text-muted">{c.detail}</p>
                                    )}
                                    <div className="mt-4 pt-3 border-t border-border mt-auto">
                                        <External
                                            href={c.verify}
                                            testid={`certification-verify-${i}`}
                                            className="btn-secondary !w-full !justify-center !text-xs !py-1.5"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                            View Certificate
                                        </External>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
