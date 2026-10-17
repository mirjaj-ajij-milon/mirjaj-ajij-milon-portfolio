import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring } from "framer-motion";
import {
    Boxes, Braces, CheckCircle, Cloud, Code2, Cpu, Database, Gauge, Github, Globe, GraduationCap, Image, KeyRound, Layers,
    Linkedin, Lock, Mail, MessageCircle, MonitorSmartphone, Network, ServerCog, ShieldCheck, Table2, Twitter,
    Wrench,
} from "lucide-react";

const DEVICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const LUCIDE_ICONS = {
    Network, KeyRound, Braces, Boxes, Table2, Cpu, Globe, Layers, MonitorSmartphone,
    ServerCog, Database, Wrench, Code2, GraduationCap, ShieldCheck, Lock, Cloud, Image, Gauge, CheckCircle, Mail,
};
export const lucideIcon = (name) => LUCIDE_ICONS[name] || Code2;

/* Smooth-scroll to a section, using Lenis when available */
export function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -76, duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth" });
}

/* External link that always opens safely in a new tab */
export function External({ href, children, className = "", testid, ariaLabel }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-testid={testid} aria-label={ariaLabel}>
            {children}
        </a>
    );
}

/* Scroll-reveal wrapper (fires once, respects reduced motion via MotionConfig) */
export function Reveal({ children, delay = 0, y = 28, className = "" }) {
    return (
        <motion.div
            className={`min-w-0 max-w-full ${className}`}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
    const alignCls = align === "left" ? "items-start text-left" : "items-center text-center";
    return (
        <Reveal className={`flex flex-col ${alignCls} gap-2.5 sm:gap-3 mb-8 sm:mb-12`}>
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight max-w-2xl text-foreground">{title}</h2>
            {subtitle ? <p className="text-muted-foreground max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">{subtitle}</p> : null}
        </Reveal>
    );
}

/* Devicon tech logo with plain/original fallback chain, then a lucide icon */
export function TechIcon({ devicon, lucide, invertDark, className = "h-4 w-4" }) {
    const [step, setStep] = useState(0);
    const Fallback = lucideIcon(lucide);
    if (!devicon || step >= 2) return <Fallback className={className} aria-hidden="true" />;
    const file = step === 0 ? `${devicon}-original.svg` : `${devicon}-plain.svg`;
    return (
        <img
            src={`${DEVICON_CDN}/${devicon}/${file}`}
            alt=""
            loading="lazy"
            aria-hidden="true"
            className={`${className} ${invertDark ? "dark:invert" : ""}`}
            onError={() => setStep((s) => s + 1)}
        />
    );
}

export function Chip({ children, className = "" }) {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-xs text-secondary-foreground font-medium ${className}`}>
            {children}
        </span>
    );
}

export function TierDot({ tier }) {
    const map = { proficient: "bg-emerald-500", comfortable: "bg-amber-500", learning: "bg-sky-500" };
    return <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${map[tier] || "bg-slate-400"}`} aria-hidden="true" />;
}

/* Count-up number, animates when scrolled into view */
export function StatCounter({ value, suffix = "", label, testid }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!inView) return undefined;
        const controls = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
        return () => controls.stop();
    }, [inView, value]);
    return (
        <div ref={ref} data-testid={testid} className="flex flex-col gap-1">
            <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {n.toLocaleString()}
                <span className="text-primary">{suffix}</span>
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm text-muted-foreground">{label}</span>
        </div>
    );
}

/* Thin gradient scroll-progress bar pinned to the top of the viewport */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
    return (
        <motion.div
            data-testid="scroll-progress-bar"
            className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-primary"
            style={{ scaleX }}
        />
    );
}

/* Seamless continuous sliding marquee — hardware-accelerated with CSS translate3d */
export function Marquee({ items }) {
    return (
        <div
            className="group relative w-full max-w-full overflow-hidden border-y border-border bg-card/30 py-4 select-none"
            role="region"
            aria-label="Technologies I work with"
        >
            <div
                className="marquee-continuous flex w-max gap-12 pr-12"
                style={{
                    display: "flex",
                    width: "max-content",
                    animation: "marquee-slide 24s linear infinite",
                }}
            >
                <div className="flex items-center gap-12 shrink-0">
                    {items.map((item) => (
                        <span key={`a-${item.name}`} className="flex items-center gap-2.5 whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground">
                            <TechIcon devicon={item.devicon} invertDark={item.invertDark} className="h-4 w-4" />
                            <span className="font-medium text-foreground/80">{item.name}</span>
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-12 shrink-0" aria-hidden="true">
                    {items.map((item) => (
                        <span key={`b-${item.name}`} className="flex items-center gap-2.5 whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground">
                            <TechIcon devicon={item.devicon} invertDark={item.invertDark} className="h-4 w-4" />
                            <span className="font-medium text-foreground/80">{item.name}</span>
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-12 shrink-0" aria-hidden="true">
                    {items.map((item) => (
                        <span key={`c-${item.name}`} className="flex items-center gap-2.5 whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground">
                            <TechIcon devicon={item.devicon} invertDark={item.invertDark} className="h-4 w-4" />
                            <span className="font-medium text-foreground/80">{item.name}</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
    );
}

/* Deterministic pseudo-random GitHub-style contribution heatmap */
export function Heatmap({ weeks = 53, seed = 42, total = 1247 }) {
    const cells = useMemo(() => {
        let s = seed;
        const rand = () => {
            s |= 0;
            s = (s + 0x6d2b79f5) | 0;
            let t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        return Array.from({ length: weeks }, (_, w) =>
            Array.from({ length: 7 }, (_, d) => {
                const weekend = d === 0 || d === 6;
                const r = rand();
                const level = r < (weekend ? 0.5 : 0.22) ? 0 : r < 0.58 ? 1 : r < 0.8 ? 2 : r < 0.94 ? 3 : 4;
                return { level, count: level * Math.ceil(3 + rand() * 4) };
            }),
        );
    }, [weeks, seed]);
    const levelCls = [
        "bg-slate-200 dark:bg-slate-800",
        "bg-indigo-200 dark:bg-indigo-950",
        "bg-indigo-300 dark:bg-indigo-800",
        "bg-indigo-400 dark:bg-indigo-600",
        "bg-indigo-500 dark:bg-indigo-400",
    ];
    return (
        <div data-testid="github-heatmap" className="w-full max-w-full min-w-0 overflow-x-auto pb-1">
            <div className="flex gap-[3px]">
                {cells.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((cell, di) => (
                            <span
                                key={di}
                                title={`${cell.count} contributions`}
                                className={`h-[10px] w-[10px] rounded-[3px] ${levelCls[cell.level]}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                Less
                {levelCls.map((c, i) => (
                    <span key={i} className={`h-[9px] w-[9px] rounded-[2px] ${c}`} />
                ))}
                More · {total.toLocaleString()} contributions
            </div>
        </div>
    );
}

/* Brand social icons — one consistent set across the site */
export function SocialIcon({ icon, className = "h-[18px] w-[18px]" }) {
    if (icon === "leetcode" || icon === "hackerrank" || icon === "codeforces" || icon === "codechef") {
        return <TechIcon devicon={icon} invertDark className={className} />;
    }
    const map = { github: Github, linkedin: Linkedin, twitter: Twitter, mail: Mail, whatsapp: MessageCircle, devto: Code2, gfg: GraduationCap };
    const Icon = map[icon] || Code2;
    return <Icon className={className} aria-hidden="true" />;
}

/* Scroll-spy — returns the id of the section currently in view */
export function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-40% 0px -55% 0px" },
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);
    return active;
}
