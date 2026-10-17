import { Code2, ExternalLink, GitPullRequest, GraduationCap, Medal, Rocket, Server, ShieldCheck, Star, Trophy, Users } from "lucide-react";
import { achievements, codingProfiles } from "@/data/achievements";
import { External, Reveal, SectionHeading, SocialIcon } from "@/components/shared";

const ICONS = { Trophy, Medal, Star, Users, GitPullRequest, Code2, Server, Rocket, GraduationCap, ShieldCheck };

export default function Achievements() {
    return (
        <section id="achievements" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28 overflow-hidden">
            <SectionHeading
                eyebrow="// credentials"
                title="Achievements & Coding Profiles"
                subtitle="Numbers I can defend in an interview, on platforms recruiters actually check."
            />

            <div className="grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {achievements.map((a, i) => {
                    const Icon = ICONS[a.icon] || Trophy;
                    return (
                        <Reveal key={a.title} delay={i * 0.05}>
                            <div data-testid={`achievement-card-${i}`} className="card-surface flex h-full items-start gap-3.5 sm:gap-4 p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-control-border">
                                {a.logo ? (
                                    <img
                                        src={a.logo}
                                        alt=""
                                        className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-xl border border-border bg-surface p-1 object-contain shadow-xs"
                                    />
                                ) : (
                                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-badge-bg text-accent">
                                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                                    </span>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xs sm:text-sm font-semibold leading-snug text-text">{a.title}</h3>
                                    <p className="mt-1 text-xs leading-relaxed text-text-muted">{a.detail}</p>
                                    {a.link && (
                                        <External
                                            href={a.link}
                                            testid={`achievement-link-${i}`}
                                            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold link-accent"
                                        >
                                            View Certificate
                                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                        </External>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 max-w-2xl mx-auto">
                {codingProfiles.map((p, i) => (
                    <Reveal key={p.platform} delay={i * 0.05}>
                        <External href={p.url} testid={`coding-profile-${p.platform.toLowerCase().replace(/\s/g, "-")}`} className="group card-surface flex h-full flex-col p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-control-border">
                            <div className="flex items-center justify-between">
                                <SocialIcon icon={p.icon} className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                                <ExternalLink className="h-4 w-4 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                            </div>
                            <h3 className="mt-3 text-sm font-semibold text-text">{p.platform}</h3>
                            <p className="font-mono text-xs text-text-muted">{p.handle}</p>
                            <dl className="mt-3.5 sm:mt-4 space-y-1.5 border-t border-border pt-3">
                                {p.stats.map((s) => (
                                    <div key={s.label} className="flex items-center justify-between text-xs">
                                        <dt className="text-text-muted">{s.label}</dt>
                                        <dd className="font-mono font-semibold text-text">{s.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </External>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
