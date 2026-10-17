import { motion } from "framer-motion";
import { Lightbulb, MessageSquare, Sparkles, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { currentlyLearning, roadmap, skillGroups, softSkills, tierMeta } from "@/data/skills";
import { Chip, Reveal, SectionHeading, TechIcon, TierDot, lucideIcon } from "@/components/shared";

function SkillCard({ group, groupIndex }) {
    const GroupIcon = lucideIcon(group.icon);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
            data-testid={`skill-group-${group.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            className="card-surface p-4 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="mb-3.5 sm:mb-4 flex items-center justify-between border-b border-border pb-3 sm:pb-3.5">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <GroupIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-semibold">{group.category}</h3>
                </div>
                <span className="font-mono text-[11px] sm:text-xs text-muted-foreground">{group.skills.length} skills</span>
            </div>

            <TooltipProvider delayDuration={150}>
                <ul className="space-y-1 sm:space-y-1.5">
                    {group.skills.map((s) => (
                        <li key={s.name}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="group/item flex w-full cursor-default items-center justify-between rounded-lg px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm transition-colors hover:bg-accent"
                                        data-testid={`skill-item-${s.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-2.5">
                                            <TechIcon devicon={s.devicon} lucide={s.lucide} invertDark={s.invertDark} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-transform group-hover/item:scale-110" />
                                            <span className="font-medium text-foreground">{s.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground">{s.tier}</span>
                                            <TierDot tier={s.tier} />
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-56 font-sans text-xs">
                                    Used in: {s.usedIn.join(", ")}
                                </TooltipContent>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </TooltipProvider>
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28 overflow-hidden">
            <SectionHeading
                eyebrow="// skills"
                title="A toolbox kept deliberately sharp"
                subtitle="Three honest tiers instead of fake percentage bars — clear, verifiable competence."
            />

            <Reveal>
                <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-6" data-testid="tier-legend" aria-label="Proficiency legend">
                    {Object.entries(tierMeta).map(([key, meta]) => (
                        <span key={key} className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground font-medium">
                            <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden="true" />
                            {meta.label}
                        </span>
                    ))}
                </div>
            </Reveal>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {skillGroups.map((g, i) => (
                    <SkillCard key={g.category} group={g} groupIndex={i} />
                ))}
            </div>

            <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 lg:grid-cols-2">
                <Reveal>
                    <div className="card-surface h-full p-4 sm:p-6" data-testid="currently-learning">
                        <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                            Currently Learning
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">Topics and tooling actively explored outside university hours.</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {currentlyLearning.map((c) => (
                                <span
                                    key={c}
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                                    {c}
                                </span>
                            ))}
                        </div>
                        <div className="mt-6 space-y-3 border-t border-border pt-5">
                            {softSkills.map((s) => {
                                const Icon = s.name === "Teamwork" ? Users : s.name === "Communication" ? MessageSquare : Lightbulb;
                                return (
                                    <div key={s.name} className="flex items-start gap-3 text-sm">
                                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                                        <p>
                                            <span className="font-medium text-foreground">{s.name}</span>
                                            <span className="text-muted-foreground"> — {s.evidence}</span>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="card-surface h-full p-4 sm:p-6" data-testid="roadmap">
                        <h3 className="flex items-center gap-2 font-display text-base font-semibold">
                            <Chip className="border-primary/20 bg-primary/10 text-primary font-medium text-[11px] sm:text-xs">next</Chip>
                            Next on My Roadmap
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">A structured learning plan with clear engineering justification.</p>
                        <ol className="relative mt-4 sm:mt-5 space-y-4 sm:space-y-5 border-l border-border pl-4 sm:pl-6">
                            {roadmap.map((r) => (
                                <li key={r.name} className="relative">
                                    <span className="absolute -left-[21px] sm:-left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary" aria-hidden="true" />
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs sm:text-sm font-medium text-foreground">{r.name}</span>
                                        <Chip className="font-mono text-[11px] sm:text-xs">{r.when}</Chip>
                                    </div>
                                    <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">{r.why}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
