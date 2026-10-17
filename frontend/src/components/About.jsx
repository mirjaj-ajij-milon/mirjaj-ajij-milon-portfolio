import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import {
    Briefcase, Clock3, Download, ExternalLink, Eye, Flame, Github, GraduationCap, Languages, MapPin, X,
} from "lucide-react";
import { site, aboutBio } from "@/data/site";
import { codingProfiles } from "@/data/socials";
import { marqueeTech } from "@/data/projects";
import { Chip, External, Heatmap, Reveal, SectionHeading, TechIcon } from "@/components/shared";

const hackathon_highlight = "/images/Hackathon_Highlight.jpeg";

const QUICK_FACTS = [
    { icon: MapPin, label: "Location", value: site.location },
    { icon: GraduationCap, label: "Degree", value: "B.Tech CSE (2024–2028) · Brainware University." },
    { icon: Briefcase, label: "Seeking", value: "Software Dev Internship (SDE)" },
    { icon: Languages, label: "Languages", value: "English · Hindi · Bengali" },
];

const DSA = { total: 257, easy: 120, medium: 115, hard: 22, streak: 90, topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Recursion", "Searching & Sorting"], langs: "Java · JavaScript · C" };

function DsaDonut() {
    const pct = 0.8;
    const r = 40, c = 2 * Math.PI * r;
    return (
        <div className="relative h-20 w-20 shrink-0" role="img" aria-label={`${DSA.total} problems solved`}>
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className="stroke-muted" />
                <motion.circle
                    cx="50" cy="50" r={r} fill="none" strokeWidth="8" strokeLinecap="round"
                    stroke="hsl(var(--primary))"
                    strokeDasharray={c}
                    initial={{ strokeDashoffset: c }}
                    whileInView={{ strokeDashoffset: c * (1 - pct) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-xl font-bold leading-none">{DSA.total}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">solved</span>
            </div>
        </div>
    );
}

function DsaCard() {
    const bars = [
        { label: "Easy", value: DSA.easy, cls: "bg-emerald-500" },
        { label: "Medium", value: DSA.medium, cls: "bg-amber-500" },
        { label: "Hard", value: DSA.hard, cls: "bg-rose-500" },
    ];
    return (
        <div data-testid="dsa-progress-card" className="card-surface mt-4 sm:mt-5 p-3.5 sm:p-4 min-w-0 max-w-full overflow-hidden">
            <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-1.5 font-display text-xs sm:text-sm font-semibold truncate">
                    <Flame className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                    <span>DSA &amp; Coding Progress</span>
                </h3>
                <Chip className="shrink-0 border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] sm:text-[11px] px-2 py-0.5">
                    {DSA.streak}-day streak
                </Chip>
            </div>
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <DsaDonut />
                <div className="w-full flex-1 min-w-0 space-y-2">
                    {bars.map((b) => (
                        <div key={b.label} className="min-w-0">
                            <div className="mb-0.5 flex justify-between text-[11px]">
                                <span className="text-muted-foreground">{b.label}</span>
                                <span className="font-mono text-foreground font-medium">{b.value}</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <motion.div
                                    className={`h-full rounded-full ${b.cls}`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${(b.value / DSA.total) * 100}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 min-w-0">
                {DSA.topics.map((t) => (
                    <Chip key={t} className="text-[10px] sm:text-[11px] px-2 py-0.5">{t}</Chip>
                ))}
            </div>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border/70 pt-2.5 text-[11px]">
                <span className="font-mono text-muted-foreground truncate">
                    language: <span className="text-foreground font-medium">{DSA.langs}</span>
                </span>
                <div className="flex items-center gap-3 shrink-0">
                    {codingProfiles.map((p) => (
                        <External
                            key={p.name}
                            href={p.url}
                            testid={`dsa-link-${p.name.toLowerCase().replace(/\s/g, "-")}`}
                            className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {p.name}
                            <ExternalLink className="h-2.5 w-2.5" aria-hidden="true" />
                        </External>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ResumeModal({ open, onOpenChange }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" />
                <Dialog.Content data-testid="resume-modal" className="fixed left-1/2 top-1/2 z-[70] flex h-[85vh] w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl">
                    <div className="flex items-center justify-between border-b border-border px-5 py-3">
                        <Dialog.Title className="font-display text-sm font-semibold">{site.resumeFileName}</Dialog.Title>
                        <div className="flex items-center gap-2">
                            <a href={site.resumePath} download={site.resumeFileName} data-testid="resume-modal-download" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                                Download
                            </a>
                            <Dialog.Close data-testid="resume-modal-close" aria-label="Close resume preview" className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                                <X className="h-4 w-4" />
                            </Dialog.Close>
                        </div>
                    </div>
                    <iframe title="Resume preview" src={site.resumePath} className="h-full w-full flex-1 bg-white" />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default function About() {
    const [previewOpen, setPreviewOpen] = useState(false);
    return (
        <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28 overflow-hidden">
            <SectionHeading
                eyebrow="// about me"
                title="Building the parts users never see — brilliantly"
                subtitle="Brainware University CS undergrad with production backend experience and a hackathon-winning track record."
            />

            <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,390px)_1fr] min-w-0 max-w-full">
                <div className="min-w-0 max-w-full space-y-4 sm:space-y-5">
                    {/* Compact, beautifully framed Hackathon Highlight Card */}
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs min-w-0 max-w-full">
                        <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-muted">
                            <img
                                src={hackathon_highlight}
                                alt="Mirjaj Ajij Milon — 1st Place Winner at DIGONTOM Remote Hackathon"
                                loading="lazy"
                                width="800"
                                height="1066"
                                className="h-full w-full object-cover object-[center_12%] transition-transform duration-500 hover:scale-[1.02]"
                            />
                        </div>
                        <div className="flex flex-col gap-2.5 p-3 sm:p-3.5 sm:flex-row sm:items-center sm:justify-between border-t border-border bg-card/60">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                    src="/images/Digontom_logo.jpg"
                                    alt="DIGONTOM Logo"
                                    className="h-9 w-9 rounded-lg border border-border/60 bg-white p-1 object-contain shrink-0 shadow-2xs"
                                />
                                <div className="min-w-0 flex-1">
                                    <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                                        Hackathon Highlight
                                    </span>
                                    <p className="truncate text-xs sm:text-sm font-semibold text-foreground">
                                        1st Place @ DIGONTOM Hackathon
                                    </p>
                                </div>
                            </div>
                            <External
                                href="https://drive.google.com/file/d/1Ccv0LJHymGNsR4wjCq1uyMQDI6zsAmZj/view?usp=drive_link"
                                testid="hackathon-highlight-cert-link"
                                className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary hover:text-primary-foreground shadow-2xs"
                            >
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                View Certificate
                            </External>
                        </div>
                    </div>
                    {/* Compact DSA Progress Card */}
                    <DsaCard />
                </div>

                <div className="min-w-0 max-w-full">
                    <Reveal delay={0.1}>
                        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                            {aboutBio.map((p, i) => (
                                <p key={i} className={i === 0 ? "text-foreground font-normal" : ""}>{p}</p>
                            ))}
                        </div>
                        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                            <a href={site.resumePath} download={site.resumeFileName} data-testid="about-resume-btn" className="btn-primary justify-center text-xs sm:text-sm py-2.5 sm:py-2">
                                <Download className="h-4 w-4" aria-hidden="true" />
                                Download Resume
                            </a>
                            <button type="button" onClick={() => setPreviewOpen(true)} data-testid="about-resume-preview-btn" className="btn-secondary justify-center text-xs sm:text-sm py-2.5 sm:py-2">
                                <Eye className="h-4 w-4" aria-hidden="true" />
                                Preview Resume
                            </button>
                        </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <dl className="mt-8 sm:mt-10 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2" data-testid="quick-facts">
                            {QUICK_FACTS.map((f) => (
                                <div key={f.label} className="flex items-start gap-3 rounded-2xl border border-border bg-card/50 p-3.5 sm:p-4">
                                    <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <f.icon className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <dt className="text-[11px] sm:text-xs text-muted-foreground">{f.label}</dt>
                                        <dd className="text-xs sm:text-sm font-medium leading-snug mt-0.5">{f.value}</dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <h3 className="mt-8 sm:mt-10 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">core stack</h3>
                        <div className="mt-3.5 sm:mt-4 flex flex-wrap gap-2 sm:gap-2.5" data-testid="core-stack">
                            {marqueeTech.map((t, idx) => (
                                <motion.div
                                    key={t.name}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <Chip className="px-2.5 py-1 text-xs transition-colors hover:border-foreground/20">
                                        <TechIcon devicon={t.devicon} invertDark={t.invertDark} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        {t.name}
                                    </Chip>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={0.25}>
                        <div className="card-surface mt-8 sm:mt-10 p-4 sm:p-6 overflow-hidden">
                            <h3 className="mb-3 sm:mb-4 flex items-center gap-2 font-display text-sm sm:text-base font-semibold">
                                <Github className="h-4 w-4" aria-hidden="true" />
                                GitHub Activity
                            </h3>
                            <p className="mb-4 flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                                <Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                Committing almost every day since Jan 2024 — mostly backend work and the DSA grind.
                            </p>
                            <div className="overflow-x-auto pb-2">
                                <Heatmap />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            <ResumeModal open={previewOpen} onOpenChange={setPreviewOpen} />
        </section>
    );
}
